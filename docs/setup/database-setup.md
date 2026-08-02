# Database Setup

WinterVell uses Prisma ORM with PostgreSQL for production and SQLite for local development. The same `prisma/schema.prisma` is used for both providers; provider-specific features are avoided unless wrapped in a provider-aware helper.

This guide covers schema setup, migrations, indexes, and seeding. It is paired with [`environment-variables.md`](environment-variables.md) and [`../architecture/data-model.md`](../architecture/data-model.md).

---

## Providers

| Provider | Use | Connection string format |
|---|---|---|
| PostgreSQL | Production | `postgresql://<user>:<pass>@<host>:<port>/<db>?schema=public` |
| SQLite | Local development | `file:./db/wintervell.db` |

Switch providers by changing `DATABASE_URL` in `.env`. Prisma reads the provider from `datasource.provider` in `schema.prisma`; the schema is provider-agnostic.

For production, use a managed PostgreSQL service (RDS, Cloud SQL, Neon, Supabase, Vercel Postgres). Self-hosted PostgreSQL is supported but operationally heavier.

---

## Connection pool size

| Component | Pool size |
|---|---|
| Web app | 20 |
| Audit worker | 10 |
| PDF worker | 5 |
| **Total max connections** | 35 |

PostgreSQL default `max_connections` is 100. With 35 used by WinterVell and overhead for migrations and admin tools, the default is sufficient for a small deployment. For larger deployments or shared database servers, increase `max_connections` or use a connection pooler (PgBouncer, or the managed-service pooler like Neon's pooler).

For Vercel serverless, **always** use the provider's connection pooler URL (not the direct connection URL) to avoid connection exhaustion.

---

## Schema setup

### First-time setup (development, SQLite)

```bash
# 1. Ensure DATABASE_URL=file:./db/wintervell.db in .env
# 2. Create the db directory if it doesn't exist
mkdir -p db

# 3. Push the schema (creates the database file and tables)
bun run db:push
```

`db:push` is the simplest way to get started. It pushes the schema without creating migrations. Use it for development only.

### First-time setup (production, PostgreSQL)

```bash
# 1. Set DATABASE_URL to the production connection string
# 2. Create the database (if not already created)
createdb wintervell_prod  # or via the managed-service console

# 3. Apply migrations
bun run prisma migrate deploy
```

`migrate deploy` applies migrations in order and is safe to run on a running deployment (with caveats — see each migration's `README` if it includes breaking changes).

### Iterating on the schema (development)

```bash
# 1. Edit prisma/schema.prisma
# 2. Create a migration
bun run prisma migrate dev --name <descriptive-name>

# 3. The migration is created in prisma/migrations/<timestamp>_<name>/
# 4. The migration is applied to the dev database
# 5. Commit the migration file
```

Migrations are versioned and committed to git. A migration that has been deployed to production is **never** edited; a new migration is created to undo or change it.

### Applying migrations (production)

```bash
bun run prisma migrate deploy
```

This is the only command to run in production. It applies pending migrations in order and does not prompt for confirmation (safe for CI/CD).

---

## Indexes

Every tenant-scoped model has:

- `@@index([organisationId])` — for fast per-organisation queries.
- `@@index([organisationId, <common filter>])` — composite indexes where useful.

Examples:

```prisma
model Prospect {
  // ...
  organisationId String
  deletedAt      DateTime?

  @@index([organisationId])
  @@index([organisationId, deletedAt])
  @@index([organisationId, stage])
}

model Audit {
  // ...
  organisationId String
  status         AuditStatus

  @@index([organisationId])
  @@index([organisationId, status])
  @@index([organisationId, createdAt])
}
```

Indexes are reviewed on every schema change. A query that filters or sorts on a column without an index is a performance bug. Prisma Studio and `EXPLAIN ANALYZE` (PostgreSQL) are used to verify query plans.

---

## Foreign keys

Every relation has an explicit FK constraint. Cascading deletes are avoided:

```prisma
model Finding {
  // ...
  auditId String
  audit   Audit @relation(fields: [auditId], references: [id], onDelete: Restrict)
}
```

`onDelete: Restrict` means a parent record cannot be deleted while child records exist. Deletions are explicit and cascaded in application code, with auditing — see [`../operations/data-deletion.md`](../operations/data-deletion.md). This prevents accidental data loss from a `DELETE` on a parent table.

---

## Timestamps

Every model has `createdAt` and `updatedAt`:

```prisma
model Prospect {
  // ...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Immutable records (`ScoreVersion`, `ReportVersion`, `ProposalVersion`, `StageHistory`, `AuditLog`) have `createdAt` only.

---

## Seed (demo data)

The seed script creates the **Northstar Digital** demo organisation with five fictional prospects, audits, reports, proposals, and pipeline data. Every demo item is labelled "Demonstration data — fictional."

```bash
bun run db:seed
```

The seed is idempotent: running it twice produces the same state (it upserts based on stable IDs). The seed only creates demo data; it does not create production data.

Resetting the demo:

```bash
bun run db:seed:reset-demo
```

This deletes only records with `isDemo = true` and re-seeds. It does not touch production data. The reset is audited in the AuditLog.

### Seed in production

A production deployment may keep the demo organisation for training and onboarding. The seed can be run on a production database:

```bash
NODE_ENV=production bun run db:seed
```

The script prompts for confirmation when `NODE_ENV=production` to prevent accidental seeding. The demo organisation is isolated from production organisations by tenant scoping — see [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md).

See [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) for the demo data details.

---

## Prisma Studio

```bash
bun run prisma studio
```

Opens a web GUI for the database at `http://localhost:5555`. Useful for inspecting data during development. Do not use Prisma Studio on a production database for write operations; reads are fine, but writes bypass application-layer authorization and audit logging.

---

## Backup integration

Database backups are configured per [`backups.md`](backups.md). The schema includes no backup-specific tables; backups are managed externally (managed-service snapshots + `pg_dump`). See [`../operations/backup-restore.md`](../operations/backup-restore.md).

---

## Migrations in CI/CD

A typical CI/CD pipeline runs migrations before deploying the new code:

```bash
# In the deploy step
bun run prisma migrate deploy
bun run build
# deploy the build
```

If a migration is destructive (drops a column, renames a table), the migration is split into two:

1. **Migration A** (deployed first): adds the new column, dual-writes, backfills.
2. **Migration B** (deployed after the new code is live): removes the old column.

This avoids downtime and data loss. See Prisma's "expand-and-contract" pattern documentation.

---

## Related documents

- [`environment-variables.md`](environment-variables.md) — env var reference
- [`../architecture/data-model.md`](../architecture/data-model.md) — full data model
- [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) — tenant scoping
- [`../operations/data-deletion.md`](../operations/data-deletion.md) — deletion procedures
- [`../operations/backup-restore.md`](../operations/backup-restore.md) — backup and restore
- [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) — demo data
- [`local-installation.md`](local-installation.md) — local installation
- [`production-deployment.md`](production-deployment.md) — production deployment
