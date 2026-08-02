# Task 3-a: Header & Footer Components

## Summary
Created the WinterVell commercial website Header and Footer components per the design system spec.

## Files Created
- `/home/z/my-project/src/components/site/Header.tsx` — Sticky header with nav, CTA buttons, mobile Sheet menu
- `/home/z/my-project/src/components/site/Footer.tsx` — Full footer with 4-column links, branding, copyright, licence notice

## Files Modified
- `/home/z/my-project/src/app/page.tsx` — Updated to use Header + Footer with min-h-screen flex layout

## Design Decisions
- **Header**: `h-16` sticky, `bg-white/95 backdrop-blur`, border-b `#DDE3E7`. Uses `useState` for mobile Sheet open/close. Desktop nav hidden below `lg:` breakpoint. Snowflake icon from lucide-react in Action Blue (`#2563EB`). "Buy licence" button uses Action Blue bg. "Explore demo" uses outline variant.
- **Footer**: Navy bg (`#142634`) with glacier blue (`#B7DDEC`) snowflake and white wordmark. 4-column grid on desktop, stacks on mobile. Bottom bar has copyright and WV-CSL v1.0 licence notice. `mt-auto` ensures footer sticks to bottom when content is short.
- **Page layout**: `min-h-screen flex flex-col` wrapper ensures proper sticky footer behavior.
- **Accessibility**: All nav links have focus-visible ring styles, aria-labels on interactive elements, semantic HTML (header, footer, nav, main).
- **Color system**: All WinterVell design tokens from globals.css used via hex values in Tailwind classes.

## Lint & Build
- `bun run lint` — passed with no errors
- Dev server compiles successfully, GET / 200
