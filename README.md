# Bee Hive Website Project

A public marketing website and a private employee dashboard for Bee Hive Heating and Air Conditioning, a residential HVAC company. One dynamic web application, two parts: the public site converts visitors into service requests, the dashboard lets staff manage customers, appointments, jobs, and outreach.

`prd.md` is the source of truth for scope, features, roles, and phases. Read it before making product decisions. This file explains the stack and how to work in the repo.

## Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- API: Node.js REST API, TypeScript
- Database: PostgreSQL with Prisma ORM
- Auth: JWT sessions, role based access control (RBAC) enforced server side
- Email: transactional provider, to confirm (Resend or SendGrid)
- SMS: SMS gateway, to confirm (Twilio or a regional provider)
- File storage: S3 compatible object storage, to confirm (Cloudflare R2)

## Folder layout

```
bee-hive/
  frontend/          Next.js app (public site + staff dashboard)
  backend/           Node.js REST API (not yet scaffolded)
  prd.md             Product requirements, source of truth
  architecture.md    System design and request flow
  schema.md          Database design
  api-spec.md        REST endpoint reference
  design-system.md   Brand tokens and component patterns
  content.md         Public page copy
  testing.md         Test strategy
  deployment.md       Hosting and release notes
  CLAUDE.md          Working rules for AI agents in this repo
  .claude/
    skills/          Reusable build skills (api-endpoint, prisma-model, ui-component, test-writer, client-doc)
    agents/          Project agents (planner, frontend, backend, reviewer)
```

## Current status

- `frontend/` is a fresh Next.js scaffold. No Bee Hive pages or components exist yet.
- `backend/` is empty. The API has not been scaffolded.
- This set of documents, skills, and agents defines how the build should proceed. See the open items section of each document for decisions still needed from the client.

## Install and run

### Frontend

```
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:3000`.

### Backend

Not yet scaffolded. Once created, the expected commands are:

```
cd backend
npm install
npm run dev
```

## Environment variables

To confirm and finalise once providers are chosen (see `deployment.md`). Expected variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signing key for session tokens |
| `EMAIL_API_KEY` | Transactional email provider key |
| `SMS_API_KEY` | SMS gateway key |
| `STORAGE_ACCESS_KEY` / `STORAGE_SECRET_KEY` | Object storage credentials |
| `NEXT_PUBLIC_API_URL` | Base URL the frontend uses to reach the API |

## Main scripts

| Command | Where | What it does |
|---|---|---|
| `npm run dev` | frontend, backend | Start the local dev server |
| `npm run build` | frontend, backend | Production build |
| `npm run lint` | frontend, backend | Lint the codebase |
| `npx prisma migrate dev` | backend | Apply database migrations locally |

## Related documents

- `prd.md`, product requirements (source of truth)
- `architecture.md`, system design
- `schema.md`, database design
- `api-spec.md`, REST endpoint reference
- `design-system.md`, brand tokens and components
- `content.md`, public page copy
- `testing.md`, test strategy
- `deployment.md`, hosting and release
- `CLAUDE.md`, working rules for AI agents
