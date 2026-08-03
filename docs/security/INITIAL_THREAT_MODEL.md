# WinterVell — Initial Threat Model

**Date:** 2025-08-03
**Branch:** agent/wintervell-phase-00-baseline

## Scope

This document provides an initial threat model for the WinterVell application. It identifies the most significant security risks based on the current architecture and the planned product capabilities.

## System Boundaries

### Trust Boundaries

1. **Public internet** → **Next.js application** (Vercel deployment)
2. **Next.js application** → **PostgreSQL database** (future)
3. **Next.js application** → **Worker process** (future)
4. **Worker process** → **External websites** (audit crawling)
5. **Next.js application** → **AI provider APIs** (future)
6. **Next.js application** → **Storage service** (S3, future)
7. **Next.js application** → **Email service** (future)
8. **Next.js application** → **Checkout provider** (future)

### Assets

| Asset | Classification | Current Protection |
|---|---|---|
| User credentials | Critical | None — no auth exists |
| Organisation data | Critical | None — no tenant isolation |
| Audit findings | Confidential | None — no access control |
| Client reports | Confidential | None — no access control |
| AI provider keys | Critical | None — no encryption |
| Checkout webhooks | Critical | None — no verification |
| Contact form data | Low | None — no persistence |
| Demo data | None | Public |

## Threat Categories

### 1. Authentication Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| No authentication | Critical | No auth exists | Implement NextAuth.js with secure session management |
| Credential stuffing | High | No auth exists | Rate limiting, account lockout |
| Session hijacking | High | No sessions exist | Secure cookie settings, CSRF protection |
| Password compromise | High | No passwords exist | Bcrypt/Argon2 hashing, password policies |

### 2. Authorization Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| No authorization | Critical | No RBAC exists | Implement server-side permission checks |
| IDOR (Insecure Direct Object Reference) | Critical | No access control | Organisation-scoped queries, server-side validation |
| Cross-tenant access | Critical | No tenant isolation | Tenant-scoped database queries, middleware |
| Privilege escalation | High | No roles exist | Role-based access control, server-side enforcement |

### 3. Input Validation Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| XSS (Cross-Site Scripting) | High | No sanitization | React auto-escaping, CSP headers, input sanitization |
| SQL injection | Medium | Prisma parameterized queries | Prisma provides protection, validate input with Zod |
| CSV injection | Medium | No CSV import exists | Sanitize CSV data, validate cell content |
| SSRF (Server-Side Request Forgery) | Critical | No crawl engine exists | DNS resolution validation, private IP blocking, redirect validation |

### 4. Data Protection Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| Data breach | Critical | No access control | Encryption at rest, TLS in transit, access control |
| Data loss | High | No backups | Backup strategy, point-in-time recovery |
| Secret exposure | Critical | No secret management | Environment variables, encrypted storage, no client-side secrets |
| Audit log tampering | High | No audit logs | Immutable audit logs, append-only storage |

### 5. Availability Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| DDoS | Medium | Vercel provides basic protection | Rate limiting, CDN |
| Resource exhaustion | High | No rate limiting | Rate limiting, request size limits |
| Crawl abuse | High | No crawl engine exists | Concurrency limits, page limits, timeout limits |
| Worker queue overflow | Medium | No worker exists | Queue depth limits, backpressure |

### 6. Supply Chain Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| Dependency vulnerabilities | Medium | No scanning | Dependabot, Trivy, npm audit |
| License incompatibility | Medium | No review | License audit, SBOM |
| Unmaintained dependencies | Low | No monitoring | Regular updates, dependency review |
| z-ai-web-dev-sdk in production | Medium | Installed as dependency | Remove from production, use only in development |

### 7. Privacy Threats

| Threat | Risk | Current Status | Mitigation |
|---|---|---|---|
| Personal data exposure | High | No data protection | Data classification, access control, encryption |
| Unnecessary data collection | Medium | No data collection | Minimal data collection, retention policies |
| Cookie consent | Low | No tracking cookies | No non-essential cookies needed currently |

## Critical Risks (Must Address Before Any Real Functionality)

1. **SSRF protection** — The audit engine will make HTTP requests to user-provided URLs. This is the highest-risk feature and must be protected from the start.
2. **Authentication** — No real functionality can be safely deployed without authentication.
3. **Tenant isolation** — No multi-tenant data can be stored without organization-scoped access.
4. **Secret management** — AI provider keys and checkout credentials must be encrypted and never exposed to the client.

## Security Requirements by Phase

| Phase | Security Requirements |
|---|---|
| Phase 0 (Current) | Document threats, remove misleading claims |
| Phase 1 | No additional security (frontend only) |
| Phase 2 | Database encryption, connection security |
| Phase 3 | Authentication, authorization, tenant isolation |
| Phase 4 | CRM access control, data export security |
| Phase 5 | SSRF protection, crawl safety, DNS rebinding defense |
| Phase 6 | Evidence integrity, scoring tamper resistance |
| Phase 7 | Finding revision audit trail, access control |
| Phase 8 | Report sharing security, PDF safety, share link protection |
| Phase 9 | Proposal access control, pipeline integrity |
| Phase 10 | AI key encryption, prompt-injection resistance, output validation |
| Phase 11 | Notification security, email safety, webhook verification |
| Phase 12 | Checkout security, webhook verification, licence enforcement |
| Phase 13 | Full security review, penetration testing, SBOM |
| Phase 14 | Production security hardening, monitoring, incident response |

## Next Steps

1. Implement authentication and authorization (Phase 3)
2. Implement SSRF protection (Phase 5)
3. Implement tenant isolation (Phase 3)
4. Implement secret encryption (Phase 10)
5. Add rate limiting and security headers (Phase 13)
6. Conduct security review (Phase 13)
