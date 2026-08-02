# Dependency Licence Report (Software Bill of Materials)

This is the human-readable Software Bill of Materials (SBOM) for WinterVell. It enumerates every direct dependency declared in [`package.json`](../../package.json), together with its licence, source, redistribution obligations, attribution requirements, copyleft risk, modification status, and bundling mode.

The machine-readable SBOM is published at [`sbom.json`](../../sbom.json). When this file and `sbom.json` disagree, `sbom.json` reflects the resolved tree at install time and this file reflects the curated licence review.

> **Summary finding.** No copyleft licences (GPL, AGPL, LGPL, MPL, SSPL, BUSL, "non-commercial", or "source-available" licences) were detected in the direct dependency tree. One package — `z-ai-web-dev-sdk` — is flagged as **verification required** pending confirmation of its redistribution terms. No dependency is deprecated or unmaintained at the time of writing. This finding should be re-run after each `bun install`.

---

## How to read this table

| Column | Meaning |
|---|---|
| **Package** | npm package name as declared in `package.json` |
| **Version** | Declared semver range from `package.json` (resolved version is in `bun.lock` and `sbom.json`) |
| **Licence** | SPDX identifier or short name as published in the package's `LICENSE` |
| **Source** | Author / maintainer of record |
| **Use within WinterVell** | Concrete role in the product |
| **Redistribution obligations** | What WinterVell must do to redistribute this package (within a built application or via `bun install`) |
| **Attribution requirements** | Specific notices WinterVell must preserve |
| **Copyleft risk** | None / Low / Medium / High |
| **Modification status** | Unmodified / Vendored-and-modified / N/A |
| **Bundled or external** | Bundled into the deployed artifact (B) vs. invoked at runtime as an external/runtime dependency (E) |

For the policy underpinning this report, see [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md). For attribution text, see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

---

## Direct dependencies

### Framework, runtime, and types

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `next` | ^16.1.1 | MIT | Vercel | Application framework, App Router, dev/build server | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `react` | ^19.0.0 | MIT | Meta | UI runtime | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `react-dom` | ^19.0.0 | MIT | Meta | DOM rendering | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `typescript` | ^5 | Apache-2.0 | Microsoft | Type system (devDependency) | Reproduce Apache-2.0 notice; preserve NOTICE files where present | Apache-2.0 notice + NOTICE file | None | Unmodified | E (toolchain) |
| `bun-types` | ^1.3.4 | MIT | Oven-sh | Type defs for Bun runtime (devDependency) | Reproduce MIT notice | MIT notice | None | Unmodified | E (toolchain) |
| `eslint` | ^9 | MIT | OpenJS Foundation | Linter (devDependency) | Reproduce MIT notice | MIT notice | None | Unmodified | E (toolchain) |
| `eslint-config-next` | ^16.1.1 | MIT | Vercel | Lint ruleset (devDependency) | Reproduce MIT notice | MIT notice | None | Unmodified | E (toolchain) |

### Database and ORM

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `prisma` | ^6.11.1 | Apache-2.0 | Prisma | Schema tooling, migrations, CLI (devDependency) | Reproduce Apache-2.0 notice; preserve NOTICE | Apache-2.0 notice + NOTICE file | None | Unmodified | E (toolchain) |
| `@prisma/client` | ^6.11.1 | Apache-2.0 | Prisma | Database client at runtime | Reproduce Apache-2.0 notice; preserve NOTICE | Apache-2.0 notice + NOTICE file | None | Unmodified | B |

### Authentication

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `next-auth` | ^4.24.11 | ISC | NextAuth.js / Auth0 contributors | Authentication, sessions, RBAC coupling | Reproduce ISC notice | ISC notice | None | Unmodified | B |

### UI primitives — Radix

Radix UI primitives are MIT-licensed by WorkOS/Radix contributors. They are used unmodified and bundled into the deployed artifact. Each is listed with its declared version. Attribution and redistribution obligations are identical across the set: reproduce the MIT notice, no copyleft, no NOTICE file required, no modification.

