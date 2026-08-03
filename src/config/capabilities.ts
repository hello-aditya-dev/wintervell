/**
 * WinterVell — Central Capability Registry
 *
 * Single source of truth for all product capabilities, readiness scores,
 * and status descriptions. Every claim about product readiness derives
 * from this file.
 *
 * DO NOT manipulate weights to inflate scores.
 * The registry must remain the honest source of truth.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CapabilityStatus =
  | 'production'
  | 'functional-preview'
  | 'interactive-demo'
  | 'frontend-preview'
  | 'planned'
  | 'unavailable';

export type CapabilityCategory =
  | 'demo'
  | 'crm'
  | 'call-centre'
  | 'audit'
  | 'reporting'
  | 'commercial'
  | 'infrastructure'
  | 'security';

export interface ProductCapability {
  id: string;
  name: string;
  category: CapabilityCategory;
  status: CapabilityStatus;
  description: string;
  evidenceRoutes: string[];
  weight: number;
  productionBlocker: boolean;
  backendDependency?: string;
  securityDependency?: string;
  nextPhase?: number | string;
}

export interface ReadinessDetail {
  score: number; // 0-100 percentage
  label: string;
  description: string;
  contributors: string[];
  blockers: string[];
  nextPhase: string;
}

export interface ReadinessScores {
  interactiveDemo: ReadinessDetail;
  frontendWorkflow: ReadinessDetail;
  basicCrmServer: ReadinessDetail;
  callCentreCrm: ReadinessDetail;
  auditProduct: ReadinessDetail;
  commercialSale: ReadinessDetail;
}

// ---------------------------------------------------------------------------
// Status contribution weights
// ---------------------------------------------------------------------------

/**
 * Maps each status to its contribution weight for readiness scoring.
 * These represent how much a capability at a given status contributes
 * toward production readiness.
 */
export const STATUS_WEIGHTS: Record<CapabilityStatus, number> = {
  production: 1,
  'functional-preview': 0.75,
  'interactive-demo': 0.45,
  'frontend-preview': 0.2,
  planned: 0,
  unavailable: 0,
} as const;

// ---------------------------------------------------------------------------
// Capability Registry — the single source of truth
// ---------------------------------------------------------------------------

