# Production Deployment

This guide deploys WinterVell to a production environment. For Vercel-specific deployment, see [`vercel-deployment.md`](vercel-deployment.md); for local development, see [`local-installation.md`](local-installation.md).

---

## Architecture

A production WinterVell deployment consists of:

- **Web application** — Next.js 16, long-running Node process (or Vercel functions).
- **Database** — PostgreSQL 15+, managed (recommended) or self-hosted.
- **Object storage** — S3-compatible (AWS S3, Cloudflare R2, Backblaze B2, MinIO).
- **Audit worker** — bun process, long-running.
- **PDF worker** — bun process, long-running.
- **Email provider** — SMTP or provider (Resend/SendGrid abstraction).
- **AI provider** — OpenAI-compatible or Anthropic.
- **(Optional) Redis** — for rate limiting and queue coordination across multiple worker processes.

---

## Prerequisites

- A domain name with DNS control.
- A PostgreSQL database (managed recommended: RDS, Cloud SQL, Neon, Supabase).
- An S3-compatible storage bucket.
- An email provider account (Resend, SendGrid, or SMTP server).
- An AI provider account (OpenAI, Anthropic, or OpenAI-compatible).
- A server or container platform for the workers (Vercel functions, a small VM, a container service).

---

## Steps

### 1. Provision the database

Create a PostgreSQL database. Record the connection string:

```
postgresql://<user>:<password>@<host>:<port>/<dbname>?schema=public
```

Recommended settings:

| Setting | Value |
|---|---|
| Version | 15+ |
| Instance size | Start with 2 vCPU / 4 GB RAM; scale based on audit throughput |
| Storage | 50 GB start; autoscale recommended |
| Connection pool size | 20 (web app) + 10 (audit worker) + 5 (PDF worker) = 35 max connections |
| Backup | Automated daily snapshots + PITR (see [`../operations/backup-restore.md`](../operations/backup-restore.md)) |
| High availability | Recommended for production (managed failover) |

See [`database-setup.md`](database-setup.md) for schema setup and migration.

### 2. Provision object storage

Create an S3-compatible bucket. Record:

- Endpoint URL.
- Region.
- Bucket name.
- Access key ID and secret access key.

Settings:

| Setting | Value |
|---|---|
| Public access | Blocked (all access via signed URLs) |
| Versioning | Enabled (for accidental-delete recovery) |
| Cross-region replication | Recommended (disaster recovery) |
| Lifecycle | Transition to cheaper tier after 30 days; delete after retention window |

See [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) for details.

### 3. Configure environment variables

