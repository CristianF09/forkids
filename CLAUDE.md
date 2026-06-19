# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Forkids (corcodusa.ro) sells digital educational PDFs for children 3-7. npm workspaces monorepo: `frontend` (React, Create React App) + `backend` (Express/MongoDB), deployed to Render. No test framework exists in this repo — don't invent test commands.

## Commands

Run from repo root unless noted.

- Install: `npm install` (installs both workspaces)
- Dev (both, concurrently): `npm start`
- Dev (backend only, nodemon): `npm run server` or `cd backend && npm run dev`
- Dev (frontend only): `npm run client` or `cd frontend && npm start`
- Build frontend + copy into `backend/frontend` (mirrors Render's deploy): `npm run build`
- Lint (flat config covers `backend/**/*.js` and `frontend/src/**/*.{js,jsx}` with different rule sets): `npx eslint backend frontend/src`
- Production start (what Render runs): `cd backend && node server.js` (`render.yaml` defines the actual `buildCommand`/`startCommand`)

Backend listens on `PORT` (default 10000). Frontend dev server proxies `/api/*` to `http://localhost:10000` (see `frontend/package.json` `"proxy"`).

## Architecture

**Two purchase paths converge on one fulfillment pipeline.** Products can be bought via (1) a dynamically created Stripe Checkout Session (`backend/routes/checkout.js`, validates `priceId` server-side with `stripe.prices.retrieve` before creating the session) or (2) static Stripe Payment Links hardcoded per-product in `backend/routes/products.js`. Both land in `backend/routes/webhook.js`, which handles `checkout.session.completed` and `invoice.payment_succeeded` events, looks up the product by Stripe `priceId` in `products.js`, and dispatches based on `type`: `'individual'` → `sendPDFWithOptimization` (from `pdfDeliveryService.js`), `'complete'` → `sendCompletePackage`, `'promo'` → `sendPromoPackage`. (`sendIndividualPDFs` is defined in `webhook.js` and exported but is not called in the main dispatch path.)

**`products.js` is the single source of truth** mapping Stripe `priceId` → `{ pdf, name, price, type, productId, paymentLink, ... }`. Anything involving pricing or fulfillment starts here.

**Webhook idempotency**: `backend/models/ProcessedWebhookEvent.js` has a unique index on `eventId` plus a 30-day TTL on `processedAt`. Webhook handler relies on Mongo's duplicate-key error (code 11000) to detect and skip already-processed Stripe events — this is the only Mongoose model in the backend.

**PDF delivery branches on size** (`backend/services/pdfDeliveryService.js`, `sendCompletePackage`/`sendPromoPackage` in `webhook.js`): ZIPs are always created first in `backend/temp/`. If the ZIP is ≤25MB it's attached to the email and the temp file is deleted; if >25MB it's moved to `backend/public/pdfs/` and the customer gets a download link instead. `backend/routes/download.js` only serves files matching `SAFE_GENERATED_ZIP` (`/^[A-Za-z0-9_]+_\d{10,}\.zip$/`) — this guards the original paid PDFs sitting in the same folder from being downloaded for free, so don't loosen that regex. Links expire 30 days after file mtime.

**Middleware ordering in `server.js` is load-bearing**: the Stripe webhook route is mounted with `express.raw({ type: 'application/json' })` *before* the global `express.json()`, because Stripe signature verification needs the raw body. Don't reorder this.

**Env flags for safe local testing**: `DRY_RUN=true` skips real sends in `pdfDeliveryService.js`; `ENABLE_TEST_ROUTES=true` exposes `POST /api/test/send` (`backend/routes/test.js`) for manually triggering fulfillment without a real Stripe event. `ALLOW_STRIPE_TEST=true` allows test-mode Stripe webhook events to be processed in production (webhook handler rejects test events by default). Keep all three off in production.

**Other load-bearing env vars**: `SERVER_URL` (default `https://corcodusa.ro`) is used to construct download link URLs in emails; `CLIENT_URL` (default `http://localhost:3000`) is used for Stripe Checkout `success_url`/`cancel_url`; `STRIPE_PUBLISHABLE_KEY` is served to the frontend via `GET /api/payments/config`.

**Contact form** (`backend/routes/contact.js`) responds `200` to the client immediately, then attempts the email send in `setImmediate` — this avoids client timeouts but means email failures never surface to the frontend. Use `GET /api/contact/test-email` to verify SMTP config directly instead of going through the form.

**CORS** is an explicit allowlist in `server.js` (`defaultAllowedOrigins` merged with comma-separated `ALLOWED_ORIGINS` env var) — new deploy targets/domains need to be added there.

**Frontend startup**: `App.js` polls `GET /api/health` before rendering, showing a `<Loader>` until the backend responds (or up to 5s). On local dev without `REACT_APP_API_URL` set, it skips polling and renders immediately.

**Frontend routing** (`frontend/src/App.js`) is a flat `<Routes>` tree, no nested layouts beyond `Header`/`Footer` wrapping `<main>`. Note: `About.js`/`Acasa.js`/`Catalog.js` exist in `frontend/src/pages/` but aren't imported by `App.js` — `DespreNoi.js`/`Home.js`/`Products.js` are the live equivalents.

**Firebase is non-central**: `firebase.json`/`.firebaserc` configure Firebase Hosting as an alternate static-deploy target for `frontend/build`; `frontend/src/firebase.js` only initializes Analytics and is not imported anywhere. Render is the real deployment.

## Known stale docs

Root `README.md` and `backend/README.md` describe JWT auth, an admin dashboard, and a port/folder layout that don't exist in the current code — don't treat them as accurate. There is no auth middleware anywhere in the backend, despite a vestigial `JWT_SECRET` in `render.yaml`.
