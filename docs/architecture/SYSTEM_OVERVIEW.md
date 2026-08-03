# WinterVell — System Overview

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline

## Current Architecture

### Technology Stack

| Layer | Technology | Status |
|---|---|---|
| Framework | Next.js 16 (App Router) | Active |
| Language | TypeScript 5 | Active |
| UI Library | React 19 | Active |
| Styling | Tailwind CSS 4 | Active |
| Component Library | shadcn/ui (New York style) | Active |
| State Management | Zustand (client), TanStack Query (server) | Active (client only) |
| Database | SQLite (Prisma ORM) | Placeholder — tutorial models only |
| Authentication | NextAuth.js v4 | Installed but not configured |
| Validation | Zod | Active |
| Animation | Framer Motion | Active (reduced-motion support) |
| Charts | Recharts | Active |
| Tables | TanStack Table | Active |
| Forms | React Hook Form | Active |
| Command Menu | cmdk | Active |
| Drawer | Vaul | Active |
| Image Processing | Sharp | Installed |
| Icons | Lucide | Active |

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Public homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Design system
│   ├── opengraph-image.tsx       # OG image generation
│   ├── sitemap.ts                # Sitemap (placeholder domain)
│   ├── robots.ts                 # Robots.txt (placeholder domain)
│   ├── api/
│   │   ├── route.ts              # Health check
│   │   └── contact/route.ts      # Contact form (no persistence)
│   ├── app/                      # Product frontend
│   │   ├── layout.tsx            # App shell layout
│   │   ├── page.tsx              # Dashboard
│   │   ├── prospects/            # Prospect CRUD
│   │   ├── audits/               # Audit CRUD
│   │   ├── reports/              # Report builder
│   │   ├── proposals/            # Proposal builder
│   │   ├── pipeline/             # Pipeline kanban
│   │   ├── tasks/                # Task management
│   │   ├── services/             # Service catalogue
│   │   └── settings/             # Branding, team, integrations
│   ├── product/                  # Product page
│   ├── demo/                     # Demo info page
│   ├── white-label/              # White-label preview
│   ├── pricing/                  # Pricing page
│   ├── due-diligence/            # Due-diligence page
│   ├── license/                  # Licence page
│   ├── contact/                  # Contact page
│   └── sample-report/            # Sample report
├── components/
│   ├── site/                     # Public site components
│   ├── app-shell/                # App shell components
│   ├── shared/                   # Shared components
│   └── ui/                       # shadcn/ui components
├── config/
│   └── commercial.ts             # Central commercial config
├── demo/
│   ├── fixtures/                 # Static demo data
│   ├── repositories/             # Typed demo data access
│   ├── state/                    # Zustand demo store
│   └── types/                    # TypeScript interfaces
└── lib/                          # Utility functions
```

### Target Architecture (Post-Phase 2)

The eventual architecture should separate concerns into:

```
src/
├── app/                          # Next.js App Router (presentation only)
├── components/                   # UI components
├── config/                       # Configuration
├── lib/
│   ├── services/                 # Application services
│   ├── domain/                   # Domain logic
│   ├── repositories/             # Data access
│   ├── security/                 # Security controls
│   ├── audit/                    # Audit engine
│   ├── scoring/                  # Scoring engine
│   ├── email/                    # Email adapter
│   ├── storage/                  # Storage adapter
│   ├── ai/                       # AI provider adapter
│   └── integrations/             # External integrations
├── demo/                         # Demo data (clearly separated)
└── worker/                       # Background job processing
```

### Data Flow (Current)

```
Browser → Next.js App Router → Demo Fixtures → Browser
         ↓
       Contact Form → Zod validation → 200 OK (no persistence)
```

### Data Flow (Target)

```
Browser → Next.js App Router → API Routes → Application Services → Domain Logic → Prisma → PostgreSQL
         ↓                        ↓
       Contact Form            Worker Queue → Audit Engine → Findings → Evidence
         ↓                        ↓
       Zod validation          Email Adapter → Notifications
         ↓                        ↓
       Database persistence    Storage Adapter → S3
```

### Key Architectural Decisions

1. **Single Next.js application** — The current implementation uses a single Next.js application. This is appropriate for the current phase but may need to be re-evaluated when the audit worker requires a separate process.

2. **Server components by default** — The public site uses server components. Client components are used only for interactive elements (forms, dialogs, drag-and-drop, etc.).

3. **Demo data architecture** — The demo data architecture uses typed repositories and fixtures, which is a good pattern that can be retained for the product's demo mode.

4. **Centralized commercial config** — `src/config/commercial.ts` serves as the single source of truth for brand identity, pricing, and product status. This is a good pattern.

5. **Zustand for client state** — The demo store uses Zustand, which is appropriate for client-side state management.

6. **No backend yet** — The current architecture has no backend. All data is static or client-side. This is the most significant architectural gap.

### Architectural Gaps

1. No application service layer
2. No domain logic layer
3. No data access layer
4. No background job processing
5. No audit engine
6. No email adapter
7. No storage adapter
8. No AI provider adapter
9. No security middleware
10. No API route protection
11. No tenant isolation
12. No worker process
