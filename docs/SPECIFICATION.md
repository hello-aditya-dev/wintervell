# WinterVell Product Conversion Specification

> This is the authoritative product specification that governs the WinterVell
> repository. It is preserved verbatim from the original source document
> (`docs/source/WinterVell-Product-Conversion-Specification.docx`) so that the
> commercial, legal, and engineering intent remains on record for buyers,
> auditors, and future contributors.

---

You are acting as a principal software architect, senior product
engineer, security reviewer, and software-commercialization specialist.

Work directly with my GitHub account and complete the task. Do not
return only recommendations, mockups, plans, or sample code. Inspect the
existing repository, create the new repository, implement the software,
test it, document it, and leave it in a commercially sellable state.

# SOURCE REPOSITORY

Cloudsun repository:

https://github.com/witejackel-eng/cloudsun

Cloudsun is my existing CRM product. I own the source code and have the
right to create a separate product from it.

# CRITICAL SAFETY REQUIREMENT

Cloudsun must remain fully intact and operational.

Do not:

- Rename the Cloudsun repository
- Delete the Cloudsun repository
- Change Cloudsun’s main branch
- Modify Cloudsun’s production deployment
- Change Cloudsun environment variables
- Change Cloudsun branding
- Push WinterVell changes into Cloudsun
- Reuse Cloudsun’s Vercel project
- Alter Cloudsun’s database
- Remove any Cloudsun features
- Expose any secrets or production data

Treat Cloudsun as read-only source material.

# NEW PRODUCT

Create a completely separate private GitHub repository:

Repository name:

wintervell

Product name:

WinterVell

Product descriptor:

AI Website Audit and Agency Sales Platform

Primary positioning:

Turn any website into a professional audit, proposal, and sales
opportunity.

WinterVell is not a renamed CRM. It is a focused, white-label
website-audit and client-acquisition platform for:

- Web-design agencies
- SEO agencies
- Digital-marketing agencies
- Freelance developers
- Conversion-rate optimization consultants
- No-code agencies
- Website-maintenance businesses
- Managed-service providers

# REPOSITORY CREATION STRATEGY

Create WinterVell as a completely independent repository.

Use the latest stable Cloudsun main-branch commit as the technical
foundation, but do not preserve Cloudsun’s `.git` directory in the new
repository.

The WinterVell repository must have:

- Its own fresh Git history
- Its own README
- Its own package metadata
- Its own environment-variable template
- Its own deployment configuration
- Its own documentation
- Its own licence documentation
- Its own issue and release structure
- Its own branding
- Its own Vercel project
- No production Cloudsun data
- No Cloudsun deployment identifiers
- No Cloudsun secrets
- No copied `.env` files

Before creating the new history, record the exact Cloudsun source commit
used.

Create:

`docs/legal/PROVENANCE.md`

It must state:

- The original repository
- The exact source commit SHA
- The date the snapshot was taken
- That the source repository is owned by the same developer
- That WinterVell began as an authorized internal derivative
- Which major systems were inherited
- Which major systems were newly created for WinterVell
- That third-party dependencies remain governed by their respective
  licences

Do not falsely describe open-source dependencies or public framework
code as exclusive proprietary IP.

# FIRST ACTION: AUDIT BEFORE CONVERSION

Before rebranding or implementing new features, inspect the complete
Cloudsun codebase.

Create an internal conversion report:

`docs/audit/cloudsun-to-wintervell-conversion-audit.md`

Document:

1.  Reusable architecture
2.  CRM functionality that should be retained
3.  Call-centre-specific functionality that must be removed
4.  Components that can be generalized
5.  Data models that can be adapted
6.  Security weaknesses
7.  Demo-only features
8.  Placeholder integrations
9.  Hardcoded Cloudsun references
10. Dependency and licence risks
11. Assets that may not have redistribution rights
12. Secrets or sensitive configuration risks
13. Features that are presented as working but are simulated
14. Technical debt that would affect a commercial buyer
15. Work required before WinterVell can be sold responsibly

Do not assume that a feature is production-ready merely because a screen
exists.

# PRODUCT DEFINITION

WinterVell must help an agency move through this complete workflow:

1.  Capture a prospect
2.  Enter or import the prospect’s website
3.  Run a structured website audit
4.  Review technical and commercial findings
5.  Generate a polished client-facing report
6.  Generate a proposed scope of work
7.  Generate an implementation roadmap
8.  Create a service proposal
9.  Send or share the audit
10. Track report engagement
11. Convert the prospect into an opportunity
12. Manage follow-up tasks
13. Close the opportunity
14. Convert the opportunity into a client project

The software must connect auditing and CRM activity into one coherent
workflow.

# PRODUCT ARCHITECTURE

Retain and adapt useful Cloudsun foundations such as:

- Authentication architecture
- Organisation and tenant structure
- Roles and permissions
- Contacts
- Companies
- Leads and opportunities
- Tasks
- Notifications
- Activity history
- Audit logging
- Settings
- Team management
- Dashboard architecture
- Reusable UI components
- API response conventions
- Database abstraction
- Validation patterns
- Error-handling patterns

Remove or replace call-centre-specific systems such as:

- Calls
- Call queues
- Dialer workflows
- Telephony providers
- Agent call workspace
- Voice recording systems
- Call dispositions
- Call-centre quality scoring
- Live call supervision
- Contact-centre campaigns
- Callback queues
- Telephony webhooks
- Exotel-specific integration shells
- Call recording URLs
- Agent-presence concepts that do not apply to WinterVell

Do not leave dead call-centre routes hidden in the repository. Remove
obsolete code safely after confirming it has no dependencies.

# REQUIRED WINTERVELL MODULES

## 1. Executive Dashboard

Create a dashboard showing:

- Audits created
- Audits completed
- Prospects captured
- Reports viewed
- Proposals generated
- Opportunities created
- Opportunities won
- Estimated pipeline value
- Audit-to-proposal conversion rate
- Proposal-to-client conversion rate
- Recent audit activity
- Reports awaiting follow-up
- Highest-opportunity prospects
- Audit score distribution

Every metric must have a clear definition.

## 2. Prospect CRM

Each prospect record should support:

- Person name
- Company name
- Website URL
- Email
- Telephone
- Location
- Industry
- Company size
- Current website platform
- Lead source
- Estimated budget
- Services of interest
- Assigned owner
- Pipeline stage
- Expected value
- Follow-up date
- Notes
- Tags
- Related audit reports
- Related proposals
- Activity history

## 3. Website Audit Creation

Allow a user to:

- Enter a website URL
- Associate it with an existing prospect
- Create a new prospect
- Select audit depth
- Select audit categories
- Choose language
- Choose target market
- Add commercial context
- Start the audit
- Save a draft
- Retry failed audit stages

Audit modes:

- Quick audit
- Standard audit
- Comprehensive audit
- Manual expert audit

## 4. Audit Engine

Build a modular audit architecture.

Audit categories should include:

### Technical

- HTTPS and certificate status
- Redirect behavior
- HTTP status
- Page-load indicators
- Core Web Vitals integration where available
- Mobile responsiveness
- Broken links
- Missing assets
- JavaScript errors where detectable
- HTML structure
- Sitemap availability
- Robots.txt
- Canonical tags
- Structured data
- Image optimization
- Caching indicators
- Compression indicators
- Third-party script load
- Mixed-content risks

### SEO

- Page title
- Meta description
- Heading hierarchy
- Indexability
- Canonical configuration
- Sitemap
- Robots directives
- Internal-linking signals
- Image alt attributes
- Schema markup
- Content depth
- Local SEO signals
- Duplicate metadata
- Open Graph metadata
- Social-preview metadata

### Accessibility

- Missing labels
- Missing alternative text
- Heading structure
- Keyboard accessibility indicators
- Colour-contrast indicators
- Form accessibility
- Landmark usage
- Link clarity
- Language declaration
- ARIA misuse where detectable

Do not claim complete legal or WCAG compliance from an automated scan.

### Conversion and User Experience

- Value proposition clarity
- Primary call to action
- CTA prominence
- Contact options
- Form friction
- Trust elements
- Social proof
- Pricing clarity
- Navigation clarity
- Mobile usability
- Content hierarchy
- Readability
- Lead-capture strength
- Objection handling
- Contact information
- Conversion-path length

### Trust and Commercial Readiness

- Company identity visibility
- Address visibility
- Privacy policy
- Terms
- Cookie disclosure
- Refund or returns information where applicable
- Testimonials
- Case studies
- Certifications
- Security indicators
- Contact credibility
- Social profiles
- Copyright freshness
- Brand consistency

