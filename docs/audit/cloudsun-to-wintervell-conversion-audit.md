# Cloudsun → WinterVell Conversion Audit

**Audit date:** 2026-08-02
**Auditor:** WinterVell principal engineer
**Source repository:** `witejackel-eng/cloudsun` (read-only)
**Source commit:** `e3879a4c232680e59e0937828b69d969e3b65b69` (2026-07-31)
**Method:** Full clone (depth-1) of Cloudsun `main` into an isolated working area; static inspection of the source tree, Prisma schema, route map, configuration, and keyword frequency. Cloudsun was not modified at any point.

This audit records what was found **before** any rebranding or feature implementation. It is required reading for the conversion and for buyer due diligence.

---

## 1. Reusable architecture

| Foundation | Cloudsun location | WinterVell decision |
|---|---|---|
| Next.js 16 App Router | `src/app/` | **Retain & adapt** |
| Prisma ORM + client | `prisma/`, `src/lib/db.ts`, `db/` | **Retain**; switch production provider from SQLite to PostgreSQL |
| NextAuth.js v4 | `src/app/auth/*`, `src/lib/auth-store.ts` | **Retain** |
| Multi-tenant identity | `User`, `Organisation`, `Membership`, `Team`, `Invitation`, `Session`, `ExternalAccount`, `AuditEvent` | **Retain & extend** with Prospects, Audits, Findings, Reports, Proposals, Opportunities, ServiceCatalogue, Branding, Integrations, AIUsage, Licences, Entitlements |
| RBAC | `src/config/rbac.ts` | **Retain & extend** with WinterVell roles (Owner, Administrator, Audit manager, Auditor, Sales manager, Sales representative, Viewer) |
| Versioned REST API | `src/app/api/v1/*` | **Retain** convention |
| shadcn/ui component library | `src/components/ui/` | **Retain** |
| App shell + navigation | `src/config/navigation.ts`, `src/config/app-routes.ts`, `src/app/app/layout.tsx` | **Retain & rebrand** |
| TanStack Query + Zustand | `src/hooks/`, `src/lib/*-store.ts` | **Retain** |
| Dashboard architecture | `src/app/app/page.tsx`, `src/app/api/v1/dashboard/route.ts` | **Retain pattern**, replace call-centre metrics with audit/pipeline metrics |
| Demo-data patterns | `src/lib/demo-store.ts`, `src/lib/demo-server.ts` | **Retain pattern**, replace demo data with Northstar Digital agency demo |
| Validation (Zod) | throughout `src/` | **Retain** |
| Error-handling conventions | `src/lib/api.ts` | **Retain** |
| i18n (next-intl) | dependency present | **Retain** for report language support |
| File storage abstraction | `src/lib/storage/` | **Retain & extend** for screenshots and PDF output |

---

## 2. CRM functionality that should be retained

These Cloudsun modules map directly onto WinterVell CRM needs and are kept (rebranded):

- **Contacts** — `src/app/app/contacts/`, `src/app/api/v1/` contact endpoints → WinterVell **Prospect CRM** (extended with website URL, industry, company size, current platform, lead source, services of interest)
- **Clients** — `src/app/app/clients/` → WinterVell client projects (opportunities converted to clients)
- **Leads** — `src/app/app/leads/` → folded into Prospect CRM pipeline
- **Tasks** — `src/app/app/tasks/` → WinterVell follow-up tasks (retained as-is)
- **Team** — `src/app/app/team/` → WinterVell team management (retained)
- **Audit log** — `src/app/app/audit-log/`, `AuditEvent` model → WinterVell audit log (extended with report-publication, proposal-generation, branding-change, licence-change events)
- **Settings** — `src/app/app/settings/` → WinterVell agency settings + white-labelling
- **Integrations** — `src/app/app/integrations/` → WinterVell integrations (AI providers, storage, email)
- **Billing** — `src/app/app/billing/` → WinterVell commercial/licence area
- **Analytics** — `src/app/app/analytics/` → WinterVell report analytics (re-scoped)
- **Notifications / inbox** — `src/app/app/inbox/` → retained as activity/notification surface (call-centre inbox content removed)

---

## 3. Call-centre functionality that MUST be removed

The following Cloudsun systems are **incompatible** with WinterVell and are removed. Removal is confirmed dependency-safe before deletion; dead routes are not left hidden.

### Routes (UI)

