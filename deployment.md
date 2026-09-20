# Deployment

## Hosting plan (to confirm with the client)

| Piece | Proposed host | Status |
|---|---|---|
| Frontend (Next.js) | Vercel | To confirm |
| API (Node.js) | A managed host, for example Railway or Render | To confirm |
| Database (PostgreSQL) | Managed Postgres on the same host as the API, or a dedicated provider | To confirm |
| File storage | S3 compatible object storage, for example Cloudflare R2 | To confirm |
| Domain | Existing or to be purchased | To confirm, `prd.md` section 13 |
| Professional email | Existing or to be arranged | To confirm, `prd.md` section 13 |

If the client prefers a single deployable, the API can run as Next.js Route Handlers on Vercel instead of a separate service (see `architecture.md`). This changes where environment variables live but not what they are.

## Environments

- **Local**: developer machines, local Postgres or a hosted dev database, `.env.local` for secrets.
- **Staging** (recommended before launch): mirrors production, used for client review and end to end tests.
- **Production**: the live public site and dashboard.

## Environment variables

| Variable | Frontend | Backend | Purpose |
|---|---|---|---|
| `DATABASE_URL` | | Yes | PostgreSQL connection string |
| `JWT_SECRET` | | Yes | Signs and verifies session tokens |
| `EMAIL_API_KEY` | | Yes | Transactional email provider |
| `SMS_API_KEY` | | Yes | SMS gateway |
| `STORAGE_ACCESS_KEY` | | Yes | Object storage |
| `STORAGE_SECRET_KEY` | | Yes | Object storage |
| `NEXT_PUBLIC_API_URL` | Yes | | Base URL the frontend calls |
| `NEXTAUTH_SECRET` or equivalent | Yes | | Only if the frontend manages its own session layer |

Secrets are never committed. Each environment keeps its own values in the hosting provider's secret manager.

## Build and deploy

### Frontend

```
npm install
npm run build
npm run start
```

Deployed automatically on push to the main branch once connected to the hosting provider, with a preview build per pull request.

### Backend

```
npm install
npx prisma migrate deploy
npm run build
npm run start
```

Migrations run as a deploy step, before the new API version starts serving traffic.

## Database migrations and backups

- Migrations are managed with Prisma (`npx prisma migrate dev` locally, `npx prisma migrate deploy` in staging and production).
- Automated daily backups of the production database (`prd.md` NFR-6), retention period to confirm with the client and the hosting provider.
- A restore process should be tested at least once before launch, not only assumed to work.

## Go live checklist

- [ ] Domain connected and HTTPS active on both the frontend and API.
- [ ] All environment variables set in the production environment, none left at local defaults.
- [ ] Database migrated and seeded with the initial service catalogue (`schema.md`, `content.md`).
- [ ] Email and SMS providers connected and a test notification confirmed on both channels.
- [ ] At least one Owner/Admin account created and able to log in.
- [ ] Automated backups confirmed running.
- [ ] Public pages pass the performance and accessibility checks in `testing.md`.
- [ ] Sitemap and robots.txt in place, analytics connected (`prd.md` FR-P6, FR-P9).
- [ ] Privacy policy and cookie consent live if required for the client's jurisdiction (`prd.md` NFR-9).
- [ ] Rollback plan agreed: how to redeploy the previous frontend and API version if launch reveals a serious issue.

## Open items

- Final hosting choice for the API and database.
- Domain and professional email ownership and transfer.
- Backup retention period and jurisdiction specific privacy requirements.
- Target launch date (`prd.md` section 13).
