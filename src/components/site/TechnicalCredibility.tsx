"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Database,
  Shield,
  Lock,
  Cpu,
  HardDrive,
  FileText,
  Brain,
  Key,
  ShieldCheck,
  TestTube,
  GitBranch,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Tech stack items ─── */
const TECH_STACK = [
  { icon: Code2, label: "Framework", value: "Next.js 16 (App Router) + React 19 + TypeScript 5" },
  { icon: Database, label: "Database", value: "PostgreSQL (Prisma ORM); SQLite for local development" },
  { icon: Shield, label: "Authentication", value: "NextAuth.js v4 with role-based access control" },
  { icon: Lock, label: "Multi-tenant architecture", value: "Organisation-scoped data isolation" },
  { icon: Cpu, label: "Audit workers", value: "Isolated audit execution with SSRF protection" },
  { icon: HardDrive, label: "Storage", value: "Configurable file storage (local, S3-compatible)" },
  { icon: FileText, label: "PDF rendering", value: "Server-side with selectable text and page numbers" },
  { icon: Brain, label: "AI-provider abstraction", value: "OpenAI-compatible, Anthropic, mock providers" },
  { icon: Key, label: "Bring-your-own-key", value: "Use your own AI provider keys" },
  { icon: ShieldCheck, label: "Security controls", value: "SSRF protection, IDOR prevention, rate limiting" },
  { icon: TestTube, label: "Testing", value: "Unit, integration, and E2E test suites" },
  { icon: GitBranch, label: "CI/CD", value: "GitHub Actions with lint, type-check, build, security" },
] as const;

/* ─── Reference links ─── */
const REFERENCE_LINKS = [
  { label: "Architecture", href: "#architecture" },
  { label: "Security", href: "#security" },
  { label: "Dependency licences", href: "#due-diligence" },
  { label: "Known limitations", href: "#due-diligence" },
  { label: "Deployment guide", href: "#ownership" },
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

export default function TechnicalCredibility() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="architecture" className="bg-[#142634]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical credibility you can verify
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#B7DDEC]">
            Every claim below matches the repository. Inspect the architecture, security controls, and deployment documentation before you buy.
          </p>
        </motion.div>

        {/* Tech stack grid */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
        >
          {TECH_STACK.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={cardVariants}
                className="group rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-5 transition-colors hover:border-[#B7DDEC]/30"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#24584F]/20">
                    <Icon className="size-4 text-[#B7DDEC]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B7DDEC]/60">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Reference links */}
        <motion.div variants={headingVariants} className="mt-12 sm:mt-16">
          <div className="rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-6">
            <h3 className="text-sm font-semibold text-white">
              Due-diligence documentation
            </h3>
            <p className="mt-1 text-xs text-[#B7DDEC]/70">
              Review the technical details before purchasing. All links point to verified sections.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {REFERENCE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3A4F] bg-[#142634] px-3.5 py-2 text-xs font-medium text-[#B7DDEC] transition-colors hover:border-[#B7DDEC]/30 hover:bg-[#1A2E3E]"
                >
                  {link.label}
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Verification note */}
        <motion.div variants={headingVariants} className="mt-8 text-center">
          <p className="text-xs text-[#B7DDEC]/50">
            All technical claims are verified against the WinterVell source code. 
            No feature is listed that does not exist in the repository.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
