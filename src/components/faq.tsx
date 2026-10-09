import { Plus } from "@phosphor-icons/react/ssr";
import { faqs } from "@/content/site";
import { Container, Heading } from "./ui";

export function Faq() {
  const answered = faqs.filter((f): f is { q: string; a: string } => f.a !== null);
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 pb-24 lg:pb-32">
      <Container>
        <Heading id="faq-heading">Questions</Heading>
        <div className="mt-12 max-w-[900px] border-t border-line-strong">
          {answered.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-line-strong">
              <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 text-xl font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-9 flex-none place-items-center rounded-full border border-line-strong transition-transform duration-300 group-open:rotate-45">
                  <Plus size={14} weight="bold" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[62ch] pr-14 pb-7 text-[17px] text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
