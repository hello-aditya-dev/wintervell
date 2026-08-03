# WinterVell — Known Limitations

**Date:** 2026-08-05
**Branch:** agent/wintervell-phase-01-frontend

## Product Limitations

### No Backend

- The application has no server-side data persistence beyond the contact form
- All product routes render with deterministic demo data
- No real API endpoints exist for creating, reading, updating, or deleting data
- The contact form returns an honest success message but does not save or send data

### No Database

- The current Prisma schema uses SQLite with tutorial models (User, Post)
- These models have no relation to the WinterVell product domain
- No migration history exists for the product
- No seed data exists for the product

### No Authentication

- No login, registration, or session management exists
- No user accounts exist
- No organisation membership exists
- No role-based access control exists
- The application is entirely unauthenticated
- `next-auth` was removed in Phase 1 (was installed but unused)

### No Audit Engine

- No website crawling or analysis engine exists
- No audit rules are implemented
- No evidence collection occurs
- No scoring system exists
- The audit workflow shown in the demo is entirely simulated

### No Real Reports

- No report generation engine exists
- No PDF rendering exists
- No report sharing exists
- The report builder interface shows demo data only

### No Real Proposals

- No proposal generation engine exists
- No finding-to-service mapping exists
- The proposal builder interface shows demo data only

### No Real Pipeline

- No opportunity persistence exists
- No pipeline state management exists
- Pipeline movement in the demo does not persist

### No White-Label Engine

- Brand settings are stored only in the demo Zustand store
- No logo upload or processing exists
- No custom domain configuration exists
- No report-level branding is applied

### No Call-Centre Backend

- Call-centre pages are frontend-only demonstration with demo data
- No telephony (SIP/PSTN) connection exists
- No real call recording or storage exists
- No real agent session management exists
- No real queue routing exists
- Campaign auto-dialler is labelled as planned; no auto-dialler exists
- Call detail view includes a recording placeholder; no recording playback
- Supervisor dashboard shows static demo metrics; no real-time monitoring
- No WebSocket feed for real-time call-centre metrics

### No Product-Status Backend Validation

- Product-status readiness scores are calculated from the capability registry (`src/config/capabilities.ts`)
- Scores do not reflect actual system test results or runtime verification
- Readiness percentages are based on weighted capability statuses, not measured outcomes
- The capability registry is a static configuration file, not auto-discovered

### Demo Scenario Selector Is UI-Only

- The scenario selector (Agency audit, Sales CRM, Call-centre CRM) changes the active scenario state in the UI
- It does not change the underlying demo data or route behaviour
- All product data remains the same regardless of selected scenario
- Scenario selection is reset on page reload (no persistence)

### No AI Integration

- No AI provider abstraction exists
- No bring-your-own-key support exists (planned, not implemented)
- No AI-assisted features exist

### No Email Integration

- No email transport exists
- No notification delivery exists
- No invitation emails exist

### No Payment Integration

- No checkout provider is configured
- No webhook handling exists
- No licence issuance exists
- Purchasing is not open

### No Security Controls

- No rate limiting
- No CSRF protection
- No XSS sanitization
- No security headers
- No CSP
- No audit logging
- No tenant isolation

## Infrastructure Limitations

### Dependency Cleanup (Completed)

- ~~`next-intl` — installed but not used~~ Removed in Phase 1
- ~~`@mdxeditor/editor` — installed but not used~~ Removed in Phase 1
- ~~`react-syntax-highlighter` — installed but not used~~ Removed in Phase 1
- ~~`react-markdown` — installed but not used~~ Removed in Phase 1
- ~~`z-ai-web-dev-sdk` — must not be used in production runtime~~ Removed in Phase 1
- ~~`uuid` — installed but not used~~ Removed in Phase 1
- ~~`@reactuses/core` — installed but not used~~ Removed in Phase 1
- ~~`@tanstack/react-query` — installed but not used~~ Removed in Phase 1
- ~~`next-auth` — installed but not used~~ Removed in Phase 1
- ~~`sharp` — installed but not used~~ Removed in Phase 1
- `prisma` — moved to devDependencies (not needed at runtime)

### Build Memory Requirements

- Production build requires `NODE_OPTIONS="--max-old-space-size=256"` to avoid OOM
- The application has many dynamic components that increase compilation memory usage
- This may affect CI/CD environments with limited memory

### CI/CD Pipeline

- GitHub Actions workflow created (`.github/workflows/ci.yml`)
- Workflow runs typecheck, lint, unit tests, build, and E2E tests
- No branch protection or required checks configured in GitHub
- Vercel deployment is still a manual push (no preview deploy integration)

## Data Limitations

### Demo Data Only

- All product routes render with hardcoded fixture data
- The Zustand demo store provides client-side state only
- No data persists across page reloads (unless using the demo store)
- The demo reset action clears all client-side state

### No Real Users

- No user accounts exist
- No organisation membership exists
- The team settings page shows demo data

## State Quality Limitations

### Incomplete State Coverage

- Not all principal screens have been verified for loading, empty, error, and success states
- Some screens may lack graceful error handling for edge cases
- Confirmation dialogs for destructive demo actions are not yet systematically implemented

## Test Limitations

### Limited Test Scope

- Unit tests cover demo store, capability registry, readiness calculation, and component behaviour (94 tests across 7 test files)
- E2E tests cover route smoke tests, critical interactions, overflow, accessibility, product-status, and call-centre (9 spec files)
- No integration tests between frontend and backend (no backend exists)
- No authorization tests (no auth exists)
- No tenant-isolation tests (no tenancy exists)
- Accessibility tests are Playwright-based (26 checks), not axe-core automated scans
- E2E tests run against a local dev server (Playwright); not yet executed against a deployed build

### React Compiler Warnings

- 11 warnings from React Compiler's `react-hooks/incompatible-library` rule
- 7 from TanStack Table `useReactTable()` (v8.21.3)
- 1 from React Hook Form `form.watch()` (v7.60.0)
- 3 additional warnings from call-centre and product-status components using TanStack Table
- These are not bugs and do not affect functionality; React Compiler correctly skips memoization
- 0 lint errors; all 11 warnings are documented and safe to carry forward

## Legal Limitations

### No Legal Documents

- No commercial licence document exists
- No EULA exists
- No privacy policy exists
- No terms of service exists
- No data processing addendum exists
- No contributor agreements exist

### No Licence Delivery

- No source delivery mechanism exists
- No licence validation exists
- No purchase record exists

## Honest Statements

The following are true statements about the current product:

1. WinterVell is a source-code product in development.
2. The interactive frontend demonstration shows the planned product interface using fictional data.
3. All simulated actions are labelled as demo — no simulated action implies an external action occurred.
4. The backend implementation has not been started.
5. Purchasing is not yet open.
6. No real audits, reports, or proposals can be generated.
7. No authentication or authorization exists.
8. The product is a frontend prototype only.
9. Unit tests (94 across 7 files) and E2E tests (9 spec files) exist for the frontend demo.
10. All invalid detail IDs fail safely with not-found pages.
11. Call-centre pages are frontend-only demonstration; no telephony connection exists.
12. Product-status readiness scores are derived from a static capability registry, not from actual system tests.
13. The demo scenario selector changes UI state only; it does not alter underlying data.
