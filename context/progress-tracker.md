# Progress Tracker — Truvend

## Current phase

Planning. No code written yet. `/context` files just established as the source of truth for the build.

## Completed

- Product brief finalized (problem, solution, Nomba integration points, tech stack, transaction flow, demo plan).
- Backend architecture guide written for frontend developers (endpoints, auth model, risk display rules, error shape, checkout flow, frontend/backend boundary).
- `/context` documentation set established (this file and its five siblings).

## In progress

- Nothing yet — repo not initialized.

## Next up

- [ ] Initialize monorepo structure (`/frontend`, `/backend`) at repo root.
- [ ] Backend: scaffold Express + TypeScript project, Supabase connection, auth middleware.
- [ ] Backend: implement listings endpoints (GET/POST/PUT/DELETE).
- [ ] Backend: integrate Gemini for risk scoring, attach `riskScore`/`riskLevel`/`riskExplanation` to listing responses.
- [ ] Backend: integrate Nomba Checkout API for `/api/orders/checkout`.
- [ ] Backend: integrate Nomba Virtual Accounts for seller payouts.
- [ ] Backend: implement webhook receiver for `payment.success`.
- [ ] Backend: order status lifecycle + dispute/confirm-delivery endpoints.
- [ ] Frontend: scaffold Next.js 15 App Router project, install Tailwind + shadcn/ui.
- [ ] Frontend: Supabase Auth integration (login/signup UI, token attached to backend requests).
- [ ] Frontend: marketplace browse/listing detail pages with risk badge display.
- [ ] Frontend: `high_risk` warning modal (hard gate before checkout — see `architecture.md` invariant 6).
- [ ] Frontend: checkout flow (open Nomba `checkoutLink`, poll order status).
- [ ] Frontend: seller dashboard (orders, payouts, virtual account display).
- [ ] Fill in `ui-context.md` (currently a skeleton — color tokens, typography, icon library confirmation).

## Open questions

- Brand palette / typography not yet defined (blocks final UI polish, not blocking backend or scaffolding work).
- Icon library defaulting to `lucide-react` pending confirmation.
- Exact Supabase schema/migrations not yet written — `architecture.md` storage model section describes invariant shapes only, not final DDL.
- Async vs. sync risk scoring on listing creation (does Gemini scoring block the create response, or run after and update the listing) — not yet decided, affects backend service design.

## Architecture decisions log

| Date | Decision | Reasoning |
|---|---|---|
| 2026-06-30 | Monorepo with `/frontend` + `/backend` at root | Single team, simpler coordination for a 5-week hackathon timeline |
| 2026-06-30 | `/context` + `CLAUDE.md` live at repo root | Shared by whole team, not owned by one side |
| 2026-06-30 | Next.js 15 App Router (not Pages Router) | Team default, current Next.js convention |
| 2026-06-30 | shadcn/ui + Tailwind for frontend components | Speed of building accessible primitives (esp. the high_risk modal) without hand-rolling |
| 2026-06-30 | Plain `fetch` + local state, no React Query/global state lib | Scope control for hackathon timeline — revisit only if data-fetching complexity actually demands it |
| 2026-06-30 | "Verid" brand name dropped from product brief, AI engine referred to generically | Per project decision — branding not finalized for hackathon submission |

## Session notes

- 2026-06-30: Established all six `/context` files and `CLAUDE.md` from the Truvend Product Brief and Backend Architecture Guide. No code exists yet — this is the starting point for the build.
