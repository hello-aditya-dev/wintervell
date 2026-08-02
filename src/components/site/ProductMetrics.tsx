"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers, GitBranch, Boxes, Code2 } from "lucide-react";

/**
 * ProductMetrics
 *
 * An HONEST product metrics strip — no fake social proof, no fabricated
 * user counts, no invented testimonials. Every figure below maps directly
 * to the implemented WinterVell repository and is verifiable by reading
 * the source.
 *
 * Positioned between HeroSection and OutcomeStrip so visitors see concrete,
 * falsifiable facts immediately after the hero.
 */

type Metric = {
  icon: typeof Layers;
  number: string;
  label: string;
  description: string;
};

const METRICS: Metric[] = [
  {
    icon: Layers,
    number: "9",
    label: "Audit categories",
    description:
      "Technical, SEO, Performance, Mobile, Accessibility, Conversion, Trust, Content, AI-readiness",
  },
  {
    icon: GitBranch,
    number: "11",
    label: "Stage pipeline",
    description: "From new prospect to won/lost, with full history",
  },
  {
    icon: Boxes,
    number: "6",
    label: "Core modules",
    description:
      "Audit engine, reports, proposals, pipeline, white-label, licensing",
  },
  {
    icon: Code2,
    number: "Full",
    label: "Source code",
    description: "TypeScript, Prisma schema, deployment docs included",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ProductMetrics() {
  const prefersReducedMotion = useReducedMotion();

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
      aria-label="What you actually get"
      className="border-t border-[#DDE3E7] bg-white"
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        {...motionProps}
      >
        <div className="mx-auto max-w-2xl text-center">
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
                className="flex flex-col rounded-xl border border-[#DDE3E7] bg-[#FFFFFF] p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#F4F6F7]">
                  <Icon
                    className="size-5 text-[#2563EB]"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5">
                  <span className="block text-3xl font-semibold tracking-tight text-[#142634] sm:text-4xl">
                    {metric.number}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[#111820] sm:text-base">
                    {metric.label}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#3F4A55]">
                  {metric.description}
                </p>
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
