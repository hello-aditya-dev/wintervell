'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { AuditCategory, AuditMode, CategoryScore } from '@/demo/types/audit';
import type { FindingSeverity } from '@/demo/types/finding';
import { PageHeader, DemoLabel } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// ── Constants ────────────────────────────────────────────────────────────

const auditModes: { label: string; value: AuditMode; description: string }[] = [
  { label: 'Quick', value: 'quick', description: 'Fast scan of key categories (5-10 min demo)' },
  { label: 'Standard', value: 'standard', description: 'Thorough analysis of selected categories (15-20 min demo)' },
  { label: 'Comprehensive', value: 'comprehensive', description: 'Full audit across all categories (30-45 min demo)' },
  { label: 'Manual Review', value: 'manual_review', description: 'Expert-led review without automated scanning' },
];

const auditCategories: { label: string; value: AuditCategory }[] = [
  { label: 'Technical', value: 'technical' },
  { label: 'SEO', value: 'seo' },
  { label: 'Performance', value: 'performance' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Accessibility', value: 'accessibility' },
  { label: 'Conversion', value: 'conversion' },
  { label: 'Trust', value: 'trust' },
  { label: 'Content', value: 'content' },
  { label: 'AI Search Readiness', value: 'ai_search_readiness' },
];

// ── Deterministic score generator ────────────────────────────────────────

function generateDeterministicScores(categories: AuditCategory[]): CategoryScore[] {
  const scoreMap: Record<string, { score: number; label: string }> = {
    technical: { score: 48 + Math.floor(Math.random() * 25), label: 'Technical SEO' },
    seo: { score: 35 + Math.floor(Math.random() * 30), label: 'Search Optimization' },
    performance: { score: 38 + Math.floor(Math.random() * 28), label: 'Performance' },
    mobile: { score: 50 + Math.floor(Math.random() * 25), label: 'Mobile Experience' },
    accessibility: { score: 25 + Math.floor(Math.random() * 30), label: 'Accessibility' },
    conversion: { score: 40 + Math.floor(Math.random() * 25), label: 'Conversion' },
    trust: { score: 55 + Math.floor(Math.random() * 25), label: 'Trust & Credibility' },
    content: { score: 42 + Math.floor(Math.random() * 25), label: 'Content Quality' },
    ai_search_readiness: { score: 30 + Math.floor(Math.random() * 25), label: 'AI Search Readiness' },
  };

  return categories.map((cat) => {
    const data = scoreMap[cat] ?? { score: 50, label: cat };
    return {
      category: cat,
      score: data.score,
      findingCount: Math.floor(data.score / 15) + 1,
      label: data.label,
    };
  });
}

// ── Page component ───────────────────────────────────────────────────────

export default function NewAuditPage() {
  const router = useRouter();
  const prospects = useDemoStore((s) => s.prospects);
  const audits = useDemoStore((s) => s.audits);
  const setAudits = useDemoStore((s) => s.setAudits);
  const findings = useDemoStore((s) => s.findings);
  const setFindings = useDemoStore((s) => s.setFindings);

  const [step, setStep] = React.useState(0);
  const [selectedProspectId, setSelectedProspectId] = React.useState('');
  const [selectedMode, setSelectedMode] = React.useState<AuditMode>('standard');
  const [selectedCategories, setSelectedCategories] = React.useState<AuditCategory[]>([]);
  const [businessContext, setBusinessContext] = React.useState('');

  const steps = ['Prospect', 'Audit Mode', 'Categories', 'Business Context', 'Review'];

  const selectedProspect = prospects.find((p) => p.id === selectedProspectId);

  // Auto-select categories for comprehensive mode
  React.useEffect(() => {
    if (selectedMode === 'comprehensive') {
      setSelectedCategories(auditCategories.map((c) => c.value));
    }
  }, [selectedMode]);

  const toggleCategory = (cat: AuditCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!selectedProspectId;
      case 1: return !!selectedMode;
      case 2: return selectedCategories.length > 0;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleCreate = () => {
    const newAuditId = `audit-${Date.now()}`;
    const now = new Date().toISOString();
    const categoryScores = generateDeterministicScores(selectedCategories);
    const overallScore = Math.round(categoryScores.reduce((s, c) => s + c.score, 0) / categoryScores.length);

    // Generate deterministic demo findings
    const newFindings = categoryScores.flatMap((cs) => {
      const count = Math.min(cs.findingCount, 3);
      return Array.from({ length: count }, (_, i) => {
        const id = `finding-${Date.now()}-${cs.category}-${i}`;
        const severities: FindingSeverity[] = ['critical', 'high', 'medium', 'low', 'informational'];
        const severity = severities[Math.min(i, severities.length - 1)];
        return {
          id,
          auditId: newAuditId,
          title: `[Demo] ${cs.label} finding ${i + 1}`,
          category: cs.category,
          severity,
          confidence: 75 + Math.floor(Math.random() * 20),
          status: 'unreviewed' as const,
          pageUrl: selectedProspect?.website ?? '',
          evidenceSummary: `Simulated evidence for ${cs.label} finding. This is a demonstration finding generated from fictional rule results.`,
          businessConsequence: `Simulated business consequence for ${cs.label} finding ${i + 1}.`,
          recommendation: `Simulated recommendation for ${cs.label} finding ${i + 1}.`,
          suggestedService: '',
          humanVerificationRequired: i === 0,
          includedInReport: true,
          notes: '',
          createdAt: now,
          updatedAt: now,
        };
      });
    });

    const priorityFindingCount = newFindings.filter(
      (f) => f.severity === 'critical' || f.severity === 'high'
    ).length;

    const newAudit = {
      id: newAuditId,
      prospectId: selectedProspectId,
      website: selectedProspect?.website ?? '',
      title: `${selectedProspect?.company ?? 'Unknown'} - ${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Digital Audit`,
      status: 'review_required' as const,
      mode: selectedMode,
      categories: selectedCategories,
      overallScore,
      categoryScores,
      priorityFindingCount,
      reviewCompletion: 0,
      suggestedServices: [],
      owner: 'user-1',
      createdAt: now,
      updatedAt: now,
    };

    setAudits([...audits, newAudit]);
    setFindings([...findings, ...newFindings]);

    toast.success('Demonstration audit created', {
      description: 'No website was crawled. This is a frontend demonstration using fictional data.',
      duration: 6000,
    });

    router.push(`/app/audits/${newAuditId}`);
  };

  return (
    <div>
      <PageHeader
        title="Create Audit"
        description="Set up a new digital audit in the demonstration workspace."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/audits')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
          </div>
        }
      />

      {/* Step indicator */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <div className="h-px flex-1 bg-border max-w-[40px]" />}
            <div
              className={`flex items-center gap-1.5 text-xs font-medium ${
                i <= step ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full text-[10px] ${
                  i < step
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                    : i === step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {i < step ? <Check className="size-3" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Select Prospect</h3>
              <p className="text-xs text-muted-foreground">Choose the prospect this audit is for.</p>
              <Select value={selectedProspectId} onValueChange={setSelectedProspectId}>
                <SelectTrigger><SelectValue placeholder="Select a prospect…" /></SelectTrigger>
                <SelectContent>
                  {prospects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.company} — {p.contactName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProspect && (
                <div className="rounded-md bg-muted/50 p-3 text-sm">
                  <p><span className="text-muted-foreground">Website:</span> {selectedProspect.website}</p>
                  <p><span className="text-muted-foreground">Industry:</span> {selectedProspect.industry}</p>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Audit Mode</h3>
              <p className="text-xs text-muted-foreground">Choose the depth of the audit.</p>
              <div className="grid gap-3">
                {auditModes.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setSelectedMode(mode.value)}
                    className={`rounded-md border p-3 text-left text-sm transition-colors ${
                      selectedMode === mode.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{mode.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Categories</h3>
              <p className="text-xs text-muted-foreground">
                {selectedMode === 'comprehensive'
                  ? 'All categories are included in comprehensive mode.'
                  : 'Select the categories to audit.'}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {auditCategories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.value);
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => toggleCategory(cat.value)}
                      disabled={selectedMode === 'comprehensive'}
                      className={`flex items-center gap-2 rounded-md border p-2.5 text-sm text-left transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      } ${selectedMode === 'comprehensive' ? 'opacity-60' : ''}`}
                    >
                      <div
                        className={`size-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-primary border-primary' : 'border-border'
                        }`}
                      >
                        {isSelected && <Check className="size-3 text-primary-foreground" />}
                      </div>
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Business Context</h3>
              <p className="text-xs text-muted-foreground">
                Provide any additional context about the prospect&apos;s business goals.
              </p>
              <Textarea
                placeholder="e.g. The client is focused on improving patient acquisition through digital channels…"
                rows={4}
                value={businessContext}
                onChange={(e) => setBusinessContext(e.target.value)}
                aria-label="Business context"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Review</h3>
              <p className="text-xs text-muted-foreground">
                Confirm the audit configuration before creating.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prospect</span>
                  <span>{selectedProspect?.company ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Website</span>
                  <span>{selectedProspect?.website ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode</span>
                  <span className="capitalize">{selectedMode.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categories</span>
                  <span>{selectedCategories.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs capitalize">
                      {cat.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 p-3 text-xs text-amber-800 dark:text-amber-300">
                No website will be crawled. The audit will be generated from fictional rule results for demonstration purposes.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-4 flex items-center gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
            Continue
          </Button>
        )}
        {step === steps.length - 1 && (
          <Button onClick={handleCreate} disabled={!canProceed()}>
            Create Audit
          </Button>
        )}
      </div>
    </div>
  );
}
