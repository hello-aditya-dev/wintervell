import Link from "next/link";
import {
  Search,
  FileSearch,
  FileText,
  FileCheck,
  LayoutList,
} from "lucide-react";

const PREVIEWS = [
  {
    label: "Audit detail",
    description: "Review audit categories, scores, and progress.",
    icon: Search,
    mockData: {
      title: "Meridian Health Group",
      rows: [
        { category: "Technical Health", score: "72/100", status: "Review" },
        { category: "SEO Foundations", score: "54/100", status: "Review" },
        { category: "Performance", score: "81/100", status: "Approved" },
      ],
    },
    href: "/app",
  },
  {
    label: "Finding evidence",
    description: "Structured evidence for each finding.",
    icon: FileSearch,
    mockData: {
      title: "Missing meta descriptions",
      severity: "High",
      evidence: [
        "12 pages missing <meta name='description'>",
        "Affects indexing and click-through rates",
        "Identified in /about, /services, /contact…",
      ],
    },
    href: "/app",
  },
  {
    label: "Client report",
    description: "Branded, exported PDF report with findings.",
    icon: FileText,
    mockData: {
      title: "Website Audit Report",
      detail: "Prepared by Northstar Digital",
      pages: "24 pages · 37 findings",
      status: "Published (Demo)",
    },
    href: "/app",
  },
  {
    label: "Proposal",
    description: "Scoped proposal derived from approved findings.",
    icon: FileCheck,
    mockData: {
      title: "SEO remediation project",
      scope: "18 items · 6 weeks",
      value: "$4,800",
      status: "Sent (Demo)",
    },
    href: "/app",
  },
  {
    label: "Pipeline",
    description: "Track prospects through the sales pipeline.",
    icon: LayoutList,
    mockData: {
      title: "Pipeline overview",
      stages: [
        { name: "New prospect", count: 3 },
        { name: "Audit running", count: 1 },
        { name: "Report sent (Demo)", count: 2 },
        { name: "Proposal sent (Demo)", count: 1 },
      ],
    },
    href: "/app",
  },
] as const;

function AuditDetailPreview({ mockData }: { mockData: typeof PREVIEWS[0]["mockData"] }) {
  const data = mockData as unknown as { title: string; rows: { category: string; score: string; status: string }[] };
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-foreground">{data.title}</div>
      <div className="space-y-1">
        {data.rows.map((row) => (
          <div key={row.category} className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5">
            <span className="text-xs text-foreground">{row.category}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tabular-nums text-foreground">{row.score}</span>
              <span className="rounded px-1 py-0.5 text-[10px] font-medium bg-primary-subtle text-primary">{row.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FindingEvidencePreview({ mockData }: { mockData: typeof PREVIEWS[0]["mockData"] }) {
  const data = mockData as unknown as { title: string; severity: string; evidence: string[] };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{data.title}</span>
        <span className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-[var(--severity-high-bg)] text-[var(--severity-high-text)]">
          {data.severity}
        </span>
      </div>
      <ul className="space-y-1">
        {data.evidence.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-border" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClientReportPreview({ mockData }: { mockData: typeof PREVIEWS[0]["mockData"] }) {
  const data = mockData as unknown as { title: string; detail: string; pages: string; status: string };
  return (
    <div className="space-y-2">
      <div className="rounded-md border border-border bg-background p-3">
        <div className="text-sm font-medium text-foreground">{data.title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{data.detail}</div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{data.pages}</span>
          <span className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-[var(--success-subtle)] text-[var(--success)]">{data.status}</span>
        </div>
      </div>
    </div>
  );
}

function ProposalPreview({ mockData }: { mockData: typeof PREVIEWS[0]["mockData"] }) {
  const data = mockData as unknown as { title: string; scope: string; value: string; status: string };
  return (
    <div className="space-y-2">
      <div className="rounded-md border border-border bg-background p-3">
        <div className="text-sm font-medium text-foreground">{data.title}</div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{data.scope}</span>
          <span className="font-medium text-foreground">{data.value}</span>
        </div>
        <div className="mt-2">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-[var(--info-subtle)] text-[var(--info)]">{data.status}</span>
        </div>
      </div>
    </div>
  );
}

function PipelinePreview({ mockData }: { mockData: typeof PREVIEWS[0]["mockData"] }) {
  const data = mockData as unknown as { title: string; stages: { name: string; count: number }[] };
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-foreground">{data.title}</div>
      <div className="space-y-1">
        {data.stages.map((stage) => (
          <div key={stage.name} className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5">
            <span className="text-xs text-foreground">{stage.name}</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-primary-subtle text-[10px] font-medium text-primary tabular-nums">
              {stage.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PREVIEW_RENDERERS = [
  AuditDetailPreview,
  FindingEvidencePreview,
  ClientReportPreview,
  ProposalPreview,
  PipelinePreview,
];

export default function ProductPreview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-foreground">Product preview</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Interactive frontend demonstration using fictional data
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PREVIEWS.map((preview, i) => {
            const Icon = preview.icon;
            const PreviewComponent = PREVIEW_RENDERERS[i];
            return (
              <Link
                key={preview.label}
                href={preview.href}
                className="group rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-primary/30"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {preview.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {preview.description}
                </p>
                <div className="mt-3 rounded-md border border-border bg-surface-muted p-2.5">
                  <PreviewComponent mockData={preview.mockData as any} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
