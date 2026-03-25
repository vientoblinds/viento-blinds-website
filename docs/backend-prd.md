# Viento Blinds Backend Product Requirements Document (PRD)

## Document Control
- Product: Viento Blinds website backend
- Repository: `/Users/apple/Desktop/Projects/Viento Blinds`
- Version: 1.0
- Status: Approved for implementation
- Date: 2026-02-18
- Owners: Product + Engineering
- Deployment target: Vercel + managed services

## 1. Product Context and Goals

### 1.1 Current State
The current project is a static Next.js export deployed to GitHub Pages. It does not support server-side APIs, persistent database access, admin authentication, or dynamic content management.

### 1.2 Problem Statement
Viento needs a production-grade backend to support:
- Public lead capture (contact/quote requests)
- Admin-only blog and media management
- Security and auditability for internal operations
- Production operations standards (monitoring, recovery, release safety)

### 1.3 Goals
- Deliver a secure backend for lead-generation operations with admin-managed content.
- Enable internal team members to create, edit, schedule, publish, and archive blog posts.
- Provide media upload and lifecycle management for CMS content.
- Guarantee that all privileged admin actions are auditable.
- Establish a full production baseline for reliability, observability, and incident response.

### 1.4 Success Metrics
- Lead submission success rate: >= 99.9% monthly.
- Lead API p95 latency: <= 400 ms.
- Admin API p95 latency: <= 500 ms for non-list endpoints.
- Uptime SLO for public lead API: 99.9% monthly.
- Mean time to detect (MTTD) critical incident: <= 10 minutes.
- Mean time to recovery (MTTR) Sev-1: <= 60 minutes.

## 2. Non-Goals and Out of Scope
- Ecommerce checkout, carts, order management, payments.
- Customer accounts, customer login, customer profile management.
- Multi-tenant architecture.
- Formal compliance programs (SOC 2 / HIPAA) in v1.
- Native mobile app backend requirements.

## 3. Locked Product Decisions
- Hosting: Vercel + managed services.
- Business flow: Lead-generation only.
- Authentication: Admin-only (Supabase Auth, email/password; MFA deferred).
- Database: Postgres.
- CMS: Built-in admin CMS in Next.js.
- v1 backend scope: Leads + Blog + Media + Admin audit.
- Notifications: Email only.
- Media storage: Vercel Blob.
- Operations depth: Full production baseline.

## 4. Personas and Users
- Visitor: Public website user who submits contact/quote inquiry.
- Editor: Internal staff who manages blog posts and media.
- Super Admin: Internal staff with full administrative and security powers.
- Operator (on-call): Engineering/ops role for monitoring and incident handling.

## 5. Requirements Summary

### 5.1 Functional Requirements
- Public lead form submission API with anti-abuse protections.
- Admin authentication and session management.
- Supabase Auth admin sign-in with pre-approved emails.
- Role-based access control with two roles: `SUPER_ADMIN`, `EDITOR`.
- Blog CMS with lifecycle states: `draft`, `scheduled`, `published`, `archived`.
- Media upload and management for blog content.
- Immutable audit logging of privileged actions.
- Outbound email events for:
  - Admin notification on new lead.
  - Visitor acknowledgement after successful lead submission.

### 5.2 Non-Functional Requirements
- Security hardening, secret management, rate limits.
- High availability and rollback-safe releases.
- Observability with logs, metrics, traces, alerts.
- Backup and restore procedures with periodic drills.

## 6. System Architecture and Deployment Model

### 6.1 Target Architecture
- Frontend + backend: Next.js App Router deployed on Vercel.
- API surface: Route Handlers under `/api`.
- Data store: Managed Postgres.
- Blob storage: Vercel Blob.
- Email provider: Resend (or equivalent transactional provider).
- Auth: Supabase Auth with JWT and DB-backed profiles.
- Queue/outbox processing: DB outbox + scheduled Vercel function worker.
- Monitoring: Vercel logs + OpenTelemetry-compatible sink + error tracking.

### 6.2 Environment Topology
- `dev`: Local + optional shared dev cloud services.
- `preview`: Per-PR deployment with isolated app runtime and shared/staging data policy.
- `prod`: Production deployment with strict secret and access controls.

### 6.3 Networking and Trust Boundaries
- Public endpoints exposed through Vercel edge/network.
- Admin endpoints protected by authenticated session and RBAC checks.
- DB and Blob accessed by server runtime only.
- No direct browser access to DB.

