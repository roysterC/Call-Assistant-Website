import Link from "next/link";
import { site } from "@/content/site";
import { Container, Logo } from "./ui";

const columns = [
  {
    heading: "Kikai",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#handles", label: "What it handles" },
      { href: "/#pricing", label: "Pricing" },
      { href: site.loginUrl, label: "Log in" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { href: "/start", label: "Get Kikai" },
      { href: site.bookingUrl, label: "Book a 30-min call" },
      { href: "/#faq", label: "FAQs" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="pt-24 pb-10">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-wrap gap-x-16 gap-y-12">
          <div className="flex flex-[2_1_320px] flex-col gap-4">
            <Logo />
            <p className="max-w-[38ch] text-ink-soft">The AI receptionist for UK salons. Every call answered, every booking in the diary.</p>
          </div>
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-[1_1_160px] flex-col gap-2.5 text-[15px]">
              <span className="mb-1 font-mono text-xs tracking-[0.06em] text-muted uppercase">{col.heading}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-olive-text">
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
