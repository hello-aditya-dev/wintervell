"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe,
  Loader2,
  FileSearch,
  FileBarChart,
  FileText,
  TrendingUp,
  ArrowRight,
  Shield,
  Zap,
  Search,
  Smartphone,
  Eye,
  Target,
  BookOpen,
  Bot,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  DollarSign,
  Users,
  BarChart3,
  Info,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DEMO_STEPS = [
  { id: "prospect", label: "Prospect", icon: Globe },
  { id: "audit", label: "Audit", icon: Loader2 },
  { id: "findings", label: "Findings", icon: FileSearch },
  { id: "report", label: "Report", icon: FileBarChart },
  { id: "proposal", label: "Proposal", icon: FileText },
  { id: "pipeline", label: "Pipeline", icon: TrendingUp },
] as const;

const AUDIT_CATEGORIES = [
  { name: "Technical Health", icon: Shield, progress: 78 },
  { name: "SEO Foundations", icon: Search, progress: 45 },
  { name: "Performance", icon: Zap, progress: 62 },
  { name: "Mobile Experience", icon: Smartphone, progress: 54 },
  { name: "Accessibility", icon: Eye, progress: 38 },
  { name: "Conversion Clarity", icon: Target, progress: 41 },
  { name: "Trust Signals", icon: CheckCircle2, progress: 33 },
  { name: "Content Structure", icon: BookOpen, progress: 56 },
  { name: "AI-Search Readiness", icon: Bot, progress: 22 },
];

const FINDINGS = [
  {
    severity: "Critical",
    color: "#B43C3C",
    title: "Missing HTTPS redirect on blog subdomain",
    confidence: 98,
    page: "blog.meridianhealth.example",
    evidence: "HTTP request to http://blog.meridianhealth.example returns 200 OK without redirect to HTTPS. Sensitive health information transmitted over unencrypted connection.",
    consequence: "Patient data transmitted in cleartext. Regulatory exposure under HIPAA §164.312.",
    action: "Implement 301 redirect to HTTPS on all subdomains. Deploy HSTS headers.",
    service: "Security Hardening",
  },
  {
    severity: "High",
    color: "#B7791F",
    title: "Core Web Vitals: LCP exceeds 4.2s on mobile",
    confidence: 95,
    page: "meridianhealth.example/services",
    evidence: "Largest Contentful Paint measured at 4,230ms via Lighthouse mobile simulation. Hero image unoptimized (2.1MB JPEG, no WebP fallback).",
    consequence: "53% of mobile users abandon pages loading over 3 seconds. Estimated 340 lost consultations/month.",
    action: "Convert hero images to WebP with responsive srcset. Implement lazy loading below fold.",
    service: "Performance Optimization",
  },
  {
    severity: "Medium",
    color: "#2563EB",
    title: "No structured data for medical services",
    confidence: 91,
    page: "meridianhealth.example/services/*",
    evidence: "Schema.org MedicalBusiness markup absent across all 12 service pages. No LocalBusiness or Physician schema detected.",
    consequence: "Missing rich snippets in search results. Reduced click-through rate by an estimated 15-25%.",
    action: "Implement MedicalBusiness and Physician structured data templates across service pages.",
    service: "SEO Foundations",
  },
  {
    severity: "Low",
    color: "#24584F",
    title: "Contact form lacks autocomplete attributes",
    confidence: 87,
    page: "meridianhealth.example/contact",
    evidence: "Input fields missing autocomplete='name', autocomplete='email', autocomplete='tel' attributes. WCAG 1.3.5 Identify Input Purpose.",
    consequence: "Minor accessibility barrier. Reduced form completion speed for users with assistive technology.",
    action: "Add appropriate autocomplete attributes to all form fields.",
    service: "Accessibility Audit",
  },
];

