# Buyer Handover Checklist

> This checklist governs the handover of WinterVell from the seller (WinterVell owner) to a buyer. Each item is a `[ ]` checkbox with an **owner** field (seller / buyer / joint) and notes. Items marked **[BLOCKER]** must be completed before handover is considered complete.

The companion documents are [`PROVENANCE.md`](PROVENANCE.md), [`SALE_DUE_DILIGENCE_CHECKLIST.md`](SALE_DUE_DILIGENCE_CHECKLIST.md), [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md), [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md), and [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md).

---

## 1. Source delivery

- [ ] **Private repository access granted.** Buyer is granted access to the WinterVell private repository at the agreed revision. **Owner:** seller. Notes: ____________________
- [ ] **Fresh Git history preserved.** The repository's Git history is the WinterVell fresh history; no Cloudsun history is mixed in. See [`PROVENANCE.md`](PROVENANCE.md). **Owner:** seller. Notes: ____________________
- [ ] **PROVENANCE.md delivered.** The buyer has read and accepted [`PROVENANCE.md`](PROVENANCE.md). **Owner:** joint. Notes: ____________________
- [ ] **Source commit recorded.** The exact WinterVell commit handed over is recorded: ____________________ **Owner:** seller.
- [ ] **Repository not publicly mirrored.** The repository is transferred to the buyer's private account; no public mirror is created during handover. **Owner:** seller. **[BLOCKER]** Notes: ____________________
- [ ] **`bun install` succeeds.** The buyer can run `bun install` and obtain the resolved dependency tree matching `bun.lock`. **Owner:** buyer. Notes: ____________________
- [ ] **Build succeeds.** `bun run build` completes without errors on the buyer's environment. **Owner:** buyer. Notes: ____________________
- [ ] **Lint and type-check pass.** `bun run lint` and the TypeScript type-check pass. **Owner:** buyer. Notes: ____________________

---

## 2. Legal package

- [ ] **All `docs/legal/` documents delivered.** The buyer has received:
  - [ ] [`LICENSE`](../../LICENSE) (WV-CSL v1.0)
  - [ ] [`PROVENANCE.md`](PROVENANCE.md)
  - [ ] [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md)
  - [ ] [`EULA_TEMPLATE.md`](EULA_TEMPLATE.md)
  - [ ] [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)
  - [ ] [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md)
  - [ ] [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md)
  - [ ] [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md)
  - [ ] [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md)
  - [ ] [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md)
  - [ ] [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md)
  - [ ] [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md)
  - [ ] [`SALE_DUE_DILIGENCE_CHECKLIST.md`](SALE_DUE_DILIGENCE_CHECKLIST.md)
  - [ ] [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md)
  - [ ] [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md)
  - [ ] [`BUYER_HANDOVER_CHECKLIST.md`](BUYER_HANDOVER_CHECKLIST.md)
  - [ ] [`brand-clearance-notes.md`](brand-clearance-notes.md)
  **Owner:** seller.
- [ ] **Templates flagged for legal review.** The buyer acknowledges that the templates require legal review in their jurisdiction. **Owner:** buyer. Notes: ____________________
- [ ] **IP-assignment agreements on file.** Written IP-assignment agreements for all contributors (including `hello-aditya-dev`) are available to the buyer under NDA. See [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md). **Owner:** seller. **[BLOCKER]** Notes: ____________________

---

## 3. SBOM and asset register

- [ ] **`sbom.json` delivered and current.** The SBOM matches `package.json` and `bun.lock` at the handover commit. **Owner:** seller. Notes: ____________________
- [ ] **`DEPENDENCY_LICENSE_REPORT.md` reviewed.** The buyer has reviewed the licence report and accepted the flagged `z-ai-web-dev-sdk` verification status (or required resolution before close). **Owner:** joint. Notes: ____________________
- [ ] **`ASSET_RIGHTS_REGISTER.md` reviewed.** The buyer has reviewed the asset register and accepted the Open Items. **Owner:** joint. Notes: ____________________
- [ ] **AI prompt logs and generator settings** for generated artwork made available to the buyer under NDA. **Owner:** seller. Notes: ____________________

---

## 4. Demo credentials and demo data

- [ ] **Demo credentials provided.** Buyer has credentials to a running demo deployment. **Owner:** seller. Notes: ____________________
- [ ] **Demo data clearly fictional.** The "Northstar Digital" demo org and its five fictional prospects are documented as fictional. See [`docs/product/demo-mode-guide.md`](../product/demo-mode-guide.md). **Owner:** seller. Notes: ____________________
- [ ] **Mock provider clearly labelled.** The Mock AI provider is labelled in the UI. **Owner:** seller. Notes: ____________________
- [ ] **No production data in demo.** The demo deployment does not contain real customer data. **Owner:** seller. **[BLOCKER]** Notes: ____________________

---

## 5. Deployment runbook

