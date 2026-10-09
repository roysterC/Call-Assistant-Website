import { CalendarCheck, ChatsCircle, Check, Phone, Play } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import heroSalon from "../../public/images/hero-salon.jpg";
import { calls, salonCount, valueTiles } from "@/content/site";
import { ButtonLink, Container } from "./ui";

// The section can only promise a recording once there is one to play.
const hasRecordings = calls.some((c) => c.audio);

/** Staggers the hero in, in reading order. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section id="top">
      <Container className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 pt-10 pb-8">
        <div className="flex min-w-0 flex-[1_1_640px] flex-col gap-6">
          <span style={delay(0)} className="animate-rise inline-flex items-center gap-2 self-start rounded-full bg-card py-1.5 pr-3 pl-2 text-sm text-ink-soft">
            <span className="grid size-5 place-items-center rounded-full bg-olive text-on-olive">
              <Check size={12} weight="bold" aria-hidden="true" />
            </span>
            Live in a week · Keep your number
          </span>
          <h1 style={delay(60)} className="animate-rise text-[clamp(3rem,6.6vw,6rem)] leading-[0.98] font-normal tracking-[-0.045em]">
            Your new front desk.
          </h1>
        </div>
        <div className="flex min-w-0 flex-[0_1_440px] flex-col gap-5">
          <p style={delay(140)} className="animate-rise text-[19px] text-ink-soft">
            An AI receptionist that answers every call, books into your diary and replies on WhatsApp, Instagram and your website.
          </p>
          <div style={delay(200)} className="animate-rise flex flex-wrap gap-2.5">
            <ButtonLink href="/start">Get Kikai</ButtonLink>
            <ButtonLink href="/#calls" variant="secondary">
              {hasRecordings && <Play size={14} weight="fill" aria-hidden="true" />}
              {hasRecordings ? "Hear a real call" : "See how it answers"}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="px-4">
        <div className="relative mx-auto h-[clamp(440px,52vw,760px)] max-w-[1408px] overflow-hidden rounded-panel bg-photo">
          <Image
            src={heroSalon}
            alt="A stylist blow-drying a client’s hair in a bright salon while a phone lies on the reception counter"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1440px) 1408px, 100vw"
            className="object-cover object-[68%_40%] sm:object-[60%_50%]"
          />

          {/* On a phone the card sits at the bottom, small, so the photo still shows. */}
          <div
            style={delay(420)}
            className="animate-rise absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-card bg-surface p-3.5 shadow-lift sm:inset-x-auto sm:top-[6%] sm:bottom-auto sm:left-[3%] sm:w-[330px] sm:p-[18px]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-olive text-on-olive">
                <Phone size={18} aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Kikai answered</span>
                <span className="font-mono text-xs text-muted">Tue 21:14 · after hours</span>
              </div>
            </div>
            <p className="hidden rounded-part bg-card px-3 py-2.5 text-sm sm:block">“Jess has half past two on Saturday. Shall I pop you in?”</p>
            <div className="flex items-center justify-between rounded-part bg-blush px-3 py-2.5 text-sm font-medium">
              <span>Booked · Sat 14:30</span>
              <span className="font-mono text-xs">Text sent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const tileIcons = [Phone, CalendarCheck, ChatsCircle];

/** What Kikai does, in three lines, straight after the hero. */
export function HandsFull() {
  return (
    <section aria-labelledby="hands-full" className="reveal">
      <Container className="grid grid-cols-1 gap-x-16 gap-y-10 pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <div className="flex flex-col gap-5">
          <h2 id="hands-full" className="max-w-[12ch] text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-normal tracking-[-0.035em]">
            Hands full. Still booked.
          </h2>
          {salonCount !== null && <p className="text-ink-soft">Answering the phone for {salonCount} salons across the UK</p>}
        </div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {valueTiles.map((t, i) => {
            const Icon = tileIcons[i] ?? Check;
            return (
              <li key={t.title} className={`flex gap-4 ${i === 0 ? "sm:col-span-2" : ""}`}>
                <span className="grid size-12 flex-none place-items-center rounded-full bg-olive-tint text-olive-text">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <p className={i === 0 ? "text-[26px] leading-tight tracking-[-0.02em]" : "text-[19px] font-medium"}>{t.title}</p>
                  <p className="mt-1 text-muted">{t.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
