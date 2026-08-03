'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Globe, Mail, Phone, ArrowLeft } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Prospect, ProspectStage } from '@/demo/types/prospect';
import { PageHeader, StatusBadge, CurrencyValue, DateValue, DemoLabel, PersonAvatar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ── Page component ───────────────────────────────────────────────────────

export default function ProspectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const prospects = useDemoStore((s) => s.prospects);
  const setProspects = useDemoStore((s) => s.setProspects);
  const audits = useDemoStore((s) => s.audits);
  const opportunities = useDemoStore((s) => s.opportunities);
  const findings = useDemoStore((s) => s.findings);
  const users = useDemoStore((s) => s.users);

  const prospect = prospects.find((p) => p.id === id);

  if (!prospect) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Prospect not found.
      </div>
    );
  }

  const userMap = new Map(users.map((u) => [u.id, u]));
  const owner = userMap.get(prospect.assignedOwner);
  const relatedAudit = prospect.latestAuditId ? audits.find((a) => a.id === prospect.latestAuditId) : null;
  const relatedOpportunity = prospect.opportunityId ? opportunities.find((o) => o.id === prospect.opportunityId) : null;
  const auditFindings = relatedAudit ? findings.filter((f) => f.auditId === relatedAudit.id) : [];

  const handleStageChange = (newStage: string) => {
    const updated = prospects.map((p) =>
      p.id === id ? { ...p, stage: newStage as ProspectStage, updatedAt: new Date().toISOString() } : p
    );
    setProspects(updated);
  };

  return (
    <div>
      <PageHeader
        title={prospect.company}
        description={prospect.website}
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/prospects')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
          </div>
        }
      />

      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{prospect.company}</h2>
                <StatusBadge status={prospect.stage as ProspectStage} category="prospect" />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <PersonAvatar name={prospect.contactName} size="sm" />
                  {prospect.contactName}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="size-3" />
                  <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {prospect.website.replace(/^https?:\/\//, '')}
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="size-3" />
                  <a href={`mailto:${prospect.email}`} className="hover:underline">{prospect.email}</a>
                </span>
                {prospect.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="size-3" />
                    {prospect.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Est. Value</p>
                <CurrencyValue value={prospect.estimatedValue} />
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Owner</p>
                <p className="text-sm">{owner?.name ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Stage</p>
                <Select value={prospect.stage} onValueChange={handleStageChange}>
                  <SelectTrigger className="h-8 w-[140px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {prospect.nextAction && (
            <div className="mt-3 rounded-md bg-muted/50 px-3 py-2 text-sm">
              <span className="font-medium">Next action:</span> {prospect.nextAction}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Commercial Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Commercial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="capitalize">{prospect.industry.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Size</span>
                  <span>{prospect.companySize || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Budget</span>
                  <CurrencyValue value={prospect.estimatedBudget} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lead Source</span>
                  <span>{prospect.leadSource || '—'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact</span>
                  <span>{prospect.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <a href={`mailto:${prospect.email}`} className="hover:underline">{prospect.email}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{prospect.phone || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Website</span>
                  <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    Visit <ExternalLink className="size-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Services of Interest */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Services of Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {prospect.servicesOfInterest.length > 0 ? (
                    prospect.servicesOfInterest.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs capitalize">{s.replace(/_/g, ' ')}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None specified</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Audit */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Related Audit</CardTitle>
              </CardHeader>
              <CardContent>
                {relatedAudit ? (
                  <div className="space-y-2 text-sm">
                    <Link href={`/app/audits/${relatedAudit.id}`} className="font-medium hover:underline">
                      {relatedAudit.title}
                    </Link>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={relatedAudit.status} category="audit" />
                      <span className="text-muted-foreground">Score: {relatedAudit.overallScore}/100</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">No audit yet</span>
                )}
              </CardContent>
            </Card>

            {/* Related Opportunity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Related Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                {relatedOpportunity ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value</span>
                      <CurrencyValue value={relatedOpportunity.value} />
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={relatedOpportunity.stage} category="opportunity" />
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">No opportunity linked</span>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {prospect.tags.length > 0 ? (
                    prospect.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No tags</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audits Tab */}
        <TabsContent value="audits">
          <Card>
            <CardContent className="p-4">
              {relatedAudit ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Link href={`/app/audits/${relatedAudit.id}`} className="font-medium hover:underline">
                      {relatedAudit.title}
                    </Link>
                    <StatusBadge status={relatedAudit.status} category="audit" />
                  </div>
                  <div className="grid gap-2 text-sm sm:grid-cols-3">
                    <div><span className="text-muted-foreground">Mode:</span> {relatedAudit.mode.replace(/_/g, ' ')}</div>
                    <div><span className="text-muted-foreground">Score:</span> {relatedAudit.overallScore}/100</div>
                    <div><span className="text-muted-foreground">Findings:</span> {auditFindings.length}</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No audits for this prospect yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Reports related to this prospect will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Proposals Tab */}
        <TabsContent value="proposals">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Proposals related to this prospect will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="size-2 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium">Prospect created</p>
                    <p className="text-xs text-muted-foreground"><DateValue value={prospect.createdAt} /></p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="size-2 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium">Last updated</p>
                    <p className="text-xs text-muted-foreground"><DateValue value={prospect.updatedAt} /></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm whitespace-pre-wrap">{prospect.notes || 'No notes yet.'}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
