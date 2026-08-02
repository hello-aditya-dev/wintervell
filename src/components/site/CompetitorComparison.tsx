"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, X, Info, ShieldCheck, Code2, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { commercial } from "@/config/commercial";

/* ─── Comparison data ─── */
const COMPARISON_ROWS = [
  {
    category: "Source code included",
    wintervell: true,
    saas: false,
    explanation:
      "You receive the full source code, not a hosted subscription. Modify, extend, and audit every line.",
  },
  {
    category: "Self-hosted",
    wintervell: true,
    saas: false,
    explanation:
      "Deploy on your own infrastructure — Vercel, Docker, VPS, or any Node.js-compatible host. No vendor lock-in.",
  },
  {
    category: "White-label",
    wintervell: true,
    saas: false,
    explanation:
      "Full client-facing white labelling under your brand. The Studio licence also covers admin-area branding.",
  },
  {
    category: "One-time payment",
    wintervell: true,
    saas: false,
    explanation:
      "Pay once for a perpetual source-code licence. No recurring billing cycle, no annual commitment.",
  },
  {
    category: "Custom AI keys",
    wintervell: true,
    saas: false,
    explanation:
      "Bring your own OpenAI or Anthropic keys. You control AI costs directly — no markup, no middleman.",
  },
  {
    category: "No monthly fees",
    wintervell: true,
    saas: false,
    explanation:
      "Zero recurring platform fees. After purchase, your only costs are your own infrastructure and AI usage.",
  },
  {
    category: "Full data ownership",
    wintervell: true,
    saas: false,
    explanation:
      "All client data, audit results, and reports stay on your infrastructure. No data shared with third parties.",
  },
  {
    category: "Unlimited audits",
    wintervell: true,
    saas: false,
    explanation:
      "No per-audit caps or usage limits. Run as many audits as your business needs — you own the engine.",
  },
  {
    category: "Custom modifications",
    wintervell: true,
    saas: false,
    explanation:
      "Modify the source code for your internal business use. Add features, change workflows, tailor the platform.",
  },
] as const;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const tableVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/* ─── Check / X Cell ─── */
function ComparisonCell({ value, isWintervell }: { value: boolean; isWintervell: boolean }) {
  return (
    <span className="inline-flex items-center justify-center">
      {value ? (
        <span className="flex size-7 items-center justify-center rounded-full bg-[#24584F]/15">
          <Check className="size-4 text-[#24584F]" aria-hidden="true" />
        </span>
      ) : (
        <span className="flex size-7 items-center justify-center rounded-full bg-[#B43C3C]/10">
          <X className="size-4 text-[#B43C3C]" aria-hidden="true" />
        </span>
      )}
      <span className="sr-only">{value ? "Yes" : "No"}</span>
    </span>
  );
}

