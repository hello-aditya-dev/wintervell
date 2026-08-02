"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * CookieConsent
 *
 * A dismissible banner fixed to the bottom of the viewport that appears
 * after a short delay on the visitor's first session.
 *
 * - Stores the visitor's choice in localStorage under
 *   `wintervell-cookie-consent` (values: "all" | "essential").
 * - Slides in from the bottom using framer-motion (respects
 *   prefers-reduced-motion — falls back to a simple fade).
 * - White card with a navy border-top accent and Action Blue primary button.
 * - Positioned `fixed bottom-4 left-4 right-4 z-40` so it sits below the
 *   sticky header (z-50) and above page content, without covering the
 *   footer's content (it floats over the viewport edge, not stuck to it).
 * - Responsive: stacks vertically on mobile, row layout on sm+ screens.
 */

const STORAGE_KEY = "wintervell-cookie-consent";
const APPEARANCE_DELAY_MS = 1500;

type ConsentChoice = "all" | "essential";

export default function CookieConsent() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show the banner if no choice has been recorded yet.
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage may be unavailable (private mode, etc.) — fail silently
      // and still show the banner so the visitor can make a choice.
      stored = null;
    }

    if (stored === "all" || stored === "essential") {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, APPEARANCE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const persist = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore persistence failures — the banner simply won't be remembered.
    }
    setVisible(false);
  };

  // `visible` starts false on both server and client (the timer only fires
  // client-side), so the first render produces an empty AnimatePresence and
  // there is no hydration mismatch. AnimatePresence stays mounted so the
  // exit animation can play when the visitor makes their choice.
  const entrance = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 24 },
        transition: { duration: 0.35, ease: "easeOut" },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          {...entrance}
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl"
        >
          <div className="overflow-hidden rounded-xl border border-[#E2E8EC] border-t-4 border-t-[#142634] bg-white shadow-xl shadow-[#142634]/10">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
              {/* Icon + text */}
              <div className="flex flex-1 items-start gap-3">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F6F7] text-[#142634]"
                  aria-hidden="true"
                >
                  <Cookie className="size-5" />
                </div>
                <div className="flex-1">
                  <h2
                    id="cookie-consent-title"
                    className="text-sm font-semibold text-[#111820]"
                  >
                    Cookie notice
                  </h2>
                  <p
                    id="cookie-consent-body"
                    className="mt-1 text-sm leading-relaxed text-[#3F4A55]"
                  >
                    WinterVell uses essential cookies for site functionality and
                    optional analytics to improve the product. No client or audit
                    data is ever shared.{" "}
                    <span className="text-[#2563EB] underline-offset-2 hover:underline">
                      Read more
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => persist("essential")}
                  className="h-9 border-[#142634]/20 bg-white text-[#142634] hover:bg-[#F4F6F7] hover:text-[#142634] focus-visible:ring-[#2563EB]"
                >
                  Essential only
                </Button>
                <Button
                  type="button"
                  onClick={() => persist("all")}
                  className="h-9 bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]"
                >
                  Accept all
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
