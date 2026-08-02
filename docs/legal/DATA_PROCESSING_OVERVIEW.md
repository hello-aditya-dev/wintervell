# Data Processing Overview

> **TEMPLATE — REQUIRES LEGAL REVIEW.** This document describes how WinterVell processes data at a technical and organisational level, for use by Licensees, buyers, and privacy reviewers. It complements [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) (the externally-facing notice) and [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md) (the security posture). It is a template; Licensees must adapt it to their actual sub-processors, hosting region, and configuration before relying on it for compliance.

---

## 1. Roles

| Role | Who | Responsibility |
|---|---|---|
| Controller | The Licensee (agency operating the Authorized Deployment) | Determines purposes and means of processing prospect, report-viewer, and account-user data |
| Processor | The Licensor (WinterVell), only for Hosted Licence deployments | Processes Licensee data strictly as necessary to operate the Hosted Service, under a separate DPA |
| Sub-processors | Hosting, storage, email, AI providers engaged by the Licensee | Process specific data categories per the Licensee's configuration |

For source-licence tiers (Agency Source, Studio), the Licensee is both controller and the operator; the Licensor does not process Licensee data.

---

## 2. Data flows

The following diagram describes the end-to-end flow of data through WinterVell. Each numbered step is explained in the subsections below.

```
[1] User input            [2] Audit worker         [3] Findings & evidence
    prospect data  ───►       URL fetch +        ───►    structured storage
    website URL               analysis                  (PostgreSQL + object storage)
    manual findings                                     │
                                                         ▼
                                          [4] Report builder  ──►  [5] PDF / share link
                                                                          │
                                                                          ▼
                                                              [6] Report viewer
                                                                  (engagement events)
                                                                          │
                                                                          ▼
                                                              [7] Opportunity / pipeline
```

### 2.1 User input (step 1)

The Agency user enters prospect data (name, email, phone, company, website URL) and triggers an audit by providing the prospect's website URL. Manual findings (added by the Agency user) are also entered here.

**Data:** prospect personal data, website URL, free-text notes.

**Storage:** PostgreSQL (`Prospect`, `Audit`, `Finding` tables).

### 2.2 Audit worker (step 2)

The audit worker fetches the user-provided URL subject to WinterVell's SSRF block-list (see [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md)). The worker:

- Resolves DNS and validates that the resolved IP is not in a blocked range (private IPv4, link-local IPv6, cloud metadata, loopback).
- Re-validates the IP after any HTTP redirect to defend against DNS rebinding.
- Enforces a maximum response size and time.
- Runs in an isolated worker environment that does not have access to the Licensee's other internal services.
- Accepts only `http://` and `https://` protocols.

**Data sent outbound:** an HTTP GET (and a limited set of subsequent sub-resource fetches) to the audited website. **No prospect personal data is sent to the audited site.**

### 2.3 Findings and evidence (step 3)

Findings are stored with: category, severity, confidence, URL, page title, selector, screenshot, raw evidence, human-readable explanation, business consequence, recommended action, estimated effort, suggested service, verification flag, timestamp, and the tool/provider used.

**Storage:**

- Structured fields: PostgreSQL (`Finding` and related tables)
- Screenshots and large raw evidence blobs: object storage (referenced by URL from PostgreSQL)
- PDFs (generated reports): object storage

### 2.4 Report builder (step 4)

The Agency user assembles a client-facing report from approved findings. The report builder supports: cover, executive summary, scores, priority issues, evidence, business impact, recommendations, quick wins, phases, suggested services, pricing, agency branding, CTA, disclaimer.

**Storage:** PostgreSQL (`Report`) and the report content references the persisted findings.

### 2.5 Share link / PDF (step 5)

The Agency user generates a share link (signed, expiring, optionally password-protected) and/or a PDF. The PDF is rendered server-side with selectable text and page numbers.

**Storage:** share-link metadata in PostgreSQL; PDF in object storage.

### 2.6 Report viewer (step 6)

When a prospect opens the share link, WinterVell:

- Validates the link signature and expiry
- Renders the report
- Records engagement events: first-viewed, last-viewed, view count, CTA clicks, download events
- Records a coarse device category (desktop / tablet / mobile) and browser family
- Does **not** record street-level geolocation; approximate country/region may be inferred from IP only if the Licensee has configured it and has a legal basis, and this can be disabled

