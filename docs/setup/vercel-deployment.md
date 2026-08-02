# Vercel Deployment

WinterVell is deployed to Vercel as a **separate project** from Cloudsun. The two projects must never share a Vercel project ID, environment variables, database, domain, storage, auth secrets, email sender, analytics, or error-reporting configuration. This guide describes the WinterVell-specific Vercel setup.

It is paired with [`production-deployment.md`](production-deployment.md) (general production setup) and [`local-installation.md`](local-installation.md) (local development).

---

## Why a separate project

Cloudsun and WinterVell are different products with different deployments, different databases, and different customers. Sharing a Vercel project would:

- Mix environment variables and secrets.
- Mix deployment histories.
- Mix analytics and error reporting.
- Risk deploying WinterVell changes to Cloudsun or vice versa.
- Violate the provenance separation documented in [`../legal/PROVENANCE.md`](../legal/PROVENANCE.md).

The Cloudsun Vercel project is left untouched. WinterVell gets its own.

---

## Prerequisites

- A Vercel account with access to create projects.
- The WinterVell repository connected to Vercel (or a fork thereof).
- A PostgreSQL database (managed — Vercel Postgres, Neon, Supabase, RDS, etc.).
- An S3-compatible object storage bucket (Cloudflare R2 is recommended for Vercel deployments because it has no egress fees between Vercel and R2).
- An email provider account (Resend is recommended for Vercel deployments; SendGrid and SMTP also work).
- An AI provider account (OpenAI or Anthropic).
- A domain name with DNS control.

---

## Steps

### 1. Create the Vercel project

```bash
# From the WinterVell repo root
bunx vercel link
```

Choose **Create a new project**. Do **not** link to an existing project (especially not Cloudsun's). Name the project `wintervell` (or `wintervell-prod`).

### 2. Configure environment variables

In the Vercel dashboard (or via `bunx vercel env add`), add every variable from `.env.example`. Reference: [`environment-variables.md`](environment-variables.md).

Critical variables that must be **unique** to the WinterVell project (not reused from Cloudsun):

| Variable | Why unique |
|---|---|
| `DATABASE_URL` | Different database; never share Cloudsun's database |
| `NEXTAUTH_SECRET` | Different secret; never reuse Cloudsun's |
| `NEXTAUTH_URL` | WinterVell's domain |
| `STORAGE_*` | Different bucket; never reuse Cloudsun's bucket |
| `EMAIL_*` | Different sender identity; never reuse Cloudsun's email provider config |
| `AI_API_KEY` | Different key; never reuse Cloudsun's key (Cloudsun likely has no AI key — it's a CRM) |
| `WORKER_API_SECRET` | Different secret; never reuse Cloudsun's |
| `LICENCE_KEY` | WinterVell-issued licence; Cloudsun has no licence key |
| `SENTRY_DSN` (if used) | Different DSN; never reuse Cloudsun's |
| `ANALYTICS_ID` (if used) | Different ID; never reuse Cloudsun's |

Mark secrets as "Secret" in Vercel (not "Plain"). Mark non-secret config (like `NEXTAUTH_URL`) as "Plain" so it's visible in deployments.

### 3. Configure the build

Vercel auto-detects Next.js. The default build settings work:

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | `bun run build` (or `npm run build` if you prefer npm) |
| Output directory | `.next` (auto-detected) |
| Install command | `bun install` (or `npm install`) |

If using bun on Vercel, set the install command to `bun install` and ensure the Node version matches (Vercel supports bun natively).

### 4. Configure the database

Provision a managed PostgreSQL database. Recommended options for Vercel deployments:

- **Neon** — serverless PostgreSQL; scales to zero; generous free tier for development.
- **Vercel Postgres** — integrated; simple setup.
- **Supabase** — includes auth and storage (if you want to use Supabase for those too).
- **RDS** — for higher-throughput production; more setup.

