import type {
  DemoCall,
  CreateCallInput,
  UpdateCallInput,
  DemoCallStatus,
  CallDirection,
} from '../types/call-centre';

export interface CallFilters {
  status?: DemoCallStatus;
  direction?: CallDirection;
  queueId?: string;
  assignedAgentId?: string;
  search?: string;
}

export interface CallRepository {
  list(filters?: CallFilters): DemoCall[];
  getById(id: string): DemoCall | null;
  create(input: CreateCallInput): DemoCall;
  update(id: string, input: UpdateCallInput): DemoCall | null;
  assignToAgent(callId: string, agentId: string, agentName: string): DemoCall | null;
  addNote(callId: string, note: string): DemoCall | null;
}

export class DemoCallRepository implements CallRepository {
  private getStore: () => { calls: DemoCall[]; setCalls: (calls: DemoCall[]) => void };

  constructor(
    getStore: () => { calls: DemoCall[]; setCalls: (calls: DemoCall[]) => void }
  ) {
    this.getStore = getStore;
  }

  list(filters?: CallFilters): DemoCall[] {
    const { calls } = this.getStore();
    let result = [...calls];

    if (filters) {
      if (filters.status) {
        result = result.filter((c) => c.status === filters.status);
      }
      if (filters.direction) {
        result = result.filter((c) => c.direction === filters.direction);
      }
      if (filters.queueId) {
        result = result.filter((c) => c.queueId === filters.queueId);
      }
      if (filters.assignedAgentId) {
        result = result.filter((c) => c.assignedAgentId === filters.assignedAgentId);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        result = result.filter(
          (c) =>
            c.contactName.toLowerCase().includes(search) ||
            c.company.toLowerCase().includes(search) ||
            c.phone.toLowerCase().includes(search)
        );
      }
    }

    return result;
  }

  getById(id: string): DemoCall | null {
    const { calls } = this.getStore();
    return calls.find((c) => c.id === id) ?? null;
  }

  create(input: CreateCallInput): DemoCall {
    const { calls, setCalls } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `call-${calls.length + 1}`;

    // Look up queue name from existing calls or use the queueId
    const existingQueueCall = calls.find((c) => c.queueId === input.queueId);
    const queueName = existingQueueCall?.queueName ?? input.queueId;

    const newCall: DemoCall = {
      id: nextId,
      contactName: input.contactName,
      company: input.company,
      phone: input.phone,
      direction: input.direction,
      queueId: input.queueId,
      queueName,
      assignedAgentId: null,
      assignedAgentName: null,
      startedAt: now,
      answeredAt: null,
      durationSeconds: 0,
      disposition: null,
      status: 'waiting-demo',
      followUpTaskId: null,
      notes: [],
      prospectId: null,
      opportunityId: null,
    };
    setCalls([...calls, newCall]);
    return newCall;
  }

  update(id: string, input: UpdateCallInput): DemoCall | null {
    const { calls, setCalls } = this.getStore();
    const index = calls.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updated = {
      ...calls[index],
      ...input,
    };
    const newCalls = [...calls];
    newCalls[index] = updated;
    setCalls(newCalls);
    return updated;
  }

  assignToAgent(callId: string, agentId: string, agentName: string): DemoCall | null {
    const { calls, setCalls } = this.getStore();
    const index = calls.findIndex((c) => c.id === callId);
    if (index === -1) return null;

    const updated: DemoCall = {
      ...calls[index],
      assignedAgentId: agentId,
      assignedAgentName: agentName,
      status: 'connected-demo',
      answeredAt: calls[index].answeredAt ?? new Date().toISOString(),
    };
    const newCalls = [...calls];
    newCalls[index] = updated;
    setCalls(newCalls);
    return updated;
  }

  addNote(callId: string, note: string): DemoCall | null {
    const { calls, setCalls } = this.getStore();
    const index = calls.findIndex((c) => c.id === callId);
    if (index === -1) return null;

    const updated: DemoCall = {
      ...calls[index],
      notes: [...calls[index].notes, note],
    };
    const newCalls = [...calls];
    newCalls[index] = updated;
    setCalls(newCalls);
    return updated;
  }
}
