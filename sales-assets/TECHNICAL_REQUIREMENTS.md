# Technical Requirements

> Minimum and recommended specifications for deploying WinterVell. This
> document is buyer-facing and complements the detailed setup guides in
> [`docs/setup/`](../docs/setup/). WinterVell is a Next.js 16 application
> and inherits the platform requirements of that stack.

WinterVell is designed to run on standard commodity infrastructure. The
two most demanding subsystems are the **audit worker** (which renders and
analyses external websites) and **PDF generation** (which renders
multi-page branded reports server-side). Spec your environment for both.

---

## Runtime

| Component | Minimum | Recommended |
|---|---|---|
| Node.js | 20.x LTS | 22.x LTS |
| Package manager | npm 10+ or pnpm 9+ | Bun 1.1+ |
| Next.js | 16.x | 16.x (latest patch) |
| React | 19.x | 19.x (latest patch) |
| TypeScript | 5.x | 5.x (latest patch) |

Bun is the recommended package manager and dev runner because it is what
the WinterVell repository targets in its scripts. npm and pnpm will also
work for installation; ensure script parity before standardizing on them
in production.

## Database

| Component | Minimum | Recommended |
|---|---|---|
| PostgreSQL | 14.x | 16.x |
| Connection pooler | PgBouncer or equivalent | PgBouncer in transaction mode |
| Connections | 10 concurrent | 25–50 concurrent depending on team size |

SQLite is supported **for local development only**. Production must use
PostgreSQL. Do not run SQLite in any shared, multi-user, or production
environment.

## Compute

| Resource | Minimum (small agency) | Recommended (mid agency) |
|---|---|---|
| CPU | 2 vCPU | 4–8 vCPU |
| RAM | 4 GB | 8 GB |
| Audit-worker RAM | 2 GB dedicated | 4 GB dedicated |
| Disk (app + DB) | 20 GB SSD | 100 GB SSD |
| Disk (evidence + screenshots + PDFs) | 50 GB | 250 GB+ depending on audit volume |

The audit worker benefits from additional RAM because it runs a headless
browser. For agencies running many concurrent audits, run the audit
worker as a separately scalable service.

## Browser for audit worker

- **Recommended:** headless Chrome (Chromium) on the audit worker.
- A maintained, sandboxed headless Chrome build with `--no-sandbox` only
  inside a container that drops Linux capabilities and runs as a
  non-root user.
- Alternative: a managed browser-as-a-service provider, configured
  through the same audit-worker interface.

The audit worker never executes the audited site's JavaScript in a
context with access to WinterVell's internal network. See the SSRF note
below and [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md).

## Object storage

| Component | Minimum | Recommended |
|---|---|---|
| S3-compatible object storage | Required | Required |
| Examples | AWS S3, Cloudflare R2, Backblaze B2, MinIO | Same, with versioning enabled |
| Use | Screenshots, raw evidence, generated PDFs, agency logos | Same, with lifecycle rules and encryption at rest |

Object storage is used for screenshots, raw evidence, generated PDFs,
agency logos, and other media. Configure lifecycle rules to transition
older evidence to cheaper storage tiers or expire it according to your
retention policy.

## Email provider

| Component | Minimum | Recommended |
|---|---|---|
| SMTP relay or transactional API | Required | Required |
| Examples | Amazon SES, Postmark, Resend, SendGrid | Same, with dedicated IP and DMARC alignment |
| Use | Magic-link sign-in, report-share notifications, proposal notifications | Same, with bounce and complaint handling |

Email is used for magic-link sign-in, report-share notifications,
proposal notifications, and licence-related notices. Configure SPF,
DKIM, and DMARC for your sending domain.

## AI provider (optional)

| Component | Minimum | Recommended |
|---|---|---|
| OpenAI-compatible or Anthropic API key | Optional | Optional but recommended |
| Provider options | OpenAI-compatible, Anthropic, mock | Same, with usage limits configured |
| Use | Findings drafting, executive-summary drafting, proposal wording | Same, with token and cost logging enabled |

WinterVell ships with a mock AI provider so the product is fully
functional without an AI key. When an AI provider is not configured, the
product clearly indicates that the mock provider is in use; it never
implies a real AI provider is connected when it is not.

## Authentication

- NextAuth.js v4 with credentials, email magic link, and OAuth providers
  as configured.
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL` must be set.
- For OAuth providers (Google, GitHub, Microsoft, etc.), register the
  callback URLs in each provider's developer console.

## Deployment platform

- **Recommended:** Vercel (Next.js native, separate project from Cloudsun).
- **Alternative:** any Node.js-capable host that supports Next.js 16
  standalone build output (Netlify, Render, Railway, fly.io, a
  self-managed Node host behind a reverse proxy).
- For non-Vercel deployments, ensure long-running audit jobs and PDF
  generation run on a worker process or queue, not inside a serverless
  request handler with a tight timeout.

## Network egress and SSRF considerations

WinterVell accepts user-provided website URLs, so SSRF prevention is
mandatory. The audit worker:

- Resolves the target hostname and rejects localhost, loopback, private
  (RFC 1918), link-local, and cloud-metadata addresses.
- Rejects non-HTTP/HTTPS protocols.
- Validates redirects and rejects cross-protocol redirects to internal
  hosts.
- Enforces response-size and response-time limits.
- Runs in a network-segmented context with no access to WinterVell's
  internal services or metadata endpoints.

The full SSRF model is documented in
[`docs/architecture/security-model.md`](../docs/architecture/security-model.md)
and disclosed in [`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md).

## Browser support (end users)

- Modern evergreen browsers: Chrome, Edge, Firefox, Safari (latest two
  major versions).
- JavaScript enabled.
- Complex audit editing and report-builder interactions are optimized
  for desktop. Mobile is supported for review and read-only flows.

## Backups and disaster recovery

- Database: nightly logical backups (pg_dump) plus continuous WAL
  archiving for point-in-time recovery.
- Object storage: enable provider-side versioning and cross-region
  replication for critical evidence.
- Document a restore test cadence (at least quarterly). See
  [`docs/operations/`](../docs/operations/) for backup and incident
  response runbooks.

## CI/CD

- A GitHub Actions workflow (lint, type-check, build, security scan) is
  included in `.github/workflows/`.
- Recommended: deploy on green from `main` to a staging environment, and
  promote to production after smoke tests.

---

## Related documents

- [`INSTALLATION_CHECKLIST.md`](INSTALLATION_CHECKLIST.md) — step-by-step setup.
- [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md) — security summary for buyers.
- [`../docs/setup/`](../docs/setup/) — detailed setup guides.
- [`../docs/architecture/security-model.md`](../docs/architecture/security-model.md) — full security model.
