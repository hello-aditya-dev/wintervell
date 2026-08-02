# Environment Variables

This is the reference for every environment variable in WinterVell's `.env.example`. Each entry lists the variable name, description, whether it is required or optional, and an example.

It is paired with [`local-installation.md`](local-installation.md) and [`production-deployment.md`](production-deployment.md).

---

## Conventions

- Required variables must be set for the application to start.
- Optional variables have sensible defaults; unset means default.
- Secret variables should be stored in a secret manager in production (not in plain `.env`).
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; do not put secrets in them.
- Variables are read at build time (for `NEXT_PUBLIC_*`) or at runtime (for everything else).

---

## Application

| Variable | Required | Description | Example |
|---|---|---|---|
| `NODE_ENV` | yes | `development`, `production`, or `test`. | `production` |
| `NEXTAUTH_URL` | yes | The canonical URL of the deployment. Used for callbacks, emails, and absolute URLs. | `https://app.your-domain.com` |
| `NEXTAUTH_SECRET` | yes | Secret for NextAuth session signing. Generate with `openssl rand -base64 32`. | `...` |
| `APP_NAME` | no | Override the application name shown in the admin area. Default: `WinterVell`. | `WinterVell` |
| `APP_PORT` | no | Port the web app listens on. Default: `3000`. | `3000` |
| `NEXT_PUBLIC_APP_URL` | no | Public URL for client-side absolute URLs. Defaults to `NEXTAUTH_URL`. | `https://app.your-domain.com` |

---

## Database

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | yes | Prisma connection string. SQLite for dev, PostgreSQL for prod. | `file:./db/wintervell.db` (dev) or `postgresql://...` (prod) |
| `SHADOW_DATABASE_URL` | no | A separate database for Prisma's migration shadow DB (required for PostgreSQL with restricted permissions). | `postgresql://.../wintervell_shadow` |
| `DIRECT_URL` | no | Direct (non-pooled) database URL for migrations. Often the same as `DATABASE_URL` for non-serverless deployments. | `postgresql://...` |

---

## Storage

| Variable | Required | Description | Example |
|---|---|---|---|
| `STORAGE_DRIVER` | yes | `local` (dev) or `s3` (prod). | `s3` |
| `STORAGE_ENDPOINT` | if s3 | S3-compatible endpoint. | `https://s3.us-east-1.amazonaws.com` |
| `STORAGE_REGION` | if s3 | Region. | `us-east-1` |
| `STORAGE_BUCKET` | if s3 | Bucket name. | `wintervell-prod` |
| `STORAGE_ACCESS_KEY_ID` | if s3 | Access key ID. | `AKIA...` |
| `STORAGE_SECRET_ACCESS_KEY` | if s3 | Secret access key. | `...` |
| `STORAGE_FORCE_PATH_STYLE` | no | `true` for MinIO and some S3-compatible providers. Default: `false`. | `false` |
| `STORAGE_LOCAL_PATH` | if local | Path for local-disk storage. Default: `./upload`. | `./upload` |

---

## Authentication

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXTAUTH_URL` | yes | (see Application) | |
| `NEXTAUTH_SECRET` | yes | (see Application) | |
| `AUTH_GOOGLE_ID` | no | Google OAuth client ID (if Google sign-in enabled). | `...` |
| `AUTH_GOOGLE_SECRET` | no | Google OAuth client secret. | `...` |
| `AUTH_GITHUB_ID` | no | GitHub OAuth client ID. | `...` |
| `AUTH_GITHUB_SECRET` | no | GitHub OAuth client secret. | `...` |
| `PASSWORD_MIN_LENGTH` | no | Minimum password length. Default: `12`. | `12` |
| `PASSWORD_REQUIRE_SPECIAL` | no | Require special characters in passwords. Default: `true`. | `true` |
| `SESSION_MAX_AGE_DAYS` | no | Session inactivity timeout in days. Default: `30`. | `30` |

---

## AI provider

| Variable | Required | Description | Example |
|---|---|---|---|
| `AI_PROVIDER` | yes | `mock`, `openai`, or `anthropic`. | `openai` |
| `AI_API_KEY` | if not mock | API key for the provider. | `sk-...` |
| `AI_MODEL` | if not mock | Model identifier. | `gpt-4o-mini` |
| `AI_BASE_URL` | no | Override the provider's base URL (for OpenAI-compatible providers like Azure OpenAI, OpenRouter, vLLM). | `https://api.openai.com/v1` |
| `AI_TIMEOUT_MS` | no | Per-call timeout. Default: `30000`. | `30000` |
| `AI_MAX_RETRIES` | no | Max retry attempts. Default: `2`. | `2` |
| `AI_MONTHLY_TOKEN_CAP` | no | Per-organisation monthly token cap. Default: unlimited. | `1000000` |
| `AI_MONTHLY_COST_CAP_USD` | no | Per-organisation monthly cost cap in USD. Default: unlimited. | `100` |
| `AI_REDACT_EMAILS` | no | Redact emails in prompts. Default: `true`. | `true` |
| `AI_REDACT_PHONES` | no | Redact phone numbers in prompts. Default: `true`. | `true` |