| Package | Version | Licence | Source | Use within WinterVell |
|---|---|---|---|---|
| `@radix-ui/react-accordion` | ^1.2.11 | MIT | WorkOS | Accordion widget |
| `@radix-ui/react-alert-dialog` | ^1.1.14 | MIT | WorkOS | Confirmation dialogs |
| `@radix-ui/react-aspect-ratio` | ^1.1.7 | MIT | WorkOS | Aspect-ratio containers |
| `@radix-ui/react-avatar` | ^1.1.10 | MIT | WorkOS | User avatars |
| `@radix-ui/react-checkbox` | ^1.3.2 | MIT | WorkOS | Checkboxes |
| `@radix-ui/react-collapsible` | ^1.1.11 | MIT | WorkOS | Collapsible regions |
| `@radix-ui/react-context-menu` | ^2.2.15 | MIT | WorkOS | Right-click menus |
| `@radix-ui/react-dialog` | ^1.1.14 | MIT | WorkOS | Modals/dialogs |
| `@radix-ui/react-dropdown-menu` | ^2.1.15 | MIT | WorkOS | Dropdown menus |
| `@radix-ui/react-hover-card` | ^1.1.14 | MIT | WorkOS | Hover cards |
| `@radix-ui/react-label` | ^2.1.7 | MIT | WorkOS | Form labels |
| `@radix-ui/react-menubar` | ^1.1.15 | MIT | WorkOS | Menu bars |
| `@radix-ui/react-navigation-menu` | ^1.2.13 | MIT | WorkOS | Navigation menus |
| `@radix-ui/react-popover` | ^1.1.14 | MIT | WorkOS | Popovers |
| `@radix-ui/react-progress` | ^1.1.7 | MIT | WorkOS | Progress bars |
| `@radix-ui/react-radio-group` | ^1.3.7 | MIT | WorkOS | Radio groups |
| `@radix-ui/react-scroll-area` | ^1.2.9 | MIT | WorkOS | Custom scroll areas |
| `@radix-ui/react-select` | ^2.2.5 | MIT | WorkOS | Select dropdowns |
| `@radix-ui/react-separator` | ^1.1.7 | MIT | WorkOS | Visual separators |
| `@radix-ui/react-slider` | ^1.3.5 | MIT | WorkOS | Sliders |
| `@radix-ui/react-slot` | ^1.2.3 | MIT | WorkOS | Slot composition |
| `@radix-ui/react-switch` | ^1.2.5 | MIT | WorkOS | Toggle switches |
| `@radix-ui/react-tabs` | ^1.1.12 | MIT | WorkOS | Tab panels |
| `@radix-ui/react-toast` | ^1.2.14 | MIT | WorkOS | Toast notifications |
| `@radix-ui/react-toggle` | ^1.1.9 | MIT | WorkOS | Toggle buttons |
| `@radix-ui/react-toggle-group` | ^1.1.10 | MIT | WorkOS | Toggle groups |
| `@radix-ui/react-tooltip` | ^1.2.7 | MIT | WorkOS | Tooltips |

For the full Radix set: **Copyleft risk: None. Modification status: Unmodified. Bundled or external: B.**

