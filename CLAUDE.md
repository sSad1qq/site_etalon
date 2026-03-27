# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

Educational center website (exam prep — EGE/OGE, Penza, Russia) built with **Next.js 15 App Router**, React 19, TypeScript, Tailwind CSS.

**Routing:** `src/app/` — pages: `/`, `/about`, `/subjects`, `/faq`, `/contacts`, plus legal pages. All use App Router conventions.

**API Routes** (`src/app/api/`):
- `POST /api/lead` — saves lead (name + phone) to `data/leads.json`; rate-limited (5 req/60s), CSRF-checked, optional webhook forward
- `POST /api/telegram` — sends lead form data to Telegram bot; rate-limited (3 req/60s)
- `GET /api/leads/export` — CSV export of all leads; requires `Authorization: Bearer <EXPORT_SECRET>`

**Components** (`src/components/`): 21 components. Large ones (`SubjectsGrid`, `VideoTestimonials`, `ResultsBoard`) are dynamically imported on the home page to reduce initial bundle size.

**Utilities** (`src/lib/`):
- `csrf.ts` — validates Origin/Referer headers
- `rate-limit.ts` — in-memory per-IP throttling
- `validate-url.ts` — SSRF protection, blocks private IP ranges for webhook URLs
- `logger.ts` — structured logging

**SEO:** JSON-LD Organization schema in `src/app/layout.tsx`, dynamic meta tags, `robots.ts`, `sitemap.ts`.

**Storage:** Leads stored in `data/leads.json` (JSON file, not a database, excluded from git, max 50k entries).

## Environment Variables

See `.env_example`. All are server-side only (no `NEXT_PUBLIC_` prefix):

| Variable | Required | Purpose |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram bot token |
| `TELEGRAM_ADMIN_CHAT_ID` | Yes | Chat ID for lead notifications |
| `EXPORT_SECRET` | Yes | Bearer token for CSV export (`openssl rand -hex 32`) |
| `LEADS_WEBHOOK_URL` | No | External CRM/webhook URL |
| `LEADS_WEBHOOK_TOKEN` | No | Bearer token for webhook |
| `ALLOWED_ORIGINS` | No | Extra CSRF-allowed origins (comma-separated) |

## Key Constraints

- **CSRF protection** is applied to all mutating API routes — requests must include a valid Origin or Referer header matching the deployment domain.
- **SSRF protection** in `validate-url.ts` blocks private/link-local IP ranges; don't pass internal URLs as webhook targets.
- **Path alias:** `@/*` maps to `./src/*`.
- **Docker deployment:** `next.config.ts` uses `output: 'standalone'`.
- **Image optimization:** WebP/AVIF with 30-day cache; static assets use 1-year immutable cache headers.
- **CSP** in `next.config.ts` explicitly allowlists Yandex Maps domains — update it when adding new external resources.
