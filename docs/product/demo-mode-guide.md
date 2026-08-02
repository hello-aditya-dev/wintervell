# Demo Mode Guide

WinterVell ships with an honest demonstration mode. A demo organisation — **Northstar Digital** — contains five fictional prospects, each with fictional audits, findings, proposals, opportunities, tasks, and activity. Every demo item is labelled "Demonstration data — fictional." The software never implies a real audit ran when it did not, a real payment occurred, a real email was sent, a real AI provider is connected, or a real prospect viewed a report.

This document describes the demo data, the demo philosophy, and the labelling rules.

---

## Honest demo philosophy

A demo that lies is a liability. If a prospect-or-buyer evaluating WinterVell cannot tell what is real and what is simulated, the product has failed at the most basic level of trust. WinterVell's demo mode is therefore:

- **Clearly labelled.** Every demo item carries a "Demonstration data — fictional" badge.
- **Internally consistent.** A demo prospect's audit references the demo prospect's website; the demo report references the demo audit; the demo proposal references the demo report.
- **Honest about integrations.** If no real AI provider is configured, the demo uses the mock provider and says so. If no real email provider is configured, the demo "send" action is logged as a demo send and no email leaves the system.
- **Honest about engagement.** A demo report's "first viewed" timestamp is a planted demo event, not a real prospect view.

Demo data is seeded by `bun run db:seed` and is clearly separated from production data via the `isDemo` flag on the `Organisation` model. A demo organisation cannot be upgraded to a production organisation; production data cannot be created inside a demo organisation.

---

## The Northstar Digital demo organisation

| Field | Value |
|---|---|
| Organisation name | Northstar Digital |
| Plan | Studio (demo) |
| Owner | "Avery Chen" (fictional) |
| Currency | USD |
| Default report language | en |
| Custom domain (demo) | `reports.northstar-demo.example` (does not resolve; for visual demo only) |
| Branding | Northstar Digital palette; Fraunces + Inter fonts |

The organisation contains:

- 1 Owner, 1 Administrator, 2 Audit managers, 3 Auditors, 2 Sales managers, 4 Sales representatives, 2 Viewers (all fictional people with fictional email addresses at `@northstar-demo.example`).
- 5 fictional prospects (below).
- A ServiceCatalogue with 12 fictional services.
- Branding configured to demonstrate white-labelling.
- A demo `Licence` record in the "valid" state with the `Studio` entitlement set.

---

## The five fictional prospects

| # | Prospect | Industry | Website (fictional) | Audit mode | Pipeline stage |
|---|---|---|---|---|---|
| 1 | "Riverside Family Health" | Local healthcare provider | `riverside-family-health.example` | Comprehensive | Report viewed |
| 2 | "Cadence Software" | B2B software company | `cadence-software.example` | Standard | Proposal sent |
| 3 | "Meridian Developments" | Property developer | `meridian-developments.example` | Standard | Audit review |
| 4 | "Northwind Outfitters" | Ecommerce retailer | `northwind-outfitters.example` | Comprehensive | Negotiation |
| 5 | "Halsey & Co." | Professional-services company | `halsey-and-co.example` | Quick | New prospect |

Each prospect has:

- A fictional contact (name, fictional email, fictional phone).
- A fictional website URL (the `.example` TLD is reserved by RFC 2606 and never resolves).
- A fictional audit with realistic findings across the six categories.
- A fictional score set, computed from the findings using the default score version.
- A fictional report version (where the audit was approved).
- A fictional proposal version (where the proposal was approved and sent).
- A fictional opportunity in the pipeline.
- A fictional set of follow-up tasks.
- A fictional activity feed (notes, stage transitions, share-link creations).
- A fictional set of report events (first viewed, view count, CTA clicks) — clearly labelled as planted demo events.

Every one of these items carries the `isDemo` flag and is visibly badged in the UI.

---

## Mock integrations

The demo uses mock integrations for:

- **AI provider** — the mock provider returns canned structured outputs. The UI shows a "Mock AI provider — no real provider connected" banner in the admin area.
- **Email provider** — the mock provider logs "sent" events to the activity feed without sending email. The UI shows a "Mock email provider — no email will be sent" banner.
- **Object storage** — the demo uses local-disk storage with a clear "demo storage" label.
- **Custom domain** — the demo custom domain does not resolve and is for visual demonstration only.

Mock integrations are documented in [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md), [`../setup/email-integration.md`](../setup/email-integration.md), [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md), and [`../setup/custom-domain-setup.md`](../setup/custom-domain-setup.md). Every mock has a real-provider counterpart; the demo simply uses the mock.

---

## What the demo does NOT do

The demo does not:

- Run a real audit against a real website. The fictional `.example` URLs are not crawled. Demo findings are planted from a fixture.
- Send real email.
- Make real AI provider calls.
- Process real payments.
- Track real prospect engagement. Demo `ReportEvent` records are planted.
- Write to real third-party integrations (Slack, Zapier, webhooks, etc.).

The demo makes this clear on every relevant screen. The audit-list page shows "Demo audit — findings planted from fixture, no real crawl performed." The report-share page shows "Demo share link — no email sent." The report viewer shows "Demo engagement data — planted, no real prospect viewed this report."

---

## Seeding and resetting

Demo data is seeded by:

```bash
bun run db:seed
```

The seed script is idempotent and clearly labelled in the codebase. It only seeds the demo organisation; it does not seed production data. Running the seed script on a production database is a configuration error and is blocked by a confirmation prompt when `NODE_ENV=production`.

Resetting the demo is a separate command:

```bash
bun run db:seed:reset-demo
```

This deletes only records with `isDemo = true` and re-seeds. It does not touch production data. The reset is audited in the audit log.

---

## Demo mode in production deployments

A production deployment may keep the demo organisation for training and onboarding. The demo organisation is isolated from production organisations by the same tenant-scoping rules that isolate any two organisations — see [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md). A production user with a membership in a production organisation cannot see demo data unless they also have a membership in the demo organisation.

Demo data is never mixed with production data. The `isDemo` flag is enforced on every query that touches demo-flagged tables; a query that accidentally omits the flag in a demo context is a bug, not a feature.

---

## Related documents

- [`product-overview.md`](product-overview.md) — product overview
- [`audit-methodology.md`](audit-methodology.md) — what a real audit does (and what the demo simulates)
- [`report-workflow.md`](report-workflow.md) — what a real report does (and what the demo simulates)
- [`../architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) — mock AI provider
- [`../setup/database-setup.md`](../setup/database-setup.md) — seed script
- [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md) — what is and is not implemented
