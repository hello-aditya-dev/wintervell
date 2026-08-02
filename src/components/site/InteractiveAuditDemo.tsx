"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Search,
  Shield,
  Zap,
  Smartphone,
  Eye,
  Target,
  CheckCircle2,
  BookOpen,
  Bot,
  Loader2,
  Play,
  RotateCcw,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { commercial } from "@/config/commercial";

/* ─── Audit categories (9 categories matching the product) ─── */
const AUDIT_CATEGORIES = [
  { id: "technical", label: "Technical Health", icon: Shield, demoScore: 72 },
  { id: "seo", label: "SEO Foundations", icon: Search, demoScore: 45 },
  { id: "performance", label: "Performance", icon: Zap, demoScore: 64 },
  { id: "mobile", label: "Mobile Experience", icon: Smartphone, demoScore: 81 },
  { id: "accessibility", label: "Accessibility Indicators", icon: Eye, demoScore: 38 },
  { id: "conversion", label: "Conversion Clarity", icon: Target, demoScore: 55 },
  { id: "trust", label: "Trust Signals", icon: CheckCircle2, demoScore: 89 },
  { id: "content", label: "Content Structure", icon: BookOpen, demoScore: 52 },
  { id: "ai_visibility", label: "AI-Search Readiness", icon: Bot, demoScore: 31 },
] as const;

/* ─── Helpers ─── */
function getScoreColor(score: number): string {
  if (score > 70) return "#24584F"; // Pine / green
  if (score >= 40) return "#B7791F"; // Amber
  return "#B43C3C"; // Critical / red
}

function getScoreLabel(score: number): string {
  if (score > 70) return "Good";
  if (score >= 40) return "Needs work";
  return "Critical";
}

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ─── State machine ─── */
type AuditState = "idle" | "scanning" | "results";

