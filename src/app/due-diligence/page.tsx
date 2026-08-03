import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  FileSearch,
  Scale,
  Shield,
  AlertTriangle,
  FileText,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Due diligence — WinterVell",
  description:
    "Documents and information for evaluating WinterVell before purchase. Product provenance, dependency licences, security model, known limitations, and commercial licence.",
};

const DUE_DILIGENCE_DOCUMENTS = [
  {
    icon: FileSearch,
    title: "Product provenance",
    description:
      "Origin, ownership, and development history of the WinterVell codebase. This document covers the product's development timeline, the team behind it, and the technology choices made.",
    status: "In preparation" as const,
    content: [
      "WinterVell is developed as a source-code product for agencies.",
      "The codebase is built on Next.js 16, TypeScript 5, and Prisma ORM.",
      "The product is in active development with a frontend demonstration available.",
      "Backend implementation is in progress.",
    ],
  },
  {
    icon: Scale,
    title: "Dependency licences",
    description:
      "Licence audit of all third-party dependencies included in the product. This document lists each dependency, its licence type, and any obligations or restrictions.",
    status: "In preparation" as const,
    content: [
      "A full dependency licence audit will be provided before the commercial release.",
      "WinterVell primarily uses MIT and Apache-2.0 licensed dependencies.",
      "No copyleft dependencies are used in the production codebase.",
    ],
  },
  {
    icon: Shield,
    title: "Security model",
    description:
      "Security architecture, threat model, and data-handling practices. This document covers authentication, data isolation, audit worker isolation, and the security controls in place.",
    status: "In preparation" as const,
    content: [
      "Self-hosted deployment — customer data remains on your infrastructure.",
      "Organisation-scoped data isolation with multi-tenant architecture.",
      "SSRF protection for audit worker execution.",
      "IDOR prevention and rate limiting.",
      "Licence validation does not transmit client or audit data.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Known limitations",
    description:
      "Honest assessment of current product limitations and in-progress features. This document is intended to set accurate expectations before purchase.",
    status: "Available" as const,
    content: [
      "The product is in development — the commercial release is not yet complete.",
      "The current demonstration is a frontend-only interactive demo using fictional data.",
      "Backend implementation is in progress.",
      "Checkout is not yet open.",
      "Automated findings are indicative, not definitive. Users must review all findings.",
      "WinterVell does not certify WCAG compliance.",
      "WinterVell does not guarantee SEO ranking improvements.",
    ],
  },
  {
    icon: FileText,
    title: "Commercial licence",
    description:
      "Terms, scope, and permitted use under the WinterVell Commercial Source Licence (WV-CSL) v1.0. This document defines what buyers may and may not do with the source code.",
    status: "In preparation" as const,
    content: [
      "WinterVell is sold under the WinterVell Commercial Source Licence (WV-CSL) v1.0.",
      "Buyers receive the complete source code for internal business use.",
      "Redistribution, resale, and sublicensing of the source code are prohibited.",
      "Buyers may charge clients for audits, reports, and related services.",
      "Full licence terms will be published before the commercial release.",
    ],
  },
] as const;

export default function DueDiligencePage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h1 sm:text-display text-foreground">
            Due diligence
          </h1>
          <p className="mt-4 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            Documents and information for evaluating WinterVell before purchase.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {DUE_DILIGENCE_DOCUMENTS.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.title}
                className="rounded-lg border border-border bg-card p-6 shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-subtle">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-h4 text-foreground">{doc.title}</h2>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          doc.status === "Available"
                            ? "bg-[var(--success-subtle)] text-[var(--success)]"
                            : "bg-surface-muted text-muted-foreground"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {doc.content.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-border" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-lg border border-border bg-primary-subtle p-8 text-center">
          <h2 className="text-h2 text-foreground">
            Have questions before purchasing?
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Contact us to ask about the product, licence terms, or security
            practices.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/contact">
                Ask a product question
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
