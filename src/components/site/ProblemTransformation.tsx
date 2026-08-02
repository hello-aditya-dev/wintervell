"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
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
  Zap,
} from "lucide-react";

const BEFORE_STEPS = [
  { icon: Eye, label: "Manually inspect website", detail: "Hours of manual review" },
  { icon: ClipboardCopy, label: "Copy issues into a document", detail: "Copy-paste drudgery" },
  { icon: MessageCircle, label: "Explain technical findings", detail: "Translate for clients" },
  { icon: Palette, label: "Design report", detail: "Format from scratch" },
  { icon: ShoppingCart, label: "Decide what to sell", detail: "No commercial link" },
  { icon: PenTool, label: "Write proposal", detail: "Start from zero" },
  { icon: ClipboardList, label: "Track follow-up separately", detail: "Disconnected pipeline" },
] as const;

const AFTER_STEPS = [
  { icon: Globe, label: "Enter URL", detail: "One input field" },
  { icon: ShieldCheck, label: "Verify evidence", detail: "Auto-documented proof" },
  { icon: FileBarChart, label: "Publish branded report", detail: "Your brand, your domain" },
  { icon: RefreshCcw, label: "Convert findings into services", detail: "Built-in commercial logic" },
  { icon: FileText, label: "Generate proposal", detail: "From findings to scope" },
  { icon: TrendingUp, label: "Track opportunity", detail: "Integrated pipeline" },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const afterStepVariants = {
  hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const dividerVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

const connectorVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProblemTransformation() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.15 }, variants: containerVariants };

  return (
    <section
      id="how-it-works"
      className="bg-[#F4F6F7]"
    >
      <motion.div
        ref={sectionRef}
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
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#DDE3E7] to-transparent" />
          </motion.div>

          {/* Before column */}
          <motion.div
            variants={containerVariants}
            className="relative rounded-xl border border-[#DDE3E7] bg-white p-6 sm:p-8 lg:rounded-r-none lg:border-r-0"
          >
            {/* Subtle warm overlay for "old way" tone */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl lg:rounded-r-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(183, 121, 31, 0.03) 0%, rgba(180, 60, 60, 0.02) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="relative mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#B7791F]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#B7791F]">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7791F]/40" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#B7791F]" />
                </span>
                Before
              </span>
              <span className="text-sm text-[#8899A6]">
                Manual workflow
              </span>
              <span className="ml-auto text-[10px] font-medium text-[#8899A6] bg-[#E8EAED] rounded px-1.5 py-0.5">
                7 steps
              </span>
            </div>

            <ol className="relative space-y-2" role="list">
              {BEFORE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.label}
                    variants={stepVariants}
                    className="group relative flex items-start gap-3 rounded-lg p-2.5 transition-all duration-300 hover:bg-[#B7791F]/[0.04]"
                  >
                    {/* Connecting line between steps */}
                    {i < BEFORE_STEPS.length - 1 && (
                      <motion.div
                        className="absolute left-[19px] top-[44px] w-px h-[calc(100%-24px)]"
                        aria-hidden="true"
                        initial={prefersReducedMotion ? false : { scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                      >
                        <div className="h-full w-full bg-gradient-to-b from-[#B7791F]/20 to-[#B7791F]/5" />
                      </motion.div>
                    )}

                    {/* Numbered badge with animated circle */}
                    <motion.span
                      className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-[#B7791F]/20 bg-[#B7791F]/[0.06] text-xs font-bold text-[#B7791F]/70 transition-all duration-300 group-hover:border-[#B7791F]/40 group-hover:bg-[#B7791F]/10 group-hover:text-[#B7791F] group-hover:shadow-[0_0_12px_rgba(183,121,31,0.2)]"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      {i + 1}
                      {/* Strikethrough line */}
                      <span
                        className="absolute left-1.5 right-1.5 top-1/2 h-px -translate-y-1/2 bg-[#B7791F]/25"
                        aria-hidden="true"
                      />
                      {/* Glow ring on hover */}
                      <span
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          boxShadow: "0 0 16px rgba(183, 121, 31, 0.25)",
                        }}
                        aria-hidden="true"
                      />
                    </motion.span>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <div className="flex items-center gap-2">
                        <Icon
                          className="size-4 shrink-0 text-[#B7791F]/40 transition-all duration-300 group-hover:text-[#B7791F]/70"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-[#8899A6] transition-colors duration-300 group-hover:text-[#56616C]">
                          {step.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#B7791F]/40 pl-6 transition-colors duration-300 group-hover:text-[#B7791F]/60">
                        {step.detail}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            {/* Bottom time indicator */}
            <div className="relative mt-5 flex items-center gap-2 rounded-lg bg-[#B7791F]/[0.04] p-3">
              <span className="text-[11px] font-medium text-[#B7791F]/60">⏱ Hours of manual work</span>
              <div className="h-1 flex-1 rounded-full bg-[#B7791F]/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#B7791F]/30"
                  initial={prefersReducedMotion ? { width: "100%" } : { width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Animated transition indicator — desktop */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
              },
            }}
            className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
            aria-hidden="true"
          >
            <div className="relative flex size-20 items-center justify-center">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 32px rgba(183, 221, 236, 0.5), 0 0 64px rgba(37, 99, 235, 0.2)",
                }}
              />
              {/* White circle with gradient border */}
              <div className="flex size-20 items-center justify-center rounded-full bg-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #F4F6F7 100%)",
                  border: "2px solid transparent",
                  backgroundClip: "padding-box",
                  position: "relative",
                }}
              >
                {/* Gradient border ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #B7DDEC, #2563EB, #24584F)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "2px",
                    borderRadius: "9999px",
                  }}
                />
                <ArrowRight className="size-7 text-[#2563EB]" />
              </div>
              {/* Pulsing outer ring */}
              <motion.div
                className="absolute inset-[-4px] rounded-full border border-[#B7DDEC]/30"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* VS label */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]/60 bg-white px-2 py-0.5 rounded-full border border-[#B7DDEC]/40">
                  VS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mobile transition indicator */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
              },
            }}
            className="flex items-center justify-center lg:hidden"
            aria-hidden="true"
          >
            <div className="relative flex size-14 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 20px rgba(183, 221, 236, 0.4), 0 0 40px rgba(37, 99, 235, 0.15)",
                }}
              />
              <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-md border-2 border-[#B7DDEC]">
                <ArrowDown className="size-5 text-[#2563EB]" />
              </div>
              {/* VS label */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]/60 bg-white px-1.5 py-0.5 rounded-full border border-[#B7DDEC]/40">
                  VS
                </span>
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
                  "linear-gradient(135deg, rgba(183, 221, 236, 0.08) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="relative mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#24584F]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#24584F]">
                <Zap className="size-3" aria-hidden="true" />
                After
              </span>
              <span className="text-sm font-medium text-[#111820]">
                WinterVell workflow
              </span>
              <span className="ml-auto text-[10px] font-medium text-[#2563EB] bg-[#EFF8FC] rounded px-1.5 py-0.5">
                6 steps
              </span>
            </div>

            <ol className="relative space-y-2" role="list">
              {AFTER_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.label}
                    variants={afterStepVariants}
                    className="group relative flex items-start gap-3 rounded-lg p-2.5 transition-all duration-300 hover:bg-[#EFF8FC]/70"
                  >
                    {/* Connecting line between steps */}
                    {i < AFTER_STEPS.length - 1 && (
                      <motion.div
                        className="absolute left-[19px] top-[44px] w-px h-[calc(100%-24px)]"
                        aria-hidden="true"
                        initial={prefersReducedMotion ? false : { scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                      >
                        <div className="h-full w-full bg-gradient-to-b from-[#2563EB]/25 to-[#24584F]/10" />
                      </motion.div>
                    )}

                    {/* Numbered badge with animated circle */}
                    <motion.span
                      className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-[#2563EB]/20 bg-[#EFF8FC] text-xs font-bold text-[#2563EB] transition-all duration-300 group-hover:border-[#2563EB]/40 group-hover:bg-[#2563EB] group-hover:text-white group-hover:shadow-[0_0_14px_rgba(37,99,235,0.3)]"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      {i + 1}
                      {/* Glow ring on hover */}
                      <span
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          boxShadow: "0 0 18px rgba(37, 99, 235, 0.35)",
                        }}
                        aria-hidden="true"
                      />
                    </motion.span>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <div className="flex items-center gap-2">
                        <Icon
                          className="size-4 shrink-0 text-[#2563EB] transition-transform duration-200 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-[#111820]">
                          {step.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#2563EB]/50 pl-6 transition-colors duration-300 group-hover:text-[#2563EB]/70">
                        {step.detail}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            {/* Bottom time indicator */}
            <div className="relative mt-5 flex items-center gap-2 rounded-lg bg-[#EFF8FC] p-3">
              <span className="text-[11px] font-medium text-[#2563EB]/70">⚡ Minutes, not hours</span>
              <div className="h-1 flex-1 rounded-full bg-[#B7DDEC]/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#24584F]"
                  initial={prefersReducedMotion ? { width: "85%" } : { width: "0%" }}
                  animate={isInView ? { width: "85%" } : { width: "0%" }}
                  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="mt-6 h-1 w-20 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #2563EB, #24584F, #B7DDEC)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
