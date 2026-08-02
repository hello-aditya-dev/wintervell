# Audit Methodology

WinterVell audits websites across six categories: Technical, SEO, Accessibility, Conversion/UX, Trust & Commercial Readiness, and AI & Search Visibility. Each category has a documented checklist, an evidence model, and a severity convention. The audit engine is modular: each category runs as an independent runner, fails independently, and can be retried without rerunning the whole audit. See [`../architecture/audit-engine.md`](../architecture/audit-engine.md) for the engine internals.

This document is the canonical methodology. It is referenced by the audit worker, the report builder, and the scoring system in [`scoring-methodology.md`](scoring-methodology.md).

---

## Core principle: never fabricate findings

A finding exists only if the audit engine collected concrete evidence for it. The engine does not invent issues to make a report look more impressive, does not pad category scores with speculative problems, and does not present a generic "best practice" as if it were observed on the prospect's site. A category that produced no findings is reported as "no issues observed at this time," not as "perfect." Confidence is recorded per finding and surfaced in the report.

If the engine cannot reach a page, cannot complete a check, or cannot collect evidence, the affected check is marked **incomplete**, the report shows the incomplete state, and the score for the affected category is marked incomplete — see [`scoring-methodology.md`](scoring-methodology.md).

---

## Evidence fields

Every finding stores:

- `category` — one of the six categories below
- `severity` — Critical, High, Medium, Low, Informational
- `confidence` — High, Medium, Low (depends on evidence quality, not on opinion)
- `url` — the page where the finding was observed
- `pageTitle` — page title at observation time
- `selector` — CSS selector or anchor where applicable
- `screenshot` — signed URL to screenshot where applicable (see [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md))
- `rawEvidence` — the raw HTTP response, HTML snippet, header, or metric that supports the finding
- `explanation` — human-readable explanation, written for a non-technical reader
- `businessConsequence` — what the finding means in commercial terms
- `recommendedAction` — the suggested fix
- `estimatedEffort` — Small / Medium / Large / Extra-large
- `suggestedService` — link to a ServiceCatalogueItem where applicable
- `verificationFlag` — whether a human has verified the finding
- `timestamp` — observation time (UTC)
- `toolOrProvider` — which runner or AI provider produced the finding

Findings are editable by Auditors and Audit managers during manual review, but the original automated evidence is preserved as `rawEvidence` and is never overwritten — manual edits are stored as deltas. See [`report-workflow.md`](report-workflow.md).

---

## Audit modes

Four modes trade coverage for time. Each mode defines which categories run, how many pages are crawled, and whether manual expert review is included.

| Mode | Categories | Pages | Manual review | Typical use |
|---|---|---|---|---|
| **Quick** | Technical + SEO (subset) | Homepage + 1 primary page | No | First-touch prospecting; "should we audit deeper?" |
| **Standard** | All six | Homepage + up to ~10 primary pages | Optional | Default sales audit |
| **Comprehensive** | All six | Homepage + up to ~50 pages, includes sitemap discovery | Required before publish | Pre-proposal audit |
| **Manual expert** | Auditor-selected | Auditor-selected | Required | Targeted second-opinion audit on specific pages |

Quick and Standard may produce findings directly. Comprehensive and Manual-expert require human review before the report can be approved — see [`report-workflow.md`](report-workflow.md).

---

## Category 1: Technical

The Technical category assesses whether the site is correctly built, served, and reachable.

| # | Check | Evidence stored |
|---|---|---|
| 1.1 | HTTPS certificate validity and chain | TLS cert chain, issuer, expiry |
| 1.2 | HTTP → HTTPS redirect | Redirect chain, final status |
| 1.3 | Redirect chains and loops | Hop count, intermediate URLs |
| 1.4 | HTTP status codes per crawled page | Status, headers |
| 1.5 | Page-load time (TTFB, FCP, LCP) | Core Web Vitals metrics |
| 1.6 | Core Web Vitals (LCP, CLS, INP) | Lab-measured metrics |
| 1.7 | Mobile responsive rendering | Viewport meta, layout breakpoints |
| 1.8 | Broken internal and external links | Link URL, status, anchor text |
| 1.9 | Missing assets (404 on JS/CSS/images/font) | Asset URL, status |
| 1.10 | JavaScript console errors | Error message, stack |
| 1.11 | HTML structure validity | Validator output |
| 1.12 | Sitemap presence and validity | `/sitemap.xml`, entry count |
| 1.13 | `robots.txt` presence and rules | `/robots.txt`, disallow rules |
| 1.14 | Canonical tag presence and consistency | Canonical URL per page |
| 1.15 | Structured data (schema.org) validity | JSON-LD, type, validation result |
| 1.16 | Image optimization (format, dimensions, lazy-load) | Image URL, format, byte size |
| 1.17 | Caching headers (`Cache-Control`, `ETag`) | Headers per asset |
| 1.18 | Compression (`Content-Encoding`) | Headers per asset |
| 1.19 | Third-party scripts and weight | Script URL, host, byte size |
| 1.20 | Mixed-content (HTTPS page loading HTTP resources) | Resource URL |

