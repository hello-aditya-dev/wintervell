import Link from "next/link";
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
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-primary/30"
              >
                <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                <h3 className="mt-3 text-sm font-medium text-foreground">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
                <span
                  className={`mt-3 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    card.status === "Available"
                      ? "bg-[var(--success-subtle)] text-[var(--success)]"
                      : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {card.status}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
