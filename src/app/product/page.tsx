import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Settings,
  Search,
  FileText,
  FileCheck,
  TrendingUp,
  ClipboardCheck,
  FileSearch,
  Shield,
  Eye,
  Target,
  Wrench,
  Brain,
  ArrowRight,
} from "lucide-react";
import { commercial } from "@/config/commercial";

export const metadata: Metadata = {
  title: "Product — WinterVell",
  description:
    "WinterVell workflow, features, and product screenshots. From prospect to opportunity in six steps.",
};

const WORKFLOW_STEPS = [
  {
    step: 1,
    label: "Add prospect",
    description:
      "Enter a website URL and company details. The prospect is added to the pipeline and becomes the starting point for an audit.",
    icon: UserPlus,
  },
  {
    step: 2,
    label: "Configure audit",
    description:
      "Select which audit categories to review. WinterVell supports nine categories including technical health, SEO, performance, and accessibility.",
    icon: Settings,
  },
  {
    step: 3,
    label: "Review findings",
    description:
      "Examine each finding with its structured evidence. Edit, reject, or approve findings before including them in the client report.",
    icon: Search,
  },
  {
    step: 4,
    label: "Publish report",
    description:
      "Generate a branded, white-label PDF report with the approved findings. Reports include scores, evidence, and recommendations.",
    icon: FileText,
  },
  {
    step: 5,
    label: "Prepare proposal",
    description:
      "Turn approved findings into a scoped proposal with items, timeline, and pricing. Proposals are derived directly from the audit.",
    icon: FileCheck,
  },
  {
    step: 6,
    label: "Track opportunity",
    description:
      "Follow the opportunity through the eleven-stage sales pipeline. The pipeline retains audit, report, and proposal context.",
    icon: TrendingUp,
  },
] as const;

const FEATURES = [
  {
    title: "Structured evidence",
    description:
      "Every finding includes structured evidence — specific pages, elements, and data points — rather than unsupported AI-generated text.",
    icon: ClipboardCheck,
  },
  {
    title: "Finding review workflow",
    description:
      "Findings can be edited, marked as false positives, or excluded from the client report. The manual review step is a core part of the product.",
    icon: Eye,
  },
  {
    title: "Report to proposal pipeline",
    description:
      "Approved findings can become scope and proposal items. The proposal is derived from the audit, not written separately.",
    icon: FileCheck,
  },
  {
    title: "Connected audit and opportunity",
    description:
      "The sales pipeline retains the audit, report and proposal context. You can trace any opportunity back to the original findings.",
    icon: FileSearch,
  },
  {
    title: "White-label reports",
    description:
      "Reports and proposals are branded with your agency name, logo, and colours. The client sees your brand, not WinterVell.",
    icon: Target,
  },
  {
    title: "Self-hosted and private",
    description:
      "WinterVell is self-hosted. Client data remains on your infrastructure. The licence validation system never transmits client or audit data.",
    icon: Shield,
  },
] as const;

export default function ProductPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Page header */}
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h1 sm:text-display text-foreground">
            Product
          </h1>
          <p className="mt-4 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            WinterVell is a white-label workspace for reviewing websites,
            organizing findings, producing client reports, preparing proposals
            and tracking the resulting opportunity.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/app">
                Explore the demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>

        {/* Workflow */}
        <section className="mt-20">
          <h2 className="text-h2 text-foreground">Workflow</h2>
          <p className="mt-3 text-body text-muted-foreground">
            From prospect to opportunity in six steps.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="rounded-lg border border-border bg-card p-6 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary-subtle">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[var(--text-tertiary)]">
                        Step {step.step}
                      </span>
                      <h3 className="text-h4 text-foreground">
                        {step.label}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Audit categories */}
        <section className="mt-20">
          <h2 className="text-h2 text-foreground">Audit categories</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Nine categories of website review, each with structured findings.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {commercial.auditCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-3 rounded-md border border-border bg-card p-3 shadow-xs"
              >
                <Wrench className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-20">
          <h2 className="text-h2 text-foreground">Features</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-border bg-card p-6 shadow-xs"
                >
                  <Icon className="size-5 text-primary" />
                  <h3 className="mt-3 text-h4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 rounded-lg border border-border bg-primary-subtle p-8 text-center">
          <h2 className="text-h2 text-foreground">
            Try the interactive demo
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            The demo uses fictional data to show the complete workflow from
            prospect to opportunity.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/app">
                Open demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
