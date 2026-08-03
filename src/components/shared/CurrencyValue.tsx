'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ── CurrencyValue component ────────────────────────────────────────────────

interface CurrencyValueProps {
  value: number | null | undefined;
  currency?: string;
  locale?: string;
  className?: string;
  compact?: boolean;
}

function formatCurrency(
  value: number,
  currency: string,
  locale: string,
  compact: boolean
): string {
  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CurrencyValue({
  value,
  currency = 'USD',
  locale = 'en-US',
  className,
  compact = false,
}: CurrencyValueProps) {
  if (value == null) {
    return (
      <span className={cn('text-muted-foreground', className)} aria-label="No value">
        —
      </span>
    );
  }

  return (
    <span
      className={cn('tabular-nums', className)}
      aria-label={`${formatCurrency(value, currency, locale, false)}`}
    >
      {formatCurrency(value, currency, locale, compact)}
    </span>
  );
}
