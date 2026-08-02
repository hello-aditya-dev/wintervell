# Custom Domain Setup

WinterVell supports per-agency custom domains for white-labelled client-facing surfaces (reports, proposals). This guide describes the CNAME, SSL, DNS verification, and per-agency domain configuration.

It is paired with [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md) and [`vercel-deployment.md`](vercel-deployment.md).

---

## Overview

Each agency may configure one or more custom domains for client-facing surfaces:

| Surface | Typical domain | Example |
|---|---|---|
| Report share links | `reports.<agency>.com` | `reports.northstar.com` |
| Proposal viewer | `proposals.<agency>.com` (or shared with reports) | `proposals.northstar.com` |
| Administrative area (optional) | `app.<agency>.com` | `app.northstar.com` |

The administrative area can remain on a WinterVell-hosted domain (e.g. `app.wintervell-hosted.example`) or move to the agency's own domain. The client-facing surfaces should always be on the agency's domain for full white-labelling.

---

## DNS configuration

### CNAME to Vercel (Vercel-hosted deployments)

For Vercel deployments, add a CNAME record at the agency's DNS provider:

| Type | Name | Value |
|---|---|---|
| CNAME | `reports` | `cname.vercel-dns.com` |

Vercel provisions a TLS certificate automatically once the CNAME resolves and the domain is added to the Vercel project.

### CNAME to a self-hosted reverse proxy (self-hosted deployments)

For self-hosted deployments, add a CNAME record pointing to the reverse proxy's hostname:

| Type | Name | Value |
|---|---|---|
| CNAME | `reports` | `proxy.your-hosting.com` |

The reverse proxy (Caddy, Nginx, Cloudflare) terminates TLS for the custom domain and forwards to the WinterVell web app.

### Wildcard CNAME (for per-agency subdomains on a shared domain)

If you host multiple agencies on a shared platform domain (e.g. `<agency>.reports.your-platform.com`), use a wildcard CNAME:

| Type | Name | Value |
|---|---|---|
| CNAME | `*.reports` | `cname.vercel-dns.com` |

Each agency gets a subdomain; no per-agency DNS configuration is needed. This is the platform-managed approach (suitable for the Hosted tier).

For agencies that want their own domain (e.g. `reports.northstar.com`), per-agency DNS configuration is required.

---

## SSL / TLS

### Vercel-managed (Vercel deployments)

Vercel provisions and renews TLS certificates automatically. No manual SSL configuration is required.

### Let's Encrypt (self-hosted with Caddy)

Caddy provisions and renews Let's Encrypt certificates automatically. Configure:

```caddy
reports.northstar.com {
  reverse_proxy localhost:3000
  # TLS is automatic
}
```

### Let's Encrypt (self-hosted with Nginx)

Use `certbot` to provision and renew certificates. Configure Nginx to use the certificate and to renew via `certbot renew` in a cron job.

### Managed certificates (Cloudflare, AWS ACM)

For deployments behind Cloudflare or AWS ALB, use the provider's managed certificates. The custom domain is added to the provider's console; the provider provisions the certificate.

---

## DNS verification

When an agency configures a custom domain in WinterVell, the domain must be verified before it is activated. Verification:

1. The Administrator enters the custom domain in the admin area (Settings → Branding → Custom domain).
2. WinterVell generates a verification token (e.g. `wv-verify-abc123`).
3. The Administrator adds a TXT record at their DNS provider:

| Type | Name | Value |
|---|---|---|
| TXT | `_wintervell.reports` | `wv-verify-abc123` |

4. WinterVell polls for the TXT record. Once found, the domain is verified.
5. The Administrator adds the CNAME (per above).
6. WinterVell polls for the CNAME. Once the CNAME resolves and TLS is provisioned, the domain is activated.

A domain that is verified but not activated (CNAME missing or TLS not provisioned) shows a "pending activation" state in the admin area. The domain is not used for share links until activation.

---

## Per-agency custom domain for white-labelled reports

Once a custom domain is verified and activated for an agency:

- Report share links are generated with the custom domain: `https://reports.<agency>.com/r/<token>`.
- Proposal viewer URLs use the custom domain: `https://reports.<agency>.com/p/<token>`.
- The report reader and proposal viewer are served with the agency's branding (logo, colours, fonts, sender identity).
- No WinterVell branding is visible to the prospect.

Each agency's custom domain is isolated: agency A's custom domain serves only agency A's reports; agency B's custom domain serves only agency B's reports. The domain-to-organisation mapping is enforced server-side on every request.

---

## Routing in the WinterVell app

The WinterVell web app routes requests based on the `Host` header:

- Requests to `app.<deployment-domain>` (or the WinterVell-hosted admin domain) → administrative area.
- Requests to a verified custom domain → report reader / proposal viewer (white-labelled).
- Requests to a verified custom domain for a path that is not a report or proposal → 404 (the custom domain serves only client-facing surfaces, not the admin area).

The routing is enforced in Next.js middleware. A request to a custom domain for an admin path returns 404, preventing the admin area from being exposed on a white-labelled domain.

---

## Multi-domain considerations

- Each custom domain is a separate TLS certificate. Vercel and most reverse proxies handle this transparently.
- Rate limits are per-domain (a flood of requests to one custom domain does not exhaust the rate limit for another).
- Object storage signed URLs use the storage bucket's domain, not the custom domain. This is by design: the storage bucket is not white-labelled; only the report reader and proposal viewer are.
- Email sender domain is separate from the custom domain. The agency configures both: the custom domain for share links, the sender domain for email (with SPF/DKIM/DMARC).

---

## Troubleshooting

### DNS not propagating

DNS changes can take minutes to hours to propagate. Use `dig` or `nslookup` to check:

```bash
dig reports.<agency>.com
nslookup -type=TXT _wintervell.reports.<agency>.com
```

If the records are not visible after 1 hour, check the DNS provider's settings.

### TLS not provisioning

- Vercel: check the Vercel dashboard for the domain's status. Vercel provisions TLS within minutes of the CNAME resolving.
- Let's Encrypt (Caddy): check Caddy's logs for the ACME challenge.
- Let's Encrypt (Nginx + certbot): run `certbot certificates` to see status.

### Share link 404

If a share link returns 404:

- Check the share link's domain matches a verified, activated custom domain for the agency.
- Check the share link's token is valid (not revoked, not expired, view count under cap).
- Check the routing in Next.js middleware (a misconfigured middleware can 404 valid share links).

### Wrong branding

If the report reader shows the wrong branding:

- Check the `Host` header routing: the request must reach the web app with the correct `Host`.
- Check the domain-to-organisation mapping: a domain must map to exactly one organisation.
- Check the organisation's branding record: the branding must be saved and active.

---

## Related documents

- [`../product/white-labelling-guide.md`](../product/white-labelling-guide.md) — white-labelling
- [`vercel-deployment.md`](vercel-deployment.md) — Vercel deployment
- [`production-deployment.md`](production-deployment.md) — production deployment
- [`../architecture/report-rendering.md`](../architecture/report-rendering.md) — report rendering
- [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) — tenant scoping (domain-to-organisation mapping)
- [`environment-variables.md`](environment-variables.md) — env var reference
