import {
  Package,
  Server,
  Code2,
  Database,
  FileText,
  Shield,
  FileCheck,
  Monitor,
  Construction,
  Lock,
  AlertCircle,
} from "lucide-react";

const PLANNED_ITEMS = [
  { label: "Application source", icon: Code2 },
  { label: "Frontend components", icon: Monitor },
  { label: "Database migrations", icon: Database },
  { label: "Environment template", icon: Server },
  { label: "Deployment documentation", icon: FileText },
  { label: "Licence documentation", icon: Shield },
] as const;

const CURRENT_STATE = [
  {
    label: "Frontend demonstration",
    status: "available" as const,
    description: "Interactive demo with fictional data",
  },
  {
    label: "Backend implementation",
    status: "in_progress" as const,
    description: "In progress",
  },
  {
    label: "Checkout",
    status: "not_available" as const,
    description: "Not yet open",
  },
  {
    label: "Commercial release",
    status: "not_available" as const,
    description: "Not yet complete",
  },
] as const;

function StatusIcon({ status }: { status: "available" | "in_progress" | "not_available" }) {
  switch (status) {
    case "available":
      return <FileCheck className="size-4 text-[var(--success)]" />;
    case "in_progress":
      return <Construction className="size-4 text-[var(--warning)]" />;
    case "not_available":
      return <AlertCircle className="size-4 text-muted-foreground" />;
  }
}

export default function OwnershipDeployment() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">Ownership and deployment</h2>
          <p className="mt-3 text-body text-muted-foreground">
            What is planned and what is currently available.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Planned source package */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center gap-2">
              <Package className="size-5 text-primary" />
              <h3 className="text-h4 text-foreground">Planned source package</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              The source-code package is planned to include the following
              components.
            </p>
            <ul className="mt-4 space-y-2.5">
              {PLANNED_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-center gap-2.5">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Current release state */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center gap-2">
              <Lock className="size-5 text-muted-foreground" />
              <h3 className="text-h4 text-foreground">Current release state</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Honest status of the product as it exists today.
            </p>
            <ul className="mt-4 space-y-3">
              {CURRENT_STATE.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2.5 rounded-md border border-border bg-background p-3"
                >
                  <StatusIcon status={item.status} />
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