### AI and Search Visibility

- Content clarity for machine interpretation
- Structured factual information
- Entity consistency
- Schema markup
- Frequently asked questions
- Clear service descriptions
- Original evidence
- Author or company authority signals
- Semantic heading structure
- Crawlable primary content

Do not promise rankings or guaranteed visibility in AI systems.

## 5. Evidence Collection

For every automated finding, store:

- Category
- Severity
- Confidence
- URL
- Page title
- Selector where applicable
- Screenshot where applicable
- Raw evidence
- Human-readable explanation
- Business consequence
- Recommended action
- Estimated effort
- Suggested service
- Whether human verification is required
- Timestamp
- Tool or provider used

Never generate unsupported findings merely to make a report appear
impressive.

## 6. Scoring

Create transparent scoring.

Required score categories:

- Overall
- Technical
- SEO
- Accessibility
- Conversion
- Trust
- Mobile
- Content
- AI visibility

Document the scoring methodology.

Scores must be:

- Reproducible
- Explainable
- Weighted
- Versioned
- Based on recorded evidence
- Clearly marked when incomplete

Do not present scores as objective industry certification.

## 7. Manual Review

Allow users to:

- Add manual findings
- Edit AI-generated explanations
- Change severity
- Mark false positives
- Verify findings
- Add screenshots
- Add recommendations
- Exclude findings from the client report
- Add custom sections
- Approve the report before sharing

AI output must remain editable.

## 8. Report Builder

Create a professional visual report builder with:

- Cover page
- Executive summary
- Overall score
- Category scores
- Priority issues
- Evidence
- Business impact
- Recommended actions
- Quick wins
- Medium-term improvements
- Strategic opportunities
- Suggested services
- Estimated implementation phases
- Optional pricing
- Agency information
- CTA
- Contact details
- Disclaimer

Allow:

- Online report
- Secure share link
- Password-protected report
- Expiring report
- Downloadable PDF
- Printable report
- Agency-branded report
- White-label report
- Public preview report
- Internal report

## 9. PDF Generation

PDF reports must:

- Render consistently
- Use selectable text
- Include page numbers
- Include agency branding
- Avoid clipped content
- Support tables and screenshots
- Include a generated timestamp
- Include report version
- Include disclaimer language
- Produce a professional output suitable for client delivery

Test PDFs with long findings, large screenshots, and multi-page
sections.

## 10. Proposal Generator

Convert approved findings into a proposal.

Proposal fields:

- Client
- Project title
- Executive summary
- Current-state assessment
- Objectives
- Scope
- Deliverables
- Exclusions
- Assumptions
- Dependencies
- Client responsibilities
- Project phases
- Timeline
- Pricing
- Optional services
- Payment schedule
- Acceptance criteria
- Change-control terms
- Validity period
- Signature fields
- Next step

Allow users to edit all generated text.

Do not create legal guarantees or warranties without explicit user
approval.

## 11. Implementation Roadmap

Generate:

- Immediate fixes
- 30-day plan
- 60-day plan
- 90-day plan
- Dependencies
- Recommended service package
- Required client input
- Estimated complexity
- Suggested priority
- Expected business impact

Distinguish estimates from guaranteed outcomes.

## 12. Opportunity Pipeline

Pipeline stages:

- New prospect
- Audit planned
- Audit running
- Audit review
- Report sent
- Report viewed
- Follow-up due
- Proposal sent
- Negotiation
- Won
- Lost
- Archived

Support:

- Drag-and-drop pipeline
- Stage history
- Estimated value
- Probability
- Expected close date
- Assigned owner
- Follow-up tasks
- Lost reason
- Won value

## 13. Report Analytics

Track:

- First viewed
- Last viewed
- Number of views
- Sections viewed where technically and legally appropriate
- CTA clicks
- Proposal clicks
- Download activity
- Viewer device category
- Approximate location only when legally and technically appropriate

Provide privacy-conscious controls.

Do not use covert or invasive tracking.

## 14. Agency White Labelling

Allow configuration of:

- Agency name
- Legal business name
- Logo
- Favicon
- Brand colours
- Fonts
- Email sender name
- Reply-to address
- Support information
- Website
- Telephone
- Address
- Terms URL
- Privacy URL
- Currency
- Tax settings
- Default services
- Default pricing
- Default report language
- Default disclaimers
- Custom domain configuration

