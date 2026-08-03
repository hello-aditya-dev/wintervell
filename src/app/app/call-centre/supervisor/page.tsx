'use client';

import * as React from 'react';
import { RotateCcw } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { AgentPresence, CallDisposition } from '@/demo/types/call-centre';
import { PageHeader, StatCard, DemoLabel } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Agent presence styling ───────────────────────────────────────────────

const presenceStyles: Record<AgentPresence, { label: string; className: string; dot: string }> = {
  'available-demo': { label: 'Available', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800', dot: 'bg-emerald-500' },
  'busy-demo': { label: 'Busy', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800', dot: 'bg-red-500' },
  'wrap-up-demo': { label: 'Wrap-up', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800', dot: 'bg-amber-500' },
  'break-demo': { label: 'Break', className: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800', dot: 'bg-yellow-500' },
  'offline-demo': { label: 'Offline', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700', dot: 'bg-slate-400' },
};

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ── Page component ───────────────────────────────────────────────────────

export default function SupervisorDashboardPage() {
  const agents = useDemoStore((s) => s.agents);
  const calls = useDemoStore((s) => s.calls);
  const queues = useDemoStore((s) => s.queues);
  const resetDemoData = useDemoStore((s) => s.resetDemoData);

  // ── Derived metrics ──────────────────────────────────────────────────
  const callsWaiting = calls.filter((c) => c.status === 'waiting-demo' || c.status === 'ringing-demo').length;
  const callsInProgress = calls.filter((c) => c.status === 'connected-demo').length;
  const callsMissed = calls.filter((c) => c.status === 'missed-demo').length;

  const completedCalls = calls.filter((c) => c.status === 'completed-demo' || c.status === 'follow-up-demo');
  const avgHandlingTime = completedCalls.length > 0
    ? Math.round(completedCalls.reduce((sum, c) => sum + c.durationSeconds, 0) / completedCalls.length)
    : 0;

  const followUpsDue = agents.reduce((sum, a) => sum + a.followUpsDue, 0);

  // Disposition breakdown
  const dispositionBreakdown = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const call of calls) {
      if (call.disposition) {
        map.set(call.disposition, (map.get(call.disposition) ?? 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([disposition, count]) => ({ disposition, count }))
      .sort((a, b) => b.count - a.count);
  }, [calls]);

  const maxDispositionCount = dispositionBreakdown.length > 0 ? dispositionBreakdown[0].count : 1;

  const dispositionLabels: Record<string, string> = {
    qualified: 'Qualified',
    'not-interested': 'Not Interested',
    'callback-requested': 'Callback',
    'no-answer': 'No Answer',
    'wrong-number': 'Wrong Number',
    resolved: 'Resolved',
    escalated: 'Escalated',
  };

  // Queue load summary
  const totalQueueCalls = queues.reduce((sum, q) => sum + q.callsWaiting, 0);
  const totalQueueAgents = queues.reduce((sum, q) => sum + q.availableAgents, 0);

  // Agent performance sorted by calls today desc
  const agentsByPerformance = React.useMemo(
    () => [...agents].sort((a, b) => b.callsToday - a.callsToday),
    [agents]
  );

  const handleReset = () => {
    resetDemoData();
    toast.success('Demonstration call-centre data reset');
  };

  return (
    <div>
      <PageHeader
        title="Supervisor Dashboard"
        description="Real-time monitoring and agent performance overview."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="size-3.5 mr-1" /> Reset Demo
            </Button>
          </div>
        }
      />

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Calls Waiting" value={callsWaiting} />
        <StatCard label="In Progress" value={callsInProgress} />
        <StatCard label="Missed" value={callsMissed} />
        <StatCard label="Avg. Handling Time" value={formatDuration(avgHandlingTime)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Agent Presence Grid */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agent Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {agents.map((agent) => {
                const style = presenceStyles[agent.status];
                return (
                  <div key={agent.id} className="rounded-md border p-3 text-center space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <div className={cn('size-2.5 rounded-full', style.dot)} />
                      <span className="text-xs font-medium">{agent.name}</span>
                    </div>
                    <Badge variant="outline" className={cn('text-[9px] font-medium', style.className)}>
                      {style.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Queue Load Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Queue Load Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Total Waiting</p>
                <p className="font-medium tabular-nums">{totalQueueCalls}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available Agents</p>
                <p className="font-medium tabular-nums">{totalQueueAgents}</p>
              </div>
            </div>
            {queues.map((queue) => (
              <div key={queue.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{queue.name}</span>
                  <span className="text-muted-foreground">{queue.callsWaiting} waiting · {queue.availableAgents} agents</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      queue.callsWaiting > queue.availableAgents ? 'bg-red-500' : queue.callsWaiting > 0 ? 'bg-amber-500' : 'bg-emerald-500'
                    )}
                    style={{ width: `${Math.min((queue.callsWaiting / Math.max(queue.availableAgents, 1)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Follow-up Workload */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Follow-up Workload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums">{followUpsDue}</span>
              <span className="text-sm text-muted-foreground">follow-ups due</span>
            </div>
            {agents.filter((a) => a.followUpsDue > 0).length > 0 ? (
              <div className="space-y-2">
                {agents
                  .filter((a) => a.followUpsDue > 0)
                  .sort((a, b) => b.followUpsDue - a.followUpsDue)
                  .map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between text-xs">
                      <span>{agent.name}</span>
                      <span className="tabular-nums font-medium">{agent.followUpsDue}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No follow-ups pending</p>
            )}
          </CardContent>
        </Card>

        {/* Disposition Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disposition Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dispositionBreakdown.length > 0 ? (
              dispositionBreakdown.map((item) => (
                <div key={item.disposition} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{dispositionLabels[item.disposition] ?? item.disposition}</span>
                    <span className="tabular-nums text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/60"
                      style={{ width: `${(item.count / maxDispositionCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No dispositions recorded</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Agent Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Agent</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Calls Today</TableHead>
                  <TableHead className="text-xs">Talk Time</TableHead>
                  <TableHead className="text-xs">Follow-ups</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentsByPerformance.map((agent) => {
                  const style = presenceStyles[agent.status];
                  return (
                    <TableRow key={agent.id}>
                      <TableCell className="py-2 text-sm font-medium">{agent.name}</TableCell>
                      <TableCell className="py-2">
                        <Badge variant="outline" className={cn('text-[10px] font-medium', style.className)}>
                          {style.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 text-xs tabular-nums">{agent.callsToday}</TableCell>
                      <TableCell className="py-2 text-xs tabular-nums">{formatMinutes(agent.talkTimeMinutes)}</TableCell>
                      <TableCell className="py-2 text-xs tabular-nums">{agent.followUpsDue}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
