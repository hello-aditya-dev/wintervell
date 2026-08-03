'use client';

import * as React from 'react';
import { useDemoStore } from '@/demo/state/demo-store';
import type { DemoQueue } from '@/demo/types/call-centre';
import { PageHeader, DemoLabel } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// ── Queue status styling ─────────────────────────────────────────────────

const queueStatusStyles: Record<string, { label: string; className: string }> = {
  'active-demo': { label: 'Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'paused-demo': { label: 'Paused', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'offline-demo': { label: 'Offline', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
};

// ── Helpers ───────────────────────────────────────────────────────────────

function formatWait(seconds: number): string {
  if (seconds === 0) return '—';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function serviceLevelColor(current: number, target: number): string {
  if (current >= target) return 'text-emerald-600 dark:text-emerald-400';
  if (current >= target - 10) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

// ── Page component ───────────────────────────────────────────────────────

export default function QueuesListPage() {
  const queues = useDemoStore((s) => s.queues);

  return (
    <div>
      <PageHeader
        title="Queues"
        description="Call queue status and service levels."
        actions={<DemoLabel />}
      />

      {/* Card view for responsive */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6">
        {queues.map((queue) => {
          const statusStyle = queueStatusStyles[queue.status] ?? { label: queue.status, className: 'bg-muted text-muted-foreground border-border' };
          const slColor = serviceLevelColor(queue.currentServiceLevel, queue.serviceLevelTarget);

          return (
            <Card key={queue.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{queue.name}</CardTitle>
                  <Badge variant="outline" className={cn('text-[10px] font-medium', statusStyle.className)}>
                    {statusStyle.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Calls Waiting</p>
                    <p className="font-medium tabular-nums">{queue.callsWaiting}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Longest Wait</p>
                    <p className="font-medium">{formatWait(queue.longestWaitSeconds)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Available Agents</p>
                    <p className="font-medium tabular-nums">{queue.availableAgents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Service Level</p>
                    <p className={cn('font-medium tabular-nums', slColor)}>
                      {queue.currentServiceLevel}% <span className="text-xs text-muted-foreground font-normal">/ {queue.serviceLevelTarget}%</span>
                    </p>
                  </div>
                </div>
                {/* Service level bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Service level</span>
                    <span>{queue.currentServiceLevel}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        queue.currentServiceLevel >= queue.serviceLevelTarget
                          ? 'bg-emerald-500'
                          : queue.currentServiceLevel >= queue.serviceLevelTarget - 10
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      )}
                      style={{ width: `${Math.min(queue.currentServiceLevel, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Table view */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Queue</TableHead>
              <TableHead className="text-xs">Calls Waiting</TableHead>
              <TableHead className="text-xs">Longest Wait</TableHead>
              <TableHead className="text-xs">Available Agents</TableHead>
              <TableHead className="text-xs">SL Target</TableHead>
              <TableHead className="text-xs">Current SL</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queues.map((queue) => {
              const statusStyle = queueStatusStyles[queue.status] ?? { label: queue.status, className: 'bg-muted text-muted-foreground border-border' };
              return (
                <TableRow key={queue.id}>
                  <TableCell className="py-2 text-sm font-medium">{queue.name}</TableCell>
                  <TableCell className="py-2 text-xs tabular-nums">{queue.callsWaiting}</TableCell>
                  <TableCell className="py-2 text-xs">{formatWait(queue.longestWaitSeconds)}</TableCell>
                  <TableCell className="py-2 text-xs tabular-nums">{queue.availableAgents}</TableCell>
                  <TableCell className="py-2 text-xs tabular-nums">{queue.serviceLevelTarget}%</TableCell>
                  <TableCell className={cn('py-2 text-xs tabular-nums font-medium', serviceLevelColor(queue.currentServiceLevel, queue.serviceLevelTarget))}>
                    {queue.currentServiceLevel}%
                  </TableCell>
                  <TableCell className="py-2">
                    <Badge variant="outline" className={cn('text-[10px] font-medium', statusStyle.className)}>
                      {statusStyle.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