**Storage:** `ReportView`, `ReportEngagementEvent` tables.

### 2.7 Opportunity / pipeline (step 7)

Approved reports convert into opportunities in the agency pipeline. The pipeline tracks stage, probability, expected close, lost reason, won value.

**Storage:** PostgreSQL (`Opportunity`, `OpportunityStageHistory`).

---

## 3. AI provider data flow

The AI provider abstraction (see [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md)) supports OpenAI-compatible, Anthropic, mock, and z-ai-web-dev-sdk providers. AI is invoked **only** when the Licensee has configured a provider and an API key.

```
Agency user triggers AI task
        │
        ▼
Server-side prompt assembly (audit findings, context — never the API key on the client)
        │
        ▼
Provider abstraction selects configured provider & model
        │
        ▼
HTTPS POST to provider with prompt (BYO key from server-side secrets — never exposed to the browser)
        │
        ▼
Provider returns structured output → validated against schema
        │
        ▼
Stored as AI-assisted draft → editable by Agency user → published only on approval
```

**Critical data-handling rules:**

- Provider API keys are stored only in server-side environment secrets. They are **never** transmitted to the browser or embedded in client bundles.
- The API key is transmitted **only** to the configured provider's API endpoint over HTTPS.
- Prompts may include audit findings, the audited website URL, and structured context. They **do not** include other prospects' data, the Agency's other clients' data, or any data from other organisations (see Data isolation).
- AI output is **always editable** and is marked as a draft until the Agency user approves it.

---

## 4. Where data is stored

| Data category | Primary storage | Object storage | Logs |
|---|---|---|---|
| Prospect records, opportunities, tasks | PostgreSQL | — | Application logs (redacted) |
| Audit findings (structured) | PostgreSQL | — | Application logs (redacted) |
| Screenshots, raw HTML evidence | URL reference in PostgreSQL | Yes — screenshots and evidence blobs | — |
| Generated PDFs | URL reference in PostgreSQL | Yes | — |
| Report share-link metadata | PostgreSQL | — | Access logs (redacted) |
| Report viewer engagement | PostgreSQL | — | Application logs (redacted) |
| Audit-log entries | PostgreSQL | — | — |
| AI prompts and outputs (drafts) | PostgreSQL | — | Token/cost logs (no full prompt unless Licensee enables verbose logging) |
| Backups | Provider-managed backup service | Yes | Backup logs (metadata only) |

**Local development** uses SQLite (file-based) per [`README.md`](../../README.md). SQLite is for development only; production deployments use PostgreSQL.

---

## 5. Sub-processors (template)

Licensees must complete this list with the actual sub-processors engaged for their deployment.

| Sub-processor | Purpose | Location | Data categories | DPA in place |
|---|---|---|---|---|
| [Hosting provider, e.g. Vercel / self-hosted on AWS/GCP/Azure] | Application hosting | [Region] | All deployment data | [Yes / No] |
| [Database provider, e.g. managed PostgreSQL] | Primary data store | [Region] | All structured data | [Yes / No] |
| [Object storage provider, e.g. S3/R2/GCS] | Screenshots, PDFs, evidence | [Region] | Binary artifacts | [Yes / No] |
| [Email provider, e.g. Resend/Postmark/SendGrid] | Transactional email | [Region] | Recipient email + message content | [Yes / No] |
| [AI provider, e.g. OpenAI/Anthropic/z-ai] | AI-assisted drafting | [Region] | Prompts + audit findings | [Yes / No] |
| [Error monitoring, e.g. Sentry] | Error diagnosis | [Region] | Redacted error data | [Yes / No] |
| [DNS / CDN provider] | Edge delivery | [Region] | IP, request metadata | [Yes / No] |

The Licensee reviews this list at least annually and on any sub-processor change.

---

## 6. Data isolation

WinterVell is multi-tenant by design. Every record that belongs to a tenant carries an `organisationId`. All data-access code is required to scope queries by `organisationId`. Cross-organisation access is prevented at the data-access layer; authorization checks at the API layer enforce role-based permissions on top of the organisation scope. See [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md).

