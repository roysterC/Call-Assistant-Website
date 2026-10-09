import { CalendarCheck, Microphone, PhoneTransfer, Storefront } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import diaryDesktop from "../../public/images/diary-desktop.jpg";
import assistantPhone from "../../public/images/assistant-phone.jpg";
import { builtOn } from "@/content/site";
import { ButtonLink, Container, SectionHeading } from "./ui";

/** "Claude, Deepgram and Twilio": a plain list, the way it would be said. */
function spoken(items: readonly string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

export function BuiltOn() {
  return (
    <Container className="pt-16 pb-4">
      <p className="text-[15px] text-muted">Built on {spoken(builtOn)}.</p>
    </Container>
  );
}

const steps = [
  { icon: Storefront, title: "Tell us about your salon", body: "Services, prices, team, opening hours and the rules your desk works to." },
  { icon: Microphone, title: "We build your receptionist", body: "It answers in your salon’s name and knows only what you’ve told it." },
  { icon: PhoneTransfer, title: "Forward your number", body: "Clients ring the number they already have. One line of code adds chat to your site." },
  { icon: CalendarCheck, title: "Watch the diary fill", body: "Bookings land in your diary, messages in Callbacks, every call as one line." },
];

export function HowItWorks() {
  return (
    <section id="how" className="reveal scroll-mt-6 pt-28 pb-10">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading>How Kikai works</SectionHeading>
          <ButtonLink href="/start" size="md" className="min-h-12">
            Get Kikai
          </ButtonLink>
        </div>
        <ol className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-olive-tint text-olive-text">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3 className="text-[22px] font-medium tracking-[-0.02em]">{title}</h3>
              <p className="max-w-[36ch] text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function DeskAndPocket() {
  return (
    <section aria-labelledby="desk-and-pocket" className="reveal pt-28">
      <Container>
        <div className="mb-10 flex max-w-[65ch] flex-col gap-4">
          <SectionHeading id="desk-and-pocket" className="max-w-[15ch]">
            One diary. On the desk and in your pocket.
          </SectionHeading>
          <p className="text-muted">Bookings Kikai takes appear the moment they’re made, wherever your team is looking.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
          <figure className="flex flex-col overflow-hidden rounded-panel bg-card">
            <Image
              src={diaryDesktop}
              alt="The Kikai diary on a desktop: a Friday with four stylists side by side and their appointments in colour by service"
              placeholder="blur"
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="aspect-[16/10] w-full border-b border-line object-cover object-left-top"
            />
            <figcaption className="flex flex-col gap-1.5 px-7 pt-6 pb-7">
              <span className="text-2xl tracking-[-0.03em]">The whole diary at the front desk</span>
              <span className="text-muted">Every stylist side by side, with Callbacks, Call History, clients and sales one click away.</span>
            </figcaption>
          </figure>
          <figure className="flex flex-col overflow-hidden rounded-panel bg-card">
            <Image
              src={assistantPhone}
              alt="Kikai on a phone: the diary with the assistant open, ready to be asked about the day or told to book"
              placeholder="blur"
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="aspect-[4/5] w-full border-b border-line object-cover object-bottom lg:aspect-[13/15]"
            />
            <figcaption className="flex flex-col gap-1.5 px-7 pt-6 pb-7">
              <span className="text-2xl tracking-[-0.03em]">Your assistant, in your pocket</span>
              <span className="text-muted">
                Say “James Mitchell, men’s cut, Friday at half five with Marcus”. It drafts the booking, and nothing saves until you say yes.
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
