import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, FileCheck, Link2, Code2, ShieldCheck, Database } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: ClipboardCheck,
    title: "Evidence before explanation",
    description:
      "Findings include structured evidence instead of unsupported AI text. The demonstration models findings with page, element and evidence references. Real evidence collection begins with the audit-engine phase.",
    colorClass: "bg-primary-subtle",
    iconColorClass: "text-primary",
    badgeLabel: "Evidence model",
    badgeVariant: "default" as const,
    badgeClassName: "bg-primary text-primary-foreground",
  },
  {
    icon: FileCheck,
    title: "Report to proposal",
    description:
      "Approved findings can become scope and proposal items. The proposal is derived from the audit, not written separately.",
    colorClass: "bg-[var(--success-subtle)]",
    iconColorClass: "text-[var(--success)]",
    badgeLabel: "Workflow demo",
    badgeVariant: "outline" as const,
    badgeClassName: "border-[var(--success)]/30 text-[var(--success)]",
  },
  {
    icon: Link2,
    title: "Audit and opportunity stay connected",
    description:
      "The sales pipeline retains the audit, report and proposal context. You can trace any opportunity back to the original findings.",
    colorClass: "bg-[var(--warning-subtle)]",
    iconColorClass: "text-[var(--warning)]",
    badgeLabel: "Traceability design",
    badgeVariant: "outline" as const,
    badgeClassName: "border-[var(--warning)]/30 text-[var(--warning)]",
  },
] as const;

const TECHNICAL_PILLARS = [
  {
    icon: Code2,
    label: "Full source code access",
  },
  {
    icon: ShieldCheck,
    label: "Planned self-hosted deployment",
  },
  {
    icon: Database,
    label: "Designed for customer-controlled infrastructure",
  },
];

export default function Differentiators() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">
            What makes WinterVell different
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Built around evidence, not assumptions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-6 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex size-10 items-center justify-center rounded-lg ${item.colorClass}`}>
                    <Icon className={`size-5 ${item.iconColorClass}`} />
                  </div>
                  <Badge
                    variant={item.badgeVariant}
                    className={item.badgeClassName}
                  >
                    {item.badgeLabel}
                  </Badge>
                </div>
                <h3 className="mt-4 text-h4 text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technical pillars strip */}
        <div className="mt-10 rounded-lg border border-border bg-card p-4">
          <div className="mb-3 text-center">
            <span className="text-label text-[var(--text-tertiary)]">Technical pillars</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {TECHNICAL_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="flex size-7 items-center justify-center rounded-md bg-primary-subtle">
                    <Icon className="size-3.5 text-primary" />
                  </div>
                  <span>{pillar.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
