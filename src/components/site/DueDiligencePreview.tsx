import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  FileSearch,
  Scale,
  Shield,
  AlertTriangle,
  FileText,
} from "lucide-react";

const DUE_DILIGENCE_CARDS = [
  {
    icon: FileSearch,
    title: "Product provenance",
    description:
      "Origin, ownership, and development history of the WinterVell codebase.",
    status: "In preparation" as const,
    href: "/due-diligence",
  },
  {
    icon: Scale,
    title: "Dependency licences",
    description:
      "Licence audit of all third-party dependencies included in the product.",
    status: "In preparation" as const,
    href: "/due-diligence",
  },
  {
    icon: Shield,
    title: "Security model",
    description:
      "Security architecture, threat model, and data-handling practices.",
    status: "In preparation" as const,
    href: "/due-diligence",
  },
  {
    icon: AlertTriangle,
    title: "Known limitations",
    description:
      "Honest assessment of current product limitations and in-progress features.",
    status: "Available" as const,
    href: "/due-diligence",
  },
  {
    icon: FileText,
    title: "Commercial licence",
    description:
      "Terms, scope, and permitted use under the WinterVell Commercial Source Licence.",
    status: "In preparation" as const,
    href: "/license",
  },
] as const;

const statusConfig = {
  Available: {
    badgeClass: "bg-[var(--success-subtle)] text-[var(--success)] border-[var(--success)]/20",
    dotClass: "bg-[var(--success)]",
  },
  "In preparation": {
    badgeClass: "bg-[var(--warning-subtle)] text-[var(--warning)] border-[var(--warning)]/20",
    dotClass: "bg-[var(--warning)]",
  },
} as const;

export default function DueDiligencePreview() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">Due diligence</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Documents and information for evaluating WinterVell before purchase.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DUE_DILIGENCE_CARDS.map((card) => {
            const Icon = card.icon;
            const config = statusConfig[card.status];
            return (
              <div key={card.title}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-4 shadow-xs"
                >
                  {/* Icon */}
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary-subtle">
                    <Icon className="size-4 text-primary" />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 flex-1 text-xs text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>

                  {/* Status badge with color coding */}
                  <Badge
                    variant="outline"
                    className={`mt-3 w-fit gap-1.5 border text-[10px] ${config.badgeClass}`}
                  >
                    <span className={`size-1.5 rounded-full ${config.dotClass}`} />
                    {card.status}
                  </Badge>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
