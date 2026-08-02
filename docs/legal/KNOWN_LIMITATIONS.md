# Known Limitations

This document is an honest statement of what is and is not implemented in WinterVell at the foundation release. It exists so that buyers, Licensees, and reviewers can make informed decisions without over-reading the product's claims. Where the documentation uses words like "supports", "implements", or "provides" for a feature listed here as **not** implemented, the documentation is wrong and should be reported.

The corresponding roadmap for what is in progress is in [`ROADMAP.md`](../../ROADMAP.md). The full product specification is in [`docs/SPECIFICATION.md`](../SPECIFICATION.md).

---

## 1. What is implemented in the foundation release

The foundation release establishes a commercially-defensible repository, legal, and documentation scaffold. The following are **done**:

- Fresh Git history with WinterVell branding.
- Proprietary licence: WinterVell Commercial Source License (WV-CSL) v1.0 — see [`LICENSE`](../../LICENSE).
- Provenance documentation: [`PROVENANCE.md`](PROVENANCE.md).
- Legal package: this directory, [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md), [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md), [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md), [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md), [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md), [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md), [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md), [`SALE_DUE_DILIGENCE_CHECKLIST.md`](SALE_DUE_DILIGENCE_CHECKLIST.md), [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md), [`BUYER_HANDOVER_CHECKLIST.md`](BUYER_HANDOVER_CHECKLIST.md), [`brand-clearance-notes.md`](brand-clearance-notes.md), [`EULA_TEMPLATE.md`](EULA_TEMPLATE.md), [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md).
- Source conversion audit: [`docs/audit/cloudsun-to-wintervell-conversion-audit.md`](../audit/cloudsun-to-wintervell-conversion-audit.md).
- Product, architecture, operations, setup documentation scaffolds (in their respective `docs/` subdirectories).
- Sales-assets package scaffold.
- Central product configuration: `src/config/product.ts`.
- Environment template: `.env.example`.
- CI/CD workflow: `.github/workflows/`.
- Inherited foundation (from Cloudsun): Next.js 16 App Router, Prisma ORM, NextAuth v4 authentication, multi-tenant model, RBAC patterns, REST API convention under `/api/v1/*`, shadcn/ui component library, application shell, demo-data store patterns.

---

## 2. What is in progress (not yet fully implemented)

The full eighteen-module product is defined in [`docs/SPECIFICATION.md`](../SPECIFICATION.md) and tracked in [`ROADMAP.md`](../../ROADMAP.md). The following modules are **in progress** and are not represented as complete:

| Module | Status |
|---|---|
| Audit engine (Technical, SEO, Accessibility, Conversion/UX, Trust, AI-visibility categories) | In progress |
| Evidence model (full schema with all listed fields) | In progress |
| Transparent scoring (reproducible, weighted, versioned, nine categories) | In progress |
| Manual review workflow (add/edit findings, false-positive marking, verification, exclude-from-client-report, approval gate) | In progress |
| Report builder (cover, executive summary, scores, priority issues, evidence, business impact, recommendations, quick wins, phases, suggested services, pricing, agency branding, CTA, disclaimer) | In progress |
| PDF generation (selectable text, page numbers, agency branding, multi-page tables and screenshots) | In progress |
| Proposal generator (scope, deliverables, exclusions, assumptions, pricing, payment schedule, acceptance criteria, signatures) | In progress |
| Implementation roadmap (immediate / 30 / 60 / 90-day plans with dependencies, complexity, priority, expected impact) | In progress |
| Opportunity pipeline (drag-and-drop, twelve stages, stage history, probability, expected close, lost reason, won value) | In progress |
| Report analytics (privacy-conscious first-viewed, last-viewed, view count, CTA clicks, proposal clicks, download activity) | In progress |
| Agency white-labelling (name, logo, favicon, brand colours, fonts, sender identity, custom domain) | In progress |
| Service catalogue (configurable services with pricing model, starting price, duration, related findings, proposal wording) | In progress |
| AI provider abstraction (OpenAI-compatible, Anthropic, mock, BYO key, model selection, token/cost logging, retry, timeout, structured-output validation, prompt versioning, redaction, usage limits) | In progress |
| Commercial licensing system (Hosted, Agency Source, Studio tiers with graceful validation) | In progress |
| SSRF protection (block-list, redirect re-validation, DNS-rebinding defence, size/time limits, isolated worker) | In progress |
| WinterVell design system (colour tokens, typography, spacing, density, severity system, chart conventions, empty/loading/error states, motion guidelines) | In progress |

---

## 3. Automated findings

- WinterVell performs **automated** website analysis.
- Automated findings are **indicative, not definitive**.
- A finding flagged "high severity" by an automated check is a prompt for human review, not a final verdict.
- Findings may include false positives. The manual-review workflow allows the Agency user to mark findings as false positives and exclude them from client reports.
- WinterVell does **not** certify:
  - WCAG (Web Content Accessibility Guidelines) compliance.
  - Legal compliance of any kind.
  - SEO ranking improvements.
  - AI-visibility ranking improvements.
