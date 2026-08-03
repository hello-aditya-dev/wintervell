import type { Metadata } from "next";
import SiteLayout from "@/components/site/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — WinterVell",
  description: "WinterVell privacy policy. This page is a placeholder — professional legal review is required before commercial use.",
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-h1 sm:text-display text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-body text-muted-foreground leading-relaxed">
          This privacy policy is a draft placeholder. It must be reviewed by a
          qualified legal professional before WinterVell is offered commercially.
        </p>

        <div className="mt-8 rounded-lg border border-[var(--severity-medium-bg)] bg-[var(--severity-medium-bg)]/30 p-4">
          <p className="text-sm font-medium text-[var(--severity-medium-text)]">
            Draft — Not legally reviewed
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            This document has not been reviewed by a lawyer. It must not be
            relied upon as a binding privacy policy until it has been
            professionally reviewed and approved.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-h3 text-foreground">Data Controller</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell is self-hosted software. The organisation that deploys
              WinterVell is the data controller for any personal data collected
              through their instance. WinterVell does not collect, transmit, or
              store any user data on behalf of its licensees.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Data Collection</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell itself does not collect personal data. When deployed,
              the licensee&apos;s instance may collect:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                Account information (name, email) for authentication
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                Prospect and client information entered by the agency
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                Audit data from websites the agency is authorised to assess
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                Report and proposal content created by the agency
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Data Storage</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              All data is stored on the licensee&apos;s own infrastructure.
              WinterVell does not operate any external data services. The
              licensee is responsible for implementing appropriate data
              protection measures including encryption, access controls, and
              backup procedures.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Third-Party Services</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell may be configured to integrate with third-party
              services for AI, email, storage, and payment processing. These
              services are operated by their respective providers and are
              subject to their own privacy policies. The licensee is
              responsible for disclosing these integrations to their end users.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Cookies</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell uses only essential cookies for authentication and
              session management. No tracking cookies, analytics cookies, or
              third-party advertising cookies are used by the software itself.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Data Subject Rights</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              As a self-hosted product, data subject rights (access,
              rectification, erasure, portability) are managed by the
              licensee&apos;s organisation. WinterVell provides data export
              functionality to assist with these obligations.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Contact</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              For questions about this privacy policy, contact{" "}
              <a
                href="mailto:legal@wintervell.com"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                legal@wintervell.com
              </a>
              . For questions about data held by a specific WinterVell
              instance, contact the organisation operating that instance.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-[var(--text-tertiary)]">
            Last updated: 2025-08-03 · Draft — requires professional legal
            review before commercial use
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
