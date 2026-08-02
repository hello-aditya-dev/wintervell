"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Clock, Info, RotateCcw, BarChart3, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
type OutputKind = "currency" | "months" | "text";
type OutputSentiment = "positive" | "neutral" | "info";

interface OutputRow {
  label: string;
  kind: OutputKind;
  target: number;
  display: string;
  icon: React.ElementType;
  note?: string;
  sentiment: OutputSentiment;
  maxForBar?: number;
}

function calculateOutputs(values: Record<string, number>): OutputRow[] {
  const auditPrice = values.auditPrice ?? 0;
  const projectValue = values.projectValue ?? 0;
  const auditsPerMonth = values.auditsPerMonth ?? 0;
  const conversionRate = (values.conversionRate ?? 0) / 100;
  const alternativesCost = values.alternativesCost ?? 0;

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

  const costComparisonText = costComparison > 0
    ? `Alternatives cost $${alternativesCost.toLocaleString()}/mo more than licence amortization ($${licenceMonthlyAmortized.toFixed(0)}/mo)`
    : alternativesCost > 0
      ? `Licence amortized at $${licenceMonthlyAmortized.toFixed(0)}/mo vs alternatives at $${alternativesCost}/mo`
      : `Licence amortized at $${licenceMonthlyAmortized.toFixed(0)}/mo`;

  // Determine sentiment for color coding
  const revenueSentiment: OutputSentiment = monthlyAuditRevenue > 0 ? "positive" : "neutral";
  const annualSentiment: OutputSentiment = annualAuditRevenue > 0 ? "positive" : "neutral";
  const projectSentiment: OutputSentiment = associatedProjectValue > 0 ? "positive" : "neutral";
  const costSentiment: OutputSentiment = costComparison > 0 ? "positive" : "info";
  const paybackSentiment: OutputSentiment = paybackMonths > 0 && paybackMonths <= 6 ? "positive" : paybackMonths > 0 && paybackMonths <= 12 ? "neutral" : "info";

  return [
    {
      label: "Potential monthly audit revenue",
      kind: "currency",
      target: monthlyAuditRevenue,
      display: `$${monthlyAuditRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      note: "Estimate based on inputs",
      sentiment: revenueSentiment,
      maxForBar: annualAuditRevenue > 0 ? annualAuditRevenue : undefined,
    },
    {
      label: "Potential annual audit revenue",
      kind: "currency",
      target: annualAuditRevenue,
      display: `$${annualAuditRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      note: "Estimate (monthly × 12)",
      sentiment: annualSentiment,
      maxForBar: annualAuditRevenue > 0 ? annualAuditRevenue : undefined,
    },
    {
      label: "Potential associated project value",
      kind: "currency",
      target: associatedProjectValue,
      display: `$${associatedProjectValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      icon: ArrowUpRight,
      note: "Estimate (project value × audits × conversion)",
      sentiment: projectSentiment,
      maxForBar: associatedProjectValue > 0 ? associatedProjectValue * 1.5 : undefined,
    },
    {
      label: "Estimated monthly tool-cost comparison",
      kind: "text",
      target: costComparison,
      display: costComparisonText,
      icon: Calculator,
      note: "Estimate — annual licence amortized over 12 months",
      sentiment: costSentiment,
      maxForBar: alternativesCost > 0 ? alternativesCost * 2 : undefined,
    },
    {
      label: "Approximate licence payback",
      kind: "months",
      target: paybackMonths,
      display: formatMonthsLabel(paybackMonths),
      icon: Clock,
      note: "Estimate — actual payback depends on revenue realization",
      sentiment: paybackSentiment,
      maxForBar: 24, // Max 24 months for the bar
    },
  ];
}

/* ─── Formatters ─── */
function formatCurrency(value: number): string {
  const rounded = Math.round(value);
  return rounded >= 0
    ? `$${rounded.toLocaleString("en-US")}`
    : `-$${Math.abs(rounded).toLocaleString("en-US")}`;
}

function formatMonthsLabel(target: number): string {
  if (!isFinite(target) || target <= 0) return "N/A";
  if (target < 1) return "< 1 month";
  const ceiled = Math.ceil(target);
  return `${ceiled} month${ceiled !== 1 ? "s" : ""}`;
}

function formatMonthsAnimated(animated: number, target: number): string {
  if (!isFinite(target) || target <= 0) return "N/A";
  if (target < 1) return "< 1 month";
  const ceiled = Math.max(1, Math.ceil(animated));
  return `${ceiled} month${ceiled !== 1 ? "s" : ""}`;
}

/* ─── Animated counter hook ─── */
function useAnimatedCounter(targetValue: number, duration = 500): number {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const fromValueRef = useRef(0);
  const latestValueRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      fromValueRef.current = targetValue;
      latestValueRef.current = targetValue;
      return;
    }

    const from = fromValueRef.current;
    const to = targetValue;

    if (from === to) {
      latestValueRef.current = to;
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplayValue(current);
      latestValueRef.current = current;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(to);
        fromValueRef.current = to;
        latestValueRef.current = to;
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      fromValueRef.current = latestValueRef.current;
    };
  }, [targetValue, duration, prefersReducedMotion]);

  return prefersReducedMotion ? targetValue : displayValue;
}

/* ─── Sentiment color mapping ─── */
function getSentimentColors(sentiment: OutputSentiment) {
  switch (sentiment) {
    case "positive":
      return {
        bg: "bg-[#24584F]/8",
        border: "border-[#24584F]/20",
        iconBg: "bg-[#24584F]/10",
        iconColor: "text-[#24584F]",
        barColor: "bg-gradient-to-r from-[#24584F] to-[#24584F]/60",
        glowColor: "rgba(36, 88, 79, 0.12)",
        flashColor: "rgba(36, 88, 79, 0.10)",
        flashBorder: "rgba(36, 88, 79, 0.30)",
      };
    case "neutral":
      return {
        bg: "bg-[#B7791F]/8",
        border: "border-[#B7791F]/20",
        iconBg: "bg-[#B7791F]/10",
        iconColor: "text-[#B7791F]",
        barColor: "bg-gradient-to-r from-[#B7791F] to-[#B7791F]/60",
        glowColor: "rgba(183, 121, 31, 0.12)",
        flashColor: "rgba(183, 121, 31, 0.10)",
        flashBorder: "rgba(183, 121, 31, 0.30)",
      };
    case "info":
    default:
      return {
        bg: "bg-[#F4F6F7]",
        border: "border-[#DDE3E7]",
        iconBg: "bg-[#24584F]/10",
        iconColor: "text-[#24584F]",
        barColor: "bg-gradient-to-r from-[#2563EB] to-[#2563EB]/60",
        glowColor: "rgba(37, 99, 235, 0.12)",
        flashColor: "rgba(37, 99, 235, 0.10)",
        flashBorder: "rgba(37, 99, 235, 0.30)",
      };
  }
}

/* ─── Animated output row ─── */
function AnimatedOutput({ output }: { output: OutputRow }) {
  const prefersReducedMotion = useReducedMotion();
  const animated = useAnimatedCounter(output.target, 500);

  let displayValue: string;
  if (output.kind === "currency") {
    displayValue = formatCurrency(animated);
  } else if (output.kind === "months") {
    displayValue = prefersReducedMotion
      ? formatMonthsLabel(output.target)
      : formatMonthsAnimated(animated, output.target);
  } else {
    displayValue = output.display;
  }

  const Icon = output.icon;
  const colors = getSentimentColors(output.sentiment);

  const flashKey = output.kind === "text" ? output.display : String(output.target);

  // Calculate bar width percentage
  const barWidth = output.maxForBar && output.target > 0
    ? Math.min((output.target / output.maxForBar) * 100, 100)
    : 0;

  return (
    <motion.div
      key={flashKey}
      className={cn("rounded-lg border p-4", colors.bg, colors.border)}
      initial={
        prefersReducedMotion
          ? false
          : { backgroundColor: colors.flashColor, borderColor: colors.flashBorder }
      }
      animate={{ backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex items-start gap-3">
        <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-md", colors.iconBg)}>
          <Icon className={cn("size-4", colors.iconColor)} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-[#56616C]">
            {output.label}
          </p>
          <p
            className="mt-1 text-lg font-semibold tabular-nums text-[#111820]"
            aria-live="polite"
          >
            {displayValue}
          </p>
          {output.note && (
            <p className="mt-1 flex items-center gap-1 text-xs text-[#B7791F]">
              <Info className="size-3 shrink-0" aria-hidden="true" />
              {output.note}
            </p>
          )}

          {/* Progress bar visualization */}
          {output.kind === "months" && output.target > 0 && (
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-[10px] text-[#56616C]">
                <span>Payback timeline</span>
                <span>{Math.min(Math.ceil(output.target), 24)} of 24 months</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#DDE3E7]">
                <motion.div
                  className={cn("h-full rounded-full", colors.barColor)}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(barWidth, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
          )}

          {/* Mini bar chart for currency outputs */}
          {(output.kind === "currency" || output.kind === "text") && output.maxForBar && output.target > 0 && (
            <div className="mt-2 flex items-end gap-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#DDE3E7]">
                <motion.div
                  className={cn("h-full rounded-full", colors.barColor)}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(barWidth, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Cost Comparison Bar Chart ─── */
function CostComparisonChart({ values }: { values: Record<string, number> }) {
  const prefersReducedMotion = useReducedMotion();
  const alternativesCost = values.alternativesCost ?? 0;
  const licenceMonthlyAmortized = LICENCE_COST / 12;
  const maxVal = Math.max(alternativesCost, licenceMonthlyAmortized, 1);

  const altPct = (alternativesCost / maxVal) * 100;
  const licPct = (licenceMonthlyAmortized / maxVal) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BarChart3 className="size-4 text-[#24584F]" aria-hidden="true" />
        <h4 className="text-sm font-semibold text-[#111820]">Monthly cost comparison</h4>
      </div>

      <div className="space-y-2.5">
        {/* Alternatives bar */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-[#56616C]">Alternatives</span>
            <span className="font-medium tabular-nums text-[#111820]">
              ${alternativesCost.toLocaleString()}/mo
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#DDE3E7]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#B43C3C] to-[#B43C3C]/70"
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(altPct, 2)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Licence amortized bar */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-[#56616C]">WinterVell (amortized)</span>
            <span className="font-medium tabular-nums text-[#111820]">
              ${licenceMonthlyAmortized.toFixed(0)}/mo
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#DDE3E7]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#24584F] to-[#24584F]/70"
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(licPct, 2)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            />
          </div>
        </div>
      </div>

      {/* Savings indicator */}
      {alternativesCost > licenceMonthlyAmortized && alternativesCost > 0 && (
        <motion.div
          className="flex items-center gap-1.5 rounded-md bg-[#24584F]/10 px-2.5 py-1.5"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <TrendingUp className="size-3.5 text-[#24584F]" aria-hidden="true" />
          <span className="text-xs font-medium text-[#24584F]">
            You save ${(alternativesCost - licenceMonthlyAmortized).toFixed(0)}/mo vs alternatives
          </span>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Focus-aware input with glow ─── */
function GlowInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: number;
  onChange: (key: string, raw: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-1.5">
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
        {/* Glow ring on focus */}
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-lg"
          animate={
            prefersReducedMotion
              ? undefined
              : focused
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.98 }
          }
          transition={{ duration: 0.2 }}
          style={{
            background: "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <Input
          id={field.key}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "relative border-[#DDE3E7] bg-[#F4F6F7] text-[#111820] transition-all duration-200",
            field.prefix ? "pl-7" : "",
            field.suffix ? "pr-12" : "",
            focused
              ? "border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
              : "focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20",
          )}
        />
        {field.suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#56616C]">
            {field.suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const prefersReducedMotion = useReducedMotion();

  const initialValues: Record<string, number> = {};
  FIELDS.forEach((f) => {
    initialValues[f.key] = f.defaultValue;
  });

  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const [resetKey, setResetKey] = useState(0);

  const outputs = useMemo(() => calculateOutputs(values), [values]);

  function handleChange(key: string, raw: string) {
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0) {
      setValues((prev) => ({ ...prev, [key]: parsed }));
    } else if (raw === "") {
      setValues((prev) => ({ ...prev, [key]: 0 }));
    }
  }

  function handleReset() {
    const reset: Record<string, number> = {};
    FIELDS.forEach((f) => {
      reset[f.key] = f.defaultValue;
    });
    setValues(reset);
    setResetKey((prev) => prev + 1);
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
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="size-5 text-[#24584F]" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-[#111820]">Your inputs</h3>
                  </div>
                  <motion.div
                    key={resetKey}
                    whileTap={prefersReducedMotion ? undefined : { rotate: -360 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      aria-label="Reset all inputs to default values"
                      className="border-[#DDE3E7] bg-white text-[#3F4A55] hover:bg-[#F4F6F7] hover:text-[#111820] active:scale-95 transition-transform"
                    >
                      <RotateCcw className="size-3.5" aria-hidden="true" />
                      Reset to defaults
                    </Button>
                  </motion.div>
                </div>
                <div key={resetKey} className="space-y-5">
                  {FIELDS.map((field) => (
                    <GlowInput
                      key={field.key}
                      field={field}
                      value={values[field.key]}
                      onChange={handleChange}
                    />
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
                  {outputs.map((output) => (
                    <AnimatedOutput key={output.label} output={output} />
                  ))}
                </div>

                {/* Cost Comparison Chart */}
                <div className="mt-5 rounded-lg border border-[#DDE3E7] bg-[#F4F6F7] p-4">
                  <CostComparisonChart values={values} />
                </div>

                {/* "These are estimates" disclaimer */}
                <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#DDE3E7] bg-[#F4F6F7] px-4 py-3">
                  <Info className="size-4 shrink-0 text-[#56616C]" aria-hidden="true" />
                  <p className="text-xs font-medium text-[#3F4A55]">
                    These are estimates — not guarantees of revenue or payback.
                  </p>
                </div>

                {/* Detailed disclaimer */}
                <div className="mt-4 rounded-lg border border-[#DDE3E7] bg-[#142634]/5 p-4">
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
