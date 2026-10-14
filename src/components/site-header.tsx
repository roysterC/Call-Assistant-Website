"use client";

import { CaretDown, List, X } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { trades } from "@/content/trades";
import { BusinessesMenu } from "./businesses-menu";
import { ServiceIcon } from "./service-icon";
import { ServicesMenu } from "./services-menu";
import { ThemeSwitchRow, ThemeToggle } from "./theme-toggle";
import { ButtonLink, Logo } from "./ui";

const links = [
  { href: "/#calls", label: "Hear it" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
];

/**
 * A collapsible group in the phone menu (Services, Businesses): one row with
 * an arrow, closed unless the page you're on is in it.
 */
function MobileGroup({ label, startOpen, children }: { label: string; startOpen: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(startOpen);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center justify-between rounded-part px-4 py-3 text-left text-lg hover:bg-card"
      >
        {label}
        <CaretDown size={16} weight="bold" aria-hidden="true" className={`text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul id={id} className="flex animate-swap flex-col gap-0.5 pb-1.5 pl-2">
          {children}
        </ul>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-20 mx-auto flex max-w-[1408px] items-center justify-between gap-6 px-6 py-4">
      <Link href="/" aria-label="Kikai home">
        <Logo />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] text-ink-soft lg:flex">
        <span className="flex items-center gap-2.5">
          <ServicesMenu />
          <BusinessesMenu />
        </span>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {/* Wide screens: an icon button beside Log in. Narrower: a row in the menu below. */}
        <ThemeToggle className="hidden lg:grid" />
        {/* A wrapper, because ButtonLink sets its own display. */}
        <span className="hidden sm:contents">
          <ButtonLink href={site.loginUrl} variant="secondary" size="md">
            Log in
          </ButtonLink>
        </span>
        <ButtonLink href="/start" size="md">
          Get Kikai
        </ButtonLink>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line-strong transition-transform active:scale-[0.96] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-4 top-full flex max-h-[calc(100dvh-88px)] animate-swap flex-col overflow-y-auto overscroll-contain rounded-card border border-line bg-surface p-2 shadow-float lg:hidden"
        >
          <MobileGroup label="Services" startOpen={pathname.startsWith("/services/")}>
            {services.map((s) => {
              const href = `/services/${s.slug}`;
              return (
                <li key={s.slug}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-part px-2.5 py-2 hover:bg-card ${pathname === href ? "bg-olive-tint" : ""}`}
                  >
                    <span className="grid size-9 flex-none place-items-center rounded-part bg-olive-tint text-olive-text">
                      <ServiceIcon name={s.icon} size={18} />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-[13px] text-muted">{s.short}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </MobileGroup>
          <MobileGroup label="Businesses" startOpen={pathname.startsWith("/for/")}>
            {trades.map((t) => {
              const href = `/for/${t.slug}`;
              return (
                <li key={t.slug}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-part p-2 hover:bg-card ${pathname === href ? "bg-olive-tint" : ""}`}
                  >
                    <Image src={t.hero.image} alt="" sizes="40px" className="size-10 flex-none rounded-part object-cover" />
                    <span className="flex flex-col">
                      <span className="font-medium">{t.label}</span>
                      <span className="text-[13px] text-muted">{t.blurb}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </MobileGroup>
          {[...links, { href: site.loginUrl, label: "Log in" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-part px-4 py-3 text-lg hover:bg-card">
              {l.label}
            </Link>
          ))}
          <div className="mt-1 border-t border-line pt-1">
            <ThemeSwitchRow />
          </div>
        </nav>
      )}
    </header>
  );
}
