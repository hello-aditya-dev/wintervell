"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, MessageSquare, Palette, TrendingUp } from "lucide-react";

const OUTCOMES = [
  {
    icon: Search,
    text: "Discover work clients cannot see",
  },
  {
    icon: MessageSquare,
    text: "Explain problems in commercial language",
  },
  {
    icon: Palette,
    text: "Deliver reports under the agency's brand",
  },
  {
    icon: TrendingUp,
    text: "Convert findings into proposals and pipeline value",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function OutcomeStrip() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.3 }, variants: containerVariants };

  return (
    <section
      id="product"
      className="bg-[#142634]"
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        {...motionProps}
      >
        {/* Desktop: horizontal 4-col */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {OUTCOMES.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={outcome.text}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-[#1E3A4F]">
                  <Icon
                    className="size-6 text-[#B7DDEC]"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-white sm:text-base">
                  {outcome.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
