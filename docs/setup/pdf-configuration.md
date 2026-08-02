# PDF Configuration

WinterVell renders reports to PDF server-side using a sandboxed Chromium instance. This guide describes PDF service configuration, fonts, page size, margins, headers/footers, agency branding injection, and large-report handling.

It is paired with [`../architecture/report-rendering.md`](../architecture/report-rendering.md), [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md), and [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md).

---

## Architecture

The PDF worker (see [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md)):

1. Picks up a PDF job from the `Job` table.
2. Loads the `ReportVersion` and the agency's branding.
3. Renders the report to HTML using the same React renderer as the online reader.
4. Opens a sandboxed Chromium instance (Playwright).
5. Sets page size, margins, header (agency logo + report title), footer (page number + agency URL + confidentiality notice).
6. Injects the agency's brand fonts (bundled locally; no web-font fetches during rendering).
7. Renders multi-page tables with repeating headers.
8. Renders screenshots at full resolution, scaled to fit the page width.
9. Saves the PDF to object storage.
10. Returns a signed URL.

The PDF has selectable text (it is not a rasterised image). Page numbers are in the footer. The agency logo is in the header.

---

## Configuration

| Env var | Default | Purpose |
|---|---|---|
| `PDF_RENDER_TIMEOUT_MS` | `120000` (2 min) | Render timeout per PDF |
| `PDF_LARGE_REPORT_THRESHOLD_FINDINGS` | `100` | Findings count above which large-report mitigations apply |
| `PDF_LARGE_REPORT_THRESHOLD_PAGES` | `200` | Page count above which large-report mitigations apply |
| `PDF_LARGE_REPORT_RENDER_TIMEOUT_MS` | `300000` (5 min) | Render timeout for large reports |
| `PDF_FONT_HEADING` | bundled Fraunces | Heading font file path |
| `PDF_FONT_BODY` | bundled Inter | Body font file path |
| `PDF_PAGE_SIZE` | `A4` | Page size (`A4`, `Letter`, `Legal`) |
| `WORKER_PDF_PORT` | `3003` | PDF worker port |
| `WORKER_PDF_CONCURRENCY` | `1` | Concurrent PDFs per worker |

See [`environment-variables.md`](environment-variables.md) for the full list.

---

## Fonts

WinterVell bundles Fraunces (heading) and Inter (body). Both are SIL Open Font Licence, which permits bundling and redistribution. See [`../legal/ASSET_RIGHTS_REGISTER.md`](../legal/ASSET_RIGHTS_REGISTER.md) for font licensing.

Bundled fonts live in `public/fonts/`:

```
public/fonts/
├── Fraunces-Variable.woff2
├── Inter-Variable.woff2
└── OFL-*.txt              # licence files
```

### Custom fonts

An agency may override the fonts with their own bundled fonts:

1. Place the font files in `public/fonts/`.
2. Set `PDF_FONT_HEADING` and `PDF_FONT_BODY` to the absolute paths.
3. Ensure the agency has the right to bundle the fonts (OFL, Apache, MIT — not proprietary fonts without a licence).

Web fonts loaded from third-party CDNs are **not** used during PDF rendering. They introduce network requests during rendering (slow, fragile, and a privacy concern — the CDN sees the report content). All fonts must be local.

### Font fallback

If a configured font file is missing or corrupt, the renderer falls back to the system font (DejaVu Sans on Linux) and logs a warning. The PDF is generated with the fallback font; the originating user is notified "Brand font could not be loaded; PDF rendered with fallback font."

---

## Page size, margins, headers, footers

Default page setup:

| Setting | Default |
|---|---|
| Page size | A4 (210 × 297 mm) |
| Margins | top 20mm, bottom 25mm, left 18mm, right 18mm |
| Header | Agency logo (left) + report title (right); 10mm from top |
| Footer | Page number (center) + agency URL (left) + confidentiality notice (right); 10mm from bottom |

These are configurable per-agency via the branding configuration:

- **Page size**: A4 (default), Letter (US), Legal.
- **Margins**: not currently per-agency configurable; env-var only.
- **Header content**: agency logo + report title. The logo comes from the branding; the title comes from the `ReportVersion`.
- **Footer content**: page number (always), agency URL (always), confidentiality notice (always). The confidentiality notice text is editable but the substantive claim ("this report contains confidential information") is fixed.

Page numbers are formatted as "Page X of Y" in the footer.

---

## Agency branding injection

Branding is injected at render time from the agency's `Branding` record (see [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md)):

