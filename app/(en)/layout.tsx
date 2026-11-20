import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { SITE } from "@/lib/site";

// The og image uses a versioned filename (not a ?v= query) so every link-unfurling
// cache, including iMessage, which strips query strings, treats a new image as brand
// new. Bump the `-v{n}` suffix in lib/site.ts each time the visual changes and match
// it in scripts/og-image.mjs.

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "FLG Technics — Aircraft MRO & Composite Repair · Miramar, FL",
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
    url: SITE.url,
    siteName: "FLG Technics",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "FLG Technics — Aerospace MRO" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLG Technics — Aerospace MRO, Engineering & PMA",
    description:
      "FAA Part 145 repair station. In-house engineering, DER repairs, PMA, AWS D17.1 welding. 24/7 AOG.",
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
