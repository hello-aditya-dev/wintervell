"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X, Minus, ArrowRight, Scale } from "lucide-react";
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
import { commercial } from "@/config/commercial";

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

/* ─── Value renderer ─── */
function CellValue({ value }: { value: string }) {
  const lower = value.toLowerCase().trim();

  if (lower === "yes" || lower === "unlimited") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#24584F]/10">
          <Check className="size-3 text-[#24584F]" aria-hidden="true" />
        </span>
        <span className="text-[#111820]">{value}</span>
      </span>
    );
  }

  if (lower === "no") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#B43C3C]/10">
          <X className="size-3 text-[#B43C3C]" aria-hidden="true" />
        </span>
        <span className="text-[#56616C]">{value}</span>
      </span>
    );
  }

  return <span className="text-[#111820]">{value}</span>;
}

/* ─── Mobile card for each tier ─── */
function MobileCard({
  tierName,
  tierLabel,
  fields,
  accentColor,
}: {
  tierName: string;
  tierLabel: string;
  fields: { label: string; value: string }[];
  accentColor: string;
}) {
  return (
    <Card className="border-[#DDE3E7] bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-base font-semibold text-[#111820]">{tierName}</h3>
          <Badge variant="outline" className="ml-auto border-[#DDE3E7] text-xs text-[#56616C]">
            {tierLabel}
          </Badge>
        </div>
        <dl className="space-y-3">
          {fields.map((field) => (
            <div key={field.label} className="flex items-start justify-between gap-3">
              <dt className="text-sm text-[#56616C]">{field.label}</dt>
              <dd className="text-sm font-medium">
                <CellValue value={field.value} />
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default function LicenceComparison() {
  const prefersReducedMotion = useReducedMotion();

  const { licenceComparison, pricing } = commercial;

  const fields = licenceComparison.fields;

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="licence-comparison" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Compare licence tiers
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Side-by-side comparison of every commercial right across Agency, Studio, and Enterprise tiers.
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div variants={tableVariants} className="mt-12 hidden md:block sm:mt-16">
          <div className="overflow-hidden rounded-xl border border-[#DDE3E7] bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#142634] hover:bg-[#142634]">
                  <TableHead className="w-[260px] text-[#B7DDEC] font-semibold">
                    Feature
                  </TableHead>
                  <TableHead className="text-center text-[#B7DDEC] font-semibold">
                    Agency
                  </TableHead>
                  <TableHead className="text-center text-[#B7DDEC] font-semibold">
                    Studio
                  </TableHead>
                  <TableHead className="text-center text-[#B7DDEC] font-semibold">
                    Enterprise
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, idx) => (
                  <TableRow
                    key={field.label}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F4F6F7]/50"}
                  >
                    <TableCell className="font-medium text-[#111820]">
                      {field.label}
                    </TableCell>
                    <TableCell className="text-center">
                      <CellValue value={field.agency} />
                    </TableCell>
                    <TableCell className="text-center">
                      <CellValue value={field.studio} />
                    </TableCell>
                    <TableCell className="text-center">
                      <CellValue value={field.enterprise} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Mobile cards */}
        <div className="mt-12 space-y-6 md:hidden sm:mt-16">
          <motion.div variants={tableVariants} className="space-y-4">
            <MobileCard
              tierName={pricing.agency.name}
              tierLabel="$799"
              fields={fields.map((f) => ({ label: f.label, value: f.agency }))}
              accentColor="#2563EB"
            />
            <MobileCard
              tierName={pricing.studio.name}
              tierLabel="$1,499"
              fields={fields.map((f) => ({ label: f.label, value: f.studio }))}
              accentColor="#24584F"
            />
            <MobileCard
              tierName={pricing.enterprise.name}
              tierLabel="From $4,000"
              fields={fields.map((f) => ({ label: f.label, value: f.enterprise }))}
              accentColor="#56616C"
            />
          </motion.div>
        </div>

        {/* Link to full licence */}
        <motion.div variants={headingVariants} className="mt-10 text-center">
          <a
            href="#license"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] underline underline-offset-2 hover:text-[#2563EB]/80"
          >
            Read the full commercial licence
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
