# AI Provider Abstraction

WinterVell uses AI for: drafting finding explanations, drafting business consequences, drafting recommended actions, generating proposal text, generating roadmap text, and (optionally) embedding-based similarity for finding deduplication. All AI calls go through a single provider abstraction. This document describes the interface, the providers, the cost and usage logging, and the safety rules.

It is paired with [`../setup/ai-provider-configuration.md`](../setup/ai-provider-configuration.md) (configuration) and [`security-model.md`](security-model.md) (prompt-injection boundaries).

---

## Interface

```ts
interface AIProvider {
  name: "openai" | "anthropic" | "mock";

  generateText(req: TextRequest): Promise<TextResponse>;
  generateStructured<T>(req: StructuredRequest<T>): Promise<StructuredResponse<T>>;
  embed?(req: EmbedRequest): Promise<EmbedResponse>;
}

interface TextRequest {
  prompt: string;          // built from versioned prompt templates
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  redact?: RedactionOptions;
}

interface StructuredRequest<T> {
  prompt: string;
  schema: ZodSchema<T>;     // used to validate the response
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  redact?: RedactionOptions;
}
```

- `generateText` returns free-form text. Used for explanation drafts.
- `generateStructured` returns JSON validated against a Zod schema. Used for findings, recommendations, roadmap items. If the model's output does not validate, the call is retried with a "your output did not match the expected schema" preamble; after 2 retries, the call fails and the runner falls back to a templated output.
- `embed` (optional) returns a vector. Used for finding-deduplication similarity if enabled. Not all providers implement it; the mock provider returns deterministic pseudo-vectors.

---

## Providers

| Provider | Implementation | Use |
|---|---|---|
| `openai` | OpenAI-compatible API (works with OpenAI, Azure OpenAI, OpenRouter, local llama.cpp server, vLLM, etc.) | Production default |
| `anthropic` | Anthropic Messages API | Production alternative |
| `mock` | Returns canned structured outputs from a fixture | Development, demo, and provider-down fallback |

A provider is selected per-organisation in the `AIProviderConfig` model. An organisation can switch providers without code changes; the abstraction handles the differences.

### BYO key

An organisation may bring its own API key (BYO key). The key is stored encrypted at rest (never in plaintext in the database, never logged, never sent to the client). The key reference (not the key itself) is stored in `AIProviderConfig.keyReference`. The actual key is held in a secrets manager or in an encrypted column decrypted only at call time.

BYO key is the default for the Agency Source and Studio tiers. The Hosted tier may use a platform-provided key with usage limits.

---

## Model selection

`AIProviderConfig.model` is the model identifier (for example, `gpt-4o-mini`, `claude-3-5-sonnet`, `mock-default`). Model selection is per-organisation. A future version may allow per-task model selection (a cheaper model for explanation drafts, a stronger model for proposal generation); for now, one model per organisation.

---

## Token and cost logging (AIUsage)

Every AI call writes an `AIUsage` record:

| Field | Purpose |
|---|---|
| `organisationId` | Tenant scoping |
| `provider` | Which provider was used |
| `model` | Which model was used |
| `promptVersion` | Which prompt template version (see below) |
| `inputTokens` | Tokens in |
| `outputTokens` | Tokens out |
| `costUsd` | Estimated cost in USD |
| `latencyMs` | Call latency |
| `status` | `success`, `error`, `timeout`, `schema_validation_failed` |
| `errorMessage` | If failed |
| `calledAt` | Timestamp |
| `caller` | Which feature invoked the call (`audit.explanation_draft`, `proposal.section_draft`, etc.) |

`AIUsage` is used for:

- Usage limits (see below).
- Cost reporting (per-organisation, per-month).
- Audit trail (which calls were made for which audit).

`AIUsage` records are retained for 90 days by default; retention is configurable. See [`../operations/data-deletion.md`](../operations/data-deletion.md).

---

## Usage limits

Per-organisation usage limits are configurable:

- `monthlyTokenCap` — maximum tokens per calendar month.
- `monthlyCostCapUsd` — maximum estimated cost per calendar month.
- `dailyCallCap` — maximum calls per day.

