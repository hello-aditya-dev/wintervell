# Gumroad Description Draft

> Draft Gumroad product page. Gumroad is used to sell the **Hosted tier**
> and the **Agency Source tier** as digital products (a subscription or
> a one-time licence fee with hosted access or source delivery). The
> **source code is not resold**; what is sold is a licence grant and, on
> the Agency Source tier, access to the private repository under WV-CSL.
> Final copy should be reviewed by counsel before publication.

---

## Headline

**WinterVell — Turn any website into a professional audit, proposal,
and sales opportunity.**

## Sub-headline

A white-label AI Website Audit and Agency Sales Platform for
web-design, SEO, marketing, and conversion agencies. Hosted or
source-licence. Proprietary. Not open source.

## Description

WinterVell is a focused, white-label platform that takes a prospect's
website and produces a structured audit, a polished client-facing
report, a service proposal, an implementation roadmap, and a tracked
sales opportunity — one workflow from prospect capture to closed client
project.

Built on Next.js 16, React 19, TypeScript, Prisma (PostgreSQL),
NextAuth v4, and a provider-agnostic AI abstraction, WinterVell is
designed for agencies that present audits and proposals as their own
professional deliverables. Every client-facing surface is white-label:
your logo, your colours, your typography, your custom domain, your
sender identity.

WinterVell is **proprietary commercial software** governed by the
WinterVell Commercial Source License (WV-CSL) v1.0. It is not open
source. You may operate, modify (where your tier permits), and
white-label the product for your own agency business, but you may not
redistribute, resell, or publicly publish the source.

## What's included

- Hosted tier: a hosted instance operated by the Licensor, full
  client-facing white-labelling, your custom domain on client URLs, and
  plan-based team seats and report quotas.
- Agency Source tier: the full source under WV-CSL, one production
  deployment, unlimited internal team members, unlimited client reports
  (subject to fair use), internal modification rights, and full
  client-facing white-labelling.
- Six-category audit engine (Technical, SEO, Accessibility, Conversion
  & UX, Trust, AI & Search Visibility).
- Nine-category transparent, reproducible, versioned scoring.
- Twelve-stage audit pipeline.
- Structured evidence model with screenshots, raw evidence, business
  consequence, recommended action, and suggested service.
- Manual review workflow with false-positive marking, verification, and
  client-report exclusion.
- Report builder with section reordering, live preview, and branded PDF
  generation (selectable text, page numbers).
- Proposal generator and implementation roadmap (Immediate / 30 / 60 /
  90-day).
- Twelve-stage opportunity pipeline with drag-and-drop.
- Privacy-conscious report analytics.
- AI provider abstraction (OpenAI-compatible, Anthropic, mock;
  bring-your-own-key).
- NextAuth v4 authentication, RBAC, tenant isolation, audit logging.
- Northstar Digital demonstration organization (fictional, clearly
  labelled).
- Full legal and documentation foundation (provenance, conversion
  audit, security disclosure, EULA template, sale due-diligence pack).

## Requirements

- Hosted tier: a modern evergreen browser; no infrastructure required.
- Agency Source tier: Node.js 20+ (or Bun 1.1+), PostgreSQL 14+, an
  S3-compatible object storage bucket, an SMTP relay or transactional
  email provider, and (optionally) an OpenAI-compatible or Anthropic
  API key. Vercel is the recommended deployment platform. Full
  requirements are in [`TECHNICAL_REQUIREMENTS.md`](TECHNICAL_REQUIREMENTS.md).

## Licence summary

- WinterVell is proprietary commercial software (WV-CSL v1.0). It is
  not open source.
- You may operate the product for your agency business and charge your
  clients for audits, reports, proposals, and services.
- You may white-label all client-facing materials.
- Agency Source licensees may modify the source for internal use.
- You may not redistribute, resell, or publicly publish the source.
- You may not list the source on a code marketplace without a separate
  written agreement.
- Licence validation fails gracefully (default 14-day offline grace);
  the product never deletes customer data as a licence-enforcement
  mechanism.

See [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md) for the full
tier comparison.

## FAQ teaser

- **Is this open source?** No — proprietary, WV-CSL v1.0.
- **Can I resell the source?** No.
- **Can I white-label client reports?** Yes, on every tier.
- **Can I charge my clients?** Yes.
- **Do you train AI on my data?** No.
- **What if the licence server is down?** 14-day offline grace; no data
  deletion.

Full FAQ: [`BUYER_FAQ.md`](BUYER_FAQ.md).

## Honest limitations

- v0.1.0 is the foundation release; the eighteen-module product
  implementation is in progress per the published roadmap.
- Automated findings are indicative; WinterVell does not certify WCAG
  or legal compliance and does not guarantee SEO or ranking
  improvements.
- Formal trademark clearance is recommended before major commercial
  investment.
- Legal documents are templates; review with a qualified lawyer before
  commercial distribution.

## CTA

**Buy now** — choose Hosted for a turnkey instance, or Agency Source
for the full source under WV-CSL with internal modification rights.
For Studio (multi-brand, up to 5 production deployments, full
admin-area white-labelling, sublicensing by written authorization),
contact the Licensor via [`../SUPPORT.md`](../SUPPORT.md).

---

## Related documents

- [`PRODUCT_FEATURE_LIST.md`](PRODUCT_FEATURE_LIST.md)
- [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md)
- [`TECHNICAL_REQUIREMENTS.md`](TECHNICAL_REQUIREMENTS.md)
- [`BUYER_FAQ.md`](BUYER_FAQ.md)
- [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md)
