# Phase 1 — Frontend Product Experience

## Status

In progress.

## Intent

Complete and verify the existing frontend implementation rather than duplicating it. The repository already contains the public-site rebuild, application shell, demo repositories and the principal product routes. This phase must establish that those interfaces are coherent, honest, responsive and testable.

## Required route inventory

### Public

- `/`
- `/product`
- `/demo`
- `/pricing`
- `/white-label`
- `/due-diligence`
- `/license`
- `/contact`
- `/sample-report`

### Product

- `/app`
- `/app/prospects`
- `/app/prospects/new`
- `/app/prospects/[id]`
- `/app/audits`
- `/app/audits/new`
- `/app/audits/[id]`
- `/app/reports`
- `/app/reports/[id]`
- `/app/proposals`
- `/app/proposals/[id]`
- `/app/pipeline`
- `/app/tasks`
- `/app/services`
- `/app/settings/branding`
- `/app/settings/team`
- `/app/settings/integrations`

## Work packages

### 1. Route and navigation verification

- Verify every listed route returns successfully.
- Verify header, sidebar, breadcrumbs and command menu links.
- Verify dynamic fixture IDs resolve to valid detail pages.
- Provide useful not-found behavior for invalid IDs.
- Remove links to missing or future routes.

### 2. Demo honesty

- Keep the persistent demo banner.
- Label every simulated create, update, publish, send, export, audit, payment and integration action.
- Ensure success toasts do not imply an external action occurred.
- Ensure purchasing remains unavailable.
- Ensure no customer testimonial, customer logo, live-count or scarcity claim is fabricated.

### 3. State quality

Every principal screen must have:

- Loading state where asynchronous behavior is represented.
- Empty state.
- Error state or recoverable fallback.
- Permission-disabled explanation where relevant.
- Success feedback.
- Confirmation for destructive demo actions.

### 4. Responsive and accessibility verification

Verify at minimum:

- 375 × 812 mobile
- 768 × 1024 tablet
- 1440 × 900 desktop

Check:

- No horizontal overflow.
- Sidebar and mobile drawer behavior.
- Tables remain usable.
- Dialog focus management.
- Keyboard-accessible pipeline controls.
- Visible focus indicators.
- Correct labels and headings.
- Reduced-motion behavior.
- Adequate contrast.

### 5. Test foundation

Install and configure:

- Vitest
- Testing Library
- jsdom
- Playwright Test

Replace the intentionally failing placeholder scripts.

Minimum unit coverage:

- Demo repository filtering.
- Demo store reset.
- Stable deterministic fixture IDs.
- Status and severity presentation logic.
- Invalid record lookup behavior.

Minimum browser coverage:

- All public routes.
- All static application routes.
- One prospect detail.
- One audit detail.
- One report detail.
- One proposal detail.
- Sidebar navigation.
- Command menu navigation.
- Demo reset.
- Mobile navigation.

### 6. Dependency cleanup

- Confirm whether each non-core dependency is used.
- Remove `z-ai-web-dev-sdk` unless required solely by an isolated development tool.
- Move development-only tools to `devDependencies`.
- Remove unused markdown, internationalization or editor dependencies unless a current route imports them.
- Run a clean install and production build after changes.

### 7. Documentation correction

- Replace stale 2025 dates in active build documentation with accurate 2026 dates or fixture-date explanations.
- Distinguish fixture dates from verification dates.
- Update `FEATURE_MATRIX.md`, `KNOWN_LIMITATIONS.md` and `PRODUCT_CLAIMS_REGISTER.md` after verification.

## Acceptance gate

Phase 1 is complete only when:

- The homepage contains no more than ten principal sections.
- Every required public and application route renders.
- Invalid detail IDs fail safely.
- No fabricated proof or scarcity remains.
- Every simulation is labelled.
- No hydration warning is observed.
- No horizontal overflow is observed at required widths.
- Typecheck passes.
- Lint passes.
- Production build passes.
- Unit tests pass.
- Route smoke and critical interaction tests pass.
- Desktop and mobile evidence is recorded.
- A Vercel preview deployment is attached to the pull request.
- `PHASE_STATUS.md` is updated with exact results.

## Required completion report

Record:

- Branch and pull request
- Final commit
- Preview URL
- Routes tested
- Viewports tested
- Commands run and exact outcomes
- Test inventory
- Files added, changed and removed
- Remaining demo limitations
- Claims now permitted
- Claims still prohibited
- Whether Phase 2 may begin
