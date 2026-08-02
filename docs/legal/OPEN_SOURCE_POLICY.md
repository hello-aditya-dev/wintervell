# Open Source Policy

This document sets the policy for using open-source and other third-party software inside WinterVell. It applies to all dependencies, vendored snippets, build tools, runtime libraries, fonts, icons, and any other reusable component incorporated into the WinterVell repository or build output. It is the policy backbone for [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md).

WinterVell itself is **proprietary** software governed by the WinterVell Commercial Source License (WV-CSL) v1.0 — see [`LICENSE`](../../LICENSE). The use of open-source dependencies inside WinterVell does **not** make WinterVell open source. Each open-source component retains its own licence; the WV-CSL governs only WinterVell's own code, documentation, and assets.

---

## 1. Principles

1. **Prefer permissive licences.** MIT, ISC, Apache-2.0, BSD-2-Clause, BSD-3-Clause, and OFL-1.1 are preferred and permitted by default.
2. **No copyleft without explicit legal sign-off.** GPL, AGPL, LGPL, and MPL-2.0 are prohibited unless reviewed and approved in writing by the repository owner with legal counsel. (None are currently present.)
3. **No "fauxpen" licences.** SSPL, BUSL, "non-commercial", "source-available", and any licence that is not OSI-approved are prohibited.
4. **No unknown licences.** A package whose licence cannot be verified is prohibited until verified.
5. **No deprecated or unmaintained packages** in direct dependencies where a maintained alternative exists.
6. **Attribution is non-negotiable.** Every required notice is preserved exactly as the licence requires.
7. **The SBOM is the source of truth.** The dependency tree is tracked in [`sbom.json`](../../sbom.json) and reviewed against this policy on every change.

---

## 2. Allow-list of licences

| Licence | Permitted? | Notes |
|---|---|---|
| MIT | Yes | Default for most JavaScript/TypeScript packages |
| ISC | Yes | Used by `next-auth`, `lucide-react` |
| Apache-2.0 | Yes | Requires preservation of `NOTICE` files where present. Used by `prisma`, `sharp`, `class-variance-authority`, `typescript` |
| BSD-2-Clause | Yes | Used transitively (e.g. `refractor`) |
| BSD-3-Clause | Yes | |
| OFL-1.1 | Yes (fonts only) | Used by Fraunces and Inter |
| 0BSD | Yes | |
| MPL-2.0 | Conditional | File-level copyleft; permitted only with legal sign-off and file-level review. Not currently present. |
| LGPL-2.1+ | Conditional | Permitted only as a system library invoked at arm's length (e.g. libvips via `sharp`). Not present in direct dependencies. |
| GPL-2.0, GPL-3.0 | No | Prohibited without legal sign-off |
| AGPL-3.0 | No | Prohibited |
| SSPL | No | Prohibited |
| BUSL | No | Prohibited |
| "Non-commercial" / CC BY-NC | No | Prohibited |
| "Source-available" (non-OSI) | No | Prohibited |
| CC0 | Yes | Public-domain dedication |
| Unlicense | Yes | Public-domain dedication |
| Unknown / missing | No | Must be resolved before merge |

---

## 3. Prohibited categories (flagged on detection)

The CI licence scan fails the build if any direct or transitive dependency is detected in one of these categories:

- GPL family (GPL-2.0, GPL-3.0, AGPL-3.0, LGPL as direct dependency)
- SSPL, BUSL
- "Non-commercial" or "no commercial use" clauses
- "Source-available" licences that are not OSI-approved
- Packages with no licence file at all
- Packages marked as deprecated by the registry for more than 12 months without a maintained fork

Exceptions require written sign-off from the repository owner with legal review, and the exception is recorded in this file.

---

## 4. Review process for new dependencies

A new dependency (direct or devDependency) is added only after the following steps:

1. **Search for an existing alternative.** Prefer using a package already in the tree over adding a new one.
2. **Identify the licence.** Check the `LICENSE` file in the package source and the SPDX identifier in the registry. If neither is conclusive, treat as "Unknown" and reject.
3. **Check the licence against the allow-list.** If the licence is conditional (MPL-2.0, LGPL, Apache-2.0 with NOTICE file), perform the additional review.
4. **Check for known vulnerabilities.** Run a vulnerability scan against the candidate version; high or critical advisories block addition until triaged.
5. **Check maintenance status.** The package should have a recent release or active commit history. Stale packages (>2 years without activity and no maintained fork) are avoided.
6. **Record the package** in [`package.json`](../../package.json), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md), and [`sbom.json`](../../sbom.json).
7. **Update CI** if the package introduces a new licence identifier that the scanner does not yet allow.

For vendored snippets (e.g. shadcn/ui components), the same licence review applies. The snippet's licence is recorded in the file header comment where the original licence requires attribution.

