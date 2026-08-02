# Product Overview

WinterVell is the AI Website Audit and Agency Sales Platform. It turns any website into a structured audit, a polished client-facing report, a defensible proposal, and a tracked sales opportunity — in one coherent workflow that connects technical analysis to commercial outcomes.

This document explains what WinterVell is, who it is for, the end-to-end workflow, and how it is positioned relative to generic CRM tools. It is non-technical. Architecture and operations are covered in [`docs/architecture/`](../architecture/) and [`docs/operations/`](../operations/).

---

## What WinterVell is

WinterVell is a focused, white-label platform for agencies that sell work by first auditing a prospect's website. The product combines three capabilities that are usually split across separate tools:

1. **A structured website audit engine** — Technical, SEO, Accessibility, Conversion/UX, Trust, and AI-visibility categories, each with a documented checklist and evidence model.
2. **A report and proposal builder** — produces client-facing reports (online share link, PDF, white-labelled, agency-branded) and structured service proposals with editable scope, deliverables, pricing, and signatures.
3. **A sales pipeline** — a twelve-stage opportunity pipeline that converts an approved audit into a tracked deal with estimated value, probability, follow-up tasks, and won/lost reasons.

The connection between these capabilities is the point of the product: an audit is not a dead-end PDF. It is the first event in a sales motion that is tracked, scored, and converted.

---

## Who WinterVell is for

- Web-design agencies
- SEO agencies
- Digital-marketing agencies
- Freelance developers
- Conversion-rate optimization consultants
- No-code agencies
- Website-maintenance businesses
- Managed-service providers

The product assumes the user sells technical or marketing work to clients who own websites but cannot diagnose their own problems. WinterVell does the diagnosis; the agency does the sale.

---

## The fourteen-step workflow

WinterVell moves an agency through one complete workflow per prospect:

1. Capture a prospect
2. Enter or import the prospect's website
3. Run a structured website audit
4. Review technical and commercial findings
5. Generate a polished client-facing report
6. Generate a proposed scope of work
7. Generate an implementation roadmap
8. Create a service proposal
9. Send or share the audit
10. Track report engagement
11. Convert the prospect into an opportunity
12. Manage follow-up tasks
13. Close the opportunity
14. Convert the opportunity into a client project

Steps 3–4 are covered in [`audit-methodology.md`](audit-methodology.md). Step 5 is covered in [`report-workflow.md`](report-workflow.md). Steps 6–8 are covered in [`proposal-workflow.md`](proposal-workflow.md). Steps 11–13 are covered in [`pipeline-workflow.md`](pipeline-workflow.md). Scoring across all of this is defined in [`scoring-methodology.md`](scoring-methodology.md).

---

## Audit categories at a glance

| Category | What it examines |
|---|---|
| Technical | HTTPS, certificates, redirects, HTTP status, page-load, Core Web Vitals, mobile rendering, broken links, missing assets, JS errors, HTML structure, sitemap, robots.txt, canonical, structured data, image optimization, caching, compression, third-party scripts, mixed content |
| SEO | Titles, meta descriptions, headings, indexability, canonical, sitemap, robots, internal links, alt attributes, schema, content depth, local SEO, duplicate meta, Open Graph, social preview |
| Accessibility | Missing labels, alt text, heading structure, keyboard navigation, colour contrast, forms, landmarks, link clarity, language declaration, ARIA |
| Conversion / UX | Value proposition, CTAs, contact options, form friction, trust signals, social proof, pricing clarity, navigation, mobile usability, content hierarchy, readability, lead capture, objection handling, contact info, conversion path |
| Trust & Commercial Readiness | Company identity, address, privacy policy, terms, cookie disclosure, refund info, testimonials, case studies, certifications, security indicators, contact credibility, social profiles, copyright freshness, brand consistency |
| AI & Search Visibility | Content clarity for machines, structured factual info, entity consistency, schema, FAQs, service descriptions, original evidence, author/company authority, semantic headings, crawlable primary content |

WinterVell does **not** certify WCAG compliance and does **not** promise SEO or AI-visibility ranking improvements. Automated findings are indicative, not definitive. See [`known-limitations.md`](known-limitations.md) and [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md).

---

## Positioning vs generic CRM

A generic CRM tracks contacts, deals, and tasks. WinterVell does that, but it also produces the technical evidence that justifies the deal in the first place. The difference matters in three places:

| Concern | Generic CRM | WinterVell |
|---|---|---|
| Where the deal comes from | Manual entry, imported list | A structured audit of the prospect's actual website |
| What the prospect sees | A sales email | A branded, evidence-backed report with scores and recommendations |
| Why the deal closes | Relationship and price | A defensible scope of work tied to specific findings |

WinterVell is not a replacement for a generic CRM. It is the front of the funnel for agencies whose first touch with a prospect is "we audited your site, here is what we found."

---

## Brand qualities

WinterVell's voice across the product and across white-labelled client-facing surfaces is **premium, analytical, calm**. Concretely:

- **Premium** — typography and spacing are deliberate; nothing flashes; nothing screams.
- **Analytical** — every claim is tied to evidence; numbers are sourced; scores are reproducible.
- **Calm** — severity is communicated without panic; recommendations are staged; the user is never pressured.

These qualities also govern how the product talks about itself. WinterVell does not claim compliance it cannot certify, does not promise rankings it cannot deliver, and does not imply integrations that are only mocked. See [`demo-mode-guide.md`](demo-mode-guide.md) for the honest demonstration philosophy.

---

## Configuration and licensing

The product's name, brand colours, fonts, sender identity, default services, default pricing, default report language, and default disclaimers are all defined in [`src/config/product.ts`](../../src/config/product.ts) and overridable per agency via the white-labelling system — see [`white-labelling-guide.md`](white-labelling-guide.md).

WinterVell is **commercial proprietary software** under the WinterVell Commercial Source License (WV-CSL) v1.0 — see [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md). It is not open source. Client-facing reports and proposals may be fully white-labelled; the WinterVell administrative area retains WinterVell attribution according to the purchased tier.

---

## Related documents

- [`user-roles.md`](user-roles.md) — roles and permission matrix
- [`audit-methodology.md`](audit-methodology.md) — categories, checklists, audit modes
- [`scoring-methodology.md`](scoring-methodology.md) — score categories, weighting, versioning
- [`report-workflow.md`](report-workflow.md) — audit to published report
- [`proposal-workflow.md`](proposal-workflow.md) — findings to proposal
- [`pipeline-workflow.md`](pipeline-workflow.md) — twelve-stage opportunity pipeline
- [`white-labelling-guide.md`](white-labelling-guide.md) — agency branding
- [`demo-mode-guide.md`](demo-mode-guide.md) — Northstar Digital demo
- [`known-limitations.md`](known-limitations.md) — what WinterVell does and does not do
