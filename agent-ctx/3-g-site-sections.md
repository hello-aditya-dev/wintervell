# Task 3-g: Buyer Risk Reduction, Due Diligence, FAQ Sections

## Summary
Created three "use client" section components for the WinterVell commercial website.

## Files Created

### 1. `/home/z/my-project/src/components/site/BuyerRiskReduction.tsx`
- **Section ID**: `buyer-risk`
- **Heading**: "Inspect the product before you purchase it."
- Grid of 12 inspection items (icon + label + short description):
  - Read-only live demo → #demo
  - Sample report → #report
  - Sample proposal → #audit-to-proposal
  - Documentation preview → #architecture
  - Architecture overview → #architecture
  - Dependency report → #due-diligence
  - Security overview → #security
  - Known limitations → #due-diligence
  - Licence preview → #licence-comparison
  - Deployment checklist → #ownership
  - Changelog → #due-diligence
  - Product roadmap → #due-diligence
- Prominent amber callout: "Do not hide material limitations until after purchase."
- No refund policy mentioned (not formally defined)
- Paper background (#F4F6F7), white cards, Action blue icons

### 2. `/home/z/my-project/src/components/site/DueDiligence.tsx`
- **Section ID**: `due-diligence`
- **Heading**: "Serious buyers should be able to inspect serious software."
- Card-based layout with 10 due-diligence documents:
  - Product provenance, Third-party notices, Dependency licence report, Asset-rights register
  - Security disclosure, AI usage disclosure, Data-processing overview
  - Known limitations, Commercial licence summary, Buyer handover checklist
- Navy background (#142634), dark cards (#1A2E3E), Glacier accents
- Emphasis note about source-code software importance

### 3. `/home/z/my-project/src/components/site/FAQSection.tsx`
- **Section ID**: `faq`
- **Heading**: "Frequently asked questions"
- Uses shadcn/ui Accordion component
- Imports FAQ data from `@/config/commercial` (commercial.faq array)
- 20 FAQ items with direct, no-evasive-language answers
- Paper background, white card container, clean accordion styling
- Contact sales link at bottom

## Design System Applied
- Paper: #F4F6F7, Surface: #FFFFFF, Ink: #111820, Secondary ink: #56616C
- Navy: #142634, Glacier: #B7DDEC, Action: #2563EB, Pine: #24584F
- Amber: #B7791F, Critical: #B43C3C, Border: #DDE3E7
- Framer Motion animations consistent with existing site components
- Responsive grid layouts (1→2→3 columns)
- All icons from lucide-react

## Fixes
- Replaced `GitDependency` (non-existent in lucide-react) with `Package` icon

## Lint & Compilation
- ESLint: passed with no errors
- Dev server: compiling successfully
