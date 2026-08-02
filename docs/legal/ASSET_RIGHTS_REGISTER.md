# Asset Rights Register

This register records the source, ownership, licence, and permitted uses of every category of asset shipped with WinterVell. It is the companion to [`PROVENANCE.md`](PROVENANCE.md) and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md). Where an asset's provenance is uncertain, it is **flagged and replaced** rather than silently kept.

> **Core principle.** WinterVell does not copy Cloudsun customer data, private screenshots, third-party trademarks, or production secrets. Uncertain assets are replaced with original work, permissively-licensed assets, or generated assets whose provenance is recorded here.

---

## How to read this register

| Column | Meaning |
|---|---|
| **File path** | Repository-relative path or asset-glob pattern |
| **Source** | Where the asset was obtained or how it was created |
| **Creator** | Named creator, vendor, or generator |
| **Licence** | Governing licence (SPDX or short name) |
| **Commercial-use** | Permitted? Yes / No / Conditional |
| **Redistribution** | Permitted inside the WinterVell build? Yes / No / Conditional |
| **Modification** | Permitted? Yes / No |
| **Attribution** | Required? Yes / No / Conditional |
| **Evidence** | Where the proof is held (file, commit, license file) |
| **Action** | Current status: OK / Replace / Verify / Pending |

Assets marked **Replace** or **Verify** are not shipped in commercial builds until the action is closed.

---

## Asset categories

### 1. Logos

| Field | Value |
|---|---|
| File path | `public/brand/wintervell-logo.svg`, `public/brand/wintervell-mark.svg`, `public/brand/wintervell-favicon.svg` |
| Source | Newly created for WinterVell |
| Creator | WinterVell owner (original design, AI-assisted iteration, final manual vector artwork) |
| Licence | WV-CSL (proprietary — WinterVell-owned) |
| Commercial-use | Yes — within WV-CSL |
| Redistribution | Conditional — only as part of an authorized WinterVell deployment; the logo itself is not separately redistributable |
| Modification | No — logo must not be altered in admin area (client-facing white-labelling replaces the logo with the Licensee's own) |
| Attribution | N/A — owned |
| Evidence | Git history of `public/brand/`, design notes in `docs/product/design-system.md` (planned), AI-prompt log retained privately by owner |
| Action | OK |

### 2. Icons

| Field | Value |
|---|---|
| File path | consumed via `lucide-react` package, rendered in `src/components/**` |
| Source | Lucide icon library (npm package) |
| Creator | Lucide Contributors |
| Licence | ISC |
| Commercial-use | Yes |
| Redistribution | Yes — bundled via `lucide-react` per ISC terms |
| Modification | Yes — Lucide permits modification; WinterVell uses icons unmodified |
| Attribution | ISC notice preserved — see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) |
| Evidence | `node_modules/lucide-react/LICENSE`, `package.json` entry |
| Action | OK |

### 3. Fonts

| Field | Value |
|---|---|
| File path | served via `next/font` (Fraunces, Inter) — no font binaries committed unless `public/fonts/` is added |
| Source | Google Fonts / official foundry releases |
| Creator | Fraunces — Undercase Type; Inter — Rasmus Andersson |
| Licence | OFL-1.1 (SIL Open Font License) |
| Commercial-use | Yes |
| Redistribution | Yes — subject to OFL-1.1 (fonts not sold by themselves; bundled with software is permitted) |
| Modification | Yes — OFL permits modification; WinterVell uses fonts unmodified |
| Attribution | OFL-1.1 copyright notice preserved with font files |
| Evidence | `node_modules/next/font/` (next/font handles licensing metadata); OFL text reproduced in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) |
| Action | OK |

### 4. Illustrations

| Field | Value |
|---|---|
| File path | `public/illustrations/**` |
| Source | Original, created for WinterVell; AI-assisted where applicable, with prompts retained |
| Creator | WinterVell owner |
| Licence | WV-CSL |
| Commercial-use | Yes — within WV-CSL |
| Redistribution | Conditional — only as part of an authorized WinterVell deployment |
| Modification | Yes — by Licensee for internal white-labelling |
| Attribution | N/A — owned |
| Evidence | Git history of `public/illustrations/`, prompt log retained privately |
| Action | OK (any third-party-sourced illustration must be replaced before merge — see Open Items) |

### 5. Photos

| Field | Value |
|---|---|
| File path | `public/photos/**` |
| Source | No stock photography shipped. Where placeholder imagery is required for demo content, it is original or AI-generated. |
| Creator | WinterVell owner / generator |
| Licence | WV-CSL (original) or generated-work policy (see Generated artwork) |
| Commercial-use | Yes — within WV-CSL |
| Redistribution | Conditional — only within WinterVell deployment |
| Modification | Yes — by Licensee for white-labelling |
| Attribution | N/A — owned |
| Evidence | Git history; generator settings retained privately |
| Action | OK — no third-party stock photos are committed. |

### 6. Screenshots

| Field | Value |
|---|---|
| File path | `docs/**` and `sales-assets/**` |
| Source | Captured from WinterVell running locally with the demo org ("Northstar Digital") only |
| Creator | WinterVell owner |
| Licence | WV-CSL |
| Commercial-use | Yes — within WV-CSL |
| Redistribution | Conditional — only as part of WinterVell documentation |
| Modification | Yes — for documentation updates |
| Attribution | N/A — owned |
| Evidence | Git history of `docs/` and `sales-assets/`; screenshots use only the demo org whose data is fictional |
| Action | OK — **no Cloudsun production screenshots, no third-party site screenshots**. If a marketing screenshot shows a real third-party website, the owner confirms the screenshot is fair-use commentary and the third-party's logo is cropped/replaced where required. |

