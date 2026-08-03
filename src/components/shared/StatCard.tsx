'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// ── StatCard component ─────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    label?: string;
  };
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export default function StatCard({
  label,
  value,
  change,
  trend,
  className,
}: StatCardProps) {
  // Determine trend from change value if not explicitly provided
  const effectiveTrend = trend ?? (change ? (change.value > 0 ? 'up' : change.value < 0 ? 'down' : 'neutral') : undefined);

  const trendColor = {
    up: 'text-emerald-600 dark:text-emerald-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-muted-foreground',
  };

  const TrendIcon = effectiveTrend === 'up' ? TrendingUp : effectiveTrend === 'down' ? TrendingDown : Minus;

  return (
    <Card className={cn('py-0', className)}>
      <CardContent className="p-4">
        <p className="text-label text-muted-foreground mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-h2 tabular-nums text-foreground">{value}</span>
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 text-xs font-medium tabular-nums',
                effectiveTrend && trendColor[effectiveTrend]
              )}
            >
              <TrendIcon className="size-3" aria-hidden="true" />
              {change.value > 0 ? '+' : ''}
              {change.value}%
              {change.label && (
                <span className="text-muted-foreground ml-0.5">
                  {change.label}
                </span>
              )}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
