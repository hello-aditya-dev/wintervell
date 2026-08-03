# WinterVell — Call-Centre Readiness

**Date:** 2026-08-05
**Branch:** agent/wintervell-phase-01-frontend

## Current Status

**Readiness score: 8.5%** (frontend preview only)

The call-centre demonstration provides interactive UI pages that show the planned call-centre interface. All pages render with demo data and include a demo disclaimer. No telephony, recording, or agent session infrastructure exists.

## Frontend Demonstration Capabilities

The following routes exist and render with demo data:

| Route | Description | Status |
|-------|-------------|--------|
| `/app/call-centre` | Dashboard with call volume metrics, agent status, and queue summary | Frontend preview |
| `/app/call-centre/calls` | Call list with filters (status, agent, date range) and sorting | Frontend preview |
| `/app/call-centre/calls/[id]` | Call detail with caller info, duration, notes, and recording placeholder | Frontend preview |
| `/app/call-centre/agents` | Agent list with status, current call, and availability | Frontend preview |
| `/app/call-centre/queues` | Queue management with wait times and caller positions | Frontend preview |
| `/app/call-centre/campaigns` | Campaign list with call targets, completion rates, and auto-dialler (planned) | Frontend preview |
| `/app/call-centre/supervisor` | Supervisor dashboard with real-time metrics, alerts, and agent overview | Frontend preview |

### What Works in the Demo

- All 7 routes render correctly with 200 status
- Demo disclaimer appears on every call-centre page
- Dashboard shows mock metrics (call volume, average wait time, agent count)
- Call list supports filtering and sorting (demo data only)
- Call detail shows caller information, call duration, and notes
- Agent list shows agent status and availability
- Queue management shows queue positions and wait times
- Campaign list shows campaign details; auto-dialler is labelled as planned
- Supervisor dashboard shows static metrics and alerts
- Invalid call ID (`/app/call-centre/calls/does-not-exist`) returns not-found page

### What Requires Backend

Everything beyond viewing static demo data requires backend implementation:

- Real call creation, transfer, and termination
- Real agent login, status changes, and session management
- Real queue routing and distribution
- Real campaign execution and auto-dialler
- Real supervisor monitoring and intervention
- Real call recording and playback
- Real-time metric updates via WebSocket

## The 20 Call-Centre Server Blockers

These are the server-side capabilities that must be implemented before the call-centre can be considered functional:

### Telephony Integration (6 blockers)
1. **SIP/PSTN connection** — No telephony provider integration exists
2. **Call signalling** — No WebRTC or SIP signalling implementation
3. **Call bridging** — No call transfer or conferencing capability
4. **DTMF handling** — No IVR/touch-tone processing
5. **Voicemail** — No voicemail recording or retrieval
6. **Number management** — No phone number provisioning or routing

### Recording and Storage (4 blockers)
7. **Call recording** — No audio recording mechanism
8. **Recording storage** — No object storage for call recordings
9. **Recording playback** — No streaming or download capability
10. **Recording compliance** — No consent tracking or retention policies

### Agent Session Management (4 blockers)
11. **Agent authentication** — No agent login/logout with role-based access
12. **Agent state management** — No real-time availability status (available, busy, wrap-up, offline)
13. **Agent session persistence** — No database tracking of agent sessions
14. **Agent skill routing** — No skill-based call distribution

### Queue and Routing (3 blockers)
15. **Queue engine** — No real-time queue with caller positions
16. **Routing rules** — No configurable routing (round-robin, skill-based, priority)
17. **Queue overflow handling** — No voicemail fallback or queue timeout

### Campaign and Auto-Dialler (2 blockers)
18. **Campaign execution** — No outbound call campaign engine
19. **Auto-dialler** — No predictive or progressive dialler

### Real-Time Infrastructure (1 blocker)
20. **WebSocket metrics feed** — No real-time event streaming for supervisor dashboard

## Telephony Integration Requirements

To move the call-centre beyond frontend preview, the following must be implemented:

### Minimum Viable Telephony
- SIP trunk registration with a telephony provider (e.g., Twilio, Vonage, or self-hosted Asterisk/FreeSWITCH)
- Inbound call handling with basic IVR
- Call answer, hold, transfer, and hangup
- Agent state synchronization (available → on-call → wrap-up → available)

### Recommended Architecture
- **SIP gateway**: FreeSWITCH or Asterisk for call control
- **Signalling**: WebRTC for browser-based agent softphone
- **Media**: SRTP for encrypted audio
- **Events**: WebSocket (Socket.IO) for real-time call events
- **Storage**: S3-compatible object storage for recordings
- **Database**: PostgreSQL for call metadata, agent sessions, queue state

## Recording Storage Requirements

- **Format**: WAV or Opus for call recordings
- **Storage**: S3-compatible object storage (MinIO for self-hosted)
- **Retention**: Configurable per-organisation retention policy
- **Compliance**: One-party or two-party consent tracking
- **Access**: Role-based access to recordings (supervisor, agent, compliance)
- **Encryption**: At-rest encryption for stored recordings

## Agent Session Requirements

- **Authentication**: Agent login with role assignment (agent, supervisor, admin)
- **State machine**: Available → Ringing → On-call → Wrap-up → Available
- **Persistence**: Database-backed session tracking with heartbeat
- **Softphone**: WebRTC-based softphone in the browser
- **Presence**: Real-time presence broadcast to supervisor dashboard
- **Skills**: Configurable skill tags for skill-based routing
- **Limits**: Configurable max concurrent calls per agent

## Path to Readiness Improvement

| Milestone | Expected Score | Dependencies |
|-----------|----------------|--------------|
| Backend API for call metadata | ~15% | Database schema, authentication |
| Agent session management | ~25% | Auth, state machine, WebSocket |
| Basic inbound queue | ~35% | Queue engine, routing rules |
| Call recording | ~45% | Object storage, consent tracking |
| Outbound campaigns | ~55% | Campaign engine, dialler |
| Real-time supervisor | ~65% | WebSocket events, dashboard |
| Full telephony integration | ~80% | SIP/WebRTC, IVR, transfer |
| Production hardening | ~90%+ | Load testing, failover, monitoring |
