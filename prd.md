# Bee Hive Heating & Air Conditioning — Product Requirements Document (PRD)

**Comfort You Can Count On**

**Product:** Public Website + Employee Dashboard
**Stack:** Next.js (frontend) · Node.js API · PostgreSQL
**Version:** 1.0 (Draft for review)

---

## Document Control

| Field | Detail |
|---|---|
| Document | Bee Hive Website — Product Requirements Document |
| Version | 1.0 (Draft) |
| Status | For review — pending client confirmation of open items (§13) |
| Prepared for | Bee Hive Heating & Air Conditioning (via partner) |
| Product | Two-part web application: public marketing site + private staff dashboard |
| Tech stack | Next.js, Node.js, PostgreSQL, Prisma |
| Related docs | Discovery Brief; Website Flow & Build Plan |

> This PRD builds on the approved Website Flow & Build Plan. Requirement IDs (FR-x, NFR-x) are stable references for development, QA, and change tracking. Priorities use MoSCoW: Must / Should / Could. Phases (P1–P3) map to the delivery plan in §12.

---

## 1. Overview

### 1.1 Purpose
This document defines what the Bee Hive web application must do, for whom, and to what standard. It translates the discovery brief and flow plan into engineering-ready requirements so the product can be built, tested, and accepted with a shared understanding of scope.

### 1.2 Product summary
Bee Hive is a residential HVAC company offering heating, cooling, ventilation, indoor air-quality, maintenance, repair, and installation services. The product is a single dynamic web application in two parts:

- **Public website** — explains services clearly and converts visitors into service requests.
- **Employee dashboard** — a secure, role-based system to manage customers, requests, appointments, jobs, communications, and reporting.

### 1.3 Goals & objectives
- Give Bee Hive a professional online presence that clearly presents its services.
- Make requesting a service fast and obvious — the primary conversion action.
- Centralise customer information and service history in one system.
- Organise customers (by relationship, equipment, services) to enable targeted reminders and promotions.
- Improve internal coordination — scheduling, dispatch, and job tracking.
- Track outreach and results through reporting.

### 1.4 Success metrics

| Metric | Target (initial) |
|---|---|
| Service-request form completion rate | ≥ 60% of starts submitted |
| Time from request to first response | Reduced vs. current email-only process |
| Requests captured in the system | 100% (no enquiry lost in an inbox) |
| Public site performance (mobile LCP) | ≤ 2.5s |
| Repeat/seasonal outreach sent | Enabled and measurable (Phase 3) |

> Metric targets are starting proposals — confirm with the client and adjust once a baseline is known.

---

## 2. Scope

### 2.1 In scope
- Responsive public website (all pages in the flow plan) with a service-request form.
- Secure staff dashboard with role-based access.
- Customer, request, appointment, and job management.
- Automated and manual notifications (email + SMS).
- Reporting and activity tracking.
- Content management for services, testimonials, gallery, and FAQ.

### 2.2 Out of scope (this release)
- Online payments and invoicing (future phase).
- Customer-facing self-service login/portal (only staff log in initially).
- Inventory/parts management (future phase).
- Native mobile apps (the site is responsive; no app-store build).
- Accounting or third-party field-service integrations (unless confirmed).

---

## 3. Users & Roles

### 3.1 External user
**Customer (homeowner / property manager)** — browses services and submits a service request. No login. Values clarity, trust, and a quick way to get help.

### 3.2 Internal users (staff roles)

| Role | Responsibilities | Access level |
|---|---|---|
| Owner / Admin | Full oversight; manages users, services, content, and settings. | Full |
| Manager / Dispatcher | Assigns and schedules jobs; monitors activity and reports. | Full (except user admin) |
| Office / Customer Service | Handles requests, customer records, and scheduling. | Operational |
| Field Technician | Sees assigned jobs; updates status and records work done. | Limited / assigned |

> Exact roles and number of users are to be confirmed with the client (§13). The permissions matrix is defined in §6.3.

---

