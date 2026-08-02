# Data Deletion

This runbook describes WinterVell's data-deletion procedures in detail: prospect deletion, audit deletion, organisation deletion (soft then hard), retention configuration, and verification. It is paired with [`data-export.md`](data-export.md) and [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md).

---

## Deletion philosophy

WinterVell's deletion model is:

1. **Soft first.** A deletion sets `deletedAt`; the record disappears from the UI but remains in the database for a configurable retention window (default 30 days). This protects against accidental deletion.
2. **Hard after retention.** A scheduled job hard-deletes records whose `deletedAt` is older than the retention window. Hard deletion is irreversible.
3. **Explicit hard delete on request.** An Owner or Administrator can request an immediate hard delete (bypassing the retention window) for a specific record. This is logged prominently in the AuditLog.
4. **Cascading.** Deleting a parent record (e.g. an organisation) cascades to all child records (prospects, audits, findings, etc.).
5. **Audited.** Every deletion (soft and hard) is recorded in the AuditLog with the user, the resource, the timestamp, and (for hard deletes) a hash of the resource for traceability.
6. **Asset cleanup.** Hard deletion of a record removes its binary assets (screenshots, PDFs, evidence) from object storage. Soft deletion leaves the assets in place (the record may be restored).

---

## Prospect deletion

### Soft delete

- Triggered by an Owner or Administrator from the prospect-detail page.
- Sets `Prospect.deletedAt = now()`.
- Cascades: sets `deletedAt` on all related audits, findings, evidence, screenshots, scores, reports, proposals, opportunities, tasks, notes.
- The prospect disappears from the prospect list.
- The prospect's data is recoverable by clearing `deletedAt` (via an admin tool) within the retention window.
- AuditLog entry: `prospect.soft_delete`.

### Hard delete

- Triggered automatically by the retention job after the retention window.
- Or triggered explicitly by an Owner (bypass retention).
- Permanently removes the `Prospect` record and all related records from the database.
- Permanently removes all related binary assets from object storage.
- Revokes all related `ReportShare` records (tokens invalidated).
- AuditLog entry: `prospect.hard_delete` (with a hash of the prospect's name and website URL, not the values themselves).
- Irreversible.

---

## Audit deletion

Same pattern as prospect deletion, with one addition:

- If the audit has a published `ReportVersion`, the user is asked whether to also delete the report. If yes, the report is soft-deleted (and its shares revoked). If no, the report remains but references to the audit are removed (the report's `auditId` is set to null with a note "source audit deleted").

---

## Report deletion

- Soft delete: sets `ReportVersion.deletedAt` and revokes all shares.
- Hard delete: permanently removes the `ReportVersion` and all related `ReportShare` and `ReportEvent` records. Permanently removes the PDF from object storage. Screenshots remain (they belong to the audit, not the report).
- A deleted report's `Proposal` (if any) is not automatically deleted; the user is asked.

---

## Proposal deletion

- Soft delete: sets `Proposal.deletedAt` and `ProposalVersion.deletedAt`.
- Hard delete: permanently removes the proposal records.
- A deleted proposal's `Opportunity` (if any) is not automatically deleted; the user is asked.

---

## Organisation deletion

The most destructive operation. See [`data-export.md`](data-export.md) for the full procedure. Summary:

1. Owner requests deletion (requires typing the org name, acknowledgement, and a prior export request).
2. Soft delete immediately (`Organisation.deletedAt` set; all members lose access).
3. 14-day cancellation window.
4. Hard delete after 14 days (or on explicit confirmation after the window):
   - All organisation records permanently removed.
   - All binary assets permanently removed.
   - AuditLog entries retained for 90 days with the organisation ID replaced by a hash, then deleted.

---

## Retention configuration

Per-organisation retention is configured by the Owner in the admin area. Defaults:

| Record type | Default retention | Range |
|---|---|---|
| Prospects, audits, reports, proposals, opportunities | Indefinite | 1–10 years, or indefinite |
| Tasks, notes | Indefinite | 1–10 years, or indefinite |
| AIUsage | 90 days | 30–365 days |
| AuditLog | Indefinite | 1–10 years, or indefinite |
| Report events | 2 years | 1–7 years |
| Soft-deleted records pending hard delete | 30 days | 1–90 days |

Retention is enforced by a daily scheduled job (`scripts/retention-enforce.ts`). The job:

1. Finds records with `deletedAt < now() - retentionWindow`.
2. Hard-deletes them in batches (to avoid long-running transactions).
3. Removes their binary assets from object storage.
4. Logs the deletion counts in the AuditLog.

A dry-run mode is available (`scripts/retention-enforce.ts --dry-run`) that reports what would be deleted without deleting.

---

## Verification

After a deletion, verification is important. The verification process:

### Soft delete verification

- The record is no longer visible in the UI (the user who deleted it confirms).
- The record still exists in the database (an admin can query with `deletedAt IS NOT NULL`).
- The AuditLog entry exists.

### Hard delete verification

- The record is no longer in the database (an admin queries by ID; returns null).
- The binary assets are no longer in object storage (an admin queries the bucket by key prefix; returns empty).
- The AuditLog entry exists (with the hash).
- For organisation deletion: all related records (prospects, audits, etc.) are also gone (an admin queries by `organisationId`; returns empty).

A verification checklist is run after every organisation deletion and after every explicit hard delete. The checklist is signed off by the operator who performed the deletion.

---

## Restoration (soft-deleted only)

A soft-deleted record can be restored within the retention window:

1. An admin opens the "Trash" view in the admin area (visible to Owner and Administrator only).
2. Selects the soft-deleted record.
3. Clicks **Restore**.
4. The record's `deletedAt` is cleared.
5. The record reappears in the UI.
6. AuditLog entry: `<resource>.restore`.

Restoration is not possible after hard deletion. WinterVell cannot recover hard-deleted data even from backups (backups are aged out per the retention policy; restoring a backup would also restore unrelated data and is not a targeted recovery mechanism).

---

## Legal hold

An organisation can be placed on legal hold by the WinterVell operator (for the Hosted tier) or by the agency Owner (for self-hosted tiers). When on legal hold:

- The retention job skips the organisation.
- Soft-deleted records are not hard-deleted.
- No data is removed.
- The legal hold is recorded in the AuditLog with the reason and the operator who set it.
- Legal hold is lifted explicitly; it does not auto-expire.

Legal hold is used when the agency anticipates litigation and needs to preserve records beyond their normal retention.

---

## Related documents

- [`data-export.md`](data-export.md) — data export (recommended before deletion)
- [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) — tenant scoping
- [`../architecture/storage-architecture.md`](../architecture/storage-architecture.md) — binary asset storage
- [`backup-restore.md`](backup-restore.md) — backup and restore
- [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md) — data-handling disclosure
