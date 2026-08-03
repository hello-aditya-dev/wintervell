import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText } from "lucide-react";

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
    title: "Proposal sent",
    detail: "Stage 8 of 11",
    accent: "bg-[var(--info-subtle)] text-[var(--info)]",
  },
] as const;

const TRUST_METRICS = [
  { value: "9", label: "Audit categories" },
  { value: "11", label: "Pipeline stages" },
  { value: "6", label: "Product modules" },
  { value: "1", label: "Source code licence" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 text-xs">
            Product in development · Interactive demo available
          </Badge>
          <h1 className="text-h1 sm:text-display text-foreground">
            Turn website evidence into agency work.
          </h1>
          <p className="mt-6 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            WinterVell is a white-label workspace for reviewing websites,
            organizing findings, producing client reports, preparing proposals
            and tracking the resulting opportunity.
          </p>
          <p className="mt-4 text-small text-[var(--text-tertiary)]">
            Source-code product in development · Interactive frontend demo ·
            Self-hosting planned · Commercial licensing planned
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/app">
                Explore the product demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sample-report">
                <FileText className="mr-1 size-4" />
                View sample report
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero visual: 6 workflow cards */}
        <div className="mt-16 overflow-x-auto scrollbar-wv">
          <div className="mx-auto flex min-w-[720px] max-w-5xl items-stretch gap-3">
            {WORKFLOW_CARDS.map((card, i) => (
              <div key={card.label} className="flex items-stretch">
                <div className="flex w-[160px] flex-col rounded-lg border border-border bg-card p-3 shadow-xs transition-shadow duration-200 hover:shadow-md">
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
              </div>
            ))}
          </div>
        </div>

        {/* Trust metrics strip */}
        <div className="mt-16 mx-auto grid max-w-2xl grid-cols-4 gap-4">
          {TRUST_METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-h2 text-foreground tabular-nums">{metric.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
