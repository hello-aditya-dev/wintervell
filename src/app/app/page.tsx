'use client';

import * as React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { useDemoStore } from '@/demo/state/demo-store';
import {
  ArrowRight,
  FileText,
  Users,
  ClipboardList,
  TrendingUp,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const RECENT_ACTIVITY = [
  {
    id: 'act-1',
    type: 'audit' as const,
    label: 'Demonstration audit created',
    detail: 'Meridian Health Group — Score: 64/100',
    time: '2 hours ago',
    href: '/app/audits/audit-1',
  },
  {
    id: 'act-2',
    type: 'prospect' as const,
    label: 'Demonstration prospect added',
    detail: 'Brightpath Consulting',
    time: '5 hours ago',
    href: '/app/prospects/prospect-4',
  },
  {
    id: 'act-3',
    type: 'task' as const,
    label: 'Demonstration task updated',
    detail: 'Review Meridian Health Group findings',
    time: '1 day ago',
    href: '/app/tasks',
  },
  {
    id: 'act-4',
    type: 'report' as const,
    label: 'Demonstration report state updated',
    detail: 'Website Audit Report — Meridian Health Group',
    time: '1 day ago',
    href: '/app/reports/report-1',
  },
  {
    id: 'act-5',
    type: 'prospect' as const,
    label: 'Demonstration proposal state updated',
    detail: 'SEO remediation project — $4,800',
    time: '2 days ago',
    href: '/app/proposals/proposal-1',
  },
  {
    id: 'act-6',
    type: 'audit' as const,
    label: 'Demonstration audit created',
    detail: 'Brightpath Consulting — 34 pages',
    time: '3 days ago',
    href: '/app/audits/audit-2',
  },
];

const PIPELINE_STAGES = [
  { label: 'New', count: 2, value: 24000 },
  { label: 'Audit', count: 1, value: 12000 },
  { label: 'Report', count: 2, value: 28000 },
  { label: 'Proposal', count: 1, value: 48000 },
  { label: 'Won', count: 2, value: 60000 },
];

const CATEGORY_SCORES = [
  { label: 'Technical', score: 72, color: 'bg-primary' },
  { label: 'SEO', score: 58, color: 'bg-[var(--info)]' },
  { label: 'Performance', score: 65, color: 'bg-[var(--success)]' },
  { label: 'Mobile', score: 78, color: 'bg-[#24584F]' },
  { label: 'Accessibility', score: 44, color: 'bg-[var(--severity-medium-text)]' },
  { label: 'Conversion', score: 52, color: 'bg-[var(--severity-high-text)]' },
];

function ActivityIcon({ type }: { type: 'audit' | 'prospect' | 'task' | 'report' }) {
  switch (type) {
    case 'audit':
      return <ClipboardList className="size-4 text-[var(--info)]" />;
    case 'prospect':
      return <Users className="size-4 text-primary" />;
    case 'task':
      return <CheckCircle2 className="size-4 text-[var(--success)]" />;
    case 'report':
      return <FileText className="size-4 text-[#24584F]" />;
  }
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground tabular-nums">{score}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const prospects = useDemoStore((s) => s.prospects);
  const audits = useDemoStore((s) => s.audits);
  const opportunities = useDemoStore((s) => s.opportunities);
  const tasks = useDemoStore((s) => s.tasks);

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const activeAudits = audits.filter((a) => a.status === 'running_demo').length;
  const totalPipelineValue = opportunities.reduce((sum, o) => sum + o.value, 0);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your WinterVell demo environment."
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Prospects"
          value={prospects.length}
          change={{ value: 12, label: 'vs last month' }}
          trend="up"
        />
        <StatCard
          label="Active Audits"
          value={activeAudits}
          change={{ value: 0, label: 'no change' }}
          trend="neutral"
        />
        <StatCard
          label="Pipeline Value"
          value={`$${(totalPipelineValue / 1000).toFixed(0)}k`}
          change={{ value: 8, label: 'vs last month' }}
          trend="up"
        />
        <StatCard
          label="Pending Tasks"
          value={pendingTasks}
          change={{ value: -5, label: 'vs last week' }}
          trend="down"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="sm" asChild>
          <Link href="/app/prospects/new">
            <Plus className="mr-1 size-3.5" />
            New Prospect
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/app/audits/new">
            <ClipboardList className="mr-1 size-3.5" />
            New Audit
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/app/pipeline">
            <BarChart3 className="mr-1 size-3.5" />
            View Pipeline
          </Link>
        </Button>
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Activity — takes 2 columns */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
            <Link
              href="/app/tasks"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-0 divide-y divide-border">
            {RECENT_ACTIVITY.map((activity) => (
              <Link
                key={activity.id}
                href={activity.href}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:bg-accent/50 -mx-2 px-2 rounded-md transition-colors"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.detail}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-[var(--text-tertiary)]">
                  {activity.time}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Pipeline Overview */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Pipeline Overview</h2>
              <Link
                href="/app/pipeline"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {PIPELINE_STAGES.map((stage) => {
                const maxVal = Math.max(...PIPELINE_STAGES.map((s) => s.value));
                const pct = maxVal > 0 ? (stage.value / maxVal) * 100 : 0;
                return (
                  <div key={stage.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {stage.label}{' '}
                        <span className="text-[var(--text-tertiary)]">
                          ({stage.count})
                        </span>
                      </span>
                      <span className="font-medium text-foreground tabular-nums">
                        ${(stage.value / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-border pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-foreground tabular-nums">
                  ${(totalPipelineValue / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </div>

          {/* Audit Score Distribution */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Average Audit Scores
              </h2>
              <span className="text-xs text-[var(--text-tertiary)]">Demo data</span>
            </div>
            <div className="mt-4 space-y-3">
              {CATEGORY_SCORES.map((cat) => (
                <ScoreBar key={cat.label} {...cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
