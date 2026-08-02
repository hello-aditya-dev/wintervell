"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileDown,
  Link2,
  Share2,
  Copy,
  Check,
  Info,
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
  Printer,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const CATEGORY_SCORES = [
  { label: "Technical Health", score: 78, color: "#24584F", detail: "Server uptime, HTTPS enforcement, security headers, and DNS health measured across the primary domain and subdomains." },
  { label: "SEO Foundations", score: 45, color: "#B7791F", detail: "Meta tags, structured data, sitemap completeness, robots directives, and indexability across 142 crawled URLs." },
  { label: "Performance", score: 62, color: "#2563EB", detail: "Core Web Vitals (LCP, CLS, INP), Time to First Byte, and total page weight on mobile and desktop." },
  { label: "Mobile Experience", score: 54, color: "#B7791F", detail: "Responsive layout, tap-target sizing, font legibility, and mobile viewport configuration." },
  { label: "Accessibility", score: 38, color: "#B43C3C", detail: "WCAG 2.1 AA conformance, ARIA usage, color contrast, and keyboard navigation across primary user flows." },
  { label: "Conversion Clarity", score: 41, color: "#B43C3C", detail: "Call-to-action visibility, form friction, value proposition placement, and primary conversion paths." },
  { label: "Trust Signals", score: 33, color: "#B43C3C", detail: "Privacy policy, contact information, professional credentials, reviews, and HTTPS indicators." },
  { label: "Content Structure", score: 56, color: "#2563EB", detail: "Heading hierarchy, content depth, internal linking, and topical authority signals." },
  { label: "AI-Search Readiness", score: 22, color: "#B43C3C", detail: "Schema.org markup, semantic HTML, content machine-readability, and answer-engine optimization." },
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

/** Animated count-up number that triggers on scroll into view. */
function AnimatedNumber({
  value,
  duration = 1200,
  className,
  style,
}: {
  value: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [animatedDisplay, setAnimatedDisplay] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setAnimatedDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, prefersReducedMotion]);

  // Derive the displayed value without synchronous setState in the effect.
  const display = !inView ? 0 : prefersReducedMotion ? value : animatedDisplay;

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}

