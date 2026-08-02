---
Task ID: 2-b
Agent: enhance-faq-roi
Task: Enhance FAQSection (search) and ROICalculator (animated counters)

Work Log:
- Read /home/z/my-project/worklog.md to understand project context (28 files, 6105+ lines, commit 84730cb)
- Read existing /home/z/my-project/src/components/site/FAQSection.tsx and ROICalculator.tsx
- Read /home/z/my-project/src/config/commercial.ts to confirm `commercial.faq` array (20 items) and pricing
- Confirmed `cn` utility exists at /home/z/my-project/src/lib/utils.ts
- Confirmed shadcn `Input`, `Button`, `Label`, `Card`, `Accordion` components all exist in src/components/ui/
- Reviewed 2-a-site-components.md worklog for design-system conventions (palette, motion patterns)

## 1. Enhanced FAQSection (src/components/site/FAQSection.tsx)
- Preserved existing section structure (`<section id="faq">`), motion variants,
  heading, accordion, and contact-note footer.
- Added a search input below the heading using shadcn `Input` with:
  - `Search` icon (lucide-react) absolutely positioned as left prefix
  - `X` clear button (lucide-react) appearing only when query is non-empty
  - Placeholder "Search questions...", border #DDE3E7, focus ring #2563EB/20
  - aria-label, type="search", ref forwarding for keyboard focus
- Filtering logic uses `useMemo` over `commercial.faq`:
  - Case-insensitive match on `item.q` OR `item.a`
  - Empty query returns all 20 questions
- Result count line (role="status", aria-live="polite"):
  - "Showing all 20 questions" (no query)
  - "Showing N of 20 questions" (with results)
  - `No results found for "{query}"` (no matches)
- Empty-state card with Search icon, message, and a Clear-search button
- Keyboard accessibility:
  - `/` focuses search input (when not already typing in another field)
  - `Escape` (while focused on input) clears the query and blurs
  - Visible `<kbd>` hint "Press / to search" on sm+ screens
  - Clear buttons have focus-visible ring #2563EB
- Existing Accordion structure preserved (single, collapsible, `value={`faq-${index}`}`)

## 2. Enhanced ROICalculator (src/components/site/ROICalculator.tsx)
- Preserved all existing inputs (6 FIELDS), calculations, motion variants,
  section id, and detailed disclaimer.
- Refactored `OutputRow` to carry a `kind` ('currency' | 'months' | 'text'),
  a numeric `target`, and a `display` string. Existing calculation results
  preserved exactly (currency values, cost-comparison text, payback months).
- Added custom hook `useAnimatedCounter(targetValue, duration = 500)`:
  - Animates from previous value to new value via `requestAnimationFrame`
  - easeOutCubic easing for smooth deceleration
  - Tracks `fromValueRef` and `latestValueRef` so interrupted transitions
    resume from the in-flight position (no jump back to the old target)
  - On mount: animates from 0 to initial targetValue (matches
    "from 0 to final when they change" requirement)
  - Reduced motion: skips rAF entirely, returns `targetValue` directly
  - Cleanup cancels any pending rAF
  - All `setDisplayValue` calls live inside the rAF `tick` callback
    (NOT synchronously in the effect body) so the lint rule
    `react-hooks/set-state-in-effect` is satisfied
- Added `formatCurrency(value)` -> `$X,XXX` (or `-$X,XXX` for negatives)
- Added `formatMonthsLabel(target)` and `formatMonthsAnimated(animated, target)`
  to handle N/A / "< 1 month" / "N months" cases (also handles Infinity & 0)
- Added `AnimatedOutput` component that:
  - Calls `useAnimatedCounter(output.target, 500)`
  - Formats the animated value based on `kind`
  - Uses `motion.div` with a `key` derived from `output.target` (or `output.display`
    for text rows) so the element remounts when the value changes
  - On remount, framer-motion animates `backgroundColor` from
    `rgba(37,99,235,0.10)` (action blue flash) to `rgba(244,246,247,1)` (paper)
    over 700ms — gives the "subtle pulse/highlight when values update" effect
    WITHOUT triggering setState-in-effect (the flash is driven by framer-motion
    mount animation, not React state)
  - `initial={false}` for reduced motion (no flash, instant snap)
  - Output value text has `aria-live="polite"` and `tabular-nums` for stable
    width during the count-up
- Added "Reset to defaults" button (shadcn Button outline + RotateCcw icon)
  in the inputs card header that restores all 6 fields to their FIELDS defaults
- Added a new "These are estimates — not guarantees of revenue or payback."
  disclaimer in a dashed-border pill directly below the output rows
- Kept the original detailed disclaimer about economic-reasoning + LICENCE_COST
  ($799) below the new short disclaimer

## Lint & runtime verification
- `bun run lint` passes cleanly (0 errors, 0 warnings) after iterating on:
  - Removed unused `eslint-disable-next-line react-hooks/exhaustive-deps`
  - Replaced `setState`-in-effect flash pattern with `motion.div` key-remount
    animation (satisfies `react-hooks/set-state-in-effect`)
  - Re-added `useEffect` to React imports (temporarily removed in a refactor)
- Dev server log shows `GET / 200` consistently after the final import fix
- Verified via curl that both `id="faq"` and `id="roi-calculator"` render on `/`
- Verified new UI strings render server-side: "Search questions...",
  "Showing all 20 questions", "Reset to defaults", "These are estimates"

Files modified:
- /home/z/my-project/src/components/site/FAQSection.tsx
- /home/z/my-project/src/components/site/ROICalculator.tsx

Note for next agent:
- The animated counter hook is local to ROICalculator.tsx. If another section
  needs the same animation behaviour, extract `useAnimatedCounter` to
  `src/lib/hooks/useAnimatedCounter.ts` (it has no ROICalculator-specific deps).
- The FAQ search keyboard shortcut (`/` to focus) is global. If a future
  command palette or second search field is added, coordinate the shortcut
  to avoid conflicts.