---

## 5. Attribution requirements

- For MIT, ISC, BSD, 0BSD, Unlicense: preserve the copyright notice and licence text in the installed package. The published WinterVell build does not strip these.
- For Apache-2.0: preserve the licence text **and** any `NOTICE` file shipped with the package. Do not modify `NOTICE` files.
- For OFL-1.1 (fonts): preserve the copyright notice and the OFL-1.1 text alongside the font files.
- For shadcn/ui snippets: the MIT notice is preserved in the vendored file's header where present.
- For all licences: attribution text is reproduced in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

---

## 6. SBOM maintenance

- [`sbom.json`](../../sbom.json) is regenerated on every CI run from `package.json` and `bun.lock`.
- The CI workflow compares the new SBOM against the committed one; a diff indicates a dependency change and triggers a review.
- [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md) is the human-readable curation of the SBOM. It is updated whenever the SBOM changes meaningfully (new package, licence change, version change of a flagged package).

---

## 7. Contribution back to upstream

- Contributing fixes upstream to the open-source projects WinterVell depends on is **encouraged but not required**.
- Upstream contributions are made under the upstream project's own contribution terms (often a Contributor Licence Agreement). The contributor retains their own copyright in the contribution.
- Upstream contributions are made as individuals (or as the repository owner's agents), not as WinterVell-the-product. They do not transfer any WinterVell proprietary IP to the upstream project.
- When an upstream contribution is made, it is recorded in the worklog so that future reviewers can see which WinterVell-touched fixes were contributed to which projects.

---

## 8. Distinction between WinterVell proprietary code and bundled open-source

| Asset | Governing licence | Owner | Modifiable by Licensee? | Redistributable by Licensee? |
|---|---|---|---|---|
| WinterVell application code in `src/**` (except `src/components/ui/**` snippets) | WV-CSL | WinterVell owner | Yes — for internal use only | No (except as permitted by WV-CSL) |
| shadcn/ui vendored snippets in `src/components/ui/**` | MIT (snippet) + WV-CSL (modifications) | shadcn/ui (snippet) + WinterVell owner (modifications) | Yes | Yes — MIT snippet terms; WV-CSL terms apply to modifications |
| Third-party packages in `node_modules/` | Their own licences | Their respective owners | Per their licences | Per their licences |
| Fonts (Fraunces, Inter) | OFL-1.1 | Undercase Type / Rasmus Andersson | Yes | Yes — per OFL-1.1 |
| WinterVell documentation | WV-CSL | WinterVell owner | Yes — for internal use | No (except as permitted by WV-CSL) |
| WinterVell branding and design assets | WV-CSL | WinterVell owner | Conditional (white-labelling only) | No |

This distinction is the legal core of the WinterVell licensing model. The WV-CSL governs WinterVell's proprietary contribution; the bundled open-source components remain governed by their own licences. Nothing in the WV-CSL attempts to override the licences of the bundled open-source components.

---

## 9. Audit and review cadence

- **Every dependency change:** licence scan in CI; this file, [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), and [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md) are reviewed.
- **Quarterly:** full licence review of the direct dependency tree; check for new advisories, deprecations, and licence changes; verify the flagged `z-ai-web-dev-sdk` licence status.
- **Annually:** full audit including transitive dependencies; verify sub-processor terms align with this policy; refresh the SBOM format if standards have evolved.
- **On buyer due diligence:** regenerate the SBOM and confirm no prohibited licences are present; provide the private prompt logs and generator settings referenced in [`ASSET_RIGHTS_REGISTER.md`](ASSET_RIGHTS_REGISTER.md) under NDA.

---

## 10. Exceptions

| Exception | Package | Reason | Approved by | Date | Review date |
|---|---|---|---|---|---|
| z-ai-web-dev-sdk licence verification | `z-ai-web-dev-sdk` | Default demo/mock AI provider; licence file present in package but redistribution terms require confirmation with maintainer. Used unmodified, not vendored, only via `bun install`. | WinterVell owner | 2026-08 | Next quarterly review or upon maintainer clarification |

No other exceptions are in effect. New exceptions are recorded here with the approver, date, and next review date.

---

## 11. What this policy does NOT do

- This policy does **not** override the WV-CSL. Where a conflict appears, the WV-CSL governs WinterVell proprietary code and the open-source licence governs the open-source component.
- This policy does **not** authorise redistribution of WinterVell source code. Redistributing WinterVell source is governed by the WV-CSL and [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md).
- This policy does **not** authorise applying a copyleft licence to a WinterVell derivative. The WV-CSL expressly prohibits this.
- This policy does **not** constitute legal advice. The repository owner should have it reviewed by a qualified lawyer before commercial distribution.

---

*This policy is part of the WinterVell legal package.*
