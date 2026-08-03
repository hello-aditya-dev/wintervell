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
    label: "Finding",
    title: "Missing meta descriptions",
    detail: "High severity · 12 pages affected",
    accent: "bg-[var(--severity-high-bg)] text-[var(--severity-high-text)]",
  },
  {
    label: "Report",
    title: "Website Audit Report",
    detail: "Demonstration · 24 pages",
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
    title: "Qualified lead",
    detail: "Stage 8 of 11",
    accent: "bg-[var(--info-subtle)] text-[var(--info)]",
  },
] as const;

export default function HeroSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 text-xs">
            Product in development · Interactive demo available
          </Badge>
          <h1 className="text-h1 sm:text-display text-foreground">
            Turn website evidence into agency work.
          </h1>
          <p className="mt-6 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            WinterVell is a frontend demonstration of a white-label workspace
            for organizing website findings, producing client reports, preparing
            proposals and tracking commercial opportunities.
          </p>
          <p className="mt-4 text-small text-[var(--text-tertiary)]">
            Frontend demonstration using fictional data. No website is crawled,
            no email is sent and no payment is processed.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/app">
                Explore product demo
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

        {/* Hero visual: product interface cards */}
        <div className="mt-16 overflow-x-auto scrollbar-wv">
          <div className="mx-auto flex min-w-[600px] max-w-4xl items-stretch gap-3">
            {WORKFLOW_CARDS.map((card, i) => (
              <div key={card.label} className="flex items-stretch">
                <div className="flex w-[150px] flex-col rounded-lg border border-border bg-card p-3 shadow-xs">
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
      </div>
    </section>
  );
}
