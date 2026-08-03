# WinterVell — Product Claims Register

**Date:** 2026-08-05
**Branch:** agent/wintervell-phase-01-frontend

## Purpose

This document tracks every public claim about WinterVell's capabilities. Each claim is classified by its current verification status. This register must be updated whenever a new claim is made or an existing claim's status changes.

## Classification

| Status | Meaning |
|---|---|
| Verified | Claim is true and can be demonstrated |
| Partially verified | Claim is partially true but has limitations |
| Unverified | Claim cannot be confirmed |
| Misleading | Claim implies more than is true |
| False | Claim is not true |
| Removed | Claim has been removed from the product |

## Claims Register

### Public Website (Homepage)

| # | Claim | Location | Status | Notes |
|---|---|---|---|---|
| 1 | "Source-code product in development" | HeroSection | Verified | Accurate |
| 2 | "Interactive frontend demo" | HeroSection | Verified | Accurate |
| 3 | "Self-hosting planned" | HeroSection | Verified | Accurate — planned deployment model, no Docker or self-host config exists |
| 4 | "Commercial licensing planned" | HeroSection | Verified | Accurate — draft terms under preparation, WV-CSL v1.0 is draft not finalized |
| 5 | "Planned founding pricing. Purchasing is not yet open." | PricingPreview | Verified | Accurate |
| 6 | Workflow visualization labels | HeroSection | Verified | All workflow steps labelled as demo (e.g., "Proposal sent (Demo)") |
| 6a | Evidence badges | HeroSection | Verified | Badges qualify status: Evidence model, Workflow demo, Traceability design |

### JSON-LD Structured Data (layout.tsx)

| # | Claim | Status | Notes |
|---|---|---|---|
| 7 | "Interactive product demonstration" | Verified | Accurate — demo exists at /app |
| 8 | "Deterministic demo data" | Verified | Accurate — demo fixtures with stable IDs |
| 9 | "Prospect management interface" | Verified | Accurate — UI exists at /app/prospects |
| 10 | "Audit workflow interface" | Verified | Accurate — UI exists at /app/audits |
| 11 | "Finding review workspace" | Verified | Accurate — UI exists at /app/audits/[id] |
| 12 | "Report builder interface" | Verified | Accurate — UI exists at /app/reports/[id] |
| 13 | "Proposal builder interface" | Verified | Accurate — UI exists at /app/proposals/[id] |
| 14 | "Pipeline kanban interface" | Verified | Accurate — UI exists at /app/pipeline |
| 15 | "White-label branding settings" | Verified | Accurate — UI exists at /app/settings/branding |
| 16 | "Service catalogue" | Verified | Accurate — UI exists at /app/services |
| 17 | "Task management" | Verified | Accurate — UI exists at /app/tasks |
| 18 | PreOrder availability | Verified | Accurate — purchasing is not open |
| 19 | "Call-centre demonstration" | Partially verified | UI exists at /app/call-centre — frontend preview only, no telephony connection |
| 20 | "Product readiness scores" | Verified | Accurate — derived from capability registry at /product-status and /app/product-status |
| 21 | "PDF export" | Unverified | Planned — no PDF rendering engine exists |

### Contact Information

| # | Claim | Location | Status | Notes |
|---|---|---|---|---|
| 19 | support@wintervell.com | Unverified | Domain may not have email configured |
| 20 | sales@wintervell.com | Unverified | Domain may not have email configured |
| 21 | security@wintervell.com | Unverified | Domain may not have email configured |
| 22 | legal@wintervell.com | Unverified | Domain may not have email configured |

### Sitemap and Robots

| # | Claim | Status | Notes |
|---|---|---|---|
| 23 | sitemap.xml uses wintervell.com | Verified | Fixed in Phase 0 — uses NEXT_PUBLIC_SITE_URL env var |
| 24 | robots.txt uses wintervell.com | Verified | Fixed in Phase 0 — uses NEXT_PUBLIC_SITE_URL env var |

### Contact Form

| # | Claim | Status | Notes |
|---|---|---|---|
| 25 | Contact form returns honest message | Verified | Returns message about email not being configured; no external email sent |

### Demo Honesty

| # | Claim | Status | Notes |
|---|---|---|---|
| 26 | All simulated actions are labelled as demo | Verified | Create, update, publish, send, export, audit, payment, and integration actions all labelled |
| 27 | No fabricated proof or scarcity | Verified | No fake testimonials, customer logos, live-counts, or scarcity claims |
| 28 | Invalid detail IDs fail safely | Verified | not-found pages for all dynamic routes |
| 29 | Demo banner is persistent | Verified | Banner visible in app shell on all product routes |
| 30 | Call-centre demo disclaimer | Verified | Demo disclaimer on every call-centre page |
| 31 | Product-status is honest about source | Verified | Readiness scores derived from capability registry, not actual system tests |

