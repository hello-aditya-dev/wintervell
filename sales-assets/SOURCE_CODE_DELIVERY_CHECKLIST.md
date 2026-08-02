# Source Code Delivery Checklist

> Checklist for delivering WinterVell source to a buyer (Agency Source
> or Studio tier, or an outright acquisition). This checklist is
> executed by the Licensor at the point of source delivery. It ensures
> the buyer receives a clean, complete, licence-compliant,
> deployable, and honestly-documented codebase.

Each item must be verifiable. Items that are not yet complete must be
flagged explicitly to the buyer — do not silently omit.

---

## 1. Private repository access

- [ ] Confirm the buyer's GitHub account or organization is identified
      and authorized.
- [ ] Grant read access (or transfer ownership, in an outright
      acquisition) to the private WinterVell repository.
- [ ] Confirm the buyer can clone at the agreed release tag.
- [ ] Record the commit SHA delivered in the sale record.

## 2. Fresh Git history

- [ ] Confirm the repository has its own fresh Git history (no Cloudsun
      history inherited).
- [ ] Confirm the repository's first commit message and date are
      consistent with the WinterVell creation record.
- [ ] Confirm no Cloudsun production secrets, environment files, or
      customer data are present in history.

## 3. Licence file

- [ ] `LICENSE` contains the WinterVell Commercial Source License
      (WV-CSL) v1.0 in full.
- [ ] The buyer's tier (Agency Source or Studio) and authorized
      deployment count are recorded in the sale record.
- [ ] If the delivery is an outright acquisition, the acquisition
      agreement is attached and referenced.

## 4. README and root documentation

- [ ] `README.md` is present and references the buyer's tier
      correctly.
- [ ] `SECURITY.md`, `CHANGELOG.md`, `CONTRIBUTING.md`,
      `CODE_OF_CONDUCT.md`, `SUPPORT.md`, and `ROADMAP.md` are present
      and current.

## 5. Provenance

- [ ] `docs/legal/PROVENANCE.md` is present and current.
- [ ] The Cloudsun source commit and contributor history are recorded.
- [ ] The IP-assignment status is recorded (including any open items).
- [ ] The conversion audit in `docs/audit/` is present.

## 6. Legal documentation

- [ ] `docs/legal/COMMERCIAL_LICENSE.md` is present.
- [ ] `docs/legal/EULA_TEMPLATE.md` is present.
- [ ] `docs/legal/SECURITY_DISCLOSURE.md` is present.
- [ ] `docs/legal/IP_ASSIGNMENT_CHECKLIST.md` is present (or referenced).
- [ ] `docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md` is present.
- [ ] `docs/legal/THIRD_PARTY_NOTICES.md` is present (or referenced).
- [ ] `docs/legal/DEPENDENCY_LICENSE_REPORT.md` is present (or
      referenced).
- [ ] All legal documents are clearly marked as templates requiring
      lawyer review.

## 7. Software bill of materials (SBOM)

- [ ] `sbom.json` is present and reflects the delivered dependency
      tree.
- [ ] No copyleft (GPL, AGPL) dependencies are present in the
      WinterVell proprietary code path.
- [ ] The dependency licence report is consistent with the SBOM.

## 8. Asset register

- [ ] An asset register is provided listing: source code, documentation,
      design assets (logo, colour tokens, typography), demo data,
      environment template, CI workflow, and configuration files.
- [ ] Each asset's ownership status (WinterVell original, inherited
      from Cloudsun, third-party open source, generated boilerplate) is
      recorded.

## 9. Environment template

- [ ] `.env.example` is present and annotated.
- [ ] No real secrets are present in `.env.example` or anywhere in the
      repository or its history.
- [ ] A secrets-rotation guide is included for any value that may have
      been used during development.

## 10. Demo credentials and demo data

- [ ] Demo credentials for the Northstar Digital organization are
      provided.
- [ ] Demo data is clearly labelled as fictional.
- [ ] Demo data can be reset to defaults.
- [ ] No real customer data is present in demo data.

## 11. Deployment runbook

- [ ] A deployment runbook is provided covering: clone, install, env
      configuration, database setup, AI provider (optional), email,
      object storage, audit worker, build, deploy, health verification,
      and branding configuration.
- [ ] The runbook references `sales-assets/INSTALLATION_CHECKLIST.md`
      and `docs/setup/`.

## 12. AI configuration

- [ ] The AI provider abstraction is documented (OpenAI-compatible,
      Anthropic, mock).
- [ ] Bring-your-own-key configuration is documented.
- [ ] The mock provider is clearly the default when no real provider is
      configured.
- [ ] Token and cost logging is documented.

## 13. Licence validation seed

- [ ] The buyer's licence identifier is issued and recorded.
- [ ] The deployment fingerprint mechanism is documented.
- [ ] The 14-day offline grace behaviour is documented.
- [ ] The product's "never deletes data" enforcement policy is
      documented.

## 14. Support terms

- [ ] The support tier (included per plan, per support agreement, or
      custom) is recorded in the sale record.
- [ ] Support channels (email placeholder, in-app) are documented in
      `SUPPORT.md`.
- [ ] Response times, scope, and exclusions are documented.

## 15. Known issues register

- [ ] A known-issues register is provided, referencing
      `sales-assets/PRODUCT_LIMITATIONS.md` and
      `docs/legal/SECURITY_DISCLOSURE.md`.
- [ ] Open roadmap items are referenced from `ROADMAP.md`.
- [ ] Any tier-specific caveats (e.g. admin-area attribution rules) are
      documented.

## 16. Verification

- [ ] The buyer can clone, install, configure, build, and run the
      product from the delivered repository.
- [ ] The buyer can run the demo seed and see Northstar Digital.
- [ ] The buyer can run an audit, generate a report, generate a PDF,
      and create a proposal using the demo data.
- [ ] The licence validation passes (or enters the documented grace
      behaviour).
- [ ] The buyer has acknowledged receipt of all items above in writing.

---

## Related documents

- [`INSTALLATION_CHECKLIST.md`](INSTALLATION_CHECKLIST.md)
- [`BUYER_DUE_DILIGENCE_SUMMARY.md`](BUYER_DUE_DILIGENCE_SUMMARY.md)
- [`../docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md)
- [`../docs/legal/COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md)
- [`../SUPPORT.md`](../SUPPORT.md)
- [`../ROADMAP.md`](../ROADMAP.md)
