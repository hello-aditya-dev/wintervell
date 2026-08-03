'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { useDemoStore } from '@/demo/state/demo-store';

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
    </div>
  );
}
