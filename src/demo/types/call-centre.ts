export type AgentPresence =
  | 'available-demo'
  | 'busy-demo'
  | 'wrap-up-demo'
  | 'break-demo'
  | 'offline-demo';

export type CallDirection = 'inbound' | 'outbound';

export type DemoCallStatus =
  | 'waiting-demo'
  | 'ringing-demo'
  | 'connected-demo'
  | 'completed-demo'
  | 'missed-demo'
  | 'follow-up-demo';

export type CallDisposition =
  | 'qualified'
  | 'not-interested'
  | 'callback-requested'
  | 'no-answer'
  | 'wrong-number'
  | 'resolved'
  | 'escalated';

export interface CallCentreAgent {
  id: string;
  name: string;
  role: string;
  team: string;
  status: AgentPresence;
  currentCallId: string | null;
  callsToday: number;
  talkTimeMinutes: number;
  wrapUpTimeMinutes: number;
  followUpsDue: number;
  email: string;
  avatar: string; // initials
}

export interface DemoCall {
  id: string;
  contactName: string;
  company: string;
  phone: string; // fictional pattern like +1-555-0201
  direction: CallDirection;
  queueId: string;
  queueName: string;
  assignedAgentId: string | null;
  assignedAgentName: string | null;
  startedAt: string;
  answeredAt: string | null;
  durationSeconds: number;
  disposition: CallDisposition | null;
  status: DemoCallStatus;
  followUpTaskId: string | null;
  notes: string[];
  prospectId: string | null;
  opportunityId: string | null;
}

export interface DemoQueue {
  id: string;
  name: string;
  callsWaiting: number;
  longestWaitSeconds: number;
  availableAgents: number;
  serviceLevelTarget: number; // percentage
  currentServiceLevel: number; // percentage
  status: 'active-demo' | 'paused-demo' | 'offline-demo';
}

export interface DemoCampaign {
  id: string;
  name: string;
  contactCount: number;
  attempted: number;
  connectedDemo: number;
  followUp: number;
  completed: number;
  assignedTeam: string;
  status: 'active-demo' | 'paused-demo' | 'completed-demo' | 'planned';
}

// Create/Update input types
export interface CreateCallInput {
  contactName: string;
  company: string;
  phone: string;
  direction: CallDirection;
  queueId: string;
}

export interface UpdateCallInput {
  assignedAgentId?: string | null;
  assignedAgentName?: string | null;
  disposition?: CallDisposition | null;
  status?: DemoCallStatus;
  notes?: string[];
  followUpTaskId?: string | null;
  prospectId?: string | null;
}

export interface UpdateAgentInput {
  status?: AgentPresence;
  currentCallId?: string | null;
  callsToday?: number;
  talkTimeMinutes?: number;
  wrapUpTimeMinutes?: number;
  followUpsDue?: number;
}
