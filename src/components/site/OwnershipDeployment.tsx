"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  CheckCircle2,
  GitBranch,
  Server,
  Database,
  Rocket,
  Globe,
  ArrowRight,
  ChevronRight,
  BadgeCheck,
  ShieldCheck,
  Container,
  Monitor,
  Package,
  FileCheck,
  Lock,
  Circle,
  CircleDot,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Checklist items ─── */
const CHECKLIST_ITEMS = [
  { label: "Complete WinterVell source code", verified: false, category: "core" },
  { label: "Production database schema", verified: false, category: "core" },
  { label: "Authentication and permissions", verified: false, category: "core" },
  { label: "Audit architecture", verified: false, category: "core" },
  { label: "Report generation", verified: false, category: "feature" },
  { label: "Proposal system", verified: false, category: "feature" },
  { label: "Prospect pipeline", verified: false, category: "feature" },
  { label: "White-label configuration", verified: false, category: "feature" },
  { label: "Deployment documentation", verified: true, category: "ops" },
  { label: "Environment template", verified: false, category: "ops" },
  { label: "Demo data", verified: false, category: "ops" },
  { label: "Commercial licence", verified: false, category: "legal" },
  { label: "Security documentation", verified: false, category: "legal" },
  { label: "Dependency report", verified: false, category: "legal" },
  { label: "Buyer handover checklist", verified: false, category: "legal" },
] as const;

/* ─── Deployment flow steps ─── */
const DEPLOYMENT_STEPS = [
  { icon: GitBranch, label: "Repository", description: "Clone the source code", color: "#2563EB" },
  { icon: Server, label: "Environment", description: "Configure .env from template", color: "#24584F" },
  { icon: Database, label: "Database", description: "Run migrations on PostgreSQL", color: "#B7791F" },
  { icon: Rocket, label: "Deploy", description: "Build and deploy to your host", color: "#2563EB" },
  { icon: Globe, label: "Custom domain", description: "Point your domain to the deployment", color: "#24584F" },
] as const;

/* ─── Deployment paths ─── */
const DEPLOYMENT_PATHS = [
  {
    icon: Globe,
    label: "Vercel",
    description: "Zero-config deploy with Vercel CLI",
    color: "#2563EB",
  },
  {
    icon: Container,
    label: "Docker",
    description: "Containerised with Docker Compose",
    color: "#24584F",
  },
  {
    icon: Monitor,
    label: "VPS",
    description: "Direct deploy on any Linux VPS",
    color: "#B7791F",
  },
] as const;

/* ─── Animated checkmark SVG path ─── */
function AnimatedCheckmark({ delay = 0, verified = false, isInView = false }: { delay?: number; verified?: boolean; isInView?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
      {/* Background circle */}
      <motion.circle
        cx="9"
        cy="9"
        r="8"
        fill="none"
        strokeWidth="1.5"
        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: delay * 0.04, ease: "easeOut" }}
        stroke={verified ? "#2563EB" : "#24584F"}
        style={{ opacity: verified ? 0.3 : 0.2 }}
      />
      {/* Filled circle for verified */}
      {verified && (
        <motion.circle
          cx="9"
          cy="9"
          r="8"
          fill="#2563EB"
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: delay * 0.04, ease: "easeOut" }}
          style={{ transformOrigin: "9px 9px" }}
        />
      )}
      {/* Checkmark path */}
      <motion.path
        d="M5.5 9.5L7.5 11.5L12.5 6.5"
        fill="none"
        stroke={verified ? "#FFFFFF" : "#24584F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.04 + 0.15, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const pathVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const progressVariants = {
  hidden: { width: "0%" },
  visible: { width: "100%", transition: { duration: 1.5, ease: "easeOut", delay: 0.3 } },
};

