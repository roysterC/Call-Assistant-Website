import { calls, facts, faqs, included, plan, pricing, site, type Outcome } from "@/content/site";
import { AudioButton } from "./audio-button";
import { ButtonLink, CheckIcon, Container, SectionHeading } from "./ui";

export function ValueComparison() {
  return (
    <section className="px-4">
      <div className="mx-auto flex max-w-[1408px] flex-wrap items-center gap-x-24 gap-y-12 rounded-[28px] bg-olive-tint p-[clamp(32px,6vw,96px)]">
        <h2 className="flex-[1_1_420px] text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.04em]">
          {pricing.receptionistYear && pricing.kikaiYear ? (
            <>
              A receptionist costs {pricing.receptionistYear} a year. <span className="text-olive-text">Kikai is {pricing.kikaiYear}.</span>
            </>
          ) : (
            <>
              Everything a receptionist does. <span className="text-olive-text">For a fraction of the cost.</span>
            </>
          )}
        </h2>
        <ul className="grid flex-[1_1_420px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8">
          {included.map((item) => (
            <li key={item} className="flex gap-3 border-b border-line-strong py-3.5">
              <CheckIcon className="mt-0.5 size-[18px] flex-none text-olive-text" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const outcomeStyle: Record<Outcome, string> = {
  Booked: "bg-blush",
  "Left a message": "bg-sage",
  Enquiry: "bg-white",
};

export function Calls() {
  return (
    <section id="calls" className="scroll-mt-6 pt-30 pb-10">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading className="max-w-[16ch]">Hear it handle the awkward ones</SectionHeading>
          <p className="max-w-[40ch] text-muted">Real situations from a salon phone. It asks rather than guesses, and it never makes things up.</p>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
          {calls.map((c) => (
            <li key={c.question} className="flex min-h-[220px] flex-col gap-4 rounded-3xl bg-card p-5">
              {c.audio && (
                <div className="flex items-center justify-between">
                  <AudioButton src={c.audio} label={c.question} />
                  {c.length && <span className="font-mono text-xs text-muted">{c.length}</span>}
                </div>
              )}
              <p className="text-[22px] leading-[1.2] tracking-[-0.02em]">“{c.question}”</p>
              <p className="text-[15px] text-muted">{c.answer}</p>
              <span className={`mt-auto self-start rounded-full px-3 py-1 text-[13px] font-medium ${outcomeStyle[c.outcome]}`}>{c.outcome}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-6 px-4 pt-20">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center gap-10 rounded-[28px] bg-card px-6 py-24">
        <SectionHeading className="text-center">One plan. Everything in it.</SectionHeading>
        <div className="flex w-full max-w-[520px] flex-col gap-6 rounded-[28px] bg-white p-9 shadow-[0_30px_60px_-40px_rgb(0_0_0/0.2)]">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">Kikai</span>
            <span className="rounded-full bg-blush px-3 py-1 text-[13px] font-medium">Live in a week</span>
          </div>
          {pricing.monthly ? (
            <p className="flex items-baseline gap-2">
              <span className="text-7xl leading-none tracking-[-0.05em]">{pricing.monthly}</span>
              <span className="text-muted">/ month</span>
            </p>
          ) : (
            <p className="text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.05em]">Priced per salon</p>
          )}
          <p className="-mt-3 font-mono text-[13px] text-muted">
            {pricing.setup ? `+ ${pricing.setup} one-off setup` : "+ one-off setup fee"}
            {pricing.phoneRate && ` · phone minutes at ${pricing.phoneRate}`}
          </p>
          <ul className="flex flex-col gap-3 border-t border-line pt-5">
            {plan.map((p) => (
              <li key={p} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-[18px] flex-none text-olive-text" />
                {p}
              </li>
            ))}
          </ul>
          <ButtonLink href="/start" size="xl" className="w-full">
            Get Kikai
          </ButtonLink>
          <p className="text-center text-sm text-muted">
            {pricing.contractTerm && `${pricing.contractTerm}. `}We set everything up, and you’re live in a week.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Facts() {
  return (
    <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-8 py-24">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col gap-2 border-t-2 border-olive pt-5">
          <span className="text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.05em]">{f.value}</span>
          <span className="max-w-[26ch] text-ink-soft">{f.label}</span>
        </div>
      ))}
    </Container>
  );
}

export function Faq() {
  const answered = faqs.filter((f): f is { q: string; a: string } => f.a !== null);
  return (
    <section id="faq" className="scroll-mt-6 pt-10 pb-30">
      <Container className="flex flex-wrap gap-x-20 gap-y-8">
        <SectionHeading className="flex-[1_1_320px]">Questions</SectionHeading>
        <div className="min-w-0 flex-[2_1_560px] border-t border-line">
          {answered.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-line">
              <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-4 text-xl tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-card transition-transform group-open:rotate-45">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pr-14 pb-6 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="px-4">
      <div className="mx-auto flex max-w-[1408px] flex-col gap-10 rounded-[28px] bg-olive px-[clamp(24px,6vw,96px)] py-[clamp(40px,7vw,112px)] text-white">
        <h2 className="max-w-[12ch] text-[clamp(3rem,7vw,7rem)] leading-[0.95] font-normal tracking-[-0.05em]">Never miss a booking again.</h2>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[17px]">
          {["Keep your number", "Live in a week", "We set it all up"].map((r) => (
            <li key={r} className="inline-flex items-center gap-2">
              <CheckIcon />
              {r}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2.5">
          <ButtonLink href="/start" variant="inverse" size="xl">
            Get Kikai
          </ButtonLink>
          <ButtonLink href={site.bookingUrl} variant="outlineInverse" size="xl">
            Book a 30-min call
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
