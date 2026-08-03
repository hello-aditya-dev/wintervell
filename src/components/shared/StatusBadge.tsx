'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { AuditStatus } from '@/demo/types/audit';
import type { FindingStatus } from '@/demo/types/finding';
import type { ProposalStatus } from '@/demo/types/proposal';
import type { OpportunityStage } from '@/demo/types/opportunity';
import type { ReportStatus } from '@/demo/types/report';
import type { ProspectStage } from '@/demo/types/prospect';
import type { TaskStatus } from '@/demo/types/task';
import type { ServiceStatus } from '@/demo/types/service';

// ── Status style maps ──────────────────────────────────────────────────────

type StatusCategory =
  | 'audit'
  | 'finding'
  | 'proposal'
  | 'opportunity'
  | 'report'
  | 'prospect'
  | 'task'
  | 'service';

type StatusValue =
  | AuditStatus
  | FindingStatus
  | ProposalStatus
  | OpportunityStage
  | ReportStatus
  | ProspectStage
  | TaskStatus
  | ServiceStatus;

interface StatusConfig {
  label: string;
  className: string;
}

const statusConfigs: Record<string, StatusConfig> = {
  // Audit statuses
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-border' },
  ready: { label: 'Ready', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  running_demo: { label: 'Running', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  review_required: { label: 'Review', className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800' },
  approved: { label: 'Approved', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  published: { label: 'Published', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  failed_demo: { label: 'Failed', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },

  // Finding statuses
  unreviewed: { label: 'Unreviewed', className: 'bg-muted text-muted-foreground border-border' },
  verified: { label: 'Verified', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  edited: { label: 'Edited', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  false_positive: { label: 'False Positive', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },
  excluded: { label: 'Excluded', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },

  // Proposal statuses
  sent_demo: { label: 'Sent', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  accepted_demo: { label: 'Accepted', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  rejected_demo: { label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },

  // Opportunity stages
  new_prospect: { label: 'New', className: 'bg-muted text-muted-foreground border-border' },
  audit_planned: { label: 'Audit Planned', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  audit_review: { label: 'Audit Review', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  report_sent: { label: 'Report Sent', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  follow_up_due: { label: 'Follow-up', className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800' },
  proposal_sent: { label: 'Proposal Sent', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  negotiation: { label: 'Negotiation', className: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800' },
  won: { label: 'Won', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  lost: { label: 'Lost', className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },

  // Prospect stages
  new: { label: 'New', className: 'bg-muted text-muted-foreground border-border' },
  contacted: { label: 'Contacted', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  qualified: { label: 'Qualified', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  proposal_sent_prospect: { label: 'Proposal Sent', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },

  // Task statuses
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground border-border' },
  in_progress: { label: 'In Progress', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },

  // Service statuses
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
  archived: { label: 'Archived', className: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700' },

  // Report statuses
  published_demo: { label: 'Published', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800' },
};

// ── StatusBadge component ──────────────────────────────────────────────────

interface StatusBadgeProps {
  status: StatusValue;
  category?: StatusCategory;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfigs[status] ?? {
    label: String(status).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    className: 'bg-muted text-muted-foreground border-border',
  };

  return (
    <Badge
      variant="outline"
      className={cn('text-[10px] font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
