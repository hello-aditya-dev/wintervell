# System Overview

WinterVell is a Next.js 16 App Router application backed by PostgreSQL (production) or SQLite (development), authenticated by NextAuth.js v4, with two sidecar mini-services: an **audit worker** that performs website crawling and analysis, and a **PDF worker** that renders reports to PDF. A Socket.io mini-service handles realtime updates where required. AI calls go through a provider abstraction. Object storage holds screenshots, PDFs, and uploads.

This document is the high-level map. Detail lives in the per-system documents linked below.

---

## Component diagram

```
                            ┌─────────────────────────────┐
                            │        Browser (user)       │
                            └──────────────┬──────────────┘
                                           │ HTTPS
                                           ▼
                            ┌─────────────────────────────┐
                            │   Next.js 16 (App Router)   │
                            │  ── React 19 + TS 5         │
                            │  ── NextAuth v4 sessions    │
                            │  ── Server actions / API v1 │
                            │  ── Tailwind 4 + shadcn/ui  │
                            └──┬───────┬────────┬─────┬───┘
                               │       │        │     │
              ┌────────────────┘       │        │     └───────────────┐
              ▼                        ▼        ▼                     ▼
   ┌───────────────────┐    ┌────────────────┐  ┌──────────────┐  ┌──────────────┐
   │   PostgreSQL      │    │  Object Store  │  │  AI Provider │  │  Socket.io   │
   │  (Prisma ORM)     │    │  (S3 / local)  │  │  Abstraction │  │  mini-service│
   └───────────────────┘    └────────────────┘  └──────────────┘  └──────────────┘
              ▲                                                 ▲
              │                                                 │
   ┌──────────┴──────────┐                          ┌──────────┴──────────┐
   │   Audit Worker      │  ─────── results ─────► │   Next.js API        │
   │   (bun mini-service │                         │   (job posts +       │
   │   port 3002)        │  ◄────── job poll ───── │    result ingest)    │
   │   crawler isolation │                         └──────────────────────┘
   └─────────────────────┘
              │
              ▼
   ┌───────────────────┐
   │   PDF Worker      │  ─────── pdf url ───────►  Object Store
   │   (bun mini-svc)  │
   └───────────────────┘
```

---

## Major components

| Component | Technology | Document |
|---|---|---|
| Web application | Next.js 16 App Router + React 19 + TypeScript 5 | — |
| Database | PostgreSQL (prod), SQLite (dev), Prisma ORM | [`data-model.md`](data-model.md), [`../setup/database-setup.md`](../setup/database-setup.md) |
| Authentication | NextAuth.js v4 | [`security-model.md`](security-model.md) |
| Multi-tenancy | Organisation-scoped, every query filtered by `organisationId` | [`multi-tenancy.md`](multi-tenancy.md) |
| Audit worker | Separate bun mini-service (port 3002) consuming jobs from a jobs table | [`audit-engine.md`](audit-engine.md), [`worker-architecture.md`](worker-architecture.md) |
| AI provider abstraction | OpenAI-compatible, Anthropic, mock; BYO key | [`ai-provider-abstraction.md`](ai-provider-abstraction.md) |
| PDF generation service | Server-side rendering, selectable text, page numbers, branding | [`report-rendering.md`](report-rendering.md) |
| Object storage | Local disk (dev) / S3-compatible (prod); signed URLs | [`storage-architecture.md`](storage-architecture.md) |
| Realtime | Socket.io mini-service | this document |
| Security | SSRF block-list, RBAC, IDOR defence, rate limiting, CSP, audit-log integrity | [`security-model.md`](security-model.md) |
| Licensing | Licence validation service, offline grace, entitlements | [`licence-architecture.md`](licence-architecture.md) |

---

## Request flow for an audit

A representative end-to-end flow when a user creates and runs an audit:

```mermaid
sequenceDiagram
    actor U as User (Auditor)
    participant W as Next.js (web)
    participant DB as PostgreSQL
    participant Q as Jobs table
    participant A as Audit worker (port 3002)
    participant S as Object storage
    participant AI as AI provider abstraction

    U->>W: Create audit (prospect, mode, categories)
    W->>W: Authorise: authn + org membership + audit.create permission + resource.orgId === user.orgId
    W->>DB: INSERT Audit (status=planned), INSERT AuditRun
    W->>Q: INSERT AuditJob (status=queued)
    W-->>U: 202 Audit queued

    loop every N seconds
        A->>Q: SELECT next queued job WHERE status=queued FOR UPDATE SKIP LOCKED
        A->>Q: UPDATE job status=running
        A->>W: POST /api/v1/internal/audit-result (partial progress)
        W->>DB: UPDATE AuditRun.progress
        W-->>U: (via Socket.io) progress update

        A->>A: SSRF-check target URL against block-list
        A->>A: Crawl page(s); collect evidence
        A->>S: PUT screenshot, raw HTML
        A->>AI: generateStructured(prompt + evidence) for explanation drafts
        AI-->>A: structured JSON (Zod-validated)
        A->>W: POST /api/v1/internal/audit-result (findings batch)
        W->>DB: INSERT Finding, Evidence, Screenshot rows
    end

    A->>Q: UPDATE job status=complete
    A->>W: POST /api/v1/internal/audit-result (final)
    W->>DB: UPDATE Audit.status=review, compute Score rows
    W-->>U: (via Socket.io) audit complete
```

Key points:

- The web app **never** crawls. Crawling happens in the audit worker, which is the only component allowed to make outbound requests to prospect URLs. This isolates SSRF and JS-execution risk to a hardened mini-service.
- The web app and the audit worker communicate via the jobs table (for queueing) and an internal API endpoint (for results). The internal endpoint is authenticated with a shared service secret and is not exposed externally.
- AI calls happen inside the audit worker (for explanation drafts) and inside the web app (for proposal and report text generation). Both go through the same provider abstraction.
- Screenshots and raw evidence go to object storage; only signed URLs are stored in the database.
- Realtime progress is delivered via Socket.io, but the database is the source of truth. A client that misses a Socket.io event can reconcile by fetching the audit's current state.

---

## Internal boundaries

- **Web app → database**: Prisma only. No raw SQL outside migrations.
- **Web app → object storage**: via the storage abstraction. No direct S3 SDK calls outside the abstraction.
- **Web app → AI**: via the provider abstraction. No direct fetch to OpenAI/Anthropic.
- **Web app → audit worker**: only via the jobs table and the internal result-ingest endpoint. No direct in-process calls.
- **Audit worker → prospect URL**: only after SSRF validation. See [`security-model.md`](security-model.md).
- **Audit worker → web app**: only via the internal result-ingest endpoint with the shared service secret.

Each boundary is enforced by code review and by tests. A pull request that adds a new boundary crossing without justification is rejected.

---

## Realtime (Socket.io)

A small Socket.io mini-service delivers:

- Audit progress updates to the audit-detail page.
- Report-view events to the opportunity owner when a prospect opens a report.
- Pipeline stage transitions to the pipeline board.

The realtime service is a **transport** only. State is always the database. A client that disconnects and reconnects reconciles by fetching the current state; missed Socket.io events do not cause data loss. The realtime service is optional — the product is fully functional with realtime disabled, with a slight delay before the UI reflects server-side changes.

---

## Deployment

WinterVell is deployed to Vercel as a **separate project** from Cloudsun. The audit worker and PDF worker are deployed as separate long-running processes (Vercel functions for the web app; a small VM or container for the workers). The database is managed PostgreSQL. Object storage is S3-compatible. Custom domains terminate on Vercel; the audit worker is not exposed to the public internet.

See [`../setup/vercel-deployment.md`](../setup/vercel-deployment.md), [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md), and [`../setup/production-deployment.md`](../setup/production-deployment.md).

---

## Related documents

- [`data-model.md`](data-model.md) — full data model
- [`multi-tenancy.md`](multi-tenancy.md) — tenant isolation
- [`audit-engine.md`](audit-engine.md) — audit engine
- [`worker-architecture.md`](worker-architecture.md) — audit and PDF workers
- [`ai-provider-abstraction.md`](ai-provider-abstraction.md) — AI provider abstraction
- [`report-rendering.md`](report-rendering.md) — report rendering and PDF
- [`security-model.md`](security-model.md) — security model
- [`licence-architecture.md`](licence-architecture.md) — licensing
- [`storage-architecture.md`](storage-architecture.md) — object storage