| Cloudsun route | Reason for removal |
|---|---|
| `src/app/app/agent/` | Agent call workspace — no telephony in WinterVell |
| `src/app/app/callbacks/` | Callback queues — call-centre concept |
| `src/app/app/calls/` | Call records — call-centre concept |
| `src/app/app/campaigns/` | Contact-centre campaigns — not in WinterVell scope |
| `src/app/app/live/` | Live call supervision — call-centre concept |
| `src/app/app/quality/` | Call-centre quality scoring — not in WinterVell scope |
| `src/app/app/queues/` | Call queues — call-centre concept |
| `src/app/app/tickets/` | Support tickets — out of WinterVell scope (may be reconsidered as a future client-request feature) |
| `src/app/app/knowledge/` | Knowledge base for agents — call-centre concept |
| `src/app/app/automations/` | Telephony/call automations — call-centre concept |
| `src/app/verify-phone/` | Phone verification for agents — not required |

### API endpoints

| Cloudsun endpoint | Reason |
|---|---|
| `src/app/api/v1/calls/route.ts` | Call records |
| `src/app/api/v1/telephony/recordings/[recordingId]/route.ts` | Call recording access |
| `src/app/api/v1/telephony/webhooks/route.ts` | Telephony webhooks |
| `src/app/api/v1/presence/agents/route.ts` | Agent presence |

### Libraries

| Cloudsun location | Reason |
|---|---|
| `src/lib/telephony/` | Telephony provider abstraction (Exotel shell) — entire directory removed |
| `src/lib/jobs/` (call-related jobs) | Job runners for call/campaign execution — call-specific jobs removed; job-runner pattern may be retained for audit-worker jobs |
| `src/lib/auth-store.ts` agent-presence concepts | Agent presence not applicable |

### Concepts to strip from shared code

- Calls, call queues, dialer workflows
- Telephony providers
- Agent call workspace
- Voice recording systems
- Call dispositions
- Call-centre quality scoring
- Live call supervision
- Contact-centre campaigns
- Callback queues
- Telephony webhooks
- Exotel-specific integration shells
- Call recording URLs
- Agent-presence concepts that do not apply to WinterVell

### Keyword frequency at snapshot (file counts, excludes `node_modules`)

| Keyword | Files matched | Action |
|---|---|---|
| `cloudsun` (case-insensitive) | 162 | Rebrand to WinterVell across source, metadata, docs, manifest, favicons, seed data, package metadata |
| `exotel` | 15 | Remove (telephony integration shells) |
| `telephony` | 18 | Remove |
| `dialer` | 1 | Remove |
| `call` | 72 | Inspect each; remove call-centre uses, retain legitimate uses (e.g. "callable", function-call terminology) |

---

## 4. Components that can be generalized

- `src/components/cloudsun/` namespace → renamed to `src/components/wintervell/`; sub-folders `app/`, `auth/`, `public/`, `shared/`, `ui/`, `views/` are retained structurally
- The dashboard widget system is generalized so audit/pipeline metrics replace call metrics
- The data-table patterns (TanStack Table) are generalized for prospects, findings, opportunities
- The form patterns (react-hook-form + Zod) are reused for prospect capture, audit creation, proposal editing
- The layout chrome (sidebar, topbar, command palette) is reused with WinterVell navigation

---

## 5. Data models that can be adapted

Cloudsun's Prisma schema (`prisma/schema.prisma`) is explicitly documented as the **target production** design; the demo workspace uses a client-side Zustand store. This is an important honesty point: the database is not the live demo store.

Models to **retain** (rebranded): `User`, `Organisation`, `Membership`, `Team`, `Invitation`, `Session`, `ExternalAccount`, `AuditEvent`.

Models to **add** for WinterVell:

- `Prospect`, `Company`, `ProspectTag`, `ProspectActivity`
- `Audit`, `AuditPage`, `AuditRun`, `AuditCategory`
- `Finding`, `Evidence`, `Screenshot`
- `Score`, `ScoreVersion`
- `ReportVersion`, `ReportShare`, `ReportEvent`
- `Proposal`, `ProposalVersion`, `Roadmap`, `RoadmapPhase`
- `Opportunity`, `PipelineStage`, `StageHistory`
- `Task`, `Note`
- `ServiceCatalogueItem`, `ServicePricingModel`
- `Branding`, `CustomDomain`
- `Integration`, `AIUsage`, `AIProviderConfig`
- `Licence`, `Entitlement`, `FeatureFlag`
- `Api key`, `AuditLogEntry` (extended)

Indexes, foreign keys, timestamps, and tenant-scoping (`organisationId`) are mandatory on every new model.

---

## 6. Security weaknesses (observed in Cloudsun, to be corrected in WinterVell)

