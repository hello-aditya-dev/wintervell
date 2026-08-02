# White-Label Overview

> Scope and rules for white-labelling WinterVell. White-labelling rules
> differ by tier; the authoritative text is the
> [`LICENSE`](../LICENSE) (WV-CSL v1.0) and the
> [`COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md).

White-labelling is the ability to present WinterVell's outputs and, on
the higher tiers, its administrative interface, as your agency's own
product. WinterVell is built white-label-first: every client-facing
surface is configurable, and the admin-area attribution rules are
explicit per tier.

---

## What can be white-labelled

### Client-facing surfaces (all tiers)

- **Audit reports (PDF).** Cover, headers, footers, colours, typography,
  logo, sender identity, default disclaimers, and CTA.
- **Audit reports (shared web view).** Same branding as the PDF, plus a
  custom-domain URL.
- **Proposals (PDF and shared web view).** Full branding, including
  signature blocks, pricing presentation, and acceptance-criteria
  wording.
- **Implementation roadmaps.** Branded phased plans delivered inside the
  report and the proposal.
- **Shared report and proposal URLs.** Custom domain (e.g.
  `audits.youragency.com`) instead of a WinterVell domain.
- **Sender identity.** From-name and from-email for report-share and
  proposal notifications.
- **Default disclaimers and footer copy.** Configurable per
  organization.
- **Report language.** Configurable default language for client-facing
  materials (subject to available locales).

### Administrative surfaces (tier-dependent)

- **Agency Source.** Admin-area WinterVell attribution is configurable
  per tier (typically a discreet "Powered by WinterVell" notice,
  removable only with the appropriate tier or add-on).
- **Studio.** Full admin-area white-labelling, including removal of all
  WinterVell attribution from the administrative interface.
- **Hosted.** WinterVell attribution is retained in the admin area.

## Per-tier rules

| Surface | Hosted | Agency Source | Studio |
|---|---|---|---|
| Client-facing report PDF | Full white-label | Full white-label | Full white-label |
| Client-facing shared web report | Full white-label | Full white-label | Full white-label |
| Proposal PDF and shared web view | Full white-label | Full white-label | Full white-label |
| Custom domain for client URLs | Yes | Yes | Yes |
| Sender identity (from-name, from-email) | Yes | Yes | Yes |
| Default disclaimers and footer copy | Configurable | Configurable | Configurable |
| Report default language | Configurable | Configurable | Configurable |
| Admin-area WinterVell attribution | Retained | Configurable per tier | Fully removable |

## Custom domain

- Configure a custom domain (e.g. `audits.youragency.com`) for
  client-facing report and proposal URLs.
- DNS and TLS are managed through your deployment platform (Vercel
  recommended).
- The admin area continues to run on your primary deployment URL; only
  client-facing surfaces are exposed on the custom domain.
- Setup instructions are in [`docs/setup/`](../docs/setup/).

## Brand colours, fonts, and logo

- Brand colours are applied to report covers, section headers, charts,
  and CTA buttons.
- Typography is configurable within a curated set of web-safe and
  PDF-safe font pairings.
- Logo is rendered on the report cover, the shared web report, the
  proposal, and email notifications.
- Favicon is configurable for the custom domain.

## Sender identity

- From-name and from-email for report-share and proposal notifications.
- SPF, DKIM, and DMARC must be configured on the sending domain for
  reliable delivery.
- Replies can be routed to a configurable inbox.

## Default disclaimers

- Default disclaimers are configurable per organization and appear in
  the footer of every client-facing report and proposal.
- Disclaimers clarify that automated findings are indicative, that
  WinterVell does not certify WCAG or legal compliance, and that the
  document is not legal advice.
- The disclaimer wording is a template; review it with a qualified
  lawyer before commercial distribution.

## Report language

- The default language for client-facing materials is configurable per
  organization.
- Available locales are determined by the translations shipped with the
  product; custom translations can be added on Studio.

## Premium positioning

WinterVell is designed for agencies that present audits and proposals as
their own professional deliverables. The white-label system is not a
"logo swap" — it extends to typography, colour, voice, sender identity,
domain, and disclaimer wording. The goal is that a client receiving a
WinterVell-generated report or proposal experiences it as a deliverable
from your agency, not as a third-party tool's output.

---

## What white-labelling does not permit

- Removing WinterVell attribution from the admin area on the Hosted
  tier, or beyond what your Agency Source tier permits.
- Representing WinterVell as your own product for the purpose of
  reselling or sublicensing the source code.
- Removing copyright or proprietary notices from the source code.
- Representing the software as open source.

These rules exist to protect the Licensor's IP while giving agencies
full control over the client-facing experience. See
[`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md) for the full tier
comparison.

---

## Related documents

- [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md) — tier comparison.
- [`../docs/legal/COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md) — commercial licence reference.
- [`../docs/setup/`](../docs/setup/) — setup guides including custom-domain configuration.
