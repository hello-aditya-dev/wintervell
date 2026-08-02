"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  GitBranch,
  Server,
  Database,
  Rocket,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Checklist items ─── */
const CHECKLIST_ITEMS = [
  "Complete WinterVell source code",
  "Production database schema",
  "Authentication and permissions",
  "Audit architecture",
  "Report generation",
  "Proposal system",
  "Prospect pipeline",
  "White-label configuration",
  "Deployment documentation",
  "Environment template",
  "Demo data",
  "Commercial licence",
  "Security documentation",
  "Dependency report",
  "Buyer handover checklist",
] as const;

/* ─── Deployment flow steps ─── */
const DEPLOYMENT_STEPS = [
  { icon: GitBranch, label: "Repository", description: "Clone the source code" },
  { icon: Server, label: "Environment", description: "Configure .env from template" },
  { icon: Database, label: "Database", description: "Run migrations on PostgreSQL" },
  { icon: Rocket, label: "Deploy", description: "Build and deploy to your host" },
  { icon: Globe, label: "Custom domain", description: "Point your domain to the deployment" },
] as const;

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

export default function OwnershipDeployment() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="ownership" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Software you can actually own and operate.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
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
            <motion.h3 variants={headingVariants} className="text-lg font-semibold text-[#111820] mb-6">
              What the source-code buyer receives
            </motion.h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHECKLIST_ITEMS.map((item) => (
                <motion.div
                  key={item}
                  variants={cardVariants}
                  className="flex items-center gap-3 rounded-lg border border-[#DDE3E7] bg-white p-3.5 shadow-sm"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#24584F]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#111820]">{item}</span>
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

            {/* Desktop: vertical flow */}
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
                      {/* Connecting line */}
                      {!isLast && (
                        <div
                          className="absolute left-[23px] top-[52px] w-px h-[calc(100%-44px)] bg-[#DDE3E7]"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex items-start gap-4 pb-8">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[#DDE3E7] bg-white shadow-sm">
                          <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
                        </div>
                        <div className="pt-1">
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
              <div className="space-y-3">
                {DEPLOYMENT_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      variants={stepVariants}
                      className="flex items-center gap-3 rounded-lg border border-[#DDE3E7] bg-white p-3.5 shadow-sm"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#EFF8FC]">
                        <Icon className="size-4 text-[#2563EB]" aria-hidden="true" />
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

            {/* Note */}
            <motion.div variants={stepVariants} className="mt-6 rounded-lg border border-[#B7DDEC]/40 bg-[#EFF8FC] p-4">
              <p className="text-xs leading-relaxed text-[#142634]">
                <strong>Self-hosted only.</strong> WinterVell is deployed on your infrastructure. 
                The deployment guide covers Vercel, Docker-based hosting, VPS, and other Node.js-compatible platforms. 
                PostgreSQL is required for production.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
