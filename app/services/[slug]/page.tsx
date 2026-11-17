import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, ChevronRight, Phone } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SectionHeader } from "@/components/Capabilities";
import { getService, services } from "@/data/services";

const siteUrl = "https://flgtechnics.com";

// Every service page is built at deploy time; an unknown slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `${siteUrl}/services/${s.slug}`;
  const image = s.images[0]?.src ?? "/og-image-v3.png";
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: s.title,
      description: s.description,
      url,
      siteName: "FLG Technics",
      images: [{ url: encodeURI(`${siteUrl}${image}`), alt: s.images[0]?.alt ?? "FLG Technics" }],
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const url = `${siteUrl}/services/${s.slug}`;
  const related = s.related.map(getService).filter((r) => r !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.heading.charAt(0).toUpperCase() + s.heading.slice(1),
        serviceType: s.name,
        description: s.description,
        url,
        areaServed: "Worldwide",
        provider: {
          "@type": "LocalBusiness",
          name: "FLG Technics",
          url: siteUrl,
          telephone: "+1-954-385-3900",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2701 SW 145th Ave, Ste 250",
            addressLocality: "Miramar",
            addressRegion: "FL",
            postalCode: "33027",
            addressCountry: "US",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
      ...(s.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: s.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-14 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />
        <div className="relative max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <a href="/" className="hover:text-slate-300 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <a href="/services" className="hover:text-slate-300 transition-colors">Services</a>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <span className="text-slate-400">{s.name}</span>
          </nav>

          <div className="mt-6 flex items-center gap-3">
            <span className="w-8 h-px bg-accent/50" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
              FAA Part 145 · EASA · UK CAA
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-[-0.025em] text-slate-50 max-w-4xl leading-[1.05] first-letter:uppercase">
            {s.heading}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-lg text-slate-400 leading-relaxed">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/#contact"
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md"
            >
              Request a quote <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
            <a
              href="tel:+19543853900"
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-200 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <Phone className="w-4 h-4" aria-hidden /> (954) 385‑3900
            </a>
          </div>
        </div>
      </section>

      {/* What we repair + how */}
      <section className="relative py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">
              What we cover
            </h2>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {s.components.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-slate-300">
                  <Check className="w-4 h-4 mt-1 text-accent shrink-0" aria-hidden />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.details.map((d) => (
              <div key={d.title} className="rounded-2xl border border-white/5 bg-ink-900/60 p-6">
                <h3 className="font-display text-lg font-semibold text-slate-100 tracking-tight">{d.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos */}
      {s.images.length > 0 && (
        <section className="relative py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">
              From our floor
            </h2>
            <div className={`mt-8 grid grid-cols-1 gap-4 ${s.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {s.images.map((img) => (
                <figure key={img.src} className="rounded-2xl overflow-hidden border border-white/5 bg-ink-900/60">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-5 py-3.5 text-sm text-slate-400">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approvals */}
      <section className="relative py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-ink-900/60 to-ink-900/80 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              ["FAA Part 145", "Certified repair station, every release documented"],
              ["EASA & UK CAA", "Approvals for EU‑ and UK‑registered aircraft"],
              ["Since 1998", "Miramar, Florida · 75,000 sq ft"],
            ].map(([t, b]) => (
              <div key={t} className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden />
                <div>
                  <div className="font-display font-semibold text-slate-100">{t}</div>
                  <div className="text-sm text-slate-400">{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {s.faqs.length > 0 && (
        <section className="relative py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">
              Common questions
            </h2>
            <dl className="mt-8 divide-y divide-white/5 border-y border-white/5">
              {s.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-medium text-slate-100">{f.q}</dt>
                  <dd className="mt-2 text-slate-400 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related + CTA */}
      <section className="relative py-14 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Related services" title="More from the same floor." />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/services/${r.slug}`}
                className="press group rounded-2xl border border-white/5 bg-ink-900/60 p-6 hover:border-accent/30 transition-colors"
              >
                <div className="font-display text-lg font-semibold text-slate-100">{r.name}</div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/5 bg-ink-900/50 p-6 md:p-8 flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="font-display text-xl md:text-2xl font-semibold text-slate-100 tracking-tight">
                Send us the part. We&apos;ll tell you what&apos;s possible.
              </div>
              <div className="mt-1 text-sm text-slate-400">
                Standard RFQs typically get a written quote the same business day. AOG desk 24/7: (754) 544‑1991.
              </div>
            </div>
            <a
              href="/#contact"
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md"
            >
              Request a quote <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
