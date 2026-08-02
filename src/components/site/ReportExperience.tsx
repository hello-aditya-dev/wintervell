"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  ChevronDown,
  Sparkles,
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
    detail: "The blog subdomain (blog.meridianhealth.example) serves content over HTTP without redirecting to HTTPS. This exposes visitor data and triggers browser security warnings that erode trust.",
    impact: "Affects ~12% of total traffic routed through the blog subdomain.",
  },
  {
    severity: "High",
    color: "#B7791F",
    title: "Core Web Vitals: LCP exceeds 4.2s on mobile",
    category: "Performance",
    detail: "The Largest Contentful Paint on mobile devices is 4.2 seconds — more than double the recommended 2.5s threshold. This is primarily caused by unoptimized hero images and render-blocking JavaScript.",
    impact: "Estimated 18% bounce rate increase on mobile landing pages.",
  },
  {
    severity: "High",
    color: "#B7791F",
    title: "No structured data for medical services",
    category: "SEO Foundations",
    detail: "Service pages lack MedicalBusiness and LocalBusiness schema markup. This prevents rich results in search engines and AI-generated answers, reducing click-through rates by an estimated 15–25%.",
    impact: "Affects all 14 service pages and 8 practitioner profiles.",
  },
  {
    severity: "Medium",
    color: "#2563EB",
    title: "Contact form lacks autocomplete attributes",
    category: "Accessibility",
    detail: "The primary contact form does not use autocomplete attributes, forcing users to re-enter personal information. This impacts mobile users and users with assistive technologies.",
    impact: "Affects form completion rate, estimated 8% drop-off on mobile.",
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
    color: "#B43C3C",
  },
  {
    phase: "Phase 2",
    label: "Performance & SEO",
    timeline: "Week 3–4",
    items: ["Image optimization", "Structured data", "Core Web Vitals improvements"],
    color: "#B7791F",
  },
  {
    phase: "Phase 3",
    label: "Growth & Conversion",
    timeline: "Week 5–8",
    items: ["Conversion optimization", "Content restructuring", "AI-search readiness"],
    color: "#24584F",
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

  const display = !inView ? 0 : prefersReducedMotion ? value : animatedDisplay;

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}

/** Animated overall score with a filling SVG ring, glow effect, and gradient stroke. */
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

  const display = !inView ? 0 : prefersReducedMotion ? value : animatedDisplay;
  const offset = circumference - (display / 100) * circumference;

  // Generate a gradient ID that's unique per instance
  const gradientId = "scoreGradient";

  return (
    <div ref={ref} className="relative flex size-28 items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        }}
      />
      <svg className="size-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
          </linearGradient>
          {/* Glow filter */}
          <filter id="scoreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background track with subtle gradient */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#DDE3E7" strokeWidth="8" />
        {/* Animated progress ring */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#scoreGlow)"
          style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
        />
        {/* Decorative end dot */}
        {display > 5 && (
          <circle
            cx={50 + radius * Math.cos((display / 100) * 2 * Math.PI - Math.PI / 2)}
            cy={50 + radius * Math.sin((display / 100) * 2 * Math.PI - Math.PI / 2)}
            r="4"
            fill={color}
            style={{ opacity: 0.9 }}
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {Math.round(display)}
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: "#56616C" }}>
          out of 100
        </span>
      </div>
    </div>
  );
}

/** Shimmer effect overlay for the report card */
function ShimmerOverlay() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-lg print:hidden"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(183, 221, 236, 0.08) 45%, rgba(183, 221, 236, 0.15) 50%, rgba(183, 221, 236, 0.08) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      />
    </motion.div>
  );
}

