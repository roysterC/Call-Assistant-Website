# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-10-15

Drafted from the website copy (`src/content/site.ts`, `trades.ts`, `services.ts`), the two READMEs, and decisions made in planning sessions. Anything marked **MISSING** is not known yet: never invent it in copy. Anything marked **(assumed)** is a reasonable guess to confirm on sales calls.

## Product Overview
**One-liner:** An AI receptionist for UK salons. It answers every call, books into your diary and replies on WhatsApp, Instagram, Facebook and your website.
**What it does:** Kikai answers the salon's existing phone number day and night in the salon's name, with a natural British voice, and books, moves or cancels appointments straight into the diary following the salon's hours, who does what and skin-test rules. The same receptionist replies on WhatsApp, Instagram, Facebook and website chat, all in one inbox. Owners get a Callbacks page for messages, Call History, a staff voice assistant ("move Sarah to half two") and takings reports by stylist and service.
**Product category:** AI receptionist for salons. Shelves customers search: "salon receptionist", "salon booking system", "answering service for salons", "missed calls salon".
**Product type:** Done-for-you SaaS. We build and set up the receptionist for each salon; the salon runs it from the Kikai app.
**Business model:** Priced per salon: one-off setup fee, monthly subscription, plus a per-minute phone-line rate. Amounts **MISSING** (`pricing` in `site.ts` is all null). Contract term **MISSING**.

## Target Audience
**Target companies:** Independent UK hair salons first (the only trade page today), then nail and beauty salons, then any appointment business that lives on the phone. Typically 1 to 10 chairs, owner-operated, no dedicated receptionist or one who can't cover evenings and weekends. **(assumed)**
**Decision-makers:** The salon owner, usually also a working stylist. One person decides and pays.
**Primary use case:** Stop losing bookings to unanswered calls while everyone is with a client or the salon is closed.
**Jobs to be done:**
- Answer the phone when my hands are full, so no booking goes to voicemail.
- Fill the diary in the evenings and on Sundays without me picking up.
- Cut no-shows with confirmations and day-before reminders.
- Keep all client messages (WhatsApp, Instagram, Facebook, web) in one place and answered.
**Use cases:**
- Saturday rush: two lines ringing, every chair full.
- 9pm Tuesday: a client wants Saturday; booked and texted before morning.
- "Can I speak to Sam?": takes a proper message for Callbacks, never transfers.
- Moving an appointment: finds it from the caller's number, reads it back, moves it on a yes.
- Owner on the go: asks the voice assistant what the afternoon looks like.

## Personas
B2C-like single buyer, so one persona with a second influencer.

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Salon owner (decision maker, also a stylist) | A full diary, fewer no-shows, not being chained to the phone | Can't answer mid-cut, misses evening and Sunday calls, juggles five inboxes | Every call answered and booked, every channel in one inbox, live in a week on the number clients already know |
| Front-of-house / senior stylist (influencer) | Not being interrupted, not making booking mistakes | Answering the phone with foils in, double bookings | Nobody puts the scissors down to answer; it follows who does what and never double-books |

## Problems & Pain Points
**Core problem:** The phone rings while everyone is with a client, or after closing, and the caller books somewhere else.
**Why alternatives fall short:**
- Booking apps (Fresha, Phorest, Timely, Booksy) take online bookings, but the phone still rings at the desk and plenty of clients still ring.
- Voicemail: most callers don't leave one; they ring the next salon. **(assumed)**
- A human receptionist covers opening hours only and is a full salary.
- Call-answering services take a message; they don't book into your diary or know your services.
**What it costs them:** Lost bookings from missed calls, gaps from no-shows, stylists' time spent on the phone. Exact figures **MISSING**: no data yet on missed-call rates or receptionist cost (`pricing.receptionistYear` is null).
**Emotional tension:** Guilt at ignoring a ringing phone mid-appointment; worry about the bookings they never hear about; evenings spent replying to DMs.