const CAPABILITIES: ProductCapability[] = [
  // ── Demo category ──────────────────────────────────────────────────
  {
    id: 'demo-interactive',
    name: 'Interactive demo',
    category: 'demo',
    status: 'interactive-demo',
    description:
      'Full interactive frontend demonstration with simulated data and workflows',
    evidenceRoutes: ['/app'],
    weight: 10,
    productionBlocker: false,
  },
  {
    id: 'demo-data',
    name: 'Demo data',
    category: 'demo',
    status: 'interactive-demo',
    description:
      'Deterministic demo data seeded for consistent demonstration experience',
    evidenceRoutes: ['/app'],
    weight: 5,
    productionBlocker: false,
  },
  {
    id: 'demo-reset',
    name: 'Demo reset',
    category: 'demo',
    status: 'interactive-demo',
    description:
      'Ability to reset the demo environment to its initial state',
    evidenceRoutes: ['/app'],
    weight: 3,
    productionBlocker: false,
  },

  // ── CRM category ───────────────────────────────────────────────────
  {
    id: 'crm-prospect-management',
    name: 'Prospect management',
    category: 'crm',
    status: 'interactive-demo',
    description:
      'Create, view, edit, and delete prospects with full detail pages',
    evidenceRoutes: ['/app/prospects', '/app/prospects/new'],
    weight: 10,
    productionBlocker: false,
    backendDependency: 'PostgreSQL persistence',
    nextPhase: 2,
  },
  {
    id: 'crm-pipeline-tracking',
    name: 'Pipeline tracking',
    category: 'crm',
    status: 'interactive-demo',
    description:
      'Kanban-style pipeline board with drag-and-drop stage management',
    evidenceRoutes: ['/app/pipeline'],
    weight: 8,
    productionBlocker: false,
    backendDependency: 'PostgreSQL persistence',
    nextPhase: 2,
  },
  {
    id: 'crm-task-management',
    name: 'Task management',
    category: 'crm',
    status: 'interactive-demo',
    description: 'Task list with status tracking, assignments, and filtering',
    evidenceRoutes: ['/app/tasks'],
    weight: 6,
    productionBlocker: false,
    backendDependency: 'PostgreSQL persistence',
    nextPhase: 2,
  },
  {
    id: 'crm-contact-management',
    name: 'Contact management',
    category: 'crm',
    status: 'frontend-preview',
    description:
      'Contact details embedded within prospect records; standalone contact view not yet built',
    evidenceRoutes: ['/app/prospects'],
    weight: 7,
    productionBlocker: false,
    backendDependency: 'PostgreSQL persistence',
    nextPhase: 2,
  },

  // ── Audit category ─────────────────────────────────────────────────
  {
    id: 'audit-workflow',
    name: 'Audit workflow',
    category: 'audit',
    status: 'interactive-demo',
    description:
      'Create audits, review findings, and manage the audit lifecycle',
    evidenceRoutes: ['/app/audits', '/app/audits/new'],
    weight: 10,
    productionBlocker: false,
    backendDependency: 'Audit worker engine',
    nextPhase: 2,
  },
  {
    id: 'audit-finding-review',
    name: 'Finding review',
    category: 'audit',
    status: 'interactive-demo',
    description:
      'Review, edit, accept, reject, or mark findings as false positives',
    evidenceRoutes: ['/app/audits/audit-1'],
    weight: 9,
    productionBlocker: false,
    backendDependency: 'Audit worker engine',
    nextPhase: 2,
  },
  {
    id: 'audit-website-crawling',
    name: 'Website crawling',
    category: 'audit',
    status: 'planned',
    description:
      'Automated website crawl to collect technical, SEO, and accessibility evidence',
    evidenceRoutes: [],
    weight: 10,
    productionBlocker: true,
    backendDependency: 'Audit worker engine',
    nextPhase: 2,
  },
  {
    id: 'audit-rules-engine',
    name: 'Rules engine',
    category: 'audit',
    status: 'planned',
    description:
      'Configurable rules engine that evaluates crawled evidence against audit rules',
    evidenceRoutes: [],
    weight: 8,
    productionBlocker: true,
    backendDependency: 'Audit rules engine',
    nextPhase: 2,
  },

  // ── Reporting category ─────────────────────────────────────────────
  {
    id: 'reporting-report-builder',
    name: 'Report builder',
    category: 'reporting',
    status: 'interactive-demo',
    description:
      'Build, preview, and configure client-facing audit reports',
    evidenceRoutes: ['/app/reports/report-1'],
    weight: 8,
    productionBlocker: false,
    backendDependency: 'PDF rendering service',
    nextPhase: 2,
  },
  {
    id: 'reporting-pdf-export',
    name: 'PDF export',
    category: 'reporting',
    status: 'planned',
    description:
      'Server-side PDF rendering with selectable text for client delivery',
    evidenceRoutes: [],
    weight: 10,
    productionBlocker: true,
    backendDependency: 'PDF rendering service',
    nextPhase: 2,
  },
  {
    id: 'reporting-proposal-builder',
    name: 'Proposal builder',
    category: 'reporting',
    status: 'interactive-demo',
    description:
      'Create and edit commercial proposals linked to audit findings',
    evidenceRoutes: ['/app/proposals/proposal-1'],
    weight: 7,
    productionBlocker: false,
  },

  // ── Call-centre category ───────────────────────────────────────────
  {
    id: 'call-centre-dashboard',
    name: 'Call-centre dashboard',
    category: 'call-centre',
    status: 'frontend-preview',
    description:
      'Overview dashboard for call-centre operations with key metrics',
    evidenceRoutes: ['/app/call-centre'],
    weight: 8,
    productionBlocker: false,
    backendDependency: 'Telephony provider adapter',
    nextPhase: 3,
  },
  {
    id: 'call-centre-call-management',
    name: 'Call management',
    category: 'call-centre',
    status: 'frontend-preview',
    description:
      'View and manage inbound and outbound calls with status tracking',
    evidenceRoutes: ['/app/call-centre/calls'],
    weight: 9,
    productionBlocker: false,
    backendDependency: 'Telephony provider adapter',
    nextPhase: 3,
  },
  {
    id: 'call-centre-agent-presence',
    name: 'Agent presence',
    category: 'call-centre',
    status: 'frontend-preview',
    description:
      'Agent availability status, presence indicators, and session management',
    evidenceRoutes: ['/app/call-centre/agents'],
    weight: 7,
    productionBlocker: false,
    backendDependency: 'Agent session service',
    nextPhase: 3,
  },
  {
    id: 'call-centre-queue-routing',
    name: 'Queue routing',
    category: 'call-centre',
    status: 'planned',
    description:
      'Intelligent queue routing with skill-based and priority-based assignment',
    evidenceRoutes: [],
    weight: 8,
    productionBlocker: true,
    backendDependency: 'Queue routing engine',
    nextPhase: 3,
  },
  {
    id: 'call-centre-campaign-dialler',
    name: 'Campaign dialler',
    category: 'call-centre',
    status: 'planned',
    description:
      'Automated outbound dialling campaigns with compliance controls',
    evidenceRoutes: [],
    weight: 6,
    productionBlocker: true,
    backendDependency: 'Telephony provider adapter',
    nextPhase: 3,
  },
  {
    id: 'call-centre-supervisor-dashboard',
    name: 'Supervisor dashboard',
    category: 'call-centre',
    status: 'frontend-preview',
    description:
      'Real-time supervisor view of agent activity, queues, and call metrics',
    evidenceRoutes: ['/app/call-centre/supervisor'],
    weight: 7,
    productionBlocker: false,
    backendDependency: 'Agent presence service',
    nextPhase: 3,
  },
  {
    id: 'call-centre-call-recording',
    name: 'Call recording',
    category: 'call-centre',
    status: 'planned',
    description:
      'Call recording storage, playback, and access control with retention policies',
    evidenceRoutes: [],
    weight: 8,
    productionBlocker: true,
    backendDependency: 'Recording storage + Telephony integration',
    nextPhase: 3,
  },

  // ── Commercial category ────────────────────────────────────────────
  {
    id: 'commercial-service-catalogue',
    name: 'Service catalogue',
    category: 'commercial',
    status: 'interactive-demo',
    description:
      'Manage the catalogue of auditable services and pricing tiers',
    evidenceRoutes: ['/app/services'],
    weight: 5,
    productionBlocker: false,
  },
  {
    id: 'commercial-white-label',
    name: 'White-label branding',
    category: 'commercial',
    status: 'interactive-demo',
    description:
      'Configure brand identity, colours, logo, and domain for client-facing outputs',
    evidenceRoutes: ['/app/settings/branding'],
    weight: 4,
    productionBlocker: false,
  },
  {
    id: 'commercial-pricing-checkout',
    name: 'Pricing/checkout',
    category: 'commercial',
    status: 'planned',
    description:
      'Checkout flow with payment processing for licence purchases',
    evidenceRoutes: [],
    weight: 10,
    productionBlocker: true,
    backendDependency: 'Checkout provider integration',
    nextPhase: 2,
  },
  {
    id: 'commercial-licence-validation',
    name: 'Licence validation',
    category: 'commercial',
    status: 'planned',
    description:
      'Server-side licence validation and feature gating based on licence tier',
    evidenceRoutes: [],
    weight: 6,
    productionBlocker: true,
    backendDependency: 'Licence server',
    nextPhase: 2,
  },
  {
    id: 'commercial-source-delivery',
    name: 'Source delivery',
    category: 'commercial',
    status: 'planned',
    description:
      'Secure source code delivery mechanism for licence holders',
    evidenceRoutes: [],
    weight: 8,
    productionBlocker: true,
    nextPhase: 2,
  },

  // ── Infrastructure category ────────────────────────────────────────
  {
    id: 'infra-authentication',
    name: 'Authentication',
    category: 'infrastructure',
    status: 'planned',
    description:
      'User authentication with NextAuth.js v4, session management, and identity providers',
    evidenceRoutes: [],
    weight: 10,
    productionBlocker: true,
    backendDependency: 'NextAuth.js v4',
    nextPhase: 2,
  },
  {
    id: 'infra-database-persistence',
    name: 'Database persistence',
    category: 'infrastructure',
    status: 'planned',
    description:
      'PostgreSQL database with Prisma ORM for persistent data storage',
    evidenceRoutes: [],
    weight: 10,
    productionBlocker: true,
    backendDependency: 'PostgreSQL + Prisma',
    nextPhase: 2,
  },
  {
    id: 'infra-rbac',
    name: 'RBAC',
    category: 'infrastructure',
    status: 'planned',
    description:
      'Role-based access control with organisation-scoped permissions',
    evidenceRoutes: [],
    weight: 8,
    productionBlocker: true,
    backendDependency: 'Auth + organisations',
    nextPhase: 2,
  },
  {
    id: 'infra-api-layer',
    name: 'API layer',
    category: 'infrastructure',
    status: 'planned',
    description:
      'REST/GraphQL API layer for client-server communication and third-party integrations',
    evidenceRoutes: [],
    weight: 9,
    productionBlocker: true,
    nextPhase: 2,
  },
  {
    id: 'infra-email-integration',
    name: 'Email integration',
    category: 'infrastructure',
    status: 'planned',
    description:
      'Transactional and notification email delivery via email provider',
    evidenceRoutes: [],
    weight: 5,
    productionBlocker: false,
    backendDependency: 'Email provider',
    nextPhase: 2,
  },
  {
    id: 'infra-ai-integration',
    name: 'AI integration',
    category: 'infrastructure',
    status: 'planned',
    description:
      'AI provider abstraction layer supporting OpenAI-compatible and Anthropic APIs',
    evidenceRoutes: [],
    weight: 6,
    productionBlocker: false,
    backendDependency: 'AI provider adapter',
    nextPhase: 2,
  },

  // ── Security category ──────────────────────────────────────────────
  {
    id: 'security-webhook-verification',
    name: 'Webhook verification',
    category: 'security',
    status: 'planned',
    description:
      'Cryptographic verification of incoming webhook signatures',
    evidenceRoutes: [],
    weight: 7,
    productionBlocker: true,
    nextPhase: 2,
  },
  {
    id: 'security-audit-logging',
    name: 'Audit logging',
    category: 'security',
    status: 'planned',
    description:
      'Comprehensive audit trail logging for all data mutations and access events',
    evidenceRoutes: [],
    weight: 6,
    productionBlocker: true,
    nextPhase: 2,
  },
  {
    id: 'security-data-retention',
    name: 'Data retention',
    category: 'security',
    status: 'planned',
    description:
      'Data retention policies with automated deletion and export controls',
    evidenceRoutes: [],
    weight: 5,
    productionBlocker: true,
    nextPhase: 2,
  },
];

