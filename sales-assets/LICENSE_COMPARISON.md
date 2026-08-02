# Licence Comparison — Hosted vs Agency Source vs Studio

> Side-by-side comparison of the three WinterVell commercial licence tiers.
> The authoritative legal text is the [WinterVell Commercial Source License
> (WV-CSL) v1.0](../LICENSE) and the [Commercial Licence Reference](../docs/legal/COMMERCIAL_LICENSE.md).
> This document is a plain-language summary for buyers; in any conflict,
> the licence text controls.

WinterVell is **proprietary commercial software**. It is not open source.
Every tier grants the right to operate the product for your own agency
business and to charge your clients for audits, reports, proposals, and
services. The tiers differ in who hosts the software, whether source is
provided, how many production deployments are authorized, and how far
white-labelling and modification extend.

---

## Comparison table

| Capability | Hosted | Agency Source | Studio |
|---|---|---|---|
| Source code provided | No | Yes | Yes |
| Hosting | Operated by the Licensor | You host | You host |
| Authorized production deployments | 1 hosted instance per account | 1 production (+ reasonable non-production envs) | Up to 5 production |
| Legal-entity scope | One account | One legal business | Multiple agency brands / holding company |
| Internal team members | As per plan | Unlimited | Unlimited |
| Client-facing white-label (reports, proposals, shared URLs) | Yes | Yes | Yes |
| Admin-area white-label (WinterVell attribution removed) | No | Configurable per tier | Yes |
| Custom domain for client-facing URLs | Yes | Yes | Yes |
| Modification of source | Not applicable (no source) | Permitted for internal use | Permitted for internal and controlled-client use |
| Charge clients for audits and services | Yes | Yes | Yes |
| Multiple agency brands on one deployment | No | No (one legal business) | Yes |
| Controlled client deployments | No | No | Yes (with written authorization) |
| Sublicensing | No | No | Only with separate written authorization |
| Redistribution / resale of source | Prohibited | Prohibited | Prohibited |
| Listing on a source-code marketplace | Prohibited | Prohibited | Prohibited |
| Applying a copyleft or open-source licence to derivatives | Prohibited | Prohibited | Prohibited |
| Representing the software as open source | Prohibited | Prohibited | Prohibited |
| Graceful offline licence grace (default 14 days) | Yes | Yes | Yes |
| Support | Included per plan | Per support agreement | Per support agreement |
| Price tier | Subscription or lifetime-account terms | TBD / custom | TBD / custom (sublicensing negotiable) |

---

## What you MAY do (all tiers)

- Operate the product for your agency business.
- Generate client reports and proposals for your own clients and prospects.
- Charge your clients for audits, reports, proposals, and services.
- White-label all client-facing materials with your agency brand.
- Run non-production environments (dev, staging, preview) in support of
  your authorized deployment.
- Integrate with your own AI provider keys, email provider, and object
  storage.
- Use a custom domain for client-facing report and proposal URLs.

## What you MAY NOT do (all tiers)

- Redistribute, resell, sublicense, or publicly publish the source code.
- List the source on any code marketplace (CodeCanyon, Gumroad source
  sale, AppSumo code deal, etc.) without a separate written agreement.
- Create a competing website-audit, CRM, or agency-sales source-code
  product.
- Apply a copyleft or open-source licence to any derivative.
- Bypass licence validation, entitlement, or rate-limit mechanisms.
- Remove copyright or proprietary notices except for client-facing
  white-labelling as expressly permitted.
- Represent the software as open source.
- Use the software to train a competing product.

---

## Per-tier plain-language summary

### Hosted
- **Best for:** an agency that wants the product running immediately and
  does not want to host or modify source.
- **You get:** a hosted instance operated by the Licensor, full
  client-facing white-labelling, your custom domain on client URLs, and
  plan-based team seats and report quotas.
- **You do not get:** source code, the ability to modify the software,
  or removal of WinterVell attribution from the admin area.

### Agency Source
- **Best for:** a single agency that wants to own, host, and customize
  the product for its own operations and clients.
- **You get:** the full source under WV-CSL, one production deployment,
  unlimited internal team members, unlimited client reports (subject to
  fair use), internal modification rights, and full client-facing
  white-labelling.
- **You do not get:** multiple production deployments, the right to
  resell or sublicense the source, or the right to operate the product
  as a multi-tenant SaaS for other agencies.

### Studio
- **Best for:** a studio or holding company operating multiple agency
  brands, or running controlled deployments for clients.
- **You get:** everything in Agency Source, plus up to five production
  deployments, multiple agency brands, full admin-area white-labelling,
  controlled-client-deployment rights (with written authorization), and
  negotiable sublicensing.
- **You do not get:** the right to publicly redistribute the source, the
  right to sublicense without written authorization, or the right to
  operate a competing source-code product.

---

## Fair use

"Unlimited client reports" is subject to fair use: reports are generated
for your own legitimate agency clients and prospects, not resold as a
standalone report-generation service, not used to operate a competing
audit SaaS, and not generated in volumes that indicate abuse. As a
guideline, more than 1,000 reports per month per authorized deployment
warrants a conversation about a Studio Licence or a custom arrangement.
Fair use is interpreted reasonably; the Licensor will not terminate or
throttle a licensee for honest, good-faith use.

## Graceful licence validation

WinterVell does not implement hostile licence enforcement:

- Licence validation fails gracefully. If the licence server is
  unreachable, the product continues to operate for a reasonable offline
  grace period (default 14 days, configurable).
- The product never deletes customer data as a licence-enforcement
  mechanism.
- The product never locks access without explanation. After the grace
  period, it displays a clear, actionable notice and continues to permit
  read access and data export.
- Licence validation never transmits private client data — only a licence
  identifier, a deployment fingerprint, and a check timestamp.

## Upgrade path

Licensees may upgrade between tiers by paying the difference in fees
current at the time of upgrade. Downgrades take effect at the end of the
current paid term and do not entitle the licensee to a refund of the
difference.

## Contact

For tier selection, custom arrangements, and Studio sublicensing
authorization, see [`SUPPORT.md`](../SUPPORT.md).

---

## Related documents

- [`../LICENSE`](../LICENSE) — WinterVell Commercial Source License (WV-CSL) v1.0.
- [`../docs/legal/COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md) — full commercial licence reference.
- [`../docs/legal/EULA_TEMPLATE.md`](../docs/legal/EULA_TEMPLATE.md) — end-user licence agreement template.
- [`BUYER_FAQ.md`](BUYER_FAQ.md) — frequently asked questions.
- [`WHITE_LABEL_OVERVIEW.md`](WHITE_LABEL_OVERVIEW.md) — white-labelling scope.