/** Animated progress bar for category scores */
function AnimatedProgressBar({ score, color, label, delay = 0 }: { score: number; color: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="mt-1 h-2 w-full rounded-full bg-[#F4F6F7] overflow-hidden">
      <motion.div
        className="h-full rounded-full relative"
        initial={{ width: 0 }}
        animate={inView ? { width: `${score}%` } : { width: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut", delay }}
        style={{
          background: `linear-gradient(90deg, ${color}CC, ${color})`,
        }}
      >
        {/* Shine effect on bar */}
        {inView && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </div>
  );
}

/** Priority issue card with expandable detail and pulse animation */
function PriorityIssueCard({ issue, index }: { issue: typeof PRIORITY_ISSUES[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  const isCritical = issue.severity === "Critical";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }
      }
      className="group relative flex flex-col rounded-lg border border-[#DDE3E7] bg-white p-3 shadow-sm transition-shadow hover:shadow-md overflow-hidden"
    >
      {/* Gradient accent on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${issue.color}, ${issue.color}88)` }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      <div className="flex items-start gap-2.5">
        {/* Severity indicator with pulse for critical */}
        <div className="relative mt-0.5 flex size-2.5 shrink-0 items-center justify-center">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: issue.color }}
            aria-hidden="true"
          />
          {isCritical && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: issue.color }}
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}
        </div>

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

      {/* Expandable detail */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 flex items-center gap-1 text-[10px] font-medium transition-colors"
        style={{ color: issue.color }}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} details for: ${issue.title}`}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-3" aria-hidden="true" />
        </motion.div>
        {isExpanded ? "Less detail" : "More detail"}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-md border border-[#DDE3E7] bg-[#F4F6F7] p-2.5">
              <p className="text-[10px] leading-relaxed text-[#56616C]">
                {issue.detail}
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <AlertTriangle className="size-2.5" style={{ color: issue.color }} aria-hidden="true" />
                <span className="text-[9px] font-semibold" style={{ color: issue.color }}>
                  {issue.impact}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCatHover = useCallback((label: string | null) => {
    if (!prefersReducedMotion) setOpenCat(label);
  }, [prefersReducedMotion]);

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
          <Card className="border-[#DDE3E7] shadow-md overflow-hidden print-friendly print:shadow-none print:border-[#111820] relative">
            <CardContent className="p-0">
              {/* Report document */}
              <div className="bg-[#F4F6F7] p-4 sm:p-6 print:bg-white print:p-0">
                <div className="relative overflow-hidden rounded-lg border border-[#DDE3E7] bg-white shadow-sm print:border-[#111820] print:shadow-none">
                  {/* Shimmer overlay */}
                  <ShimmerOverlay />

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

                  {/* Report header with gradient accent */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    {/* Gradient accent bar */}
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{
                        background: "linear-gradient(90deg, #142634, #2563EB, #B7DDEC)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-start justify-between gap-4 pt-1">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="flex size-10 items-center justify-center rounded-lg bg-[#142634]"
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <BarChart3 className="size-5 text-[#B7DDEC]" aria-hidden="true" />
                        </motion.div>
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
                            <motion.div
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="group/btn h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820] hover:border-[#2563EB]/30 hover:shadow-sm transition-all"
                              >
                                <motion.div
                                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <FileDown className="size-3.5" aria-hidden="true" />
                                </motion.div>
                                <span className="hidden sm:inline">Download PDF</span>
                                <span className="sm:hidden">PDF</span>
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            PDF export available in the full product
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="group/btn h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820] hover:border-[#2563EB]/30 hover:shadow-sm transition-all"
                              >
                                <motion.div
                                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Share2 className="size-3.5" aria-hidden="true" />
                                </motion.div>
                                <span className="hidden sm:inline">Share report</span>
                                <span className="sm:hidden">Share</span>
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            Secure share link available in the full product
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleCopyLink}
                                className={`h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold transition-all ${
                                  copied
                                    ? "border-[#24584F]/40 text-[#24584F] shadow-sm"
                                    : "text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820] hover:border-[#2563EB]/30 hover:shadow-sm"
                                }`}
                                aria-live="polite"
                              >
                                <AnimatePresence mode="wait">
                                  {copied ? (
                                    <motion.div
                                      key="check"
                                      initial={{ scale: 0, rotate: -90 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      exit={{ scale: 0, rotate: 90 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <Check className="size-3.5" aria-hidden="true" />
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      key="copy"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <Copy className="size-3.5" aria-hidden="true" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                {copied ? "Copied!" : "Copy link"}
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            {copied ? "Copied to clipboard" : "Copy a secure share link"}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (typeof window !== "undefined") window.print();
                                }}
                                className="h-7 gap-1.5 border-[#DDE3E7] bg-white px-2.5 text-[11px] font-semibold text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820] hover:border-[#2563EB]/30 hover:shadow-sm transition-all"
                              >
                                <Printer className="size-3.5" aria-hidden="true" />
                                <span className="hidden sm:inline">Print</span>
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#142634] text-white">
                            Print this report preview
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {/* Executive summary with gradient background */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <div
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, #142634 0%, #2563EB 50%, #B7DDEC 100%)",
                      }}
                      aria-hidden="true"
                    />
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

                  {/* Score overview with enhanced visual hierarchy */}
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
                        {CATEGORY_SCORES.map((cat, i) => (
                          <div key={cat.label} className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenCat(openCat === cat.label ? null : cat.label)
                              }
                              onMouseEnter={() => handleCatHover(cat.label)}
                              onMouseLeave={() => handleCatHover(null)}
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
                              <AnimatedProgressBar
                                score={cat.score}
                                color={cat.color}
                                label={cat.label}
                                delay={i * 0.06}
                              />
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

                  {/* Priority issues - enhanced with pulse + expandable detail */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <AlertTriangle className="size-3 text-[#B43C3C]" aria-hidden="true" />
                      Priority Issues
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {PRIORITY_ISSUES.map((issue, i) => (
                        <PriorityIssueCard key={issue.title} issue={issue} index={i} />
                      ))}
                    </div>
                  </div>

                  {/* Quick wins with subtle hover effects */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <Zap className="size-3 text-[#B7791F]" aria-hidden="true" />
                      Quick Wins
                    </h3>
                    <div className="mt-3 space-y-2">
                      {QUICK_WINS.map((win, i) => (
                        <motion.div
                          key={win.title}
                          initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { x: 4, borderColor: "#24584F" }
                          }
                          className="flex items-center justify-between rounded-md border border-[#DDE3E7] p-3 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <motion.div
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.2, rotate: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CheckCircle2 className="size-3.5 text-[#24584F]" aria-hidden="true" />
                            </motion.div>
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
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation phases with gradient accents */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <Layers className="size-3 text-[#2563EB]" aria-hidden="true" />
                      Implementation Phases
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {IMPLEMENTATION_PHASES.map((phase, i) => (
                        <motion.div
                          key={phase.phase}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }
                          }
                          className="rounded-lg border border-[#DDE3E7] p-3 overflow-hidden relative"
                        >
                          {/* Phase gradient accent */}
                          <div
                            className="absolute inset-x-0 top-0 h-0.5"
                            style={{
                              background: `linear-gradient(90deg, ${phase.color}, ${phase.color}66)`,
                            }}
                            aria-hidden="true"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#111820]">{phase.phase}</span>
                            <Badge variant="outline" className="border-[#DDE3E7] text-[9px] text-[#56616C]">
                              <Clock className="size-2.5 mr-0.5" aria-hidden="true" />
                              {phase.timeline}
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs font-semibold" style={{ color: phase.color }}>
                            {phase.label}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {phase.items.map((item) => (
                              <li key={item} className="flex items-start gap-1.5 text-[10px] text-[#56616C]">
                                <ArrowRight className="mt-0.5 size-2.5 shrink-0 text-[#DDE3E7]" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended services with hover effects */}
                  <div className="relative z-20 border-b border-[#DDE3E7] px-6 py-5 print:break-inside-avoid">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#56616C] flex items-center gap-1.5">
                      <Wrench className="size-3 text-[#2563EB]" aria-hidden="true" />
                      Recommended Services
                    </h3>
                    <div className="mt-3 space-y-2">
                      {RECOMMENDED_SERVICES.map((svc, i) => (
                        <motion.div
                          key={svc.name}
                          initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { x: 4, borderColor: "#2563EB40" }
                          }
                          className="flex items-center justify-between rounded-md border border-[#DDE3E7] p-3 transition-colors"
                        >
                          <span className="text-xs font-semibold text-[#111820]">{svc.name}</span>
                          <span className="text-xs font-bold text-[#2563EB]">{svc.price}</span>
                        </motion.div>
                      ))}
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex items-center justify-between rounded-md border border-[#2563EB]/20 bg-gradient-to-r from-[#EFF8FC] to-[#B7DDEC]/10 p-3"
                      >
                        <span className="text-xs font-bold text-[#111820]">Total investment</span>
                        <span className="text-sm font-bold text-[#2563EB]">
                          $<AnimatedNumber value={19700} duration={1400} />
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Call to action with enhanced styling */}
                  <div className="relative z-20 px-6 py-5 print:hidden">
                    <div className="rounded-lg border border-[#B7DDEC] bg-gradient-to-r from-[#EFF8FC] to-[#B7DDEC]/10 p-4 text-center relative overflow-hidden">
                      {/* Decorative sparkle */}
                      <motion.div
                        className="absolute top-2 right-3"
                        animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                      >
                        <Sparkles className="size-4 text-[#B7DDEC]/50" />
                      </motion.div>
                      <p className="text-sm font-semibold text-[#111820]">
                        Ready to improve your website?
                      </p>
                      <p className="mt-1 text-xs text-[#56616C]">
                        Contact Northstar Digital to discuss the recommended improvements and get started.
                      </p>
                      <motion.button
                        className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1d4ed8] transition-colors relative overflow-hidden"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      >
                        {/* Hover glow */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                          }}
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        Schedule a consultation
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </motion.button>
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
