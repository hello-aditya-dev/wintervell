/**
 * WinterVell — Central Commercial Configuration
 *
 * Single source of truth for brand identity, pricing, checkout URLs,
 * demo links, documentation, and all commercial references.
 */

export const commercial = {
  // Brand identity
  name: "WinterVell",
  tagline: "Turn any website into a sales-ready audit.",
  descriptor: "AI Website Audit and Agency Sales Platform",
  ownershipLine: "Own the code. Use your domain. Keep the client revenue.",
  positioning: "Find the work. Prove the value. Win the client.",
  supportingMessage:
    "WinterVell gives agencies a white-label audit engine, report builder, proposal generator and prospect pipeline they can deploy under their own brand.",

  // Contact
  contact: {
    supportEmail: "support@wintervell.example",
    salesEmail: "sales@wintervell.example",
    securityEmail: "security@wintervell.example",
    legalEmail: "legal@wintervell.example",
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

  // Pricing
  pricing: {
    agency: {
      name: "Agency Source Licence",
      foundingPrice: 799,
      anchorPrice: 1199,
      description: "One legal business, one production deployment, complete source code.",
      bestFor: "Single-agency operators",
      cta: "Buy Agency Licence",
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
        "Thirty days of installation support",
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
      foundingPrice: 1499,
      anchorPrice: 2199,
      description: "Everything in Agency, plus five deployments and multiple brands.",
      bestFor: "Multi-brand operators",
      badge: "Best for multi-brand operators",
      cta: "Buy Studio Licence",
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
      name: "Exclusive or Enterprise",
      fromPrice: 4000,
      description: "Extended deployment rights, custom implementation, and structured handover.",
      cta: "Discuss an enterprise arrangement",
      includes: [
        "Extended deployment rights",
        "Custom implementation",
        "Private feature work",
        "Brand or asset acquisition",
        "IP assignment subject to agreement",
        "Deployment assistance",
        "Structured handover",
      ],
    },
  },

  // Founding pricing
  founding: {
    label: "Founding pricing for the first 10 source-code customers.",
    isLimited: true,
    remainingCount: 10, // Configurable — set to 0 when sold out
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
    { id: "ai_visibility", label: "AI-Search Readiness", icon: "Brain" },
  ],

  // Pipeline stages
  pipelineStages: [
    "New prospect",
    "Audit planned",
    "Audit running",
    "Audit review",
    "Report sent",
    "Report viewed",
    "Follow-up due",
    "Proposal sent",
    "Negotiation",
    "Won",
    "Lost",
  ],

  // Demo agency
  demoAgency: {
    name: "Northstar Digital",
    isFictional: true,
    label: "Demonstration data — fictional",
    prospects: [
      "Meridian Health Group",
      "Cedarline Property",
      "HarborDesk Software",
      "Alder & Row Commerce",
      "Parkfield Advisory",
    ],
  },

  // Use cases
  useCases: [
    {
      title: "Web-design agency",
      description: "Use audits to identify redesign and conversion opportunities.",
      icon: "Layout",
    },
    {
      title: "SEO agency",
      description: "Turn technical findings into prioritized SEO projects.",
      icon: "Search",
    },
    {
      title: "Freelance developer",
      description: "Create structured evidence before quoting remediation work.",
      icon: "Code",
    },
    {
      title: "Maintenance provider",
      description: "Use recurring audits to identify ongoing work.",
      icon: "RefreshCw",
    },
    {
      title: "Multi-brand studio",
      description: "Operate separate report brands and deployments under the Studio Licence.",
      icon: "Layers",
    },
  ],

  // Technical stack
  techStack: [
    { label: "Framework", value: "Next.js 16 (App Router) + React 19 + TypeScript 5" },
    { label: "Database", value: "PostgreSQL (Prisma ORM); SQLite for local development" },
    { label: "Authentication", value: "NextAuth.js v4 with role-based access control" },
    { label: "Multi-tenant architecture", value: "Organisation-scoped data isolation" },
    { label: "Audit workers", value: "Isolated audit execution with SSRF protection" },
    { label: "Storage", value: "Configurable file storage (local, S3-compatible)" },
    { label: "PDF rendering", value: "Server-side with selectable text and page numbers" },
    { label: "AI-provider abstraction", value: "OpenAI-compatible, Anthropic, mock providers" },
    { label: "Bring-your-own-key", value: "Use your own AI provider keys" },
    { label: "Security controls", value: "SSRF protection, IDOR prevention, rate limiting" },
    { label: "Testing", value: "Unit, integration, and E2E test suites" },
    { label: "CI/CD", value: "GitHub Actions with lint, type-check, build, security" },
  ],

  // FAQ
  faq: [
    {
      q: "Is this a hosted SaaS or source-code product?",
      a: "WinterVell is sold as source-code software. You receive the complete source code and deploy it on your own infrastructure. A hosted option may be available in the future.",
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
      q: "Which AI providers are supported?",
      a: "WinterVell supports OpenAI-compatible providers, Anthropic, and includes a mock provider for demonstration. The provider abstraction is designed to be extensible.",
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
      q: "Is installation included?",
      a: "Installation is self-service with comprehensive deployment documentation. The Agency licence includes thirty days of installation support. The Studio licence includes priority installation support.",
    },
    {
      q: "What support is included?",
      a: "The Agency licence includes thirty days of installation support via email. The Studio licence includes priority installation support and one year of updates. Enterprise arrangements include custom support terms.",
    },
    {
      q: "Are future updates included?",
      a: "The Agency licence includes access to the purchased version. Future major versions are not automatically included. The Studio licence includes one year of updates from the date of purchase.",
    },
    {
      q: "What happens after purchase?",
      a: "After verified payment, you receive source-code delivery instructions, deployment documentation, a buyer handover checklist, and access to the support channel. The full process is documented in the deployment guide.",
    },
    {
      q: "Can I inspect the product first?",
      a: "Yes. You can explore the live demo, view a sample report, review the documentation preview, and examine the architecture and security overview before purchasing.",
    },
    {
      q: "Can WinterVell be deployed outside Vercel?",
      a: "Yes. WinterVell is a standard Next.js application and can be deployed on any platform that supports Node.js, including Docker-based hosting, VPS, and other cloud providers. Deployment documentation covers multiple options.",
    },
    {
      q: "What database is required?",
      a: "PostgreSQL is required for production. SQLite is supported for local development only. Production deployments must not use SQLite.",
    },
    {
      q: "How is customer data handled?",
      a: "WinterVell is self-hosted. Customer data remains on your infrastructure. The licence validation system never transmits client or audit data — only a licence identifier and deployment fingerprint. See the data-processing overview for details.",
    },
  ],
} as const;

export type CommercialConfig = typeof commercial;
export default commercial;
