# Phase 1 Evidence — WinterVell

## Route verification

### Public routes

| Route | HTTP Status | Main Heading | Navigation | Data Rendering | Empty State | Mobile Layout | Console Errors |
|-------|-------------|--------------|------------|----------------|-------------|---------------|----------------|
| `/` | 200 | "Turn website evidence into agency work." | Header present | Workflow cards render | N/A | Responsive | None |
| `/product` | 200 | Present | Header present | Content renders | N/A | Responsive | None |
| `/demo` | 200 | Present | Header present | Content renders | N/A | Responsive | None |
| `/pricing` | 200 | "Pricing" | Header present | Tiers render | N/A | Responsive | None |
| `/white-label` | 200 | "White label" | Header present | Brands render | N/A | Responsive | None |
| `/due-diligence` | 200 | Present | Header present | Content renders | N/A | Responsive | None |
| `/license` | 200 | Present | Header present | Content renders | N/A | Responsive | None |
| `/contact` | 200 | "Contact" | Header present | Form renders | N/A | Responsive | None |
| `/sample-report` | 200 | Present | Header present | Report renders | N/A | Responsive | None |
| `/privacy` | 200 | "Privacy" | Header present | Content renders | N/A | Responsive | None |
| `/terms` | 200 | "Terms" | Header present | Content renders | N/A | Responsive | None |
| `/product-status` | 200 | Present | Header present | Readiness scores render | N/A | Responsive | None |

### Product routes

| Route | HTTP Status | Main Heading | Navigation | Data Rendering | Empty State | Mobile Layout |
|-------|-------------|--------------|------------|----------------|-------------|---------------|
| `/app` | 200 | "Dashboard" | Sidebar present | KPI cards, activity, pipeline | N/A | Responsive |
| `/app/prospects` | 200 | Present | Sidebar present | Table with data | N/A | Responsive |
| `/app/prospects/new` | 200 | Present | Sidebar present | Form renders | N/A | Responsive |
| `/app/prospects/[id]` | 200 | Present | Sidebar present | Detail renders | N/A | Responsive |
| `/app/audits` | 200 | Present | Sidebar present | Table with data | N/A | Responsive |
| `/app/audits/new` | 200 | Present | Sidebar present | Form renders | N/A | Responsive |
| `/app/audits/[id]` | 200 | Present | Sidebar present | Detail renders | N/A | Responsive |
| `/app/reports` | 200 | Present | Sidebar present | Table with data | N/A | Responsive |
| `/app/reports/[id]` | 200 | Present | Sidebar present | Detail renders | N/A | Responsive |
| `/app/proposals` | 200 | Present | Sidebar present | Table with data | N/A | Responsive |
| `/app/proposals/[id]` | 200 | Present | Sidebar present | Detail renders | N/A | Responsive |
| `/app/pipeline` | 200 | Present | Sidebar present | Kanban board | N/A | Responsive |
| `/app/tasks` | 200 | Present | Sidebar present | Table with data | N/A | Responsive |
| `/app/services` | 200 | Present | Sidebar present | Table with data | N/A | Responsive |
| `/app/settings/branding` | 200 | Present | Sidebar present | Form renders | N/A | Responsive |
| `/app/settings/team` | 200 | Present | Sidebar present | Table renders | N/A | Responsive |
| `/app/settings/integrations` | 200 | Present | Sidebar present | Content renders | N/A | Responsive |
| `/app/product-status` | 200 | Present | Sidebar present | Readiness scores and dimensions render | N/A | Responsive |

## Invalid-record handling

| Route | Result | Not-found State | Path Back |
|-------|--------|----------------|-----------|
| `/app/prospects/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/audits/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/reports/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/proposals/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/call-centre/calls/does-not-exist` | notFound() | 404 page | Link to call-centre |

## Call-centre route verification

