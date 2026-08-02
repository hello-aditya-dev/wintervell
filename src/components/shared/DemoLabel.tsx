'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ── DemoLabel component ────────────────────────────────────────────────────

interface DemoLabelProps {
  variant?: 'short' | 'full';
  className?: string;
}

export default function DemoLabel({ variant = 'short', className }: DemoLabelProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border-amber-300 bg-amber-50 text-amber-700 text-[9px] font-medium uppercase tracking-wider',
        'dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400',
        className
      )}
    >
      {variant === 'full' ? 'Demonstration' : 'Demo'}
    </Badge>
  );
}
