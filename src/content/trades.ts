/**
 * The /for/[trade] pages and the header's "Businesses" menu: one entry per
 * kind of business Kikai is sold to. Hair salons first; add an entry here
 * and the page, menu item, footer link and sitemap entry all appear.
 *
 * Same rule as site.ts: every claim is something Kikai does today. The calls
 * describe the receptionist's real behaviour (it asks rather than guesses,
 * quotes "from" prices only from the price list, never transfers), and the
 * text messages are the real confirmation and reminder wording from the CRM.
 */

import type { StaticImageData } from "next/image";
import blowDry from "../../public/images/hair/blow-dry.jpg";
import foils from "../../public/images/hair/foils.jpg";
import type { Outcome } from "./site";

export type Trade = {
  slug: string;
  /** The menu and footer label: "Hair salons". */
  label: string;
  /** One line under the label in the Businesses menu. */
  blurb: string;
  /** <title>, kept under about 60 characters. */
  title: string;
  description: string;
  h1: string;
  /** Under the headline: 20 words at most. */
  intro: string;
  hero: { image: StaticImageData; alt: string; call: string; booked: string };
  busy: {
    heading: string;
    image: StaticImageData;
    alt: string;
    moments: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
  };
  calls: { question: string; answer: string; outcome: Outcome }[];
  /** The confirmation and reminder texts shown under "Fewer empty chairs". */
  texts: { confirmation: string; reminder: string };
  faqs: { q: string; a: string }[];
};

export const trades: Trade[] = [
  {
    slug: "hair-salons",
    label: "Hair salons",
    blurb: "Every call answered, every stylist booked.",
    title: "AI receptionist for hair salons",
    description:
      "Kikai answers your hair salon’s phone day and night, books every client with the right stylist, and moves your clients across from your old system.",
    h1: "The AI receptionist for hair salons.",
    intro: "Kikai answers your salon phone day and night and books every client into the right stylist’s column.",
    hero: {
      image: blowDry,
      alt: "A stylist blow-drying a client’s long hair in a bright salon",
      call: "Can I get a cut and blow dry on Thursday?",
      booked: "Booked: Thu 10:00 with Jess",
    },
    busy: {
      heading: "Your hands are full. Kikai picks up.",
      image: foils,
      alt: "A stylist applying foils to a client while a phone rings on the station",
      moments: [
        { title: "Both hands busy", body: "Nobody puts the scissors down to answer. Every caller gets a proper answer, first time." },
        { title: "Evenings and Sundays", body: "Clients book when you’re closed. Those bookings go straight into the diary." },
        { title: "Saturday rush", body: "Two lines ringing and every chair full. Nobody gets voicemail." },
      ],
    },
    calls: [
      {
        question: "Can I book a blow dry with Jess on Saturday?",
        answer: "Checks Jess’s column, offers the times she has free and books the one they pick. A text confirmation goes out straight away.",
        outcome: "Booked",
      },
      {
        question: "Have you got anything after five on a weekday?",
        answer: "Checks every stylist who does that service and offers the earliest evening times they have free.",
        outcome: "Booked",
      },
      {
        question: "How much is a cut and finish?",
        answer: "Quotes the “from” price on your list and says the stylist confirms the final price.",
        outcome: "Enquiry",
      },
      {
        question: "Can I speak to Sam?",
        answer: "It never transfers. It takes a name, number and what it’s about, and puts it at the top of your Callbacks.",
        outcome: "Left a message",
      },
      {
        question: "I need to move my appointment.",
        answer: "Finds it from the number they’re ringing from, reads it back and moves it once they say yes.",
        outcome: "Booked",
      },
    ],
    texts: {
      confirmation:
        "Hi Amara, you’re booked in Thursday at 10:00 for a cut and blow dry with Jess. Booking no. 2148. Call us on 0113 496 0123 if that doesn’t suit. Fern Studio",
      reminder:
        "Hi Amara, a reminder you’re booked in tomorrow at 10:00 for a cut and blow dry with Jess. Booking no. 2148. Call us on 0113 496 0123 if that doesn’t suit. Fern Studio",
    },
    faqs: [
      { q: "Does it know which stylist does what?", a: "Yes. It only offers a stylist for services they do, at times they’re free." },
      { q: "Does it work with my diary?", a: "It books into Kikai’s own diary, Google Calendar or Cal.com." },
      { q: "Can it move or cancel appointments?", a: "Yes. It reads the booking back first and only changes it once the client says yes." },
      { q: "Do I need a new phone number?", a: "No. You forward your existing number, so clients ring the number they already know." },
      { q: "Are calls recorded?", a: "No. Each call is kept as one line: who rang, when, how long and what happened." },
    ],
  },
];

export const tradeBySlug = (slug: string) => trades.find((t) => t.slug === slug);

/** Moving a salon onto Kikai. Shared by every trade page: it's the same service. */
export const switching = {
  heading: "Switching is the easy part.",
  body: "We move your clients across from whatever you use now. Nothing gets lost, and nobody retypes a thing.",
  from: ["Fresha", "Phorest", "Timely", "Booksy", "A spreadsheet", "A paper diary"],
  moves: ["Client list and contact details", "Notes and visit history", "Upcoming appointments"],
  faq: {
    q: "Can you move my clients from my current system?",
    a: "Yes. We move your client list, notes and upcoming appointments across from whatever you use now, as part of setup.",
  },
};
