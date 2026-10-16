# Kikai pricing: proposal

Made with the **pricing** skill, reading `.agents/product-marketing.md` (v5). Status: **proposal**, not agreed. Market figures come from vendor sites and roundups found in October 2026; check any you rely on.

## The recommendation
| | Price |
|---|---|
| **Monthly, per salon** | **£149** |
| Setup, one-off | £199 (build on their price list, team and rules; move clients across; test together) |
| Included | Up to 600 call minutes and 500 texts a month, all channels, every feature |
| Above that | 8p a minute, 6p a text |
| Contract | Monthly rolling, cancel any time |
| Annual option | £1,490 a year (two months free) |
| **Founding salons (first three)** | Pilot month at half price (£75), setup fee waived, then £149 |

Add VAT only once Kikai is VAT-registered (required above £90,000 turnover).

## How the number was reached

### 1. The bucket
The skill's starting rule: about £10 a month for individuals, £100 for small-business tools, £1,000 for business-critical mid-market. Kikai sells to small businesses but does a job they'd otherwise pay a person for, so it sits at the top of the small-business bucket. Pricing at £29 to "reduce friction" is the trap the skill warns about: it attracts salons that won't stay and is hard to raise later.

### 2. The floor: the next-best alternative
| Alternative | What it costs | Gap |
|---|---|---|
| Part-time receptionist, 25 hours a week at £12.71 (2026 National Living Wage) | about £1,375 a month before employer costs | Opening hours only |
| Human answering service that can book (AllDayPA "Assist") | £220 a month for 200 minutes | Minute cap; doesn't run the diary |
| Salon AI receptionists (e.g. Treatwell from £69, Fresha AI Concierge £79.95, Alayic £89.99, Softomate from £299) | £69 to £299 a month | Most are add-ons to a booking system you also pay for |
| Booking software (Fresha, Booksy, Timely, Phorest) | about £15 to £99+ a month | No phone answering |

Kikai covers the receptionist **and** the booking system, inbox, reminders and takings reports. Booking software plus an AI receptionist comes to roughly £85 to £190 a month, so £149 sits inside the bundle range and far below a person.

### 3. The ceiling: the value
A women's cut and blow-dry costs about £25 to £65 outside London. Call it £45.
**£149 pays for itself if Kikai catches about four bookings a month** that would otherwise have gone to voicemail. A busy salon missing calls on a Saturday can lose that in one morning. That four-bookings line is the pricing argument for every sales conversation.

### 4. The cost to serve (a floor check, not the basis)
Estimated from the app's own usage rates (`call-assistant/src/lib/usage/cost.ts`) plus Twilio's UK rates:
- A call minute: speech-to-text 0.8¢, voice about 2¢, AI model about 0.5¢, phone line 1¢: **about 3.5p a minute.**
- A text: about 4 to 5p per segment. A confirmation should be one segment and a reminder two; today both are three (see below).
- A typical four-chair salon (about 300 call minutes and 350 texts a month): **roughly £40 a month.** A very busy salon: roughly £80.

At £149 that leaves a healthy margin, and the included allowances cap the heavy cases. These are estimates; check them against the real costs on the admin Usage page during the pilot.

**Cheap saving:** the confirmation and reminder texts open with the client's name followed by a long dash. That dash isn't in the standard SMS character set, so the whole text switches to the 70-characters-per-segment encoding. Measured on the real wording: the confirmation goes from 1 segment to 3, and the reminder from 2 to 3, so texts cost roughly twice what they should. Replacing the dash with a comma fixes it (`call-assistant/src/lib/sms.ts`, the `greeting` lines). The estimates above assume the fix.

## Packaging
One plan to start. Salon owners want one clear number, and two or three tiers before there's any data is guessing. Add a larger tier later, for salons with more than about eight chairs or several sites, once there are customers to learn from.

**Value metric:** per salon (per location), with generous call and text allowances. Per stylist was ruled out: Kikai's value comes from the calls, not the headcount, and per-seat pricing punishes growing salons.

## How to check the price is right
The skill's advice: pick a price you can learn from, then let buyers tell you.
1. Quote £149 to the first ten salons you speak to.
2. If most agree without pushing back, raise it to £179 for the next ten.
3. If most balk at the price itself (rather than the idea), test £119.
4. In each conversation ask the four price questions: at what price would it be **too expensive** to consider, **expensive but you'd still think about it**, **a bargain**, and **so cheap you'd doubt it works**? After 10 to 15 answers the overlap shows the acceptable range.

## Still to decide
- Your own figure, to compare against this one.
- Whether setup is £199, or higher once you've timed a real client migration.
