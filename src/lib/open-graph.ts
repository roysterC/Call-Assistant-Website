/**
 * Open Graph fields every page carries. A page-level `openGraph` replaces the
 * layout's rather than merging with it, so pages that set their own spread this
 * in to keep the basics.
 */
export const baseOpenGraph = { type: "website", siteName: "Kikai", locale: "en_GB" } as const;

/** The share image for pages without one of their own. */
export const defaultOgImage = {
  url: "/images/hero-salon.jpg",
  width: 1024,
  height: 572,
  alt: "A stylist at work while Kikai answers the salon phone",
};
