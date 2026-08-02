"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Eye,
  Code2,
  CreditCard,
  Rocket,
  Palette,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { commercial } from "@/config/commercial";

/* ─── Timeline steps ─── */
const TIMELINE_STEPS = [
  {
    icon: Eye,
    title: "Evaluate the demo",
    description:
      "Explore the live demo, review sample reports, and verify the product meets your requirements before committing.",
    accentColor: "#2563EB",
  },
  {
    icon: Code2,
    title: "Review the code",
    description:
      "Inspect the architecture, security controls, and deployment documentation. Due-diligence materials are available upfront.",
    accentColor: "#24584F",
  },
  {
    icon: CreditCard,
    title: "Purchase a licence",
    description:
      "Choose Agency, Studio, or Enterprise. Receive source-code delivery, deployment docs, and a buyer handover checklist.",
    accentColor: "#B7791F",
  },
  {
    icon: Rocket,
    title: "Deploy to your infrastructure",
    description:
      "Clone the repository, configure your environment, and deploy on Vercel, Docker, or any Node.js-compatible host.",
    accentColor: "#2563EB",
  },
  {
    icon: Palette,
    title: "Configure your brand",
    description:
      "Apply your logo, colours, and domain. Full client-facing white labelling means your clients never see the WinterVell name.",
    accentColor: "#24584F",
  },
  {
    icon: TrendingUp,
    title: "Start selling audits",
    description:
      "Run unlimited audits, generate branded reports, create proposals, and build your prospect pipeline under your own brand.",
    accentColor: "#B7791F",
  },
] as const;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─── Desktop Timeline Step ─── */
function DesktopStep({
  step,
  index,
  isInView,
  totalSteps,
}: {
  step: (typeof TIMELINE_STEPS)[number];
  index: number;
  isInView: boolean;
  totalSteps: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = step.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      variants={stepVariants}
      className="relative flex items-center"
    >
      {/* The step card — alternating left/right */}
      <div className={cn("w-[calc(50%-32px)]", isLeft ? "pr-8 text-right" : "pl-8 ml-auto")}>
        <div
          className={cn(
            "group relative rounded-xl border border-[#DDE3E7] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#B7DDEC]/40 hover:-translate-y-0.5",
          )}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
            style={{
              boxShadow: `0 0 30px ${step.accentColor}15, 0 0 60px ${step.accentColor}08`,
            }}
            aria-hidden="true"
          />

          <div className={cn("flex items-start gap-3", isLeft && "flex-row-reverse")}>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#111820]">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#3F4A55]">{step.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Center number badge */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <div
          className="flex size-12 items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: step.accentColor }}
        >
          <span className="text-sm font-bold text-white">{index + 1}</span>
        </div>
      </div>

      {/* Empty space on the other side */}
      <div className={cn("w-[calc(50%-32px)]", isLeft ? "pl-8" : "pr-8")} />
    </motion.div>
  );
}

/* ─── Mobile Timeline Step ─── */
function MobileStep({
  step,
  index,
  isInView,
  isLast,
}: {
  step: (typeof TIMELINE_STEPS)[number];
  index: number;
  isInView: boolean;
  isLast: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = step.icon;

  return (
    <motion.div variants={stepVariants} className="relative flex gap-4">
      {/* Left: number badge + connecting line */}
      <div className="flex flex-col items-center">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: step.accentColor }}
        >
          <span className="text-xs font-bold text-white">{index + 1}</span>
        </div>
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-gradient-to-b from-[#2563EB]/30 to-[#B7DDEC]/30"
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
            style={{ originY: 0 }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Right: card */}
      <div className="flex-1 pb-6">
        <div className="group rounded-xl border border-[#DDE3E7] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#B7DDEC]/40">
          <div className="flex items-start gap-3">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${step.accentColor}10` }}
            >
              <Icon className="size-4" style={{ color: step.accentColor }} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[#111820]">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#3F4A55]">{step.description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.1 },
        variants: containerVariants,
      };

  return (
    <section id="process" className="bg-[#F4F6F7] relative overflow-hidden">
      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #DDE3E7 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <motion.div
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 relative"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DDE3E7] bg-white px-3 py-1 mb-4 shadow-sm">
            <TrendingUp className="size-3.5 text-[#2563EB]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#3F4A55]">Buyer journey</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            From evaluation to revenue
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#3F4A55]">
            Six steps from your first demo visit to selling audits under your own brand. No hidden phases, no surprises.
          </p>
        </motion.div>

        {/* Desktop: alternating timeline with center line */}
        <div className="mt-12 hidden lg:block sm:mt-16">
          <motion.div variants={containerVariants} className="relative">
            {/* Animated center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" aria-hidden="true">
              <motion.div
                className="w-full bg-gradient-to-b from-[#2563EB] via-[#24584F] to-[#B7DDEC] origin-top"
                initial={prefersReducedMotion ? false : { scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ height: "100%" }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-10">
              {TIMELINE_STEPS.map((step, i) => (
                <DesktopStep
                  key={step.title}
                  step={step}
                  index={i}
                  isInView={isInView}
                  totalSteps={TIMELINE_STEPS.length}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tablet: horizontal scrolling timeline */}
        <div className="mt-12 hidden md:block lg:hidden sm:mt-16">
          <motion.div variants={containerVariants} className="relative">
            {/* Horizontal connecting line */}
            <div className="absolute left-0 right-0 top-6 h-px" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563EB] via-[#24584F] to-[#B7DDEC] origin-left"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                style={{ width: "100%" }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {TIMELINE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.title} variants={stepVariants} className="relative pt-8">
                    {/* Number badge */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 flex size-12 items-center justify-center rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: step.accentColor }}
                    >
                      <span className="text-sm font-bold text-white">{i + 1}</span>
                    </div>

                    {/* Card */}
                    <div className="group rounded-xl border border-[#DDE3E7] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#B7DDEC]/40 hover:-translate-y-0.5">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="flex size-7 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${step.accentColor}10` }}
                        >
                          <Icon className="size-3.5" style={{ color: step.accentColor }} aria-hidden="true" />
                        </div>
                        <h3 className="text-xs font-semibold text-[#111820]">{step.title}</h3>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#3F4A55]">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-12 lg:hidden md:hidden sm:mt-16">
          <motion.div variants={containerVariants} className="space-y-0">
            {TIMELINE_STEPS.map((step, i) => (
              <MobileStep
                key={step.title}
                step={step}
                index={i}
                isInView={isInView}
                isLast={i === TIMELINE_STEPS.length - 1}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div variants={headingVariants} className="mt-12 text-center sm:mt-16">
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-[#2563EB]/20"
          >
            Get started with a source-code licence
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs text-[#56616C]">
            Evaluate the demo first — no commitment required.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
