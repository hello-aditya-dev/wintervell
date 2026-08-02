# Security Overview

> Plain-language security summary for prospective WinterVell buyers.
> This document is a summary, not a substitute for the full security
> model in [`docs/architecture/security-model.md`](../docs/architecture/security-model.md)
> or the security disclosure in [`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md).
> WinterVell does not claim perfect security; this document is honest
> about what is implemented and what is planned.

WinterVell accepts user-provided website URLs and renders external
websites inside an audit worker. This makes **SSRF prevention** the
single most important security control in the product. The security
model is built around treating all user-supplied URLs as untrusted, all
audited websites as hostile, and all tenant boundaries as hard.

---

## Threat model in brief

- **Arbitrary URL input.** Any authenticated user can submit a URL for
  audit. The audit worker must not become a vehicle to reach internal
  services, cloud-metadata endpoints, or private networks.
- **Multi-tenant data.** Prospects, audits, reports, and proposals
  belong to an organization. Cross-tenant access is a critical
  confidentiality failure.
- **AI provider egress.** When a real AI provider is configured,
  prompt content leaves the deployment. Prompt-injection and
  data-leakage boundaries must be enforced.
- **Privileged actions.** Role changes, licence changes, data exports,
  and report shares are privileged and must be auditable.

## SSRF protection

Because URL input is the core product feature, SSRF protection is
mandatory and implemented at the audit-worker boundary:

- The target hostname is resolved and checked against a block-list:
  localhost, loopback, RFC 1918 private ranges, link-local, unique-local
  addresses, cloud-metadata endpoints (`169.254.169.254` and product
  equivalents), and internal hostnames.
- Non-HTTP/HTTPS protocols are rejected.
- Redirects are validated; cross-protocol and internal-host redirects
  are rejected.
- DNS-rebinding defence: the resolved IP is the IP used for the
  connection; the connection is not re-resolved mid-request.
- Response-size and response-time limits are enforced.
- The audit worker runs in a network-segmented context with no access
  to WinterVell's internal services, database, object storage, or cloud
  metadata.

The full SSRF block-list is in
[`docs/architecture/security-model.md`](../docs/architecture/security-model.md).

## Authentication

- NextAuth.js v4 with credentials, email magic link, and OAuth providers
  as configured.
- `NEXTAUTH_SECRET` is required and must be high-entropy.
- Session timeout and re-authentication for sensitive actions.
- Magic-link sign-in tokens are short-lived and single-use.

## Authorization (RBAC)

- Role-based access control with named permissions per role.
- Permissions are enforced server-side; the client never authorizes.
- Organization / Membership / Team / Invitation / Session model with
  per-organization user management.
- Privileged actions (role change, licence change, data export, report
  share, setting change) require an explicit permission.

## Tenant isolation

- Every query is scoped by organization at the data-access layer.
- Cross-organization access is a critical bug, not a feature.
- IDs are not enumerable; object access is permission-checked, not
  ID-checked (no IDOR).

## Rate limiting

- Rate limits on authentication endpoints (login, magic-link request).
- Rate limits on audit-creation endpoints.
- Rate limits on AI-provider calls (per organization and per user).
- Rate limits are enforced server-side and respect fair-use terms.

## Audit logging

- Append-only audit-event store for sensitive actions.
- Per-actor, per-target, per-action queryable history.
- Tamper-evidence via monotonic sequence numbers.
- Configurable retention.
- Audit events cover: login, role change, report share, licence change,
  data export, setting change, and other privileged operations.

## Secrets handling

- Secrets are stored in environment variables, never in the repository.
- `.env.example` contains only placeholder values; no real secrets are
  committed.
- AI provider keys are stored encrypted at rest and decrypted only in
  the worker that uses them.
- Object-storage credentials follow the same handling.
- Secret rotation is documented in the operations runbooks.

## Security headers

- HTTPS is enforced; HSTS is enabled.
- Content-Security-Policy, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, and Permissions-Policy are configured.
- Cookie attributes: `Secure`, `HttpOnly`, `SameSite=Lax` (or `Strict`
  where appropriate).

## AI provider boundaries

- Prompt content is redacted for obviously sensitive fragments before
  being sent to a real AI provider.
- Prompt versioning and structured-output validation reduce the risk of
  prompt-injection-driven outputs being persisted as authoritative
  findings.
- The mock provider is clearly indicated when in use; the product never
  implies a real provider is connected when it is not.
- Token and cost logging is per call, per organization, per user.

## Backup and recovery

- Database: nightly logical backups plus continuous WAL archiving.
- Object storage: versioning and cross-region replication for critical
  evidence.
- Restore-test cadence: at least quarterly.
- See [`docs/operations/`](../docs/operations/) for backup and incident
  response runbooks.

## Vulnerability reporting

- Report vulnerabilities privately via the channel in
  [`SECURITY.md`](../SECURITY.md).
- Do not open public issues for security reports.
- Safe-harbour terms and response SLAs are in
  [`SECURITY.md`](../SECURITY.md).

## What is implemented vs planned

| Control | Status (v0.1.0) |
|---|---|
| SSRF block-list architecture | Designed and documented; full enforcement is part of the audit-engine delivery phase (see [`../ROADMAP.md`](../ROADMAP.md)) |
| NextAuth.js v4 authentication | Inherited from the foundation; production-configured |
| RBAC permission model | Inherited; WinterVell-specific permissions in progress |
| Tenant isolation at data-access layer | Inherited pattern; enforced for WinterVell entities as they are delivered |
| Rate limiting | Architecture in place; per-endpoint limits configured as endpoints are delivered |
| Audit logging | Inherited audit-event store; WinterVell-specific events added as features ship |
| Secrets handling via environment | Implemented |
| Security headers | Implemented at the Next.js configuration layer |
| AI provider boundaries (redaction, mock labelling) | Designed; enforced as the AI abstraction ships |
| Backup and recovery runbooks | Documented; cadence is the operator's responsibility |

Honest status detail is in
[`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md)
and [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md).

## What WinterVell does not claim

- WinterVell does not claim perfect security or zero false positives.
- WinterVell does not claim to be penetration-test certified; an
  independent penetration test is recommended before high-volume
  production use.
- WinterVell does not claim to detect every accessibility, SEO, or
  security issue in an audited site.
- WinterVell does not warrant that the audit worker is immune to all
  SSRF variants; the block-list is maintained and updated as new
  techniques are identified.

---

## Related documents

- [`docs/architecture/security-model.md`](../docs/architecture/security-model.md) — full security model.
- [`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md) — security disclosure.
- [`../SECURITY.md`](../SECURITY.md) — vulnerability reporting policy.
- [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md) — honest limitations.
