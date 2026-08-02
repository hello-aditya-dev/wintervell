# Worker Architecture

WinterVell uses two sidecar mini-services: the **audit worker** and the **PDF worker**. Both are long-running bun processes separate from the Next.js web app. This document describes the worker architecture, the job queue, failure handling, and dead-letter.

It is paired with [`audit-engine.md`](audit-engine.md) (what the audit worker runs) and [`report-rendering.md`](report-rendering.md) (what the PDF worker produces).

---

## Why workers

The web app handles HTTP requests. It is good at short, synchronous work: rendering pages, accepting form posts, returning JSON. It is bad at:

- Long-running work (a Comprehensive audit crawls 50 pages; a PDF render of a 200-page report takes seconds-to-minutes).
- Work that makes outbound requests to untrusted URLs (SSRF surface — see [`security-model.md`](security-model.md)).
- Work that needs a sandboxed browser (Playwright) or a headless PDF renderer (Puppeteer/Playwright).
- Work that needs to retry on transient failure.

Workers exist to take this work off the web app's request cycle. The web app posts a job; a worker picks it up; the worker posts results back. The web app stays responsive.

---

## Audit worker

| Property | Value |
|---|---|
| Runtime | bun |
| Port | 3002 (internal health/metrics endpoint; not exposed externally) |
| Hot reload | `bun --hot` in development |
| Process model | single process, multiple concurrent jobs (configurable) |
| Egress | only to prospect URLs (post-SSRF-check), object storage, AI providers |
| Ingress | only the internal result-ingest endpoint on the web app |

The audit worker:

1. Polls the `Job` table for queued audit jobs (`status = "queued"`).
2. Claims a job using `FOR UPDATE SKIP LOCKED` (PostgreSQL) or an equivalent locking strategy (SQLite). This allows multiple workers to share the queue without double-processing.
3. Marks the job `running`.
4. Runs the audit per [`audit-engine.md`](audit-engine.md).
5. Posts partial results back to the web app's internal `/api/v1/internal/audit-result` endpoint.
6. On success, marks the job `complete` and posts a final result.
7. On failure, marks the job `failed` and records the error.

### Concurrency

A single worker process handles a configurable number of concurrent jobs (default 2). For higher throughput, run multiple worker processes (horizontally scaled). The `SKIP LOCKED` claim strategy prevents double-processing across processes.

### Health and metrics

The worker exposes a health endpoint at `http://localhost:3002/health` returning `{ status: "ok", uptime: <seconds>, jobsRunning: <n> }`. A metrics endpoint at `http://localhost:3002/metrics` returns Prometheus-style metrics (jobs processed, jobs failed, average job duration). Both endpoints are internal-only.

### Crawler isolation

The audit worker is the only component that crawls prospect URLs. For production deployments, the worker should run in a container or VM with no network access to internal services (database, object storage internal endpoints, the web app's private network). The worker reaches the database and object storage via their public endpoints; it reaches the web app's internal API via an explicitly-allowlisted URL. See [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md).

---

## PDF worker

The PDF worker is structurally similar to the audit worker but renders reports to PDF instead of crawling. It:

1. Polls the `Job` table for queued PDF jobs (`type = "pdf"`, `status = "queued"`).
2. Claims a job, marks it `running`.
3. Loads the `ReportVersion` and the agency branding.
4. Renders the report to HTML (server-side React).
5. Renders the HTML to PDF (Playwright/Puppeteer) with selectable text, page numbers, agency branding, multi-page tables/screenshots.
6. Uploads the PDF to object storage.
7. Posts the signed URL back to the web app.
8. Marks the job `complete`.

The PDF worker uses a sandboxed Chromium instance with no network access beyond the local file system and the object storage endpoint. Fonts are bundled locally (no web-font fetches during rendering).

See [`../setup/pdf-configuration.md`](../setup/pdf-configuration.md) and [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md).

---

## Job table

The `Job` table is shared by both workers. Columns:

| Column | Purpose |
|---|---|
| `id` | UUID |
| `type` | `audit` or `pdf` |
| `organisationId` | Tenant scoping |
| `payload` | JSON: audit id / report version id, options |
| `status` | `queued`, `running`, `complete`, `failed`, `dead_letter` |
| `attempts` | Number of attempts so far |
| `maxAttempts` | Default 3 |
| `lastError` | Error message and stack from the last attempt |
| `lockedBy` | Worker process ID for the current attempt (for crash recovery) |
| `lockedAt` | Timestamp of the current lock |
| `availableAt` | When the job is next available (for backoff) |
| `createdAt` / `updatedAt` | Timestamps |

---

## Failure handling

A job that fails is retried up to `maxAttempts` (default 3) with exponential backoff:

- Attempt 1: immediate.
- Attempt 2: after 60 seconds.
- Attempt 3: after 300 seconds.

If all attempts fail, the job is moved to `dead_letter` status. A dead-lettered job is visible in the admin area and can be:

- Manually retried (resets `attempts` to 0, status to `queued`).
- Cancelled (status to `cancelled`, no further processing).

A dead-lettered audit job leaves the audit in `failed` status; the audit can still be retried via the audit-detail page (which creates a new job with only the failed runners — see [`audit-engine.md`](audit-engine.md)).

A dead-lettered PDF job leaves the report's PDF as "not generated"; the report is still viewable online. The PDF can be re-requested from the report-detail page.

---

## Crash recovery

If a worker process crashes mid-job, the `lockedBy` and `lockedAt` columns allow recovery:

- A maintenance task scans for jobs where `status = "running"` and `lockedAt < now() - 5 minutes`.
- Such jobs are considered orphaned.
- The maintenance task resets them to `queued` (if `attempts < maxAttempts`) or `dead_letter` (if exhausted).

This prevents a crashed worker from permanently blocking a job.

---

## Internal API

The web app exposes an internal endpoint for workers to post results:

- `POST /api/v1/internal/audit-result` — partial or final audit results.
- `POST /api/v1/internal/pdf-result` — PDF generation result (signed URL or error).

Both endpoints require a shared service secret (`WORKER_API_SECRET`) passed in an `X-Worker-Secret` header. The secret is never exposed to the client. The endpoints are not documented in the public API; they are internal contracts between the web app and the workers.

---

## Scaling

- **Vertical**: increase the per-worker concurrency setting.
- **Horizontal**: run multiple worker processes. The `SKIP LOCKED` claim strategy handles distribution.
- **Workload-specific**: run separate worker pools for audits and PDFs. Audits are I/O-bound (crawling); PDFs are CPU-bound (rendering). Separating them prevents a flood of PDF jobs from blocking audit jobs.

---

## Related documents

- [`audit-engine.md`](audit-engine.md) — what the audit worker runs
- [`report-rendering.md`](report-rendering.md) — what the PDF worker produces
- [`security-model.md`](security-model.md) — egress policy, internal API auth
- [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md) — worker setup
- [`../setup/pdf-configuration.md`](../setup/pdf-configuration.md) — PDF worker setup
- [`../operations/audit-job-failure.md`](../operations/audit-job-failure.md) — audit failure runbook
- [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md) — PDF failure runbook
