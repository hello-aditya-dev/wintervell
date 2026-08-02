# Roadmap

> Phased delivery roadmap for WinterVell. This document mirrors the
> execution order defined in the WinterVell Product Conversion
> Specification ([`docs/SPECIFICATION.md`](docs/SPECIFICATION.md)) and
> records the status of each phase as of the v0.1.0 foundation
> release. Phases are planning artefacts; targets may shift.

WinterVell is delivered in seventeen phases (Phase 0 through Phase 16).
Each phase has a defined outcome, a status, and a pointer to the
authoritative documentation. "Done" means the phase's outcome is
delivered and documented; "Partial" means a subset is delivered; "Todo"
means the phase is defined but not started or in early progress.

---

## Status table

| Phase | Outcome | Status |
|---|---|---|
| 0 | Protect Cloudsun and record provenance | Done |
| 1 | Audit source, dependencies, assets, security | Done |
| 2 | Create WinterVell repository with fresh history | Done |
| 3 | Remove call-centre architecture | Todo |
| 4 | Product configuration and WinterVell design system | Partial — central configuration done; design system in progress |
| 5 | Audit engine and evidence model | Todo |
| 6 | Report builder and PDF generation | Todo |
| 7 | Proposal and implementation roadmap generation | Todo |
| 8 | CRM and opportunity pipeline | Todo |
| 9 | White-labelling and service catalogue | Todo |
| 10 | AI provider abstraction | Todo |
| 11 | Licences and entitlements | Todo |
| 12 | Security hardening and SSRF enforcement | Todo |
| 13 | Legal, dependency, provenance, and sale documentation | Done |
| 14 | Tests, CI/CD, and production deploy | Partial — CI workflow done; tests and production-deploy hardening in progress |
| 15 | Commercial demonstration and sales package | Done |
| 16 | Final due-diligence audit | Todo |

---

## Phase 0 — Protect Cloudsun and record provenance (Done)

- Cloudsun repository treated as read-only source material.
- Cloudsun repository, history, deployment, environment, database, and
  branding not modified by the WinterVell project.
- Exact source commit recorded in [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md).
- Conversion audit recorded in [`docs/audit/cloudsun-to-wintervell-conversion-audit.md`](docs/audit/cloudsun-to-wintervell-conversion-audit.md).

## Phase 1 — Audit source, dependencies, assets, security (Done)

- Source audit: identified Cloudsun-inherited systems vs WinterVell-new
  systems.
- Dependency audit: confirmed no copyleft dependencies in the
  WinterVell proprietary code path; SBOM seed in [`sbom.json`](sbom.json).
- Asset audit: identified design assets, demo data, environment
  template, CI workflow, and configuration files.
- Security audit: identified SSRF as the primary external-facing risk
  and documented the block-list architecture.

## Phase 2 — Create WinterVell repository with fresh history (Done)

- Independent private repository with its own fresh Git history.
- Own README, package metadata, environment-variable template,
  deployment configuration, documentation, licence documentation,
  issue and release structure, branding, and (target) Vercel project.
- See [`README.md`](README.md) and [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md).

## Phase 3 — Remove call-centre architecture (Todo)

- Remove Cloudsun- and call-centre-specific architecture: calls,
  queues, dialer, telephony, Exotel integrations, agent workspace,
  campaigns, quality scoring, callbacks, live supervision.
- Confirm the removal does not break inherited foundations
  (authentication, organisation/membership, roles, contacts, companies,
  leads, tasks, notifications, activity history, audit logging,
  settings, team management, dashboard architecture).

## Phase 4 — Product configuration and WinterVell design system (Partial)

- Central product configuration in `src/config/product.ts` (Done).
- WinterVell design system: colour tokens, typography, spacing, density,
  severity system, chart conventions, empty/loading/error states,
  motion guidelines (Todo).

## Phase 5 — Audit engine and evidence model (Todo)

- Six-category audit engine: Technical, SEO, Accessibility, Conversion
  & UX, Trust & Commercial Readiness, AI & Search Visibility.
- Twelve-stage audit pipeline with per-stage retry and partial results.
- Evidence model: structured storage of category, severity, confidence,
  URL, page title, selector, screenshot, raw evidence, human-readable
  explanation, business consequence, recommended action, estimated
  effort, suggested service, verification flag, timestamp, tool/provider.
- Findings are never fabricated.

## Phase 6 — Report builder and PDF generation (Todo)

- Report builder with section enable/disable, reordering, live preview.
- Report sections: cover, executive summary, scores, priority issues,
  evidence, business impact, recommendations, quick wins, phased plan,
  suggested services, pricing, agency branding, CTA, disclaimer.
- PDF generation: server-side rendering with selectable text, page
  numbers, multi-page tables, screenshot embedding, agency branding.

