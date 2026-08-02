# Upgrades

This guide describes how to upgrade a WinterVell deployment: pull the latest code, run migrations, clear the Next.js cache, smoke test, and roll back if necessary.

It is paired with [`database-setup.md`](database-setup.md) and [`../operations/backup-restore.md`](../operations/backup-restore.md).

---

## Pre-upgrade checklist

Before starting an upgrade:

- [ ] Read the release notes for the version you are upgrading to.
- [ ] Check for breaking changes (schema migrations, env var changes, deprecated features).
- [ ] Take a pre-migration database snapshot (managed service) or run a logical dump.
- [ ] Notify users of a brief maintenance window (if the upgrade requires downtime).
- [ ] Verify the upgrade on a staging deployment that mirrors production.
- [ ] Ensure you have a rollback plan (see below).

---

## Upgrade procedure

### 1. Pull the latest code

```bash
git fetch origin
git checkout <release-tag-or-branch>
git pull
```

Use a release tag (e.g. `v1.2.0`) rather than `main` for production deployments. Tags are immutable and tested; `main` may be ahead of a tagged release.

### 2. Install dependencies

```bash
bun install
```

If the upgrade changed `package.json`, this installs new dependencies and removes deprecated ones.

### 3. Run database migrations

```bash
bun run prisma migrate deploy
```

This applies pending migrations in order. It is safe to run on a running deployment, with caveats:

- **Additive migrations** (new tables, new columns) are safe; the running deployment continues to work.
- **Destructive migrations** (dropped columns, renamed tables) should be split into expand-and-contract: migration A adds the new structure and dual-writes; the new code is deployed; migration B removes the old structure. Review the migration's `README` for guidance.

If a migration fails, do **not** attempt to fix it in production. Roll back the code, restore the database from the pre-migration snapshot, and diagnose on staging.

### 4. Build the application

```bash
bun run build
```

The build outputs to `.next/`. If the build fails, do not proceed; the running deployment continues to serve the old build.

### 5. Clear the Next.js cache

```bash
rm -rf .next/cache
```

The Next.js cache can hold stale data across versions. Clearing it forces the new build to rebuild the cache. This is a safe operation; the cache rebuilds on the first requests.

For Vercel deployments, this step is automatic (each deployment gets a fresh cache).

### 6. Restart the web app

```bash
# systemd
sudo systemctl restart wintervell-web

# Docker
docker compose restart web

# PM2
pm2 restart wintervell-web

# Vercel: the deployment is automatic; no manual restart
```

### 7. Restart the workers

```bash
sudo systemctl restart wintervell-audit-worker
sudo systemctl restart wintervell-pdf-worker
```

Workers should be restarted after the web app, so they can connect to the new internal API.

### 8. Smoke test

Verify the upgraded deployment:

1. Log in.
2. View the dashboard.
3. Open a prospect.
4. View an audit.
5. Open a report share link in an incognito window.
6. Generate a PDF (if the PDF worker is running).
7. Check the audit worker health (`curl http://worker-host:3002/health`).
8. Check the PDF worker health (`curl http://worker-host:3003/health`).
9. Check the application logs for errors.

If any step fails, roll back (see below).

### 9. Monitor

For the first 24 hours after an upgrade, monitor:

- Error rates (Sentry, application logs).
- Latency (response time percentiles).
- Worker health (queue depth, job failure rate).
- Database performance (slow queries, connection count).
- User reports (support inbox).

A spike in errors or latency after an upgrade is a regression; investigate and roll back if necessary.

---

## Rollback

If the upgrade fails or causes regressions, roll back:

### Code rollback

```bash
git checkout <previous-release-tag>
bun install
bun run build
rm -rf .next/cache
# restart web app and workers
```

For Vercel: in the Vercel dashboard, find the last-known-good deployment and click **Promote to Production**.

### Database rollback

If the upgrade ran migrations, the database is in the new state. Rolling back the code without rolling back the database may cause errors (the old code expects the old schema).

Options:

1. **Forward-fix** (preferred): write a new migration that reverts the schema change. Apply it with `prisma migrate deploy`. This is safe and preserves data added since the upgrade.
2. **Restore from snapshot** (destructive): restore the database from the pre-migration snapshot. This loses all data added since the snapshot. Use only if forward-fix is not possible.

Database rollback is destructive and should be avoided by ensuring migrations are backward-compatible. See [`database-setup.md`](database-setup.md) for the expand-and-contract pattern.

### Configuration rollback

If the upgrade changed `.env` or other configuration, revert the configuration. Use the secrets manager's version history (if available) to roll back individual secrets.

---

## Schema migration safety

WinterVell migrations follow the expand-and-contract pattern:

1. **Expand** (migration A): add the new column, table, or index. The old code ignores it; the new code uses it. Apply migration A, deploy the new code.
2. **Migrate data** (if needed): backfill the new column from the old column. Run as a background job or a one-off script.
3. **Contract** (migration B, after the new code is live and stable): remove the old column. The new code no longer references it.

This pattern allows zero-downtime migrations. A migration that drops a column the running code still uses is a deployment hazard.

---

## Worker upgrades

Workers should be upgraded in step with the web app. A worker on an old version may post results in a format the new web app does not understand, or vice versa.

If you cannot upgrade all workers simultaneously:

1. Upgrade the web app first (it should be backward-compatible with the old workers).
2. Upgrade the workers next.
3. Verify the workers are posting results correctly.

A version-mismatch between web app and workers is detected by the internal API (which versioned the result format); mismatches are logged and alerted on.

---

## Vercel-specific upgrade notes

- Vercel auto-deploys on push to `main`. Tagged releases should be deployed via the Vercel dashboard's "Deploy" button on a specific commit, or by pushing the tag.
- Preview deployments allow testing an upgrade before promoting to production.
- Database migrations can be run as a Vercel build step (configure `vercel-build` in `package.json`) or from a local machine with `DATABASE_URL` pointed at production.
- Workers are not on Vercel; they are upgraded separately (see above).

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `prisma migrate deploy` fails | Migration conflict or schema drift | Inspect the error; restore from snapshot if unfixable |
| Build fails | Type error, missing dependency, env var | Inspect the build output; fix the code or config |
| Web app crashes on startup | Env var missing, database unreachable | Check `.env`, database connection |
| Workers cannot connect to web app | `WORKER_API_SECRET` mismatch, `WORKER_INTERNAL_API_URL` wrong | Verify env vars match between web app and workers |
| Smoke test fails on a specific feature | Regression in the upgrade | Roll back; diagnose on staging |

See [`troubleshooting.md`](troubleshooting.md) for more.

---

## Related documents

- [`database-setup.md`](database-setup.md) — database setup and migrations
- [`../operations/backup-restore.md`](../operations/backup-restore.md) — backup and restore
- [`production-deployment.md`](production-deployment.md) — production deployment
- [`vercel-deployment.md`](vercel-deployment.md) — Vercel deployment
- [`troubleshooting.md`](troubleshooting.md) — troubleshooting