/** Animated overall score with a count-up number and a filling SVG ring. */
function OverallScore({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [animatedDisplay, setAnimatedDisplay] = useState(0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedDisplay(eased * value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, prefersReducedMotion]);

  // Derive the displayed value without synchronous setState in the effect.
  const display = !inView ? 0 : prefersReducedMotion ? value : animatedDisplay;
  const offset = circumference - (display / 100) * circumference;

  return (
    <div ref={ref} className="relative flex size-24 items-center justify-center">
      <svg className="size-24 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#DDE3E7" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-2xl font-bold" style={{ color }}>
        {Math.round(display)}
      </span>
    </div>
  );
}

export default function ReportExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const handleCopyLink = () => {
    // Simulated copy — in the full product this would call navigator.clipboard.writeText
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <Card className="border-[#DDE3E7] shadow-md overflow-hidden print-friendly print:shadow-none print:border-[#111820]">
            <CardContent className="p-0">
              {/* Report document */}
              <div className="bg-[#F4F6F7] p-4 sm:p-6 print:bg-white print:p-0">
                <div className="relative overflow-hidden rounded-lg border border-[#DDE3E7] bg-white shadow-sm print:border-[#111820] print:shadow-none">
                  {/* Watermark overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden print:hidden"
                    aria-hidden="true"
                  >
                    <div className="relative w-full">
                      <span className="block rotate-[-24deg] text-center text-[120px] font-black uppercase tracking-[0.3em] text-[#B43C3C]/[0.06] sm:text-[160px]">
                        Sample
                      </span>
                    </div>
                  </div>

                  {/* Report header */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <div className="flex flex-wrap items-start justify-between gap-4">
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
                    {/* Export badges + action buttons */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
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
                        className="border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px] gap-1"
                      >
                        <Info className="size-3" aria-hidden="true" />
                        Demonstration data — fictional
                      </Badge>

                      {/* Spacer pushes actions right on wider screens */}
                      <div className="ml-auto flex flex-wrap items-center gap-2 print:hidden">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820]"
                            >
                              <FileDown className="size-3.5" aria-hidden="true" />
                              <span className="hidden sm:inline">Download PDF</span>
                              <span className="sm:hidden">PDF</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            PDF export available in the full product
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820]"
                            >
                              <Share2 className="size-3.5" aria-hidden="true" />
                              <span className="hidden sm:inline">Share report</span>
                              <span className="sm:hidden">Share</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            Secure share link available in the full product
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleCopyLink}
                              className={`h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold transition-colors ${
                                copied
                                  ? "border-[#24584F]/40 text-[#24584F]"
                                  : "text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820]"
                              }`}
                              aria-live="polite"
                            >
                              {copied ? (
                                <>
                                  <Check className="size-3.5" aria-hidden="true" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3.5" aria-hidden="true" />
                                  Copy link
                                </>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            {copied ? "Copied to clipboard" : "Copy a secure share link"}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (typeof window !== "undefined") window.print();
                              }}
                              className="h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820]"
                            >
                              <Printer className="size-3.5" aria-hidden="true" />
                              <span className="hidden sm:inline">Print</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            Print this report preview
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {/* Executive summary */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C]">
                      Executive Summary
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#111820]">
                      Meridian Health Group&apos;s website presents significant opportunities for improvement
                      across security, performance, and search visibility. The site scores{" "}
                      <strong>
                        <AnimatedNumber value={47} className="text-[#B43C3C]" />/100
                      </strong>{" "}
                      overall, with critical security vulnerabilities and below-average mobile performance.
                      Implementing the recommended changes could recover an estimated{" "}
                      <strong>
                        <AnimatedNumber value={340} />+ lost consultations per month
                      </strong>{" "}
                      and significantly improve search engine positioning.
                    </p>
                  </div>

                  {/* Score overview */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C]">
                        Score Overview
                      </h3>
                      <span className="text-[10px] text-[#56616C]">
                        Click a score for details
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                      {/* Overall score */}
                      <div className="flex flex-col items-center shrink-0">
                        <OverallScore value={47} color="#B43C3C" />
                        <span className="mt-1 text-xs font-medium text-[#56616C]">Overall Score</span>
                      </div>

                      {/* Category breakdown — interactive */}
                      <div className="flex-1 w-full grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {CATEGORY_SCORES.map((cat) => (
                          <div key={cat.label} className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenCat(openCat === cat.label ? null : cat.label)
                              }
                              onMouseEnter={() => setOpenCat(cat.label)}
                              onMouseLeave={() => setOpenCat(null)}
                              onFocus={() => setOpenCat(cat.label)}
                              onBlur={() => setOpenCat(null)}
                              className="block w-full rounded-md p-1 text-left transition-colors hover:bg-[#F4F6F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
                              aria-label={`${cat.label} score: ${cat.score} out of 100. ${cat.detail}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#56616C]">{cat.label}</span>
                                <span
                                  className="flex items-center gap-0.5 text-xs font-bold"
                                  style={{ color: cat.color }}
                                >
                                  {cat.score}
                                  <Info className="size-2.5 opacity-60" aria-hidden="true" />
                                </span>
                              </div>
                              <div className="mt-1 h-1.5 w-full rounded-full bg-[#F4F6F7]">
                                <motion.div
                                  className="h-full rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${cat.score}%` }}
                                  viewport={{ once: true, amount: 0.6 }}
                                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                                  style={{ backgroundColor: cat.color }}
                                />
                              </div>
                            </button>
                            <AnimatePresence>
                              {openCat === cat.label && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                  transition={{ duration: 0.15, ease: "easeOut" }}
                                  className="absolute left-0 top-full z-30 mt-1 w-60 rounded-md border border-[#DDE3E7] bg-white p-3 shadow-lg print:hidden"
                                  role="tooltip"
                                >
                                  <div className="mb-1 flex items-center gap-1.5">
                                    <span
                                      className="size-2 rounded-full"
                                      style={{ backgroundColor: cat.color }}
                                      aria-hidden="true"
                                    />
                                    <span className="text-xs font-bold text-[#111820]">
                                      {cat.label}
                                    </span>
                                    <span
                                      className="ml-auto text-xs font-bold"
                                      style={{ color: cat.color }}
                                    >
                                      {cat.score}/100
                                    </span>
                                  </div>
                                  <p className="text-[10px] leading-relaxed text-[#56616C]">
                                    {cat.detail}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Priority issues */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C]">
                      Priority Issues
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {PRIORITY_ISSUES.map((issue) => (
                        <motion.div
                          key={issue.title}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { y: -2, borderColor: issue.color }
                          }
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="group flex items-start gap-2.5 rounded-md border border-[#DDE3E7] bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
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
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick wins */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
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
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
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
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
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
                        <span className="text-sm font-bold text-[#2563EB]">
                          $<AnimatedNumber value={19700} duration={1400} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="relative z-20 px-6 py-5 print:hidden">
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

          {/* Helper note */}
          <p className="mt-4 text-center text-[11px] text-[#56616C]/80">
            <Info className="mr-1 inline size-3" aria-hidden="true" />
            Sample preview — exported reports in the full product are unwatermarked and fully branded.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