### 6.4 Migration from Static Export
Current `next.config.mjs` uses `output: 'export'`, incompatible with server APIs. Migration steps:
1. Remove static export mode and GitHub Pages-specific base path assumptions.
2. Deploy to Vercel with server route support.
3. Introduce environment variables and secret management.
4. Progressive rollout with feature flags for admin areas.

## 7. Technology Stack Decisions
- Framework: Next.js (App Router).
- Runtime: Node.js on Vercel serverless functions.
- Language: TypeScript for all backend modules.
- DB ORM: Drizzle ORM with SQL migrations.
- Validation: Zod schemas at API boundaries.
- Auth: Supabase Auth.
- Blob: Vercel Blob.
- Email: Resend SDK.
- Logging: Structured JSON logs.
- Tracing/Metrics: OpenTelemetry instrumentation where supported.

## 8. Data Model and Persistence Design

### 8.1 Core Domain Types
- `AdminUser`
- `Role`
- `Permission`
- `BlogPost`
- `PostRevision`
- `Category`
- `Tag`
- `MediaAsset`
- `Lead`
- `LeadStatus`
- `LeadSource`
- `AuditEvent`
- `NotificationEvent`
- `OutboxMessage`

### 8.2 Canonical Enums
- `Role`: `SUPER_ADMIN`, `EDITOR`
- `LeadStatus`: `NEW`, `CONTACTED`, `QUALIFIED`, `CLOSED_WON`, `CLOSED_LOST`, `SPAM`
- `LeadSource`: `CONTACT_FORM`, `QUOTE_FORM`, `PHONE_IMPORT`, `MANUAL_ADMIN`
- `PostStatus`: `DRAFT`, `SCHEDULED`, `PUBLISHED`, `ARCHIVED`
- `OutboxStatus`: `PENDING`, `PROCESSING`, `SENT`, `FAILED`, `DEAD_LETTER`

### 8.3 Relational Schema (Decision-Complete)

#### `admin_users`
- `id` UUID PK
- `email` CITEXT UNIQUE NOT NULL
- `password_hash` TEXT NOT NULL
- `role` TEXT NOT NULL CHECK IN enum set
- `display_name` TEXT NOT NULL
- `is_active` BOOLEAN NOT NULL DEFAULT true
- `last_login_at` TIMESTAMPTZ NULL
- `failed_login_count` INT NOT NULL DEFAULT 0
- `locked_until` TIMESTAMPTZ NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
- unique index on `email`
- index on `role`, `is_active`

#### `auth_sessions`
- `id` UUID PK
- `admin_user_id` UUID FK -> `admin_users.id`
- `token_hash` TEXT UNIQUE NOT NULL
- `ip_address` INET NULL
- `user_agent` TEXT NULL
- `expires_at` TIMESTAMPTZ NOT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
- index on `admin_user_id`
- index on `expires_at`

#### `blog_posts`
- `id` UUID PK
- `slug` TEXT UNIQUE NOT NULL
- `title` TEXT NOT NULL
- `excerpt` TEXT NULL
- `body_json` JSONB NOT NULL
- `cover_media_id` UUID NULL FK -> `media_assets.id`
- `status` TEXT NOT NULL
- `scheduled_publish_at` TIMESTAMPTZ NULL
- `published_at` TIMESTAMPTZ NULL
- `archived_at` TIMESTAMPTZ NULL
- `seo_title` TEXT NULL
- `seo_description` TEXT NULL
- `canonical_url` TEXT NULL
- `meta_robots` TEXT NULL DEFAULT 'index,follow'
- `author_admin_user_id` UUID NOT NULL FK -> `admin_users.id`
- `updated_by_admin_user_id` UUID NOT NULL FK -> `admin_users.id`
- `version` INT NOT NULL DEFAULT 1
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
- unique index on `slug`
- composite index on `status`, `published_at DESC`
- GIN index on `body_json`

#### `post_revisions`
- `id` UUID PK
- `blog_post_id` UUID NOT NULL FK -> `blog_posts.id`
- `version` INT NOT NULL
- `title` TEXT NOT NULL
- `excerpt` TEXT NULL
- `body_json` JSONB NOT NULL
- `seo_title` TEXT NULL
- `seo_description` TEXT NULL
- `edited_by_admin_user_id` UUID NOT NULL FK -> `admin_users.id`
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Constraints:
- unique (`blog_post_id`, `version`)

