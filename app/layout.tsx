import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://flgtechnics.com";
// Bump the `v` param whenever `public/og-image.png` changes so link-unfurling
// caches (iMessage, Slack, Twitter, etc.) re-fetch the fresh image.
const ogImage = `${siteUrl}/og-image.png?v=2`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FLG Technics — Aerospace MRO, Engineering & PMA",
  description:
    "FAA Part 145 repair station. In-house engineering, DER repairs, 3D scanning, reverse engineering, CNC machining, PMA development, and AWS D17.1 certified aerospace welding. Miramar, FL · Since 1998.",
  keywords: [
    "FAA 145",
    "Aerospace MRO",
    "DER repair",
    "PMA development",
    "Reverse engineering",
    "3D scanning",
    "CNC machining",
    "AWS D17.1",
    "Aerospace welding",
    "EASA",
    "UK CAA",
    "Airbus engineering support",
    "Aircraft teardown",
  ],
  authors: [{ name: "FLG Technics" }],
  openGraph: {
    title: "FLG Technics — Aerospace MRO, Engineering & PMA",
    description:
      "FAA Part 145 repair station with in-house engineering, DER repairs, PMA development, and AWS D17.1 welding. Live customer portal. 24/7 AOG.",
    url: siteUrl,
    siteName: "FLG Technics",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "FLG Technics — Aerospace MRO" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLG Technics — Aerospace MRO, Engineering & PMA",
    description:
      "FAA Part 145 repair station. In-house engineering, DER repairs, PMA, AWS D17.1 welding. 24/7 AOG.",
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-ink-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
