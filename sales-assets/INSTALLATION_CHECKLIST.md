# Installation Checklist

> Step-by-step installation checklist for WinterVell. This document
> targets the Agency Source and Studio tiers. Hosted-tier customers do
> not install the software; the Licensor operates the hosted instance.
> For full setup detail, see [`docs/setup/`](../docs/setup/).

Each step has a checkbox. Work top-to-bottom. Do not skip the
verification steps at the end.

---

## 1. Obtain a licence

- [ ] Confirm the licence tier you purchased (Hosted, Agency Source, or
      Studio) in your order document.
- [ ] Receive your licence identifier and deployment fingerprint
      instructions from the Licensor.
- [ ] Read the [`LICENSE`](../LICENSE) (WinterVell Commercial Source
      License, WV-CSL v1.0) and the
      [`COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md).
- [ ] Confirm your use case is permitted under the "What you MAY do" and
      "What you MAY NOT do" sections.

## 2. Receive repository access

- [ ] Receive read access to the private WinterVell repository.
- [ ] Clone the repository to your local machine and your deployment
      environment.
- [ ] Verify the working tree matches the release tag in
      [`CHANGELOG.md`](../CHANGELOG.md).

## 3. Install dependencies

- [ ] Install Node.js 20+ (22 LTS recommended) or Bun 1.1+.
- [ ] Run `bun install` (or `npm install` / `pnpm install`).
- [ ] Confirm no dependency-resolution errors.
- [ ] Review [`sbom.json`](../sbom.json) and confirm no unexpected
      packages are present.

## 4. Configure environment

- [ ] Copy `.env.example` to `.env`.
- [ ] Set `DATABASE_URL` to your PostgreSQL connection string.
- [ ] Set `NEXTAUTH_SECRET` to a high-entropy random value.
- [ ] Set `NEXTAUTH_URL` to your deployment URL.
- [ ] Set the licence identifier and deployment fingerprint variables
      per the Licensor's instructions.
- [ ] Review every other variable in `.env.example` and set or default
      each one deliberately.

## 5. Configure the database

- [ ] Provision a PostgreSQL 14+ database (16 recommended).
- [ ] Create a dedicated database role with the minimum required
      privileges.
- [ ] Run `bun run db:push` (or `bun run prisma migrate deploy`) to
      apply the schema.
- [ ] Confirm migrations completed without errors.

## 6. Configure the AI provider (optional)

- [ ] Decide whether to enable a real AI provider (recommended) or use
      the built-in mock provider.
- [ ] If enabling a real provider, set the provider-specific variables
      (API key, base URL, default model).
- [ ] Configure per-organization usage limits.
- [ ] Confirm the product clearly indicates which provider is active.

## 7. Configure email

- [ ] Choose an SMTP relay or transactional email provider.
- [ ] Set the email-provider variables (host, port, user, password,
      from-name, from-email).
- [ ] Configure SPF, DKIM, and DMARC on your sending domain.
- [ ] Send a test magic-link email and confirm delivery.

## 8. Configure object storage

- [ ] Provision an S3-compatible bucket.
- [ ] Set the storage variables (endpoint, region, bucket, access key,
      secret key).
- [ ] Enable versioning on the bucket.
- [ ] Configure lifecycle rules for evidence retention.
- [ ] Upload a test file and confirm it is accessible to the
      application.

## 9. Configure the audit worker

- [ ] Install headless Chrome (Chromium) on the audit-worker host.
- [ ] Run the audit worker in a network-segmented context with no
      access to WinterVell's internal services or cloud metadata
      endpoints.
- [ ] Confirm the SSRF block-list is active (reject localhost, private
      ranges, link-local, cloud metadata, non-HTTP protocols).
- [ ] Run a pre-flight check against a known-safe public URL.

## 10. Build

- [ ] Run `bun run build`.
- [ ] Confirm the build completes without errors.
- [ ] Confirm the standalone output directory is produced (if using
      Next.js standalone mode).

## 11. Deploy

- [ ] Deploy to Vercel (recommended) or your chosen Node.js-capable host.
- [ ] Confirm environment variables are set in the deployment platform.
- [ ] Confirm the deployment is reachable at `NEXTAUTH_URL`.
- [ ] Confirm HTTPS is enforced and security headers are active.

## 12. Verify health

- [ ] Visit `/api/health` (or the configured health endpoint) and
      confirm a healthy response.
- [ ] Confirm the database is reachable from the deployed application.
- [ ] Confirm object storage is reachable from the deployed application.
- [ ] Confirm the audit worker is reachable from the deployed
      application.
- [ ] Confirm the licence check passes (or enters the documented grace
      behaviour if the licence server is unreachable).

## 13. Seed demo data

- [ ] Run the demo-seed command to populate the Northstar Digital
      demonstration organization.
- [ ] Confirm every demo item is clearly labelled as fictional.
- [ ] Confirm the demo data can be reset to defaults.

## 14. Configure branding

- [ ] Upload your agency logo and favicon.
- [ ] Set your agency name, brand colours, and typography.
- [ ] Set the sender identity (from-name, from-email) for shared
      reports.
- [ ] Configure the custom domain for client-facing report and proposal
      URLs.
- [ ] Configure default disclaimers and footer copy.
- [ ] Confirm admin-area attribution matches your tier (Hosted: retained;
      Agency Source: configurable; Studio: fully white-label).

## 15. Test an audit

- [ ] Create a prospect with a real, owned, safe-to-audit website.
- [ ] Run a full audit across all six categories.
- [ ] Confirm the 12-stage pipeline completes (or fails clearly).
- [ ] Confirm evidence is collected and stored in object storage.
- [ ] Confirm scores are calculated and clearly marked when incomplete.

## 16. Test a report

- [ ] Open the report builder for the completed audit.
- [ ] Enable, disable, and reorder sections.
- [ ] Include and exclude individual findings.
- [ ] Generate the PDF.
- [ ] Confirm the PDF has selectable text, page numbers, and your agency
      branding.

## 17. Test the proposal and pipeline

- [ ] Generate a proposal from the audit.
- [ ] Confirm pricing, payment schedule, and acceptance criteria render
      correctly.
- [ ] Convert the prospect to an opportunity.
- [ ] Move the opportunity through pipeline stages.
- [ ] Confirm stage history is recorded.

## 18. Sign off

- [ ] Remove or rotate any temporary secrets used during installation.
- [ ] Confirm `.env` is not committed to version control.
- [ ] Confirm backups are configured and a test restore has been
      performed.
- [ ] Confirm monitoring and alerting are in place for the health
      endpoint and audit worker.
- [ ] Record the installation in your internal runbook and notify the
      Licensor that the deployment is live (for licence-entitlement
      purposes).

---

## Related documents

- [`TECHNICAL_REQUIREMENTS.md`](TECHNICAL_REQUIREMENTS.md) — minimum and recommended specs.
- [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md) — security summary.
- [`../docs/setup/`](../docs/setup/) — detailed setup guides.
- [`../docs/operations/`](../docs/operations/) — backup and incident response runbooks.
