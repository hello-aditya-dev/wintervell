# WinterVell — Feature Matrix

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline

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
| Email/password login | Missing | next-auth installed but not configured |
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
| Create audit | Frontend only | Form renders, no crawl |
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
| Report builder | Frontend only | Demo data |
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
| Proposal builder | Frontend only | Demo data |
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
| Unit tests | Missing | — |
| Integration tests | Missing | — |
| E2E tests | Missing | — |
| Authorization tests | Missing | — |
| Tenant-isolation tests | Missing | — |
| SSRF tests | Missing | — |
| Scoring tests | Missing | — |
| Accessibility checks | Missing | — |

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
| Tests | 0 | 0 | 0 | 0 | 0 | 8 | 0 | 0 |
| **Total** | **1** | **2** | **58** | **0** | **0** | **84** | **0** | **0** |

**The product is overwhelmingly in the "Frontend only" and "Missing" categories.** No real backend functionality exists. The interactive demo is the only functional aspect of the product.
