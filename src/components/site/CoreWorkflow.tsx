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

        {/* Desktop layout with SVG connecting lines */}
        <div className="mt-12 hidden lg:block">
          <div className="mx-auto flex max-w-5xl items-start justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-start">
                  <div className="flex flex-col items-center">
                    <Link
                      href={step.href}
                      className="group flex w-[140px] flex-col items-center text-center"
                    >
                      {/* Step number badge */}
                      <div className="mb-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--primary-hover)] text-[10px] font-semibold text-primary-foreground shadow-xs">
                        {step.number}
                      </div>
                      {/* Icon container */}
                      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-card shadow-xs">
                        <Icon className="size-4 text-muted-foreground" />
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
                  </div>
                  {/* Static SVG connecting line */}
                  {i < STEPS.length - 1 && (
                    <div className="mt-10 flex items-center px-1">
                      <svg width="32" height="12" viewBox="0 0 32 12" className="overflow-visible">
                        <line
                          x1="0"
                          y1="6"
                          x2="28"
                          y2="6"
                          stroke="var(--border)"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="30"
                          cy="6"
                          r="2"
                          fill="var(--border)"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/tablet layout with vertical steps */}
        <div className="mt-12 lg:hidden">
          <div className="mx-auto max-w-md space-y-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label}>
                  <Link
                    href={step.href}
                    className="group flex items-start gap-4 py-3"
                  >
                    {/* Left: number + line */}
                    <div className="flex flex-col items-center">
                      <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--primary-hover)] text-[10px] font-semibold text-primary-foreground shadow-xs">
                        {step.number}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="mt-1 h-8 w-px bg-border" />
                      )}
                    </div>
                    {/* Right: content */}
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card shadow-xs">
                          <Icon className="size-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {step.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
