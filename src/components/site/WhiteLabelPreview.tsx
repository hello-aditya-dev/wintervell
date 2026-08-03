import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BRANDS = [
  {
    name: "Northstar Digital",
    colour: "#1E4D8C",
    initials: "ND",
    description: "Full-service digital agency",
  },
  {
    name: "Ironclad SEO",
    colour: "#6B3A2A",
    initials: "IS",
    description: "SEO specialist consultancy",
  },
  {
    name: "Apex Web Studio",
    colour: "#24584F",
    initials: "AW",
    description: "Web design and development",
  },
] as const;

export function WhiteLabelContent() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {BRANDS.map((brand) => (
        <div
          key={brand.name}
          className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: brand.colour }}
            >
              {brand.initials}
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">{brand.name}</h3>
              <p className="text-xs text-muted-foreground">{brand.description}</p>
            </div>
          </div>
          <div className="mt-4 rounded-md border border-border bg-surface-muted p-3">
            <div className="flex items-center gap-2">
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: brand.colour }}
              />
              <span className="text-xs font-medium text-foreground">
                Website Audit Report
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Prepared by {brand.name}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <Badge variant="outline" className="text-[10px]">
                Demonstration
              </Badge>
              <span className="text-[10px] text-[var(--text-tertiary)]">
                24 pages · 37 findings
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WhiteLabelPreview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">White-label preview</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Client-facing reports and proposals carry your agency branding.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: brand.colour }}
                >
                  {brand.initials}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{brand.name}</h3>
                  <p className="text-xs text-muted-foreground">{brand.description}</p>
                </div>
              </div>
              <div className="mt-4 rounded-md border border-border bg-surface-muted p-3">
                <div className="flex items-center gap-2">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: brand.colour }}
                  />
                  <span className="text-xs font-medium text-foreground">
                    Website Audit Report
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Prepared by {brand.name}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">
                    Demonstration
                  </Badge>
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    24 pages · 37 findings
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/white-label">Learn about white-label</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
