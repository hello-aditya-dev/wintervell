'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import {
  ArrowLeft,
  Eye,
  Printer,
  Monitor,
  ToggleLeft,
  ToggleRight,
  Check,
  GripVertical,
} from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Report, ReportSection, ReportSectionConfig, ReportStatus, UpdateReportInput } from '@/demo/types/report';
import type { Finding, FindingSeverity } from '@/demo/types/finding';
import type { Audit } from '@/demo/types/audit';
import {
  PageHeader,
  StatusBadge,
  ScoreBadge,
  SeverityBadge,
  DateValue,
  DemoLabel,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ── Section labels ───────────────────────────────────────────────────────

const sectionLabels: Record<ReportSection, string> = {
  cover: 'Cover',
  executive_summary: 'Executive Summary',
  score_overview: 'Score Overview',
  priority_findings: 'Priority Findings',
  quick_wins: 'Quick Wins',
  roadmap: 'Roadmap',
  recommended_services: 'Recommended Services',
  next_step: 'Next Step',
};

// ── Page component ───────────────────────────────────────────────────────

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const reports = useDemoStore((s) => s.reports);
  const setReports = useDemoStore((s) => s.setReports);
  const audits = useDemoStore((s) => s.audits);
  const findings = useDemoStore((s) => s.findings);
  const prospects = useDemoStore((s) => s.prospects);
  const services = useDemoStore((s) => s.services);

  const report = reports.find((r) => r.id === id);

  const [previewMode, setPreviewMode] = React.useState<'desktop' | 'print'>('desktop');
  const [showPricing, setShowPricing] = React.useState(true);
  const [editingSection, setEditingSection] = React.useState<ReportSection | null>(null);
  const [editText, setEditText] = React.useState('');

  if (!report) {
    notFound();
  }

  const audit = audits.find((a) => a.id === report.auditId);
  const prospect = audit ? prospects.find((p) => p.id === audit.prospectId) : null;
  const reportFindings = report.selectedFindings
    .map((fId) => findings.find((f) => f.id === fId))
    .filter(Boolean) as Finding[];

  const sortedSections = [...report.sections].sort((a, b) => a.order - b.order);

  const handleToggleSection = (section: ReportSection) => {
    const updated = reports.map((r) => {
      if (r.id !== id) return r;
      return {
        ...r,
        sections: r.sections.map((s) =>
          s.section === section ? { ...s, included: !s.included } : s
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    setReports(updated);
  };

  const handleToggleFinding = (findingId: string) => {
    const updated = reports.map((r) => {
      if (r.id !== id) return r;
      const selected = r.selectedFindings.includes(findingId)
        ? r.selectedFindings.filter((f) => f !== findingId)
        : [...r.selectedFindings, findingId];
      return { ...r, selectedFindings: selected, updatedAt: new Date().toISOString() };
    });
    setReports(updated);
  };

  const handlePublish = () => {
    const updated = reports.map((r) =>
      r.id === id
        ? { ...r, status: 'published_demo' as ReportStatus, updatedAt: new Date().toISOString() }
        : r
    );
    setReports(updated);
    toast.success('Demonstration report published', {
      description: 'Published in demonstration workspace.',
    });
  };

  const handleStartEdit = (section: ReportSection) => {
    setEditingSection(section);
    setEditText(getSectionContent(section));
  };

  const handleSaveEdit = () => {
    setEditingSection(null);
    toast.success('Section copy updated in demonstration workspace');
  };

  function getSectionContent(section: ReportSection): string {
    switch (section) {
      case 'cover':
        return `${report!.clientName}\nDigital Presence Audit Report\nPrepared by ${report!.brand}`;
      case 'executive_summary':
        return `This report presents the findings of a digital audit conducted for ${report!.clientName}. The audit identified ${reportFindings.length} key findings across ${audit?.categories.length ?? 0} categories, with an overall score of ${audit?.overallScore ?? 0}/100. Priority areas include ${reportFindings.filter((f) => f.severity === 'critical' || f.severity === 'high').length} high-severity findings that require immediate attention.`;
      case 'score_overview':
        return audit ? `Overall Digital Score: ${audit.overallScore}/100` : '';
      case 'priority_findings':
        return `This section highlights the ${reportFindings.filter((f) => f.severity === 'critical' || f.severity === 'high').length} most critical findings that should be addressed as a priority.`;
      case 'quick_wins':
        return `The following findings represent quick wins that can be implemented with minimal effort but significant impact.`;
      case 'roadmap':
        return `A phased implementation roadmap is recommended based on finding severity and business impact.`;
      case 'recommended_services':
        return `Based on the audit findings, we recommend the following services to address the identified issues.`;
      case 'next_step':
        return `We recommend scheduling a review meeting to discuss the findings and agree on next steps.`;
      default:
        return '';
    }
  }

  return (
    <div>
      <PageHeader
        title={report.title}
        description={report.clientName}
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/reports')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
          </div>
        }
      />

      {/* Three-part layout */}
      <div className="grid gap-4 lg:grid-cols-[220px_1fr_260px]">
        {/* Left: Section Navigation */}
        <Card className="hidden lg:block">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">Sections</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-[500px]">
              <div className="space-y-0.5">
                {sortedSections.map((s) => (
                  <div
                    key={s.section}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs cursor-pointer transition-colors',
                      s.included ? 'text-foreground hover:bg-muted' : 'text-muted-foreground line-through'
                    )}
                    onClick={() => handleToggleSection(s.section)}
                  >
                    <Switch
                      checked={s.included}
                      onCheckedChange={() => handleToggleSection(s.section)}
                      className="scale-75"
                    />
                    {sectionLabels[s.section]}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Center: Report Preview */}
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium">Preview</CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="size-3 mr-1" /> Desktop
              </Button>
              <Button
                variant={previewMode === 'print' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setPreviewMode('print')}
              >
                <Printer className="size-3 mr-1" /> Print
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                'border rounded-md bg-white dark:bg-background p-6 space-y-6',
                previewMode === 'print' && 'max-w-[210mm] mx-auto text-[11px] leading-tight'
              )}
            >
              {sortedSections.filter((s) => s.included).map((s) => (
                <div key={s.section} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{sectionLabels[s.section]}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleStartEdit(s.section)}
                    >
                      Edit
                    </Button>
                  </div>

                  {editingSection === s.section ? (
                    <div className="space-y-2">
                      <Textarea
                        rows={4}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {s.section === 'cover' && (
                        <div className="text-center py-8">
                          <h2 className="text-xl font-bold">{report.clientName}</h2>
                          <p className="text-muted-foreground mt-1">Digital Presence Audit Report</p>
                          <p className="text-xs text-muted-foreground mt-2">Prepared by {report.brand}</p>
                        </div>
                      )}

                      {s.section === 'executive_summary' && (
                        <p className="text-sm">{getSectionContent('executive_summary')}</p>
                      )}

                      {s.section === 'score_overview' && audit && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">Overall Score</span>
                            <ScoreBadge score={audit.overallScore} size="lg" />
                          </div>
                          <div className="grid gap-2 sm:grid-cols-3">
                            {audit.categoryScores.map((cs) => (
                              <div key={cs.category} className="flex items-center justify-between rounded-md border p-2">
                                <span className="text-xs">{cs.label}</span>
                                <ScoreBadge score={cs.score} size="sm" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {s.section === 'priority_findings' && (
                        <div className="space-y-3">
                          {reportFindings
                            .filter((f) => f.severity === 'critical' || f.severity === 'high')
                            .map((f) => (
                              <div key={f.id} className="rounded-md border p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <SeverityBadge severity={f.severity} showDot />
                                  <span className="text-sm font-medium">{f.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{f.recommendation}</p>
                              </div>
                            ))}
                        </div>
                      )}

                      {s.section === 'quick_wins' && (
                        <div className="space-y-2">
                          {reportFindings
                            .filter((f) => f.severity === 'low' || f.severity === 'medium')
                            .slice(0, 3)
                            .map((f) => (
                              <div key={f.id} className="flex items-center gap-2 rounded-md border p-2">
                                <SeverityBadge severity={f.severity} showDot />
                                <span className="text-xs">{f.title}</span>
                              </div>
                            ))}
                        </div>
                      )}

                      {s.section === 'roadmap' && (
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">Phase 1</Badge>
                            <span>Critical findings remediation (Weeks 1-3)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">Phase 2</Badge>
                            <span>High-priority optimizations (Weeks 4-6)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">Phase 3</Badge>
                            <span>Content and conversion improvements (Weeks 7-10)</span>
                          </div>
                        </div>
                      )}

                      {s.section === 'recommended_services' && (
                        <div className="space-y-2">
                          {audit?.suggestedServices.map((sId) => {
                            const svc = services.find((sv) => sv.id === sId);
                            return svc ? (
                              <div key={sId} className="rounded-md border p-2.5">
                                <p className="text-sm font-medium">{svc.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{svc.description.slice(0, 120)}…</p>
                                {showPricing && (
                                  <p className="text-xs mt-1">
                                    From <span className="font-medium">${svc.startingPrice.toLocaleString()}</span> ({svc.pricingModel})
                                  </p>
                                )}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}

                      {s.section === 'next_step' && (
                        <p className="text-sm">{getSectionContent('next_step')}</p>
                      )}
                    </>
                  )}

                  <Separator />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: Settings Panel */}
        <Card className="hidden lg:block">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <StatusBadge status={report.status} category="report" />
            </div>

            {/* Brand */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Brand</p>
              <p className="text-sm">{report.brand}</p>
            </div>

            {/* Toggle pricing */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Show pricing</p>
              <Switch checked={showPricing} onCheckedChange={setShowPricing} />
            </div>

            {/* Section toggles for mobile reference */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Include Sections</p>
              <div className="space-y-1.5">
                {sortedSections.map((s) => (
                  <div key={s.section} className="flex items-center justify-between">
                    <span className="text-xs">{sectionLabels[s.section]}</span>
                    <Switch
                      checked={s.included}
                      onCheckedChange={() => handleToggleSection(s.section)}
                      className="scale-75"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Selected Findings */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Selected Findings</p>
              <ScrollArea className="max-h-[200px]">
                <div className="space-y-1">
                  {reportFindings.map((f) => (
                    <div key={f.id} className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={report.selectedFindings.includes(f.id)}
                        onChange={() => handleToggleFinding(f.id)}
                        className="rounded border-border"
                      />
                      <span className="text-xs truncate">{f.title}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* View stats */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">View Statistics (simulated)</p>
              <div className="text-xs space-y-0.5">
                <p>Views: {report.viewCount}</p>
                <p>First shared: <DateValue value={report.firstSharedAt} /></p>
                <p>Last viewed: <DateValue value={report.lastViewedAt} relative /></p>
              </div>
            </div>

            <Separator />

            <Button size="sm" className="w-full" onClick={handlePublish}>
              Publish Demo Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Settings in a collapsible section */}
      <div className="lg:hidden mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Show pricing</p>
              <Switch checked={showPricing} onCheckedChange={setShowPricing} />
            </div>
            <div className="space-y-1.5">
              {sortedSections.map((s) => (
                <div key={s.section} className="flex items-center justify-between">
                  <span className="text-xs">{sectionLabels[s.section]}</span>
                  <Switch
                    checked={s.included}
                    onCheckedChange={() => handleToggleSection(s.section)}
                    className="scale-75"
                  />
                </div>
              ))}
            </div>
            <Button size="sm" className="w-full" onClick={handlePublish}>
              Publish Demo Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
