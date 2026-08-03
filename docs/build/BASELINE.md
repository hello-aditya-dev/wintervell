# WinterVell — Baseline Audit

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline
**Auditor:** Z.ai Phase 0 agent

## 1. Repository Overview

| Property | Value |
|---|---|
| Repository | `github.com/witejackel-eng/wintervell` |
| Primary branch | `main` |
| Existing branch | `agent/frontend-rebuild` (previous work) |
| Framework | Next.js 16.1.1 (App Router) |
| Language | TypeScript 5 |
| Runtime | Bun |
| Deployment | Vercel (`wintervell-nu.vercel.app`) |
| Total TS/TSX files | 143 |

## 2. Routes

### Public routes

| Route | Purpose | Status |
|---|---|---|
| `/` | Homepage (10 sections) | Working, frontend only |
| `/product` | Product overview | Working, frontend only |
| `/demo` | Demo information | Working, frontend only |
| `/white-label` | White-label preview | Working, frontend only |
| `/pricing` | Pricing details | Working, frontend only |
| `/due-diligence` | Due-diligence preview | Working, frontend only |
| `/license` | Licence information | Working, frontend only |
| `/contact` | Contact form | Working, frontend only |
| `/sample-report` | Sample report view | Working, demo data |

### Application routes (product frontend)

| Route | Purpose | Status |
|---|---|---|
| `/app` | Dashboard | Demo data, no backend |
| `/app/prospects` | Prospect list | Demo data, no backend |
| `/app/prospects/new` | New prospect form | Demo data, no backend |
| `/app/prospects/[id]` | Prospect detail | Demo data, no backend |
| `/app/audits` | Audit list | Demo data, no backend |
| `/app/audits/new` | New audit form | Demo data, no backend |
| `/app/audits/[id]` | Audit detail with findings | Demo data, no backend |
| `/app/reports` | Report list | Demo data, no backend |
| `/app/reports/[id]` | Report builder | Demo data, no backend |
| `/app/proposals` | Proposal list | Demo data, no backend |
| `/app/proposals/[id]` | Proposal builder | Demo data, no backend |
| `/app/pipeline` | Kanban pipeline | Demo data, no backend |
| `/app/tasks` | Task list | Demo data, no backend |
| `/app/services` | Service catalogue | Demo data, no backend |
| `/app/settings/branding` | Brand settings | Demo data, no backend |
| `/app/settings/team` | Team settings | Demo data, no backend |
| `/app/settings/integrations` | Integration settings | Demo data, no backend |

### API routes

| Route | Purpose | Status |
|---|---|---|
| `/api/contact` | POST contact form | Working, no persistence |
| `/api` | Health check | Working |

## 3. Components

### Public site components (10)

| Component | Location | Type |
|---|---|---|
| Header | `src/components/site/Header.tsx` | Client |
| Footer | `src/components/site/Footer.tsx` | Server |
| HeroSection | `src/components/site/HeroSection.tsx` | Server |
| CoreWorkflow | `src/components/site/CoreWorkflow.tsx` | Server |
| ProductPreview | `src/components/site/ProductPreview.tsx` | Server |
| Differentiators | `src/components/site/Differentiators.tsx` | Server |
| WhiteLabelPreview | `src/components/site/WhiteLabelPreview.tsx` | Client |
| OwnershipDeployment | `src/components/site/OwnershipDeployment.tsx` | Server |
| PricingPreview | `src/components/site/PricingPreview.tsx` | Server |
| DueDiligencePreview | `src/components/site/DueDiligencePreview.tsx` | Server |
| FinalCTA | `src/components/site/FinalCTA.tsx` | Server |
| SiteLayout | `src/components/site/SiteLayout.tsx` | Server |

### App shell components (5)

| Component | Location | Type |
|---|---|---|
| AppShell | `src/components/app-shell/AppShell.tsx` | Client |
| Sidebar | `src/components/app-shell/Sidebar.tsx` | Client |
| TopBar | `src/components/app-shell/TopBar.tsx` | Client |
| DemoBanner | `src/components/app-shell/DemoBanner.tsx` | Client |
| CommandMenu | `src/components/app-shell/CommandMenu.tsx` | Client |

### Shared components (5)

| Component | Location | Type |
|---|---|---|
| DemoLabel | `src/components/shared/DemoLabel.tsx` | Server |
| Breadcrumbs | `src/components/shared/Breadcrumbs.tsx` | Server |
| FilterBar | `src/components/shared/FilterBar.tsx` | Client |
| EmptyState | `src/components/shared/EmptyState.tsx` | Server |

