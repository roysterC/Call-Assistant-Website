# Kikai website

The marketing site for Kikai, the AI receptionist for UK salons. The product
itself (the CRM, receptionist and chat bots) lives in
[`roysterC/call-assistant`](https://github.com/roysterC/call-assistant).
The design direction, sitemap and roadmap are in [PLAN.md](PLAN.md).

## Run it

Node 22+.

```bash
cp .env.example .env.local   # all optional; see below
npm install
npm run dev                  # http://localhost:3000
```

Before pushing: `npm run typecheck && npm run lint && npm run build`.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4 and the Geist
font. These are the same versions and fonts as the CRM. The site is static
except for one route handler, `/api/lead`.

```
src/app/            pages: / (home), /start (sign-up), /api/lead, sitemap, robots, icon
src/components/     one file per section of the home page, plus ui.tsx (buttons, icons)
src/content/site.ts every claim, figure and FAQ on the site
public/images/      hero and product photography
```

Colours come only from the `@theme` block in `src/app/globals.css`, which is
the "Olive" palette, matching the app.

## Settings

| Variable | What it does |
|---|---|
| `KIKAI_LEADS_WEBHOOK_URL` | Where `/start` sign-ups are POSTed as JSON (the CRM, Zapier or Make). **Unset means sign-up is off.** The form then tells visitors to book a call instead, so no lead is silently lost. |
| `NEXT_PUBLIC_BOOKING_URL` | "Book a 30-min call" links (e.g. Cal.com). Unset means they go to `/start`. |
| `NEXT_PUBLIC_KIKAI_CRM_ORIGIN` + `NEXT_PUBLIC_KIKAI_WIDGET_SITE_ID` | Loads Kikai's own chat widget from the CRM, so the site's chat is a live demo. Both are needed. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots. |

## Before launch

Everything below is a `null` or empty value in `src/content/site.ts`. Until it's
filled in, the matching section shows a neutral fallback or hides itself, never
an invented number.

- **Prices:** `pricing.monthly`, `pricing.setup`, `pricing.phoneRate` and
  `pricing.contractTerm`. The price card reads "Priced per salon" until then,
  and the "How do I cancel?" FAQ is hidden.
- **Receptionist comparison:** `pricing.receptionistYear` and
  `pricing.kikaiYear`. Without them the headline is "Everything a receptionist
  does. For a fraction of the cost."
- **Salon count** for the line under the hero: `salonCount`.
- **Reviews:** real quotes with permission. The reviews section isn't built
  yet; add it once there are quotes.
- **Call recordings:** add `audio` (a file in `public/`) and `length` to each
  entry in `calls`. A play button appears on each card that has one.
- **Photography at 2048px or more.** The current images are 1024px, so they're
  soft on large screens. A portrait crop of the hero would also help phones.
- **Lead webhook, booking link and widget site id** (see Settings above).
- **Domain.** Set `NEXT_PUBLIC_SITE_URL`.

The website chatbot's prompt in the CRM (`prompts/main-site.md`) still says
"no setup fee" and "live within 48 hours". It should match this site: there
is a setup fee, and go-live takes about a week.

## Deploying

The plan is Vercel, kept separate from the netcup box that runs the live
receptionist. Import the repo, set the variables above, and every push gets
a preview URL.