When a limit is hit, AI calls are blocked and the calling feature degrades:

- Audit runners fall back to templated explanations (no AI draft).
- Proposal generation falls back to a templated draft.
- The admin area shows a "usage limit reached" banner.

Limits never block core product functionality (audits still run; reports still generate). They only block AI-assisted text generation.

---

## Retry and timeout

| Setting | Default |
|---|---|
| Call timeout | 30 s |
| Retry attempts | 2 |
| Retry backoff | 1 s, 2 s |
| Retry on | Network error, 5xx, timeout, schema validation failure |

A call that exhausts retries returns a fallback response (templated text or a sentinel "AI generation failed; please edit manually" placeholder). The calling feature never crashes on AI failure.

---

## Structured-output validation (Zod)

`generateStructured` requires a Zod schema. The provider's raw JSON output is parsed and validated:

1. Parse the model's text output as JSON.
2. Validate against the Zod schema.
3. If validation fails, retry with a corrective preamble.
4. If validation fails after retries, return a fallback.

This prevents malformed AI output from polluting the database. A finding with `severity: "potentially high"` (not a valid enum) is rejected at the boundary, not stored.

---

## Prompt versioning (prompts/ dir)

Prompt templates live in `src/prompts/` and are versioned:

```
src/prompts/
├── audit/
│   ├── explanation-draft.v1.ts
│   ├── explanation-draft.v2.ts
│   ├── business-consequence.v1.ts
│   └── recommended-action.v1.ts
├── proposal/
│   ├── exec-summary.v1.ts
│   └── scope.v1.ts
└── roadmap/
    └── phase.v1.ts
```

Each prompt is a pure function `(input) => string` that takes structured input (finding, prospect, audit config) and returns the prompt string. The prompt version is recorded in `AIUsage.promptVersion`, so a reader can tell which prompt produced which output. Changing a prompt creates a new version file; the old version is retained for reproducibility.

Prompts are reviewed for prompt-injection boundaries — see [`security-model.md`](security-model.md). User-provided content (prospect name, page text, raw evidence) is always inserted into a clearly-delimited section of the prompt, never into the system prompt, and the system prompt instructs the model to treat that section as untrusted data.

---

## Redaction options

`RedactionOptions` allows the caller to redact sensitive content before sending to the provider:

- `redactEmails` — replace email addresses with `[email]`.
- `redactPhoneNumbers` — replace phone numbers with `[phone]`.
- `redactUrls` — replace URLs with `[url]` (except the prospect's own domain).
- `redactCustomPatterns` — caller-supplied regex patterns.

Redaction is applied to user-provided content before it is inserted into the prompt. The redacted content is logged in `AIUsage` (so the agency can audit what was sent); the un-redacted content is never sent to the provider.

For organisations with strict data-residency requirements, the agency may configure a provider that runs in a specific region (for example, Azure OpenAI in EU). The abstraction does not enforce region; the configuration does.

---

## Never expose keys to the client

API keys are never sent to the browser. AI calls are made server-side only (in the web app's server actions or in the audit worker). A client-side feature that needs AI output calls a server action, which calls the provider abstraction. The key never crosses the client-server boundary.

This is enforced by code review and by a lint rule that flags any import of the AI provider module from a client-side file.

---

## Mock provider

The mock provider returns canned structured outputs from a fixture. It is used:

- In development (no API key required).
- In the demo organisation (no real AI calls).
- As a fallback when a real provider is down (see [`../operations/ai-provider-failure.md`](../operations/ai-provider-failure.md)).

The mock provider's outputs are clearly labelled "AI mock output — not generated by a real model." This label is preserved in the `AIUsage.caller` field and is visible in the admin area.

---

## Related documents

- [`../setup/ai-provider-configuration.md`](../setup/ai-provider-configuration.md) — configuration
- [`security-model.md`](security-model.md) — prompt-injection boundaries, key handling
- [`audit-engine.md`](audit-engine.md) — where AI is called during an audit
- [`../operations/ai-provider-failure.md`](../operations/ai-provider-failure.md) — failure runbook
- [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) — mock provider in demo
