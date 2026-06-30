# Code Standards — Truvend

## General

- TypeScript everywhere (frontend and backend). No plain `.js` files in either app.
- No `any` unless genuinely unavoidable (e.g. third-party SDK gaps) — and when used, comment why.
- Prefer explicit return types on exported functions.
- One default export per file maximum; prefer named exports otherwise.

## Naming conventions

- Files: kebab-case (`order-status-badge.tsx`, `checkout-service.ts`).
- React components: PascalCase for the component name, kebab-case for the filename.
- Variables/functions: camelCase.
- Types/interfaces: PascalCase, no `I` prefix (`Order`, not `IOrder`).
- Constants that are truly fixed: SCREAMING_SNAKE_CASE.
- Backend route handlers named after the action they perform, not generic (`createListing`, not `handlePost`).

## Backend (Express + TypeScript)

Folder pattern under `/backend/src`:

```
/routes        ← route definitions only, no logic
/controllers   ← request/response handling, calls services
/services      ← business logic, talks to Supabase/Nomba/Gemini
/middleware    ← auth verification, error handling
/types         ← shared TypeScript types
```

- Routes contain no logic — they wire a path + method to a controller function.
- Controllers parse/validate the request, call a service, shape the response. No direct DB or third-party API calls in controllers.
- Services own all Supabase queries and all Nomba/Gemini API calls. A controller never imports the Nomba or Gemini SDK directly.
- Every route that requires auth runs through the auth middleware first — never inline JWT checks in a controller.
- Errors are thrown as typed errors and caught by a central error-handling middleware that shapes them into the standard `{ error, code, message }` response. Controllers don't hand-roll error JSON.

## Frontend (Next.js 15, App Router)

Folder pattern under `/frontend`:

```
/app            ← routes (App Router conventions: page.tsx, layout.tsx)
/components     ← shared UI components
/components/ui  ← shadcn/ui components (generated, don't hand-edit unless necessary)
/lib            ← fetch wrappers, utils, types shared with backend contracts
```

- Server Components by default. Add `"use client"` only when the component needs state, effects, or browser APIs.
- Data fetching: plain `fetch` against backend endpoints, wrapped in small functions under `/lib` (e.g. `getListing(id)`, `createOrder(listingId)`) — don't call `fetch` directly inside components.
- Loading/error state handled with local `useState`, not a global state library.
- Styling: Tailwind utility classes directly in JSX. Use shadcn/ui components for interactive primitives (modals, buttons, badges, dialogs) rather than hand-rolling them — especially the `high_risk` warning modal, which should use the shadcn Dialog primitive for accessibility (focus trap, escape handling).
- No inline hex colors — use Tailwind theme tokens (see `ui-context.md` once defined).

## Import order (both apps)

1. External packages
2. Internal absolute imports (`@/lib/...`, `@/components/...`)
3. Relative imports (`./`, `../`)
4. Types (grouped separately if numerous, using `import type`)

Blank line between each group.

## Commits / PRs

- Small, scoped commits. One concern per commit where practical.
- PR description states which endpoint(s) or screen(s) it touches and whether it crosses the frontend/backend boundary defined in `architecture.md`.
