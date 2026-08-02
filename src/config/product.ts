/**
 * WinterVell — Central Product Configuration
 *
 * This is the single source of truth for WinterVell product identity, branding,
 * navigation, roles, pipeline stages, audit categories, and scoring weights.
 *
 * All product references across the application should read from this module
 * (or from the typed constants it exports) rather than hard-coding strings.
 *
 * WinterVell is proprietary commercial software governed by the WinterVell
 * Commercial Source License (WV-CSL) v1.0. See /LICENSE.
 */

export const product = {
  name: "WinterVell",
  shortName: "WinterVell",
  descriptor: "AI Website Audit and Agency Sales Platform",
  tagline: "Turn any website into a professional audit, proposal, and sales opportunity.",
  legalName: "WinterVell",
  copyrightHolder: "WinterVell",
  copyrightYear: 2026,
  license: "WinterVell Commercial Source License (WV-CSL) v1.0",
  licenseFile: "/LICENSE",
  repository: "witejackel-eng/wintervell",
  version: "0.1.0",
  status: "foundation" as const,

  // Provenance — keep in sync with docs/legal/PROVENANCE.md
  provenance: {
    sourceRepository: "witejackel-eng/cloudsun",
    sourceCommitSha: "e3879a4c232680e59e0937828b69d969e3b65b69",
    sourceCommitDate: "2026-07-31",
    snapshotTaken: "2026-08-02",
    relationship: "authorized internal derivative (read-only source)",
  },

  // Default contact placeholders — operator MUST replace before publication.
  contact: {
    supportEmail: "support@wintervell.example",
    securityEmail: "security@wintervell.example",
    salesEmail: "sales@wintervell.example",
    legalEmail: "legal@wintervell.example",
    website: "https://wintervell.example",
  },

  // Brand direction — "precise, analytical, calm, premium, credible, technical".
  brand: {
    qualities: ["precise", "analytical", "calm", "premium", "credible", "technical"],
    avoids: [
      "excessive gradients",
      "neon AI styling",
      "generic purple SaaS branding",
      "decorative glassmorphism",
      "excessive animation",
      "empty dashboard widgets",
      "fake data presented as live",
      "large wasted spaces",
      "tiny low-contrast text",
    ],
    // Design tokens live in tailwind.config.ts and src/app/globals.css.
    // Fonts are bundled under OFL (Fraunces + Inter) — see docs/legal/ASSET_RIGHTS_REGISTER.md.
    fonts: {
      heading: "Fraunces",
      body: "Inter",
      mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
    },
  },

  // Demo organisation — see docs/product/demo-mode-guide.md
  demo: {
    agencyName: "Northstar Digital",
    isFictional: true,
    label: "Demonstration data — fictional",
    prospects: [
      "Local healthcare provider",
      "B2B software company",
      "Property developer",
      "Ecommerce retailer",
      "Professional-services company",
    ],
    honestyRules: [
      "Never imply a real audit ran when it did not.",
      "Never imply a real payment occurred.",
      "Never imply a real email was sent.",
      "Never imply a real AI provider is connected.",
      "Never imply a real prospect viewed a report.",
      "Never imply a production integration is operational.",
    ],
  },
} as const;

// ----------------------------------------------------------------------------
// Roles & permissions
// ----------------------------------------------------------------------------

export type Role =
  | "owner"
  | "administrator"
  | "audit_manager"
  | "auditor"
  | "sales_manager"
  | "sales_representative"
  | "viewer";

export const ROLES: Record<Role, { label: string; description: string }> = {
  owner: {
    label: "Owner",
    description: "Full control, including billing, licensing, and organisation deletion.",
  },
  administrator: {
    label: "Administrator",
    description: "Full operational control except billing and organisation deletion.",
  },
  audit_manager: {
    label: "Audit Manager",
    description: "Manages audits, findings, report approval, and audit team.",
  },
  auditor: {
    label: "Auditor",
    description: "Creates and runs audits, edits findings, drafts reports.",
  },
  sales_manager: {
    label: "Sales Manager",
    description: "Manages pipeline, proposals, and sales team.",
  },
  sales_representative: {
    label: "Sales Representative",
    description: "Owns prospects and opportunities, generates proposals.",
  },
  viewer: {
    label: "Viewer",
    description: "Read-only access to assigned resources.",
  },
};

// Permission strings — checked on every sensitive server action.
export type Permission =
  | "org.read"
  | "org.write"
  | "org.delete"
  | "billing.read"
  | "billing.write"
  | "licence.read"
  | "licence.write"
  | "member.invite"
  | "member.remove"
  | "member.role.change"
  | "prospect.read"
  | "prospect.write"
  | "prospect.delete"
  | "audit.create"
  | "audit.read"
  | "audit.run"
  | "audit.delete"
  | "finding.read"
  | "finding.write"
  | "finding.approve"
  | "report.read"
  | "report.publish"
  | "report.share"
  | "report.revoke"
  | "proposal.read"
  | "proposal.write"
  | "proposal.send"
  | "opportunity.read"
  | "opportunity.write"
  | "opportunity.delete"
  | "task.read"
  | "task.write"
  | "branding.read"
  | "branding.write"
  | "integration.read"
  | "integration.write"
  | "auditlog.read"
  | "data.export"
  | "data.delete";