---

## Category 2: SEO

The SEO category assesses whether the site is discoverable and well-described for search engines. WinterVell does **not** promise ranking improvements — see [`known-limitations.md`](known-limitations.md).

| # | Check | Evidence stored |
|---|---|---|
| 2.1 | Title tag presence, length, keyword relevance | Title text, length |
| 2.2 | Meta description presence and length | Description text, length |
| 2.3 | Heading structure (H1 uniqueness, hierarchy) | Heading tree per page |
| 2.4 | Indexability (`noindex`, robots) | Meta robots, X-Robots-Tag |
| 2.5 | Canonical correctness | Canonical URL, target status |
| 2.6 | Sitemap coverage of crawled pages | Sitemap entries vs crawled |
| 2.7 | Robots.txt allows primary content | Disallow rules vs crawled URLs |
| 2.8 | Internal link depth and anchor distribution | Link graph |
| 2.9 | Image alt attributes | Alt text per image |
| 2.10 | Schema.org markup coverage | JSON-LD types per page |
| 2.11 | Content depth per primary page | Word count, heading count |
| 2.12 | Local SEO signals (NAP, Google Business Profile link) | NAP consistency |
| 2.13 | Duplicate meta across pages | Duplicate title/description set |
| 2.14 | Open Graph tags | OG tags per page |
| 2.15 | Social preview card validity | OG image, Twitter card |

---

## Category 3: Accessibility

The Accessibility category assesses barriers that affect users of assistive technology. WinterVell does **not** certify WCAG conformance or any legal compliance — see [`known-limitations.md`](known-limitations.md). Findings are automated signals that warrant human review.

| # | Check | Evidence stored |
|---|---|---|
| 3.1 | Form controls missing labels | Selector, label state |
| 3.2 | Images missing alt text | Image URL, alt state |
| 3.3 | Heading order skips (H1 → H3) | Heading tree |
| 3.4 | Keyboard navigability (focus traps, skip links) | Tab order, focus issues |
| 3.5 | Colour contrast ratio per text element | Foreground, background, ratio |
| 3.6 | Form error identification and instructions | Error messages, field references |
| 3.7 | Landmark regions (header, nav, main, footer) | Landmark tree |
| 3.8 | Link text clarity (no "click here") | Link text |
| 3.9 | `<html lang>` declaration | Lang attribute |
| 3.10 | ARIA usage (correct roles, states, properties) | ARIA attributes, validation |

---

## Category 4: Conversion / UX

The Conversion/UX category assesses whether the site is structured to turn visitors into leads or customers. This is a partially heuristic category; findings carry a confidence level and are reviewed by an Auditor before publication.

| # | Check | Evidence stored |
|---|---|---|
| 4.1 | Value proposition clarity above the fold | Screenshot, heading text |
| 4.2 | Primary CTA presence, clarity, repetition | CTA text, count, position |
| 4.3 | Contact options (phone, email, form, chat) | Contact methods found |
| 4.4 | Form friction (field count, required markers, labels) | Form HTML, field count |
| 4.5 | Trust signals (certifications, guarantees, secure badges) | Trust elements |
| 4.6 | Social proof (testimonials, reviews, client logos) | Social proof elements |
| 4.7 | Pricing clarity (visible, structured, comparable) | Pricing section HTML |
| 4.8 | Navigation clarity and depth | Nav tree |
| 4.9 | Mobile usability (tap target size, viewport) | Layout metrics |
| 4.10 | Content hierarchy and scannability | Heading + paragraph structure |
| 4.11 | Readability (sentence length, jargon) | Readability metrics |
| 4.12 | Lead-capture mechanism beyond contact form | Lead magnets, newsletter |
| 4.13 | Objection handling (FAQ, comparison, guarantees) | Objection-handling elements |
| 4.14 | Contact information prominence and accuracy | Contact details, NAP |
| 4.15 | Conversion path length from entry to lead | Click path |