| Finding | Severity | WinterVell mitigation |
|---|---|---|
| Cloudsun repository is **public** | High | WinterVell is **private**. Audit Cloudsun history for any committed secrets before any further Cloudsun activity (out of WinterVell scope, but flagged here). |
| Prisma datasource is **SQLite** | Medium for production | WinterVell production uses **PostgreSQL**; SQLite only for local dev. Documented in `docs/setup/database-setup.md`. |
| Demo store is client-side Zustand (`src/lib/demo-store.ts`) | Medium | WinterVell production data is server-side via Prisma. Demo mode is clearly labelled and never mixed with production. |
| No SSRF protection in Cloudsun (no URL-input feature) | N/A → Critical for WinterVell | WinterVell accepts user-provided website URLs, so a full SSRF block-list is mandatory — see `docs/architecture/security-model.md`. |
| `auth-store.ts` appears to be a client store | Medium | Verify session handling; ensure NextAuth server sessions are authoritative, not client state. |
| `.env` not committed (good) | — | Maintain; provide `.env.example` only. |
| No visible rate-limiting on API routes | Medium | Add rate limiting on auth, audit-creation, and report-share endpoints. |
| No visible CSP / security headers configured | Medium | Add security headers via `next.config.ts` and/or middleware. |
| Audit-log integrity not verified | Low | Append-only audit log with hash-chaining considered; documented in `docs/architecture/security-model.md`. |

