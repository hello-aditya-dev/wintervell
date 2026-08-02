# Security Disclosure

> **TEMPLATE — REQUIRES LEGAL REVIEW.** This document is an honest disclosure of WinterVell's security posture. It distinguishes what is implemented from what is planned, and explicitly avoids claims of "perfect security", "guaranteed protection", or "full compliance". It is the companion to [`docs/architecture/security-model.md`](../architecture/security-model.md) (where the full technical model lives) and [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) (where data-handling is disclosed to data subjects). Report security vulnerabilities via [`SECURITY.md`](../../SECURITY.md).

WinterVell accepts user-provided website URLs. Server-Side Request Forgery (SSRF) prevention is therefore the central security concern and is treated as a first-class engineering requirement, not an afterthought.

---

## 1. Threat model summary

| Threat surface | Primary control |
|---|---|
| User-provided URLs (SSRF) | Block-list + IP re-validation after redirect + DNS-rebinding defence + size/time limits + isolated worker |
| Authentication | NextAuth v4 (hashed passwords, signed sessions, CSRF tokens) |
| Authorization (IDOR, privilege escalation) | Permission-based RBAC + `organisationId` scoping on every query |
| Cross-tenant data leakage | `organisationId` scoping enforced in data-access layer |
| XSS | React auto-escaping + strict CSP (planned for hardening) |
| CSRF | NextAuth built-in token + same-site cookies |
| Open redirect | Allow-list of redirect targets on auth/callback flows |
| File-upload abuse | MIME + magic-byte validation + size limits + storage isolation |
| Prompt injection (AI) | Boundaries between instructions and untrusted content + structured-output validation + human review before publish |
| Webhook spoofing | Signature verification (HMAC or provider-specific) |
| Audit-log tampering | Append-only log + integrity hashing (planned hardening) |
| Session fixation/hijacking | Session rotation on auth events, secure cookies, short-lived tokens |
| Secret leakage | Server-only secret access, redacted logs, CI secret scanning |
| Error-message information leakage | Generic user-facing errors; detailed traces only in server logs |
| Clickjacking | `X-Frame-Options: DENY` on admin routes; report viewer framed only when explicitly permitted |

---

## 2. Authentication

| Aspect | Implementation |
|---|---|
| Framework | NextAuth.js v4 (`next-auth` ^4.24.11) |
| Password storage | Hashed via bcrypt-equivalent adapter provided by NextAuth credentials provider. **Plaintext passwords are never stored or logged.** |
| Session strategy | JWT-based signed session tokens (HMAC) by default; database sessions configurable |
| Session rotation | Session identifier rotates on sign-in and on privilege change |
| Cookie security | `HttpOnly`, `Secure` (in production), `SameSite=Lax` (or `Strict` where appropriate) |
| CSRF | NextAuth's built-in CSRF token on auth flows; same-site cookie defence for general forms |
| OAuth/SSO | Configurable via NextAuth providers (Google, GitHub, etc.) |
| Multi-factor | Planned — not in the foundation release (see [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md)) |

---

## 3. Authorization

| Aspect | Implementation |
|---|---|
| Model | Role-based access control (RBAC) with permission checks |
| Roles | `OWNER`, `ADMIN`, `MEMBER`, and additional granular roles per [`docs/architecture/security-model.md`](../architecture/security-model.md) |
| Permission checks | Per-route and per-resource; enforced both in API route handlers and in data-access helpers |
| Default deny | Routes that lack an explicit permission check are treated as a defect and flagged in code review |
| Resource ownership | Every resource carries an `organisationId`; cross-organisation access is rejected at the data-access layer |

---

## 4. Tenant isolation

