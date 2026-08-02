import type { Proposal, CreateProposalInput, UpdateProposalInput, ProposalStatus } from '../types/proposal';

export interface ProposalFilters {
  prospectId?: string;
  auditId?: string;
  status?: ProposalStatus;
  owner?: string;
}

export interface ProposalRepository {
  list(filters?: ProposalFilters): Proposal[];
  getById(id: string): Proposal | null;
  create(input: CreateProposalInput): Proposal;
  update(id: string, input: UpdateProposalInput): Proposal | null;
  delete(id: string): boolean;
  updateStatus(id: string, status: ProposalStatus): Proposal | null;
}

export class DemoProposalRepository implements ProposalRepository {
  private getStore: () => {
    proposals: Proposal[];
    setProposals: (proposals: Proposal[]) => void;
  };

  constructor(
    getStore: () => {
      proposals: Proposal[];
      setProposals: (proposals: Proposal[]) => void;
    }
  ) {
    this.getStore = getStore;
  }

  list(filters?: ProposalFilters): Proposal[] {
    const { proposals } = this.getStore();
    let result = [...proposals];

    if (filters) {
      if (filters.prospectId) {
        result = result.filter((p) => p.prospectId === filters.prospectId);
      }
      if (filters.auditId) {
        result = result.filter((p) => p.auditId === filters.auditId);
      }
      if (filters.status) {
        result = result.filter((p) => p.status === filters.status);
      }
      if (filters.owner) {
        result = result.filter((p) => p.owner === filters.owner);
      }
    }

    return result;
  }

  getById(id: string): Proposal | null {
    const { proposals } = this.getStore();
    return proposals.find((p) => p.id === id) ?? null;
  }

  create(input: CreateProposalInput): Proposal {
    const { proposals, setProposals } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `proposal-${proposals.length + 1}`;
    const newProposal: Proposal = {
      id: nextId,
      prospectId: input.prospectId,
      auditId: input.auditId,
      title: input.title,
      status: 'draft',
      executiveSummary: input.executiveSummary ?? '',
      objectives: input.objectives ?? [],
      scope: input.scope ?? [],
      deliverables: input.deliverables ?? [],
      exclusions: input.exclusions ?? [],
      assumptions: input.assumptions ?? [],
      dependencies: input.dependencies ?? [],
      timeline: input.timeline ?? '',
      items: input.items ?? [],
      optionalServices: input.optionalServices ?? [],
      paymentSchedule: input.paymentSchedule ?? '',
      acceptanceCriteria: input.acceptanceCriteria ?? '',
      nextStep: input.nextStep ?? '',
      totalValue: 0,
      currency: input.currency ?? 'USD',
      owner: 'user-1',
      createdAt: now,
      updatedAt: now,
    };
    setProposals([...proposals, newProposal]);
    return newProposal;
  }

  update(id: string, input: UpdateProposalInput): Proposal | null {
    const { proposals, setProposals } = this.getStore();
    const index = proposals.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = {
      ...proposals[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newProposals = [...proposals];
    newProposals[index] = updated;
    setProposals(newProposals);
    return updated;
  }

  delete(id: string): boolean {
    const { proposals, setProposals } = this.getStore();
    const index = proposals.findIndex((p) => p.id === id);
    if (index === -1) return false;

    const newProposals = [...proposals];
    newProposals.splice(index, 1);
    setProposals(newProposals);
    return true;
  }

  updateStatus(id: string, status: ProposalStatus): Proposal | null {
    return this.update(id, { status });
  }
}
