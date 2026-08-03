# WinterVell — Demo Scenarios

**Date:** 2026-08-05
**Branch:** agent/wintervell-phase-01-frontend

## Purpose

The demo scenario selector allows visitors to choose which product workflow they want to explore. Each scenario highlights different routes and features of WinterVell, providing a focused demonstration of the planned product capabilities.

## The 3 Scenarios

### 1. Agency Audit

**Focus:** Website audit workflow for digital agencies

**Description:** Demonstrates how a digital agency would use WinterVell to audit client websites, collect findings, generate branded reports, and prepare proposals for remediation work.

**Key routes highlighted:**
- `/app/audits` — Audit list with status tracking
- `/app/audits/new` — Create new audit (demo)
- `/app/audits/[id]` — Audit detail with findings
- `/app/reports` — Report list
- `/app/reports/[id]` — Report builder with sections
- `/app/proposals` — Proposal list
- `/app/proposals/[id]` — Proposal builder with line items

**Demo data:**
- 3 audit records with findings (accessibility, security, performance categories)
- 3 report records with sections and severity breakdown
- 3 proposal records with service line items and pricing
- Finding evidence with demo screenshots and URLs

**Workflow demonstrated:**
1. Create audit for a client website
2. Review findings grouped by severity
3. Generate branded report with findings
4. Create proposal mapping findings to services
5. Track proposal through pipeline

### 2. Sales CRM

**Focus:** Prospect management and sales pipeline

**Description:** Demonstrates how a sales team would use WinterVell to manage prospects, track opportunities through a pipeline, assign tasks, and close deals.

**Key routes highlighted:**
- `/app/prospects` — Prospect list with search and filters
- `/app/prospects/new` — Create new prospect (demo)
- `/app/prospects/[id]` — Prospect detail with activity history
- `/app/pipeline` — Kanban pipeline view with drag-and-drop
- `/app/tasks` — Task management with assignments and due dates

**Demo data:**
- 5 prospect records with company, contact, and status details
- 6 pipeline opportunities across stages (lead → qualified → proposal → negotiation → closed)
- 8 tasks with assignees, due dates, and priorities

**Workflow demonstrated:**
1. Add new prospect with company details
2. Create opportunity in pipeline
3. Move opportunity through pipeline stages
4. Assign tasks related to opportunity
5. Track activity and communication history

### 3. Call-Centre CRM

**Focus:** Call-centre operations and agent management

**Description:** Demonstrates how a call-centre team would use WinterVell to manage inbound and outbound calls, monitor agent performance, and run calling campaigns.

**Key routes highlighted:**
- `/app/call-centre` — Dashboard with call volume and agent metrics
- `/app/call-centre/calls` — Call list with filters
- `/app/call-centre/calls/[id]` — Call detail with recording placeholder
- `/app/call-centre/agents` — Agent list with status
- `/app/call-centre/queues` — Queue management
- `/app/call-centre/campaigns` — Campaign management
- `/app/call-centre/supervisor` — Supervisor dashboard

**Demo data:**
- 5 call records with caller info, duration, and outcome
- 4 agent records with status and current call
- 3 queue records with wait times
- 2 campaign records with completion rates
- Supervisor metrics with real-time indicators

**Workflow demonstrated:**
1. View dashboard for call volume overview
2. Review individual call details and notes
3. Monitor agent availability and status
4. Manage queue wait times and overflow
5. Set up outbound calling campaigns
6. Supervisor real-time monitoring and intervention

## How the Scenario Selector Works

### Implementation

The scenario selector is implemented as a Zustand store slice:

- **Store**: `useDemoStore` with `activeScenario` property
- **Values**: `"agency-audit"` | `"sales-crm"` | `"call-centre-crm"`
- **Default**: `"agency-audit"` on first load
- **Persistence**: Not persisted — resets to default on page reload

### UI Location

The scenario selector appears in the app dashboard (`/app`) as a card allowing the user to switch between demo scenarios. The active scenario influences:

1. **Dashboard highlights** — The dashboard shows different workflow cards based on the active scenario
2. **Quick actions** — The "Get started" links point to the most relevant route for the scenario
3. **Workflow emphasis** — The activity feed emphasizes events relevant to the active scenario

### What Does NOT Change

- **Underlying demo data** — All fixture data remains the same regardless of scenario
- **Route behaviour** — All routes render the same data; no routes are hidden or shown based on scenario
- **Navigation** — The sidebar always shows all product sections
- **Feature availability** — No features are enabled or disabled by scenario selection

This is by design: the scenario selector is a UI affordance to help visitors orient themselves, not a data partitioning mechanism.

## Which Routes Are Available in Each Scenario

All product routes are available in all scenarios. The scenario selector only affects:

| Route | Agency Audit | Sales CRM | Call-Centre CRM |
|-------|-------------|-----------|-----------------|
| `/app` | Audit workflow cards | Sales workflow cards | Call-centre workflow cards |
| All other `/app/*` routes | Same data | Same data | Same data |

The scenario selector does **not** restrict access to any routes. Users can navigate to any product route regardless of the active scenario.

## How to Reset Demo Data

### Scenario Reset

The scenario selector resets to the default (`"agency-audit"`) on page reload. There is no explicit "reset scenario" button because:

1. Scenario selection is UI-only and does not modify data
2. A page reload is the simplest and most reliable reset mechanism
3. No persisted state needs to be cleared

### Full Demo Reset

To reset all demo state (including the Zustand demo store):

1. Open browser DevTools
2. Clear localStorage (the Zustand store uses `localStorage` for persistence)
3. Reload the page

Or use the demo reset action in the demo store:

```typescript
useDemoStore.getState().resetDemo()
```

This clears all client-side demo state and returns the application to its initial state.

## Future Enhancements

The following enhancements are planned for future phases:

1. **Scenario-specific data** — Each scenario would load different fixture data sets
2. **Scenario-guided tour** — Step-by-step walkthrough of the highlighted workflow
3. **Scenario persistence** — Remember the selected scenario across sessions
4. **Scenario-specific navigation** — Show/hide sidebar items based on scenario
5. **Scenario data reset** — One-click reset to scenario default data
