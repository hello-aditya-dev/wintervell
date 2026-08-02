import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { commercial } from "@/config/commercial";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — WinterVell",
  description:
    "Planned founding pricing for WinterVell source-code licences. Agency, Studio, and Enterprise tiers.",
};

const TIERS = [
  {
    name: commercial.pricing.agency.name,
    price: commercial.pricing.agency.foundingPrice,
    description: commercial.pricing.agency.description,
    bestFor: commercial.pricing.agency.bestFor,
    includes: commercial.pricing.agency.includes,
    clarifications: commercial.pricing.agency.clarifications,
    cta: "View licence details",
    href: "/license",
  },
  {
    name: commercial.pricing.studio.name,
    price: commercial.pricing.studio.foundingPrice,
    description: commercial.pricing.studio.description,
    bestFor: commercial.pricing.studio.bestFor,
    includes: commercial.pricing.studio.includes,
    clarifications: [],
    cta: "View licence details",
    href: "/license",
    featured: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: commercial.pricing.enterprise.description,
    bestFor: "Organisations with custom requirements",
    includes: commercial.pricing.enterprise.includes,
    clarifications: [],
    cta: "Contact us",
    href: "/contact",
  },
] as const;

const FAQ_ITEMS = commercial.faq.filter((_, i) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 14, 15].includes(i)
);

export default function PricingPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-h1 sm:text-display text-foreground">Pricing</h1>
          <p className="mt-4 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            Planned founding pricing. Purchasing is not yet open.
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-lg border bg-card p-6 shadow-xs ${
                "featured" in tier && tier.featured
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              {"featured" in tier && tier.featured && (
                <span className="mb-3 inline-flex w-fit rounded-md bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                  Best for multi-brand operators
                </span>
              )}
              <h2 className="text-h3 text-foreground">{tier.name}</h2>
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

              <ul className="mt-6 flex-1 space-y-2.5">
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

              {tier.clarifications.length > 0 && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    Important notes
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {tier.clarifications.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-[var(--text-tertiary)]"
                      >
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <Button
                  variant={
                    "featured" in tier && tier.featured ? "default" : "outline"
                  }
                  className="w-full"
                  asChild
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Licence comparison */}
        <section className="mt-20">
          <h2 className="text-h2 text-foreground">Licence comparison</h2>
          <div className="mt-6 overflow-x-auto scrollbar-wv">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                    Agency
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                    Studio
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {commercial.licenceComparison.fields.map((field) => (
                  <tr
                    key={field.label}
                    className="border-b border-border"
                  >
                    <td className="py-2.5 pr-4 text-sm text-muted-foreground">
                      {field.label}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-foreground">
                      {field.agency}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-foreground">
                      {field.studio}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-foreground">
                      {field.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-h2 text-foreground">Frequently asked questions</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="rounded-lg border border-border bg-card p-5 shadow-xs"
              >
                <h3 className="text-sm font-medium text-foreground">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 rounded-lg border border-border bg-primary-subtle p-8 text-center">
          <h2 className="text-h2 text-foreground">
            Review the product before purchasing
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Explore the interactive demo, view a sample report, or ask a
            product question.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/app">
                Explore demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Ask a product question</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
