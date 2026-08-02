# AI Usage Disclosure

> **TEMPLATE — REQUIRES LEGAL REVIEW.** This document describes how WinterVell uses AI, the boundaries placed on AI behaviour, the provider abstraction, and the controls available to Licensees. It is the companion to [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md) (referenced by the [`EULA_TEMPLATE.md`](EULA_TEMPLATE.md)) and to [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) (prompt-injection boundaries).

WinterVell uses AI as an **assistive** layer. AI helps the Agency user draft and explain; it does **not** invent technical evidence, and its outputs are always editable and require human approval before publication.

---

## 1. What AI is used for

AI is used to assist the Agency user with the following tasks:

| Task | What the AI produces | Mandatory human gate |
|---|---|---|
| Executive summary | A short prose summary of the audit findings | Yes — editable, must be approved before sharing |
| Finding explanations | Plain-language explanation of a technical finding | Yes |
| Business-impact statements | A description of why a finding matters to the prospect's business | Yes |
| Recommendations | Suggested actions to remediate a finding | Yes |
| Proposal drafts | Draft scope, deliverables, exclusions, assumptions | Yes |
| Follow-up drafts | Draft follow-up email after sharing a report | Yes |
| Roadmap drafts | Draft 0/30/60/90-day implementation plan | Yes |
| Service-catalogue wording | Suggested pricing/duration wording for a service | Yes |

AI is **not** used to:

- Invent findings, evidence, screenshots, or selectors. Findings are produced by the audit engine and the Agency user; AI only explains or summarises them.
- Make decisions about whether a prospect is "won" or "lost".
- Send emails or share links without the Agency user's explicit action.
- Modify licence validation, rate limits, or security controls.

---

## 2. Provider abstraction

WinterVell's AI integration is a **provider abstraction** rather than a hard binding to one vendor. The abstraction supports:

| Provider type | Notes |
|---|---|
| OpenAI-compatible | Any endpoint that implements the OpenAI chat-completions API shape (OpenAI itself, Azure OpenAI, open-source gateways, etc.) |
| Anthropic | Claude-family models via the Anthropic API |
| z-ai-web-dev-sdk | The ZAI / Zhipu-AI web dev SDK — used as the default demo/mock path. See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for the licence-verification status of this SDK. |
| Mock | A deterministic mock provider used in demo mode and in tests. **Clearly labelled** in the UI as "Mock provider — no real AI call made." |

The Agency admin selects the active provider in settings. Different provider types can be configured simultaneously and switched per task.

---

## 3. Bring-your-own-key (BYO key)

- AI provider API keys are configured by the Agency admin in the WinterVell settings UI.
- Keys are stored in server-side environment secrets — **never** in the browser, **never** in client bundles, **never** in logs.
- Keys are transmitted **only** to the configured provider's API endpoint over HTTPS.
- The browser never sees the API key; AI calls are proxied through WinterVell server routes that inject the key server-side.
- Keys are scoped per organisation; one organisation's key is never used to serve another organisation's AI requests.

---

## 4. Model selection

- The Agency admin selects a default model per provider (e.g. `gpt-4o-mini`, `claude-3-5-sonnet`, a ZAI model identifier).
- Per-task overrides are configurable (e.g. a cheaper model for follow-up drafts, a stronger model for executive summaries).
- The selected model is recorded alongside each AI-assisted draft for auditability.

---

## 5. Token and cost logging

- Each AI call records: provider, model, prompt token count, completion token count, estimated cost, timestamp, and the task type.
- Costs are aggregated per organisation and surfaced in the admin UI.
- **Full prompts are not logged** unless verbose logging is explicitly enabled by the Agency admin. This is a privacy-preserving default — see [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) Section 10.

---

## 6. Retry and timeout

- AI calls use bounded retry with exponential backoff.
- Timeouts are enforced per call (default: 60 s, configurable).
- Failed calls are surfaced to the Agency user as a clear error; the user can retry or proceed without AI.
- AI failures never block the core audit workflow. The audit engine produces findings without AI; AI is purely additive.

---

## 7. Structured-output validation

