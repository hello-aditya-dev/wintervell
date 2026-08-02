# White-Labelling Guide

WinterVell is white-labelled end-to-end on the client-facing surface and partially white-labelled on the administrative surface. This document lists every configurable item, explains the per-tier attribution rule, and describes the difference between client-facing and administrative surfaces.

It is paired with [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md) (which defines the tiers) and [`../setup/custom-domain-setup.md`](../setup/custom-domain-setup.md) (which configures the per-agency domain).

---

## The principle

An agency's prospect should never see WinterVell branding. The report, the proposal, the share link, the email sender identity, the custom domain, the colours, the fonts, the logo, the disclaimers — all of it should look like the agency's own product. The prospect should not be able to tell that WinterVell exists.

The agency's administrator, on the other hand, is a WinterVell customer. The administrative area retains WinterVell attribution according to the purchased tier. This is the contract: full white-label outwards, WinterVell attribution inwards.

---

## Configurable items

All items are stored per-organisation in the `Branding` model and overridden at runtime from the defaults in [`src/config/product.ts`](../../src/config/product.ts).

| Item | Default | Per-agency override |
|---|---|---|
| Agency name | "WinterVell" (demo) | Yes |
| Legal name | Agency name | Yes |
| Logo (light, dark) | WinterVell logo | Yes — upload to object storage |
| Favicon | WinterVell favicon | Yes |
| Brand colours (primary, secondary, accent, surface) | WinterVell palette | Yes — hex values |
| Fonts (heading, body) | Fraunces + Inter (OFL) | Yes — bundled fonts only; no third-party web fonts in client-facing surface without explicit consent |
| Sender name | Agency name | Yes |
| Reply-to email | noreply@agency-domain | Yes |
| Support email | support@agency-domain | Yes |
| Support phone | — | Yes |
| Website | agency-domain | Yes |
| Address | — | Yes |
| Terms URL | agency-domain/terms | Yes |
| Privacy URL | agency-domain/privacy | Yes |
| Currency | USD | Yes — ISO 4217 |
| Tax settings (rate, display, inclusive/exclusive) | None | Yes |
| Default services (ServiceCatalogue seeds) | WinterVell defaults | Yes |
| Default pricing per service | None | Yes |
| Default report language | en | Yes — next-intl locales |
| Default disclaimers | WinterVell canonical disclaimers | Yes — text editable; the "automated findings are indicative / no WCAG certification / no ranking guarantee" disclaimer may be reworded but may not be removed |
| Custom domain | reports.wintervell.example | Yes — see [`../setup/custom-domain-setup.md`](../setup/custom-domain-setup.md) |
| Email from address | noreply@agency-domain | Yes |
| Open Graph image | Agency logo | Yes |
| Social preview card | Agency card | Yes |

The disclaimer constraint matters: an agency can reword the disclaimer for tone, but it cannot remove the substantive claims (automated findings are indicative, no WCAG certification, no ranking guarantee, not legal advice). This is a product rule, not just a legal one. See [`known-limitations.md`](known-limitations.md).

---

## Client-facing surface (full white-label)

The following surfaces are seen by prospects and must be fully white-labelled:

- The report reader (online, PDF, printable)
- The proposal viewer
- The share-link landing page
- The email body and subject of report-share and proposal emails
- The email sender identity (name + address)
- The custom domain the share link points to
- The Open Graph / social preview card
- Any client-facing portal (if enabled)

On these surfaces, WinterVell branding is invisible. No "Powered by WinterVell" footer. No WinterVell logo. No WinterVell domain. No WinterVell reply-to address.

---

## Administrative surface (WinterVell attribution per tier)

The following surfaces are seen by the agency's own staff and retain WinterVell attribution according to the purchased tier:

- The login screen
- The administrative dashboard
- The settings area
- The integrations area
- The billing / licence area
- The audit engine administration
- The API documentation
- Error pages (within reason — a 500 error in the admin area can mention WinterVell; a 500 error in the report reader should not)

| Tier | Administrative attribution | Client-facing attribution |
|---|---|---|
| Hosted | "WinterVell" visible in admin area | None |
| Agency Source | "WinterVell" visible in admin area, smaller | None |
| Studio | "WinterVell" visible in admin area, smallest; custom admin theme allowed | None |

The attribution rule is enforced by the licensing system — see [`../architecture/licence-architecture.md`](../architecture/licence-architecture.md). Removing WinterVell attribution from the administrative area is a licence violation and is detected by the licence validation service.

---

## Custom domains

Each agency may configure a custom domain for client-facing surfaces. Typical setup:

- `reports.agency.com` → report share links
- `proposals.agency.com` → proposal viewer (optional; can share the report domain)
- `app.agency.com` → administrative area (optional; can remain on the WinterVell-hosted domain)

DNS, SSL, and domain verification are documented in [`../setup/custom-domain-setup.md`](../setup/custom-domain-setup.md). Custom domains are per-organisation; a multi-agency installation has multiple custom domains.

---

## Fonts

Bundled fonts are Fraunces (OFL) and Inter (OFL). Both are SIL Open Font Licence, which permits bundling and redistribution. An agency may override the fonts with their own bundled fonts, provided the agency has the right to bundle them. Web fonts loaded from third-party CDNs are not used in the client-facing surface by default — they introduce third-party requests and tracking surface — but can be enabled per-agency with explicit configuration.

Font assets and their licences are recorded in [`../legal/ASSET_RIGHTS_REGISTER.md`](../legal/ASSET_RIGHTS_REGISTER.md).

---

## Brand colours

The default WinterVell palette is calm and analytical: muted blues, warm greys, a single accent for severity. An agency may override the palette, but the severity colour convention is fixed:

| Severity | Colour (fixed convention) |
|---|---|
| Critical | Red |
| High | Orange |
| Medium | Amber |
| Low | Blue |
| Informational | Grey |

This convention is not overridable. It is how readers parse severity at a glance, and changing it would harm report legibility across agencies.

---

## Logos and favicons

Logos and favicons are uploaded by an Administrator and stored in object storage — see [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md). Both light and dark variants are required for the report reader, which respects the prospect's system colour scheme.

---

## Per-tier limits

The number of branding overrides, custom domains, and ServiceCatalogue entries may be capped by the purchased tier. These caps are enforced by the licensing system and surfaced clearly in the administrative UI before the limit is hit. Hitting a cap does not break existing data; it prevents creating new items until the cap is raised or existing items are archived.

---

## Related documents

- [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md) — commercial tiers
- [`../architecture/licence-architecture.md`](../architecture/licence-architecture.md) — licence enforcement
- [`../setup/custom-domain-setup.md`](../setup/custom-domain-setup.md) — custom domain setup
- [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) — logo and asset storage
- [`report-workflow.md`](report-workflow.md) — where branding appears in the report
- [`proposal-workflow.md`](proposal-workflow.md) — where branding appears in the proposal
