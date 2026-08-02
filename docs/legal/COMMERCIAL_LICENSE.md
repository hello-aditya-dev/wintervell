# WinterVell Commercial Licence Reference

This document describes the commercial licence tiers offered for WinterVell and the entitlements, limits, and obligations associated with each. It is the commercial companion to the [`LICENSE`](../../LICENSE) (WinterVell Commercial Source License, WV-CSL v1.0) and the [`EULA_TEMPLATE.md`](EULA_TEMPLATE.md).

> This is a commercial reference prepared for the WinterVell product. It is not a substitute for a signed order document or legal advice tailored to the Licensor's jurisdiction.

---

## Licence tiers

### 1. Hosted Licence

| Attribute | Value |
|---|---|
| Source code provided | No |
| Hosting | Operated by the Licensor |
| Authorized Deployments | 1 hosted instance per account |
| Internal team members | As per plan |
| Client reports | Subject to fair-use limits per plan |
| White-labelling | Client-facing reports: yes; admin area: WinterVell attribution retained |
| Modification | Not applicable (no source) |
| Redistribution | Prohibited |
| Pricing model | Subscription or lifetime-account terms |

**Use case:** an agency that wants the product running immediately without hosting it.

### 2. Agency Source Licence

| Attribute | Value |
|---|---|
| Source code provided | Yes |
| Authorized Deployments | **1 production** deployment (+ reasonable non-production envs) |
| Legal entity scope | One legal business |
| Internal team members | Unlimited |
| Client reports | Unlimited, subject to fair-use terms |
| White-labelling | Client-facing materials: full; admin area: WinterVell attribution configurable per tier |
| Modification | Permitted for internal use |
| Charge clients for audits/services | Yes |
| Redistribution / resale of source | **Prohibited** |
| Competing source-code marketplace listing | **Prohibited** |

**Use case:** a single agency that wants to own, host, and customize the product for its own operations and clients.

### 3. Studio Licence

| Attribute | Value |
|---|---|
| Source code provided | Yes |
| Authorized Deployments | **Up to 5 production** deployments |
| Agency brands | Multiple |
| Client deployments | Controlled client deployments permitted |
| White-labelling | Full, including admin area |
| Public redistribution of source | **Prohibited** |
| Sublicensing | **Prohibited** unless separately authorized in writing |
| Modification | Permitted for internal and controlled-client-deployment use |

**Use case:** a studio or holding company operating multiple agency brands or running controlled deployments for clients.

---

## Graceful licence validation policy

WinterVell does **not** implement hostile or invasive licence enforcement. Specifically:

- Licence validation **fails gracefully**. If the licence server is unreachable, the product continues to operate for a reasonable offline grace period (default 14 days, configurable).
- The product **never deletes customer data** as a licence-enforcement mechanism.
- The product **never locks access without explanation**. If a licence check fails after the grace period, the product displays a clear, actionable notice and continues to permit read access and data export.
- Licence validation **never transmits private client data** (no prospect data, no audit content, no report content). Only a licence identifier, a hardware/deployment fingerprint, and a check timestamp are transmitted.
- Required licence checks are **clearly disclosed** in this document, in the `EULA_TEMPLATE.md`, and in the product's settings UI.

---

## Fair-use terms

"Unlimited client reports" is subject to fair use. Fair use means reports are generated for the Licensee's own legitimate agency clients and prospects, not resold as a standalone report-generation service, not used to operate a competing audit SaaS, and not generated in volumes that indicate abuse (guideline: more than 1,000 reports per month per Authorized Deployment warrants a conversation about a Studio Licence or a custom arrangement).

Fair use is interpreted reasonably. The Licensor will not terminate or throttle a Licensee for honest, good-faith use.

---

## What you MAY do

- Operate the product for your agency business
- Generate unlimited client reports and proposals for your own clients
- Charge your clients for audits, reports, proposals, and services
- White-label all client-facing materials with your agency brand
- Modify the source for your internal use
- Run non-production environments (dev, staging, preview) to support your Authorized Deployment
- Integrate with your own AI provider keys, email provider, and storage

## What you MAY NOT do

- Redistribute, resell, sublicense, or publicly publish the source code
- Create a competing website-audit, CRM, or agency-sales source-code product
- Apply a copyleft or open-source licence to any derivative
- List the source code on any marketplace (CodeCanyon, Gumroad source sale, AppSumo code deal, etc.) without a separate written agreement
- Bypass licence validation, entitlement, or rate-limit mechanisms
- Remove copyright or proprietary notices (except client-facing white-labelling as permitted)
- Represent the software as open source
- Use the software to train a competing product

---

## Upgrade path

Licensees may upgrade between tiers by paying the difference in fees current at the time of upgrade. Downgrades take effect at the end of the current paid term and do not entitle the Licensee to a refund of the difference.

---

## Trial

The Licensor may offer a time-limited trial of the Hosted Licence. Trials are governed by the same WV-CSL and this document, with the additional condition that the trial expires automatically at the end of the trial period. Trial data may be deleted after a short post-expiry retention window unless the Licensee converts to a paid licence.

---

## Contact

For licence questions, tier selection, custom arrangements, and Studio Licence sublicensing authorization, see [`SUPPORT.md`](../../SUPPORT.md) for current contact details.
