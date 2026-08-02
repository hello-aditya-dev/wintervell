# Sale Due Diligence Checklist

> This checklist is for a buyer performing technical, legal, and commercial due diligence on WinterVell. Each item is a `[ ]` checkbox with space for notes. Items marked **[BLOCKER]** must be resolved before closing; items marked **[REVIEW]** should be reviewed but may not block closing.

The seller's goal is to make every item checkable honestly. Where an item cannot be checked, it is disclosed in [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md) rather than hidden.

---

## 1. Corporate / legal

- [ ] **Legal entity confirmed.** The Licensor is a identifiable legal entity (or natural person) with the right to license WinterVell. Notes: ____________________
- [ ] **Ownership of WinterVell asserted.** The repository owner (`witejackel-eng`) asserts ownership of the WinterVell codebase. See [`PROVENANCE.md`](PROVENANCE.md). Notes: ____________________
- [ ] **Ownership of Cloudsun source confirmed.** The WinterVell owner also owns the Cloudsun source from which WinterVell derives, and has the right to create an independent derivative. See [`PROVENANCE.md`](PROVENANCE.md) Section "Ownership". Notes: ____________________
- [ ] **IP assignment for `hello-aditya-dev`.** The relationship between `witejackel-eng` (repo owner) and `hello-aditya-dev` (2 contributions in Cloudsun history) is clarified: work-for-hire / contractor / employee / volunteer, and whether IP is assigned in writing. See [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md). **[BLOCKER]** Notes: ____________________
- [ ] **Contributor agreements in place.** All contributors to WinterVell and Cloudsun have signed contributor licence assignments or are employees/work-for-hire. Notes: ____________________
- [ ] **Entity formation documents available** under NDA. Notes: ____________________
- [ ] **No outstanding liens, encumbrances, or third-party claims** on WinterVell IP. Notes: ____________________
- [ ] **Governing law and jurisdiction** confirmed for the WV-CSL and EULA. Notes: ____________________
- [ ] **Trademarks.** Formal trademark clearance for "WinterVell" is in progress or planned. See [`brand-clearance-notes.md`](brand-clearance-notes.md). **[REVIEW]** Notes: ____________________
- [ ] **Domain names.** `wintervell.com`, `.io`, `.app` availability confirmed. **[REVIEW]** Notes: ____________________

---

## 2. Code

- [ ] **Provenance documented.** [`PROVENANCE.md`](PROVENANCE.md) records the exact Cloudsun source commit, the conversion process, and the major systems inherited vs newly created. Notes: ____________________
- [ ] **Fresh Git history.** WinterVell has its own Git history; the Cloudsun `.git` was removed. Cloudsun is read-only source material. Notes: ____________________
- [ ] **Licence hygiene.** Every file is governed by either the WV-CSL (WinterVell proprietary) or its original open-source licence. See [`LICENSE`](../../LICENSE), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md). Notes: ____________________
- [ ] **No copyleft contamination.** No GPL/AGPL/LGPL/MPL/SSPL/BUSL/non-commercial/source-available package in the direct dependency tree. See [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md) "Flags" section. **[BLOCKER]** Notes: ____________________
- [ ] **No copied third-party code without licence.** No code copied from a blog, Stack Overflow, or a third-party repo without a compatible licence and attribution. Notes: ____________________
- [ ] **No AI-fabricated evidence.** AI is used only for assistive tasks; findings, evidence, and screenshots come from the audit engine and the Agency user, never fabricated by AI. See [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md). **[BLOCKER]** Notes: ____________________
- [ ] **AI-assisted code reviewed.** AI-assisted code is reviewed for verbatim copying, licence contamination, security vulnerabilities, and fabricated implementations. See [`PROVENANCE.md`](PROVENANCE.md) "Honesty statement". Notes: ____________________
- [ ] **CI passing.** Lint, type-check, build, and security workflows pass on the main branch. Notes: ____________________
- [ ] **Secret scan clean.** CI secret scan reports no committed secrets. **[BLOCKER]** Notes: ____________________
- [ ] **SBOM present and current.** [`sbom.json`](../../sbom.json) exists and matches `package.json` and `bun.lock`. Notes: ____________________