### Styling and shadcn/ui

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `class-variance-authority` | ^0.7.1 | Apache-2.0 | Joe Bell | Variant composition for UI components | Reproduce Apache-2.0 notice | Apache-2.0 notice | None | Unmodified | B |
| `clsx` | ^2.1.1 | MIT | Luke Jackson | Class-name composition | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `tailwind-merge` | ^3.3.1 | MIT | Dany Castillo | Tailwind class de-duplication | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `tailwindcss` | ^4 | MIT | Tailwind Labs | Utility CSS framework (devDependency, but emitted into built CSS) | Reproduce MIT notice | MIT notice | None | Unmodified | B (emitted CSS) |
| `tailwindcss-animate` | ^1.0.7 | MIT | Brad Adams | Tailwind animation utilities | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@tailwindcss/postcss` | ^4 | MIT | Tailwind Labs | PostCSS plugin (devDependency) | Reproduce MIT notice | MIT notice | None | Unmodified | E (toolchain) |
| `tw-animate-css` | ^1.3.5 | MIT | contributors | Animation utility CSS | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `lucide-react` | ^0.525.0 | ISC | Lucide Contributors | Icon set | Reproduce ISC notice | ISC notice | None | Unmodified | B |
| `next-themes` | ^0.4.6 | MIT | Paco Coursey | Theme switching | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `sonner` | ^2.0.6 | MIT | Emil Kowalski | Toast notifications | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `vaul` | ^1.1.2 | MIT | Emil Kowalski | Drawer component | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `cmdk` | ^1.1.1 | MIT | Viet Nguyen / Vercel | Command palette | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `input-otp` | ^1.4.2 | MIT | Emil Kowalski | OTP input | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `embla-carousel-react` | ^8.6.0 | MIT | David Stillberg | Carousel component | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `react-resizable-panels` | ^3.0.3 | MIT | Brian Vaughn | Resizable panels | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `framer-motion` | ^12.23.2 | MIT | Framer (Motion) | Animation library | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| shadcn/ui snippets | n/a | MIT | shadcn/ui | UI primitives vendored into `src/components/ui/` | Reproduce MIT notice in vendored files (preserved on copy) | MIT notice | None | Vendored-and-modified | B |

### Data, forms, and state

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `@tanstack/react-query` | ^5.82.0 | MIT | TanStack | Server-state fetching/caching | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@tanstack/react-table` | ^8.21.3 | MIT | TanStack | Tabular data | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `react-hook-form` | ^7.60.0 | MIT | Bill Luo | Form state | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@hookform/resolvers` | ^5.1.1 | MIT | Bill Luo | Zod resolver for RHF | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `zod` | ^4.0.2 | MIT | Colin McDonnell | Runtime + type validation | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `zustand` | ^5.0.6 | MIT | Poimandres | Client state | Reproduce MIT notice | MIT notice | None | Unmodified | B |

### Date, time, and i18n

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `date-fns` | ^4.1.0 | MIT | Sasha & Lesha Koss | Date formatting/arithmetic | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `next-intl` | ^4.3.4 | MIT | Jan Hückmann | Internationalisation | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `react-day-picker` | ^9.8.0 | MIT | Giampaolo Bellavite | Date pickers | Reproduce MIT notice | MIT notice | None | Unmodified | B |

### Content, rendering, and charts

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `react-markdown` | ^10.1.0 | MIT | Espen Hovlandsdal | Render markdown in reports/notes | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@mdxeditor/editor` | ^3.39.1 | MIT | MdSagg | Rich-text editor for report content | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `react-syntax-highlighter` | ^15.6.1 | MIT | Conor O'Brien | Syntax-highlight code blocks | Reproduce MIT notice; transitive deps (refractor BSD-2, prismjs MIT) preserved | MIT notice | None | Unmodified | B |
| `recharts` | ^2.15.4 | MIT | Recharts Group | Score/category charts | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@reactuses/core` | ^6.0.5 | MIT | Xuer | React utility hooks | Reproduce MIT notice | MIT notice | None | Unmodified | B |

### Drag-and-drop

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `@dnd-kit/core` | ^6.3.1 | MIT | dnd-kit contributors | DnD engine | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@dnd-kit/sortable` | ^10.0.0 | MIT | dnd-kit contributors | Sortable lists (pipeline) | Reproduce MIT notice | MIT notice | None | Unmodified | B |
| `@dnd-kit/utilities` | ^3.2.2 | MIT | dnd-kit contributors | DnD utilities | Reproduce MIT notice | MIT notice | None | Unmodified | B |

