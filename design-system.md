# Design System

This is the single source of truth for colour, type, spacing, radius, shadow, icons, and component patterns for the Bee Hive site and dashboard. Nothing outside this file should be used for visual decisions. If the brief or PRD does not specify something, choose the plain, conventional option below and flag anything still missing as an open item rather than inventing decoration.

## Design rules (restated, do not skip)

1. Nothing should look AI generated or like a template. It should read as a small studio built it by hand for this specific HVAC business.
2. No gradients anywhere. No glassmorphism. No neon or trendy colors. No heavy or coloured shadows.
3. No fancy or decorative icons and no emoji used as icons. One simple, consistent line icon set at fixed sizes, 20px and 24px. Icons stay monochrome and quiet.
4. Colors come only from the tokens below. Nothing outside them. The accent is used sparingly on a mostly white page.
5. Keep exactly to what the client specified. If something is not specified, choose the plain, conventional option and log it as an open item.

## Structure and feel (borrowed approach, Bee Hive colours only)

1. Clean white canvas, generous whitespace. Content, spacing, and real photography carry the page, not heavy type or decoration.
2. Modest type, Inter as the base font. Headings at moderate sizes and weights (500 to 700), body text comfortable and readable.
3. Soft, rounded shapes. Cards at roughly 14px radius. Inputs and search fields can be pill shaped where it fits. Icon buttons are circular. Avoid hard corners on interactive elements.
4. One subtle shadow tier only. Depth comes from whitespace, hairline borders, and rounded corners.
5. A 4px and 8px spacing base. Major sections breathe at roughly 64px vertical rhythm. Content centred in a container around 1200px wide.
6. Strong alignment, a consistent grid. Everything lines up. Column counts reduce cleanly at each breakpoint.
7. Real responsiveness, mobile first. Top navigation collapses to a simple menu on small screens. Sticky "Request Service" bar on key pages on mobile.
8. Photography first. Real photos of the team, vehicles, equipment, and completed work. Neutral placeholders until the client supplies images. No stock clichés.

## Tokens

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

Exact hex values are working defaults drawn from the client brief (honey yellow, deep navy, white, charcoal). Confirm with the client before final handoff.

## Icons

One line icon set (for example Lucide or Feather, pick one and use it everywhere, do not mix sets). Two fixed sizes: 20px for inline and list contexts, 24px for standalone buttons and headers. Stroke weight consistent across the set. Colour is always `ink` or `muted`, never the accent, unless the icon sits inside an accent coloured button, where it uses `on-accent`.

## Components

### Button

- Primary: accent background, `on-accent` text, radius `full`, used for "Request Service" and other primary calls to action. Sparingly, at most one primary button per view.
- Secondary: `canvas` background, `ink` border (hairline weight, `ink` colour), `ink` text, radius `full`.
- Text button: no background or border, `ink` text, used for low emphasis actions.
- States: hover slightly darkens background, active uses `accent-active` for the primary variant, disabled reduces opacity, no colour change.

### Input

- `canvas` background, `hairline` border, radius `md` (or `full` for a search field), `body` text, `muted` placeholder text.
- Focus state: border colour changes to `ink`, no glow or coloured ring.
- Error state: border colour changes to a plain red reserved only for validation errors, not part of the brand palette, used only on inputs and inline error text.

### Card

- `canvas` background, `hairline` border, radius `md`, one soft shadow tier, `surface-soft` used only for internal bands within a card if needed.
- Used for service cards, testimonial cards, gallery items, and dashboard summary tiles.

### Navigation (public site)

- `canvas` background, `hairline` bottom border, logo left, links centre or right, primary button ("Request Service") right.
- Collapses to a simple menu (icon button, 24px) on small screens. Menu opens a full width panel, not a dropdown.

### Footer

- `surface-soft` background, `ink` text for headings, `body` or `muted` for links, click to call phone number, email, business hours, service area note, and social links.

### Service card

- Icon (24px, `ink`) or photo, service name (`h3`), one line description (`small` or `body`), link to the category page.

### Request form

- Fields: name, phone, email, address, service type (select, backed by ServiceCategory), preferred date and time, message. Inline validation errors under each field. A visible confirmation state on submit, not just a toast.
- A honeypot field, hidden from sighted users, and a captcha, for spam protection (FR-P8).
- Sticky variant on mobile: a slim bar pinned to the bottom of the screen with a single "Request Service" button that opens the full form.

### Dashboard components

- Summary tile: a card with a large number (`display` size, `ink`), a label (`small`, `muted`), used on the overview screen for today's appointments, new requests, jobs in progress.
- Table: hairline row dividers, no zebra striping, `body` text, actions as text buttons or a 20px icon button at the row end.
- Status pill: small rounded label (`radius full`, `surface-soft` background, `body` text), colour never changes by status, only the text does, to avoid inventing a colour coding system outside the palette. If status colour coding becomes a requirement, confirm with the client before adding any colour outside the tokens.

## Responsive breakpoints

| Name | Width | Notes |
|---|---|---|
| Mobile | up to 639px | single column, collapsed nav, sticky CTA where specified |
| Tablet | 640 to 1023px | two column grids where the desktop uses three or more |
| Desktop | 1024px and up | full grid, container capped around 1200px |

## Open items

- Exact hex values to confirm with the client (working defaults above).
- Final icon set choice (Lucide, Feather, or another line set), pick one before the first component is built.
- Whether dashboard status pills need colour coding beyond text, which would require new tokens and client sign off.