A full security review is recorded in [`SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md).

---

## 7. Demo-only features

Cloudsun's Prisma schema comment states: *"The demonstration workspace uses a client-side Zustand store, but this schema defines the target production database structure."* This means several Cloudsun features are **demo-only**:

- All data shown in the Cloudsun demo UI is held in a client-side Zustand store, not a real database
- `src/lib/demo-server.ts` simulates server responses
- Any "live" indicators in the Cloudsun demo are simulated

**WinterVell policy:** the honest demonstration mode continues to use clearly-labelled fictional data, but production data paths use Prisma + PostgreSQL. No WinterVell screen implies a real provider connection when only a mock is present. See [`demo-mode-guide.md`](../product/demo-mode-guide.md).

---

## 8. Placeholder integrations

Cloudsun contains placeholder/Exotel integration shells (`src/lib/telephony/`, 15 files reference `exotel`). These are **not** production integrations.

**WinterVell policy:** every integration (AI provider, email, storage, browser/Lighthouse service) uses a provider abstraction with a documented mock provider. Mocks are visibly labelled. No UI claims a production integration that is only mocked.

---

## 9. Hardcoded Cloudsun references

162 files reference "cloudsun" (case-insensitive), across:

- `src/components/cloudsun/` (directory namespace)
- `src/config/cloudsun.ts`
- `package.json` (`name: "nextjs_tailwind_shadcn_ts"` — actually neutral, but `description` and metadata may reference Cloudsun)
- `README.md`, `AGENTS.md`, `CLAUDE.md`
- `public/logo.svg`, `public/manifest.webmanifest`
- Prisma schema header comment
- `docs/` content
- Seed/demo data
- `worklog.md`

**WinterVell action:** replace all with WinterVell branding from the central `src/config/product.ts`. Do **not** mechanically rename where the underlying feature also needs architectural removal (e.g. "call" → "audit" is wrong; remove the call feature instead).

---

## 10. Dependency and licence risks

Cloudsun dependencies are a standard, permissively-licensed Next.js/React/shadcn stack. Notable:

| Package | Licence | Risk | Notes |
|---|---|---|---|
| `next` | MIT | None | Core framework |
| `react` / `react-dom` | MIT | None | |
| `prisma` / `@prisma/client` | Apache-2.0 | None | |
| `next-auth` | ISC | None | |
| `@radix-ui/*` | MIT | None | shadcn primitives |
| `tailwindcss` | MIT | None | |
| `z-ai-web-dev-sdk` | **Review required** | Low–Medium | Z.ai in-house SDK; verify redistribution terms before commercial distribution. See `DEPENDENCY_LICENSE_REPORT.md`. |
| `recharts` | MIT | None | |
| `framer-motion` | MIT | None | |
| `sharp` | Apache-2.0 | None | Image processing |
| `react-syntax-highlighter` | MIT | None | |
| `@mdxeditor/editor` | MIT | None | |
| `lucide-react` | ISC | None | Icons |

**No GPL/AGPL/SSPL/BUSL/non-commercial/source-available packages** were detected in Cloudsun's dependency tree. A full SBOM is generated as `sbom.json` and rendered in [`DEPENDENCY_LICENSE_REPORT.md`](../legal/DEPENDENCY_LICENSE_REPORT.md).

---

## 11. Assets that may not have redistribution rights

| Asset | Source | Status |
|---|---|---|
| `public/logo.svg` | Cloudsun | **Replaced** with original WinterVell logo (newly created, recorded provenance) |
| `public/manifest.webmanifest` | Cloudsun | **Rewritten** for WinterVell |
| Fonts | Cloudsun uses Fraunces (OFL) + Inter (OFL) | OFL permits bundling; document in `ASSET_RIGHTS_REGISTER.md` |
| Any screenshots in Cloudsun docs | Cloudsun | **Not copied** into WinterVell |
| Cloudsun customer data | Cloudsun | **Not copied** under any circumstances |
| Third-party trademarks | n/a | **Not copied** |

See [`ASSET_RIGHTS_REGISTER.md`](../legal/ASSET_RIGHTS_REGISTER.md).

---

## 12. Secrets or sensitive configuration risks

- No `.env` file is committed to Cloudsun (verified at snapshot). **Good.**
- Cloudsun is **public**. Before any further Cloudsun activity, the owner should audit Cloudsun's full git history for any historically-committed secrets (this is a Cloudsun-side action, not a WinterVell action, and is flagged here for completeness).
- `Caddyfile` in Cloudsun references a gateway port — WinterVell uses its own deployment configuration; no Cloudsun deployment identifiers are copied.
- WinterVell `.env.example` contains only safe placeholders, never working secrets.

---

## 13. Features presented as working but simulated

- Cloudsun telephony/Exotel integration (15 files) — simulated, not a real provider
- Cloudsun live call supervision — simulated
- Cloudsun agent presence — simulated
- Cloudsun call recording access — simulated
- Cloudsun dashboard "live" metrics — backed by demo store

**WinterVell policy:** all simulated integrations are visibly labelled. The demo mode never implies a real audit ran, a real payment occurred, a real email was sent, a real AI provider is connected, or a real prospect viewed a report.

---

## 14. Technical debt that would affect a commercial buyer

| Item | Impact | WinterVell plan |
|---|---|---|
| Client-side Zustand demo store masquerading as data layer | Buyer cannot tell what is real | Replace with Prisma server-side data; demo mode clearly labelled |
| 162 hardcoded "cloudsun" references | Branding contamination | Central `src/config/product.ts`; sweep and replace |
| Call-centre dead code if not removed | Maintenance burden, security surface | Remove cleanly per Section 3 |
| SQLite as production DB | Not production-grade | PostgreSQL for production |
| No SSRF protection | Critical for URL-input feature | Implement full block-list |
| No rate limiting | Abuse risk | Add on auth, audit, share endpoints |
| No security headers/CSP | XSS/clickjacking risk | Configure in `next.config.ts`/middleware |
| `AGENTS.md` references original `hello-aditya-dev/cloudsun` | Provenance confusion | Replace with WinterVell agent guidance; record provenance in `PROVENANCE.md` |
| Mixed demo/production code paths | Buyer due-diligence red flag | Separate cleanly; label demo |

---

## 15. Work required before WinterVell can be sold responsibly

Ranked by priority:

1. **SSRF protection** (critical — WinterVell accepts URLs)
2. **Remove call-centre architecture** (per Section 3)
3. **Rebrand to WinterVell** via central config (per Section 9)
4. **PostgreSQL production schema** with tenant scoping, indexes, FKs
5. **Permission-based authorization** on every sensitive server action (auth + org membership + permission + resource ownership)
6. **Rate limiting** on auth, audit-creation, share endpoints
7. **Security headers + CSP**
8. **Audit engine + evidence model** (core product)
9. **Report builder + PDF generation**
10. **Proposal + roadmap generation**
11. **Opportunity pipeline**
12. **White-labelling + service catalogue**
13. **AI provider abstraction** with mock provider
14. **Commercial licensing system** (graceful, non-destructive)
15. **Demonstration mode** with Northstar Digital agency, clearly labelled
16. **Full legal/sales documentation** (this audit + `docs/legal/` + `sales-assets/`)
17. **CI/CD** (lint, type-check, unit/integration/tenant-isolation/SSRF tests, build)
18. **Separate Vercel project**, DB, domain, storage, auth secrets, email sender
19. **Trademark clearance** for "WinterVell" (formal, before major investment)
20. **Legal review** of all `docs/legal/` templates by a qualified lawyer

---

## Conclusion

Cloudsun provides a solid, permissively-licensed Next.js/Prisma/shadcn foundation and a reusable multi-tenant identity model. Its call-centre architecture (~30% of routes and libraries) is incompatible with WinterVell and must be removed cleanly. The principal commercial risks are (a) the public visibility of Cloudsun, (b) the client-side demo store masquerading as a data layer, and (c) the absence of SSRF protection, which is critical for WinterVell's URL-input feature. All three are addressed in the WinterVell plan above.

This audit is honest about what is reusable, what must be removed, and what is simulated. It does not assume a feature is production-ready merely because a screen exists.
