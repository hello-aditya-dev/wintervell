# WinterVell — Known Limitations

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline

## Product Limitations

### No Backend

- The application has no server-side data persistence beyond the contact form
- All product routes render with deterministic demo data
- No real API endpoints exist for creating, reading, updating, or deleting data
- The contact form returns a success message but does not save or send data

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

### No AI Integration

- No AI provider abstraction exists
- No bring-your-own-key support exists
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

### No Test Coverage

- No unit tests
- No integration tests
- No E2E tests
- No authorization tests
- No tenant-isolation tests

## Infrastructure Limitations

### Placeholder Domains

- `sitemap.ts` uses `wintervell.example`
- `robots.ts` uses `wintervell.example`
- These must be updated before production

### Unused Dependencies

- `next-intl` — installed but not used
- `@mdxeditor/editor` — installed but not used
- `react-syntax-highlighter` — installed but not used
- `react-markdown` — installed but not used
- These should be removed or justified

### Development-Only Dependencies

- `z-ai-web-dev-sdk` — must not be used in production runtime
- Should be removed from production dependencies or moved to devDependencies

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
3. The backend implementation has not been started.
4. Purchasing is not yet open.
5. No real audits, reports, or proposals can be generated.
6. No authentication or authorization exists.
7. The product is a frontend prototype only.
