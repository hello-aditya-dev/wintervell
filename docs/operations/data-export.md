# Data Export

This runbook describes how to export an organisation's data from WinterVell: organisation-level export (JSON + attachments zip), prospect and audit deletion, report-access revocation, share-token rotation, and organisation deletion. It is paired with [`data-deletion.md`](data-deletion.md) and [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md).

---

## Organisation-level export

An organisation Owner or Administrator can request a full export of the organisation's data. The export is a two-part archive:

1. **JSON dump** — all organisation records (prospects, audits, findings, evidence, scores, reports, proposals, opportunities, tasks, notes, members, branding, integrations) as a structured JSON file. The schema is documented in `src/lib/export/schema.ts`.
2. **Attachments zip** — all binary assets (screenshots, PDFs, branding images, evidence attachments) packaged as a zip. The zip's directory structure mirrors the object-storage path prefixes.

### Procedure

1. The Owner/Administrator clicks **Export organisation data** in the admin area.
2. The system creates an export job (`type = "export"`) in the job queue.
3. The export worker (a mode of the audit/PDF worker pool, or a dedicated export worker) builds the JSON dump and the attachments zip.
4. The export is encrypted with a one-time passphrase (generated client-side; never stored server-side).
5. The encrypted archive is uploaded to object storage with a 7-day expiry.
6. The Owner/Administrator receives an in-app notification with a download link.
7. The download link expires after 7 days or after the first successful download (whichever is sooner).

### Scope

The export includes:

- All prospects, companies, tags, activity.
- All audits, audit pages, audit runs, findings, evidence, screenshots.
- All scores, score versions.
- All report versions, report shares, report events.
- All proposals, proposal versions, roadmaps, roadmap phases.
- All opportunities, stage history, tasks, notes.
- All ServiceCatalogue items.
- All branding configuration.
- All integration configuration (with API keys redacted — only the key reference is exported; the actual keys are not exported).
- All AIUsage records (90-day window).
- All AuditLog records (full history).

The export does **not** include:

- Other organisations' data (enforced by tenant scoping).
- System-level data (licence server records, global feature flags).
- Other tenants' users (only this organisation's members).

### Encryption

The export is encrypted client-side with a passphrase the user provides (or a generated passphrase the user saves). The server never sees the passphrase. A lost passphrase means the export cannot be decrypted — WinterVell cannot recover it. The user is warned of this before generating the export.

---

## Prospect deletion

A prospect can be deleted by an Owner or Administrator. Deletion is soft at first (`deletedAt` set); hard deletion happens after the retention window (default 30 days) or on explicit hard-delete request.

### Soft delete

- The prospect's `deletedAt` is set.
- The prospect disappears from the prospect list.
- The prospect's audits, reports, proposals, and opportunities are soft-deleted (their `deletedAt` is set).
- The prospect's data remains in the database and is recoverable until hard deletion.
- The deletion is recorded in the AuditLog.

### Hard delete

- The prospect's record is permanently removed from the database.
- All related records (audits, findings, evidence, reports, proposals, opportunities, tasks, notes) are permanently removed.
- All related binary assets (screenshots, PDFs) are permanently removed from object storage.
- All related report shares are revoked (token invalidated).
- The deletion is recorded in the AuditLog (with a "hard delete" entry that survives the deletion itself — the AuditLog entry does not reference the prospect by ID, only by a hash).
- Hard deletion is irreversible. WinterVell cannot recover hard-deleted data even from backups (backups are aged out per the retention policy).

---

## Audit deletion

An audit can be deleted by an Owner or Administrator. Same soft-then-hard pattern as prospect deletion:

- Soft delete: audit `deletedAt` set; findings, evidence, screenshots, scores soft-deleted.
- Hard delete: audit and all related records permanently removed; screenshots and evidence permanently removed from object storage.
- If the audit has a published report, the report is **not** automatically deleted — the report is a separate artifact that may have been shared with the prospect. The user is asked whether to also delete the report.

---

## Report-access revocation

A report's access can be revoked without deleting the report:

- **Revoke all shares**: all `ReportShare` records for the report are marked `revokedAt = now()`. Existing signed URLs immediately 404. Prospects with the link see "This report is no longer available."
- **Revoke a single share**: a specific `ReportShare` is revoked. Other shares remain active.
- **Rotate share tokens**: existing shares are revoked and new shares are generated. Used when a share link is suspected to have leaked.

Revocation does not delete the `ReportVersion`. The report remains in the database for the agency's records.

---

## Share-token rotation

A share-token rotation:

1. Revokes all existing `ReportShare` records for a `ReportVersion`.
2. Generates a new `ReportShare` with a fresh token.
3. The agency sends the new share link to the prospect.

Rotation is recommended:

- When a share link is suspected to have leaked (e.g. forwarded to an unintended recipient).
- When the prospect's engagement point changes (e.g. new contact at the prospect).
- Periodically for long-lived share links (though expiry is preferred over rotation for time-bounded access).

---

## Organisation deletion

Organisation deletion is the most destructive operation in WinterVell. It is restricted to the organisation Owner and requires a multi-step confirmation.

### Procedure

1. The Owner clicks **Delete organisation** in the admin area.
2. The system requires the Owner to type the organisation name to confirm.
3. The system requires the Owner to acknowledge that:
   - All prospects, audits, reports, proposals, opportunities, tasks, and notes will be permanently deleted.
   - All binary assets will be permanently deleted.
   - All members will lose access.
   - The action is irreversible.
   - Backups will age out per the retention policy (within 30 days).
4. The system requires the Owner to request a data export first (and acknowledges that the export was requested).
5. The deletion is scheduled (soft delete immediately; hard delete after 14 days, during which the Owner can cancel).
6. The Owner and all members are notified by email.
7. During the 14-day window, the Owner can cancel the deletion from the admin area (a confirmation link is sent by email; the cancellation requires the link).
8. After 14 days, the hard delete executes:
   - All organisation records are permanently removed.
   - All binary assets are permanently removed.
   - The AuditLog entries for the organisation are retained for 90 days (with the organisation ID replaced by a hash) for compliance, then deleted.

### Why the 14-day window

The 14-day window exists because organisation deletion is irreversible and because mistakes happen. A Owner who deletes the organisation in haste can recover it within 14 days. After 14 days, the data is gone.

---

## Retention configuration

Per-organisation retention is configurable by the Owner:

| Record type | Default retention | Configurable |
|---|---|---|
| Prospects, audits, reports, proposals, opportunities | Indefinite | Yes (1–10 years, or indefinite) |
| Tasks, notes | Indefinite | Yes |
| AIUsage | 90 days | Yes (30–365 days) |
| AuditLog | Indefinite | Yes (1–10 years, or indefinite) |
| Report events | 2 years | Yes (1–7 years) |
| Deleted records (soft-deleted, pending hard delete) | 30 days | Yes (1–90 days) |

Retention is enforced by a scheduled job that hard-deletes records past their retention window. The job runs daily.

---

## Related documents

- [`data-deletion.md`](data-deletion.md) — deletion procedures in detail
- [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) — tenant scoping
- [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) — binary asset storage
- [`backup-restore.md`](backup-restore.md) — backup and restore
- [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md) — data-handling disclosure
