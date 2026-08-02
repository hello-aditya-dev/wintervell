# Backup and Restore

This runbook describes how WinterVell's data is backed up and how to restore it. It covers PostgreSQL, object storage, and configuration. It is paired with [`backups.md`](../setup/backups.md) (backup scheduling) and [`data-deletion.md`](data-deletion.md) (deletion procedures that interact with restore).

---

## What is backed up

| Component | What | Where | Frequency |
|---|---|---|---|
| PostgreSQL database | All tenant data, audit logs, licence records | Managed-database snapshots + logical dumps | Continuous WAL archiving (point-in-time recovery to within 5 minutes); daily full logical dump |
| Object storage | Screenshots, PDFs, evidence, branding, uploads | S3 versioning + cross-region replication + daily backup bucket | Continuous (versioning); daily (backup bucket) |
| Configuration | `.env`, deployment config, DNS records | Secrets manager + git (config-only) | On change |
| AI prompts and code | `src/prompts/`, `prisma/`, `src/` | Git repository | On commit |

---

## PostgreSQL backup

### Managed snapshots

For production deployments on managed PostgreSQL (RDS, Cloud SQL, Neon, Supabase, etc.):

- Automated daily snapshots during a low-traffic window.
- Point-in-time recovery (PITR) via WAL archiving, with a retention of 7–30 days depending on the managed-service configuration.
- Manual snapshot before any major migration or schema change.

### Logical dump (pg_dump)

A daily logical dump is taken as a defense-in-depth measure (managed snapshots can fail; logical dumps are portable). The dump is encrypted at rest and copied to a backup bucket in a different region.

```bash
# Example (run by a scheduled job; not by hand)
pg_dump --format=custom \
        --no-owner \
        --no-privileges \
        "$DATABASE_URL" \
  | gpg --batch --yes --passphrase-file /etc/wintervell/backup-pass \
        --symmetric \
        --output "wintervell-$(date -u +%Y%m%dT%H%M%SZ).dump.gpg"

# Upload to backup bucket
aws s3 cp "wintervell-$(date -u +%Y%m%dT%H%M%SZ).dump.gpg" \
         "s3://wintervell-backups/db/"
```

Logical dumps are retained for 30 days. Older dumps are deleted by the bucket lifecycle policy.

---

## Object storage backup

Three layers:

1. **Versioning** — the primary bucket has versioning enabled. A `DELETE` creates a delete marker; the object is recoverable from the version history.
2. **Cross-region replication** — new objects are replicated to a second region in near-real-time. Provides disaster recovery if the primary region fails.
3. **Daily backup bucket** — a scheduled job copies objects created in the last 24 hours to a backup bucket in a separate AWS account. Provides protection against credential compromise (the primary bucket's credentials cannot delete from the backup bucket).

---

## Restore procedure

### PostgreSQL restore (point-in-time)

```bash
# 1. Provision a new PostgreSQL instance (or restore-in-place per managed-service docs).
# 2. Restore from the managed snapshot closest to the target time.
# 3. Use PITR to roll forward to the exact target time.
# 4. Validate row counts against the last known good state.
# 5. Repoint the application's DATABASE_URL to the restored instance.
# 6. Restart the web app and workers.
# 7. Smoke-test: log in, list audits, view a report.
```

### PostgreSQL restore (from logical dump)

```bash
# 1. Provision a fresh PostgreSQL instance.
# 2. Download the dump.
aws s3 cp "s3://wintervell-backups/db/wintervell-<timestamp>.dump.gpg" .

# 3. Decrypt.
gpg --batch --yes --passphrase-file /etc/wintervell/backup-pass \
    --decrypt "wintervell-<timestamp>.dump.gpg" \
    > wintervell.dump

# 4. Restore.
pg_restore --dbname="$NEW_DATABASE_URL" \
           --no-owner \
           --no-privileges \
           --clean --if-exists \
           wintervell.dump

# 5. Run prisma migrate to reconcile schema if the dump is from an older schema.
bun run prisma migrate deploy

# 6. Validate and repoint.
```

### Object storage restore

For a deleted object:

```bash
# 1. List versions of the object.
aws s3api list-object-versions \
  --bucket wintervell-primary \
  --prefix "screenshots/<orgId>/<auditId>/<file>" \
  --query 'Versions[*].[VersionId,IsLatest,LastModified]'

# 2. Copy the prior version back as the current version.
aws s3api copy-object \
  --bucket wintervell-primary \
  --copy-source "wintervell-primary/screenshots/...?versionId=<prior-version-id>" \
  --key "screenshots/<orgId>/<auditId>/<file>"
```

For a deleted bucket (disaster):

```bash
# 1. Provision a new bucket.
# 2. Sync from the cross-region replica.
aws s3 sync "s3://wintervell-replica/" "s3://wintervell-primary-new/" --source-region <replica-region>

# 3. Sync any missing objects from the daily backup bucket.
aws s3 sync "s3://wintervell-backups/objects/" "s3://wintervell-primary-new/"

# 4. Repoint STORAGE_BUCKET env var.
# 5. Restart the web app and workers.
```

---

## RPO and RTO guidance

| Metric | Target | Notes |
|---|---|---|
| RPO (Recovery Point Objective) — database | 5 minutes | WAL archiving with 5-minute retention lag |
| RPO — object storage | 0 (continuous replication) | Cross-region replication is near-real-time |
| RTO (Recovery Time Objective) — database | 1 hour | Snapshot restore + validation |
| RTO — object storage | 1 hour | Bucket sync or version restoration |

These targets assume the failure is contained (single-region or single-component). A multi-region failure extends RTO. The targets are guidance, not contractual SLAs.

---

## Test restores

A restore that has not been tested is not a backup. Test restores are performed:

- **Monthly** — restore the latest database dump to a staging instance; run smoke tests; record the result.
- **Quarterly** — restore the object-storage backup to a staging bucket; verify a sample of objects.
- **After any backup-configuration change** — verify the new configuration produces restorable backups.

Test-restore results are recorded in the operations log. A failed test restore is an incident — see [`incident-response.md`](incident-response.md).

---

## What is NOT backed up

- **Session data** — sessions are short-lived; restoring them is unnecessary. A restore invalidates all sessions (users re-authenticate).
- **Worker job queue (transient)** — in-flight jobs are lost on restore. They are re-queued from their source (the audit or report that triggered them).
- **Cache (Redis, in-memory)** — caches rebuild from the database.
- **Logs (application, access)** — retained per the logging retention policy; not part of the database backup. Consider shipping logs to a separate log-storage service if long-term retention is required.

---

## Related documents

- [`../setup/backups.md`](../setup/backups.md) — backup scheduling and configuration
- [`../setup/database-setup.md`](../setup/database-setup.md) — database setup
- [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) — storage architecture
- [`data-deletion.md`](data-deletion.md) — deletion procedures
- [`incident-response.md`](incident-response.md) — incident response
