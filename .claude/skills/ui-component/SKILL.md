---
name: ui-component
description: Build a Next.js and React component to the Bee Hive design system, using only the brand tokens, the approved icon set, and the writing rules. Use when building any screen or component.
---

# UI Component

Use this skill for any new screen or component on the public site or the dashboard. `design-system.md` is the source of truth for every visual decision; `content.md` is the source for public site copy.

## Steps

1. **Check the design system first.** Before writing markup, confirm the colours, type scale, spacing, radius, and shadow needed already exist in `design-system.md`. If something is missing, use the plain conventional option and add it as an open item rather than inventing a new token.
2. **Build with tokens, not raw values.** Pull colour, type, radius, and spacing from the design tokens (as Tailwind theme values or CSS variables, whichever the project has set up), never a hard coded hex value or an arbitrary pixel size.
3. **Use the approved icon set only.** One line icon set, fixed at 20px or 24px, monochrome (`ink` or `muted`, or `on-accent` inside an accent button). No emoji, no decorative icon, no mixing icon sets.
4. **Make it responsive.** Mobile first. Check the component at the breakpoints in `design-system.md` (mobile, tablet, desktop). Collapse navigation and reduce columns cleanly, never let a grid reflow into a mess.
5. **Make it accessible.** Semantic HTML, labelled form fields, visible focus states, sufficient colour contrast using only the approved tokens, keyboard operability for anything interactive.
6. **Write plain copy.** Any text the component introduces follows the writing rules in `CLAUDE.md`: no long dash joining clauses, no AI tone, no filler, use the client's own words from `content.md` or `prd.md` where they exist.
7. **Check against the rules before calling it done.** No gradient, no glassmorphism, no coloured or heavy shadow, no colour outside the tokens, no hard corner where the system specifies rounded.

## Rules

- A component that needs a colour, icon, or shadow not in `design-system.md` is a signal to stop and flag it, not to improvise.
- Real photography placeholders should be neutral, not stock cliché imagery, until the client supplies real photos.