#### `categories`
- `id` UUID PK
- `name` TEXT UNIQUE NOT NULL
- `slug` TEXT UNIQUE NOT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

#### `tags`
- `id` UUID PK
- `name` TEXT UNIQUE NOT NULL
- `slug` TEXT UNIQUE NOT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

#### `blog_post_categories`
- `blog_post_id` UUID FK
- `category_id` UUID FK
- PK (`blog_post_id`, `category_id`)

#### `blog_post_tags`
- `blog_post_id` UUID FK
- `tag_id` UUID FK
- PK (`blog_post_id`, `tag_id`)

#### `media_assets`
- `id` UUID PK
- `blob_url` TEXT NOT NULL
- `blob_key` TEXT UNIQUE NOT NULL
- `mime_type` TEXT NOT NULL
- `bytes` BIGINT NOT NULL
- `width` INT NULL
- `height` INT NULL
- `alt_text` TEXT NULL
- `uploaded_by_admin_user_id` UUID NOT NULL FK -> `admin_users.id`
- `is_deleted` BOOLEAN NOT NULL DEFAULT false
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `deleted_at` TIMESTAMPTZ NULL

Indexes:
- unique index on `blob_key`
- index on `created_at DESC`
- partial index where `is_deleted = false`

#### `leads`
- `id` UUID PK
- `source` TEXT NOT NULL
- `full_name` TEXT NOT NULL
- `email` CITEXT NOT NULL
- `phone` TEXT NULL
- `city` TEXT NULL
- `message` TEXT NOT NULL
- `product_interest` TEXT NULL
- `status` TEXT NOT NULL DEFAULT 'NEW'
- `spam_score` NUMERIC(5,2) NOT NULL DEFAULT 0
- `is_spam` BOOLEAN NOT NULL DEFAULT false
- `ip_address` INET NULL
- `user_agent` TEXT NULL
- `utm_source` TEXT NULL
- `utm_medium` TEXT NULL
- `utm_campaign` TEXT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
- index on `created_at DESC`
- composite index on `status`, `created_at DESC`
- index on `email`

#### `audit_events`
- `id` UUID PK
- `actor_admin_user_id` UUID NULL FK -> `admin_users.id`
- `actor_role` TEXT NULL
- `action` TEXT NOT NULL
- `target_type` TEXT NOT NULL
- `target_id` UUID NULL
- `request_id` TEXT NULL
- `ip_address` INET NULL
- `user_agent` TEXT NULL
- `metadata_json` JSONB NOT NULL DEFAULT '{}'
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
- index on `created_at DESC`
- composite index on `target_type`, `target_id`
- index on `actor_admin_user_id`

#### `notification_events`
- `id` UUID PK
- `event_type` TEXT NOT NULL
- `recipient` TEXT NOT NULL
- `template_id` TEXT NOT NULL
- `payload_json` JSONB NOT NULL
- `idempotency_key` TEXT UNIQUE NOT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

