"use client";

import { ArrowRight, CaretDown } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { services } from "@/content/services";
import { ServiceIcon } from "./service-icon";
import { pillClass, useDisclosure } from "./use-disclosure";

/**
 * The "Services" pill in the header: each service with its one-line value,
 * and a screenshot of whichever one the pointer or focus is on.
 */
export function ServicesMenu() {
  const { open, close, wrapperProps, buttonProps, panelId } = useDisclosure();
  const pathname = usePathname();
  const [active, setActive] = useState(0);
  const shown = services[active];

  return (
    <div {...wrapperProps} className="relative">
      <button {...buttonProps} className={pillClass(open)}>
        Services
        <CaretDown size={14} weight="bold" aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          id={panelId}
          className="absolute top-[calc(100%+10px)] -left-2 grid w-[780px] animate-swap grid-cols-[minmax(0,1fr)_280px] gap-2 rounded-card border border-line bg-surface p-2 shadow-float"
        >
          <ul className="flex flex-col gap-0.5">
            {services.map((s, i) => {
              const href = `/services/${s.slug}`;
              const on = i === active;
              return (
                <li key={s.slug}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={close}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`flex items-start gap-3.5 rounded-part p-3 transition-colors ${on ? "bg-olive-tint" : ""}`}
                  >
                    <span className={`grid size-10 flex-none place-items-center rounded-part text-olive-text ${on ? "bg-surface" : "bg-olive-tint"}`}>
                      <ServiceIcon name={s.icon} size={20} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium text-ink">{s.name}</span>
                      <span className="max-w-[44ch] text-sm text-muted">{s.value}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div aria-hidden="true" className="flex flex-col gap-3 rounded-[14px] bg-card p-3.5">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[10px] bg-line">
              <Image
                key={shown.slug}
                src={shown.hero.image}
                alt=""
                sizes="252px"
                className="absolute inset-0 size-full animate-swap object-cover object-[0%_0%]"
              />
            </div>
            <span className="flex items-center justify-between gap-2 text-[15px] font-medium text-ink">
              {shown.name}
              <ArrowRight size={16} weight="bold" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
