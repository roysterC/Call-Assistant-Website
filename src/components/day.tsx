"use client";

import { Moon, Sun } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { day } from "@/content/site";
import { ChannelLabel, OutcomeChip } from "./channel";
import { ease } from "./motion";
import { Container, Heading } from "./ui";

/**
 * A day at the front desk, told on the clock. On wide screens the time is
 * pinned on the left and changes as each moment reaches the middle of the
 * screen; the page turns to night once the salon has shut. On phones every
 * moment carries its own time, and nothing is pinned.
 */
export function Day() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const moment = day[active];
  const firstNight = day.findIndex((m) => m.night);

  return (
    <section id="day" aria-labelledby="day-heading" className="relative scroll-mt-16 overflow-x-clip">
      <Container className="pt-24 lg:pt-32">
        <Heading id="day-heading" className="max-w-[14ch]">
          A day at your front desk.
        </Heading>
        <p className="mt-6 max-w-[52ch] text-lg text-ink-soft">
          Your phone doesn’t stop when your hands are busy. Here’s what Kikai picks up while you work, and after you’ve gone home.
        </p>
      </Container>

      <Container className="mt-12 grid gap-x-16 lg:mt-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* The clock. Wide screens only; it switches to night values with the page. */}
        <div className="hidden lg:block">
          <div className={`sticky top-[68px] flex h-[calc(100dvh-68px)] flex-col justify-center transition-colors duration-500 ${moment.night ? "night bg-transparent" : ""}`}>
            <div className="flex items-center gap-3 text-ink-soft">
              {moment.night ? <Moon size={22} aria-hidden="true" /> : <Sun size={22} aria-hidden="true" />}
              <span className="text-[15px] font-medium">{moment.when}</span>
            </div>
            <div aria-hidden="true" className="relative mt-3 h-[clamp(7rem,12vw,11rem)] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={moment.time}
                  className="display absolute inset-x-0 top-0 block text-[clamp(7rem,12vw,11rem)] text-ink tabular-nums"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.55, ease }}
                >
                  {moment.time}
                </motion.span>
              </AnimatePresence>
            </div>
            <ChannelLabel channel={moment.channel} className="mt-4" />
          </div>
        </div>

        <ol className="relative">
          {day.map((m, i) => (
            <li
              key={m.time}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-index={i}
              className={`relative flex py-6 lg:min-h-[66dvh] lg:items-center lg:py-0 ${
                i === firstNight
                  ? // Night falls: a full-width backdrop that fades in from the day above it.
                    "before:pointer-events-none before:absolute before:-top-[26dvh] before:bottom-0 before:left-[-100vw] before:right-[-100vw] before:-z-10 before:bg-[linear-gradient(to_bottom,transparent,var(--color-night)_26dvh)]"
                  : m.night
                    ? "before:pointer-events-none before:absolute before:inset-y-0 before:left-[-100vw] before:right-[-100vw] before:-z-10 before:bg-night"
                    : ""
              }`}
            >
              <article className={`w-full rounded-panel border border-line bg-raised p-7 sm:p-9 ${m.night ? "night" : ""}`}>
                <div className="flex items-center justify-between gap-4">
                  <ChannelLabel channel={m.channel} />
                  <span className="text-sm text-muted tabular-nums">
                    <span className="lg:hidden">{m.time} · </span>
                    {m.night ? "After hours" : "Salon open"}
                  </span>
                </div>
                <p className="display mt-6 text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.08]">“{m.said}”</p>
                <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-soft">{m.did}</p>
                <div className="mt-7">
                  <OutcomeChip outcome={m.outcome} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>

      {/* Morning again: night gives way to day under this line. */}
      <div className="night relative bg-[linear-gradient(to_bottom,var(--color-night)_45%,var(--color-dawn))]">
        <Container className="pt-10 pb-40 lg:pt-6 lg:pb-52">
          <p className="display max-w-[22ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.06]">
            By the time you open up, it’s all in the diary.
          </p>
        </Container>
      </div>
    </section>
  );
}
