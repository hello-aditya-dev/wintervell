"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop
 *
 * A floating circular button that appears once the visitor has scrolled
 * past 600px and smoothly returns them to the top of the page on click.
 *
 * - Fixed bottom-right (bottom-6 right-6), z-50 so it stays above content.
 * - Navy (#142634) surface with a white ArrowUp icon.
 * - Framer Motion scale + opacity entrance/exit, gated on viewport scroll.
 * - Honors prefers-reduced-motion: no spring, just a gentle fade.
 * - Accessible label and keyboard focusable (native button).
 */
const SCROLL_THRESHOLD = 600;

export default function BackToTop() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Set initial state in case the page is reloaded mid-scroll.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const entrance = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.6 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.6 },
        transition: { duration: 0.25, ease: "easeOut" },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={handleClick}
          aria-label="Scroll back to top"
          {...entrance}
          className="fixed bottom-6 right-6 z-50 inline-flex size-12 items-center justify-center rounded-full bg-[#142634] text-white shadow-lg shadow-[#142634]/20 transition-colors hover:bg-[#1E3A4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F7]"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
