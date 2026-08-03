---
Task ID: 2-c
Agent: Pricing & Comparison Polish Agent
Task: Enhance PricingSection and LicenceComparison with better styling, hover effects, and visual polish

Work Log:
- Read /home/z/my-project/worklog.md to understand the WinterVell commercial website context (23 sections built by previous agents, commit 84730cb on main)
- Read both target component files first to preserve existing functionality:
  - /home/z/my-project/src/components/site/PricingSection.tsx (319 lines)
  - /home/z/my-project/src/components/site/LicenceComparison.tsx (212 lines)
- Read /home/z/my-project/src/config/commercial.ts to preserve all pricing data, founding config, and checkout URLs
- Read /home/z/my-project/src/components/ui/table.tsx and card.tsx to understand the shadcn primitives
- Confirmed `cn` helper exists at /home/z/my-project/src/lib/utils.ts
- Read /home/z/my-project/dev.log — only outstanding error is in ROICalculator.tsx (handled by task 2-b), my changes compile cleanly

Enhancements delivered:

### PricingSection.tsx
- Hover lift on all three pricing cards: `hover:-translate-y-1 hover:shadow-xl transition-all duration-300`
- Studio tier now wrapped in a gradient border ring: `bg-gradient-to-b from-[#2563EB] to-[#24584F]` via an absolute `-inset-px` layer behind a borderless Card
- Studio badge ("Best for multi-brand operators") made more prominent with a `bg-gradient-to-r from-[#2563EB] to-[#24584F]` background, Sparkles icon, and shadow — keeps existing copy, no "Most Popular" wording
- Check icons in `CheckIcon` already used pine green (#24584F); preserved and confirmed across all tiers
- Subtle pulse animation on the founding-price badge via framer-motion `animate={{ scale: [1, 1.04, 1] }}` with 2.4s infinite loop (respects `useReducedMotion`)
- Added "founding licences remaining" progress bar showing `{remainingCount}/10` with gradient fill `from-[#24584F] to-[#2563EB]`, ARIA progressbar role, animated width on view. Total is configurable via `TOTAL_FOUNDING_LICENCES` constant (default 10)
- Anchor price strikethrough made more visible: `line-through decoration-[#B43C3C] decoration-2 underline-offset-2 font-medium`
- CTA buttons get hover scale + shadow: `hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200`
- "Purchasing opens soon" state extracted to a `PurchasingOpensSoonButton` component with dashed border, paper background, animated Clock icon in amber, and `cursor-not-allowed` — used for both Agency and Studio when checkout URLs are empty
- All existing functionality preserved: motion variants, reduced-motion fallback, checkout URL checks, founding label, clarifications list, mailto fallback for enterprise

### LicenceComparison.tsx
- Row hover highlighting via `hoveredRow` state — `bg-[#F4F6F7]` applied to all four cells in the row
- Column hover emphasis via `hoveredColumn` state — `bg-[#F4F6F7]` applied to entire column on hover (header gets `bg-[#1d3548]` lighter navy)
- `cellBg()` and `headerBg()` helpers combine zebra, row hover, and column hover states cleanly
- Color-coded CellValue:
  - Yes/Unlimited/Full/Full (incl. admin) → green Check (#24584F)
  - No → red X (#B43C3C)
  - Limited/conditional values (Controlled, Custom, By agreement, Internal use, Internal + client, Purchased version, 30 days, 1 year, Priority, Limited, Up to 5) → amber Minus (#B7791F)
  - Other plain values → neutral text
- Sticky header: each `<th>` has `sticky top-0 z-10 bg-[#142634]`; table is wrapped in a `max-h-[680px] overflow-auto` scroll container so the sticky header sticks when scrolling inside the table
- Subtle section dividers: stronger `border-b-2 border-[#142634]/15` after rows at indices 1, 5, 9 — visually groups features into capacity / included / rights & support / restrictions sections
- Zebra striping preserved (alternate `bg-[#F4F6F7]/60` rows), now overridable by hover
- Studio column gets a "Best for multi-brand" gradient badge above the column header (NOT "Most Popular"), with Sparkles icon
- Mobile cards get hover lift effect (`hover:-translate-y-1 hover:shadow-lg`) and the Studio card is highlighted with a pine border + "Best for multi-brand" gradient badge
- Added a colour legend below the desktop table explaining Included / Limited / Not included
- Mobile card rows now have subtle bottom borders for readability
- Responsive behaviour preserved: cards on mobile, table on md+
- All existing functionality preserved: motion variants, reduced-motion fallback, fields from commercial config, mailto fallback

### Verification
- `bun run lint` passes cleanly (no output = no errors)
- Dev server compiles both files successfully (verified in dev.log)
- All pricing data, founding config, checkout URLs, and commercial config imports preserved exactly

Files written:
- /home/z/my-project/src/components/site/PricingSection.tsx
- /home/z/my-project/src/components/site/LicenceComparison.tsx
