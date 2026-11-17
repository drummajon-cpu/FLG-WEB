import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SectionHeader } from "@/components/Capabilities";
import { services } from "@/data/services";

const siteUrl = "https://flgtechnics.com";
const title = "Aircraft Component Repair Services | FLG Technics";
const description =
  "Flight control surfaces, nacelles and thrust reversers, doors and cargo systems, transparencies, DER repairs, PMA, AWS D17.1 welding and aircraft teardown. FAA Part 145.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/services`,
    siteName: "FLG Technics",
    images: [{ url: `${siteUrl}/og-image-v3.png`, width: 1200, height: 630, alt: "FLG Technics services" }],
    type: "website",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteUrl}/services/${s.slug}`,
    })),
  };

  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-accent/50" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">Services</span>
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-[-0.025em] text-slate-50 max-w-4xl leading-[1.05]">
            Aircraft component repair, engineering and PMA.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-400 leading-relaxed">
            FLG Technics is an FAA Part 145 repair station in Miramar, Florida, with EASA and UK CAA approvals.
            Since 1998 we have repaired flight structures, nacelles, doors, cargo systems and transparencies for
            commercial and regional fleets, with engineering, machining and welding all in‑house.
          </p>

          <div className="mt-14">
            <SectionHeader eyebrow="What we do" title="Choose a service." />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="press group rounded-2xl border border-white/5 bg-ink-900/60 p-6 hover:border-accent/30 transition-colors flex flex-col"
              >
                <h2 className="font-display text-xl font-semibold text-slate-100 tracking-tight">{s.name}</h2>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
