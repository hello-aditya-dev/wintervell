"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Clock, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { commercial } from "@/config/commercial";

/* ─── Licence cost constant ─── */
const LICENCE_COST = commercial.pricing.agency.foundingPrice;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ─── Input field config ─── */
interface FieldConfig {
  key: string;
  label: string;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
}

const FIELDS: FieldConfig[] = [
  { key: "auditPrice", label: "Average audit selling price", defaultValue: 500, prefix: "$", min: 0, max: 50000, step: 50 },
  { key: "projectValue", label: "Average implementation-project value", defaultValue: 5000, prefix: "$", min: 0, max: 500000, step: 500 },
  { key: "auditsPerMonth", label: "Audits completed per month", defaultValue: 4, min: 0, max: 200, step: 1 },
  { key: "conversionRate", label: "Estimated audit-to-project conversion rate %", defaultValue: 25, suffix: "%", min: 0, max: 100, step: 1 },
  { key: "alternativesCost", label: "Monthly software alternatives cost", defaultValue: 99, prefix: "$", min: 0, max: 10000, step: 10 },
  { key: "hoursPerAudit", label: "Team hours currently spent per audit", defaultValue: 8, suffix: "hrs", min: 0, max: 200, step: 1 },
];

/* ─── Output definitions ─── */
interface OutputRow {
  label: string;
  value: string;
  icon: React.ElementType;
  note?: string;
}

function calculateOutputs(values: Record<string, number>): OutputRow[] {
  const auditPrice = values.auditPrice ?? 0;
  const projectValue = values.projectValue ?? 0;
  const auditsPerMonth = values.auditsPerMonth ?? 0;
  const conversionRate = (values.conversionRate ?? 0) / 100;
  const alternativesCost = values.alternativesCost ?? 0;
  const hoursPerAudit = values.hoursPerAudit ?? 0;

  const monthlyAuditRevenue = auditPrice * auditsPerMonth;
  const annualAuditRevenue = monthlyAuditRevenue * 12;
  const associatedProjectValue = projectValue * auditsPerMonth * conversionRate;
  const licenceMonthlyAmortized = LICENCE_COST / 12;
  const costComparison = alternativesCost > 0
    ? alternativesCost - licenceMonthlyAmortized
    : 0;
  const paybackMonths = monthlyAuditRevenue > 0
    ? LICENCE_COST / monthlyAuditRevenue
    : 0;

  const fmt = (n: number) =>
    n >= 0
      ? `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      : `-$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const fmtMonth = (n: number) =>
    n === Infinity || n <= 0
      ? "N/A"
      : n < 1
        ? "< 1 month"
        : `${Math.ceil(n)} month${Math.ceil(n) !== 1 ? "s" : ""}`;

  return [
    {
      label: "Potential monthly audit revenue",
      value: fmt(monthlyAuditRevenue),
      icon: DollarSign,
      note: "Estimate based on inputs",
    },
    {
      label: "Potential annual audit revenue",
      value: fmt(annualAuditRevenue),
      icon: TrendingUp,
      note: "Estimate (monthly × 12)",
    },
    {
      label: "Potential associated project value",
      value: fmt(associatedProjectValue),
      icon: TrendingUp,
      note: "Estimate (project value × audits × conversion)",
    },
    {
      label: "Estimated monthly tool-cost comparison",
      value: costComparison > 0
        ? `Alternatives cost $${alternativesCost.toLocaleString()}/mo more than licence amortization ($${licenceMonthlyAmortized.toFixed(0)}/mo)`
        : alternativesCost > 0
          ? `Licence amortized at $${licenceMonthlyAmortized.toFixed(0)}/mo vs alternatives at $${alternativesCost}/mo`
          : `Licence amortized at $${licenceMonthlyAmortized.toFixed(0)}/mo`,
      icon: Calculator,
      note: "Estimate — annual licence amortized over 12 months",
    },
    {
      label: "Approximate licence payback",
      value: fmtMonth(paybackMonths),
      icon: Clock,
      note: "Estimate — actual payback depends on revenue realization",
    },
  ];
}

export default function ROICalculator() {
  const prefersReducedMotion = useReducedMotion();

  const initialValues: Record<string, number> = {};
  FIELDS.forEach((f) => {
    initialValues[f.key] = f.defaultValue;
  });

  const [values, setValues] = useState<Record<string, number>>(initialValues);

  const outputs = useMemo(() => calculateOutputs(values), [values]);

  function handleChange(key: string, raw: string) {
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0) {
      setValues((prev) => ({ ...prev, [key]: parsed }));
    } else if (raw === "") {
      setValues((prev) => ({ ...prev, [key]: 0 }));
    }
  }

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="roi-calculator" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Evaluate the licence investment
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Estimate the commercial potential for your agency. All outputs are estimates — actual results depend on pricing, demand, execution and conversion.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2">
          {/* Inputs */}
          <motion.div variants={cardVariants}>
            <Card className="border-[#DDE3E7] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Calculator className="size-5 text-[#24584F]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">Your inputs</h3>
                </div>
                <div className="space-y-5">
                  {FIELDS.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <Label
                        htmlFor={field.key}
                        className="text-sm font-medium text-[#56616C]"
                      >
                        {field.label}
                      </Label>
                      <div className="relative">
                        {field.prefix && (
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#56616C]">
                            {field.prefix}
                          </span>
                        )}
                        <Input
                          id={field.key}
                          type="number"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={values[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className={`${field.prefix ? "pl-7" : ""} ${field.suffix ? "pr-12" : ""} border-[#DDE3E7] bg-[#F4F6F7] text-[#111820] focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20`}
                        />
                        {field.suffix && (
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#56616C]">
                            {field.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Outputs */}
          <motion.div variants={cardVariants}>
            <Card className="border-[#DDE3E7] bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <TrendingUp className="size-5 text-[#24584F]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">Estimated outputs</h3>
                </div>
                <div className="space-y-4">
                  {outputs.map((output) => {
                    const Icon = output.icon;
                    return (
                      <div
                        key={output.label}
                        className="rounded-lg border border-[#DDE3E7] bg-[#F4F6F7] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#24584F]/10">
                            <Icon className="size-4 text-[#24584F]" aria-hidden="true" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium uppercase tracking-wider text-[#56616C]">
                              {output.label}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-[#111820]">
                              {output.value}
                            </p>
                            {output.note && (
                              <p className="mt-1 flex items-center gap-1 text-xs text-[#B7791F]">
                                <Info className="size-3 shrink-0" aria-hidden="true" />
                                {output.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Disclaimer */}
                <div className="mt-6 rounded-lg border border-[#DDE3E7] bg-[#142634]/5 p-4">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 size-4 shrink-0 text-[#56616C]" aria-hidden="true" />
                    <p className="text-xs leading-relaxed text-[#56616C]">
                      This calculator demonstrates economic reasoning only. All outputs are estimates
                      and do not represent guaranteed revenue. Actual results depend on pricing, demand,
                      execution, and conversion rates. The licence cost used is the Agency Source
                      Licence founding price of ${LICENCE_COST}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
