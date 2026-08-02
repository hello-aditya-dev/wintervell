# WinterVell

**AI Website Audit and Agency Sales Platform.**

> Turn any website into a professional audit, proposal, and sales opportunity.

WinterVell is a focused, white-label website-audit and client-acquisition platform for web-design agencies, SEO agencies, digital-marketing agencies, freelance developers, conversion-rate optimization consultants, no-code agencies, website-maintenance businesses, and managed-service providers. It connects structured website auditing and CRM activity into one coherent workflow — from prospect capture, through audit and report, to proposal, opportunity, and closed client project.

---

## Status

**Foundation release — commercially-defensible repository, legal, and documentation scaffold.**

This repository is the independent, privately-owned successor to the owner's earlier Cloudsun CRM codebase. It has its own fresh Git history, its own proprietary licence, and its own product definition. The full eighteen-module product (audit engine, report builder, PDF generation, proposal generator, pipeline, white-labelling, AI provider abstraction, licensing system) is defined in [`docs/SPECIFICATION.md`](docs/SPECIFICATION.md) and tracked in [`ROADMAP.md`](ROADMAP.md).

| Area | State |
|---|---|
| Repository, branding, fresh history | Done |
| Proprietary licence (`LICENSE`) | Done |
| Provenance & legal documentation (`docs/legal/`) | Done |
| Source conversion audit (`docs/audit/`) | Done |
| Product, architecture, operations, setup docs | Done |
| Sales package (`sales-assets/`) | Done |
| Central product configuration (`src/config/product.ts`) | Done |
| Environment template (`.env.example`) | Done |
| CI/CD workflow (`.github/workflows/`) | Done |
| Audit engine, report builder, PDF, proposal, pipeline implementation | In progress — see `ROADMAP.md` |

See [`docs/legal/KNOWN_LIMITATIONS.md`](docs/legal/KNOWN_LIMITATIONS.md) for an honest statement of what is and is not yet implemented.

---

## What WinterVell does

WinterVell moves an agency through one complete workflow:

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

### Audit categories

Technical · SEO · Accessibility · Conversion & UX · Trust & Commercial Readiness · AI & Search Visibility.

Every automated finding stores category, severity, confidence, URL, page title, selector, screenshot, raw evidence, human-readable explanation, business consequence, recommended action, estimated effort, suggested service, verification flag, timestamp, and the tool/provider used. Findings are never fabricated to make a report look impressive.

### Scoring

Transparent, reproducible, weighted, versioned scoring across Overall, Technical, SEO, Accessibility, Conversion, Trust, Mobile, Content, and AI-visibility. Scores are clearly marked when incomplete and are never presented as objective industry certification.

---

## Provenance

WinterVell began as an authorized internal derivative of the owner's Cloudsun CRM. The exact source snapshot and the systems inherited are recorded in [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md). The Cloudsun repository is treated as **read-only source material** and is not modified by this project.

- **Source repository:** `witejackel-eng/cloudsun`
- **Source commit used:** `e3879a4c232680e59e0937828b69d969e3b65b69` (2026-07-31)
- **Conversion audit:** [`docs/audit/cloudsun-to-wintervell-conversion-audit.md`](docs/audit/cloudsun-to-wintervell-conversion-audit.md)

---

## Licensing — this is NOT open source

WinterVell is **commercial proprietary software**. The source code, documentation, and design assets are governed by the **WinterVell Commercial Source License (WV-CSL) v1.0** in [`LICENSE`](LICENSE).

By obtaining, viewing, cloning, building, running, modifying, or distributing the software in any form, you agree to be bound by the WV-CSL. Key points:

- You may **not** redistribute, resell, or publicly publish the source code.
- You may **not** apply a copyleft or open-source licence to any derivative.
- Client-facing reports and proposals **may** be fully white-labelled.
- Internal modification for your own agency business **is** permitted under the Agency Source Licence.
- The administrative area retains WinterVell attribution according to the purchased tier.

Commercial tiers (Hosted, Agency Source, Studio) are described in [`docs/legal/COMMERCIAL_LICENSE.md`](docs/legal/COMMERCIAL_LICENSE.md). For licence and purchasing enquiries, see [`SUPPORT.md`](SUPPORT.md).

Third-party open-source components remain governed by their own licences — see [`docs/legal/THIRD_PARTY_NOTICES.md`](docs/legal/THIRD_PARTY_NOTICES.md) and [`docs/legal/DEPENDENCY_LICENSE_REPORT.md`](docs/legal/DEPENDENCY_LICENSE_REPORT.md).

---

