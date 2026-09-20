# Master Setup Prompt: Bee Hive Website Project

Paste everything below into your AI coding agent (for example Claude Code) at the root of the repository. It will create the project documents, the skills, and the agents. It should not build the application yet.

---

## Role and context

You are setting up the foundation for a real client project. The client is **Bee Hive Heating and Air Conditioning**, a residential HVAC company (heating, cooling, ventilation, indoor air quality, maintenance, repair, installation, dryer vent cleaning). The product is one dynamic web application in two parts: a public marketing website for customers, and a private employee dashboard for staff. The stack is **Next.js** (frontend), **Node.js** (REST API), and **PostgreSQL** (with Prisma).

A file named `prd.md` already exists in this repository. Read it first. It is the source of truth for scope, features, roles, data model, and phases. Do not overwrite it.

Your job in this task: create the markdown documents, the skills, and the agents listed below. Follow the global rules for everything you write. When done, print a tree of what you created and a short list of open items. Do not scaffold or code the app in this task.

---

## Global rules (apply to every file, every skill, every agent, and later to all code and copy)

### Writing rules
1. Do not use the long dash to join words or clauses. No em dash and no en dash between phrases or sentences. Use full stops, commas, colons, or brackets instead. Normal hyphens inside ordinary compound words are fine (for example "role based", "click to call", "drop down").
2. Do not write in an obvious AI tone. No filler openers, no "in today's fast paced world", no marketing fluff, no long strings of adjectives, no emoji, no excessive bold. Write plainly, the way a careful person writes.
3. Use the client's own words and the wording in `prd.md`. Keep copy short and concrete.

### Design rules
1. Do not make anything look AI generated or like a template. It should read as a small studio built it by hand for this specific HVAC business.
2. No gradients anywhere. No glassmorphism. No neon or trendy colors. No heavy or coloured shadows.
3. No fancy or decorative icons and no emoji used as icons. Use one simple, consistent line icon set at fixed sizes (for example 20px and 24px). Icons stay monochrome and quiet.
4. Colors come only from the client's stated palette (see the token block below). Nothing outside it. The accent is used sparingly on a mostly white page.
5. Keep exactly to what the client specified in the brief and the PRD. If something is not specified, choose the plain, conventional option, and note it as an open item rather than inventing decoration.

### Design principles to adopt (structure and feel only, not the colours of any other brand)
Borrow the following approach, which is proven on clean consumer marketplaces, but apply it with the Bee Hive palette below, never another brand's colours.
1. Clean white canvas with generous whitespace. Let content, spacing, and real photography carry the page rather than heavy type or decoration.
2. Modest type. A clean modern sans serif (use **Inter** as the base font). Headings sit at moderate sizes and weights (weight 500 to 700), not oversized. Body text is comfortable and readable.
3. Soft, rounded shape language. Cards use about a 14px radius. Inputs and search fields can be pill shaped where it fits. Icon buttons are circular. Avoid hard corners on interactive elements.
4. One subtle shadow tier only. Depth comes from whitespace, hairline borders, and rounded corners, not from stacked shadows.
5. A 4px and 8px spacing base. Major sections breathe at roughly 64px vertical rhythm. Centre the content in a container around 1200px wide.
6. Strong alignment and a consistent grid. Everything lines up. Reduce column counts cleanly at each breakpoint. Never let rows reflow into a mess.
7. Real responsiveness. Mobile first. The top navigation collapses to a simple menu on small screens. Sticky call to action patterns on key pages (for example a sticky "Request Service" bar on mobile).
8. Photography first. Use real photos of the team, vehicles, equipment, and completed work. Use neutral placeholders until the client provides real images. No stock clichés.

### Brand tokens (the only palette and scale to use)
Place this block, expanded, into `design-system.md` and treat it as the single source of truth. Colours are drawn from the client brief: honey yellow, deep navy, white, charcoal. Confirm exact hex values with the client, these are the working defaults.

```
Colors
  canvas        #FFFFFF   page background
  ink           #1B2A4A   headings, navy
  body          #333B44   charcoal body text
  muted         #6A7680   secondary text, captions
  hairline      #E2E6EA   1px borders and dividers
  surface-soft  #F5F7FA   light fills, section bands
  accent        #E8A317   honey, primary call to action, used sparingly
  accent-active #C8871A   pressed state for the accent
  accent-soft   #FBEFD2   pale honey, quiet highlight only
  on-accent     #1B2A4A   text on a honey button (navy for contrast) 
  on-ink        #FFFFFF   text on a navy surface

Typography (font: Inter, system sans fallback)
  display   28 to 32px, weight 600 to 700, navy ink
  h2        22 to 24px, weight 600
  h3        18 to 20px, weight 600
  body      16px, weight 400, charcoal
  small     14px, weight 400, muted
  button    16px, weight 500

Radius
  sm 8px    md 14px    full 9999px

Spacing (px)
  4, 8, 12, 16, 24, 32, 48, 64

Elevation
  one soft shadow only, low opacity, no colour tint
```