## Phase 7 — Proposal and implementation roadmap generation (Todo)

- Proposal generator: scope, deliverables, exclusions, assumptions,
  pricing, payment schedule, acceptance criteria, signatures.
- Implementation roadmap: Immediate / 30 / 60 / 90-day buckets with
  dependencies, complexity, priority, expected impact, owner.
- Auto-populated from approved audit findings and selected services.

## Phase 8 — CRM and opportunity pipeline (Todo)

- Prospect CRM: capture, import, activity history, lifecycle.
- Twelve-stage opportunity pipeline with drag-and-drop, stage history,
  probability, expected close, lost reason, won value.
- Report analytics: privacy-conscious first-viewed, last-viewed, view
  count, CTA clicks, proposal clicks, download activity.

## Phase 9 — White-labelling and service catalogue (Todo)

- Agency white-labelling: agency name, logo, favicon, brand colours,
  fonts, sender identity, custom domain, default disclaimers, report
  language.
- Admin-area attribution per tier.
- Service catalogue: configurable services with pricing model, starting
  price, duration, related findings, proposal wording. Versioned.

## Phase 10 — AI provider abstraction (Todo)

- Provider abstraction: OpenAI-compatible, Anthropic, mock.
- Bring-your-own-key per organization.
- Model selection per task; token and cost logging.
- Retry, timeout, structured-output validation, prompt versioning,
  redaction, usage limits.
- Mock provider clearly indicated when in use.

## Phase 11 — Licences and entitlements (Todo)

- Hosted, Agency Source, Studio tiers.
- Graceful licence validation (default 14-day offline grace).
- No data deletion as a licence-enforcement mechanism.
- Licence validation never transmits private client data.
- Entitlement enforcement for deployments, team seats, and report
  quotas.

## Phase 12 — Security hardening and SSRF enforcement (Todo)

- SSRF block-list enforcement in the audit worker.
- Tenant isolation verification at the data-access layer.
- Rate limiting on auth, audit-creation, and AI-provider endpoints.
- Audit logging for WinterVell-specific privileged actions.
- AI provider boundaries: redaction, mock labelling, structured-output
  validation.
- Independent penetration test (recommended before high-volume
  production use).

## Phase 13 — Legal, dependency, provenance, and sale documentation (Done)

- WV-CSL v1.0 in [`LICENSE`](LICENSE).
- Provenance in [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md).
- Conversion audit in [`docs/audit/`](docs/audit/).
- Commercial licence reference, EULA template, security disclosure,
  IP-assignment checklist, sale due-diligence checklist, third-party
  notices (referenced) in [`docs/legal/`](docs/legal/).
- Buyer-facing sales package in [`sales-assets/`](sales-assets/).

## Phase 14 — Tests, CI/CD, and production deploy (Partial)

- CI workflow in `.github/workflows/` (Done): lint, type-check, build,
  security scanning.
- Test suite (Todo): unit, integration, and end-to-end coverage for
  audit engine, report builder, PDF, pipeline, white-labelling, AI
  abstraction, licensing.
- Production-deploy hardening (Todo): deployment runbook, health
  checks, monitoring, alerting, backup verification.

## Phase 15 — Commercial demonstration and sales package (Done)

- Northstar Digital demonstration organization: five fictional
  prospects, every item clearly labelled as fictional.
- Sales package: feature list, licence comparison, technical
  requirements, installation checklist, buyer FAQ, security overview,
  white-label overview, product limitations, release notes, marketplace
  description draft, Gumroad description draft, AppSumo submission
  draft, buyer due-diligence summary, source-code delivery checklist.

## Phase 16 — Final due-diligence audit (Todo)

- Independent review of provenance, licence, security posture,
  dependency hygiene, and documentation.
- Trademark clearance for "WinterVell".
- Independent penetration test.
- Lawyer review of all legal documents.
- Sale-readiness sign-off.

---

## Indicative release mapping

Indicative targets (subject to change):

- **v0.2.x** — Phase 3 + Phase 4 completion.
- **v0.3.x** — Phase 5 + Phase 6.
- **v0.4.x** — Phase 7 + Phase 8.
- **v0.5.x** — Phase 9 + Phase 10.
- **v0.6.x** — Phase 11 + Phase 12.
- **v0.7.x** — Phase 14 completion + Phase 16.

These are planning artefacts, not commitments.

---

## Related documents

- [`docs/SPECIFICATION.md`](docs/SPECIFICATION.md) — full product specification.
- [`CHANGELOG.md`](CHANGELOG.md) — release history.
- [`sales-assets/RELEASE_NOTES.md`](sales-assets/RELEASE_NOTES.md) — buyer-facing release notes.
- [`sales-assets/PRODUCT_LIMITATIONS.md`](sales-assets/PRODUCT_LIMITATIONS.md) — honest limitations.