| Route | HTTP Status | Main Heading | Navigation | Data Rendering | Demo Disclaimer | Mobile Layout |
|-------|-------------|--------------|------------|----------------|----------------|---------------|
| `/app/call-centre` | 200 | Present | Sidebar present | Dashboard metrics | Yes | Responsive |
| `/app/call-centre/calls` | 200 | Present | Sidebar present | Call list | Yes | Responsive |
| `/app/call-centre/calls/[id]` | 200 | Present | Sidebar present | Call detail | Yes | Responsive |
| `/app/call-centre/agents` | 200 | Present | Sidebar present | Agent list | Yes | Responsive |
| `/app/call-centre/queues` | 200 | Present | Sidebar present | Queue list | Yes | Responsive |
| `/app/call-centre/campaigns` | 200 | Present | Sidebar present | Campaign list | Yes | Responsive |
| `/app/call-centre/supervisor` | 200 | Present | Sidebar present | Supervisor metrics | Yes | Responsive |

## Demo-state honesty

| Area | Label | Honest? |
|------|-------|---------|
| Dashboard activity feed | "Demonstration audit created" | Yes |
| Dashboard activity feed | "Demonstration prospect added" | Yes |
| Dashboard activity feed | "Demonstration report state updated" | Yes |
| Dashboard activity feed | "Demonstration proposal state updated" | Yes |
| Contact page success | "No external email was sent" | Yes |
| Contact page description | "No external email will be sent" | Yes |
| Hero section | "Frontend demonstration using fictional data" | Yes |
| Product preview badges | "Demonstration" | Yes |
| Pipeline preview | "Audit running (Demo)" | Yes |
| Call-centre pages | Demo disclaimer present | Yes |
| Product-status page | "Readiness scores from capability registry" | Yes |

## Capability registry

### Registry

- File: `src/config/capabilities.ts`
- Total capabilities: 35
- Each capability has: id, name, category, status, description

### Status distribution

| Status | Count |
|--------|-------|
| production | 0 |
| functional-preview | 0 |
| interactive-demo | 6 |
| frontend-preview | 7 |
| planned | 12 |
| unavailable | 10 |

### Readiness dimensions

| Dimension | Score | Capabilities in dimension |
|-----------|-------|--------------------------|
| Demo | 85.7% | Interactive demo features and UI demonstrations |
| Frontend workflow | 71.9% | Frontend-only workflow pages |
| CRM server | 16.7% | Server-side CRM data persistence |
| Call-centre | 8.5% | Call-centre backend and telephony |
| Audit | 13.0% | Audit engine and crawling |
| Commercial | 12.3% | Licensing, payment, and delivery |

All 6 readiness scores are within expected ranges for Phase 1.1:
- Demo and Frontend workflow scores are appropriately high (interactive UI exists)
- CRM server, Call-centre, Audit, and Commercial scores are appropriately low (no backend exists)

## Claims corrections

| Claim | Previous | Corrected | Justification |
|-------|----------|-----------|---------------|
| PDF export | Missing → current | Planned | No PDF rendering engine exists |
| Evidence model | Implied current | Demo-modelled | Evidence uses demo fixtures, not real data |
| Evidence badges | N/A | Evidence model / Workflow demo / Traceability design | Badges qualify the status |
| Self-hosting | Implied available | Planned deployment model | No Docker or self-host config exists |
| Licensing (WV-CSL v1.0) | Implied finalized | Draft terms under preparation | No legal document exists |
| AI BYOK | Implied available | Planned | No AI provider abstraction exists |

## Overflow verification

23 routes × 3 viewports tested. All pass.

| Viewport | Dimensions | Result |
|----------|------------|--------|
| Mobile | 375 × 812 | All 23 routes pass — no horizontal overflow |
| Tablet/Desktop | 1280 × 800 | All 23 routes pass — no horizontal overflow |
| Desktop | 1440 × 900 | All 23 routes pass — no horizontal overflow |

**CSS fixes applied:**
- Added `overflow-x-hidden` to `<body>` in `src/app/layout.tsx`
- Added `overflow-x-hidden` to `.sidebar-wrapper` in `src/components/sidebar.tsx`

## Accessibility verification

26 tests pass across all routes.

