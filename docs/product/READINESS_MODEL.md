# WinterVell — Readiness Model

**Date:** 2026-08-05
**Branch:** agent/wintervell-phase-01-frontend

## Purpose

This document describes the methodology used to calculate WinterVell's product readiness scores. Readiness scores are displayed on the public `/product-status` page and the app `/app/product-status` page. They are derived entirely from the capability registry at `src/config/capabilities.ts`.

## Capability Registry

The capability registry (`src/config/capabilities.ts`) is the **single source of truth** for all readiness calculations. It contains 35 capabilities, each with:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier (e.g., `"audit-list"`) |
| `name` | string | Human-readable name (e.g., `"Audit list"`) |
| `category` | string | Dimension category (e.g., `"audit"`) |
| `status` | CapabilityStatus | Current implementation status |
| `description` | string | Brief description of the capability |

## Status Values and Weights

Each capability has a status that determines its contribution to the readiness score:

| Status | Weight | Meaning |
|--------|--------|---------|
| `production` | 1.0 | Fully implemented, tested, and verified in production |
| `functional-preview` | 0.75 | Implemented and functional but not production-hardened |
| `interactive-demo` | 0.45 | Interactive UI with demo data, not connected to backend |
| `frontend-preview` | 0.2 | UI preview with demo data, limited interactivity |
| `planned` | 0 | Intended but not yet implemented |
| `unavailable` | 0 | Not implemented and no current plan |

### Weight Justification

- **production (1.0)**: The capability works end-to-end with real data and has been verified.
- **functional-preview (0.75)**: The capability works with real data but may lack error handling, testing, or production hardening.
- **interactive-demo (0.45)**: The UI is interactive and demonstrates the intended workflow, but uses demo data and has no backend. This is substantial progress but cannot be used for real work.
- **frontend-preview (0.2)**: The UI exists and can be viewed, but interactivity is limited and no backend exists. This shows the intended interface but is far from functional.
- **planned (0)**: No implementation exists. The capability contributes nothing to readiness.
- **unavailable (0)**: No implementation and no active plan. Same contribution as planned.

## Hard Production Caps

Certain dimensions have hard caps on their production readiness score, regardless of capability weights. These caps exist because infrastructure dependencies must be in place before the dimension can be considered production-ready:

| Dimension | Cap | Justification |
|-----------|-----|---------------|
| CRM server | 50% | Requires database schema, API routes, and authentication — none exist |
| Call-centre | 30% | Requires telephony integration, recording storage, and agent sessions — none exist |
| Audit | 40% | Requires crawl engine, rules engine, and evidence storage — none exist |
| Commercial | 40% | Requires payment provider, licence delivery, and legal documents — none exist |

**Note:** Demo and Frontend workflow dimensions have no production cap because they can reach high readiness through UI-only capabilities.

## Readiness Dimensions

The 35 capabilities are grouped into 6 dimensions:

### 1. Demo (85.7%)

Measures the quality and completeness of the interactive demonstration.

**Key capabilities:**
- Demo banner and honesty labels
- Demo data fixtures with stable IDs
- Demo scenario selector (Agency audit, Sales CRM, Call-centre CRM)
- Product-status readiness display
- Workflow cards linking to exact routes
- Invalid ID handling with not-found pages

**Why high:** The demo is the most complete aspect of WinterVell. The interactive UI fully demonstrates the planned product interface.

### 2. Frontend Workflow (71.9%)

Measures the completeness of frontend-only workflow pages.

**Key capabilities:**
- Prospect list, detail, and create forms
- Audit list, detail, and create forms
- Report builder and detail
- Proposal builder and detail
- Pipeline kanban view
- Task management
- Service catalogue

**Why moderate-high:** Most workflow pages exist with interactive UI, but they all use demo data and have no backend persistence.

### 3. CRM Server (16.7%)

Measures server-side CRM data persistence and API completeness.

**Key capabilities:**
- Database schema for prospects, audits, reports
- API routes for CRUD operations
- Authentication and authorization
- Data validation and error handling

**Why low:** No backend exists. The Prisma schema has only tutorial models. No API routes serve product data.

### 4. Call-centre (8.5%)

Measures call-centre backend and telephony readiness.

**Key capabilities:**
- Telephony (SIP/PSTN) integration
- Call recording and storage
- Agent session management
- Queue routing engine
- Auto-dialler for campaigns
- Real-time metrics WebSocket feed

**Why very low:** Only frontend preview pages exist. No telephony, recording, or agent session infrastructure exists. The 7 call-centre routes all render demo data with demo disclaimers.

### 5. Audit (13.0%)

Measures audit engine and crawling readiness.

**Key capabilities:**
- Website crawl engine
- Audit rules engine
- Evidence collection and storage
- Scoring system
- Screenshot capture
- SSRF protection

**Why low:** No audit engine exists. The audit workflow shown in the demo is entirely simulated.

### 6. Commercial (12.3%)

Measures licensing, payment, and delivery readiness.

**Key capabilities:**
- Licence product definitions
- Checkout provider integration
- Webhook handling
- Source code delivery
- Licence enforcement
- Legal documents (EULA, privacy, terms)

**Why low:** No payment integration, no licence delivery, and no finalized legal documents exist. Pricing pages show planned prices only.

## Calculation Formula

For each dimension:

```
dimensionScore = sum(capability.weight for capability in dimension) / count(capabilities in dimension) × 100
```

Then apply the production cap:

```
if dimensionCap exists:
  finalScore = min(dimensionScore, dimensionCap)
else:
  finalScore = dimensionScore
```

The overall readiness score is the average of all 6 dimension scores.

## Current Scores

| Dimension | Raw Score | Production Cap | Final Score |
|-----------|-----------|----------------|-------------|
| Demo | 85.7% | None | 85.7% |
| Frontend workflow | 71.9% | None | 71.9% |
| CRM server | 16.7% | 50% | 16.7% |
| Call-centre | 8.5% | 30% | 8.5% |
| Audit | 13.0% | 40% | 13.0% |
| Commercial | 12.3% | 40% | 12.3% |
| **Overall** | | | **34.5%** |

## Adding New Capabilities

To add a new capability:

1. Add an entry to the `capabilities` array in `src/config/capabilities.ts`
2. Assign the appropriate `category` (must match a dimension)
3. Assign the appropriate `status` (must be a valid `CapabilityStatus`)
4. Run unit tests to verify the registry is valid (`bun run vitest run`)
5. Verify readiness scores on `/app/product-status`
6. Update this document if a new dimension is needed

## Important Caveats

1. **Readiness scores are NOT based on actual system tests.** They are derived from the static capability registry.
2. **High demo readiness does not indicate production readiness.** The demo dimension measures the quality of the demonstration, not the product.
3. **Scores will decrease when new planned capabilities are added** because they add weight-0 entries that dilute the average.
4. **The capability registry must be updated manually.** It is not auto-discovered from the codebase.
5. **Production caps prevent misleadingly high scores** for dimensions with critical infrastructure dependencies.
