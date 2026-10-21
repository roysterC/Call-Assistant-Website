import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Container } from "@/components/ui";
import { services } from "@/content/services";
import { trades } from "@/content/trades";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn’t exist. Here’s where to find Kikai’s AI receptionist and the rest of the front desk.",
};

/** Any unknown URL. Next marks it noindex and sends a 404. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex flex-col gap-10 pt-16 pb-28">
          <div className="flex flex-col gap-6">
            <h1 className="text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.98] font-normal tracking-[-0.045em]">That page isn’t here.</h1>
            <p className="max-w-[40ch] text-[19px] text-ink-soft">It may have moved, or the link was mistyped. These are the pages that exist.</p>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink href="/">Back to the home page</ButtonLink>
              <ButtonLink href="/start" variant="secondary">
                Get Kikai
              </ButtonLink>
            </div>
          </div>
          <nav aria-label="Pages" className="grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm text-muted">Services</h2>
              <ul className="flex flex-col gap-2 text-lg">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="underline-offset-4 hover:underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-sm text-muted">Businesses</h2>
              <ul className="flex flex-col gap-2 text-lg">
                {trades.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/for/${t.slug}`} className="underline-offset-4 hover:underline">
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
