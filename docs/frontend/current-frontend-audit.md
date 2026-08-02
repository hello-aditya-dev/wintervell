# Current Frontend Audit

Date: 2025-08-02
Branch: agent/frontend-rebuild

## Components to retain

| Component | Location | Reason |
|-----------|----------|--------|
| Header | src/components/site/Header.tsx | Rebuilt as clean sticky header |
| HeroSection | src/components/site/HeroSection.tsx | Rebuilt with honest messaging |
| Footer | src/components/site/Footer.tsx | Rebuilt as minimal footer |
| OwnershipDeployment | src/components/site/OwnershipDeployment.tsx | Rebuilt with honest status |
| ContactSection | src/app/contact/page.tsx | Retained as dedicated route |
| opengraph-image | src/app/opengraph-image.tsx | Retained with fixed display value |

## Components rebuilt

| Old Component | New Component | Changes |
|---------------|---------------|---------|
| ProductProof | CoreWorkflow | Simplified to 6 steps with links |
| AuditIntelligence | ProductPreview | Shows product UI previews |
| WhiteLabelSection | WhiteLabelPreview | Simplified brand switcher |
| PricingSection | PricingPreview | Honest "planned" pricing |
| DueDiligence | DueDiligencePreview | 5 cards with "In preparation" |
| FinalCTA | FinalCTA | Honest CTAs |
| OutcomeStrip | Differentiators | 3 columns only |
| InteractiveAuditDemo | (removed) | Arbitrary URL audit removed |
| TestimonialsSection | (removed) | Fictional testimonials removed |
| SalesPipeline | (moved to /app/pipeline) | Real product UI |
| ReportExperience | (moved to /app/reports) | Real product UI |
| AuditToProposal | (moved to /app/proposals) | Real product UI |
| CommercialUseCases | (removed) | Low-value, repeated info |
| TechnicalCredibility | (removed) | Claims not verified |
| ROICalculator | (removed) | ROI claims not verified |
| LicenceComparison | (moved to /pricing) | Dedicated route |
| BuyerRiskReduction | (removed) | Marketing section |
| SecuritySection | (removed) | Claims not verified |
| ChangelogSection | (removed) | Low-value for homepage |
| RoadmapSection | (removed) | Low-value for homepage |
| CompetitorComparison | (removed) | No named competitors |
| ProcessTimeline | (removed) | Repeated info |
| ProductMetrics | (removed) | Decorative metrics |
| BackToTop | (removed) | Unnecessary |
| ScrollProgress | (removed) | Unnecessary |
| CookieConsent | (removed) | No non-essential tracking |
| KeyboardShortcuts | (removed) | Moved to /app command menu |
| SectionDivider | (removed) | Excessive decoration |
| SkipLink | (removed) | Will be re-added in app shell |

## Misleading product claims removed

- "AI Website Audit" → "Website Audit" (AI not decorative)
- "InStock" availability in schema → Removed
- Anchor pricing ($1199/$2199) → Removed (never sold at those prices)
- "Founding release" scarcity → "Planned founding pricing"
- "Only 10 left" → Removed
- Fictional testimonials → Removed entirely
- "Trusted by agencies" → Removed
- Real audit worker claims → Marked as "in development"
- Authentication claims → Marked as "planned"
- PDF rendering claims → Marked as "planned"
- SSRF protection claims → Marked as "planned"

## Fake or fictional social proof removed

- TestimonialsSection with 3 invented testimonials
- Star ratings
- Invented customer names (Northstar Digital, etc.)
- "Trusted by agencies" messaging
- "Real results" claims
- Fake review cards

## Fake scarcity removed

- "Only 10 left" remaining count
- Animated scarcity dots
- Founding-licence progress bars
- Pulsing urgency labels
- Countdown-like effects
- remainingCount in commercial.ts

## Decorative motion removed

- FloatingParticles
- Rotating conic-gradient backgrounds
- Infinite glow pulses
- Typing animations
- Shimmering badges
- Animated price counters
- Decorative progress bars
- Constant background movement
- Bouncing CTAs
- Repeated hover lifts on every card
- Animated dots with no functional meaning
- Large gradient section dividers
- Auto-rotating content
- Back-to-top button
- Keyboard-shortcut overlay
- Scroll progress indicator

## Repeated sections removed

- Testimonials (fictional)
- Changelog (low-value)
- Roadmap (low-value)
- Competitor comparison (no named competitors)
- Large security marketing section (claims not verified)
- Separate process timeline (repeated info)
- Repeated ownership checklists
- Repeated outcome strips
- Repeated technical grids
- Repeated CTAs
- Full licence-comparison table (moved to dedicated route)
- Full due-diligence document list (moved to dedicated route)
- Long FAQ search interface (simplified)
- Cookie banner (no non-essential tracking)

## Missing product screens → Now built

- /app (dashboard)
- /app/prospects (list, new, detail)
- /app/audits (list, new, detail with findings)
- /app/reports (list, builder)
- /app/proposals (list, builder)
- /app/pipeline (kanban)
- /app/tasks
- /app/services
- /app/settings/branding
- /app/settings/team
- /app/settings/integrations
- /sample-report

## Accessibility concerns addressed

- Semantic landmarks in app shell
- Skip link in app shell
- Keyboard-operable navigation
- Keyboard-operable pipeline
- Labelled forms
- Descriptive buttons
- Accessible dialogs
- aria-current for active navigation
- Reduced-motion support
- Sufficient contrast
- No colour-only state communication

## Mobile concerns addressed

- No horizontal overflow
- Sidebar converts to drawer
- Tables switch to cards when appropriate
- Forms use one column on mobile
- Pipeline supports horizontal scrolling
- Touch targets are at least 44px

## Performance concerns addressed

- Server components by default
- Client components only for interactive parts
- No full-page client rendering
- No large animation bundles
- No background videos
- No unnecessary hydration
- No decorative motion

## Components that became reusable product UI

- StatusBadge → Used in all /app routes
- SeverityBadge → Used in audit findings
- ScoreBadge → Used in audit scores
- FilterBar → Used in data tables
- PageHeader → Used in all /app pages
- EmptyState → Used in empty tables
- DemoLabel → Used for simulated actions
- CurrencyValue → Used in proposals and pipeline
- DateValue → Used in all date displays