// ---------------------------------------------------------------------------
// Blocker lists
// ---------------------------------------------------------------------------

export const CALL_CENTRE_BLOCKERS = [
  'PostgreSQL persistence',
  'Authentication',
  'Organisations',
  'Roles and permissions',
  'Agent sessions',
  'Agent presence service',
  'Telephony-provider adapter',
  'Inbound call webhook',
  'Outbound call API',
  'Call-status webhooks',
  'Queue-routing engine',
  'Recording storage',
  'Recording access control',
  'Webhook-signature verification',
  'Idempotency',
  'Live supervisor events',
  'Notifications',
  'Backups',
  'Audit logs',
  'Retention and deletion controls',
] as const;

export const CRM_BLOCKERS = [
  'PostgreSQL persistence',
  'Authentication',
  'Organisations',
  'Roles and permissions',
  'API layer',
  'Email integration',
  'Data validation server-side',
] as const;

export const AUDIT_BLOCKERS = [
  'Audit worker engine',
  'Crawl orchestration',
  'Rules engine',
  'Evidence collection pipeline',
  'PostgreSQL persistence',
  'Authentication',
  'PDF rendering',
] as const;

// ---------------------------------------------------------------------------
// Readiness score calculation
// ---------------------------------------------------------------------------

/**
 * Calculates a weighted average readiness score (0-100) for a set of
 * capabilities using the universal STATUS_WEIGHTS.
 */
