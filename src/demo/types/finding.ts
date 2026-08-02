import type { AuditCategory } from './audit';

export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'informational';
export type FindingStatus = 'unreviewed' | 'verified' | 'edited' | 'false_positive' | 'excluded';

export interface Finding {
  id: string;
  auditId: string;
  title: string;
  category: AuditCategory;
  severity: FindingSeverity;
  confidence: number; // 0-100
  status: FindingStatus;
  pageUrl: string;
  evidenceSummary: string;
  businessConsequence: string;
  recommendation: string;
  suggestedService: string;
  humanVerificationRequired: boolean;
  includedInReport: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateFindingInput {
  status?: FindingStatus;
  severity?: FindingSeverity;
  includedInReport?: boolean;
  notes?: string;
}
