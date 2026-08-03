'use client';

import * as React from 'react';
import { useRouter, notFound } from 'next/navigation';
import {
  ArrowLeft,
  PhoneIncoming,
  PhoneOutgoing,
  Plus,
  CalendarPlus,
  UserPlus,
  MicOff,
} from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import { DemoCallRepository } from '@/demo/repositories/call-repository';
import type { CallDisposition, DemoCallStatus } from '@/demo/types/call-centre';
import { PageHeader, DemoLabel } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Status badge styles ──────────────────────────────────────────────────

const callStatusStyles: Record<string, { label: string; className: string }> = {
  'waiting-demo': { label: 'Waiting', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  'ringing-demo': { label: 'Ringing', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  'connected-demo': { label: 'Connected', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  'completed-demo': { label: 'Completed', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
  'missed-demo': { label: 'Missed', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  'follow-up-demo': { label: 'Follow-up', className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800' },
};

// ── Disposition labels ───────────────────────────────────────────────────

const dispositionOptions: { label: string; value: CallDisposition }[] = [
  { label: 'Qualified', value: 'qualified' },
  { label: 'Not Interested', value: 'not-interested' },
  { label: 'Callback Requested', value: 'callback-requested' },
  { label: 'No Answer', value: 'no-answer' },
  { label: 'Wrong Number', value: 'wrong-number' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Escalated', value: 'escalated' },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── Page component ───────────────────────────────────────────────────────

export default function CallDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const calls = useDemoStore((s) => s.calls);
  const setCalls = useDemoStore((s) => s.setCalls);
  const agents = useDemoStore((s) => s.agents);

  const call = calls.find((c) => c.id === id);

  if (!call) {
    notFound();
  }

  const callRepo = React.useMemo(
    () => new DemoCallRepository(() => ({ calls, setCalls })),
    [calls, setCalls]
  );

  const [newNote, setNewNote] = React.useState('');

  const statusStyle = callStatusStyles[call.status] ?? { label: call.status, className: 'bg-muted text-muted-foreground border-border' };

  // ── Handlers ──────────────────────────────────────────────────────────

  const handleDispositionChange = (value: string) => {
    callRepo.update(id, { disposition: value as CallDisposition });
    toast.success('Demonstration disposition saved');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    callRepo.addNote(id, newNote.trim());
    setNewNote('');
    toast.success('Demonstration note added');
  };

  const handleAssignAgent = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (!agent) return;
    callRepo.assignToAgent(id, agent.id, agent.name);
    toast.success('Demonstration call assigned');
  };

  const handleScheduleFollowUp = () => {
    const followUpId = `task-followup-${Date.now()}`;
    callRepo.update(id, { followUpTaskId: followUpId });
    toast.success('Demonstration follow-up created');
  };

  // Available agents for assignment
  const availableAgents = agents.filter((a) => a.status === 'available-demo');

  return (
    <div>
      <PageHeader
        title={`${call.contactName} — ${call.company}`}
        description={`${call.direction === 'inbound' ? 'Inbound' : 'Outbound'} call · ${call.phone}`}
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/call-centre/calls')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
          </div>
        }
      />

      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{call.contactName}</h2>
                <Badge variant="outline" className={cn('text-[10px] font-medium', statusStyle.className)}>
                  {statusStyle.label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  {call.direction === 'inbound' ? <PhoneIncoming className="size-3" /> : <PhoneOutgoing className="size-3" />}
                  {call.direction === 'inbound' ? 'Inbound' : 'Outbound'}
                </span>
                <span>Queue: {call.queueName}</span>
                <span>Agent: {call.assignedAgentName ?? 'Unassigned'}</span>
                <span className="font-mono">{call.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm tabular-nums">{formatDuration(call.durationSeconds)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Started</p>
                <p className="text-sm">{formatDateTime(call.startedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Timeline */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="size-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-medium">Call started</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(call.startedAt)}</p>
              </div>
            </div>
            {call.answeredAt && (
              <div className="flex items-start gap-3 text-sm">
                <div className="size-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium">Call answered</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(call.answeredAt)}</p>
                </div>
              </div>
            )}
            {(call.status === 'completed-demo' || call.status === 'follow-up-demo') && (
              <div className="flex items-start gap-3 text-sm">
                <div className="size-2 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium">Call completed</p>
                  <p className="text-xs text-muted-foreground">Duration: {formatDuration(call.durationSeconds)}</p>
                </div>
              </div>
            )}
            {(call.status === 'missed-demo' || call.status === 'waiting-demo' || call.status === 'ringing-demo') && (
              <div className="flex items-start gap-3 text-sm">
                <div className="size-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium">
                    {call.status === 'missed-demo' ? 'Call missed' : call.status === 'waiting-demo' ? 'Waiting for agent' : 'Ringing'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Disposition & Assignment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disposition & Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Disposition</p>
              <Select
                value={call.disposition ?? '_none'}
                onValueChange={handleDispositionChange}
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue placeholder="Select disposition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_none">None</SelectItem>
                  {dispositionOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Assign to Agent</p>
              {availableAgents.length > 0 ? (
                <Select onValueChange={handleAssignAgent}>
                  <SelectTrigger className="h-8 w-full text-xs">
                    <SelectValue placeholder="Select available agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name} — {agent.team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-muted-foreground">No available agents</p>
              )}
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Follow-up</p>
              {call.followUpTaskId ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Follow-up scheduled ({call.followUpTaskId})</p>
              ) : (
                <Button variant="outline" size="sm" onClick={handleScheduleFollowUp}>
                  <CalendarPlus className="size-3.5 mr-1" /> Schedule Follow-up
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {call.notes.length > 0 ? (
              call.notes.map((note, i) => (
                <div key={i} className="rounded-md bg-muted/50 px-3 py-2 text-sm">
                  {note}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No notes yet.</p>
            )}
            <Separator />
            <div className="space-y-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note…"
                className="text-sm min-h-[60px]"
              />
              <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                <Plus className="size-3.5 mr-1" /> Add Note
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recording Placeholder & Related */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recording & Related</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Recording placeholder */}
            <div className="rounded-md border border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center">
              <MicOff className="size-8 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">No recording exists</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Recording storage and telephony integration are not connected.
              </p>
            </div>

            {/* Related links */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Related</p>
              {call.prospectId ? (
                <a href={`/app/prospects/${call.prospectId}`} className="text-xs text-primary hover:underline block">
                  View Prospect →
                </a>
              ) : (
                <p className="text-xs text-muted-foreground">No linked prospect</p>
              )}
              {call.opportunityId ? (
                <a href={`/app/pipeline`} className="text-xs text-primary hover:underline block">
                  View Opportunity →
                </a>
              ) : (
                <p className="text-xs text-muted-foreground">No linked opportunity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
