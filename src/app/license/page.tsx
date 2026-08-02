import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Scale, FileText } from "lucide-react";
import { commercial } from "@/config/commercial";

export const metadata: Metadata = {
  title: "Licence — WinterVell",
  description:
    "WinterVell Commercial Source Licence (WV-CSL) v1.0. Terms, scope, and permitted use.",
};

export default function LicensePage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h1 sm:text-display text-foreground">Licence</h1>
          <p className="mt-4 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            WinterVell is sold under the WinterVell Commercial Source Licence
            (WV-CSL) v1.0. Full licence terms will be published before the
            commercial release.
          </p>
        </div>

        {/* Licence overview */}
        <section className="mt-12">
          <h2 className="text-h2 text-foreground">Licence overview</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
              <Shield className="size-5 text-primary" />
              <h3 className="mt-3 text-h4 text-foreground">
                Source-code access
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Buyers receive the complete source code for internal business
                use. The code is not obfuscated or minified.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
              <Scale className="size-5 text-primary" />
              <h3 className="mt-3 text-h4 text-foreground">
                Permitted use
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Buyers may use the software for internal business purposes,
                modify it for internal use, and charge clients for audits and
                related services.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
              <FileText className="size-5 text-primary" />
              <h3 className="mt-3 text-h4 text-foreground">
                Restrictions
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Redistribution, resale, sublicensing, or public publication of
                the source code is prohibited under all licence tiers.
              </p>
            </div>
          </div>
        </section>

        {/* Licence comparison */}
        <section className="mt-16">
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
                  <tr key={field.label} className="border-b border-border">
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

        {/* Key terms */}
        <section className="mt-16">
          <h2 className="text-h2 text-foreground">Key terms</h2>
          <div className="mt-8 space-y-4">
            {[
              {
                term: "Legal business count",
                description:
                  "The number of legal business entities that may use the software under the licence. The Agency licence covers one legal business; the Studio licence covers one or more.",
              },
              {
                term: "Production deployment",
                description:
                  "A running instance of WinterVell that serves end users. The Agency licence includes one production deployment; the Studio licence includes up to five.",
              },
              {
                term: "White labelling",
                description:
                  "The ability to replace WinterVell branding with your own. The Agency licence includes client-facing white labelling. The Studio licence includes full white labelling including the admin area.",
              },
              {
                term: "Modification rights",
                description:
                  "The right to modify the source code. All licences permit modification for internal business use. The Studio licence also permits modifications for controlled client deployments.",
              },
              {
                term: "Redistribution",
                description:
                  "The right to distribute, share, or publish the source code. Redistribution is prohibited under all licence tiers. Enterprise arrangements may include redistribution rights by agreement.",
              },
              {
                term: "Updates",
                description:
                  "Access to future versions of the software. The Agency licence includes access to the purchased version. The Studio licence includes one year of updates. Enterprise arrangements are custom.",
              },
            ].map((item) => (
              <div
                key={item.term}
                className="rounded-lg border border-border bg-card p-5 shadow-xs"
              >
                <h3 className="text-sm font-medium text-foreground">
                  {item.term}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-lg border border-border bg-primary-subtle p-8 text-center">
          <h2 className="text-h2 text-foreground">
            Questions about the licence?
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Contact us to discuss licence terms, scope, or enterprise
            arrangements.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/contact">
                Ask a product question
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
