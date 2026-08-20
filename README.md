# 🚀 Thumbnailforge

Thumbnailforge is an AI-powered viral thumbnail generator web app. Built on
React, Vite, and Tailwind CSS, running on **Supabase** (Auth, Postgres,
Storage, Edge Functions) — no Base44 dependency.

## ✨ Features

- **AI Thumbnail Generation** via a Supabase Edge Function calling OpenAI's
  `gpt-image-1`.
- **AI Title Suggestions** — client-side template suggestions.
- **Image Upload** to Supabase Storage.
- **Anonymous auth** — every visitor gets a session automatically, no login
  screen, so saved thumbnails/favorites persist per-browser.

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite, Tailwind CSS, Radix primitives
- **Backend:** Supabase (Postgres + RLS, Storage, Edge Functions, Auth)
- **Image generation:** OpenAI `gpt-image-1` (called server-side from an Edge
  Function — the key never reaches the browser)

## 📦 Project Structure

Flat structure (no `src/` nesting) — all components live at the repo root
and are imported with the `@/` alias (see `jsconfig.json`).

- `supabaseClient.js` — Supabase client init
- `AuthContext.jsx` — anonymous-auth session provider
- `ThumbnailGenerator.jsx` — core generation workspace
- `supabase/functions/generate-thumbnail/` *(deployed separately, see below)*

## 🚀 Getting Started

1. `npm install`
2. Copy the Supabase URL/anon key into `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<anon-key>
   ```
3. In the Supabase dashboard for that project:
   - **Authentication → Sign In / Providers → Anonymous sign-ins → enable.**
   - **Edge Functions → generate-thumbnail → Secrets → add `OPENAI_API_KEY`.**
4. `npm run dev`

## 🗄️ Backend setup (already applied to this project)

- `public.thumbnails` table with row-level security scoped to `auth.uid()`.
- `thumbnails` Storage bucket (public read, per-user-folder write).
- `generate-thumbnail` Edge Function — verifies the caller's JWT, calls
  OpenAI, uploads the result to Storage, returns the public URL.

To replicate this on a different Supabase project, see `migration/` for the
raw SQL and function source.

## 📝 License

MIT.
