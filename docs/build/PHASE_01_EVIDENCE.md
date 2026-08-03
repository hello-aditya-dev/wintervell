# Phase 1 — Screenshot Evidence

**Date:** 2026-08-03
**Branch:** agent/wintervell-phase-01-frontend
**Status:** Placeholder — screenshots to be captured

## Purpose

This document records visual evidence that Phase 1 acceptance criteria are met. Each section corresponds to a required viewport or route that must be verified. Screenshots should be captured at the viewports specified in the Phase 1 execution document (375 × 812 mobile, 768 × 1024 tablet, 1440 × 900 desktop).

## Evidence Format

Each entry should include:
- **Route** — The URL path captured
- **Viewport** — Desktop (1440×900), Tablet (768×1024), or Mobile (375×812)
- **Date captured** — When the screenshot was taken
- **Screenshot** — Image file or embedded reference
- **Notes** — Any observations (overflow, contrast issues, missing elements, etc.)

---

## 1. Homepage — Desktop

| Field | Value |
|---|---|
| Route | `/` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 2. Homepage — Mobile

| Field | Value |
|---|---|
| Route | `/` |
| Viewport | 375 × 812 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 3. Dashboard — Desktop

| Field | Value |
|---|---|
| Route | `/app` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 4. Dashboard — Mobile

| Field | Value |
|---|---|
| Route | `/app` |
| Viewport | 375 × 812 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 5. Prospect List

| Field | Value |
|---|---|
| Route | `/app/prospects` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 6. Prospect Detail

| Field | Value |
|---|---|
| Route | `/app/prospects/[id]` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Use valid fixture ID |

## 7. Audit List

| Field | Value |
|---|---|
| Route | `/app/audits` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 8. Audit Creation

| Field | Value |
|---|---|
| Route | `/app/audits/new` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Verify demo honesty label on creation toast |

## 9. Audit Detail

| Field | Value |
|---|---|
| Route | `/app/audits/[id]` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Use valid fixture ID |

## 10. Finding Evidence Panel

| Field | Value |
|---|---|
| Route | `/app/audits/[id]` (findings tab) |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Expand finding to show evidence panel |

## 11. Report Builder

| Field | Value |
|---|---|
| Route | `/app/reports/[id]` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Verify demo honesty label on publish action |

## 12. Sample Report

| Field | Value |
|---|---|
| Route | `/sample-report` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 13. Proposal Builder

| Field | Value |
|---|---|
| Route | `/app/proposals/[id]` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Verify demo honesty label on send action |

## 14. Pipeline — Desktop

| Field | Value |
|---|---|
| Route | `/app/pipeline` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 15. Pipeline — Mobile

| Field | Value |
|---|---|
| Route | `/app/pipeline` |
| Viewport | 375 × 812 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 16. Branding Settings

| Field | Value |
|---|---|
| Route | `/app/settings/branding` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | — |

## 17. Contact Page

| Field | Value |
|---|---|
| Route | `/contact` |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Verify honest message about email not being configured |

## 18. Not-Found Pages

| Field | Value |
|---|---|
| Route | `/app/prospects/invalid-id` (and similar) |
| Viewport | 1440 × 900 |
| Date captured | — |
| Screenshot | _Pending_ |
| Notes | Verify not-found page renders with navigation link |

---

## Capture Instructions

1. Start the dev server: `bun run dev`
2. For each route, capture at the specified viewport using agent-browser or manual screenshot
3. Verify no horizontal overflow at the specified viewport
4. Verify demo honesty labels are visible where expected
5. Verify not-found pages render correctly for invalid IDs
6. Save screenshots to `docs/build/evidence/` directory
7. Update each section above with the captured date and file reference
8. Add any observations to the Notes field
