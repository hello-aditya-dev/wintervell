export type ProposalStatus = 'draft' | 'ready' | 'sent_demo' | 'accepted_demo' | 'rejected_demo';

export interface ProposalItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  sourceFindingId?: string;
}

export interface Proposal {
  id: string;
  prospectId: string;
  auditId: string;
  title: string;
  status: ProposalStatus;
  executiveSummary: string;
  objectives: string[];
  scope: string[];
  deliverables: string[];
  exclusions: string[];
  assumptions: string[];
  dependencies: string[];
  timeline: string;
  items: ProposalItem[];
  optionalServices: string[];
  paymentSchedule: string;
  acceptanceCriteria: string;
  nextStep: string;
  totalValue: number;
  currency: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProposalInput {
  prospectId: string;
  auditId: string;
  title: string;
  executiveSummary?: string;
  objectives?: string[];
  scope?: string[];
  deliverables?: string[];
  exclusions?: string[];
  assumptions?: string[];
  dependencies?: string[];
  timeline?: string;
  items?: ProposalItem[];
  optionalServices?: string[];
  paymentSchedule?: string;
  acceptanceCriteria?: string;
  nextStep?: string;
  currency?: string;
}

export interface UpdateProposalInput {
  status?: ProposalStatus;
  executiveSummary?: string;
  objectives?: string[];
  scope?: string[];
  deliverables?: string[];
  exclusions?: string[];
  assumptions?: string[];
  dependencies?: string[];
  timeline?: string;
  items?: ProposalItem[];
  optionalServices?: string[];
  paymentSchedule?: string;
  acceptanceCriteria?: string;
  nextStep?: string;
  totalValue?: number;
}
