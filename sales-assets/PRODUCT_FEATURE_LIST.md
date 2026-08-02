# WinterVell Product Feature List

> Comprehensive, module-by-module feature inventory for the WinterVell
> AI Website Audit and Agency Sales Platform. This document is buyer-facing
> and reflects the product scope defined in [`docs/SPECIFICATION.md`](../docs/SPECIFICATION.md).
> Implementation status of each module is tracked in [`ROADMAP.md`](../ROADMAP.md)
> and disclosed honestly in [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md).

WinterVell is a focused, white-label website-audit and client-acquisition
platform for web-design agencies, SEO agencies, digital-marketing agencies,
freelance developers, conversion-rate optimization consultants, no-code
agencies, website-maintenance businesses, and managed-service providers.
It connects structured website auditing and CRM activity into one coherent
workflow — from prospect capture, through audit and report, to proposal,
opportunity, and closed client project.

---

## 1. Executive Dashboard

- Agency-wide KPI overview: active prospects, audits in progress, reports
  delivered, proposals outstanding, opportunities by stage, won value.
- Period filters (7 / 30 / 90 / 365 days, custom range).
- Pipeline health indicators with stage-by-stage conversion.
- Report-engagement summary (first-viewed, last-viewed, view count, CTA
  clicks, download activity).
- Recent activity timeline (audit runs, report shares, proposal sends,
  opportunity changes).
- Per-team-member contribution view.
- Empty / loading / error states per the WinterVell design system.

## 2. Prospect CRM

- Prospect capture (manual entry, import, web-form capture).
- Prospect record: contact, company, website, source, owner, status,
  tags, custom fields.
- Website normalization and validation at point of entry.
- Activity history per prospect (calls, emails, meetings, notes, tasks).
- Lead → Prospect → Opportunity → Client lifecycle.
- Bulk import (CSV) with field mapping and de-duplication.
- Quick actions: start audit, create task, schedule follow-up, convert
  to opportunity.
- Duplicate-detection on email and domain.

## 3. Website Audit Creation

- Start audit from prospect website, manual URL, or imported list.
- Audit scope selection (full audit, single category, single page subset).
- Crawl configuration: depth, max pages, include/exclude patterns, robots
  respect toggle.
- Audit worker configuration (headless Chrome recommended).
- Pre-flight validation (URL reachable, SSRF check, response-time budget).
- 12-stage pipeline with per-stage status, retry, and partial-result
  handling.
- Pause / resume / re-run failed stages without re-running the whole audit.
- Audit versioning: each run is stored, comparable, and reproducible.

## 4. Audit Engine (six categories)

### 4.1 Technical
- Core Web Vitals (LCP, INP, CLS) capture.
- Render-blocking resources, unused CSS/JS, large payloads.
- HTTP/2, HTTP/3, compression, caching headers, CDN detection.
- HTTPS validity, certificate chain, mixed content.
- Server response time, TTFB.
- JavaScript error surface, console warnings.

### 4.2 SEO
- Title, meta description, canonical, robots directives.
- Structured data (schema.org) presence and validity.
- Heading hierarchy, image alt text, internal anchor text.
- XML sitemap and robots.txt presence and validity.
- Indexability signals (noindex, canonical chains, redirects).
- Mobile-friendly signals, hreflang coverage.

### 4.3 Accessibility
- Automated checks aligned to WCAG 2.2 AA success criteria
  (color contrast, missing labels, missing alt text, focus order,
  landmark structure, form-field associations, duplicate IDs,
  language attribute, bypass-blocks).
- Findings labelled indicative, not a WCAG certification.

### 4.4 Conversion & UX
- Above-the-fold clarity heuristics, primary CTA presence.
- Form-field count, friction signals, autofill attributes.
- Trust signals (contact details, privacy link, social proof).
- Mobile usability heuristics (tap-target size, viewport).
- Page-speed impact on conversion propensity.

### 4.5 Trust & Commercial Readiness
- Contact information presence and consistency.
- Privacy policy, terms, cookie notice presence.
- Secure payment and checkout indicators (where applicable).
- Business identity signals (address, registration, social profiles).
- Brand consistency across the homepage and key templates.

### 4.6 AI & Search Visibility
- robots.txt and AI-crawler directives (where published).
- Structured data quality as an AI-context signal.
- Content structure and clarity signals for AI summarization.
- llms.txt / ai.txt presence (where published).
- Outdated content freshness indicators.

## 5. Evidence Collection

- Per finding: category, severity, confidence, URL, page title, selector,
  screenshot, raw evidence (truncated HTML / network record / console),
  human-readable explanation, business consequence, recommended action,
  estimated effort, suggested service, verification flag, timestamp,
  tool/provider used.
- Screenshot capture (full-page and viewport).
- Raw-evidence size limits and redaction of obviously sensitive fragments.
- Evidence is never fabricated to make a report look impressive.

## 6. Scoring

- Nine score categories: Overall, Technical, SEO, Accessibility,
  Conversion, Trust, Mobile, Content, AI-visibility.
