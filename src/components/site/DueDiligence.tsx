"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Fingerprint,
  FileText,
  Scale,
  Shield,
  ShieldCheck,
  Brain,
  Database,
  AlertTriangle,
  ScrollText,
  ClipboardCheck,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Document type badges ─── */
type DocCategory = "Legal" | "Technical" | "Operational" | "Commercial";
type Completeness = "complete" | "partial" | "missing";

/* ─── Due-diligence documents ─── */
const DUE_DILIGENCE_DOCS = [
  {
    icon: Fingerprint,
    title: "Product provenance",
    description:
      "Origin, authorship, and development history of the WinterVell codebase. Verify who built it and how it evolved.",
    category: "Technical" as DocCategory,
    lastUpdated: "2025-02-15",
    completeness: "complete" as Completeness,
  },
  {
    icon: FileText,
    title: "Third-party notices",
    description:
      "Complete list of third-party components, their licences, and required attribution notices included in the distribution.",
    category: "Legal" as DocCategory,
    lastUpdated: "2025-02-10",
    completeness: "complete" as Completeness,
  },
  {
    icon: Scale,
    title: "Dependency licence report",
    description:
      "Every runtime and build dependency mapped to its licence type (MIT, Apache, BSD, proprietary). No surprises.",
    category: "Legal" as DocCategory,
    lastUpdated: "2025-02-12",
    completeness: "complete" as Completeness,
  },
  {
    icon: Shield,
    title: "Asset-rights register",
    description:
      "Clear record of who owns what — source code, design assets, brand marks, and documentation. All rights are stated explicitly.",
    category: "Legal" as DocCategory,
    lastUpdated: "2025-01-28",
    completeness: "complete" as Completeness,
  },
  {
    icon: ShieldCheck,
    title: "Security disclosure",
    description:
      "Known vulnerabilities, security model, SSRF protection, rate limiting, and the responsible disclosure process.",
    category: "Technical" as DocCategory,
    lastUpdated: "2025-02-18",
    completeness: "complete" as Completeness,
  },
  {
    icon: Brain,
    title: "AI usage disclosure",
    description:
      "Where AI is used in the product, what data is sent to AI providers, and what stays local. No hidden AI dependencies.",
    category: "Technical" as DocCategory,
    lastUpdated: "2025-02-14",
    completeness: "complete" as Completeness,
  },
  {
    icon: Database,
    title: "Data-processing overview",
    description:
      "What data WinterVell collects, processes, and transmits. Includes licence-validation telemetry details and what is never sent.",
    category: "Operational" as DocCategory,
    lastUpdated: "2025-02-08",
    completeness: "partial" as Completeness,
  },
  {
    icon: AlertTriangle,
    title: "Known limitations",
    description:
      "Every known boundary, restriction, and gap — stated plainly. If it is not listed here, it is not a known limitation.",
    category: "Technical" as DocCategory,
    lastUpdated: "2025-02-20",
    completeness: "complete" as Completeness,
  },
  {
    icon: ScrollText,
    title: "Commercial licence summary",
    description:
      "Plain-language summary of the commercial licence terms, usage rights, and restrictions. Full licence text included.",
    category: "Commercial" as DocCategory,
    lastUpdated: "2025-02-05",
    completeness: "complete" as Completeness,
  },
  {
    icon: ClipboardCheck,
    title: "Buyer handover checklist",
    description:
      "Step-by-step checklist of what you receive, what you need to provide, and what happens after purchase.",
    category: "Operational" as DocCategory,
    lastUpdated: "2025-02-01",
    completeness: "partial" as Completeness,
  },
] as const;

/* ─── Category badge colors ─── */
const CATEGORY_STYLES: Record<DocCategory, { bg: string; text: string; border: string }> = {
  Legal: { bg: "bg-[#24584F]/15", text: "text-[#24584F]", border: "border-[#24584F]/20" },
  Technical: { bg: "bg-[#2563EB]/15", text: "text-[#2563EB]", border: "border-[#2563EB]/20" },
  Operational: { bg: "bg-[#B7791F]/15", text: "text-[#B7791F]", border: "border-[#B7791F]/20" },
  Commercial: { bg: "bg-[#B7DDEC]/15", text: "text-[#B7DDEC]", border: "border-[#B7DDEC]/20" },
};

