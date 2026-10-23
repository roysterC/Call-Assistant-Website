import { ArrowDown, Check } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { faqLd, JsonLd, productLd } from "@/components/json-ld";
import { ClosingCta, Faq } from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { TradeCalls } from "@/components/trade-calls";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { site } from "@/content/site";
import { baseOpenGraph } from "@/lib/open-graph";
import { switching, tradeBySlug, trades, type Trade } from "@/content/trades";

// Only the trades in trades.ts exist; any other /for/... is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return trades.map((t) => ({ trade: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/for/[trade]">): Promise<Metadata> {
  const trade = tradeBySlug((await params).trade);
  if (!trade) return {};
  const url = `/for/${trade.slug}`;
  const image = { url: trade.hero.image.src, width: trade.hero.image.width, height: trade.hero.image.height, alt: trade.hero.alt };
  return {
    title: trade.title,
    description: trade.description,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, title: `${trade.title} | Kikai`, description: trade.description, url, images: [image] },
  };
}

const steps = [
  { title: "Tell us about your salon", body: "Services, prices, stylists and hours. We build your receptionist from it." },
  { title: "We move your clients across", body: "Client list, notes and upcoming bookings, from whatever you use now." },
  { title: "Forward your number", body: "Clients ring the number they already know." },
  { title: "Watch the diary fill", body: "Bookings in the diary, messages in Callbacks." },
];

const channels = ["Phone", "WhatsApp", "Instagram", "Facebook", "Website chat"];

export default async function TradePage({ params }: PageProps<"/for/[trade]">) {
  const trade = tradeBySlug((await params).trade);
  if (!trade) notFound();

  const faqs = [switching.faq, ...trade.faqs];
  const url = `${site.url}/for/${trade.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      // Its own @id and url: the home page's #product node describes the product at the site root.
      {
        ...productLd,
        "@id": `${url}#product`,
        name: `Kikai ${trade.title}`,
        description: trade.description,
        url,
        audience: { "@type": "BusinessAudience", audienceType: trade.label },
      },
      { ...faqLd(faqs), "@id": `${url}#faq` },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Kikai", item: site.url },
          { "@type": "ListItem", position: 2, name: trade.label, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader />
      <main>
        <Hero trade={trade} />
        <HandsBusy trade={trade} />

        <section id="calls" className="reveal scroll-mt-6 pt-32">
          <Container>
            <SectionHeading className="mb-10 max-w-[18ch]">Calls your desk takes every day</SectionHeading>
            <TradeCalls calls={trade.calls} />
          </Container>
        </section>

        <Switching />
        <NoShows trade={trade} />
        <FrontDesk />
        <Steps />

        <div className="pt-24">
          <Faq items={faqs} heading={`Questions from ${trade.label.toLowerCase()}`} />
        </div>
        <ClosingCta />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}