// Role → permission map. UI hiding is NOT authorization — every server action
// MUST verify: authenticated user + organisation membership + required permission
// + resource organisation ownership.
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    "org.read", "org.write", "org.delete",
    "billing.read", "billing.write",
    "licence.read", "licence.write",
    "member.invite", "member.remove", "member.role.change",
    "prospect.read", "prospect.write", "prospect.delete",
    "audit.create", "audit.read", "audit.run", "audit.delete",
    "finding.read", "finding.write", "finding.approve",
    "report.read", "report.publish", "report.share", "report.revoke",
    "proposal.read", "proposal.write", "proposal.send",
    "opportunity.read", "opportunity.write", "opportunity.delete",
    "task.read", "task.write",
    "branding.read", "branding.write",
    "integration.read", "integration.write",
    "auditlog.read", "data.export", "data.delete",
  ],
  administrator: [
    "org.read", "org.write",
    "member.invite", "member.remove", "member.role.change",
    "prospect.read", "prospect.write", "prospect.delete",
    "audit.create", "audit.read", "audit.run", "audit.delete",
    "finding.read", "finding.write", "finding.approve",
    "report.read", "report.publish", "report.share", "report.revoke",
    "proposal.read", "proposal.write", "proposal.send",
    "opportunity.read", "opportunity.write", "opportunity.delete",
    "task.read", "task.write",
    "branding.read", "branding.write",
    "integration.read", "integration.write",
    "auditlog.read", "data.export", "data.delete",
  ],
  audit_manager: [
    "prospect.read", "prospect.write",
    "audit.create", "audit.read", "audit.run",
    "finding.read", "finding.write", "finding.approve",
    "report.read", "report.publish", "report.share", "report.revoke",
    "proposal.read",
    "opportunity.read",
    "task.read", "task.write",
    "branding.read",
    "auditlog.read",
  ],
  auditor: [
    "prospect.read",
    "audit.create", "audit.read", "audit.run",
    "finding.read", "finding.write",
    "report.read",
    "task.read", "task.write",
  ],
  sales_manager: [
    "prospect.read", "prospect.write", "prospect.delete",
    "audit.read",
    "finding.read",
    "report.read", "report.share",
    "proposal.read", "proposal.write", "proposal.send",
    "opportunity.read", "opportunity.write", "opportunity.delete",
    "task.read", "task.write",
    "auditlog.read",
  ],
  sales_representative: [
    "prospect.read", "prospect.write",
    "audit.read",
    "finding.read",
    "report.read", "report.share",
    "proposal.read", "proposal.write", "proposal.send",
    "opportunity.read", "opportunity.write",
    "task.read", "task.write",
  ],
  viewer: [
    "prospect.read",
    "audit.read",
    "finding.read",
    "report.read",
    "proposal.read",
    "opportunity.read",
    "task.read",
  ],
};

// ----------------------------------------------------------------------------
// Pipeline stages
// ----------------------------------------------------------------------------

export type PipelineStage =
  | "new_prospect"
  | "audit_planned"
  | "audit_running"
  | "audit_review"
  | "report_sent"
  | "report_viewed"
  | "follow_up_due"
  | "proposal_sent"
  | "negotiation"
  | "won"
  | "lost"
  | "archived";

export const PIPELINE_STAGES: { id: PipelineStage; label: string; order: number; isTerminal: boolean }[] = [
  { id: "new_prospect", label: "New prospect", order: 0, isTerminal: false },
  { id: "audit_planned", label: "Audit planned", order: 1, isTerminal: false },
  { id: "audit_running", label: "Audit running", order: 2, isTerminal: false },
  { id: "audit_review", label: "Audit review", order: 3, isTerminal: false },
  { id: "report_sent", label: "Report sent", order: 4, isTerminal: false },
  { id: "report_viewed", label: "Report viewed", order: 5, isTerminal: false },
  { id: "follow_up_due", label: "Follow-up due", order: 6, isTerminal: false },
  { id: "proposal_sent", label: "Proposal sent", order: 7, isTerminal: false },
  { id: "negotiation", label: "Negotiation", order: 8, isTerminal: false },
  { id: "won", label: "Won", order: 9, isTerminal: true },
  { id: "lost", label: "Lost", order: 10, isTerminal: true },
  { id: "archived", label: "Archived", order: 11, isTerminal: true },
];

