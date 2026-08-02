# Support

> Support tiers, channels, and scope for WinterVell. WinterVell is a
> proprietary commercial product governed by the WinterVell Commercial
> Source License (WV-CSL) v1.0 — see [`LICENSE`](LICENSE). Commercial
> and licence enquiries are handled separately from technical support.

WinterVell support is structured to match the commercial tiers. Hosted
customers receive support as part of their plan. Agency Source and
Studio customers receive support under a support agreement or custom
arrangement. All customers have access to the self-service documentation
in [`docs/`](docs/) and [`sales-assets/`](sales-assets/).

---

## How to get help

| Need | Channel |
|---|---|
| Technical support (Hosted) | In-app support widget or `support@wintervell.example` (placeholder) |
| Technical support (Agency Source / Studio) | `support@wintervell.example` (placeholder) or the support agreement channel |
| Security report | `security@wintervell.example` (placeholder) — see [`SECURITY.md`](SECURITY.md). Do not use the general support channel. |
| Commercial / licence / tier / Studio sublicensing | `sales@wintervell.example` (placeholder) |
| Conduct report | `conduct@wintervell.example` (placeholder) — see [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) |

Replace the placeholder addresses with the operator's actual inboxes
before publication.

---

## Response times

| Severity | Target first response |
|---|---|
| Critical (production down, data loss risk) | 1 business hour (Hosted plan), 4 business hours (Source) |
| High (core feature broken, no workaround) | 4 business hours (Hosted), 1 business day (Source) |
| Normal (feature broken with workaround) | 1 business day (Hosted), 2 business days (Source) |
| Low (how-to, clarification, minor issue) | 2 business days (Hosted), 3 business days (Source) |

These are targets, not guarantees. Response times may be longer during
weekends, public holidays in the operator's jurisdiction, and major
release windows.

---

## What support covers

- Installation and deployment issues on supported infrastructure (see
  [`sales-assets/TECHNICAL_REQUIREMENTS.md`](sales-assets/TECHNICAL_REQUIREMENTS.md)).
- Bugs in WinterVell's own source code, with a clear reproduction.
- Configuration questions answerable from the published documentation.
- Licence-validation issues that are not the result of bypass.
- Access to the latest tagged release and security fixes.

---

## What support does not cover

- Custom feature development (available under a separate professional-
  services arrangement).
- Third-party infrastructure setup (Vercel, PostgreSQL, object storage,
  email provider) beyond WinterVell-specific configuration.
- Third-party dependency bugs; report these upstream.
- Issues arising from unsupported modifications or unsupported
  deployment environments.
- Issues arising from running SQLite in a shared, multi-user, or
  production environment.
- Penetration testing or security assurance engagements (available
  under a separate arrangement).
- Legal advice; all legal documents are templates requiring lawyer
  review.

---

## Bug reporting

Bug reports should include:

- WinterVell version or commit SHA.
- The exact environment (Hosted, or self-hosted with infrastructure
  summary).
- A clear description of the expected and actual behaviour.
- Reproduction steps.
- Relevant logs (with secrets redacted).
- The impact on your operation.

Submit bug reports to `support@wintervell.example` (placeholder). Do
not open public issues for security-related bugs — see
[`SECURITY.md`](SECURITY.md).

---

## Feature requests

Feature requests are welcome from licensees. Submit them to
`support@wintervell.example` (placeholder) with a description of the
problem the feature would solve and the agency workflow it would
improve. Feature requests are prioritized against the published
[`ROADMAP.md`](ROADMAP.md); not every request can be accepted.

---

## Commercial and licence enquiries

For tier selection, custom arrangements, Studio sublicensing
authorization, upgrade path questions, and outright acquisition
discussions, contact `sales@wintervell.example` (placeholder). See
[`docs/legal/COMMERCIAL_LICENSE.md`](docs/legal/COMMERCIAL_LICENSE.md)
and [`sales-assets/LICENSE_COMPARISON.md`](sales-assets/LICENSE_COMPARISON.md)
for the tier definitions.

---

## Self-service documentation

- **Product:** [`docs/product/`](docs/product/)
- **Architecture:** [`docs/architecture/`](docs/architecture/)
- **Operations:** [`docs/operations/`](docs/operations/)
- **Setup:** [`docs/setup/`](docs/setup/)
- **Legal:** [`docs/legal/`](docs/legal/)
- **Sales:** [`sales-assets/`](sales-assets/)
- **Specification:** [`docs/SPECIFICATION.md`](docs/SPECIFICATION.md)
- **Roadmap:** [`ROADMAP.md`](ROADMAP.md)
- **Changelog:** [`CHANGELOG.md`](CHANGELOG.md)
- **Security:** [`SECURITY.md`](SECURITY.md)

---

## Licence validation and support interaction

Licence validation is separate from support entitlement. If the licence
server is unreachable, the product continues to operate for the
documented 14-day offline grace period; this does not require a support
ticket. If you believe your licence is incorrectly flagged, contact
`sales@wintervell.example` (placeholder).

See [`docs/legal/COMMERCIAL_LICENSE.md`](docs/legal/COMMERCIAL_LICENSE.md)
for the full graceful-licence-validation policy.

---

## Related documents

- [`LICENSE`](LICENSE) — WinterVell Commercial Source License (WV-CSL) v1.0.
- [`docs/legal/COMMERCIAL_LICENSE.md`](docs/legal/COMMERCIAL_LICENSE.md) — commercial licence reference.
- [`SECURITY.md`](SECURITY.md) — security policy.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution rules.
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) — community conduct.
- [`sales-assets/BUYER_FAQ.md`](sales-assets/BUYER_FAQ.md) — frequently asked questions.
