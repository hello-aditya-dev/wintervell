"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileSearch,
  Wrench,
  FileText,
  ArrowRight,
  ListChecks,
  Package,
  Layers,
  XCircle,
  HelpCircle,
  GitBranch,
  Clock,
  Sparkles,
  DollarSign,
  CheckSquare,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Proposal components ─── */
const PROPOSAL_COMPONENTS = [
  { icon: ListChecks, label: "Scope items" },
  { icon: Package, label: "Deliverables" },
  { icon: Layers, label: "Project phases" },
  { icon: XCircle, label: "Exclusions" },
  { icon: HelpCircle, label: "Assumptions" },
  { icon: GitBranch, label: "Dependencies" },
  { icon: Clock, label: "Timeline" },
  { icon: Sparkles, label: "Optional services" },
  { icon: DollarSign, label: "Pricing" },
  { icon: CheckSquare, label: "Acceptance criteria" },
] as const;

/* ─── Finding → Proposal transformations ─── */
const TRANSFORMATIONS = [
  {
    finding: "Missing meta descriptions on 23 pages",
    severity: "High",
    severityColor: "#B7791F",
    service: "SEO Content Optimization",
    proposal: "SEO Content Package — $2,400",
    category: "SEO Foundations",
  },
  {
    finding: "Core Web Vitals: LCP exceeds 4.2s on mobile",
    severity: "Critical",
    severityColor: "#B43C3C",
    service: "Performance Optimization",
    proposal: "Performance Acceleration Plan — $6,800",
    category: "Performance",
  },
  {
    finding: "No structured data for medical services",
    severity: "High",
    severityColor: "#B7791F",
    service: "Schema & AI-Readiness",
    proposal: "AI-Search Readiness Package — $3,500",
    category: "AI-Search Readiness",
  },
];

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AuditToProposal() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="audit-to-proposal" className="bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            From findings to proposals — without the gap
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Approved findings become structured proposal items automatically. WinterVell connects
            analysis to revenue — but closing the deal is always yours.
          </p>
        </motion.div>

        {/* Proposal components grid */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-5"
        >
          {PROPOSAL_COMPONENTS.map((comp) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.label}
                variants={cardVariants}
                className="flex items-center gap-2.5 rounded-xl border border-[#DDE3E7] bg-[#F4F6F7] p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Icon className="size-4 text-[#2563EB]" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-[#111820]">{comp.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Transformation examples */}
        <motion.div variants={headingVariants} className="mt-14 sm:mt-20">
          <h3 className="text-center text-lg font-semibold text-[#111820]">
            How findings become proposals
          </h3>
          <p className="mt-1 text-center text-sm text-[#56616C]">
            Every approved finding maps to a recommended service and a proposal line item.
          </p>

          <div className="mx-auto mt-8 max-w-4xl space-y-5">
            {TRANSFORMATIONS.map((t, i) => (
              <motion.div
                key={t.proposal}
                variants={cardVariants}
              >
                <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Step 1: Finding */}
                      <div className="flex-1 border-b border-[#DDE3E7] p-5 lg:border-b-0 lg:border-r">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex size-7 items-center justify-center rounded-md bg-[#F4F6F7]">
                            <FileSearch className="size-3.5 text-[#56616C]" aria-hidden="true" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#56616C]">
                            Finding
                          </span>
                          <Badge
                            className="border-0 text-[9px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: t.severityColor }}
                          >
                            {t.severity}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-[#111820]">
                          {t.finding}
                        </p>
                        <p className="mt-1 text-[10px] text-[#56616C]">
                          Category: {t.category}
                        </p>
                      </div>

                      {/* Arrow 1 */}
                      <div className="flex items-center justify-center border-b border-[#DDE3E7] py-2 lg:border-b-0 lg:px-1">
                        <div className="flex items-center gap-1 lg:flex-col">
                          <ChevronRight className="size-4 text-[#2563EB] lg:rotate-0 rotate-90" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Step 2: Recommended service */}
                      <div className="flex-1 border-b border-[#DDE3E7] p-5 lg:border-b-0 lg:border-r">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                            <Wrench className="size-3.5 text-[#2563EB]" aria-hidden="true" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                            Recommended service
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#111820]">
                          {t.service}
                        </p>
                        <p className="mt-1 text-[10px] text-[#56616C]">
                          Maps from: {t.finding.split(" ").slice(0, 4).join(" ")}…
                        </p>
                      </div>

                      {/* Arrow 2 */}
                      <div className="flex items-center justify-center border-b border-[#DDE3E7] py-2 lg:border-b-0 lg:px-1">
                        <div className="flex items-center gap-1 lg:flex-col">
                          <ChevronRight className="size-4 text-[#24584F] lg:rotate-0 rotate-90" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Step 3: Proposal item */}
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex size-7 items-center justify-center rounded-md bg-[#ECFDF5]">
                            <FileText className="size-3.5 text-[#24584F]" aria-hidden="true" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#24584F]">
                            Proposal item
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[#111820]">
                          {t.proposal}
                        </p>
                        <p className="mt-1 text-[10px] text-[#56616C]">
                          Includes scope, deliverables, timeline, and acceptance criteria
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div variants={cardVariants} className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-start gap-3 rounded-xl border border-[#B7791F]/20 bg-[#FFFBEB] p-4">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#B7791F]" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-[#111820]">
                  WinterVell connects analysis to revenue
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#56616C]">
                  Proposals are generated from approved findings with your service catalogue and
                  pricing. WinterVell does not guarantee that any proposal will close — the
                  relationship and negotiation are always yours.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
