export type AuditStatus =
  | 'draft'
  | 'ready'
  | 'running_demo'
  | 'review_required'
  | 'approved'
  | 'published'
  | 'failed_demo';

export type AuditMode = 'quick' | 'standard' | 'comprehensive' | 'manual_review';

export type AuditCategory =
  | 'technical'
  | 'seo'
  | 'performance'
  | 'mobile'
  | 'accessibility'
  | 'conversion'
  | 'trust'
  | 'content'
  | 'ai_search_readiness';

export interface CategoryScore {
  category: AuditCategory;
  score: number; // 0-100
  findingCount: number;
  label: string;
}

export interface Audit {
  id: string;
  prospectId: string;
  website: string;
  title: string;
  status: AuditStatus;
  mode: AuditMode;
  categories: AuditCategory[];
  overallScore: number;
  categoryScores: CategoryScore[];
  priorityFindingCount: number;
  reviewCompletion: number; // 0-100
  suggestedServices: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAuditInput {
  prospectId: string;
  mode: AuditMode;
  categories: AuditCategory[];
  businessContext?: string;
}

export interface UpdateAuditInput {
  status?: AuditStatus;
  overallScore?: number;
  categoryScores?: CategoryScore[];
  priorityFindingCount?: number;
  reviewCompletion?: number;
  suggestedServices?: string[];
}
