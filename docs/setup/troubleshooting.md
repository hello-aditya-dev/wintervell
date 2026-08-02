# Troubleshooting

This guide covers common WinterVell issues and their fixes. For operational incidents, see [`../operations/incident-response.md`](../operations/incident-response.md); for upgrade-specific issues, see [`upgrades.md`](upgrades.md).

---

## Database connection issues

### Symptom: "Can't reach database server"

```
Error: Can't reach database server at `localhost:5432`
```

**Causes and fixes**:

| Cause | Fix |
|---|---|
| PostgreSQL not running | `sudo systemctl start postgresql` (or equivalent) |
| Wrong host in `DATABASE_URL` | Verify the host matches the database's hostname |
| Firewall blocking the port | Open port 5432 (or the configured port) |
| Database paused (serverless providers) | Wake the database (Neon: scale to zero may pause; touch the DB) |
| TLS mismatch | Add `?sslmode=require` (or `verify-full`) to `DATABASE_URL` |
| Credentials wrong | Verify username and password; reset if necessary |

### Symptom: "Too many connections"

```
Error: remaining connection slots are reserved for non-replication superuser connections
```

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Pool size too large for the database | Reduce pool size in the web app, audit worker, PDF worker |
| Connection leak (connections not released) | Inspect application code for missing `await prisma.$disconnect()` or unclosed transactions |
| Multiple worker processes each opening pools | Use a connection pooler (PgBouncer, Neon pooler) |
| Database `max_connections` too low | Increase in `postgresql.conf` (or managed-service config) |

### Symptom: Prisma migration conflict

```
Error: Migration failed to apply cleanly
```

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Schema drift (database changed outside migrations) | Run `bun run prisma migrate resolve --applied <migration>` to mark as applied, or restore from snapshot |
| Pending migration in a conflicting state | Inspect `_prisma_migrations` table; mark the failed migration as rolled back |
| Manual schema change conflicts | Restore from snapshot; redo the change as a migration |

---

## Authentication redirect issues

### Symptom: Login redirects to login (infinite loop)

**Causes and fixes**:

| Cause | Fix |
|---|---|
| `NEXTAUTH_URL` wrong | Must match the deployment's canonical URL exactly (including scheme and host) |
| `NEXTAUTH_SECRET` changed | Existing sessions are invalid; users must re-authenticate. Do not change `NEXTAUTH_SECRET` casually. |
| Cookie not set (third-party cookie blocked) | Ensure the deployment is on a first-party domain; `SameSite=Lax` should work for same-site auth |
| Reverse proxy stripping cookies | Configure the reverse proxy to pass cookies through |
| HTTPS not configured | NextAuth requires HTTPS in production; cookies are `Secure`-only |

### Symptom: "Unauthorized" on every request after login

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Session expired | Log in again |
| Database session table corrupt | Inspect `Session` table; clear orphaned sessions |
| `NEXTAUTH_SECRET` mismatch between web app and workers | Workers do not need `NEXTAUTH_SECRET`, but the web app must have a consistent one |

---

## SSRF blocks

### Symptom: Audit fails with "SSRF: blocked URL"

```
Error: SSRF: blocked URL: target hostname resolves to private IP
```

This is the SSRF block-list working as designed. See [`../architecture/security-model.md`](../architecture/security-model.md).

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Prospect's website resolves to a private IP (legitimate but rare) | The audit cannot be run against a private IP. This is by design. |
| Prospect's website redirects to a private IP | The audit cannot follow the redirect. This is by design. |
| Audit worker's own hostname is in the block-list | Add the hostname to `AUDIT_SSRF_BLOCK_LIST_EXTRA` is the opposite — remove it. Check the block-list configuration. |
| DNS rebinding detected | The site is using DNS rebinding. The audit is blocked; this is by design. |
| Cloud metadata endpoint hit | A redirect chain led to `169.254.169.254`. The audit is blocked; this is by design. |

If a prospect's legitimate site is being blocked:

- Verify the site is actually public (not on a private network).
- Verify the site is not redirecting to a private IP.
- If the site is legitimate and public, the block is a false positive; report it to engineering with the URL and the block-list reason.

---

## AI provider timeouts

### Symptom: Audit hangs at "Generating explanation drafts"

**Causes and fixes**:

| Cause | Fix |
|---|---|
| AI provider down | Check the provider's status page; switch to mock if needed (see [`../operations/ai-provider-failure.md`](../operations/ai-provider-failure.md)) |
| `AI_API_KEY` invalid | Verify the key; re-enter if necessary |
| `AI_TIMEOUT_MS` too low | Increase (default 30s is usually enough) |
| Provider rate limit hit | Reduce audit concurrency; upgrade provider plan |
| Network block to provider | Verify the worker can reach `api.openai.com` (or the configured `AI_BASE_URL`) |

### Symptom: Schema validation failures flooding the logs