## Competitive Landscape
**Direct:** Other AI receptionists and AI phone agents. Fall short when they are generic (not built around salon rules like skin tests and who does what) or don't book into the salon's own diary.
**Secondary:** Booking apps with online booking (Fresha, Phorest, Timely, Booksy). Fall short because they don't answer the phone or reply across WhatsApp, Instagram and Facebook.
**Indirect:** A human receptionist, a call-answering service, voicemail, or the owner answering between clients. Fall short on hours, cost or attention.

## Differentiation
**Key differentiators:**
- Built for salons: follows hours, who does what, skin tests before colour, no double-booking.
- Books, moves and cancels, not just takes messages. Text confirmation goes out the moment it's booked; reminder the day before.
- Phone plus WhatsApp, Instagram, Facebook and website chat in one inbox.
- Keeps your number (call forwarding). Live in about a week.
- Done for you: we build it on your price list, team and rules, and move your clients across from your old system during setup.
- Honest by design: asks rather than guesses, quotes only "from" prices on your list, says plainly it's automated if asked, never transfers, keeps no call recordings.
**How we do it differently:** A receptionist set up for one salon's real rules, not a chatbot bolted onto a booking page.
**Why that's better:** The booking actually happens on the call, correctly, at any hour.
**Why customers choose us:** **MISSING** until the first salons are live. Expected: "I stopped missing calls" and "it books the right stylist". **(assumed)**

## Objections
| Objection | Response |
|-----------|----------|
| "My clients will hate talking to a robot." | Natural British voice, in your salon's name. It doesn't announce itself, says plainly that it's automated if asked, then keeps helping. |
| "It'll book the wrong thing." | It only offers a stylist for services they do, at times they're free, checks skin tests before colour, and reads bookings back before changing them. When it doesn't know, it takes a message. |
| "Switching systems is a nightmare." | We move your client list, notes and upcoming appointments across as part of setup. You keep your number. Live in about a week. |
| "What does it cost?" | **MISSING.** Until prices are set: "Priced per salon. Book a 30-min call and we'll quote." |
| "Are calls recorded?" | No. Each call is kept as one line: who rang, when, how long and what happened. |

**Anti-persona:** Large chains with central call centres and their own IT; salons that are walk-in only; anyone wanting call transfers to a person (it never transfers). **(assumed)**

## Switching Dynamics
**Push:** Missed calls mid-appointment, evening and Sunday voicemails, DMs piling up across apps, no-shows.
**Pull:** Every call answered and booked, one inbox, reminders, live in a week on the same number.
**Habit:** "We've always answered it ourselves"; existing booking app and its client history.
**Anxiety:** Losing client data in the move; clients disliking an AI; wrong bookings; being locked into a contract (term **MISSING**).

## Customer Language
**How they describe the problem:** **MISSING** (no interviews yet). Likely phrases to listen for: "I can't get to the phone", "we miss so many calls", "people book elsewhere", "I'm answering DMs at midnight". **(assumed)**
**How they describe us:** **MISSING.**
**Words to use:** front desk, diary, column, booked, callbacks, client, stylist, chair, skin test, "keep your number", "live in a week", "every call answered".
**Words to avoid:**
- "Seamless", "revolutionise", "elevate", "unleash", "next-gen": hype that salon owners skip, and the site never uses them.
- "Platform", "solution", "leverage": software-speak; say receptionist, diary, inbox.
- "Calendar" in salon copy: salons say diary (Google Calendar is fine when naming the integration).
- Long dashes in any copy (house style).
**Glossary:**
| Term | Meaning |
|------|---------|
| Diary | The salon's appointment book (Kikai's own, Google Calendar or Cal.com) |
| Callbacks | The page where messages the receptionist took wait for the salon |
| Call History | One line per call: who, when, how long, outcome |
| Personal assistant | The staff voice assistant in the app; changes nothing until you say yes |
| Booked / Left a message / Enquiry | The three call outcomes |

## Brand Voice
| Attribute | Means | Doesn't mean | Example line |
|-----------|-------|--------------|--------------|
| Plain-spoken | Short sentences, everyday British words | Blunt or cold | "Your new front desk." |
| Specific | Real scenes from a salon day | Jargon or stats we can't prove | "Nobody puts the scissors down to answer." |
| Honest | Says what it does and doesn't do | Hedging everything | "Am I talking to a real person? Says no, plainly, then keeps helping." |
| Warm | Sounds like a good receptionist | Cutesy or emoji-heavy | "Jess has half past two on Saturday. Shall I pop you in?" |

