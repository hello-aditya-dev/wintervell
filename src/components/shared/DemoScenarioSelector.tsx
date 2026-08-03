'use client';

import { useDemoStore } from '@/demo/state/demo-store';
import type { DemoScenario } from '@/demo/state/demo-store';
import { cn } from '@/lib/utils';

const SCENARIOS: { id: DemoScenario; label: string; description: string }[] = [
  { id: 'agency-audit', label: 'Agency Audit', description: 'Prospect → Audit → Findings → Report → Proposal → Opportunity' },
  { id: 'sales-crm', label: 'Sales CRM', description: 'Prospects, contacts, tasks, pipeline, services, activity' },
  { id: 'call-centre-crm', label: 'Call Centre CRM', description: 'Frontend workflow demonstration. No telephony provider is connected.' },
];

export function DemoScenarioSelector({ className }: { className?: string }) {
  const { scenario, setScenario } = useDemoStore();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-xs font-medium text-muted-foreground">Scenario:</span>
      <div className="flex gap-1">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScenario(s.id)}
            className={cn(
              'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
              scenario === s.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
            title={s.description}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