### Previously Removed Claims

| # | Claim | Status | Removed in |
|---|---|---|---|
| 30 | "Trusted by agencies" | Removed | agent/frontend-rebuild |
| 31 | "Only 10 left" scarcity | Removed | agent/frontend-rebuild |
| 32 | Fictional testimonials | Removed | agent/frontend-rebuild |
| 33 | Star ratings | Removed | agent/frontend-rebuild |
| 34 | InStock schema.org availability | Removed | agent/frontend-rebuild |
| 35 | Anchor pricing ($1199/$2199) | Removed | agent/frontend-rebuild |
| 36 | Interactive audit demo (arbitrary URL) | Removed | agent/frontend-rebuild |
| 37 | Misleading JSON-LD featureList claims | Removed | agent/wintervell-phase-00-baseline |
| 38 | "PDF export available" | Removed | agent/wintervell-phase-01-frontend — changed to planned |

### Previously Fixed Claims (Phase 0)

| # | Claim | Previous Status | Current Status | Fix |
|---|---|---|---|---|
| 38 | "White-label audit engine" (JSON-LD) | Misleading | Removed | Replaced with honest feature list |
| 39 | "Branded report builder" (JSON-LD) | Misleading | Removed | Replaced with honest feature list |
| 40 | "Proposal generator" (JSON-LD) | Misleading | Removed | Replaced with honest feature list |
| 41 | "Prospect pipeline management" (JSON-LD) | Misleading | Removed | Replaced with honest feature list |
| 42 | "9 audit categories" (JSON-LD) | Misleading | Removed | Replaced with honest feature list |
| 43 | "11-stage sales pipeline" (JSON-LD) | Misleading | Removed | Replaced with honest feature list |
| 44 | "Multi-tenant architecture" (JSON-LD) | False | Removed | Not in feature list |
| 45 | "Bring-your-own API keys" (JSON-LD) | False | Removed | Not in feature list — now planned, not current |
| 46 | "PDF rendering with selectable text" (JSON-LD) | False | Removed | Not in feature list — changed to planned |
| 47 | "Full source code included" (JSON-LD) | False | Removed | Not in feature list — draft terms, not finalized |
| 48 | Placeholder domains (sitemap/robots) | False | Verified | Updated to NEXT_PUBLIC_SITE_URL env var |

## Action Required

### Completed (Phase 0 + Phase 1)

1. ~~**JSON-LD featureList** — Remove or rephrase claims #12-21 to accurately reflect the product state~~ ✅ Done — replaced with honest feature list
2. ~~**Placeholder domains** — Update sitemap.ts and robots.ts to use the production domain or remove them~~ ✅ Done — now uses wintervell.com
3. ~~**Contact form** — Add a clear disclaimer that the form is for demonstration purposes only, or implement persistence~~ ✅ Done — returns honest message
4. ~~**Testimonials** — Remove fictional testimonials, star ratings, and customer logos~~ ✅ Done — removed in frontend-rebuild
5. ~~**Demo honesty labels** — Label all simulated actions as demo~~ ✅ Done — all create/update/publish/send actions labelled
6. ~~**Invalid ID handling** — Fix not-found behavior for invalid dynamic IDs~~ ✅ Done — not-found pages for all dynamic routes

### Remaining (Phase 1.1+)

7. **Contact emails** — Verify email delivery before publishing (currently unverified)
8. **AggregateOffer** — Update when checkout is active (currently PreOrder)
9. **Feature claims** — Update as each feature is verified with real backend
10. ~~**Unused dependencies** — Remove next-intl, @mdxeditor/editor, react-syntax-highlighter, react-markdown; move z-ai-web-dev-sdk to devDependencies~~ ✅ Done — 10 unused dependencies removed, prisma moved to devDependencies
11. **State quality** — Verify loading, empty, error, and success states across all principal screens
12. ~~**CI/CD** — Establish automated build, test, and deployment pipeline~~ ✅ Done — GitHub Actions workflow created
13. **Call-centre backend** — Implement telephony, recording, agent sessions before claiming call-centre beyond demo
14. **PDF export** — Implement PDF rendering before claiming PDF export beyond planned
15. **AI BYOK** — Implement AI provider abstraction before claiming BYOK beyond planned
16. **Self-hosting** — Provide Docker/deployment config before claiming self-hosting beyond planned
17. **Licensing (WV-CSL v1.0)** — Finalize legal terms before claiming licensing beyond draft
