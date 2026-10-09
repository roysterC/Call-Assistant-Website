import { facts } from "@/content/site";
import { Container } from "./ui";

/** Four plain facts, straight under the hero. */
export function Facts() {
  return (
    <section aria-label="Kikai in numbers" className="border-y border-line">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.label}
            className={`flex flex-col gap-2 py-8 pr-4 lg:py-10 ${i % 2 === 0 ? "pl-0" : "border-l border-line pl-5"} ${i === 2 ? "lg:border-l lg:border-line" : ""} ${i > 0 ? "lg:pl-8" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
          >
            <span className="display text-[clamp(2.6rem,4.4vw,3.8rem)] tabular-nums">{f.value}</span>
            <span className="max-w-[24ch] text-[15px] text-ink-soft">{f.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
