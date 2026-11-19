import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "FLG Technics — MRO aeronáutico y reparación de compuestos · Miramar, FL",
  description:
    "FLG Technics es una estación reparadora FAA Part 145 en Miramar, Florida, que repara estructuras de vuelo, transparencias y sistemas de carga de aeronaves desde 1998. Ingeniería propia, reparaciones DER, desarrollo de PMA, mecanizado CNC y soldadura AWS D17.1.",
  authors: [{ name: "FLG Technics" }],
  openGraph: {
    title: "FLG Technics — MRO aeronáutico, ingeniería y PMA",
    description:
      "Estación reparadora FAA Part 145 con ingeniería propia, reparaciones DER, desarrollo de PMA y soldadura AWS D17.1. Portal de clientes en vivo. AOG 24/7.",
    url: `${SITE.url}/es`,
    siteName: "FLG Technics",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "FLG Technics — MRO aeronáutico" }],
    locale: "es_419",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLG Technics — MRO aeronáutico, ingeniería y PMA",
    description:
      "Estación reparadora FAA Part 145. Ingeniería propia, reparaciones DER, PMA, soldadura AWS D17.1. AOG 24/7.",
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="es">{children}</RootShell>;
}
