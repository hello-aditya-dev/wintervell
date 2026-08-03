// ── Types ────────────────────────────────────────────────────────────────
export type {
  ProspectStage,
  Industry,
  Prospect,
  CreateProspectInput,
  UpdateProspectInput,
} from './types/prospect';

export type {
  AuditStatus,
  AuditMode,
  AuditCategory,
  CategoryScore,
  Audit,
  CreateAuditInput,
  UpdateAuditInput,
} from './types/audit';

export type {
  FindingSeverity,
  FindingStatus,
  Finding,
  UpdateFindingInput,
} from './types/finding';

export type {
  ReportStatus,
  ReportSection,
  ReportSectionConfig,
  Report,
  CreateReportInput,
  UpdateReportInput,
} from './types/report';

export type {
  ProposalStatus,
  ProposalItem,
  Proposal,
  CreateProposalInput,
  UpdateProposalInput,
} from './types/proposal';

export type {
  OpportunityStage,
  Opportunity,
  CreateOpportunityInput,
  UpdateOpportunityInput,
} from './types/opportunity';

export type {
  TaskPriority,
  TaskStatus,
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from './types/task';

export type {
  ServiceStatus,
  PricingModel,
  Service,
  CreateServiceInput,
  UpdateServiceInput,
} from './types/service';

// ── User type (from fixtures) ────────────────────────────────────────────
export type { DemoUser } from './fixtures/users';

// ── Repository interfaces ────────────────────────────────────────────────
export type {
  ProspectFilters,
  ProspectRepository,
} from './repositories/prospect-repository';

export type {
  AuditFilters,
  AuditDetail,
  AuditRepository,
} from './repositories/audit-repository';

export type {
  ReportFilters,
  ReportRepository,
} from './repositories/report-repository';

export type {
  ProposalFilters,
  ProposalRepository,
} from './repositories/proposal-repository';

export type {
  PipelineFilters,
  PipelineSummary,
  TaskFilters as PipelineTaskFilters,
  PipelineRepository,
} from './repositories/pipeline-repository';

// ── Repository implementations ───────────────────────────────────────────
export {
  DemoProspectRepository,
} from './repositories/prospect-repository';

export {
  DemoAuditRepository,
} from './repositories/audit-repository';

export {
  DemoReportRepository,
} from './repositories/report-repository';

export {
  DemoProposalRepository,
} from './repositories/proposal-repository';

export {
  DemoPipelineRepository,
} from './repositories/pipeline-repository';

// ── Store ────────────────────────────────────────────────────────────────
export {
  useDemoStore,
  getStoreSnapshot,
} from './state/demo-store';

export type { DemoState } from './state/demo-store';

// ── Fixtures (for direct access when needed) ────────────────────────────
export { default as prospectFixtures } from './fixtures/prospects';
export { default as auditFixtures } from './fixtures/audits';
export { default as findingFixtures } from './fixtures/findings';
export { default as reportFixtures } from './fixtures/reports';
export { default as proposalFixtures } from './fixtures/proposals';
export { default as opportunityFixtures } from './fixtures/opportunities';
export { default as taskFixtures } from './fixtures/tasks';
export { default as serviceFixtures } from './fixtures/services';
export { default as userFixtures } from './fixtures/users';
export { default as agentFixtures } from './fixtures/agents';
export { default as callFixtures } from './fixtures/calls';
export { default as queueFixtures } from './fixtures/queues';
export { default as campaignFixtures } from './fixtures/campaigns';

// ── Call-centre types ────────────────────────────────────────────────────
export type {
  AgentPresence,
  CallDirection,
  DemoCallStatus,
  CallDisposition,
  CallCentreAgent,
  DemoCall,
  DemoQueue,
  DemoCampaign,
  CreateCallInput,
  UpdateCallInput,
  UpdateAgentInput,
} from './types/call-centre';

// ── Call-centre repository interfaces ────────────────────────────────────
export type {
  CallFilters,
  CallRepository,
} from './repositories/call-repository';

export type {
  AgentFilters,
  AgentRepository,
} from './repositories/agent-repository';

export type {
  QueueRepository,
} from './repositories/queue-repository';

export type {
  CampaignRepository,
} from './repositories/campaign-repository';

// ── Call-centre repository implementations ───────────────────────────────
export {
  DemoCallRepository,
} from './repositories/call-repository';

export {
  DemoAgentRepository,
} from './repositories/agent-repository';

export {
  DemoQueueRepository,
} from './repositories/queue-repository';

export {
  DemoCampaignRepository,
} from './repositories/campaign-repository';
