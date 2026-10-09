import { ArrowBendUpLeft } from "@phosphor-icons/react/ssr";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import assistantPhone from "../../public/images/assistant-phone.jpg";
import callsPhone from "../../public/images/screens/calls-phone.jpg";
import diaryPhone from "../../public/images/screens/diary-phone.jpg";
import inboxDesktop from "../../public/images/screens/inbox-desktop.jpg";
import { Reveal } from "./motion";
import { Container, Heading } from "./ui";

function Cell({ title, body, className = "", children }: { title: string; body: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-panel border border-line bg-raised ${className}`}>
      <div className="px-7 pt-7 sm:px-8 sm:pt-8">
        <h3 className="display text-[1.65rem] leading-[1.08]">{title}</h3>
        <p className="mt-2.5 max-w-[42ch] text-ink-soft">{body}</p>
      </div>
      {children}
    </div>
  );
}

/** A phone screenshot peeking up from the bottom of its cell. */
function PhoneShot({ src, alt, focus = "object-top" }: { src: StaticImageData; alt: string; focus?: string }) {
  return (
    <div className="mt-auto flex justify-center px-8 pt-8">
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        sizes="300px"
        className={`aspect-[10/11] w-full max-w-[300px] rounded-t-card border border-b-0 border-line object-cover shadow-lift ${focus}`}
      />
    </div>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-16 py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-[60ch]">
          <Heading id="features-heading" className="max-w-[13ch]">
            One desk for every channel.
          </Heading>
          <p className="mt-6 text-lg text-ink-soft">Calls, messages and bookings land in one place your whole team can see. These are real screens from Kikai.</p>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12" y={40}>
          <Cell
            title="Every message, one inbox"
            body="WhatsApp, Instagram, Facebook and your website chat, answered from your own price list and opening hours."
            className="md:col-span-2 lg:col-span-8 lg:row-span-2"
          >
            <div className="mt-auto pt-8 pl-7 sm:pl-8">
              <Image
                src={inboxDesktop}
                alt="Kikai’s Conversations inbox on a desktop: WhatsApp, Instagram and Messenger chats in one list, with a client’s question about gel nails answered from the salon’s price list"
                placeholder="blur"
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="aspect-[16/10] w-full rounded-tl-card border-t border-l border-line object-cover object-left-top"
              />
            </div>
          </Cell>

          <Cell
            title="Books into your real diary"
            body="Calls book, move and cancel appointments, with your hours, who does what and no double-booking."
            className="lg:col-span-4 lg:row-span-2"
          >
            <PhoneShot src={diaryPhone} alt="Kikai’s diary on a phone: one stylist’s Friday with a blow dry, a cut, a skin test and a full head colour" />
          </Cell>

          <Cell title="Every call as one line" body="Who rang, how long, and what happened. No recordings kept." className="lg:col-span-4">
            <PhoneShot src={callsPhone} alt="Kikai’s Call History on a phone: each call with its length and whether it booked or left a message" />
          </Cell>

          <Cell title="Run the desk by voice" body="Ask “what’s my afternoon like?” Nothing changes until you say yes." className="lg:col-span-4">
            <PhoneShot src={assistantPhone} alt="Kikai’s assistant open on a phone, ready to be asked about the day or told to book someone in" focus="object-bottom" />
          </Cell>

          <div className="night flex flex-col justify-between gap-10 rounded-panel bg-brand p-7 sm:p-8 md:col-span-2 lg:col-span-4">
            <span className="grid size-14 place-items-center rounded-full bg-accent text-on-accent">
              <ArrowBendUpLeft size={26} aria-hidden="true" />
            </span>
            <div>
              <h3 className="display text-[1.65rem] leading-[1.08] text-ink">Callbacks, not voicemail</h3>
              <p className="mt-2.5 max-w-[40ch] text-ink-soft">
                Asked for a person? It never transfers. You get a name, a number and what it’s about, ready to ring back.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