- A user belongs to one or more organisations via `Membership`.
- A membership has a role (`OWNER`, `ADMIN`, `MEMBER`, etc.) — see [`docs/architecture/security-model.md`](../architecture/security-model.md).
- API routes verify both organisation membership and role-based permission for the requested resource.
- AI prompts are assembled from a single organisation's data at a time.

---

## 7. Retention controls

WinterVell provides configurable retention controls:

| Control | Default | Configurable by |
|---|---|---|
| Report share-link expiry | 30 days | Agency admin |
| Report viewer engagement retention | 90 days after share-link expiry | Agency admin |
| Audit-log retention | 365 days | Agency admin (extendable) |
| AI prompt/output retention | Until draft is published or deleted by user | Agency user |
| Backup retention | 30 days rolling | Operations |

Hard delete (`DELETE` in PostgreSQL + object-storage purge) is invoked when retention expires or when the Agency user explicitly deletes a record. See Deletion controls below.

---

## 8. Deletion controls

- **Per-record delete.** Agency users with permission can delete prospects, audits, findings, reports, and opportunities. Deletion cascades to related records per the Prisma schema's referential rules.
- **Bulk delete.** Organisation owners can bulk-delete all data for an organisation, used for offboarding a tenant or completing a data subject erasure request.
- **Object-storage purge.** Deleting a screenshot, evidence blob, or PDF removes the database row and triggers an object-storage deletion. Backups containing the deleted data are aged out per the backup retention window.
- **Soft-delete vs hard-delete.** Where the Agency requires recoverability, soft-delete is configurable per record family. Soft-deleted records are excluded from normal queries and are hard-deleted when their soft-delete retention expires.
- **Licence enforcement does NOT delete data.** Per [`COMMERCIAL_LICENSE.md`](COMMERCIAL_LICENSE.md), WinterVell never deletes customer data as a licence-enforcement mechanism.

---

## 9. International transfers

Personal data is processed in the hosting region configured by the Licensee. Cross-border transfers occur when:

- The hosting provider operates in a different region from the data subject
- The configured AI provider processes prompts in a different region
- The configured email or storage provider processes data in a different region

The Licensee is responsible for ensuring an appropriate transfer mechanism (Standard Contractual Clauses, adequacy decision, Binding Corporate Rules, or another lawful mechanism) is in place for each transfer. See [`PRIVACY_NOTICE_TEMPLATE.md`](PRIVACY_NOTICE_TEMPLATE.md) Section 6.

---

## 10. Logging and redaction

- Application logs record request method, route, status code, duration, and a correlation ID. **Personal data is not logged.**
- Error logs may include stack traces; secrets, API keys, session tokens, and prospect identifiers are redacted before logging.
- Token/cost logs for AI calls record provider, model, prompt token count, completion token count, and an estimated cost — **not** the full prompt unless verbose logging is explicitly enabled by the Licensee.
- Access logs for report share links record the share-link ID, timestamp, and coarse device category — not the viewer's IP unless approximate-location tracking is enabled and lawful.

---

## 11. Backups and restore

- Backups are taken per the operations runbook (see [`docs/operations/`](../operations/)).
- Backups are encrypted at rest where supported by the provider.
- Restore procedures are tested at least quarterly.
- Backups are subject to the same retention rules as the primary data: a record deleted from production is deleted from backups when the backup containing it ages out.

---

## 12. What WinterVell does NOT do

- Does **not** train models on Licensee data. If a third-party AI provider does so under its own terms, that is governed by the provider's terms and disclosed to the Licensee — see [`AI_USAGE_DISCLOSURE.md`](AI_USAGE_DISCLOSURE.md).
- Does **not** bundle advertising or third-party analytics in client-facing reports.
- Does **not** record street-level geolocation of report viewers.
- Does **not** transmit provider API keys to the browser.
- Does **not** access Licensee data except as strictly necessary to operate a Hosted Licence, and only under a separate DPA.
- Does **not** delete customer data as a licence-enforcement mechanism.

---

## 13. Maintenance

- This document is updated whenever the data flow changes, a new sub-processor is added, or a new data category is introduced.
- Licensees deploying WinterVell must complete the sub-processor table and the retention defaults to match their deployment.
- The data-processing agreement (DPA) for Hosted Licence deployments is a separate contractual document and is not duplicated here.

---

*This document is part of the WinterVell legal package. It is a template maintained for accuracy; it is **not legal advice**.*