/* ─── Completeness indicator ─── */
function CompletenessIndicator({ status }: { status: Completeness }) {
  if (status === "complete") {
    return (
      <div className="flex items-center gap-1 text-[#24584F]" title="Complete">
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        <span className="text-[10px] font-semibold">Complete</span>
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex items-center gap-1 text-[#B7791F]" title="Partial">
        <Clock className="size-3.5" aria-hidden="true" />
        <span className="text-[10px] font-semibold">In progress</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-[#B43C3C]" title="Missing">
      <XCircle className="size-3.5" aria-hidden="true" />
      <span className="text-[10px] font-semibold">Pending</span>
    </div>
  );
}

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── All categories for filter ─── */
const ALL_CATEGORIES: DocCategory[] = ["Legal", "Technical", "Operational", "Commercial"];

export default function DueDiligence() {
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<DocCategory | "All">("All");

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  /* Filter documents */
  const filteredDocs = useMemo(() => {
    return DUE_DILIGENCE_DOCS.filter((doc) => {
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || doc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  /* Count by category */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: DUE_DILIGENCE_DOCS.length };
    for (const doc of DUE_DILIGENCE_DOCS) {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section id="due-diligence" className="bg-[#142634]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          {/* Prominent message */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B7DDEC]/20 bg-[#B7DDEC]/10 px-4 py-1.5">
            <ShieldCheck className="size-4 text-[#B7DDEC]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#B7DDEC]">
              Serious buyers should be able to inspect serious software.
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Due diligence, not hand-waving.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#B7DDEC]">
            WinterVell is sold as source-code software. Before you commit, you should be able to
            examine every material detail — from provenance to limitations.
          </p>
        </motion.div>

        {/* Search and filter bar */}
        <motion.div variants={headingVariants} className="mt-10 sm:mt-14">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#B7DDEC]/50" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#1E3A4F] bg-[#1A2E3E] py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#B7DDEC]/40 transition-colors focus:border-[#B7DDEC]/40 focus:outline-none focus:ring-1 focus:ring-[#B7DDEC]/20"
                aria-label="Search due diligence documents"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="size-3.5 text-[#B7DDEC]/50 shrink-0" aria-hidden="true" />
              {(["All", ...ALL_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#B7DDEC]/20 text-[#B7DDEC] border border-[#B7DDEC]/30"
                      : "bg-[#1A2E3E] text-[#B7DDEC]/50 border border-[#1E3A4F] hover:border-[#B7DDEC]/20 hover:text-[#B7DDEC]/70"
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                  <span className="opacity-60">({categoryCounts[cat] || 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          {(searchQuery || activeCategory !== "All") && (
            <p className="mt-3 text-xs text-[#B7DDEC]/50">
              Showing {filteredDocs.length} of {DUE_DILIGENCE_DOCS.length} documents
            </p>
          )}
        </motion.div>

        {/* Document cards */}
        <motion.div
          variants={containerVariants}
          className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredDocs.map((doc) => {
              const Icon = doc.icon;
              const catStyle = CATEGORY_STYLES[doc.category];
              return (
                <motion.div
                  key={doc.title}
                  variants={cardVariants}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-[#1E3A4F] bg-[#1A2E3E] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#B7DDEC]/30">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3.5">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#24584F]/20">
                          <Icon className="size-5 text-[#B7DDEC]" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-white">
                              {doc.title}
                            </p>
                          </div>
                          {/* Category badge */}
                          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                              {doc.category}
                            </span>
                            <CompletenessIndicator status={doc.completeness} />
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-[#B7DDEC]/70">
                            {doc.description}
                          </p>
                          {/* Last updated */}
                          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#B7DDEC]/40">
                            <Clock className="size-3" aria-hidden="true" />
                            <span>Updated {doc.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredDocs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-[#B7DDEC]/50">
              No documents match your search. Try a different query or category.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-2 text-xs font-medium text-[#2563EB] hover:text-[#B7DDEC] transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Download all CTA */}
        <motion.div variants={headingVariants} className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#B7DDEC]/50 text-center sm:text-left">
            Every document listed above is available for review before purchase.
            This is essential because the product is sold as source-code software —
            you should know exactly what you are buying.
          </p>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-[#1E3A4F] bg-[#1A2E3E] px-4 py-2.5 text-xs font-semibold text-[#B7DDEC] transition-all duration-200 hover:border-[#B7DDEC]/30 hover:bg-[#142634] hover:shadow-md shrink-0"
            aria-label="Download all due diligence documents"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Download all
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