export default function InteractiveAuditDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [url, setUrl] = useState("example.com");
  const [state, setState] = useState<AuditState>("idle");
  const [scannedCount, setScannedCount] = useState(0);
  const [visibleResults, setVisibleResults] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─── Clean up timers on unmount ─── */
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    };
  }, []);

  /* ─── Scanning progress: reveal categories one by one ─── */
  useEffect(() => {
    if (state !== "scanning") return;

    if (scannedCount < AUDIT_CATEGORIES.length) {
      scanTimerRef.current = setTimeout(() => {
        setScannedCount((prev) => prev + 1);
      }, prefersReducedMotion ? 100 : 400);
    } else {
      // All categories scanned — transition to results
      scanTimerRef.current = setTimeout(() => {
        setState("results");
        setVisibleResults(0);
      }, 600);
    }
  }, [state, scannedCount, prefersReducedMotion]);

  /* ─── Results: reveal score bars one by one ─── */
  useEffect(() => {
    if (state !== "results") return;

    if (visibleResults < AUDIT_CATEGORIES.length) {
      resultTimerRef.current = setTimeout(() => {
        setVisibleResults((prev) => prev + 1);
      }, prefersReducedMotion ? 80 : 300);
    }
  }, [state, visibleResults, prefersReducedMotion]);

  /* ─── Animate overall score ─── */
  useEffect(() => {
    if (state !== "results") return;
    const target = Math.round(
      AUDIT_CATEGORIES.reduce((sum, c) => sum + c.demoScore, 0) / AUDIT_CATEGORIES.length
    );
    if (overallScore < target) {
      const timer = setTimeout(() => {
        setOverallScore((prev) => Math.min(prev + 2, target));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [state, overallScore]);

  /* ─── Start audit ─── */
  const runAudit = useCallback(() => {
    setState("scanning");
    setScannedCount(0);
    setVisibleResults(0);
    setOverallScore(0);
  }, []);

  /* ─── Reset ─── */
  const reset = useCallback(() => {
    setState("idle");
    setScannedCount(0);
    setVisibleResults(0);
    setOverallScore(0);
  }, []);

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.1 },
        variants: containerVariants,
      };

  const progressPercent = (scannedCount / AUDIT_CATEGORIES.length) * 100;

  return (
    <section id="interactive-audit-demo" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Try the audit experience
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Enter a URL and watch a simulated 9-category audit run in real time. No real data is
            collected or analysed.
          </p>
          <Badge
            variant="outline"
            className="mt-3 border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px] font-medium"
          >
            This is a simulated demonstration — no real audit is performed
          </Badge>
        </motion.div>

        {/* Demo card */}
        <motion.div variants={cardVariants} className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <Card className="border-[#DDE3E7] shadow-lg overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              {/* URL input + button */}
              <motion.div variants={headingVariants} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#56616C]" aria-hidden="true" />
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter a website URL…"
                    disabled={state !== "idle"}
                    className="pl-9 h-11 border-[#DDE3E7] bg-white text-[#111820] placeholder:text-[#56616C]/60 focus-visible:ring-[#2563EB]/30"
                    aria-label="Website URL for demo audit"
                  />
                </div>
                {state === "idle" && (
                  <Button
                    onClick={runAudit}
                    disabled={!url.trim()}
                    className="h-11 bg-[#2563EB] text-white hover:bg-[#1d4ed8] gap-2 px-6"
                  >
                    <Play className="size-4" aria-hidden="true" />
                    Run Demo Audit
                  </Button>
                )}
                {state !== "idle" && (
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="h-11 border-[#DDE3E7] gap-2 px-6"
                  >
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Reset
                  </Button>
                )}
              </motion.div>

              {/* Scanning state */}
              <AnimatePresence mode="wait">
                {state === "scanning" && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    {/* Scanning header */}
                    <div className="flex items-center gap-2 mb-4">
                      <Loader2 className="size-4 animate-spin text-[#2563EB]" aria-hidden="true" />
                      <span className="text-sm font-semibold text-[#111820]">
                        Scanning {url || "example.com"}…
                      </span>
                      <span className="text-xs text-[#56616C] ml-auto">
                        {scannedCount}/{AUDIT_CATEGORIES.length} categories
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 w-full rounded-full bg-[#DDE3E7]/60 overflow-hidden mb-5">
                      <motion.div
                        className="h-full rounded-full bg-[#2563EB]"
                        initial={{ width: prefersReducedMotion ? `${progressPercent}%` : 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>

                    {/* Category scan list */}
                    <div className="space-y-2.5">
                      {AUDIT_CATEGORIES.map((cat, i) => {
                        const Icon = cat.icon;
                        const isScanned = i < scannedCount;
                        const isCurrent = i === scannedCount;
                        return (
                          <motion.div
                            key={cat.id}
                            initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : i * 0.03 }}
                            className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors ${
                              isCurrent
                                ? "border-[#2563EB]/30 bg-[#2563EB]/5"
                                : isScanned
                                  ? "border-[#24584F]/20 bg-[#24584F]/5"
                                  : "border-[#DDE3E7] bg-white"
                            }`}
                          >
                            <Icon
                              className={`size-4 ${
                                isCurrent
                                  ? "text-[#2563EB] animate-pulse"
                                  : isScanned
                                    ? "text-[#24584F]"
                                    : "text-[#56616C]/40"
                              }`}
                              aria-hidden="true"
                            />
                            <span
                              className={`text-sm ${
                                isCurrent
                                  ? "font-semibold text-[#2563EB]"
                                  : isScanned
                                    ? "text-[#111820]"
                                    : "text-[#56616C]/60"
                              }`}
                            >
                              {cat.label}
                            </span>
                            {isScanned && (
                              <CheckCircle2 className="ml-auto size-4 text-[#24584F]" aria-hidden="true" />
                            )}
                            {isCurrent && (
                              <Loader2 className="ml-auto size-4 animate-spin text-[#2563EB]" aria-hidden="true" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Results state */}
                {state === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    {/* Overall score */}
                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#DDE3E7] bg-white p-5">
                      <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#B7791F]/30 bg-[#B7791F]/5">
                        <span className="text-2xl font-bold text-[#B7791F]">{overallScore}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111820]">Overall Score</p>
                        <p className="text-xs text-[#56616C]">
                          Aggregated across {AUDIT_CATEGORIES.length} audit categories
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="ml-auto border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px] font-semibold"
                      >
                        Simulated
                      </Badge>
                    </div>

                    {/* Category results */}
                    <div className="space-y-3">
                      {AUDIT_CATEGORIES.map((cat, i) => {
                        const Icon = cat.icon;
                        const isVisible = i < visibleResults;
                        const color = getScoreColor(cat.demoScore);
                        const label = getScoreLabel(cat.demoScore);

                        return (
                          <AnimatePresence key={cat.id}>
                            {isVisible && (
                              <motion.div
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="rounded-lg border border-[#DDE3E7] bg-white p-4"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className="flex size-8 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: `${color}10` }}
                                  >
                                    <Icon className="size-4" style={{ color }} aria-hidden="true" />
                                  </div>
                                  <span className="text-sm font-semibold text-[#111820] flex-1">
                                    {cat.label}
                                  </span>
                                  <span
                                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                                    style={{ backgroundColor: color }}
                                  >
                                    {label}
                                  </span>
                                  <span className="text-sm font-bold tabular-nums" style={{ color }}>
                                    {cat.demoScore}/100
                                  </span>
                                </div>

                                {/* Score bar */}
                                <div className="mt-2.5 h-2 w-full rounded-full bg-[#DDE3E7]/60 overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: color }}
                                    initial={{ width: prefersReducedMotion ? `${cat.demoScore}%` : 0 }}
                                    animate={{ width: `${cat.demoScore}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.15 }}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        );
                      })}
                    </div>

                    {/* Disclaimer */}
                    <p className="mt-5 text-center text-xs text-[#56616C]">
                      This is a simulated demonstration with fixed scores. No real audit is performed,
                      no data is collected, and no network requests are made.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Idle state placeholder */}
              {state === "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#DDE3E7] bg-white/50 py-12"
                >
                  <Search className="size-8 text-[#56616C]/30 mb-3" aria-hidden="true" />
                  <p className="text-sm text-[#56616C]">
                    Enter a URL above and click &ldquo;Run Demo Audit&rdquo; to see the simulated scan
                  </p>
                  <p className="mt-1 text-xs text-[#56616C]/60">
                    No real data is collected or analysed
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
