# Privacy Notice Template

> **TEMPLATE — REQUIRES LEGAL REVIEW.** This is a template privacy notice for Licensees to adapt and publish for their Authorized Deployment of WinterVell. It is **not** a finished legal document. A qualified privacy lawyer in the Licensee's jurisdiction must review and finalize it before publication. Bracketed `[...]` fields must be completed. WinterVell itself does not process Licensee data except as strictly necessary to operate a Hosted Licence, and only under a separate data-processing agreement — see [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md).

This template reflects WinterVell's privacy posture:

- **No covert tracking.** WinterVell does not embed third-party analytics, advertising pixels, or session-replay tools in client-facing reports.
- **Report analytics are minimal.** When a report share link is viewed, WinterVell records only: view events, CTA clicks, and a coarse device category. Geolocation is **not** tracked at street level; only coarse country/region may be inferred from IP where the Licensee has a legal basis to do so, and Licensees may disable this entirely.
- **BYO AI keys.** When the Licensee configures a third-party AI provider with their own API key, prompts and any data included in them are transmitted to that provider under the provider's terms.

---

## [Agency Name] Privacy Notice

**Effective date:** [DATE]
**Controller:** [LEGAL ENTITY NAME], a [JURISDICTION] entity, with its principal place of business at [ADDRESS] ("we", "us", "the Agency").
**Data Protection Officer / Privacy contact:** [NAME / EMAIL]
**Product:** WinterVell, deployed by the Agency as an Authorized Deployment under the WinterVell Commercial Source License (WV-CSL).

This Privacy Notice describes how the Agency collects, uses, shares, and protects personal data processed through its deployment of WinterVell. It applies to two distinct groups of individuals: **prospects** whose data is entered into the Agency's pipeline, and **report viewers** who are sent a share link to an audit, proposal, or roadmap.

---

## 1. Who is the data controller?

The Agency is the data controller of the personal data processed through its Authorized Deployment of WinterVell. WinterVell (the Licensor) is **not** a controller of Licensee data and does not access Licensee data except as strictly necessary to operate a Hosted Licence and only pursuant to a separate data-processing agreement. See [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md).

---

## 2. Categories of personal data we process

### 2.1 Prospects

Personal data that the Agency enters or imports about a prospective client. WinterVell does not require prospects to provide this data directly to the platform; the Agency is responsible for the lawful collection of this data.

| Category | Examples |
|---|---|
| Identity | Name (individual contact name) |
| Contact | Email address, phone number |
| Professional | Company name, role/title, website URL |
| Notes | Free-text notes the Agency records about the prospect |

### 2.2 Report viewers

When the Agency sends a share link for an audit, proposal, or roadmap, WinterVell records minimal engagement data so the Agency can understand whether the report was viewed.

| Category | Examples |
|---|---|
| Engagement | First-viewed timestamp, last-viewed timestamp, total view count, CTA clicks, download events |
| Device category | Coarse device type (desktop / tablet / mobile) and browser family — **no persistent cross-site identifier** |
| Approximate location | Where the Agency has configured approximate location and has a legal basis, country/region inferred from IP address. **No street-level geolocation.** This can be disabled entirely. |

### 2.3 Account users

Employees and contractors of the Agency who are granted a user account.

| Category | Examples |
|---|---|
| Identity | Name, email |
| Authentication | Hashed password (never plaintext), session identifier |
| Activity | Audit-log entries (action, timestamp, resource) for security and operational accountability |

### 2.4 Special-category data

WinterVell is **not** designed to process special-category personal data (health, racial/ethnic origin, religious beliefs, biometric data, sexual orientation, etc.). If the Agency's prospect or client data incidentally includes such data, the Agency is responsible for establishing a lawful basis and appropriate safeguards, and should contact its privacy advisor before processing that data through WinterVell.

---

## 3. Purposes and legal bases

| Purpose | Data | Legal basis (GDPR wording; adapt for other regimes) |
|---|---|---|
| Conduct and deliver website audits, reports, proposals, and roadmaps to prospects | Prospect identity/contact/professional data; website URL submitted for audit | Legitimate interests of the Agency in pursuing a business relationship, provided the prospect's reasonable expectations and rights are respected. Where the prospect has requested the audit, the basis is performance of a contract / steps prior to a contract. |
| Communicate with prospects about the audit, proposal, or follow-up | Prospect email/phone | Legitimate interests, or consent where required by local law (e.g., for marketing email/SMS) |
| Understand whether a shared report was viewed | Report viewer engagement data | Legitimate interests (sales follow-up), with a clear opt-out path |
| Operate, secure, and audit the Agency's deployment of WinterVell | Account user identity, audit-log entries | Legitimate interests (security, fraud prevention, accountability) |
| Provide AI-assisted summaries and recommendations | Prospect website URL and audit findings (sent to a configured AI provider) | Legitimate interests, subject to the Licensee's configuration and the provider's terms. The Agency must confirm the provider's data-handling terms permit this. |

