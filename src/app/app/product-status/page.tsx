'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { PageHeader, DemoLabel, DemoScenarioSelector } from '@/components/shared';
import { useDemoStore } from '@/demo/state/demo-store';
import {
  calculateAllReadinessScores,
  getAllCapabilities,
  getCapabilitiesByCategory,
  getProductionBlockers,
  getStatusLabel,
  type CapabilityCategory,
  type CapabilityStatus,
  type ProductCapability,
  type ReadinessDetail,
} from '@/config/capabilities';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Eye,
  LayoutDashboard,
  Ban,
  ShieldCheck,
  Database,
  Server,
  FileCode2,
  Lock,
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────

function getScoreColor(score: number) {
  if (score > 70) return { text: 'text-emerald-700 dark:text-emerald-400', bar: 'bg-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/40' };
  if (score >= 30) return { text: 'text-amber-700 dark:text-amber-400', bar: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40' };
  return { text: 'text-rose-700 dark:text-rose-400', bar: 'bg-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/40' };
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

const CATEGORY_LABELS: Record<CapabilityCategory, string> = {
  demo: 'Demo',
  crm: 'CRM',
  'call-centre': 'Call Centre',
  audit: 'Audit',
  reporting: 'Reporting',
  commercial: 'Commercial',
  infrastructure: 'Infrastructure',
  security: 'Security',
};

// ── Module readiness by category ──────────────────────────────────────────

function computeCategoryReadiness() {
  const categories: CapabilityCategory[] = [
    'demo', 'crm', 'call-centre', 'audit', 'reporting', 'commercial', 'infrastructure', 'security',
  ];
  return categories.map((cat) => {
    const caps = getCapabilitiesByCategory(cat);
    const totalWeight = caps.reduce((sum, c) => sum + c.weight, 0);
    const weightedScore = caps.reduce((sum, c) => {
      const weights: Record<CapabilityStatus, number> = {
        production: 1,
        'functional-preview': 0.75,
        'interactive-demo': 0.45,
        'frontend-preview': 0.2,
        planned: 0,
        unavailable: 0,
      };
      return sum + c.weight * weights[c.status];
    }, 0);
    const score = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
    return { category: cat, label: CATEGORY_LABELS[cat], caps, score };
  });
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AppProductStatusPage() {
  const scenario = useDemoStore((s) => s.scenario);
  const scores = React.useMemo(() => calculateAllReadinessScores(), []);
  const allCapabilities = React.useMemo(() => getAllCapabilities(), []);
  const blockers = React.useMemo(() => getProductionBlockers(), []);
  const categoryReadiness = React.useMemo(() => computeCategoryReadiness(), []);

  const scoreEntries: { key: string; label: string; detail: ReadinessDetail }[] = React.useMemo(
    () => [
      { key: 'interactiveDemo', label: 'Demo readiness', detail: scores.interactiveDemo },
      { key: 'frontendWorkflow', label: 'Frontend workflow', detail: scores.frontendWorkflow },
      { key: 'basicCrmServer', label: 'Basic CRM server', detail: scores.basicCrmServer },
      { key: 'callCentreCrm', label: 'Call-centre CRM', detail: scores.callCentreCrm },
      { key: 'auditProduct', label: 'Audit product', detail: scores.auditProduct },
      { key: 'commercialSale', label: 'Commercial sale', detail: scores.commercialSale },
    ],
    [scores],
  );

  // Unique backend dependencies
  const backendDeps = React.useMemo(() => {
    const deps = new Set<string>();
    allCapabilities.forEach((c) => {
      if (c.backendDependency) deps.add(c.backendDependency);
    });
    return Array.from(deps).sort();
  }, [allCapabilities]);

  // Unique security dependencies
  const securityDeps = React.useMemo(() => {
    const deps = new Set<string>();
    allCapabilities.forEach((c) => {
      if (c.securityDependency) deps.add(c.securityDependency);
    });
    return Array.from(deps).sort();
  }, [allCapabilities]);

  return (
    <div>
      <PageHeader
        title="Product Status"
        description="Engineering view of product readiness, module status, and production blockers."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel variant="full" />
            <DemoScenarioSelector />
          </div>
        }
      />

      {/* Module readiness by category */}
      <section aria-labelledby="module-readiness-heading">
        <h2 id="module-readiness-heading" className="text-h4 text-foreground mb-4">
          Module readiness
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {categoryReadiness.map(({ category, label, caps, score }) => {
            const colors = getScoreColor(score);
            const statusBreakdown = {
              production: caps.filter((c) => c.status === 'production').length,
              'functional-preview': caps.filter((c) => c.status === 'functional-preview').length,
              'interactive-demo': caps.filter((c) => c.status === 'interactive-demo').length,
              'frontend-preview': caps.filter((c) => c.status === 'frontend-preview').length,
              planned: caps.filter((c) => c.status === 'planned').length,
              unavailable: caps.filter((c) => c.status === 'unavailable').length,
            };
            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{label}</CardTitle>
                    <span className={`text-lg font-bold ${colors.text}`}>
                      {score}%
                    </span>
                  </div>
                  <CardDescription>
                    {caps.length} capabilities · {caps.filter((c) => c.productionBlocker).length} blockers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full ${colors.bar} transition-all`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(statusBreakdown)
                      .filter(([, count]) => count > 0)
                      .map(([status, count]) => (
                        <Badge
                          key={status}
                          variant="outline"
                          className={`text-[9px] ${getStatusBadgeClasses(status as CapabilityStatus)}`}
                        >
                          {count}× {getStatusLabel(status as CapabilityStatus)}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Readiness scores */}
      <section className="mt-10" aria-labelledby="readiness-scores-heading">
        <h2 id="readiness-scores-heading" className="text-h4 text-foreground mb-4">
          Readiness scores
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scoreEntries.map(({ key, label, detail }) => {
            const colors = getScoreColor(detail.score);
            return (
              <div
                key={key}
                className={`rounded-lg border p-4 ${colors.bg}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <span className={`text-xl font-bold ${colors.text}`}>
                    {detail.score.toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${colors.bar} transition-all`}
                    style={{ width: `${detail.score}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{detail.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Test evidence */}
      <section className="mt-10" aria-labelledby="test-evidence-heading">
        <h2 id="test-evidence-heading" className="text-h4 text-foreground mb-4">
          Current test evidence
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Unit tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <FileCode2 className="size-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">
                    No unit test suite yet. Planned for Phase 2 alongside backend implementation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">E2E tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <FileCode2 className="size-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">
                    No end-to-end tests yet. Will be introduced with Playwright in Phase 2.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Backend dependencies */}
      <section className="mt-10" aria-labelledby="backend-deps-heading">
        <h2 id="backend-deps-heading" className="text-h4 text-foreground mb-4">
          Backend dependencies
        </h2>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Dependency</TableHead>
                <TableHead className="text-xs">Required by</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backendDeps.map((dep) => {
                const requiring = allCapabilities.filter((c) => c.backendDependency === dep);
                const anyWorking = requiring.some(
                  (c) =>
                    c.status === 'production' ||
                    c.status === 'functional-preview' ||
                    c.status === 'interactive-demo',
                );
                return (
                  <TableRow key={dep}>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <Server className="size-3.5 text-muted-foreground" />
                        <span className="text-sm text-foreground">{dep}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <span className="text-xs text-muted-foreground">
                        {requiring.map((c) => c.name).join(', ')}
                      </span>
                    </TableCell>
                    <TableCell className="py-2">
                      {anyWorking ? (
                        <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800">
                          Partial
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800">
                          Not connected
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Security dependencies */}
      <section className="mt-10" aria-labelledby="security-deps-heading">
        <h2 id="security-deps-heading" className="text-h4 text-foreground mb-4">
          Security dependencies
        </h2>
        {securityDeps.length > 0 ? (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Dependency</TableHead>
                  <TableHead className="text-xs">Required by</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityDeps.map((dep) => {
                  const requiring = allCapabilities.filter((c) => c.securityDependency === dep);
                  return (
                    <TableRow key={dep}>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <Lock className="size-3.5 text-muted-foreground" />
                          <span className="text-sm text-foreground">{dep}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className="text-xs text-muted-foreground">
                          {requiring.map((c) => c.name).join(', ')}
                        </span>
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge variant="outline" className="text-[10px] bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800">
                          Not implemented
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">
              No explicit security dependencies declared in the capability registry.
              Security capabilities (webhook verification, audit logging, data retention)
              are captured as infrastructure blockers.
            </p>
          </div>
        )}
      </section>

      {/* Phase roadmap */}
      <section className="mt-10" aria-labelledby="phase-roadmap-heading">
        <h2 id="phase-roadmap-heading" className="text-h4 text-foreground mb-4">
          Phase roadmap
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <CardTitle className="text-sm">Phase 1</CardTitle>
              </div>
              <CardDescription>Interactive frontend demo</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800">
                Done
              </Badge>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>· Complete UI for CRM workflows</li>
                <li>· Audit, report, proposal flows</li>
                <li>· Call-centre frontend previews</li>
                <li>· Demo data and scenario switching</li>
                <li>· Service catalogue and branding</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-amber-500" />
                <CardTitle className="text-sm">Phase 2</CardTitle>
              </div>
              <CardDescription>Server-side and persistence</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800">
                Planned
              </Badge>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>· PostgreSQL + Prisma persistence</li>
                <li>· NextAuth.js authentication</li>
                <li>· RBAC and organisations</li>
                <li>· API layer</li>
                <li>· Audit worker + crawl engine</li>
                <li>· PDF rendering service</li>
                <li>· Checkout + licence server</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-gray-400" />
                <CardTitle className="text-sm">Phase 3</CardTitle>
              </div>
              <CardDescription>Call centre and advanced features</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-[10px] bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                Planned
              </Badge>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>· Telephony provider adapter</li>
                <li>· Agent sessions + presence</li>
                <li>· Queue routing engine</li>
                <li>· Campaign dialler</li>
                <li>· Call recording storage</li>
                <li>· Supervisor real-time events</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current schema state */}
      <section className="mt-10" aria-labelledby="schema-state-heading">
        <h2 id="schema-state-heading" className="text-h4 text-foreground mb-4">
          Current schema state
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Database className="mt-0.5 size-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Prisma SQLite placeholder
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  A Prisma schema with SQLite is configured in the project. The schema
                  currently contains placeholder models. No data flows through Prisma
                  in the current demo — all state is managed client-side in the Zustand
                  demo store. Production will migrate to PostgreSQL.
                </p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800">
                    Placeholder only
                  </Badge>
                  <Badge variant="outline" className="text-[10px] bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                    SQLite → PostgreSQL planned
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Deployment state */}
      <section className="mt-10" aria-labelledby="deployment-state-heading">
        <h2 id="deployment-state-heading" className="text-h4 text-foreground mb-4">
          Deployment state
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Frontend deployable</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    The Next.js frontend can be deployed as a static or SSR application.
                    The interactive demo works without any backend services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 size-5 text-rose-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Backend not connected</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No API routes connect to real services. All CRUD operations use the
                    in-memory demo store. There is no database, no authentication, and
                    no server-side business logic.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Production blockers list */}
      <section className="mt-10" aria-labelledby="blockers-heading">
        <h2 id="blockers-heading" className="text-h4 text-foreground mb-4">
          Production blockers
        </h2>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Capability</TableHead>
                <TableHead className="text-xs">Category</TableHead>
                <TableHead className="text-xs">Current status</TableHead>
                <TableHead className="text-xs">Backend dependency</TableHead>
                <TableHead className="text-xs">Next phase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockers.map((cap) => (
                <TableRow key={cap.id}>
                  <TableCell className="py-2">
                    <p className="text-sm font-medium text-foreground">{cap.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                      {cap.description}
                    </p>
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-xs capitalize text-muted-foreground">
                      {cap.category.replace(/-/g, ' ')}
                    </span>
                  </TableCell>
                  <TableCell className="py-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] gap-1 ${getStatusBadgeClasses(cap.status)}`}
                    >
                      {getStatusIcon(cap.status)}
                      {getStatusLabel(cap.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-xs text-muted-foreground">
                      {cap.backendDependency || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-xs text-muted-foreground">
                      {cap.nextPhase ? `Phase ${cap.nextPhase}` : '—'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {blockers.length} production blockers identified from the capability registry.
        </p>
      </section>
    </div>
  );
}
