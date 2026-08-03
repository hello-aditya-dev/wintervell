# WinterVell — Feature Matrix

**Date:** 2026-08-05
**Branch:** agent/wintervell-phase-01-frontend

## Classification Key

| Status | Meaning |
|---|---|
| Working | Implemented and verified |
| Partially working | Exists but incomplete or unreliable |
| Frontend only | UI exists but no backend or data persistence |
| Frontend preview | UI preview with demo data, no backend connectivity |
| Interactive demo | UI with interactive demo workflow, not production |
| Simulated | Uses deterministic demo data, no real processing |
| Planned | Intended but not yet started |
| Missing | Not implemented at all |
| Broken | Implemented but not functioning |
| Unverified | Cannot confirm status without testing |

## Feature Matrix

### Authentication

| Feature | Status | Notes |
|---|---|---|
| Email/password login | Missing | next-auth removed in Phase 1 (was unused) |
| Magic link | Missing | — |
| OAuth providers | Missing | — |
| Session management | Missing | — |
| Sign out | Missing | — |
| Password reset | Missing | — |
| Email verification | Missing | — |
| Rate limiting | Missing | — |
| Session revocation | Missing | — |

### Organisations

| Feature | Status | Notes |
|---|---|---|
| Create organisation | Missing | — |
| Select organisation | Missing | — |
| Invite member | Missing | — |
| Accept invitation | Missing | — |
| Remove member | Missing | — |
| Change role | Missing | — |
| Transfer ownership | Missing | — |

### Roles and Permissions

| Feature | Status | Notes |
|---|---|---|
| Role definitions | Missing | No roles defined |
| Permission enforcement | Missing | — |
| Server-side authorization | Missing | — |
| RBAC roles (Owner, Admin, Audit Manager, Auditor, Sales Manager, Sales Rep, Viewer) | Missing | — |

### Prospects and CRM

| Feature | Status | Notes |
|---|---|---|
| Prospect list | Frontend only | Demo data, no backend |
| Create prospect | Frontend only | Form renders, no persistence |
| View prospect detail | Frontend only | Demo data |
| Edit prospect | Frontend only | — |
| Archive prospect | Missing | — |
| Search and filters | Frontend only | UI exists, demo data only |
| Tags | Frontend only | UI exists, demo data only |
| Notes | Frontend only | UI exists, demo data only |
| Activity history | Frontend only | UI exists, demo data only |
| Contact relationships | Frontend only | Demo data only |
| Company relationships | Frontend only | Demo data only |
| CSV export | Missing | — |
| CSV import | Missing | — |

### Tasks

| Feature | Status | Notes |
|---|---|---|
| Task list | Frontend only | Demo data, no backend |
| Assignee | Frontend only | Demo data only |
| Due date | Frontend only | Demo data only |
| Priority | Frontend only | Demo data only |
| Status | Frontend only | Demo data only |
| Prospect relationship | Frontend only | Demo data only |
| Audit relationship | Frontend only | Demo data only |
| Proposal relationship | Frontend only | Demo data only |
| Reminders | Missing | — |
| Overdue views | Missing | — |

### Pipeline

| Feature | Status | Notes |
|---|---|---|
| Pipeline view | Frontend only | Kanban with demo data |
| Configurable stages | Missing | Hardcoded stages |
| Drag-and-drop | Frontend only | Works with demo data |
| Opportunity values | Frontend only | Demo data only |
| Expected close dates | Frontend only | Demo data only |
| Win/loss reasons | Missing | — |
| Stage history | Missing | — |
| Keyboard alternative | Frontend only | Partial |
| Optimistic update | Missing | — |
| Audit log | Missing | — |

### Audits

| Feature | Status | Notes |
|---|---|---|
| Audit list | Frontend only | Demo data, no backend |
| Create audit | Frontend only | Form renders, no crawl; labelled as demo |
| Audit detail | Frontend only | Demo data |
| Crawling | Missing | No crawl engine exists |
| Rules engine | Missing | — |
| Evidence collection | Missing | — |
| Scoring | Missing | — |
| Screenshots | Missing | — |
| SSRF protection | Missing | — |
| Audit lifecycle (Draft → Completed) | Missing | — |
| Progress reporting | Missing | — |

### Findings

| Feature | Status | Notes |
|---|---|---|
| Finding list | Frontend only | Demo data |
| Finding detail | Frontend only | Demo data |
| Finding evidence | Frontend only | Demo data |
| Finding revision | Missing | — |
| Severity classification | Frontend only | Demo data only |
| Confidence classification | Missing | — |
| Human review workflow | Missing | — |
| Bulk operations | Missing | — |
| Finding history | Missing | — |

### Reports

