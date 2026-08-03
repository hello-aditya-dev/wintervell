import type {
  CallCentreAgent,
  UpdateAgentInput,
  AgentPresence,
} from '../types/call-centre';

export interface AgentFilters {
  status?: AgentPresence;
  team?: string;
  search?: string;
}

export interface AgentRepository {
  list(filters?: AgentFilters): CallCentreAgent[];
  getById(id: string): CallCentreAgent | null;
  update(id: string, input: UpdateAgentInput): CallCentreAgent | null;
  updatePresence(id: string, status: AgentPresence): CallCentreAgent | null;
}

export class DemoAgentRepository implements AgentRepository {
  private getStore: () => { agents: CallCentreAgent[]; setAgents: (agents: CallCentreAgent[]) => void };

  constructor(
    getStore: () => { agents: CallCentreAgent[]; setAgents: (agents: CallCentreAgent[]) => void }
  ) {
    this.getStore = getStore;
  }

  list(filters?: AgentFilters): CallCentreAgent[] {
    const { agents } = this.getStore();
    let result = [...agents];

    if (filters) {
      if (filters.status) {
        result = result.filter((a) => a.status === filters.status);
      }
      if (filters.team) {
        result = result.filter((a) => a.team === filters.team);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        result = result.filter(
          (a) =>
            a.name.toLowerCase().includes(search) ||
            a.email.toLowerCase().includes(search) ||
            a.team.toLowerCase().includes(search)
        );
      }
    }

    return result;
  }

  getById(id: string): CallCentreAgent | null {
    const { agents } = this.getStore();
    return agents.find((a) => a.id === id) ?? null;
  }

  update(id: string, input: UpdateAgentInput): CallCentreAgent | null {
    const { agents, setAgents } = this.getStore();
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updated = {
      ...agents[index],
      ...input,
    };
    const newAgents = [...agents];
    newAgents[index] = updated;
    setAgents(newAgents);
    return updated;
  }

  updatePresence(id: string, status: AgentPresence): CallCentreAgent | null {
    const { agents, setAgents } = this.getStore();
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updated: CallCentreAgent = {
      ...agents[index],
      status,
    };
    const newAgents = [...agents];
    newAgents[index] = updated;
    setAgents(newAgents);
    return updated;
  }
}
