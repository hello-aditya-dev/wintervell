import Link from "next/link";
import { Button } from "@/components/ui/button";
import { commercial } from "@/config/commercial";

const TIERS = [
  {
    name: commercial.pricing.agency.name,
    price: commercial.pricing.agency.plannedPrice,
    description: commercial.pricing.agency.description,
    bestFor: commercial.pricing.agency.bestFor,
    includes: commercial.pricing.agency.includes.slice(0, 5),
    cta: "View details",
    href: "/pricing",
  },
  {
    name: commercial.pricing.studio.name,
    price: commercial.pricing.studio.plannedPrice,
    description: commercial.pricing.studio.description,
    bestFor: commercial.pricing.studio.bestFor,
    includes: commercial.pricing.studio.includes.slice(0, 5),
    cta: "View details",
    href: "/pricing",
  },
  {
    name: "Enterprise",
    price: null,
    description: commercial.pricing.enterprise.description,
    bestFor: "Organisations with custom requirements",
    includes: commercial.pricing.enterprise.includes.slice(0, 5),
    cta: "Contact us",
    href: "/contact",
  },
] as const;

export default function PricingPreview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">Pricing preview</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Planned founding pricing. Purchasing is not yet open.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-xs"
            >
              <h3 className="text-h4 text-foreground">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-4">
                {tier.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-display text-foreground tabular-nums">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      planned
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-h3 text-foreground">Custom</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                {tier.bestFor}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