- Weighted, reproducible, versioned scoring algorithm.
- Confidence-weighted aggregation (incomplete audits are clearly marked).
- Score-change history across audit runs.
- Scores are never presented as objective industry certification.

## 7. Manual Review

- Add / edit / delete findings within an audit.
- Mark findings as false positive, verified, or excluded from the
  client-facing report.
- Reassign severity, confidence, and category during review.
- Add reviewer notes and recommended-action overrides.
- Approval workflow: a finding must be approved before it appears in a
  shared report.

## 8. Report Builder

- Report sections: cover, executive summary, scores, priority issues,
  evidence, business impact, recommendations, quick wins, phased plan,
  suggested services, pricing, agency branding, CTA, disclaimer.
- Section-level enable/disable and reordering.
- Narrative tone selection (advisory, direct, executive).
- Findings selection: include all, only approved, only high-severity.
- Per-finding include/exclude without deleting the underlying finding.
- Live preview before generating the PDF.

## 9. PDF Generation

- Server-side rendering with selectable text (not scanned images).
- Page numbers, running headers and footers, cover page.
- Multi-page tables with row continuation and repeat headers.
- Screenshot embedding with captions and evidence pointers.
- Agency branding (logo, colours, fonts, sender identity).
- PDF/A-friendly defaults for archival where required.
- File-size guardrails with image downscaling.

## 10. Proposal Generator

- Full proposal fields: scope, deliverables, exclusions, assumptions,
  pricing (line items, totals, currency), payment schedule, acceptance
  criteria, signatures.
- Pulls recommended services from the Service Catalogue.
- Pulls phased plan from the Implementation Roadmap.
- Optional engagement letter scaffolding (template, not legal advice).
- Per-proposal pricing overrides and discount controls.
- Output as PDF and as a shareable web proposal.

## 11. Implementation Roadmap

- Phased plan: Immediate / 30 / 60 / 90-day buckets.
- Per item: dependencies, complexity, priority, expected impact, owner.
- Auto-populated from approved audit findings and selected services.
- Editable; agency can add its own engagement-specific items.
- Rendered into the report PDF and the proposal.

## 12. Opportunity Pipeline

- Drag-and-drop pipeline board.
- Twelve pipeline stages (per the WinterVell specification).
- Per-opportunity: value, probability, expected close, owner, source.
- Stage history with timestamps and reason codes.
- Lost-reason capture and won-value recording.
- Conversion-rate reporting per stage and per owner.

## 13. Report Analytics

- Privacy-conscious tracking: first-viewed, last-viewed, view count,
  CTA clicks, proposal clicks, download activity.
- No third-party analytics trackers injected into client-facing reports
  unless the agency explicitly enables them.
- Engagement notifications to the opportunity owner.
- Aggregate engagement metrics in the dashboard.

## 14. Agency White-Labelling

- Agency name, logo, favicon, brand colours, typography.
- Sender identity (from-name, from-email) for shared reports.
- Custom domain for client-facing report and proposal URLs.
- Default disclaimers and footer copy configurable.
- Admin-area attribution per licence tier (see
  [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md)).

## 15. Service Catalogue

- Configurable services with pricing model (fixed, hourly, retainer,
  per-page, value-based), starting price, duration, related findings,
  proposal wording.
- Reusable across audits and proposals.
- Versioned: changes to a service do not retroactively alter past
  proposals that referenced a prior version.

## 16. AI Integration

- Provider abstraction: OpenAI-compatible, Anthropic, and a built-in
  mock provider.
- Bring-your-own-key per organization.
- Model selection per task (summary, finding drafting, proposal wording).
- Token and cost logging per call.
- Retry, timeout, and structured-output validation.
- Prompt versioning and redaction of obviously sensitive input.
- Usage limits per organization and per user.
- The product never implies a real AI provider is connected when the
  mock provider is in use.

## 17. Authentication & Roles

- NextAuth.js v4 authentication (credentials, email magic link, OAuth
  providers as configured).
- Organization / Membership / Team / Invitation / Session model.
- Role-based access control with named permissions per role.
- Per-organization user management and seat accounting.
- Session timeout and re-authentication for sensitive actions.

## 18. Audit Log

- Append-only audit-event store for sensitive actions (login, role
  change, report share, licence change, data export, setting change).
- Per-actor, per-target, per-action queryable history.
- Tamper-evidence via monotonic sequence numbers.
- Configurable retention.

## 19. Demonstration Mode

- Northstar Digital: a fictional demonstration organization with five
  fictional prospects (local healthcare provider, B2B software company,
  property developer, ecommerce retailer, professional-services company).
- Every demo item is clearly labelled as fictional.
- The product never implies a real audit ran, a real payment occurred,
  or a real integration is live when it is not.
- Demo data can be reset to defaults.

---

## Related documents

- [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md) — Hosted vs Agency Source vs Studio.
- [`TECHNICAL_REQUIREMENTS.md`](TECHNICAL_REQUIREMENTS.md) — minimum and recommended specs.
- [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md) — honest limitations.
- [`docs/SPECIFICATION.md`](../docs/SPECIFICATION.md) — full product specification.
- [`../ROADMAP.md`](../ROADMAP.md) — phased delivery status.
