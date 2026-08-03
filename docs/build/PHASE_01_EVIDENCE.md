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

## Invalid-record handling

| Route | Result | Not-found State | Path Back |
|-------|--------|----------------|-----------|
| `/app/prospects/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/audits/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/reports/does-not-exist` | notFound() | 404 page | Link to dashboard |
| `/app/proposals/does-not-exist` | notFound() | 404 page | Link to dashboard |

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

## Console warnings

### TanStack Table / React Hook Form warnings (8 total)

| # | File | Line | API | Trigger |
|---|------|------|-----|---------|
| 1 | src/app/app/audits/page.tsx | 204 | useReactTable() | React Compiler memoization analysis |
| 2 | src/app/app/proposals/page.tsx | 170 | useReactTable() | React Compiler memoization analysis |
| 3 | src/app/app/prospects/new/page.tsx | 387 | form.watch() | React Compiler memoization analysis |
| 4 | src/app/app/prospects/page.tsx | 226 | useReactTable() | React Compiler memoization analysis |
| 5 | src/app/app/reports/page.tsx | 175 | useReactTable() | React Compiler memoization analysis |
| 6 | src/app/app/services/page.tsx | 170 | useReactTable() | React Compiler memoization analysis |
| 7 | src/app/app/settings/team/page.tsx | 69 | useReactTable() | React Compiler memoization analysis |
| 8 | src/app/app/tasks/page.tsx | 243 | useReactTable() | React Compiler memoization analysis |

**Justification**: All 8 warnings originate from the React Compiler's `react-hooks/incompatible-library` rule. The `useReactTable()` API from `@tanstack/react-table@8.21.3` returns functions that cannot be statically memoized. The `form.watch()` API from `react-hook-form@7.60.0` returns a function that changes on every render. These are not bugs, not accessibility issues, and do not affect production behavior. The React Compiler correctly skips memoization of these components, which is the expected behavior. These warnings are safe to carry forward.

## Build verification

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | 0 errors |
| `npx eslint .` | 0 errors, 8 warnings (all from incompatible-library rule) |
| `npx vitest run` | 160 tests passing, 5 test files |
| `npx next build` | Successful, all routes present |

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
