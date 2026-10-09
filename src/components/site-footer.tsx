import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { Container, Logo } from "./ui";

const columns = [
  { heading: "Kikai", links: [...navLinks, { href: site.loginUrl, label: "Log in" }] },
  {
    heading: "Get started",
    links: [{ href: "/start", label: "Get Kikai" }, ...(site.bookingUrl !== "/start" ? [{ href: site.bookingUrl, label: "Book a 30-min call" }] : [])],
  },
];

export function SiteFooter() {
  return (
    <footer className="pt-24 pb-10">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[36ch] text-ink-soft">The AI receptionist for hair, nail and beauty salons. Every call answered, every booking in the diary.</p>
          </div>
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-2.5 text-[15px]">
              <span className="mb-1 text-sm font-medium text-muted">{col.heading}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="self-start transition-colors hover:text-accent-text">
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm text-muted">
          <span>© {new Date().getFullYear()} Kikai. Built in the UK.</span>
          <span className="flex gap-5">
            <Link href={site.privacyUrl} className="hover:text-ink">
              Privacy
            </Link>
            <Link href={site.termsUrl} className="hover:text-ink">
              Terms
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