### Image, ID, and utilities

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `sharp` | ^0.34.3 | Apache-2.0 | Lovell Fuller | Server-side image processing (screenshots, thumbnails) | Reproduce Apache-2.0 notice; preserve NOTICE file | Apache-2.0 notice + NOTICE file | None (system-library exception for libvips) | Unmodified | B |
| `uuid` | ^11.1.0 | MIT | Robert Kieffer and contributors | UUID generation | Reproduce MIT notice | MIT notice | None | Unmodified | B |

### AI provider abstraction

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `z-ai-web-dev-sdk` | ^0.0.18 | **Verification required** | ZAI / Zhipu-AI Web Dev SDK | Default demo/mock AI provider behind abstraction layer | **Pending verification.** Until confirmed, WinterVell will not vendor or redistribute this package beyond standard `bun install`; licensees deploy via `bun install` themselves. | Reproduce the SDK's own notice file shipped with the package | Low (no copyleft detected at top level) | Unmodified | B |

### Type definitions

| Package | Version | Licence | Source | Use within WinterVell | Redistribution obligations | Attribution requirements | Copyleft risk | Modification status | Bundled or external |
|---|---|---|---|---|---|---|---|---|---|
| `@types/react` | ^19 | MIT | DefinitelyTyped | React type defs (devDependency) | Reproduce MIT notice | MIT notice | None | Unmodified | E (toolchain) |
| `@types/react-dom` | ^19 | MIT | DefinitelyTyped | React DOM type defs (devDependency) | Reproduce MIT notice | MIT notice | None | Unmodified | E (toolchain) |

---

## Transitive dependency notes

The following transitive dependencies warrant explicit mention because their licence is not MIT and they are pulled in by direct dependencies:

| Transitive package | Pulled in by | Licence | Risk |
|---|---|---|---|
| `refractor` | `react-syntax-highlighter` | BSD-2-Clause | None — permissive |
| `prismjs` | `react-syntax-highlighter` | MIT | None |
| libvips (native binaries) | `sharp` | LGPL-2.1+ / expat for some components (system-library exception) | None — invoked as a system library; no WinterVell source is linked. The sharp package's own `THIRD_PARTY_NOTICES` file preserves the libvips notice. |
| Engine binaries (V8, libnode-equivalent runtime) | Next.js runtime / Bun runtime |各自的 runtime licences (BSD-style for V8) | None — invoked as runtime |

A full transitive enumeration is maintained in `sbom.json`. The build pipeline regenerates `sbom.json` on every CI run; manual review focuses on direct dependencies and any new transitive package that surfaces a non-permissive licence.

---

## Flags

### GPL / AGPL / LGPL / MPL / SSPL / BUSL / non-commercial / source-available / unknown / deprecated / unmaintained

| Flag | Status |
|---|---|
| GPL family detected | No |
| AGPL detected | No |
| LGPL detected (top-level) | No — only as system library via `sharp`/libvips, which is invoked at arm's length |
| MPL-2.0 detected | No |
| SSPL detected | No |
| BUSL detected | No |
| Non-commercial licence detected | No |
| Source-available (non-OSI) detected | No |
| Unknown licence detected | 1 — `z-ai-web-dev-sdk` (licence file present in package but redistribution terms require confirmation with the maintainer) |
| Deprecated package detected | No |
| Unmaintained package detected | No |

**Net finding: no copyleft or prohibited-licence package was detected in the direct dependency tree.** One package requires licence verification (z-ai-web-dev-sdk) and is flagged accordingly in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md).

---

## Maintenance

- This report is regenerated whenever `package.json` or `bun.lock` changes.
- The CI workflow runs an automated licence scan (`.github/workflows/`) and fails on any package whose SPDX identifier is not in the allow-list.
- The allow-list is reviewed by the repository owner; additions require sign-off per [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md).
- `sbom.json` is the authoritative machine-readable source. This file is the curated human-readable companion.
- Vulnerability advisories are tracked separately in CI; high/critical advisories block merge until triaged.

---

*This report is part of the WinterVell legal package. It is maintained for accuracy but is not legal advice.*
