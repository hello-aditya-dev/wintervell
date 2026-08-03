export type ReportStatus = 'draft' | 'ready' | 'published_demo';
export type ReportSection =
  | 'cover'
  | 'executive_summary'
  | 'score_overview'
  | 'priority_findings'
  | 'quick_wins'
  | 'roadmap'
  | 'recommended_services'
  | 'next_step';

export interface ReportSectionConfig {
  section: ReportSection;
  included: boolean;
  order: number;
}

export interface Report {
  id: string;
  auditId: string;
  clientName: string;
  title: string;
  status: ReportStatus;
  brand: string;
  sections: ReportSectionConfig[];
  selectedFindings: string[];
  firstSharedAt: string | null;
  lastViewedAt: string | null;
  viewCount: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportInput {
  auditId: string;
  clientName: string;
  title: string;
  brand?: string;
  sections?: ReportSectionConfig[];
  selectedFindings?: string[];
}

export interface UpdateReportInput {
  status?: ReportStatus;
  sections?: ReportSectionConfig[];
  selectedFindings?: string[];
  firstSharedAt?: string | null;
  lastViewedAt?: string | null;
  viewCount?: number;
}
