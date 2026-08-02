# Provenance

This document records the origin of the WinterVell codebase. It is required reading for anyone performing technical, legal, or commercial due diligence on the product.

---

## Summary

WinterVell is an authorized internal derivative of the owner's earlier **Cloudsun** CRM product. The owner of WinterVell also owns the source code of Cloudsun and has the right to create a separate product from it. WinterVell is **not** a renamed CRM: it is a focused, white-label website-audit and agency-sales platform with its own product definition, branding, licence, and deployment.

Cloudsun is treated as **read-only source material**. The Cloudsun repository, its history, its deployment, its environment, its database, and its branding are **not** modified by the WinterVell project.

---

## Original repository

| Field | Value |
|---|---|
| Original repository | `witejackel-eng/cloudsun` |
| URL | https://github.com/witejackel-eng/cloudsun |
| Visibility at time of snapshot | Public |
| Default branch | `main` |

> **Note on visibility.** At the time the snapshot was taken, the Cloudsun repository was publicly visible. The WinterVell project does **not** redistribute Cloudsun source; it only uses Cloudsun as a private, read-only reference to build an independent product. Any future change to Cloudsun's visibility is the Cloudsun owner's decision and is outside WinterVell's control.

---

## Exact source commit

| Field | Value |
|---|---|
| Source commit SHA | `e3879a4c232680e59e0937828b69d969e3b65b69` |
| Commit date | 2026-07-31 12:26:05 UTC |
| Commit message | `docs: update completion ledger for Phase 7` |
| Snapshot taken | 2026-08-02 |

This is the **exact** Cloudsun `main`-branch commit used as the technical foundation for WinterVell. No earlier or later Cloudsun commit is incorporated into WinterVell unless this document is updated to record it.

---

## Ownership

The WinterVell repository and the Cloudsun repository are owned by the same developer (`witejackel-eng`). The owner asserts that they own the source code of Cloudsun and have the right to authorize an internal derivative.

### Contributor history (Cloudsun)

The Cloudsun contributor history (as returned by the GitHub API at the time of snapshot) lists:

- `hello-aditya-dev` (User, 2 contributions)

The WinterVell owner (`witejackel-eng`) is the repository owner of Cloudsun. The relationship between `hello-aditya-dev` and `witejackel-eng` should be clarified during buyer due diligence — see [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md). Where ownership of any contribution is unclear, it is flagged rather than hidden. History is **not** rewritten to falsely attribute work.

---

## Relationship to Cloudsun

WinterVell began as an authorized internal derivative. The derivative was created by:

1. Cloning the Cloudsun `main` branch at the commit recorded above into a private working area.
2. Removing the Cloudsun `.git` directory so that WinterVell has its own fresh Git history.
3. Removing Cloudsun- and call-centre-specific architecture (calls, queues, dialer, telephony, Exotel integrations, agent workspace, campaigns, quality scoring, callbacks, live supervision).
4. Adapting reusable foundations (authentication, organisation/membership, roles, contacts, companies, leads, tasks, notifications, activity history, audit logging, settings, team management, dashboard architecture, reusable UI components, API conventions, database abstraction, validation, error handling).
5. Re-branding the entire product to WinterVell.
6. Adding new WinterVell-specific systems (audit engine, evidence model, scoring, report builder, PDF generation, proposal generator, roadmap generator, report analytics, service catalogue, agency white-labelling, AI provider abstraction, commercial licensing system, SSRF protection).

No Cloudsun customer data, private screenshots, third-party trademarks, or production secrets are copied into WinterVell.

---

## Major systems inherited from Cloudsun

The following architectural foundations are inherited (adapted, not copied verbatim):

