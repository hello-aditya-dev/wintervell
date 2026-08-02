# Email Integration

WinterVell sends transactional email: report-share notifications, proposal-sent notifications, follow-up reminders, member invitations, password-reset, and licence-state notices. This guide describes the email provider abstraction, sender identity, templates, suppression/bounce handling, and configuration.

It is paired with [`environment-variables.md`](environment-variables.md) and [`../operations/provider-outage.md`](../operations/provider-outage.md).

---

## Provider abstraction

```ts
interface EmailProvider {
  name: "mock" | "resend" | "sendgrid" | "smtp";
  send(req: SendRequest): Promise<SendResponse>;
}
```

| Provider | Use | Notes |
|---|---|---|
| `mock` | Development and demo | Logs "sent" events to the activity feed; no email leaves the system. UI shows a "Mock email provider" banner. |
| `resend` | Production (recommended for Vercel) | Resend API. Simple, modern, good deliverability. |
| `sendgrid` | Production | SendGrid API. Mature, widely used. |
| `smtp` | Production or self-hosted | Any SMTP server. Use for self-hosted or agency-preferred providers (Postmark, Mailgun, Amazon SES via SMTP). |

A provider is selected via `EMAIL_PROVIDER`. Switching providers is a configuration change; no code changes.

---

## Sender identity

The sender identity is configured per organisation via the white-labelling system — see [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md):

| Field | Env var | Per-org override |
|---|---|---|
| Sender email address | `EMAIL_FROM` | Yes (Branding.senderEmail) |
| Sender display name | `EMAIL_FROM_NAME` | Yes (Branding.senderName) |
| Reply-to address | `EMAIL_REPLY_TO` | Yes (Branding.replyToEmail) |
| Support email | — | Yes (Branding.supportEmail) |
| Support phone | — | Yes (Branding.supportPhone) |

A white-labelled agency sends email from its own domain (e.g. `noreply@agency.com`). The prospect never sees a WinterVell address.

---

## DNS configuration

For production email, configure DNS at the sender domain:

| Record | Purpose |
|---|---|
| **SPF** (TXT) | Authorises the email provider to send on behalf of the domain. |
| **DKIM** (TXT or CNAME) | Signs outgoing email so receivers can verify authenticity. |
| **DMARC** (TXT) | Tells receivers what to do with email that fails SPF/DKIM. |
| **MX** | Routes inbound email (for replies, if `EMAIL_REPLY_TO` is at the same domain). |

Each provider's DNS records are documented by the provider. Configure them before sending production email; failing to do so causes email to land in spam.

For Resend: configure the domain in the Resend dashboard, add the SPF, DKIM, and (recommended) DMARC records, and wait for verification.

---

## Templates

WinterVell's email templates are versioned and stored in `src/email/templates/`:

```
src/email/templates/
├── report-share.tsx       # "Your website audit report is ready"
├── proposal-sent.tsx      # "Your proposal from <Agency>"
├── follow-up-reminder.tsx # "Following up on your audit"
├── member-invitation.tsx  # "You're invited to join <Agency>"
├── password-reset.tsx     # "Reset your password"
├── licence-notice.tsx     # "Licence state notice" (grace/expired)
└── _layout.tsx            # Shared layout (header, footer, branding)
```

Templates are React components rendered to HTML on the server. Each template:

- Takes a typed props object (validated with Zod).
- Pulls branding from the organisation's `Branding` record.
- Produces an HTML body and a plain-text alternative (auto-generated from the HTML).
- Includes an unsubscribe / manage-preferences link where applicable (transactional email generally does not require unsubscribe, but the agency's preference centre is linked).

A template version is recorded per email sent, so a reader can tell which template version produced which email. Changing a template creates a new version.

---

## Sending flow

1. An application event triggers an email (e.g. a report is shared).
2. The email service builds the email from the template and the branding.
3. The email is queued in an `EmailQueue` table (or sent immediately, depending on configuration).
4. The email provider's `send` method is called.
5. The result (success, failure, provider message ID) is recorded in an `EmailLog` table.
6. On success, the originating user is notified in-app.
7. On failure, the email is retried per the queue's backoff (see [`../operations/provider-outage.md`](../operations/provider-outage.md)).

---

## Suppression and bounce handling

The email service maintains a suppression list:

| Source | Action |
|---|---|
| Hard bounce (invalid address) | Add to suppression list; future sends to the address are blocked. |
| Complaint (recipient marked as spam) | Add to suppression list; future sends are blocked. |
| Manual suppression (user unsubscribed) | Add to suppression list. |
| Soft bounce (mailbox full, temporary) | Retry per the queue's backoff; do not add to suppression list. |

The suppression list is per-organisation. A suppressed address is checked before every send; a send to a suppressed address is blocked at the queue with a clear reason in the `EmailLog`.

Bounce and complaint webhooks from the provider (Resend, SendGrid) update the suppression list automatically. The webhook endpoint is at `/api/v1/internal/email-webhook` and is protected by a signature shared secret — see [`../architecture/security-model.md`](../architecture/security-model.md).

---

## Configuration

### Development (mock)

```env
EMAIL_PROVIDER=mock
EMAIL_FROM=noreply@localhost
EMAIL_FROM_NAME=WinterVell (dev)
```

No email is sent. The activity feed shows "Mock email sent to <recipient> with subject <subject>."

### Production (Resend)

```env
EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@your-domain.com
EMAIL_FROM_NAME=Your Agency
EMAIL_REPLY_TO=support@your-domain.com
RESEND_API_KEY=re_...
```

Configure DNS at `your-domain.com` per Resend's docs (SPF, DKIM, DMARC).

### Production (SendGrid)

```env
EMAIL_PROVIDER=sendgrid
EMAIL_FROM=noreply@your-domain.com
EMAIL_FROM_NAME=Your Agency
EMAIL_REPLY_TO=support@your-domain.com
SENDGRID_API_KEY=SG....
```

### Production (SMTP)

```env
EMAIL_PROVIDER=smtp
EMAIL_FROM=noreply@your-domain.com
EMAIL_FROM_NAME=Your Agency
EMAIL_REPLY_TO=support@your-domain.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
SMTP_SECURE=false  # true for port 465, false for 587 (STARTTLS)
```

---

## Testing

The mock provider is used in development and demo. For production testing:

1. Send a test email from the admin area (Settings → Integrations → Email → Send test email).
2. Verify the email arrives in the recipient's inbox (not spam).
3. Check the email's headers (in the email client's "show original" view) for SPF, DKIM, and DMARC pass.
4. If using a webhook, verify the webhook is reachable and signed correctly.

A test send that lands in spam indicates a DNS configuration issue (SPF, DKIM, or DMARC). Fix before sending production email.

---

## Privacy and logging

- Email bodies are not logged in the `EmailLog` (only subject, recipient, sender, status, and provider message ID).
- The suppression list is per-organisation; one organisation cannot see another's suppression list.
- Bounce and complaint webhooks are verified by signature; spoofed webhooks are rejected.
- Email recipients are not profiled beyond what is needed for delivery and suppression.

---

## Related documents

- [`environment-variables.md`](environment-variables.md) — env var reference
- [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md) — sender identity
- [`../operations/provider-outage.md`](../operations/provider-outage.md) — provider outage
- [`../architecture/security-model.md`](../architecture/security-model.md) — webhook verification
- [`../product/demo-mode-guide.md`](../product/demo-mode-guide.md) — mock email in demo
