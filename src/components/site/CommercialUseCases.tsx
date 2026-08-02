"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import {
  Layout,
  Search,
  Code,
  RefreshCw,
  Layers,
  ArrowRight,
  TrendingUp,
  BarChart3,
  FileCheck,
  Wrench,
  Globe,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Target,
  Repeat,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Accent colors per use case ─── */
const ACCENT_COLORS = [
  { primary: "#2563EB", light: "#EFF8FC", gradient: "from-[#2563EB] to-[#1D4ED8]", glow: "rgba(37, 99, 235, 0.15)" },
  { primary: "#24584F", light: "#EDF5F3", gradient: "from-[#24584F] to-[#1A3F38]", glow: "rgba(36, 88, 79, 0.15)" },
  { primary: "#B7791F", light: "#FBF5E9", gradient: "from-[#B7791F] to-[#94630F]", glow: "rgba(183, 121, 31, 0.15)" },
  { primary: "#2563EB", light: "#EFF8FC", gradient: "from-[#2563EB] to-[#24584F]", glow: "rgba(37, 99, 235, 0.12)" },
  { primary: "#142634", light: "#EEF1F3", gradient: "from-[#142634] to-[#1A3A52]", glow: "rgba(20, 38, 52, 0.15)" },
];

/* ─── Use cases data ─── */
const USE_CASES = [
  {
    icon: Layout,
    secondaryIcon: Sparkles,
    title: "Web-design agency",
    description:
      "Use audits to identify redesign and conversion opportunities.",
    metric: { label: "Typical audit-to-redesign conversion", value: "3–5× deal size", numericPart: "3–5" },
    example: "Run a 9-category audit on a prospect's site. The report surfaces 47 findings across conversion clarity and mobile experience. Use the evidence to propose a full redesign.",
  },
  {
    icon: Search,
    secondaryIcon: Target,
    title: "SEO agency",
    description:
      "Turn technical findings into prioritized SEO projects.",
    metric: { label: "Average findings per audit", value: "30–60 SEO items", numericPart: "30–60" },
    example: "Audit a client's site and find missing structured data, canonical issues, and indexation gaps. Export the prioritised findings into a scoped SEO retainer.",
  },
  {
    icon: Code,
    secondaryIcon: Wrench,
    title: "Freelance developer",
    description:
      "Create structured evidence before quoting remediation work.",
    metric: { label: "Quote confidence increase", value: "Evidence-backed", numericPart: null },
    example: "Before quoting a security hardening project, run an audit to document every missing header, broken redirect, and vulnerability. The report becomes the scope of work.",
  },
  {
    icon: RefreshCw,
    secondaryIcon: Repeat,
    title: "Maintenance provider",
    description:
      "Use recurring audits to identify ongoing work.",
    metric: { label: "Recurring audit interval", value: "Monthly or quarterly", numericPart: null },
    example: "Schedule monthly audits for retained clients. Each report surfaces new findings — broken links, performance regressions, content drift — that justify the ongoing retainer.",
  },
  {
    icon: Layers,
    secondaryIcon: Building2,
    title: "Multi-brand studio",
    description:
      "Operate separate report brands and deployments under the Studio Licence.",
    metric: { label: "Deployments included", value: "Up to 5", numericPart: "5" },
    example: "Run three agency brands from one WinterVell installation. Each brand has its own logo, colours, domain, and report templates. The Studio Licence covers all five deployments.",
  },
] as const;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function CommercialUseCases() {
  const prefersReducedMotion = useReducedMotion();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="use-cases" className="bg-[#FFFFFF]">
      <motion.div
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Built for agencies that sell website work
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Five buyer scenarios where WinterVell pays for itself on the first audit.
          </p>
        </motion.div>

        {/* Use-case cards */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8"
        >
          {USE_CASES.map((uc, index) => {
            const Icon = uc.icon;
            const SecondaryIcon = uc.secondaryIcon;
            const accent = ACCENT_COLORS[index];
            const isExpanded = expandedCard === index;

            return (
              <motion.div
                key={uc.title}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative rounded-xl border border-[#DDE3E7] bg-[#F4F6F7] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#B7DDEC]/50"
                style={{
                  // Dynamic border glow on hover
                }}
              >
                {/* Hover border glow overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${accent.primary}20, 0 0 20px ${accent.glow}`,
                  }}
                  aria-hidden="true"
                />

                {/* Top accent line */}
                <div
                  className="absolute left-6 right-6 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accent.primary}40, transparent)`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon with animated gradient background */}
                  <div className="relative shrink-0">
                    <motion.div
                      className="flex size-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${accent.light}, ${accent.primary}15)`,
                      }}
                      whileHover={prefersReducedMotion ? {} : { rotate: 3 }}
                    >
                      <Icon className="size-5 transition-colors duration-300" style={{ color: accent.primary }} aria-hidden="true" />
                    </motion.div>
                    {/* Secondary floating icon */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border border-white bg-white shadow-sm"
                      initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <SecondaryIcon className="size-2.5" style={{ color: accent.primary }} aria-hidden="true" />
                    </motion.div>
                    {/* Pulse ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        border: `1.5px solid ${accent.primary}30`,
                      }}
                      animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-[#111820] group-hover:text-[#142634] transition-colors duration-200">
                      {uc.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#56616C]">
                      {uc.description}
                    </p>

                    {/* Metric badge with counter */}
                    <div className="mt-3 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-[#24584F]/30 bg-[#24584F]/5 text-[#24584F] text-[11px] font-semibold gap-1.5 transition-all duration-200 group-hover:border-[#24584F]/50 group-hover:bg-[#24584F]/8"
                      >
                        <TrendingUp className="size-3" aria-hidden="true" />
                        {uc.metric.label}:{" "}
                        <span className="font-bold">{uc.metric.value}</span>
                      </Badge>
                    </div>

                    {/* Example scenario — expandable */}
                    <div className="mt-3">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : index)}
                        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 hover:text-[#2563EB]"
                        style={{ color: accent.primary }}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <>
                            Hide example
                            <ChevronUp className="size-3" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            See example
                            <ChevronDown className="size-3" aria-hidden="true" />
                          </>
                        )}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div
                              className="mt-2 rounded-lg border p-3"
                              style={{
                                borderColor: `${accent.primary}20`,
                                backgroundColor: `${accent.light}`,
                              }}
                            >
                              <p
                                className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                                style={{ color: `${accent.primary}90` }}
                              >
                                How it works
                              </p>
                              <p className="text-xs leading-relaxed text-[#111820]">
                                {uc.example}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Connector dot (between cards) */}
                {index < USE_CASES.length - 1 && (
                  <motion.div
                    variants={dotVariants}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
                    aria-hidden="true"
                  >
                    <div
                      className="flex size-2 items-center justify-center rounded-full"
                      style={{ backgroundColor: accent.primary }}
                    >
                      <div
                        className="size-1 rounded-full bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={headingVariants}
          className="mt-12 flex items-center justify-center gap-2"
        >
          <span className="text-sm text-[#56616C]">Not sure which fits?</span>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
          >
            See all licence options
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
