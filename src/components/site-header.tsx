"use client";

import { List, X } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/content/site";
import { ButtonLink, Logo } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ground/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Kikai home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] text-ink-soft lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
          <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-3 top-[calc(100%+8px)] flex flex-col rounded-card border border-line bg-raised p-2 shadow-float lg:hidden">
            {[...navLinks, { href: site.loginUrl, label: "Log in" }].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-part px-4 py-3 text-lg hover:bg-sunk">
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
