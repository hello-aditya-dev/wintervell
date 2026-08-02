export type OpportunityStage =
  | 'new_prospect'
  | 'audit_planned'
  | 'audit_review'
  | 'report_sent'
  | 'follow_up_due'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost';

export interface Opportunity {
  id: string;
  prospectId: string;
  company: string;
  contact: string;
  value: number;
  currency: string;
  stage: OpportunityStage;
  owner: string;
  nextAction: string;
  relatedAuditId: string | null;
  relatedProposalId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOpportunityInput {
  prospectId: string;
  company: string;
  contact: string;
  value?: number;
  currency?: string;
  stage?: OpportunityStage;
  owner?: string;
  nextAction?: string;
  relatedAuditId?: string | null;
  relatedProposalId?: string | null;
}

export interface UpdateOpportunityInput {
  value?: number;
  currency?: string;
  stage?: OpportunityStage;
  owner?: string;
  nextAction?: string;
  relatedAuditId?: string | null;
  relatedProposalId?: string | null;
}