export function calculateReadinessScore(
  capabilities: ProductCapability[],
): number {
  if (capabilities.length === 0) return 0;

  let totalWeighted = 0;
  let totalWeight = 0;

  for (const cap of capabilities) {
    const contribution = STATUS_WEIGHTS[cap.status];
    totalWeighted += cap.weight * contribution;
    totalWeight += cap.weight;
  }

  if (totalWeight === 0) return 0;
  return (totalWeighted / totalWeight) * 100;
}

/**
 * Calculates readiness score using custom status weights for a specific
 * dimension. This allows dimensions like "interactive demo readiness" to
 * weight interactive-demo status more generously than the production-
 * oriented STATUS_WEIGHTS.
 */
function calculateDimensionScore(
  capabilities: ProductCapability[],
  weights: Record<CapabilityStatus, number>,
): number {
  if (capabilities.length === 0) return 0;

  let totalWeighted = 0;
  let totalWeight = 0;

  for (const cap of capabilities) {
    const contribution = weights[cap.status];
    totalWeighted += cap.weight * contribution;
    totalWeight += cap.weight;
  }

  if (totalWeight === 0) return 0;
  return (totalWeighted / totalWeight) * 100;
}

/**
 * Rounds a number to one decimal place.
 */
function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

// ---------------------------------------------------------------------------
// Dimension-specific capability selectors and weight overrides
// ---------------------------------------------------------------------------

