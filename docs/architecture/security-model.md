# Security Model

WinterVell accepts user-provided website URLs, so SSRF prevention is the single most critical security control. This document describes the full security model: SSRF block-list, RBAC, IDOR defence, rate limiting, CSRF, XSS/CSP, open-redirect, file-upload, prompt-injection, AI-output validation, webhook verification, audit-log integrity, session security, password hashing, logging redaction, error-response leakage, and security headers.

It is paired with [`multi-tenancy.md`](multi-tenancy.md) (tenant isolation), [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md) (disclosure), and [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md) (what is not yet implemented).

---

## SSRF block-list

Every outbound request to a prospect URL is validated against a block-list before the request is made. The block-list is enforced in the audit worker (the only component that crawls). The web app does not make outbound requests to prospect URLs.

### Blocked destinations

| Category | Examples |
|---|---|
| Loopback | `localhost`, `127.0.0.0/8`, `::1` |
| Private ranges | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` |
| Link-local | `169.254.0.0/16` (includes AWS, GCP, Azure cloud-metadata endpoints at `169.254.169.254`) |
| Unique local addresses | `fc00::/7` |
| Internal hostnames | Any hostname that resolves to a private IP; any hostname in a configured internal-hostname list (for example, the deployment's own internal DNS) |
| Non-HTTP protocols | `file://`, `ftp://`, `gopher://`, `dict://`, `ldap://`, `jar://`, `netdoc://`, anything other than `http` and `https` |
| Cloud metadata endpoints | `169.254.169.254`, `metadata.google.internal`, `metadata.azure.com`, plus the link-local range above |

### Defence in depth

A single block-list check is not enough. WinterVell applies:

1. **URL parsing** — reject non-HTTP(S) schemes, reject userinfo, reject fragments.
2. **Hostname resolution** — resolve the hostname to IPs.
3. **IP block-list check** — reject if any resolved IP is in a blocked range.
4. **DNS rebinding defence** — after resolution, lock the IP and connect to that IP directly with the `Host` header set to the original hostname. Re-resolve on retry; reject if the new IP differs from the locked IP and is in a blocked range.
5. **Redirect re-validation** — on every redirect (3xx), re-validate the new URL against the full block-list. A redirect to a private IP is blocked.
6. **Response size cap** — default 10 MB. Abort if exceeded.
7. **Response time cap** — default 30 s. Abort if exceeded.
8. **Redirect loop cap** — default 5 hops. Abort if exceeded.
9. **Crawler network isolation** — recommended: run the audit worker in a container/VM with no route to internal services. See [`../setup/audit-worker-setup.md`](../setup/audit-worker-setup.md).

The block-list is unit-tested against a fixture of known SSRF payloads. Adding a new payload to the fixture and watching the test fail is the canonical way to verify a new SSRF defence.

---

## Permission-based RBAC

See [`../product/user-roles.md`](../product/user-roles.md) for the role-permission matrix and [`multi-tenancy.md`](multi-tenancy.md) for the four-step authorization contract. The short version: every sensitive server action checks (1) authentication, (2) organisation membership, (3) permission, (4) resource ownership. Hiding UI is not the security boundary.

---

## IDOR defence

See [`multi-tenancy.md`](multi-tenancy.md). The short version: a failed ownership check returns 404, not 403. Existence of a resource owned by another organisation is never confirmed.

---

## Rate limiting

Rate limiting is applied to:

| Surface | Limit | Reason |
|---|---|---|
| Authentication (login, signup, password reset) | 5 per minute per IP | Brute-force defence |
| Audit creation | 10 per hour per organisation | Runaway-audit defence |
| Report share link creation | 50 per hour per organisation | Share-link abuse |
| Report share link views | 100 per hour per share link | View-cap abuse |
| AI calls | Per organisation's usage limits (see [`ai-provider-abstraction.md`](ai-provider-abstraction.md)) | Cost control |
| Public API (with API key) | 1000 per hour per key default; configurable | API abuse |
| Password-protected share link attempts | 10 per minute per share link | Password brute-force |

Rate limits are enforced via a sliding-window counter in Redis (production) or in-memory (development). Exceeding a limit returns 429 with a `Retry-After` header.

---

## CSRF

Server actions in Next.js App Router are protected against CSRF by the framework's built-in mechanism (origin check on POST). Forms that submit via traditional POST (rare in WinterVell) include a synchroniser token. The token is validated server-side.

---

## XSS and CSP