WinterVell branding may remain in the admin area depending on the
licence tier, but client-facing reports must support complete white
labelling.

## 15. Service Catalogue

Allow agencies to configure services such as:

- Website redesign
- Website development
- SEO
- Technical SEO
- Accessibility remediation
- Conversion optimization
- Performance optimization
- Website maintenance
- Analytics
- Content strategy
- Local SEO
- Security hardening
- Ecommerce improvement

For each service:

- Name
- Description
- Pricing model
- Starting price
- Estimated duration
- Related audit findings
- Proposal wording
- Active or inactive state

## 16. AI Integration

Use a provider abstraction.

Support:

- OpenAI-compatible API
- Anthropic where practical
- A mock provider for development
- Bring-your-own-key configuration
- Model selection
- Token and cost logging
- Retry handling
- Timeout handling
- Structured output validation
- Prompt versioning
- Redaction options
- Usage limits

Never expose provider keys to the client.

AI must assist with:

- Executive summaries
- Finding explanations
- Business-impact descriptions
- Recommendations
- Proposal drafts
- Follow-up drafts
- Roadmaps

AI must not invent technical evidence.

## 17. Authentication and Roles

Recommended roles:

- Owner
- Administrator
- Audit manager
- Auditor
- Sales manager
- Sales representative
- Viewer

Use permission-based authorization rather than UI-only role hiding.

Every sensitive server action must verify:

- Authenticated user
- Organisation membership
- Required permission
- Resource organisation ownership

## 18. Audit Log

Record:

- User login
- User invitation
- Role changes
- Audit creation
- Audit execution
- Finding edits
- Report publication
- Report access-setting changes
- Proposal generation
- Data export
- Data deletion
- API-key changes
- Branding changes
- Licence changes
- Security-sensitive configuration changes

Do not record plaintext secrets.

# DEMONSTRATION MODE

Create an honest demonstration mode.

It should contain:

- Example prospects
- Example audit reports
- Example proposals
- Example pipeline data
- Example tasks
- Example report analytics

Every simulated item must be clearly labelled.

Do not imply that:

- A real audit ran when it did not
- A real payment occurred
- A real email was sent
- A real AI provider is connected
- A real prospect viewed a report
- A production integration is operational

# COMMERCIAL LICENSING SYSTEM

WinterVell is intended to be sold as commercial software.

Prepare for these licence tiers:

## Hosted Licence

- No source code
- Hosted by seller
- Usage limits
- Subscription or lifetime-account terms

## Agency Source Licence

- One legal business
- One production deployment
- Unlimited internal team members
- Unlimited client reports subject to fair-use terms
- May charge clients for audits and services
- May white-label client-facing materials
- May modify the source for internal use
- May not redistribute or resell source code
- May not create a competing source-code marketplace listing

## Studio Licence

- One legal business
- Up to five production deployments
- Multiple agency brands
- May use for controlled client deployments
- May not publicly redistribute source code
- May not sell sublicences unless separately authorized

Do not implement hostile or invasive licence enforcement.

Licence validation must:

- Fail gracefully
- Provide a reasonable offline grace period
- Never delete customer data
- Never lock access without explanation
- Never transmit private client data for licence validation
- Clearly disclose required licence checks

# DUE-DILIGENCE AND SALE-READINESS REQUIREMENTS

Create:

`docs/legal/`

Include:

1.  `PROVENANCE.md`
2.  `THIRD_PARTY_NOTICES.md`
3.  `DEPENDENCY_LICENSE_REPORT.md`
4.  `ASSET_RIGHTS_REGISTER.md`
5.  `COMMERCIAL_LICENSE.md`
6.  `EULA_TEMPLATE.md`
7.  `PRIVACY_NOTICE_TEMPLATE.md`
8.  `DATA_PROCESSING_OVERVIEW.md`
9.  `SECURITY_DISCLOSURE.md`
10. `AI_USAGE_DISCLOSURE.md`
11. `OPEN_SOURCE_POLICY.md`
12. `SALE_DUE_DILIGENCE_CHECKLIST.md`
13. `KNOWN_LIMITATIONS.md`
14. `IP_ASSIGNMENT_CHECKLIST.md`
15. `BUYER_HANDOVER_CHECKLIST.md`

