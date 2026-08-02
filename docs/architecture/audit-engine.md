# Audit Engine

The WinterVell audit engine runs modular category runners against a prospect's website, collects structured evidence, and writes findings, scores, and screenshots back to the database. The engine runs as a separate bun mini-service (the **audit worker**) to isolate SSRF and JavaScript-execution risk from the web app. This document describes the engine internals; the product methodology is in [`../product/audit-methodology.md`](../product/audit-methodology.md), and the worker process is in [`worker-architecture.md`](worker-architecture.md).

---

## Modular category runners

Each audit category (Technical, SEO, Accessibility, Conversion/UX, Trust, AI-visibility) is implemented as an independent runner. A runner is a module with the interface:

```ts
interface CategoryRunner {
  category: AuditCategory;
  run(ctx: RunContext): Promise<RunnerResult>;
}
```

- `RunContext` contains the audit config (mode, target URL, page list, options), the crawl results, and a handle to the AI provider abstraction.
- `RunnerResult` contains the findings, the evidence, the screenshots, and a per-runner status (`complete`, `incomplete`, `failed`).

Runners are independent. A failure in the Accessibility runner does not stop the Technical runner. The audit worker runs all enabled runners for the audit's mode, collects results, and posts them back to the web app.

Runners are registered in a single registry. Adding a new category requires:

1. Implementing the runner.
2. Registering it.
3. Adding the category to the score version's sub-score list.
4. Updating the audit-methodology documentation.

---

## Evidence collection

Each runner collects evidence as it runs. Evidence is structured per [`../product/audit-methodology.md`](../product/audit-methodology.md):

- HTTP responses (status, headers, body snippet).
- HTML snippets (selector-scoped).
- Console errors (message, stack).
- Performance metrics (TTFB, FCP, LCP, CLS, INP).
- Screenshots (full-page or element-scoped).
- Schema.org JSON-LD.
- Raw link graph (internal and external links).

Evidence is stored in two places:

- **Structured fields** on the `Finding` and `Evidence` models (URL, selector, severity, etc.) — in the database.
- **Raw artifacts** (screenshots, full HTML, full HTTP responses) — in object storage, referenced by signed URL.

Raw artifacts are not stored in the database. The database stores only the signed URL and a content hash for integrity.

---

## Crawler isolation

The crawler is the component that makes outbound HTTP requests to the prospect's URL. It runs **only** inside the audit worker, never inside the web app. The crawler:

- Validates the URL against the SSRF block-list (see [`security-model.md`](security-model.md)) before any request.
- Re-validates after every redirect (a redirect to a private IP is blocked).
- Caps response size (default 10 MB) and response time (default 30 s).
- Caps redirect hops (default 5).
- Optionally runs in a container or VM with no network access to internal services (recommended; see [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md)).
- Does not execute third-party JavaScript when running in static-crawl mode; executes JavaScript only in a sandboxed browser instance when the audit mode requires it (Comprehensive, Manual-expert).

JavaScript execution is performed in a sandboxed browser (Playwright or equivalent) with a fresh profile per crawl, no persistent cookies, and a realistic user-agent. The sandbox has no access to the worker's filesystem beyond a scratch directory.

---

## Retry and timeout

Per-runner retry and timeout:

| Setting | Default | Notes |
|---|---|---|
| Runner timeout | 5 min | A runner that exceeds this is marked `failed` and can be retried. |
| Per-request timeout | 30 s | Single HTTP request or browser operation. |
| Retry attempts | 3 | Exponential backoff: 1s, 2s, 4s. |
| Retry on | Network error, 5xx, timeout | Not on 4xx (the page is genuinely not there). |

Retries are per-runner, not per-audit. A runner that exhausts retries is marked `failed`; the audit continues with the other runners.

---

## Manual-expert mode

In Manual-expert mode (see [`../product/audit-methodology.md`](../product/audit-methodology.md)):

- The auditor selects the pages to audit.
- The auditor selects the runners to enable.
- The crawler runs against the selected pages.
- The runners produce findings as usual.
- The auditor may add manual findings (for things the runners cannot detect).
- The audit cannot be published until the auditor has reviewed every finding and marked it `verified` or `excluded`.

Manual-expert mode is the only mode where manual findings are first-class; in other modes, manual findings are added during the review step after automated collection.

---

## Draft saving

An audit in progress can be saved as a draft. A draft is an `AuditRun` with `status = "draft"` and partial findings. Drafts are visible to the auditor and the audit manager; they are not visible to sales roles or to the prospect.

Drafts are automatically saved at intervals during a long audit (every 30 seconds for interactive audits; on each batch completion for batch audits). The auditor can also save manually. Resuming a draft loads the partial findings and continues from where the run left off.

---

## Retry-failed-stages

An audit that completed with one or more failed runners can be partially retried:

- The auditor selects the failed runners.
- The audit worker re-runs only those runners.
- New findings are merged with the existing findings; existing findings from successful runners are preserved.
- The score is recomputed against the merged findings.

This avoids re-running a 50-page Comprehensive audit because one runner failed on one page. Partial retry is available on the audit-detail page in the admin area.

---

## Worker architecture

The audit worker is a separate bun process (see [`worker-architecture.md`](worker-architecture.md)):

- It polls a `Job` table for queued audits.
- It claims a job with `FOR UPDATE SKIP LOCKED` (PostgreSQL) or an equivalent locking strategy (SQLite).
- It runs the audit, posting partial results back to the web app via an internal API.
- It marks the job `complete` or `failed` at the end.
- It runs with `bun --hot` in development for fast iteration.

The worker is the only component that makes outbound requests to prospect URLs. The web app's outbound HTTP is restricted to the configured AI providers, the configured email provider, the configured object storage, and the licence validation service. See [`security-model.md`](security-model.md) for the full egress policy.

---

## Failure handling

A runner that fails is recorded with:

- The runner name.
- The error message and stack.
- The page or request that triggered the failure.
- The retry count.
- The final status (`failed`).

A failed runner produces no findings for its category; the category's sub-score is marked `incomplete` per [`../product/scoring-methodology.md`](../product/scoring-methodology.md). The audit's overall status is `complete_with_failures` (publishable, with caveats) or `failed` (not publishable) depending on whether any runner completed successfully.

A job that fails entirely (worker crash, database disconnect) is moved to a dead-letter queue after the configured retry count. See [`../operations/audit-job-failure.md`](../operations/audit-job-failure.md) for the operations runbook.

---

## Related documents

- [`../product/audit-methodology.md`](../product/audit-methodology.md) — product methodology
- [`worker-architecture.md`](worker-architecture.md) — worker process
- [`security-model.md`](security-model.md) — SSRF, egress policy
- [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md) — worker setup
- [`../operations/audit-job-failure.md`](../operations/audit-job-failure.md) — failure runbook
- [`ai-provider-abstraction.md`](ai-provider-abstraction.md) — AI calls inside runners