## 4. Assumptions & Constraints
- **Market:** residential HVAC (North American context assumed from services such as furnaces, boilers, and dryer-vent cleaning). Confirm commercial vs. residential-only.
- **Language:** English only for this release; the codebase will be built i18n-ready.
- **Database:** PostgreSQL via Prisma ORM (default — adjustable).
- **Providers:** transactional email (e.g. Resend/SendGrid) and SMS (e.g. Twilio) — final providers to confirm, esp. by region.
- **Hosting:** Next.js frontend on Vercel; Node.js API and PostgreSQL on a managed host (e.g. Railway/Render) — to confirm.
- **Media:** image assets stored in object storage (S3-compatible, e.g. Cloudflare R2).
- **Compliance:** consent for marketing SMS/email and a privacy policy required; specifics depend on jurisdiction (confirm).

---

## 5. Architecture & Technology Stack

### 5.1 Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) + React + TypeScript; Tailwind CSS for styling |
| Backend / API | Node.js REST API (Express or NestJS), TypeScript |
| Database | PostgreSQL with Prisma ORM |
| Authentication | JWT-based sessions with role-based access control (RBAC) |
| Email | Transactional provider (Resend / SendGrid) — to confirm |
| SMS | SMS gateway (Twilio or regional provider) — to confirm |
| File / media storage | S3-compatible object storage (e.g. Cloudflare R2) |
| Hosting | Vercel (frontend) + managed Node & Postgres host — to confirm |
| Analytics | GA4 (or privacy-friendly alternative) + server-side event logging |

### 5.2 High-level architecture

**Browser (Next.js) → Node.js REST API → PostgreSQL**

- The Next.js app renders the public site (SEO-optimised, largely static/ISR) and the authenticated dashboard (client-rendered, protected routes).
- A separate Node.js API service exposes REST endpoints for data and business logic, enforcing authentication and RBAC on every request.
- The API reads/writes PostgreSQL via Prisma and calls out to email/SMS and object-storage providers.
- Public form submissions hit a rate-limited public endpoint; everything else requires a valid session token.

> Next.js Route Handlers could host the API instead of a separate Node service if the client prefers a single deployable. The requirements below are independent of that choice; §13 flags it as a decision.

---

## 6. Functional Requirements

Priority = MoSCoW (Must / Should / Could). Phase = P1–P3 (see §12).

### 6.1 Public website

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-P1 | Responsive public site across all pages (Home, About, Services + category pages, Gallery, Testimonials, FAQ, Contact). | Must | P1 |
| FR-P2 | Services overview and category pages generated from a manageable service catalogue. | Must | P1 |
| FR-P3 | Service-request form: name, phone, email, address, service type, preferred date/time, message — with validation. | Must | P1 |
| FR-P4 | On submit, persist the request, send email + SMS alert to staff, and show a confirmation to the customer. | Must | P1 |
| FR-P5 | Global click-to-call, email, business hours, service-area note, and social links in header/footer. | Must | P1 |
| FR-P6 | SEO essentials: per-page metadata, Open Graph, semantic markup, sitemap.xml, robots.txt. | Must | P1 |
| FR-P7 | Gallery grid, testimonials list, and FAQ accordion. | Should | P1 |
| FR-P8 | Spam protection on the public form (captcha/honeypot + rate limiting). | Must | P1 |
| FR-P9 | Web analytics with form-conversion tracking. | Should | P1 |
| FR-P10 | Cookie consent + privacy policy page (per jurisdiction). | Could | P1 |

### 6.2 Authentication & user management

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-A1 | Secure staff login (email + password); passwords hashed (bcrypt/argon2). | Must | P2 |
| FR-A2 | Role-based access control enforced server-side for all four roles. | Must | P2 |
| FR-A3 | Admin can invite, deactivate, and set the role of staff users. | Must | P2 |
| FR-A4 | Password reset via email; session expiry and logout. | Should | P2 |
| FR-A5 | Account lockout / throttling after repeated failed logins. | Should | P2 |

### 6.3 Roles & permissions matrix

| Capability | Owner/Admin | Manager/Dispatch | Office/CS | Technician |
|---|---|---|---|---|
| View & manage customers | Full | Full | Full | View |
| Service-requests inbox | Full | Full | Full | View |
| Schedule & assign appointments | Full | Full | Full | — |
| Update job status / record work | Full | Full | Limited | Assigned |
| Communications & automation | Full | Full | Full | — |
| Reports & tracking | Full | Full | View | — |
| Manage services & content | Full | Limited | — | — |
| Manage users & settings | Full | — | — | — |