### UI components (shadcn/ui)

Complete set of shadcn/ui components in `src/components/ui/` (40+ components).

## 4. Demo Data Architecture

| Type | Location | Purpose |
|---|---|---|
| Fixtures | `src/demo/fixtures/` | Static demo data arrays |
| Repositories | `src/demo/repositories/` | Typed access to demo data |
| State | `src/demo/state/demo-store.ts` | Zustand store for demo state |
| Types | `src/demo/types/` | TypeScript interfaces for demo data |

### Fixtures (9)

- `audits.ts`, `findings.ts`, `opportunities.ts`, `proposals.ts`
- `prospects.ts`, `reports.ts`, `services.ts`, `tasks.ts`, `users.ts`

### Repositories (5)

- `audit-repository.ts`, `pipeline-repository.ts`, `proposal-repository.ts`
- `report-repository.ts`, `prospect-repository.ts`

### Types (8)

- `audit.ts`, `finding.ts`, `opportunity.ts`, `proposal.ts`
- `prospect.ts`, `report.ts`, `service.ts`, `task.ts`

## 5. Database

### Current schema

The Prisma schema uses **SQLite** with two tutorial models:

- `User` (id, email, name, createdAt, updatedAt)
- `Post` (id, title, content, published, authorId, createdAt, updatedAt)

These are generic tutorial models from the project scaffold. They have **no relation** to the WinterVell product domain.

### Database file

- `db/custom.db` (SQLite)
- `DATABASE_URL=file:/home/z/my-project/db/custom.db`

### Assessment

The database is **not a WinterVell product database**. It contains placeholder tutorial models. The entire schema needs to be replaced with the WinterVell domain model (Phase 2).

## 6. Authentication

### Current state

- `next-auth` v4.24.11 is installed as a dependency
- No auth configuration files exist
- No auth API routes exist
- No login/register pages exist
- No session management is implemented

### Assessment

Authentication is **not implemented**. The `next-auth` package is installed but entirely unused.

## 7. API Routes

### `/api/contact` (POST)

- Validates input with Zod (name, email, message, honeypot)
- Returns 200 on success
- **No persistence** — the contact form does not save data anywhere
- **No email sending** — no notification is sent

### `/api` (GET)

- Health check endpoint returning `{ status: "ok" }`

### Assessment

API routes are minimal. The contact form is a frontend-only experience that does not persist or notify.

## 8. Environment Variables

### Current `.env`

```
DATABASE_URL=file:/home/z/my-project/db/custom.db
```

### Missing

- No `.env.example` file
- No auth configuration
- No checkout provider configuration
- No AI provider configuration
- No storage configuration
- No email configuration
- No observability configuration

## 9. Dependencies

### Key dependencies (77 total)

| Package | Version | Purpose |
|---|---|---|
| next | ^16.1.1 | Framework |
| react | ^19.0.0 | UI library |
| zod | ^4.0.2 | Validation |
| prisma | ^6.11.1 | ORM |
| next-auth | ^4.24.11 | Auth (unused) |
| framer-motion | ^12.23.2 | Animation |
| recharts | ^2.15.4 | Charts |
| sharp | ^0.34.3 | Image processing |
| zustand | ^5.0.6 | State management |
| @tanstack/react-table | ^8.21.3 | Data tables |
| @tanstack/react-query | ^5.82.0 | Server state |
| react-hook-form | ^7.60.0 | Forms |
| cmdk | ^1.1.1 | Command menu |
| vaul | ^1.1.2 | Drawer |
| date-fns | ^4.1.0 | Date utilities |
| sonner | ^2.0.6 | Toast notifications |
| z-ai-web-dev-sdk | ^0.0.18 | AI SDK (dev only) |

### Concerns

- `z-ai-web-dev-sdk` is installed but should not be used in production runtime
- `next-intl` is installed but not used (no internationalization)
- `@mdxeditor/editor` is installed but not used
- `react-syntax-highlighter` is installed but not used
- `react-markdown` is installed but not used
- `uuid` is installed but demo data uses deterministic IDs

## 10. Tests

### Current state

- **No test files exist** in the project
- No `vitest.config.*` or `playwright.config.*` exists
- No test scripts in `package.json`
- No test utilities or fixtures

### Assessment

The project has **zero test coverage**. No unit, integration, or E2E tests exist.

