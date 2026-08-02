# Security Policy

> Security policy for the WinterVell repository. WinterVell is a
> proprietary commercial product governed by the WinterVell Commercial
> Source License (WV-CSL) v1.0 — see [`LICENSE`](LICENSE). This policy
> covers supported versions, vulnerability reporting, response SLAs,
> scope, safe-harbour, public-disclosure timing, and a summary of
> security measures.

WinterVell accepts user-provided website URLs and renders external
websites inside an audit worker. This makes SSRF prevention the single
most important security control in the product. The full security model
is documented in [`docs/architecture/security-model.md`](docs/architecture/security-model.md)
and the security disclosure is in [`docs/legal/SECURITY_DISCLOSURE.md`](docs/legal/SECURITY_DISCLOSURE.md).

---

## Supported versions

WinterVell is in active development. Security fixes are applied to the
latest released minor version on the `main` branch. Older minor versions
receive security fixes only by backport at the maintainer's discretion.

| Version | Supported |
|---|---|
| `main` (latest development) | Yes |
| Latest tagged release | Yes |
| Prior tagged releases | Best-effort backport |

Operators are strongly encouraged to track the latest tagged release.

## Reporting a vulnerability

Report suspected security vulnerabilities **privately**. Do not open a
public GitHub issue for security reports.

- **Email:** `security@wintervell.example` (placeholder — replace with
  the operator's actual security inbox before publication).
- **PGP:** If you require encrypted communication, request the
  maintainer's public key by emailing the address above.
- **Include:** a clear description of the issue, the affected component
  (audit worker, auth, PDF, AI abstraction, etc.), reproduction steps,
  the version or commit you tested, and any proof-of-concept material.

You will receive an acknowledgement within **2 business days** and an
initial assessment within **5 business days**. If you do not receive an
acknowledgement, follow up by email.

## Response SLA

| Stage | Target |
|---|---|
| Acknowledgement | 2 business days |
| Initial assessment | 5 business days |
| Triage and severity rating | 10 business days |
| Fix or mitigation for high-severity issues | 30 days from confirmation |
| Fix or mitigation for critical-severity issues | 15 days from confirmation |
| Coordinated public disclosure | After a fix is available, or after 90 days from the initial report, whichever is earlier, unless an extension is mutually agreed |

These are targets, not guarantees. The maintainer will communicate
progress throughout.

## Scope

**In scope:**

- Vulnerabilities in WinterVell's own source code.
- SSRF bypasses in the audit worker.
- Authentication, authorization, or tenant-isolation bypasses.
- Injection vulnerabilities (SQL injection, command injection,
  prompt-injection that leads to persisted authoritative findings).
- Sensitive-data exposure in logs, error messages, or shared reports.
- Licence-validation bypasses.

**Out of scope:**

- Vulnerabilities in third-party dependencies not reachable from
  WinterVell's own code. Report these to the upstream maintainer.
- Findings from automated scanners without a demonstrated impact.
- Social-engineering or physical attacks against the operator.
- Denial-of-service via sustained high-volume audit submission from an
  authenticated account (this is a rate-limiting / fair-use matter, not
  a vulnerability).
- The mere fact that WinterVell renders external websites; this is a
  documented product behaviour, mitigated by the SSRF model.

## Safe harbour

Researchers who report a suspected vulnerability in good faith, who
avoid destroying data, who avoid disrupting production services, and who
do not publicly disclose the issue before a fix is available or before
the coordinated disclosure window, will not be subject to legal action
by the WinterVell maintainer for the report itself.

This safe-harbour statement is a policy commitment, not a contract. It
does not waive any rights the maintainer may have against malicious or
bad-faith conduct.

## Public disclosure timing

The maintainer prefers coordinated disclosure: a fix is released, then
a public advisory is published with credit to the reporter (unless the
reporter requests anonymity). If a fix is delayed beyond 90 days from
the initial report, the maintainer and reporter will coordinate on a
limited public disclosure that allows operators to mitigate while a
full fix is finalized.

## Security measures summary

- **SSRF protection.** The audit worker rejects localhost, private
  ranges, link-local, cloud-metadata endpoints, non-HTTP protocols, and
  cross-protocol redirects to internal hosts. DNS-rebinding defence and
  response-size/time limits are enforced. See
  [`docs/architecture/security-model.md`](docs/architecture/security-model.md).
- **Authentication.** NextAuth.js v4 with credentials, email magic link,
  and OAuth providers as configured. `NEXTAUTH_SECRET` is required.
- **Authorization.** RBAC with named permissions per role, enforced
  server-side.
- **Tenant isolation.** Every query is scoped by organization at the
  data-access layer. Object access is permission-checked, not
  ID-checked (no IDOR).
- **Rate limiting.** Auth, audit-creation, and AI-provider endpoints
  are rate-limited.
- **Audit logging.** Append-only audit-event store for privileged
  actions, with tamper-evidence via monotonic sequence numbers.
- **Secrets.** Stored in environment variables; never in the
  repository. AI provider keys are encrypted at rest.
- **Security headers.** HTTPS, HSTS, CSP, X-Content-Type-Options,
  X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **AI boundaries.** Prompt redaction, mock-provider labelling, token
  and cost logging, structured-output validation.

WinterVell does not claim perfect security. The SSRF block-list is
maintained, not claimed to be exhaustive. See
[`docs/legal/SECURITY_DISCLOSURE.md`](docs/legal/SECURITY_DISCLOSURE.md)
for the honest implemented-vs-planned status.

## SSRF note

Because URL input is the core product feature, SSRF is the primary
external-facing risk. Operators must:

- Run the audit worker in a network-segmented context with no access to
  WinterVell's internal services, database, object storage, or cloud
  metadata.
- Keep the SSRF block-list current and apply updates as they are
  released.
- Configure response-size and response-time limits appropriately for
  their environment.
- Treat the audit worker as an untrusted renderer of hostile content.

An independent penetration test focused on SSRF and tenant isolation is
recommended before high-volume production use.

---

## Related documents

- [`docs/architecture/security-model.md`](docs/architecture/security-model.md)
- [`docs/legal/SECURITY_DISCLOSURE.md`](docs/legal/SECURITY_DISCLOSURE.md)
- [`sales-assets/SECURITY_OVERVIEW.md`](sales-assets/SECURITY_OVERVIEW.md)
- [`LICENSE`](LICENSE)
