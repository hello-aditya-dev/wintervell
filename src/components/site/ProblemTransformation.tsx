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
  ArrowDown,
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

const arrowVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  },
};

const dividerVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
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
          <motion.p
            variants={headingVariants}
            className="mt-4 text-lg font-medium text-[#3F4A55]"
          >
            The transformation
          </motion.p>
          <p className="mt-1 text-sm text-[#56616C]">
            From 7 manual steps to 6 automated ones — and every step produces
            commercial value.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="relative mt-14 grid gap-8 lg:grid-cols-2 lg:gap-0 sm:mt-20">
          {/* Vertical divider line — desktop only */}
          <motion.div
            variants={dividerVariants}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
            aria-hidden="true"
            style={{ transformOrigin: "top" }}
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#B7DDEC] to-transparent" />
          </motion.div>

          {/* Before column */}
          <motion.div
            variants={containerVariants}
            className="relative rounded-xl border border-[#DDE3E7] bg-white p-6 sm:p-8 lg:rounded-r-none lg:border-r-0"
          >
            {/* Desaturated overlay for visual tone */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl bg-[#F4F6F7]/30 lg:rounded-r-none"
              aria-hidden="true"
            />

            <div className="relative mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-[#E8EAED] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#8899A6]">
                Before
              </span>
              <span className="text-sm text-[#8899A6]">
                Manual workflow
              </span>
            </div>

            <ol className="relative space-y-3" role="list">
              {BEFORE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.label}
                    variants={stepVariants}
                    className="group relative flex items-start gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#F4F6F7]/80"
                  >
                    {/* Numbered badge with strikethrough */}
                    <span className="relative flex size-8 shrink-0 items-center justify-center rounded-md bg-[#E8EAED] text-xs font-semibold text-[#8899A6]">
                      {i + 1}
                      {/* Strikethrough line on the number */}
                      <span
                        className="absolute left-1 right-1 top-1/2 h-px -translate-y-1/2 bg-[#8899A6]/50"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="flex items-center gap-2.5 pt-1">
                      <Icon
                        className="size-4 shrink-0 text-[#B0B8C1] transition-colors duration-200 group-hover:text-[#8899A6]"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-[#8899A6] transition-colors duration-200 group-hover:text-[#56616C]">
                        {step.label}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>

          {/* Animated transition indicator — desktop */}
          <motion.div
            variants={arrowVariants}
            className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
            aria-hidden="true"
          >
            <div className="relative flex size-16 items-center justify-center">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 24px rgba(183, 221, 236, 0.4), 0 0 48px rgba(37, 99, 235, 0.15)",
                }}
              />
              {/* White circle */}
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#B7DDEC] bg-white shadow-md">
                <ArrowRight className="size-6 text-[#2563EB]" />
              </div>
              {/* Pulsing outer ring */}
              <div className="absolute inset-0 animate-ping rounded-full border border-[#B7DDEC]/30" />
            </div>
          </motion.div>

          {/* Mobile transition indicator */}
          <motion.div
            variants={arrowVariants}
            className="flex items-center justify-center lg:hidden"
            aria-hidden="true"
          >
            <div className="relative flex size-12 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 16px rgba(183, 221, 236, 0.3), 0 0 32px rgba(37, 99, 235, 0.1)",
                }}
              />
              <div className="flex size-12 items-center justify-center rounded-full border-2 border-[#B7DDEC] bg-white shadow-md">
                <ArrowDown className="size-5 text-[#2563EB]" />
              </div>
            </div>
          </motion.div>

          {/* After column */}
          <motion.div
            variants={containerVariants}
            className="relative overflow-hidden rounded-xl border border-[#B7DDEC] bg-white p-6 shadow-sm sm:p-8 lg:rounded-l-none lg:border-l-0"
          >
            {/* Subtle glacier accent gradient */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl lg:rounded-l-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(183, 221, 236, 0.06) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />

            <div className="relative mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-[#EFF8FC] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                After
              </span>
              <span className="text-sm font-medium text-[#111820]">
                WinterVell workflow
              </span>
            </div>

            <ol className="relative space-y-3" role="list">
              {AFTER_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.label}
                    variants={stepVariants}
                    className="group relative flex items-start gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#EFF8FC]/70"
                  >
                    {/* Numbered badge with glow */}
                    <span className="relative flex size-8 shrink-0 items-center justify-center rounded-md bg-[#EFF8FC] text-xs font-semibold text-[#2563EB] transition-all duration-200 group-hover:bg-[#2563EB] group-hover:text-white">
                      {i + 1}
                      {/* Subtle glow on hover */}
                      <span
                        className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          boxShadow:
                            "0 0 12px rgba(37, 99, 235, 0.3)",
                        }}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="flex items-center gap-2.5 pt-1">
                      <Icon
                        className="size-4 shrink-0 text-[#2563EB] transition-transform duration-200 group-hover:scale-110"
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

            {/* Bottom accent line */}
            <div
              className="mt-6 h-1 w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #2563EB, #B7DDEC)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