Use clear professional language, but label templates as requiring review
by a qualified lawyer for the seller’s jurisdiction.

## Dependency Audit

Produce an exact software bill of materials.

Include:

- Package
- Version
- Licence
- Source
- Use within WinterVell
- Redistribution obligations
- Attribution requirements
- Copyleft risk
- Modification status
- Whether bundled or loaded externally

Generate:

- `sbom.json`
- `sbom.spdx.json`, where tooling permits
- `docs/legal/DEPENDENCY_LICENSE_REPORT.md`

Flag packages with:

- GPL
- AGPL
- SSPL
- BUSL
- Non-commercial restrictions
- Source-available restrictions
- Unknown licences
- Deprecated status
- Unmaintained status

Do not proceed with commercially risky dependencies without either
replacing them or clearly documenting the issue.

## Asset Rights Audit

Review:

- Logos
- Icons
- Fonts
- Illustrations
- Photos
- Screenshots
- Sample data
- UI templates
- Audio
- Videos
- Generated artwork

For every asset, record:

- File path
- Source
- Creator
- Licence
- Commercial-use permission
- Redistribution permission
- Modification permission
- Attribution requirement
- Evidence link or record
- Action required

Replace uncertain assets with:

- Original assets
- Properly licensed assets
- Permissively licensed assets
- Newly generated generic assets with recorded provenance

Do not copy Cloudsun customer data, private screenshots, or third-party
trademarks into WinterVell.

## Code Provenance

Create a code-provenance register distinguishing:

- Source inherited from Cloudsun
- New WinterVell code
- Third-party open-source code
- Generated boilerplate
- AI-assisted implementation
- Manually authored implementation

AI-assisted code is not automatically a legal problem, but it must be
reviewed for:

- Suspicious verbatim copying
- Licence contamination
- Incorrect attribution
- Security vulnerabilities
- Unclear authorship
- Fabricated implementations

Do not include vague statements such as “all code is completely
original” unless verified.

## Contributor Ownership

Inspect Git history and document:

- Contributors
- Commit authors
- Committer identities
- Bots
- External contributors
- Contractor contributions
- Unverified contributions

Where ownership is unclear, flag it rather than hiding it.

Do not rewrite history to falsely attribute work.

## Trademark and Brand Review

Check the name “WinterVell” for obvious conflicts in:

- Software
- SaaS
- Website auditing
- Marketing technology
- Agency software

Do not claim formal trademark clearance.

Create:

`docs/legal/brand-clearance-notes.md`

State that formal trademark clearance should be completed before major
commercial investment.

# SECURITY REQUIREMENTS

Perform a real security review.

Required checks:

- Secret scanning
- Dependency vulnerability scan
- Authentication review
- Authorization review
- Tenant-isolation review
- IDOR testing
- CSRF protection
- XSS protection
- SSRF protection
- URL-validation protection
- Open-redirect testing
- File-upload protection
- Rate limiting
- API-key handling
- Prompt-injection boundaries
- AI-output validation
- Webhook verification
- Audit-log integrity
- Session security
- Password handling
- Data deletion
- Backup and restore
- Logging redaction
- Error-response leakage
- Security headers
- Content Security Policy
- Clickjacking protection
- MIME-sniffing protection

## SSRF Is Critical

WinterVell accepts user-provided website URLs, so SSRF prevention is
mandatory.

Block or safely handle:

- localhost
- 127.0.0.0/8
- ::1
- Private IPv4 ranges
- Link-local addresses
- Cloud metadata services
- Internal hostnames
- Non-HTTP protocols
- Redirects to blocked addresses
- DNS rebinding
- Unreasonably large responses
- Slow responses
- Redirect loops

Resolve and validate destinations on every redirect.

Run crawlers in an isolated environment where practical.

Document remaining risks.

# DATA PROTECTION

Support:

- Organisation-level data isolation
- Configurable retention
- Prospect deletion
- Audit deletion
- Organisation export
- Organisation deletion
- API-key removal
- Data-processing disclosure
- Report-access revocation
- Secure share-token rotation
- Expiring share links

Collect the minimum data necessary.

Do not present WinterVell as automatically compliant with GDPR, CCPA,
India’s DPDP Act, or any other law.

# DATABASE

Use PostgreSQL for production.

