import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { trades } from "@/content/trades";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...trades.map((t) => ({ url: `${site.url}/for/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${site.url}/start`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