- Next.js 16 App Router project structure
- Prisma ORM data-access layer (`src/lib/db.ts`)
- NextAuth.js v4 authentication
- Multi-tenant model: `User`, `Organisation`, `Membership`, `Team`, `Invitation`, `Session`, `ExternalAccount`, `AuditEvent`
- Role-based access control patterns (`src/config/rbac.ts`)
- API convention: versioned REST under `/api/v1/*`
- Reusable shadcn/ui component library (`src/components/ui/`)
- Application shell, navigation, and dashboard architecture (`src/config/navigation.ts`, `src/config/app-routes.ts`)
- Contacts, companies, leads, tasks, team, audit-log, settings, integrations, billing views
- Demo-data store patterns (`src/lib/demo-store.ts`, `src/lib/demo-server.ts`)

Inherited code is reviewed and re-licensed under the WinterVell Commercial Source License. Inherited open-source dependencies remain governed by their own licences.

---

## Major systems newly created for WinterVell

These systems did not exist in Cloudsun and are original WinterVell work:

- **Audit engine** — modular website audit across Technical, SEO, Accessibility, Conversion/UX, Trust, and AI-visibility categories
- **Evidence model** — structured storage of category, severity, confidence, URL, selector, screenshot, raw evidence, explanation, business consequence, recommended action, estimated effort, suggested service, verification flag, timestamp, tool/provider
- **Transparent scoring** — reproducible, weighted, versioned scores across nine categories
- **Manual review workflow** — add/edit findings, mark false positives, verify, exclude from client report, approve before sharing
- **Report builder** — cover, executive summary, scores, priority issues, evidence, business impact, recommendations, quick wins, phases, suggested services, pricing, agency branding, CTA, disclaimer
- **PDF generation** — selectable text, page numbers, agency branding, multi-page tables and screenshots
- **Proposal generator** — full proposal fields (scope, deliverables, exclusions, assumptions, pricing, payment schedule, acceptance criteria, signatures)
- **Implementation roadmap** — immediate / 30 / 60 / 90-day plans with dependencies, complexity, priority, expected impact
- **Opportunity pipeline** — drag-and-drop, twelve stages, stage history, probability, expected close, lost reason, won value
- **Report analytics** — privacy-conscious first-viewed, last-viewed, view count, CTA clicks, proposal clicks, download activity
- **Agency white-labelling** — agency name, logo, favicon, brand colours, fonts, sender identity, custom domain
- **Service catalogue** — configurable services with pricing model, starting price, duration, related findings, proposal wording
- **AI provider abstraction** — OpenAI-compatible, Anthropic, mock, bring-your-own-key, model selection, token/cost logging, retry, timeout, structured-output validation, prompt versioning, redaction, usage limits
- **Commercial licensing system** — Hosted, Agency Source, Studio tiers with graceful licence validation
- **SSRF protection** — block-list for localhost, private ranges, link-local, cloud metadata, internal hostnames, non-HTTP protocols, redirect validation, DNS-rebinding defence, response-size and response-time limits
- **WinterVell design system** — colour tokens, typography, spacing, density, severity system, chart conventions, empty/loading/error states, motion guidelines

---

## Third-party dependencies

Third-party open-source dependencies (Next.js, React, Prisma, shadcn/ui, Radix, TanStack Query, Zustand, Tailwind, etc.) remain governed by their respective licences. They are **not** WinterVell proprietary IP and are **not** described as exclusive proprietary IP. See:

- [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)
- [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md)
- [`sbom.json`](../../sbom.json)

---

## Honesty statement

This provenance document does **not** claim that all WinterVell code is completely original. It accurately distinguishes:

- Source inherited from Cloudsun (owned by the same developer)
- New WinterVell code
- Third-party open-source code
- Generated boilerplate
- AI-assisted implementation
- Manually authored implementation

AI-assisted code is reviewed for suspicious verbatim copying, licence contamination, incorrect attribution, security vulnerabilities, unclear authorship, and fabricated implementations. Where review is incomplete, the gap is recorded in [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md) rather than hidden.

---

## Update policy

This document is updated whenever:

- A new Cloudsun source commit is incorporated
- A major system is moved between "inherited" and "newly created"
- Ownership of a contribution changes or is clarified
- A material asset-rights or licence finding is resolved

Do not edit this document to obscure provenance. Inaccurate provenance is a commercial and legal liability.