Configure `DATABASE_URL` with the connection pooler URL (e.g. Neon's pooler) to avoid connection exhaustion under serverless load.

Run migrations:

```bash
bun run prisma migrate deploy
```

This can be run locally with `DATABASE_URL` pointed at the production database, or as a Vercel build step (configure a `vercel-build` script in `package.json`).

### 5. Configure object storage

Provision an S3-compatible bucket. For Vercel deployments, **Cloudflare R2** is recommended (no egress fees between Vercel and R2; cheaper than S3 for high-asset-volume deployments).

Configure `STORAGE_*` variables. See [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md).

### 6. Configure the audit and PDF workers

Vercel functions have a max duration (10s on Hobby, 60s on Pro, 300s on Enterprise with fluid compute). Audit and PDF jobs exceed this, so the workers **cannot run as Vercel functions**. Options:

- **Render, Railway, Fly.io** — small long-running containers; cost-effective for workers.
- **AWS ECS / Fargate** — for larger deployments.
- **A small VPS** — simplest; runs both workers on one machine.

Configure the workers to point at the production database, object storage, and the web app's internal API (`https://app.your-domain.com/api/v1/internal/`). See [`audit-worker-setup.md`](audit-worker-setup.md) and [`pdf-configuration.md`](pdf-configuration.md).

### 7. Configure the domain

In the Vercel dashboard, add your domain (e.g. `app.your-domain.com`). Vercel provisions a TLS certificate automatically.

Add a CNAME for `reports.your-domain.com` (or per-agency custom domains — see [`custom-domain-setup.md`](custom-domain-setup.md)) pointing to the same Vercel project. Vercel's `vercel.json` routes the report reader to the right handler.

Configure DNS at your registrar per Vercel's instructions.

### 8. Configure email

Provision an email provider (Resend recommended). Configure `EMAIL_*` variables. Set up SPF, DKIM, and DMARC at your DNS provider per the email provider's docs. See [`email-integration.md`](email-integration.md).

### 9. Configure the AI provider

Provision an AI provider account. Configure `AI_PROVIDER`, `AI_API_KEY`, and `AI_MODEL`. See [`ai-provider-configuration.md`](ai-provider-configuration.md).

### 10. Configure analytics and error reporting (optional)

- **Analytics** — Vercel Analytics (built-in), Plausible, or PostHog. Configure `ANALYTICS_ID`.
- **Error reporting** — Sentry. Configure `SENTRY_DSN`. Make sure this is WinterVell's DSN, not Cloudsun's.

### 11. Deploy

```bash
bunx vercel --prod
```

Or push to the `main` branch (if you've configured Vercel to auto-deploy from `main`).

### 12. Smoke test

Follow the smoke-test checklist in [`production-deployment.md`](production-deployment.md).

---

## Environment isolation

Vercel supports Preview deployments per branch. Recommended setup:

| Branch | Environment | Database | Storage |
|---|---|---|---|
| `main` | Production | Production database | Production bucket |
| `preview/*` | Preview | Preview database (Neon branch, Supabase branch, or a separate DB) | Preview bucket |
| `dev/*` | Development | Local SQLite | Local disk |

Preview deployments should **not** use the production database or production storage. A preview deployment that accidentally writes to the production database is a defect.

---

## Continuous deployment

Vercel auto-deploys on push to `main`. Recommended:

- Require pull-request reviews before merging to `main`.
- Require CI to pass (lint, type-check, test, build) before merging.
- Use Vercel's Preview deployments for review; reviewers check the preview URL before approving.
- Tag releases in git; Vercel's deployment history ties to commits.

See `../.github/workflows/` for CI configuration.

---

## Rollback

To roll back a Vercel deployment:

1. In the Vercel dashboard, go to **Deployments**.
2. Find the last-known-good deployment.
3. Click the "..." menu → **Promote to Production**.
4. Vercel immediately routes traffic to the previous deployment.

A rollback does not roll back the database. If a deployment ran migrations, the database is in the new state. To roll back the database, see [`../operations/backup-restore.md`](../operations/backup-restore.md) — but a database rollback is destructive and should be avoided by ensuring migrations are backward-compatible.

---

## Related documents

- [`production-deployment.md`](production-deployment.md) — general production setup
- [`local-installation.md`](local-installation.md) — local development
- [`database-setup.md`](database-setup.md) — database setup
- [`audit-worker-setup.md`](audit-worker-setup.md) — audit worker (not on Vercel)
- [`pdf-configuration.md`](pdf-configuration.md) — PDF worker (not on Vercel)
- [`custom-domain-setup.md`](custom-domain-setup.md) — custom domains
- [`environment-variables.md`](environment-variables.md) — env var reference
- [`../legal/PROVENANCE.md`](../legal/PROVENANCE.md) — provenance (separation from Cloudsun)
