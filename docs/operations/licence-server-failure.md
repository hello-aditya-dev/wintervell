# Licence Server Failure

This runbook describes how WinterVell behaves when the WinterVell licence validation server is unreachable, and how to recover. It is paired with [`../architecture/licence-architecture.md`](../architecture/licence-architecture.md) and [`incident-response.md`](incident-response.md).

---

## Behaviour summary

WinterVell is designed to operate normally during a licence-server outage. The system never deletes data and never locks the agency out without explanation.

| State | Trigger | User-visible behaviour | Functional behaviour |
|---|---|---|---|
| `valid` | Last validation succeeded | Normal | Full functionality |
| `grace` | Validation failed; `graceUntil` not yet passed | Banner in admin area: "Licence validation unavailable; operating in offline grace. Grace ends on `<date>`." | Full functionality |
| `expired` | `graceUntil` passed without successful validation | Banner: "Licence validation failed and the grace period has expired. Contact WinterVell support." | New audits/reports/proposals blocked; existing data fully readable and exportable |
| `revoked` | Server returned `revoked` | Banner: "Licence has been revoked. Contact WinterVell support." | Same as `expired` |
| `unknown` | Licence record missing or corrupt | Banner: "Licence state could not be determined. Contact WinterVell support." | Read-only mode |

---

## Offline grace period

The grace period is 14 days by default (configurable per deployment, minimum 7 days). The grace clock starts at the first failed validation after a successful one. Each successful validation resets the grace clock.

During grace:

- All product features continue to work: audits run, reports publish, proposals send, pipeline operates.
- AI calls continue (subject to the AI provider being independently configured).
- The banner is non-blocking and is not shown to prospects.
- The banner is not included in client-facing reports or proposals.

The grace period is enforced locally; it does not require the licence server. The deployment's `Licence` record stores `lastValidatedAt` and `graceUntil`; the application checks these locally on every relevant action.

---

## Expired state

If the grace period expires without a successful validation:

- **Blocked**: new audit creation, new report publication, new proposal sending, new opportunity creation, new member invitations.
- **Allowed**: viewing existing data, editing existing findings (Auditor review), editing existing opportunities (stage transitions within the existing pipeline), exporting data, generating PDFs of existing reports.
- **Never happens**: data deletion, data hiding, session revocation, lockout without notice.

The agency can export its full data at any time during the expired state — see [`data-export.md`](data-export.md). The export is complete and includes all prospects, audits, findings, reports, proposals, opportunities, tasks, and notes.

---

## Detection

A licence-server outage is detected by:

- The scheduled validation job (every 24 hours) failing.
- The startup validation failing.
- A manual validation request from the admin area failing.

The on-call engineer is alerted if:

- A deployment enters `grace` state.
- A deployment enters `expired` state (SEV-2 — a tenant is now in degraded mode).

---

## Recovery

### If the licence server is back up

1. The next scheduled validation (or a manual validation from the admin area) succeeds.
2. `Licence.status` returns to `valid`.
3. `graceUntil` is refreshed.
4. Banners clear.
5. Full functionality resumes.

No manual intervention is required beyond ensuring the licence server is reachable from the deployment.

### If the licence server is down for an extended period

1. The deployment enters `grace` (banner shown).
2. After 14 days (or the configured grace window), the deployment enters `expired`.
3. The agency is notified by email (if email is configured) and in-app.
4. The agency can extend the grace window by contacting WinterVell support, who can issue a time-limited extension token that the agency pastes into the admin area. The token is signed and verifies offline.
5. Once the licence server recovers, normal validation resumes.

### If the licence server is permanently unavailable (WinterVell-side disaster)

WinterVell maintains an offline-verification capability: the agency can request a permanent offline licence file (signed by WinterVell's private key) that validates without contacting the server. This is the disaster-recovery path and is documented in [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md). The offline licence file is issued per-deployment and is bound to the deployment fingerprint.

---

## Data guarantees

The licence system makes three non-destructive guarantees (repeated from [`../architecture/licence-architecture.md`](../architecture/licence-architecture.md)):

1. **Never deletes data.** A failed licence check does not delete, anonymise, or hide the agency's data. Data is always exportable.
2. **Never locks without explanation.** A locked state always includes a clear notice.
3. **Never transmits client data.** The validation request contains only the licence ID, the fingerprint, and the timestamp.

A tenant Owner who believes their data has been affected by a licence-server failure should:

1. Check the admin area banner for the current state.
2. Export their data — see [`data-export.md`](data-export.md).
3. Contact WinterVell support with the licence ID and the deployment URL.

---

## Read-only mode

In the `unknown` state (licence record missing or corrupt), the deployment enters read-only mode as a safety measure:

- No writes are accepted (server actions return a 503 with a clear message).
- Reads continue (users can view existing data).
- The state is logged and alerts the on-call engineer.
- Recovery is via a manual licence record repair or a WinterVell support contact.

Read-only mode is rare and indicates a database corruption or a misconfigured deployment, not a normal licence-server failure.

---

## Escalation

| State | Escalation |
|---|---|
| `grace` (first transition) | SEV-3; investigate during business hours |
| `grace` (approaching expiry, <3 days remaining) | SEV-2; notify the tenant Owner |
| `expired` | SEV-2; notify the tenant Owner; prioritise licence-server recovery |
| `revoked` | SEV-2; notify the tenant Owner; investigate revocation reason |
| `unknown` | SEV-1; possible database corruption |
| Multiple tenants in `expired` simultaneously | SEV-1; licence-server-wide outage |

---

## Related documents

- [`../architecture/licence-architecture.md`](../architecture/licence-architecture.md) — licence architecture
- [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md) — commercial licence terms
- [`data-export.md`](data-export.md) — data export
- [`incident-response.md`](incident-response.md) — incident response
- [`backup-restore.md`](backup-restore.md) — database restore
