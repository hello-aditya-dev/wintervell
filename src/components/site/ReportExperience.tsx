"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  FileDown,
  Link2,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Search,
  Smartphone,
  Eye,
  Target,
  Layers,
  Wrench,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORY_SCORES = [
  { label: "Technical Health", score: 78, color: "#24584F" },
  { label: "SEO Foundations", score: 45, color: "#B7791F" },
  { label: "Performance", score: 62, color: "#2563EB" },
  { label: "Mobile Experience", score: 54, color: "#B7791F" },
  { label: "Accessibility", score: 38, color: "#B43C3C" },
  { label: "Conversion Clarity", score: 41, color: "#B43C3C" },
  { label: "Trust Signals", score: 33, color: "#B43C3C" },
  { label: "Content Structure", score: 56, color: "#2563EB" },
  { label: "AI-Search Readiness", score: 22, color: "#B43C3C" },
];

const PRIORITY_ISSUES = [
  {
    severity: "Critical",
    color: "#B43C3C",
    title: "Missing HTTPS redirect on blog subdomain",
    category: "Technical Health",
  },
  {
    severity: "High",
    color: "#B7791F",
    title: "Core Web Vitals: LCP exceeds 4.2s on mobile",
    category: "Performance",
  },
  {
    severity: "High",
    color: "#B7791F",
    title: "No structured data for medical services",
    category: "SEO Foundations",
  },
  {
    severity: "Medium",
    color: "#2563EB",
    title: "Contact form lacks autocomplete attributes",
    category: "Accessibility",
  },
];

const QUICK_WINS = [
  { title: "Add HSTS headers to all subdomains", impact: "High", effort: "Low" },
  { title: "Compress hero images to WebP format", impact: "High", effort: "Low" },
  { title: "Add MedicalBusiness schema to service pages", impact: "Medium", effort: "Low" },
];

const IMPLEMENTATION_PHASES = [
  {
    phase: "Phase 1",
    label: "Critical Fixes",
    timeline: "Week 1–2",
    items: ["HTTPS enforcement", "Security headers", "Critical accessibility fixes"],
  },
  {
    phase: "Phase 2",
    label: "Performance & SEO",
    timeline: "Week 3–4",
    items: ["Image optimization", "Structured data", "Core Web Vitals improvements"],
  },
  {
    phase: "Phase 3",
    label: "Growth & Conversion",
    timeline: "Week 5–8",
    items: ["Conversion optimization", "Content restructuring", "AI-search readiness"],
  },
];

