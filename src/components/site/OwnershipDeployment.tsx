import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const OWNERSHIP_ITEMS = [
  "Complete source code included",
  "Deploy on your own infrastructure",
  "Your domain, your branding",
  "No vendor lock-in",
  "No recurring platform fees",
  "Client revenue is yours",
  "Data stays on your servers",
  "Modify for your business needs",
];

const RELEASE_STATE = [
  { label: "Interactive product demo", status: "available" as const },
  { label: "Deterministic demo data", status: "available" as const },
  { label: "Prospect management", status: "available" as const },
  { label: "Audit workflow", status: "available" as const },
  { label: "Finding review", status: "available" as const },
  { label: "Report builder", status: "available" as const },
  { label: "Proposal builder", status: "available" as const },
  { label: "Pipeline tracking", status: "available" as const },
  { label: "White-label branding", status: "available" as const },
  { label: "Commercial licensing", status: "planned" as const },
  { label: "Self-hosting docs", status: "planned" as const },
  { label: "AI integration", status: "planned" as const },
];

export default function OwnershipDeployment() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">Ownership and current release state</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Purchase the source code. Deploy on your infrastructure. Keep the client revenue.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Ownership */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
            <h3 className="text-h4 text-foreground">Source-code ownership</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The WinterVell Commercial Source Licence (WV-CSL) grants you the complete source code for internal business use.
            </p>
            <ul className="mt-4 space-y-2.5">
              {OWNERSHIP_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button variant="outline" size="sm" asChild>
                <Link href="/license">View licence terms</Link>
              </Button>
            </div>
          </div>

          {/* Release state */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
            <h3 className="text-h4 text-foreground">Current release state</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The interactive demo is available. Purchasing is not yet open.
            </p>
            <div className="mt-4 space-y-2">
              {RELEASE_STATE.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
                >
                  <span className="text-sm text-foreground">{item.label}</span>
                  <Badge
                    variant={item.status === "available" ? "default" : "outline"}
                    className="text-[10px]"
                  >
                    {item.status === "available" ? "Demo" : "Planned"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
