"use client";

import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Use cases data ─── */
const USE_CASES = [
  {
    icon: Layout,
    title: "Web-design agency",
    description:
      "Use audits to identify redesign and conversion opportunities.",
    metric: { label: "Typical audit-to-redesign conversion", value: "3–5× deal size" },
    example: "Run a 9-category audit on a prospect's site. The report surfaces 47 findings across conversion clarity and mobile experience. Use the evidence to propose a full redesign.",
  },
  {
    icon: Search,
    title: "SEO agency",
    description:
      "Turn technical findings into prioritized SEO projects.",
    metric: { label: "Average findings per audit", value: "30–60 SEO items" },
    example: "Audit a client's site and find missing structured data, canonical issues, and indexation gaps. Export the prioritised findings into a scoped SEO retainer.",
  },
  {
    icon: Code,
    title: "Freelance developer",
    description:
      "Create structured evidence before quoting remediation work.",
    metric: { label: "Quote confidence increase", value: "Evidence-backed" },
    example: "Before quoting a security hardening project, run an audit to document every missing header, broken redirect, and vulnerability. The report becomes the scope of work.",
  },
  {
    icon: RefreshCw,
    title: "Maintenance provider",
    description:
      "Use recurring audits to identify ongoing work.",
    metric: { label: "Recurring audit interval", value: "Monthly or quarterly" },
    example: "Schedule monthly audits for retained clients. Each report surfaces new findings — broken links, performance regressions, content drift — that justify the ongoing retainer.",
  },
  {
    icon: Layers,
    title: "Multi-brand studio",
    description:
      "Operate separate report brands and deployments under the Studio Licence.",
    metric: { label: "Deployments included", value: "Up to 5" },
    example: "Run three agency brands from one WinterVell installation. Each brand has its own logo, colours, domain, and report templates. The Studio Licence covers all five deployments.",
  },
] as const;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CommercialUseCases() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="use-cases" className="bg-[#FFFFFF]">
      <motion.div
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
          {USE_CASES.map((uc) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                variants={cardVariants}
                className="group rounded-xl border border-[#DDE3E7] bg-[#F4F6F7] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#EFF8FC] transition-colors group-hover:bg-[#2563EB]/10">
                    <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-[#111820]">
                      {uc.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#56616C]">
                      {uc.description}
                    </p>

                    {/* Metric badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-[#24584F]/30 bg-[#24584F]/5 text-[#24584F] text-[11px] font-semibold gap-1"
                      >
                        <TrendingUp className="size-3" aria-hidden="true" />
                        {uc.metric.label}: {uc.metric.value}
                      </Badge>
                    </div>

                    {/* Example scenario */}
                    <div className="mt-3 rounded-lg border border-[#DDE3E7] bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#56616C] mb-1">
                        How it works
                      </p>
                      <p className="text-xs leading-relaxed text-[#111820]">
                        {uc.example}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
