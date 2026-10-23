import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { ChatWidget } from "@/components/chat-widget";
import { baseOpenGraph, defaultOgImage } from "@/lib/open-graph";
import { PAPER, THEME_SCRIPT } from "@/lib/theme";
import { site } from "@/content/site";
import "./globals.css";

// geist/font/mono's settings, but not preloaded: it's only used for small
// labels, and a preload would compete with the hero image on every page.
const GeistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kikai: the AI receptionist for UK salons",
    template: "%s | Kikai",
  },
  description: site.description,
  openGraph: { ...baseOpenGraph, images: [defaultOgImage] },
  twitter: { card: "summary_large_image" },
  // Google Search Console ownership check for kikaiagency.vercel.app. Keep it while the property exists.
  verification: { google: "-AwdFHoTs2qxFAhyY5iRMWCjjB9z2XPm7KEgvbq5iwM" },
};

// Light for everyone by default; the theme toggle updates this when a visitor picks dark.
export const viewport: Viewport = {
  themeColor: PAPER.light,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // THEME_SCRIPT may set data-theme before React hydrates, hence the warning suppression.
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans text-base leading-normal antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
