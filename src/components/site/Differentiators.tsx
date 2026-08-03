import { ClipboardCheck, FileCheck, Link2 } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: ClipboardCheck,
    title: "Evidence before explanation",
    description:
      "Findings include structured evidence instead of unsupported AI text. Every finding references specific pages, elements, or data points.",
  },
  {
    icon: FileCheck,
    title: "Report to proposal",
    description:
      "Approved findings can become scope and proposal items. The proposal is derived from the audit, not written separately.",
  },
  {
    icon: Link2,
    title: "Audit and opportunity stay connected",
    description:
      "The sales pipeline retains the audit, report and proposal context. You can trace any opportunity back to the original findings.",
  },
] as const;

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
                className="rounded-lg border border-border bg-card p-6 shadow-xs"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-subtle">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 text-h4 text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
