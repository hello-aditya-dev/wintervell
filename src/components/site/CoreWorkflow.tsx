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
    color: "text-primary",
    bg: "bg-primary-subtle",
  },
  {
    number: 2,
    label: "Configure audit",
    description: "Select categories and parameters for the review.",
    icon: Settings,
    href: "/app",
    color: "text-[var(--info)]",
    bg: "bg-[var(--info-subtle)]",
  },
  {
    number: 3,
    label: "Review findings",
    description: "Examine evidence, edit, and approve each finding.",
    icon: Search,
    href: "/app",
    color: "text-[#24584F]",
    bg: "bg-[#24584F]/10",
  },
  {
    number: 4,
    label: "Publish report",
    description: "Generate a branded client report with approved findings.",
    icon: FileText,
    href: "/app",
    color: "text-[var(--success)]",
    bg: "bg-[var(--success-subtle)]",
  },
  {
    number: 5,
    label: "Prepare proposal",
    description: "Turn approved findings into a scoped proposal.",
    icon: FileCheck,
    href: "/app",
    color: "text-[var(--severity-medium-text)]",
    bg: "bg-[var(--severity-medium-bg)]",
  },
  {
    number: 6,
    label: "Track opportunity",
    description: "Follow the opportunity through the sales pipeline.",
    icon: TrendingUp,
    href: "/app",
    color: "text-primary",
    bg: "bg-primary-subtle",
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
                    <div className={`flex size-10 items-center justify-center rounded-lg ${step.bg} shadow-xs transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
                      <Icon className={`size-4 ${step.color} transition-transform duration-200`} />
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
