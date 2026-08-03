"use client";

import { MotionConfig } from "framer-motion";

/**
 * Provides global framer-motion configuration.
 * `reducedMotion="user"` ensures all framer-motion animations
 * respect the user's `prefers-reduced-motion` OS setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
