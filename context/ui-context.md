# UI Context — Truvend

Status: **skeleton — not yet filled in.** Do not invent brand values. Wait for design input before building anything that depends on the items below.

## Color tokens

TODO — no brand palette defined yet. Risk-level colors are functionally specified in `architecture.md` / backend guide (`clear` = green, `caution` = yellow, `suspicious` = orange, `high_risk` = red) but exact hex values, dark/light variants, and Tailwind theme config are not yet set.

```
TODO: --color-primary
TODO: --color-secondary
TODO: --color-background
TODO: --color-foreground
TODO: --color-muted
TODO: --color-border
TODO: --color-risk-clear
TODO: --color-risk-caution
TODO: --color-risk-suspicious
TODO: --color-risk-high
```

## Typography

TODO — no typeface decided. Default to system font stack / Tailwind defaults until specified.

```
TODO: --font-sans
TODO: heading scale
TODO: body scale
```

## Component patterns

Confirmed direction: shadcn/ui as the component primitive layer (see `code-standards.md`), Tailwind for layout/spacing. Specific component patterns (card style for listings, badge style for risk levels, modal style for the `high_risk` gate) are not yet designed.

Known functional requirements to design against once palette/type are set:
- Listing card must surface a risk badge (`clear`/`caution`/`suspicious` states — small, non-blocking).
- `high_risk` state requires a full-screen modal, not a badge — must use shadcn Dialog for accessibility, see `code-standards.md`.
- Seller dashboard needs a payout/order status table or list pattern.

## Icon library

TODO — not yet chosen. `lucide-react` is the default that pairs with shadcn/ui if no objection arises; treat as a placeholder, not a decision, until confirmed.

## Next step

Whoever owns frontend/design should fill in color tokens, typography, and confirm or override the lucide-react default, then update this file and remove the "skeleton" status line above.
