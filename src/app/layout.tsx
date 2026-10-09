import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { ChatWidget } from "@/components/chat-widget";
import { site } from "@/content/site";
import "./globals.css";

// Bricolage Grotesque (SIL OFL, see fonts/), latin subset with optical sizing.
const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin-opsz.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kikai: the AI receptionist for hair, nail and beauty salons",
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
    { media: "(prefers-color-scheme: light)", color: "#f1f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#11150b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${bricolage.variable}`}>
      <body className="min-h-screen font-sans text-base leading-normal antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
