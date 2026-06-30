# AI Workflow Rules — Truvend

Direct instructions for any coding agent (Claude Code or otherwise) working in this repo.

## Before touching any code

Read all six files in `/context` in this order: `project-overview.md`, `architecture.md`, `code-standards.md`, `ai-workflow-rules.md` (this file), `ui-context.md`, `progress-tracker.md`. Then check `progress-tracker.md` again specifically for current phase and open questions before starting work.

## Scoping rules

- Work only within the folder matching the task: backend changes stay in `/backend`, frontend changes stay in `/frontend`. Cross-boundary changes (e.g. adding a new API field the frontend needs) require touching both, but never let a frontend task quietly grow into backend changes or vice versa without flagging it first.
- Do not invent new API routes that aren't listed in `architecture.md` without flagging the addition explicitly in the response and proposing the update to `architecture.md`.
- Do not add new third-party dependencies without stating what's being added and why.
- If a task implies a schema change (new field, new table), state that explicitly rather than silently working around it in application code.

## How to handle ambiguity

- If a request conflicts with an invariant in `architecture.md` (e.g. "just call Nomba from the frontend to save time") — do not comply. State the conflict and propose the compliant alternative.
- If a request is underspecified in a way that affects the trust/safety logic (risk levels, escrow, checkout gating), stop and ask rather than guessing. This product's entire value proposition depends on the `high_risk` gate working correctly — never assume a shortcut is fine here.
- If a request is underspecified in a low-stakes way (e.g. exact button copy, spacing), make a reasonable choice and note the assumption rather than stopping to ask.

## Verification checklist (run before considering a task done)

- [ ] Does this respect the frontend/backend boundary (no Nomba/Gemini calls from frontend, no secrets in frontend code)?
- [ ] If this touches checkout or risk display, does the `high_risk` hard-block still function exactly as specified?
- [ ] Does the code follow the naming/folder conventions in `code-standards.md`?
- [ ] If a new endpoint or schema field was added, was `architecture.md` updated to reflect it?
- [ ] If this completes or starts a unit of work, was `progress-tracker.md` updated?
- [ ] TypeScript compiles with no `any` introduced without justification.

## Forbidden patterns

- Importing the Nomba or Gemini SDK anywhere under `/frontend`.
- Hardcoding API keys, secrets, or webhook signing secrets in any file (frontend or backend) — these belong in environment variables, never committed.
- Skipping or auto-dismissing the `high_risk` warning modal for "demo convenience."
- Calculating escrow/payout amounts in frontend code.
- Adding a global state management library (Redux, Zustand, etc.) — the project intentionally uses plain `fetch` + local state per the architecture decision in `progress-tracker.md`. If this needs to change, flag it as a decision, don't just add it.
- Writing directly to `/components/ui` (shadcn-generated files) when a wrapper component would do instead.

## Session notes

Log any non-trivial decision, deviation, or assumption made during a session into `progress-tracker.md` under "Session notes" — don't let context disappear once the session ends.
