"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Loader2,
  FileSearch,
  FileBarChart,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WORKFLOW_STEPS = [
  { icon: Globe, label: "URL entered" },
  { icon: Loader2, label: "Audit running" },
  { icon: FileSearch, label: "Evidence collected" },
  { icon: FileBarChart, label: "Report generated" },
  { icon: FileText, label: "Proposal created" },
  { icon: TrendingUp, label: "Opportunity added to pipeline" },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.2 }, variants: containerVariants };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F6F7] to-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {/* Text content */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          {...motionProps}
        >
          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-[#111820] sm:text-5xl lg:text-6xl"
          >
            Turn any website into a sales-ready audit.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-relaxed text-[#56616C] sm:text-xl"
          >
            WinterVell gives agencies a white-label audit engine, report builder,
            proposal generator and prospect pipeline they can deploy under their
            own brand.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-base font-semibold text-[#111820]"
          >
            Own the code. Use your domain. Keep the client revenue.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm"
              asChild
            >
              <a href="#demo">
                Explore the live demo
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-semibold border-[#DDE3E7] text-[#142634] hover:bg-[#F4F6F7] hover:text-[#111820]"
              asChild
            >
              <a href="#pricing">Buy the source licence</a>
            </Button>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-4">
            <a
              href="#demo"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded-sm"
            >
              View a sample client report
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-sm text-[#56616C]"
          >
            Full source code &middot; Self-hosted &middot; White-label ready &middot; Commercial agency use
          </motion.p>
        </motion.div>

        {/* Workflow visual */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {/* Desktop: horizontal layout */}
          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between">
              {/* Connecting line */}
              <div className="absolute left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] top-[38px] h-px bg-[#DDE3E7]" aria-hidden="true" />

              {WORKFLOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    variants={stepVariants}
                    className="relative z-10 flex flex-col items-center"
                    style={{ width: `${100 / 6}%` }}
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg border border-[#DDE3E7] bg-white shadow-sm">
                      <Icon
                        className="size-5 text-[#2563EB]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-center text-xs font-medium text-[#111820] leading-snug max-w-[120px]">
                      {step.label}
                    </p>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <ArrowRight
                        className="absolute -right-3 top-[30px] size-3.5 text-[#B7DDEC]"
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet: 2-column grid */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {WORKFLOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    variants={stepVariants}
                    className="flex items-start gap-3 rounded-lg border border-[#DDE3E7] bg-white p-4 shadow-sm"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#EFF8FC]">
                      <Icon
                        className="size-4 text-[#2563EB]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#56616C]">
                        Step {i + 1}
                      </span>
                      <span className="text-sm font-medium text-[#111820] leading-snug">
                        {step.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
