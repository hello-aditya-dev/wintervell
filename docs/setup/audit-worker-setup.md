# Audit Worker Setup

The audit worker is a separate bun mini-service that performs website crawling and analysis. It is the only component in WinterVell that makes outbound requests to prospect URLs. This guide describes how to run, configure, and harden the audit worker.

It is paired with [`../architecture/audit-engine.md`](../architecture/audit-engine.md), [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md), and [`../architecture/security-model.md`](../architecture/security-model.md).

---

## Why a separate worker

- Crawling untrusted URLs is SSRF surface. Isolating it in a separate process (and ideally a separate network) limits the blast radius.
- Crawls can take minutes (a Comprehensive audit crawls up to 50 pages). Long-running work does not belong on the web app's request cycle.
- The worker uses a sandboxed browser (Playwright) for JavaScript-rendered crawls. Playwright is heavy and should not run in the web app's process.
- The worker can be scaled independently of the web app (more workers for higher audit throughput).

---

## Prerequisites

- bun 1.1+
- The WinterVell repository checked out
- A running database (PostgreSQL for production, SQLite for development)
- A running object storage (S3-compatible for production, local disk for development)
- The WinterVell web app running (so the worker can post results to its internal API)
- (For JavaScript-rendered crawls) Playwright's Chromium binary installed

---

## Local development

### Start the worker

```bash
bun run worker:audit
```

The worker starts with `bun --hot` for fast iteration. It listens on port 3002 (configurable via `WORKER_AUDIT_PORT`) for the health and metrics endpoints.

### Health check

```bash
curl http://localhost:3002/health
# {"status":"ok","uptime":12345,"jobsRunning":1}
```

### Metrics

```bash
curl http://localhost:3002/metrics
# Prometheus-style metrics
```

### Install Playwright (for JS-rendered crawls)

```bash
bunx playwright install chromium
```

This installs the Chromium binary that Playwright uses for JavaScript-rendered crawls. Without it, the worker falls back to static-crawl mode (no JS execution), which is sufficient for most Technical and SEO checks but limited for Conversion/UX and Accessibility.

---

## Production deployment

### Run as a long-running process

The worker is a long-running bun process. Run it with a process manager:

**systemd** (Linux VM):

```ini
# /etc/systemd/system/wintervell-audit-worker.service
[Unit]
Description=WinterVell Audit Worker
After=network.target

[Service]
Type=simple
User=wintervell
WorkingDirectory=/opt/wintervell
ExecStart=/usr/bin/bun run worker:audit
Restart=on-failure
RestartSec=10
EnvironmentFile=/opt/wintervell/.env

[Install]
WantedBy=multi-user.target
```

**Docker**:

```dockerfile
FROM oven/bun:1.1
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --production
COPY . .
RUN bunx playwright install --with-deps chromium
CMD ["bun", "run", "worker:audit"]
```

**Render / Railway / Fly.io**: configure a long-running service with the start command `bun run worker:audit`.

### Environment variables

Set the worker-specific variables:

```env
WORKER_API_SECRET=<shared-secret>
WORKER_AUDIT_PORT=3002
WORKER_AUDIT_CONCURRENCY=2
WORKER_INTERNAL_API_URL=https://app.your-domain.com
DATABASE_URL=postgresql://...
STORAGE_DRIVER=s3
STORAGE_*=<as-per-web-app>
AI_PROVIDER=openai
AI_*=<as-per-web-app>
```

The `WORKER_API_SECRET` must match the web app's `WORKER_API_SECRET`. The worker uses it to authenticate to the web app's internal API.

### Playwright in production

For production, install Playwright with system dependencies:

```bash
bunx playwright install --with-deps chromium
```

This installs Chromium and the system libraries it depends on. Run this in the Dockerfile or the VM provisioning script.

---

## Crawler isolation (recommended for production)

The audit worker makes outbound requests to untrusted URLs. To limit the blast radius:

### Network isolation

Run the worker in a container or VM with:

- **No inbound access** except from the web app's IP (for the health/metrics endpoint, if monitored).
- **No access to internal services**: the database, object storage, and the web app's private network should be reachable only via their public endpoints. Internal IPs (`10.0.0.0/8`, `172.16.0.0/16`, `192.168.0.0/16`) should be unreachable from the worker except via the SSRF block-list.
- **Outbound to the public internet only**: the worker needs to crawl prospect URLs, reach the AI provider, reach object storage, and reach the web app's internal API.

