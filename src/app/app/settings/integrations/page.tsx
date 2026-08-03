'use client';

import * as React from 'react';
import {
  Plug,
  Mail,
  BarChart3,
  Globe,
  FileText,
  CreditCard,
  Shield,
  MessageSquare,
  Zap,
} from 'lucide-react';

import { PageHeader, DemoLabel } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ── Integration definitions ──────────────────────────────────────────────

type IntegrationStatus = 'not_configured' | 'demo_only' | 'planned' | 'unavailable_in_release';

interface Integration {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: IntegrationStatus;
  category: string;
}

const integrations: Integration[] = [
  {
    name: 'Google Search Console',
    description: 'Connect to pull real search performance data and indexing status for audited websites.',
    icon: Globe,
    status: 'demo_only',
    category: 'SEO & Search',
  },
  {
    name: 'Google Analytics',
    description: 'Import traffic and conversion data to enrich audit reports with real user behaviour metrics.',
    icon: BarChart3,
    status: 'planned',
    category: 'Analytics',
  },
  {
    name: 'PageSpeed Insights',
    description: 'Automatically fetch Core Web Vitals and performance scores during audits.',
    icon: Zap,
    status: 'demo_only',
    category: 'Performance',
  },
  {
    name: 'SMTP / Email',
    description: 'Configure email sending for report sharing and proposal delivery.',
    icon: Mail,
    status: 'not_configured',
    category: 'Communication',
  },
  {
    name: 'Stripe',
    description: 'Accept payments for proposals and manage billing within the platform.',
    icon: CreditCard,
    status: 'unavailable_in_release',
    category: 'Payments',
  },
  {
    name: 'Slack',
    description: 'Send audit notifications and pipeline updates to your team channels.',
    icon: MessageSquare,
    status: 'planned',
    category: 'Communication',
  },
  {
    name: 'HubSpot CRM',
    description: 'Sync prospect and pipeline data with your HubSpot CRM.',
    icon: Shield,
    status: 'unavailable_in_release',
    category: 'CRM',
  },
  {
    name: 'PDF Export',
    description: 'Generate professional PDF reports for offline sharing and printing.',
    icon: FileText,
    status: 'demo_only',
    category: 'Reporting',
  },
];

// ── Status badge ─────────────────────────────────────────────────────────

const statusConfig: Record<IntegrationStatus, { label: string; className: string }> = {
  not_configured: {
    label: 'Not Configured',
    className: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400',
  },
  demo_only: {
    label: 'Demo Only',
    className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
  },
  planned: {
    label: 'Planned',
    className: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400',
  },
  unavailable_in_release: {
    label: 'Unavailable in this release',
    className: 'border-muted bg-muted text-muted-foreground',
  },
};

// ── Page component ───────────────────────────────────────────────────────

export default function IntegrationsPage() {
  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect third-party services to enhance your audit workflow."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const status = statusConfig[integration.status];

          return (
            <Card key={integration.name} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{integration.name}</CardTitle>
                      <p className="text-[10px] text-muted-foreground">{integration.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn('text-[9px] shrink-0', status.className)}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs text-muted-foreground">{integration.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        No third-party providers are connected. Integrations marked &ldquo;Demo Only&rdquo; use simulated data. &ldquo;Planned&rdquo; integrations are on the roadmap. &ldquo;Unavailable in this release&rdquo; will not be available in the initial release.
      </p>
    </div>
  );
}

// ── Utility ──────────────────────────────────────────────────────────────

import { cn } from '@/lib/utils';
