import { ArrowRight, Check } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { faqLd, JsonLd, productLd } from "@/components/json-ld";
import { ClosingCta, Faq } from "@/components/sections";
import { ServiceIcon } from "@/components/service-icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { serviceBySlug, services, type Service } from "@/content/services";
import { site } from "@/content/site";

// Only the services in services.ts exist; any other /services/... is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[service]">): Promise<Metadata> {
  const service = serviceBySlug((await params).service);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  const { image: shot, alt } = service.hero;
  const image = { url: shot.src, width: shot.width, height: shot.height, alt };
  // A page-level openGraph replaces the layout's, so it carries the basics again.
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Kikai", locale: "en_GB", title: `${service.title} | Kikai`, description: service.description, url, images: [image] },
  };
}

/** A phone screenshot standing in a bezel at the bottom of a tinted panel. */
function PhoneShot({ image, alt, priority = false }: { image: Service["hero"]["image"]; alt: string; priority?: boolean }) {
  return (
    <div className="flex min-h-[460px] items-end justify-center overflow-hidden rounded-panel bg-olive-tint px-6 pt-10 md:min-h-[540px]">
      <Image
        src={image}
        alt={alt}
        priority={priority}
        sizes="300px"
        className="w-[min(290px,72%)] rounded-t-[34px] border-8 border-b-0 border-[#1f2414] shadow-lift"
      />
    </div>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[service]">) {
  const service = serviceBySlug((await params).service);
  if (!service) notFound();

  const url = `${site.url}/services/${service.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { ...productLd, "@id": `${url}#product`, name: `Kikai ${service.name}`, description: service.description, url },
      { ...faqLd(service.faqs), "@id": `${url}#faq` },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Kikai", item: site.url },
          { "@type": "ListItem", position: 2, name: service.name, item: url },
        ],
      },
    ],
  };
  const { feature, others } = service.values;

  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader />
      <main>
        <section id="top">
          <Container className="flex flex-col gap-10 pt-8">
            <div className="flex flex-col gap-6">
              <nav aria-label="Breadcrumb" className="flex animate-rise items-center gap-2.5 text-sm text-muted">
                <span className="grid size-8 place-items-center rounded-[10px] bg-olive-tint text-olive-text">
                  <ServiceIcon name={service.icon} size={18} />
                </span>
                <span>
                  <Link href="/" className="underline-offset-4 hover:underline">
                    Kikai
                  </Link>{" "}
                  / {service.name}
                </span>
              </nav>
              <h1 style={{ animationDelay: "60ms" }} className="animate-rise text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.98] font-normal tracking-[-0.045em]">
                {service.h1.map((line) => (
                  <span key={line} className="lg:block">
                    {line}{" "}
                  </span>
                ))}
              </h1>
            </div>
            <div className="grid grid-cols-1 items-start gap-x-[72px] gap-y-8 lg:grid-cols-[4fr_8fr]">
              <div style={{ animationDelay: "140ms" }} className="flex animate-rise flex-col gap-6 lg:pt-2">
                <p className="max-w-[40ch] text-[19px] text-ink-soft">{service.intro}</p>
                <div className="flex flex-wrap gap-2.5">
                  <ButtonLink href="/start">Get Kikai</ButtonLink>
                  <ButtonLink href={site.bookingUrl} variant="secondary">
                    Book a 30-min call
                  </ButtonLink>
                </div>
              </div>
              <div style={{ animationDelay: "120ms" }} className="animate-rise">
                {service.hero.kind === "desktop" ? (
                  <div className="rounded-panel bg-olive-tint p-[clamp(12px,2vw,28px)]">
                    <Image
                      src={service.hero.image}
                      alt={service.hero.alt}
                      priority
                      sizes="(min-width: 1024px) 64vw, 100vw"
                      className="aspect-[16/10] w-full rounded-[14px] object-cover object-[0%_0%] shadow-lift"
                    />
                  </div>
                ) : (
                  <PhoneShot image={service.hero.image} alt={service.hero.alt} priority />
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="reveal pt-32">
          <Container>
            <SectionHeading className="mb-10 max-w-[18ch]">{service.values.heading}</SectionHeading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[7fr_5fr] md:grid-rows-2">
              <article className="flex flex-col overflow-hidden rounded-panel bg-card md:row-span-2">
                <div className="relative min-h-[300px] flex-1 px-6 pt-6">
                  <div className="relative size-full min-h-[280px] overflow-hidden rounded-t-[12px] bg-line">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      style={{ objectPosition: feature.position ?? "0% 0%" }}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-7">
                  <h3 className="text-[28px] tracking-[-0.02em]">{feature.title}</h3>
                  <p className="max-w-[46ch] text-ink-soft">{feature.body}</p>
                </div>
              </article>
              {others.map((o, i) => (
                <article
                  key={o.title}
                  className={`flex flex-col justify-end gap-1.5 rounded-panel p-7 md:min-h-[240px] md:p-8 ${i === 0 ? "bg-olive-tint" : "border border-line bg-surface"}`}
                >
                  <h3 className="text-[28px] tracking-[-0.02em]">{o.title}</h3>
                  <p className="max-w-[40ch] text-ink-soft">{o.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="reveal pt-32">
          <Container className="grid grid-cols-1 items-center gap-x-[72px] gap-y-10 lg:grid-cols-2">
            <PhoneShot image={service.details.phone.image} alt={service.details.phone.alt} />
            <div className="flex flex-col gap-7">
              <SectionHeading className="max-w-[16ch]">{service.details.heading}</SectionHeading>
              <ul className="flex max-w-[56ch] flex-col gap-4.5 text-lg">
                {service.details.items.map((d) => (
                  <li key={d.lead} className="flex gap-3.5">
                    <Check size={18} weight="bold" aria-hidden="true" className="mt-1.5 flex-none text-olive-text" />
                    <span>
                      <strong className="font-medium">{d.lead}</strong> <span className="text-ink-soft">{d.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="reveal pt-32">
          <Container>
            <SectionHeading className="mb-8">Works with the rest of Kikai</SectionHeading>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-4 rounded-card bg-card p-5 transition-[background-color,transform] hover:bg-olive-tint active:scale-[0.99]"
                    >
                      <span className="grid size-12 flex-none place-items-center rounded-part bg-surface text-olive-text">
                        <ServiceIcon name={s.icon} size={22} />
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="text-lg font-medium">{s.name}</span>
                        <span className="text-[15px] text-muted">{s.short}</span>
                      </span>
                      <ArrowRight size={18} weight="bold" aria-hidden="true" className="flex-none transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
            </ul>
          </Container>
        </section>

        <div className="pt-24">
          <Faq items={service.faqs} />
        </div>
        <ClosingCta />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