In AWS, this is a security group with:

- Inbound: 3002 from the web-app security group only.
- Outbound: 443 to the internet; 5432 to the database; 443 to object storage.

### Container sandboxing

If you run the worker in Docker, additionally:

- Run the container with `--network=none` plus an explicit network that allows only the required outbound.
- Use `--read-only` for the filesystem; mount a tmpfs for `/tmp` (Playwright needs a scratch directory).
- Drop all capabilities (`--cap-drop=ALL`).
- Use a non-root user.
- Set `--memory=2g` and `--cpus=2` to bound resource usage.

### Playwright sandboxing

Playwright's Chromium should run with `--no-sandbox` only inside a container (the container provides the sandbox). On a VM, run with the sandbox enabled (default). See [`../operations/pdf-generation-failure.md`](../operations/pdf-generation-failure.md) for Playwright failure modes (the same applies to the audit worker's Playwright usage).

---

## SSRF configuration

The worker enforces the SSRF block-list per [`../architecture/security-model.md`](../architecture/security-model.md). The block-list is configurable via:

```env
AUDIT_CRAWLER_TIMEOUT_MS=30000
AUDIT_CRAWLER_MAX_RESPONSE_SIZE_MB=10
AUDIT_CRAWLER_MAX_REDIRECTS=5
AUDIT_SSRF_BLOCK_LIST_EXTRA=internal.your-domain.com,dev.your-domain.com
```

`AUDIT_SSRF_BLOCK_LIST_EXTRA` adds hostnames to the default block-list. Use this to block hostnames specific to your deployment that the default block-list would not catch (e.g. your internal DNS names).

---

## Rate limits

The worker respects:

- Per-host rate limits (default 1 request per second per host) to avoid hammering a prospect's site.
- Per-organisation audit concurrency (default 2 concurrent audits per organisation).
- Per-worker concurrency (`WORKER_AUDIT_CONCURRENCY`, default 2).

A worker that hits the per-host rate limit queues the request internally. A worker that hits the per-organisation concurrency limit leaves the job in the queue for another worker (or for the same worker once a job completes).

---

## Job queue

The worker claims jobs from the `Job` table using `FOR UPDATE SKIP LOCKED` (PostgreSQL) or an equivalent locking strategy (SQLite). Multiple workers can share the queue without double-processing. See [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md).

---

## Health and metrics

| Endpoint | Purpose |
|---|---|
| `GET /health` | Returns `{ status, uptime, jobsRunning }`. Used by load balancers and monitoring. |
| `GET /metrics` | Prometheus-style metrics: jobs processed, jobs failed, average job duration, current queue depth, per-runner success rate. |

Both endpoints are internal-only (not exposed to the public internet in production). Configure monitoring to scrape `/metrics` and alert on:

- `jobs_failed_total` increasing rapidly.
- `jobs_running` at the concurrency cap for an extended period (worker saturated).
- `average_job_duration_seconds` increasing (site responsiveness degrading, or a runner is slow).
- `/health` returning non-200 (worker down).

---

## Scaling

To scale the audit worker:

1. **Vertical**: increase `WORKER_AUDIT_CONCURRENCY` (default 2). Each concurrent job consumes memory (Playwright is heavy). A 4 GB / 2 vCPU machine handles 2–3 concurrent jobs comfortably.
2. **Horizontal**: run multiple worker processes. The `SKIP LOCKED` claim strategy distributes jobs. Each process should have its own health check.
3. **Workload-specific**: if you have a mix of Quick (fast) and Comprehensive (slow) audits, run separate worker pools with different concurrency settings.

---

## Related documents

- [`../architecture/audit-engine.md`](../architecture/audit-engine.md) — engine internals
- [`../architecture/worker-architecture.md`](../architecture/worker-architecture.md) — worker architecture
- [`../architecture/security-model.md`](../architecture/security-model.md) — SSRF block-list, egress policy
- [`../operations/audit-job-failure.md`](../operations/audit-job-failure.md) — failure runbook
- [`environment-variables.md`](environment-variables.md) — env var reference
- [`local-installation.md`](local-installation.md) — local installation
- [`production-deployment.md`](production-deployment.md) — production deployment