const PROPOSAL_ITEMS = [
  { service: "Security Hardening", scope: "HTTPS enforcement, HSTS, CSP headers, subdomain audit", price: "$4,200" },
  { service: "Performance Optimization", scope: "Image optimization, code splitting, CDN configuration", price: "$6,800" },
  { service: "SEO Foundations Package", scope: "Structured data, meta optimization, sitemap restructuring", price: "$5,500" },
  { service: "Accessibility Remediation", scope: "WCAG 2.1 AA compliance, form improvements, ARIA labels", price: "$3,200" },
];

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Staggered content reveal for step content
const contentRevealVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const AUTO_ADVANCE_MS = 5000;

// Step connector line component
function StepConnector({ active, completed, prefersReducedMotion }: { active: boolean; completed: boolean; prefersReducedMotion: boolean }) {
  return (
    <div className="hidden lg:flex items-center px-0.5 flex-1 min-w-[16px] max-w-[32px]">
      <div className="relative w-full h-[2px] bg-[#DDE3E7] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: completed
              ? "linear-gradient(90deg, #2563EB, #B7DDEC)"
              : active
                ? "linear-gradient(90deg, #2563EB, #2563EB)"
                : "transparent",
          }}
          initial={prefersReducedMotion ? { width: completed ? "100%" : active ? "50%" : "0%" } : { width: "0%" }}
          animate={{
            width: completed ? "100%" : active ? "50%" : "0%",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Glowing active step indicator
function ActiveStepGlow({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  if (prefersReducedMotion) return null;
  return (
    <motion.div
      className="absolute inset-0 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2), 0 0 12px rgba(37, 99, 235, 0.15), 0 0 24px rgba(37, 99, 235, 0.08)",
      }}
    />
  );
}

export default function ProductProof() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<string>("prospect");
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [auditScanIdx, setAuditScanIdx] = useState(0);
  const [auditSubProgress, setAuditSubProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  // Reset scan state when leaving the audit step, or snap to the final state
  // for reduced-motion users.
  const [prevActiveStep, setPrevActiveStep] = useState(activeStep);
  const [prevReducedMotion, setPrevReducedMotion] = useState(prefersReducedMotion);
  if (activeStep !== prevActiveStep || prefersReducedMotion !== prevReducedMotion) {
    setPrevActiveStep(activeStep);
    setPrevReducedMotion(prefersReducedMotion);
    if (activeStep !== "audit") {
      setAuditScanIdx(0);
      setAuditSubProgress(0);
    } else if (prefersReducedMotion) {
      setAuditScanIdx(AUDIT_CATEGORIES.length);
      setAuditSubProgress(100);
    }
  }

  // Sequential scan animation when the Audit step is active.
  useEffect(() => {
    if (activeStep !== "audit" || prefersReducedMotion || !inView) {
      return;
    }

    const tickMs = 60;
    const perCategoryTicks = 10;
    const id = setInterval(() => {
      setAuditSubProgress((prev) => {
        const next = prev + 100 / perCategoryTicks;
        if (next >= 100) {
          setAuditScanIdx((idx) => Math.min(idx + 1, AUDIT_CATEGORIES.length));
          return 0;
        }
        return next;
      });
    }, tickMs);

    if (auditScanIdx >= AUDIT_CATEGORIES.length) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [activeStep, prefersReducedMotion, inView, auditScanIdx]);

  const activeStepIdx = DEMO_STEPS.findIndex((s) => s.id === activeStep);

  const goToStep = useCallback((newStep: string) => {
    setActiveStep((prev) => {
      const prevIdx = DEMO_STEPS.findIndex((s) => s.id === prev);
      const newIdx = DEMO_STEPS.findIndex((s) => s.id === newStep);
      if (newIdx === prevIdx) return prev;
      setDirection(newIdx > prevIdx ? 1 : -1);
      return newStep;
    });
  }, []);

  const goNext = useCallback(() => {
    setActiveStep((prev) => {
      const prevIdx = DEMO_STEPS.findIndex((s) => s.id === prev);
      const newIdx = (prevIdx + 1) % DEMO_STEPS.length;
      setDirection(1);
      return DEMO_STEPS[newIdx].id;
    });
  }, []);

  const goPrev = useCallback(() => {
    setActiveStep((prev) => {
      const prevIdx = DEMO_STEPS.findIndex((s) => s.id === prev);
      const newIdx = (prevIdx - 1 + DEMO_STEPS.length) % DEMO_STEPS.length;
      setDirection(-1);
      return DEMO_STEPS[newIdx].id;
    });
  }, []);

  // Auto-advance every 5s, pausing on hover, out of view, or reduced motion
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion || !inView) return;
    const id = setTimeout(() => {
      goNext();
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [isPlaying, isHovered, prefersReducedMotion, inView, activeStep, goNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isHovered) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isHovered, activeStep, goNext, goPrev]);

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: fadeVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: fadeVariants };

  const stepVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: (dir: number) => ({
          opacity: 0,
          x: dir >= 0 ? 60 : -60,
          scale: 0.96,
          filter: "blur(4px)",
        }),
        animate: {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: (dir: number) => ({
          opacity: 0,
          x: dir >= 0 ? -60 : 60,
          scale: 0.96,
          filter: "blur(4px)",
          transition: { duration: 0.25, ease: "easeIn" },
        }),
      };

  const renderStep = (stepId: string) => {
    switch (stepId) {
      case "prospect":
        return (
          <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#DDE3E7] bg-[#F4F6F7]/60 pb-4">
              <CardTitle className="flex items-center gap-2 text-base text-[#111820]">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                  <Globe className="size-4 text-[#2563EB]" aria-hidden="true" />
                </span>
                Enter prospect URL
              </CardTitle>
              <CardDescription className="text-sm text-[#56616C]">
                Enter a company website to begin a new audit engagement.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div
                className="rounded-lg border border-[#DDE3E7] bg-[#F4F6F7] p-6"
                variants={contentRevealVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="flex flex-col gap-4 sm:flex-row sm:items-end" variants={contentChildVariants}>
                  <div className="flex-1">
                    <label className="mb-1.5 block text-xs font-medium text-[#56616C]">
                      Website URL
                    </label>
                    <div className="flex items-center rounded-md border border-[#DDE3E7] bg-white px-3 py-2.5 text-sm">
                      <Globe className="mr-2 size-4 text-[#56616C]" aria-hidden="true" />
                      <span className="text-[#111820] font-medium">meridianhealth.example</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 rounded-md bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4ed8] transition-colors">
                    Start audit
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </motion.div>
                <motion.div className="mt-6 rounded-md border border-[#B7DDEC] bg-[#EFF8FC] p-4" variants={contentChildVariants}>
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Search className="mt-0.5 size-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-[#111820]">Prospect identified</p>
                      <p className="mt-1 text-sm text-[#56616C]">
                        <strong>Meridian Health Group</strong> — Regional healthcare provider with 12 locations.
                        Estimated 45K monthly visits. Primary domain: meridianhealth.example
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        );
      case "audit":
        return (
          <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#DDE3E7] bg-[#F4F6F7]/60 pb-4">
              <CardTitle className="flex items-center gap-2 text-base text-[#111820]">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                  <Loader2 className="size-4 text-[#2563EB] animate-spin" aria-hidden="true" />
                </span>
                Audit in progress
              </CardTitle>
              <CardDescription className="text-sm text-[#56616C]">
                WinterVell is scanning meridianhealth.example across 9 audit categories.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div
                className="space-y-3"
                variants={contentRevealVariants}
                initial="hidden"
                animate="visible"
              >
                {AUDIT_CATEGORIES.map((cat, i) => {
                  const Icon = cat.icon;
                  const isComplete = i < auditScanIdx;
                  const isInProgress = i === auditScanIdx && auditScanIdx < AUDIT_CATEGORIES.length;
                  const barValue = isComplete ? 100 : isInProgress ? auditSubProgress : 0;
                  return (
                    <motion.div
                      key={cat.name}
                      variants={contentChildVariants}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-300 ${
                        isInProgress
                          ? "border-[#B7791F]/40 bg-[#B7791F]/5 shadow-sm ring-1 ring-[#B7791F]/20"
                          : isComplete
                            ? "border-[#DDE3E7] bg-white"
                            : "border-[#DDE3E7] bg-white"
                      }`}
                    >
                      <div className={`flex size-8 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${isComplete ? "bg-[#EFF8FC]" : isInProgress ? "bg-[#B7791F]/10" : "bg-[#F4F6F7]"}`}>
                        <Icon className={`size-4 transition-colors duration-300 ${isComplete ? "text-[#2563EB]" : isInProgress ? "text-[#B7791F]" : "text-[#56616C]"}`} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#111820]">{cat.name}</span>
                          {isComplete ? (
                            <motion.div
                              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                              <CheckCircle2 className="size-4 text-[#24584F]" aria-hidden="true" />
                            </motion.div>
                          ) : isInProgress ? (
                            <Loader2 className="size-4 text-[#B7791F] animate-spin" aria-hidden="true" />
                          ) : (
                            <Clock className="size-4 text-[#56616C]" aria-hidden="true" />
                          )}
                        </div>
                        <Progress
                          value={barValue}
                          className="mt-1.5 h-1.5 bg-[#F4F6F7]"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
              {/* Live scan summary line */}
              <motion.div
                className="mt-4 flex items-center justify-between rounded-md border border-[#B7DDEC] bg-[#EFF8FC] px-4 py-2.5"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <span className="flex items-center gap-2 text-xs font-medium text-[#142634]">
                  <Loader2 className="size-3.5 animate-spin text-[#2563EB]" aria-hidden="true" />
                  Scanning category {Math.min(auditScanIdx + 1, AUDIT_CATEGORIES.length)} of {AUDIT_CATEGORIES.length}
                </span>
                <span className="text-xs font-semibold text-[#2563EB]">
                  {Math.round((auditScanIdx / AUDIT_CATEGORIES.length) * 100)}%
                </span>
              </motion.div>
            </CardContent>
          </Card>
        );
      case "findings":
        return (
          <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#DDE3E7] bg-[#F4F6F7]/60 pb-4">
              <CardTitle className="flex items-center gap-2 text-base text-[#111820]">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                  <FileSearch className="size-4 text-[#2563EB]" aria-hidden="true" />
                </span>
                Evidence-backed findings
              </CardTitle>
              <CardDescription className="text-sm text-[#56616C]">
                23 findings across 9 categories for meridianhealth.example
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-h-96 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                {FINDINGS.map((finding, i) => (
                  <motion.div
                    key={finding.title}
                    initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
                    className="rounded-lg border border-[#DDE3E7] bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 size-2 shrink-0 rounded-full ${finding.severity === "Critical" ? "animate-pulse" : ""}`}
                        style={{ backgroundColor: finding.color }}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            className="border-0 text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: finding.color }}
                          >
                            {finding.severity}
                          </Badge>
                          <span className="text-sm font-semibold text-[#111820]">
                            {finding.title}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#56616C]">
                          <span className="flex items-center gap-1">
                            <Shield className="size-3" aria-hidden="true" />
                            Confidence: {finding.confidence}%
                          </span>
                          <span className="flex items-center gap-1">
                            <ExternalLink className="size-3" aria-hidden="true" />
                            {finding.page}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#56616C]">
                          {finding.evidence}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case "report":
        return (
          <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#DDE3E7] bg-[#F4F6F7]/60 pb-4">
              <CardTitle className="flex items-center gap-2 text-base text-[#111820]">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                  <FileBarChart className="size-4 text-[#2563EB]" aria-hidden="true" />
                </span>
                Branded report generated
              </CardTitle>
              <CardDescription className="text-sm text-[#56616C]">
                White-label report ready for client delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-lg border border-[#DDE3E7] bg-[#F4F6F7] p-6">
                {/* Report header mock */}
                <div className="rounded-md border border-[#DDE3E7] bg-white p-5">
                  <div className="flex items-center justify-between border-b border-[#DDE3E7] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-md bg-[#142634]">
                        <BarChart3 className="size-4 text-[#B7DDEC]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#111820]">Northstar Digital</p>
                        <p className="text-[10px] text-[#56616C]">Website Audit Report</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-[#111820]">Meridian Health Group</p>
                      <p className="text-[10px] text-[#56616C]">meridianhealth.example</p>
                    </div>
                  </div>
                  {/* Score */}
                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="flex size-16 items-center justify-center rounded-full border-4 border-[#B43C3C]"
                        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <span className="text-xl font-bold text-[#B43C3C]">47</span>
                      </motion.div>
                      <span className="mt-1 text-[10px] font-medium text-[#56616C]">Overall Score</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {[
                        { label: "Technical", score: 78, color: "#24584F" },
                        { label: "SEO", score: 45, color: "#B7791F" },
                        { label: "Performance", score: 62, color: "#2563EB" },
                        { label: "Mobile", score: 54, color: "#B7791F" },
                        { label: "Accessibility", score: 38, color: "#B43C3C" },
                        { label: "Conversion", score: 41, color: "#B43C3C" },
                      ].map((c) => (
                        <div key={c.label} className="flex items-center gap-1.5">
                          <div
                            className="size-2 shrink-0 rounded-full"
                            style={{ backgroundColor: c.color }}
                            aria-hidden="true"
                          />
                          <span className="text-[10px] text-[#56616C]">{c.label}</span>
                          <span className="text-[10px] font-bold" style={{ color: c.color }}>{c.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="border-[#DDE3E7] text-[10px] text-[#56616C]">
                      PDF export
                    </Badge>
                    <Badge variant="outline" className="border-[#DDE3E7] text-[10px] text-[#56616C]">
                      Secure share link
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "proposal":
        return (
          <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#DDE3E7] bg-[#F4F6F7]/60 pb-4">
              <CardTitle className="flex items-center gap-2 text-base text-[#111820]">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                  <FileText className="size-4 text-[#2563EB]" aria-hidden="true" />
                </span>
                Proposal generated
              </CardTitle>
              <CardDescription className="text-sm text-[#56616C]">
                Findings automatically converted into a scoped proposal.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-lg border border-[#DDE3E7] bg-[#F4F6F7] p-6">
                <div className="rounded-md border border-[#DDE3E7] bg-white p-5">
                  <div className="flex items-center justify-between border-b border-[#DDE3E7] pb-3">
                    <div>
                      <p className="text-sm font-bold text-[#111820]">Website Improvement Proposal</p>
                      <p className="text-xs text-[#56616C]">Prepared for Meridian Health Group by Northstar Digital</p>
                    </div>
                    <Badge className="bg-[#2563EB] text-white border-0 text-[10px]">Draft</Badge>
                  </div>
                  <motion.div
                    className="mt-4 space-y-3"
                    variants={contentRevealVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {PROPOSAL_ITEMS.map((item) => (
                      <motion.div
                        key={item.service}
                        variants={contentChildVariants}
                        className="flex items-start justify-between gap-3 rounded-md border border-[#DDE3E7] p-3 transition-shadow hover:shadow-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#111820]">{item.service}</p>
                          <p className="text-xs text-[#56616C]">{item.scope}</p>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-[#111820]">{item.price}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#DDE3E7] pt-3">
                    <span className="text-sm font-bold text-[#111820]">Total investment</span>
                    <span className="text-lg font-bold text-[#2563EB]">$19,700</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "pipeline":
        return (
          <Card className="border-[#DDE3E7] shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[#DDE3E7] bg-[#F4F6F7]/60 pb-4">
              <CardTitle className="flex items-center gap-2 text-base text-[#111820]">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#EFF8FC]">
                  <TrendingUp className="size-4 text-[#2563EB]" aria-hidden="true" />
                </span>
                Opportunity pipeline
              </CardTitle>
              <CardDescription className="text-sm text-[#56616C]">
                Track the opportunity from proposal to close.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-lg border border-[#DDE3E7] bg-[#F4F6F7] p-6">
                {/* Pipeline columns */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Qualified", count: 1, active: true },
                    { label: "Proposal Sent", count: 0, active: false },
                    { label: "Closed Won", count: 0, active: false },
                  ].map((col) => (
                    <div
                      key={col.label}
                      className={`rounded-md border p-3 transition-all duration-200 ${
                        col.active
                          ? "border-[#2563EB] bg-[#EFF8FC] shadow-sm"
                          : "border-[#DDE3E7] bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#56616C]">{col.label}</span>
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#DDE3E7] text-[10px] font-bold text-[#56616C]">
                          {col.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Opportunity card */}
                <div className="mt-4 rounded-md border border-[#DDE3E7] bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-md bg-[#142634]">
                          <Users className="size-4 text-[#B7DDEC]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#111820]">Meridian Health Group</p>
                          <p className="text-xs text-[#56616C]">Website improvement engagement</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-[#B7DDEC] text-[#2563EB] text-[10px]">
                          <DollarSign className="size-3 mr-0.5" aria-hidden="true" />
                          $19,700
                        </Badge>
                        <Badge variant="outline" className="border-[#DDE3E7] text-[#56616C] text-[10px]">
                          <AlertTriangle className="size-3 mr-0.5" aria-hidden="true" />
                          23 findings
                        </Badge>
                        <Badge variant="outline" className="border-[#DDE3E7] text-[#56616C] text-[10px]">
                          <Clock className="size-3 mr-0.5" aria-hidden="true" />
                          4 services
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="size-5 shrink-0 text-[#56616C]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const stepProgress = ((activeStepIdx + 1) / DEMO_STEPS.length) * 100;

  return (
    <section id="demo" className="bg-white" ref={sectionRef}>
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            See WinterVell in action
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Walk through a complete audit-to-proposal workflow with demonstration data.
          </p>
          {/* Demo badge */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B7791F]/40 bg-[#B7791F]/10 px-4 py-1.5 text-[#B7791F] shadow-sm">
              <Info className="size-4 shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide">
                Demonstration data — fictional
              </span>
              <span className="text-[10px] font-medium text-[#B7791F]/80">
                No real company or audit
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Tabs + controls */}
        <div
          className="mt-12 sm:mt-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Tabs value={activeStep} onValueChange={goToStep}>
            {/* Step tabs with connectors and glowing active state */}
            <TabsList className="h-auto w-full justify-center gap-0 rounded-none bg-transparent p-0">
              <div className="overflow-x-auto pb-2">
                <div className="mx-auto flex w-max min-w-full lg:w-full items-center justify-center">
                {DEMO_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = step.id === activeStep;
                  const isCompleted = i < activeStepIdx;
                  const isLast = i === DEMO_STEPS.length - 1;
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className="relative">
                        <TabsTrigger
                          value={step.id}
                          className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#111820] text-[#56616C] rounded-lg whitespace-nowrap transition-all duration-200"
                        >
                          <span
                            className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                              isActive
                                ? "bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/30"
                                : isCompleted
                                  ? "bg-[#24584F] text-white"
                                  : "bg-[#DDE3E7] text-[#56616C]"
                            }`}
                          >
                            {isCompleted && !isActive ? (
                              <CheckCircle2 className="size-3" aria-hidden="true" />
                            ) : (
                              i + 1
                            )}
                          </span>
                          <Icon className={`size-3.5 transition-colors duration-200 ${isActive ? "text-[#2563EB]" : "text-[#56616C]"}`} aria-hidden="true" />
                          <span className="hidden sm:inline">{step.label}</span>
                          {/* Active step glow */}
                          {isActive && !prefersReducedMotion && (
                            <motion.div
                              className="absolute inset-0 rounded-lg pointer-events-none"
                              layoutId="activeStepGlow"
                              style={{
                                boxShadow: "0 0 0 1px rgba(37, 99, 235, 0.3), 0 0 8px rgba(37, 99, 235, 0.12), 0 0 16px rgba(37, 99, 235, 0.06)",
                              }}
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                        </TabsTrigger>
                        {/* Active indicator dot below the tab */}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                            layoutId="activeTabDot"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <div className="size-1.5 rounded-full bg-[#2563EB]" />
                          </motion.div>
                        )}
                      </div>
                      {/* Animated connector lines between steps */}
                      {!isLast && (
                        <StepConnector
                          active={isActive}
                          completed={isCompleted}
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            </TabsList>
          </Tabs>

          {/* Controls row: prev / step indicator + progress / play-pause / next */}
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous step"
                className="flex size-9 items-center justify-center rounded-full border border-[#DDE3E7] bg-white text-[#56616C] shadow-sm transition-all duration-200 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next step"
                className="flex size-9 items-center justify-center rounded-full border border-[#DDE3E7] bg-white text-[#56616C] shadow-sm transition-all duration-200 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Step indicator + progress bar */}
            <div className="flex flex-1 flex-col items-center gap-1.5 px-2 sm:px-6" aria-live="polite">
              <div className="flex items-center gap-2 text-xs font-medium text-[#56616C]">
                <span>
                  Step{" "}
                  <span className="font-bold text-[#111820]">{activeStepIdx + 1}</span>
                  {" "}of{" "}
                  <span className="font-bold text-[#111820]">{DEMO_STEPS.length}</span>
                </span>
                <span className="text-[#DDE3E7]">·</span>
                <span className="font-semibold text-[#111820]">
                  {DEMO_STEPS[activeStepIdx].label}
                </span>
              </div>
              {/* Enhanced progress bar with glow */}
              <div className="relative h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[#F4F6F7]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#5B8DEF]"
                  initial={false}
                  animate={{ width: `${stepProgress}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                {/* Glowing tip on progress bar */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute top-0 h-full w-3 rounded-full"
                    style={{
                      left: `calc(${stepProgress}% - 6px)`,
                      background: "radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)",
                      filter: "blur(2px)",
                    }}
                    initial={false}
                    animate={{ left: `calc(${stepProgress}% - 6px)` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                )}
              </div>
            </div>

            {/* Play / pause button with enhanced visual feedback */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? "Pause auto-advance" : "Play auto-advance"}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 ${
                isPlaying
                  ? "border-[#2563EB]/30 bg-[#EFF8FC] text-[#2563EB] hover:bg-[#2563EB]/10"
                  : "border-[#DDE3E7] bg-white text-[#56616C] hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="size-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
              {/* Playing indicator dot with pulse */}
              {isPlaying && (
                <motion.span
                  className="size-1.5 rounded-full bg-[#2563EB]"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {/* Auto-advance progress bar with glow effect */}
          <div className="relative mt-3 h-0.5 w-full overflow-hidden rounded-full bg-[#F4F6F7]">
            {isPlaying && !isHovered && !prefersReducedMotion && inView ? (
              <motion.div
                key={`${activeStep}-autoplay`}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #2563EB, #B7DDEC)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
              />
            ) : null}
            {/* Subtle glow on the auto-advance bar */}
            {isPlaying && !isHovered && !prefersReducedMotion && inView && (
              <motion.div
                key={`${activeStep}-autoplay-glow`}
                className="absolute top-0 h-full w-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)",
                  filter: "blur(3px)",
                }}
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
              />
            )}
          </div>

          {/* Step content with enhanced slide/fade/blur transitions */}
          <div className="mt-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderStep(activeStep)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Keyboard hint */}
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-[#3F4A55]">
            <span className="font-medium">Keyboard:</span>
            <kbd className="rounded border border-[#DDE3E7] bg-[#F4F6F7] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#111820] shadow-sm">←</kbd>
            <kbd className="rounded border border-[#DDE3E7] bg-[#F4F6F7] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#111820] shadow-sm">→</kbd>
            <span>navigate ·</span>
            <kbd className="rounded border border-[#DDE3E7] bg-[#F4F6F7] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#111820] shadow-sm">Space</kbd>
            <span>play/pause</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