#### `outbox_messages`
- `id` UUID PK
- `notification_event_id` UUID NOT NULL FK -> `notification_events.id`
- `status` TEXT NOT NULL DEFAULT 'PENDING'
- `attempt_count` INT NOT NULL DEFAULT 0
- `next_attempt_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `last_error` TEXT NULL
- `provider_message_id` TEXT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
- composite index on `status`, `next_attempt_at`

### 8.4 Data Retention
- `audit_events`: retain 24 months online, archive monthly snapshots beyond 24 months.
- `leads`: retain indefinitely unless deletion required by policy request.
- `outbox_messages`: retain 12 months for diagnostics.
- Soft-delete media records, hard-delete blob objects during scheduled cleanup after 30 days.

### 8.5 Backup and Recovery
- Postgres point-in-time recovery enabled.
- Daily logical backup export retained 30 days.
- Weekly restore drill in non-prod with validation checklist.
- RPO target: <= 15 minutes.
- RTO target: <= 60 minutes.

## 9. Authentication, Authorization, and Security Controls

### 9.1 Authentication Model
- Supabase Auth for admin auth with:
  - Primary login: Email and Password.
- No public user authentication in v1.
- Password hash algorithm: Argon2id.
- Session type: server-managed session with signed httpOnly cookie.
- Access control gate: only pre-approved admin emails and/or approved company domain are allowed to authenticate.
- Break-glass accounts: maximum 2 `SUPER_ADMIN` local-password accounts, rotated quarterly.

### 9.2 Password and Lockout Policy
- Minimum 12 characters.
- Require at least 3 of: upper/lower/number/symbol.
- Block known-compromised passwords.
- Lock account for 15 minutes after 5 failed attempts in rolling 15-minute window.
- Password policy applies only to backup email/password admin accounts.

### 9.3 Session Security
- `Secure`, `HttpOnly`, `SameSite=Lax` cookies.
- Session expiry: 12 hours absolute, 2 hours idle timeout.
- Rotate session on login and privilege changes.
- Revoke all sessions on password reset.
- Revoke all sessions when admin is removed from allowlist or deactivated.

### Admin Access Policy
- Admins are pre-created in Supabase Auth by a Super Admin.
- Only pre-approved emails added to the `admin_users` table with a linked Auth UID can log in.
- First-login behavior:
  - User signs in via Supabase Auth email/password.
  - If email is not in `admin_users` allowlist, reject with `403` and create an audit event.

### 9.4 Authorization (RBAC)

Permission matrix:
- `SUPER_ADMIN`
  - Full access: admin users, roles, leads, blog, media, audit logs, system settings.
- `EDITOR`
  - Blog CRUD, media upload/manage, read leads, update lead statuses.
  - No admin-user management, no role changes, no secret/system settings.

### 9.5 API Security
- Zod validation on all payloads and query params.
- CSRF protection for cookie-authenticated state-changing routes.
- Strict CORS allowlist (same-origin only for admin APIs).
- Per-IP and per-route rate limiting.
- Standard secure headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy).
- SQL injection mitigation via parameterized ORM queries.

### 9.6 Abuse and Fraud Controls
- Honeypot field on public forms.
- Rate limit on `POST /api/v1/leads`.
- Optional CAPTCHA feature flag for elevated abuse events.
- Spam scoring based on heuristics and keyword/velocity checks.

### 9.7 Secrets Management
- Secrets only in Vercel environment variables.
- Separate keys per environment.
- Rotation cadence: every 90 days for application keys.
- No secrets in source code or logs.

## 10. API Specification

### 10.1 Global API Standards
- Base path: `/api/v1`
- Content type: `application/json`
- Request ID header: `x-request-id` generated if absent.
- Error envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload",
    "details": [{ "field": "email", "reason": "invalid_format" }]
  }
}
```

- Success envelope for list endpoints:

```json
{
  "data": [],
  "pagination": {
    "cursor": "opaque-cursor",
    "nextCursor": "opaque-next-cursor",
    "hasMore": true
  }
}
```

### 10.2 Public Endpoints

#### `POST /api/v1/leads`
Creates a new lead.

Request body:
```json
{
  "source": "CONTACT_FORM",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1-555-000-1111",
  "city": "Austin",
  "message": "Need blackout blinds for 3 rooms",
  "productInterest": "Blackout Blinds",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "spring"
  }
}
```

Response `201`:
```json
{
  "data": {
    "leadId": "uuid",
    "status": "NEW",
    "submittedAt": "2026-02-18T10:00:00Z"
  }
}
```

Failure codes:
- `400` validation
- `429` rate limit
- `409` duplicate (same email+message hash within dedupe window)

#### `GET /api/healthz`
Liveness endpoint.

Response `200`:
```json
{ "ok": true, "time": "2026-02-18T10:00:00Z" }
```

### 10.3 Admin Endpoints
All admin endpoints require valid admin session + RBAC.

#### `GET /api/v1/admin/leads`
Query params: `status`, `q`, `cursor`, `limit` (max 50).

#### `PATCH /api/v1/admin/leads/:id`
Allowed changes: `status`, `notes`.
Creates audit event.

#### `POST /api/v1/admin/posts`
Creates draft post.

#### `GET /api/v1/admin/posts`
List posts by status, date, search.

#### `PATCH /api/v1/admin/posts/:id`
Updates post draft fields and creates revision record.

#### `POST /api/v1/admin/posts/:id/publish`
Behavior:
- If `publishAt` absent: immediate publish.
- If `publishAt` future: set `SCHEDULED`.

#### `POST /api/v1/admin/media/upload-url`
Returns short-lived upload URL/token for direct Blob upload.

