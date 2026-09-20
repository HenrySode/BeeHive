# Architecture

## Overview

One dynamic web application in two parts, served from two deployable pieces:

```
Browser (customer)  ->  Next.js frontend (public site)          ->  Node.js API  ->  PostgreSQL
Browser (staff)      ->  Next.js frontend (dashboard, protected) ->  Node.js API  ->  PostgreSQL
```

The Next.js app renders the public site (SEO focused, static or ISR where possible) and the authenticated dashboard (client rendered, protected routes). A separate Node.js REST API owns all data access and business logic. Every request to a protected route is authenticated and checked against the caller's role before it touches the database.

Next.js Route Handlers could host the API instead of a separate Node service, see `prd.md` section 13. This document assumes a separate API; if the client chooses the combined option, the request flow and RBAC rules below still apply, only the deployment topology changes (see `deployment.md`).

## Request flow

### Public: submit a service request

1. Customer fills the service request form on the public site.
2. The frontend calls `POST /api/v1/service-requests` (public, rate limited, spam checked with a honeypot field and a captcha).
3. The API validates input, persists the request, and returns a confirmation.
4. The API triggers an email and an SMS alert to staff (see the notification service below).
5. The frontend shows a confirmation screen to the customer.

### Staff: log in and use the dashboard

1. Staff submit email and password to `POST /api/v1/auth/login`.
2. The API checks the password hash, issues a JWT that encodes the user id and role, and returns it to the frontend.
3. The frontend stores the token and sends it as a bearer token on every dashboard request.
4. Every protected route on the API reads the token, confirms it is valid and not expired, loads the user's role, and checks that role against the route's required permission before running any logic.
5. A request without a valid token, or with a role that lacks permission, is rejected with 401 or 403 before any data is touched.

### Staff: convert a request into an appointment

1. Office staff open a service request in the dashboard.
2. They match it to an existing customer or create a new one.
3. They create an appointment with a date, time, and assigned technician.
4. The API marks the originating request as actioned and links it to the new appointment.
5. An appointment confirmation is sent to the customer.

## Authentication and RBAC

- Sessions are JWTs signed with a server side secret. Tokens carry the user id, role, and an expiry.
- Four roles: Owner/Admin, Manager/Dispatcher, Office/Customer Service, Field Technician. The full permission matrix is in `prd.md` section 6.3.
- RBAC is enforced with a middleware layer on the API that runs before the controller for every non public route. The middleware rejects the request if the role does not have the required permission for that route and method.
- The frontend hides actions a role cannot perform, as a usability aid only. It never substitutes for the server side check.
- Passwords are hashed with bcrypt or argon2. Failed login attempts are throttled after repeated failures (see `prd.md` FR-A5).

## Folder structure

### frontend/

```
app/
  (public)/            public site routes: home, about, services, gallery, testimonials, faq, contact
  (dashboard)/          staff routes, behind auth
components/
  ui/                  shared building blocks: button, input, card, nav, footer
  site/                public site sections
  dashboard/           dashboard specific components
lib/
  api.ts               typed client for calling the backend
  auth.ts              token storage and session helpers
types/                 shared TypeScript types
```

### backend/

```
src/
  routes/              one file per resource: service-requests, auth, users, customers, equipment, appointments, jobs, communications, reports, services, settings
  controllers/         request handling per route
  services/            business logic, independent of HTTP
  middleware/
    auth.ts            verifies the JWT
    rbac.ts            checks role against required permission
    rateLimit.ts        for public endpoints
  prisma/
    schema.prisma       data model, see schema.md
  lib/
    email.ts           wraps the transactional email provider
    sms.ts              wraps the SMS gateway
    storage.ts          wraps the object storage provider
```

## Integration points

- Email: a thin wrapper in `lib/email.ts` around the chosen provider (Resend or SendGrid, to confirm). Called by the notification service, never directly from a route handler.
- SMS: a thin wrapper in `lib/sms.ts` around the chosen gateway (Twilio or a regional provider, to confirm). Same pattern as email.
- File storage: a thin wrapper in `lib/storage.ts` around S3 compatible storage (Cloudflare R2, to confirm), used for job photos and gallery images.
- All three wrappers queue and retry on provider failure rather than failing the request that triggered them (see `prd.md` NFR-6).

## Open items

- Separate Node API versus Next.js Route Handlers, to confirm with the client (`prd.md` section 13).
- Final choice of email, SMS, and storage providers.
- Hosting split, see `deployment.md`.
