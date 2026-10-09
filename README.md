# Kikai website

The marketing site for Kikai, the AI receptionist for hair, nail and beauty
salons in the UK. The product itself (the CRM, receptionist and chat bots)
lives in [`roysterC/call-assistant`](https://github.com/roysterC/call-assistant).
[PLAN.md](PLAN.md) has the original positioning and roadmap; this version of
the site ("day and night", below) replaces the "Clean Desk" layout it describes.

## Run it

Node 22+.

```bash
cp .env.example .env.local   # all optional; see below
npm install
npm run dev                  # http://localhost:3000
```

Before pushing: `npm run typecheck && npm run lint && npm run build`.

## Stack

Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS 4, the same
versions as the CRM. Motion (`motion/react`) for scroll-linked movement,
Phosphor for icons. Type is Bricolage Grotesque for headlines (self-hosted in
`src/app/fonts/`, SIL Open Font License) and Geist for everything else. The site
is static except for one route handler, `/api/lead`.

```
src/app/            pages: / (home), /start (sign-up), /api/lead, sitemap, robots, icon
src/components/     one file per section of the home page, plus ui.tsx and motion.tsx
src/content/site.ts every claim, figure and FAQ on the site
public/images/      hero photography, plus real screenshots of the CRM
```

### Design: "day and night"

The home page follows a salon's phone through one day. "A day at your front
desk" pins a clock on wide screens while six real situations scroll past, and
the page turns to night once the salon has shut. Every colour comes from the
`@theme` block in `src/app/globals.css`: a cool chalk ground, olive-black ink,
the app's brand olive for the logo, and one accent, a nail-polish red, for
buttons and anything booked. The `.night` scope reuses the dark-mode values,
so after-hours sections look the same whatever the visitor's system setting.
Movement is switched off for visitors who prefer reduced motion.

The product images (`diary-desktop.jpg`, `assistant-phone.jpg` and
`screens/`) are screenshots of the CRM running locally with an invented demo
salon, "Fern Studio": made-up clients and Ofcom's drama-reserved numbers
(07700 900xxx, 0113 496 0xxx), never a real salon's data. Retake them when the
CRM's screens change.

Keep the copy to what the product does. In particular, only the phone
receptionist books, moves and cancels appointments. The WhatsApp, Instagram,
Facebook and website bots answer from the salon's settings and take a name and
number for the team; they can't see the diary (`src/lib/salon-knowledge.ts` in
the CRM).

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
- **Reviews:** real quotes with permission. There's no reviews section yet;
  add one once there are quotes.
- **Photography at 2048px or more.** The hero photo is 1024px, so it's soft on
  large screens. The site now speaks to nail and beauty salons too, and a nail
  or lash photo would show that better than copy can.
- **Lead webhook, booking link and widget site id** (see Settings above).
- **Domain.** Set `NEXT_PUBLIC_SITE_URL`.

The website chatbot's prompt in the CRM (`prompts/main-site.md`) still says
"no setup fee" and "live within 48 hours". It should match this site: there
is a setup fee, and go-live takes about a week.

## Deploying

The plan is Vercel, kept separate from the netcup box that runs the live
receptionist. Import the repo, set the variables above, and every push gets
a preview URL.
