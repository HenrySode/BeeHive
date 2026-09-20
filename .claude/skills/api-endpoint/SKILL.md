---
name: api-endpoint
description: Scaffold a Node.js REST endpoint to the Bee Hive project pattern, with validation, auth, RBAC, and a test. Use when adding any new API route.
---

# API Endpoint

Use this skill whenever a new API route is added to `backend/`. Follow `architecture.md` for folder structure and `CLAUDE.md` for coding conventions. Server side RBAC is mandatory, no exceptions.

## Steps

1. **Define the route.** Add the route to the matching file in `backend/src/routes/`, grouped by resource (for example `service-requests.ts`, `appointments.ts`). Check `api-spec.md` for the method, path, and role before writing anything, and update `api-spec.md` if the route was not already documented there.
2. **Validate input.** Add a validation schema for the request body and query parameters. Reject invalid input before it reaches the controller, with a clear error shape the frontend can show inline.
3. **Enforce authentication and role based access.** Apply the auth middleware to read and verify the token, unless the route is explicitly public (service request submission and login only). Apply the RBAC middleware with the exact roles allowed, taken from the permission matrix in `prd.md` section 6.3. A route with no listed role restriction should still require at least a valid session, unless it is one of the confirmed public routes.
4. **Call the service or data layer.** Keep the controller thin. Business logic and Prisma calls live in `backend/src/services/`, not in the route or controller file.
5. **Return a typed response.** Match the response shape in `api-spec.md`. Use consistent status codes: 200 or 201 for success, 400 for validation errors, 401 for missing or invalid auth, 403 for a valid session without permission, 404 for a missing resource.
6. **Add a matching test.** Use the `test-writer` skill to cover the happy path, a validation failure, and an access control failure (wrong role, missing token) for the new route.

## Rules

- Never skip the RBAC check because "the frontend already hides this". The server is the only place access control is real.
- Never put a raw Prisma call inside a route handler; go through a service function.
- Keep comments and error messages plain, no long dash, no filler language.