Create a `.env` file (or use your deployment platform's secret manager). Reference: [`environment-variables.md`](environment-variables.md). Required for production:

| Variable | Example |
|---|---|
| `DATABASE_URL` | `postgresql://...` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://app.your-domain.com` |
| `STORAGE_DRIVER` | `s3` |
| `STORAGE_ENDPOINT` | `https://s3.us-east-1.amazonaws.com` |
| `STORAGE_REGION` | `us-east-1` |
| `STORAGE_BUCKET` | `wintervell-prod` |
| `STORAGE_ACCESS_KEY_ID` | `AKIA...` |
| `STORAGE_SECRET_ACCESS_KEY` | `...` |
| `AI_PROVIDER` | `openai` or `anthropic` |
| `AI_API_KEY` | `sk-...` |
| `AI_MODEL` | `gpt-4o-mini` or `claude-3-5-sonnet` |
| `EMAIL_PROVIDER` | `resend` or `sendgrid` or `smtp` |
| `EMAIL_FROM` | `noreply@your-domain.com` |
| `EMAIL_API_KEY` or SMTP vars | per provider |
| `WORKER_API_SECRET` | `openssl rand -base64 32` |
| `LICENCE_KEY` | issued by WinterVell |

Never commit `.env` to git. Use the deployment platform's secret manager.

### 4. Build the application

```bash
bun install --production
bun run build
```

The build outputs to `.next/`. The build is provider-agnostic; the same build runs on any Node-compatible host.

### 5. Start the web app

```bash
bun run start
```

The web app listens on port 3000 by default (override with `PORT`). Use a process manager (PM2, systemd, Docker, Vercel) to keep it running.

### 6. Start the workers

```bash
bun run worker:audit
bun run worker:pdf
```

Each worker is a separate long-running process. Run them on a separate host or container from the web app (the audit worker especially, since it crawls untrusted URLs — see [`audit-worker-setup.md`](audit-worker-setup.md)).

### 7. Configure the reverse proxy

Use a reverse proxy (Caddy, Nginx, Cloudflare, AWS ALB) to terminate TLS and route traffic:

- `app.your-domain.com` → web app (port 3000).
- `reports.your-domain.com` → web app (port 3000, same process; the report reader is a route on the web app).
- Workers are not exposed externally.

The reverse proxy should:

- Terminate TLS (Let's Encrypt or managed certs).
- Set HSTS, security headers (or delegate to Next.js — see [`../architecture/security-model.md`](../architecture/security-model.md)).
- Proxy WebSocket upgrade headers (for Socket.io).
- Rate-limit at the edge if desired (defense-in-depth; the app also rate-limits).

Example Caddyfile:

```
app.your-domain.com {
  reverse_proxy localhost:3000
  header {
    Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  }
}
```

### 8. Configure DNS

- `app.your-domain.com` → reverse proxy IP.
- `reports.your-domain.com` → reverse proxy IP (or a separate reverse proxy for white-labelled subdomains — see [`custom-domain-setup.md`](custom-domain-setup.md)).
- MX, SPF, DKIM, DMARC records for the email sender domain (per the email provider's docs).

### 9. Run database migrations

```bash
bun run prisma migrate deploy
```

This applies all pending migrations in order. Migrations are idempotent and safe to run on a running deployment (with caveats — see the migration's `README` if it includes breaking changes).

### 10. Smoke test

1. Visit `https://app.your-domain.com` — the login page should load.
2. Create an account (or sign in with the seeded Owner if you ran the seed).
3. Create an organisation, a prospect, and an audit.
4. Run the audit (requires the audit worker running).
5. View the audit results.
6. Generate and share a report.
7. Open the share link in an incognito window — the report should load.
8. Generate a PDF (requires the PDF worker running).

If any step fails, see [`troubleshooting.md`](troubleshooting.md).

### 11. Configure backups

Set up automated backups per [`backups.md`](backups.md) and [`../operations/backup-restore.md`](../operations/backup-restore.md). Verify with a test restore.

### 12. Configure monitoring

- Uptime monitoring on `https://app.your-domain.com` and `https://app.your-domain.com/api/health`.
- Worker health monitoring on `http://worker-host:3002/health`.
- Database monitoring (connections, disk, slow queries).
- Object-storage monitoring (bucket size, error rate).
- Alerting per [`../operations/incident-response.md`](../operations/incident-response.md).

---

## Scaling

| Component | Scale strategy |
|---|---|
| Web app | Horizontal (multiple instances behind a load balancer). State is in the database; sessions are database-backed. |
| Audit worker | Horizontal (multiple processes; `SKIP LOCKED` distributes jobs). |
| PDF worker | Horizontal (multiple processes). CPU-bound; scale based on PDF throughput. |
| Database | Vertical first; read replicas for read-heavy workloads. |
| Object storage | Provider-managed; effectively unlimited. |

---

## Security checklist

Before going live:

- [ ] `.env` is not committed; secrets are in a secret manager.
- [ ] `NEXTAUTH_SECRET` is a strong random value.
- [ ] `DATABASE_URL` uses TLS (`sslmode=require` or higher).
- [ ] Object storage bucket is private; access is via signed URLs only.
- [ ] AI provider key has usage limits configured at the provider.
- [ ] Email provider domain has SPF, DKIM, DMARC configured.
- [ ] Reverse proxy terminates TLS with a valid certificate.
- [ ] Security headers are set (CSP, HSTS, X-Frame-Options, etc.).
- [ ] Rate limiting is enabled.
- [ ] Backups are configured and a test restore has been performed.
- [ ] Monitoring and alerting are configured.
- [ ] The audit worker is network-isolated (no access to internal services).
- [ ] The licence key is configured and validation succeeds.

---

## Related documents

- [`local-installation.md`](local-installation.md) — local installation
- [`vercel-deployment.md`](vercel-deployment.md) — Vercel deployment
- [`database-setup.md`](database-setup.md) — database setup
- [`audit-worker-setup.md`](audit-worker-setup.md) — audit worker setup
- [`pdf-configuration.md`](pdf-configuration.md) — PDF worker setup
- [`environment-variables.md`](environment-variables.md) — env var reference
- [`backups.md`](backups.md) — backup configuration
- [`../operations/backup-restore.md`](../operations/backup-restore.md) — backup runbook
- [`../architecture/security-model.md`](../architecture/security-model.md) — security model