- Every tenant-scoped record carries `organisationId`.
- All data-access queries are required to filter by `organisationId`. The Prisma client wrapper (see [`PROVENANCE.md`](PROVENANCE.md) for the inherited pattern) injects this filter.
- A user can hold memberships in multiple organisations; the active organisation is established from the session and re-validated on every request.
- Cross-organisation IDOR attempts (e.g. guessing another organisation's resource IDs) are rejected by the `organisationId` scope check even when the requested ID is valid.
- AI prompts are assembled strictly from the active organisation's data; no cross-organisation leakage is permitted in the prompt pipeline.

---

## 5. SSRF protection (critical)

Because WinterVell accepts user-provided website URLs for auditing, SSRF prevention is mandatory. The following defences are implemented in the audit worker.

### 5.1 Block-list (mandatory rejection)

The audit worker rejects any URL that resolves to or specifies:

| Blocked target | Examples |
|---|---|
| Loopback | `localhost`, `127.0.0.0/8`, `::1`, `::ffff:127.0.0.0/104` |
| Private IPv4 | RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) |
| Link-local | `169.254.0.0/16` (IPv4), `fe80::/10` (IPv6) |
| Cloud metadata endpoints | `169.254.169.254` (AWS/Azure/GCP metadata), `fd00:ec2::254` (AWS IPv6 metadata) |
| Other reserved ranges | `0.0.0.0/8`, `100.64.0.0/10` (CGNAT), `192.0.0.0/24`, `198.18.0.0/15` (benchmark), `240.0.0.0/4` (reserved) |
| Internal hostnames | Any host that resolves via the Licensee's internal DNS to a private IP. The block-list operates on **resolved IPs**, not just hostnames. |
| Non-HTTP protocols | Only `http://` and `https://` are accepted. `file://`, `ftp://`, `gopher://`, `dict://`, `ldap://`, `smb://`, `ws://`, `wss://` (when not part of the audited page), and others are rejected. |

### 5.2 DNS rebinding defence

- After resolving the hostname, the worker checks the resolved IP against the block-list **before** connecting.
- The resolved IP is pinned for the connection (no second DNS lookup at connect time).
- The connection is made to the verified IP with the original `Host` header, preventing a rebinding attack that returns a public IP at lookup and a private IP at connect.

### 5.3 Redirect re-validation

- The worker follows HTTP redirects only up to a small maximum (default: 3).
- Every redirect target is re-validated against the block-list and DNS-rebinding defence before the next request is made.
- Redirect chains that cross into a blocked target are rejected.

### 5.4 Response-size and response-time limits

- Maximum response body size enforced (default: 10 MB per resource; configurable).
- Maximum total request time enforced (default: 30 s per page; configurable).
- Maximum number of sub-resource fetches enforced per audit.

### 5.5 Isolated worker environment

- The audit worker runs in an environment that does **not** have network access to the Licensee's internal services, databases, or metadata endpoints beyond the public internet egress path.
- In hosted deployments the worker runs in a separate network namespace with egress restricted to public internet addresses.

### 5.6 What is implemented vs planned

- Implemented: block-list, DNS rebinding defence, redirect re-validation, size/time limits, isolated worker environment.
- Planned (not in foundation release): per-organisation rate limits on outbound fetches, optional outbound proxy with explicit allow-list, deeper content-type validation on sub-resources.

---

## 6. Rate limiting

- API routes are rate-limited per IP and per user.
- Audit-trigger routes are additionally rate-limited per organisation to prevent outbound-fetch abuse.
- Rate limits are configurable; defaults are documented in [`docs/architecture/security-model.md`](../architecture/security-model.md).
- Rate-limit responses use HTTP 429 with `Retry-After`.

---

## 7. CSRF

- NextAuth provides built-in CSRF tokens on authentication flows.
- All state-changing API routes require a same-site cookie and an `Origin`/`Referer` check.
- Forms use POST with the NextAuth CSRF token where applicable.
- Where cookie-based sessions are used, cookies are `SameSite=Lax` (default) or `SameSite=Strict` on sensitive flows.

---

## 8. XSS and content security

| Aspect | Implementation |
|---|---|
| Output escaping | React's default HTML escaping on all interpolated values; `dangerouslySetInnerHTML` is used only on sanitized markdown |
| Markdown rendering | `react-markdown` is used with a restricted component map; raw HTML in markdown is **not** rendered by default |
| Sanitisation | HTML produced by `react-markdown` is rendered through React's virtual DOM (no raw HTML injection) |
| CSP | Strict Content-Security-Policy is planned for the hardening pass; baseline `default-src 'self'` is the target |
| Report viewer | The report viewer renders only approved report content; user-controlled HTML is never injected unescaped |