- **Output encoding**: all user-supplied content is rendered through React's JSX escaping. `dangerouslySetInnerHTML` is used only for trusted content (rendered markdown, rendered report sections) and only after sanitisation.
- **Markdown rendering**: `react-markdown` with a restricted component map. HTML in markdown is stripped (no `html: true`). Only a safe subset of HTML is allowed in evidence snippets, and only after sanitisation with an allowlist.
- **CSP**: a Content-Security-Policy header is set in `next.config.ts`. Default-src is `'self'`; script-src is `'self'` plus the framework's required nonces; style-src is `'self'` plus inline styles required by Next.js; img-src is `'self'` plus the object-storage domain; connect-src is `'self'` plus the Socket.io endpoint and the AI provider's domain (server-side only, not in the browser CSP).
- `X-Frame-Options: DENY` on the administrative area; `SAMEORIGIN` on the report reader (some agencies embed reports in iframes for their own portals).
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` restrictive (no camera, microphone, geolocation, payment).

---

## Open-redirect

Any redirect that takes a user-supplied `next` or `redirect` parameter validates that the target is a relative path or an allowed host. Absolute URLs to other hosts are rejected. This applies to login redirects, logout redirects, and share-link redirects.

---

## File upload

File uploads (logos, favicons, agency assets, evidence attachments) are validated:

- **Type** — checked by extension AND by magic-byte sniffing. Only allowlisted types are accepted (PNG, JPEG, SVG for logos; ICO for favicons; PDF for attachments).
- **Size** — capped per type (default 5 MB for images, 25 MB for PDFs).
- **SVG sanitisation** — SVGs are parsed and stripped of `<script>`, event handlers, external references, and `<use>` elements that reference external content.
- **Filename** — original filename is discarded; a server-generated UUID filename is used. The original filename is stored as metadata only.
- **Storage** — files are stored in object storage with no execute permission. See [`storage-architecture.md`](storage-architecture.md).
- **Virus scan** — recommended in production; an external scanner (ClamAV or equivalent) scans uploads before they are made accessible. The scan result is recorded.

---

## Prompt-injection boundaries

AI prompts that include user-provided content (prospect name, page text, raw evidence) follow these rules:

- User-provided content is inserted into a clearly-delimited section of the prompt, never into the system prompt.
- The system prompt instructs the model to treat that section as untrusted data, not as instructions.
- The model's output is validated against a Zod schema (see [`ai-provider-abstraction.md`](ai-provider-abstraction.md)).
- The model's output is never executed as code, never rendered as raw HTML without sanitisation, and never used as a database query.
- A model that produces output containing instruction-like content (for example, "ignore previous instructions") is logged at `WARN` level; the output is still validated against the schema and rejected if it does not match.

See [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md) for the full prompt-injection analysis.

---

## AI-output validation

See [`ai-provider-abstraction.md`](ai-provider-abstraction.md). The short version: every structured AI output is validated against a Zod schema; invalid output is retried with a corrective preamble, then falls back to a templated output. Invalid output never reaches the database.

---

## Webhook verification

Inbound webhooks (from AI providers, email providers, storage providers) are verified:

- **Signature** — the webhook's signature header is validated against the shared secret using HMAC-SHA256. Unsigned or incorrectly-signed webhooks are rejected with 401.
- **Timestamp** — the webhook's timestamp is checked for replay (rejected if older than 5 minutes).
- **Idempotency** — the webhook's event ID is recorded; a replayed event is acknowledged but not re-processed.

Webhook endpoints are not protected by NextAuth (they are called by machines, not users); they are protected by the signature shared secret.

---

## Audit-log integrity

The `AuditLog` is append-only. Records are never edited or deleted in normal operation. Each record contains:

- `previousHash` — the hash of the previous record.
- `recordHash` — the hash of this record's content plus `previousHash`.

This forms a hash chain. Tampering with a record invalidates the chain from that record forward. A maintenance job periodically verifies the chain and alerts on any break.

Audit-log records are retained indefinitely (or per the agency's retention configuration). They are never auto-deleted. See [`../operations/data-deletion.md`](../operations/data-deletion.md) for the rare case of forced deletion under legal order.

---

## Session security

- **NextAuth v4** with database-backed sessions (the `Session` model).
- **Cookie** — `HttpOnly`, `Secure` (production), `SameSite=Lax` (or `Strict` for sensitive operations).
- **Session expiry** — 30 days of inactivity; refreshable on activity.
- **Session revocation** — an Administrator can revoke any user's sessions; a user can revoke their own sessions; password change revokes all of the user's sessions.
- **Concurrent sessions** — allowed but visible in the user's session list.

---

## Password hashing

Passwords are hashed with bcrypt (cost factor 12). The hash is stored in `User.passwordHash`. The plaintext password is never logged, never cached, never sent to the client.

Password reset uses a single-use token with a short expiry (15 minutes). Tokens are hashed at rest; the plaintext token is sent to the user once (by email) and never stored.

---

## Logging redaction

Application logs redact:

- Passwords, password hashes, API keys, session tokens, refresh tokens.
- Email addresses (replaced with `[email]` unless the log is organisation-scoped and the agency's data-residency config permits).
- Phone numbers (replaced with `[phone]`).
- Credit card numbers (never stored; WinterVell does not process payments directly).
- The `Authorization` header (replaced with `[redacted]`).
- Request bodies for auth endpoints (not logged at all).

A log line that accidentally includes a redactable field is a bug. The logging helper enforces redaction; raw `console.log` of sensitive data is a code-review block.

---

## Error-response leakage

Error responses follow a strict no-leakage policy:

- 404 responses return a generic "not found" message; they do not reveal whether the resource exists in another organisation.
- 403 responses return a generic "forbidden" message; they do not reveal which permission was missing.
- 500 responses return a generic "internal error" message with a correlation ID. The stack trace is logged server-side with the same correlation ID; it is never sent to the client.
- Validation errors (400) return field-level messages but do not reveal internal field names or schema details beyond what the user submitted.

---

## Security headers

Set in `next.config.ts` and reinforced by middleware:

- `Content-Security-Policy` — see XSS/CSP above.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY` (admin) / `SAMEORIGIN` (reader)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp` (where compatible)

Headers are tested in CI with a header-check script.

---

## Related documents

- [`multi-tenancy.md`](multi-tenancy.md) — tenant isolation
- [`audit-engine.md`](audit-engine.md) — where SSRF matters
- [`ai-provider-abstraction.md`](ai-provider-abstraction.md) — prompt-injection boundaries
- [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md) — security disclosure
- [`../legal/KNOWN_LIMITATIONS.md`](../legal/KNOWN_LIMITATIONS.md) — what is not yet implemented
- [`../product/user-roles.md`](../product/user-roles.md) — RBAC matrix
