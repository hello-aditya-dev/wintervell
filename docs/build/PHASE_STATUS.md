# Phase Status — WinterVell

## Phase 0: Baseline, truth and architecture
**Status: Complete**

## Phase 1: Frontend verification and completion
**Status: Complete**

### Completed
- Rejected Round 5 components deleted
- Homepage restructured to 10 sections
- Hero corrected with honest copy and truth label
- Excessive motion removed from all site components
- Pricing corrected with "Planned founding price" format
- All public routes verified (11 routes)
- All product routes verified (17 routes)
- Invalid-record handling with notFound() on all detail pages
- Demo-state honesty labels corrected
- Privacy and Terms pages created
- 6 unit tests passing (1 test file)
- E2E tests: 58 tests passing across 7 spec files (chromium + mobile-chrome)
- Overflow verification: 23 routes × 3 viewports all pass (2 CSS fixes applied)
- A11y verification: 26 tests pass (skip link, main target, focus indicators, landmarks, single H1, form labels, reduced motion, lang, alt text)
- Build passes with 0 errors
- Typecheck passes with 0 errors
- Lint passes with 0 errors (8 upstream warnings documented)
- Dependency cleanup: 10 unused packages removed, prisma moved to devDependencies
- CI workflow created (.github/workflows/ci.yml)
- Duplicate vitest.config.ts deleted (keeping vitest.config.mts)
- agent-ctx/ and worklog.md added to .gitignore
- examples/ and skills/ directories removed and gitignored
- Vercel preview deployment READY

## Phase 1.1: Demo readiness, call-centre scenario, claim accuracy
**Status: Complete**

### Completed
- Call-centre demonstration routes added:
  - `/app/call-centre` — dashboard
  - `/app/call-centre/calls` — call list
  - `/app/call-centre/calls/[id]` — call detail
  - `/app/call-centre/agents` — agent list
  - `/app/call-centre/queues` — queue management
  - `/app/call-centre/campaigns` — campaign management
  - `/app/call-centre/supervisor` — supervisor dashboard
- Product-status pages added:
  - `/product-status` — public readiness page
  - `/app/product-status` — app readiness page with detailed breakdown
- Capability registry created: `src/config/capabilities.ts` with 35 capabilities
- 6 readiness dimensions implemented:
  - Demo: 85.7%
  - Frontend workflow: 71.9%
  - CRM server: 16.7%
  - Call-centre: 8.5%
  - Audit: 13.0%
  - Commercial: 12.3%
- Demo scenario selector added (3 scenarios: Agency audit, Sales CRM, Call-centre CRM)
- Workflow cards now link to exact routes instead of `/app`
- Metadata uses NEXT_PUBLIC_SITE_URL env var
- Claims corrected:
  - PDF export → planned (not current)
  - Evidence → demo-modelled (badges: Evidence model, Workflow demo, Traceability design)
  - Self-hosting → planned deployment model
  - Licensing → draft terms under preparation (WV-CSL v1.0 is draft, not finalized)
  - AI BYOK → planned (not implemented)
- Demo disclaimer on every call-centre page
- Unit tests: 94 tests across 7 test files
- E2E tests: 9 spec files (added product-status, call-centre)
- Lint: 0 errors, 11 warnings (react-hooks/incompatible-library from TanStack Table and form.watch())

### Remaining
- None for Phase 1.1 gate

## Final commit
`90720a2e8985439a204d0bebbf3bb10e2e1acef2`

## Preview URL
https://wintervell-r6goevz4o-witejackel-4928s-projects.vercel.app

## Vercel deployment state
READY (success)