---

## 3. Security

- [ ] **SSRF protection implemented.** Block-list covers loopback, private IPv4, link-local IPv6, cloud metadata, internal hostnames, non-HTTP protocols; redirect re-validation; DNS-rebinding defence; size/time limits; isolated worker. See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Section 5. **[BLOCKER]** Notes: ____________________
- [ ] **Authorization (RBAC + organisationId scoping) verified.** Cross-tenant IDOR attempts are rejected at the data-access layer. See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Sections 3–4. **[BLOCKER]** Notes: ____________________
- [ ] **Tenant isolation tested.** Automated tests cover cross-organisation access attempts. Notes: ____________________
- [ ] **Secrets scan in CI.** Secret scanning runs on every push. Notes: ____________________
- [ ] **Dependency vulnerability scan in CI.** High/critical advisories block merge. Notes: ____________________
- [ ] **Security headers present.** `X-Frame-Options`, `X-Content-Type-Options`, HSTS, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP implemented; strict CSP planned. See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Section 21. Notes: ____________________
- [ ] **Authentication secure.** NextAuth v4, hashed passwords, signed sessions, same-site cookies, CSRF tokens. Notes: ____________________
- [ ] **Prompt-injection boundaries.** System/user content separation, structured-output validation, human review gate. See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Sections 11–12. Notes: ____________________
- [ ] **Vulnerability disclosure policy published.** [`SECURITY.md`](../../SECURITY.md) documents the reporting channel and safe-harbour terms. Notes: ____________________
- [ ] **No "perfect security" claims.** Documentation avoids overbroad security claims. See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Section 25. Notes: ____________________

---

## 4. Data

- [ ] **No customer data in repo.** No Cloudsun production data, real customer PII, real screenshots of third-party sites, or real API keys committed. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md). **[BLOCKER]** Notes: ____________________
- [ ] **Demo data clearly fictional.** The "Northstar Digital" demo org and its five prospects are fictional; documentation labels them as such. Notes: ____________________
- [ ] **Retention controls documented.** Defaults and configurability disclosed. See [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) Section 7. Notes: ____________________
- [ ] **Deletion controls documented.** Per-record and bulk delete; object-storage purge; backup aging. See [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) Section 8. Notes: ____________________
- [ ] **Data export available.** Licensees can export their data (prospects, audits, reports) in a structured format. Notes: ____________________
- [ ] **No covert tracking.** No third-party analytics, advertising pixels, or session-replay in client-facing reports. See [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) and [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md). Notes: ____________________
- [ ] **Backups encrypted** at rest. Notes: ____________________
- [ ] **Licence enforcement does not delete data.** See [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md) "Graceful licence validation policy". **[BLOCKER]** Notes: ____________________

---

## 5. Compliance

- [ ] **Privacy notice template provided.** [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) is a template for Licensees to adapt. Notes: ____________________
- [ ] **Data-processing overview provided.** [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) describes flows, storage, sub-processors (template), retention, deletion, transfers. Notes: ____________________
- [ ] **DPA available for Hosted Licence.** A separate data-processing agreement is available for Hosted Licence deployments. **[REVIEW]** Notes: ____________________
- [ ] **AI usage disclosed.** [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md) documents AI tasks, provider abstraction, BYO key, training policy, mock provider labelling. Notes: ____________________
- [ ] **Export control / sanctions.** WV-CSL Section 13 and EULA Section 13 cover export-control compliance. Notes: ____________________
- [ ] **No WCAG / legal certification claimed.** Documentation is explicit that WinterVell does not certify WCAG, SEO ranking, or AI-visibility ranking. **[BLOCKER]** Notes: ____________________
- [ ] **Legal docs marked as templates requiring lawyer review.** Notes: ____________________

---

## 6. Commercial

