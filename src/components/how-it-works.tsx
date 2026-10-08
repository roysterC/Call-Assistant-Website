import Image from "next/image";
import diaryDesktop from "../../public/images/diary-desktop.jpg";
import assistantPhone from "../../public/images/assistant-phone.jpg";
import { builtOn } from "@/content/site";
import { ButtonLink, Container, SectionHeading } from "./ui";

export function BuiltOn() {
  return (
    <Container className="flex flex-col items-center gap-7 pt-24 pb-6">
      <p className="text-center font-mono text-xs tracking-[0.08em] text-muted uppercase">Built on the technology behind the best AI products</p>
      <ul className="flex flex-wrap justify-center gap-x-14 gap-y-4 text-[22px] font-medium tracking-[-0.02em] text-muted">
        {builtOn.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </Container>
  );
}

function Step({ n, title, body, children }: { n: number; title: string; body: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-4 rounded-3xl bg-card p-3">
      <div aria-hidden="true" className="h-[220px] rounded-2xl bg-white p-4 text-[13px]">
        {children}
      </div>
      <div className="px-3 pb-3">
        <span className="font-mono text-[13px] text-muted">{n}</span>
        <h3 className="mt-1 mb-1.5 text-[22px] font-medium tracking-[-0.02em]">{title}</h3>
        <p className="text-muted">{body}</p>
      </div>
    </li>
  );
}

const label = "font-mono text-[11px] text-muted";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-6 pt-30 pb-10">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading>How Kikai works</SectionHeading>
          <ButtonLink href="/start" size="md" className="min-h-12">
            Get Kikai
          </ButtonLink>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          <Step n={1} title="Tell us about your salon" body="Services, prices, team, opening hours and the rules your desk works to.">
            <div className="flex flex-col gap-2">
              <span className={label}>SERVICES</span>
              {["Cut & blow dry", "Full head colour", "Highlights"].map((s) => (
                <span key={s} className="flex justify-between rounded-lg bg-card px-2.5 py-2">
                  {s}
                  <span className="text-muted">from £…</span>
                </span>
              ))}
              <span className="rounded-lg border border-dashed border-line-strong px-2.5 py-2 text-muted">+ Add service</span>
            </div>
          </Step>
          <Step n={2} title="We build your receptionist" body="It answers in your salon’s name and knows only what you’ve told it.">
            <div className="flex flex-col gap-3">
              <span className={label}>VOICE</span>
              <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-olive p-3">
                <span className="size-8 rounded-full bg-blush" />
                <div className="flex flex-col">
                  <span className="font-medium">British, warm</span>
                  <span className="text-muted">“Thank you for calling…”</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-line p-3">
                <span className="size-8 rounded-full bg-line" />
                <div className="flex flex-col">
                  <span className="font-medium">British, bright</span>
                  <span className="text-muted">Preview</span>
                </div>
              </div>
            </div>
          </Step>
          <Step n={3} title="Forward your number" body="Clients ring the number they already have. One line of code adds chat to your site.">
            <div className="flex h-full flex-col justify-center gap-3">
              <span className={label}>FORWARD CALLS TO</span>
              <span className="rounded-xl bg-card p-3.5 font-mono text-lg tracking-[0.02em]">Your Kikai number</span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-connected" />
                Line connected
              </span>
            </div>
          </Step>
          <Step n={4} title="Watch the diary fill" body="Bookings land in your diary, messages in Callbacks, every call as one line.">
            <div className="grid grid-cols-[44px_repeat(2,minmax(0,1fr))] content-start gap-1.5 text-xs">
              <span />
              <span className={label}>JESS</span>
              <span className={label}>PRIYA</span>
              <span className="font-mono text-muted">13:00</span>
              <span className="rounded-lg bg-card p-2">Blow dry</span>
              <span className="rounded-lg bg-card p-2">Colour</span>
              <span className="font-mono text-muted">14:30</span>
              <span className="rounded-lg bg-blush p-2 font-semibold">New · Cut</span>
              <span className="rounded-lg bg-card p-2">Colour</span>
              <span className="font-mono text-muted">15:00</span>
              <span className="rounded-lg border border-dashed border-line-strong p-2" />
              <span className="rounded-lg bg-blush p-2 font-semibold">New · Skin test</span>
              <span className="font-mono text-muted">16:00</span>
              <span className="rounded-lg bg-card p-2">Fringe</span>
              <span className="rounded-lg border border-dashed border-line-strong p-2" />
            </div>
          </Step>
        </ol>
      </Container>
    </section>
  );
}

export function DeskAndPocket() {
  const shots = [
    {
      src: diaryDesktop,
      alt: "The Kikai diary on a desktop screen at a salon front desk, every stylist side by side",
      title: "The whole diary at the front desk",
      body: "Every stylist side by side, with Callbacks, Call History, clients and sales one click away.",
    },
    {
      src: assistantPhone,
      alt: "A phone showing the Kikai assistant drafting a booking, waiting for Save",
      title: "Your assistant, in your pocket",
      body: "Say “James Mitchell, men’s cut, Friday at half five with Marcus”. It drafts the booking, and nothing saves until you say yes.",
    },
  ];
  return (
    <section aria-labelledby="desk-and-pocket" className="pt-30">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading className="max-w-[15ch]">
            <span id="desk-and-pocket">One diary. On the desk and in your pocket.</span>
          </SectionHeading>
          <p className="max-w-[40ch] text-muted">Bookings Kikai takes appear the moment they’re made, wherever your team is looking.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] gap-4">
          {shots.map((s) => (
            <figure key={s.title} className="flex flex-col overflow-hidden rounded-[28px] bg-card">
              <Image src={s.src} alt={s.alt} placeholder="blur" sizes="(min-width: 1100px) 50vw, 100vw" className="aspect-video w-full object-cover" />
              <figcaption className="flex flex-col gap-1.5 px-7 pt-6 pb-7">
                <span className="text-2xl tracking-[-0.03em]">{s.title}</span>
                <span className="text-muted">{s.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
