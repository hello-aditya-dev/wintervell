# Third-Party Notices

This document lists the third-party open-source and permissively-licensed components used by WinterVell, together with their licences and the attribution text required by those licences. It is the human-readable companion to [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md) and the machine-readable [`sbom.json`](../../sbom.json).

WinterVell is proprietary software governed by the WinterVell Commercial Source License (WV-CSL) v1.0 — see [`LICENSE`](../../LICENSE). The third-party components listed here retain their original licences; nothing in the WV-CSL overrides those licences. Where a licence requires reproduction of its text or a copyright notice, that text is included or referenced below.

> This document is maintained as part of [`docs/legal/`](.). When dependencies are added, removed, or upgraded, this file and [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md) must be updated together. Versions listed are the declared `package.json` ranges; the resolved versions at install time are recorded in `bun.lock` and `sbom.json`.

---

## Licence legend

| Code | Licence | WinterVell policy |
|---|---|---|
| MIT | MIT License | Permitted |
| ISC | ISC License | Permitted |
| Apache-2.0 | Apache License 2.0 | Permitted (notice + NOTICE file preservation) |
| BSD-2/3 | BSD 2-Clause / 3-Clause | Permitted |
| OFL-1.1 | SIL Open Font License 1.1 | Permitted for fonts (no subsetting restriction) |
| MPL-2.0 | Mozilla Public License 2.0 | Permitted only with file-level copyleft review (none currently present) |
| GPL/AGPL/LGPL | GNU copyleft licences | Prohibited without legal sign-off — see [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md). None detected. |
| SSPL/BUSL/NC/SA | Server Side Public License, Business Source License, non-commercial, source-available | Prohibited. None detected. |
| Unknown / Unlicensed | Packages whose licence cannot be verified | Prohibited; must be resolved before merge. |

For the full policy see [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md).

---

## Framework and runtime

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `next` | ^16.1.1 | MIT | Vercel — Next.js |
| `react` | ^19.0.0 | MIT | Meta Platforms, Inc. — React |
| `react-dom` | ^19.0.0 | MIT | Meta Platforms, Inc. — React DOM |
| `eslint-config-next` | ^16.1.1 | MIT | Vercel |
| `typescript` | ^5 | Apache-2.0 | Microsoft Corporation |
| `bun-types` | ^1.3.4 | MIT | Oven-sh |

> **Next.js.** Copyright (c) Vercel, Inc. Licensed under the MIT License. Used as the application framework and dev/build server.

> **React.** Copyright (c) Meta Platforms, Inc. and its affiliates. Licensed under the MIT License.

