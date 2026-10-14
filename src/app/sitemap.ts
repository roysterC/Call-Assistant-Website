import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { trades } from "@/content/trades";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...trades.map((t) => ({ url: `${site.url}/for/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${site.url}/start`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
