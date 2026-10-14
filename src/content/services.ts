/**
 * The /services/[service] pages and the header's "Services" menu.
 *
 * Same rule as site.ts: every claim is something the CRM does today. The
 * screenshots are of the CRM running locally with the invented demo salon
 * "Fern Studio" (made-up clients, Ofcom's 07700 900xxx drama numbers).
 */

import type { StaticImageData } from "next/image";
import assistantPhone from "../../public/images/assistant-phone.jpg";
import diaryDesktop from "../../public/images/diary-desktop.jpg";
import callbacksDesktop from "../../public/images/screens/callbacks-desktop.jpg";
import callsDesktop from "../../public/images/screens/calls-desktop.jpg";
import callsPhone from "../../public/images/screens/calls-phone.jpg";
import clientPanel from "../../public/images/screens/client-panel.jpg";
import diaryPhone from "../../public/images/screens/diary-phone.jpg";
import inboxDesktop from "../../public/images/screens/inbox-desktop.jpg";
import inboxPhone from "../../public/images/screens/inbox-phone.jpg";
import salesDesktop from "../../public/images/screens/sales-desktop.jpg";
import salesPhone from "../../public/images/screens/sales-phone.jpg";
import { switching } from "./trades";

export type ServiceIcon = "phone" | "calendar" | "microphone" | "chats" | "chart";

type Shot = { image: StaticImageData; alt: string; /** CSS object-position for the crop. */ position?: string };