---

## 9. Open redirect

- Auth callback `callbackUrl` parameters are validated against an allow-list of permitted paths.
- External `callbackUrl` values are rejected.
- General-purpose redirect endpoints use a path-allow-list.

---

## 10. File-upload protection

- Uploads are limited to expected MIME types (screenshots: PNG/JPEG/WebP; documents: PDF) and validated by magic-byte inspection, not by extension or `Content-Type` alone.
- Maximum upload size enforced (default 25 MB; configurable).
- Uploaded files are stored in object storage with random unguessable keys; the original filename is not used as the storage key.
- Uploaded files are served with `Content-Disposition: attachment` or through a controlled viewer; they are not executed by the application runtime.
- Image processing goes through `sharp`, which has its own bounds-checking; `sharp` is kept up to date to mitigate image-parsing CVEs.

---

## 11. Prompt-injection boundaries (AI)

Because the audited website's content is untrusted, AI prompts that include audit findings are constructed with strict boundaries:

- **System instructions** are kept separate from user-controlled content. The model is instructed to treat website-extracted content as data, not as commands.
- **Structured-output validation** enforces a schema on AI responses (via Zod). Outputs that do not match the schema are rejected and surfaced as errors, not as content.
- **Human review gate.** AI-generated content is stored as a draft. The Agency user must approve before it appears in a published report. See [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md).
- **No tool-use exposure.** The AI provider is not granted tools or function-calling capability that could act on the Licensee's infrastructure.
- **Redaction options.** The Licensee can configure redaction of specific fields (e.g. PII) from prompts sent to the AI provider.

---

## 12. AI-output validation

- AI outputs are parsed against a Zod schema before being stored.
- Outputs that contain content violating WinterVell's content rules (e.g. instructions to perform actions on the Licensee's infrastructure) are rejected.
- Outputs are marked as AI-assisted and require human approval before publication.
- Outputs are timestamped and the prompt version is recorded with the output for auditability.

---

## 13. Webhook verification

- Incoming webhooks (e.g. from email providers, payment providers) are verified by signature (HMAC-SHA256 or provider-specific scheme).
- Webhook endpoints do not perform actions based on unsigned requests.
- Replay defence: webhook payloads include a timestamp; requests older than a configurable window are rejected.

---

## 14. Audit-log integrity

- Audit-log entries are append-only.
- Each entry is hashed; consecutive entries are chained so tampering is detectable (planned hardening: external log forwarding to a write-once sink).
- Logs include: timestamp, actor, action, resource, organisation, request correlation ID.
- Logs are retained per the retention schedule in [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md).

---

## 15. Session security

- Session tokens are signed (HMAC) and short-lived.
- Refresh tokens (where used) are rotated on use.
- Session revocation is supported (e.g. on password change, role change, or explicit logout).
- Concurrent session limits are configurable per organisation.

---

## 16. Password handling

- Passwords are hashed via NextAuth's bcrypt-equivalent credentials adapter.
- Password requirements are configurable; defaults enforce a minimum length and reject known-breached passwords (breach-check integration is planned, not in the foundation release).
- Password reset flows use single-use, expiring tokens.
- Passwords are never logged, never returned by any API, and never included in error messages.

---

## 17. Data deletion

See [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) Section 8. Key points:

- Per-record and bulk deletion supported.
- Object-storage artifacts are deleted alongside database rows.
- Backups age out per the retention window.
- Licence enforcement never deletes data.

---

## 18. Backup and restore

- Backups are taken per the operations runbook.
- Restore procedures are tested quarterly.
- Backups are encrypted at rest.
- Access to backups is restricted to operations personnel.

---

## 19. Logging redaction