- WinterVell does **not** constitute legal, financial, or professional advice.

---

## 4. Certifications and guarantees WinterVell does NOT make

- WinterVell does **not** claim "full legal compliance" with any specific framework (GDPR, CCPA, SOC 2, ISO 27001, HIPAA, etc.) without a separate audit.
- WinterVell does **not** claim "perfect security" or "guaranteed protection" against any threat.
- WinterVell does **not** guarantee SEO ranking improvements.
- WinterVell does **not** guarantee AI-visibility ranking improvements.
- WinterVell does **not** certify WCAG compliance.
- WinterVell does **not** warrant that automated findings are free of false positives.
- WinterVell does **not** warrant that AI outputs are free of errors or prompt-injection effects.
- WinterVell does **not** warrant that the SSRF defence eliminates all SSRF risk.

---

## 5. Legal documents

- All documents in [`docs/legal/`](.) are **templates**.
- Templates must be reviewed and finalised by a qualified lawyer in the Licensor's jurisdiction before commercial distribution.
- The WV-CSL and EULA template include bracketed `[...]` fields that must be completed.
- The privacy notice template must be tailored to the Licensee's actual configuration and jurisdiction.
- The data-processing overview's sub-processor table must be completed by the Licensee.
- Trademark clearance for "WinterVell" is preliminary and informal — see [`brand-clearance-notes.md`](brand-clearance-notes.md).

---

## 6. Demo data

- The "Northstar Digital" demo org and its five fictional prospects (local healthcare provider, B2B software company, property developer, ecommerce retailer, professional-services company) are **fictional**.
- Any resemblance to real entities is coincidental and should be reported for replacement.
- Demo mode uses the **Mock** AI provider, which is clearly labelled in the UI: "Mock provider — no real AI call made."
- Demo mode does not imply a real audit ran, a real payment occurred, or a production integration is operational.

---

## 7. Mock integrations

- The Mock AI provider returns deterministic, clearly-fictional content.
- Other integrations (email, storage, payment) may be configured as mock or live; the configuration is visible to the Agency admin.
- Mock integrations are labelled in the UI.

---

## 8. Database

- **SQLite** is for **local development only**. See [`README.md`](../../README.md).
- **PostgreSQL** is the production database.
- Production deployments must not use SQLite.

---

## 9. AI provider SDK licence verification

- The `z-ai-web-dev-sdk` package is used as the default demo/mock AI provider behind the provider abstraction.
- Its licence file is present in the installed package, but redistribution terms require confirmation with the maintainer.
- Until verification is complete, WinterVell does **not** vendor or redistribute the SDK beyond standard `bun install`.
- See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md).

---

## 10. Trademark

- Formal trademark clearance for "WinterVell" has **not** been completed.
- [`brand-clearance-notes.md`](brand-clearance-notes.md) records a preliminary, informal review.
- Formal clearance via USPTO / EUIPO / India IPO search by a trademark attorney is recommended before major commercial investment.
- Domain availability (`wintervell.com`, `.io`, `.app`) should be confirmed.

---

## 11. Contributor IP

- The Cloudsun contributor history includes `hello-aditya-dev` (2 contributions).
- The relationship between `hello-aditya-dev` and `witejackel-eng` (work-for-hire / contractor / employee / volunteer) and the IP-assignment status of those contributions should be clarified during buyer due diligence.
- See [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md).

---

## 12. Security items still planned

The following security items are planned but not in the foundation release (see [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Section 24):

- Strict Content-Security-Policy with per-page allow-lists (baseline headers in place).
- Multi-factor authentication.
- Breach-password check on signup/reset.
- Per-organisation outbound-fetch allow-list.
- External write-once audit-log forwarding.

---

## 13. What is NOT in the foundation release (and is not claimed to be)

- A production-ready, customer-facing audit engine (in progress).
- A production-ready PDF generator (in progress).
- A production-ready proposal generator (in progress).
- A production-ready pipeline (in progress).
- A production-ready white-labelling system (in progress).
- A production-ready AI provider abstraction with all listed features (in progress).
- A production-ready licensing system (in progress).
- A formal security audit (SOC 2, ISO 27001, or equivalent).
- A formal accessibility audit (VPAT, WCAG 2.2 conformance report).
- A formal privacy impact assessment.
- A formal trademark registration.
- Customer references (the product is pre-launch).

---

## 14. Honesty policy

- Documentation does **not** claim features that are not implemented.
- Documentation does **not** claim "full compliance", "perfect security", "guaranteed SEO", "WCAG certification", or similar absolute claims.
- Where a feature is in progress, the documentation says so and links to [`ROADMAP.md`](../../ROADMAP.md).
- Where a claim is uncertain, the documentation says so and points to the relevant review document.
- Where review is incomplete, the gap is recorded here rather than hidden.

---

*This document is part of the WinterVell legal package. It is maintained for accuracy but is **not legal advice**.*
