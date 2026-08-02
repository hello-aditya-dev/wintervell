# Licence Architecture

WinterVell is commercial proprietary software. The licence architecture enforces the purchased tier's entitlements while remaining non-destructive: a failed licence check never deletes data and never locks the agency out without explanation. This document describes the licence validation service, the offline grace period, the data transmitted, the entitlements model, and the feature-flag system.

It is paired with [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md) (the commercial licence terms) and [`../operations/licence-server-failure.md`](../operations/licence-server-failure.md) (the failure runbook).

---

## Licence validation service

Each WinterVell deployment has a `Licence` record per organisation. The record contains:

| Field | Purpose |
|---|---|
| `licenceId` | The licence key issued by WinterVell |
| `tier` | `hosted`, `agency_source`, or `studio` |
| `status` | `valid`, `grace`, `expired`, `revoked`, `unknown` |
| `lastValidatedAt` | Timestamp of the last successful validation |
| `graceUntil` | Timestamp until which the licence remains valid in offline mode |
| `entitlements` | JSON: the features and limits granted by this licence |
| `fingerprint` | Deployment fingerprint (see below) |

The validation service runs on a schedule (default: every 24 hours) and on startup. It calls the WinterVell licence server with the licence ID and the deployment fingerprint; the server responds with the current entitlements and a fresh `graceUntil` timestamp.

---

## Offline grace period

If the licence server is unreachable, the deployment enters a **grace period** of 14 days. During the grace period:

- All product features continue to work.
- A non-blocking notice is shown in the administrative area: "Licence validation unavailable; operating in offline grace. Grace ends on `<date>`."
- The notice is not shown to prospects and is not included in client-facing reports.
- AI calls, audits, reports, and proposals continue to function.

If the grace period expires without a successful validation:

- The deployment moves to `expired` status.
- The administrative area shows a clear notice: "Licence validation failed and the grace period has expired. Contact WinterVell support."
- New audits cannot be started. Existing audits in progress continue to completion.
- New reports cannot be published. Existing published reports remain accessible to prospects.
- New proposals cannot be sent. Existing proposals remain accessible.
- **Data is never deleted.** The agency's prospects, audits, findings, reports, proposals, and pipeline remain intact and readable.
- The agency can export its data at any time during the expired state — see [`../operations/data-export.md`](../operations/data-export.md).

The grace period and the expired-state behaviour are designed so that a network failure or a WinterVell-side outage never destroys the agency's business. The agency always has time to react.

---

## Data transmitted

The licence validation service transmits only:

- `licenceId` — the licence key.
- `fingerprint` — a deployment fingerprint derived from non-sensitive deployment attributes (deployment URL, organisation count, user count, audit count, last-activity timestamp). The fingerprint does not include prospect names, audit findings, report content, proposal content, or any client data.
- `timestamp` — the validation request time.

The licence server responds with:

- `status` — `valid`, `expired`, `revoked`.
- `entitlements` — the features and limits.
- `graceUntil` — the new grace timestamp.

No client data is transmitted. The licence server does not receive prospect names, website URLs, audit findings, report content, or proposal content. The validation request is logged on the WinterVell side with the licence ID and timestamp only.

---

## Entitlements (FeatureEntitlement model)

The `FeatureEntitlement` model records the features and limits granted by a licence. Entitlements are checked at runtime by the feature-flag system (below). Examples:

| Entitlement | Tiers | Effect |
|---|---|---|
| `maxOrganisations` | 1 (Hosted), 1 (Agency Source), unlimited (Studio) | Caps the number of organisations |
| `maxUsers` | 5 (Hosted), 25 (Agency Source), unlimited (Studio) | Caps the number of members |
| `maxAuditsPerMonth` | 50 (Hosted), 500 (Agency Source), unlimited (Studio) | Caps audit throughput |
| `customDomain` | true (Agency Source, Studio) | Allows custom domain configuration |
| `whiteLabelAdmin` | false (Hosted), true (Studio) | Removes WinterVell attribution from admin area |
| `aiProviderByoKey` | true (Agency Source, Studio) | Allows BYO AI provider key |
| `pdfExport` | true (all) | Allows PDF export |
| `publicReportPreview` | false (Hosted), true (Agency Source, Studio) | Allows public preview of report cover and exec summary |
| `apiAccess` | false (Hosted), true (Agency Source, Studio) | Allows programmatic API access |

Entitlements are checked on the relevant server action. Exceeding an entitlement returns a clear error message ("Your plan allows N users; contact WinterVell to upgrade") and never corrupts data.

---

## Feature flags

A `FeatureFlag` is a runtime toggle. Feature flags are used for:

- **Operator-controlled rollout** — a new feature is enabled for specific organisations before general availability.
- **Licence-granted entitlements** — a feature flag whose value is derived from the licence's entitlements.
- **Emergency shutoff** — a feature can be disabled globally if a critical issue is discovered.

Feature flags are evaluated server-side; the client never receives a flag value that would let it bypass a server-side check. A feature flag that controls access to a server action is checked at the start of the action, not only in the UI.

---

## Tier enforcement points

Tier enforcement happens at:

- **Server-action entry** — every sensitive server action checks the relevant entitlement.
- **Worker job pickup** — the audit worker checks `maxAuditsPerMonth` before claiming a job.
- **Branding render** — the renderer checks `whiteLabelAdmin` to decide whether to include WinterVell attribution in the admin area.
- **Custom-domain configuration** — the domain-setup flow checks `customDomain`.
- **API key creation** — the API-key flow checks `apiAccess`.
- **AI provider configuration** — the BYO-key flow checks `aiProviderByoKey`.

Enforcement is always server-side. A client that disables a check in the UI is still blocked by the server.

---

## Non-destructive guarantees

The licence system makes three non-destructive guarantees:

1. **Never deletes data.** A failed licence check does not delete, anonymise, or hide the agency's data. Data is always exportable.
2. **Never locks without explanation.** A locked state always includes a clear notice explaining what happened, what is still possible, and how to resolve.
3. **Never transmits client data.** The validation request contains only the licence ID, the fingerprint, and the timestamp.

These guarantees are part of the commercial contract — see [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md). Violating them is a contract breach.

---

## Fingerprint computation

The deployment fingerprint is a SHA-256 hash of:

- The deployment's public URL.
- The total organisation count.
- The total user count.
- The total audit count (lifetime).
- The last-activity timestamp (truncated to the day).

The fingerprint is stable across restarts (it changes only when the inputs change) and is non-reversible (it cannot be used to recover the underlying counts). Its purpose is to detect licence-key sharing across deployments.

---

## Related documents

- [`../legal/COMMERCIAL_LICENSE.md`](../legal/COMMERCIAL_LICENSE.md) — commercial licence terms
- [`../operations/licence-server-failure.md`](../operations/licence-server-failure.md) — failure runbook
- [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md) — per-tier branding rules
- [`security-model.md`](security-model.md) — broader security model
- [`data-model.md`](data-model.md) — `Licence`, `FeatureEntitlement`, `FeatureFlag` models
