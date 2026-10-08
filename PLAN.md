# Kikai website: plan

Marketing site for **Kikai**, the AI receptionist and CRM in
[`roysterC/call-assistant`](https://github.com/roysterC/call-assistant).

Two design directions exist as claude.ai canvases:

- **"Clean Desk"** (canvas "Kikai Website"), the current lead. It's modelled on
  superpower.com: warm off-white with the app's olive, a big photo hero with tiles
  laid over it, numbered steps, a phone-mockup feature switcher, a single
  price card, a facts strip, an FAQ and a sign-up flow. See section 4b.
- **"Night Desk"** (canvas "Call Assistant Website"), kept for reference. It's
  dark and editorial, with expressive type. See section 4a.

## 1. Positioning

**Salon-first.** The product today is built around salons: stylists, skin tests,
the diary, takings. The site should sell that and not a generic "AI for SMEs".
Other trades can get their own landing pages later.

One line: *The receptionist that never puts the phone down.*

The proof points all come from what the product already does:

| Claim on the site | Where it lives in the CRM |
|---|---|
| Answers 24/7 in your salon's name and books into the real diary | Twilio → voice server (`src/voice-server`), booking rules in `salon-config.ts` |
| Hours, who-does-what, skin tests, no double-booking | Phone booking rules |
| Asks rather than guesses ("a blow dry?"), quotes "from" prices, never invents | `src/lib/salon-knowledge.ts`, `servicesLike` |
| Takes a proper message, never transfers or promises a time | `take_message` → Callbacks page |
| Every call ends as one line, with no recording or transcript kept | `receptionist/outcomes.ts`, `call-log.ts` |
| Phone, WhatsApp, Instagram, Facebook and website chat in one inbox | Conversations (three channel tables) |
| Staff voice assistant ("what's my afternoon like?"), takings | `/assistant`, `src/lib/takings.ts` |
| Live in a week, keep your number. There **is** a one-off setup fee. | Confirmed by the owner. `prompts/main-site.md` still says "no setup fee" and "48 hours" and needs fixing |

Nothing goes on the site without a source. Stats, testimonials and prices stay
`[PLACEHOLDER]` until real ones exist.

## 2. Sitemap

```
/                 Home (canvas: "Home — desktop", "Home — phone")
/hear-it          Interactive call demo, 5 scenarios + talk in browser (canvas: "Hear it")
/pricing          Single plan + FAQ (Clean Desk puts it on the home page too)
/start            Sign-up: your salon → your number → go live (canvas: "Get Kikai — step 1")
/salons           Deeper product tour: diary, callbacks, inbox, assistant, takings
/about            Who's behind it, UK, data handling
/blog/[slug]      MDX articles (SEO: "salon missed calls", "AI receptionist UK" …)
/privacy /terms   Reuse the CRM's policy text
```

Phase 2: `/vs/[competitor]` comparison pages and `/for/[trade]` vertical pages.

## 3. Tech stack

| Layer | Pick | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router) + React 19 + TypeScript** | Same as the CRM, so one mental model and shared tokens. Mostly static pages (SSG), with `next/og` for share images and `next/font` for self-hosted fonts. |
| Styling | **Tailwind CSS 4** with `@theme` tokens | Matches the CRM. The style tile's tokens map 1:1. |
| Motion | **GSAP 3 + ScrollTrigger + SplitText** for scroll choreography, **Motion** (motion.dev) for component state | GSAP is free (all plugins) and still the best tool for pinned, scrubbed sections. Motion covers React enter/exit. |
| Smooth scroll | **Lenis** | The standard on award-site builds. Disabled under `prefers-reduced-motion`. |
| Voice visual | Canvas 2D + **Web Audio AnalyserNode** | The waveform reacts to the real demo audio. No WebGL/three.js needed, which keeps the page light. |
| Content | **MDX via Content Collections** (or Velite) | Blog and case studies in-repo, typed. Move to Sanity only if non-developers need to edit. |
| UI primitives | **Radix / shadcn** for forms, dialog, accordion | Accessible. Same as the CRM. |
| Forms / leads | Server Action → CRM's existing website-lead path (`upsertWebsiteLead`) or a new public `/api/public/leads` | Leads land in the same CRM the team already uses. |
| Live chat | **The product's own widget** (`public/widget.js`, `data-site-id`) with the "Monty" prompt | Dogfooding: the site's chat *is* the product demo. |
| Demo booking | **Cal.com** embed | Free, and it handles time zones and reminders. |
| Analytics | **Plausible** (or self-hosted Umami) | Cookie-less, so no consent banner. Fits the "privacy-first" message. |
| Hosting | **Vercel** | Preview URL per PR and edge CDN. It also keeps marketing traffic **off the netcup box** that runs the live receptionist (3.8 GB RAM, builds already need a raised heap). |
| Quality | Playwright smoke tests, **Lighthouse CI** budgets, ESLint/Prettier | Award-style sites are easy to make slow, so budgets block regressions. |