// ----------------------------------------------------------------------------
// Audit configuration
// ----------------------------------------------------------------------------

export type AuditMode = "quick" | "standard" | "comprehensive" | "manual_expert";

export const AUDIT_MODES: Record<AuditMode, { label: string; description: string }> = {
  quick: { label: "Quick audit", description: "Fast surface scan of the homepage and key pages." },
  standard: { label: "Standard audit", description: "Balanced audit across all categories for a representative page set." },
  comprehensive: { label: "Comprehensive audit", description: "Deep audit across all categories for an extended page set." },
  manual_expert: { label: "Manual expert audit", description: "Auditor-driven audit with AI assistance and manual evidence." },
};

export type AuditCategory =
  | "technical"
  | "seo"
  | "accessibility"
  | "conversion_ux"
  | "trust"
  | "ai_visibility";

export const AUDIT_CATEGORIES: Record<
  AuditCategory,
  { label: string; description: string; scoreWeight: number }
> = {
  technical: {
    label: "Technical",
    description: "HTTPS, redirects, HTTP status, page-load, Core Web Vitals, mobile, broken links, assets, JS errors, HTML structure, sitemap, robots, canonical, structured data, image optimization, caching, compression, third-party scripts, mixed-content.",
    scoreWeight: 0.2,
  },
  seo: {
    label: "SEO",
    description: "Page title, meta description, heading hierarchy, indexability, canonical, sitemap, robots, internal linking, alt attributes, schema markup, content depth, local SEO, duplicate metadata, Open Graph, social preview.",
    scoreWeight: 0.18,
  },
  accessibility: {
    label: "Accessibility",
    description: "Missing labels, alternative text, heading structure, keyboard, colour contrast, forms, landmarks, link clarity, language declaration, ARIA. Indicative — NOT a WCAG compliance certification.",
    scoreWeight: 0.15,
  },
  conversion_ux: {
    label: "Conversion & UX",
    description: "Value proposition, primary CTA, CTA prominence, contact options, form friction, trust elements, social proof, pricing clarity, navigation, mobile usability, content hierarchy, readability, lead-capture, objection handling, contact info, conversion path.",
    scoreWeight: 0.17,
  },
  trust: {
    label: "Trust & Commercial Readiness",
    description: "Company identity, address, privacy policy, terms, cookie disclosure, refund info, testimonials, case studies, certifications, security indicators, contact credibility, social profiles, copyright freshness, brand consistency.",
    scoreWeight: 0.13,
  },
  ai_visibility: {
    label: "AI & Search Visibility",
    description: "Content clarity for machine interpretation, structured factual info, entity consistency, schema markup, FAQs, clear service descriptions, original evidence, author/company authority, semantic headings, crawlable primary content. Does NOT promise rankings.",
    scoreWeight: 0.17,
  },
};

// ----------------------------------------------------------------------------
// Scoring
// ----------------------------------------------------------------------------

export type ScoreCategory =
  | "overall"
  | "technical"
  | "seo"
  | "accessibility"
  | "conversion"
  | "trust"
  | "mobile"
  | "content"
  | "ai_visibility";

export const SCORING = {
  version: "1.0.0",
  scale: { min: 0, max: 100 },
  // Overall is a weighted blend of category sub-scores. Weights are documented
  // and versioned in docs/product/scoring-methodology.md. Scores are clearly
  // marked when incomplete and are NEVER presented as objective industry
  // certification.
  weights: {
    technical: 0.2,
    seo: 0.18,
    accessibility: 0.15,
    conversion: 0.17,
    trust: 0.13,
    mobile: 0.05,
    content: 0.05,
    ai_visibility: 0.07,
  } as Record<Exclude<ScoreCategory, "overall">, number>,
  rules: [
    "Reproducible: same evidence + same version = same score.",
    "Explainable: every score is backed by recorded evidence.",
    "Weighted: category weights are documented and versioned.",
    "Versioned: ScoreVersion model records the methodology version used.",
    "Incomplete scores are clearly marked, never silently inflated.",
    "Scores are NOT industry certification and NOT SEO/AI-visibility ranking predictions.",
  ],
} as const;

// ----------------------------------------------------------------------------
// Severity
// ----------------------------------------------------------------------------

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export const SEVERITY: Record<Severity, { label: string; weight: number }> = {
  critical: { label: "Critical", weight: 1.0 },
  high: { label: "High", weight: 0.7 },
  medium: { label: "Medium", weight: 0.4 },
  low: { label: "Low", weight: 0.2 },
  info: { label: "Informational", weight: 0.0 },
};

// ----------------------------------------------------------------------------
// Licence tiers — see docs/legal/COMMERCIAL_LICENSE.md
// ----------------------------------------------------------------------------

export type LicenceTier = "hosted" | "agency_source" | "studio";