> **TypeScript.** Copyright (c) Microsoft Corporation. Licensed under the Apache License, Version 2.0. The full Apache-2.0 notice is reproduced in the [`NOTICE`](#apache-20-notice-text) section below where required.

---

## Database and ORM

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `prisma` | ^6.11.1 | Apache-2.0 | Prisma |
| `@prisma/client` | ^6.11.1 | Apache-2.0 | Prisma |

> **Prisma.** Copyright (c) Prisma. Licensed under the Apache License, Version 2.0. NOTICE file contents are preserved in the installed package. WinterVell does not modify Prisma source; it consumes the published packages via the standard client generator.

---

## Authentication

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `next-auth` | ^4.24.11 | ISC | NextAuth.js / Auth0 (now Auth.js) contributors |

> **NextAuth.js.** Copyright (c) Auth0/NextAuth.js contributors. Licensed under the ISC License. WinterVell uses NextAuth v4 only; the v5 (Auth.js) line is not in use.

---

## UI primitives (Radix)

Radix UI primitives are published under the MIT License by WorkOS/Radix UI. Each primitive is a separate package; WinterVell uses the following:

| Package | Version | Licence |
|---|---|---|
| `@radix-ui/react-accordion` | ^1.2.11 | MIT |
| `@radix-ui/react-alert-dialog` | ^1.1.14 | MIT |
| `@radix-ui/react-aspect-ratio` | ^1.1.7 | MIT |
| `@radix-ui/react-avatar` | ^1.1.10 | MIT |
| `@radix-ui/react-checkbox` | ^1.3.2 | MIT |
| `@radix-ui/react-collapsible` | ^1.1.11 | MIT |
| `@radix-ui/react-context-menu` | ^2.2.15 | MIT |
| `@radix-ui/react-dialog` | ^1.1.14 | MIT |
| `@radix-ui/react-dropdown-menu` | ^2.1.15 | MIT |
| `@radix-ui/react-hover-card` | ^1.1.14 | MIT |
| `@radix-ui/react-label` | ^2.1.7 | MIT |
| `@radix-ui/react-menubar` | ^1.1.15 | MIT |
| `@radix-ui/react-navigation-menu` | ^1.2.13 | MIT |
| `@radix-ui/react-popover` | ^1.1.14 | MIT |
| `@radix-ui/react-progress` | ^1.1.7 | MIT |
| `@radix-ui/react-radio-group` | ^1.3.7 | MIT |
| `@radix-ui/react-scroll-area` | ^1.2.9 | MIT |
| `@radix-ui/react-select` | ^2.2.5 | MIT |
| `@radix-ui/react-separator` | ^1.1.7 | MIT |
| `@radix-ui/react-slider` | ^1.3.5 | MIT |
| `@radix-ui/react-slot` | ^1.2.3 | MIT |
| `@radix-ui/react-switch` | ^1.2.5 | MIT |
| `@radix-ui/react-tabs` | ^1.1.12 | MIT |
| `@radix-ui/react-toast` | ^1.2.14 | MIT |
| `@radix-ui/react-toggle` | ^1.1.9 | MIT |
| `@radix-ui/react-toggle-group` | ^1.1.10 | MIT |
| `@radix-ui/react-tooltip` | ^1.2.7 | MIT |

> **Radix UI.** Copyright (c) WorkOS, Inc. and Radix UI contributors. Licensed under the MIT License. shadcn/ui is built on top of Radix; the shadcn/ui snippets vendored into `src/components/ui/` are MIT-licensed and may be modified.

---

## shadcn/ui and styling

| Package | Version | Licence | Attribution |
|---|---|---|---|
| shadcn/ui snippets (vendored) | n/a (snippet copy) | MIT | shadcn/ui — copied into `src/components/ui/` and modified |
| `class-variance-authority` | ^0.7.1 | Apache-2.0 | Joe Bell |
| `clsx` | ^2.1.1 | MIT | Luke Jackson |
| `tailwind-merge` | ^3.3.1 | MIT | Dany Castillo |
| `tailwindcss` | ^4 | MIT | Tailwind Labs |
| `tailwindcss-animate` | ^1.0.7 | MIT | Brad Adams |
| `@tailwindcss/postcss` | ^4 | MIT | Tailwind Labs |
| `tw-animate-css` | ^1.3.5 | MIT | Owncast / contributors |
| `lucide-react` | ^0.525.0 | ISC | Lucide Contributors |
| `next-themes` | ^0.4.6 | MIT | Paco Coursey |
| `sonner` | ^2.0.6 | MIT | Emil Kowalski |
| `vaul` | ^1.1.2 | MIT | Emil Kowalski |
| `cmdk` | ^1.1.1 | MIT | Viet Nguyen / Vercel |
| `input-otp` | ^1.4.2 | MIT | Emil Kowalski |
| `embla-carousel-react` | ^8.6.0 | MIT | David Stillberg |
| `react-resizable-panels` | ^3.0.3 | MIT | Brian Vaughn |
| `framer-motion` | ^12.23.2 | MIT | Framer (Motion) contributors |

> **Lucide.** Copyright (c) Lucide Contributors. Licensed under the ISC License. Lucide icons are used as the icon set across the product. The ISC licence text is reproduced in the [`NOTICE`](#isc-notice-text) section below.

> **class-variance-authority.** Copyright (c) Joe Bell. Licensed under the Apache License, Version 2.0.

---

## Data fetching, forms, and state

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `@tanstack/react-query` | ^5.82.0 | MIT | TanStack |
| `@tanstack/react-table` | ^8.21.3 | MIT | TanStack |
| `react-hook-form` | ^7.60.0 | MIT | Bill Luo |
| `@hookform/resolvers` | ^5.1.1 | MIT | Bill Luo |
| `zod` | ^4.0.2 | MIT | Colin McDonnell |
| `zustand` | ^5.0.6 | MIT | Poimandres |

---

## Date, time, and i18n

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `date-fns` | ^4.1.0 | MIT | Sasha Koss & Lesha Koss |
| `next-intl` | ^4.3.4 | MIT | Jan Hückmann |
| `react-day-picker` | ^9.8.0 | MIT | Giampaolo Bellavite |

---

## Content, rendering, and charts

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `react-markdown` | ^10.1.0 | MIT | Espen Hovlandsdal |
| `@mdxeditor/editor` | ^3.39.1 | MIT | MdSagg |
| `react-syntax-highlighter` | ^15.6.1 | MIT | Conor O'Brien |
| `recharts` | ^2.15.4 | MIT | Recharts Group |
| `@reactuses/core` | ^6.0.5 | MIT | Xuer |

> **react-syntax-highlighter** bundles refractor/Prism language definitions. The top-level `react-syntax-highlighter` package is MIT. Its transitive dependencies include `refractor` (BSD-2-Clause) and `prismjs` (MIT). No copyleft dependency is introduced by this tree.

---

## Drag-and-drop and interactions

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `@dnd-kit/core` | ^6.3.1 | MIT | Christian Alfoni / dnd-kit contributors |
| `@dnd-kit/sortable` | ^10.0.0 | MIT | dnd-kit contributors |
| `@dnd-kit/utilities` | ^3.2.2 | MIT | dnd-kit contributors |

---

## Image, ID, and utilities

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `sharp` | ^0.34.3 | Apache-2.0 | Lovell Fuller |
| `uuid` | ^11.1.0 | MIT | Robert Kieffer and contributors |

> **sharp.** Copyright (c) Lovell Fuller. Licensed under the Apache License, Version 2.0. Native libvips binaries are bundled under their respective licences (LGPL/expat for libvips components) — see the sharp package's own `THIRD_PARTY_NOTICES` for the libvips notice. These are system-library dependencies invoked at arm's length and do not impose copyleft obligations on WinterVell's own source code.

---

## AI provider abstraction

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `z-ai-web-dev-sdk` | ^0.0.18 | Requires verification | ZAI / Zhipu-AI Web Dev SDK contributors |

> **z-ai-web-dev-sdk — licence verification required.** The `z-ai-web-dev-sdk` package is the Zhipu-AI / ZAI web development SDK. Its licence file is included in the installed package and must be reviewed against the current published version before any redistribution. WinterVell uses this SDK in the following ways:
>
> 1. As a **default AI provider** in the mock/demo path of the AI provider abstraction layer.
> 2. Behind a provider-abstraction interface so it can be swapped for OpenAI-compatible or Anthropic providers in production.
>
> WinterVell does not redistribute the SDK source. Licensees deploying WinterVell are responsible for accepting the SDK's own terms, where applicable, and for ensuring that any data sent through the SDK is permitted under their agreement with the provider. The exact redistribution status of the SDK is flagged as **verification required** in [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md). Until verification is complete, the SDK must not be vendored or redistributed outside the standard `bun install` flow.

---

## Type definitions and tooling

| Package | Version | Licence | Attribution |
|---|---|---|---|
| `@types/react` | ^19 | MIT | DefinitelyTyped contributors |
| `@types/react-dom` | ^19 | MIT | DefinitelyTyped contributors |
| `eslint` | ^9 | MIT | OpenJS Foundation / Nicholas C. Zakas |

---

## Fonts

WinterVell uses the **Fraunces** and **Inter** typefaces. Both are licensed under the SIL Open Font License 1.1 (OFL-1.1), which permits commercial use, redistribution, and modification, subject to the OFL terms (no subsetting restriction is imposed by these fonts).

| Font | Creator | Licence | Notes |
|---|---|---|---|
| Fraunces | Undercase Type | OFL-1.1 | Used for display/headings |
| Inter | Rasmus Andersson | OFL-1.1 | Used for UI text |

The full OFL-1.1 text is reproduced in the [`OFL-1.1 notice text`](#ofl-11-notice-text) section below. The copyright notices for each font are preserved with the font files.

---

## NOTICE text reproductions

The following licence texts are reproduced to satisfy the attribution requirements of the corresponding licences. Where a licence requires only a copyright notice and a link to the licence text, that is given in the per-package table above.

### MIT notice text

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### ISC notice text

```
ISC License

Copyright (c) [year], [holder]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

### Apache-2.0 notice text

```
Apache License 2.0

Copyright [year] [holder]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Apache-2.0 also requires preservation of `NOTICE` files where present. WinterVell does not strip or alter any `NOTICE` file shipped by Apache-2.0 dependencies (Prisma, sharp, class-variance-authority).

### OFL-1.1 notice text

```
SIL OPEN FONT LICENSE Version 1.1

Copyright (c) [year] [holder]

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.
```

The full OFL-1.1 text is available at https://openfontlicense.org.

---

## Maintenance

- This file is regenerated against `package.json` and `bun.lock` whenever dependencies change.
- New dependencies must pass the policy check in [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md) before they are merged.
- The machine-readable SBOM is maintained at [`sbom.json`](../../sbom.json).
- Vulnerability scans run in CI (`.github/workflows/`). Any high/critical advisory blocks the merge until reviewed.
- A list of all packages with verification-required licences (currently only `z-ai-web-dev-sdk`) is maintained in [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md).

---

*This document is part of the WinterVell legal package. It is maintained for accuracy but is not legal advice. The Licensor should have it reviewed by a qualified lawyer before commercial distribution.*
