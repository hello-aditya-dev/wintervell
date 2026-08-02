# Task: Rebuild WinterVell Public Homepage

## Summary
Rebuilt the public homepage at `src/app/page.tsx` with exactly 10 sections as specified, plus 8 supporting public route pages. All old components (28+ dynamic imports) were replaced with 12 clean, focused components.

## Files Created

### Homepage Section Components (src/components/site/)
1. **Header.tsx** — Compact sticky header with Sheet for mobile menu, navigation links to /product, /demo, /white-label, /pricing, /due-diligence. "Open demo" (primary → /app), "View pricing" (secondary → /pricing), "Join the founding release" (ghost → /contact, shown when checkout URLs are empty). No "Sign in" or "Buy" shown.
2. **HeroSection.tsx** — Server component. Headline, supporting copy, qualification line, two CTAs (demo + sample report), hero visual with 6 workflow cards.
3. **CoreWorkflow.tsx** — Server component. Six compact steps with connecting lines and icons.
4. **ProductPreview.tsx** — Server component. Five preview cards with mock data (audit detail, finding evidence, client report, proposal, pipeline), each linking to /app.
5. **Differentiators.tsx** — Server component. Three columns: Evidence before explanation, Report to proposal, Audit and opportunity stay connected.
6. **WhiteLabelPreview.tsx** — Client component. Interactive brand switcher with 3 fictional agencies (Northstar Digital, Cedarline Agency, HarborDesk Studio). Exports both `WhiteLabelContent` (inner) and `WhiteLabelPreview` (with section wrapper).
7. **OwnershipDeployment.tsx** — Server component. Two columns: Planned source package (6 items) and Current release state (4 items with status indicators).
8. **PricingPreview.tsx** — Server component. Three tiers (Agency $799, Studio $1,499, Enterprise custom). Label: "Planned founding pricing. Purchasing is not yet open."
9. **DueDiligencePreview.tsx** — Server component. Five cards with status badges (Available/In preparation).
10. **FinalCTA.tsx** — Server component. "Review the product before the commercial release." Three CTAs.
11. **Footer.tsx** — Server component. Clean, minimal footer with Product, Resources, Legal columns.
12. **SiteLayout.tsx** — Server component. Wraps public pages with Header + Footer.

### Public Route Pages
1. **/product** (`src/app/product/page.tsx`) — Detailed product page with workflow, audit categories, features, and CTA.
2. **/demo** (`src/app/demo/page.tsx`) — Redirects to /app using `redirect('/app')`.
3. **/pricing** (`src/app/pricing/page.tsx`) — Detailed pricing with three tiers, licence comparison table, FAQ.
4. **/white-label** (`src/app/white-label/page.tsx`) — White-label preview with interactive brand switcher and customization details.
5. **/due-diligence** (`src/app/due-diligence/page.tsx`) — Five document categories with status and content details.
6. **/license** (`src/app/license/page.tsx`) — Licence overview, comparison table, key terms.
7. **/contact** (`src/app/contact/page.tsx`) — Contact form with honeypot + zod validation, uses existing /api/contact route.
8. **/sample-report** (`src/app/sample-report/page.tsx`) — Sample report with executive summary, category scores, and sample findings.

### Updated Files
- **src/app/page.tsx** — Simplified to use 9 section components directly (no dynamic imports).
- **src/components/site/WhiteLabelPreview.tsx** — Refactored to export both `WhiteLabelContent` and `WhiteLabelPreview`.

## Files Deleted
Removed 30+ old site components that were replaced by the new 12 components.

## Design Decisions
- Server components by default, client components only for interactive parts (Header, WhiteLabelPreview, Contact form)
- No framer-motion — CSS transitions only for interactive state changes
- No decorative motion (no particles, glow, shimmer, floating elements)
- No fake claims, testimonials, scarcity, or crossed-out anchor pricing
- All links have valid destinations
- Used semantic CSS variables from globals.css
- Used shadcn/ui components (Button, Sheet, Card, Select, Input, Label, Textarea, Badge)
- Used lucide-react icons sparingly
- Mobile-first responsive design

## Verification
- All routes return 200 (except /demo which returns 307 redirect to /app)
- ESLint passes with no errors
- Dev server compiles all pages successfully
