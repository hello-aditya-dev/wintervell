'use client';

import * as React from 'react';
import { X, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DemoScenarioSelector } from '@/components/shared/DemoScenarioSelector';
import { cn } from '@/lib/utils';

const SESSION_KEY = 'wv-demo-banner-dismissed';

// ── DemoBanner component ───────────────────────────────────────────────────

export default function DemoBanner() {
  const [dismissed, setDismissed] = React.useState(true);

  // Check sessionStorage on mount (client-only)
  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored !== 'true') {
        setDismissed(false);
      }
    } catch {
      // SSR or private browsing — show by default
      setDismissed(false);
    }
  }, []);

  const handleDismiss = React.useCallback(() => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Private browsing — ignore
    }
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b px-4 py-1.5',
        'bg-amber-50 border-amber-200 text-amber-800',
        'dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300'
      )}
      role="status"
      aria-live="polite"
    >
      <Info className="size-3.5 shrink-0" aria-hidden="true" />
      <p className="text-xs leading-relaxed">
        Frontend demonstration — fictional data; no live audit, email or payment
        actions occur.
      </p>
      <DemoScenarioSelector className="shrink-0" />
      <Button
        variant="ghost"
        size="icon"
        className="size-5 shrink-0 text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
        onClick={handleDismiss}
        aria-label="Dismiss demo banner for this session"
      >
        <X className="size-3" aria-hidden="true" />
      </Button>
    </div>
  );
}
