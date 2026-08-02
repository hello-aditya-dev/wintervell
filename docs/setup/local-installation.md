# Local Installation

This guide gets WinterVell running on your local machine for development and evaluation. For production deployment, see [`production-deployment.md`](production-deployment.md) and [`vercel-deployment.md`](vercel-deployment.md).

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| **bun** | 1.1+ | JavaScript runtime and package manager |
| **Node.js** | 20+ | Required by some dependencies (NextAuth, Prisma) |
| **PostgreSQL** | 15+ | Optional for local dev (SQLite is the default); required if you want to test against the production database provider |
| **git** | any | Cloning the repository |

Bun is the recommended runtime. `npm` or `pnpm` will work but commands in this guide use `bun`.

---

## Steps

### 1. Clone the repository

```bash
git clone <repo-url> wintervell
cd wintervell
```

### 2. Install dependencies

```bash
bun install
```

This installs Next.js, React, Prisma, shadcn/ui, Tailwind, TanStack Query, Zustand, Zod, recharts, framer-motion, sharp, react-markdown, @mdxeditor/editor, lucide-react, and all other dependencies listed in `package.json`.

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `file:./db/wintervell.db` (SQLite, default for dev) |
| `NEXTAUTH_SECRET` | A random 32+ character string (e.g. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `AI_PROVIDER` | `mock` (default; no real provider needed for dev) |
| `STORAGE_DRIVER` | `local` (default) |

A full reference for every environment variable is in [`environment-variables.md`](environment-variables.md).

### 4. Prepare the database

```bash
bun run db:push
```

`db:push` pushes the Prisma schema to the database. For SQLite, this creates `./db/wintervell.db`. For PostgreSQL, this connects to the `DATABASE_URL` and applies the schema.

To run migrations instead (recommended when iterating on the schema):

```bash
bun run prisma migrate dev
```

### 5. Seed the demo data (optional)

```bash
bun run db:seed
```

Seeds the **Northstar Digital** demo organisation with five fictional prospects, audits, reports, proposals, and pipeline data. Every demo item is labelled "Demonstration data — fictional." See [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md).

### 6. Start the dev server

```bash
bun run dev
```

The app runs on `http://localhost:3000`. The dev server uses Next.js's hot-module reloading; changes to source files are reflected on the next page load.

### 7. (Optional) Start the audit worker

If you want to test audit execution locally:

```bash
bun run worker:audit
```

The audit worker runs on port 3002 (internal). See [`audit-worker-setup.md`](audit-worker-setup.md) for details.

In development, the mock AI provider is used by default, so the audit worker will run without a real AI provider key.

### 8. (Optional) Start the PDF worker

If you want to test PDF generation locally:

```bash
bun run worker:pdf
```

See [`pdf-configuration.md`](pdf-configuration.md).

---

## Common development commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start the Next.js dev server |
| `bun run worker:audit` | Start the audit worker |
| `bun run worker:pdf` | Start the PDF worker |
| `bun run build` | Production build |
| `bun run start` | Start the production server (after `build`) |
| `bun run lint` | Run ESLint |
| `bun run type-check` | Run `tsc --noEmit` |
| `bun run test` | Run the test suite |
| `bun run db:push` | Push the Prisma schema to the database |
| `bun run prisma migrate dev` | Create and apply a migration |
| `bun run prisma studio` | Open Prisma Studio (database GUI) |
| `bun run db:seed` | Seed demo data |
| `bun run db:seed:reset-demo` | Reset demo data (deletes only `isDemo = true` records) |

---

## Switching to PostgreSQL locally

If you want to test against PostgreSQL locally (recommended before deploying to production):

1. Install PostgreSQL 15+.
2. Create a database: `createdb wintervell_dev`.
3. Update `.env`: `DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/wintervell_dev`.
4. Reset the schema: `bun run prisma migrate reset` (destructive — drops and recreates).
5. Seed: `bun run db:seed`.

See [`database-setup.md`](database-setup.md) for details.

---

## What works out of the box

With the default `.env` and the mock providers:

- Authentication (NextAuth with email/password).
- Multi-tenant organisation creation.
- Prospect capture and pipeline.
- Audit creation and review (with mock findings from the mock AI provider).
- Report generation, sharing, and PDF (with the PDF worker running).
- Proposal generation and editing.
- White-labelling configuration.
- Demo data browsing.

What does **not** work without real providers:

- Real AI text generation (the mock provider returns canned outputs).
- Real email sending (the mock provider logs sends to the activity feed).
- Real audit crawling of live websites (the mock provider returns fixture data; crawling a real URL requires the audit worker and a real internet connection — see [`audit-worker-setup.md`](audit-worker-setup.md)).

---

## Troubleshooting

See [`troubleshooting.md`](troubleshooting.md) for common issues.

---

## Related documents

- [`environment-variables.md`](environment-variables.md) — env var reference
- [`database-setup.md`](database-setup.md) — database setup
- [`audit-worker-setup.md`](audit-worker-setup.md) — audit worker setup
- [`pdf-configuration.md`](pdf-configuration.md) — PDF worker setup
- [`ai-provider-configuration.md`](ai-provider-configuration.md) — AI provider configuration
- [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) — demo data
- [`troubleshooting.md`](troubleshooting.md) — troubleshooting