Budgets: LCP < 2.0s on 4G, CLS < 0.05, JS < 150 KB gz on the home page,
Lighthouse a11y ≥ 95.

## 4b. Design direction: "Clean Desk" (current)

Modelled on the *structure and feel* of superpower.com. None of its assets,
copy or proprietary type are used.

- **Look: the Olive palette, chosen to match the Kikai app.** Warm off-white
  `#fbfaf6` ground, `#f3f1ea` cards, olive `#3f4a26` buttons, logo and closing
  section, `#1f2414` text, `#646a58` muted text, blush `#f2dcd2` highlights
  (the "Booked" chips) and a pale olive tint `#eceee2` for feature panels. Radii
  are 12, 20 and 28, and all buttons are pills. (Blush, Cobalt, Sage and
  Vermillion are kept on the canvas for comparison only.)
- **Photography:** generated images: a hero of a stylist mid-blow-dry with a
  phone on the counter, plus product shots of the diary on a desktop and the
  assistant on a phone. The headline sits *above* the hero photo, not over it,
  so it stays readable. Production needs 2048px+ versions and a portrait crop.
- **Type:** Geist for everything (light, large, tight headlines at −4.5%), with
  Geist Mono for labels and times. It's the same family as the CRM.
- **Home, in order:** nav → headline row ("Live in a week · Keep your number")
  → rounded hero photo with a floating "Kikai answered → Booked" card → three
  value tiles and an avatar row →
  "Built on" bar (Claude, Deepgram, ElevenLabs, Twilio, WhatsApp Business) →
  "How Kikai works" in four steps with mini UI → "One diary, on the desk and in
  your pocket" (the two product shots) → 01–04 feature switcher driving
  a phone mockup → receptionist-vs-Kikai price comparison → five "awkward
  call" audio cards → review carousel → one price card (monthly price plus a
  one-off setup fee) → facts strip (24/7, 1 week to go live, 5 channels,
  0 recordings) → FAQ accordion → olive closing CTA →
  footer with a newsletter signup.
- **Sign-up flow** (`/start`): your salon, then your number, then go live. A
  summary card updates live as you pick.
- **Assets needed:** the hero video (a stylist at work while the phone lights
  up), recorded audio for the five calls, real reviews and prices.

## 4a. Design direction: "Night Desk" (reference)

- **Mood:** the salon after close, with the phone still lit up. Dark olive-black
  ground, cream type, a single acid-lime accent. It grows out of the CRM's own
  olive `#2d331a` and cream `#fbfbf4`, so the product and the site feel related.
- **Type:** Bricolage Grotesque 800 for display (tight, −5% tracking). One phrase
  per heading in Instrument Serif italic, "the human bit". Geist for body text,
  Geist Mono for times, durations and labels.
- **Signature moment:** the live-call card. A waveform plays while the
  transcript builds, then a lime "Booked" chip lands. It's repeated on `/hear-it`
  with real recorded audio.
- **Rhythm:** dark → lime marquee band (tilted) → cream section → dark. An
  oversized wordmark bleeds off the footer.
- **Accessibility:** real buttons and links, ≥44px targets, 4.5:1 contrast,
  everything static under reduced motion.

## 5. Build phases

| Phase | Scope | Est. |
|---|---|---|
| 0 | Sign off the canvas direction. Collect real content: testimonial, prices, demo number, audio clips | owner |
| 1 | Scaffold (Next 16, Tailwind 4, tokens, fonts, Lenis/GSAP), layout, nav/footer, deploy to Vercel | 1–2 days |
| 2 | Home page with full motion. Pricing. Privacy/Terms | 3–4 days |
| 3 | `/hear-it`: scenario player with recorded audio and Web-Audio waveform | 2 days |
| 4 | Chat widget embed, Cal.com, lead form → CRM, Plausible | 1 day |
| 5 | MDX blog, OG images, sitemap/robots, schema.org `SoftwareApplication` | 1–2 days |
| 6 | "Talk in your browser": mic → voice server `/voice` with a demo salon, rate-limited and time-boxed | 2–3 days |
| 7 | Lighthouse/Playwright CI, polish, then submit to Godly / Awwwards / SiteInspire | ongoing |

## 6. Open questions

1. Domain for Kikai? (`call.doaisystems.co.uk` still points at the retired
   Hetzner box.)
2. Salon-only, or a parallel generic SME page from day one?
3. Real pricing and plan split (the canvas shows 3 tiers as a placeholder).
4. Can a launch salon be named, and quoted, on the site?
5. Is browser-voice demo cost acceptable (Deepgram + ElevenLabs + Anthropic per minute)?
