import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Prospect } from '../types/prospect';
import type { Audit } from '../types/audit';
import type { Finding } from '../types/finding';
import type { Report } from '../types/report';
import type { Proposal } from '../types/proposal';
import type { Opportunity } from '../types/opportunity';
import type { Task } from '../types/task';
import type { Service } from '../types/service';
import type { DemoUser } from '../fixtures/users';
import type { CallCentreAgent } from '../types/call-centre';
import type { DemoCall } from '../types/call-centre';
import type { DemoQueue } from '../types/call-centre';
import type { DemoCampaign } from '../types/call-centre';

import defaultProspects from '../fixtures/prospects';
import defaultAudits from '../fixtures/audits';
import defaultFindings from '../fixtures/findings';
import defaultReports from '../fixtures/reports';
import defaultProposals from '../fixtures/proposals';
import defaultOpportunities from '../fixtures/opportunities';
import defaultTasks from '../fixtures/tasks';
import defaultServices from '../fixtures/services';
import defaultUsers from '../fixtures/users';
import defaultAgents from '../fixtures/agents';
import defaultCalls from '../fixtures/calls';
import defaultQueues from '../fixtures/queues';
import defaultCampaigns from '../fixtures/campaigns';

// ── Demo scenario ─────────────────────────────────────────────────────────
export type DemoScenario = 'agency-audit' | 'sales-crm' | 'call-centre-crm';

// ── State shape ──────────────────────────────────────────────────────────
export interface DemoState {
  // Flag
  demoMode: boolean;

  // Entities
  prospects: Prospect[];
  audits: Audit[];
  findings: Finding[];
  reports: Report[];
  proposals: Proposal[];
  opportunities: Opportunity[];
  tasks: Task[];
  services: Service[];
  users: DemoUser[];

  // Call-centre entities
  agents: CallCentreAgent[];
  calls: DemoCall[];
  queues: DemoQueue[];
  campaigns: DemoCampaign[];

  // Demo scenario
  scenario: DemoScenario;

  // Setters (used by repositories)
  setProspects: (prospects: Prospect[]) => void;
  setAudits: (audits: Audit[]) => void;
  setFindings: (findings: Finding[]) => void;
  setReports: (reports: Report[]) => void;
  setProposals: (proposals: Proposal[]) => void;
  setOpportunities: (opportunities: Opportunity[]) => void;
  setTasks: (tasks: Task[]) => void;
  setServices: (services: Service[]) => void;
  setAgents: (agents: CallCentreAgent[]) => void;
  setCalls: (calls: DemoCall[]) => void;
  setQueues: (queues: DemoQueue[]) => void;
  setCampaigns: (campaigns: DemoCampaign[]) => void;
  setScenario: (scenario: DemoScenario) => void;

  // Actions
  resetDemoData: () => void;
}

// ── Default data factory ─────────────────────────────────────────────────
function getDefaultData() {
  return {
    prospects: structuredClone(defaultProspects),
    audits: structuredClone(defaultAudits),
    findings: structuredClone(defaultFindings),
    reports: structuredClone(defaultReports),
    proposals: structuredClone(defaultProposals),
    opportunities: structuredClone(defaultOpportunities),
    tasks: structuredClone(defaultTasks),
    services: structuredClone(defaultServices),
    users: structuredClone(defaultUsers),
    agents: structuredClone(defaultAgents),
    calls: structuredClone(defaultCalls),
    queues: structuredClone(defaultQueues),
    campaigns: structuredClone(defaultCampaigns),
  };
}

// ── Store ────────────────────────────────────────────────────────────────
export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      // Flag
      demoMode: true,

      // Demo scenario
      scenario: 'agency-audit' as DemoScenario,

      // Entities - initialized from defaults
      ...getDefaultData(),

      // Setters
      setProspects: (prospects) => set({ prospects }),
      setAudits: (audits) => set({ audits }),
      setFindings: (findings) => set({ findings }),
      setReports: (reports) => set({ reports }),
      setProposals: (proposals) => set({ proposals }),
      setOpportunities: (opportunities) => set({ opportunities }),
      setTasks: (tasks) => set({ tasks }),
      setServices: (services) => set({ services }),
      setAgents: (agents) => set({ agents }),
      setCalls: (calls) => set({ calls }),
      setQueues: (queues) => set({ queues }),
      setCampaigns: (campaigns) => set({ campaigns }),
      setScenario: (scenario) => set({ scenario }),

      // Reset
      resetDemoData: () =>
        set({
          demoMode: true,
          scenario: 'agency-audit',
          ...getDefaultData(),
        }),
    }),
    {
      name: 'wintervell-demo-storage',
      // Only persist entity data, not setters or actions
      partialize: (state) => ({
        demoMode: state.demoMode,
        scenario: state.scenario,
        prospects: state.prospects,
        audits: state.audits,
        findings: state.findings,
        reports: state.reports,
        proposals: state.proposals,
        opportunities: state.opportunities,
        tasks: state.tasks,
        services: state.services,
        users: state.users,
        agents: state.agents,
        calls: state.calls,
        queues: state.queues,
        campaigns: state.campaigns,
      }),
    }
  )
);

// ── Store accessor for repositories ──────────────────────────────────────
// Repositories need access to the store's state and setters, but they
// shouldn't import the React hook directly. This helper provides a
// snapshot of the current state + setters for repository use.
export function getStoreSnapshot(): {
  prospects: Prospect[];
  audits: Audit[];
  findings: Finding[];
  reports: Report[];
  proposals: Proposal[];
  opportunities: Opportunity[];
  tasks: Task[];
  services: Service[];
  users: DemoUser[];
  agents: CallCentreAgent[];
  calls: DemoCall[];
  queues: DemoQueue[];
  campaigns: DemoCampaign[];
  setProspects: (prospects: Prospect[]) => void;
  setAudits: (audits: Audit[]) => void;
  setFindings: (findings: Finding[]) => void;
  setReports: (reports: Report[]) => void;
  setProposals: (proposals: Proposal[]) => void;
  setOpportunities: (opportunities: Opportunity[]) => void;
  setTasks: (tasks: Task[]) => void;
  setServices: (services: Service[]) => void;
  setAgents: (agents: CallCentreAgent[]) => void;
  setCalls: (calls: DemoCall[]) => void;
  setQueues: (queues: DemoQueue[]) => void;
  setCampaigns: (campaigns: DemoCampaign[]) => void;
} {
  return useDemoStore.getState();
}
