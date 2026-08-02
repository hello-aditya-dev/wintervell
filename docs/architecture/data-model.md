# Data Model

WinterVell's data model is defined in `prisma/schema.prisma` and accessed via Prisma ORM. Production uses PostgreSQL; local development uses SQLite. Every model is tenant-scoped via `organisationId`, has timestamps (`createdAt`, `updatedAt`), and has indexes on the columns used for filtering and sorting.

This document lists every model, the key relationships, and the tenant-scoping rule. It is the reference for engineers; the per-product behaviour is in [`../product/`](../product/).

---

## Model list

### Identity and tenancy

| Model | Purpose |
|---|---|
| `User` | A person who can log in. Email-unique. |
| `Organisation` | A tenant. Holds branding, licence, default currency. |
| `Membership` | User ↔ Organisation link, with a role and an `isDemo` flag. |
| `Role` | The seven roles (see [`../product/user-roles.md`](../product/user-roles.md)). Stored as an enum, not a separate table. |
| `Permission` | A `<resource>:<action>` string. Stored canonically; granted to roles via a role-permission map. |
| `Team` | Optional sub-grouping within an organisation. |
| `Invitation` | Pending membership invitation. |
| `Session` | NextAuth session. |
| `ExternalAccount` | OAuth provider link. |

### Prospects and companies

| Model | Purpose |
|---|---|
| `Prospect` | A potential client. Has website URL, industry, company size, current platform, lead source, services of interest. |
| `Company` | A company record (the prospect's company, or the agency's own). |
| `ProspectTag` | Free-form tags on a prospect. |
| `ProspectActivity` | Activity feed entries (notes, stage transitions, emails sent, reports viewed). |

### Audit

| Model | Purpose |
|---|---|
| `Audit` | An audit of a prospect's site. Has mode, status, categories, score version. |
| `AuditPage` | A page crawled during an audit. Has URL, status, headers, response time, screenshot. |
| `AuditRun` | A single execution of an audit (an audit may be re-run). Has runner states, progress, started/finished timestamps. |
| `Finding` | A single finding. Full evidence fields per [`../product/audit-methodology.md`](../product/audit-methodology.md). |
| `Evidence` | Raw evidence supporting a finding. May be multiple per finding (HTTP response, HTML snippet, header, metric). |
| `Screenshot` | A screenshot taken during crawl. Stored as a signed URL to object storage. |
| `Score` | A score for one category of one audit. Sub-score value, weight, version. |
| `ScoreVersion` | Immutable record of the scoring methodology used. |

### Reports

| Model | Purpose |
|---|---|
| `ReportVersion` | An immutable snapshot of an approved report (findings, scores, configuration). |
| `ReportShare` | A share link to a ReportVersion. Token, optional password, expiry, max views. |
| `ReportEvent` | A view or interaction event on a ReportShare. Privacy-conscious. |

### Proposals

| Model | Purpose |
|---|---|
| `Proposal` | A proposal linked to an audit / report version. |
| `ProposalVersion` | An immutable snapshot of an approved proposal. |
| `Roadmap` | A 30/60/90-day roadmap linked to a proposal. |
| `RoadmapPhase` | A phase in a roadmap. |

### Pipeline

| Model | Purpose |
|---|---|
| `Opportunity` | A tracked deal. Has stage, owner, estimated value, probability, expected close. |
| `PipelineStage` | The twelve stages (see [`../product/pipeline-workflow.md`](../product/pipeline-workflow.md)). Stored as an enum. |
| `StageHistory` | Every stage transition for an opportunity. Immutable. |
| `Task` | A follow-up task. Assignable, due-dated, priority-tagged. |
| `Note` | A free-text note on a prospect, opportunity, audit, or report. |

### Catalogue and branding

| Model | Purpose |
|---|---|
| `ServiceCatalogueItem` | A service an agency sells. Pricing model, starting price, duration, related finding categories, proposal wording. |
| `Branding` | Per-organisation branding configuration. All items in [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md). |
| `CustomDomain` | A custom domain configured for an organisation. DNS verification state. |

### Integrations and AI

| Model | Purpose |
|---|---|
| `Integration` | A configured integration (AI provider, email, storage). |
| `AIProviderConfig` | AI provider config: provider type, model, key reference (never the key itself), usage limits, redaction options. |
| `AIUsage` | Per-call token and cost log. Used for usage limits and cost reporting. |