---

## Category 5: Trust & Commercial Readiness

The Trust category assesses whether a visitor would reasonably entrust the business with money or data. This is the category most often skipped by automated tools and most often the difference between a visitor who converts and one who bounces.

| # | Check | Evidence stored |
|---|---|---|
| 5.1 | Company identity (legal name, registration) | Footer, About page |
| 5.2 | Physical address | Address presence, NAP consistency |
| 5.3 | Privacy policy presence and link | Policy URL, last-modified |
| 5.4 | Terms of service presence and link | Terms URL |
| 5.5 | Cookie disclosure / consent mechanism | Cookie banner, consent state |
| 5.6 | Refund / returns information | Policy text |
| 5.7 | Testimonials authenticity (name, company, photo) | Testimonial elements |
| 5.8 | Case studies with verifiable outcomes | Case study elements |
| 5.9 | Certifications and accreditations | Certification marks |
| 5.10 | Security indicators (HTTPS, badges, trust seals) | Security signals |
| 5.11 | Contact credibility (real email, real phone, response channel) | Contact details |
| 5.12 | Social profile links and consistency | Social links |
| 5.13 | Copyright freshness (current year) | Copyright text |
| 5.14 | Brand consistency (logo, colours, tone) | Brand asset snapshot |

---

## Category 6: AI & Search Visibility

The AI-visibility category assesses whether the site's content is structured so that machines — search engines, AI assistants, summarisation models — can correctly interpret it. WinterVell does **not** promise inclusion in AI answer engines or ranking improvements — see [`known-limitations.md`](known-limitations.md).

| # | Check | Evidence stored |
|---|---|---|
| 6.1 | Content clarity for machines (factual sentences, not pure marketing) | Page text |
| 6.2 | Structured factual information (prices, services, locations) | Fact blocks |
| 6.3 | Entity consistency (same NAP, same service names) | Entity comparison |
| 6.4 | Schema.org markup for entities | JSON-LD types |
| 6.5 | FAQ content with question-form headings | FAQ blocks |
| 6.6 | Service descriptions with clear scope | Service copy |
| 6.7 | Original evidence (case studies, data, screenshots) | Evidence blocks |
| 6.8 | Author / company authority signals (about, team, bios) | Author markup |
| 6.9 | Semantic heading structure | Heading tree |
| 6.10 | Crawlable primary content (not behind JS or paywall) | Crawl state per page |

---

## Severity conventions

| Severity | Definition |
|---|---|
| Critical | Site-breaking or security-impacting (broken HTTPS, mixed-content on payment page, broken primary CTA) |
| High | Materially affects ranking, conversion, or trust (missing canonical, missing meta description on primary page, no contact info) |
| Medium | Affects quality or discoverability (heading skip, low-contrast text, missing alt) |
| Low | Minor polish issue (copyright year stale, OG image missing) |
| Informational | Worth knowing, no action required (third-party script count, asset byte size) |

Severity is assigned by the runner that produced the finding and may be overridden by an Auditor during manual review, with a documented reason.

---

## Manual review

Auditors can:

- Mark a finding as a false positive (the original evidence is preserved; the finding is excluded from the client report but retained for audit history).
- Edit the explanation, business consequence, recommended action, estimated effort, and suggested service.
- Add manual findings (for example, something the runner cannot detect but the Auditor observed). Manual findings are tagged as such and are subject to the same evidence-storage rules where possible.
- Approve the report for publication (Audit manager only — see [`user-roles.md`](user-roles.md)).

Manual edits never overwrite the original automated evidence. The history of edits is preserved per finding.

---

## Related documents

- [`../architecture/audit-engine.md`](../architecture/audit-engine.md) — engine architecture
- [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md) — audit worker
- [`scoring-methodology.md`](scoring-methodology.md) — how findings become scores
- [`report-workflow.md`](report-workflow.md) — audit to published report
- [`known-limitations.md`](known-limitations.md) — what the audit does and does not claim
