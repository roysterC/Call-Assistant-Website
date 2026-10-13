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
    "An AI receptionist for UK salons. Answers every call, books into your diary and replies on WhatsApp, Instagram, Facebook and your website.",
  // The CRM serves the login page and the legal pages Meta's review already points at.
  loginUrl: "https://89-58-45-110.nip.io/login",
  privacyUrl: "https://89-58-45-110.nip.io/privacy-policy",
  termsUrl: "https://89-58-45-110.nip.io/terms-of-service",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "/start",
};

export const pricing = {
  /** e.g. "£149". */
  monthly: null as string | null,
  /** One-off setup fee, e.g. "£299". There is one; the amount is still to come. */
  setup: null as string | null,
  /** Per-minute phone-line rate, e.g. "8p". */
  phoneRate: null as string | null,
  /** e.g. "Monthly rolling, cancel any time". */
  contractTerm: null as string | null,
  /** What a full-time receptionist costs a year, for the comparison, e.g. "£24,000". */
  receptionistYear: null as string | null,
  /** Kikai's yearly cost for the same comparison. */
  kikaiYear: null as string | null,
};

/** How many salons use Kikai. Hidden until it is real. */
export const salonCount: number | null = null;

export const valueTiles = [
  { title: "Answers every call", body: "Evenings, weekends, mid-foils." },
  { title: "Books into your diary", body: "With your rules, not a guess." },
  { title: "Every channel, one inbox", body: "Phone, WhatsApp, Instagram, Facebook, web." },
];

export const builtOn = ["Claude by Anthropic", "Deepgram", "ElevenLabs", "Twilio", "WhatsApp Business"];

export const features = [
  {
    title: "Answers every call, day and night",
    body: "In your salon’s name, with a natural British voice. It asks rather than guesses, and checks skin tests before colour.",
  },
  {
    title: "Books straight into your diary",
    body: "Your hours, who does what, and no double-booking. A text confirmation goes out the moment it’s booked.",
  },
  {
    title: "Takes proper messages",
    body: "Asked for a person? It takes a name, number and what it’s about, and puts it at the top of your Callbacks.",
  },
  {
    title: "Runs the desk from your pocket",
    body: "Ask “what’s my afternoon like?” or “move Sarah to half two”. Nothing changes until you say yes.",
  },
] as const;

export const included = [
  "Calls answered 24/7",
  "Bookings in your diary",
  "Text confirmations",
  "Callbacks page",
  "WhatsApp, Instagram, Facebook",
  "Chat on your website",
  "Staff voice assistant",
  "Takings by person and service",
];

export type Outcome = "Booked" | "Left a message" | "Enquiry";

export const calls: { question: string; answer: string; outcome: Outcome; length?: string; audio?: string }[] = [
  { question: "Do you do balayage?", answer: "Not on the price list, so it says so and offers highlights instead.", outcome: "Enquiry" },
  { question: "Can I speak to Sam?", answer: "Never transfers. Takes a proper message for Sam.", outcome: "Left a message" },
  { question: "Can I book a blow dry?", answer: "Asks: a wash and blow dry, or just a blow dry?", outcome: "Booked" },
  { question: "I’m pregnant. Is the colour safe?", answer: "That’s one for the stylist. Takes a callback.", outcome: "Left a message" },
  { question: "Am I talking to a real person?", answer: "Says no, plainly, then keeps helping.", outcome: "Booked" },
];

/** Real quotes only, with permission. The section hides itself while this is empty. */
export const reviews: { quote: string; name: string; salon: string }[] = [];

export const plan = [
  "Receptionist on your number, 24/7",
  "Bookings, moves and cancellations",
  "WhatsApp, Instagram, Facebook and web chat",
  "Callbacks and Call History",
  "Staff voice assistant",
  "Takings reports",
];

export const facts = [
  { value: "24/7", label: "Calls answered, nights and weekends included" },
  { value: "1 week", label: "From your first call with us to going live" },
  { value: "5", label: "Channels in one inbox" },
  { value: "0", label: "Call recordings kept" },
];

export const faqs: { q: string; a: string | null }[] = [
  { q: "Do I need a new phone number?", a: "No. You forward your existing number to Kikai. Clients ring the number they already know." },
  {
    q: "What happens when it doesn’t know the answer?",
    a: "It says so and takes a message for a callback. It only quotes what’s in your settings: prices, hours, team and your own FAQs.",
  },
  {
    q: "Can it really book appointments?",
    a: "Yes, straight into your Kikai diary, following your hours, who does what, skin tests and no double-booking.",
  },
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
