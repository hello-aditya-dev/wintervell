'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Link as LinkIcon } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Proposal, ProposalStatus, UpdateProposalInput } from '@/demo/types/proposal';
import { PageHeader, StatusBadge, CurrencyValue, DateValue, DemoLabel } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// ── Section keys ─────────────────────────────────────────────────────────

const sectionKeys = [
  'executiveSummary',
  'objectives',
  'scope',
  'deliverables',
  'exclusions',
  'assumptions',
  'dependencies',
  'timeline',
  'pricing',
  'optionalServices',
  'paymentSchedule',
  'acceptanceCriteria',
  'nextStep',
] as const;

const sectionLabels: Record<string, string> = {
  executiveSummary: 'Executive Summary',
  objectives: 'Objectives',
  scope: 'Scope',
  deliverables: 'Deliverables',
  exclusions: 'Exclusions',
  assumptions: 'Assumptions',
  dependencies: 'Dependencies',
  timeline: 'Timeline',
  pricing: 'Pricing',
  optionalServices: 'Optional Services',
  paymentSchedule: 'Payment Schedule',
  acceptanceCriteria: 'Acceptance Criteria',
  nextStep: 'Next Step',
};

// ── Page component ───────────────────────────────────────────────────────

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const proposals = useDemoStore((s) => s.proposals);
  const setProposals = useDemoStore((s) => s.setProposals);
  const prospects = useDemoStore((s) => s.prospects);
  const audits = useDemoStore((s) => s.audits);
  const findings = useDemoStore((s) => s.findings);

  const proposal = proposals.find((p) => p.id === id);

  // Local editing state
  const [localData, setLocalData] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (proposal) {
      setLocalData({
        executiveSummary: proposal.executiveSummary,
        objectives: proposal.objectives.join('\n'),
        scope: proposal.scope.join('\n'),
        deliverables: proposal.deliverables.join('\n'),
        exclusions: proposal.exclusions.join('\n'),
        assumptions: proposal.assumptions.join('\n'),
        dependencies: proposal.dependencies.join('\n'),
        timeline: proposal.timeline,
        optionalServices: proposal.optionalServices.join('\n'),
        paymentSchedule: proposal.paymentSchedule,
        acceptanceCriteria: proposal.acceptanceCriteria,
        nextStep: proposal.nextStep,
      });
    }
  }, [proposal]);

  if (!proposal) {
    return <div className="py-16 text-center text-muted-foreground">Proposal not found.</div>;
  }

  const prospect = prospects.find((p) => p.id === proposal.prospectId);
  const audit = audits.find((a) => a.id === proposal.auditId);

  const handleSave = () => {
    const updated = proposals.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        executiveSummary: localData.executiveSummary ?? p.executiveSummary,
        objectives: (localData.objectives ?? p.objectives.join('\n')).split('\n').filter(Boolean),
        scope: (localData.scope ?? p.scope.join('\n')).split('\n').filter(Boolean),
        deliverables: (localData.deliverables ?? p.deliverables.join('\n')).split('\n').filter(Boolean),
        exclusions: (localData.exclusions ?? p.exclusions.join('\n')).split('\n').filter(Boolean),
        assumptions: (localData.assumptions ?? p.assumptions.join('\n')).split('\n').filter(Boolean),
        dependencies: (localData.dependencies ?? p.dependencies.join('\n')).split('\n').filter(Boolean),
        timeline: localData.timeline ?? p.timeline,
        optionalServices: (localData.optionalServices ?? p.optionalServices.join('\n')).split('\n').filter(Boolean),
        paymentSchedule: localData.paymentSchedule ?? p.paymentSchedule,
        acceptanceCriteria: localData.acceptanceCriteria ?? p.acceptanceCriteria,
        nextStep: localData.nextStep ?? p.nextStep,
        updatedAt: new Date().toISOString(),
      };
    });
    setProposals(updated);
    toast.success('Saved in demonstration workspace');
  };

  const updateLocalField = (key: string, value: string) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  // Find the finding that a line item was generated from
  const getFindingForItem = (sourceFindingId?: string) => {
    if (!sourceFindingId) return null;
    return findings.find((f) => f.id === sourceFindingId);
  };

  return (
    <div>
      <PageHeader
        title={proposal.title}
        description={prospect ? `For ${prospect.company}` : ''}
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/proposals')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="size-3.5 mr-1" /> Save
            </Button>
          </div>
        }
      />

      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={proposal.status} category="proposal" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Value</span>
              <CurrencyValue value={proposal.totalValue} />
            </div>
            {audit && (
              <Link href={`/app/audits/${audit.id}`} className="text-xs text-primary hover:underline">
                View Audit →
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <Tabs defaultValue="executiveSummary" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          {sectionKeys.map((key) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {sectionLabels[key]}
            </TabsTrigger>
          ))}
        </TabsList>

        {sectionKeys.map((key) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="text-sm font-medium">{sectionLabels[key]}</h3>

                {/* List fields vs text fields */}
                {['objectives', 'scope', 'deliverables', 'exclusions', 'assumptions', 'dependencies', 'optionalServices'].includes(key) ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">One item per line. All items are editable.</p>
                    <Textarea
                      rows={8}
                      value={localData[key] ?? ''}
                      onChange={(e) => updateLocalField(key, e.target.value)}
                      className="text-sm"
                    />
                  </div>
                ) : key === 'pricing' ? (
                  <div className="space-y-3">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 p-2 text-xs font-medium text-muted-foreground">
                        <span>Description</span>
                        <span>Qty</span>
                        <span>Unit Price</span>
                        <span>Total</span>
                      </div>
                      {proposal.items.map((item) => {
                        const sourceFinding = getFindingForItem(item.sourceFindingId);
                        return (
                          <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 p-2 border-t text-sm">
                            <div>
                              <span>{item.description}</span>
                              {sourceFinding && (
                                <Link
                                  href={`/app/audits/${sourceFinding.auditId}`}
                                  className="ml-1 inline-flex items-center gap-0.5 text-[10px] text-primary hover:underline"
                                >
                                  <LinkIcon className="size-3" />
                                  {sourceFinding.id.replace('finding-', 'WV-F-')}
                                </Link>
                              )}
                            </div>
                            <span className="tabular-nums">{item.quantity}</span>
                            <span className="tabular-nums">${item.unitPrice.toLocaleString()}</span>
                            <span className="tabular-nums font-medium">${item.total.toLocaleString()}</span>
                          </div>
                        );
                      })}
                      <div className="flex justify-end p-2 border-t font-medium text-sm">
                        Total: <CurrencyValue value={proposal.totalValue} className="ml-2" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    rows={key === 'executiveSummary' || key === 'acceptanceCriteria' ? 5 : 3}
                    value={localData[key] ?? ''}
                    onChange={(e) => updateLocalField(key, e.target.value)}
                    className="text-sm"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