---

## Email

| Variable | Required | Description | Example |
|---|---|---|---|
| `EMAIL_PROVIDER` | yes | `mock`, `resend`, `sendgrid`, or `smtp`. | `resend` |
| `EMAIL_FROM` | if not mock | Sender email address. | `noreply@your-domain.com` |
| `EMAIL_FROM_NAME` | if not mock | Sender display name. | `Your Agency` |
| `EMAIL_REPLY_TO` | no | Reply-to address. Defaults to `EMAIL_FROM`. | `support@your-domain.com` |
| `RESEND_API_KEY` | if resend | Resend API key. | `re_...` |
| `SENDGRID_API_KEY` | if sendgrid | SendGrid API key. | `SG....` |
| `SMTP_HOST` | if smtp | SMTP host. | `smtp.your-domain.com` |
| `SMTP_PORT` | if smtp | SMTP port. | `587` |
| `SMTP_USER` | if smtp | SMTP username. | `...` |
| `SMTP_PASSWORD` | if smtp | SMTP password. | `...` |
| `SMTP_SECURE` | if smtp | Use TLS. Default: `true` for port 465, `false` otherwise. | `true` |

---

## Workers

| Variable | Required | Description | Example |
|---|---|---|---|
| `WORKER_API_SECRET` | yes (prod) | Shared secret between the web app and the workers. | `openssl rand -base64 32` |
| `WORKER_AUDIT_PORT` | no | Audit worker port. Default: `3002`. | `3002` |
| `WORKER_PDF_PORT` | no | PDF worker port. Default: `3003`. | `3003` |
| `WORKER_AUDIT_CONCURRENCY` | no | Concurrent jobs per audit worker. Default: `2`. | `2` |
| `WORKER_PDF_CONCURRENCY` | no | Concurrent jobs per PDF worker. Default: `1`. | `1` |
| `WORKER_INTERNAL_API_URL` | no | URL of the web app's internal API. Default: `http://localhost:3000`. | `https://app.your-domain.com` |

---

## Audit engine

| Variable | Required | Description | Example |
|---|---|---|---|
| `AUDIT_CRAWLER_TIMEOUT_MS` | no | Per-request timeout. Default: `30000`. | `30000` |
| `AUDIT_CRAWLER_MAX_RESPONSE_SIZE_MB` | no | Response size cap. Default: `10`. | `10` |
| `AUDIT_CRAWLER_MAX_REDIRECTS` | no | Redirect hop cap. Default: `5`. | `5` |
| `AUDIT_RUNNER_TIMEOUT_MS` | no | Per-runner timeout. Default: `300000` (5 min). | `300000` |
| `AUDIT_RUNNER_MAX_RETRIES` | no | Per-runner retries. Default: `3`. | `3` |
| `AUDIT_MAX_PAGES_PER_AUDIT` | no | Page cap. Default: `50`. | `50` |
| `AUDIT_MAX_SCREENSHOTS_PER_AUDIT` | no | Screenshot cap. Default: `200`. | `200` |
| `AUDIT_SSRF_BLOCK_LIST_EXTRA` | no | Extra hostnames to block (comma-separated). | `internal.your-domain.com` |

---

## PDF

