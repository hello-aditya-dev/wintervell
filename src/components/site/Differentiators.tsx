import { ClipboardCheck, FileCheck, Link2, Shield, Code, Server } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: ClipboardCheck,
    title: "Evidence before explanation",
    description:
      "Findings include structured evidence instead of unsupported AI text. Every finding references specific pages, elements, or data points.",
    color: "bg-primary-subtle text-primary",
  },
  {
    icon: FileCheck,
    title: "Report to proposal",
    description:
      "Approved findings can become scope and proposal items. The proposal is derived from the audit, not written separately.",
    color: "bg-[var(--success-subtle)] text-[var(--success)]",
  },
  {
    icon: Link2,
    title: "Audit and opportunity stay connected",
    description:
      "The sales pipeline retains the audit, report and proposal context. You can trace any opportunity back to the original findings.",
    color: "bg-[var(--info-subtle)] text-[var(--info)]",
  },
] as const;

const TECH_PILLARS = [
  {
    icon: Shield,
    label: "SSRF protection",
    detail: "Safe crawling with DNS validation",
  },
  {
    icon: Code,
    label: "Source code included",
    detail: "Full codebase, not a black box",
  },
  {
    icon: Server,
    label: "Self-hosted",
    detail: "Your infrastructure, your data",
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
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-6 shadow-xs transition-shadow duration-200 hover:shadow-md"
              >
                <div className={`flex size-10 items-center justify-center rounded-lg ${item.color}`}>
                  <Icon className="size-5" />
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
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {TECH_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-xs"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#24584F]/10">
                  <Icon className="size-4 text-[#24584F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{pillar.label}</p>
                  <p className="text-xs text-muted-foreground">{pillar.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
