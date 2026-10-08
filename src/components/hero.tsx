import Image from "next/image";
import heroSalon from "../../public/images/hero-salon.jpg";
import { salonCount, valueTiles } from "@/content/site";
import { ButtonLink, CheckIcon, Container, PhoneIcon, PlayIcon } from "./ui";

export function Hero() {
  return (
    <section id="top">
      <Container className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 pt-10 pb-8">
        <div className="flex min-w-0 flex-[1_1_640px] flex-col gap-6">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-card py-1.5 pr-3 pl-2 text-sm text-ink-soft">
            <span className="grid size-5 place-items-center rounded-full bg-olive text-white">
              <CheckIcon className="size-3" strokeWidth={3} />
            </span>
            Live in a week · Keep your number
          </span>
          <h1 className="text-[clamp(3.25rem,7.4vw,7.25rem)] leading-[0.95] font-normal tracking-[-0.05em] text-balance">Your new front desk.</h1>
        </div>
        <div className="flex min-w-0 flex-[0_1_440px] flex-col gap-5">
          <p className="text-[19px] text-ink-soft">
            An AI receptionist that answers every call, books into your diary and replies on WhatsApp, Instagram and your website.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href="/start">Get Kikai</ButtonLink>
            <ButtonLink href="/#calls" variant="secondary">
              <PlayIcon />
              Hear a real call
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="px-4">
        <div className="relative mx-auto h-[clamp(440px,52vw,760px)] max-w-[1408px] overflow-hidden rounded-[28px] bg-[#a39886]">
          <Image
            src={heroSalon}
            alt="A stylist blow-drying a client’s hair in a bright salon while a phone lies on the reception counter"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1440px) 1408px, 100vw"
            className="object-cover object-[68%_40%] sm:object-[60%_50%]"
          />

          {/* The phone on the counter in the photo, "ringing". */}
          <span aria-hidden="true" className="absolute top-[53%] left-[17%] hidden size-4 animate-ring rounded-full border-[3px] border-olive bg-white sm:block" />

          {/* On a phone the card sits at the bottom, small, so the photo still shows. */}
          <div className="absolute inset-x-3 bottom-3 flex animate-float flex-col gap-3 rounded-[20px] bg-white p-3.5 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.35)] sm:inset-x-auto sm:top-[6%] sm:bottom-auto sm:left-[3%] sm:w-[330px] sm:p-[18px]">
            <div className="flex items-center gap-3">
              <span className="grid size-10 animate-ring place-items-center rounded-full bg-olive text-white">
                <PhoneIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Kikai answered</span>
                <span className="font-mono text-xs text-muted">Tue 21:14 · after hours</span>
              </div>
            </div>
            <p className="hidden rounded-xl bg-card px-3 py-2.5 text-sm sm:block">“Jess has half past two on Saturday. Shall I pop you in?”</p>
            <div className="flex items-center justify-between rounded-xl bg-blush px-3 py-2.5 text-sm font-medium">
              <span>Booked · Sat 14:30</span>
              <span className="font-mono text-xs">Text sent</span>
            </div>
          </div>

          <span className="absolute right-[3%] bottom-[6%] hidden rounded-full bg-white/95 px-4 py-2.5 text-[15px] font-medium shadow-[0_12px_30px_-12px_rgb(0_0_0/0.3)] sm:block">
            Hands full. Still booked.
          </span>
        </div>
      </div>

      <Container className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
        {valueTiles.map((t) => (
          <div key={t.title} className="flex items-start gap-4 rounded-[20px] bg-card p-6">
            <span className="grid size-10 flex-none place-items-center rounded-xl bg-blush font-mono text-[13px]">{t.mark}</span>
            <div>
              <p className="text-[17px] font-medium">{t.title}</p>
              <p className="mt-0.5 text-[15px] text-muted">{t.body}</p>
            </div>
          </div>
        ))}
      </Container>

      {salonCount !== null && (
        <p className="mt-7 text-center text-[15px] text-ink-soft">Answering the phone for {salonCount} salons across the UK</p>
      )}
    </section>
  );
}