/**
 * Dimension weights for the interactive demo readiness.
 * Interactive-demo IS the goal for this dimension, so it scores near 1.0.
 */
const DEMO_READINESS_WEIGHTS: Record<CapabilityStatus, number> = {
  production: 1,
  'functional-preview': 1,
  'interactive-demo': 0.95,
  'frontend-preview': 0.65,
  planned: 0,
  unavailable: 0,
};

/**
 * Dimension weights for the frontend workflow readiness.
 * Measures whether the UI flow exists and is navigable.
 * Interactive-demo means the workflow works in the demo; frontend-preview
 * means the UI exists but interactivity is limited; planned means no UI
 * yet but the design intent is known.
 */
const FRONTEND_WORKFLOW_WEIGHTS: Record<CapabilityStatus, number> = {
  production: 1,
  'functional-preview': 0.9,
  'interactive-demo': 0.9,
  'frontend-preview': 0.55,
  planned: 0.08,
  unavailable: 0,
};

/**
 * Selects capabilities relevant to the interactive demo dimension.
 * Includes only capabilities that are actively demonstrated
 * (interactive-demo or frontend-preview status).
 */
function getInteractiveDemoCapabilities(): ProductCapability[] {
  return CAPABILITIES.filter(
    (c) =>
      c.status === 'interactive-demo' || c.status === 'frontend-preview',
  );
}

/**
 * Selects capabilities relevant to the frontend workflow dimension.
 * Includes capabilities that form part of the end-to-end user workflow,
 * excluding:
 *  - Purely backend items (rules engine)
 *  - Commercial admin items (pricing, licence, source) — these are
 *    purchasing concerns, not user workflow steps
 *  - Infrastructure and security items
 */
function getFrontendWorkflowCapabilities(): ProductCapability[] {
  const excludedIds = new Set([
    'audit-rules-engine', // pure backend — no frontend component
    'commercial-pricing-checkout', // sales/admin, not user workflow
    'commercial-licence-validation', // sales/admin, not user workflow
    'commercial-source-delivery', // sales/admin, not user workflow
  ]);

  return CAPABILITIES.filter(
    (c) =>
      !excludedIds.has(c.id) &&
      (c.category === 'crm' ||
        c.category === 'audit' ||
        c.category === 'reporting' ||
        c.category === 'commercial' ||
        (c.category === 'demo' && c.id === 'demo-interactive')),
  );
}

/**
 * Selects capabilities relevant to the basic CRM server dimension.
 * CRM capabilities plus critical infrastructure dependencies.
 */
function getBasicCrmServerCapabilities(): ProductCapability[] {
  return CAPABILITIES.filter(
    (c) =>
      c.category === 'crm' ||
      c.id === 'infra-authentication' ||
      c.id === 'infra-database-persistence' ||
      c.id === 'infra-rbac' ||
      c.id === 'infra-api-layer' ||
      c.id === 'infra-email-integration',
  );
}

/**
 * Selects capabilities relevant to the call-centre CRM dimension.
 * Call-centre capabilities plus critical infrastructure dependencies.
 */
function getCallCentreCrmCapabilities(): ProductCapability[] {
  return CAPABILITIES.filter(
    (c) =>
      c.category === 'call-centre' ||
      c.id === 'infra-authentication' ||
      c.id === 'infra-database-persistence',
  );
}

