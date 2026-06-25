# Redline 🏁

The home base for car culture. Find your people, find your meet. A dark,
red-themed React + Vite + Tailwind app.

**Live:** https://mo420333.github.io/redline/

## Features

- **Meets & events** — discover car meets worldwide with real city background
  photos, filter by region/type, search, RSVP, and host your own.
- **Showroom** — share a photo of your ride by category (real images + SVG
  fallback), love reactions, and a **detail page** for every car.
- **AI Showroom** — stage your ride in generated scenes (BMW styling, color
  swatches, upload, or a real-photo option).
- **Giveaways, merch store (with cart), group chats, and a Garage Pass**
  quick-share card.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (+ 404.html SPA fallback for GitHub Pages)
```

## Optional integrations

Everything works with **zero configuration** (local/seed data + keyword images).
Add a `.env` file to activate the real services:

```bash
# .env
# 1. Higher-quality, precise photos via Unsplash (https://unsplash.com/developers)
VITE_UNSPLASH_KEY=your_unsplash_access_key

# 2. A real, shared backend for the Showroom via Supabase (https://supabase.com)
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Photos (Unsplash)
With `VITE_UNSPLASH_KEY` set, car and city images upgrade from the keyword
image service to precise Unsplash photos. Without it, the keyword service is
used.

### Shared backend (Supabase)
1. Create a project at supabase.com and run [`supabase/schema.sql`](./supabase/schema.sql)
   in the SQL editor.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`.
3. Restart `npm run dev`. The Showroom now reads/writes a shared `rides` table
   and streams new posts to everyone in real time. Without these vars it falls
   back to local storage so the live demo keeps working.

> Note: this is a prototype. Real-time chat, RSVPs, giveaways, and auth still
> use mock/local data — the Supabase layer is wired for the Showroom as the
> reference pattern to extend.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.