---

## Part 1: Markdown documents to create

Create each file with a clear, focused purpose. Keep them practical, no filler.

1. **README.md** : what the project is, the stack, folder layout, how to install and run, environment variables, and the main scripts. Link to the other docs.
2. **CLAUDE.md** : working rules for any AI agent in this repo. Coding conventions (TypeScript everywhere, naming, folder structure), the global writing and design rules above, the brand tokens, and a short "do and do not" list. State that server side RBAC is mandatory and that the design tokens are the only source of colours.
3. **architecture.md** : the system design. How the Next.js frontend, the Node.js API, and PostgreSQL fit together. Request flow, authentication and RBAC, folder structure for both apps, and where email, SMS, and file storage plug in.
4. **schema.md** : the database design derived from the PRD data model (User, Customer, Equipment, ServiceRequest, Appointment, Job, ServiceCategory, Communication, Activity log). Fields, relationships, and indexes. If you also create `prisma/schema.prisma`, make that the source of truth and keep `schema.md` as the human readable explanation.
5. **api-spec.md** : the REST endpoints from the PRD, grouped by resource. For each: method, path, who can call it (role), a short description, and the request and response shape. Mark public endpoints clearly.
6. **design-system.md** : the full design language. The token block above expanded, the type scale, spacing, radius, the single shadow, the icon rules, the component patterns (buttons, inputs, cards, nav, footer, service card, request form), and the responsive breakpoints. Restate the design rules so a builder cannot miss them.
7. **content.md** : the copy for each public page (Home, About, Services and category pages, Gallery, Testimonials, FAQ, Contact). Plain, in the client's voice, based on the brief. Mark anything not yet supplied as a placeholder to confirm.
8. **testing.md** : the test strategy. What to unit test, what to integration test, the key flows to cover (service request submit, request to appointment, technician job update, RBAC enforcement), and the acceptance criteria from the PRD restated as checks.
9. **deployment.md** : hosting plan, environment variables, build and deploy steps, database migration and backup notes, and a short go live checklist. Mark hosting choices as to confirm.

Do not create or overwrite `prd.md`. Reference it where useful.

---

## Part 2: Skills to create

Create each skill as its own folder with a `SKILL.md` (name, description of when to use, and clear steps). Each skill must follow the global rules. Keep them short and practical.

1. **api-endpoint** : scaffold a Node.js REST endpoint to the project pattern. Steps: define the route, validate input, enforce authentication and role based access, call the service or data layer, return a typed response, and add a matching test. Use when adding any new API route.
2. **prisma-model** : add or change a database entity. Steps: update the Prisma schema, create a migration, update related types, and add seed data if needed. Use when the data model changes.
3. **ui-component** : build a Next.js and React component to the Bee Hive design system. It must pull colours, type, radius, and spacing only from the tokens. It must use the simple line icon set, no gradients, no fancy icons, and no colours outside the palette. It must be responsive and accessible. Use when building any screen or component. State inside this skill that any copy it adds follows the writing rules (no long dashes, no AI tone).
4. **test-writer** : write tests to the project convention for a given feature, covering the happy path, validation errors, and access control. Use when adding tests for new work.
5. **client-doc** (optional but recommended) : generate a branded client document (brief, plan, or report) in the Bee Hive style, plain language, the client's palette, no AI tone. Reuse for the next client too. Use when the client needs a document rather than code.

---

## Part 3: Agents to create

Create each agent with a name, a short role description, the tools it may use, and its instructions. Every agent must be told to follow the global writing and design rules and to treat `prd.md` and `design-system.md` as authoritative.

1. **planner** : reads a feature from the PRD and produces a task breakdown and a file plan. It does not write feature code. It decides the order of work and flags dependencies and open questions.
2. **frontend** : builds the Next.js and React interface using the ui-component skill and the design tokens. It owns pages, components, responsiveness, and accessibility. It never introduces colours, gradients, or icons outside the system.
3. **backend** : builds the Node.js API, the Prisma models, authentication, and RBAC, using the api-endpoint and prisma-model skills. It enforces access control on the server for every route.
4. **reviewer** : reviews work before it is considered done. It checks against the PRD acceptance criteria and the non functional requirements (security, RBAC, performance, accessibility, SEO). It also enforces the house rules and flags: any long dash used to join clauses, any AI sounding copy, any gradient, any colour outside the palette, any fancy or emoji icon, and any hard corner where the system asks for rounded. It reports issues clearly and does not approve until they are fixed.

A lean solo setup can run with planner, one full stack builder, and reviewer. Split the builder into frontend and backend when two streams of work run in parallel.

---

## Output for this task

1. Read `prd.md` first.
2. Create the documents in Part 1, the skills in Part 2, and the agents in Part 3.
3. Keep every file focused and follow the global rules.
4. Print a tree of everything you created.
5. List any open items or decisions you had to assume, so they can be confirmed.
6. Stop there. Do not build the application in this task.
