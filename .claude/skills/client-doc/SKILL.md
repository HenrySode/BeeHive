---
name: client-doc
description: Generate a branded client facing document, such as a brief, a plan, or a report, in the Bee Hive style, plain language, the client's palette, no AI tone. Use when the client needs a document rather than code.
---

# Client Doc

Use this skill when the output is a document for the client to read, not code. The same writing and design rules apply as everywhere else in this project, and the approach generalises to future clients: swap the brand tokens, keep the method.

## Steps

1. **Confirm the purpose.** A brief, a project plan, a status report, or similar. State the purpose in one line at the top of the document.
2. **Write in plain language.** Follow the writing rules in `CLAUDE.md`: no long dash joining clauses, no AI tone, no filler openers, no marketing language, short and concrete sentences using the client's own words where they exist.
3. **Use the client's brand, not a generic template.** For Bee Hive, pull colour and type choices from `design-system.md` if the document is a designed artefact (a PDF or an HTML page), not from a default template style.
4. **Structure for the reader, not for show.** A clear heading per section, short paragraphs, tables for anything comparative (dates, costs, options), and a plain list where the content is a list. No decorative filler between sections.
5. **Mark anything uncertain.** If a fact in the document is not confirmed (a date, a price, a scope item), say so plainly, do not smooth over it with vague language.
6. **Reuse the method for the next client.** Keep the steps above client agnostic; only the tokens, voice, and source documents change.

## Rules

- No em dash or en dash used to join clauses, anywhere in the document.
- No AI tone: no "unlock", "elevate", "seamless", "in today's world", or similar. Say what the document means plainly.
- Every claim in the document should trace back to a source document (`prd.md`, the discovery brief, or direct client input), not be invented for effect.
