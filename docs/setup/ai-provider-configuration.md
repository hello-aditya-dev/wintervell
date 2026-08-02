# AI Provider Configuration

WinterVell uses an AI provider for drafting finding explanations, business consequences, recommended actions, proposal text, and roadmap text. The provider is pluggable: OpenAI-compatible, Anthropic, or mock. This guide describes configuration, model selection, usage limits, cost logging, the BYO-key flow, and redaction options.

It is paired with [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) and [`environment-variables.md`](environment-variables.md).

---

## Provider selection

Set `AI_PROVIDER` to one of:

| Value | Provider | Use |
|---|---|---|
| `mock` | Mock | Development, demo, and provider-down fallback. Returns canned outputs. |
| `openai` | OpenAI-compatible | OpenAI, Azure OpenAI, OpenRouter, vLLM, llama.cpp, any OpenAI-compatible API. |
| `anthropic` | Anthropic | Anthropic Claude. |

For an OpenAI-compatible provider other than OpenAI itself, set `AI_BASE_URL` to the provider's API URL.

---

## Configuration

### Mock (development / demo)

```env
AI_PROVIDER=mock
```

No API key required. Outputs are canned. Clearly labelled "AI mock output" in the admin area and in `AIUsage.caller`.

### OpenAI

```env
AI_PROVIDER=openai
AI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini
AI_BASE_URL=https://api.openai.com/v1   # default; override for Azure, OpenRouter, etc.
```

### Anthropic

```env
AI_PROVIDER=anthropic
AI_API_KEY=sk-ant-...
AI_MODEL=claude-3-5-sonnet
```

### Azure OpenAI

```env
AI_PROVIDER=openai
AI_API_KEY=<azure-key>
AI_MODEL=<deployment-name>
AI_BASE_URL=https://<resource>.openai.azure.com/openai/deployments/<deployment-name>
```

### OpenRouter

```env
AI_PROVIDER=openai
AI_API_KEY=sk-or-...
AI_MODEL=anthropic/claude-3.5-sonnet
AI_BASE_URL=https://openrouter.ai/api/v1
```

### Self-hosted (vLLM, llama.cpp)

```env
AI_PROVIDER=openai
AI_API_KEY=local   # vLLM/llama.cpp often accept any string
AI_MODEL=<model-name>
AI_BASE_URL=http://localhost:8000/v1
```

---

## Model selection

`AI_MODEL` is the model identifier passed to the provider. Choose based on:

| Tradeoff | Cheaper model (e.g. gpt-4o-mini) | Stronger model (e.g. gpt-4o, claude-3-5-sonnet) |
|---|---|---|
| Cost | Lower | Higher |
| Latency | Lower | Higher |
| Quality of explanation drafts | Adequate; may require more Auditor editing | Better; requires less editing |
| Quality of proposal text | Adequate; may require more Sales-rep editing | Better; requires less editing |
| Structured-output reliability | Generally good; occasional schema-validation failures | Better; fewer failures |

For most agencies, a cheaper model is the right default for explanation drafts (high volume, templated) and a stronger model is worth it for proposal generation (low volume, high value). WinterVell currently uses one model per organisation; per-task model selection is on the roadmap.

---

## Usage limits

Per-organisation usage limits prevent runaway costs:

```env
AI_MONTHLY_TOKEN_CAP=1000000      # 1M tokens per calendar month
AI_MONTHLY_COST_CAP_USD=100       # $100 per calendar month
AI_DAILY_CALL_CAP=                # not set by default
```

When a limit is hit:

- AI calls are blocked.
- The calling feature degrades to templated output (for explanation drafts) or a templated draft (for proposals).
- The admin area shows a "usage limit reached" banner.
- The limit resets at the start of the next calendar month (or day).

Limits are also configurable per-organisation via the admin area (Settings → Integrations → AI). Per-organisation configuration overrides the env-var default.

---

## Cost logging

Every AI call is logged in `AIUsage`:

- `organisationId`
- `provider`, `model`
- `promptVersion`
- `inputTokens`, `outputTokens`
- `costUsd` (estimated from a per-model cost table maintained in `src/config/ai-costs.ts`)
- `latencyMs`, `status`, `errorMessage`
- `calledAt`, `caller`

