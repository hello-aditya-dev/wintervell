"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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
  ArrowRightLeft,
  Zap,
  TrendingUp,
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
    findingDetail: "23 pages lack meta descriptions, reducing click-through rates from search results by an estimated 15–20%. Priority pages include service listings and practitioner profiles.",
    proposalDetail: "Includes meta description authoring for all 23 pages, A/B testing on top 5 landing pages, and monthly performance tracking for 90 days.",
  },
  {
    finding: "Core Web Vitals: LCP exceeds 4.2s on mobile",
    severity: "Critical",
    severityColor: "#B43C3C",
    service: "Performance Optimization",
    proposal: "Performance Acceleration Plan — $6,800",
    category: "Performance",
    findingDetail: "LCP of 4.2s is 68% above the 2.5s threshold. Primary causes: unoptimized hero images (2.1MB total), render-blocking JavaScript, and no lazy loading.",
    proposalDetail: "Image optimization pipeline, code splitting, lazy loading implementation, CDN configuration, and ongoing Core Web Vitals monitoring for 6 months.",
  },
  {
    finding: "No structured data for medical services",
    severity: "High",
    severityColor: "#B7791F",
    service: "Schema & AI-Readiness",
    proposal: "AI-Search Readiness Package — $3,500",
    category: "AI-Search Readiness",
    findingDetail: "Missing MedicalBusiness, LocalBusiness, and FAQ schema on 14 service pages and 8 practitioner profiles. No semantic markup for AI search engines.",
    proposalDetail: "Schema.org implementation for all service and practitioner pages, FAQ structured data, and AI-search optimization audit with quarterly reviews.",
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

/* ─── Animated transformation arrow ─── */
function TransformationArrow({ color, direction = "right" }: { color: string; direction?: "right" | "down" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center py-2 lg:py-0 lg:px-1">
      <div className="relative flex items-center justify-center">
        {/* Animated connecting line */}
        <motion.div
          className={direction === "right" ? "hidden lg:block w-8 h-0.5" : "lg:hidden h-6 w-0.5"}
          style={{ backgroundColor: `${color}30` }}
          initial={{ scaleX: direction === "right" ? 0 : undefined, scaleY: direction === "down" ? 0 : undefined }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Animated arrow icon */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={prefersReducedMotion ? false : { scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Glow behind arrow */}
          <motion.div
            className="absolute size-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}20, transparent)`,
            }}
            animate={prefersReducedMotion ? undefined : {
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : {
              x: direction === "right" ? [0, 4, 0] : undefined,
              y: direction === "down" ? [0, 4, 0] : undefined,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRightLeft
              className={`size-4 ${direction === "down" ? "rotate-90" : ""}`}
              style={{ color }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
        {/* Animated connecting line (right side) */}
        <motion.div
          className={direction === "right" ? "hidden lg:block w-8 h-0.5" : "lg:hidden h-6 w-0.5"}
          style={{ backgroundColor: `${color}30` }}
          initial={{ scaleX: direction === "right" ? 0 : undefined, scaleY: direction === "down" ? 0 : undefined }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─── Step number badge ─── */
function StepNumber({ number, color }: { number: number; color: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm"
      style={{ backgroundColor: color }}
      initial={prefersReducedMotion ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      {number}
    </motion.div>
  );
}

/* ─── Transformation card with flip animation ─── */
function TransformationCard({ t, index }: { t: typeof TRANSFORMATIONS[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const isCritical = t.severity === "Critical";

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }
      }
      transition={{ duration: 0.2 }}
    >
      <Card className="border-[#DDE3E7] shadow-sm overflow-hidden relative">
        {/* Gradient accent bar at top */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1 z-10"
          style={{
            background: isCritical
              ? "linear-gradient(90deg, #B43C3C, #B43C3C88)"
              : "linear-gradient(90deg, #B7791F, #B7791F88)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          aria-hidden="true"
        />

        {/* Animated connecting line at the top when hovered */}
        <AnimatePresence>
          {isHovered && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-x-0 top-1 h-0.5 z-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${t.severityColor}40, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Step 1: Finding */}
            <div className="flex-1 border-b border-[#DDE3E7] p-5 lg:border-b-0 lg:border-r relative">
              {/* Finding side background accent */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${t.severityColor}, transparent)`,
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <StepNumber number={1} color={t.severityColor} />
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
                  {/* Pulse for critical */}
                  {isCritical && !prefersReducedMotion && (
                    <motion.div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: t.severityColor }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="text-sm font-semibold text-[#111820]">
                  {t.finding}
                </p>
                <p className="mt-1 text-[10px] text-[#56616C]">
                  Category: {t.category}
                </p>
              </div>
            </div>

            {/* Arrow 1: Finding → Service */}
            <div className="hidden lg:flex items-center justify-center lg:px-0">
              <TransformationArrow color="#2563EB" direction="right" />
            </div>
            <div className="lg:hidden flex items-center justify-center">
              <TransformationArrow color="#2563EB" direction="down" />
            </div>

            {/* Step 2: Recommended service */}
            <div className="flex-1 border-b border-[#DDE3E7] p-5 lg:border-b-0 lg:border-r relative">
              {/* Service side background accent */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2563EB, transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <StepNumber number={2} color="#2563EB" />
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
            </div>

            {/* Arrow 2: Service → Proposal */}
            <div className="hidden lg:flex items-center justify-center lg:px-0">
              <TransformationArrow color="#24584F" direction="right" />
            </div>
            <div className="lg:hidden flex items-center justify-center">
              <TransformationArrow color="#24584F" direction="down" />
            </div>

            {/* Step 3: Proposal item */}
            <div className="flex-1 p-5 relative">
              {/* Proposal side background accent */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #24584F, transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <StepNumber number={3} color="#24584F" />
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
          </div>

          {/* Expandable detail on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-[#DDE3E7] px-5 py-4 bg-[#F4F6F7]/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Finding detail */}
                    <div className="rounded-md border border-[#DDE3E7] bg-white p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="size-3" style={{ color: t.severityColor }} aria-hidden="true" />
                        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: t.severityColor }}>
                          Finding Detail
                        </span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-[#56616C]">
                        {t.findingDetail}
                      </p>
                    </div>
                    {/* Proposal detail */}
                    <div className="rounded-md border border-[#24584F]/20 bg-[#ECFDF5]/30 p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp className="size-3 text-[#24584F]" aria-hidden="true" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#24584F]">
                          Proposal Detail
                        </span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-[#56616C]">
                        {t.proposalDetail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

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
          {PROPOSAL_COMPONENTS.map((comp, i) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.label}
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }
                }
                className="flex items-center gap-2.5 rounded-xl border border-[#DDE3E7] bg-[#F4F6F7] p-4 shadow-sm transition-shadow hover:shadow-md relative overflow-hidden group"
              >
                {/* Hover gradient accent */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#B7DDEC]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white group-hover:bg-[#EFF8FC] transition-colors">
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

          {/* Visual flow indicator */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-1.5 rounded-md border border-[#B43C3C]/20 bg-[#B43C3C]/5 px-2.5 py-1">
              <FileSearch className="size-3 text-[#B43C3C]" aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#B43C3C]">Finding</span>
            </div>
            <motion.div
              animate={prefersReducedMotion ? undefined : { x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="size-3 text-[#2563EB]" aria-hidden="true" />
            </motion.div>
            <div className="flex items-center gap-1.5 rounded-md border border-[#2563EB]/20 bg-[#2563EB]/5 px-2.5 py-1">
              <Wrench className="size-3 text-[#2563EB]" aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#2563EB]">Service</span>
            </div>
            <motion.div
              animate={prefersReducedMotion ? undefined : { x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <ArrowRight className="size-3 text-[#24584F]" aria-hidden="true" />
            </motion.div>
            <div className="flex items-center gap-1.5 rounded-md border border-[#24584F]/20 bg-[#24584F]/5 px-2.5 py-1">
              <FileText className="size-3 text-[#24584F]" aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#24584F]">Proposal</span>
            </div>
          </motion.div>

          <div className="mx-auto mt-8 max-w-5xl space-y-5">
            {TRANSFORMATIONS.map((t, i) => (
              <TransformationCard key={t.proposal} t={t} index={i} />
            ))}
          </div>

          {/* Convert button with glow */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.button
              className="relative inline-flex items-center gap-2 rounded-lg bg-[#24584F] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#1A3F38] overflow-hidden"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              {/* Animated glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: "0 0 20px rgba(36, 88, 79, 0.3), 0 0 40px rgba(36, 88, 79, 0.1)",
                }}
                animate={prefersReducedMotion ? undefined : {
                  boxShadow: [
                    "0 0 20px rgba(36, 88, 79, 0.3), 0 0 40px rgba(36, 88, 79, 0.1)",
                    "0 0 30px rgba(36, 88, 79, 0.4), 0 0 60px rgba(36, 88, 79, 0.2)",
                    "0 0 20px rgba(36, 88, 79, 0.3), 0 0 40px rgba(36, 88, 79, 0.1)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              {/* Hover sweep */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <Zap className="size-4 relative z-10" aria-hidden="true" />
              <span className="relative z-10">Convert findings to proposals</span>
            </motion.button>
          </motion.div>

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
