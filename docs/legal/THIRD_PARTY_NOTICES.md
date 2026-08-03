# WinterVell — Third-Party Notices

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline

## Purpose

This document lists all third-party packages used by WinterVell, their licences, and any attribution requirements.

## Runtime Dependencies

| Package | Version | Licence | Purpose | Attribution Required |
|---|---|---|---|---|
| next | ^16.1.1 | MIT | React framework | No |
| react | ^19.0.0 | MIT | UI library | No |
| react-dom | ^19.0.0 | MIT | React DOM renderer | No |
| typescript | ^5 | Apache-2.0 | Type system | No |
| @prisma/client | ^6.11.1 | Apache-2.0 | Database ORM | No |
| prisma | ^6.11.1 | Apache-2.0 | Database toolkit | No |
| next-auth | ^4.24.11 | ISC | Authentication | No |
| zod | ^4.0.2 | MIT | Schema validation | No |
| tailwindcss | ^4 | MIT | CSS framework | No |
| framer-motion | ^12.23.2 | MIT | Animation library | No |
| recharts | ^2.15.4 | MIT | Chart library | No |
| sharp | ^0.34.3 | Apache-2.0 | Image processing | No |
| zustand | ^5.0.6 | MIT | State management | No |
| @tanstack/react-table | ^8.21.3 | MIT | Data tables | No |
| @tanstack/react-query | ^5.82.0 | MIT | Server state | No |
| react-hook-form | ^7.60.0 | MIT | Form management | No |
| cmdk | ^1.1.1 | MIT | Command menu | No |
| vaul | ^1.1.2 | MIT | Drawer component | No |
| date-fns | ^4.1.0 | MIT | Date utilities | No |
| sonner | ^2.0.6 | MIT | Toast notifications | No |
| class-variance-authority | ^0.7.1 | MIT | CSS variants | No |
| clsx | ^2.1.1 | MIT | Class utility | No |
| tailwind-merge | ^3.3.1 | MIT | Tailwind merge | No |
| tailwindcss-animate | ^1.0.7 | MIT | Tailwind animation | No |
| lucide-react | ^0.525.0 | ISC | Icon library | No |
| @radix-ui/react-* | Various | MIT | UI primitives | No |
| embla-carousel-react | ^8.6.0 | MIT | Carousel | No |
| input-otp | ^1.4.2 | MIT | OTP input | No |
| react-day-picker | ^9.8.0 | MIT | Date picker | No |
| react-resizable-panels | ^3.0.3 | MIT | Resizable panels | No |
| uuid | ^11.1.0 | MIT | UUID generation | No |
| @dnd-kit/core | ^6.3.1 | MIT | Drag and drop | No |
| @dnd-kit/sortable | ^10.0.0 | MIT | Sortable DnD | No |
| @dnd-kit/utilities | ^3.2.2 | MIT | DnD utilities | No |
| @hookform/resolvers | ^5.1.1 | MIT | Form resolvers | No |
| next-themes | ^0.4.6 | MIT | Theme switching | No |
| @reactuses/core | ^6.0.5 | MIT | React hooks | No |
| next-intl | ^4.3.4 | MIT | Internationalization | No |
| @mdxeditor/editor | ^3.39.1 | LGPL-3.0 | MDX editor | **Yes — LGPL-3.0** |
| react-markdown | ^10.1.0 | MIT | Markdown rendering | No |
| react-syntax-highlighter | ^15.6.1 | MIT | Syntax highlighting | No |

## Flagged Dependencies

### @mdxeditor/editor — LGPL-3.0

- **Risk level:** Medium
- **Concern:** LGPL-3.0 requires that the library can be replaced by the user. In a web application, this is typically satisfied by the fact that the application is not a "combined work" in the LGPL sense. However, if WinterVell is distributed as source code, the licence terms must be clearly documented.
- **Action:** Document the licence terms. Consider whether this dependency is needed (it is currently unused).

### z-ai-web-dev-sdk — Licence Unknown

- **Risk level:** Medium
- **Concern:** This SDK is for development use only and must not be used in production runtime. Its licence terms should be reviewed.
- **Action:** Remove from production dependencies or move to devDependencies. Review licence terms.

## Unused Dependencies

These packages are installed but not used in the current codebase:

| Package | Version | Licence | Recommendation |
|---|---|---|---|
| next-intl | ^4.3.4 | MIT | Remove unless internationalization is planned |
| @mdxeditor/editor | ^3.39.1 | LGPL-3.0 | Remove unless MDX editing is planned |
| react-syntax-highlighter | ^15.6.1 | MIT | Remove unless code display is needed |
| react-markdown | ^10.1.0 | MIT | Remove unless markdown rendering is needed |
| uuid | ^11.1.0 | MIT | Remove — demo data uses deterministic IDs |

## Dev Dependencies

| Package | Version | Licence | Purpose |
|---|---|---|---|
| @tailwindcss/postcss | ^4 | MIT | PostCSS plugin |
| @types/react | ^19 | MIT | React types |
| @types/react-dom | ^19 | MIT | React DOM types |
| bun-types | ^1.3.4 | MIT | Bun types |
| eslint | ^9 | MIT | Linting |
| eslint-config-next | ^16.1.1 | MIT | Next.js ESLint config |
| tw-animate-css | ^1.3.5 | MIT | Tailwind animation CSS |

## Fonts

| Font | Licence | Source |
|---|---|---|
| Geist Sans | SIL Open Font License 1.1 | Google Fonts via next/font |
| Geist Mono | SIL Open Font License 1.1 | Google Fonts via next/font |

## shadcn/ui Components

All shadcn/ui components in `src/components/ui/` are based on the shadcn/ui project:

- **Licence:** MIT
- **Source:** https://ui.shadcn.com/
- **Attribution:** Not required by the MIT licence, but the components are derived from shadcn/ui

## Summary

- **Total dependencies:** 77 (runtime + dev)
- **Licence concerns:** 1 (LGPL-3.0 for @mdxeditor/editor)
- **Unused dependencies:** 5
- **Security concern:** 1 (z-ai-web-dev-sdk should not be in production)
- **GPL/AGPL dependencies:** None
- **SSPL/BSL dependencies:** None
- **Non-commercial dependencies:** None

## Next Steps

1. Remove unused dependencies (@mdxeditor/editor, react-syntax-highlighter, react-markdown, next-intl, uuid)
2. Move z-ai-web-dev-sdk to devDependencies or remove it
3. Document the LGPL-3.0 licence for @mdxeditor/editor if it is retained
4. Generate a full SBOM (Software Bill of Materials) in Phase 13
