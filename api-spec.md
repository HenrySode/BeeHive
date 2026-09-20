# API Specification

All endpoints are under a versioned base path, `/api/v1`. Endpoints marked Public need no session. Every other endpoint requires a valid bearer token and passes the RBAC check for the roles listed. Roles: Owner/Admin, Manager/Dispatcher, Office/CS, Field Technician.

Request and response shapes below are indicative, to size the build. Exact validation rules are defined during implementation with the `api-endpoint` skill.

## Service requests

### POST /service-requests
Public. Rate limited, spam checked (honeypot and captcha).

Request:
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "address": "string",
  "serviceType": "string",
  "preferredAt": "ISO datetime, optional",
  "message": "string, optional"
}
```

Response: `201` with the created request id and a confirmation flag.

### GET /service-requests
Roles: Owner/Admin, Manager/Dispatcher, Office/CS (full), Field Technician (view only).

Query: `status`, `from`, `to`, pagination.

Response: list of service requests.

### GET /service-requests/:id
Same roles as above.

### PATCH /service-requests/:id
Roles: Owner/Admin, Manager/Dispatcher, Office/CS.

Request: `{ "status": "NEW | ACTIONED | ARCHIVED", "customerId": "uuid, optional" }`

## Auth

### POST /auth/login
Public.

Request: `{ "email": "string", "password": "string" }`

Response: `{ "token": "jwt", "user": { "id", "name", "role" } }`. Throttled after repeated failures (FR-A5).

### POST /auth/logout
Any authenticated role. Invalidates the session on the server if sessions are tracked, otherwise a client side discard of the token.

### POST /auth/reset
Public (request step), then a follow up authenticated step to set a new password from the reset link.

## Users

Roles: Owner/Admin only.

- `GET /users`, list staff accounts.
- `POST /users`, invite a new staff account with a role.
- `PATCH /users/:id`, change role or details.
- `DELETE /users/:id`, deactivate (soft delete, sets `isActive` false).

## Customers

Roles: Owner/Admin, Manager/Dispatcher, Office/CS (full), Field Technician (view).

- `GET /customers`, list with search, filter, and tag segment (FR-C4).
- `POST /customers`, create.
- `GET /customers/:id`, full profile including equipment and service history.
- `PATCH /customers/:id`, update.

## Equipment

Roles: same as Customers.

- `GET /customers/:id/equipment`, list.
- `POST /customers/:id/equipment`, add.
- `PATCH /customers/:id/equipment/:equipmentId`, update.

## Appointments

Roles: Owner/Admin, Manager/Dispatcher, Office/CS (full), Field Technician (view own only, see `/jobs/mine`).

- `GET /appointments`, calendar view, filter by date range and technician.
- `POST /appointments`, create, optionally from a service request.
- `PATCH /appointments/:id`, reschedule, reassign, change status.

## Jobs

- `GET /jobs`, roles: Owner/Admin, Manager/Dispatcher, Office/CS (limited).
- `GET /jobs/mine`, Field Technician, returns only jobs assigned to the caller.
- `PATCH /jobs/:id`, Field Technician (own jobs) and above, update status, work done, notes, and photos (Phase 3).

## Communications

Roles: Owner/Admin, Manager/Dispatcher, Office/CS.

- `POST /communications`, send a manual message to a customer or a segment (FR-N5).
- `GET /communications`, history and status, feeds reporting.

## Reports

Roles: Owner/Admin, Manager/Dispatcher (full), Office/CS (view).

- `GET /reports?type=&from=&to=`, enquiries, appointments, completed jobs, outreach, sales activity (FR-R1).
- `GET /reports/export?type=&from=&to=`, CSV export (FR-R2).

## Content and settings

Roles: Owner/Admin (full), Manager/Dispatcher (limited to services, per the permission matrix).

- `GET /services`, public read of the active service catalogue (used by the public site).
- `PATCH /services`, admin update of the catalogue.
- `GET /settings`, business info: hours, service area, contact (used by the public site header and footer).
- `PATCH /settings`, admin update.

## Open items

- Exact pagination and filter query parameters, defined per endpoint during implementation.
- Whether `/auth/logout` needs server side session tracking or is purely client side.
- CSV export format and column set for `/reports/export`.
