# Task 3-f: Three Commercial Section Components

## Summary
Created three "use client" section components for the WinterVell commercial website:

### 1. ROICalculator.tsx (`/src/components/site/ROICalculator.tsx`)
- Section 13 — Interactive ROI calculator
- `<section id="roi-calculator">` with `bg-[#F4F6F7]` background
- 6 input fields with shadcn/ui Input + Label: audit price, project value, audits/month, conversion rate, alternatives cost, hours per audit
- 5 calculated outputs in real-time via React state + useMemo: monthly audit revenue, annual audit revenue, associated project value, tool-cost comparison, licence payback
- All outputs labeled as estimates with amber disclaimers
- No guaranteed revenue claims; full disclaimer explaining dependence on pricing, demand, execution, conversion
- Uses licence cost from commercial config (`commercial.pricing.agency.foundingPrice`)
- Framer Motion animations with reduced-motion support

### 2. PricingSection.tsx (`/src/components/site/PricingSection.tsx`)
- Section 14 — Three pricing cards
- `<section id="pricing">` with `bg-[#FFFFFF]` background
- Agency ($799, struck-through $1,199), Studio ($1,499, struck-through $2,199, with badge), Enterprise (From $4,000)
- Includes lists from commercial config (11 agency items + 4 clarifications, 8 studio items, 7 enterprise items)
- Checkout buttons use centralized config; when URLs empty, show "Purchasing opens soon" disabled state
- Studio card has highlighted border and badge; NOT marked as "Most Popular"
- Enterprise CTA falls back to mailto link to salesEmail when no contact URL configured
- Bottom note links to `#license` anchor

### 3. LicenceComparison.tsx (`/src/components/site/LicenceComparison.tsx`)
- Section 15 — Comparison table
- `<section id="licence-comparison">` with `bg-[#F4F6F7]` background
- Desktop: shadcn/ui Table with navy header, alternating row colors, 12 comparison fields from config
- Mobile: transforms into individual tier cards with feature/value pairs
- CellValue renderer: "Yes"/"Unlimited" get green check, "No" gets red X, other values displayed as text
- Link to `#license` anchor at bottom

### Page Integration
- All three components added to `src/app/page.tsx` after TechnicalCredibility
- Lint passes clean
- Dev server compiles successfully

### Design System
- All components use the specified hex color palette (Paper, Surface, Ink, Navy, Glacier, Pine, Amber, Border)
- Icons from lucide-react
- Config imported from `@/config/commercial`
- Framer Motion animations with `useReducedMotion` support
- Responsive design with mobile-first approach