| Feature | Status | Notes |
|---|---|---|
| Report list | Frontend only | Demo data |
| Report builder | Frontend only | Demo data; labelled as demo |
| Report versioning | Missing | — |
| Report sharing | Missing | — |
| PDF generation | Planned | Planned, not implemented |
| White labelling | Frontend only | Brand settings UI exists |
| Share links | Missing | — |
| View tracking | Missing | — |
| Report sections | Frontend only | Demo data only |

### Proposals

| Feature | Status | Notes |
|---|---|---|
| Proposal list | Frontend only | Demo data |
| Proposal builder | Frontend only | Demo data; labelled as demo |
| Finding-to-service mapping | Missing | — |
| Proposal versioning | Missing | — |
| Opportunity connection | Missing | — |
| Proposal sections | Frontend only | Demo data only |

### Services

| Feature | Status | Notes |
|---|---|---|
| Service catalogue | Frontend only | Demo data |
| Service categories | Frontend only | Demo data |
| Pricing models | Frontend only | Demo data |

### White Labelling

| Feature | Status | Notes |
|---|---|---|
| Agency name | Frontend only | Settings UI exists |
| Logo upload | Missing | — |
| Primary colour | Frontend only | Settings UI exists |
| Contact details | Frontend only | Settings UI exists |
| Custom domain | Missing | — |
| Report footer | Missing | — |

### Call Centre

| Feature | Status | Notes |
|---|---|---|
| Call-centre dashboard | Frontend preview | Demo data, no telephony connection |
| Call list | Frontend preview | Demo data with filters and status |
| Call detail view | Frontend preview | Demo data, recording placeholder |
| Agent list | Frontend preview | Demo data, no real agent sessions |
| Queue management | Frontend preview | Demo data, no real queue routing |
| Campaign management | Frontend preview | Demo data, auto-dialler labelled as planned |
| Supervisor dashboard | Frontend preview | Demo data, no real monitoring |
| Telephony integration | Planned | No SIP/PSTN connection |
| Call recording | Planned | No recording storage |
| Auto-dialler | Planned | Labelled as planned in UI |
| Real-time metrics | Planned | No WebSocket metrics feed |

### Product Status

| Feature | Status | Notes |
|---|---|---|
| Public readiness page | Interactive demo | /product-status route with readiness scores |
| App readiness page | Interactive demo | /app/product-status route with detailed breakdown |
| Readiness score calculation | Working | Based on capability registry, 6 dimensions |
| Capability registry | Working | 35 capabilities in src/config/capabilities.ts |
| Readiness dimensions | Working | Demo, Frontend workflow, CRM server, Call-centre, Audit, Commercial |

### Demo Scenarios

| Feature | Status | Notes |
|---|---|---|
| Scenario selector | Working | 3 scenarios: Agency audit, Sales CRM, Call-centre CRM |
| Agency audit scenario | Working | Highlights audit/report/proposal workflow |
| Sales CRM scenario | Working | Highlights prospect/pipeline/tasks workflow |
| Call-centre CRM scenario | Working | Highlights call-centre dashboard and operations |
| Scenario data switching | Working | UI-only, does not change underlying data |

### AI

| Feature | Status | Notes |
|---|---|---|
| AI provider abstraction | Planned | — |
| BYOK (bring your own key) | Planned | Planned, not implemented |
| AI-assisted explanations | Missing | — |
| AI-assisted drafting | Missing | — |
| AI usage logging | Missing | — |
| Prompt-injection resistance | Missing | — |
| Structured outputs | Missing | — |

### Notifications

| Feature | Status | Notes |
|---|---|---|
| In-app notifications | Missing | — |
| Email notifications | Missing | — |
| Notification preferences | Missing | — |

### Licensing

| Feature | Status | Notes |
|---|---|---|
| Licence products defined | Frontend only | Pricing config exists |
| Licence validation | Missing | — |
| Checkout integration | Missing | — |
| Webhook handling | Missing | — |
| Source delivery | Missing | — |
| Licence enforcement | Missing | — |

### Security Controls

| Feature | Status | Notes |
|---|---|---|
| Input validation | Partially working | Contact form has Zod, no other routes |
| CSRF protection | Missing | — |
| XSS protection | Missing | No sanitization |
| Rate limiting | Missing | — |
| Security headers | Missing | — |
| CSP | Missing | — |
| Audit logging | Missing | — |
| File upload validation | Missing | — |
| Secret management | Missing | — |
| Tenant isolation | Missing | — |

### Deployment

| Feature | Status | Notes |
|---|---|---|
| Vercel deployment | Working | Live at wintervell-nu.vercel.app |
| Docker deployment | Missing | — |
| Worker deployment | Missing | — |
| CI/CD pipeline | Working | GitHub Actions workflow runs typecheck, lint, unit, build, E2E |
| Health checks | Partially working | `/api` endpoint exists |

