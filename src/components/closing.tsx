import { site } from "@/content/site";
import { Reveal } from "./motion";
import { ButtonLink } from "./ui";

export function Closing() {
  return (
    <section aria-labelledby="closing-heading" className="px-3 sm:px-4">
      <div className="night mx-auto max-w-[1400px] overflow-hidden rounded-panel bg-night px-[clamp(24px,6vw,96px)] py-[clamp(64px,10vw,140px)]">
        <Reveal>
          <h2 id="closing-heading" className="display max-w-[12ch] text-[clamp(3rem,8vw,7rem)] leading-[0.95]">
            Never miss a booking again.
          </h2>
          <p className="mt-8 max-w-[44ch] text-lg text-ink-soft">Keep your number, go live in about a week, and let the phone look after itself.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/start">Get Kikai</ButtonLink>
            {/* Without a booking link this would only repeat "Get Kikai". */}
            {site.bookingUrl !== "/start" && (
              <ButtonLink href={site.bookingUrl} variant="secondary">
                Book a 30-min call
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
