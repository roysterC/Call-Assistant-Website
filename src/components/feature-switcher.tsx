"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import assistantPhone from "../../public/images/assistant-phone.jpg";
import callbacksPhone from "../../public/images/screens/callbacks-phone.jpg";
import callsPhone from "../../public/images/screens/calls-phone.jpg";
import diaryPhone from "../../public/images/screens/diary-phone.jpg";
import { features } from "@/content/site";
import { Container, SectionHeading } from "./ui";

/** Real screenshots of Kikai on a phone, one per feature, in the same order. */
const screens: { src: StaticImageData; alt: string; focus: string }[] = [
  {
    src: callsPhone,
    alt: "Kikai’s Call History on a phone: each call as one line with who rang, how long and what happened, booked or left a message",
    focus: "object-top",
  },
  {
    src: diaryPhone,
    alt: "Kikai’s diary on a phone showing one stylist’s Friday, with a cut and blow dry, a skin test and a full head colour",
    focus: "object-top",
  },
  {
    src: callbacksPhone,
    alt: "Kikai’s Callbacks on a phone: three callers waiting to be rung back, with a note on what each one is about",
    focus: "object-top",
  },
  {
    src: assistantPhone,
    alt: "Kikai’s assistant open on a phone, ready to be asked “What’s my afternoon looking like?” or told to book someone in",
    focus: "object-bottom",
  },
];

export function FeatureSwitcher() {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  return (
    <section id="handles" className="reveal scroll-mt-6 py-28">
      <Container className="grid grid-cols-1 items-center gap-x-20 gap-y-12 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col">
          <SectionHeading className="mb-8 max-w-[14ch]">Every call starts with a proper answer</SectionHeading>
          {features.map((f, i) => {
            const on = i === active;
            return (
              <button
                key={f.title}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={`flex flex-col gap-1.5 border-t py-5 text-left transition-colors ${on ? "border-olive text-ink" : "border-line text-muted hover:text-ink-soft"}`}
              >
                <span className="text-[26px] leading-[1.15] tracking-[-0.03em]">{f.title}</span>
                {on && <span className="max-w-[46ch] animate-swap text-muted">{f.body}</span>}
              </button>
            );
          })}
        </div>

        <div className="grid min-w-0 place-items-center rounded-panel bg-olive-tint px-4 py-12">
          <Image
            key={active}
            src={screen.src}
            alt={screen.alt}
            placeholder="blur"
            sizes="320px"
            className={`aspect-[9/16] w-full max-w-[320px] animate-swap rounded-panel border border-line object-cover shadow-lift ${screen.focus}`}
          />
        </div>
      </Container>
    </section>
  );
}
