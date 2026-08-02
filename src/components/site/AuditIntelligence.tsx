"use client";

import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  {
    name: "Technical Health",
    icon: Shield,
    description: "Server configuration, security headers, HTTPS, crawlability, and infrastructure reliability.",
  },
  {
    name: "SEO Foundations",
    icon: Search,
    description: "Meta tags, structured data, canonical URLs, sitemap integrity, and indexation coverage.",
  },
  {
    name: "Performance",
    icon: Zap,
    description: "Core Web Vitals, load times, asset optimization, caching, and rendering efficiency.",
  },
  {
    name: "Mobile Experience",
    icon: Smartphone,
    description: "Responsive design, touch targets, viewport configuration, and mobile-specific performance.",
  },
  {
    name: "Accessibility Indicators",
    icon: Eye,
    description: "WCAG compliance signals, ARIA usage, colour contrast, and keyboard navigation support.",
  },
  {
    name: "Conversion Clarity",
    icon: Target,
    description: "Call-to-action visibility, form usability, trust flow, and user journey friction points.",
  },
  {
    name: "Trust Signals",
    icon: CheckCircle2,
    description: "Privacy policy presence, SSL status, contact information, and regulatory compliance indicators.",
  },
  {
    name: "Content Structure",
    icon: BookOpen,
    description: "Heading hierarchy, content freshness, internal linking, and information architecture quality.",
  },
  {
    name: "AI-Search Readiness",
    icon: Bot,
    description: "Schema markup for AI, featured snippet eligibility, entity clarity, and knowledge graph signals.",
  },
] as const;

const PRINCIPLES = [
  { icon: CheckCircle2, text: "Findings are evidence-backed." },
  { icon: Bot, text: "AI explains evidence but does not invent it." },
  { icon: Eye, text: "Users can edit or reject every finding." },
  { icon: AlertTriangle, text: "Automated audits do not represent legal certification." },
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
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AuditIntelligence() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const severityColor = SEVERITY_COLORS[EVIDENCE_PANEL.severity];

  return (
    <section id="audit-intelligence" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Evidence-backed audit intelligence
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Nine audit categories. Every finding linked to real evidence. No fabrication.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                className="group rounded-xl border border-[#DDE3E7] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#EFF8FC] transition-colors group-hover:bg-[#2563EB]/10">
                  <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[#111820]">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#56616C]">
                  {cat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Principles */}
        <motion.div
          variants={containerVariants}
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.text}
                variants={cardVariants}
                className="flex items-start gap-2.5 rounded-lg border border-[#DDE3E7] bg-white p-4"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-[#24584F]" aria-hidden="true" />
                <span className="text-sm font-medium text-[#111820]">{p.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Evidence panel */}
        <motion.div variants={headingVariants} className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-center text-lg font-semibold text-[#111820]">
              Sample evidence panel
            </h3>
            <p className="mt-1 text-center text-sm text-[#56616C]">
              Every finding includes severity, confidence, source evidence, and a recommended action.
            </p>

            <Card className="mt-6 border-[#DDE3E7] shadow-sm">
              <CardContent className="p-6">
                {/* Severity + Title */}
                <div className="flex items-start gap-3">
                  <div
                    className="mt-1 size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: severityColor }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className="border-0 text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: severityColor }}
                      >
                        {EVIDENCE_PANEL.severity}
                      </Badge>
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
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#56616C]">
                      <span className="flex items-center gap-1">
                        <Shield className="size-3" aria-hidden="true" />
                        Confidence: <strong className="text-[#111820]">{EVIDENCE_PANEL.confidence}%</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <ExternalLink className="size-3" aria-hidden="true" />
                        {EVIDENCE_PANEL.pageUrl}
                      </span>
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
                      <span className="text-xs text-[#56616C]">Suggested service:</span>
                      <Badge
                        variant="outline"
                        className="border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB] text-[10px]"
                      >
                        {EVIDENCE_PANEL.suggestedService}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
