import Link from "next/link";
import {
  UserPlus,
  Settings,
  Search,
  FileText,
  FileCheck,
  TrendingUp,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    label: "Add prospect",
    description: "Add a website and company details to your pipeline.",
    icon: UserPlus,
    href: "/app",
  },
  {
    number: 2,
    label: "Configure audit",
    description: "Select categories and parameters for the review.",
    icon: Settings,
    href: "/app",
  },
  {
    number: 3,
    label: "Review findings",
    description: "Examine evidence, edit, and approve each finding.",
    icon: Search,
    href: "/app",
  },
  {
    number: 4,
    label: "Publish report",
    description: "Generate a branded client report with approved findings.",
    icon: FileText,
    href: "/app",
  },
  {
    number: 5,
    label: "Prepare proposal",
    description: "Turn approved findings into a scoped proposal.",
    icon: FileCheck,
    href: "/app",
  },
  {
    number: 6,
    label: "Track opportunity",
    description: "Follow the opportunity through the sales pipeline.",
    icon: TrendingUp,
    href: "/app",
  },
] as const;

export default function CoreWorkflow() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">Core workflow</h2>
          <p className="mt-3 text-body text-muted-foreground">
            From prospect to opportunity in six steps.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto scrollbar-wv">
          <div className="mx-auto flex min-w-[760px] max-w-5xl items-start justify-between gap-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-start">
                  <Link
                    href={step.href}
                    className="group flex w-[140px] flex-col items-center text-center"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-card shadow-xs transition-colors group-hover:border-primary/30 group-hover:bg-primary-subtle">
                      <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <span className="mt-2 text-xs font-medium text-[var(--text-tertiary)]">
                      Step {step.number}
                    </span>
                    <span className="mt-1 text-sm font-medium text-foreground">
                      {step.label}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </span>
                  </Link>
                  {i < STEPS.length - 1 && (
                    <div className="mt-5 flex items-center px-1">
                      <div className="h-px w-6 bg-border" />
                      <div className="size-1 rounded-full bg-border" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