```
AIUsage.status = "schema_validation_failed"
```

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Model returning malformed JSON | Retry handles it; if persistent, the prompt is ambiguous. Revise the prompt (new version). |
| Model changed (provider changed the model's behaviour) | Pin the model version; or revise the prompt. |
| Schema too strict | Relax the schema (with justification). |

---

## PDF render issues

### Symptom: PDF generation fails with "timeout"

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Report too large for the default timeout | Increase `PDF_RENDER_TIMEOUT_MS` or rely on large-report mitigations (see [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md)) |
| Playwright/Chromium not installed | `bunx playwright install --with-deps chromium` |
| Insufficient memory | Increase worker memory; reduce concurrency |
| Font file missing | Verify `PDF_FONT_HEADING` and `PDF_FONT_BODY` paths |

### Symptom: PDF renders with default font instead of brand font

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Font file missing | Verify the path; restore from git |
| Font file corrupt | Restore from git |
| Font file not OFL-licensed for bundling | Replace with a licensed font |

### Symptom: PDF renders with broken images

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Screenshot deleted from object storage | Re-run the audit (or partial retry) to regenerate |
| Object storage unreachable | Verify storage configuration and connectivity |
| Signed URL expired | The PDF worker should generate fresh signed URLs at render time; verify the worker's storage config |

---

## Build failures

### Symptom: `bun run build` fails

**Causes and fixes**:

| Cause | Fix |
|---|---|
| TypeScript error | Run `bun run type-check` for details; fix the type error |
| Missing env var at build time | `NEXT_PUBLIC_*` vars are needed at build time; set them in the build environment |
| Dependency issue | `bun install` may have skipped a peer dependency; try `bun install --force` |
| Out of memory | Increase build memory; reduce parallelism |

### Symptom: Build succeeds but runtime errors

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Server-only code imported on client | Check for `import` of `src/lib/db`, `src/lib/ai`, etc. from a client component |
| Env var available at build but not at runtime | Non-`NEXT_PUBLIC_` vars are read at runtime; ensure they're set in the runtime environment |
| Mismatched worker and web app versions | Upgrade workers in step with the web app (see [`upgrades.md`](upgrades.md)) |

---

## Worker issues

### Symptom: Audit worker not picking up jobs

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Worker not running | `curl http://worker-host:3002/health`; restart if down |
| `WORKER_API_SECRET` mismatch | Verify the secret matches between web app and worker |
| Database unreachable from worker | Verify `DATABASE_URL` from the worker's host |
| All workers at concurrency cap | Add more worker processes; or wait for in-flight jobs to finish |
| Job in `dead_letter` | Retry or cancel from the admin area |

### Symptom: Jobs stuck in "running" forever

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Worker crashed mid-job | The maintenance task resets stuck jobs after 5 minutes; verify the task is running |
| Worker hung (not crashed, but unresponsive) | Restart the worker; the maintenance task will reset its jobs |
| Job is genuinely long-running (large Comprehensive audit) | Wait; or cancel and re-run with fewer pages |

---

## Email issues

### Symptom: Emails not being sent

**Causes and fixes**:

| Cause | Fix |
|---|---|
| `EMAIL_PROVIDER=mock` in production | Change to `resend`, `sendgrid`, or `smtp` |
| API key invalid | Verify the key; test from the admin area |
| Recipient on suppression list | Check the suppression list in the admin area |
| DNS (SPF/DKIM/DMARC) misconfigured | Verify DNS records at the sender domain |
| Webhook not configured | Bounce/complaint webhooks are needed for suppression-list updates |

### Symptom: Emails landing in spam

**Causes and fixes**:

| Cause | Fix |
|---|---|
| SPF/DKIM/DMARC misconfigured | Verify with the email provider's domain-setup tool |
| Sender domain reputation low | Warm up the domain; use a dedicated IP if volume is high |
| Email content looks spammy | Avoid spam-trigger words; ensure a plain-text alternative is included |
| Recipient's provider is aggressive | Ask the recipient to whitelist the sender |

---

## Licence issues

### Symptom: "Licence validation failed" banner

**Causes and fixes**:

| Cause | Fix |
|---|---|
| Licence server unreachable | See [`../operations/licence-server-failure.md`](../operations/licence-server-failure.md) |
| `LICENCE_KEY` invalid | Verify the key with WinterVell support |
| Deployment fingerprint changed | The licence is bound to the deployment; contact WinterVell support to re-bind |
| Grace period expired | Contact WinterVell support; data is preserved |

---

## Getting help

If this guide does not resolve the issue:

1. Check the application logs for the specific error.
2. Check the relevant runbook in [`../operations/`](../operations/).
3. Check the relevant architecture doc in [`../architecture/`](../architecture/).
4. If the issue is a security vulnerability, follow [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md).
5. If the issue is a bug, open an issue in the repository with: the version, the deployment type (Vercel / self-hosted / dev), the steps to reproduce, the expected behaviour, the actual behaviour, and the relevant logs (with redactions per [`../architecture/security-model.md`](../architecture/security-model.md)).

---

## Related documents

- [`../operations/incident-response.md`](../operations/incident-response.md) — incident response
- [`../operations/audit-job-failure.md`](../operations/audit-job-failure.md) — audit failure runbook
- [`../operations/ai-provider-failure.md`](../operations/ai-provider-failure.md) — AI provider runbook
- [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md) — PDF runbook
- [`../operations/licence-server-failure.md`](../operations/licence-server-failure.md) — licence runbook
- [`../architecture/security-model.md`](../architecture/security-model.md) — security model
- [`upgrades.md`](upgrades.md) — upgrade procedure
- [`environment-variables.md`](environment-variables.md) — env var reference
