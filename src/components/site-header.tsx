"use client";

import { List, X } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
          <span className="px-4 pt-2.5 pb-1 text-sm text-muted">Services</span>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-part px-2.5 py-2 hover:bg-card">
              <span className="grid size-9 flex-none place-items-center rounded-part bg-olive-tint text-olive-text">
                <ServiceIcon name={s.icon} size={18} />
              </span>
              <span className="flex flex-col">
                <span className="font-medium">{s.name}</span>
                <span className="text-[13px] text-muted">{s.short}</span>
              </span>
            </Link>
          ))}
          <div className="my-1 border-t border-line" />
          <span className="px-4 pt-1.5 pb-1.5 text-sm text-muted">Businesses</span>
          {trades.map((t) => (
            <Link
              key={t.slug}
              href={`/for/${t.slug}`}
              onClick={() => setOpen(false)}
              className="mx-1 mb-1.5 flex items-center gap-3 rounded-part bg-olive-tint p-2"
            >
              <Image src={t.hero.image} alt="" sizes="48px" className="size-12 flex-none rounded-part object-cover" />
              <span className="flex flex-col">
                <span className="text-[17px] font-medium">{t.label}</span>
                <span className="text-[13px] text-muted">{t.blurb}</span>
              </span>
            </Link>
          ))}
          <div className="mb-1 border-t border-line" />
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
