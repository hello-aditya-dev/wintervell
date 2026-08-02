# Release Notes

> WinterVell release history. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
> The authoritative, machine-readable history is in
> [`../CHANGELOG.md`](../CHANGELOG.md). This document is the buyer-facing
> narrative companion.

WinterVell uses [semantic versioning](https://semver.org/) at the
product level. The v0.1.x series is the foundation series: commercially
-defensible repository, legal, and documentation scaffold. The
v0.2.x series and beyond deliver the eighteen product modules per
[`../ROADMAP.md`](../ROADMAP.md).

---

## v0.1.0 — 2026-08-02

**Foundation release.** Commercially-defensible repository, legal, and
documentation scaffold for the WinterVell AI Website Audit and Agency
Sales Platform.

### Added

- **Repository.** Independent private repository with its own fresh Git
  history, its own README, its own package metadata, its own environment
  -variable template, its own deployment configuration, and its own
  branding. See [`../README.md`](../README.md).
- **Licence.** WinterVell Commercial Source License (WV-CSL) v1.0 in
  [`../LICENSE`](../LICENSE). WinterVell is proprietary commercial
  software; it is not open source.
- **Provenance.** Full provenance record in
  [`../docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md),
  including the exact source commit, the contributor history, the
  relationship to Cloudsun, and the systems inherited vs newly created.
- **Conversion audit.** Cloudsun-to-WinterVell conversion audit in
  [`../docs/audit/cloudsun-to-wintervell-conversion-audit.md`](../docs/audit/cloudsun-to-wintervell-conversion-audit.md).
- **Legal suite.** Commercial licence reference, EULA template,
  provenance, security disclosure (referenced), IP-assignment checklist
  (referenced), sale due-diligence checklist (referenced), and
  third-party notices (referenced) in [`../docs/legal/`](../docs/legal/).
- **Product documentation.** Product overview, roles, methodologies, and
  workflows in [`../docs/product/`](../docs/product/).
- **Architecture documentation.** System, data model, tenancy, security
  model, and licence architecture in [`../docs/architecture/`](../docs/architecture/).
- **Operations documentation.** Backup, incident response, and failure
  handling in [`../docs/operations/`](../docs/operations/).
- **Setup documentation.** Local, production, Vercel, database, AI,
  PDF, and custom-domain setup in [`../docs/setup/`](../docs/setup/).
- **Sales package.** Buyer-facing commercial package in
  [`../sales-assets/`](.): feature list, licence comparison, technical
  requirements, installation checklist, buyer FAQ, security overview,
  white-label overview, product limitations, release notes, marketplace
  description draft, Gumroad description draft, AppSumo submission
  draft, buyer due-diligence summary, and source-code delivery
  checklist.
- **Central product configuration.** `src/config/product.ts` provides a
  single source of truth for product name, descriptor, audit categories,
  pipeline stages, and scoring categories.
- **Environment template.** `.env.example` provides an annotated
  environment-variable template covering database, auth, AI provider,
  email, storage, audit worker, and licence validation.
- **CI workflow.** `.github/workflows/` provides a CI workflow for
  lint, type-check, build, and security scanning.
- **Northstar Digital demo spec.** Demonstration organization with five
  fictional prospects, every item clearly labelled as fictional. See
  [`../docs/product/demo-mode-guide.md`](../docs/product/demo-mode-guide.md).
- **SBOM seed.** `sbom.json` provides a software bill of materials seed
  for dependency hygiene.

### Known limitations

- The full eighteen-module product (audit engine, report builder, PDF
  generation, proposal generator, pipeline, white-labelling, AI provider
  abstraction, licensing system) is defined but not yet delivered. See
  [`../ROADMAP.md`](../ROADMAP.md) for delivery status.
- Formal trademark clearance for the "WinterVell" name has not been
  completed. See [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md).
- No independent penetration test has been performed as of this release.
- Legal documents are templates and should be reviewed by a qualified
  lawyer before commercial distribution.

### Upgrade notes

- This is the first public release; no upgrade path applies.

---

## Planned releases

Future releases follow [`../ROADMAP.md`](../ROADMAP.md). Indicative
targets (subject to change):

- **v0.2.x** — Phase 3: remove residual call-centre architecture; Phase
  4: complete product configuration and WinterVell design system.
- **v0.3.x** — Phase 5: audit engine and evidence model; Phase 6:
  reports and PDF generation.
- **v0.4.x** — Phase 7: proposal and roadmap generation; Phase 8: CRM
  and pipeline.
- **v0.5.x** — Phase 9: white-labelling and service catalogue; Phase
  10: AI provider abstraction.
- **v0.6.x** — Phase 11: licences and entitlements; Phase 12: security
  hardening and SSRF enforcement.
- **v0.7.x** — Phase 14: tests, CI/CD, and production deploy hardening;
  Phase 16: final due-diligence audit.

These targets are planning artefacts, not commitments. The roadmap is
the source of truth.

---

## Related documents

- [`../CHANGELOG.md`](../CHANGELOG.md) — machine-readable changelog.
- [`../ROADMAP.md`](../ROADMAP.md) — phased delivery roadmap.
- [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md) — honest limitations.
- [`BUYER_DUE_DILIGENCE_SUMMARY.md`](BUYER_DUE_DILIGENCE_SUMMARY.md) — buyer due-diligence summary.
