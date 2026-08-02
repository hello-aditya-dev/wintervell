# Buyer Due-Diligence Summary

> Executive summary a prospective WinterVell buyer can hand to their
> counsel and CTO. This document is a summary; it is not legal advice
> and is not a substitute for the full legal, security, and provenance
> record in [`../docs/legal/`](../docs/legal/) and the companion
> [`docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md`](../docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md).

WinterVell is a proprietary commercial SaaS: an AI Website Audit and
Agency Sales Platform. This summary covers the dimensions a buyer's
counsel and CTO should examine: ownership and provenance, licence, IP
assignment status, dependency hygiene, security posture (with SSRF
focus), known limitations, demonstration honesty, what is implemented,
what is planned, and recommended next steps.

---

## 1. Ownership and provenance

WinterVell is the independent, privately-owned successor to the owner's
earlier **Cloudsun** CRM codebase. The owner of WinterVell also owns the
source code of Cloudsun and has the right to create a separate product
from it. WinterVell has its own fresh Git history, its own proprietary
licence, and its own product definition. It is **not** a renamed CRM.

- **Source repository:** `witejackel-eng/cloudsun`
- **Source commit used:** `e3879a4c232680e59e0937828b69d969e3b65b69` (2026-07-31)
- **Conversion audit:** [`../docs/audit/cloudsun-to-wintervell-conversion-audit.md`](../docs/audit/cloudsun-to-wintervell-conversion-audit.md)
- **Provenance:** [`../docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md)

Cloudsun is treated as **read-only source material**. The Cloudsun
repository, its history, its deployment, its environment, its database,
and its branding are not modified by the WinterVell project.

## 2. Licence

WinterVell is governed by the **WinterVell Commercial Source License
(WV-CSL) v1.0** in [`../LICENSE`](../LICENSE). It is proprietary
commercial software; it is **not** open source.

- The buyer acquires a **licence** to operate, modify (where the tier
  permits), and white-label the product for their own agency business.
- The buyer does **not** acquire the right to redistribute, resell,
  sublicense, or publicly publish the source.
- The buyer does **not** acquire the right to apply a copyleft or
  open-source licence to any derivative.
- Three commercial tiers (Hosted, Agency Source, Studio) are described
  in [`../docs/legal/COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md)
  and summarized in [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md).

If the buyer is acquiring the **product outright** (not merely a
licence), the acquisition agreement must be negotiated separately and
must address IP assignment, trademark, and ongoing obligation of the
Licensor.

## 3. IP assignment status

The Cloudsun contributor history includes a contributor whose
relationship to the WinterVell owner should be clarified during due
diligence. Where ownership of any contribution is unclear, it is
flagged rather than hidden. History is **not** rewritten to falsely
attribute work. See
[`../docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md) and the
IP-assignment checklist referenced in
[`../docs/legal/`](../docs/legal/).

## 4. Dependency hygiene

WinterVell's third-party dependencies are established open-source
packages (Next.js, React, Prisma, shadcn/ui, Radix, TanStack Query,
Zustand, Tailwind, NextAuth.js, etc.) governed by their respective
licences. The WinterVell CI workflow includes a security scan, and the
repository ships a software bill of materials seed in
[`../sbom.json`](../sbom.json).

- No copyleft (GPL, AGPL) dependencies are introduced into the
  WinterVell codebase as WinterVell proprietary code.
- Third-party notices and the dependency licence report are referenced
  in [`../docs/legal/`](../docs/legal/).
- When dependencies are added, the SBOM should be updated per
  [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

A buyer's counsel should review the dependency licence report and the
SBOM as part of due diligence.

## 5. Security posture (SSRF focus)

WinterVell accepts user-provided website URLs, so **SSRF prevention is
the single most important security control**. The audit worker is
designed to:

- Reject localhost, loopback, RFC 1918 private ranges, link-local,
  unique-local, cloud-metadata endpoints, and internal hostnames.
- Reject non-HTTP/HTTPS protocols.
- Validate redirects and reject cross-protocol and internal-host
  redirects.
- Defend against DNS rebinding.
- Enforce response-size and response-time limits.
- Run in a network-segmented context with no access to WinterVell's
  internal services, database, object storage, or cloud metadata.

Additional security controls: NextAuth v4 authentication, RBAC with
named permissions, per-organization tenant isolation at the data-access
layer, rate limiting on auth and audit-creation endpoints, append-only
audit logging, secrets in environment variables, security headers
(CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy), and AI provider boundaries (redaction, mock
labelling, token and cost logging).

WinterVell does **not** claim perfect security. The SSRF block-list is
maintained, not claimed to be exhaustive. No independent penetration
test has been performed as of v0.1.0; one is recommended before
high-volume production use.

Full security model:
[`../docs/architecture/security-model.md`](../docs/architecture/security-model.md).
Security disclosure:
[`../docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md).
Buyer-facing summary:
[`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md).

## 6. Known limitations

Material limitations are documented honestly in
[`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md). Headlines:

- v0.1.0 is the foundation release; the eighteen-module product
  implementation is in progress per [`../ROADMAP.md`](../ROADMAP.md).
- Automated findings are indicative; WinterVell does not certify WCAG
  or legal compliance and does not guarantee SEO or ranking
  improvements.
- Formal trademark clearance for "WinterVell" is recommended before
  major commercial investment.
- Legal documents are templates; review with a qualified lawyer before
  commercial distribution.
- No independent penetration test as of v0.1.0.
- SQLite is development-only; production must use PostgreSQL 14+.

## 7. Demonstration honesty

WinterVell ships an **honest** demonstration mode: the Northstar
Digital organization with five fictional prospects, every item clearly
labelled as fictional. The product never implies a real audit ran when
it did not, that a real payment occurred, that a real AI provider is
connected, or that a production integration is operational. See
[`../docs/product/demo-mode-guide.md`](../docs/product/demo-mode-guide.md).

## 8. What is implemented (v0.1.0)

- Repository with fresh Git history, branding, package metadata, and
  environment template.
- WV-CSL v1.0 licence and full legal documentation suite.
- Provenance and conversion audit.
- Product, architecture, operations, and setup documentation.
- Sales package (this directory).
- Central product configuration (`src/config/product.ts`).
- CI workflow (lint, type-check, build, security scan).
- Northstar Digital demonstration organization spec.
- SBOM seed.
- Inherited foundations from Cloudsun: Next.js App Router, Prisma,
  NextAuth v4, multi-tenant model, RBAC patterns, API conventions,
  reusable UI components, application shell, demo-data patterns.

## 9. What is planned (per roadmap)

- Removal of residual call-centre architecture.
- Completion of the product configuration and WinterVell design system.
- Audit engine and evidence model.
- Report builder and PDF generation.
- Proposal and roadmap generation.
- CRM and pipeline.
- White-labelling and service catalogue.
- AI provider abstraction.
- Licences and entitlements.
- Security hardening and SSRF enforcement.
- Tests, CI/CD, and production-deploy hardening.
- Final due-diligence audit.

See [`../ROADMAP.md`](../ROADMAP.md) for the phased status table.

## 10. Recommended next steps

1. Review [`../docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md`](../docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md)
   with counsel.
2. Review [`../docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md)
   and the conversion audit for IP and provenance comfort.
3. Review [`../docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md)
   and [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md) with the CTO.
4. Commission an independent penetration test focused on SSRF and
   tenant isolation before high-volume production use.
5. Commission trademark clearance for "WinterVell" before major
   commercial investment.
6. Have a qualified lawyer review all legal documents before
   commercial distribution.
7. Decide on tier (Hosted, Agency Source, Studio) based on intended
   use, number of production deployments, and white-labelling depth.
8. If acquiring the product outright (not merely a licence), negotiate
   a separate acquisition agreement addressing IP assignment,
   trademark, and ongoing obligations.

---

## Related documents

- [`../docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md`](../docs/legal/SALE_DUE_DILIGENCE_CHECKLIST.md)
- [`../docs/legal/PROVENANCE.md`](../docs/legal/PROVENANCE.md)
- [`../LICENSE`](../LICENSE)
- [`../docs/legal/COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md)
- [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md)
- [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md)
- [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md)
- [`../ROADMAP.md`](../ROADMAP.md)