export default function OwnershipDeployment() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const checklistRef = useRef<HTMLDivElement>(null);
  const checklistInView = useInView(checklistRef, { once: true, amount: 0.2 });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const verifiedCount = CHECKLIST_ITEMS.filter(item => item.verified).length;
  const totalCount = CHECKLIST_ITEMS.length;

  return (
    <section id="ownership" className="bg-[#F4F6F7]">
      <motion.div
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Software you can actually own and operate.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#3F4A55]">
            Every source-code buyer receives the complete package — not a partial codebase, not a hosted tier.
          </p>
        </motion.div>

        {/* Two-column layout: Checklist + Deployment flow */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 lg:grid-cols-5 lg:gap-12">
          {/* Checklist — 3 columns */}
          <motion.div
            ref={checklistRef}
            variants={containerVariants}
            className="lg:col-span-3"
          >
            {/* Section header with accent and progress */}
            <motion.div variants={headingVariants} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#24584F]/10 transition-colors group-hover:bg-[#24584F]/15">
                  <Package className="size-4 text-[#24584F]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[#111820]">
                  What you receive
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-[#DDE3E7] to-transparent" aria-hidden="true" />
                <span className="text-xs font-medium text-[#24584F] bg-[#24584F]/8 rounded-full px-2.5 py-1">
                  {totalCount} items
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-[#DDE3E7]/60 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#24584F] to-[#2563EB]"
                    initial={prefersReducedMotion ? { width: "100%" } : { width: "0%" }}
                    animate={checklistInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#24584F] whitespace-nowrap">
                  {totalCount}/{totalCount} included
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CHECKLIST_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={cardVariants}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -1 }}
                  className="group relative flex items-center gap-3 rounded-xl border bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    borderColor: item.verified ? "#2563EB30" : "#DDE3E7",
                    backgroundColor: item.verified ? "#EFF8FC" : "#FFFFFF",
                  }}
                >
                  {/* Animated checkmark */}
                  <AnimatedCheckmark delay={i} verified={item.verified} isInView={checklistInView} />

                  <span className={`text-sm font-medium ${item.verified ? "text-[#2563EB]" : "text-[#111820]"}`}>
                    {item.label}
                  </span>

                  {/* Verified badge */}
                  {item.verified && (
                    <motion.div
                      className="ml-auto flex items-center gap-1 shrink-0"
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0 }}
                      animate={checklistInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 + 0.3, ease: "easeOut" }}
                    >
                      <BadgeCheck className="size-4 text-[#2563EB]" aria-label="Verified" />
                    </motion.div>
                  )}

                  {/* Hover glow effect */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: item.verified
                        ? "inset 0 0 0 1px rgba(37, 99, 235, 0.1), 0 0 12px rgba(37, 99, 235, 0.08)"
                        : "inset 0 0 0 1px rgba(36, 88, 79, 0.08), 0 0 12px rgba(36, 88, 79, 0.05)",
                    }}
                    aria-hidden="true"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deployment flow — 2 columns */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-2"
          >
            <motion.div variants={headingVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#2563EB]/10">
                  <Rocket className="size-4 text-[#2563EB]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[#111820]">
                  Deployment path
                </h3>
              </div>
            </motion.div>

            {/* Desktop: vertical flow with animated connecting lines and progress dots */}
            <div className="hidden sm:block">
              <div className="relative space-y-0">
                {DEPLOYMENT_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === DEPLOYMENT_STEPS.length - 1;
                  return (
                    <motion.div
                      key={step.label}
                      variants={stepVariants}
                      className="relative"
                    >
                      {/* Animated connecting line */}
                      {!isLast && (
                        <motion.div
                          className="absolute left-[27px] top-[56px] w-0.5 h-[calc(100%-48px)] origin-top overflow-hidden"
                          initial={prefersReducedMotion ? false : { scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                          aria-hidden="true"
                        >
                          <div
                            className="h-full w-full"
                            style={{
                              background: `linear-gradient(to bottom, ${step.color}60, ${DEPLOYMENT_STEPS[i + 1]?.color || step.color}30)`,
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Progress dot on the line */}
                      <motion.div
                        className="absolute left-[22px] top-[52px] z-10 hidden"
                        aria-hidden="true"
                        initial={prefersReducedMotion ? false : { scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                      >
                        <div
                          className="size-3 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: step.color }}
                        />
                      </motion.div>

                      <div className="flex items-start gap-4 pb-8">
                        {/* Step icon with animated background */}
                        <motion.div
                          className="relative flex size-14 shrink-0 items-center justify-center rounded-xl border bg-white shadow-sm transition-all duration-300 group-hover:shadow-md"
                          style={{ borderColor: `${step.color}20` }}
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                        >
                          {/* Gradient background on hover */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                              background: `linear-gradient(135deg, ${step.color}10, ${step.color}05)`,
                            }}
                            aria-hidden="true"
                          />
                          <Icon className="size-5 relative z-10" style={{ color: step.color }} aria-hidden="true" />

                          {/* Step number badge */}
                          <div
                            className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border border-white text-[9px] font-bold text-white shadow-sm"
                            style={{ backgroundColor: step.color }}
                          >
                            {i + 1}
                          </div>
                        </motion.div>
                        <div className="pt-2">
                          <p className="text-sm font-semibold text-[#111820]">{step.label}</p>
                          <p className="mt-0.5 text-xs text-[#56616C]">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: horizontal flow */}
            <div className="sm:hidden">
              <div className="space-y-2.5">
                {DEPLOYMENT_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      variants={stepVariants}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                      className="group flex items-center gap-3 rounded-xl border border-[#DDE3E7] bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      <div
                        className="relative flex size-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${step.color}10` }}
                      >
                        <Icon className="size-4" style={{ color: step.color }} aria-hidden="true" />
                        <div
                          className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#111820]">{step.label}</p>
                        <p className="text-xs text-[#56616C]">{step.description}</p>
                      </div>
                      {i < DEPLOYMENT_STEPS.length - 1 && (
                        <ChevronRight className="size-4 shrink-0 text-[#B7DDEC]" aria-hidden="true" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Deployment paths — Vercel / Docker / VPS */}
            <motion.div variants={headingVariants} className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#56616C] mb-3">
                Deployment paths
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {DEPLOYMENT_PATHS.map((path) => {
                  const PathIcon = path.icon;
                  return (
                    <motion.div
                      key={path.label}
                      variants={pathVariants}
                      whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.03 }}
                      className="group relative flex flex-col items-center gap-2 rounded-xl border border-[#DDE3E7] bg-white p-3.5 text-center shadow-sm transition-all duration-300 hover:shadow-md"
                      style={{
                        // Dynamic hover border color
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          boxShadow: `0 0 16px ${path.color}15, inset 0 0 0 1px ${path.color}20`,
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className="flex size-10 items-center justify-center rounded-xl transition-colors duration-300"
                        style={{ backgroundColor: `${path.color}10` }}
                      >
                        <PathIcon className="size-4" style={{ color: path.color }} aria-hidden="true" />
                      </div>
                      <p className="text-xs font-semibold text-[#111820]">{path.label}</p>
                      <p className="text-[10px] leading-tight text-[#56616C]">{path.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Note */}
            <motion.div variants={stepVariants} className="mt-6 rounded-xl border border-[#B7DDEC]/40 bg-[#EFF8FC] p-4">
              <div className="flex items-start gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  <Lock className="size-3.5 text-[#2563EB]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#142634] mb-0.5">Self-hosted only</p>
                  <p className="text-xs leading-relaxed text-[#3F4A55]">
                    WinterVell is deployed on your infrastructure.
                    The deployment guide covers Vercel, Docker-based hosting, VPS, and other Node.js-compatible platforms.
                    PostgreSQL is required for production.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
