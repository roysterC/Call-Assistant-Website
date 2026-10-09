/**
 * Every claim and number on the site lives here, so the copy can be checked
 * against what the product actually does in one place.
 *
 * `null` means "we don't have the real figure yet": the section that needs it
 * shows a neutral fallback or hides itself, rather than a made-up number.
 * README.md lists what is still missing before launch.
 */

export const site = {
  name: "Kikai",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kikai.example",
  description:
    "An AI receptionist for hair, nail and beauty salons in the UK. Answers every call, books into your diary and replies on WhatsApp, Instagram, Facebook and your website.",
  // The CRM serves the login page and the legal pages Meta's review already points at.
  loginUrl: "https://89-58-45-110.nip.io/login",
  privacyUrl: "https://89-58-45-110.nip.io/privacy-policy",
  termsUrl: "https://89-58-45-110.nip.io/terms-of-service",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "/start",
};

/** The main nav, also listed in the footer. */
export const navLinks = [
  { href: "/#day", label: "A day with Kikai" },
  { href: "/#features", label: "What it does" },
  { href: "/#setup", label: "Setup" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
];

export const pricing = {
  /** e.g. "£149". */
  monthly: null as string | null,
  /** One-off setup fee, e.g. "£299". There is one; the amount is still to come. */
  setup: null as string | null,
  /** Per-minute phone-line rate, e.g. "8p". */
  phoneRate: null as string | null,
  /** e.g. "Monthly rolling, cancel any time". */
  contractTerm: null as string | null,
};

export const facts = [
  { value: "24/7", label: "Calls answered, nights and weekends included" },
  { value: "1 week", label: "From your first call with us to going live" },
  { value: "5", label: "Channels in one inbox" },
  { value: "0", label: "Call recordings kept" },
];

export type Channel = "Phone" | "WhatsApp" | "Instagram" | "Facebook" | "Website chat";
export type Outcome = "Booked" | "Left a message" | "Enquiry";

/**
 * One day at a salon's front desk, in the order it happens. Each moment is
 * something the product does today (see PLAN.md for where in the CRM).
 * `night` moments happen after the salon has shut.
 */
export const day: { time: string; when: string; channel: Channel; said: string; did: string; outcome: Outcome; night?: boolean }[] = [
  {
    time: "09:12",
    when: "You’re mid-foils",
    channel: "Phone",
    said: "Can I book a cut and blow dry for Saturday?",
    did: "Asks who they’d like, finds Jess free at half two and books it. A text confirmation goes out straight away.",
    outcome: "Booked",
  },
  {
    time: "11:40",
    when: "Back-to-back blow dries",
    channel: "WhatsApp",
    said: "Do you do gel nails? How much is it?",
    did: "Answers from your price list: from £30, about 45 minutes. Then gives your number to book, or takes theirs for the team.",
    outcome: "Enquiry",
  },
  {
    time: "13:05",
    when: "The lunch rush",
    channel: "Phone",
    said: "Can I speak to Sam?",
    did: "Never transfers. Takes a name, number and what it’s about, and puts it at the top of your Callbacks.",
    outcome: "Left a message",
  },
  {
    time: "16:30",
    when: "School-run hour",
    channel: "Instagram",
    said: "Do you do lash lifts? Never had one before.",
    did: "Quotes your “from” price, explains a first visit needs a patch test, and passes their name and number to the team.",
    outcome: "Left a message",
  },
  {
    time: "21:14",
    when: "The salon’s shut",
    channel: "Phone",
    said: "Anything for gel nails tomorrow afternoon?",
    did: "Tom’s free at half one. Booked and confirmed by text while you’re at home.",
    outcome: "Booked",
    night: true,
  },
  {
    time: "02:47",
    when: "Everyone’s asleep",
    channel: "Website chat",
    said: "Do you do balayage?",
    did: "It isn’t on your price list, so it says so and suggests highlights instead. It never makes things up.",
    outcome: "Enquiry",
    night: true,
  },
];

/** How it behaves when a call gets awkward. */
export const principles = [
  { rule: "It asks rather than guesses.", example: "“A blow dry?” A wash and blow dry, or just the blow dry?" },
  { rule: "It only says what you’ve told it.", example: "Prices, hours, team and your own answers. Nothing invented." },
  { rule: "It knows when it’s one for you.", example: "“I’m pregnant. Is the colour safe?” That’s a callback for your stylist." },
  { rule: "It’s honest about what it is.", example: "Ask if it’s a real person and it says no, plainly, then keeps helping." },
];

export const setup = [
  { title: "Tell us how your salon works", body: "Your price list, your team, your hours and the rules your desk works to." },
  { title: "We build it and test it with you", body: "It answers in your salon’s name and knows only what you’ve told it." },
  { title: "Forward your number", body: "Clients ring the number they already know. One line of code adds chat to your website." },
];

export const plan = [
  "Receptionist on your number, 24/7",
  "Bookings, moves and cancellations",
  "WhatsApp, Instagram, Facebook and web chat",
  "Callbacks and Call History",
  "Staff voice assistant",
  "Takings reports",
];

export const faqs: { q: string; a: string | null }[] = [
  { q: "Do I need a new phone number?", a: "No. You forward your existing number to Kikai. Clients ring the number they already know." },
  {
    q: "What happens when it doesn’t know the answer?",
    a: "It says so and takes a message for a callback. It only quotes what’s in your settings: prices, hours, team and your own FAQs.",
  },
  {
    q: "Can it really book appointments?",
    a: "Yes, straight into your Kikai diary, following your hours, who does what, patch tests and no double-booking.",
  },
  { q: "Does it work for nail and beauty salons?", a: "Yes. It works from your own price list and team, whether that’s cuts and colour, gel nails or lash lifts." },
  { q: "Are calls recorded?", a: "No. Each call is kept as one line: who rang, when, how long and what happened." },
  {
    q: "Will callers know it’s not a person?",
    a: "It doesn’t announce itself, but if anyone asks, it says plainly that it’s the salon’s automated receptionist, then carries on helping.",
  },
  {
    q: "Is there a setup fee?",
    a: "Yes, a one-off fee. We build your receptionist on your price list, team and rules, test it with you, and you’re live in about a week.",
  },
  { q: "How do I cancel?", a: pricing.contractTerm },
];
