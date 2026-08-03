'use client';

import * as React from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/site/SiteLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DemoScenarioSelector } from '@/components/shared';
import {
  calculateAllReadinessScores,
  getAllCapabilities,
  getStatusLabel,
  getStatusDescription,
  getProductionBlockers,
  type CapabilityStatus,
  type ProductCapability,
  type ReadinessDetail,
} from '@/config/capabilities';
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Info,
  ExternalLink,
  CheckCircle2,
  Clock,
  Eye,
  LayoutDashboard,
  Ban,
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────

function getScoreColor(score: number) {
  if (score > 70) return { bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-400', bar: 'bg-emerald-500' };
  if (score >= 30) return { bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-400', bar: 'bg-amber-500' };
  return { bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200 dark:border-rose-800', text: 'text-rose-700 dark:text-rose-400', bar: 'bg-rose-500' };
}

function getStatusBadgeClasses(status: CapabilityStatus): string {
  switch (status) {
    case 'production':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800';
    case 'functional-preview':
      return 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/40 dark:text-sky-400 dark:border-sky-800';
    case 'interactive-demo':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800';
    case 'frontend-preview':
      return 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-400 dark:border-violet-800';
    case 'planned':
      return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    case 'unavailable':
      return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800';
  }
}

function getStatusIcon(status: CapabilityStatus) {
  switch (status) {
    case 'production': return <CheckCircle2 className="size-3.5" />;
    case 'functional-preview': return <CheckCircle2 className="size-3.5" />;
    case 'interactive-demo': return <Eye className="size-3.5" />;
    case 'frontend-preview': return <LayoutDashboard className="size-3.5" />;
    case 'planned': return <Clock className="size-3.5" />;
    case 'unavailable': return <Ban className="size-3.5" />;
  }
}

// ── Status definitions ────────────────────────────────────────────────────

const STATUS_DEFINITIONS: { status: CapabilityStatus; label: string; description: string }[] = [
  {
    status: 'production',
    label: 'Production',
    description: 'Fully implemented with real backend, real data, and real users.',
  },
  {
    status: 'functional-preview',
    label: 'Functional Preview',
    description: 'Connected to backend with some limitations. Not yet production-hardened.',
  },
  {
    status: 'interactive-demo',
    label: 'Interactive Demo',
    description: 'Full UI with simulated data. No real backend — state is client-side only.',
  },
  {
    status: 'frontend-preview',
    label: 'Frontend Preview',
    description: 'UI mockup with limited interaction. No backend integration.',
  },
  {
    status: 'planned',
    label: 'Planned',
    description: 'Design intended, implementation not started.',
  },
  {
    status: 'unavailable',
    label: 'Unavailable',
    description: 'Not available in any form.',
  },
];

// ── Filter options ────────────────────────────────────────────────────────

type TableFilter = 'all' | 'working-demo' | 'frontend-preview' | 'planned' | 'production-blockers';

const FILTER_OPTIONS: { key: TableFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'working-demo', label: 'Working demonstration' },
  { key: 'frontend-preview', label: 'Frontend preview' },
  { key: 'planned', label: 'Planned' },
  { key: 'production-blockers', label: 'Production blockers' },
];

function applyFilter(caps: ProductCapability[], filter: TableFilter): ProductCapability[] {
  switch (filter) {
    case 'all': return caps;
    case 'working-demo': return caps.filter((c) => c.status === 'interactive-demo' || c.status === 'functional-preview' || c.status === 'production');
    case 'frontend-preview': return caps.filter((c) => c.status === 'frontend-preview');
    case 'planned': return caps.filter((c) => c.status === 'planned');
    case 'production-blockers': return caps.filter((c) => c.productionBlocker);
  }
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ProductStatusPage() {
  const scores = React.useMemo(() => calculateAllReadinessScores(), []);
  const allCapabilities = React.useMemo(() => getAllCapabilities(), []);
  const blockers = React.useMemo(() => getProductionBlockers(), []);
  const [activeFilter, setActiveFilter] = React.useState<TableFilter>('all');

  const filteredCapabilities = React.useMemo(
    () => applyFilter(allCapabilities, activeFilter),
    [allCapabilities, activeFilter],
  );

  const scoreEntries: { key: string; detail: ReadinessDetail }[] = React.useMemo(
    () => [
      { key: 'interactiveDemo', detail: scores.interactiveDemo },
      { key: 'frontendWorkflow', detail: scores.frontendWorkflow },
      { key: 'basicCrmServer', detail: scores.basicCrmServer },
      { key: 'callCentreCrm', detail: scores.callCentreCrm },
      { key: 'auditProduct', detail: scores.auditProduct },
      { key: 'commercialSale', detail: scores.commercialSale },
    ],
    [scores],
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Page header */}
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h1 sm:text-display text-foreground">Product Status</h1>
          <p className="mt-4 text-body sm:text-h4 text-muted-foreground leading-relaxed">
            Honest, transparent assessment of WinterVell&apos;s current capabilities
            and readiness. This page is the single source of truth for what works,
            what is simulated, and what is not yet built.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild>
              <Link href="/app">
                Explore the demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <DemoScenarioSelector />
          </div>
        </div>

        {/* Current release summary */}
        <section className="mt-16" aria-labelledby="release-summary-heading">
          <h2 id="release-summary-heading" className="text-h2 text-foreground">
            Current release summary
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Eye className="size-5 text-primary" />,
                title: 'Frontend demonstration available',
                description: 'The interactive demo showcases the planned interface and workflows.',
              },
              {
                icon: <Info className="size-5 text-amber-500" />,
                title: 'Demo data is fictional',
                description: 'All data in the demo is deterministic and simulated — not from real sources.',
              },
              {
                icon: <AlertTriangle className="size-5 text-rose-500" />,
                title: 'Production backend not connected',
                description: 'No server-side persistence, authentication, or real API integration yet.',
              },
              {
                icon: <XCircle className="size-5 text-rose-500" />,
                title: 'Purchasing is not open',
                description: 'Licences are not available for purchase. Commercial flow is planned for Phase 2.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Readiness scorecards */}
        <section className="mt-16" aria-labelledby="readiness-heading">
          <h2 id="readiness-heading" className="text-h2 text-foreground">
            Readiness scores
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Six dimensions of product readiness, scored from the central capability
            registry. Scores are calculated honestly — they are not inflated.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scoreEntries.map(({ key, detail }) => {
              const colors = getScoreColor(detail.score);
              return (
                <Card key={key} className={`border ${colors.border} ${colors.bg}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={`text-base ${colors.text}`}>
                        {detail.label}
                      </CardTitle>
                      <span className={`text-2xl font-bold ${colors.text}`}>
                        {detail.score.toFixed(1)}%
                      </span>
                    </div>
                    <CardDescription>{detail.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Progress bar */}
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors.bar} transition-all`}
                        style={{ width: `${detail.score}%` }}
                      />
                    </div>

                    {/* Contributors */}
                    {detail.contributors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground">Contributors</p>
                        <ul className="mt-1 space-y-0.5">
                          {detail.contributors.map((c) => (
                            <li key={c} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span className="size-1 shrink-0 rounded-full bg-emerald-400" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Blockers */}
                    {detail.blockers.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground">Critical blockers</p>
                        <ul className="mt-1 space-y-0.5 max-h-32 overflow-y-auto">
                          {detail.blockers.map((b) => (
                            <li key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span className="size-1 shrink-0 rounded-full bg-rose-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Next phase */}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Next:</span>{' '}
                        {detail.nextPhase}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Capability table */}
        <section className="mt-16" aria-labelledby="capability-table-heading">
          <h2 id="capability-table-heading" className="text-h2 text-foreground">
            Capability registry
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Every product capability with its current status, evidence, production
            blockers, and next development phase.
          </p>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setActiveFilter(opt.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === opt.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Capability</TableHead>
                  <TableHead className="text-xs">Area</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Evidence</TableHead>
                  <TableHead className="text-xs">Production blocker</TableHead>
                  <TableHead className="text-xs">Next phase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCapabilities.map((cap) => (
                  <TableRow key={cap.id}>
                    <TableCell className="py-2.5">
                      <div>
                        <p className="text-sm font-medium text-foreground">{cap.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-[240px]">
                          {cap.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <span className="text-xs capitalize text-muted-foreground">
                        {cap.category.replace(/-/g, ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <Badge
                        variant="outline"
                        className={`text-[10px] gap-1 ${getStatusBadgeClasses(cap.status)}`}
                      >
                        {getStatusIcon(cap.status)}
                        {getStatusLabel(cap.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2.5">
                      {cap.evidenceRoutes.length > 0 ? (
                        <div className="flex flex-col gap-0.5">
                          {cap.evidenceRoutes.map((route) => (
                            <Link
                              key={route}
                              href={route}
                              className="text-xs text-primary hover:underline inline-flex items-center gap-0.5"
                            >
                              {route}
                              <ExternalLink className="size-2.5" />
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="py-2.5">
                      {cap.productionBlocker ? (
                        <Badge variant="outline" className="text-[10px] bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800">
                          Blocker
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <span className="text-xs text-muted-foreground">
                        {cap.nextPhase ? `Phase ${cap.nextPhase}` : '—'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCapabilities.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No capabilities match this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {filteredCapabilities.length} of {allCapabilities.length} capabilities shown
            {blockers.length > 0 && ` · ${blockers.length} production blockers`}
          </p>
        </section>

        {/* Status definitions */}
        <section className="mt-16" aria-labelledby="status-definitions-heading">
          <h2 id="status-definitions-heading" className="text-h2 text-foreground">
            Status definitions
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            What each status type means in the capability registry.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATUS_DEFINITIONS.map((def) => (
              <div
                key={def.status}
                className="rounded-lg border border-border bg-card p-5 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] gap-1 ${getStatusBadgeClasses(def.status)}`}
                  >
                    {getStatusIcon(def.status)}
                    {def.label}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {def.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment readiness */}
        <section className="mt-16" aria-labelledby="deployment-heading">
          <h2 id="deployment-heading" className="text-h2 text-foreground">
            Deployment readiness
          </h2>
          <div className="mt-6 rounded-lg border border-border bg-card p-6 shadow-xs">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    The frontend can be deployed as a demonstration.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    The interactive demo is a complete frontend application that
                    can be hosted and shared with stakeholders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    The CRM cannot yet operate as a production system.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No server-side persistence, authentication, or API layer. All
                    data is client-side and resets on reload.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    The call-centre scenario does not connect to telephony.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    The call-centre dashboard and call management are frontend
                    previews. No telephony provider is integrated.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    The audit scenario does not crawl websites.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Audit findings are simulated. The crawl engine, rules engine,
                    and evidence pipeline are not yet implemented.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 size-5 text-rose-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Data persistence remains browser-local.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All data is stored in the browser&apos;s Zustand store. There is no
                    database, no server-side session, and no cross-device sync.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-lg border border-border bg-primary-subtle p-8 text-center">
          <h2 className="text-h2 text-foreground">
            Explore the interactive demonstration
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            The demo uses fictional data to show the complete workflow from
            prospect to opportunity, including audit, reports, and proposals.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/app">
                Open demo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