### 6.4 Dashboard — overview & requests

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-D1 | Overview screen: today's appointments, new requests, jobs in progress, alerts, and key counts. | Must | P2 |
| FR-D2 | Service-requests inbox: list, view detail, and mark status (new / actioned / archived). | Must | P2 |
| FR-D3 | Match a request to an existing customer or create a new customer from it. | Must | P2 |
| FR-D4 | Convert a request into a scheduled appointment. | Must | P2 |

### 6.5 Dashboard — customers

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-C1 | Customer CRUD with contact details and address. | Must | P2 |
| FR-C2 | Customer profile shows equipment on file and full service history. | Must | P2 |
| FR-C3 | Category tags: relationship (maintenance/repair/installation), equipment type, services received. | Must | P2 |
| FR-C4 | Search, filter, and segment customers by tag for outreach. | Should | P2 |

### 6.6 Dashboard — scheduling & jobs

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-J1 | Appointment calendar with create/edit/reschedule and technician assignment. | Must | P2 |
| FR-J2 | Job status pipeline: scheduled → en route → in progress → completed (+ cancelled). | Must | P2 |
| FR-J3 | Technicians view their assigned jobs and update status + record work done and notes. | Must | P2 |
| FR-J4 | Attach photos/notes to a completed job. | Should | P3 |

### 6.7 Communications & automation

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-N1 | Automated appointment confirmations (email + SMS). | Must | P3 |
| FR-N2 | Maintenance reminders based on service history / due dates. | Should | P3 |
| FR-N3 | Post-visit follow-up messages. | Should | P3 |
| FR-N4 | Targeted promotions to a selected customer segment (e.g. dryer-vent cleaning). | Should | P3 |
| FR-N5 | Manual send: staff can message a customer or segment on demand. | Could | P3 |

### 6.8 Reporting & settings

| ID | Requirement | Priority | Phase |
|---|---|---|---|
| FR-R1 | Reports: enquiries, appointments, completed jobs, outreach, and sales activity over a date range. | Must | P3 |
| FR-R2 | Export report data (CSV). | Could | P3 |
| FR-S1 | Manage service catalogue/categories used by the site and tags. | Must | P2 |
| FR-S2 | Manage business info (hours, service area, contact) shown on the site. | Should | P2 |

---

## 7. Key User Stories & Acceptance Criteria

### US-1 — Submit a service request
*As a homeowner, I want to request a service quickly so that Bee Hive can contact me.*

**Acceptance criteria:**
- All required fields validated; clear inline errors on invalid input.
- On success the customer sees a confirmation message/screen.
- A record is persisted and an email + SMS alert reaches staff within seconds.
- Spam submissions are blocked (captcha/honeypot + rate limit).

### US-2 — Turn a request into a booked visit
*As office staff, I want to convert a request into a scheduled appointment so the visit is planned and assigned.*

**Acceptance criteria:**
- The request can be linked to an existing customer or a new one created from it.
- An appointment is created with date/time and an assigned technician.
- The request is marked actioned and appears in the calendar.

### US-3 — Update a job in the field
*As a technician, I want to update my assigned job's status and record what I did.*

**Acceptance criteria:**
- The technician sees only their assigned jobs.
- Status can advance through the pipeline; timestamps are recorded.
- Work notes (and photos, Phase 3) are saved to the job and the customer's history.

### US-4 — Send a seasonal maintenance reminder
*As a manager, I want to send reminders to a customer segment so we drive repeat business.*

**Acceptance criteria:**
- A segment can be selected by tag (e.g. furnace owners).
- A templated message is sent by email/SMS to that segment.
- The send is logged and counts toward outreach reporting.

---

## 8. Data Model (Core Entities)

Indicative fields — to be finalised in the schema.

| Entity | Key fields |
|---|---|
| User | id, name, email, passwordHash, role, isActive, createdAt |
| Customer | id, name, phone, email, address, tags[], createdAt, updatedAt *(has many Equipment, Appointments, Jobs)* |
| Equipment | id, customerId, type, make/model, installDate, notes |
| ServiceRequest | id, customerId?, name, phone, email, address, serviceType, preferredAt, message, status, source, createdAt |
| Appointment | id, customerId, technicianId, scheduledAt, status, notes *(from ServiceRequest?)* |
| Job | id, appointmentId, status, workDone, notes, photos[], completedAt |
| ServiceCategory | id, name, slug, description, isActive |
| Communication | id, customerId/segment, channel, template, sentAt, sentBy, status |
| Report/Activity log | id, type, entityRef, actorId, timestamp, meta |

