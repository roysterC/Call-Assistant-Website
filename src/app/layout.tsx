import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ChatWidget } from "@/components/chat-widget";
import { PAPER, THEME_SCRIPT } from "@/lib/theme";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kikai: the AI receptionist for UK salons",
    template: "%s | Kikai",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Kikai",
    locale: "en_GB",
    images: [{ url: "/images/hero-salon.jpg", width: 1024, height: 572, alt: "A stylist at work while Kikai answers the salon phone" }],
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console ownership check for kikaiagency.vercel.app. Keep it while the property exists.
  verification: { google: "RDVY9PZdUfVCcapOkF-HEFJxkkPC0MgOgNlaoN-NOU4" },
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
