import type { Report, CreateReportInput, UpdateReportInput, ReportStatus } from '../types/report';

export interface ReportFilters {
  auditId?: string;
  status?: ReportStatus;
  owner?: string;
}

export interface ReportRepository {
  list(filters?: ReportFilters): Report[];
  getById(id: string): Report | null;
  create(input: CreateReportInput): Report;
  update(id: string, input: UpdateReportInput): Report | null;
  delete(id: string): boolean;
  publish(id: string): Report | null;
}

export class DemoReportRepository implements ReportRepository {
  private getStore: () => {
    reports: Report[];
    setReports: (reports: Report[]) => void;
  };

  constructor(
    getStore: () => {
      reports: Report[];
      setReports: (reports: Report[]) => void;
    }
  ) {
    this.getStore = getStore;
  }

  list(filters?: ReportFilters): Report[] {
    const { reports } = this.getStore();
    let result = [...reports];

    if (filters) {
      if (filters.auditId) {
        result = result.filter((r) => r.auditId === filters.auditId);
      }
      if (filters.status) {
        result = result.filter((r) => r.status === filters.status);
      }
      if (filters.owner) {
        result = result.filter((r) => r.owner === filters.owner);
      }
    }

    return result;
  }

  getById(id: string): Report | null {
    const { reports } = this.getStore();
    return reports.find((r) => r.id === id) ?? null;
  }

  create(input: CreateReportInput): Report {
    const { reports, setReports } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `report-${reports.length + 1}`;
    const newReport: Report = {
      id: nextId,
      auditId: input.auditId,
      clientName: input.clientName,
      title: input.title,
      status: 'draft',
      brand: input.brand ?? 'WinterVell',
      sections: input.sections ?? [
        { section: 'cover', included: true, order: 1 },
        { section: 'executive_summary', included: true, order: 2 },
        { section: 'score_overview', included: true, order: 3 },
        { section: 'priority_findings', included: true, order: 4 },
        { section: 'quick_wins', included: true, order: 5 },
        { section: 'roadmap', included: true, order: 6 },
        { section: 'recommended_services', included: true, order: 7 },
        { section: 'next_step', included: true, order: 8 },
      ],
      selectedFindings: input.selectedFindings ?? [],
      firstSharedAt: null,
      lastViewedAt: null,
      viewCount: 0,
      owner: 'user-1',
      createdAt: now,
      updatedAt: now,
    };
    setReports([...reports, newReport]);
    return newReport;
  }

  update(id: string, input: UpdateReportInput): Report | null {
    const { reports, setReports } = this.getStore();
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updated = {
      ...reports[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newReports = [...reports];
    newReports[index] = updated;
    setReports(newReports);
    return updated;
  }

  delete(id: string): boolean {
    const { reports, setReports } = this.getStore();
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) return false;

    const newReports = [...reports];
    newReports.splice(index, 1);
    setReports(newReports);
    return true;
  }

  publish(id: string): Report | null {
    const { reports, setReports } = this.getStore();
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    const updated: Report = {
      ...reports[index],
      status: 'published_demo',
      firstSharedAt: reports[index].firstSharedAt ?? now,
      lastViewedAt: now,
      viewCount: reports[index].viewCount + 1,
      updatedAt: now,
    };
    const newReports = [...reports];
    newReports[index] = updated;
    setReports(newReports);
    return updated;
  }
}
