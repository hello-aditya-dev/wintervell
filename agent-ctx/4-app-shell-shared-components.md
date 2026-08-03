# Task: Application Shell & Shared Product Components

## Agent: frontend-rebuild

## Summary

Created the complete application shell and shared product components for the WinterVell product frontend. This is the foundation for the entire `/app` route.

## Files Created

### App Shell Components (`src/components/app-shell/`)

1. **Sidebar.tsx** — Collapsible left sidebar using shadcn/ui Sidebar primitives. Desktop: icon-collapsible mode with navigation groups (Overview, Sales, Audit, Configuration). Mobile: becomes a Sheet drawer. Uses `usePathname` for active state detection, `Link` for navigation.

2. **TopBar.tsx** — Compact top bar with breadcrumbs (derived from current route), organisation switcher (disabled, "Demo"), demo badge (amber), command menu trigger (Ctrl+K), notifications placeholder (disabled), user menu placeholder (disabled).

3. **AppShell.tsx** — Combines SidebarProvider + Sidebar + SidebarInset + TopBar + DemoBanner + CommandMenu. Registers global Ctrl+K keyboard shortcut.

4. **CommandMenu.tsx** — cmdk-based command palette with navigation commands (Dashboard, Prospects, Pipeline, Audits, Reports, Proposals, Branding) and action commands (New Prospect, New Audit).

5. **DemoBanner.tsx** — Persistent but dismissible amber banner: "Frontend demonstration — fictional data; no live audit, email or payment actions occur." Dismissed state stored in sessionStorage (per-session only).

6. **index.ts** — Barrel export for app-shell components.

### Shared Product Components (`src/components/shared/`)

1. **PageHeader.tsx** — Reusable page header with title, description, and actions slot.
2. **StatCard.tsx** — Compact stat card with label, value, change indicator, and trend arrow.
3. **FilterBar.tsx** — Horizontal filter bar with search input, select filters, clear button, and action buttons.
4. **EmptyState.tsx** — Centered empty state with icon, title, description, and optional action.
5. **StatusBadge.tsx** — Badge for all status types (audit, finding, proposal, opportunity, report, prospect, task, service) with color-coded styles.
6. **SeverityBadge.tsx** — Color-coded severity badge using the CSS custom properties from globals.css (`severity-critical`, `severity-high`, etc.).
7. **ScoreBadge.tsx** — Score display with color coding: red < 40, amber 40-70, green > 70.
8. **DemoLabel.tsx** — Small amber "Demo"/"Demonstration" label for simulated actions.
9. **ConfirmDialog.tsx** — Wrapper around shadcn AlertDialog with destructive variant support.
10. **CurrencyValue.tsx** — Formatted currency display with compact notation support.
11. **DateValue.tsx** — Formatted date display using date-fns with relative time tooltip.
12. **PersonAvatar.tsx** — Avatar with initials fallback.
13. **Breadcrumbs.tsx** — Breadcrumb navigation using current route path.
14. **index.ts** — Barrel export for shared components.

### App Route

- **`src/app/app/layout.tsx`** — Wraps all `/app` routes with AppShell.
- **`src/app/app/page.tsx`** — Dashboard page with stat cards showing demo data.

## Design Decisions

- Used the existing shadcn/ui Sidebar component (with SidebarProvider, SidebarInset, etc.) as the foundation rather than building from scratch — this gives us collapsible behavior, mobile sheet, keyboard shortcut, and accessibility out of the box.
- Used CSS custom properties from globals.css for severity colors (`severity-critical`, `severity-high`, etc.) and the `dot-*` utilities for severity dots.
- Used the WinterVell design system's typography scale utilities (`text-h2`, `text-h4`, `text-label`, `text-small`, etc.) and color variables.
- No decorative animations — CSS transitions only (200ms ease-linear on sidebar collapse).
- All components use `'use client'` directive as they are interactive.
- Mobile-first responsive design with proper breakpoints.

## Verification

- `bun run lint` — Passes with no errors
- `/app` route — Returns 200, renders successfully
- `/` route (marketing site) — Still returns 200, unaffected
