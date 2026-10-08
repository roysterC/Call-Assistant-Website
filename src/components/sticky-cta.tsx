"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "./ui";

// The chat widget's launcher sits bottom-right; leave it room when it's on.
const rightInset = process.env.NEXT_PUBLIC_KIKAI_WIDGET_SITE_ID ? "right-24" : "right-2";

/** Phones only: a "Get Kikai" bar that appears once the hero has scrolled away. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-2 ${rightInset} bottom-3 z-30 flex items-center justify-between rounded-full bg-olive py-2 pr-2 pl-5 text-white shadow-[0_20px_40px_-10px_rgb(0_0_0/0.3)] transition-all duration-300 sm:hidden ${
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
