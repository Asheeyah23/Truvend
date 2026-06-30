# Project Overview — Truvend

## What this is

Truvend is a Nigerian P2P/D2C marketplace built for the Nomba × DevCareer Hackathon 2026 (Build Track). It lets independent vendors list products and buyers check out securely through Nomba. Every listing is scored by an AI fraud-detection engine before a buyer can pay, and every vendor gets a dedicated Nomba virtual account for automated payouts.

The core idea: remove the two trust failures killing Nigerian social commerce — buyers afraid to pay upfront, sellers afraid to ship before payment — by combining pre-payment risk scoring with escrow-style payment infrastructure.

## Who uses it

- **Buyers**: browse listings, see a risk indicator before paying, check out via Nomba, confirm delivery to release funds, or raise a dispute.
- **Sellers**: create listings, receive payments into a Nomba virtual account, mark orders as dispatched, track payout history.
- No admin/moderator role is in scope for the hackathon build unless explicitly added later.

## Core flows

1. **Listing creation** — seller creates a listing → backend stores it → AI Engine scores it asynchronously or on next read → riskScore + riskLevel + riskExplanation attached to the listing object.
2. **Browse & risk check** — buyer views a listing → frontend renders the risk badge/banner/modal based on `riskLevel` returned by the backend. Frontend never calls the AI engine directly.
3. **Checkout** — buyer taps Buy Now → backend creates an order → backend calls Nomba Checkout API → returns a `checkoutLink` → frontend opens it. Nomba's page handles card/OTP/bank entry directly; frontend and backend never touch raw payment details.
4. **Payment confirmation** — Nomba fires a webhook to the backend on `payment.success` → backend updates order status → funds route to the seller's Nomba Virtual Account.
5. **Delivery & release** — buyer confirms delivery → backend releases escrow → order status moves to `completed`. Buyer can instead raise a dispute, which holds escrow and flags for review.

## In scope (hackathon build)

- Listing CRUD (seller-only create/edit/delete, public read)
- AI Engine risk scoring integrated into listing responses
- Risk-level-based UI gating (especially the hard block on `high_risk` before checkout)
- Nomba Checkout integration
- Nomba Virtual Accounts for sellers
- Nomba Webhooks for payment confirmation
- Order status lifecycle (pending → paid → in_escrow → dispatched → delivered → completed, plus disputed/cancelled)
- Seller dashboard (orders, payouts, virtual account details)
- Supabase Auth (JWT-based, frontend gets token from Supabase directly)

## Out of scope (for now)

- Admin/moderation panel
- In-app messaging between buyer and seller
- Multi-currency support
- Native mobile app
- Manual dispute resolution tooling (disputes are flagged and held, not actively resolved in-app)

## Success criteria (hackathon demo)

- A buyer can browse listings and see a live "risky" vs "safe" listing distinction.
- A full checkout completes in test mode through the real Nomba Checkout API.
- A webhook ping updates the seller's dashboard balance in real time after a successful payment.
- The `high_risk` modal hard-blocks checkout until dismissed — this is treated as the core safety feature and must not be skippable.
