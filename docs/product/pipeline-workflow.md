# Pipeline Workflow

WinterVell's pipeline is a twelve-stage kanban that tracks a prospect from first touch to closed-won (or closed-lost, or archived). Every prospect, audit, report, and proposal in the system maps to exactly one pipeline stage at any time. This document lists the stages, the per-opportunity fields, and the stage-transition rules.

It is paired with [`report-workflow.md`](report-workflow.md) and [`proposal-workflow.md`](proposal-workflow.md), which feed the pipeline.

---

## The twelve stages

| # | Stage | Meaning | Entry condition |
|---|---|---|---|
| 1 | New prospect | A prospect has been captured but no audit planned | Prospect created |
| 2 | Audit planned | An audit has been created but not started | Audit created; auditor assigned |
| 3 | Audit running | The audit engine is executing runners | Audit started |
| 4 | Audit review | Findings are being reviewed by an Auditor | Audit complete; under review |
| 5 | Report sent | A report has been shared with the prospect | Share link created and sent |
| 6 | Report viewed | The prospect has opened the report | First `ReportEvent` recorded |
| 7 | Follow-up due | A follow-up task is scheduled and not yet completed | Follow-up task due date reached |
| 8 | Proposal sent | A proposal has been sent to the prospect | Proposal approved and emailed |
| 9 | Negotiation | The prospect is responding, terms are being discussed | Prospect has replied to the proposal |
| 10 | Won | The opportunity has closed successfully | Proposal accepted |
| 11 | Lost | The opportunity has closed unsuccessfully | Marked lost with a reason |
| 12 | Archived | The opportunity is no longer active (won and delivered, lost and closed, or withdrawn) | Manual archive by Owner/Admin |

Every transition is recorded in `StageHistory` with timestamp, user, and optional note. Stage transitions are not silently reversible; a "Lost → Won" transition is allowed but requires a reason and is flagged in the audit log.

---

## Drag-and-drop

The pipeline view is a kanban. Cards are dragged between columns. A drag is a stage transition; the server validates that the transition is allowed (for example, you cannot drag a prospect with no audit from "New prospect" directly to "Report sent").

Allowed transitions:

- Forward by any number of stages: allowed.
- Backward by one stage: allowed with a reason.
- Backward by more than one stage: requires Audit manager or Sales manager approval.
- Into Won: requires a `wonValue`.
- Into Lost: requires a `lostReason`.
- Into Archived: requires Owner or Administrator.

---

## Per-opportunity fields

| Field | Type | Purpose |
|---|---|---|
| `prospect` | relation | The prospect this opportunity is for |
| `stage` | enum | Current stage (1–12) |
| `owner` | relation | Sales representative responsible |
| `estimatedValue` | decimal | Estimated deal value in the agency's currency |
| `probability` | integer (0–100) | Likelihood of closing, used in forecasting |
| `expectedCloseDate` | date | Expected close date |
| `wonValue` | decimal | Actual won value, set on transition to Won |
| `lostReason` | enum + note | Why the opportunity was lost |
| `audit` | relation | The audit linked to this opportunity |
| `reportVersion` | relation | The report version shared with the prospect |
| `proposalVersion` | relation | The proposal version sent |
| `followUpTasks` | relation[] | Tasks associated with this opportunity |
| `notes` | relation[] | Internal notes |
| `stageHistory` | relation[] | Every stage transition |
| `createdAt` / `updatedAt` | timestamp | Record timestamps |
| `organisationId` | relation | Tenant scoping |

`expectedValue` (computed) = `estimatedValue * probability / 100`. This is shown in the pipeline header and used in forecasts.

---

## Stage history

Every stage transition appends a `StageHistory` record:

- `opportunityId`
- `fromStage`
- `toStage`
- `userId` — who made the transition
- `reason` — optional free-text reason (required for backward transitions, Won, Lost, Archived)
- `timestamp`

Stage history is immutable. It is the audit trail of how the opportunity moved through the pipeline.

---

## Follow-up tasks

Each opportunity can have any number of follow-up tasks. A task has:

- `title`, `description`
- `assignee` (relation to a user)
- `dueAt` (timestamp)
- `completedAt` (timestamp, nullable)
- `priority` (Low / Medium / High)

When a task's `dueAt` passes and the task is not completed, the opportunity moves to **Follow-up due** on the next pipeline sync. Completing the task does not automatically move the opportunity out of **Follow-up due** — the Sales representative moves it manually once the follow-up has actually happened.

---

## Lost reasons

The `lostReason` enum covers the common cases:

- Price too high
- Went with competitor
- No decision / went cold
- Bad timing
- Scope mismatch
- Lost to in-house team
- Budget cut
- Other (with note)

Lost reasons feed an aggregate "loss analysis" report available to Sales managers and above. The aggregate is anonymous per prospect; individual lost-reason notes are visible only to the opportunity owner and to managers.

---

## Forecasting

The pipeline header shows:

- Count of opportunities per stage.
- Sum of `estimatedValue` per stage.
- Sum of `expectedValue` (estimated × probability) across all open opportunities — the weighted forecast.
- Count and value of opportunities with `expectedCloseDate` in the current and next month.

Forecasts are scoped to the caller's organisation and filtered by the caller's role (a Sales representative sees their own pipeline; a Sales manager sees the team's).

---

## Conversion to client project

When an opportunity moves to **Won**, WinterVell optionally creates a `Client` record (a converted prospect) and a `Project` record (the engagement described in the accepted proposal). The Client and Project records are out of scope for the audit-and-proposal workflow; they are the handover into delivery. Project records inherit the accepted `ProposalVersion` as their initial scope.

When an opportunity is **Archived** (whether previously Won or Lost), it leaves the active pipeline view but is retained for historical reporting. Archived opportunities are not deleted; deletion is a separate, audited action — see [`../operations/data-deletion.md`](../operations/data-deletion.md).

---

## Related documents

- [`report-workflow.md`](report-workflow.md) — what produces the report
- [`proposal-workflow.md`](proposal-workflow.md) — what produces the proposal
- [`user-roles.md`](user-roles.md) — who can do what in the pipeline
- [`../architecture/data-model.md`](../architecture/data-model.md) — `Opportunity`, `PipelineStage`, `StageHistory` models
