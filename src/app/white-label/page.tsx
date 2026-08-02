import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import { WhiteLabelContent } from "@/components/site/WhiteLabelPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "White label — WinterVell",
  description:
    "Preview how WinterVell reports and proposals adapt to your agency brand. Switch between three fictional agency brands.",
};

export default function WhiteLabelPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h1 sm:text-display text-foreground">
            White label
          </h1>
          <p className="mt-4 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            WinterVell reports and proposals are branded with your agency name,
            logo, and colours. The client sees your brand, not WinterVell.
          </p>
        </div>

        {/* Interactive brand preview */}
        <section className="mt-12">
          <h2 className="text-h2 text-foreground">Brand preview</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Switch between three fictional agency brands to see how reports and
            branding adapt.
          </p>
          <div className="mt-8">
            <WhiteLabelContent />
          </div>
        </section>

        {/* What can be customised */}
        <section className="mt-16">
          <h2 className="text-h2 text-foreground">What can be customised</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Agency name and logo",
                description:
                  "Your agency name and logo appear on all client-facing outputs including reports and proposals.",
              },
              {
                title: "Primary colour",
                description:
                  "Set the primary colour used for headings, accent elements, and progress indicators throughout the product.",
              },
              {
                title: "Contact details",
                description:
                  "Your contact email, phone, and address appear on report covers and proposal documents.",
              },
              {
                title: "Report cover",
                description:
                  "Customise the report cover title, subtitle, and branding to match your agency identity.",
              },
              {
                title: "Proposal template",
                description:
                  "Proposals use your agency branding and include your terms, scope format, and pricing structure.",
              },
              {
                title: "Admin area (Studio)",
                description:
                  "The Studio licence includes admin-area white labelling, so even internal users see your brand.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5 shadow-xs"
              >
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
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
            Try white labelling in the demo
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            The interactive demo includes the white-label configuration with
            fictional data.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/app">
                Open demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
