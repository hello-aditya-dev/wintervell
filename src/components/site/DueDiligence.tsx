"use client";

import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Due-diligence documents ─── */
const DUE_DILIGENCE_DOCS = [
  {
    icon: Fingerprint,
    title: "Product provenance",
    description:
      "Origin, authorship, and development history of the WinterVell codebase. Verify who built it and how it evolved.",
  },
  {
    icon: FileText,
    title: "Third-party notices",
    description:
      "Complete list of third-party components, their licences, and required attribution notices included in the distribution.",
  },
  {
    icon: Scale,
    title: "Dependency licence report",
    description:
      "Every runtime and build dependency mapped to its licence type (MIT, Apache, BSD, proprietary). No surprises.",
  },
  {
    icon: Shield,
    title: "Asset-rights register",
    description:
      "Clear record of who owns what — source code, design assets, brand marks, and documentation. All rights are stated explicitly.",
  },
  {
    icon: ShieldCheck,
    title: "Security disclosure",
    description:
      "Known vulnerabilities, security model, SSRF protection, rate limiting, and the responsible disclosure process.",
  },
  {
    icon: Brain,
    title: "AI usage disclosure",
    description:
      "Where AI is used in the product, what data is sent to AI providers, and what stays local. No hidden AI dependencies.",
  },
  {
    icon: Database,
    title: "Data-processing overview",
    description:
      "What data WinterVell collects, processes, and transmits. Includes licence-validation telemetry details and what is never sent.",
  },
  {
    icon: AlertTriangle,
    title: "Known limitations",
    description:
      "Every known boundary, restriction, and gap — stated plainly. If it is not listed here, it is not a known limitation.",
  },
  {
    icon: ScrollText,
    title: "Commercial licence summary",
    description:
      "Plain-language summary of the commercial licence terms, usage rights, and restrictions. Full licence text included.",
  },
  {
    icon: ClipboardCheck,
    title: "Buyer handover checklist",
    description:
      "Step-by-step checklist of what you receive, what you need to provide, and what happens after purchase.",
  },
] as const;

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

export default function DueDiligence() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="due-diligence" className="bg-[#142634]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Serious buyers should be able to inspect serious software.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#B7DDEC]">
            WinterVell is sold as source-code software. Before you commit, you should be able to
            examine every material detail — from provenance to limitations.
          </p>
        </motion.div>

        {/* Document cards */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
        >
          {DUE_DILIGENCE_DOCS.map((doc) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.title}
                variants={cardVariants}
              >
                <Card className="h-full border-[#1E3A4F] bg-[#1A2E3E] shadow-sm transition-colors hover:border-[#B7DDEC]/30">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#24584F]/20">
                        <Icon className="size-5 text-[#B7DDEC]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">
                          {doc.title}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#B7DDEC]/70">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Emphasis note */}
        <motion.div variants={headingVariants} className="mt-10 text-center">
          <p className="text-xs text-[#B7DDEC]/50">
            Every document listed above is available for review before purchase. 
            This is essential because the product is sold as source-code software — 
            you should know exactly what you are buying.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
