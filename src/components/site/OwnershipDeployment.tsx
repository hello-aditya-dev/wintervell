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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Checklist items ─── */
const CHECKLIST_ITEMS = [
  { label: "Complete WinterVell source code", verified: false },
  { label: "Production database schema", verified: false },
  { label: "Authentication and permissions", verified: false },
  { label: "Audit architecture", verified: false },
  { label: "Report generation", verified: false },
  { label: "Proposal system", verified: false },
  { label: "Prospect pipeline", verified: false },
  { label: "White-label configuration", verified: false },
  { label: "Deployment documentation", verified: true },
  { label: "Environment template", verified: false },
  { label: "Demo data", verified: false },
  { label: "Commercial licence", verified: false },
  { label: "Security documentation", verified: false },
  { label: "Dependency report", verified: false },
  { label: "Buyer handover checklist", verified: false },
] as const;

/* ─── Deployment flow steps ─── */
const DEPLOYMENT_STEPS = [
  { icon: GitBranch, label: "Repository", description: "Clone the source code" },
  { icon: Server, label: "Environment", description: "Configure .env from template" },
  { icon: Database, label: "Database", description: "Run migrations on PostgreSQL" },
  { icon: Rocket, label: "Deploy", description: "Build and deploy to your host" },
  { icon: Globe, label: "Custom domain", description: "Point your domain to the deployment" },
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
function AnimatedCheckmark({ delay = 0 }: { delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="#24584F"
        strokeWidth="1.5"
        className="opacity-30"
      />
      <motion.path
        d="M5 8.5L7 10.5L11 6"
        fill="none"
        stroke="#24584F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
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

export default function OwnershipDeployment() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

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
            variants={containerVariants}
            className="lg:col-span-3"
          >
            {/* Section header with accent */}
            <motion.div variants={headingVariants} className="flex items-center gap-3 mb-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#24584F]/10">
                <Package className="size-4 text-[#24584F]" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#111820]">
                What you receive
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-[#DDE3E7] to-transparent" aria-hidden="true" />
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHECKLIST_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={cardVariants}
                  className="group flex items-center gap-3 rounded-lg border border-[#DDE3E7] bg-white p-3.5 shadow-sm transition-all duration-200 hover:bg-[#F4F6F7] hover:border-[#B7DDEC]/40 hover:shadow-md"
                >
                  <AnimatedCheckmark delay={i * 0.05} />
                  <span className="text-sm font-medium text-[#111820]">{item.label}</span>
                  {item.verified && (
                    <BadgeCheck className="ml-auto size-4 shrink-0 text-[#2563EB] opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-label="Verified" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deployment flow — 2 columns */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-2"
          >
            <motion.h3 variants={headingVariants} className="text-lg font-semibold text-[#111820] mb-6">
              Deployment path
            </motion.h3>

            {/* Desktop: vertical flow with animated connecting lines */}
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
                          className="absolute left-[23px] top-[52px] w-px h-[calc(100%-44px)] bg-gradient-to-b from-[#2563EB] to-[#B7DDEC] origin-top"
                          initial={prefersReducedMotion ? false : { scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex items-start gap-4 pb-8">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[#DDE3E7] bg-white shadow-sm transition-all duration-200 group-hover:border-[#B7DDEC]/50 group-hover:shadow-md">
                          <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
                        </div>
                        <div className="pt-1">
                          <p className="text-sm font-semibold text-[#111820]">{step.label}</p>
                          <p className="mt-0.5 text-xs text-[#3F4A55]">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: horizontal flow */}
            <div className="sm:hidden">
              <div className="space-y-3">
                {DEPLOYMENT_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      variants={stepVariants}
                      className="flex items-center gap-3 rounded-lg border border-[#DDE3E7] bg-white p-3.5 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#EFF8FC]">
                        <Icon className="size-4 text-[#2563EB]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#111820]">{step.label}</p>
                        <p className="text-xs text-[#3F4A55]">{step.description}</p>
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
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F4A55] mb-3">
                Deployment paths
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {DEPLOYMENT_PATHS.map((path) => {
                  const PathIcon = path.icon;
                  return (
                    <motion.div
                      key={path.label}
                      variants={pathVariants}
                      className="group flex flex-col items-center gap-2 rounded-lg border border-[#DDE3E7] bg-white p-3 text-center shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#B7DDEC]/40"
                    >
                      <div
                        className="flex size-9 items-center justify-center rounded-lg transition-colors"
                        style={{ backgroundColor: `${path.color}10` }}
                      >
                        <PathIcon className="size-4" style={{ color: path.color }} aria-hidden="true" />
                      </div>
                      <p className="text-xs font-semibold text-[#111820]">{path.label}</p>
                      <p className="text-[10px] leading-tight text-[#3F4A55]">{path.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Note */}
            <motion.div variants={stepVariants} className="mt-6 rounded-lg border border-[#B7DDEC]/40 bg-[#EFF8FC] p-4">
              <div className="flex items-start gap-2.5">
                <FileCheck className="size-4 shrink-0 mt-0.5 text-[#2563EB]" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-[#142634]">
                  <strong>Self-hosted only.</strong> WinterVell is deployed on your infrastructure.
                  The deployment guide covers Vercel, Docker-based hosting, VPS, and other Node.js-compatible platforms.
                  PostgreSQL is required for production.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
