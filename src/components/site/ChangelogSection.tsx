"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { CheckCircle2, Loader2, Circle, Calendar } from "lucide-react";
import { useRef } from "react";

/* ─── Timeline data ─── */
const TIMELINE_ENTRIES = [
  {
    date: "2026-08-02",
    title: "Foundation release",
    description:
      "Repository, branding, legal scaffold, central configuration, documentation.",
    status: "complete" as const,
  },
  {
    date: "2026-08-02",
    title: "Commercial website",
    description:
      "Full public-facing website with 19 sections, interactive demo, pricing, and due diligence.",
    status: "complete" as const,
  },
  {
    date: null,
    title: "Audit engine",
    description:
      "Technical, SEO, accessibility, conversion, trust, and AI-visibility audit categories with evidence-backed findings.",
    status: "in_progress" as const,
  },
  {
    date: null,
    title: "Report builder",
    description:
      "PDF generation, branded reports, executive summaries, and implementation roadmaps.",
    status: "in_progress" as const,
  },
  {
    date: null,
    title: "Proposal generator",
    description:
      "Scope items, deliverables, pricing, acceptance criteria, and secure sharing.",
    status: "planned" as const,
  },
] as const;

/* ─── Status icon helper ─── */
function StatusIcon({ status }: { status: (typeof TIMELINE_ENTRIES)[number]["status"] }) {
  switch (status) {
    case "complete":
      return (
        <div className="flex size-8 items-center justify-center rounded-full bg-[#24584F]/15">
          <CheckCircle2 className="size-4.5 text-[#24584F]" aria-hidden="true" />
        </div>
      );
    case "in_progress":
      return (
        <div className="flex size-8 items-center justify-center rounded-full bg-[#B7791F]/15">
          <Loader2 className="size-4.5 animate-spin text-[#B7791F]" aria-hidden="true" />
        </div>
      );
    case "planned":
      return (
        <div className="flex size-8 items-center justify-center rounded-full bg-[#DDE3E7]/50">
          <Circle className="size-4.5 text-[#3F4A55]/40" aria-hidden="true" />
        </div>
      );
  }
}

/* ─── Status label ─── */
function StatusLabel({ status }: { status: (typeof TIMELINE_ENTRIES)[number]["status"] }) {
  switch (status) {
    case "complete":
      return (
        <span className="inline-flex items-center rounded-full bg-[#24584F]/10 px-2.5 py-0.5 text-xs font-medium text-[#24584F]">
          Complete
        </span>
      );
    case "in_progress":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#B7791F]/10 px-2.5 py-0.5 text-xs font-medium text-[#B7791F]">
          In progress
        </span>
      );
    case "planned":
      return (
        <span className="inline-flex items-center rounded-full bg-[#DDE3E7]/60 px-2.5 py-0.5 text-xs font-medium text-[#3F4A55]/60">
          Planned
        </span>
      );
  }
}

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─── Single timeline entry ─── */
function TimelineEntry({
  entry,
  index,
  isLast,
}: {
  entry: (typeof TIMELINE_ENTRIES)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -24 },
        animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 },
        transition: { duration: 0.45, ease: "easeOut" as const, delay: index * 0.1 },
      };

  return (
    <div ref={ref} className="relative flex gap-5" {...motionProps}>
      {/* Timeline rail */}
      <div className="relative flex flex-col items-center">
        <StatusIcon status={entry.status} />
        {!isLast && (
          <div
            className="mt-1.5 w-px flex-1 bg-[#DDE3E7]"
            style={{ minHeight: "2rem" }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-base font-semibold text-[#111820]">{entry.title}</h3>
          <StatusLabel status={entry.status} />
        </div>

        {entry.date && (
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#3F4A55]/70">
            <Calendar className="size-3" aria-hidden="true" />
            <time dateTime={entry.date}>
              {new Date(entry.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        )}

        <p className="mt-2 text-sm leading-relaxed text-[#3F4A55]">
          {entry.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Component ─── */
export default function ChangelogSection() {
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
    <section id="changelog" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Development timeline
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#3F4A55]">
            Transparent progress — no hidden development stages.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          className="mx-auto mt-12 max-w-2xl sm:mt-16"
        >
          {TIMELINE_ENTRIES.map((entry, index) => (
            <TimelineEntry
              key={entry.title}
              entry={entry}
              index={index}
              isLast={index === TIMELINE_ENTRIES.length - 1}
            />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={headingVariants} className="mt-10 text-center sm:mt-14">
          <p className="text-xs text-[#3F4A55]/60">
            Roadmap reflects the current development plan. Timelines may change.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
