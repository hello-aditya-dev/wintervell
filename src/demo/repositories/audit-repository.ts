import type { Audit, CreateAuditInput, UpdateAuditInput, AuditStatus, AuditCategory } from '../types/audit';
import type { Finding, UpdateFindingInput } from '../types/finding';

export interface AuditFilters {
  prospectId?: string;
  status?: AuditStatus;
  mode?: Audit['mode'];
  categories?: AuditCategory[];
  owner?: string;
}

export interface AuditDetail {
  audit: Audit;
  findings: Finding[];
}

export interface AuditRepository {
  list(filters?: AuditFilters): Audit[];
  getById(id: string): Audit | null;
  getDetail(id: string): AuditDetail | null;
  create(input: CreateAuditInput): Audit;
  update(id: string, input: UpdateAuditInput): Audit | null;
  delete(id: string): boolean;
  updateFinding(auditId: string, findingId: string, input: UpdateFindingInput): Finding | null;
  listFindings(auditId: string): Finding[];
}

export class DemoAuditRepository implements AuditRepository {
  private getStore: () => {
    audits: Audit[];
    findings: Finding[];
    setAudits: (audits: Audit[]) => void;
    setFindings: (findings: Finding[]) => void;
  };

  constructor(
    getStore: () => {
      audits: Audit[];
      findings: Finding[];
      setAudits: (audits: Audit[]) => void;
      setFindings: (findings: Finding[]) => void;
    }
  ) {
    this.getStore = getStore;
  }

  list(filters?: AuditFilters): Audit[] {
    const { audits } = this.getStore();
    let result = [...audits];

    if (filters) {
      if (filters.prospectId) {
        result = result.filter((a) => a.prospectId === filters.prospectId);
      }
      if (filters.status) {
        result = result.filter((a) => a.status === filters.status);
      }
      if (filters.mode) {
        result = result.filter((a) => a.mode === filters.mode);
      }
      if (filters.categories && filters.categories.length > 0) {
        result = result.filter((a) =>
          filters.categories!.some((c) => a.categories.includes(c))
        );
      }
      if (filters.owner) {
        result = result.filter((a) => a.owner === filters.owner);
      }
    }

    return result;
  }

  getById(id: string): Audit | null {
    const { audits } = this.getStore();
    return audits.find((a) => a.id === id) ?? null;
  }

  getDetail(id: string): AuditDetail | null {
    const audit = this.getById(id);
    if (!audit) return null;

    const findings = this.listFindings(id);
    return { audit, findings };
  }

  create(input: CreateAuditInput): Audit {
    const { audits, setAudits } = this.getStore();
    const now = new Date().toISOString();
    const nextId = `audit-${audits.length + 1}`;
    const newAudit: Audit = {
      id: nextId,
      prospectId: input.prospectId,
      website: '',
      title: '',
      status: 'draft',
      mode: input.mode,
      categories: input.categories,
      overallScore: 0,
      categoryScores: input.categories.map((c) => ({
        category: c,
        score: 0,
        findingCount: 0,
        label: c,
      })),
      priorityFindingCount: 0,
      reviewCompletion: 0,
      suggestedServices: [],
      owner: 'user-1',
      createdAt: now,
      updatedAt: now,
    };
    setAudits([...audits, newAudit]);
    return newAudit;
  }

  update(id: string, input: UpdateAuditInput): Audit | null {
    const { audits, setAudits } = this.getStore();
    const index = audits.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updated = {
      ...audits[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newAudits = [...audits];
    newAudits[index] = updated;
    setAudits(newAudits);
    return updated;
  }

  delete(id: string): boolean {
    const { audits, setAudits, findings, setFindings } = this.getStore();
    const index = audits.findIndex((a) => a.id === id);
    if (index === -1) return false;

    const newAudits = [...audits];
    newAudits.splice(index, 1);
    setAudits(newAudits);

    // Also remove associated findings
    const newFindings = findings.filter((f) => f.auditId !== id);
    setFindings(newFindings);

    return true;
  }

  listFindings(auditId: string): Finding[] {
    const { findings } = this.getStore();
    return findings.filter((f) => f.auditId === auditId);
  }

  updateFinding(auditId: string, findingId: string, input: UpdateFindingInput): Finding | null {
    const { findings, setFindings } = this.getStore();
    const index = findings.findIndex((f) => f.id === findingId && f.auditId === auditId);
    if (index === -1) return null;

    const updated = {
      ...findings[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    const newFindings = [...findings];
    newFindings[index] = updated;
    setFindings(newFindings);
    return updated;
  }
}
