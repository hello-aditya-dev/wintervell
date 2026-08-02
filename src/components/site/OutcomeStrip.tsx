"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Search, MessageSquare, Palette, TrendingUp, ArrowRight } from "lucide-react";

const OUTCOMES = [
  {
    icon: Search,
    text: "Discover work clients cannot see",
    metric: "9 audit categories",
    detail: "Technical, SEO, Performance, Mobile, Accessibility, Conversion, Trust, Content, AI-readiness",
    target: 9,
    suffix: "",
    accentColor: "#2563EB",
  },
  {
    icon: MessageSquare,
    text: "Explain problems in commercial language",
    metric: "Plain-language findings",
    detail: "Every finding includes evidence, impact, and a plain-language explanation for non-technical stakeholders",
    target: 200,
    suffix: "+",
    accentColor: "#B7DDEC",
  },
  {
    icon: Palette,
    text: "Deliver reports under the agency's brand",
    metric: "White-label PDF",
    detail: "Custom logo, colours, domain, and sender — client-facing branding is fully configurable",
    target: 3,
    suffix: " formats",
    accentColor: "#24584F",
  },
  {
    icon: TrendingUp,
    text: "Convert findings into proposals and pipeline value",
    metric: "6-stage pipeline",
    detail: "From prospect to won — with audit-to-proposal transformation and pipeline tracking",
    target: 6,
    suffix: " stages",
    accentColor: "#B7791F",
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
  prefersReducedMotion,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const count = useAnimatedCounter(target, inView);

  if (prefersReducedMotion) {
    return (
      <span className="text-2xl font-bold tabular-nums text-[#B7DDEC] sm:text-3xl">
        {target}{suffix}
      </span>
    );
  }

  return (
    <span className="text-2xl font-bold tabular-nums text-[#B7DDEC] sm:text-3xl">
      {count}{suffix}
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
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
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

      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-20 top-1/4 size-60 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #B7DDEC, transparent 70%)" }}
        />
        <div
          className="absolute -right-20 bottom-1/4 size-80 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        {...motionProps}
      >
        {/* Section heading */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B7DDEC]/20 bg-[#B7DDEC]/10 px-3 py-1">
            <TrendingUp className="size-3.5 text-[#B7DDEC]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#B7DDEC]">Core outcomes</span>
          </div>
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
          {OUTCOMES.map((outcome, index) => {
            const Icon = outcome.icon;
            const accentColor = outcome.accentColor;
            return (
              <motion.div
                key={outcome.text}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                }
                className="group relative flex flex-col items-center rounded-xl border border-[#1E3A4F] bg-[#1A3044]/60 px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#B7DDEC]/30 hover:shadow-lg sm:px-6 sm:py-8"
              >
                {/* Top accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl transition-opacity duration-300"
                  style={{ backgroundColor: accentColor, opacity: 0.5 }}
                  aria-hidden="true"
                />

                {/* Hover glow effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 30px ${accentColor}15, 0 0 60px ${accentColor}08`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon with pulse on hover */}
                <div
                  className="relative flex size-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <Icon
                    className="size-7 transition-transform duration-300 group-hover:scale-105"
                    style={{ color: accentColor }}
                    aria-hidden="true"
                  />
                  {/* Subtle pulse ring on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `0 0 20px ${accentColor}25`,
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
                    prefersReducedMotion={prefersReducedMotion}
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

                {/* Detail text on hover */}
                <div className="mt-3 h-0 overflow-hidden transition-all duration-300 group-hover:h-auto group-hover:opacity-100 opacity-0">
                  <p className="text-[11px] leading-relaxed text-[#8899A6]">
                    {outcome.detail}
                  </p>
                </div>

                {/* Connector arrow to next card (visible on desktop) */}
                {index < OUTCOMES.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden lg:block" aria-hidden="true">
                    <ArrowRight className="size-4 text-[#B7DDEC]/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA line */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-3 sm:mt-16"
        >
          <div className="flex items-center gap-2 text-sm text-[#B7DDEC]/60">
            <div className="h-px w-8 bg-[#B7DDEC]/20" aria-hidden="true" />
            <span>Each outcome is verifiable in the source code</span>
            <div className="h-px w-8 bg-[#B7DDEC]/20" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