export type Service = {
  slug: string;
  name: string;
  icon: ServiceIcon;
  /** The menu's line under the name. */
  value: string;
  /** The phone menu and the "works with" links: a few words. */
  short: string;
  title: string;
  description: string;
  /** One entry per line on wide screens: two at most, so it stays a two-line headline. */
  h1: [string] | [string, string];
  /** Under the headline: 20 words at most. */
  intro: string;
  /** "desktop" frames a wide screenshot; "phone" stands a phone screenshot in a bezel. */
  hero: Shot & { kind: "desktop" | "phone" };
  values: {
    heading: string;
    feature: Shot & { title: string; body: string };
    others: [{ title: string; body: string }, { title: string; body: string }];
  };
  details: { heading: string; phone: Shot; items: { lead: string; body: string }[] };
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-receptionist",
    name: "AI receptionist",
    icon: "phone",
    value: "Answers every call, day and night, in your salon’s name and books straight into the diary.",
    short: "Every call answered and booked.",
    title: "AI receptionist for salons",
    description:
      "Kikai’s AI receptionist answers your salon’s phone day and night, books straight into the diary and takes proper messages. Keep your number.",
    h1: ["Every call answered.", "Every booking in the diary."],
    intro: "Kikai answers your salon’s number day and night, in your salon’s name, and books straight into the diary.",
    hero: { kind: "desktop", image: callsDesktop, alt: "Call History in Kikai: one line per call, with what happened" },
    values: {
      heading: "What it does for your salon",
      feature: {
        title: "Never loses a message",
        body: "Asked for someone? It takes a name, number and reason, and puts it at the top of Callbacks.",
        image: callbacksDesktop,
        alt: "The Callbacks page with two messages waiting",
      },
      others: [
        { title: "Answers in your salon’s name", body: "A natural British voice that knows your prices, team and hours, and says only what you’ve told it." },
        { title: "Books, moves and cancels", body: "Checks the diary, offers real times and texts a confirmation the moment it’s booked." },
      ],
    },
    details: {
      heading: "Built for a busy salon phone",
      phone: { image: callsPhone, alt: "Call History on a phone" },
      items: [
        { lead: "Keep your number.", body: "Forward it to Kikai, and clients ring the number they already know." },
        { lead: "Asks rather than guesses.", body: "If a request could mean two services, it asks which one." },
        { lead: "Only your prices.", body: "It quotes “from” prices from your list and never invents one." },
        { lead: "Honest when asked.", body: "If a caller asks, it says plainly it’s the salon’s automated receptionist." },
        { lead: "No recordings.", body: "Every call is kept as one line in Call History." },
      ],
    },
    faqs: [
      { q: "Do I need a new phone number?", a: "No. You forward your existing number to Kikai. Clients ring the number they already know." },
      { q: "What happens when it doesn’t know the answer?", a: "It says so and takes a message for a callback. It only quotes what’s in your settings." },
      { q: "Are calls recorded?", a: "No. Each call is kept as one line: who rang, when, how long and what happened." },
      {
        q: "Will callers know it’s not a person?",
        a: "It doesn’t announce itself, but if anyone asks, it says plainly that it’s automated, then carries on helping.",
      },
    ],
  },
  {
    slug: "booking-system",
    name: "Booking system",
    icon: "calendar",
    value: "One diary for the whole team. Knows who does what, never double-books, and texts every client.",
    short: "One diary, no double bookings.",
    title: "Salon booking system",
    description:
      "One diary for the whole salon: every stylist’s column, no double bookings, text confirmations and reminders, and every client’s history on one page.",
    h1: ["One diary for the whole salon."],
    intro: "Every stylist’s column in one place. Kikai knows who does what and never double-books.",
    hero: { kind: "desktop", image: diaryDesktop, alt: "The Kikai diary with a column for each stylist" },
    values: {
      heading: "Less admin, fewer gaps",
      feature: {
        title: "Every client’s history",
        body: "Visits, notes and patch tests on one page, ready the moment they ring.",
        image: clientPanel,
        alt: "A client’s page with their patch test, notes and bookings",
      },
      others: [
        { title: "Knows who does what", body: "Each stylist’s services and working days, so nobody is booked for work they don’t do." },
        { title: "Texts every client", body: "A confirmation when it’s booked and a reminder the day before." },
      ],
    },
    details: {
      heading: "A diary that keeps up",
      phone: { image: diaryPhone, alt: "The diary on a phone" },
      items: [
        { lead: "One diary, every channel.", body: "Bookings from calls, WhatsApp and Instagram land in the same place." },
        { lead: "Block time.", body: "Breaks, training and holidays stay free of bookings." },
        { lead: "Colour-coded.", body: "Cutting, colour, finishing and treatments at a glance." },
        { lead: "Desk or phone.", body: "The same diary on the salon computer and in your pocket." },
        { lead: "Your calendar, if you prefer.", body: "Kikai can book into Google Calendar or Cal.com instead." },
      ],
    },
    faqs: [
      switching.faq,
      { q: "Can I keep using Google Calendar?", a: "Yes. Kikai can book into Google Calendar or Cal.com instead of its own diary." },
      { q: "Do clients get reminders?", a: "Yes. A text confirmation when they book and a reminder the day before." },
      { q: "Can it stop double bookings?", a: "Yes. It checks each stylist’s column before anything is booked." },
    ],
  },
  {
    slug: "personal-assistant",
    name: "Personal assistant",
    icon: "microphone",
    value: "Ask “what’s my afternoon like?” or “move Sarah to half two”. Nothing changes until you say yes.",
    short: "Run the desk by voice.",
    title: "Personal assistant for salon owners",
    description:
      "Ask Kikai about your day, your clients or your takings, and book, move or cancel by voice. Nothing changes until you say yes.",
    h1: ["Your front desk,", "in your pocket."],
    intro: "Ask about your day, then book, move or cancel by voice. Nothing changes until you say yes.",
    hero: { kind: "phone", image: assistantPhone, alt: "The personal assistant drafting a booking on a phone" },
    values: {
      heading: "Ask it like you’d ask the desk",
      feature: {
        title: "Does the busywork",
        body: "Book, move or cancel, add a note, or text a client. It drafts a card and you tap yes.",
        image: diaryDesktop,
        alt: "The diary the assistant books into",
      },
      others: [
        { title: "Answers in seconds", body: "“What’s my afternoon like?” “When was Sarah last in?” Asked out loud, answered out loud." },
        { title: "Knows your numbers", body: "“How much did we take last week?” Takings by stylist and service, on request." },
      ],
    },
    details: {
      heading: "Made for hands that are busy",
      phone: { image: assistantPhone, alt: "The assistant on a phone" },
      items: [
        { lead: "Desk or phone.", body: "The same assistant at the front desk and in your pocket." },
        { lead: "Hands-free.", body: "Start it from Siri or Google Assistant without touching the screen." },
        { lead: "Same rules as the phone line.", body: "Your hours, who does what and no double-booking." },
        { lead: "You stay in charge.", body: "Every change waits for a yes. Only owners can text clients." },
        { lead: "Speaks or stays quiet.", body: "Replies are read aloud in a British voice, or switched off." },
      ],
    },
    faqs: [
      {
        q: "Can it change bookings by itself?",
        a: "No. It drafts a card showing exactly what will change, and nothing happens until you say yes or tap it.",
      },
      { q: "Does it work hands-free?", a: "Yes. You can start it from Siri or Google Assistant, and it listens straight away." },
      { q: "What can it answer?", a: "Your day, who is free when, a client’s last visit, your messages and your takings." },
    ],
  },
  {
    slug: "reply-inbox-and-crm",
    name: "Reply inbox and CRM",
    icon: "chats",
    value: "WhatsApp, Instagram, Facebook and web chat in one inbox, with every client’s history on one page.",
    short: "Every message, every client, one place.",
    title: "Salon inbox and CRM",
    description:
      "WhatsApp, Instagram, Facebook and website chat in one inbox, answered for you from your price list, with a page for every client.",
    h1: ["Every message answered.", "Every client remembered."],
    intro: "WhatsApp, Instagram, Facebook and website chat in one inbox, answered for you from your price list.",
    hero: { kind: "desktop", image: inboxDesktop, alt: "The Kikai inbox with a WhatsApp booking open" },
    values: {
      heading: "One place for every conversation",
      feature: {
        title: "A page for every client",
        body: "Contact details, visits, notes and patch tests, whichever channel they came from.",
        image: clientPanel,
        alt: "A client’s page with their patch test, notes and bookings",
      },
      others: [
        { title: "One inbox", body: "Every channel in one list, filtered by channel, unread or starred." },
        { title: "Replies for you", body: "Prices, opening hours and bookings answered day and night, in your salon’s voice." },
      ],
    },
    details: {
      heading: "Answers that turn into bookings",
      phone: { image: inboxPhone, alt: "A WhatsApp booking in the inbox on a phone" },
      items: [
        { lead: "Books from a DM.", body: "A client asks on Instagram, Kikai checks the diary and books them in." },
        { lead: "Step in any time.", body: "Open the thread and reply yourself whenever you want." },
        { lead: "Star what matters.", body: "Keep the conversations you need to follow up." },
        { lead: "Chat on your website.", body: "One line of code adds Kikai to your own site." },
        { lead: "Only your prices.", body: "It never quotes a price that isn’t on your list." },
      ],
    },
    faqs: [
      { q: "Which channels does it answer?", a: "WhatsApp, Instagram, Facebook Messenger and a chat box on your website." },
      { q: "Can I reply myself?", a: "Yes. Every thread is in the inbox, and you can read and reply whenever you like." },
      { q: "Can it book from Instagram?", a: "Yes. It checks the diary and books the client in, the same as on the phone." },
      switching.faq,
    ],
  },
  {
    slug: "sales-reports",
    name: "Sales reports",
    icon: "chart",
    value: "What you took and what’s still booked, by day, week or month, by stylist and service.",
    short: "Takings by stylist and service.",
    title: "Salon sales reports",
    description:
      "Takings by day, week, month or year, by stylist and service. What you took and what’s still booked, kept apart, with no-shows listed.",
    h1: ["Know what you took.", "Know what’s coming."],
    intro: "Takings by day, week, month or year, by stylist and service, with no-shows counted separately.",
    hero: { kind: "desktop", image: salesDesktop, alt: "The Sales report: taken, still booked, average and no-shows" },
    values: {
      heading: "Numbers you can run a salon on",
      feature: {
        title: "Who’s busiest, at a glance",
        body: "Takings for each stylist, side by side, for any day, week, month or year.",
        image: salesDesktop,
        alt: "Takings by stylist in the Sales report",
        position: "18% 24%",
      },
      others: [
        { title: "Taken and still booked, kept apart", body: "Money that changed hands and what’s in the diary, never added together." },
        { title: "No-shows in plain sight", body: "Listed every period, so you can see what they cost." },
      ],
    },
    details: {
      heading: "Every figure, one tap away",
      phone: { image: salesPhone, alt: "The Sales report on a phone" },
      items: [
        { lead: "By stylist and service.", body: "See who’s busiest and which services earn most." },
        { lead: "Day, week, month or year.", body: "Switch the period with a tap, and step back to compare." },
        { lead: "Average per appointment.", body: "What a finished appointment is worth to you." },
        { lead: "Every appointment listed.", body: "Sort by client, stylist or amount." },
        { lead: "Just ask.", body: "“How much did we take last week?” The assistant reads out the same figures." },
      ],
    },
    faqs: [
      {
        q: "Where do the numbers come from?",
        a: "From your diary. When an appointment is finished, the desk records what was paid, and the report does the rest.",
      },
      { q: "Are no-shows in the totals?", a: "No. They’re listed so you can see them, but they count towards neither total." },
      { q: "Can I see last year?", a: "Yes. Switch to Year and step back one period at a time." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
