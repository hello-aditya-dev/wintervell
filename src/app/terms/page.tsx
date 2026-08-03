import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";

export const metadata: Metadata = {
  title: "Terms — WinterVell",
  description: "WinterVell terms of service.",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-h1 text-foreground">Terms</h1>
        <p className="mt-4 text-body text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
        </p>

        <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-h3 text-foreground mb-3">Overview</h2>
            <p>
              WinterVell is a frontend demonstration using fictional data. These
              terms apply to the interactive demo available at this website.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Demo use</h2>
            <p>
              The interactive demo is provided for evaluation purposes only. All
              data is fictional. No website is crawled, no email is sent, and no
              payment is processed. The demo does not represent a live service.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Intellectual property</h2>
            <p>
              The WinterVell software, design, and content are proprietary. The
              commercial licence terms are described on the{" "}
              <Link href="/license" className="text-primary hover:underline">
                licence page
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Limitation</h2>
            <p>
              The demo is provided as-is without warranty. WinterVell is in
              development and features may change before release.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Commercial terms</h2>
            <p>
              Commercial terms for the source-code product will be published when
              purchasing opens. Purchasing is not yet available.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Contact</h2>
            <p>
              For questions about these terms, please visit the{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
