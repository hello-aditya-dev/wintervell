"use client";

import { useState } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
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
  BadgeCheck,
  ChevronDown,
  Terminal,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Tech stack items with expandable details ─── */
const TECH_STACK = [
  {
    icon: Code2,
    label: "Framework",
    value: "Next.js 16 (App Router) + React 19 + TypeScript 5",
    details:
      "App Router with server components, streaming SSR, and full TypeScript strict mode. React 19 concurrent features enabled. All routes use the latest Next.js patterns.",
    category: "Core",
  },
  {
    icon: Database,
    label: "Database",
    value: "PostgreSQL (Prisma ORM); SQLite for local development",
    details:
      "Prisma ORM with typed queries, migrations, and introspection. PostgreSQL for production with full schema support. SQLite for zero-config local development.",
    category: "Core",
  },
  {
    icon: Shield,
    label: "Authentication",
    value: "NextAuth.js v4 with role-based access control",
    details:
      "Session-based authentication with JWT and database adapters. Role-based access control with organisation-scoped permissions. Multi-provider support (credentials, OAuth).",
    category: "Security",
  },
  {
    icon: Lock,
    label: "Multi-tenant architecture",
    value: "Organisation-scoped data isolation",
    details:
      "Complete data isolation between organisations at the database query level. Tenant context enforced through middleware. No cross-tenant data leakage possible.",
    category: "Architecture",
  },
  {
    icon: Cpu,
    label: "Audit workers",
    value: "Isolated audit execution with SSRF protection",
    details:
      "Audit crawlers run in isolated execution contexts. SSRF protection prevents internal network scanning. Configurable timeouts and resource limits per audit.",
    category: "Security",
  },
  {
    icon: HardDrive,
    label: "Storage",
    value: "Configurable file storage (local, S3-compatible)",
    details:
      "Abstract storage layer supporting local filesystem and S3-compatible providers. Configurable per environment. Automatic file cleanup and retention policies.",
    category: "Infrastructure",
  },
  {
    icon: FileText,
    label: "PDF rendering",
    value: "Server-side with selectable text and page numbers",
    details:
      "Server-side PDF generation using headless browser rendering. Selectable text output (not rasterised). Automatic page numbering, headers, and branded styling.",
    category: "Core",
  },
  {
    icon: Brain,
    label: "AI-provider abstraction",
    value: "OpenAI-compatible, Anthropic, mock providers",
    details:
      "Provider-agnostic AI layer with a unified interface. Switch between OpenAI, Anthropic, or mock providers without code changes. Built-in fallback and retry logic.",
    category: "AI",
  },
  {
    icon: Key,
    label: "Bring-your-own-key",
    value: "Use your own AI provider keys",
    details:
      "No vendor lock-in for AI services. Supply your own API keys for any supported provider. Keys are stored encrypted and never sent to third parties.",
    category: "AI",
  },
  {
    icon: ShieldCheck,
    label: "Security controls",
    value: "SSRF protection, IDOR prevention, rate limiting",
    details:
      "SSRF protection on all user-supplied URLs. IDOR prevention through organisation-scoped queries. Rate limiting on API endpoints and audit triggers.",
    category: "Security",
  },
  {
    icon: TestTube,
    label: "Testing",
    value: "Unit, integration, and E2E test suites",
    details:
      "Unit tests with Jest and React Testing Library. Integration tests with Prisma test containers. E2E tests with Playwright covering critical user flows.",
    category: "Quality",
  },
  {
    icon: GitBranch,
    label: "CI/CD",
    value: "GitHub Actions with lint, type-check, build, security",
    details:
      "Automated CI pipeline on every PR: ESLint, TypeScript strict check, production build, and security audit. Deploy previews on Vercel. Release automation with tags.",
    category: "Quality",
  },
] as const;

/* ─── Reference links ─── */
const REFERENCE_LINKS = [
  { label: "Architecture", href: "#architecture" },
  { label: "Security", href: "#security" },
  { label: "Dependency licences", href: "#due-diligence" },
  { label: "Known limitations", href: "#due-diligence" },
  { label: "Deployment guide", href: "#ownership" },
] as const;

/* ─── Category colors ─── */
const CATEGORY_COLORS: Record<string, string> = {
  Core: "#2563EB",
  Security: "#24584F",
  Architecture: "#142634",
  Infrastructure: "#B7791F",
  AI: "#B7DDEC",
  Quality: "#3F4A55",
};

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

/* ─── Single tech card with expand/collapse ─── */
function TechCard({ item, index }: { item: typeof TECH_STACK[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const Icon = item.icon;
  const categoryColor = CATEGORY_COLORS[item.category] || "#B7DDEC";

  return (
    <motion.div
      variants={cardVariants}
      className="group rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:border-[#B7DDEC]/30"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#24584F]/20 transition-colors group-hover:bg-[#24584F]/30">
          <Icon className="size-4 text-[#B7DDEC]" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#B7DDEC]/60">
              {item.label}
            </p>
            <BadgeCheck className="size-3.5 text-[#24584F] shrink-0" aria-label="Verified" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white">
            {item.value}
          </p>
        </div>
      </div>

      {/* Expand/collapse toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex w-full items-center gap-1.5 text-xs font-medium text-[#B7DDEC]/60 transition-colors hover:text-[#B7DDEC]"
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} details`}
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <ChevronDown className="size-3.5" />
        </motion.div>
        {expanded ? "Less detail" : "More detail"}
      </button>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-lg border border-[#1E3A4F] bg-[#142634]/60 p-3">
              <p className="text-xs leading-relaxed text-[#B7DDEC]/70">
                {item.details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category badge */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: categoryColor,
            backgroundColor: `${categoryColor}15`,
          }}
        >
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function TechnicalCredibility() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="architecture" className="bg-[#142634] relative overflow-hidden">
      {/* Code-style background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 31px,
            #B7DDEC 31px,
            #B7DDEC 32px
          )`,
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 47px,
            #B7DDEC 47px,
            #B7DDEC 48px
          )`,
        }} />
        {/* Terminal-style dots */}
        <div className="absolute top-6 left-6 flex gap-1.5">
          <div className="size-2 rounded-full bg-[#B43C3C]/60" />
          <div className="size-2 rounded-full bg-[#B7791F]/60" />
          <div className="size-2 rounded-full bg-[#24584F]/60" />
        </div>
        <div className="absolute top-6 left-16 font-mono text-[10px] text-[#B7DDEC]/40">
          <span className="text-[#2563EB]/40">const</span> wintervell = <span className="text-[#B7791F]/40">&quot;source-code&quot;</span>;
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 relative"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3A4F] bg-[#1A2E3E] px-3 py-1 mb-4">
            <Terminal className="size-3.5 text-[#B7DDEC]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#B7DDEC]/70">Tech stack</span>
          </div>
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
          {TECH_STACK.map((item, i) => (
            <TechCard key={item.label} item={item} index={i} />
          ))}
        </motion.div>

        {/* Reference links + CTA */}
        <motion.div variants={headingVariants} className="mt-12 sm:mt-16">
          <div className="rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Due-diligence documentation
                </h3>
                <p className="mt-1 text-xs text-[#B7DDEC]/70">
                  Review the technical details before purchasing. All links point to verified sections.
                </p>
              </div>
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-[#2563EB]/20 shrink-0"
              >
                <Eye className="size-3.5" aria-hidden="true" />
                View architecture
              </a>
            </div>
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
