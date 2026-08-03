# WinterVell — Feature Matrix

**Date:** 2026-08-03
**Branch:** agent/wintervell-phase-01-frontend

## Classification Key

| Status | Meaning |
|---|---|
| Working | Implemented and verified |
| Partially working | Exists but incomplete or unreliable |
| Frontend only | UI exists but no backend or data persistence |
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
| PDF generation | Missing | — |
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

### AI

| Feature | Status | Notes |
|---|---|---|
| AI provider abstraction | Missing | — |
| BYOK (bring your own key) | Missing | — |
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
| CI/CD pipeline | Missing | — |
| Health checks | Partially working | `/api` endpoint exists |

### Tests

| Feature | Status | Notes |
|---|---|---|
| Unit tests | Working | Vitest configured, 160 tests across 5 files |
| Integration tests | Missing | — |
| E2E tests | Working | Playwright configured, 6 spec files |
| Authorization tests | Missing | — |
| Tenant-isolation tests | Missing | — |
| SSRF tests | Missing | — |
| Scoring tests | Missing | — |
| Accessibility checks | Partially working | Focus-visible, aria labels, reduced motion — no automated axe tests |

### Accessibility

| Feature | Status | Notes |
|---|---|---|
| Skip link | Working | Added in Phase 1 |
| Visible keyboard focus | Working | Focus-visible styles added in Phase 1 |
| Aria-current navigation | Working | Added to sidebar in Phase 1 |
| Form labels | Working | All inputs labelled in Phase 1 |
| Reduced motion | Working | MotionProvider + CSS prefers-reduced-motion |
| Touch targets | Partially working | Sidebar and pipeline cards; not all controls |
| Semantic landmarks | Working | nav, header, footer, main |
| Heading hierarchy | Working | h1 on every page |
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

## Summary

| Category | Working | Partially working | Frontend only | Simulated | Planned | Missing | Broken | Unverified |
|---|---|---|---|---|---|---|---|---|
| Authentication | 0 | 0 | 0 | 0 | 0 | 9 | 0 | 0 |
| Organisations | 0 | 0 | 0 | 0 | 0 | 7 | 0 | 0 |
| Roles | 0 | 0 | 0 | 0 | 0 | 4 | 0 | 0 |
| Prospects/CRM | 0 | 0 | 13 | 0 | 0 | 2 | 0 | 0 |
| Tasks | 0 | 0 | 9 | 0 | 0 | 2 | 0 | 0 |
| Pipeline | 0 | 0 | 6 | 0 | 0 | 5 | 0 | 0 |
| Audits | 0 | 0 | 4 | 0 | 0 | 7 | 0 | 0 |
| Findings | 0 | 0 | 5 | 0 | 0 | 4 | 0 | 0 |
| Reports | 0 | 0 | 6 | 0 | 0 | 5 | 0 | 0 |
| Proposals | 0 | 0 | 4 | 0 | 0 | 3 | 0 | 0 |
| Services | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| White labelling | 0 | 0 | 4 | 0 | 0 | 2 | 0 | 0 |
| AI | 0 | 0 | 0 | 0 | 0 | 6 | 0 | 0 |
| Notifications | 0 | 0 | 0 | 0 | 0 | 3 | 0 | 0 |
| Licensing | 0 | 0 | 1 | 0 | 0 | 5 | 0 | 0 |
| Security | 0 | 1 | 0 | 0 | 0 | 9 | 0 | 0 |
| Deployment | 1 | 1 | 0 | 0 | 0 | 3 | 0 | 0 |
| Tests | 2 | 1 | 0 | 0 | 0 | 5 | 0 | 0 |
| Accessibility | 6 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| Demo Honesty | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **Total** | **15** | **4** | **55** | **0** | **0** | **81** | **0** | **0** |

**Phase 1 progress:** Test infrastructure established (160 unit tests, 6 E2E spec files), demo honesty labels in place across all routes, invalid ID handling fixed, accessibility improvements applied. The product remains overwhelmingly in the "Frontend only" and "Missing" categories. No real backend functionality exists. The interactive demo is the only functional aspect of the product.
