# Audit Job Failure

This runbook describes how to handle audit job failures: runner failures, full-job failures, dead-lettered jobs, and partial results. It is paired with [`../architecture/audit-engine.md`](../architecture/audit-engine.md) and [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md).

---

## Failure types

| Failure type | Cause | User impact |
|---|---|---|
| Single-runner failure | One category runner failed (timeout, exception, provider error) | Audit completes with `incomplete` for that category; sub-score is `—` |
| Multi-runner failure | Several runners failed | Audit completes with `incomplete` for several categories; Overall score excludes them |
| Full-job failure | Worker crashed, database disconnect, unhandled exception | Audit is `failed`; not publishable; can be retried |
| Dead-letter | Job exhausted all retry attempts | Audit is `failed`; visible in admin area for manual retry or cancellation |
| Stuck job | Worker claimed a job but never completed it (crash, network partition) | Maintenance task detects and resets the job |

---

## Single-runner failure

A single runner that fails is recorded with:

- Runner name (e.g. `accessibility`).
- Error message and stack.
- Page or request that triggered the failure.
- Retry count (default 3).
- Final status (`failed`).

The audit's overall status is `complete_with_failures`. The audit is publishable; the report shows the failed category's sub-score as `—` with a note "This category could not be completed during the audit. We recommend re-running this category separately."

### Action

1. Inspect the runner's error in the audit-detail page (visible to Auditors and Audit managers).
2. If the error is transient (network, timeout, provider), use **partial retry** to re-run only the failed runner — see [`../architecture/audit-engine.md`](../architecture/audit-engine.md).
3. If the error is permanent (page no longer exists, schema change), document the reason in the audit's notes and exclude the category from the report.

---

## Multi-runner failure

If multiple runners fail, the audit's overall status is still `complete_with_failures` (if at least one runner succeeded) or `failed` (if no runner succeeded). The same partial-retry path applies.

If the failure is widespread (for example, all runners failed because the prospect's site was unreachable), the audit is `failed`:

- The audit is not publishable.
- The audit-detail page shows the failure reasons.
- The Auditor can retry the entire audit or mark it as `abandoned` with a reason.

---

## Full-job failure

A full-job failure occurs when the worker process crashed, lost database connection, or hit an unhandled exception. The job's `status` is `failed` with `lastError` recorded.

### Action

1. Check the worker's logs for the error.
2. Check the worker's health endpoint (`/health` on port 3002) — is the worker running?
3. If the worker is down, restart it — see [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md).
4. Retry the job from the audit-detail page (`Retry audit` action). This creates a new job with the same audit configuration.
5. If the retry also fails, escalate to SEV-2 per [`incident-response.md`](incident-response.md).

---

## Dead-letter

A job that exhausts all retry attempts (default 3) is moved to `dead_letter` status. Dead-lettered jobs are:

- Visible in the admin area under **Operations → Dead-letter queue**.
- Actionable: **Retry** (resets attempts to 0, status to `queued`) or **Cancel** (status to `cancelled`, no further processing).
- Retained for 30 days, then auto-deleted (configurable).

### Action

1. Inspect the dead-lettered job's `lastError`.
2. If the cause is fixed (worker restarted, provider recovered, page accessible again), click **Retry**.
3. If the cause is permanent (prospect's site permanently gone, audit no longer needed), click **Cancel** and add a note.
4. If the cause is unknown, escalate to engineering.

---

## Stuck job

A job is "stuck" if `status = "running"` and `lockedAt < now() - 5 minutes`. The maintenance task (`scripts/audit-recover-stuck-jobs.ts`, run every 5 minutes via cron):

1. Scans for stuck jobs.
2. Resets them to `queued` if `attempts < maxAttempts`.
3. Moves them to `dead_letter` if `attempts >= maxAttempts`.
4. Logs the recovery.

A stuck job does not require manual intervention unless it recurs. If the same job is repeatedly stuck, the worker process is likely crashing on that specific audit — escalate to engineering.

---

## Partial results

An audit that completed with one or more failed runners produces partial results. Partial results are:

- Stored in the database normally.
- Visible in the audit-detail page with the failed categories marked `incomplete`.
- Publishable, with the report showing the `—` for incomplete categories.
- Improvable via partial retry (re-run only the failed runners; merge new findings with existing).

The Auditor decides whether to publish with incomplete categories or to wait for a partial retry. The decision is recorded in the audit's notes.

---

## User notification

When an audit fails or moves to dead-letter:

- The audit's owner (the Auditor or Audit manager who created it) receives an in-app notification: "Audit `<prospect name>` failed. Reason: `<short error>`. View audit."
- If the failure is likely to be visible to a prospect (for example, a report that was promised by a certain date), the owner is also notified by email (if email is configured).
- The prospect is never notified of an audit failure. The agency decides how to communicate with the prospect.

---

## Escalation

| Failure type | Escalation |
|---|---|
| Single-runner failure, retryable | Auditor handles; no escalation |
| Multi-runner failure, retryable | Audit manager handles; no escalation |
| Full-job failure, retryable | Audit manager handles; SEV-3 if not resolved within 4 hours |
| Dead-letter, cause unknown | SEV-3 |
| Repeated stuck jobs | SEV-3 |
| Widespread audit failures (multiple tenants) | SEV-2 — see [`incident-response.md`](incident-response.md) |
| Worker process down for >30 minutes | SEV-2 |
| Data loss suspected | SEV-1 |

---

## Related documents

- [`../architecture/audit-engine.md`](../architecture/audit-engine.md) — engine internals
- [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md) — worker architecture
- [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md) — worker setup
- [`incident-response.md`](incident-response.md) — incident response
- [`provider-outage.md`](provider-outage.md) — provider outage
