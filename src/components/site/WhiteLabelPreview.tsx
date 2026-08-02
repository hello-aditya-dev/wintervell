"use client";

import { useState } from "react";
import { Snowflake } from "lucide-react";

const BRANDS = [
  {
    id: "northstar",
    name: "Northstar Digital",
    primaryColor: "#1E4D8C",
    contactEmail: "hello@northstardigital.example",
    reportCover: "Website Audit Report",
  },
  {
    id: "cedarline",
    name: "Cedarline Agency",
    primaryColor: "#24584F",
    contactEmail: "contact@cedarline.example",
    reportCover: "Site Performance Review",
  },
  {
    id: "harbordesk",
    name: "HarborDesk Studio",
    primaryColor: "#6B4A0A",
    contactEmail: "info@harbordesk.example",
    reportCover: "Digital Presence Audit",
  },
] as const;

type Brand = (typeof BRANDS)[number];

function ReportPreview({ brand }: { brand: Brand }) {
  return (
    <div
      className="rounded-lg border border-border bg-card p-6 shadow-xs transition-all duration-200"
      style={{ "--brand-color": brand.primaryColor } as React.CSSProperties}
    >
      {/* Report cover */}
      <div className="rounded-md border border-border p-4">
        <div className="flex items-center gap-2">
          <div
            className="flex size-8 items-center justify-center rounded-md"
            style={{ backgroundColor: `${brand.primaryColor}15` }}
          >
            <Snowflake
              className="size-4"
              style={{ color: brand.primaryColor }}
              strokeWidth={2}
            />
          </div>
          <span
            className="text-sm font-semibold"
            style={{ color: brand.primaryColor }}
          >
            {brand.name}
          </span>
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-h4 text-foreground">{brand.reportCover}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Prepared for Meridian Health Group
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {brand.contactEmail}
          </p>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Technical Health</span>
            <span className="text-xs font-medium tabular-nums text-foreground">72/100</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-muted">
            <div
              className="h-1.5 rounded-full transition-all duration-200"
              style={{ width: "72%", backgroundColor: brand.primaryColor }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">SEO Foundations</span>
            <span className="text-xs font-medium tabular-nums text-foreground">54/100</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-muted">
            <div
              className="h-1.5 rounded-full transition-all duration-200"
              style={{ width: "54%", backgroundColor: brand.primaryColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Inner interactive content — can be used inside any wrapper.
 * Used by both the homepage section and the dedicated white-label page.
 */
export function WhiteLabelContent() {
  const [activeBrand, setActiveBrand] = useState<Brand>(BRANDS[0]);

  return (
    <>
      {/* Brand switcher */}
      <div className="flex items-center justify-center gap-2">
        {BRANDS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setActiveBrand(brand)}
            className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
              activeBrand.id === brand.id
                ? "border-primary bg-primary-subtle text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: brand.primaryColor }}
            />
            {brand.name}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="mt-8 mx-auto max-w-md">
        <ReportPreview brand={activeBrand} />
      </div>

      {/* Brand details */}
      <div className="mt-8 mx-auto max-w-md grid grid-cols-2 gap-4">
        <div className="rounded-md border border-border bg-card p-3">
          <span className="text-xs text-muted-foreground">Agency name</span>
          <p className="mt-0.5 text-sm font-medium text-foreground">
            {activeBrand.name}
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <span className="text-xs text-muted-foreground">Primary colour</span>
          <div className="mt-0.5 flex items-center gap-2">
            <span
              className="size-4 rounded"
              style={{ backgroundColor: activeBrand.primaryColor }}
            />
            <span className="text-sm font-mono text-foreground">
              {activeBrand.primaryColor}
            </span>
          </div>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <span className="text-xs text-muted-foreground">Contact</span>
          <p className="mt-0.5 text-sm text-foreground">
            {activeBrand.contactEmail}
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <span className="text-xs text-muted-foreground">Report cover</span>
          <p className="mt-0.5 text-sm text-foreground">
            {activeBrand.reportCover}
          </p>
        </div>
      </div>
    </>
  );
}

/**
 * Homepage section wrapper — includes the section heading and container.
 */
export default function WhiteLabelPreview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">White-label preview</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Switch between three fictional agency brands to see how reports and
            branding adapt.
          </p>
        </div>
        <div className="mt-8">
          <WhiteLabelContent />
        </div>
      </div>
    </section>
  );
}