**Tone by context:**
- Support: calm, step by step, no blame.
- Launch: concrete about what's new; no superlatives.
- Errors: say what happened and what to do next.
- Sales: lead with the salon's day, not the technology.
- Social: one salon moment per post, a real screen or photo, one clear next step.
**Terms we own:** "Your new front desk", "Every call answered, every booking in the diary", "Switching is the easy part", "Fewer empty chairs".
**Never use (and why):** Invented numbers or reviews (none are real yet, and the site's rule is every claim is something Kikai does today); "free" for the 30-min call unless confirmed; "no setup fee" or "live in 48 hours" (out of date: there is a setup fee and go-live is about a week).

## Founder
**Who:** Roy, software engineer, based in Birmingham. Builds automation systems for front-office operations at an investment bank (AWS cloud and more). Don't name the bank.
**Origin moment (his words):** "Saw a real problem in a friend's busy salon: had to pick up the phone whilst mid-cut."
**Why it matters in copy:** The founder story is the strongest cold-audience angle we have (ad-creative: Founder Message, tier S). Lead with the salon moment; the engineering background is proof it's built to work every time, not the headline.
**Approved lines:** "Hi, I'm Roy." · "Then I watched a friend in a busy salon put the scissors down, mid-cut, to answer the phone." · "So I built Kikai." · "Built in Birmingham for UK salons."
**Still to get:** a photo of Roy, or a 30-second phone video.

## Proof Points
**Metrics:** Product facts only: calls answered 24/7; about 1 week from first call to live; 5 channels in one inbox; 0 call recordings kept. Customer results **MISSING**.
**Customers:** **MISSING** (`salonCount` is null).
**Testimonials:** **MISSING.** Real quotes only, with permission.
**Value themes:**
| Theme | Proof |
|-------|-------|
| Never miss a booking | Answers 24/7; books on the call; text confirmation sent at once |
| Fewer no-shows | Confirmation text plus a reminder the day before (real wording in `trades.ts`) |
| One inbox | Phone, WhatsApp, Instagram, Facebook, website chat |
| Easy switch | Keep your number; clients, notes and upcoming appointments moved during setup |
| Built on trusted tech | Claude by Anthropic, Deepgram, ElevenLabs, Twilio, WhatsApp Business |

## Goals
**Business goal:** Sign the first UK hair salons. **(assumed)**
**Conversion action:** Book a 30-min call (primary); online sign-up at /start (secondary).
**Current metrics:** **MISSING.**

## Paid Ads (optional)
Not running paid ads yet. Fill in before the first campaign.

## Learnings
*Decisions and tested lessons. Newest first. Keep it to about 20 active entries.*
| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| 2026-10-15 | Hold the strong SEO and AI-search push until Kikai has its own domain. | Owner decision; Google shows "Vercel" as the site name on the vercel.app address. | seo-audit, ai-seo, schema | active |
| 2026-10-14 | Logo is the navy K and KIKAI wordmark as supplied; the site stays olive. | Owner chose option A over a recoloured version. | All visual work | active |
| 2026-10 | Client migration is promised as done for us during setup, not as a self-serve import. | Owner decision; no import tool exists yet. | copywriting, ad-creative, sales | active |
| 2026-10 | Hair salons' top three pains: missed calls, client data transfer, no-shows. Colour-specific features were cut as low value. | Owner review of the hair salons page. | All salon copy | active |
| 2026-10 | Lead with hair salons; nails and beauty come next. | Owner targeting decision. | Targeting, trade pages | active |

## Changelog
*Newest first. One line per revision: what changed and why.*
- v2 (2026-10-15) — Added the Founder section (Roy, Birmingham, the mid-cut origin moment) for founder ads.
- v1 (2026-10-15) — Initial context, auto-drafted from the website copy, READMEs and planning decisions.
