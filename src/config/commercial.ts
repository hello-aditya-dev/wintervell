/**
 * WinterVell — Central Commercial Configuration
 *
 * Single source of truth for brand identity, pricing, checkout URLs,
 * demo links, documentation, and all commercial references.
 *
 * Claims are separated into:
 * - availableNow: Currently implemented and verified
 * - frontendDemo: Available in the interactive frontend demonstration
 * - inDevelopment: Currently being built
 * - planned: Intended but not yet started
 */

export const commercial = {
  // Brand identity
  name: "WinterVell",
  tagline: "Turn website evidence into agency work.",
  descriptor: "Website Audit and Agency Sales Platform",
  ownershipLine: "Own the code. Use your domain. Keep the client revenue.",
  positioning: "Find the work. Prove the value. Win the client.",
  supportingMessage:
    "WinterVell is a white-label workspace for reviewing websites, organizing findings, producing client reports, preparing proposals and tracking the resulting opportunity.",

  // Contact
  contact: {
    supportEmail: "support@wintervell.com",
    salesEmail: "sales@wintervell.com",
    securityEmail: "security@wintervell.com",
    legalEmail: "legal@wintervell.com",
  },

  // Checkout URLs — provider-agnostic, configurable via env vars
  checkout: {
    agencyUrl: process.env.NEXT_PUBLIC_AGENCY_CHECKOUT_URL || "",
    studioUrl: process.env.NEXT_PUBLIC_STUDIO_CHECKOUT_URL || "",
    enterpriseContactUrl: process.env.NEXT_PUBLIC_ENTERPRISE_CONTACT_URL || "",
  },

  // Demo & docs
  demo: {
    url: process.env.NEXT_PUBLIC_DEMO_URL || "",
    docsUrl: process.env.NEXT_PUBLIC_DOCS_URL || "",
  },

  // Pricing — clearly labelled as planned
  pricing: {
    label: "Planned founding pricing. Purchasing is not yet open.",
    agency: {
      name: "Agency Source Licence",
      plannedPrice: 799,
      description: "One legal business, one production deployment, complete source code.",
      bestFor: "Single-agency operators",
      cta: "Join the founding release",
      includes: [
        "One legal business",
        "One production deployment",
        "Complete source code",
        "Full client-facing white labelling",
        "Unlimited internal users",
        "Commercial client-report use",
        "Bring-your-own AI keys",
        "Deployment documentation",
        "Purchased-version access",
        "Installation support",
        "Security and due-diligence documents",
      ],
      clarifications: [
        "Future major versions are not automatically included unless stated.",
        "Buyer may modify the software for internal business use.",
        "Buyer may not redistribute or resell the source code.",
        "Buyer may charge clients for audits and related services.",
      ],
    },
    studio: {
      name: "Studio Source Licence",
      plannedPrice: 1499,
      description: "Everything in Agency, plus five deployments and multiple brands.",
      bestFor: "Multi-brand operators",
      cta: "Join the founding release",
      includes: [
        "Everything in Agency",
        "Up to five production deployments",
        "Multiple agency brands",
        "Controlled client deployments",
        "One year of updates",
        "Priority installation support",
        "Multi-brand configuration",
        "Extended commercial rights defined in the licence",
      ],
    },
    enterprise: {
      name: "Enterprise",
      fromPrice: 4000,
      description: "Extended deployment rights, custom implementation, and structured handover.",
      cta: "Discuss an enterprise arrangement",
      includes: [
        "Extended deployment rights",
        "Custom implementation",
        "Private feature work",
        "Structured handover",
        "Deployment assistance",
      ],
    },
  },

  // Licence comparison fields
  licenceComparison: {
    fields: [
      { label: "Legal business count", agency: "1", studio: "1+", enterprise: "Custom" },
      { label: "Production deployments", agency: "1", studio: "Up to 5", enterprise: "Custom" },
      { label: "Source code", agency: "Yes", studio: "Yes", enterprise: "Yes" },
      { label: "White labelling", agency: "Client-facing", studio: "Full (incl. admin)", enterprise: "Full" },
      { label: "Internal users", agency: "Unlimited", studio: "Unlimited", enterprise: "Unlimited" },
      { label: "Client reports", agency: "Unlimited", studio: "Unlimited", enterprise: "Unlimited" },
      { label: "Modification rights", agency: "Internal use", studio: "Internal + client", enterprise: "Custom" },
      { label: "Client deployment rights", agency: "No", studio: "Controlled", enterprise: "Custom" },
      { label: "Updates", agency: "Purchased version", studio: "1 year", enterprise: "Custom" },
      { label: "Installation support", agency: "30 days", studio: "Priority", enterprise: "Custom" },
      { label: "Redistribution", agency: "No", studio: "No", enterprise: "By agreement" },
      { label: "Resale rights", agency: "No", studio: "No", enterprise: "By agreement" },
    ],
  },

  // Audit categories
  auditCategories: [
    { id: "technical", label: "Technical Health", icon: "Wrench" },
    { id: "seo", label: "SEO Foundations", icon: "Search" },
    { id: "performance", label: "Performance", icon: "Gauge" },
    { id: "mobile", label: "Mobile Experience", icon: "Smartphone" },
    { id: "accessibility", label: "Accessibility Indicators", icon: "Eye" },
    { id: "conversion", label: "Conversion Clarity", icon: "Target" },
    { id: "trust", label: "Trust Signals", icon: "Shield" },
    { id: "content", label: "Content Structure", icon: "FileText" },
    { id: "ai_search_readiness", label: "AI-Search Readiness", icon: "Brain" },
  ],

  // Pipeline stages
  pipelineStages: [
    "New prospect",
    "Audit planned",
    "Audit review",
    "Report sent",
    "Follow-up due",
    "Proposal sent",
    "Negotiation",
    "Won",
    "Lost",
  ],

  // Product status — honest claims
  productStatus: {
    availableNow: [
      "Interactive frontend demonstration",
      "Prospect management interface",
      "Audit workflow interface",
      "Finding review workspace",
      "Report builder interface",
      "Proposal builder interface",
      "Pipeline kanban interface",
      "White-label branding settings",
      "Service catalogue",
      "Task management",
    ],
    frontendDemo: [
      "Deterministic demo data",
      "Simulated audit creation",
      "Simulated finding review",
      "Simulated report publishing",
      "Simulated proposal sending",
      "Simulated pipeline movement",
      "Simulated branding preview",
    ],
    inDevelopment: [
      "Backend API implementation",
      "Database architecture",
      "Authentication service",
      "Real audit crawler",
      "PDF rendering",
    ],
    planned: [
      "Payment processing",
      "Email integration",
      "Live licence validation",
      "Real report analytics",
      "CI/CD pipeline",
      "E2E test suites",
    ],
  },

  // Technical stack — honest status
  techStack: [
    { label: "Framework", value: "Next.js 16 (App Router) + React 19 + TypeScript 5", status: "available" as const },
    { label: "Database", value: "PostgreSQL (Prisma ORM) — planned", status: "planned" as const },
    { label: "Authentication", value: "NextAuth.js v4 — planned", status: "planned" as const },
    { label: "Audit workers", value: "Isolated audit execution — in development", status: "inDevelopment" as const },
    { label: "AI-provider abstraction", value: "OpenAI-compatible, Anthropic — planned", status: "planned" as const },
    { label: "PDF rendering", value: "Server-side with selectable text — planned", status: "planned" as const },
    { label: "Self-hosting", value: "Deploy on your own infrastructure", status: "available" as const },
  ],

  // FAQ
  faq: [
    {
      q: "Is this a hosted SaaS or source-code product?",
      a: "WinterVell is sold as source-code software. You receive the complete source code and deploy it on your own infrastructure. A hosted option may be available in the future.",
    },
    {
      q: "What is the current state of the product?",
      a: "WinterVell is in development. The interactive frontend demonstration shows the planned product interface using fictional data. The backend implementation is in progress. Purchasing is not yet open.",
    },
    {
      q: "Can I use my own brand?",
      a: "Yes. Both the Agency and Studio licences include full client-facing white labelling. The Studio licence also allows admin-area white labelling.",
    },
    {
      q: "Can I charge clients for audits?",
      a: "Yes. You may charge clients for audits, reports, proposals, and related services. The licence explicitly permits commercial use of client-facing outputs.",
    },
    {
      q: "Can I modify the code?",
      a: "Yes. You may modify the source code for internal business use. The Studio licence also permits modifications for controlled client deployments.",
    },
    {
      q: "Can I resell the source code?",
      a: "No. Redistribution, resale, sublicensing, or public publication of the source code is prohibited under all licence tiers.",
    },
    {
      q: "How many deployments are included?",
      a: "The Agency licence includes one production deployment. The Studio licence includes up to five production deployments. Enterprise arrangements are custom.",
    },
    {
      q: "Are AI costs included?",
      a: "No. WinterVell uses a bring-your-own-key model. You provide your own AI provider API keys, and you pay your AI provider directly for usage.",
    },
    {
      q: "Is the audit fully automated?",
      a: "WinterVell performs automated website analysis, but findings are indicative, not definitive. Users can edit, reject, or mark findings as false positives. AI explains evidence but does not invent it.",
    },
    {
      q: "Can findings be edited?",
      a: "Yes. Every finding can be reviewed, edited, marked as a false positive, or excluded from the client report. The manual review workflow is a core part of the product.",
    },
    {
      q: "Does WinterVell guarantee rankings?",
      a: "No. WinterVell does not guarantee SEO ranking improvements, AI-visibility improvements, or any specific commercial outcome. Automated findings are indicative, not definitive.",
    },
    {
      q: "Is it a WCAG compliance checker?",
      a: "No. WinterVell provides accessibility indicators, but it does not certify WCAG compliance. Accessibility findings are a prompt for human review, not a final verdict.",
    },
    {
      q: "Can I inspect the product first?",
      a: "Yes. You can explore the interactive frontend demo, view a sample report, and examine the product interface before purchasing.",
    },
    {
      q: "Can WinterVell be deployed outside Vercel?",
      a: "Yes. WinterVell is a standard Next.js application and can be deployed on any platform that supports Node.js, including Docker-based hosting, VPS, and other cloud providers.",
    },
    {
      q: "How is customer data handled?",
      a: "WinterVell is self-hosted. Customer data remains on your infrastructure. No client or audit data is transmitted externally.",
    },
  ],
} as const;

export type CommercialConfig = typeof commercial;
export default commercial;
