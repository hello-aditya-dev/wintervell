"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText } from "lucide-react";
import { motion, useInView } from "framer-motion";

const WORKFLOW_CARDS = [
  {
    label: "Prospect",
    title: "Meridian Health Group",
    detail: "meridianhealth.com",
    accent: "bg-primary-subtle text-primary",
  },
  {
    label: "Audit score",
    title: "64 / 100",
    detail: "9 categories reviewed",
    accent: "bg-[var(--severity-medium-bg)] text-[var(--severity-medium-text)]",
  },
  {
    label: "Priority finding",
    title: "Missing meta descriptions",
    detail: "High severity · 12 pages affected",
    accent: "bg-[var(--severity-high-bg)] text-[var(--severity-high-text)]",
  },
  {
    label: "Report",
    title: "Website Audit Report",
    detail: "Published · 24 pages",
    accent: "bg-[var(--success-subtle)] text-[var(--success)]",
  },
  {
    label: "Proposal",
    title: "SEO remediation project",
    detail: "$4,800 · 6 weeks",
    accent: "bg-primary-subtle text-primary",
  },
  {
    label: "Opportunity",
    title: "Proposal sent (Demo)",
    detail: "Stage 8 of 11",
    accent: "bg-[var(--info-subtle)] text-[var(--info)]",
  },
] as const;

const TRUST_METRICS = [
  { value: 9, suffix: "", label: "Audit categories" },
  { value: 11, suffix: "", label: "Pipeline stages" },
  { value: 6, suffix: "", label: "Product modules" },
  { value: 1, suffix: "", label: "Source code licence" },
];

function useAnimatedCounter(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || (isInView && !hasStarted.current)) {
      hasStarted.current = true;
      const startTime = Date.now();
      const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.round(eased * target));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isInView, target, duration, startOnView]);

  return { count, ref };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gradient orbs for depth */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[500px] rounded-full bg-[#24584F]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-6 text-xs">
              Product in development · Interactive demo available
            </Badge>
          </motion.div>
          <motion.h1
            className="text-h1 sm:text-display text-foreground"
            variants={itemVariants}
          >
            Turn website evidence into agency work.
          </motion.h1>
          <motion.p
            className="mt-6 text-body sm:text-h4 text-muted-foreground leading-relaxed"
            variants={itemVariants}
          >
            WinterVell is a white-label workspace for reviewing websites,
            organizing findings, producing client reports, preparing proposals
            and tracking the resulting opportunity.
          </motion.p>
          <motion.p
            className="mt-4 text-small text-[var(--text-tertiary)]"
            variants={itemVariants}
          >
            Source-code product in development · Interactive frontend demo ·
            Self-hosting planned · Commercial licensing planned
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            variants={itemVariants}
          >
            <Button size="lg" asChild className="glow-primary">
              <Link href="/app">
                Explore the product demo
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sample-report">
                <FileText className="mr-1 size-4" />
                View sample report
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero visual: 6 workflow cards with staggered animation */}
        <motion.div
          className="mt-16 overflow-x-auto scrollbar-wv"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="mx-auto flex min-w-[720px] max-w-5xl items-stretch gap-3">
            {WORKFLOW_CARDS.map((card, i) => (
              <motion.div key={card.label} className="flex items-stretch" variants={itemVariants}>
                <div className="flex w-[160px] flex-col rounded-lg border border-border bg-card/80 backdrop-blur-sm p-3 shadow-sm-wv transition-all duration-300 hover:shadow-md-wv hover:-translate-y-0.5 hover:border-primary/20">
                  <span
                    className={`inline-flex w-fit rounded-md px-1.5 py-0.5 text-[11px] font-medium ${card.accent}`}
                  >
                    {card.label}
                  </span>
                  <span className="mt-2 text-sm font-medium text-card-foreground leading-snug">
                    {card.title}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {card.detail}
                  </span>
                </div>
                {i < WORKFLOW_CARDS.length - 1 && (
                  <div className="flex items-center px-1">
                    <div className="h-px w-4 bg-border" />
                    <div className="size-1.5 rounded-full bg-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust metrics strip with animated counters */}
        <motion.div
          className="mt-16 mx-auto grid max-w-2xl grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {TRUST_METRICS.map((metric) => (
            <AnimatedMetric key={metric.label} value={metric.value} suffix={metric.suffix} label={metric.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedMetric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useAnimatedCounter(value, 1500);

  return (
    <motion.div ref={ref} className="text-center" variants={itemVariants}>
      <div className="text-h2 text-foreground tabular-nums">
        {count}{suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
