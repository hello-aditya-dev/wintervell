'use client';

import * as React from 'react';
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// ── DateValue component ────────────────────────────────────────────────────

interface DateValueProps {
  value: string | null | undefined;
  formatStr?: string;
  relative?: boolean;
  className?: string;
}

export default function DateValue({
  value,
  formatStr = 'd MMM yyyy',
  relative = false,
  className,
}: DateValueProps) {
  if (!value) {
    return (
      <span className={cn('text-muted-foreground', className)} aria-label="No date">
        —
      </span>
    );
  }

  const date = parseISO(value);
  if (!isValid(date)) {
    return (
      <span className={cn('text-muted-foreground', className)} aria-label="Invalid date">
        —
      </span>
    );
  }

  const formatted = format(date, formatStr);
  const relativeStr = relative ? formatDistanceToNow(date, { addSuffix: true }) : null;

  if (relativeStr) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn('cursor-default', className)} aria-label={formatted}>
            {relativeStr}
          </span>
        </TooltipTrigger>
        <TooltipContent>{formatted}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <span className={className} aria-label={formatted}>
      {formatted}
    </span>
  );
}
