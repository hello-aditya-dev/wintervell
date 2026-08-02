"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Search, MessageSquare, Palette, TrendingUp } from "lucide-react";

const OUTCOMES = [
  {
    icon: Search,
    text: "Discover work clients cannot see",
    metric: "9 audit categories",
    target: 9,
    suffix: "",
  },
  {
    icon: MessageSquare,
    text: "Explain problems in commercial language",
    metric: "Plain-language findings",
    target: 200,
    suffix: "+",
  },
  {
    icon: Palette,
    text: "Deliver reports under the agency's brand",
    metric: "White-label PDF",
    target: 3,
    suffix: " formats",
  },
  {
    icon: TrendingUp,
    text: "Convert findings into proposals and pipeline value",
    metric: "6-stage pipeline",
    target: 6,
    suffix: " stages",
  },
] as const;

/* ── Animated counter hook ── */
function useAnimatedCounter(
  target: number,
  inView: boolean,
  duration = 1200,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

/* ── Counter display sub-component ── */
function CounterDisplay({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const count = useAnimatedCounter(target, inView);
  return (
    <span className="text-2xl font-bold tabular-nums text-[#B7DDEC] sm:text-3xl">
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function OutcomeStrip() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  const motionProps = prefersReducedMotion
    ? {
        initial: false,
        animate: "visible" as const,
        variants: containerVariants,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
        variants: containerVariants,
      };

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#142634]"
    >
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #142634 0%, #0F1923 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B7DDEC 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        {...motionProps}
      >
        {/* Section heading */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            What WinterVell delivers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#8899A6] sm:text-base">
            From discovery to revenue — four outcomes that change how agencies
            sell audit work.
          </p>
        </motion.div>

        {/* Desktop: horizontal 4-col */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {OUTCOMES.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={outcome.text}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -4, transition: { duration: 0.2 } }
                }
                className="group relative flex flex-col items-center rounded-xl border-l-[3px] border-[#B7DDEC] bg-[#1A3044]/60 px-4 py-6 text-center backdrop-blur-sm transition-shadow duration-200 hover:shadow-lg sm:px-6 sm:py-8"
              >
                {/* Icon with pulse on hover */}
                <div className="flex size-14 items-center justify-center rounded-xl bg-[#1E3A4F] transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    className="size-7 text-[#B7DDEC] transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                  />
                  {/* Subtle pulse ring on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: "0 0 20px rgba(183, 221, 236, 0.15)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Animated counter */}
                <div className="mt-4">
                  <CounterDisplay
                    target={outcome.target}
                    suffix={outcome.suffix}
                    inView={isInView}
                  />
                </div>

                {/* Main text */}
                <p className="mt-2 text-sm font-medium leading-relaxed text-white sm:text-base">
                  {outcome.text}
                </p>

                {/* Supporting metric */}
                <p className="mt-1.5 text-xs leading-relaxed text-[#8899A6]">
                  {outcome.metric}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
