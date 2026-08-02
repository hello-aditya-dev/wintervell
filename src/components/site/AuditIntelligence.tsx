"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  Search,
  Zap,
  Smartphone,
  Eye,
  Target,
  CheckCircle2,
  BookOpen,
  Bot,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  Info,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const CATEGORIES = [
  {
    name: "Technical Health",
    icon: Shield,
    description: "Server configuration, security headers, HTTPS, crawlability, and infrastructure reliability.",
    score: 72,
    color: "#2563EB",
  },
  {
    name: "SEO Foundations",
    icon: Search,
    description: "Meta tags, structured data, canonical URLs, sitemap integrity, and indexation coverage.",
    score: 58,
    color: "#2563EB",
  },
  {
    name: "Performance",
    icon: Zap,
    description: "Core Web Vitals, load times, asset optimization, caching, and rendering efficiency.",
    score: 64,
    color: "#B7791F",
  },
  {
    name: "Mobile Experience",
    icon: Smartphone,
    description: "Responsive design, touch targets, viewport configuration, and mobile-specific performance.",
    score: 81,
    color: "#24584F",
  },
  {
    name: "Accessibility Indicators",
    icon: Eye,
    description: "WCAG compliance signals, ARIA usage, colour contrast, and keyboard navigation support.",
    score: 43,
    color: "#B43C3C",
  },
  {
    name: "Conversion Clarity",
    icon: Target,
    description: "Call-to-action visibility, form usability, trust flow, and user journey friction points.",
    score: 67,
    color: "#2563EB",
  },
  {
    name: "Trust Signals",
    icon: CheckCircle2,
    description: "Privacy policy presence, SSL status, contact information, and regulatory compliance indicators.",
    score: 89,
    color: "#24584F",
  },
  {
    name: "Content Structure",
    icon: BookOpen,
    description: "Heading hierarchy, content freshness, internal linking, and information architecture quality.",
    score: 55,
    color: "#B7791F",
  },
  {
    name: "AI-Search Readiness",
    icon: Bot,
    description: "Schema markup for AI, featured snippet eligibility, entity clarity, and knowledge graph signals.",
    score: 31,
    color: "#B43C3C",
  },
] as const;

const PRINCIPLES = [
  {
    icon: CheckCircle2,
    text: "Findings are evidence-backed.",
    tooltip: "Every audit finding references a specific, verifiable data point — HTTP headers, rendered DOM, lighthouse metrics, or crawl results.",
  },
  {
    icon: Bot,
    text: "AI explains evidence but does not invent it.",
    tooltip: "The AI summarises and categorises real evidence. It cannot fabricate findings that lack a supporting data source.",
  },
  {
    icon: Eye,
    text: "Users can edit or reject every finding.",
    tooltip: "All findings are presented as editable drafts. Reject false positives, adjust severity, or add context before publishing.",
  },
  {
    icon: AlertTriangle,
    text: "Automated audits do not represent legal certification.",
    tooltip: "An automated audit is a diagnostic tool, not a compliance certification. Professional review is required for formal compliance.",
  },
];

const SEVERITY_COLORS = {
  Critical: "#B43C3C",
  High: "#B7791F",
  Medium: "#2563EB",
  Low: "#24584F",
  Info: "#56616C",
} as const;

