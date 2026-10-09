"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "./ui";

// The chat widget's launcher sits bottom-right; leave it room when it's on.
const rightInset = process.env.NEXT_PUBLIC_KIKAI_WIDGET_SITE_ID ? "right-24" : "right-2";

/** Phones only: a "Get Kikai" bar that appears once the hero has scrolled away. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-2 ${rightInset} bottom-3 z-30 flex items-center justify-between rounded-full bg-brand py-2 pr-2 pl-5 text-on-brand shadow-float transition-[opacity,transform] duration-300 sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="text-sm">Never miss a booking again</span>
      <ButtonLink href="/start" variant="inverse" size="md" tabIndex={visible ? 0 : -1}>
        Get Kikai
      </ButtonLink>
    </div>
  );
}