- [ ] **Tier definitions documented.** Hosted, Agency Source, Studio. See [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md). Notes: ____________________
- [ ] **EULA template provided.** [`EULA_TEMPLATE.md`](EULA_TEMPLATE.md) is a template requiring legal finalisation. Notes: ____________________
- [ ] **Pricing defined** in the order document or sales-assets package. Notes: ____________________
- [ ] **Fair-use terms documented.** See [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md) "Fair-use terms". Notes: ____________________
- [ ] **Graceful licence validation policy documented.** Notes: ____________________
- [ ] **Upgrade/downgrade path documented.** Notes: ____________________
- [ ] **Trial terms documented.** Notes: ____________________

---

## 7. Operations

- [ ] **Deployment runbook exists.** See [`docs/operations/`](../operations/) and [`docs/setup/`](../setup/). Notes: ____________________
- [ ] **Backup/restore runbook exists** and is tested. Notes: ____________________
- [ ] **Incident response runbook exists.** Notes: ____________________
- [ ] **CI/CD workflow exists** and passes. See `.github/workflows/`. Notes: ____________________
- [ ] **Monitoring and alerting** documented. Notes: ____________________
- [ ] **On-call / support contacts** documented in [`SUPPORT.md`](../../SUPPORT.md). Notes: ____________________

---

## 8. Documentation

- [ ] **README.md** is accurate and complete. Notes: ____________________
- [ ] **Setup instructions** are complete (local, production, Vercel, DB, AI, PDF, domains). Notes: ____________________
- [ ] **Architecture documentation** exists (system, data model, tenancy, security, licence). Notes: ____________________
- [ ] **Operations documentation** exists. Notes: ____________________
- [ ] **Product documentation** exists (overview, roles, methodologies, workflows, demo-mode guide). Notes: ____________________
- [ ] **Legal documentation** is complete (this checklist, provenance, licences, disclosures, asset register, SBOM). Notes: ____________________
- [ ] **Sales package** exists (`sales-assets/`). Notes: ____________________

---

## 9. Demo

- [ ] **Demo data clearly labelled** as fictional. Notes: ____________________
- [ ] **Mock provider clearly labelled** when active. See [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md) Section 12. Notes: ____________________
- [ ] **No implication of real payment / real audit / real AI call** in demo mode. Notes: ____________________
- [ ] **Demo org documented.** "Northstar Digital" with five fictional prospects. See [`docs/product/demo-mode-guide.md`](../product/demo-mode-guide.md). Notes: ____________________

---

## 10. Known limitations disclosed

- [ ] **`KNOWN_LIMITATIONS.md` reviewed.** Buyer has read and accepted the listed limitations. Notes: ____________________
- [ ] **ROADMAP reviewed.** Buyer understands what is implemented vs planned. See [`ROADMAP.md`](../../ROADMAP.md). Notes: ____________________
- [ ] **No "full legal compliance", "perfect security", "guaranteed SEO", "WCAG certification" claims** anywhere in the product or documentation. **[BLOCKER]** Notes: ____________________
- [ ] **Trademark clearance is preliminary** (see [`brand-clearance-notes.md`](brand-clearance-notes.md)); buyer accepts the risk or commissions formal clearance. Notes: ____________________
- [ ] **z-ai-web-dev-sdk licence verification pending.** Buyer accepts the flagged status or requires resolution before close. **[REVIEW]** Notes: ____________________

---

## 11. Sign-off

- [ ] Buyer's legal counsel has reviewed the WV-CSL, EULA template, COMMERCIAL_LICENSE.md, and the templates in [`docs/legal/`](.).
- [ ] Buyer's security reviewer has reviewed [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) and the security-model architecture doc.
- [ ] Buyer's privacy reviewer has reviewed [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) and [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md).
- [ ] Buyer's engineering reviewer has reviewed [`PROVENANCE.md`](PROVENANCE.md), [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md), and [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md).
- [ ] Buyer has reviewed [`BUYER_HANDOVER_CHECKLIST.md`](BUYER_HANDOVER_CHECKLIST.md) and confirmed the handover plan.

---

*This checklist is part of the WinterVell legal package. It is a buyer's tool, not a substitute for the buyer's own legal, security, and financial advice.*
