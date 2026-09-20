# Working Rules for AI Agents

This file applies to any AI agent working in this repository, including subagents. Read `prd.md` and `design-system.md` before writing code or copy. `prd.md` is the source of truth for scope and features. `design-system.md` is the source of truth for colour, type, spacing, and component patterns. Neither file should be overwritten without the user asking for it directly.

## Coding conventions

- TypeScript everywhere, in both `frontend/` and `backend/`. No plain JavaScript files.
- Naming: `camelCase` for variables and functions, `PascalCase` for React components and types, `kebab-case` for file and folder names except React component files, which match the component name in `PascalCase`.
- Frontend folder structure: `app/` for routes, `components/` for shared UI, `lib/` for utilities and API calls, `types/` for shared types.
- Backend folder structure: `routes/` for endpoint definitions, `controllers/` for request handling, `services/` for business logic, `prisma/` for the schema and migrations, `middleware/` for auth and RBAC, `lib/` for utilities.
- Server side RBAC is mandatory. Every non public endpoint checks the caller's role before doing anything else. Do not rely on the frontend to hide an action; enforce it on the API.
- Validate all input at the API boundary before it reaches business logic.
- Keep functions small and named for what they do. Prefer explicit code over clever code.

## Writing rules (copy, docs, commit messages, comments)

1. Do not use the long dash to join words or clauses. No em dash and no en dash between phrases or sentences. Use full stops, commas, colons, or brackets instead. Normal hyphens inside ordinary compound words are fine (for example "role based", "click to call", "drop down").
2. Do not write in an obvious AI tone. No filler openers, no "in today's fast paced world", no marketing fluff, no long strings of adjectives, no emoji, no excessive bold. Write plainly, the way a careful person writes.
3. Use the client's own words and the wording in `prd.md`. Keep copy short and concrete.

## Design rules

1. Do not make anything look AI generated or like a template. It should read as a small studio built it by hand for this specific HVAC business.
2. No gradients anywhere. No glassmorphism. No neon or trendy colors. No heavy or coloured shadows.
3. No fancy or decorative icons and no emoji used as icons. Use one simple, consistent line icon set at fixed sizes (20px and 24px). Icons stay monochrome and quiet.
4. Colors come only from the brand tokens in `design-system.md`. Nothing outside them. The accent (honey) is used sparingly on a mostly white page.
5. Keep exactly to what the client specified in the brief and the PRD. If something is not specified, choose the plain, conventional option, and note it as an open item rather than inventing decoration.

## Brand tokens (summary, full detail in design-system.md)

```
canvas #FFFFFF   ink #1B2A4A   body #333B44   muted #6A7680
hairline #E2E6EA   surface-soft #F5F7FA
accent #E8A317   accent-active #C8871A   accent-soft #FBEFD2
Font: Inter. Radius: 8px / 14px / full. Spacing: 4, 8, 12, 16, 24, 32, 48, 64.
One soft shadow tier only.
```

## Do

- Read `prd.md` and `design-system.md` before starting any feature.
- Enforce RBAC on the server for every protected route.
- Use the design tokens for every colour, spacing, and radius value.
- Use the `api-endpoint`, `prisma-model`, `ui-component`, and `test-writer` skills for their matching task.
- Flag anything not specified in the PRD or brief as an open item instead of inventing it.
- Write plain, direct copy and code comments.

## Do not

- Do not invent colours, gradients, shadows, or icon styles outside the design system.
- Do not use an em dash or en dash to join clauses.
- Do not trust the frontend to enforce access control.
- Do not overwrite `prd.md`.
- Do not add features or pages that are not in `prd.md` without flagging them first.