const RECOMMENDED_SERVICES = [
  { name: "Security Hardening", price: "$4,200" },
  { name: "Performance Optimization", price: "$6,800" },
  { name: "SEO Foundations Package", price: "$5,500" },
  { name: "Accessibility Remediation", price: "$3,200" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ReportExperience() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="report" className="bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            A report designed to start a commercial conversation.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            White-label reports that position your agency as the expert — and make the next step obvious.
          </p>
        </motion.div>

        {/* Report preview */}
        <motion.div variants={cardVariants} className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <Card className="border-[#DDE3E7] shadow-md overflow-hidden">
            <CardContent className="p-0">
              {/* Report document */}
              <div className="bg-[#F4F6F7] p-4 sm:p-6">
                <div className="rounded-lg border border-[#DDE3E7] bg-white shadow-sm">
                  {/* Report header */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-[#142634]">
                          <BarChart3 className="size-5 text-[#B7DDEC]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#111820]">Northstar Digital</p>
                          <p className="text-xs text-[#56616C]">Website Audit Report</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#111820]">Meridian Health Group</p>
                        <p className="text-xs text-[#56616C]">meridianhealth.example</p>
                      </div>
                    </div>
                    {/* Export badges */}
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="outline" className="border-[#DDE3E7] text-[10px] text-[#56616C] gap-1">
                        <FileDown className="size-3" aria-hidden="true" />
                        PDF export
                      </Badge>
                      <Badge variant="outline" className="border-[#DDE3E7] text-[10px] text-[#56616C] gap-1">
                        <Link2 className="size-3" aria-hidden="true" />
                        Secure share link
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px]"
                      >
                        Demonstration data — fictional
                      </Badge>
                    </div>
                  </div>

                  {/* Executive summary */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C]">
                      Executive Summary
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#111820]">
                      Meridian Health Group&apos;s website presents significant opportunities for improvement
                      across security, performance, and search visibility. The site scores <strong>47/100</strong> overall,
                      with critical security vulnerabilities and below-average mobile performance. Implementing the
                      recommended changes could recover an estimated <strong>340+ lost consultations per month</strong> and
                      significantly improve search engine positioning.
                    </p>
                  </div>

                  {/* Score overview */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C]">
                      Score Overview
                    </h3>
                    <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                      {/* Overall score */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="relative flex size-24 items-center justify-center">
                          <svg className="size-24 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke="#DDE3E7"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke="#B43C3C"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 42 * 0.47} ${2 * Math.PI * 42}`}
                            />
                          </svg>
                          <span className="absolute text-2xl font-bold text-[#B43C3C]">47</span>
                        </div>
                        <span className="mt-1 text-xs font-medium text-[#56616C]">Overall Score</span>
                      </div>

                      {/* Category breakdown */}
                      <div className="flex-1 w-full grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {CATEGORY_SCORES.map((cat) => (
                          <div key={cat.label} className="flex items-center gap-2">
                            <div className="w-full">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#56616C]">{cat.label}</span>
                                <span className="text-xs font-bold" style={{ color: cat.color }}>
                                  {cat.score}
                                </span>
                              </div>
                              <div className="mt-1 h-1.5 w-full rounded-full bg-[#F4F6F7]">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${cat.score}%`,
                                    backgroundColor: cat.color,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Priority issues */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C]">
                      Priority Issues
                    </h3>
                    <div className="mt-3 space-y-2.5">
                      {PRIORITY_ISSUES.map((issue) => (
                        <div
                          key={issue.title}
                          className="flex items-start gap-2.5 rounded-md border border-[#DDE3E7] p-3"
                        >
                          <div
                            className="mt-0.5 size-2 shrink-0 rounded-full"
                            style={{ backgroundColor: issue.color }}
                            aria-hidden="true"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                className="border-0 text-[9px] font-bold uppercase tracking-wider text-white"
                                style={{ backgroundColor: issue.color }}
                              >
                                {issue.severity}
                              </Badge>
                              <span className="text-xs font-semibold text-[#111820]">
                                {issue.title}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[10px] text-[#56616C]">
                              Category: {issue.category}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick wins */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <Zap className="size-3 text-[#B7791F]" aria-hidden="true" />
                      Quick Wins
                    </h3>
                    <div className="mt-3 space-y-2">
                      {QUICK_WINS.map((win) => (
                        <div
                          key={win.title}
                          className="flex items-center justify-between rounded-md border border-[#DDE3E7] p-3"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-[#24584F]" aria-hidden="true" />
                            <span className="text-xs font-medium text-[#111820]">{win.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-[#24584F]/30 text-[#24584F] text-[9px]">
                              Impact: {win.impact}
                            </Badge>
                            <Badge variant="outline" className="border-[#2563EB]/30 text-[#2563EB] text-[9px]">
                              Effort: {win.effort}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation phases */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <Layers className="size-3 text-[#2563EB]" aria-hidden="true" />
                      Implementation Phases
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {IMPLEMENTATION_PHASES.map((phase) => (
                        <div
                          key={phase.phase}
                          className="rounded-md border border-[#DDE3E7] p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#111820]">{phase.phase}</span>
                            <Badge variant="outline" className="border-[#DDE3E7] text-[9px] text-[#56616C]">
                              <Clock className="size-2.5 mr-0.5" aria-hidden="true" />
                              {phase.timeline}
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs font-semibold text-[#2563EB]">{phase.label}</p>
                          <ul className="mt-2 space-y-1">
                            {phase.items.map((item) => (
                              <li key={item} className="flex items-start gap-1.5 text-[10px] text-[#56616C]">
                                <ArrowRight className="mt-0.5 size-2.5 shrink-0 text-[#DDE3E7]" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended services */}
                  <div className="border-b border-[#DDE3E7] px-6 py-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <Wrench className="size-3 text-[#2563EB]" aria-hidden="true" />
                      Recommended Services
                    </h3>
                    <div className="mt-3 space-y-2">
                      {RECOMMENDED_SERVICES.map((svc) => (
                        <div
                          key={svc.name}
                          className="flex items-center justify-between rounded-md border border-[#DDE3E7] p-3"
                        >
                          <span className="text-xs font-semibold text-[#111820]">{svc.name}</span>
                          <span className="text-xs font-bold text-[#2563EB]">{svc.price}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between rounded-md border border-[#2563EB]/20 bg-[#EFF8FC] p-3">
                        <span className="text-xs font-bold text-[#111820]">Total investment</span>
                        <span className="text-sm font-bold text-[#2563EB]">$19,700</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="px-6 py-5">
                    <div className="rounded-lg border border-[#B7DDEC] bg-[#EFF8FC] p-4 text-center">
                      <p className="text-sm font-semibold text-[#111820]">
                        Ready to improve your website?
                      </p>
                      <p className="mt-1 text-xs text-[#56616C]">
                        Contact Northstar Digital to discuss the recommended improvements and get started.
                      </p>
                      <button className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1d4ed8] transition-colors">
                        Schedule a consultation
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