Where the Agency relies on consent for any purpose, consent is captured before processing, is as granular as practical, and can be withdrawn at any time.

---

## 4. Retention

| Data type | Default retention | Configurable? |
|---|---|---|
| Prospect records | Until the prospect relationship ends or a statutory limitation period expires, then deleted or anonymized | Yes — Agency policy |
| Audit findings and reports | For the duration of the prospect relationship + [N] years | Yes |
| Report viewer engagement data | [N] days after the share link expires or is revoked | Yes — share-link expiry is configurable |
| Account user activity logs | [N] days | Yes |
| Backups | [N] days (rolling) | Yes — see [`DATA_PROCESSING_OVERVIEW.md`](DATA_PROCESSING_OVERVIEW.md) |

The Agency reviews retention settings during deployment and at least annually thereafter. WinterVell provides deletion controls — see Section 6.

---

## 5. Sharing and sub-processors

The Agency shares personal data only as described in this notice and only with the following categories of recipient:

| Recipient | Purpose | Data shared |
|---|---|---|
| Hosting infrastructure provider | Hosting the Authorized Deployment | All deployment data |
| Database provider | Storing deployment data | All deployment data |
| Object storage provider | Storing screenshots and PDFs | Audit screenshots and generated PDFs |
| Email provider | Sending audit share links, proposal emails, follow-up | Prospect email and the message content |
| Configured AI provider | Generating summaries, explanations, recommendations | Audit findings, website URL, and the prompt; **never** the API key (which remains server-side) |
| Bug-tracking and error-monitoring tools | Diagnosing platform errors | Redacted error data; **no** prospect personal data is sent to error monitoring |

A current list of named sub-processors for the Agency's deployment is maintained at [URL] and is reviewed at least annually. Sub-processor changes are notified in advance where required by applicable law.

> **WinterVell does not bundle third-party analytics, advertising pixels, or session-replay tools.** No personal data is shared with advertising networks.

---

## 6. International transfers

Personal data may be transferred outside the country in which the data subject is located when a sub-processor (hosting, storage, AI provider) operates in another jurisdiction. Where this involves a transfer out of the European Economic Area, the Agency relies on appropriate safeguards such as Standard Contractual Clauses, the EU-US Data Privacy Framework (where the recipient is certified), or another lawful transfer mechanism. A list of sub-processor locations is maintained at [URL].

---

## 7. Data subject rights

Where applicable law grants data subjects rights over their personal data, the Agency honours the following rights (subject to verification of identity and lawful exemptions):

- Access — receive a copy of the personal data we hold
- Rectification — correct inaccurate personal data
- Erasure — request deletion, subject to lawful retention obligations
- Restriction — request that processing be limited
- Portability — receive personal data in a structured, machine-readable format
- Objection — object to processing based on legitimate interests
- Withdraw consent — where processing relied on consent
- Lodge a complaint with the relevant supervisory authority

Requests can be submitted to [EMAIL]. The Agency responds within the timeframe required by applicable law (typically one month).

---

## 8. Security

The Agency deploys WinterVell with the security posture described in [`SECURITY_DISCLOSURE.md`](SECURITY_DISCLOSURE.md), including:

- Authentication via NextAuth.js with hashed passwords (bcrypt-equivalent)
- Role-based authorization
- Organisation-scoped tenant isolation
- Server-Side Request Forgery (SSRF) protection on all user-provided URLs
- Encrypted transport (HTTPS) and at-rest encryption where supported by the hosting provider
- Audit logging of administrative actions

The Agency does **not** represent that the deployment is perfectly secure or that security measures eliminate all risk. Security is a continuing operational responsibility.

---

## 9. Children's privacy

WinterVell is a B2B tool intended for use by agencies and their business prospects. It is **not** directed to children and the Agency does not knowingly collect personal data from children. If the Agency becomes aware that it has collected personal data from a child, it deletes that data promptly.

---

## 10. Cookies and similar technologies

WinterVell uses cookies and similar technologies only for:

- Authentication session management (essential)
- CSRF protection (essential)
- Theme preference (optional, on-device)
- Locale preference (optional, on-device)

WinterVell does **not** use cookies for advertising, cross-site tracking, or third-party analytics. Where applicable law requires consent for non-essential cookies, the Agency configures a consent banner before deployment.

---

## 11. Changes to this notice

The Agency may update this notice. Material changes are communicated to affected individuals where required by applicable law, and the effective date above is updated.

---

## 12. Contact

For questions about this notice, data subject requests, or privacy concerns:

- **Contact:** [NAME / EMAIL]
- **Postal address:** [ADDRESS]
- **Data Protection Officer:** [NAME / EMAIL], where applicable

For WinterVell's own processing in connection with a Hosted Licence, contact the Licensor at the address in [`SUPPORT.md`](../../SUPPORT.md) and review the data-processing agreement.

---

*This template is part of the WinterVell legal package. It is **not legal advice**. The Licensee must have this notice reviewed by a qualified lawyer and tailored to its jurisdiction, business, and configuration before publication.*
