# Product Claims Register

Every public claim about WinterVell is documented here with its current status, evidence, and required action.

| Claim | Status | Evidence | Publicly visible | Route | Required action |
|-------|--------|----------|-----------------|-------|----------------|
| Interactive frontend demonstration | availableNow | Live at /app | Yes | /app | Maintain |
| Prospect management interface | availableNow | Demo at /app/prospects | Yes | /app/prospects | Maintain |
| Audit workflow interface | availableNow | Demo at /app/audits | Yes | /app/audits | Maintain |
| Finding review workspace | availableNow | Demo at /app/audits/[id] | Yes | /app/audits/[id] | Maintain |
| Report builder interface | availableNow | Demo at /app/reports/[id] | Yes | /app/reports/[id] | Maintain |
| Proposal builder interface | availableNow | Demo at /app/proposals/[id] | Yes | /app/proposals/[id] | Maintain |
| Pipeline kanban interface | availableNow | Demo at /app/pipeline | Yes | /app/pipeline | Maintain |
| White-label branding settings | availableNow | Demo at /app/settings/branding | Yes | /app/settings/branding | Maintain |
| Service catalogue | availableNow | Demo at /app/services | Yes | /app/services | Maintain |
| Task management | availableNow | Demo at /app/tasks | Yes | /app/tasks | Maintain |
| Deterministic demo data | frontendDemo | Demo store at src/demo/ | Yes | /app | Maintain |
| Simulated audit creation | frontendDemo | Audit wizard at /app/audits/new | Yes | /app/audits/new | Label as demo |
| Simulated finding review | frontendDemo | Finding actions at /app/audits/[id] | Yes | /app/audits/[id] | Label as demo |
| Simulated report publishing | frontendDemo | Report builder at /app/reports/[id] | Yes | /app/reports/[id] | Label as demo |
| Simulated pipeline movement | frontendDemo | Pipeline at /app/pipeline | Yes | /app/pipeline | Label as demo |
| Backend API implementation | inDevelopment | Not yet available | No | N/A | Implement |
| Database architecture | inDevelopment | Prisma schema planned | No | N/A | Implement |
| Authentication service | inDevelopment | NextAuth.js planned | No | N/A | Implement |
| Real audit crawler | inDevelopment | Not yet available | No | N/A | Implement |
| PDF rendering | inDevelopment | Not yet available | No | N/A | Implement |
| Production PostgreSQL architecture | planned | Not yet implemented | No | N/A | Implement before claiming |
| Completed authentication | planned | Not yet implemented | No | N/A | Implement before claiming |
| Completed tenant isolation | planned | Not yet implemented | No | N/A | Implement before claiming |
| Real audit workers | planned | Not yet implemented | No | N/A | Implement before claiming |
| SSRF protection | planned | Not yet implemented | No | N/A | Implement before claiming |
| AI-provider abstraction | planned | Not yet implemented | No | N/A | Implement before claiming |
| E2E test suites | planned | Not yet implemented | No | N/A | Implement before claiming |
| CI/CD pipeline | planned | Not yet implemented | No | N/A | Implement before claiming |
| Real report analytics | planned | Not yet implemented | No | N/A | Implement before claiming |
| Live licence validation | planned | Not yet implemented | No | N/A | Implement before claiming |
| Payment processing | planned | Not yet implemented | No | N/A | Implement before claiming |
| Email integration | planned | Not yet implemented | No | N/A | Implement before claiming |

## Removed claims

The following claims were present in the previous frontend and have been removed:

| Removed claim | Reason | Replacement |
|---------------|--------|-------------|
| "Only 10 left" founding licences | No verified purchase tracking | Removed until connected to real source of truth |
| Animated scarcity indicators | No verified purchase tracking | Removed |
| "Trusted by agencies" | No real customers | Replaced with product proof |
| Fictional testimonials | Invented customer quotes | Removed entirely |
| Star ratings | Invented ratings | Removed entirely |
| "AI-powered" as decoration | Overused | Used only where AI is specifically involved |
| Crossed-out anchor pricing | Product never sold at anchor price | "Planned founding pricing" label |
| "InStock" availability in schema | Checkout not open | Removed from structured data |
| Completed authentication | Not implemented | Listed as "planned" |
| Real audit workers | Not implemented | Listed as "in development" |
| PDF rendering | Not implemented | Listed as "in development" |
| SSRF protection | Not implemented | Listed as "planned" |
