export type ProspectStage = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';

export type Industry =
  | 'healthcare'
  | 'legal'
  | 'finance'
  | 'education'
  | 'retail'
  | 'technology'
  | 'real_estate'
  | 'hospitality'
  | 'construction'
  | 'other';

export interface Prospect {
  id: string;
  contactName: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  industry: Industry;
  companySize: string;
  leadSource: string;
  servicesOfInterest: string[];
  estimatedBudget: number | null;
  currency: string;
  assignedOwner: string;
  stage: ProspectStage;
  estimatedValue: number;
  tags: string[];
  notes: string;
  nextAction: string;
  latestAuditId: string | null;
  opportunityId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProspectInput {
  contactName: string;
  company: string;
  website: string;
  email: string;
  phone?: string;
  industry: Industry;
  companySize?: string;
  leadSource?: string;
  servicesOfInterest?: string[];
  estimatedBudget?: number | null;
  currency?: string;
  assignedOwner?: string;
  tags?: string[];
  notes?: string;
}

export interface UpdateProspectInput {
  contactName?: string;
  company?: string;
  website?: string;
  email?: string;
  phone?: string;
  industry?: Industry;
  companySize?: string;
  leadSource?: string;
  servicesOfInterest?: string[];
  estimatedBudget?: number | null;
  currency?: string;
  assignedOwner?: string;
  stage?: ProspectStage;
  estimatedValue?: number;
  tags?: string[];
  notes?: string;
  nextAction?: string;
  latestAuditId?: string | null;
  opportunityId?: string | null;
}