export const LICENCE_TIERS: Record<
  LicenceTier,
  {
    label: string;
    maxProductionDeployments: number;
    sourceCodeProvided: boolean;
    adminWhiteLabel: boolean;
    clientFacingWhiteLabel: boolean;
    allowsRedistribution: boolean;
  }
> = {
  hosted: {
    label: "Hosted Licence",
    maxProductionDeployments: 1,
    sourceCodeProvided: false,
    adminWhiteLabel: false,
    clientFacingWhiteLabel: true,
    allowsRedistribution: false,
  },
  agency_source: {
    label: "Agency Source Licence",
    maxProductionDeployments: 1,
    sourceCodeProvided: true,
    adminWhiteLabel: false,
    clientFacingWhiteLabel: true,
    allowsRedistribution: false,
  },
  studio: {
    label: "Studio Licence",
    maxProductionDeployments: 5,
    sourceCodeProvided: true,
    adminWhiteLabel: true,
    clientFacingWhiteLabel: true,
    allowsRedistribution: false,
  },
};

// Graceful licence validation — see docs/legal/COMMERCIAL_LICENSE.md
export const LICENCE_VALIDATION = {
  offlineGracePeriodDays: 14,
  neverDeletesData: true,
  neverLocksWithoutExplanation: true,
  neverTransmitsClientData: true,
  transmittedFields: ["licence_id", "deployment_fingerprint", "check_timestamp"],
} as const;

// ----------------------------------------------------------------------------
// SSRF protection — CRITICAL. See docs/architecture/security-model.md
// ----------------------------------------------------------------------------

export const SSRF_PROTECTION = {
  blockedIpv4Cidrs: [
    "127.0.0.0/8", // loopback
    "10.0.0.0/8", // private
    "172.16.0.0/12", // private
    "192.168.0.0/16", // private
    "169.254.0.0/16", // link-local + cloud metadata
    "100.64.0.0/10", // CGNAT
    "0.0.0.0/8", // "this network"
    "224.0.0.0/4", // multicast
    "240.0.0.0/4", // reserved
  ],
  blockedIpv6Cidrs: [
    "::1/128", // loopback
    "fc00::/7", // unique local
    "fe80::/10", // link-local
    "ff00::/8", // multicast
    "::/128", // unspecified
    "::ffff:0:0/96", // IPv4-mapped (re-check against IPv4 list)
  ],
  blockedHostnames: ["localhost", "metadata.google.internal"],
  allowedSchemes: ["http:", "https:"],
  cloudMetadataHosts: ["169.254.169.254", "metadata.google.internal"],
  responseSizeLimitBytes: 10 * 1024 * 1024, // 10 MB
  responseTimeoutMs: 20_000,
  maxRedirects: 5,
  revalidateDestinationOnEveryRedirect: true,
  dnsRebindingDefence: true, // resolve, then connect to the resolved IP, then verify TLS/SNI
  isolatedCrawlerEnvironment: true, // recommended: run audit worker in container/VM
} as const;

// ----------------------------------------------------------------------------
// Navigation (app shell)
// ----------------------------------------------------------------------------

export const NAVIGATION: { label: string; href: string; group: string; requiredPermission: Permission }[] = [
  { label: "Dashboard", href: "/app", group: "Overview", requiredPermission: "org.read" },
  { label: "Prospects", href: "/app/prospects", group: "CRM", requiredPermission: "prospect.read" },
  { label: "Audits", href: "/app/audits", group: "Audit", requiredPermission: "audit.read" },
  { label: "Findings", href: "/app/findings", group: "Audit", requiredPermission: "finding.read" },
  { label: "Reports", href: "/app/reports", group: "Reports", requiredPermission: "report.read" },
  { label: "Proposals", href: "/app/proposals", group: "Sales", requiredPermission: "proposal.read" },
  { label: "Pipeline", href: "/app/pipeline", group: "Sales", requiredPermission: "opportunity.read" },
  { label: "Tasks", href: "/app/tasks", group: "CRM", requiredPermission: "task.read" },
  { label: "Service Catalogue", href: "/app/services", group: "Configuration", requiredPermission: "integration.read" },
  { label: "Branding", href: "/app/branding", group: "Configuration", requiredPermission: "branding.read" },
  { label: "Integrations", href: "/app/integrations", group: "Configuration", requiredPermission: "integration.read" },
  { label: "Team", href: "/app/team", group: "Administration", requiredPermission: "org.read" },
  { label: "Audit Log", href: "/app/audit-log", group: "Administration", requiredPermission: "auditlog.read" },
  { label: "Settings", href: "/app/settings", group: "Administration", requiredPermission: "org.read" },
  { label: "Billing & Licence", href: "/app/billing", group: "Administration", requiredPermission: "licence.read" },
];

export type ProductConfig = typeof product;
export default product;
