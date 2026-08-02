"use client";

import { useState } from "react";
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

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [url, setUrl] = useState("");
  const [auditStarted, setAuditStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const motionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.2 }, variants: containerVariants };

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setAuditStarted(true);
    setActiveStep(0);
    // Cycle through steps to simulate the workflow
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
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, #DDE3E7 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Glacier glow accent */}
      <div
        className="absolute left-1/2 top-0 -z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #B7DDEC 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {/* Text content */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          {...motionProps}
        >
          <motion.div variants={fadeUpVariants} className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B7DDEC] bg-[#EFF8FC] px-3 py-1 text-xs font-medium text-[#142634]">
              <Sparkles className="size-3 text-[#2563EB]" aria-hidden="true" />
              Founding release — source-code licence available
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-[#111820] sm:text-5xl lg:text-6xl"
          >
            Turn any website into a{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-[#2563EB] to-[#142634] bg-clip-text text-transparent">
                sales-ready audit.
              </span>
              <span
                className="absolute bottom-1 left-0 right-0 h-3 -z-0 bg-[#B7DDEC]/40"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-relaxed text-[#3F4A55] sm:text-xl"
          >
            WinterVell gives agencies a white-label audit engine, report builder,
            proposal generator and prospect pipeline they can deploy under their
            own brand.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-base font-semibold text-[#142634]"
          >
            Own the code. Use your domain. Keep the client revenue.
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
                className="h-12 w-full rounded-lg border border-[#DDE3E7] bg-white pl-10 pr-4 text-sm text-[#111820] shadow-sm transition-colors placeholder:text-[#8899A6] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 text-base font-semibold bg-[#142634] text-white hover:bg-[#1A3A4A] shadow-sm"
            >
              <Search className="mr-2 size-4" aria-hidden="true" />
              Start audit
            </Button>
          </motion.form>
          <motion.p variants={fadeUpVariants} className="mt-2 text-xs text-[#56616C]">
            Try it — this is a demonstration. No real audit will run.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
              asChild
            >
              <a href="#demo">
                Explore the live demo
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </a>
            </Button>
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
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded-sm"
            >
              View a sample client report
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-sm text-[#3F4A55]"
          >
            Full source code &middot; Self-hosted &middot; White-label ready &middot; Commercial agency use
          </motion.p>
        </motion.div>

        {/* Workflow visual — becomes active when audit starts */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
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

          {/* Desktop: horizontal layout */}
          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between">
              {/* Connecting line */}
              <div className="absolute left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] top-[38px] h-px bg-[#DDE3E7]" aria-hidden="true" />
              {/* Progress line overlay */}
              <div
                className="absolute left-[calc(8.33%+20px)] top-[38px] h-px bg-[#2563EB] transition-all duration-500"
                style={{ width: auditStarted ? `calc(${(activeStep / (WORKFLOW_STEPS.length - 1)) * 100}% - ${100 / 6}%)` : "0%" }}
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
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg border shadow-sm transition-all duration-300 ${
                        isActive
                          ? "border-[#2563EB] bg-[#2563EB] text-white scale-110 shadow-md"
                          : isComplete
                          ? "border-[#24584F] bg-[#24584F] text-white"
                          : "border-[#DDE3E7] bg-white text-[#2563EB]"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="size-5" aria-hidden="true" />
                      ) : isActive ? (
                        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                      ) : (
                        <Icon className="size-5" aria-hidden="true" />
                      )}
                    </div>
                    <p className={`mt-3 text-center text-xs font-medium leading-snug max-w-[120px] transition-colors ${isActive ? "text-[#2563EB]" : "text-[#111820]"}`}>
                      {step.label}
                    </p>
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

          {/* Mobile / Tablet: 2-column grid */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {WORKFLOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = auditStarted && i === activeStep;
                const isComplete = auditStarted && i < activeStep;
                return (
                  <motion.div
                    key={step.label}
                    variants={stepVariants}
                    className={`flex items-start gap-3 rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 ${
                      isActive ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : "border-[#DDE3E7]"
                    }`}
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-md transition-colors ${
                        isActive
                          ? "bg-[#2563EB] text-white"
                          : isComplete
                          ? "bg-[#24584F] text-white"
                          : "bg-[#EFF8FC] text-[#2563EB]"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : isActive ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Icon className="size-4" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex flex-col">
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
