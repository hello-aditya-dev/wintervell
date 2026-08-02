# Storage Architecture

WinterVell stores binary assets — screenshots, PDFs, logo and branding uploads, evidence attachments — in object storage. The storage layer is abstracted so development uses local disk and production uses S3-compatible storage. This document describes the abstraction, the asset categories, signed URLs, and access logging.

It is paired with [`report-rendering.md`](report-rendering.md) (where assets are produced), [`security-model.md`](security-model.md) (file-upload validation), and [`../setup/production-deployment.md`](../setup/production-deployment.md) (storage provisioning).

---

## Abstraction

```ts
interface ObjectStorage {
  put(key: string, body: Buffer | ReadableStream, opts: PutOptions): Promise<PutResult>;
  get(key: string): Promise<ReadableStream>;
  stat(key: string): Promise<StatResult | null>;
  delete(key: string): Promise<void>;
  signedUrl(key: string, opts: SignedUrlOptions): Promise<string>;
}
```

Two implementations:

| Implementation | Use |
|---|---|
| `LocalDiskStorage` | Development. Writes to `./upload/` (gitignored). No network. |
| `S3CompatibleStorage` | Production. Works with AWS S3, Cloudflare R2, Backblaze B2, MinIO, DigitalOcean Spaces, Wasabi, any S3-compatible API. |

The implementation is selected at startup based on `STORAGE_DRIVER` (`local` or `s3`). The rest of the application talks to the interface; it never imports `aws-sdk` or `fs` directly outside the abstraction.

---

## Asset categories

| Category | Path prefix | Examples | Retention |
|---|---|---|---|
| Screenshots | `screenshots/<orgId>/<auditId>/` | Page screenshots, element screenshots | Per audit retention; deleted with the audit |
| PDFs | `pdfs/<orgId>/<reportVersionId>/` | Generated report PDFs | Per report retention; deleted with the report version |
| Evidence | `evidence/<orgId>/<auditId>/` | Raw HTML, HTTP responses, HAR files | Per audit retention; deleted with the audit |
| Branding | `branding/<orgId>/` | Logos, favicons, OG images | Until replaced or org deleted |
| Uploads | `uploads/<orgId>/` | Evidence attachments, agency assets | Per asset; manual deletion |

Every key is prefixed with the organisation ID. A listing operation never crosses organisation boundaries; the prefix is enforced by the abstraction.

---

## Signed URLs

Binary assets are never served directly from the database or from a public bucket. Instead, the application generates a **signed URL** with an expiry:

```ts
const url = await storage.signedUrl(key, { expiresInSeconds: 900 });
// https://bucket.s3.amazonaws.com/screenshots/...?X-Amz-Signature=...&X-Amz-Expires=900
```

Properties:

- **Expiry** — default 15 minutes; configurable per use case. Report screenshots use 24 hours (so a prospect reading a report overnight does not see broken images). Audit-evidence screenshots in the admin area use 15 minutes.
- **Method** — GET only. No signed PUT or DELETE URLs are exposed to clients.
- **Scope** — a signed URL is for one key only; it cannot be used to list the bucket or access other keys.
- **Revocation** — a signed URL cannot be revoked once issued (S3 limitation). To revoke access, delete the underlying object; the signed URL then 404s. For share links, the share-token validation is the gate; the signed URL is generated only after the share token validates.

---

## Access logging

Every `get` and every `signedUrl` call is logged:

| Field | Purpose |
|---|---|
| `organisationId` | Tenant scoping |
| `key` | The object key |
| `caller` | Which feature requested access (`audit.evidence_view`, `report.screenshot_render`, `branding.logo_render`) |
| `userId` | The user (if authenticated) |
| `reportShareId` | The share link (if the access was via a share link) |
| `ipHash` | Hashed IP (for share-link access only) |
| `timestamp` | When |

Access logs are retained for 90 days (configurable). They are used for:

- Detecting anomalous access patterns (a share link viewed 10,000 times in an hour).
- Auditing who accessed what evidence.
- Computing report-engagement metrics (see [`report-rendering.md`](report-rendering.md)).

Access logs never include the binary content itself; they record metadata only.

---

## Local disk (development)

In development, `LocalDiskStorage` writes to `./upload/`. The directory is gitignored. Files are served via a Next.js route (`/api/v1/storage/<key>`) that streams the file. This route is for development only; production uses signed URLs to the S3-compatible bucket directly.

Local disk does not support signed URLs in the same way S3 does; the dev route uses a token-based check instead. The interface is identical from the application's perspective.

---

## S3-compatible (production)

In production, `S3CompatibleStorage` is configured with:

| Env var | Purpose |
|---|---|
| `STORAGE_DRIVER` | `s3` |
| `STORAGE_ENDPOINT` | S3 endpoint (e.g. `https://s3.us-east-1.amazonaws.com` or R2/B2/etc.) |
| `STORAGE_REGION` | Region |
| `STORAGE_BUCKET` | Bucket name |
| `STORAGE_ACCESS_KEY_ID` | Access key |
| `STORAGE_SECRET_ACCESS_KEY` | Secret key |
| `STORAGE_FORCE_PATH_STYLE` | `true` for MinIO and some S3-compatible providers |

The bucket is private (no public listing, no public read). All access is via signed URLs generated by the application. The bucket has a lifecycle policy that transitions older assets to cheaper storage tiers and, eventually, deletes them per the retention policy.

---

## Backup

Object storage is backed up independently of the database. Typical approaches:

- **S3 versioning** — enable versioning on the bucket to protect against accidental deletion.
- **Cross-region replication** — replicate to a second region for disaster recovery.
- **Backup-to-bucket** — a scheduled job copies new objects to a backup bucket in a different account.

Backup and restore for object storage is documented in [`../operations/backup-restore.md`](../operations/backup-restore.md).

---

## Size and rate limits

| Asset type | Max size |
|---|---|
| Screenshot | 5 MB |
| PDF | 50 MB |
| Branding image | 2 MB |
| Evidence attachment | 25 MB |

Upload rate is limited per organisation (default 100 uploads per hour). The audit worker's screenshot upload rate is not limited (it is internal), but the per-audit screenshot count is capped (default 200 screenshots per audit) to prevent runaway storage.

---

## Related documents

- [`report-rendering.md`](report-rendering.md) — where PDFs and screenshots are produced
- [`audit-engine.md`](audit-engine.md) — where evidence is collected
- [`security-model.md`](security-model.md) — file-upload validation
- [`../setup/production-deployment.md`](../setup/production-deployment.md) — storage provisioning
- [`../operations/backup-restore.md`](../operations/backup-restore.md) — backup and restore
- [`../setup/environment-variables.md`](../setup/environment-variables.md) — storage env vars
