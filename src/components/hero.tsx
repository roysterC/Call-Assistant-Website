import Image from "next/image";
import type { CSSProperties } from "react";
import heroSalon from "../../public/images/hero-salon.jpg";
import callsPhone from "../../public/images/screens/calls-phone.jpg";
import { ButtonLink, Container } from "./ui";

/*
 * The entrance is plain CSS (animate-mask, animate-fade-up in globals.css),
 * so it starts with the first paint instead of waiting for JavaScript, and
 * the global reduced-motion rule switches it off.
 */
const delay = (ms: number, rise?: string) => ({ animationDelay: `${ms}ms`, ...(rise && { "--rise": rise }) }) as CSSProperties;

/** One line of the headline, rising out of its own mask. */
function Line({ children, ms, className = "" }: { children: string; ms: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span style={delay(ms)} className={`block animate-mask ${className}`}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top">
      <Container className="grid items-center gap-x-14 gap-y-16 pt-10 pb-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:pt-16 lg:pb-24">
        <div className="flex flex-col items-start">
          <p style={delay(0)} className="animate-fade-up text-[15px] font-medium text-accent-text">
            For hair, nail and beauty salons
          </p>
          <h1 className="display mt-5 text-[clamp(2.6rem,5.4vw+0.5rem,5.4rem)]">
            <Line ms={80}>Hands full.</Line>
            <Line ms={180} className="text-accent-text">
              Phone answered.
            </Line>
          </h1>
          <p className="mt-7 max-w-[34ch] text-[19px] leading-relaxed text-ink-soft">
            An AI receptionist that answers every call, books straight into your diary and replies on WhatsApp, Instagram and Facebook.
          </p>
          <div style={delay(420)} className="mt-9 flex animate-fade-up flex-wrap gap-3">
            <ButtonLink href="/start">Get Kikai</ButtonLink>
            <ButtonLink href="/#day" variant="secondary">
              See a day with Kikai
            </ButtonLink>
          </div>
        </div>

        {/* The salon, and a real screenshot of what Kikai made of its phone. */}
        <div className="relative pb-10 pl-6 sm:pb-14 sm:pl-14 lg:pl-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-panel bg-photo">
            <Image
              src={heroSalon}
              alt="A stylist blow-drying a client’s hair in a bright salon while a phone lies on the reception counter"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover object-[62%_50%]"
            />
          </div>
          <div style={delay(550, "48px")} className="absolute bottom-0 left-0 w-[36%] max-w-[230px] min-w-[128px] animate-fade-up">
            <Image
              src={callsPhone}
              alt="Kikai’s Call History on a phone: each call as one line, with who rang, how long and whether it booked or left a message"
              placeholder="blur"
              sizes="230px"
              className="aspect-[9/15] w-full rounded-card border-4 border-raised object-cover object-top shadow-lift"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