| Variable | Required | Description | Example |
|---|---|---|---|
| `PDF_RENDER_TIMEOUT_MS` | no | Render timeout. Default: `120000` (2 min). | `120000` |
| `PDF_LARGE_REPORT_THRESHOLD_FINDINGS` | no | Findings count above which large-report mitigations apply. Default: `100`. | `100` |
| `PDF_LARGE_REPORT_THRESHOLD_PAGES` | no | Page count above which large-report mitigations apply. Default: `200`. | `200` |
| `PDF_LARGE_REPORT_RENDER_TIMEOUT_MS` | no | Render timeout for large reports. Default: `300000` (5 min). | `300000` |
| `PDF_FONT_HEADING` | no | Heading font file path. Default: bundled Fraunces. | `./public/fonts/Fraunces.woff2` |
| `PDF_FONT_BODY` | no | Body font file path. Default: bundled Inter. | `./public/fonts/Inter.woff2` |
| `PDF_PAGE_SIZE` | no | Page size. Default: `A4`. | `A4` |

---

## Licence

| Variable | Required | Description | Example |
|---|---|---|---|
| `LICENCE_KEY` | yes (prod) | WinterVell-issued licence key. | `wv-...` |
| `LICENCE_SERVER_URL` | no | Licence validation server URL. Default: WinterVell's server. | `https://licence.wintervell.example` |
| `LICENCE_GRACE_DAYS` | no | Offline grace period in days. Default: `14`. Minimum: `7`. | `14` |
| `LICENCE_VALIDATION_INTERVAL_HOURS` | no | Validation interval in hours. Default: `24`. | `24` |

---

## Rate limiting

| Variable | Required | Description | Example |
|---|---|---|---|
| `RATE_LIMIT_DRIVER` | no | `memory` (dev) or `redis` (prod). Default: `memory`. | `redis` |
| `REDIS_URL` | if redis | Redis connection string. | `redis://...` |
| `RATE_LIMIT_AUTH_PER_MINUTE` | no | Auth endpoint rate limit. Default: `5`. | `5` |
| `RATE_LIMIT_AUDIT_CREATE_PER_HOUR` | no | Audit creation rate limit. Default: `10`. | `10` |
| `RATE_LIMIT_REPORT_SHARE_PER_HOUR` | no | Share-link creation rate limit. Default: `50`. | `50` |
| `RATE_LIMIT_REPORT_VIEW_PER_HOUR` | no | Share-link view rate limit. Default: `100`. | `100` |

---

## Observability

| Variable | Required | Description | Example |
|---|---|---|---|
| `LOG_LEVEL` | no | `debug`, `info`, `warn`, `error`. Default: `info`. | `info` |
| `SENTRY_DSN` | no | Sentry DSN for error reporting. | `https://...@sentry.io/...` |
| `SENTRY_ENVIRONMENT` | no | Sentry environment name. | `production` |
| `ANALYTICS_ID` | no | Analytics provider ID (Plausible, PostHog, etc.). | `...` |
| `ANALYTICS_PROVIDER` | no | `plausible`, `posthog`, `vercel`. Default: none. | `plausible` |

---

## Custom domains

| Variable | Required | Description | Example |
|---|---|---|---|
| `CUSTOM_DOMAIN_VERIFICATION_TOKEN` | no | Token used to verify domain ownership. Generated per agency. | `wv-verify-...` |
| `CUSTOM_DOMAIN_SSL_PROVIDER` | no | `letsencrypt` or `managed`. Default: managed (Vercel) or `letsencrypt` (self-hosted). | `letsencrypt` |

---

## Related documents

- [`local-installation.md`](local-installation.md) — local installation
- [`production-deployment.md`](production-deployment.md) — production deployment
- [`vercel-deployment.md`](vercel-deployment.md) — Vercel deployment
- [`database-setup.md`](database-setup.md) — database setup
- [`ai-provider-configuration.md`](ai-provider-configuration.md) — AI provider configuration
- [`email-integration.md`](email-integration.md) — email integration
- [`audit-worker-setup.md`](audit-worker-setup.md) — audit worker setup
- [`pdf-configuration.md`](pdf-configuration.md) — PDF configuration
