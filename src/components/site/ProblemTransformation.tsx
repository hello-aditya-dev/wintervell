"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  ClipboardCopy,
  MessageCircle,
  Palette,
  ShoppingCart,
  PenTool,
  ClipboardList,
  Globe,
  ShieldCheck,
  FileBarChart,
  RefreshCcw,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const BEFORE_STEPS = [
  { icon: Eye, label: "Manually inspect website" },
  { icon: ClipboardCopy, label: "Copy issues into a document" },
  { icon: MessageCircle, label: "Explain technical findings" },
  { icon: Palette, label: "Design report" },
  { icon: ShoppingCart, label: "Decide what to sell" },
  { icon: PenTool, label: "Write proposal" },
  { icon: ClipboardList, label: "Track follow-up separately" },
] as const;

const AFTER_STEPS = [
  { icon: Globe, label: "Enter URL" },
  { icon: ShieldCheck, label: "Verify evidence" },
  { icon: FileBarChart, label: "Publish branded report" },
  { icon: RefreshCcw, label: "Convert findings into services" },
  { icon: FileText, label: "Generate proposal" },
  { icon: TrendingUp, label: "Track opportunity" },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProblemTransformation() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.15 }, variants: containerVariants };

  return (
    <section
      id="how-it-works"
      className="bg-[#F4F6F7]"
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div
          variants={headingVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Most audit tools stop at a list of problems. WinterVell continues to
            the sale.
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12 sm:mt-20">
          {/* Before column */}
          <motion.div
            variants={containerVariants}
            className="rounded-xl border border-[#DDE3E7] bg-white p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-[#E8EAED] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#56616C]">
                Before
              </span>
              <span className="text-sm text-[#56616C]">
                Manual workflow
              </span>
            </div>

            <ol className="space-y-4" role="list">
              {BEFORE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.label}
                    variants={stepVariants}
                    className="flex items-start gap-3"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#F4F6F7] text-xs font-semibold text-[#56616C]">
                      {i + 1}
                    </span>
                    <div className="flex items-center gap-2.5 pt-1">
                      <Icon
                        className="size-4 shrink-0 text-[#8899A6]"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-[#56616C]">
                        {step.label}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>

          {/* Transition arrow — visible between columns on desktop */}
          <div className="hidden lg:flex absolute-pointer" aria-hidden="true" />

          {/* After column */}
          <motion.div
            variants={containerVariants}
            className="relative rounded-xl border border-[#B7DDEC] bg-white p-6 shadow-sm sm:p-8"
          >
            {/* Transition badge centered between columns on desktop */}
            <div className="absolute -left-7 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#B7DDEC] bg-white shadow-sm">
                <ArrowRight className="size-5 text-[#2563EB]" aria-hidden="true" />
              </div>
            </div>

            {/* Mobile transition indicator */}
            <div className="mb-4 flex items-center justify-center lg:hidden" aria-hidden="true">
              <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#B7DDEC] bg-white shadow-sm">
                <ArrowRight className="size-4 text-[#2563EB] rotate-90" />
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-[#EFF8FC] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                After
              </span>
              <span className="text-sm font-medium text-[#111820]">
                WinterVell workflow
              </span>
            </div>

            <ol className="space-y-4" role="list">
              {AFTER_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.label}
                    variants={stepVariants}
                    className="flex items-start gap-3"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#EFF8FC] text-xs font-semibold text-[#2563EB]">
                      {i + 1}
                    </span>
                    <div className="flex items-center gap-2.5 pt-1">
                      <Icon
                        className="size-4 shrink-0 text-[#2563EB]"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-[#111820]">
                        {step.label}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