#### `DELETE /api/v1/admin/media/:id`
Soft-delete media record and schedule blob deletion.

#### `GET /api/v1/admin/audit-logs`
Filter by actor, action, date range, target type.

### 10.4 Idempotency Rules
- `POST /api/v1/leads` supports optional `Idempotency-Key` header.
- Notification events always generated with deterministic idempotency key.
- Publish endpoint protects against duplicate publish actions.

## 11. Admin CMS and Media Behavior

### 11.1 Blog Lifecycle Rules
- New post starts as `DRAFT`.
- `SCHEDULED` requires future `scheduled_publish_at`.
- Scheduler transitions `SCHEDULED` -> `PUBLISHED` at publish time.
- `ARCHIVED` removes from public lists but remains retrievable in admin.

### 11.2 Slug and SEO Rules
- Slug must be globally unique and URL-safe.
- On conflict, suggest `-2`, `-3`, etc.
- SEO fields optional but strongly recommended.
- Public rendering uses canonical URL if set.

### 11.3 Revision History
- Every post update increments version and inserts into `post_revisions`.
- Admin UI shows revision timeline and actor.
- Restore operation creates a new revision rather than mutating history.

### 11.4 Media Validation Rules
- Allowed MIME: `image/jpeg`, `image/png`, `image/webp`, `image/avif`.
- Max file size: 10 MB.
- Virus scan hook point reserved for future extension.
- Require alt text before publishing post if media used as cover image.

## 12. Lead Workflow and Notification Pipeline

### 12.1 Lead State Machine
- `NEW` -> `CONTACTED` -> `QUALIFIED` -> `CLOSED_WON` or `CLOSED_LOST`
- `NEW` -> `SPAM` allowed.
- Only admins can change status.

### 12.2 Notification Events
On successful lead creation:
1. Create `notification_event` for internal admin alert email.
2. Create `notification_event` for visitor acknowledgement email.
3. Insert corresponding `outbox_messages` in `PENDING` state.

### 12.3 Outbox Worker Behavior
- Poll every minute for due `PENDING/FAILED` messages.
- Exponential backoff: 1m, 5m, 15m, 60m, 6h.
- Max attempts: 8.
- After max attempts, move to `DEAD_LETTER` and raise alert.

## 13. Observability, SLOs, and Incident Response

### 13.1 Logging
- Structured JSON logs for every request and job execution.
- Include: timestamp, level, request_id, route, actor_id, latency_ms.
- No sensitive payload logs (passwords, tokens, raw PII fields).

### 13.2 Metrics
- Request throughput, errors, latency by endpoint.
- Lead creation success/failure rates.
- Outbox queue depth and dead-letter count.
- Auth failures and account lockout count.

### 13.3 Tracing
- Trace API requests and DB calls for admin and lead endpoints.
- Correlate traces with `x-request-id`.

### 13.4 Alerts
- Lead endpoint 5xx error rate > 2% for 5 minutes.
- p95 latency > 800 ms for 10 minutes.
- Dead-letter messages > 0 in last 15 minutes.
- Failed login spikes beyond baseline.

### 13.5 Incident Runbooks
Runbooks required for:
- DB outage and failover.
- Email provider outage.
- Elevated abuse/spam attacks.
- Authentication lockout anomalies.
- Vercel deployment rollback.

## 14. CI/CD, Environments, and Release Strategy

### 14.1 CI Pipeline
- Lint + typecheck + tests required before merge.
- Migration safety check and schema drift check.
- Security scan for dependencies.

### 14.2 CD Pipeline
- Preview deployment on PR.
- Production deployment on main with protected branch controls.
- Post-deploy smoke checks:
  - `GET /api/healthz`
  - Auth flow smoke
  - Lead submit smoke (non-customer test data)

### 14.3 Release Gates
- No open Sev-1/Sev-2 issues.
- All required alerts active.
- Rollback plan verified.
- On-call owner assigned during release window.

### 14.4 Rollback Plan
- Immediate rollback to previous Vercel deployment if:
  - Public API error budget burn exceeds threshold.
  - Auth failures exceed 5x baseline for 10 minutes.
- DB migrations follow expand/contract strategy to keep rollback safe.

## 15. QA Strategy and Acceptance Criteria

