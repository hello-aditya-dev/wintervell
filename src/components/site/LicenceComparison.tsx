"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, X, Minus, ArrowRight, Sparkles } from "lucide-react";
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

/* ─── Limited / conditional values (amber) ─── */
const LIMITED_VALUES: ReadonlySet<string> = new Set([
  "controlled",
  "custom",
  "by agreement",
  "internal use",
  "internal + client",
  "purchased version",
  "30 days",
  "1 year",
  "priority",
  "limited",
  "up to 5",
]);

/* ─── Row indices after which a stronger section divider is drawn ─── */
const SECTION_DIVIDER_AFTER = new Set<number>([1, 5, 9]);

/* ─── Value renderer ─── */
function CellValue({ value }: { value: string }) {
  const lower = value.toLowerCase().trim();

  // Yes / Unlimited / Full → green check
  if (
    lower === "yes" ||
    lower === "unlimited" ||
    lower === "full" ||
    lower === "full (incl. admin)"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#24584F]/10">
          <Check className="size-3 text-[#24584F]" aria-hidden="true" />
        </span>
        <span className="font-medium text-[#24584F]">{value}</span>
      </span>
    );
  }

  // No → red X
  if (lower === "no") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#B43C3C]/10">
          <X className="size-3 text-[#B43C3C]" aria-hidden="true" />
        </span>
        <span className="text-[#B43C3C]">{value}</span>
      </span>
    );
  }

  // Limited / conditional → amber Minus
  if (LIMITED_VALUES.has(lower)) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#B7791F]/10">
          <Minus className="size-3 text-[#B7791F]" aria-hidden="true" />
        </span>
        <span className="font-medium text-[#B7791F]">{value}</span>
      </span>
    );
  }

  // Default → neutral text
  return <span className="text-[#111820]">{value}</span>;
}

/* ─── Mobile card for each tier ─── */
function MobileCard({
  tierName,
  tierLabel,
  fields,
  accentColor,
  highlighted = false,
}: {
  tierName: string;
  tierLabel: string;
  fields: { label: string; value: string }[];
  accentColor: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={cn(
        "bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        highlighted ? "border-[#24584F]" : "border-[#DDE3E7]",
      )}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-base font-semibold text-[#111820]">{tierName}</h3>
          {highlighted ? (
            <Badge className="ml-auto border-none bg-gradient-to-r from-[#2563EB] to-[#24584F] px-2 py-0.5 text-xs text-white">
              <Sparkles className="mr-1 size-2.5" aria-hidden="true" />
              Best for multi-brand
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="ml-auto border-[#DDE3E7] text-xs text-[#56616C]"
            >
              {tierLabel}
            </Badge>
          )}
        </div>
        <dl className="space-y-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-start justify-between gap-3 border-b border-[#DDE3E7]/50 pb-2 last:border-b-0 last:pb-0"
            >
              <dt className="text-sm text-[#56616C]">{field.label}</dt>
              <dd className="text-right text-sm font-medium">
                <CellValue value={field.value} />
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

/* ─── Column indices ─── */
const COL_FEATURE = 0;
const COL_AGENCY = 1;
const COL_STUDIO = 2;
const COL_ENTERPRISE = 3;

export default function LicenceComparison() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const { licenceComparison, pricing } = commercial;

  const fields = licenceComparison.fields;

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  // Background colour for a body cell, combining zebra striping with row and
  // column hover emphasis. Hover wins over zebra.
  const cellBg = (rowIdx: number, colIdx: number) => {
    if (hoveredRow === rowIdx || hoveredColumn === colIdx) {
      return "bg-[#F4F6F7]";
    }
    return rowIdx % 2 === 1 ? "bg-[#F4F6F7]/60" : "bg-white";
  };

  // Background colour for a header cell — slight navy lighten on hover.
  const headerBg = (colIdx: number) =>
    hoveredColumn === colIdx ? "bg-[#1d3548]" : "bg-[#142634]";

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
            {/* Scroll container enables sticky header inside the table */}
            <div className="max-h-[680px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-[#DDE3E7] hover:bg-[#142634]">
                    <TableHead
                      className={cn(
                        "sticky top-0 z-10 w-[280px] bg-[#142634] font-semibold text-[#B7DDEC] transition-colors",
                        headerBg(COL_FEATURE),
                      )}
                      onMouseEnter={() => setHoveredColumn(COL_FEATURE)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      Feature
                    </TableHead>
                    <TableHead
                      className={cn(
                        "sticky top-0 z-10 bg-[#142634] text-center font-semibold text-[#B7DDEC] transition-colors",
                        headerBg(COL_AGENCY),
                      )}
                      onMouseEnter={() => setHoveredColumn(COL_AGENCY)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      Agency
                    </TableHead>
                    <TableHead
                      className={cn(
                        "sticky top-0 z-10 bg-[#142634] text-center font-semibold text-[#B7DDEC] transition-colors",
                        headerBg(COL_STUDIO),
                      )}
                      onMouseEnter={() => setHoveredColumn(COL_STUDIO)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        {pricing.studio.badge && (
                          <Badge className="border-none bg-gradient-to-r from-[#2563EB] to-[#24584F] px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                            <Sparkles className="mr-1 size-2.5" aria-hidden="true" />
                            Best for multi-brand
                          </Badge>
                        )}
                        <span>Studio</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className={cn(
                        "sticky top-0 z-10 bg-[#142634] text-center font-semibold text-[#B7DDEC] transition-colors",
                        headerBg(COL_ENTERPRISE),
                      )}
                      onMouseEnter={() => setHoveredColumn(COL_ENTERPRISE)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      Enterprise
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, idx) => {
                    const isDivider = SECTION_DIVIDER_AFTER.has(idx);
                    return (
                      <TableRow
                        key={field.label}
                        className={cn(
                          "border-b border-[#DDE3E7] transition-colors",
                          isDivider && "border-b-2 border-[#142634]/15",
                        )}
                        onMouseEnter={() => setHoveredRow(idx)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <TableCell
                          className={cn(
                            "font-medium text-[#111820] transition-colors",
                            cellBg(idx, COL_FEATURE),
                          )}
                        >
                          {field.label}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-center transition-colors",
                            cellBg(idx, COL_AGENCY),
                          )}
                        >
                          <CellValue value={field.agency} />
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-center transition-colors",
                            cellBg(idx, COL_STUDIO),
                          )}
                        >
                          <CellValue value={field.studio} />
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-center transition-colors",
                            cellBg(idx, COL_ENTERPRISE),
                          )}
                        >
                          <CellValue value={field.enterprise} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Colour legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#56616C]">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#24584F]/10">
                <Check className="size-2.5 text-[#24584F]" aria-hidden="true" />
              </span>
              Included
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#B7791F]/10">
                <Minus className="size-2.5 text-[#B7791F]" aria-hidden="true" />
              </span>
              Limited or conditional
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#B43C3C]/10">
                <X className="size-2.5 text-[#B43C3C]" aria-hidden="true" />
              </span>
              Not included
            </span>
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
              highlighted
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
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] underline underline-offset-2 transition-colors hover:text-[#2563EB]/80"
          >
            Read the full commercial licence
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