- [ ] **Deployment runbook delivered.** See [`docs/setup/`](../setup/) and [`docs/operations/`](../operations/). **Owner:** seller. Notes: ____________________
- [ ] **Environment template delivered.** `.env.example` is annotated and complete. **Owner:** seller. Notes: ____________________
- [ ] **Production database setup documented.** PostgreSQL setup, migration, and rollback steps are documented. **Owner:** seller. Notes: ____________________
- [ ] **Vercel deployment documented.** Vercel project setup is documented (separate from Cloudsun's Vercel project). **Owner:** seller. Notes: ____________________
- [ ] **Custom-domain setup documented.** DNS, TLS, and Caddyfile/reverse-proxy setup is documented. **Owner:** seller. Notes: ____________________

---

## 6. AI provider configuration

- [ ] **Provider abstraction documented.** See [`docs/architecture/ai-provider-abstraction.md`](../architecture/ai-provider-abstraction.md) and [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md). **Owner:** seller. Notes: ____________________
- [ ] **BYO key configuration documented.** How to configure OpenAI-compatible, Anthropic, and z-ai-web-dev-sdk providers with the Licensee's own API keys. **Owner:** seller. Notes: ____________________
- [ ] **Mock provider configuration documented.** How to enable the Mock provider for demo and testing. **Owner:** seller. Notes: ____________________
- [ ] **Token/cost logging documented.** How token and cost logs are captured and surfaced. **Owner:** seller. Notes: ____________________
- [ ] **Prompt versioning documented.** Where prompt templates live, how they are versioned, and how changes are tracked. **Owner:** seller. Notes: ____________________

---

## 7. Licence validation keys / seed

- [ ] **Licence validation system documented.** See [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md) "Graceful licence validation policy". **Owner:** seller. Notes: ____________________
- [ ] **Licence seed/key generation process documented.** How a Licence ID and validation key are generated for a Licensee. **Owner:** seller. Notes: ____________________
- [ ] **Offline grace period configuration documented.** Default 14 days, configurable. **Owner:** seller. Notes: ____________________
- [ ] **Validation endpoint documented.** The endpoint the deployment calls for licence validation, and the data it transmits (licence identifier, deployment fingerprint, check timestamp — **no** private client data). **Owner:** seller. Notes: ____________________

---

## 8. Incident response runbook

- [ ] **Incident response runbook delivered.** See [`docs/operations/`](../operations/). **Owner:** seller. Notes: ____________________
- [ ] **Severity levels documented.** Notes: ____________________
- [ ] **On-call contacts documented.** Notes: ____________________
- [ ] **Vulnerability disclosure policy delivered.** See [`SECURITY.md`](../../SECURITY.md). **Owner:** seller. Notes: ____________________
- [ ] **Security reporting channel documented.** Notes: ____________________

---

## 9. Backup / restore runbook

- [ ] **Backup runbook delivered.** See [`docs/operations/`](../operations/). **Owner:** seller. Notes: ____________________
- [ ] **Backup frequency and retention documented.** Default 30 days rolling. **Owner:** seller. Notes: ____________________
- [ ] **Restore procedure documented.** Restore from backup is tested quarterly. **Owner:** seller. Notes: ____________________
- [ ] **Object-storage backup documented.** Screenshots, PDFs, and evidence blobs. **Owner:** seller. Notes: ____________________
- [ ] **Backup encryption documented.** Backups are encrypted at rest where supported by the provider. **Owner:** seller. Notes: ____________________

---

## 10. Trademark file

- [ ] **`brand-clearance-notes.md` delivered.** Preliminary informal trademark review. **Owner:** seller. Notes: ____________________
- [ ] **Formal trademark clearance status documented.** Whether formal clearance has been initiated; if not, the buyer accepts the risk or commissions formal clearance. **Owner:** joint. **[REVIEW]** Notes: ____________________
- [ ] **Domain availability status documented.** `wintervell.com`, `.io`, `.app` availability. **Owner:** joint. **[REVIEW]** Notes: ____________________
- [ ] **Logo source files delivered.** Vector source for the WinterVell logo and mark. **Owner:** seller. Notes: ____________________

---

## 11. Customer list

- [ ] **Customer list provided (none — pre-launch).** WinterVell is pre-launch; there are no customers to transfer. **Owner:** seller. **[BLOCKER]** Notes: ____________________
- [ ] **Trial users (if any) documented.** If any trial users exist, they are listed with contact and trial-expiry details. **Owner:** seller. Notes: ____________________
- [ ] **No outstanding customer obligations.** No paid customers, no pending refunds, no support tickets. **Owner:** seller. Notes: ____________________

---

## 12. Known issues register

- [ ] **`KNOWN_LIMITATIONS.md` reviewed and accepted.** **Owner:** joint. Notes: ____________________
- [ ] **Open Items in [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) reviewed and accepted.** **Owner:** joint. Notes: ____________________
- [ ] **`z-ai-web-dev-sdk` licence verification status accepted.** The buyer accepts the flagged status or requires resolution before close. **Owner:** joint. **[REVIEW]** Notes: ____________________
- [ ] **Outstanding security items documented.** See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) Section 24 "What is implemented vs planned". **Owner:** joint. Notes: ____________________
- [ ] **`hello-aditya-dev` IP-assignment status documented.** See [`IP_ASSIGNMENT_CHECKLIST.md`](IP_ASSIGNMENT_CHECKLIST.md). **Owner:** joint. **[BLOCKER]** Notes: ____________________

---

## 13. Post-sale support terms

- [ ] **Post-sale support terms documented in the sale agreement.** Duration, scope, response times, channels. **Owner:** joint. Notes: ____________________
- [ ] **Knowledge-transfer sessions scheduled.** Seller commits to [N] hours of knowledge transfer with the buyer's engineering team. **Owner:** joint. Notes: ____________________
- [ ] **Transition period for licence validation endpoint.** If the buyer will operate the licence-validation endpoint, the transition plan is documented. **Owner:** joint. Notes: ____________________
- [ ] **Non-compete / non-solicitation clauses** documented in the sale agreement (if any). **Owner:** joint. Notes: ____________________

---

## 14. Sign-off

- [ ] **Seller confirms all BLOCKER items resolved or disclosed.**
- [ ] **Buyer confirms acceptance of all disclosed limitations.**
- [ ] **Sale agreement signed** by both parties.
- [ ] **Repository access transferred** to the buyer's private account.
- [ ] **Handover complete** — date: ____________________

---

*This checklist is part of the WinterVell legal package. It is a handover tool, not a substitute for the parties' own legal counsel.*
