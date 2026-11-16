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
// Use a versioned filename (not a ?v= query) so every link-unfurling cache —
// including iMessage, which strips/normalizes query strings — treats the
// image as brand new. Bump the `-v{n}` suffix each time the visual changes
// and match it in scripts/og-image.mjs.
const ogImage = `${siteUrl}/og-image-v3.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FLG Technics — Aerospace MRO, Engineering & PMA",
  // Starts with the company name as a full sentence. When the description
  // doesn't read as one, Google ignores it and quotes body copy mid-sentence
  // instead (it was showing "we are an FAA Part 145 repair station…").
  description:
    "FLG Technics is an FAA Part 145 repair station in Miramar, Florida, repairing aircraft flight structures, transparencies, and cargo systems since 1998. In-house engineering, DER repairs, PMA development, CNC machining, and AWS D17.1 welding.",
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

// Structured data for Google: ties the site to the Business Profile (same
// name, address, phone) and tells Search which logo to show. Keep the address
// and phone identical to the Google Business Profile and the Contact/Footer
// components; a mismatch weakens the match.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: "FLG Technics",
  legalName: "FLG Technics, INC",
  url: siteUrl,
  logo: `${siteUrl}/logo-square.png`,
  image: [`${siteUrl}/logo-square.png`, ogImage],
  description:
    "FAA Part 145 repair station repairing aircraft flight structures, transparencies, and cargo systems, with in-house engineering, DER repairs, and PMA development.",
  foundingDate: "1998",
  telephone: "+1-954-385-3900",
  email: "info@flgtechnics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2701 SW 145th Ave, Ste 250",
    addressLocality: "Miramar",
    addressRegion: "FL",
    postalCode: "33027",
    addressCountry: "US",
  },
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-ink-950 text-slate-200 antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
