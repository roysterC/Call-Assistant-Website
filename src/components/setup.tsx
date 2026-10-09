"use client";

import { CalendarCheck, PhoneTransfer, Storefront } from "@phosphor-icons/react/ssr";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { setup } from "@/content/site";
import { Reveal } from "./motion";
import { Container, Heading } from "./ui";

const icons = [Storefront, CalendarCheck, PhoneTransfer];

/** Three things between you and going live. The rail fills as you read down it. */
export function Setup() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="setup" aria-labelledby="setup-heading" className="scroll-mt-16 bg-sunk py-24 lg:py-32">
      <Container className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal>
          <Heading id="setup-heading" className="max-w-[11ch]">
            Live in about a week.
          </Heading>
          <p className="mt-6 max-w-[38ch] text-lg text-ink-soft">Keep your number. We set everything up with you, and there’s nothing to install.</p>
        </Reveal>

        <ol ref={list} className="relative flex flex-col gap-14 pl-20 sm:gap-16">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[27px] w-0.5 rounded-full bg-line-strong" />
          <motion.span aria-hidden="true" style={{ scaleY: fill }} className="absolute top-2 bottom-2 left-[27px] w-0.5 origin-top rounded-full bg-accent" />
          {setup.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} className="relative">
                <span className="absolute top-0 -left-20 grid size-14 place-items-center rounded-full border border-line-strong bg-raised text-ink">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="display pt-2 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.08]">{s.title}</h3>
                <p className="mt-3 max-w-[46ch] text-[17px] text-ink-soft">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