### Security and audit

| Model | Purpose |
|---|---|
| `AuditLog` | Append-only audit log. Hash-chained for integrity (see [`security-model.md`](security-model.md)). |
| `ApiKey` | An API key for programmatic access. Scoped, revocable, rate-limited. |

### Licensing

| Model | Purpose |
|---|---|
| `Licence` | The organisation's licence record. Tier, status, validation timestamp, grace window. |
| `FeatureEntitlement` | A feature flag granted by the licence. |
| `FeatureFlag` | A feature flag (may be licence-granted or operator-granted for rollout). |

---

## Key relationships

```
Organisation 1───* Membership *───1 User
Organisation 1───* Prospect *─────1 Company (optional)
Prospect 1───* Audit *───1 AuditRun *───* AuditPage
AuditRun *───* Finding 1───* Evidence
Finding *───1 Screenshot
Audit 1───* Score *───1 ScoreVersion
Audit 1───* ReportVersion 1───* ReportShare 1───* ReportEvent
ReportVersion 1───1 Proposal 1───* ProposalVersion
Proposal 1───1 Roadmap 1───* RoadmapPhase
Prospect 1───* Opportunity *───* StageHistory
Opportunity 1───* Task
Organisation 1───1 Branding
Organisation 1───* CustomDomain
Organisation 1───* ServiceCatalogueItem
Organisation 1───* Integration
Organisation 1───1 Licence 1───* FeatureEntitlement
Organisation 1───* AuditLog
User 1───* ApiKey
```

---

## Tenant scoping

Every tenant-scoped model has:

- `organisationId String` — FK to `Organisation`.
- `@@index([organisationId])` — for fast per-organisation queries.
- `@@index([organisationId, <common filter>])` — composite indexes where useful (for example, `[organisationId, stage]` on `Opportunity`).

A query that does not filter by `organisationId` is a bug unless it is explicitly cross-tenant (for example, the licence validation service, which is system-scoped). Cross-tenant queries are reviewed and are exceptions. See [`multi-tenancy.md`](multi-tenancy.md).

---

## Indexes, foreign keys, and timestamps

- **Timestamps**: every model has `createdAt` and `updatedAt`. Immutable records (`ScoreVersion`, `ReportVersion`, `ProposalVersion`, `StageHistory`, `AuditLog`) have `createdAt` only.
- **Foreign keys**: every relation has an explicit FK constraint. Cascading deletes are deliberately avoided; deletions are explicit and audited — see [`../operations/data-deletion.md`](../operations/data-deletion.md).
- **Indexes**: every column used in a `where`, `orderBy`, or join has an index. Composite indexes are used where a query filters by multiple columns. The Prisma schema is reviewed for missing indexes on every schema change.
- **Soft deletes**: `Prospect`, `Audit`, `Opportunity`, and `Organisation` support soft-delete via a `deletedAt` column. Hard deletion is a separate, audited operation. See [`../operations/data-deletion.md`](../operations/data-deletion.md).

---

## Database provider

- **Production**: PostgreSQL. Connection string from `DATABASE_URL`. Pool size configured per deployment.
- **Development**: SQLite. A file at `./db/wintervell.db`. No pool.
- **Prisma**: the same `schema.prisma` is used for both providers. Provider-specific features (JSON operators, array types) are avoided unless wrapped in a provider-aware helper.

See [`../setup/database-setup.md`](../setup/database-setup.md) for setup, migrations, and seeding.

---

## Demo data

Demo data lives in the same schema as production data, with the `isDemo` flag set on the `Organisation` row and cascaded to all child records via a `where` clause that includes `organisationId IN (SELECT id FROM Organisation WHERE isDemo = true)` for demo-scoped queries. Demo data never appears in production queries; production data never appears in demo queries. See [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md).

---

## Related documents

- [`multi-tenancy.md`](multi-tenancy.md) — tenant scoping rules
- [`security-model.md`](security-model.md) — audit-log integrity, API key scoping
- [`../setup/database-setup.md`](../setup/database-setup.md) — database setup
- [`../operations/data-deletion.md`](../operations/data-deletion.md) — deletion procedures
- [`../product/audit-methodology.md`](../product/audit-methodology.md) — what the audit models store
- [`../product/scoring-methodology.md`](../product/scoring-methodology.md) — what the score models store