## 11. Build and Lint

### Typecheck

- TypeScript errors exist only in non-project files (examples, skills)
- Project source files pass type checking

### Lint

- 8 warnings (all `react-hooks/incompatible-library` for TanStack Table)
- 0 errors

### Build

- Production build passes with `NODE_OPTIONS="--max-old-space-size=256"`

## 12. Product Claims

### Claims that are honest

- "Interactive frontend demonstration" — accurate
- "Planned founding pricing" — accurate
- "Purchasing is not yet open" — accurate
- "Source-code product in development" — accurate
- "Self-hosting planned" — accurate
- "Commercial licensing planned" — accurate

### Claims that are misleading or unsupported

| Claim | Location | Issue |
|---|---|---|
| JSON-LD `featureList` includes "PDF rendering with selectable text" | `layout.tsx` | Not implemented |
| JSON-LD `featureList` includes "Multi-tenant architecture" | `layout.tsx` | Not implemented |
| JSON-LD `featureList` includes "White-label audit engine" | `layout.tsx` | Not implemented as engine |
| JSON-LD `featureList` includes "Branded report builder" | `layout.tsx` | Frontend demo only |
| JSON-LD `featureList` includes "Proposal generator" | `layout.tsx` | Frontend demo only |
| JSON-LD `featureList` includes "Prospect pipeline management" | `layout.tsx` | Frontend demo only |
| JSON-LD `featureList` includes "9 audit categories" | `layout.tsx` | Defined but not implemented as engine |
| JSON-LD `featureList` includes "11-stage sales pipeline" | `layout.tsx` | Frontend demo only |
| JSON-LD `featureList` includes "Full source code included" | `layout.tsx` | Not delivered yet |
| sitemap uses `wintervell.example` | `sitemap.ts` | Placeholder domain |
| robots.txt uses `wintervell.example` | `robots.ts` | Placeholder domain |
| Contact form sends "success" message | `contact/route.ts` | No data persisted, no email sent |

### Previously removed (in earlier commits)

- Fictional testimonials — removed
- "Trusted by agencies" — removed
- "Only 10 left" scarcity — removed
- Fake review cards — removed
- Anchor pricing ($1199/$2199) — removed
- "InStock" schema.org availability — removed
- Interactive audit demo (arbitrary URL simulation) — removed
- Decorative motion (particles, glows, typing animations) — removed

## 13. Security

### Current state

- No authentication
- No authorization
- No rate limiting
- No CSRF protection
- No input sanitization on contact form beyond Zod validation
- No security headers
- No CSP
- Contact form has honeypot but no server-side persistence
- No audit logging
- No file upload handling

### Assessment

The application has **no security controls**. It is a frontend-only prototype.

## 14. Deployment

### Current state

- Deployed to Vercel at `wintervell-nu.vercel.app`
- Custom domain `wintervell.com` may be configured
- No worker deployment
- No separate database server
- No CI/CD pipeline

## 15. Documentation

### Existing docs

| File | Purpose | Status |
|---|---|---|
| `docs/frontend/current-frontend-audit.md` | Component audit | Exists, useful |
| `docs/commercial/product-claims-register.md` | Claims register | Exists, basic |

### Missing docs

- No README.md (or inadequate)
- No CHANGELOG.md
- No SECURITY.md
- No CONTRIBUTING.md
- No .env.example
- No architecture documentation
- No build documentation
- No deployment documentation
- No legal documentation
- No security documentation
- No operations documentation

## 16. Cloudsun Reference

- Cloudsun repository: `github.com/witejackel-eng/cloudsun`
- May contain reusable CRM architecture and code patterns
- Not yet inspected for this baseline
- Must not be modified
- Any reused code must be recorded in provenance documentation

## 17. Summary

The WinterVell repository is an **incomplete prototype** with:

- A functional public marketing site (10 sections, honestly labelled)
- A product frontend with demo data (17 application routes)
- No backend implementation
- No database (tutorial models only)
- No authentication
- No real audit engine
- No real report generation
- No real proposal generation
- No real pipeline
- No test coverage
- No security controls
- No production deployment infrastructure
- Minimal API routes (contact form does not persist)
- Some JSON-LD structured data claims that are still misleading

The public site has been significantly cleaned up from a previous state with excessive marketing sections, fictional testimonials, fake scarcity, and decorative motion. The remaining honesty issues are primarily in the JSON-LD structured data and placeholder domains.
