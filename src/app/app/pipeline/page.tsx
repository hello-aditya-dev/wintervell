'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MoreHorizontal } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Opportunity, OpportunityStage } from '@/demo/types/opportunity';
import { PageHeader, StatusBadge, CurrencyValue, DemoLabel, PersonAvatar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Pipeline stages ──────────────────────────────────────────────────────

const stages: { key: OpportunityStage; label: string }[] = [
  { key: 'new_prospect', label: 'New Prospect' },
  { key: 'audit_planned', label: 'Audit Planned' },
  { key: 'audit_review', label: 'Audit Review' },
  { key: 'report_sent', label: 'Report Sent (Demo)' },
  { key: 'follow_up_due', label: 'Follow-up Due' },
  { key: 'proposal_sent', label: 'Proposal Sent (Demo)' },
  { key: 'negotiation', label: 'Negotiation' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
];

// ── Sortable Card ────────────────────────────────────────────────────────

function PipelineCard({ opportunity, users }: { opportunity: Opportunity; users: { id: string; name: string }[] }) {
  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const owner = userMap.get(opportunity.owner);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: opportunity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-md border bg-card p-3 text-sm space-y-2 cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50 shadow-lg'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={`/app/prospects/${opportunity.prospectId}`} className="font-medium hover:underline text-xs">
            {opportunity.company}
          </Link>
          <p className="text-xs text-muted-foreground">{opportunity.contact}</p>
        </div>
        <PipelineCardMenu opportunity={opportunity} />
      </div>
      <div className="flex items-center gap-2">
        <CurrencyValue value={opportunity.value} compact />
        <span className="text-xs text-muted-foreground">· {owner}</span>
      </div>
      {opportunity.nextAction && (
        <p className="text-xs text-muted-foreground line-clamp-1">{opportunity.nextAction}</p>
      )}
      <div className="flex items-center gap-1.5">
        {opportunity.relatedAuditId && (
          <Link href={`/app/audits/${opportunity.relatedAuditId}`} className="text-[10px] text-primary hover:underline">
            Audit
          </Link>
        )}
        {opportunity.relatedProposalId && (
          <Link href={`/app/proposals/${opportunity.relatedProposalId}`} className="text-[10px] text-primary hover:underline">
            Proposal
          </Link>
        )}
      </div>
    </div>
  );
}

// ── Card Menu (Move to stage) ────────────────────────────────────────────

function PipelineCardMenu({ opportunity }: { opportunity: Opportunity }) {
  const opportunities = useDemoStore((s) => s.opportunities);
  const setOpportunities = useDemoStore((s) => s.setOpportunities);

  const handleMoveToStage = (newStage: OpportunityStage) => {
    const updated = opportunities.map((o) =>
      o.id === opportunity.id ? { ...o, stage: newStage, updatedAt: new Date().toISOString() } : o
    );
    setOpportunities(updated);
    toast.success(`Demonstration: moved to ${stages.find((s) => s.key === newStage)?.label ?? newStage}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 touch-target">
          <MoreHorizontal className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {stages.map((stage) => (
          <DropdownMenuItem
            key={stage.key}
            onClick={() => handleMoveToStage(stage.key)}
            disabled={stage.key === opportunity.stage}
          >
            {stage.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Page component ───────────────────────────────────────────────────────

export default function PipelinePage() {
  const opportunities = useDemoStore((s) => s.opportunities);
  const setOpportunities = useDemoStore((s) => s.setOpportunities);
  const users = useDemoStore((s) => s.users);

  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const opportunitiesByStage = React.useMemo(() => {
    const map = new Map<OpportunityStage, Opportunity[]>();
    for (const stage of stages) {
      map.set(stage.key, opportunities.filter((o) => o.stage === stage.key));
    }
    return map;
  }, [opportunities]);

  const activeOpportunity = activeId ? opportunities.find((o) => o.id === activeId) : null;

  const findStageForId = (id: string): OpportunityStage | undefined => {
    for (const [stage, opps] of opportunitiesByStage) {
      if (opps.some((o) => o.id === id)) return stage;
    }
    return undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    // Determine the target stage
    let targetStage: OpportunityStage | undefined;

    // If dropped on a column (stage key)
    if (stages.some((s) => s.key === overIdStr)) {
      targetStage = overIdStr as OpportunityStage;
    } else {
      // Dropped on another card - find its stage
      targetStage = findStageForId(overIdStr);
    }

    if (!targetStage) return;

    const currentStage = findStageForId(activeIdStr);
    if (!currentStage || currentStage === targetStage) return;

    // Move the opportunity to the new stage
    const updated = opportunities.map((o) =>
      o.id === activeIdStr ? { ...o, stage: targetStage!, updatedAt: new Date().toISOString() } : o
    );
    setOpportunities(updated);
    toast.success(`Demonstration: moved to ${stages.find((s) => s.key === targetStage)?.label ?? targetStage}`);
  };

  // Calculate total pipeline value
  const totalValue = opportunities
    .filter((o) => !['won', 'lost'].includes(o.stage))
    .reduce((sum, o) => sum + o.value, 0);

  return (
    <div>
      <PageHeader
        title="Pipeline"
        description="Track opportunities through your sales pipeline."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <div className="text-sm text-muted-foreground">
              Pipeline value: <CurrencyValue value={totalValue} compact />
            </div>
          </div>
        }
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageOpps = opportunitiesByStage.get(stage.key) ?? [];
            const stageValue = stageOpps.reduce((sum, o) => sum + o.value, 0);

            return (
              <div
                key={stage.key}
                className="min-w-[240px] max-w-[280px] flex-shrink-0"
                id={stage.key}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-medium">{stage.label}</h3>
                    <p className="text-[10px] text-muted-foreground">
                      {stageOpps.length} · <CurrencyValue value={stageValue} compact />
                    </p>
                  </div>
                </div>

                <SortableContext
                  items={stageOpps.map((o) => o.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2 min-h-[200px] rounded-md border bg-muted/30 p-2">
                    {stageOpps.map((opp) => (
                      <PipelineCard key={opp.id} opportunity={opp} users={users} />
                    ))}
                    {stageOpps.length === 0 && (
                      <div className="flex items-center justify-center h-20 text-xs text-muted-foreground">
                        No opportunities
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeOpportunity ? (
            <div className="rounded-md border bg-card p-3 text-sm space-y-2 shadow-lg w-[240px]">
              <p className="font-medium text-xs">{activeOpportunity.company}</p>
              <p className="text-xs text-muted-foreground">{activeOpportunity.contact}</p>
              <CurrencyValue value={activeOpportunity.value} compact />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
