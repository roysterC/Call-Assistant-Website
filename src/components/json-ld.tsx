import { faqs, site } from "@/content/site";

/**
 * Structured data for search engines and AI assistants. `<` is escaped so no
 * string in the data can close the script tag.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  areaServed: "GB",
};

export const productLd = {
  "@type": "SoftwareApplication",
  "@id": `${site.url}/#product`,
  name: "Kikai AI receptionist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: site.description,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` },
  audience: { "@type": "BusinessAudience", audienceType: "Salons in the UK" },
  featureList: [
    "Answers phone calls 24/7 in the business’s name",
    "Books, moves and cancels appointments in the diary, Google Calendar or Cal.com",
    "Replies on WhatsApp, Instagram, Facebook and website chat",
    "Takes messages for callbacks; never transfers calls",
    "Moves client lists, notes and upcoming appointments across from the salon’s old system during setup",
    "No call recordings kept",
  ],
};

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export const answeredFaqs = faqs.filter((f): f is { q: string; a: string } => f.a !== null);
