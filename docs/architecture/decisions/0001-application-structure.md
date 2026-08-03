# ADR 0001 — Application Structure

**Date:** 2025-08-03
**Status:** Proposed
**Decision makers:** Z.ai Phase 0 agent

## Context

WinterVell needs to be a functioning, self-hostable, multi-tenant application. The current implementation is a single Next.js application with no backend. The master build prompt suggests a monorepo structure with `apps/` and `packages/` directories, but the current repository is a single Next.js application.

## Options Considered

### Option A: Monorepo (apps/ + packages/)

```
apps/
  web/          # Next.js application
  worker/       # Audit worker process
packages/
  database/     # Prisma schema and client
  contracts/    # Shared TypeScript types
  audit-core/   # Audit engine
  scoring/      # Scoring engine
  security/     # Security utilities
  storage/      # Storage adapter
  email/        # Email adapter
  ai/           # AI provider adapter
  ui/           # Shared UI components
  config/       # Shared configuration
```

**Pros:**
- Clear separation of concerns
- Independent deployment of worker
- Shared packages reduce duplication
- Scales well with team growth

**Cons:**
- Significant restructuring effort
- More complex build configuration
- May require Turborepo or similar
- Higher initial setup cost
- May be premature for current team size

### Option B: Single Next.js application with worker folder

```
src/
  app/           # Next.js App Router
  components/    # UI components
  lib/           # Application logic
    services/    # Application services
    domain/      # Domain logic
    repositories/ # Data access
    audit/       # Audit engine
    worker/      # Background job processing
  demo/          # Demo data
```

**Pros:**
- Minimal restructuring
- Simpler build configuration
- Faster iteration
- Appropriate for current team size
- No Turborepo needed

**Cons:**
- Worker cannot be deployed independently
- May need to split later
- Less separation of concerns
- Shared code is implicit

### Option C: Single Next.js application with separate worker process

```
src/
  app/           # Next.js App Router
  components/    # UI components
  lib/           # Application logic
  demo/          # Demo data
worker/
  src/           # Worker process
    index.ts     # Worker entry point
    jobs/        # Job handlers
```

**Pros:**
- Worker can be deployed independently
- Minimal restructuring of main app
- Clear boundary between web and worker
- No Turborepo needed
- Pragmatic middle ground

**Cons:**
- Code sharing between web and worker needs care
- Worker has its own dependencies
- Two processes to deploy

## Decision

**Option C: Single Next.js application with separate worker process.**

This provides the most pragmatic path forward:
- The main Next.js application can continue to evolve without restructuring
- The worker can be deployed independently when needed
- The boundary between web and worker is clear
- No monorepo tooling is needed
- The structure can be re-evaluated if the team grows

The worker process will be a separate Node.js/Bun process that:
- Connects to the same PostgreSQL database
- Uses a durable queue (pg-boss) for job management
- Runs audit crawls and analysis
- Reports progress back to the database

## Trade-offs

- **Simplicity over scalability**: The single-app structure is simpler but may need to be split if the application grows significantly
- **Pragmatism over purity**: The worker is a separate process but not a separate package, which is pragmatic but less clean
- **Flexibility over optimization**: The structure allows for future restructuring without requiring it now

## Reversal Strategy

If the application grows to require a monorepo:
1. Extract shared code into `packages/`
2. Move the worker into `apps/worker/`
3. Move the Next.js app into `apps/web/`
4. Add Turborepo or Bun workspaces
5. This can be done incrementally without breaking changes

## References

- WinterVell Master Phased Software Build Prompt, Section 6 (Preferred Architecture)
- Next.js 16 App Router documentation
- pg-boss documentation
