# Testing Strategy

## Levels

- **Unit tests**: pure functions and business logic in `backend/src/services`, validation schemas, and utility functions on the frontend (`lib/`). Fast, no network or database.
- **Integration tests**: API routes against a real or test database, covering request validation, RBAC enforcement, and the full request to response cycle. Frontend integration tests cover form submission and API client behaviour with a mocked API.
- **End to end tests** (optional, recommended once the dashboard exists): the key flows below, run against a running frontend and API.

## What to unit test

- Input validation for every request payload (service request, login, customer, appointment, job update).
- RBAC permission checks in isolation: given a role and a required permission, does the check return the right answer.
- Business logic: converting a service request into an appointment, computing job status transitions, building a report query from filters.
- Notification triggers: does the right event produce the right email or SMS call, without actually sending in tests (the provider wrapper is mocked).

## What to integration test

- Every API route, happy path and rejected path (missing field, wrong role, expired token).
- Database writes and reads through Prisma for each entity in `schema.md`.
- The public service request endpoint under rate limiting and spam checks.

## Key flows to cover (end to end where practical)

1. **Service request submit** (`prd.md` US-1): a visitor fills the public form, submits, sees a confirmation, and the record exists in the database. Invalid input shows inline errors and does not submit. A spam submission is blocked.
2. **Request to appointment** (`prd.md` US-2): office staff open a new request, match or create a customer, create an appointment with a technician, and the request is marked actioned and appears on the calendar.
3. **Technician job update** (`prd.md` US-3): a technician logs in, sees only their assigned jobs, advances a job's status, and records work notes. The update is saved to the job and the customer's history.
4. **RBAC enforcement**: for each role, attempt an action outside its permission matrix (`prd.md` section 6.3) and confirm the API rejects it with 403, not just that the frontend hides the button.
5. **Seasonal reminder send** (`prd.md` US-4, Phase 3): a manager selects a segment by tag, sends a templated message, and the send is logged and counted in outreach reporting.

## Acceptance criteria as checks

Restated from `prd.md` section 7, as pass or fail checks:

- [ ] All required fields on the service request form are validated, with clear inline errors on invalid input.
- [ ] A successful submission shows a confirmation to the customer.
- [ ] A record is persisted and an email and SMS alert reach staff within seconds of submission.
- [ ] Spam submissions are blocked by the honeypot and rate limit.
- [ ] A service request can be linked to an existing customer or used to create a new one.
- [ ] Creating an appointment from a request assigns a date, time, and technician.
- [ ] Converting a request marks it actioned and it appears on the calendar.
- [ ] A technician only ever sees jobs assigned to them.
- [ ] Job status can advance through the pipeline and each change is timestamped.
- [ ] Work notes save to the job and to the customer's service history.
- [ ] A customer segment can be selected by tag for outreach.
- [ ] A templated send reaches the segment by email or SMS and is logged.
- [ ] Every non public API route rejects a caller whose role lacks the required permission.

## Non functional checks

- Performance: public pages meet a mobile LCP target of 2.5 seconds or better (`prd.md` NFR-1), checked with Lighthouse or a similar tool before release.
- Security: no protected route is reachable without a valid, role checked token. Run a basic OWASP Top 10 pass (XSS, SQL injection, CSRF) before each release.
- Accessibility: public pages meet WCAG 2.1 AA (`prd.md` NFR-4), checked with an automated tool plus a manual keyboard navigation pass.
- Reliability: simulate an email or SMS provider failure and confirm the triggering request still succeeds and the notification is queued for retry (`prd.md` NFR-6).

## Open items

- Test runner and framework choice for both apps (for example Vitest or Jest for unit and integration, Playwright for end to end), to confirm once the stack is scaffolded.
- Whether a staging database with seed data is available for integration and end to end tests.
