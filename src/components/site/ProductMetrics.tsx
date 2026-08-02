"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Layers, GitBranch, Boxes, Code2 } from "lucide-react";

/**
 * ProductMetrics
 *
 * An HONEST product metrics strip — no fake social proof, no fabricated
 * user counts, no invented testimonials. Every figure below maps directly
 * to the implemented WinterVell repository and is verifiable by reading
 * the source.
 */

type Metric = {
  icon: typeof Layers;
  number: string;
  numericValue: number;
  label: string;
  description: string;
  color: string;
  bgColor: string;
};

const METRICS: Metric[] = [
  {
    icon: Layers,
    number: "9",
    numericValue: 9,
    label: "Audit categories",
    description:
      "Technical, SEO, Performance, Mobile, Accessibility, Conversion, Trust, Content, AI-readiness",
    color: "#2563EB",
    bgColor: "#2563EB",
  },
  {
    icon: GitBranch,
    number: "11",
    numericValue: 11,
    label: "Stage pipeline",
    description: "From new prospect to won/lost, with full history",
    color: "#24584F",
    bgColor: "#24584F",
  },
  {
    icon: Boxes,
    number: "6",
    numericValue: 6,
    label: "Core modules",
    description:
      "Audit engine, reports, proposals, pipeline, white-label, licensing",
    color: "#B7791F",
    bgColor: "#B7791F",
  },
  {
    icon: Code2,
    number: "Full",
    numericValue: 0,
    label: "Source code",
    description: "TypeScript, Prisma schema, deployment docs included",
    color: "#142634",
    bgColor: "#142634",
  },
];

/* ── Animated counter hook ── */
function useAnimatedCounter(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProductMetrics() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  const motionProps = prefersReducedMotion
    ? {
        initial: false as const,
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
      id="metrics"
      ref={sectionRef}
      aria-label="What you actually get"
      className="relative overflow-hidden border-t border-[#DDE3E7] bg-white"
    >
      {/* Subtle top gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(180deg, #F4F6F7 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        {...motionProps}
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-3 py-1"
          >
            <Layers className="size-3.5 text-[#2563EB]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#2563EB]">Verifiable facts</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold tracking-tight text-[#111820] sm:text-3xl lg:text-4xl"
          >
            What you actually get
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm leading-relaxed text-[#3F4A55] sm:text-base"
          >
            Concrete, verifiable facts about the repository — not invented
            metrics or borrowed credibility.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.article
                key={metric.label}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                }
                className="group relative flex flex-col rounded-xl border border-[#DDE3E7] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Top accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-xl transition-opacity duration-300"
                  style={{ backgroundColor: metric.color, opacity: 0.6 }}
                  aria-hidden="true"
                />

                {/* Hover glow effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 30px ${metric.color}15, 0 0 60px ${metric.color}08`,
                  }}
                  aria-hidden="true"
                />

                <div
                  className="flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${metric.color}12`,
                  }}
                >
                  <Icon
                    className="size-5"
                    style={{ color: metric.color }}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5">
                  {metric.numericValue > 0 ? (
                    <AnimatedNumber
                      target={metric.numericValue}
                      inView={isInView}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ) : (
                    <span className="block text-3xl font-semibold tracking-tight text-[#142634] sm:text-4xl">
                      {metric.number}
                    </span>
                  )}
                  <h3 className="mt-1 text-sm font-semibold text-[#111820] sm:text-base">
                    {metric.label}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#3F4A55]">
                  {metric.description}
                </p>

                {/* Bottom decorative line */}
                <div className="mt-auto pt-4">
                  <div
                    className="h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: `${metric.color}30` }}
                    aria-hidden="true"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-center text-xs text-[#56616C]"
        >
          All figures reflect the implemented repository structure.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ── Animated number sub-component ── */
function AnimatedNumber({
  target,
  inView,
  prefersReducedMotion,
}: {
  target: number;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const count = useAnimatedCounter(target, inView);

  if (prefersReducedMotion) {
    return (
      <span className="block text-3xl font-semibold tracking-tight text-[#142634] sm:text-4xl">
        {target}
      </span>
    );
  }

  return (
    <span className="block text-3xl font-semibold tracking-tight tabular-nums text-[#142634] sm:text-4xl">
      {count}
    </span>
  );
}
