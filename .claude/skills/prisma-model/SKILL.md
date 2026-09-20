---
name: prisma-model
description: Add or change a database entity in the Bee Hive schema. Use when the data model changes.
---

# Prisma Model

Use this skill whenever an entity is added or changed. `schema.md` explains the model in plain terms; `backend/prisma/schema.prisma`, once it exists, is the technical source of truth and should be kept in step with `schema.md`.

## Steps

1. **Update the Prisma schema.** Add or change the model in `backend/prisma/schema.prisma`, matching the fields, types, and relationships in `schema.md`. Add indexes for any field used in a filter, a sort, or a foreign key lookup.
2. **Create a migration.** Run `npx prisma migrate dev --name <short description>` locally. Review the generated SQL before applying it; do not accept a migration that would drop or truncate data without a clear reason and a note in the migration name.
3. **Update related types.** Regenerate the Prisma client (`npx prisma generate`) and update any hand written TypeScript types in `backend/src/types` or `frontend/types` that mirror the entity.
4. **Add seed data if needed.** Update `backend/prisma/seed.ts` for reference data that the app expects to exist, such as the service catalogue in `content.md` or the four staff roles.
5. **Update `schema.md`.** Keep the human readable document in step with the schema change, including any new index or relationship.

## Rules

- Never rename or remove a field without checking every place it is read: API responses, frontend types, and seed data.
- Prefer a soft delete flag (for example `isActive`) over a hard delete for records with history attached, such as `User` and `Customer`.
- Keep enum values in Prisma matching the values used in `api-spec.md` and `schema.md` exactly.