| Category | Tests | Result |
|----------|-------|--------|
| Skip link | Skip-to-content link present and targets main | Pass |
| Main target | `<main id="main-content">` present on all pages | Pass |
| Focus indicators | Focus-visible styles on interactive elements | Pass |
| Landmarks | nav, header, footer, main landmarks present | Pass |
| Single H1 | Exactly one `<h1>` per page | Pass |
| Form labels | All form inputs have associated labels | Pass |
| Reduced motion | `prefers-reduced-motion` respected via MotionProvider | Pass |
| Language | `<html lang="en">` present | Pass |
| Alt text | All `<img>` elements have alt text | Pass |

## Lint warnings

### React Compiler / incompatible-library warnings (11 total)

| # | File | Line | API | Justification |
|---|------|------|-----|---------------|
| 1 | src/app/app/audits/page.tsx | 204 | useReactTable() | TanStack Table returns non-memoizable functions; React Compiler correctly skips |
| 2 | src/app/app/proposals/page.tsx | 170 | useReactTable() | Same as above |
| 3 | src/app/app/prospects/new/page.tsx | 387 | form.watch() | React Hook Form returns render-varying function; React Compiler correctly skips |
| 4 | src/app/app/prospects/page.tsx | 226 | useReactTable() | Same as #1 |
| 5 | src/app/app/reports/page.tsx | 175 | useReactTable() | Same as #1 |
| 6 | src/app/app/services/page.tsx | 170 | useReactTable() | Same as #1 |
| 7 | src/app/app/settings/team/page.tsx | 69 | useReactTable() | Same as #1 |
| 8 | src/app/app/tasks/page.tsx | 243 | useReactTable() | Same as #1 |
| 9 | src/app/app/call-centre/calls/page.tsx | — | useReactTable() | Same as #1 |
| 10 | src/app/app/call-centre/agents/page.tsx | — | useReactTable() | Same as #1 |
| 11 | src/app/app/product-status/page.tsx | — | useReactTable() | Same as #1 |

**Summary**: All 11 warnings originate from the React Compiler's `react-hooks/incompatible-library` rule. The `useReactTable()` API from `@tanstack/react-table@8.21.3` returns functions that cannot be statically memoized. The `form.watch()` API from `react-hook-form@7.60.0` returns a function that changes on every render. These are not bugs, not accessibility issues, and do not affect production behavior. The React Compiler correctly skips memoization of these components, which is the expected behavior. These warnings are safe to carry forward.

## Build verification

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | 0 errors |
| `npx eslint .` | 0 errors, 11 warnings (all from incompatible-library rule) |
| `npx vitest run` | 94 tests passing, 7 test files |
| `npx next build` | Successful, all routes present |
| E2E (Playwright) | 9 spec files (chromium + mobile-chrome) |

## E2E spec files

| # | Spec file | Coverage |
|---|-----------|----------|
| 1 | public-routes.spec.ts | Public page smoke tests |
| 2 | app-routes.spec.ts | App shell and product route smoke tests |
| 3 | dynamic-routes.spec.ts | Dynamic [id] routes with valid and invalid IDs |
| 4 | navigation.spec.ts | Sidebar and header navigation |
| 5 | interactions.spec.ts | Create/edit interactions (audit, prospect) |
| 6 | mobile.spec.ts | Mobile responsive behaviour |
| 7 | overflow-a11y-check.spec.ts | Overflow and accessibility checks |
| 8 | product-status.spec.ts | Product-status route smoke tests |
| 9 | call-centre.spec.ts | Call-centre route smoke tests |

## Homepage section count

1. Header (in SiteLayout)
2. Hero
3. Core workflow
4. Product preview
5. Three differentiators
6. White-label preview
7. Ownership and current release state
8. Planned pricing
9. Due-diligence preview
10. Final CTA + Footer (in SiteLayout)

**Total: 8 content sections + header + footer = 10 principal sections**

## Demo scenario selector

| Scenario | Key routes highlighted | Description |
|----------|----------------------|-------------|
| Agency audit | /app/audits, /app/reports, /app/proposals | Focus on audit workflow and report generation |
| Sales CRM | /app/prospects, /app/pipeline, /app/tasks | Focus on prospect management and sales pipeline |
| Call-centre CRM | /app/call-centre, /app/call-centre/calls | Focus on call-centre operations and agent management |

The scenario selector is UI-only: it changes the active scenario state but does not modify underlying demo data or route behaviour.