---

## 9. API Surface (High Level)

REST endpoints, all under a versioned base path (e.g. `/api/v1`). Public endpoints are marked; all others require an authenticated session and pass RBAC checks.

| Resource | Endpoints | Access |
|---|---|---|
| Service requests | `POST /service-requests` (public); `GET`, `PATCH /service-requests` | Public create; staff read/update |
| Auth | `POST /auth/login`, `/auth/logout`, `/auth/reset` | Public |
| Users | `GET, POST, PATCH, DELETE /users` | Admin |
| Customers | `GET, POST, PATCH /customers`; `GET /customers/:id` | Staff (role-scoped) |
| Equipment | `GET, POST, PATCH /customers/:id/equipment` | Staff |
| Appointments | `GET, POST, PATCH /appointments` | Staff |
| Jobs | `GET, PATCH /jobs`; `GET /jobs/mine` | Staff / technician |
| Communications | `POST /communications`; `GET /communications` | Manager/Office |
| Reports | `GET /reports?type=&from=&to=` | Manager/Admin |
| Content/Settings | `GET, PATCH /services`, `/settings` | Admin |

> Endpoint list is directional, to size the build — exact routes, payloads, and validation are defined during implementation.

---

## 10. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Performance:** public pages target mobile LCP ≤ 2.5s; use static/ISR and image optimisation. |
| NFR-2 | **Security:** HTTPS everywhere; hashed passwords; server-side RBAC; input validation; rate limiting on public endpoints; protection against OWASP Top 10 (XSS, SQLi, CSRF). |
| NFR-3 | **Responsive design:** fully usable on mobile, tablet, and desktop (mobile-first). |
| NFR-4 | **Accessibility:** target WCAG 2.1 AA for the public site. |
| NFR-5 | **SEO:** crawlable, fast, structured metadata; local-business schema where relevant. |
| NFR-6 | **Reliability:** automated database backups; graceful handling of email/SMS provider failures (queue + retry). |
| NFR-7 | **Scalability:** stateless API; able to scale horizontally; indexed queries for customer/job lookups. |
| NFR-8 | **Maintainability:** TypeScript throughout; linting; documented env config; seed & migration scripts. |
| NFR-9 | **Privacy & consent:** marketing messages require opt-in; unsubscribe honoured; data handling per jurisdiction. |
| NFR-10 | **Auditability:** log key actions (who changed what, when) for accountability. |

---

## 11. Notification & Automation Rules

| Trigger | Channel | Recipient / action |
|---|---|---|
| New service request | Email + SMS | Alert to staff/dispatch |
| Appointment confirmed | Email + SMS | Customer confirmation |
| Appointment reminder | SMS | Customer, before the visit |
| Job assigned | In-app / email | Assigned technician |
| Maintenance due | Email/SMS | Customer segment (Phase 3) |
| Post-visit follow-up | Email | Customer (Phase 3) |
| Targeted promotion | Email/SMS | Selected segment (Phase 3) |

> All customer-facing marketing messages are opt-in and include an unsubscribe path (NFR-9).

---

## 12. Delivery Phases & Milestones

| Phase | Theme | Includes |
|---|---|---|
| Phase 1 | Foundation & public site | Brand + all public pages, service catalogue, service-request form → email/SMS + stored record (FR-P*). |
| Phase 2 | Database & dashboard | Auth + roles, customers, requests inbox, scheduling & jobs, settings (FR-A/D/C/J/S). |
| Phase 3 | Automation & reporting | Confirmations, reminders, follow-ups, promotions, reports (FR-N/R). |
| Later | Optional add-ons | Online self-scheduling, payments/invoicing, inventory. |

---

## 13. Open Questions & Decisions Needed

- [ ] Service area and whether commercial customers are served (not just residential).
- [ ] Final logo, brand assets, and photography.
- [ ] Contact details and the destination for service-request alerts.
- [ ] Domain, hosting, and professional email — existing or to arrange?
- [ ] Confirm database (PostgreSQL) and whether a separate Node API or Next.js Route Handlers.
- [ ] SMS and email providers (region-dependent).
- [ ] Exact staff roles and number of users.
- [ ] Jurisdiction for privacy/consent (GDPR, CCPA, TCPA for SMS, etc.).
- [ ] Target launch date and any season/event driving it.

---

*Once the open items are confirmed, Phase 1 development can begin against these requirements.*
