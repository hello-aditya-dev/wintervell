"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ScrollProgress
 *
 * A thin progress bar pinned directly below the sticky header (h-16 = 64px),
 * showing how far the visitor has scrolled down the page.
 *
 * - Width is driven by framer-motion's useScroll + useSpring for smooth easing.
 * - pointer-events-none ensures it never intercepts clicks meant for the header.
 * - z-40 keeps it above page content but below the header (z-50).
 * - When the visitor prefers reduced motion, we render a static,
 *   non-animated bar so the affordance is still visible without motion.
 */
export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Reduced-motion fallback: a thin static rule that still signals position
  // without any animated transform.
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        data-scroll-progress
        className="no-print pointer-events-none fixed left-0 right-0 top-16 z-40 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#142634] opacity-40"
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      data-scroll-progress
      style={{ scaleX }}
      className="no-print pointer-events-none fixed left-0 right-0 top-16 z-40 h-[3px] origin-left bg-gradient-to-r from-[#2563EB] to-[#142634]"
    />
  );
}
