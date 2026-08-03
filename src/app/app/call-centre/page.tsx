'use client';

import * as React from 'react';
import Link from 'next/link';
import { Users, PhoneIncoming, PhoneOutgoing, Clock, RotateCcw } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { AgentPresence } from '@/demo/types/call-centre';
import { PageHeader, StatCard, DemoLabel } from '@/components/shared';
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Agent status styling ─────────────────────────────────────────────────

const presenceStyles: Record<AgentPresence, { label: string; className: string }> = {
  'available-demo': { label: 'Available', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'busy-demo': { label: 'Busy', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  'wrap-up-demo': { label: 'Wrap-up', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'break-demo': { label: 'Break', className: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800' },
  'offline-demo': { label: 'Offline', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
};

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// ── Call status badge ────────────────────────────────────────────────────

const callStatusStyles: Record<string, { label: string; className: string }> = {
  'waiting-demo': { label: 'Waiting', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'ringing-demo': { label: 'Ringing', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  'connected-demo': { label: 'Connected', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'completed-demo': { label: 'Completed', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
  'missed-demo': { label: 'Missed', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  'follow-up-demo': { label: 'Follow-up', className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800' },
};

function CallStatusBadge({ status }: { status: string }) {
  const style = callStatusStyles[status] ?? { label: status, className: 'bg-muted text-muted-foreground border-border' };
  return (
    <Badge variant="outline" className={cn('text-[10px] font-medium', style.className)}>
      {style.label}
    </Badge>
  );
}

// ── Page component ───────────────────────────────────────────────────────

export default function CallCentreDashboardPage() {
  const agents = useDemoStore((s) => s.agents);
  const calls = useDemoStore((s) => s.calls);
  const queues = useDemoStore((s) => s.queues);
  const resetDemoData = useDemoStore((s) => s.resetDemoData);

  // ── Derived metrics ──────────────────────────────────────────────────
  const agentsAvailable = agents.filter((a) => a.status === 'available-demo').length;
  const agentsBusy = agents.filter((a) => a.status === 'busy-demo').length;
  const agentsOnBreak = agents.filter((a) => a.status === 'break-demo' || a.status === 'wrap-up-demo').length;
  const agentsOnline = agents.filter((a) => a.status !== 'offline-demo').length;

  const callsWaiting = calls.filter((c) => c.status === 'waiting-demo' || c.status === 'ringing-demo').length;
  const callsInProgress = calls.filter((c) => c.status === 'connected-demo').length;
  const callsMissed = calls.filter((c) => c.status === 'missed-demo').length;

  const followUpsDue = agents.reduce((sum, a) => sum + a.followUpsDue, 0);

  const completedCalls = calls.filter((c) => c.status === 'completed-demo' || c.status === 'follow-up-demo');
  const avgHandlingTime = completedCalls.length > 0
    ? Math.round(completedCalls.reduce((sum, c) => sum + c.durationSeconds, 0) / completedCalls.length)
    : 0;

  const totalWaiting = queues.reduce((sum, q) => sum + q.callsWaiting, 0);
  const serviceLevel = queues.length > 0
    ? Math.round(queues.reduce((sum, q) => sum + q.currentServiceLevel, 0) / queues.length)
    : 0;

  const recentCalls = [...calls].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()).slice(0, 5);

  const handleReset = () => {
    resetDemoData();
    toast.success('Demonstration call-centre data reset');
  };

  return (
    <div>
      <PageHeader
        title="Call Centre"
        description="Real-time call centre dashboard and operations."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="size-3.5 mr-1" /> Reset Demo
            </Button>
          </div>
        }
      />

      {/* Agent Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Agents Online" value={agentsOnline} />
        <StatCard label="Available" value={agentsAvailable} trend="up" />
        <StatCard label="Busy" value={agentsBusy} />
        <StatCard label="On Break" value={agentsOnBreak} />
      </div>

      {/* Call Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard label="Calls Waiting" value={callsWaiting} />
        <StatCard label="In Progress" value={callsInProgress} />
        <StatCard label="Missed" value={callsMissed} />
      </div>

      {/* Operational Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard label="Follow-ups Due" value={followUpsDue} />
        <StatCard label="Avg. Handling Time" value={formatDuration(avgHandlingTime)} />
        <StatCard label="Queue Service Level" value={`${serviceLevel}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Calls */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Calls</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Contact</TableHead>
                    <TableHead className="text-xs">Direction</TableHead>
                    <TableHead className="text-xs">Time</TableHead>
                    <TableHead className="text-xs">Duration</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCalls.map((call) => (
                    <TableRow key={call.id} className="cursor-pointer">
                      <TableCell className="py-2 text-xs">
                        <Link href={`/app/call-centre/calls/${call.id}`} className="font-medium hover:underline">
                          {call.contactName}
                        </Link>
                      </TableCell>
                      <TableCell className="py-2 text-xs">
                        {call.direction === 'inbound' ? (
                          <span className="inline-flex items-center gap-1"><PhoneIncoming className="size-3" />In</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><PhoneOutgoing className="size-3" />Out</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2 text-xs text-muted-foreground">{formatDate(call.startedAt)}</TableCell>
                      <TableCell className="py-2 text-xs tabular-nums">{formatDuration(call.durationSeconds)}</TableCell>
                      <TableCell className="py-2"><CallStatusBadge status={call.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agent Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Agent</TableHead>
                    <TableHead className="text-xs">Team</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Calls Today</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => {
                    const style = presenceStyles[agent.status];
                    return (
                      <TableRow key={agent.id}>
                        <TableCell className="py-2 text-xs font-medium">{agent.name}</TableCell>
                        <TableCell className="py-2 text-xs text-muted-foreground">{agent.team}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className={cn('text-[10px] font-medium', style.className)}>
                            {style.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2 text-xs tabular-nums">{agent.callsToday}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
