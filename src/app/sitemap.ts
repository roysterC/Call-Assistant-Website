import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { trades } from "@/content/trades";

// When each group of pages last changed what it says. Bump the date with the copy:
// search engines use it to decide what to recrawl, so it must stay accurate.
const updated = {
  home: "2026-10-14", // site.ts and the home page sections
  services: "2026-10-14", // services.ts
  trades: "2026-10-14", // trades.ts
  start: "2026-10-14", // the sign-up form
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: updated.home, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: updated.services, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...trades.map((t) => ({ url: `${site.url}/for/${t.slug}`, lastModified: updated.trades, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${site.url}/start`, lastModified: updated.start, changeFrequency: "monthly", priority: 0.8 },
  ];
}
