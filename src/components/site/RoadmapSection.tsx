"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Loader2,
  Zap,
  Layers,
  Crown,
} from "lucide-react";
import { useRef } from "react";

/* ─── Roadmap data ─── */
const PHASES = [
  {
    phase: 1,
    label: "Current",
    icon: Zap,
    progress: 35,
    color: "#24584F",
    bgColor: "bg-[#24584F]/10",
    modules: [
      { name: "Audit engine", status: "in_progress" as const },
      { name: "Evidence model", status: "in_progress" as const },
      { name: "Scoring", status: "in_progress" as const },
      { name: "Manual review", status: "in_progress" as const },
    ],
  },
  {
    phase: 2,
    label: "Next",
    icon: Layers,
    progress: 10,
    color: "#2563EB",
    bgColor: "bg-[#2563EB]/10",
    modules: [
      { name: "Report builder", status: "in_progress" as const },
      { name: "PDF generation", status: "planned" as const },
      { name: "Proposal generator", status: "planned" as const },
      { name: "Pipeline", status: "planned" as const },
    ],
  },
  {
    phase: 3,
    label: "Planned",
    icon: Crown,
    progress: 0,
    color: "#3F4A55",
    bgColor: "bg-[#3F4A55]/10",
    modules: [
      { name: "White-labelling", status: "planned" as const },
      { name: "Service catalogue", status: "planned" as const },
      { name: "Licensing system", status: "planned" as const },
      { name: "Multi-brand", status: "planned" as const },
    ],
  },
] as const;

/* ─── Module status icon ─── */
function ModuleStatus({ status }: { status: "in_progress" | "planned" }) {
  if (status === "in_progress") {
    return <Loader2 className="size-3.5 shrink-0 animate-spin text-[#B7791F]" aria-hidden="true" />;
  }
  return <Circle className="size-3.5 shrink-0 text-[#3F4A55]/30" aria-hidden="true" />;
}

/* ─── Progress bar ─── */
function ProgressBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="h-2 w-full overflow-hidden rounded-full bg-[#DDE3E7]">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={prefersReducedMotion ? { width: `${value}%` } : { width: 0 }}
        animate={isInView || prefersReducedMotion ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

/* ─── Phase card ─── */
function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof PHASES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const Icon = phase.icon;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        transition: { duration: 0.5, ease: "easeOut" as const, delay: index * 0.15 },
      };

  return (
    <motion.div
      ref={ref}
      className="group rounded-xl border border-[#DDE3E7] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      {...motionProps}
    >
      {/* Phase header */}
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-lg ${phase.bgColor}`}
        >
          <Icon className="size-5" style={{ color: phase.color }} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#3F4A55]/60">
            Phase {phase.phase}
          </p>
          <p className="text-sm font-semibold text-[#111820]">{phase.label}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-[#3F4A55]">Progress</span>
          <span className="font-semibold" style={{ color: phase.color }}>
            {phase.progress}%
          </span>
        </div>
        <div className="mt-1.5">
          <ProgressBar value={phase.progress} color={phase.color} />
        </div>
      </div>

      {/* Modules */}
      <ul className="mt-5 space-y-2.5" role="list">
        {phase.modules.map((mod) => (
          <li key={mod.name} className="flex items-center gap-2.5">
            <ModuleStatus status={mod.status} />
            <span className="text-sm text-[#3F4A55]">{mod.name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Component ─── */
export default function RoadmapSection() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.1 },
        variants: containerVariants,
      };

  return (
    <section id="roadmap" className="bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            What&apos;s being built
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#3F4A55]">
            Every module is tracked. No vaporware.
          </p>
        </motion.div>

        {/* Phase cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {PHASES.map((phase, index) => (
            <PhaseCard key={phase.phase} phase={phase} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
