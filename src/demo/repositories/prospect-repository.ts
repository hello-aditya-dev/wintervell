import type { Prospect, CreateProspectInput, UpdateProspectInput, ProspectStage, Industry } from '../types/prospect';

export interface ProspectFilters {
  stage?: ProspectStage;
  industry?: Industry;
  assignedOwner?: string;
  search?: string;
  tags?: string[];
}

export interface ProspectRepository {
  list(filters?: ProspectFilters): Prospect[];
  getById(id: string): Prospect | null;
  create(input: CreateProspectInput): Prospect;
  update(id: string, input: UpdateProspectInput): Prospect | null;
  delete(id: string): boolean;
}

export class DemoProspectRepository implements ProspectRepository {
  private getStore: () => { prospects: Prospect[]; setProspects: (prospects: Prospect[]) => void };

  constructor(
    getStore: () => { prospects: Prospect[]; setProspects: (prospects: Prospect[]) => void }
  ) {
    this.getStore = getStore;
  }

  list(filters?: ProspectFilters): Prospect[] {
    const { prospects } = this.getStore();
    let result = [...prospects];

    if (filters) {
      if (filters.stage) {
        result = result.filter((p) => p.stage === filters.stage);
      }
      if (filters.industry) {
        result = result.filter((p) => p.industry === filters.industry);
      }
      if (filters.assignedOwner) {
        result = result.filter((p) => p.assignedOwner === filters.assignedOwner);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        result = result.filter(
          (p) =>
            p.company.toLowerCase().includes(search) ||
            p.contactName.toLowerCase().includes(search) ||
            p.email.toLowerCase().includes(search) ||
            p.website.toLowerCase().includes(search)
        );
      }
      if (filters.tags && filters.tags.length > 0) {
        result = result.filter((p) =>
          filters.tags!.some((tag) => p.tags.includes(tag))
        );
      }
    }

    return result;
  }

  getById(id: string): Prospect | null {
    const { prospects } = this.getStore();
    return prospects.find((p) => p.id === id) ?? null;
  }

  create(input: CreateProspectInput): Prospect {
    const { prospects, setProspects } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `prospect-${prospects.length + 1}`;
    const newProspect: Prospect = {
      id: nextId,
      contactName: input.contactName,
      company: input.company,
      website: input.website,
      email: input.email,
      phone: input.phone ?? '',
      industry: input.industry,
      companySize: input.companySize ?? '',
      leadSource: input.leadSource ?? '',
      servicesOfInterest: input.servicesOfInterest ?? [],
      estimatedBudget: input.estimatedBudget ?? null,
      currency: input.currency ?? 'USD',
      assignedOwner: input.assignedOwner ?? 'user-1',
      stage: 'new',
      estimatedValue: 0,
      tags: input.tags ?? [],
      notes: input.notes ?? '',
      nextAction: '',
      latestAuditId: null,
      opportunityId: null,
      createdAt: now,
      updatedAt: now,
    };
    setProspects([...prospects, newProspect]);
    return newProspect;
  }

  update(id: string, input: UpdateProspectInput): Prospect | null {
    const { prospects, setProspects } = this.getStore();
    const index = prospects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = {
      ...prospects[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newProspects = [...prospects];
    newProspects[index] = updated;
    setProspects(newProspects);
    return updated;
  }

  delete(id: string): boolean {
    const { prospects, setProspects } = this.getStore();
    const index = prospects.findIndex((p) => p.id === id);
    if (index === -1) return false;

    const newProspects = [...prospects];
    newProspects.splice(index, 1);
    setProspects(newProspects);
    return true;
  }
}