function Hero({ trade }: { trade: Trade }) {
  return (
    <section id="top">
      <Container className="grid grid-cols-1 items-center gap-x-[72px] gap-y-10 pt-8 lg:grid-cols-2">
        <div className="flex max-w-[620px] flex-col gap-6">
          <nav aria-label="Breadcrumb" className="animate-rise text-sm text-muted">
            <Link href="/" className="underline-offset-4 hover:underline">
              Kikai
            </Link>{" "}
            / {trade.label}
          </nav>
          <h1 style={{ animationDelay: "60ms" }} className="animate-rise text-[clamp(3rem,5.6vw,5rem)] leading-[0.98] font-normal tracking-[-0.045em]">
            {trade.h1}
          </h1>
          <p style={{ animationDelay: "140ms" }} className="max-w-[46ch] animate-rise text-[19px] text-ink-soft">
            {trade.intro}
          </p>
          <div style={{ animationDelay: "200ms" }} className="flex animate-rise flex-wrap gap-2.5">
            <ButtonLink href="/start">Get Kikai</ButtonLink>
            <ButtonLink href={site.bookingUrl} variant="secondary">
              Book a 30-min call
            </ButtonLink>
          </div>
        </div>
        <div style={{ animationDelay: "120ms" }} className="relative aspect-[4/5] max-h-[680px] animate-rise overflow-hidden rounded-panel bg-photo">
          <Image
            src={trade.hero.image}
            alt={trade.hero.alt}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 size-full object-cover object-[40%_40%]"
          />
          <div className="absolute inset-x-5 bottom-5 flex max-w-[360px] flex-col gap-2.5 rounded-card bg-surface p-4 text-ink shadow-float">
            <span className="text-[13px] text-muted">Kikai answered at 19:42</span>
            <span className="text-[17px] tracking-[-0.01em]">“{trade.hero.call}”</span>
            <span className="self-start rounded-part bg-blush px-3 py-2 text-sm font-medium">{trade.hero.booked}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HandsBusy({ trade }: { trade: Trade }) {
  const [main, ...rest] = trade.busy.moments;
  return (
    <section className="reveal pt-32">
      <Container>
        <SectionHeading className="mb-10 max-w-[16ch]">{trade.busy.heading}</SectionHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[7fr_5fr] md:grid-rows-2">
          <article className="flex flex-col overflow-hidden rounded-panel bg-card md:row-span-2">
            <div className="relative min-h-[300px] flex-1 bg-photo">
              <Image src={trade.busy.image} alt={trade.busy.alt} sizes="(min-width: 768px) 58vw, 100vw" className="absolute inset-0 size-full object-cover" />
            </div>
            <div className="flex flex-col gap-1.5 p-7">
              <h3 className="text-[28px] tracking-[-0.02em]">{main.title}</h3>
              <p className="max-w-[44ch] text-ink-soft">{main.body}</p>
            </div>
          </article>
          {rest.map((m, i) => (
            <article
              key={m.title}
              className={`flex flex-col justify-end gap-1.5 rounded-panel p-7 md:min-h-[240px] md:p-8 ${i === 0 ? "bg-olive-tint" : "border border-line bg-surface"}`}
            >
              <h3 className="text-[28px] tracking-[-0.02em]">{m.title}</h3>
              <p className="max-w-[40ch] text-ink-soft">{m.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Switching() {
  return (
    <section id="switching" className="reveal scroll-mt-6 px-4 pt-32">
      <div className="mx-auto grid max-w-[1408px] grid-cols-1 items-center gap-x-16 gap-y-12 rounded-panel bg-olive-tint p-[clamp(28px,5vw,72px)] lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="font-mono text-[13px] tracking-[0.06em] text-olive-text uppercase">Moving to Kikai</span>
          <SectionHeading>{switching.heading}</SectionHeading>
          <p className="max-w-[44ch] text-lg text-ink-soft">{switching.body}</p>
        </div>
        <div className="flex flex-col gap-5 rounded-card bg-surface p-7 shadow-lift">
          <span className="text-sm text-muted">From</span>
          <ul className="flex flex-wrap gap-2">
            {switching.from.map((s) => (
              <li key={s} className="rounded-full bg-card px-3.5 py-2 text-[15px]">
                {s}
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="flex items-center gap-3 text-muted">
            <span className="h-px flex-1 bg-line-strong" />
            <ArrowDown size={18} />
            <span className="h-px flex-1 bg-line-strong" />
          </span>
          <span className="text-sm text-muted">Into your Kikai</span>
          <ul className="flex flex-col gap-3 text-[17px]">
            {switching.moves.map((m) => (
              <li key={m} className="flex gap-3">
                <Check size={16} weight="bold" aria-hidden="true" className="mt-1.5 flex-none text-olive-text" />
                {m}
              </li>
            ))}
          </ul>
          <span className="text-sm text-muted">Done for you during setup.</span>
        </div>
      </div>
    </section>
  );
}

function NoShows({ trade }: { trade: Trade }) {
  const bubble = "max-w-[46ch] rounded-[18px_18px_18px_6px] bg-surface px-4 py-3.5";
  return (
    <section className="reveal pt-32">
      <Container className="grid grid-cols-1 items-center gap-x-[72px] gap-y-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SectionHeading>Fewer empty chairs.</SectionHeading>
          <p className="max-w-[44ch] text-lg text-ink-soft">
            Every booking gets a text straight away and a reminder the day before. Clients who can’t make it ring to move it, any time, so the slot fills again.
          </p>
        </div>
        <figure className="flex flex-col gap-3.5 rounded-panel bg-card p-[clamp(24px,4vw,48px)]">
          <figcaption className="sr-only">The texts a client receives</figcaption>
          <span className="text-[13px] text-muted">Text, the moment it’s booked</span>
          <p className={bubble}>{trade.texts.confirmation}</p>
          <span className="mt-2.5 text-[13px] text-muted">Text, the day before</span>
          <p className={bubble}>{trade.texts.reminder}</p>
        </figure>
      </Container>
    </section>
  );
}

function FrontDesk() {
  return (
    <section className="reveal pt-32">
      <Container>
        <SectionHeading className="mb-10 max-w-[18ch]">And the rest of the front desk.</SectionHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <article className="flex flex-col justify-between gap-8 rounded-panel bg-card p-7 md:min-h-[280px] md:p-8 md:col-span-2 lg:col-span-1">
            <ul className="flex flex-wrap gap-2">
              {channels.map((c) => (
                <li key={c} className="rounded-full border border-line bg-surface px-4 py-2.5 text-[15px]">
                  {c}
                </li>
              ))}
            </ul>
            <div>
              <h3 className="mb-1.5 text-[28px] tracking-[-0.02em]">One inbox for every channel</h3>
              <p className="max-w-[48ch] text-ink-soft">Calls, WhatsApp, Instagram, Facebook and your website chat, all answered from your price list.</p>
            </div>
          </article>
          <article className="flex flex-col justify-end gap-1.5 rounded-panel md:min-h-[280px] border border-line bg-surface p-8">
            <h3 className="text-[26px] tracking-[-0.02em]">Messages that don’t get lost</h3>
            <p className="text-ink-soft">Asked for someone? Kikai takes a name, number and reason, and puts it in Callbacks.</p>
          </article>
          <article className="flex flex-col justify-end gap-1.5 rounded-panel md:min-h-[280px] bg-olive-tint p-8">
            <h3 className="text-[26px] tracking-[-0.02em]">No double bookings</h3>
            <p className="text-ink-soft">It knows who does what and never books two clients into one chair.</p>
          </article>
        </div>
      </Container>
    </section>
  );
}

function Steps() {
  return (
    <section id="how" className="reveal scroll-mt-6 pt-32">
      <Container>
        <SectionHeading className="mb-12">Live in about a week</SectionHeading>
        <ol className="grid grid-cols-1 gap-8 border-l-2 border-line-strong pl-6 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex flex-col gap-2.5">
              <span aria-hidden="true" className="absolute top-1.5 -left-[33px] sm:static sm:flex sm:items-center sm:gap-2.5">
                <span className={`block size-3.5 rounded-full border-2 border-olive ${i === 0 ? "bg-olive" : "bg-paper"}`} />
                <span className="hidden h-0.5 flex-1 bg-line-strong sm:block" />
              </span>
              <h3 className="text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="max-w-[32ch] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
