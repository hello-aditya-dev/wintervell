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

import defaultProspects from '../fixtures/prospects';
import defaultAudits from '../fixtures/audits';
import defaultFindings from '../fixtures/findings';
import defaultReports from '../fixtures/reports';
import defaultProposals from '../fixtures/proposals';
import defaultOpportunities from '../fixtures/opportunities';
import defaultTasks from '../fixtures/tasks';
import defaultServices from '../fixtures/services';
import defaultUsers from '../fixtures/users';

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

  // Setters (used by repositories)
  setProspects: (prospects: Prospect[]) => void;
  setAudits: (audits: Audit[]) => void;
  setFindings: (findings: Finding[]) => void;
  setReports: (reports: Report[]) => void;
  setProposals: (proposals: Proposal[]) => void;
  setOpportunities: (opportunities: Opportunity[]) => void;
  setTasks: (tasks: Task[]) => void;
  setServices: (services: Service[]) => void;

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
  };
}

// ── Store ────────────────────────────────────────────────────────────────
export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      // Flag
      demoMode: true,

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

      // Reset
      resetDemoData: () =>
        set({
          demoMode: true,
          ...getDefaultData(),
        }),
    }),
    {
      name: 'wintervell-demo-storage',
      // Only persist entity data, not setters or actions
      partialize: (state) => ({
        demoMode: state.demoMode,
        prospects: state.prospects,
        audits: state.audits,
        findings: state.findings,
        reports: state.reports,
        proposals: state.proposals,
        opportunities: state.opportunities,
        tasks: state.tasks,
        services: state.services,
        users: state.users,
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
  setProspects: (prospects: Prospect[]) => void;
  setAudits: (audits: Audit[]) => void;
  setFindings: (findings: Finding[]) => void;
  setReports: (reports: Report[]) => void;
  setProposals: (proposals: Proposal[]) => void;
  setOpportunities: (opportunities: Opportunity[]) => void;
  setTasks: (tasks: Task[]) => void;
  setServices: (services: Service[]) => void;
} {
  return useDemoStore.getState();
}