### 7. Sample data

| Field | Value |
|---|---|
| File path | `src/lib/demo-store.ts`, `src/lib/demo-server.ts`, demo seed scripts |
| Source | Original, fictional |
| Creator | WinterVell owner |
| Licence | WV-CSL |
| Commercial-use | Yes — within WV-CSL |
| Redistribution | Conditional — only within WinterVell deployment |
| Modification | Yes — Licensee may replace with their own sample data |
| Attribution | N/A — owned |
| Evidence | Source code in `src/lib/demo-*`; demo org "Northstar Digital" with five fictional prospects (healthcare provider, B2B SaaS, property developer, ecommerce retailer, professional-services company) as documented in [`docs/product/demo-mode-guide.md`](../product/demo-mode-guide.md) |
| Action | OK — all names, emails, phone numbers, and company names are fictional. Any resemblance to real entities is coincidental and should be reported for replacement. |

### 8. UI templates

| Field | Value |
|---|---|
| File path | `src/components/ui/**` |
| Source | shadcn/ui snippets (copy-paste UI library), adapted for WinterVell |
| Creator | shadcn/ui (initial snippet) + WinterVell owner (modifications) |
| Licence | MIT (snippet) — modifications are WV-CSL where materially transformed; snippet-level MIT notice preserved |
| Commercial-use | Yes |
| Redistribution | Yes — MIT snippet licence preserved |
| Modification | Yes — WinterVell modifies snippets for product needs |
| Attribution | MIT notice preserved in vendored files where present |
| Evidence | shadcn/ui `components.json` config; original shadcn/ui licence at https://ui.shadcn.com |
| Action | OK |

### 9. Audio

| Field | Value |
|---|---|
| File path | none |
| Source | N/A |
| Creator | N/A |
| Licence | N/A |
| Commercial-use | N/A |
| Redistribution | N/A |
| Modification | N/A |
| Attribution | N/A |
| Evidence | None — no audio assets shipped |
| Action | OK |

### 10. Videos

| Field | Value |
|---|---|
| File path | none committed (any demo videos are hosted externally and linked, not bundled) |
| Source | Original screen recordings of WinterVell demo mode |
| Creator | WinterVell owner |
| Licence | WV-CSL |
| Commercial-use | Yes — within WV-CSL |
| Redistribution | Conditional — external hosting only; not bundled in repo |
| Modification | Yes — by owner |
| Attribution | N/A — owned |
| Evidence | External video links documented in `sales-assets/` |
| Action | OK — videos must show only the demo org and must clearly label demo content |

### 11. Generated artwork

| Field | Value |
|---|---|
| File path | `public/illustrations/**` and `public/brand/**` where AI-assisted |
| Source | AI image-generation tools (when used) |
| Creator | WinterVell owner as prompt author and final editor |
| Licence | WV-CSL — WinterVell asserts ownership of the final selected artwork; underlying generator terms reviewed before use |
| Commercial-use | Yes — generator terms permitting commercial use verified at time of generation |
| Redistribution | Conditional — only within WinterVell deployment |
| Modification | Yes — by owner and Licensee (for white-labelling) |
| Attribution | N/A — owned; generator terms (where they require attribution) recorded in evidence |
| Evidence | Prompt log and generator settings retained privately by owner; final artwork committed to git with attribution to WinterVell |
| Action | OK — prompts, generator name, and date are retained privately by the owner so that any future challenge can be evidenced. Generated artwork is reviewed for likeness to existing trademarks before commit. |

---

## Cross-cutting rules

1. **No Cloudsun customer data.** No screenshots, exports, contact lists, deal records, or notes from Cloudsun production data are copied into WinterVell. The Cloudsun repo is read-only source material — see [`PROVENANCE.md`](PROVENANCE.md).
2. **No third-party trademarks.** Brand assets of other companies are not bundled. The Northstar Digital demo org is fictional; any logo shown for Northstar Digital is original WinterVell artwork.
3. **No production secrets.** No `.env` files containing real secrets, API keys, database URLs, or session secrets are committed. The committed `.env.example` contains only placeholders.
4. **Uncertain assets are replaced.** Where the licence, source, or commercial-use status of an asset cannot be confirmed, the asset is replaced with original, permissively-licensed, or generated work whose provenance is recorded here.
5. **AI-assisted assets are reviewed.** Generated artwork and AI-assisted designs are reviewed for verbatim copying of existing trademarks or copyrighted work before commit. Prompts and generator settings are retained privately by the owner.

---

## Open items

| Item | Category | Action | Owner | Status |
|---|---|---|---|---|
| Confirm generator terms for any AI-assisted artwork currently in `public/illustrations/` | Illustrations / Generated artwork | Review each file's prompt log; if generator terms prohibit commercial use, replace with original artwork | WinterVell owner | Verify |
| Confirm whether any third-party illustration was bundled by mistake | Illustrations | Audit `public/` for non-original assets | WinterVell owner | Verify (one-time) |
| Confirm `z-ai-web-dev-sdk` asset/redistribution terms | SDK | Verify with maintainer before any vendoring or redistribution of the SDK beyond `bun install` | WinterVell owner | Verify — see [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md) |

---

## Maintenance

- This register is updated whenever a new asset category is added or an asset's source, licence, or commercial-use status changes.
- Asset additions require the same review discipline as code additions — see [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md).
- Buyer-side due-diligence reviewers should request the private prompt logs and generator settings referenced under "Generated artwork" via the contact in [`SUPPORT.md`](../../SUPPORT.md) under NDA.

---

*This register is part of the WinterVell legal package. It is maintained for accuracy but is not legal advice.*
