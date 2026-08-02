'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { FindingSeverity } from '@/demo/types/finding';

// ── Severity style maps ────────────────────────────────────────────────────

const severityConfig: Record<FindingSeverity, { label: string; className: string }> = {
  critical: {
    label: 'Critical',
    className: 'severity-critical border',
  },
  high: {
    label: 'High',
    className: 'severity-high border',
  },
  medium: {
    label: 'Medium',
    className: 'severity-medium border',
  },
  low: {
    label: 'Low',
    className: 'severity-low border',
  },
  informational: {
    label: 'Info',
    className: 'severity-informational border',
  },
};

// ── SeverityBadge component ────────────────────────────────────────────────

interface SeverityBadgeProps {
  severity: FindingSeverity;
  className?: string;
  showDot?: boolean;
}

export default function SeverityBadge({
  severity,
  className,
  showDot = true,
}: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <Badge
      variant="outline"
      className={cn('text-[10px] font-medium gap-1', config.className, className)}
    >
      {showDot && (
        <span
          className={cn('inline-block size-1.5 rounded-full', `dot-${severity}`)}
          aria-hidden="true"
        />
      )}
      {config.label}
    </Badge>
  );
}
