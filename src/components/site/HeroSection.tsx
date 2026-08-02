"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Loader2,
  FileSearch,
  FileBarChart,
  FileText,
  TrendingUp,
  ArrowRight,
  Search,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WORKFLOW_STEPS = [
  { icon: Globe, label: "URL entered" },
  { icon: Loader2, label: "Audit running" },
  { icon: FileSearch, label: "Evidence collected" },
  { icon: FileBarChart, label: "Report generated" },
  { icon: FileText, label: "Proposal created" },
  { icon: TrendingUp, label: "Opportunity added to pipeline" },
] as const;

/* ── Typing animation hook ──────────────────────────────────────── */
function useTypingEffect(text: string, speed = 50, startDelay = 800) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, prefersReducedMotion]);

  return { displayed, done };
}

/* ── Seeded random for SSR consistency ─────────────────────────── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ── Floating particles ─────────────────────────────────────────── */
function FloatingParticles({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const particles = useMemo(() => {
    if (prefersReducedMotion) return [];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 13 + 3) * 100,
      size: seededRandom(i * 3 + 5) * 3 + 1.5,
      duration: seededRandom(i * 11 + 7) * 8 + 10,
      delay: seededRandom(i * 5 + 2) * 5,
      opacity: seededRandom(i * 9 + 4) * 0.3 + 0.1,
    }));
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#B7DDEC]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Animation variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const mobileStepVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [url, setUrl] = useState("");
  const [auditStarted, setAuditStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  /* Typing animation for the tagline */
  const tagline = "Own the code. Use your domain. Keep the client revenue.";
  const { displayed: typedTagline, done: typingDone } = useTypingEffect(tagline, 35, 2200);

  const motionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.2 }, variants: containerVariants };

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setAuditStarted(true);
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= WORKFLOW_STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F6F7] via-white to-white"
    >
      {/* ── Animated gradient shimmer ────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -inset-[50%] origin-center"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(183, 221, 236, 0.15) 60deg, transparent 120deg, rgba(37, 99, 235, 0.08) 200deg, transparent 280deg, rgba(183, 221, 236, 0.1) 340deg, transparent 360deg)",
          }}
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ── Subtle dot grid background ──────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, #DDE3E7 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Diagonal line pattern ───────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #142634 0,
            #142634 1px,
            transparent 1px,
            transparent 20px
          )`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* ── Glacier glow accent ─────────────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-0 -z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #B7DDEC 0%, transparent 70%)" }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.28, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* ── Secondary glow accent (bottom-right) ────────────────── */}
      <motion.div
        className="absolute -right-32 bottom-0 h-[300px] w-[300px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.16, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />

      {/* ── Floating particles ──────────────────────────────────── */}
      <FloatingParticles prefersReducedMotion={prefersReducedMotion} />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {/* ── Text content ───────────────────────────────────────── */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          {...motionProps}
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants} className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B7DDEC] bg-[#EFF8FC] px-3 py-1 text-xs font-medium text-[#142634]">
              <Sparkles className="size-3 text-[#2563EB]" aria-hidden="true" />
              Founding release — source-code licence available
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-[#111820] sm:text-5xl lg:text-6xl"
          >
            Turn any website into a{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-[#2563EB] to-[#142634] bg-clip-text text-transparent">
                sales-ready audit.
              </span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-3 -z-0 bg-[#B7DDEC]/40 origin-left"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-relaxed text-[#3F4A55] sm:text-xl"
          >
            WinterVell gives agencies a white-label audit engine, report builder,
            proposal generator and prospect pipeline they can deploy under their
            own brand.
          </motion.p>

          {/* Typing tagline */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-base font-semibold text-[#142634] min-h-[1.75rem]"
          >
            {typedTagline}
            {!typingDone && !prefersReducedMotion && (
              <motion.span
                className="inline-block w-[2px] h-[1em] ml-0.5 align-middle bg-[#2563EB]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                aria-hidden="true"
              />
            )}
          </motion.p>

          {/* Interactive URL input */}
          <motion.form
            variants={fadeUpVariants}
            onSubmit={handleStartAudit}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <Globe
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#56616C]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a website URL to audit..."
                aria-label="Website URL to audit"
                className="h-12 w-full rounded-lg border border-[#DDE3E7] bg-white pl-10 pr-4 text-sm text-[#111820] shadow-sm transition-all placeholder:text-[#8899A6] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 hover:border-[#B7DDEC]"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 text-base font-semibold bg-[#142634] text-white hover:bg-[#1A3A4A] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Search className="mr-2 size-4" aria-hidden="true" />
              Start audit
            </Button>
          </motion.form>
          <motion.p variants={fadeUpVariants} className="mt-2 text-xs text-[#56616C]">
            Try it — this is a demonstration. No real audit will run.
          </motion.p>

          {/* ── CTAs with glowing primary ────────────────────────── */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* Primary CTA with glow */}
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#B7DDEC] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-60 group-focus-within:opacity-60" aria-hidden="true" />
              <motion.div
                className="absolute -inset-0.5 rounded-xl opacity-0 blur-md"
                style={{ background: "linear-gradient(135deg, #2563EB, #B7DDEC)" }}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0, 0.3, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <Button
                size="lg"
                className="relative h-12 px-8 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                asChild
              >
                <a href="#demo">
                  Explore the live demo
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Secondary CTA */}
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-semibold border-[#DDE3E7] bg-white text-[#142634] hover:bg-[#F4F6F7] hover:text-[#111820] hover:border-[#2563EB] transition-all"
              asChild
            >
              <a href="#pricing">Buy the source licence</a>
            </Button>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-4">
            <a
              href="#report"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded-sm group"
            >
              View a sample client report
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-sm text-[#3F4A55]"
          >
            Full source code &middot; Self-hosted &middot; White-label ready &middot; Commercial agency use
          </motion.p>
        </motion.div>

        {/* ── Workflow visual ──────────────────────────────────────── */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {/* Audit status banner */}
          <AnimatePresence>
            {auditStarted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-lg border border-[#B7DDEC] bg-[#EFF8FC] px-4 py-2.5 text-sm text-[#142634]">
                  <Loader2 className="size-4 animate-spin text-[#2563EB]" aria-hidden="true" />
                  <span>
                    Auditing <strong className="font-semibold">{url}</strong> — step {activeStep + 1} of {WORKFLOW_STEPS.length}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Desktop: horizontal layout ─────────────────────────── */}
          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between">
              {/* Connecting line */}
              <div className="absolute left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] top-[38px] h-px bg-[#DDE3E7]" aria-hidden="true" />
              {/* Animated progress line */}
              <motion.div
                className="absolute left-[calc(8.33%+20px)] top-[38px] h-px bg-gradient-to-r from-[#2563EB] to-[#B7DDEC]"
                initial={{ width: "0%" }}
                animate={{
                  width: auditStarted
                    ? `calc(${(activeStep / (WORKFLOW_STEPS.length - 1)) * 100}% - ${100 / 6}%)`
                    : "0%",
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                aria-hidden="true"
              />

              {WORKFLOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = auditStarted && i === activeStep;
                const isComplete = auditStarted && i < activeStep;
                return (
                  <motion.div
                    key={step.label}
                    variants={stepVariants}
                    className="relative z-10 flex flex-col items-center"
                    style={{ width: `${100 / 6}%` }}
                  >
                    {/* Step circle */}
                    <motion.div
                      className={`flex size-10 items-center justify-center rounded-lg border shadow-sm transition-colors duration-300 ${
                        isActive
                          ? "border-[#2563EB] bg-[#2563EB] text-white shadow-md"
                          : isComplete
                          ? "border-[#24584F] bg-[#24584F] text-white"
                          : "border-[#DDE3E7] bg-white text-[#2563EB]"
                      }`}
                      animate={
                        isActive && !prefersReducedMotion
                          ? { scale: [1, 1.1, 1] }
                          : isComplete
                          ? { scale: 1 }
                          : {}
                      }
                      transition={{ duration: 0.4 }}
                    >
                      {isComplete ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check className="size-5" aria-hidden="true" />
                        </motion.div>
                      ) : isActive ? (
                        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                      ) : (
                        <Icon className="size-5" aria-hidden="true" />
                      )}
                    </motion.div>

                    {/* Step label */}
                    <motion.p
                      className={`mt-3 text-center text-xs font-medium leading-snug max-w-[120px] transition-colors ${
                        isActive ? "text-[#2563EB]" : "text-[#111820]"
                      }`}
                      animate={isActive && !prefersReducedMotion ? { y: [0, -2, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {step.label}
                    </motion.p>

                    {/* Pulse ring for active step */}
                    {isActive && !prefersReducedMotion && (
                      <motion.div
                        className="absolute top-0 size-10 rounded-lg border-2 border-[#2563EB]/30"
                        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        aria-hidden="true"
                      />
                    )}

                    {i < WORKFLOW_STEPS.length - 1 && (
                      <ArrowRight
                        className="absolute -right-3 top-[30px] size-3.5 text-[#B7DDEC]"
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile / Tablet: 2-column grid ─────────────────────── */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {WORKFLOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = auditStarted && i === activeStep;
                const isComplete = auditStarted && i < activeStep;
                return (
                  <motion.div
                    key={step.label}
                    variants={mobileStepVariants}
                    className={`relative flex items-start gap-3 rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 overflow-hidden ${
                      isActive ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : "border-[#DDE3E7]"
                    }`}
                  >
                    {/* Active shimmer background */}
                    {isActive && !prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 via-[#B7DDEC]/10 to-[#2563EB]/5"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                      />
                    )}

                    <div
                      className={`relative flex size-9 shrink-0 items-center justify-center rounded-md transition-colors ${
                        isActive
                          ? "bg-[#2563EB] text-white"
                          : isComplete
                          ? "bg-[#24584F] text-white"
                          : "bg-[#EFF8FC] text-[#2563EB]"
                      }`}
                    >
                      {isComplete ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check className="size-4" aria-hidden="true" />
                        </motion.div>
                      ) : isActive ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Icon className="size-4" aria-hidden="true" />
                      )}
                    </div>
                    <div className="relative flex flex-col">
                      <span className="text-xs font-semibold text-[#56616C]">
                        Step {i + 1}
                      </span>
                      <span className="text-sm font-medium text-[#111820] leading-snug">
                        {step.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
