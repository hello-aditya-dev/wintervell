import type { Opportunity, OpportunityStage, CreateOpportunityInput, UpdateOpportunityInput } from '../types/opportunity';
import type { Task, TaskStatus, TaskPriority } from '../types/task';

export interface PipelineFilters {
  stage?: OpportunityStage;
  owner?: string;
  minValue?: number;
  maxValue?: number;
}

export interface PipelineSummary {
  totalValue: number;
  totalOpportunities: number;
  byStage: Record<OpportunityStage, { count: number; value: number }>;
  averageDealSize: number;
  winRate: number;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  owner?: string;
  prospectId?: string;
}

export interface PipelineRepository {
  // Opportunities
  listOpportunities(filters?: PipelineFilters): Opportunity[];
  getOpportunityById(id: string): Opportunity | null;
  createOpportunity(input: CreateOpportunityInput): Opportunity;
  updateOpportunity(id: string, input: UpdateOpportunityInput): Opportunity | null;
  deleteOpportunity(id: string): boolean;
  getPipelineSummary(): PipelineSummary;

  // Tasks
  listTasks(filters?: TaskFilters): Task[];
  getTaskById(id: string): Task | null;
  createTask(input: { title: string; dueDate: string; priority?: TaskPriority; prospectId?: string | null; owner?: string; relatedAuditId?: string | null; relatedProposalId?: string | null }): Task;
  updateTask(id: string, input: { title?: string; dueDate?: string; priority?: TaskPriority; status?: TaskStatus; owner?: string; relatedAuditId?: string | null; relatedProposalId?: string | null }): Task | null;
  deleteTask(id: string): boolean;
}

export class DemoPipelineRepository implements PipelineRepository {
  private getStore: () => {
    opportunities: Opportunity[];
    tasks: Task[];
    setOpportunities: (opportunities: Opportunity[]) => void;
    setTasks: (tasks: Task[]) => void;
  };

  constructor(
    getStore: () => {
      opportunities: Opportunity[];
      tasks: Task[];
      setOpportunities: (opportunities: Opportunity[]) => void;
      setTasks: (tasks: Task[]) => void;
    }
  ) {
    this.getStore = getStore;
  }

  // Opportunities
  listOpportunities(filters?: PipelineFilters): Opportunity[] {
    const { opportunities } = this.getStore();
    let result = [...opportunities];

    if (filters) {
      if (filters.stage) {
        result = result.filter((o) => o.stage === filters.stage);
      }
      if (filters.owner) {
        result = result.filter((o) => o.owner === filters.owner);
      }
      if (filters.minValue !== undefined) {
        result = result.filter((o) => o.value >= filters.minValue!);
      }
      if (filters.maxValue !== undefined) {
        result = result.filter((o) => o.value <= filters.maxValue!);
      }
    }

    return result;
  }

  getOpportunityById(id: string): Opportunity | null {
    const { opportunities } = this.getStore();
    return opportunities.find((o) => o.id === id) ?? null;
  }

  createOpportunity(input: CreateOpportunityInput): Opportunity {
    const { opportunities, setOpportunities } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `opp-${opportunities.length + 1}`;
    const newOpportunity: Opportunity = {
      id: nextId,
      prospectId: input.prospectId,
      company: input.company,
      contact: input.contact,
      value: input.value ?? 0,
      currency: input.currency ?? 'USD',
      stage: input.stage ?? 'new_prospect',
      owner: input.owner ?? 'user-1',
      nextAction: input.nextAction ?? '',
      relatedAuditId: input.relatedAuditId ?? null,
      relatedProposalId: input.relatedProposalId ?? null,
      createdAt: now,
      updatedAt: now,
    };
    setOpportunities([...opportunities, newOpportunity]);
    return newOpportunity;
  }

  updateOpportunity(id: string, input: UpdateOpportunityInput): Opportunity | null {
    const { opportunities, setOpportunities } = this.getStore();
    const index = opportunities.findIndex((o) => o.id === id);
    if (index === -1) return null;

    const updated = {
      ...opportunities[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newOpportunities = [...opportunities];
    newOpportunities[index] = updated;
    setOpportunities(newOpportunities);
    return updated;
  }

  deleteOpportunity(id: string): boolean {
    const { opportunities, setOpportunities } = this.getStore();
    const index = opportunities.findIndex((o) => o.id === id);
    if (index === -1) return false;

    const newOpportunities = [...opportunities];
    newOpportunities.splice(index, 1);
    setOpportunities(newOpportunities);
    return true;
  }

  getPipelineSummary(): PipelineSummary {
    const { opportunities } = this.getStore();
    const allStages: OpportunityStage[] = [
      'new_prospect', 'audit_planned', 'audit_review', 'report_sent',
      'follow_up_due', 'proposal_sent', 'negotiation', 'won', 'lost',
    ];

    const byStage = {} as Record<OpportunityStage, { count: number; value: number }>;
    for (const stage of allStages) {
      const stageOpps = opportunities.filter((o) => o.stage === stage);
      byStage[stage] = {
        count: stageOpps.length,
        value: stageOpps.reduce((sum, o) => sum + o.value, 0),
      };
    }

    const totalValue = opportunities.reduce((sum, o) => sum + o.value, 0);
    const wonCount = opportunities.filter((o) => o.stage === 'won').length;
    const lostCount = opportunities.filter((o) => o.stage === 'lost').length;
    const closedTotal = wonCount + lostCount;
    const winRate = closedTotal > 0 ? (wonCount / closedTotal) * 100 : 0;

    return {
      totalValue,
      totalOpportunities: opportunities.length,
      byStage,
      averageDealSize: opportunities.length > 0 ? totalValue / opportunities.length : 0,
      winRate,
    };
  }

  // Tasks
  listTasks(filters?: TaskFilters): Task[] {
    const { tasks } = this.getStore();
    let result = [...tasks];

    if (filters) {
      if (filters.status) {
        result = result.filter((t) => t.status === filters.status);
      }
      if (filters.priority) {
        result = result.filter((t) => t.priority === filters.priority);
      }
      if (filters.owner) {
        result = result.filter((t) => t.owner === filters.owner);
      }
      if (filters.prospectId) {
        result = result.filter((t) => t.prospectId === filters.prospectId);
      }
    }

    return result;
  }

  getTaskById(id: string): Task | null {
    const { tasks } = this.getStore();
    return tasks.find((t) => t.id === id) ?? null;
  }

  createTask(input: { title: string; dueDate: string; priority?: TaskPriority; prospectId?: string | null; owner?: string; relatedAuditId?: string | null; relatedProposalId?: string | null }): Task {
    const { tasks, setTasks } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `task-${tasks.length + 1}`;
    const newTask: Task = {
      id: nextId,
      title: input.title,
      dueDate: input.dueDate,
      priority: input.priority ?? 'medium',
      prospectId: input.prospectId ?? null,
      owner: input.owner ?? 'user-1',
      status: 'pending',
      relatedAuditId: input.relatedAuditId ?? null,
      relatedProposalId: input.relatedProposalId ?? null,
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, newTask]);
    return newTask;
  }

  updateTask(id: string, input: { title?: string; dueDate?: string; priority?: TaskPriority; status?: TaskStatus; owner?: string; relatedAuditId?: string | null; relatedProposalId?: string | null }): Task | null {
    const { tasks, setTasks } = this.getStore();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updated = {
      ...tasks[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newTasks = [...tasks];
    newTasks[index] = updated;
    setTasks(newTasks);
    return updated;
  }

  deleteTask(id: string): boolean {
    const { tasks, setTasks } = this.getStore();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    return true;
  }
}
