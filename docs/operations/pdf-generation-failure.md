# PDF Generation Failure

This runbook describes how to handle PDF generation failures: rendering errors, large-report handling, font/asset issues, and worker failures. It is paired with [`../architecture/report-rendering.md`](../architecture/report-rendering.md), [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md), and [`../setup/pdf-configuration.md`](../setup/pdf-configuration.md).

---

## Failure modes

| Mode | Symptom | Detection |
|---|---|---|
| Worker crash | PDF job `failed` with worker process gone | Job stuck; `/health` returns error |
| Render timeout | Chromium exceeded the render timeout (default 120 s) | Job `lastError` contains "timeout" |
| Missing font | PDF rendered with default font instead of brand font | Visual inspection; user report |
| Missing asset | PDF rendered with broken image | Visual inspection; user report |
| Large report OOM | Worker process killed by OOM killer | Worker process gone; `dmesg` shows OOM |
| Invalid ReportVersion | ReportVersion references deleted evidence | Job `lastError` contains "not found" |
| Object storage write failure | PDF generated but upload failed | Job `lastError` contains "storage" |

---

## Retry

Default retry policy per [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md):

- 3 attempts.
- Backoff: 60 s, 300 s.
- Retry on: worker crash, render timeout, object-storage write failure, transient errors.
- No retry on: invalid ReportVersion (data issue, not transient).

A job that exhausts retries moves to `dead_letter`. The originating user is notified in-app: "PDF for `<report title>` could not be generated. Please retry or contact support."

---

## Fallback rendering

If the primary render path (Playwright/Chromium) fails repeatedly, the worker can fall back to a simpler render path:

- **Fallback 1**: Playwright with `--no-sandbox` (less secure; used only in trusted environments).
- **Fallback 2**: Headless Chrome via Puppeteer (if installed).
- **Fallback 3**: A minimal PDF generator (e.g. `pdfkit`) that produces a text-only PDF without complex layout. Used only as a last resort to ensure the prospect receives *something*.

Fallback rendering is logged. The fallback PDF is visually inferior (no agency branding, no screenshots, simple typography) but is selectable-text and contains all the report's content. The originating user is notified: "PDF generated with fallback renderer. Some visual elements may be missing."

Fallback rendering is disabled by default and enabled via a feature flag.

---

## Large-report handling

A "large report" is one with:

- More than 100 findings.
- More than 50 screenshots.
- More than 200 pages of rendered output.

Large reports are at risk of:

- Render timeout (Chromium cannot finish in 120 s).
- OOM (Chromium consumes too much memory).
- Object-storage upload failure (PDF exceeds 50 MB).

### Mitigations

1. **Chunked rendering**: the report is split into sections; each section is rendered to a separate PDF; the PDFs are concatenated. This keeps each render under the timeout and under the memory cap.
2. **Screenshot downscaling**: screenshots larger than 2 MB are downscaled to fit within the page before rendering.
3. **Streamed upload**: the PDF is uploaded to object storage as a stream rather than buffered in memory.
4. **Extended timeout**: large reports get a 300 s render timeout instead of 120 s.

Large reports are detected by the worker before rendering (based on the ReportVersion's findings count and screenshot count). The mitigations are applied automatically.

---

## Font and asset issues

### Missing fonts

Bundled fonts (Fraunces, Inter) are loaded from `public/fonts/`. If a font file is missing or corrupt:

- The renderer logs an error.
- The PDF is rendered with a fallback system font (DejaVu Sans on Linux).
- The originating user is notified: "Brand font could not be loaded; PDF rendered with fallback font."

### Missing assets

If a screenshot or branding image referenced by the ReportVersion is no longer in object storage:

- The renderer logs a warning and renders a placeholder ("Image unavailable") in place of the asset.
- The PDF is generated; the placeholder is visible.
- The originating user is notified: "N images were unavailable and replaced with placeholders."

This can happen if object storage retention deleted the asset before the PDF was generated, or if the asset was deleted manually. The audit-detail page shows which assets are missing.

---

## Worker failure

If the PDF worker process is down:

- PDF jobs accumulate in the queue (`status = "queued"`).
- The report is still viewable online (the online reader does not depend on the PDF worker).
- The admin area shows a banner: "PDF generation is temporarily unavailable. Reports are still viewable online."
- The on-call engineer is paged if the queue depth exceeds 50 jobs or the worker has been down for >30 minutes.

### Recovery

1. Restart the PDF worker — see [`../setup/pdf-configuration.md`](../setup/pdf-configuration.md).
2. Verify `/health` returns 200.
3. The worker picks up queued jobs in order.
4. Users who requested PDFs during the outage receive them once the queue drains.

---

## Dead-letter

A PDF job that exhausts retries moves to `dead_letter`:

- Visible in the admin area under **Operations → Dead-letter queue**.
- Actionable: **Retry** or **Cancel**.
- Retained for 30 days.

### Action

1. Inspect the `lastError`.
2. If the cause is fixed (worker restarted, storage recovered), click **Retry**.
3. If the cause is permanent (ReportVersion references deleted data), click **Cancel** and notify the originating user.
4. If the cause is unknown, escalate to engineering.

---

## Escalation

| Failure | Escalation |
|---|---|
| Single PDF failure, retried successfully | No escalation |
| Multiple PDF failures, fallback in use | SEV-3 |
| PDF worker down for >30 minutes | SEV-2 |
| PDF worker down with queue depth >50 | SEV-2 |
| All PDFs rendering with fallback fonts | SEV-3; font asset issue |
| Large-report OOM recurring | SEV-3; worker memory configuration |

---

## Related documents

- [`../architecture/report-rendering.md`](../architecture/report-rendering.md) — rendering pipeline
- [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md) — worker architecture
- [`../setup/pdf-configuration.md`](../setup/pdf-configuration.md) — PDF configuration
- [`provider-outage.md`](provider-outage.md) — object storage outage
- [`incident-response.md`](incident-response.md) — incident response
