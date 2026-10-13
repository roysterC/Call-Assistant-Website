import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ChatWidget } from "@/components/chat-widget";
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#12150d" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen font-sans text-base leading-normal antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