/**
 * Selects capabilities relevant to the audit product dimension.
 * Audit capabilities plus critical infrastructure dependencies.
 */
function getAuditProductCapabilities(): ProductCapability[] {
  return CAPABILITIES.filter(
    (c) =>
      c.category === 'audit' ||
      c.id === 'infra-authentication' ||
      c.id === 'infra-database-persistence' ||
      c.id === 'infra-api-layer',
  );
}

/**
 * Selects capabilities relevant to the commercial sale dimension.
 * Commercial capabilities only — infrastructure readiness is captured
 * by the hard production caps rather than inflating the denominator
 * with zero-contribution planned infrastructure items.
 */
function getCommercialSaleCapabilities(): ProductCapability[] {
  return CAPABILITIES.filter((c) => c.category === 'commercial');
}

// ---------------------------------------------------------------------------
// Hard production caps
// ---------------------------------------------------------------------------

/**
 * Applies hard production caps to a raw score based on missing
 * infrastructure. Each cap is independent — the final score is the
 * minimum of the raw score and all applicable caps.
 */
function applyCaps(rawScore: number, caps: number[]): number {
  return Math.min(rawScore, ...caps);
}

// ---------------------------------------------------------------------------
// calculateAllReadinessScores
// ---------------------------------------------------------------------------

export function calculateAllReadinessScores(): ReadinessScores {
  // ── Interactive Demo ─────────────────────────────────────────────
  const demoCaps = getInteractiveDemoCapabilities();
  const demoScore = round1(calculateDimensionScore(demoCaps, DEMO_READINESS_WEIGHTS));

  // ── Frontend Workflow ────────────────────────────────────────────
  const fwCaps = getFrontendWorkflowCapabilities();
  const fwScore = round1(
    calculateDimensionScore(fwCaps, FRONTEND_WORKFLOW_WEIGHTS),
  );

  // ── Basic CRM Server ────────────────────────────────────────────
  const crmCaps = getBasicCrmServerCapabilities();
  const crmRaw = calculateReadinessScore(crmCaps);
  const crmScore = round1(
    applyCaps(crmRaw, [
      30, // Missing database persistence → cap at 30%
      30, // Missing authentication → cap at 30%
    ]),
  );

  // ── Call-centre CRM ─────────────────────────────────────────────
  const ccCaps = getCallCentreCrmCapabilities();
  const ccRaw = calculateReadinessScore(ccCaps);
  const ccScore = round1(
    applyCaps(ccRaw, [
      20, // Missing telephony → cap at 20%
      25, // Missing agent presence → cap at 25%
    ]),
  );

  // ── Audit Product ───────────────────────────────────────────────
  const auditCaps = getAuditProductCapabilities();
  const auditRaw = calculateReadinessScore(auditCaps);
  const auditScore = round1(
    applyCaps(auditRaw, [
      30, // Missing audit worker → cap at 30%
      35, // Missing rules+evidence engine → cap at 35%
    ]),
  );

  // ── Commercial Sale ─────────────────────────────────────────────
  const comCaps = getCommercialSaleCapabilities();
  const comRaw = calculateReadinessScore(comCaps);
  const comScore = round1(
    applyCaps(comRaw, [
      25, // Missing checkout+delivery → cap at 25%
      25, // Missing licence review → cap at 25%
    ]),
  );

  return {
    interactiveDemo: {
      score: demoScore,
      label: 'Demo readiness',
      description:
        'How complete is the interactive frontend demonstration for showcasing the product vision?',
      contributors: demoCaps
        .filter((c) => c.status === 'interactive-demo')
        .map((c) => c.name),
      blockers: demoCaps
        .filter((c) => c.status === 'frontend-preview')
        .map((c) => `${c.name} (frontend preview only)`),
      nextPhase: 'Complete demo polish and add missing interactive flows',
    },
    frontendWorkflow: {
      score: fwScore,
      label: 'Frontend workflow',
      description:
        'Can a user walk through the end-to-end workflow (prospect → audit → report → proposal) in the frontend?',
      contributors: fwCaps
        .filter(
          (c) =>
            c.status === 'interactive-demo' ||
            c.status === 'frontend-preview',
        )
        .map((c) => c.name),
      blockers: fwCaps
        .filter((c) => c.status === 'planned')
        .map((c) => c.name),
      nextPhase: 'Build website crawling UI and PDF export interface',
    },
    basicCrmServer: {
      score: crmScore,
      label: 'Basic CRM server',
      description:
        'Is the CRM module usable with real server-side persistence and authentication?',
      contributors: crmCaps
        .filter(
          (c) =>
            c.status === 'interactive-demo' ||
            c.status === 'frontend-preview',
        )
        .map((c) => c.name),
      blockers: [...CRM_BLOCKERS],
      nextPhase: 'Phase 2 — PostgreSQL persistence, authentication, and API layer',
    },
    callCentreCrm: {
      score: ccScore,
      label: 'Call-centre CRM',
      description:
        'Is the call-centre module operational with live telephony integration?',
      contributors: ccCaps
        .filter(
          (c) =>
            c.status === 'interactive-demo' ||
            c.status === 'frontend-preview',
        )
        .map((c) => c.name),
      blockers: [...CALL_CENTRE_BLOCKERS],
      nextPhase: 'Phase 3 — Telephony adapter, agent sessions, and queue routing',
    },
    auditProduct: {
      score: auditScore,
      label: 'Audit product',
      description:
        'Is the audit product fully operational with real crawling, rules evaluation, and evidence collection?',
      contributors: auditCaps
        .filter(
          (c) =>
            c.status === 'interactive-demo' ||
            c.status === 'frontend-preview',
        )
        .map((c) => c.name),
      blockers: [...AUDIT_BLOCKERS],
      nextPhase: 'Phase 2 — Audit worker engine, crawl orchestration, and rules engine',
    },
    commercialSale: {
      score: comScore,
      label: 'Commercial sale',
      description:
        'Is the commercial flow ready for sales with checkout, licensing, and source delivery?',
      contributors: comCaps
        .filter(
          (c) =>
            c.status === 'interactive-demo' ||
            c.status === 'frontend-preview',
        )
        .map((c) => c.name),
      blockers: [
        'Checkout provider integration',
        'Licence server',
        'Source code delivery mechanism',
        'PostgreSQL persistence',
        'Authentication',
        'Webhook-signature verification',
        'Audit logging',
        'Data retention controls',
      ],
      nextPhase: 'Phase 2 — Checkout integration, licence server, and source delivery',
    },
  };
}

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/** Returns the full capability registry. */
export function getAllCapabilities(): ProductCapability[] {
  return [...CAPABILITIES];
}