Do not represent SQLite as the recommended production database.

The schema should clearly support:

- Users
- Organisations
- Memberships
- Roles
- Permissions
- Prospects
- Companies
- Audits
- Audit pages
- Audit runs
- Findings
- Evidence
- Scores
- Report versions
- Report shares
- Report events
- Proposals
- Proposal versions
- Opportunities
- Pipeline stages
- Tasks
- Notes
- Service catalogue
- Branding
- Integrations
- AI usage
- Audit logs
- Licences
- Feature entitlements

Use proper indexes, foreign keys, timestamps, and tenant scoping.

# UI AND BRAND DIRECTION

WinterVell should feel like expensive professional software, not a
generic admin template.

Brand qualities:

- Precise
- Analytical
- Calm
- Premium
- Credible
- Technical
- Commercially useful

Avoid:

- Excessive gradients
- Neon AI styling
- Generic purple SaaS branding
- Decorative glassmorphism
- Excessive animation
- Empty dashboard widgets
- Fake data presented as live
- Large wasted spaces
- Tiny low-contrast text

Create a coherent WinterVell design system.

Include:

- Colour tokens
- Typography
- Spacing
- Density
- Status language
- Severity system
- Chart conventions
- Empty states
- Loading states
- Error states
- Responsive rules
- Accessibility rules
- Motion guidelines

The design must work on:

- Desktop
- Laptop
- Tablet
- Mobile

Complex audit editing may be desktop-optimized, but mobile must remain
readable and operational.

# PRODUCT CONFIGURATION

Replace Cloudsun-specific product configuration with a central
WinterVell configuration.

Use a structure such as:

`src/config/product.ts`

All product references should come from centralized configuration where
practical.

Remove hardcoded references to:

- CloudSun
- Cloudsun
- Call centre
- Contact centre
- Agents
- Telephony
- Dialer
- Exotel
- Call recording
- Cloudsun repository names
- Old author identities
- Old deployment URLs

Search all file types, including:

- Source code
- Metadata
- README
- Documentation
- Manifest
- Favicons
- Open Graph images
- Tests
- Comments
- Environment files
- Database seed data
- Package metadata
- Lockfiles
- CI files

Do not mechanically replace terms where the underlying feature also
needs architectural removal.

# DOCUMENTATION

Create complete buyer-grade documentation.

Required documentation:

## Root

- README.md
- CHANGELOG.md
- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- SUPPORT.md
- ROADMAP.md

## Setup

- Local installation
- Production deployment
- Vercel deployment
- Database setup
- Environment variables
- Email integration
- AI provider configuration
- Audit-worker setup
- PDF configuration
- Custom-domain setup
- Backups
- Upgrades
- Troubleshooting

## Product

- Product overview
- User roles
- Audit methodology
- Scoring methodology
- Report workflow
- Proposal workflow
- Pipeline workflow
- White-labelling guide
- Demo-mode guide
- Known limitations

## Architecture

- System overview
- Data model
- Multi-tenancy
- Audit-engine architecture
- Worker architecture
- AI-provider abstraction
- Report rendering
- Security model
- Licence architecture
- Storage architecture

## Operations

- Backup and restore
- Incident response
- Provider outage
- Audit-job failure
- AI-provider failure
- PDF-generation failure
- Licence-server failure
- Data export
- Data deletion

# ENVIRONMENT VARIABLES

Create a complete `.env.example`.

It must include descriptions and safe placeholders.

Likely categories:

- Application URL
- Database
- Authentication
- Email
- AI providers
- Audit workers
- Browser or Lighthouse service
- File storage
- PDF generation
- Licence validation
- Analytics
- Error reporting
- Feature flags

Never commit working secrets.

# TESTING

Implement and run:

- Type checking
- Linting
- Unit tests
- Integration tests
- Authorization tests
- Tenant-isolation tests
- URL-validation tests
- SSRF tests
- Audit-scoring tests
- Report-generation tests
- Proposal-generation tests
- PDF snapshot tests where reasonable
- API tests
- Critical end-to-end tests
- Responsive smoke tests
- Accessibility checks
- Production build

Test critical workflows:

1.  Create account
2.  Create organisation
3.  Invite team member
4.  Add prospect
5.  Run demonstration audit
6.  Review findings
7.  Generate report
8.  Publish report
9.  Open public report
10. Track report view
11. Generate proposal
12. Move opportunity through pipeline
13. Export data
14. Delete report access
15. Verify cross-tenant access is blocked