- **Logo**: rendered in the cover page (large) and in the header of each subsequent page (small). Both light and dark variants are used depending on the page background.
- **Brand colours**: applied via CSS custom properties; affect headings, accents, severity badges, and chart colours. Severity colours are fixed (red/orange/amber/blue/grey) and not overridden.
- **Fonts**: heading and body, from bundled fonts.
- **Sender identity, terms URL, privacy URL, address, contact details**: in the agency-information section.
- **Disclaimer text**: rewordable, but substantive claims are fixed.

Branding is cached per-organisation. A branding change does not retroactively alter published `ReportVersion`s — the renderer re-renders on each view, but the underlying findings and scores are immutable. See [`../architecture/report-rendering.md`](../architecture/report-rendering.md).

---

## Multi-page tables and screenshots

### Tables

Long tables (priority issues, recommendations, phased plan) span multiple pages. The renderer:

- Repeats the table header on each page.
- Avoids row splitting across pages (a row is moved to the next page if it doesn't fit).
- Alternates row background for readability.

### Screenshots

Screenshots are rendered at full resolution, scaled to fit the page width. If a screenshot is taller than the page, it spans multiple pages with a "continued" indicator. Screenshots larger than 2 MB are downscaled before rendering (see large-report handling below).

The screenshot's caption (URL, selector, timestamp) is rendered above the image.

---

## Large-report handling

A "large report" is detected before rendering based on the `ReportVersion`'s findings count and screenshot count. If above the thresholds (`PDF_LARGE_REPORT_THRESHOLD_FINDINGS`, `PDF_LARGE_REPORT_THRESHOLD_PAGES`), the worker applies mitigations:

1. **Chunked rendering**: the report is split into sections; each section is rendered to a separate PDF; the PDFs are concatenated. This keeps each render under the timeout and under the memory cap.
2. **Screenshot downscaling**: screenshots larger than 2 MB are downscaled to fit within the page before rendering.
3. **Streamed upload**: the PDF is uploaded to object storage as a stream rather than buffered in memory.
4. **Extended timeout**: the render timeout is raised to `PDF_LARGE_REPORT_RENDER_TIMEOUT_MS` (default 5 min).

These mitigations are automatic. The originating user is not notified unless a mitigation fails (in which case the PDF job fails and is retried — see [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md)).

---

## Production setup

### Run the PDF worker

Same patterns as the audit worker — see [`audit-worker-setup.md`](audit-worker-setup.md). The PDF worker is a separate process:

```bash
bun run worker:pdf
```

### Install Playwright

```bash
bunx playwright install --with-deps chromium
```

Required for the PDF worker (it uses Chromium to render).

### Resource sizing

The PDF worker is CPU- and memory-bound:

- A 2 vCPU / 4 GB machine handles 1 concurrent PDF comfortably (default `WORKER_PDF_CONCURRENCY=1`).
- For higher throughput, run multiple worker processes (horizontal scaling) rather than increasing concurrency (Playwright is memory-heavy).

### Health and metrics

| Endpoint | Purpose |
|---|---|
| `GET /health` (port 3003) | Worker health |
| `GET /metrics` (port 3003) | Prometheus metrics: PDFs generated, failures, average render time, queue depth |

Alert on:

- `pdfs_failed_total` increasing.
- `average_render_time_seconds` increasing (Chromium degrading, or fonts/assets missing).
- `/health` returning non-200 (worker down).
- Queue depth > 50 (worker saturated; user-visible PDF delay).

---

## Testing

After setup, test PDF generation:

1. Create a test audit (or use a demo audit).
2. Approve a report version.
3. From the report-detail page, click **Download PDF**.
4. The PDF worker picks up the job, renders the PDF, and returns a signed URL.
5. The browser downloads the PDF.
6. Verify:
   - The PDF opens in a PDF reader.
   - Text is selectable (not rasterised).
   - Page numbers are in the footer.
   - The agency logo is in the header.
   - Brand colours and fonts are applied.
   - Tables span multiple pages with repeating headers.
   - Screenshots are visible.

If any check fails, see [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md).

---

## Related documents

- [`../architecture/report-rendering.md`](../architecture/report-rendering.md) — rendering pipeline
- [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md) — worker architecture
- [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md) — failure runbook
- [`../product/report-workflow.md`](../product/report-workflow.md) — report workflow
- [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md) — branding
- [`audit-worker-setup.md`](audit-worker-setup.md) — audit worker (similar setup)
- [`environment-variables.md`](environment-variables.md) — env var reference
