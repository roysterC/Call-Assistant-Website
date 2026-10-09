import { Check } from "@phosphor-icons/react/ssr";
import { plan, pricing, site } from "@/content/site";
import { Reveal } from "./motion";
import { ButtonLink, Container, Heading } from "./ui";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-16 py-24 lg:py-32">
      <Container className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <Reveal>
          <Heading id="pricing-heading" className="max-w-[12ch]">
            One plan. Everything in it.
          </Heading>
          <p className="mt-6 max-w-[40ch] text-lg text-ink-soft">
            {pricing.monthly ? `${pricing.monthly} a month for the whole salon` : "One monthly price for the whole salon"}, plus a one-off setup fee. We build it on your price list and team, and test it with you before it answers a single call.
          </p>
          {site.bookingUrl !== "/start" && (
            <ButtonLink href={site.bookingUrl} variant="secondary" className="mt-9">
              Book a 30-min call
            </ButtonLink>
          )}
        </Reveal>

        <Reveal delay={0.1} y={40}>
          <div className="rounded-panel border border-line bg-raised p-8 shadow-lift sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-medium">Kikai</span>
              <span className="rounded-full bg-sage px-3 py-1 text-[13px] font-medium">Live in about a week</span>
            </div>
            {pricing.monthly ? (
              <p className="mt-8 flex items-baseline gap-2">
                <span className="display text-7xl tabular-nums">{pricing.monthly}</span>
                <span className="text-muted">/ month</span>
              </p>
            ) : (
              <p className="display mt-8 text-[clamp(2.6rem,4vw,3.6rem)]">Priced per salon</p>
            )}
            <p className="mt-3 text-sm text-muted">
              {pricing.setup ? `+ ${pricing.setup} one-off setup` : "+ one-off setup fee"}
              {pricing.phoneRate && `, phone minutes at ${pricing.phoneRate}`}
            </p>
            <ul className="mt-8 flex flex-col gap-3.5 border-t border-line pt-7">
              {plan.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check size={18} weight="bold" aria-hidden="true" className="mt-0.5 flex-none text-accent-text" />
                  {p}
                </li>
              ))}
            </ul>
            <ButtonLink href="/start" className="mt-9 w-full">
              Get Kikai
            </ButtonLink>
            {pricing.contractTerm && <p className="mt-4 text-center text-sm text-muted">{pricing.contractTerm}.</p>}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