### 15.1 Test Pyramid
- Unit tests: validators, domain services, permission checks.
- Integration tests: API handlers with test DB.
- End-to-end tests: critical admin and lead flows.

### 15.2 Mandatory Test Scenarios
- Auth success/failure, lockout (backup accounts), session expiration, role enforcement.
- Auth flow: allowed email success, non-allowlisted email denied, deactivated admin denied.
- Lead submission happy path and anti-spam rejection paths.
- Duplicate lead protection and idempotency behavior.
- Blog lifecycle including schedule/publish/archive.
- Slug collision handling and revision creation.
- Media upload validation and authorization.
- Audit event creation for all privileged write actions.
- Outbox retry and dead-letter transitions.
- Backup restore verification.
- CORS, CSRF, and broken access control tests.

### 15.3 UAT Acceptance Criteria
- Admin can sign in and manage blog/media without developer intervention.
- Public leads appear in admin within 5 seconds p95.
- Admin can update lead states and see corresponding audit log entries.
- Scheduled posts publish automatically at target times.
- Failed notifications are observable and recoverable.

## 16. Risks and Mitigations
- Risk: Abuse traffic floods lead endpoint.
  - Mitigation: rate limiting, honeypot, CAPTCHA feature flag, IP heuristics.
- Risk: Admin credential compromise.
  - Mitigation: Supabase Auth with password policy, lockout, session hardening, audit alerts.
- Risk: Email provider outage.
  - Mitigation: outbox retries, dead-letter monitoring, provider failover plan.
- Risk: Migration errors during production rollout.
  - Mitigation: expand/contract migrations, previews, restore rehearsals.
- Risk: Content publishing mistakes.
  - Mitigation: draft/scheduled workflow, revision history, archive fallback.

## 17. Implementation Workstreams (Sub-Agent Outputs)

### 17.1 Workstream A: Platform and Infrastructure
Deliverables:
- Final deployment architecture diagram.
- Environment variable contract (`dev`, `preview`, `prod`).
- Static-export to dynamic migration checklist.

### 17.2 Workstream B: Auth and Security
Deliverables:
- Supabase Auth integration design.
- RBAC permission matrix and middleware contract.
- Security controls checklist and secrets rotation SOP.

### 17.3 Workstream C: Data and Persistence
Deliverables:
- SQL schema and indexes.
- Migration policy and seed strategy.
- Backup/restore runbook.

### 17.4 Workstream D: CMS and Admin APIs
Deliverables:
- API contract spec and validation schema catalog.
- Blog lifecycle behavior specification.
- Media upload lifecycle specification.

### 17.5 Workstream E: Leads and Notifications
Deliverables:
- Lead intake and state workflow spec.
- Email template and event mapping.
- Outbox processing and retry policy.

### 17.6 Workstream F: Observability and Operations
Deliverables:
- SLO and alert catalog.
- Incident playbook set.
- Release and rollback checklist.

## 18. Phased Rollout Plan
1. Phase 0: Platform migration from static export to Vercel dynamic runtime.
2. Phase 1: Auth + RBAC + admin bootstrap + audit foundation.
3. Phase 2: Lead APIs + admin leads dashboard APIs + notifications.
4. Phase 3: Blog CMS APIs + media APIs + scheduling worker.
5. Phase 4: Observability hardening + load/security testing.
6. Phase 5: Production launch with staged monitoring and rollback readiness.

## 19. Detailed Assumptions and Defaults
- Region: US-first deployment.
- Time zone handling: store and process in UTC; display local time in admin UI.
- API versioning starts at `/api/v1` and follows additive-change policy.
- RPO: 15 minutes; RTO: 60 minutes.
- SLO error budget: 43.2 minutes downtime/month for 99.9% target.
- MFA is deferred from v1 but architecture must allow future TOTP/WebAuthn.
- Admin identity relies on pre-provisioned Supabase Auth users.

## 20. Open Items Deferred to Future Versions
- Customer account system.
- Ecommerce checkout and payment gateway.
- Advanced compliance controls (formal audit evidence automation).
- Multi-language CMS and localization workflows.
- Multi-brand or multi-tenant support.

## 21. Approval Criteria for Engineering Start
Implementation may begin when:
- Product owner confirms this PRD as baseline.
- Engineering signs off stack decisions and runbooks.
- Dev and preview infrastructure are provisioned.
- Initial schema and API scaffolding tasks are created from this document.
