# Provider Outage

This runbook describes how WinterVell degrades gracefully when an external provider is unavailable. It covers the AI provider, the email provider, and object storage. It is paired with [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md), [`../setup/email-integration.md`](../setup/email-integration.md), and [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md).

---

## General principles

1. **Detect early.** Each provider has a health check; failures alert the on-call engineer.
2. **Degrade, do not break.** A provider outage should not stop the core product. The agency can still create prospects, run audits, review findings, and view reports. The degraded feature (AI-drafted text, outbound email, PDF download) shows a clear notice.
3. **Communicate.** The administrative area shows a non-blocking banner: "<Provider> is currently unavailable. <Feature> is using fallback behaviour."
4. **Recover automatically.** When the provider returns to health, normal behaviour resumes without manual intervention.
5. **Never lose data.** A provider outage never causes data loss. Outbound emails are queued; AI calls are templated; PDF jobs remain in the queue until the worker recovers.

---

## AI provider down

### Detection

- The AI provider abstraction records every call in `AIUsage` with a `status` field. A spike in `error` or `timeout` statuses triggers an alert.
- The provider's status page is monitored (where available).
- A periodic health check (every 5 minutes) pings the provider with a trivial call.

### Response

| Scenario | Behaviour |
|---|---|
| All calls failing | Switch to the **mock provider** for AI-drafted text. Findings get templated explanations. Banner: "AI provider unavailable; explanations are templated. Edit before publishing." |
| Some calls failing (rate-limit, partial outage) | Retry per [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md). After retries, fall back to templated output for the affected call only. |
| Schema-validation failures (provider returning malformed JSON) | Retry with corrective preamble. After retries, fall back to templated output. |
| Usage limit hit (not an outage, but similar UX) | Same as "All calls failing" — templated fallback. Banner: "AI usage limit reached for this period." |

### Recovery

When the health check passes again, the provider is re-enabled. In-flight audits that were using the mock provider continue with the mock provider until the audit completes; new audits use the real provider. A partial retry of an audit (see [`../architecture/audit-engine.md`](../architecture/audit-engine.md)) can be used to regenerate AI-drafted text with the real provider.

### Demo / dev

In demo and development, the mock provider is always in use. A real-provider outage is invisible. See [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md).

---

## Email provider down

### Detection

- The email provider's send endpoint returns an error or times out.
- Bounce/complaint webhook from the provider indicates a configuration problem.
- A periodic health check (every 15 minutes) pings the provider with a no-op.

### Response

- Outbound emails (report share, proposal send, follow-up reminders) are **queued** in a `EmailQueue` table.
- The queue is retried with exponential backoff: 5 min, 15 min, 1 hour, 4 hours, 24 hours.
- After 24 hours, the email is moved to `failed` and the originating user is notified in-app: "Email to <recipient> could not be sent after 24 hours. Please retry or send manually."
- Banner in admin area: "Email provider unavailable. Outbound emails are queued and will be sent when the provider recovers."

### Recovery

When the health check passes, the queue is drained. Queued emails are sent in order. The originating user is notified in-app when a queued email is sent successfully.

### Suppress and bounce handling

- Hard bounces (invalid address) add the recipient to a suppression list. Future attempts to email the address are blocked at the queue with a clear reason.
- Complaints (recipient marked as spam) add the recipient to a suppression list. Future attempts are blocked.
- Soft bounces (mailbox full, temporary failure) are retried per the queue's backoff.

See [`../setup/email-integration.md`](../setup/email-integration.md).

---

## Object storage down

### Detection

- `put`, `get`, or `signedUrl` calls return errors or time out.
- The storage provider's status page is monitored.
- A periodic health check (every 5 minutes) writes and reads a small test object.

### Response

| Capability | Behaviour |
|---|---|
| Audit screenshot upload | Failed uploads are retried (3 attempts). After retries, the audit continues without the screenshot; the finding records `screenshot: null` and a note "screenshot unavailable due to storage outage." |
| PDF generation | PDF jobs remain in the queue. The report is still viewable online; only PDF download is affected. Banner: "PDF generation is temporarily unavailable." |
| Branding image loading | The renderer falls back to WinterVell default branding (or last-known-good cached branding). Banner in admin area: "Branding images could not be loaded; using defaults." |
| Evidence attachment upload | Upload fails with a clear error: "Storage is temporarily unavailable. Please retry." No data is lost; the attachment is not stored. |
| Report share link (existing) | Existing signed URLs may 404 if the underlying object is unreachable. The reader shows a clear error: "Report content is temporarily unavailable. Please try again shortly." |

### Recovery

When the health check passes, normal behaviour resumes. Pending PDF jobs are processed. Failed screenshot uploads can be retried via the audit-detail page (re-crawl the affected page). Branding images load normally.

### Data integrity

Object storage outage does not affect the database. Prospects, audits, findings, reports, and proposals remain intact. Only binary assets (screenshots, PDFs, branding images) are affected.

---

## Database provider down

The database is the most critical dependency. A database outage is a SEV-1 incident — see [`incident-response.md`](incident-response.md).

- The web app returns a generic 500 with a correlation ID.
- The audit and PDF workers pause job processing; queued jobs are not lost.
- NextAuth sessions cannot be validated; users see a login error.
- Recovery is via the database restore procedure in [`backup-restore.md`](backup-restore.md).

---

## Related documents

- [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) — AI provider abstraction
- [`../setup/email-integration.md`](../setup/email-integration.md) — email integration
- [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) — storage architecture
- [`incident-response.md`](incident-response.md) — incident response
- [`backup-restore.md`](backup-restore.md) — database restore
- [`ai-provider-failure.md`](ai-provider-failure.md) — AI provider failure details