- AI responses are parsed against a Zod schema before storage.
- Outputs that do not match the schema are rejected and surfaced as errors, not as content.
- Outputs that contain instructions to perform actions on the Licensee's infrastructure (prompt-injection attempts) are rejected.
- See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Section 11–12 for the full prompt-injection boundary model.

---

## 8. Prompt versioning

- Prompt templates are versioned and stored in the repository (`src/lib/ai/prompts/` or equivalent).
- The prompt version used for each AI-assisted draft is recorded alongside the draft.
- Changes to prompt templates are reviewed in code review and tracked in git history.
- Versioning supports reproducibility: an older draft can be re-generated with the prompt version that produced it, where the underlying model is still available.

---

## 9. Redaction options

- The Agency admin can configure redaction of specific fields from prompts sent to the AI provider (e.g. redact prospect email and phone from prompts).
- Redaction is applied at prompt-assembly time, before the request leaves WinterVell.
- Redaction does not affect audit findings (those are stored unredacted server-side); it only affects what is sent to the AI provider.

---

## 10. Usage limits

- Per-organisation token/cost limits are configurable.
- When a limit is reached, further AI calls are rejected with a clear message; the Agency admin can raise the limit or wait for the limit window to roll over.
- Usage limits protect Licensees from runaway costs (e.g. a misconfigured script calling AI in a loop).

---

## 11. AI output is always editable

- AI-assisted drafts are stored as drafts.
- The Agency user can edit, delete, or reject any AI-assisted content before it appears in a published report or proposal.
- Once approved, the content is treated as the Agency user's content; the AI-assisted origin is preserved in the audit log but is not displayed to the end client unless the Agency user explicitly chooses to disclose it.

---

## 12. Mock provider in demo mode

- In demo mode (see [`docs/product/demo-mode-guide.md`](../product/demo-mode-guide.md)), WinterVell uses the Mock provider.
- The Mock provider returns deterministic, clearly-fictional content.
- The UI **clearly labels** when the Mock provider is active: "Mock provider — no real AI call made. Outputs are illustrative."
- The Mock provider is also used in the test suite to keep tests deterministic and free of provider cost.

---

## 13. Training on client data

- WinterVell **does not** train models on Licensee or client data.
- WinterVell does **not** send Licensee data to any party for the purpose of training WinterVell's own models.
- If a third-party AI provider (OpenAI, Anthropic, ZAI, or another) uses API inputs to train its own models, that is governed by the **provider's terms**, not by WinterVell. The Licensee is responsible for confirming the provider's training policy before configuring that provider. WinterVell discloses this dependency in [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) Section 5 and [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) Section 3.
- Where a provider offers a "no training on API inputs" option (e.g. OpenAI's API opt-out for training), the WinterVell configuration defaults to that option where the provider makes it available.

---

## 14. What AI cannot do in WinterVell

- AI **cannot** create findings. Findings come from the audit engine and the Agency user.
- AI **cannot** publish content. All AI output is a draft until the Agency user approves.
- AI **cannot** execute actions on the Licensee's infrastructure. No tool-use, no function-calling exposed to the model.
- AI **cannot** see another organisation's data. Prompts are assembled from the active organisation's data only.
- AI **cannot** access the API key. Keys are injected server-side.
- AI **cannot** bypass rate limits, licence validation, or security controls.

---

## 15. Disclosure to end clients

The Agency decides whether and how to disclose the use of AI in producing a report or proposal. WinterVell does **not** auto-disclose AI usage to the prospect; that is the Agency's editorial choice. WinterVell does, however:

- Mark AI-assisted drafts as such in the audit log.
- Preserve the prompt version and provider/model used for each AI-assisted draft.
- Allow the Agency to include or omit an AI-usage disclaimer in the report (a template disclaimer is provided in the report builder).

---

## 16. Maintenance

- This document is updated whenever a new AI task type is added, a new provider is supported, or the prompt-injection boundary model changes.
- Prompt template changes are tracked in git; this document references the versioning scheme but does not duplicate the templates.
- Licensees deploying WinterVell should review this disclosure against their actual provider configuration and update their [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) accordingly.

---

*This disclosure is part of the WinterVell legal package. It is maintained for accuracy but is **not legal advice**.*