const EVIDENCE_PANEL = {
  severity: "Critical" as const,
  title: "Missing HTTPS redirect on blog subdomain",
  confidence: 98,
  pageUrl: "blog.meridianhealth.example",
  rawEvidence:
    "HTTP request to http://blog.meridianhealth.example returns 200 OK without redirect to HTTPS. No Strict-Transport-Security header detected. Sensitive health information forms transmitted over unencrypted connection.",
  consequence:
    "Patient data transmitted in cleartext. Regulatory exposure under HIPAA §164.312. Estimated 12,000 monthly visitors affected.",
  recommendedAction:
    "Implement 301 redirect to HTTPS on all subdomains. Deploy HSTS headers with max-age ≥ 31536000. Add subdomains to HSTS preload list.",
  suggestedService: "Security Hardening",
  verified: true,
  affectedPages: 3,
  firstDetected: "2025-01-15",
  lastSeen: "2025-02-28",
  httpResponse: "200 OK (HTTP)",
  hstsHeader: "Not detected",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function getScoreColor(score: number): string {
  if (score >= 80) return "#24584F";
  if (score >= 60) return "#2563EB";
  if (score >= 40) return "#B7791F";
  return "#B43C3C";
}

function ScoreBar({ score, delay }: { score: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const color = getScoreColor(score);

  return (
    <div ref={ref} className="mt-2.5 w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">Score</span>
        <span className="text-[10px] font-bold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#DDE3E7]/60 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: prefersReducedMotion ? `${score}%` : 0 }}
          animate={isInView || prefersReducedMotion ? { width: `${score}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

export default function AuditIntelligence() {
  const prefersReducedMotion = useReducedMotion();
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const severityColor = SEVERITY_COLORS[EVIDENCE_PANEL.severity];

  return (
    <section id="audit-intelligence" className="bg-gradient-to-b from-[#F4F6F7] to-white">
      <TooltipProvider delayDuration={200}>
        <motion.div
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
          {...sectionMotionProps}
        >
          {/* Heading */}
          <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
              Evidence-backed audit intelligence
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#3F4A55]">
              Nine audit categories. Every finding linked to real evidence. No fabrication.
            </p>
          </motion.div>

          {/* Category grid */}
          <motion.div
            variants={containerVariants}
            className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3"
          >
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  variants={cardVariants}
                  whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-xl border border-[#DDE3E7] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#EFF8FC] transition-colors group-hover:bg-[#2563EB]/10">
                      <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: getScoreColor(cat.score) }}
                    >
                      {cat.score}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-[#111820]">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#3F4A55]">
                    {cat.description}
                  </p>
                  <ScoreBar score={cat.score} delay={i * 0.08} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Principles with tooltips */}
          <motion.div
            variants={containerVariants}
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <Tooltip key={p.text}>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={cardVariants}
                      className="group flex items-start gap-2.5 rounded-lg border border-[#DDE3E7] bg-white p-4 cursor-help transition-shadow hover:shadow-md"
                    >
                      <Icon className="mt-0.5 size-4 shrink-0 text-[#24584F]" aria-hidden="true" />
                      <span className="text-sm font-medium text-[#111820]">{p.text}</span>
                      <Info className="mt-0.5 size-3.5 shrink-0 text-[#56616C] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[260px] bg-[#142634] text-white text-xs leading-relaxed border-0">
                    {p.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </motion.div>

          {/* Decorative accent line */}
          <motion.div
            variants={headingVariants}
            className="mt-14 flex items-center justify-center gap-3"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#B7DDEC]" />
            <div className="size-2 rounded-full bg-[#B7DDEC]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#B7DDEC]" />
          </motion.div>

          {/* Evidence panel */}
          <motion.div variants={headingVariants} className="mt-10 sm:mt-12">
            <div className="mx-auto max-w-4xl">
              <h3 className="text-center text-lg font-semibold text-[#111820]">
                Sample evidence panel
              </h3>
              <p className="mt-1 text-center text-sm text-[#3F4A55]">
                Every finding includes severity, confidence, source evidence, and a recommended action.
              </p>

              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : { boxShadow: ["0 1px 3px rgba(0,0,0,0.06)", "0 1px 8px rgba(180,60,60,0.12)", "0 1px 3px rgba(0,0,0,0.06)"] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Card className="mt-6 border-[#DDE3E7] shadow-sm overflow-hidden">
                  {/* Critical severity banner */}
                  <div className="h-1 w-full" style={{ backgroundColor: severityColor }} />

                  <CardContent className="p-6">
                    {/* Severity + Title */}
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-1 size-3 shrink-0 rounded-full animate-pulse"
                        style={{ backgroundColor: severityColor }}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Colored pill badge */}
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: severityColor }}
                          >
                            <AlertTriangle className="size-3" aria-hidden="true" />
                            {EVIDENCE_PANEL.severity}
                          </span>
                          <h4 className="text-sm font-semibold text-[#111820]">
                            {EVIDENCE_PANEL.title}
                          </h4>
                          {EVIDENCE_PANEL.verified && (
                            <Badge
                              variant="outline"
                              className="border-[#24584F]/30 bg-[#24584F]/5 text-[#24584F] text-[10px] gap-1"
                            >
                              <CheckCircle className="size-3" aria-hidden="true" />
                              Human-verified
                            </Badge>
                          )}
                        </div>

                        {/* Confidence + Page URL */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#3F4A55]">
                          <span className="flex items-center gap-1">
                            <Shield className="size-3" aria-hidden="true" />
                            Confidence: <strong className="text-[#111820]">{EVIDENCE_PANEL.confidence}%</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <ExternalLink className="size-3" aria-hidden="true" />
                            {EVIDENCE_PANEL.pageUrl}
                          </span>
                        </div>

                        {/* Confidence bar */}
                        <div className="mt-2 w-full max-w-xs">
                          <div className="h-1 w-full rounded-full bg-[#DDE3E7]/60 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: severityColor }}
                              initial={{ width: prefersReducedMotion ? "98%" : 0 }}
                              animate={{ width: "98%" }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Raw evidence */}
                        <div className="mt-4 rounded-md border border-[#DDE3E7] bg-[#F4F6F7] p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#56616C] mb-1">
                            Raw evidence
                          </p>
                          <p className="text-xs leading-relaxed text-[#111820] font-mono">
                            {EVIDENCE_PANEL.rawEvidence}
                          </p>
                        </div>

                        {/* Business consequence */}
                        <div className="mt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#56616C] mb-1">
                            Business consequence
                          </p>
                          <p className="text-sm leading-relaxed text-[#111820]">
                            {EVIDENCE_PANEL.consequence}
                          </p>
                        </div>

                        {/* Recommended action */}
                        <div className="mt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#56616C] mb-1">
                            Recommended action
                          </p>
                          <p className="text-sm leading-relaxed text-[#111820]">
                            {EVIDENCE_PANEL.recommendedAction}
                          </p>
                        </div>

                        {/* Suggested service */}
                        <div className="mt-3 flex items-center gap-2">
                          <Lightbulb className="size-3.5 text-[#B7791F]" aria-hidden="true" />
                          <span className="text-xs text-[#3F4A55]">Suggested service:</span>
                          <Badge
                            variant="outline"
                            className="border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB] text-[10px]"
                          >
                            {EVIDENCE_PANEL.suggestedService}
                          </Badge>
                        </div>

                        {/* Expandable evidence detail */}
                        <Collapsible open={evidenceOpen} onOpenChange={setEvidenceOpen} className="mt-4">
                          <CollapsibleTrigger asChild>
                            <button
                              className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors group/expand"
                            >
                              <motion.div
                                animate={{ rotate: evidenceOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="size-4" aria-hidden="true" />
                              </motion.div>
                              View evidence detail
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <AnimatePresence mode="wait">
                              {evidenceOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-3 rounded-lg border border-[#DDE3E7] bg-white p-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                      <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">Affected pages</p>
                                        <p className="text-sm font-bold text-[#111820]">{EVIDENCE_PANEL.affectedPages}</p>
                                      </div>
                                      <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">First detected</p>
                                        <p className="text-sm font-bold text-[#111820]">{EVIDENCE_PANEL.firstDetected}</p>
                                      </div>
                                      <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">Last seen</p>
                                        <p className="text-sm font-bold text-[#111820]">{EVIDENCE_PANEL.lastSeen}</p>
                                      </div>
                                      <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">HTTP response</p>
                                        <p className="text-sm font-bold text-[#111820]">{EVIDENCE_PANEL.httpResponse}</p>
                                      </div>
                                    </div>
                                    <div className="pt-2 border-t border-[#DDE3E7]">
                                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">HSTS header</p>
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <XCircle className="size-3.5 text-[#B43C3C]" aria-hidden="true" />
                                        <p className="text-sm font-medium text-[#B43C3C]">{EVIDENCE_PANEL.hstsHeader}</p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </TooltipProvider>
    </section>
  );
}
