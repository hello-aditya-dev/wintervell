# IP Assignment Checklist

> This checklist ensures that intellectual property in WinterVell is properly assigned to the WinterVell owner, and that no contribution is unaccounted for. Each item is a `[ ]` checkbox with space for notes and the action required. Items marked **[BLOCKER]** must be resolved before any commercial distribution or sale of WinterVell.

The companion documents are [`PROVENANCE.md`](PROVENANCE.md) (origin of the codebase) and [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) (origin of assets).

---

## 1. WinterVell owner owns the Cloudsun source

- [ ] **WinterVell owner is the repository owner of Cloudsun.** Confirmed: the GitHub account `witejackel-eng` owns `witejackel-eng/cloudsun`. See [`PROVENANCE.md`](PROVENANCE.md). Notes: ____________________
- [ ] **Owner asserts ownership of Cloudsun source code.** The owner asserts that they own the source code of Cloudsun and have the right to authorize an internal derivative. Notes: ____________________
- [ ] **Owner has the right to create a derivative.** The owner has the right to create a separate product (WinterVell) from Cloudsun. Notes: ____________________
- [ ] **Cloudsun is treated as read-only.** The Cloudsun repository, history, deployment, environment, database, and branding are not modified by the WinterVell project. Notes: ____________________
- [ ] **No Cloudsun customer data copied.** No Cloudsun production data, customer PII, screenshots, or third-party trademarks are copied into WinterVell. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md). **[BLOCKER]** Notes: ____________________

---

## 2. Right to create a derivative

- [ ] **Derivative authorization documented.** [`PROVENANCE.md`](PROVENANCE.md) documents the derivative relationship. Notes: ____________________
- [ ] **Exact source commit recorded.** Cloudsun commit `e3879a4c232680e59e0937828b69d969e3b65b69` (2026-07-31) is the exact source commit. No earlier or later commit is incorporated. Notes: ____________________
- [ ] **Fresh Git history.** The Cloudsun `.git` was removed so WinterVell has its own fresh history. Cloudsun is not redistributed as part of WinterVell. Notes: ____________________
- [ ] **Re-licensing under WV-CSL.** Inherited code is reviewed and re-licensed under the WV-CSL. Inherited open-source dependencies remain governed by their own licences. See [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md) Section 8. Notes: ____________________

---

## 3. Relationship between `witejackel-eng` and `hello-aditya-dev`

The Cloudsun contributor history (as returned by the GitHub API at the time of snapshot) lists:

- `witejackel-eng` (owner)
- `hello-aditya-dev` (User, 2 contributions)

The relationship between these two accounts must be clarified.

- [ ] **Relationship type clarified.** Is `hello-aditya-dev`:
  - [ ] Employee of the WinterVell owner's entity?
  - [ ] Contractor engaged by the WinterVell owner?
  - [ ] Work-for-hire under a written agreement?
  - [ ] Volunteer / external contributor?
  - [ ] The same natural person as `witejackel-eng` (e.g. a secondary account)?
  Notes: ____________________
- [ ] **IP assignment in writing.** If `hello-aditya-dev` is an employee, contractor, or work-for-hire, is there a written IP-assignment agreement covering the 2 contributions? **[BLOCKER]** Notes: ____________________
- [ ] **Contributor Licence Agreement (CLA).** If `hello-aditya-dev` is an external contributor, is there a CLA in place that assigns IP to the repository owner? **[BLOCKER]** Notes: ____________________
- [ ] **Contributions reviewed.** The 2 contributions have been reviewed for: scope, originality, licence-cleanliness, and security. Notes: ____________________
- [ ] **Where assignment is unclear, contributions are flagged.** Where ownership of the 2 contributions cannot be confirmed, the contributions are flagged in [`PROVENANCE.md`](PROVENANCE.md) rather than silently retained. Notes: ____________________
- [ ] **History is not rewritten.** Git history is **not** rewritten to falsely attribute the 2 contributions to `witejackel-eng`. See [`PROVENANCE.md`](PROVENANCE.md) "Contributor history". Notes: ____________________

> **Action item.** The WinterVell owner must obtain a written IP-assignment or CLA covering `hello-aditya-dev`'s 2 contributions to Cloudsun before any commercial distribution or sale. If `hello-aditya-dev` is the same natural person as `witejackel-eng`, document that fact in writing.

---

## 4. Contractor IP assignments

- [ ] **All contractors under written agreement.** Every contractor who contributed to WinterVell or Cloudsun is or was engaged under a written contractor agreement. Notes: ____________________
- [ ] **Contractor agreements include IP assignment.** Each contractor agreement includes an IP-assignment clause covering work performed for the project. Notes: ____________________
- [ ] **Contractor agreements on file.** Contractor agreements are available for buyer review under NDA. Notes: ____________________
- [ ] **No contractor has retained IP.** No contractor has retained ownership of IP in their contributions. Notes: ____________________

---

## 5. Employee IP assignments

