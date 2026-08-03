---
Task ID: 2-d
Agent: Enhance Agent (ProductProof + ReportExperience)
Task: Enhance two existing commercial-site components with richer styling and interactivity

Scope:
- /home/z/my-project/src/components/site/ProductProof.tsx
- /home/z/my-project/src/components/site/ReportExperience.tsx

Pre-work:
- Read /home/z/my-project/worklog.md (Task 1 context — 23 sections shipped, commit 84730cb).
- Read both target files in full before rewriting to preserve all existing data and content.
- Confirmed `framer-motion` (v12) ships `useInView`, `useReducedMotion`, `AnimatePresence`, `motion`.
- Confirmed shadcn `Tooltip`, `Button`, `Card`, `Badge` components exist in src/components/ui.

ProductProof.tsx enhancements (all existing demo data preserved verbatim):
- Added a "Step X of 6" progress indicator with the active step label and an animated
  progress bar that fills to ((idx+1)/6)*100%.
- Added left/right circular navigation arrow buttons (ChevronLeft / ChevronRight) that
  cycle with wrap-around.
- Added keyboard navigation: ArrowLeft / ArrowRight move between steps, Space toggles
  play/pause. Bound only while hovering the demo (avoids hijacking page scrolling).
- Added auto-advance: every 5s (AUTO_ADVANCE_MS = 5000) the next step is shown.
  Auto-advance pauses on hover, when the section is out of view (useInView gate),
  and when the user prefers reduced motion.
- Added a Play/Pause toggle button (Play / Pause icons) with a pulsing green dot
  indicator while playing. aria-pressed reflects state.
- Added a subtle "playing" progress bar that fills linearly over 5s to signal the
  next auto-advance (hidden when paused / hovered / reduced motion / out of view).
- Made the "Demonstration data — fictional" badge more prominent: pill-shaped,
  amber-tinted background, Info icon, secondary descriptor text.
- Improved visual hierarchy of each step panel: CardHeader gets a top divider strip
  with subtle bg tint and an icon chip; CardContent uses consistent p-6 padding.
- Added direction-aware slide + fade transitions between steps via AnimatePresence
  (mode="wait") and custom variants keyed off `direction` state. Reduced motion
  falls back to a simple fade.
- Kept the existing Tabs/TabsList/TabsTrigger step row (controlled by activeStep)
  so clicking a tab still jumps directly to that step. TabsContent blocks were
  replaced by a single AnimatePresence-wrapped renderStep(stepId) switch that
  returns the original card markup unchanged.
- Added a small keyboard-hint footer with styled <kbd> chips.

ReportExperience.tsx enhancements (all existing report data + branding preserved):
- Added a "Download PDF" outline button with Tooltip "PDF export available in the
  full product".
- Added a "Share report" outline button with Tooltip "Secure share link available
  in the full product".
- Added a "Copy link" button that simulates a copy and shows "Copied!" feedback
  (Check icon, green accent) for 2 seconds via state. Tooltip updates to
  "Copied to clipboard" while in the copied state.
- Added a "Print" button that calls window.print() with a tooltip.
- Made the category score breakdown interactive: each category row is now a button.
  Hover, focus, or click toggles a custom tooltip popover (AnimatePresence) that
  shows the score /100 and a `detail` string describing what the category measures.
  Added an `Info` icon hint next to each score and a "Click a score for details"
  helper line. Added a `detail` field to each CATEGORY_SCORES entry (additive —
  original scores/colors unchanged).
- Added hover effects on priority-issue cards: motion.div with whileHover
  (y: -2, borderColor: severity color) plus shadow-md on hover. Cards now render
  in a 2-column grid on sm+ screens.
- Added a diagonal "SAMPLE" watermark overlay across the report card
  (rotate -24deg, ~120–160px font, #B43C3C at 6% opacity, pointer-events-none,
  hidden in print).
- Added `print-friendly` class to the report Card plus Tailwind `print:` variants
  (print:shadow-none, print:border-[#111820], print:bg-white, print:p-0,
  print:break-inside-avoid on each section, print:hidden on the CTA + watermark
  + action buttons).
- Added an animated score counter: a reusable `AnimatedNumber` component counts
  up from 0 to the target value with an ease-out cubic curve when scrolled into
  view (useInView, once). Applied to the executive summary (47/100, 340+),
  the total investment ($19,700), and a new `OverallScore` component that
  animates both the count-up number and the SVG ring strokeDashoffset.
- Reduced-motion path derives the final value directly (no setState-in-effect)
  so the numbers and ring still render correctly without animation.
- Kept the existing "Demonstration data — fictional" badge and all original
  report sections (executive summary, score overview, priority issues, quick
  wins, implementation phases, recommended services, CTA).
- Added a helper note below the card clarifying that exported reports in the
  full product are unwatermarked and fully branded.

Lint / build verification:
- `bun run lint` → clean (0 errors, 0 warnings) after fixing two issues:
  1. Removed two unused `eslint-disable-next-line react-hooks/exhaustive-deps`
     directives in ProductProof (deps were already complete).
  2. Refactored AnimatedNumber / OverallScore in ReportExperience to derive
     the display value for the reduced-motion / not-in-view cases instead of
     calling setState synchronously inside the effect body (which tripped the
     `react-hooks/set-state-in-effect` rule). setState now only happens inside
     the rAF callback (async), satisfying the rule.
- Dev server hot-reloads both files cleanly (recent `✓ Compiled` entries with
  no errors attributable to these components; GET / returns 200).

Pre-existing note (NOT introduced by this task):
- ROICalculator.tsx has a runtime `useEffect is not defined` error from a prior
  task (missing React import in useAnimatedCounter). Out of scope for 2-d; the
  page still serves 200 and the other sections render. Flagging for a follow-up.

Files touched:
- src/components/site/ProductProof.tsx (rewritten)
- src/components/site/ReportExperience.tsx (rewritten)