/** Returns capabilities filtered by category. */
export function getCapabilitiesByCategory(
  category: CapabilityCategory,
): ProductCapability[] {
  return CAPABILITIES.filter((c) => c.category === category);
}

/** Returns capabilities filtered by status. */
export function getCapabilitiesByStatus(
  status: CapabilityStatus,
): ProductCapability[] {
  return CAPABILITIES.filter((c) => c.status === status);
}

/** Returns all capabilities that are production blockers. */
export function getProductionBlockers(): ProductCapability[] {
  return CAPABILITIES.filter((c) => c.productionBlocker);
}

/** Returns a human-readable label for a capability status. */
export function getStatusLabel(status: CapabilityStatus): string {
  const labels: Record<CapabilityStatus, string> = {
    production: 'Production',
    'functional-preview': 'Functional Preview',
    'interactive-demo': 'Interactive Demo',
    'frontend-preview': 'Frontend Preview',
    planned: 'Planned',
    unavailable: 'Unavailable',
  };
  return labels[status];
}

/** Returns a detailed description of what a capability status means. */
export function getStatusDescription(status: CapabilityStatus): string {
  const descriptions: Record<CapabilityStatus, string> = {
    production:
      'Fully implemented, tested, and operating in production with real data and real users.',
    'functional-preview':
      'Implemented and functional with a live backend, but not yet production-hardened or fully tested.',
    'interactive-demo':
      'Works in the interactive frontend demonstration with simulated data. No real backend — state is client-side only and resets on reload.',
    'frontend-preview':
      'UI components and layout exist, but interactivity and/or data flow are limited. No backend integration.',
    planned:
      'Intended and designed, but implementation has not started. May appear in the product roadmap for a future phase.',
    unavailable:
      'Not currently planned or available for this product configuration.',
  };
  return descriptions[status];
}
