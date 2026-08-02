# Multi-Tenancy

WinterVell is a multi-tenant SaaS. Each organisation is a tenant. Tenant isolation is enforced at the data layer (every tenant-scoped record carries an `organisationId`) and at the application layer (every sensitive server action verifies resource ownership before acting). This document describes the isolation model and the IDOR defence.

It is paired with [`security-model.md`](security-model.md) (the broader security model) and [`data-model.md`](data-model.md) (the schema).

---

## Organisation-scoped isolation

Every tenant-scoped record in the database carries an `organisationId` foreign key. There is no shared "global" table for tenant data. Cross-tenant queries are explicit, reviewed, and rare (licence validation, system telemetry).

A typical query is:

```ts
const audits = await prisma.audit.findMany({
  where: {
    organisationId: user.organisationId,
    deletedAt: null,
  },
  orderBy: { createdAt: "desc" },
});
```

The `organisationId` filter is not optional. A Prisma extension or wrapper enforces it; a developer who forgets it triggers a tenant-isolation test failure in CI.

---

## Resource-ownership verification on every server action

Every sensitive server action follows the four-step authorization contract:

1. **Authentication** — the caller has a valid NextAuth session.
2. **Organisation membership** — the caller is an active member of an organisation.
3. **Permission** — the caller's role grants the required permission.
4. **Resource ownership** — `resource.organisationId === membership.organisationId`.

A typical server action:

```ts
"use server";

export async function deleteFinding(input: DeleteFindingInput) {
  const session = await requireSession();            // step 1
  const membership = await requireMembership(session.userId, input.organisationId); // step 2
  requirePermission(membership.role, "finding.delete");             // step 3

  const finding = await prisma.finding.findUnique({
    where: { id: input.findingId },
    select: { organisationId: true, deletedAt: true },
  });
  if (!finding || finding.deletedAt) throw new NotFoundError();
  if (finding.organisationId !== membership.organisationId) {       // step 4
    throw new NotFoundError(); // NOT a 403 — see "IDOR defence" below
  }

  await prisma.finding.update({
    where: { id: finding.id },
    data: { deletedAt: new Date() },
  });
  await auditLog.record({ action: "finding.delete", ... });
}
```

The four-step check is implemented in a single helper (`authorize()`) used by every sensitive server action. Skipping the helper is a code-review block.

---

## IDOR defence

Insecure Direct Object Reference (IDOR) is the class of vulnerability where a user from organisation A can access a resource owned by organisation B by guessing or harvesting a resource ID. WinterVell's IDOR defence has three properties:

1. **The check is server-side.** The UI may hide a button if the user lacks permission, but the server re-checks on every action.
2. **The check is per-resource.** Even if a user has the right role and permission, they can only act on resources owned by their organisation.
3. **A failed ownership check returns 404, not 403.** This prevents information leakage: a user from organisation A who guesses a finding ID from organisation B gets "not found," not "forbidden." The existence of the resource is not confirmed.

A failed ownership check is logged at `WARN` level with the user, the resource ID, and the resource's actual `organisationId`. Repeated failures from the same user trigger an alert and may suspend the session.

---

## Tenant-isolation tests

Every server action that touches a tenant-scoped resource has a corresponding tenant-isolation test:

- User A in organisation A creates a resource.
- User B in organisation B attempts to read, update, delete, or act on that resource.
- The test asserts that the action fails with a 404 (or equivalent).
- The test also asserts that User B cannot enumerate the resource (a list query from User B does not return User A's resource).

These tests run on every CI build. A new server action without a tenant-isolation test is a code-review block. See [`security-model.md`](security-model.md) for the full test catalogue.

---

## Cross-tenant operations

The only operations that intentionally cross tenant boundaries are:

- **Licence validation** — the licence validation service reads the `Licence` table across organisations to validate entitlements. It does not read prospect, audit, or report data.
- **System telemetry** — aggregated counts (number of audits run in the last 24h) for operational monitoring. Aggregates are anonymised; no per-tenant data is exposed.
- **Operator admin** — a WinterVell operator (for the Hosted tier) may access tenant data for support, with explicit logging and per-session justification. Operator access is audited and reviewable by the tenant Owner.

Cross-tenant queries are reviewed and signed off. A pull request that introduces a new cross-tenant query without sign-off is rejected.

---

## Session and membership

A user may hold memberships in multiple organisations. The active organisation is selected at login or via an organisation switcher in the UI. The active membership is stored on the session; every server action reads the active membership from the session, not from a client-supplied parameter.

A client that attempts to supply `organisationId` directly (for example, in a request body) is ignored — the server always uses the session's active membership. This prevents a user from impersonating a member of another organisation by submitting that organisation's ID.

---

## Data export and deletion

Tenant-scoped data export and deletion are documented in [`../operations/data-export.md`](../operations/data-export.md) and [`../operations/data-deletion.md`](../operations/data-deletion.md). Both are scoped to the caller's organisation; an Owner cannot export or delete another organisation's data.

---

## Related documents

- [`data-model.md`](data-model.md) — schema and tenant-scoped models
- [`security-model.md`](security-model.md) — full security model
- [`../product/user-roles.md`](../product/user-roles.md) — roles and permissions
- [`../operations/data-export.md`](../operations/data-export.md) — org-level export
- [`../operations/data-deletion.md`](../operations/data-deletion.md) — deletion procedures
