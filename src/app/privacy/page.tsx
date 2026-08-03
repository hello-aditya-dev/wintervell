import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy — WinterVell",
  description: "WinterVell privacy policy.",
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-h1 text-foreground">Privacy</h1>
        <p className="mt-4 text-body text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
        </p>

        <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-h3 text-foreground mb-3">Overview</h2>
            <p>
              WinterVell is a frontend demonstration using fictional data. This
              privacy policy describes how information is handled in the demo
              environment.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Data collection</h2>
            <p>
              The interactive demo does not collect personal data. All data
              displayed in the demo is fictional and generated locally in your
              browser. No data is transmitted to external servers.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Contact form</h2>
            <p>
              The contact form on this site accepts form submissions but no
              external email is sent. Messages are logged server-side for
              demonstration purposes only. No third party has access to form
              submissions.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Cookies and local storage</h2>
            <p>
              The demo uses browser local storage to persist demo data and
              preferences (such as theme and density settings). No tracking
              cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Self-hosted deployment</h2>
            <p>
              When WinterVell is deployed as a self-hosted product, data handling
              is entirely under the control of the deploying organisation.
              WinterVell does not phone home or transmit data to external
              services.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground mb-3">Contact</h2>
            <p>
              For privacy-related inquiries, please visit the{" "}
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