The cost table maps model identifiers to per-1K-token input/output costs. The table is updated when providers change pricing. The estimated cost is approximate; the provider's invoice is the source of truth.

Cost reports are available in the admin area (Settings → Integrations → AI → Usage) showing daily, weekly, and monthly cost trends.

`AIUsage` records are retained for 90 days by default (configurable — see [`../operations/data-deletion.md`](../operations/data-deletion.md)).

---

## BYO key flow

The Agency Source and Studio tiers allow BYO key: the agency enters its own AI provider key, which is stored encrypted and used only for that organisation's calls.

### Configuration flow

1. The Administrator opens Settings → Integrations → AI in the admin area.
2. Selects the provider (`openai`, `anthropic`).
3. Pastes the API key.
4. Optionally selects the model.
5. Clicks **Save**.

Behind the scenes:

- The key is encrypted at rest using a per-deployment encryption key.
- The encrypted key is stored in `AIProviderConfig.encryptedKey`.
- The plaintext key is held in memory only at call time; it is never logged, never sent to the client, never written to disk in plaintext.
- A "Send test prompt" action verifies the key works.

### Rotation

To rotate a BYO key:

1. The Administrator enters a new key in the admin area.
2. The old key is overwritten (the previous encrypted value is not retained).
3. New AI calls use the new key.
4. In-flight calls finish on the old key.

### Revocation

If a key is suspected to be compromised:

1. Revoke the key at the provider (OpenAI, Anthropic).
2. Update the key in WinterVell to a new key (or remove it, falling back to mock).
3. Review `AIUsage` for anomalous calls during the suspected exposure window.

---

## Redaction options

User-provided content inserted into AI prompts is redacted per the organisation's configuration:

```env
AI_REDACT_EMAILS=true      # replace email addresses with [email]
AI_REDACT_PHONES=true      # replace phone numbers with [phone]
AI_REDACT_URLS=            # not set by default; replace URLs with [url] except the prospect's own domain
```

Per-organisation configuration overrides the env-var defaults. Redaction is applied to user-provided content before it is inserted into the prompt; the redacted content is what is sent to the provider. The redacted form is logged in `AIUsage` so the agency can audit what was sent.

For strict data-residency requirements, configure a provider that runs in a specific region (Azure OpenAI in EU, Anthropic in specific regions, or a self-hosted model). The abstraction does not enforce region; the configuration does.

---

## Prompt versioning

Prompts are versioned in `src/prompts/` (see [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md)). The prompt version is recorded in `AIUsage.promptVersion`. A reader can tell which prompt produced which output. Changing a prompt creates a new version file; the old version is retained for reproducibility.

---

## Fallback to mock

If the configured provider is down or the key is invalid:

- The abstraction falls back to templated output (see [`../operations/ai-provider-failure.md`](../operations/ai-provider-failure.md)).
- The admin area shows a banner: "AI provider unavailable; using fallback."
- The originating user is notified: "AI-assisted text could not be generated; please edit manually."

The mock provider is **not** automatically used in production as a fallback (it would produce canned outputs that look like AI outputs to a reader). Templated output is used instead, with a clear label.

To explicitly switch to the mock provider (e.g. for testing), set `AI_PROVIDER=mock`.

---

## Testing

After configuration, run a test:

1. In the admin area, Settings → Integrations → AI → Send test prompt.
2. The system sends a trivial prompt ("What is 2+2?") and displays the response.
3. Verify the response is sensible.
4. Check the `AIUsage` log (Settings → Integrations → AI → Usage) to confirm the call was logged.

A failed test indicates a configuration issue (bad key, wrong base URL, model name typo, network block).

---

## Related documents

- [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) — abstraction internals
- [`environment-variables.md`](environment-variables.md) — env var reference
- [`../operations/ai-provider-failure.md`](../operations/ai-provider-failure.md) — failure runbook
- [`../operations/provider-outage.md`](../operations/provider-outage.md) — broader provider outage
- [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) — mock provider in demo
- [`../architecture/security-model.md`](../architecture/security-model.md) — key handling, prompt-injection
