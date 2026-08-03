import type { Metadata } from "next";
import SiteLayout from "@/components/site/SiteLayout";

export const metadata: Metadata = {
  title: "Terms of Service — WinterVell",
  description: "WinterVell terms of service. This page is a placeholder — professional legal review is required before commercial use.",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-h1 sm:text-display text-foreground">Terms of Service</h1>
        <p className="mt-4 text-body text-muted-foreground leading-relaxed">
          These terms of service are a draft placeholder. They must be reviewed
          by a qualified legal professional before WinterVell is offered
          commercially.
        </p>

        <div className="mt-8 rounded-lg border border-[var(--severity-medium-bg)] bg-[var(--severity-medium-bg)]/30 p-4">
          <p className="text-sm font-medium text-[var(--severity-medium-text)]">
            Draft — Not legally reviewed
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            This document has not been reviewed by a lawyer. It must not be
            relied upon as binding terms of service until it has been
            professionally reviewed and approved.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-h3 text-foreground">Licence Grant</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell is licensed under the WinterVell Commercial Source
              License (WV-CSL) v1.0. The licence grants the right to use,
              modify, and deploy the source code within the terms specified in
              the purchased licence tier (Agency, Studio, or Enterprise). The
              licence does not grant the right to redistribute, resell, or
              publicly publish the source code.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Scope of Use</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The licence permits commercial use of the software for conducting
              website audits, generating reports, creating proposals, and
              managing client relationships. The licensee may charge clients for
              these services. The number of production deployments is limited by
              the licence tier.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Intellectual Property</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell and its source code are the intellectual property of
              the WinterVell project owner. The licence grants a limited,
              non-exclusive, non-transferable right to use the software. All
              rights not expressly granted are reserved. The licensee retains
              ownership of any modifications they make for their internal use.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Disclaimer of Warranties</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell is provided &ldquo;as is&rdquo; without warranty of
              any kind, express or implied. The authors make no warranties
              regarding merchantability, fitness for a particular purpose, or
              non-infringement. The licensee assumes all risk associated with
              the use of the software.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Limitation of Liability</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              In no event shall the WinterVell project owner be liable for any
              direct, indirect, incidental, special, consequential, or
              punitive damages arising from the use or inability to use the
              software, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Audit Findings</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell generates automated findings about websites. These
              findings are indicative, not definitive. They do not constitute
              legal compliance certification, SEO ranking guarantees, or
              security audit results. Users must review and verify all findings
              before presenting them to clients.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Third-Party Dependencies</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              WinterVell uses open-source software packages. Each package is
              governed by its own licence terms. A list of third-party
              dependencies and their licences is available in the
              documentation. The licensee is responsible for complying with all
              applicable third-party licence terms.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Modifications</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The licensee may modify the source code for internal business use
              in accordance with their licence tier. Modifications must not
              remove or alter any licence or copyright notices. The licence
              terms apply equally to modified versions of the software.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Termination</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The licence may be terminated if the licensee breaches its terms.
              Upon termination, the licensee must cease using the software and
              destroy all copies. Termination does not affect data already
              collected or reports already generated using the software.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-foreground">Contact</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              For questions about these terms, contact{" "}
              <a
                href="mailto:legal@wintervell.com"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                legal@wintervell.com
              </a>
              .
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