/* ─── Mobile card for each row ─── */
function MobileComparisonCard({
  row,
  index,
}: {
  row: (typeof COMPARISON_ROWS)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={rowVariants}
      className="group rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-4 transition-all duration-200 hover:border-[#B7DDEC]/30 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B7DDEC]/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className="text-sm font-semibold text-white flex-1">{row.category}</h4>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex size-7 items-center justify-center rounded-full border border-[#1E3A4F] bg-[#142634] text-[#B7DDEC]/60 transition-colors hover:border-[#B7DDEC]/30 hover:text-[#B7DDEC]"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} explanation for ${row.category}`}
        >
          <Info className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Two-column check comparison */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-[#24584F]/20 bg-[#24584F]/10 px-3 py-2">
          <ComparisonCell value={row.wintervell} isWintervell />
          <span className="text-xs font-medium text-[#B7DDEC]">{commercial.name}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#B43C3C]/15 bg-[#B43C3C]/5 px-3 py-2">
          <ComparisonCell value={row.saas} isWintervell={false} />
          <span className="text-xs font-medium text-[#B7DDEC]/60">Typical SaaS</span>
        </div>
      </div>

      {/* Expandable explanation */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 rounded-lg border border-[#1E3A4F] bg-[#142634]/60 p-3 text-xs leading-relaxed text-[#B7DDEC]/70">
              {row.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CompetitorComparison() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [tooltipRow, setTooltipRow] = useState<number | null>(null);

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.1 },
        variants: containerVariants,
      };

  const cellBg = (rowIdx: number) =>
    hoveredRow === rowIdx ? "bg-[#1E3A4F]" : rowIdx % 2 === 1 ? "bg-[#142634]/40" : "bg-transparent";

  return (
    <section id="source-code-vs-saas" className="bg-[#142634] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #B7DDEC 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 relative"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3A4F] bg-[#1A2E3E] px-3 py-1 mb-4">
            <Code2 className="size-3.5 text-[#B7DDEC]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#B7DDEC]/70">Source code vs SaaS</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why source code beats SaaS
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#B7DDEC]">
            {commercial.name} is sold as source-code software — not a hosted subscription. Here&apos;s what that means for your business.
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div variants={tableVariants} className="mt-12 hidden md:block sm:mt-16">
          <div className="overflow-hidden rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] shadow-lg">
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-[#1E3A4F] hover:bg-[#142634]">
                    <TableHead className="w-[280px] bg-[#142634] font-semibold text-[#B7DDEC]/70">
                      Feature
                    </TableHead>
                    <TableHead className="bg-[#142634] text-center font-semibold text-[#B7DDEC]">
                      <div className="flex flex-col items-center gap-1.5">
                        <Badge className="border-none bg-gradient-to-r from-[#2563EB] to-[#24584F] px-2.5 py-0.5 text-[10px] font-medium text-white shadow-sm">
                          <ShieldCheck className="mr-1 size-2.5" aria-hidden="true" />
                          Source code
                        </Badge>
                        <span>{commercial.name}</span>
                      </div>
                    </TableHead>
                    <TableHead className="bg-[#142634] text-center font-semibold text-[#B7DDEC]/60">
                      Typical SaaS
                    </TableHead>
                    <TableHead className="w-12 bg-[#142634]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPARISON_ROWS.map((row, idx) => (
                    <TableRow
                      key={row.category}
                      className={cn(
                        "border-b border-[#1E3A4F] transition-colors cursor-default",
                        hoveredRow === idx && "bg-[#1E3A4F]",
                      )}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => {
                        setHoveredRow(null);
                        setTooltipRow(null);
                      }}
                    >
                      <TableCell
                        className={cn(
                          "font-medium text-white transition-colors",
                          cellBg(idx),
                        )}
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        className={cn("text-center transition-colors", cellBg(idx))}
                      >
                        <ComparisonCell value={row.wintervell} isWintervell />
                      </TableCell>
                      <TableCell
                        className={cn("text-center transition-colors", cellBg(idx))}
                      >
                        <ComparisonCell value={row.saas} isWintervell={false} />
                      </TableCell>
                      <TableCell className={cn("text-center transition-colors", cellBg(idx))}>
                        <div className="relative">
                          <button
                            className="flex size-7 items-center justify-center rounded-full text-[#B7DDEC]/40 transition-colors hover:bg-[#1E3A4F] hover:text-[#B7DDEC]"
                            onMouseEnter={() => setTooltipRow(idx)}
                            onMouseLeave={() => setTooltipRow(null)}
                            onFocus={() => setTooltipRow(idx)}
                            onBlur={() => setTooltipRow(null)}
                            aria-label={`Explanation for ${row.category}`}
                          >
                            <Info className="size-3.5" aria-hidden="true" />
                          </button>
                          {/* Tooltip */}
                          <AnimatePresence>
                            {tooltipRow === idx && (
                              <motion.div
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 4, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full z-20 mt-1 w-64 rounded-lg border border-[#1E3A4F] bg-[#142634] p-3 shadow-xl"
                                role="tooltip"
                              >
                                <p className="text-xs leading-relaxed text-[#B7DDEC]/80">
                                  {row.explanation}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Score summary */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 rounded-lg border border-[#24584F]/20 bg-[#24584F]/10 px-4 py-2.5">
              <ShieldCheck className="size-4 text-[#24584F]" aria-hidden="true" />
              <span className="font-semibold text-[#B7DDEC]">{commercial.name}</span>
              <span className="text-[#B7DDEC]/60">—</span>
              <span className="font-bold text-[#24584F]">9/9</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#B43C3C]/15 bg-[#B43C3C]/5 px-4 py-2.5">
              <X className="size-4 text-[#B43C3C]" aria-hidden="true" />
              <span className="font-semibold text-[#B7DDEC]/60">Typical SaaS</span>
              <span className="text-[#B7DDEC]/60">—</span>
              <span className="font-bold text-[#B43C3C]">0/9</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile cards */}
        <div className="mt-12 space-y-4 md:hidden sm:mt-16">
          <motion.div variants={containerVariants} className="space-y-3">
            {COMPARISON_ROWS.map((row, i) => (
              <MobileComparisonCard key={row.category} row={row} index={i} />
            ))}
          </motion.div>
        </div>

        {/* CTA link */}
        <motion.div variants={headingVariants} className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#B7DDEC] underline underline-offset-2 transition-colors hover:text-white"
          >
            See pricing for source-code licences
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
