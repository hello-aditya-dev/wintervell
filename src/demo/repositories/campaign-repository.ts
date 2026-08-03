import type { DemoCampaign } from '../types/call-centre';

export interface CampaignRepository {
  list(): DemoCampaign[];
  getById(id: string): DemoCampaign | null;
}

export class DemoCampaignRepository implements CampaignRepository {
  private getStore: () => { campaigns: DemoCampaign[]; setCampaigns: (campaigns: DemoCampaign[]) => void };

  constructor(
    getStore: () => { campaigns: DemoCampaign[]; setCampaigns: (campaigns: DemoCampaign[]) => void }
  ) {
    this.getStore = getStore;
  }

  list(): DemoCampaign[] {
    const { campaigns } = this.getStore();
    return [...campaigns];
  }

  getById(id: string): DemoCampaign | null {
    const { campaigns } = this.getStore();
    return campaigns.find((c) => c.id === id) ?? null;
  }
}
