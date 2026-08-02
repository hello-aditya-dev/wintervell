# AI Provider Failure

This runbook describes how to handle AI provider failures: timeouts, schema-validation failures, rate limits, cost spikes, and provider switching. It is paired with [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) and [`provider-outage.md`](provider-outage.md).

---

## Failure modes

| Mode | Symptom | Detection |
|---|---|---|
| Timeout | Call exceeds 30 s | `AIUsage.status = "timeout"` |
| Network error | Connection refused, DNS failure, TLS error | `AIUsage.status = "error"` |
| 5xx from provider | Provider returned 500/502/503/504 | `AIUsage.status = "error"` |
| 4xx from provider | 401 (bad key), 403 (quota), 429 (rate limit) | `AIUsage.status = "error"` |
| Schema validation failure | Output does not match Zod schema | `AIUsage.status = "schema_validation_failed"` |
| Cost spike | Daily or monthly cost exceeds expected baseline | Cost-spike alert (see below) |
| Quality regression | Outputs are nonsensical, off-topic, or off-brand | Manual review; hard to detect automatically |

---

## Retry and timeout

Default retry policy per [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md):

- 2 retries.
- Backoff: 1 s, 2 s.
- Retry on: network error, 5xx, timeout, schema-validation failure.
- No retry on: 401 (bad key — needs human intervention), 429 (rate limit — back off longer).

A call that exhausts retries falls back to a templated output. The calling feature never crashes. The fallback is logged at `WARN` level.

---

## Provider switch

An organisation can switch providers without code changes by updating `AIProviderConfig`. The switch takes effect on the next AI call. In-flight calls finish on the previous provider.

### Switch procedure

1. **Administrator** opens the AI provider configuration in the admin area.
2. Selects the new provider and enters the new key (or BYO key).
3. Tests the configuration with a "Send test prompt" action.
4. Saves the configuration.
5. New AI calls use the new provider.
6. The `AIUsage` log records the provider switch.

### Switching under outage

If the primary provider is down, the Administrator can switch to the mock provider to keep the product functional (with templated outputs). When the primary provider recovers, the Administrator switches back. The mock provider's outputs are clearly labelled "AI mock output."

For a multi-tenant Hosted deployment, the platform operator can switch all organisations to the mock provider via a global feature flag, then switch back when the provider recovers.

---

## Mock fallback in demo

In demo and development, the mock provider is always in use. A real-provider outage is invisible to demo users — see [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md). A demo organisation is never switched to a real provider; production organisations are never accidentally switched to the mock provider (the configuration flow requires explicit selection of "mock" and shows a warning).

---

## Cost spike detection

A cost-spike alert fires when:

- Daily cost exceeds 3x the trailing-30-day average daily cost.
- Monthly cost exceeds 80% of the monthly cost cap.
- A single call's cost exceeds 10x the trailing-30-day median per-call cost.

### Action

1. Inspect the `AIUsage` log for the spike period — which caller, which model, which prompts?
2. Common causes:
   - A runaway loop in an audit runner (e.g. calling AI per page instead of per finding).
   - A misconfigured prompt that requests excessive output tokens.
   - A user manually re-running many audits.
   - A model change (e.g. switched from a cheap to an expensive model).
3. Mitigate:
   - Pause AI calls globally via feature flag if the spike is severe.
   - Reduce per-organisation usage caps.
   - Fix the runaway loop or prompt.
4. Post-incident:
   - Review the `AIUsage` log for anomalous patterns.
   - Adjust cost caps if the new baseline is intentional.
   - Add automated guards (e.g. cap per-call output tokens) if the spike was caused by a misconfigured prompt.

---

## Schema-validation failure handling

When the model returns JSON that does not match the Zod schema:

1. The abstraction retries with a corrective preamble: "Your previous output did not match the expected schema. The schema requires `<description>`. Please return valid JSON matching the schema."
2. After 2 retries, the call fails and falls back to a templated output.
3. The `AIUsage` log records `schema_validation_failed` with the model's raw output (truncated to 1 KB) for later analysis.

A persistent pattern of schema-validation failures for a specific prompt indicates the prompt is ambiguous or the schema is too strict. Action: revise the prompt (new version — see [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md)) or relax the schema (with justification).

---

## Bad-key (401) handling

A 401 from the provider means the API key is invalid, expired, or revoked. This is not retried. The abstraction:

1. Records `AIUsage.status = "error"` with `errorMessage = "401 Unauthorized"`.
2. Marks the `AIProviderConfig` as `keyInvalid = true`.
3. Surfaces a banner in the admin area: "AI provider key is invalid. AI-assisted features are using fallback templates. Update the key in Settings → Integrations."
4. Falls back to templated outputs for all AI calls until the key is updated.

---

## Provider rate-limit (429) handling

A 429 from the provider means the organisation has hit the provider's rate limit. The abstraction:

1. Reads the `Retry-After` header (if present) and waits.
2. Retries the call after the wait.
3. If the rate limit persists across multiple calls, the abstraction throttles its own call rate to avoid hammering the provider.
4. If the rate limit is sustained (e.g. the organisation's plan is too small), the admin area shows: "AI provider rate limit reached. Consider upgrading your provider plan or reducing audit concurrency."

---

## Escalation

| Failure | Escalation |
|---|---|
| Single-call timeout/error, retried successfully | No escalation |
| Multiple calls failing, fallback in use | SEV-3 if persistent; investigate during business hours |
| Provider down (all calls failing) for >15 minutes | SEV-2 — see [`provider-outage.md`](provider-outage.md) |
| Cost spike >5x baseline | SEV-3; pause AI if >10x |
| Bad key, no fallback configured | SEV-3; notify the organisation Owner |
| Schema-validation failures >20% of calls for a prompt | SEV-4; prompt revision |

---

## Related documents

- [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) — abstraction internals
- [`../setup/ai-provider-configuration.md`](../setup/ai-provider-configuration.md) — configuration
- [`provider-outage.md`](provider-outage.md) — broader provider outage
- [`incident-response.md`](incident-response.md) — incident response
- [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) — mock provider in demo
