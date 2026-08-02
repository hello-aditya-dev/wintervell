# User Roles and Permissions

WinterVell uses a permission-based authorization model. Roles are a convenience layer over permissions; **every** sensitive server action verifies the caller's identity, organisation membership, required permission, and resource ownership. UI elements that the user lacks permission to perform are hidden, but hiding the UI is not the security boundary — the server-side check is. See [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) and [`../architecture/security-model.md`](../architecture/security-model.md) for the authorization contract.

This document lists the seven roles and the permission matrix.

---

## The seven roles

| Role | Purpose |
|---|---|
| **Owner** | Single per organisation. Holds billing, licensing, and the irrevocable right to dissolve or transfer the organisation. |
| **Administrator** | Day-to-day administration: members, roles, integrations, branding, service catalogue, licence status. |
| **Audit manager** | Owns the audit programme: creates audits, assigns auditors, approves reports before publishing. |
| **Auditor** | Runs audits, edits findings, marks false positives, prepares reports for review. |
| **Sales manager** | Owns the pipeline: assigns opportunities, sets targets, approves proposals before sending. |
| **Sales representative** | Owns prospects and opportunities: captures prospects, sends reports, follows up, closes deals. |
| **Viewer** | Read-only access to reports, proposals, and pipeline. No edit, no send. |

An organisation has exactly one Owner. All other roles may be held by any number of members. A member holds exactly one role per organisation; cross-organisation membership is supported but each membership is independent.

---

## Permission-based authorization principle

WinterVell enforces authorization in four layers on every sensitive server action:

1. **Authentication** — the caller is a logged-in user with a valid NextAuth session.
2. **Organisation membership** — the caller is an active member of the organisation that owns the resource.
3. **Permission** — the caller's role grants the required permission for the action.
4. **Resource ownership** — `resource.organisationId === user.membership.organisationId`. This is the IDOR defence. See [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md).

Hiding UI that the user cannot use is a usability feature, not a security control. A user with a stolen cookie and a guessed URL cannot bypass step 4 by typing a path.

---

## Permission matrix

Capability abbreviations: **C** = create, **R** = read, **U** = update, **D** = delete, **A** = approve/publish, **S** = send/share externally, **X** = execute (run audit, sign proposal).

| Capability | Owner | Admin | Audit mgr | Auditor | Sales mgr | Sales rep | Viewer |
|---|---|---|---|---|---|---|---|
| Organisation settings | CRU | CRU | R | R | R | R | R |
| Members & invitations | CRU | CRU | R | — | R | R | R |
| Role assignment | CRU | CRU | — | — | — | — | — |
| Branding / white-label | CRU | CRU | R | — | R | — | R |
| Service catalogue | CRU | CRU | R | R | R | R | R |
| Integrations & API keys | CRU | CRU | R | — | R | — | — |
| Licence & billing | R | R | — | — | — | — | — |
| Prospects | CRUD | CRUD | CRU | R | CRUD | CRUD | R |
| Audit creation | — | — | C | C | — | — | — |
| Audit execution (run) | — | — | X | X | — | — | — |
| Findings edit / verify | — | — | CRU | CRU | R | R | R |
| Report approve & publish | — | — | A | — | — | — | — |
| Report share / send | — | — | S | — | S | S | — |
| Proposals edit | — | — | CRU | R | CRU | CRU | R |
| Proposal approve & send | — | — | — | — | A | — | — |
| Pipeline stages config | CRU | CRU | — | — | R | R | R |
| Opportunities | CRUD | CRUD | R | R | CRUD | CRUD | R |
| Opportunity close (won/lost) | — | — | — | — | A | A | — |
| Tasks & notes | CRU | CRU | CRU | CRU | CRU | CRU | R |
| Audit log | R | R | R | R | R | R | R |
| Data export (org-level) | X | X | — | — | — | — | — |
| Data deletion (org-level) | X | — | — | — | — | — | — |

Notes:

- **Owner** is the only role that can delete the organisation or perform org-level data deletion. See [`../operations/data-deletion.md`](../operations/data-deletion.md).
- **Administrator** holds every operational capability except organisation deletion, role assignment to Owner, and direct sales execution.
- **Auditor** can prepare a report but cannot approve, publish, or send it. The separation between Auditor and Audit manager is intentional: it is the four-eyes principle on client-facing output.
- **Sales representative** can edit and send proposals but cannot approve them. Sales manager approval is required before a proposal leaves the building.
- **Viewer** is read-only across the board. No create, no update, no send. Used for stakeholders, accountants, junior observers.
- An empty cell (`—`) means the role does not have the capability. It does not mean the action is impossible — it means a user with that role cannot perform it.

---

## Permission granularity

Permissions are defined as a flat list of `<resource>:<action>` strings (for example, `audit.create`, `report.publish`, `proposal.send`, `opportunity.close`). The role-to-permission mapping above is enforced on the server via a single authorization helper used by every server action and every API route. Adding a new capability requires:

1. Adding the permission string to the canonical list.
2. Granting it to the appropriate roles in the matrix.
3. Calling the authorization helper in the new server action.
4. Adding a tenant-isolation test that confirms a user from organisation A cannot perform the action on a resource owned by organisation B.

Skipping step 3 or 4 is a security defect.

---

## Related documents

- [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) — tenant scoping and IDOR defence
- [`../architecture/security-model.md`](../architecture/security-model.md) — full security model
- [`../legal/SECURITY_DISCLOSURE.md`](../legal/SECURITY_DISCLOSURE.md) — security disclosure
- [`product-overview.md`](product-overview.md) — product overview
