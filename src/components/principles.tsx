import { principles } from "@/content/site";
import { Reveal } from "./motion";
import { Container, Heading } from "./ui";

/** How it behaves when a call gets awkward, as plain rules. */
export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <Heading id="principles-heading" className="max-w-[16ch]">
            It knows what it doesn’t know.
          </Heading>
        </Reveal>
        <ul className="mt-14 border-t border-line-strong">
          {principles.map((p, i) => (
            <li key={p.rule} className="border-b border-line-strong">
              <Reveal delay={i * 0.06} y={18} className="grid gap-x-12 gap-y-3 py-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-baseline lg:py-10">
                <p className="display text-[clamp(1.85rem,3.6vw,3.1rem)] leading-[1.04]">{p.rule}</p>
                <p className="max-w-[44ch] text-[17px] text-ink-soft">{p.example}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