- Application logs do not include personal data, secrets, API keys, or session tokens.
- Error logs include stack traces; sensitive values are redacted by a redaction middleware before the log is written.
- Token/cost logs for AI calls record token counts and estimated cost, not full prompts (unless verbose logging is explicitly enabled).
- Access logs for report share links record the share-link ID and coarse device category; the viewer's IP is recorded only if approximate-location tracking is enabled and lawful.

---

## 20. Error-response leakage

- User-facing API errors return a generic message and a correlation ID.
- Detailed stack traces are written to server logs only.
- 404 responses are uniform regardless of whether the resource exists in another tenant (to prevent existence probing).

---

## 21. Security headers

| Header | Value | Status |
|---|---|---|
| `Content-Security-Policy` | Strict CSP, `default-src 'self'` baseline with per-page allow-lists | Planned for hardening pass; baseline headers in place |
| `X-Frame-Options` | `DENY` on admin routes; report viewer framed only when explicitly permitted | Implemented |
| `X-Content-Type-Options` | `nosniff` | Implemented |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (or stricter) | Implemented |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (in production over HTTPS) | Implemented in production |
| `Permissions-Policy` | Restricted (no camera, microphone, geolocation by default) | Implemented |
| `Cross-Origin-Opener-Policy` | `same-origin` | Implemented |
| `Cross-Origin-Resource-Policy` | `same-origin` (or `same-site` where required for assets) | Implemented |

---

## 22. Secrets management

- Secrets are stored only in server-side environment variables (or a secrets manager in production).
- Secrets are never bundled into client-side JavaScript.
- CI secret scanning runs on every push and fails on detected secrets.
- The committed `.env.example` contains only placeholders, never real secrets.

---

## 23. Dependency vulnerability management

- Dependencies are scanned in CI (`.github/workflows/`) for known vulnerabilities.
- High and critical advisories block merge until triaged.
- Dependency upgrades are reviewed for breaking changes and licence impact (see [`DEPENDENCY_LICENSE_REPORT.md`](DEPENDENCY_LICENSE_REPORT.md)).

---

## 24. What is implemented vs planned

| Control | Status |
|---|---|
| NextAuth authentication, hashed passwords, signed sessions | Implemented |
| RBAC + `organisationId` scoping | Implemented |
| SSRF block-list, DNS rebinding defence, redirect re-validation, size/time limits, isolated worker | Implemented |
| Rate limiting on API routes | Implemented |
| CSRF tokens + same-site cookies | Implemented |
| React escaping + restricted markdown rendering | Implemented |
| Open-redirect allow-list | Implemented |
| File-upload magic-byte + size validation | Implemented |
| Prompt-injection boundaries + structured-output validation | Implemented |
| Webhook signature verification | Implemented |
| Audit-log append-only with hashing | Implemented (external write-once forwarding planned) |
| Session rotation, revocation | Implemented |
| Security headers (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy, COOP, CORP) | Implemented |
| Strict CSP with per-page allow-lists | Planned (baseline in place) |
| Multi-factor authentication | Planned |
| Breach-password check on signup/reset | Planned |
| Per-organisation outbound-fetch allow-list | Planned |
| External write-once audit-log forwarding | Planned |

For a full account of what is and is not yet implemented, see [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md).

---

## 25. What WinterVell does NOT claim

- WinterVell does **not** claim to be perfectly secure.
- WinterVell does **not** claim "full compliance" with any specific security framework (SOC 2, ISO 27001, etc.) without a separate audit.
- WinterVell does **not** claim that its SSRF defence eliminates all SSRF risk; defences reduce risk and a determined adversary may find novel vectors.
- WinterVell does **not** warrant that AI outputs are free of prompt-injection effects; the human-review gate is mandatory.
- WinterVell does **not** warrant that all third-party providers (hosting, AI, email, storage) are secure; that is the Licensee's responsibility to evaluate.

---

## 26. Reporting vulnerabilities

See [`SECURITY.md`](../../SECURITY.md) for the vulnerability disclosure policy, including the reporting channel, expected response time, and safe-harbour terms for good-faith reporters.

---

*This disclosure is part of the WinterVell legal package. It is maintained for accuracy but is **not legal advice** and does not constitute a warranty of security.*
