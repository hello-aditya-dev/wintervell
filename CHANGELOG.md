# Changelog

All notable changes to WinterVell are documented in this file. The
format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project adheres to [Semantic Versioning](https://semver.org/).

WinterVell is a proprietary commercial product governed by the
WinterVell Commercial Source License (WV-CSL) v1.0 — see
[`LICENSE`](LICENSE). Buyer-facing release notes are in
[`sales-assets/RELEASE_NOTES.md`](sales-assets/RELEASE_NOTES.md).

---

## [Unreleased]

Tracked in [`ROADMAP.md`](ROADMAP.md).

---

## [0.1.0] — 2026-08-02

Foundation release. Commercially-defensible repository, legal, and
documentation scaffold for the WinterVell AI Website Audit and Agency
Sales Platform.

### Added

- **Repository.** Independent private repository with its own fresh Git
  history, its own README, its own package metadata, its own
  environment-variable template, its own deployment configuration, and
  its own branding.
- **Licence.** WinterVell Commercial Source License (WV-CSL) v1.0 in
  [`LICENSE`](LICENSE). WinterVell is proprietary commercial software;
  it is not open source.
- **Provenance.** Full provenance record in
  [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md), including the
  exact source commit, the contributor history, the relationship to
  Cloudsun, and the systems inherited vs newly created.
- **Conversion audit.** Cloudsun-to-WinterVell conversion audit in
  [`docs/audit/cloudsun-to-wintervell-conversion-audit.md`](docs/audit/cloudsun-to-wintervell-conversion-audit.md).
- **Legal suite.** Commercial licence reference, EULA template,
  provenance, security disclosure (referenced), IP-assignment checklist
  (referenced), sale due-diligence checklist (referenced), and
  third-party notices (referenced) in [`docs/legal/`](docs/legal/).
- **Product documentation.** Product overview, roles, methodologies, and
  workflows in [`docs/product/`](docs/product/).
- **Architecture documentation.** System, data model, tenancy, security
  model, and licence architecture in [`docs/architecture/`](docs/architecture/).
- **Operations documentation.** Backup, incident response, and failure
  handling in [`docs/operations/`](docs/operations/).
- **Setup documentation.** Local, production, Vercel, database, AI,
  PDF, and custom-domain setup in [`docs/setup/`](docs/setup/).
- **Sales package.** Buyer-facing commercial package in
  [`sales-assets/`](sales-assets/): product feature list, licence
  comparison, technical requirements, installation checklist, buyer
  FAQ, security overview, white-label overview, product limitations,
  release notes, marketplace description draft, Gumroad description
  draft, AppSumo submission draft, buyer due-diligence summary, and
  source-code delivery checklist.
- **Central product configuration.** `src/config/product.ts` provides a
  single source of truth for product name, descriptor, audit
  categories, pipeline stages, and scoring categories.
- **Environment template.** `.env.example` provides an annotated
  environment-variable template covering database, auth, AI provider,
  email, storage, audit worker, and licence validation.
- **CI workflow.** `.github/workflows/` provides a CI workflow for
  lint, type-check, build, and security scanning.
- **Northstar Digital demo spec.** Demonstration organization with five
  fictional prospects, every item clearly labelled as fictional. See
  [`docs/product/demo-mode-guide.md`](docs/product/demo-mode-guide.md).
- **SBOM seed.** `sbom.json` provides a software bill of materials seed
  for dependency hygiene.
- **Root documentation.** `SECURITY.md`, `CHANGELOG.md`,
  `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, and
  `ROADMAP.md` are present and current.

### Known limitations

- The full eighteen-module product (audit engine, report builder, PDF
  generation, proposal generator, pipeline, white-labelling, AI
  provider abstraction, licensing system) is defined but not yet
  delivered. See [`ROADMAP.md`](ROADMAP.md) for delivery status.
- Formal trademark clearance for the "WinterVell" name has not been
  completed. See [`sales-assets/PRODUCT_LIMITATIONS.md`](sales-assets/PRODUCT_LIMITATIONS.md).
- No independent penetration test has been performed as of this
  release.
- Legal documents are templates and should be reviewed by a qualified
  lawyer before commercial distribution.

### Upgrade notes

- This is the first public release; no upgrade path applies.

---

## Versioning policy

- `MAJOR` (e.g. `1.0.0`): incompatible changes to the product's public
  API, data model, or licence.
- `MINOR` (e.g. `0.2.0`): new modules or features, backward-compatible.
- `PATCH` (e.g. `0.1.1`): fixes and small refinements, backward-compatible.

The `0.x.x` series is the foundation and early-delivery series;
breaking changes may occur between minor versions until `1.0.0`.

---

## Related documents

- [`ROADMAP.md`](ROADMAP.md) — phased delivery roadmap.
- [`sales-assets/RELEASE_NOTES.md`](sales-assets/RELEASE_NOTES.md) — buyer-facing release notes.
- [`LICENSE`](LICENSE) — WinterVell Commercial Source License (WV-CSL) v1.0.
- [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md) — provenance.

[Unreleased]: https://github.com/wintervell/wintervell/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/wintervell/wintervell/releases/tag/v0.1.0