### Tests

| Feature | Status | Notes |
|---|---|---|
| Unit tests | Working | Vitest configured, 94 tests across 7 test files |
| Integration tests | Missing | — |
| E2E tests | Working | Playwright configured, 9 spec files |
| Authorization tests | Missing | — |
| Tenant-isolation tests | Missing | — |
| SSRF tests | Missing | — |
| Scoring tests | Missing | — |
| Accessibility checks | Working | 26 Playwright-based checks (skip link, focus, landmarks, H1, labels, reduced motion, lang, alt); no axe-core |

### Accessibility

| Feature | Status | Notes |
|---|---|---|
| Skip link | Working | Skip-to-content targets main |
| Visible keyboard focus | Working | Focus-visible styles added in Phase 1 |
| Aria-current navigation | Working | Added to sidebar in Phase 1 |
| Form labels | Working | All inputs labelled; verified in E2E |
| Reduced motion | Working | MotionProvider + CSS prefers-reduced-motion |
| Touch targets | Partially working | Sidebar and pipeline cards; not all controls |
| Semantic landmarks | Working | nav, header, footer, main |
| Heading hierarchy | Working | Single h1 on every page |
| Language attribute | Working | html lang=en |
| Alt text | Working | All img elements have alt text |
| No colour-only status | Working | StatusBadge and SeverityBadge include text labels |

### Demo Honesty

| Feature | Status | Notes |
|---|---|---|
| Demo banner | Working | Persistent banner in app shell |
| Simulated action labels | Working | All create/update/publish/send actions labelled as demo |
| No fabricated proof | Working | No fake testimonials, scarcity, or customer logos |
| No fake social proof | Working | Removed in Phase 0 |
| Contact form honesty | Working | Returns honest message about email not being configured |
| Invalid ID handling | Working | not-found pages for all dynamic routes |
| Call-centre demo disclaimer | Working | Demo disclaimer on every call-centre page |
| Readiness scores from registry | Working | Calculated from capability registry, not from actual system tests |

## Summary

| Category | Working | Partially working | Frontend only | Frontend preview | Interactive demo | Planned | Missing | Broken | Unverified |
|---|---|---|---|---|---|---|---|---|---|
| Authentication | 0 | 0 | 0 | 0 | 0 | 0 | 9 | 0 | 0 |
| Organisations | 0 | 0 | 0 | 0 | 0 | 0 | 7 | 0 | 0 |
| Roles | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 0 | 0 |
| Prospects/CRM | 0 | 0 | 13 | 0 | 0 | 0 | 2 | 0 | 0 |
| Tasks | 0 | 0 | 9 | 0 | 0 | 0 | 2 | 0 | 0 |
| Pipeline | 0 | 0 | 6 | 0 | 0 | 0 | 5 | 0 | 0 |
| Audits | 0 | 0 | 4 | 0 | 0 | 0 | 7 | 0 | 0 |
| Findings | 0 | 0 | 5 | 0 | 0 | 0 | 4 | 0 | 0 |
| Reports | 0 | 0 | 5 | 0 | 0 | 1 | 4 | 0 | 0 |
| Proposals | 0 | 0 | 4 | 0 | 0 | 0 | 3 | 0 | 0 |
| Services | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| White labelling | 0 | 0 | 4 | 0 | 0 | 0 | 2 | 0 | 0 |
| Call Centre | 0 | 0 | 0 | 7 | 0 | 4 | 0 | 0 | 0 |
| Product Status | 2 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 |
| Demo Scenarios | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| AI | 0 | 0 | 0 | 0 | 0 | 2 | 5 | 0 | 0 |
| Notifications | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 0 | 0 |
| Licensing | 0 | 0 | 1 | 0 | 0 | 0 | 5 | 0 | 0 |
| Security | 0 | 1 | 0 | 0 | 0 | 0 | 9 | 0 | 0 |
| Deployment | 2 | 1 | 0 | 0 | 0 | 0 | 2 | 0 | 0 |
| Tests | 3 | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 0 |
| Accessibility | 10 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Demo Honesty | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **Total** | **29** | **3** | **54** | **7** | **2** | **8** | **72** | **0** | **0** |

**Phase 1.1 progress:** Verification complete — 94 unit tests (7 test files), 9 E2E spec files, call-centre demonstration (6 routes, frontend preview), product-status pages (public + app), capability registry (35 capabilities), 6 readiness dimensions, demo scenario selector (3 scenarios), claims corrected (PDF export → planned, evidence → demo-modelled, self-hosting → planned, licensing → draft, AI BYOK → planned, WV-CSL v1.0 → draft), 11 lint warnings (0 errors). The product remains predominantly in the "Frontend only" and "Missing" categories. No real backend functionality exists. The interactive demo is the only functional aspect of the product.
