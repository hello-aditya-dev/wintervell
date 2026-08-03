export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  prospectId: string | null;
  owner: string;
  status: TaskStatus;
  relatedAuditId: string | null;
  relatedProposalId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  dueDate: string;
  priority?: TaskPriority;
  prospectId?: string | null;
  owner?: string;
  status?: TaskStatus;
  relatedAuditId?: string | null;
  relatedProposalId?: string | null;
}

export interface UpdateTaskInput {
  title?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  owner?: string;
  relatedAuditId?: string | null;
  relatedProposalId?: string | null;
}