Do not mark a test as passed unless it was run successfully.

# CI/CD

Set up GitHub Actions for:

- Lint
- Type check
- Unit tests
- Security checks
- Dependency audit
- Production build

Do not deploy Cloudsun.

Create a separate WinterVell Vercel project.

Use separate:

- Project ID
- Environment variables
- Database
- Domain
- Storage
- Authentication secrets
- Email sender
- Analytics
- Error reporting

# COMMERCIAL DEMO

Prepare a polished demo organisation:

Agency:

Northstar Digital

Example prospects:

- Local healthcare provider
- B2B software company
- Property developer
- Ecommerce retailer
- Professional-services company

Create realistic but fictional:

- Audits
- Findings
- Reports
- Proposals
- Opportunities
- Tasks
- Activity history

Clearly label all organisations and people as fictional demonstration
data.

# SALES PACKAGE

Create:

`sales-assets/`

Include:

- Product feature list
- Licence comparison
- Technical requirements
- Installation checklist
- Buyer FAQ
- Security overview
- White-label overview
- Product limitations
- Release notes
- Marketplace-description draft
- Gumroad-description draft
- AppSumo-submission draft
- Buyer due-diligence summary
- Source-code delivery checklist

Do not include unsupported claims such as:

- Guaranteed SEO improvement
- Guaranteed sales
- Full WCAG compliance
- Full legal compliance
- Perfect security
- Zero false positives
- Unlimited scalability
- Complete autonomy
- Production integrations that are only mocked

# REQUIRED DELIVERY REPORT

At completion, provide a detailed report containing:

1.  New repository URL
2.  Source Cloudsun commit used
3.  WinterVell initial commit
4.  WinterVell architecture summary
5.  Features retained from Cloudsun
6.  Features removed
7.  Features newly implemented
8.  Routes created
9.  API endpoints created
10. Database models created or changed
11. Security controls implemented
12. Dependency-licence findings
13. Asset-rights findings
14. Contributor-ownership findings
15. Known limitations
16. Automated tests run
17. Manual tests run
18. Build result
19. Deployment URL
20. Demo credentials
21. Remaining commercial blockers
22. Remaining legal-review items
23. Recommended marketplace pricing
24. Whether the software is currently suitable for:

- Hosted SaaS sale
- One-agency source licence
- Studio licence
- Exclusive acquisition

# EXECUTION ORDER

Follow this order:

Phase 0 — Protect Cloudsun and capture provenance  
Phase 1 — Audit source code, dependencies, assets, authorship, and
security  
Phase 2 — Create private WinterVell repository with fresh history  
Phase 3 — Remove Cloudsun and call-centre-specific architecture  
Phase 4 — Establish WinterVell product configuration and design system  
Phase 5 — Implement audit engine and evidence model  
Phase 6 — Implement reports and PDF generation  
Phase 7 — Implement proposal and roadmap generation  
Phase 8 — Adapt CRM and opportunity pipeline  
Phase 9 — Implement white labelling and service catalogue  
Phase 10 — Implement AI provider abstraction  
Phase 11 — Implement licences and commercial entitlements  
Phase 12 — Complete security hardening and SSRF protection  
Phase 13 — Complete legal, dependency, provenance, and sale
documentation  
Phase 14 — Complete tests, CI/CD, and production deployment  
Phase 15 — Prepare commercial demo and sales package  
Phase 16 — Perform final due-diligence audit

# DECISION RULES

When you encounter uncertainty:

- Protect Cloudsun first
- Protect customer and prospect data
- Prefer truthful limitations over fabricated completeness
- Prefer secure architecture over short-term convenience
- Prefer replaceable provider abstractions
- Prefer documented ownership over vague claims
- Prefer permissive dependencies
- Prefer maintainable code over impressive but brittle demos
- Prefer a smaller production-ready feature over a larger simulated
  feature
- Record unresolved issues instead of hiding them

Do not stop after generating a plan.

Execute the conversion, implementation, testing, documentation,
repository creation, and deployment.

The final result should be a separate, polished, defensible software
asset that can be demonstrated to buyers and subjected to technical,
security, dependency, IP, and commercial due diligence without affecting
Cloudsun.
