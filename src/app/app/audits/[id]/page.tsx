'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  X,
  Edit3,
  EyeOff,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Shield,
} from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Audit, AuditStatus, AuditCategory, CategoryScore } from '@/demo/types/audit';
import type { Finding, FindingSeverity, FindingStatus, UpdateFindingInput } from '@/demo/types/finding';
import {
  PageHeader,
  StatusBadge,
  ScoreBadge,
  SeverityBadge,
  DateValue,
  CurrencyValue,
  DemoLabel,
  FilterBar,
  ConfirmDialog,
} from '@/components/shared';
import type { FilterSelect } from '@/components/shared/FilterBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Filter options ───────────────────────────────────────────────────────

const categoryFilterOptions: FilterSelect = {
  key: 'category',
  placeholder: 'Category',
  options: [
    { label: 'Technical', value: 'technical' },
    { label: 'SEO', value: 'seo' },
    { label: 'Performance', value: 'performance' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Accessibility', value: 'accessibility' },
    { label: 'Conversion', value: 'conversion' },
    { label: 'Trust', value: 'trust' },
    { label: 'Content', value: 'content' },
    { label: 'AI Search Readiness', value: 'ai_search_readiness' },
  ],
};

const severityFilterOptions: FilterSelect = {
  key: 'severity',
  placeholder: 'Severity',
  options: [
    { label: 'Critical', value: 'critical' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
    { label: 'Informational', value: 'informational' },
  ],
};

const statusFilterOptions: FilterSelect = {
  key: 'findingStatus',
  placeholder: 'Status',
  options: [
    { label: 'Unreviewed', value: 'unreviewed' },
    { label: 'Verified', value: 'verified' },
    { label: 'Edited', value: 'edited' },
    { label: 'False Positive', value: 'false_positive' },
    { label: 'Excluded', value: 'excluded' },
  ],
};

const reportFilterOptions: FilterSelect = {
  key: 'inReport',
  placeholder: 'In Report',
  options: [
    { label: 'Included', value: 'yes' },
    { label: 'Excluded', value: 'no' },
  ],
};

const reviewFilterOptions: FilterSelect = {
  key: 'needsReview',
  placeholder: 'Human Review',
  options: [
    { label: 'Required', value: 'yes' },
    { label: 'Not Required', value: 'no' },
  ],
};

// ── Severity color map for summary ───────────────────────────────────────

const severityOrder: FindingSeverity[] = ['critical', 'high', 'medium', 'low', 'informational'];

// ── Page component ───────────────────────────────────────────────────────

export default function AuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const audits = useDemoStore((s) => s.audits);
  const setAudits = useDemoStore((s) => s.setAudits);
  const findings = useDemoStore((s) => s.findings);
  const setFindings = useDemoStore((s) => s.setFindings);
  const prospects = useDemoStore((s) => s.prospects);
  const users = useDemoStore((s) => s.users);
  const services = useDemoStore((s) => s.services);

  const audit = audits.find((a) => a.id === id);

  // Finding filters - must be declared before any conditional return
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [severityFilter, setSeverityFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [reportFilter, setReportFilter] = React.useState('');
  const [reviewFilter, setReviewFilter] = React.useState('');

  // Selected finding for detail view
  const [selectedFindingId, setSelectedFindingId] = React.useState<string | null>(null);
  // Note editing
  const [noteEditingId, setNoteEditingId] = React.useState<string | null>(null);
  const [noteText, setNoteText] = React.useState('');

  const auditFindings = findings.filter((f) => f.auditId === id);
  const userMap = new Map(users.map((u) => [u.id, u.name]));

  // Filtered findings
  const filteredFindings = React.useMemo(() => {
    let data = auditFindings;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.evidenceSummary.toLowerCase().includes(q) ||
          f.recommendation.toLowerCase().includes(q)
      );
    }
    if (categoryFilter) data = data.filter((f) => f.category === categoryFilter);
    if (severityFilter) data = data.filter((f) => f.severity === severityFilter);
    if (statusFilter) data = data.filter((f) => f.status === statusFilter);
    if (reportFilter === 'yes') data = data.filter((f) => f.includedInReport);
    if (reportFilter === 'no') data = data.filter((f) => !f.includedInReport);
    if (reviewFilter === 'yes') data = data.filter((f) => f.humanVerificationRequired);
    if (reviewFilter === 'no') data = data.filter((f) => !f.humanVerificationRequired);
    return data;
  }, [auditFindings, search, categoryFilter, severityFilter, statusFilter, reportFilter, reviewFilter]);

  const hasActiveFilters = !!(search || categoryFilter || severityFilter || statusFilter || reportFilter || reviewFilter);

  const clearFilters = React.useCallback(() => {
    setSearch('');
    setCategoryFilter('');
    setSeverityFilter('');
    setStatusFilter('');
    setReportFilter('');
    setReviewFilter('');
  }, [setSearch, setCategoryFilter, setSeverityFilter, setStatusFilter, setReportFilter, setReviewFilter]);

  if (!audit) {
    notFound();
  }

  const prospect = prospects.find((p) => p.id === audit.prospectId);

  const selectedFinding = auditFindings.find((f) => f.id === selectedFindingId);

  // ── Finding actions ──────────────────────────────────────────────────

  const updateFinding = (findingId: string, update: UpdateFindingInput) => {
    const updated = findings.map((f) =>
      f.id === findingId ? { ...f, ...update, updatedAt: new Date().toISOString() } : f
    );
    setFindings(updated);
  };

  const handleVerify = (findingId: string) => {
    updateFinding(findingId, { status: 'verified' });
    toast.success('Finding verified');
  };

  const handleFalsePositive = (findingId: string) => {
    updateFinding(findingId, { status: 'false_positive', includedInReport: false });
    toast.info('Marked as false positive');
  };

  const handleExclude = (findingId: string) => {
    updateFinding(findingId, { includedInReport: false });
    toast.info('Excluded from report');
  };

  const handleInclude = (findingId: string) => {
    updateFinding(findingId, { includedInReport: true });
    toast.info('Included in report');
  };

  const handleSeverityChange = (findingId: string, severity: FindingSeverity) => {
    updateFinding(findingId, { severity });
    toast.success('Severity updated');
  };

  const handleSaveNote = (findingId: string) => {
    updateFinding(findingId, { notes: noteText });
    setNoteEditingId(null);
    toast.success('Note saved');
  };

  const handleApproveAudit = () => {
    const updated = audits.map((a) =>
      a.id === id ? { ...a, status: 'approved' as AuditStatus, updatedAt: new Date().toISOString() } : a
    );
    setAudits(updated);
    toast.success('Demonstration audit approved');
  };

  // ── Summary stats ────────────────────────────────────────────────────

  const findingsBySeverity = severityOrder.map((sev) => ({
    severity: sev,
    count: auditFindings.filter((f) => f.severity === sev).length,
  }));

  const reviewRequiredCount = auditFindings.filter((f) => f.humanVerificationRequired && f.status === 'unreviewed').length;
  const includedInReportCount = auditFindings.filter((f) => f.includedInReport).length;

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <PageHeader
        title={audit.title}
        description={prospect ? `${prospect.company} · ${audit.website}` : audit.website}
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/audits')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
            {audit.status === 'review_required' && (
              <Button size="sm" onClick={handleApproveAudit}>
                <Shield className="size-3.5 mr-1" /> Approve Demo Report
              </Button>
            )}
          </div>
        }
      />

      {/* Header info card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={audit.status} category="audit" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Overall Score</span>
              <ScoreBadge score={audit.overallScore} size="md" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Mode</span>
              <span className="capitalize">{audit.mode.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Updated</span>
              <DateValue value={audit.updatedAt} relative />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Owner</span>
              <span>{userMap.get(audit.owner) ?? audit.owner}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        {/* Category Score Cards */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Category Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-3">
              {audit.categoryScores.map((cs) => (
                <div key={cs.category} className="flex items-center justify-between rounded-md border p-2.5">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{cs.label}</p>
                    <p className="text-xs text-muted-foreground">{cs.findingCount} findings</p>
                  </div>
                  <ScoreBadge score={cs.score} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Findings by Severity + Review Completion */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Findings by Severity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {findingsBySeverity.map((item) => (
                <div key={item.severity} className="flex items-center justify-between">
                  <SeverityBadge severity={item.severity} showDot />
                  <span className="text-xs tabular-nums">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Review Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={audit.reviewCompletion} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{audit.reviewCompletion}% complete</span>
                <span>{reviewRequiredCount} need review</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {includedInReportCount} of {auditFindings.length} included in report
              </div>
            </CardContent>
          </Card>

          {audit.suggestedServices.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Suggested Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {audit.suggestedServices.map((sId) => {
                    const svc = services.find((s) => s.id === sId);
                    return svc ? (
                      <div key={sId} className="text-xs">{svc.name}</div>
                    ) : (
                      <div key={sId} className="text-xs text-muted-foreground">{sId}</div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Findings Workspace */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium">Findings ({filteredFindings.length})</h2>
      </div>

      <FilterBar
        searchPlaceholder="Search findings…"
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        filters={[
          { ...categoryFilterOptions, value: categoryFilter, onChange: setCategoryFilter },
          { ...severityFilterOptions, value: severityFilter, onChange: setSeverityFilter },
          { ...statusFilterOptions, value: statusFilter, onChange: setStatusFilter },
          { ...reportFilterOptions, value: reportFilter, onChange: setReportFilter },
          { ...reviewFilterOptions, value: reviewFilter, onChange: setReviewFilter },
        ]}
      />

      {/* Desktop: Split view */}
      <div className="mt-4 hidden md:grid md:grid-cols-[1fr_1.2fr] gap-4">
        {/* Findings List */}
        <div className="max-h-[600px] overflow-y-auto rounded-md border scrollbar-wv">
          {filteredFindings.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No findings match your filters.</div>
          ) : (
            filteredFindings.map((finding) => (
              <button
                key={finding.id}
                className={cn(
                  'w-full text-left p-3 border-b transition-colors hover:bg-muted/50',
                  selectedFindingId === finding.id && 'bg-muted/70'
                )}
                onClick={() => setSelectedFindingId(finding.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{finding.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <SeverityBadge severity={finding.severity} showDot />
                      <StatusBadge status={finding.status} category="finding" />
                      {finding.humanVerificationRequired && (
                        <Badge variant="outline" className="text-[9px] border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400">
                          Review
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Evidence Detail */}
        <div className="rounded-md border">
          {selectedFinding ? (
            <FindingDetail
              finding={selectedFinding}
              services={services}
              onVerify={() => handleVerify(selectedFinding.id)}
              onFalsePositive={() => handleFalsePositive(selectedFinding.id)}
              onExclude={() => handleExclude(selectedFinding.id)}
              onInclude={() => handleInclude(selectedFinding.id)}
              onSeverityChange={(sev) => handleSeverityChange(selectedFinding.id, sev)}
              noteEditing={noteEditingId === selectedFinding.id}
              noteText={noteText}
              onStartNote={() => {
                setNoteEditingId(selectedFinding.id);
                setNoteText(selectedFinding.notes);
              }}
              onCancelNote={() => setNoteEditingId(null)}
              onSaveNote={() => handleSaveNote(selectedFinding.id)}
              onNoteTextChange={setNoteText}
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] text-sm text-muted-foreground">
              Select a finding to view details
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Findings list + Sheet */}
      <div className="md:hidden">
        <div className="max-h-[500px] overflow-y-auto rounded-md border scrollbar-wv">
          {filteredFindings.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No findings match your filters.</div>
          ) : (
            filteredFindings.map((finding) => (
              <button
                key={finding.id}
                className="w-full text-left p-3 border-b hover:bg-muted/50"
                onClick={() => setSelectedFindingId(finding.id)}
              >
                <p className="text-sm font-medium">{finding.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <SeverityBadge severity={finding.severity} showDot />
                  <StatusBadge status={finding.status} category="finding" />
                </div>
              </button>
            ))
          )}
        </div>

        <Sheet open={!!selectedFindingId} onOpenChange={(open) => { if (!open) setSelectedFindingId(null); }}>
          <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{selectedFinding?.title}</SheetTitle>
            </SheetHeader>
            {selectedFinding && (
              <div className="mt-4">
                <FindingDetail
                  finding={selectedFinding}
                  services={services}
                  onVerify={() => handleVerify(selectedFinding.id)}
                  onFalsePositive={() => handleFalsePositive(selectedFinding.id)}
                  onExclude={() => handleExclude(selectedFinding.id)}
                  onInclude={() => handleInclude(selectedFinding.id)}
                  onSeverityChange={(sev) => handleSeverityChange(selectedFinding.id, sev)}
                  noteEditing={noteEditingId === selectedFinding.id}
                  noteText={noteText}
                  onStartNote={() => {
                    setNoteEditingId(selectedFinding.id);
                    setNoteText(selectedFinding.notes);
                  }}
                  onCancelNote={() => setNoteEditingId(null)}
                  onSaveNote={() => handleSaveNote(selectedFinding.id)}
                  onNoteTextChange={setNoteText}
                />
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// ── FindingDetail component ──────────────────────────────────────────────

interface FindingDetailProps {
  finding: Finding;
  services: { id: string; name: string }[];
  onVerify: () => void;
  onFalsePositive: () => void;
  onExclude: () => void;
  onInclude: () => void;
  onSeverityChange: (severity: FindingSeverity) => void;
  noteEditing: boolean;
  noteText: string;
  onStartNote: () => void;
  onCancelNote: () => void;
  onSaveNote: () => void;
  onNoteTextChange: (text: string) => void;
}

function FindingDetail({
  finding,
  services,
  onVerify,
  onFalsePositive,
  onExclude,
  onInclude,
  onSeverityChange,
  noteEditing,
  noteText,
  onStartNote,
  onCancelNote,
  onSaveNote,
  onNoteTextChange,
}: FindingDetailProps) {
  const suggestedService = services.find((s) => s.id === finding.suggestedService);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{finding.title}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <SeverityBadge severity={finding.severity} showDot />
            <StatusBadge status={finding.status} category="finding" />
            <Badge variant="outline" className="text-[10px] capitalize">{finding.category.replace(/_/g, ' ')}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="text-[10px] tabular-nums">
            {finding.confidence}% confidence
          </Badge>
        </div>
      </div>

      {/* Page URL */}
      <div className="text-xs text-muted-foreground">
        <span className="font-medium">Page:</span>{' '}
        <a href={finding.pageUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {finding.pageUrl}
        </a>
      </div>

      {/* Evidence Summary */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-1">Evidence Summary</h4>
        <p className="text-sm">{finding.evidenceSummary}</p>
      </div>

      {/* Business Consequence */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-1">Business Consequence</h4>
        <p className="text-sm">{finding.businessConsequence}</p>
      </div>

      {/* Recommendation */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-1">Recommendation</h4>
        <p className="text-sm">{finding.recommendation}</p>
      </div>

      {/* Suggested Service */}
      {suggestedService && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-1">Suggested Service</h4>
          <Badge variant="secondary" className="text-xs">{suggestedService.name}</Badge>
        </div>
      )}

      {/* Human Verification */}
      {finding.humanVerificationRequired && (
        <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 p-2.5 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="size-3.5 shrink-0" />
          Human verification required for this finding.
        </div>
      )}

      {/* Report inclusion */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">In report:</span>
        {finding.includedInReport ? (
          <Badge variant="outline" className="text-[10px] border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
            Included
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            Excluded
          </Badge>
        )}
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {finding.status === 'unreviewed' && (
          <Button size="sm" variant="outline" onClick={onVerify}>
            <Check className="size-3 mr-1" /> Verify
          </Button>
        )}
        {finding.status !== 'false_positive' && (
          <ConfirmDialog
            trigger={
              <Button size="sm" variant="outline">
                <X className="size-3 mr-1" /> False Positive
              </Button>
            }
            title="Mark as False Positive?"
            description="This finding will be excluded from the report."
            confirmLabel="Mark False Positive"
            variant="destructive"
            onConfirm={onFalsePositive}
          />
        )}
        {finding.includedInReport ? (
          <Button size="sm" variant="outline" onClick={onExclude}>
            <EyeOff className="size-3 mr-1" /> Exclude from Report
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={onInclude}>
            <Check className="size-3 mr-1" /> Include in Report
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Edit3 className="size-3 mr-1" /> Change Severity
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {severityOrder.map((sev) => (
              <DropdownMenuItem key={sev} onClick={() => onSeverityChange(sev)}>
                <SeverityBadge severity={sev} showDot />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" onClick={onStartNote}>
          <MessageSquare className="size-3 mr-1" /> Add Note
        </Button>
      </div>

      {/* Notes */}
      {(finding.notes || noteEditing) && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Notes</h4>
          {noteEditing ? (
            <div className="space-y-2">
              <Textarea
                rows={3}
                value={noteText}
                onChange={(e) => onNoteTextChange(e.target.value)}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={onSaveNote}>Save Note</Button>
                <Button size="sm" variant="outline" onClick={onCancelNote}>Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{finding.notes}</p>
          )}
        </div>
      )}
    </div>
  );
}
