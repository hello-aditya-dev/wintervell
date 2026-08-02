# Known Limitations (Product-Facing)

WinterVell is honest about what it does and does not do. This document is the product-facing summary; the engineering- and legal-facing summary is in [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md). The two documents are intentionally separate because the audiences are different: this one is for users, sales representatives, and prospects reading a report; the legal one is for engineers, buyers, and auditors.

---

## What WinterVell does

WinterVell performs **automated** website analysis across six categories (Technical, SEO, Accessibility, Conversion/UX, Trust, AI-visibility), produces a structured report with evidence-backed findings, generates a proposal draft, and tracks the prospect through a twelve-stage pipeline. The audit engine is modular and reproducible; the scoring is weighted, versioned, and explainable; the report is white-labelled and shareable; the proposal is fully editable.

---

## What WinterVell does not do

### Automated findings are indicative, not definitive

A WinterVell finding is a signal that something was observed on the prospect's site at the time of the audit. It is not a definitive statement that the issue exists in the same form forever, nor that the issue affects the prospect's business in a specific way. Findings are reviewed by a human Auditor before publication; the Auditor's edits are preserved alongside the automated evidence.

### No WCAG certification

WinterVell is **not** a WCAG conformance assessment. The Accessibility category produces automated signals (missing alt text, low-contrast text, heading skips, missing form labels, etc.) that warrant human review. It does not certify conformance with WCAG 2.1, 2.2, or any other accessibility standard. It does not constitute a VPAT, an accessibility statement, or a legal compliance attestation. An agency that needs to certify WCAG conformance should engage a qualified accessibility auditor.

### No SEO ranking guarantee

WinterVell does **not** promise that fixing the findings in an audit will improve the prospect's search rankings. Search ranking is determined by factors outside WinterVell's observation (competitor activity, query intent, algorithm updates, link profile, search-history personalisation, geographic context). WinterVell identifies issues that are commonly associated with poor search performance; fixing them is necessary-but-not-sufficient for improvement.

### No AI-visibility ranking guarantee

WinterVell does **not** promise that fixing the findings in an audit will cause the prospect's content to appear in AI answer engines (Google AI Overviews, Bing Copilot, ChatGPT search, Perplexity, etc.). AI-visibility is determined by factors outside WinterVell's observation, and the AI-answer-engine landscape is volatile. WinterVell identifies issues that make content easier for machines to interpret; fixing them is necessary-but-not-sufficient for inclusion.

### No legal advice

WinterVell is **not** legal advice. The Trust category surfaces the presence or absence of common legal-adjacent artifacts (privacy policy, terms, cookie disclosure, refund info). It does not assess whether those artifacts are legally adequate for the prospect's jurisdiction, industry, or business model. An agency that needs legal review should engage a qualified lawyer.

### No security penetration test

WinterVell is **not** a security assessment. The Technical category surfaces common security-adjacent issues (HTTPS validity, mixed content, exposed version strings, missing security headers). It does not perform penetration testing, vulnerability scanning, or exploit verification. An agency that needs security review should engage a qualified security firm.

### No real-time monitoring

WinterVell audits a site at a point in time. It does not continuously monitor the site for regressions. A site audited on Monday can have new issues on Tuesday that are not in the report. Continuous monitoring is a future capability, not a current one — see [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md).

---

## Product-specific limitations

### Complex audit editing is desktop-optimised

The audit-review interface (editing findings, viewing evidence, comparing screenshots, managing report sections) is optimised for desktop screens. It is usable on tablet and mobile but not ergonomic. The report **reader** is fully responsive — prospects can read reports on any device. The administrative area is best used on a desktop; mobile is supported for read-only and quick-edit operations only.

### Manual-expert mode requires auditor availability

Manual-expert mode (see [`audit-methodology.md`](audit-methodology.md)) depends on a human Auditor selecting pages and writing findings. It is not faster than other modes; it is more targeted. An agency without an Auditor on staff should not use Manual-expert mode.

### AI-assisted text generation depends on a configured provider

Where WinterVell uses an AI provider to draft explanations, business consequences, or recommendations, the quality and tone of the output depend on the configured provider and model. If the mock provider is in use (default in development and demo), the output is canned and not representative of a real provider's quality. See [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md).

### Custom domains require DNS control

Per-agency custom domains (see [`white-labelling-guide.md`](white-labelling-guide.md)) require the agency to control DNS for the domain. WinterVell cannot provision a custom domain on behalf of an agency that does not own the domain.

### Report share links have a maximum view cap

A share link's `maxViews` field is capped at a sane maximum to prevent inflating view counts and to limit the blast radius of a leaked link. An agency that needs a higher cap should contact support — the cap is configurable per tier.

### Proposal signatures are lightweight

Proposal acceptance in WinterVell is captured via typed-name + checkbox confirmation, with timestamp, IP, and user-agent. This is sufficient for many commercial contexts but is not a substitute for a wet signature or a qualified-electronic-signature workflow in regulated jurisdictions. Agencies in regulated jurisdictions should attach a separately-signed contract — see [`proposal-workflow.md`](proposal-workflow.md).

---

## What WinterVell is not yet

The foundation release of WinterVell is the documentation, legal, and configuration scaffold plus the inherited Cloudsun architecture. The full eighteen-module product (audit engine, report builder, PDF generation, proposal generator, pipeline, white-labelling, AI provider abstraction, licensing system) is tracked in `ROADMAP.md`. What is and is not yet implemented in code is recorded in [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md), not here, because that document is the engineering source of truth and this document is the product-facing summary.

---

## Related documents

- [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md) — engineering-facing limitations
- [`audit-methodology.md`](audit-methodology.md) — what the audit does
- [`scoring-methodology.md`](scoring-methodology.md) — what scoring does and does not claim
- [`report-workflow.md`](report-workflow.md) — what the report contains
- [`proposal-workflow.md`](proposal-workflow.md) — what the proposal may and may not contain
- [`demo-mode-guide.md`](demo-mode-guide.md) — what the demo does and does not imply
