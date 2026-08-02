---
Task ID: 2-a
Agent: site-components-builder
Task: Create three new client components for the WinterVell commercial website

Work Log:
- Read /home/z/my-project/worklog.md to understand project context (28 files, 6105+ lines, 19 sections, commit 84730cb)
- Inspected existing component patterns (Header, OutcomeStrip, HeroSection) to match design system:
  - Header is sticky top-0 z-50 h-16 (64px tall)
  - OutcomeStrip uses motion + useReducedMotion with conditional motionProps pattern
  - Palette: Paper #F4F6F7, Surface #FFFFFF, Ink #111820, Secondary ink #3F4A55,
    Navy #142634, Glacier #B7DDEC, Action #2563EB, Pine #24584F, Border #DDE3E7
- Confirmed framer-motion ^12.23.2 and lucide-react ^0.525.0 are installed
- Created three "use client" components:

1. src/components/site/ScrollProgress.tsx
   - Thin 3px progress bar fixed at top-16 (directly below the 64px sticky header)
   - Gradient background from #2563EB to #142634
   - Uses framer-motion useScroll + useSpring (stiffness 120, damping 30) for smooth scaleX animation, origin-left
   - pointer-events-none so it never intercepts header clicks
   - z-40 (above content, below header's z-50)
   - Reduced-motion fallback: renders a static, low-opacity 2px gradient rule (no animation)

2. src/components/site/BackToTop.tsx
   - Floating circular button (size-12), fixed bottom-6 right-6, z-50
   - Navy #142634 background with white ArrowUp icon (lucide-react)
   - Appears after window.scrollY > 600px (passive scroll/resize listeners, cleaned up on unmount)
   - Sets initial state on mount so it works on mid-scroll reloads
   - Framer Motion AnimatePresence entrance/exit (opacity + scale 0.6 -> 1)
   - Smooth window.scrollTo on click; reduced-motion uses instant scrollTo(0,0)
   - aria-label="Scroll back to top", native button for keyboard focus
   - Focus-visible ring in #2563EB

3. src/components/site/ProductMetrics.tsx
   - HONEST metrics strip — no fake social proof, no fabricated user counts
   - Section id="metrics", aria-label="What you actually get"
   - White background with subtle top border (border-t border-[#DDE3E7])
   - Heading "What you actually get" + supporting copy + 4-card grid
   - 4 metrics, each with icon (Layers / GitBranch / Boxes / Code2), large number,
     label, short description:
       9 audit categories (full 9-name list)
       11-stage pipeline (prospect -> won/lost, full history)
       6 core modules (audit engine, reports, proposals, pipeline, white-label, licensing)
       Full source code (TypeScript, Prisma schema, deployment docs)
   - Cards: rounded-xl border #DDE3E7, hover:-translate-y-1 hover:shadow-md transition-all
   - Staggered motion variants; reduced-motion falls back to no animation
   - Closing note: "All figures reflect the implemented repository structure."

Verification:
- bun run lint passes cleanly (no warnings, no errors)
- All three components are "use client" as required
- Imports use lucide-react and framer-motion only (motion, useScroll, useSpring, useReducedMotion, AnimatePresence)
- Design tokens match the WinterVell palette via Tailwind hex classes

Files created:
- /home/z/my-project/src/components/site/ScrollProgress.tsx
- /home/z/my-project/src/components/site/BackToTop.tsx
- /home/z/my-project/src/components/site/ProductMetrics.tsx

Note for next agent:
- ProductMetrics is intended to sit between HeroSection and OutcomeStrip in page.tsx
  (not yet wired into the page — left to a follow-up task to avoid conflicts).
- ScrollProgress and BackToTop are global affordances that should be mounted once
  near the root layout (e.g. inside the page wrapper or layout body).
