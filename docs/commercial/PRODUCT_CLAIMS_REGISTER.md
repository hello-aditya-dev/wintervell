# WinterVell — Product Claims Register

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline

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
| 1 | "Turn website evidence into agency work" | HeroSection | Misleading | No evidence is actually collected; no real audit engine exists |
| 2 | "White-label workspace for reviewing websites" | HeroSection | Misleading | White-label settings UI exists but no real reviewing capability |
| 3 | "Organizing findings" | HeroSection | Misleading | Demo findings only, no real findings |
| 4 | "Producing client reports" | HeroSection | Misleading | Report builder UI exists but no real report generation |
| 5 | "Preparing proposals" | HeroSection | Misleading | Proposal builder UI exists but no real proposal generation |
| 6 | "Tracking the resulting opportunity" | HeroSection | Misleading | Pipeline UI exists but no real opportunity tracking |
| 7 | "Source-code product in development" | HeroSection | Verified | Accurate |
| 8 | "Interactive frontend demo" | HeroSection | Verified | Accurate |
| 9 | "Self-hosting planned" | HeroSection | Verified | Accurate |
| 10 | "Commercial licensing planned" | HeroSection | Verified | Accurate |
| 11 | "Planned founding pricing. Purchasing is not yet open." | PricingPreview | Verified | Accurate |

### JSON-LD Structured Data (layout.tsx)

| # | Claim | Status | Notes |
|---|---|---|---|
| 12 | "White-label audit engine" | Misleading | No engine exists, only UI |
| 13 | "Branded report builder" | Misleading | UI exists but no real building |
| 14 | "Proposal generator" | Misleading | UI exists but no real generation |
| 15 | "Prospect pipeline management" | Misleading | UI exists but no real management |
| 16 | "9 audit categories" | Misleading | Categories defined but no engine |
| 17 | "11-stage sales pipeline" | Misleading | Stages defined but no real pipeline |
| 18 | "Multi-tenant architecture" | False | No multi-tenancy exists |
| 19 | "Bring-your-own API keys" | False | No AI integration exists |
| 20 | "PDF rendering with selectable text" | False | No PDF rendering exists |
| 21 | "Full source code included" | False | Not delivered yet |
| 22 | AggregateOffer with lowPrice $799 | Unverified | Pricing is planned but not active |

### Contact Information

| # | Claim | Status | Notes |
|---|---|---|---|
| 23 | support@wintervell.com | Unverified | Domain may not have email configured |
| 24 | sales@wintervell.com | Unverified | Domain may not have email configured |
| 25 | security@wintervell.com | Unverified | Domain may not have email configured |
| 26 | legal@wintervell.com | Unverified | Domain may not have email configured |

### Sitemap and Robots

| # | Claim | Status | Notes |
|---|---|---|---|
| 27 | sitemap.xml uses wintervell.example | False | Placeholder domain, must be updated |
| 28 | robots.txt uses wintervell.example | False | Placeholder domain, must be updated |

### Contact Form

| # | Claim | Status | Notes |
|---|---|---|---|
| 29 | Contact form "sends" message | Misleading | Form validates but does not persist or notify |

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

## Action Required

### Immediate (Phase 0)

1. **JSON-LD featureList** — Remove or rephrase claims #12-21 to accurately reflect the product state
2. **Placeholder domains** — Update sitemap.ts and robots.ts to use the production domain or remove them
3. **Contact form** — Add a clear disclaimer that the form is for demonstration purposes only, or implement persistence
4. **Tagline** — Consider rephrasing claim #1 to "Turn website evidence into agency work" → "Planned: Turn website evidence into agency work" on the homepage

### Future (Phase 1+)

5. **Contact emails** — Verify email delivery before publishing
6. **AggregateOffer** — Remove or update when checkout is active
7. **Feature claims** — Update as each feature is verified
