# Product Limitations

> Honest statement of WinterVell's limitations as of the v0.1.0
> foundation release. This document is buyer-facing and complements the
> technical disclosure in
> [`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md)
> and the delivery status in [`../ROADMAP.md`](../ROADMAP.md).
> WinterVell does not claim capabilities it has not implemented.

WinterVell is built on a principle of honest disclosure: the product
never implies a feature is implemented when it is mocked, never implies
a real integration is live when it is not, and never claims a guarantee
it cannot meet. This document records the material limitations a buyer
should weigh before purchase.

---

## Implementation status

The v0.1.0 release delivers the commercially-defensible repository,
legal, and documentation foundation. The full eighteen-module product
(audit engine, report builder, PDF generation, proposal generator,
pipeline, white-labelling, AI provider abstraction, licensing system)
is defined in [`docs/SPECIFICATION.md`](../docs/SPECIFICATION.md) and
tracked in [`../ROADMAP.md`](../ROADMAP.md). Buyers should review the
roadmap status table before purchase and treat the foundation release
as a foundation, not a finished product.

## Automated findings are indicative

- Automated accessibility, SEO, technical, conversion, trust, and
  AI-visibility checks are heuristic. They produce indicative findings,
  not definitive measurements.
- Findings may include false positives and false negatives. The manual
  review workflow exists specifically so reviewers can mark false
  positives, verify, and exclude findings before sharing a report.
- WinterVell does not claim zero false positives.

## No WCAG or legal compliance certification

- WinterVell performs automated checks aligned to WCAG 2.2 AA success
  criteria. Automated checks are not a WCAG audit, a VPAT, or a
  certification of conformance.
- WinterVell does not certify legal compliance of any kind (privacy,
  consumer protection, accessibility, sectoral regulation).
- Legal documents in [`docs/legal/`](../docs/legal/) are templates
  prepared for the WinterVell product and should be reviewed by a
  qualified lawyer in the Licensor's jurisdiction before commercial
  distribution.

## No ranking or sales guarantee

- WinterVell does not guarantee SEO ranking improvements.
- WinterVell does not guarantee AI-visibility or AI-summarization
  improvements.
- WinterVell does not guarantee sales, conversions, or revenue uplift.
- WinterVell identifies issues and recommends actions; outcomes depend
  on many factors outside any audit tool's control.

## Legal documents are templates

- The EULA, commercial licence reference, security disclosure, and
  related documents are templates prepared for the WinterVell product.
- They are not legal advice and have not been certified by a lawyer for
  the Licensor's jurisdiction as of the v0.1.0 release.
- A qualified lawyer should review all legal documents before
  commercial distribution.

## No formal trademark clearance

- Formal trademark clearance for the "WinterVell" name has not been
  completed as of the v0.1.0 release.
- Trademark clearance is recommended before major commercial investment.
- See [`docs/legal/brand-clearance-notes.md`](../docs/legal/brand-clearance-notes.md)
  for the current clearance notes (where available).

## Mocked integrations are clearly labelled

- Where an integration is mocked (e.g. the AI mock provider), the UI
  and documentation clearly indicate that the mock is in use.
- The product never implies a production integration is operational when
  it is mocked.
- Buyers should confirm, during deployment, which integrations are real
  and which are mocked in their configuration.

## SQLite is development-only

- SQLite is supported for local development only.
- Production must use PostgreSQL 14+ (16 recommended).
- Running SQLite in any shared, multi-user, or production environment is
  unsupported and a known limitation.

## Desktop-optimized for complex editing

- Complex audit editing and report-builder interactions are optimized
  for desktop browsers.
- Mobile is supported for review, dashboard, pipeline, and read-only
  flows.
- Mobile editing of large audits is not optimized.

## SSRF protection is maintained, not perfect

- The SSRF block-list is designed to reject localhost, private ranges,
  link-local, cloud-metadata endpoints, non-HTTP protocols, and
  cross-protocol redirects to internal hosts.
- The block-list is maintained and updated as new techniques are
  identified; it is not claimed to be immune to all SSRF variants.
- An independent penetration test is recommended before high-volume
  production use.

## No formal penetration test as of v0.1.0

- WinterVell has not undergone an independent penetration test as of
  the v0.1.0 release.
- Penetration testing is recommended before high-volume production use
  and is tracked as a planned activity in
  [`../ROADMAP.md`](../ROADMAP.md).

## No autonomous operation

- WinterVell is a tool for agencies, not an autonomous agent. It does
  not auto-publish fixes to audited sites, does not auto-send proposals
  without a human decision, and does not auto-close opportunities.
- A human reviewer is expected at the manual-review, report-share, and
  proposal-send stages.

## No guaranteed scalability

- WinterVell is designed to scale horizontally on standard commodity
- infrastructure. It does not claim unlimited scalability.
- Scaling characteristics depend on the operator's infrastructure, the
  audit-worker configuration, and the database size.
- High-volume deployments should run the audit worker as a separately
  scalable service and use PgBouncer or equivalent connection pooling.

## Contributor history clarification

- The Cloudsun contributor history (the source from which WinterVell is
  derived) includes a contributor whose relationship to the WinterVell
  owner should be clarified during buyer due diligence. See
  [`docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md) and
  [`BUYER_DUE_DILIGENCE_SUMMARY.md`](BUYER_DUE_DILIGENCE_SUMMARY.md).

---

## Related documents

- [`../ROADMAP.md`](../ROADMAP.md) — delivery status by phase.
- [`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md) — security disclosure.
- [`docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md) — provenance.
- [`BUYER_DUE_DILIGENCE_SUMMARY.md`](BUYER_DUE_DILIGENCE_SUMMARY.md) — buyer due-diligence summary.
- [`BUYER_FAQ.md`](BUYER_FAQ.md) — frequently asked questions.
