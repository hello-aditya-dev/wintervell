'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ── ScoreBadge component ───────────────────────────────────────────────────

interface ScoreBadgeProps {
  score: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

function getScoreColor(score: number): string {
  if (score < 40) {
    return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800';
  }
  if (score <= 70) {
    return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800';
  }
  return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800';
}

const sizeStyles = {
  sm: 'h-6 min-w-6 px-1.5 text-[10px]',
  md: 'h-8 min-w-8 px-2 text-xs',
  lg: 'h-10 min-w-10 px-3 text-sm',
};

export default function ScoreBadge({
  score,
  max = 100,
  size = 'md',
  className,
  label,
}: ScoreBadgeProps) {
  const colorStyle = getScoreColor(score);
  const displayScore = Math.round(score);

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md border font-semibold tabular-nums',
        colorStyle,
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label={label ?? `Score: ${displayScore} out of ${max}`}
    >
      {displayScore}
    </span>
  );
}
