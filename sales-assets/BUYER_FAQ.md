# Buyer FAQ

> Frequently asked questions from prospective WinterVell buyers. Answers
> are plain-language summaries; the authoritative text is the
> [`LICENSE`](../LICENSE) (WinterVell Commercial Source License, WV-CSL
> v1.0) and the [`COMMERCIAL_LICENSE.md`](../docs/legal/COMMERCIAL_LICENSE.md).

---

### 1. Is WinterVell open source?

No. WinterVell is proprietary commercial software governed by the
WinterVell Commercial Source License (WV-CSL) v1.0. You may operate,
modify (where your tier permits), and white-label the product for your
own agency business, but you may not redistribute, resell, or publicly
publish the source.

### 2. Can I resell the source code?

No. Redistribution and resale of the source code are prohibited under
every tier. Listing the source on a code marketplace (CodeCanyon,
Gumroad source sale, AppSumo code deal, etc.) is also prohibited without
a separate written agreement.

### 3. Can I white-label client-facing reports and proposals?

Yes, on every tier. Client-facing reports, proposals, shared URLs, and
sender identity may carry your agency brand alone. The admin-area
attribution rules differ by tier — see
[`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md).

### 4. Can I modify the source code?

Agency Source and Studio licensees may modify the source for internal
use (and, on Studio, for controlled client deployments with written
authorization). Hosted-tier customers do not receive source and
therefore cannot modify it.

### 5. Can I charge my clients for audits, reports, and services?

Yes, on every tier. Charging your own clients for audits, reports,
proposals, and follow-on services is expressly permitted.

### 6. Do you train AI models on my data?

No. WinterVell does not train AI models on your prospect, audit, or
client data. When you connect an AI provider, calls are made directly
between your deployment and that provider under your own key, and
WinterVell logs only token and cost metadata for your own usage
accounting.

### 7. What about GDPR, CCPA, and DPDP compliance?

WinterVell provides tools and templates (data-subject-request
workflows, retention controls, audit logging, privacy-conscious report
analytics) but the product is not, by itself, a compliance certification.
Your obligations as a data controller depend on your jurisdiction and
your clients' jurisdictions. Legal documents in
[`docs/legal/`](../docs/legal/) are templates and should be reviewed by
a qualified lawyer.

### 8. Is WinterVell accessibility-certified (WCAG, VPAT)?

No. WinterVell performs automated accessibility checks against WCAG 2.2
AA success criteria. Automated checks are indicative, not a substitute
for a manual WCAG audit or a VPAT. Findings are clearly labelled as
automated and indicative.

### 9. Does WinterVell guarantee SEO or AI-visibility ranking improvements?

No. WinterVell identifies issues and recommends actions; ranking
outcomes depend on many factors outside any audit tool's control,
including search-engine algorithm changes, competitor activity, and
content strategy. No ranking improvement is guaranteed.

### 10. What is the demonstration organization?

Northstar Digital is a fictional demonstration organization with five
fictional prospects (a local healthcare provider, a B2B software
company, a property developer, an ecommerce retailer, and a
professional-services company). Every demo item is clearly labelled as
fictional. The product never implies that a real audit ran, a real
payment occurred, or a real integration is live when it is not.

### 11. What deployment options are supported?

Vercel is the recommended deployment platform (as a separate project
from Cloudsun). Any Node.js-capable host that supports Next.js 16
standalone build output also works. The audit worker should run on a
separately scalable, network-segmented host.

### 12. What happens if the licence server is down?

WinterVell's licence validation fails gracefully. If the licence server
is unreachable, the product continues to operate for a default 14-day
offline grace period (configurable). The product never deletes customer
data as a licence-enforcement mechanism, and never locks access without
an actionable notice. After the grace period, read access and data
export remain available.

### 13. Does licence validation transmit my client data?

No. Licence validation transmits only a licence identifier, a
deployment fingerprint, and a check timestamp. No prospect data, audit
content, or report content is ever transmitted.

### 14. Can I run multiple agency brands on one deployment?

Only on the Studio tier, which supports multiple agency brands and up
to five production deployments. Agency Source is scoped to one legal
business and one production deployment.

### 15. Can I sublicense the software to my clients?

Only on the Studio tier, and only with separate written authorization
from the Licensor. Sublicensing without written authorization is
prohibited on every tier.

### 16. What is the upgrade path between tiers?

Licensees may upgrade between tiers by paying the difference in fees
current at the time of upgrade. Downgrades take effect at the end of the
current paid term and do not entitle the licensee to a refund of the
difference.

### 17. Is there a trial?

The Licensor may offer a time-limited trial of the Hosted tier, governed
by the same WV-CSL and commercial reference. Trials expire automatically
at the end of the trial period; trial data may be deleted after a short
post-expiry retention window unless the licensee converts to a paid
licence.

### 18. What is "fair use" for unlimited client reports?

"Unlimited client reports" means reports generated for your own
legitimate agency clients and prospects — not resold as a standalone
report-generation service, not used to operate a competing audit SaaS,
and not generated in volumes that indicate abuse. As a guideline, more
than 1,000 reports per month per authorized deployment warrants a
conversation about a Studio Licence or a custom arrangement.

### 19. What is the difference between client-facing white-labelling and admin-area white-labelling?

Client-facing white-labelling (reports, proposals, shared URLs, sender
identity) is available on every tier. Admin-area white-labelling
(removal of WinterVell attribution from the administrative interface)
is configurable on Agency Source and full on Studio; it is not
available on Hosted.

### 20. What is the security posture, given WinterVell accepts arbitrary URLs?

WinterVell treats user-provided URLs as untrusted input. SSRF prevention
is mandatory: the audit worker rejects localhost, private ranges,
link-local addresses, cloud-metadata endpoints, non-HTTP protocols, and
cross-protocol redirects to internal hosts. The full security model is
in [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md) and
[`docs/legal/SECURITY_DISCLOSURE.md`](../docs/legal/SECURITY_DISCLOSURE.md).

### 21. Are integrations (AI, email, storage) production-ready?

Real AI providers, SMTP/email providers, and S3-compatible object
storage are supported in production. Integrations that are mocked are
clearly labelled as such in the UI and in the documentation. The
product never implies a production integration is operational when it is
mocked.

### 22. Where do I report a security vulnerability?

Privately, via the channel in [`SECURITY.md`](../SECURITY.md). Do not
open a public issue for security reports. The security policy includes
response SLAs, safe-harbour terms, and public-disclosure timing.

### 23. What is the release status?

v0.1.0 is the foundation release: repository, WV-CSL licence,
provenance, conversion audit, full legal suite, product/architecture/
operations/setup documentation, sales package, central product
configuration, environment template, and CI workflow are complete. The
full eighteen-module product implementation is in progress per
[`ROADMAP.md`](../ROADMAP.md).

### 24. How do I get support?

See [`SUPPORT.md`](../SUPPORT.md) for support tiers, response times,
bug-reporting, feature-request, and commercial/licence enquiry channels.

### 25. Where do I find the full legal documentation?

In [`docs/legal/`](../docs/legal/): provenance, commercial licence
reference, EULA template, security disclosure, IP-assignment checklist,
sale due-diligence checklist, and third-party notices. All legal
documents are templates and should be reviewed by a qualified lawyer
before commercial distribution.

---

## Related documents

- [`LICENSE_COMPARISON.md`](LICENSE_COMPARISON.md) — tier comparison.
- [`SECURITY_OVERVIEW.md`](SECURITY_OVERVIEW.md) — security summary.
- [`PRODUCT_LIMITATIONS.md`](PRODUCT_LIMITATIONS.md) — honest limitations.
- [`BUYER_DUE_DILIGENCE_SUMMARY.md`](BUYER_DUE_DILIGENCE_SUMMARY.md) — due-diligence summary.