- [ ] **All employees under written agreement.** Every employee who contributed to WinterVell or Cloudsun is or was employed under a written employment agreement. Notes: ____________________
- [ ] **Employment agreements include IP assignment.** Each employment agreement includes an IP-assignment (or "invention assignment") clause covering work performed in the scope of employment. Notes: ____________________
- [ ] **Employee agreements on file.** Employment agreements are available for buyer review under NDA. Notes: ____________________
- [ ] **No employee has retained IP.** No employee has retained personal ownership of IP in their contributions (subject to any statutory employee-invention rights in the relevant jurisdiction). Notes: ____________________

---

## 6. AI-assisted code review

WinterVell uses AI assistance in code development. The following review steps are required for AI-assisted code before it is merged.

- [ ] **No verbatim copying.** AI-assisted code is reviewed for verbatim copying of existing copyrighted code. Where the AI output appears to reproduce a third party's code verbatim, the output is rewritten or the source is identified and licence-reviewed. Notes: ____________________
- [ ] **No licence contamination.** AI-assisted code is reviewed for licence-contaminating patterns (e.g. GPL-licensed snippets reproduced by the AI). See [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md). **[BLOCKER]** Notes: ____________________
- [ ] **No fabricated implementations.** AI-assisted code is reviewed for fabricated implementations — functions that look correct but do not actually work, or that reference non-existent APIs/libraries. Notes: ____________________
- [ ] **No incorrect attribution.** AI-assisted code is reviewed for incorrect authorship attribution (e.g. the AI reproducing a copyright header from a different project). Notes: ____________________
- [ ] **No security vulnerabilities introduced.** AI-assisted code is reviewed for security vulnerabilities (SSRF, injection, IDOR, etc.) using the same standard as human-written code. Notes: ____________________
- [ ] **Unclear authorship flagged.** Where AI-assisted code's authorship is unclear (e.g. the output may include third-party code), the gap is recorded in [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md) rather than hidden. Notes: ____________________
- [ ] **Prompt logs retained.** Where applicable, AI prompt logs are retained privately by the owner for evidentiary purposes. Notes: ____________________

---

## 7. No third-party code copied without licence

- [ ] **No code from blogs, Stack Overflow, or third-party repos** is included without a compatible licence and attribution. **[BLOCKER]** Notes: ____________________
- [ ] **No code from proprietary sources** (employer's prior projects, client code, etc.) is included without written permission. **[BLOCKER]** Notes: ____________________
- [ ] **Vendored snippets are licence-clean.** shadcn/ui snippets in `src/components/ui/**` carry the MIT licence and are modified under WV-CSL where materially transformed. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 8. Notes: ____________________
- [ ] **Code-generation tools reviewed.** Output from code generators (e.g. Prisma client, scaffold tools) is reviewed for licence implications. Generated client code from Prisma is governed by the Prisma client licence (Apache-2.0). Notes: ____________________

---

## 8. Original assets with recorded provenance

- [ ] **WinterVell logo original.** The WinterVell logo is newly created; provenance is recorded in [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 1. Notes: ____________________
- [ ] **Illustrations original or permissively licensed.** All illustrations in `public/illustrations/` are original or permissively licensed. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 4. Notes: ____________________
- [ ] **Fonts are OFL-1.1.** Fraunces and Inter are OFL-1.1. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 3 and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md). Notes: ____________________
- [ ] **Icons are Lucide (ISC).** See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 2. Notes: ____________________
- [ ] **Sample data is fictional.** Demo data is fictional and original. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 7. Notes: ____________________
- [ ] **Generated artwork has recorded provenance.** AI-generated artwork has prompt logs and generator settings retained privately by the owner. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 11. Notes: ____________________
- [ ] **Uncertain assets replaced.** Where an asset's provenance is uncertain, the asset is replaced with original, permissively-licensed, or generated work whose provenance is recorded. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) "Cross-cutting rules". Notes: ____________________

---

## 9. Trademarks

- [ ] **No third-party trademarks used without permission.** No third-party brand assets, logos, or trademarks are bundled. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) "Cross-cutting rules". **[BLOCKER]** Notes: ____________________
- [ ] **"WinterVell" trademark clearance is preliminary.** See [`brand-clearance-notes.md`](brand-clearance-notes.md). Formal clearance is recommended before major commercial investment. **[REVIEW]** Notes: ____________________
- [ ] **"Northstar Digital" demo org is fictional.** Any resemblance to a real entity is coincidental. See [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) Section 7. Notes: ____________________

---

## 10. Sign-off

- [ ] **WinterVell owner has reviewed this checklist.**
- [ ] **All BLOCKER items are resolved or disclosed in [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md).**
- [ ] **Buyer's legal counsel has reviewed this checklist and the supporting documents** ([`PROVENANCE.md`](PROVENANCE.md), [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md), [`OPEN_SOURCE_POLICY.md`](OPEN_SOURCE_POLICY.md)).
- [ ] **Written IP-assignment agreements** for all contributors (including `hello-aditya-dev`) are on file and available for buyer review under NDA.

---

*This checklist is part of the WinterVell legal package. It is a tool for the owner and the buyer; it is **not legal advice**.*
