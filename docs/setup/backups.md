# Backups

This guide describes WinterVell's backup configuration: schedule, verification, offsite storage, encryption, and restore testing. It is the configuration companion to [`../operations/backup-restore.md`](../operations/backup-restore.md) (the operational runbook).

---

## What to back up

| Component | What | Mechanism |
|---|---|---|
| PostgreSQL database | All tenant data, audit logs, licence records | Managed snapshots + logical dumps |
| Object storage | Screenshots, PDFs, evidence, branding, uploads | Versioning + cross-region replication + backup bucket |
| Configuration | `.env`, deployment config | Secrets manager + git (config-only) |
| Code and prompts | `src/`, `prisma/`, `src/prompts/` | Git repository (offsite: GitHub/GitLab) |

---

## Schedule

### Database

| Backup type | Frequency | Retention |
|---|---|---|
| WAL archive (PITR) | Continuous | 7–30 days (per managed-service config) |
| Automated snapshot | Daily (low-traffic window) | 7–30 days |
| Logical dump (`pg_dump`) | Daily | 30 days |
| Pre-migration snapshot | Before each migration | 90 days |

### Object storage

| Backup type | Frequency | Retention |
|---|---|---|
| Versioning | Continuous | Per object lifecycle |
| Cross-region replication | Continuous | Mirror of primary |
| Backup bucket sync | Daily | 90 days |

### Configuration

| Backup type | Frequency | Retention |
|---|---|---|
| Secrets manager snapshot | On change | Per secrets-manager policy |
| Git repository | On commit | Permanent (git history) |

---

## Verification

A backup that has not been verified is not a backup. Verification:

### Daily verification

- A scheduled job checks that the previous day's logical dump exists in the backup bucket and is non-empty.
- A scheduled job checks that the cross-region replication lag is under 1 minute.
- Failures alert the on-call engineer.

### Monthly verification (test restore)

- Restore the latest database dump to a staging instance.
- Run smoke tests (log in, list audits, view a report).
- Verify row counts against the production database (within an expected delta for the time skew).
- Restore a sample of objects from the backup bucket to a staging bucket.
- Verify a sample of objects match their primary-bucket counterparts (by content hash).
- Record the result in the operations log.

### Quarterly verification (full DR drill)

- Simulate a complete region failure: restore the database to a new region, repoint the application, run smoke tests.
- Simulate a complete bucket failure: restore from the backup bucket to a new primary bucket, repoint storage config.
- Measure RPO and RTO against the targets in [`../operations/backup-restore.md`](../operations/backup-restore.md).
- Record the result and any gaps.

A failed verification is an incident — see [`../operations/incident-response.md`](../operations/incident-response.md).

---

## Offsite storage

Backups must be in a different failure domain from the primary data. "Different failure domain" means:

- **Different region** (for region-level failures).
- **Different account** (for credential-compromise scenarios — the primary account's credentials cannot delete from the backup account).
- **Different provider** (optional, for provider-level failures; usually overkill).

### Database

- Managed snapshots: typically same-region by default; configure cross-region copy if available.
- Logical dumps: copy to a backup bucket in a different region and ideally a different account.

### Object storage

- Cross-region replication: replicate to a second region (same account).
- Backup bucket: in a different account; the backup bucket's credentials are distinct from the primary bucket's credentials. A compromised primary credential cannot delete from the backup bucket.

---

## Encryption

All backups are encrypted at rest:

- **Managed snapshots**: encrypted with the managed service's encryption (KMS-managed key by default).
- **Logical dumps**: encrypted with GPG using a passphrase stored in the secrets manager. The passphrase is rotated annually.
- **Object storage**: encrypted with the provider's encryption (SSE-S3 or SSE-KMS).
- **Backup bucket**: encrypted with a separate KMS key (different from the primary bucket's key).

Encryption keys are managed in a KMS (AWS KMS, Cloudflare, GCP KMS). Key rotation is enabled where supported.

---

## Restore testing

See [`../operations/backup-restore.md`](../operations/backup-restore.md) for the restore procedure. Restore testing is part of the verification schedule above.

A restore test that fails is treated as a SEV-2 incident: the backup is not restorable, and the issue must be diagnosed and fixed before the next backup window.

---

## Retention policy

Retention balances recoverability against storage cost and privacy (data should not be retained longer than necessary).

| Data type | Retention | Reason |
|---|---|---|
| Database snapshots | 30 days | Sufficient for most recovery scenarios |
| Logical dumps | 30 days | Defense-in-depth; portable format |
| PITR | 7 days (default) | Granular recovery for recent changes |
| Object storage versions | Per object lifecycle (default 90 days) | Recover accidentally-deleted objects |
| Cross-region replica | Mirror of primary | Disaster recovery |
| Backup bucket | 90 days | Long-term recovery; matches privacy retention |
| Pre-migration snapshots | 90 days | Recovery from migration failures |
| AuditLog (in-app) | Indefinite (configurable) | Compliance; not a backup, but related |

Retention is enforced by lifecycle policies on the buckets and by the managed service's snapshot retention. Old backups are deleted automatically; manual deletion is not required.

---

## Configuration

### Managed PostgreSQL (RDS, Cloud SQL, Neon)

Configure automated backups per the managed service's docs:

- **RDS**: automated backups with retention 7–30 days; PITR enabled; cross-region snapshot copy if needed.
- **Cloud SQL**: automated backups with retention 7–30 days; point-in-time recovery enabled.
- **Neon**: automatic PITR per branch; configure per-branch retention.

### Self-hosted PostgreSQL

```bash
# Daily logical dump (cron: 0 2 * * *)
pg_dump --format=custom --no-owner --no-privileges "$DATABASE_URL" \
  | gpg --batch --yes --passphrase-file /etc/wintervell/backup-pass --symmetric \
  --output "/backups/wintervell-$(date -u +%Y%m%dT%H%M%SZ).dump.gpg"

# Upload to backup bucket
aws s3 cp "/backups/wintervell-$(date -u +%Y%m%dT%H%M%SZ).dump.gpg" \
         "s3://wintervell-backups/db/"

# Delete local dumps older than 7 days
find /backups -name "wintervell-*.dump.gpg" -mtime +7 -delete
```

WAL archiving (for PITR) requires configuring `archive_command` in `postgresql.conf` and is beyond the scope of this guide; see the PostgreSQL documentation.

### Object storage

- **S3**: enable versioning, cross-region replication, and a lifecycle policy that transitions older versions to cheaper storage and deletes them after 90 days.
- **R2 / B2 / MinIO**: similar configuration via the provider's console or API.

---

## Restore procedure

See [`../operations/backup-restore.md`](../operations/backup-restore.md).

---

## Related documents

- [`../operations/backup-restore.md`](../operations/backup-restore.md) — restore runbook
- [`../operations/incident-response.md`](../operations/incident-response.md) — incident response
- [`database-setup.md`](database-setup.md) — database setup
- [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) — storage architecture
- [`production-deployment.md`](production-deployment.md) — production deployment