## Technology stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York) + Lucide icons
- **Database:** PostgreSQL for production (Prisma ORM); SQLite for local development
- **Auth:** NextAuth.js v4
- **State:** Zustand (client) + TanStack Query (server)
- **AI:** Provider abstraction (OpenAI-compatible, Anthropic, mock) — see `docs/architecture/ai-provider-abstraction.md`
- **PDF:** Server-side rendering with selectable text and page numbers
- **Realtime:** Socket.io mini-service where required
- **Deployment:** Vercel (separate project from Cloudsun)

---

## Quick start

```bash
# 1. Install dependencies
bun install

# 2. Configure environment
cp .env.example .env
#   edit .env — at minimum set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# 3. Prepare the database
bun run db:push

# 4. Start the dev server
bun run dev
```

The app runs on `http://localhost:3000`. Full setup instructions, including AI provider configuration, audit-worker setup, PDF configuration, and custom-domain setup, are in [`docs/setup/`](docs/setup/).

---

## Repository layout

```
.
├── LICENSE                         WinterVell Commercial Source License (WV-CSL) v1.0
├── README.md                       This file
├── ROADMAP.md                      Phased delivery roadmap
├── SECURITY.md                     Security policy and reporting
├── CONTRIBUTING.md                 Contribution rules (mostly N/A — proprietary)
├── CODE_OF_CONDUCT.md              Community conduct
├── SUPPORT.md                      Support and commercial contact
├── CHANGELOG.md                    Release history
├── .env.example                    Annotated environment template
├── docs/
│   ├── SPECIFICATION.md            Full WinterVell Product Conversion Specification
│   ├── source/                     Original specification document (.docx)
│   ├── legal/                      Provenance, licences, disclosures, checklists
│   ├── audit/                      Cloudsun → WinterVell conversion audit
│   ├── product/                    Product overview, roles, methodologies, workflows
│   ├── architecture/               System, data model, tenancy, security, licence
│   ├── operations/                 Backup, incident response, failure handling
│   └── setup/                      Local, production, Vercel, DB, AI, PDF, domains
├── sales-assets/                   Buyer-facing commercial package
├── src/config/product.ts           Central product configuration
├── sbom.json                       Software bill of materials (seed)
└── .github/workflows/              CI (lint, type-check, build, security)
```

---

## Security

WinterVell accepts user-provided website URLs, so **SSRF prevention is mandatory**. The security model, including the full SSRF block-list, IDOR/tenant-isolation, rate limiting, and prompt-injection boundaries, is documented in [`docs/architecture/security-model.md`](docs/architecture/security-model.md) and [`docs/legal/SECURITY_DISCLOSURE.md`](docs/legal/SECURITY_DISCLOSURE.md). Report security vulnerabilities via [`SECURITY.md`](SECURITY.md).

---

## Demonstration mode

WinterVell ships an **honest** demonstration mode: example prospects, audits, proposals, and pipeline data, every item clearly labelled as fictional. The software never implies that a real audit ran when it did not, that a real payment occurred, that a real AI provider is connected, or that a production integration is operational. See [`docs/product/demo-mode-guide.md`](docs/product/demo-mode-guide.md).

---

## Commercial demo

A polished demo organisation — **Northstar Digital** — with five fictional prospects (local healthcare provider, B2B software company, property developer, ecommerce retailer, professional-services company) is defined in [`docs/product/demo-mode-guide.md`](docs/product/demo-mode-guide.md).

---

## Documentation index

- **Legal:** [`docs/legal/`](docs/legal/)
- **Audit:** [`docs/audit/cloudsun-to-wintervell-conversion-audit.md`](docs/audit/cloudsun-to-wintervell-conversion-audit.md)
- **Product:** [`docs/product/`](docs/product/)
- **Architecture:** [`docs/architecture/`](docs/architecture/)
- **Operations:** [`docs/operations/`](docs/operations/)
- **Setup:** [`docs/setup/`](docs/setup/)
- **Sales:** [`sales-assets/`](sales-assets/)

---

## Important notices

- WinterVell performs **automated** website analysis. Automated findings are indicative, not definitive.
- WinterVell does **not** certify WCAG or legal compliance, does **not** guarantee SEO or AI-visibility ranking improvements, and does **not** constitute legal advice.
- Formal trademark clearance for the "WinterVell" name should be completed before major commercial investment — see [`docs/legal/brand-clearance-notes.md`](docs/legal/brand-clearance-notes.md).
- All legal documents are templates prepared for the WinterVell product and should be reviewed by a qualified lawyer in the Licensor's jurisdiction before commercial distribution.

---

© 2026 WinterVell. All rights reserved. Proprietary and confidential — see [`LICENSE`](LICENSE).
