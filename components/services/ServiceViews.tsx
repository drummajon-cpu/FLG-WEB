import Image from "next/image";
import { ArrowRight, BadgeCheck, Check, ChevronRight, Phone } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { servicePageCopy } from "@/data/home/core";
import type { Service } from "@/data/services";
import { localePath, type Locale } from "@/lib/i18n";
import { SITE, postalAddress } from "@/lib/site";

// The service index and the service detail page, shared by the English routes
// (app/(en)/services) and the Spanish ones (app/(es)/es/services). Server components
// with no framer-motion: the only client JavaScript on these pages is the nav.

/** Static section heading in the house style (eyebrow, hairline, title). */
function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="w-8 h-px bg-accent/50" />
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-slate-100 max-w-3xl">
        {title}
      </h2>
    </div>
  );
}

const cardCls =
  "press group rounded-2xl border border-white/5 bg-ink-900/60 p-6 hover:border-accent/30 transition-colors flex flex-col";

export function ServicesIndexView({ locale, services }: { locale: Locale; services: Service[] }) {
  const t = servicePageCopy[locale];
  const base = `${SITE.url}${localePath(locale, "/services")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${base}/${s.slug}`,
    })),
  };

  return (
    <main id="main" className="relative overflow-x-hidden">
      <Nav locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-accent/50" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">{t.indexEyebrow}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-[-0.025em] text-slate-50 max-w-4xl leading-[1.05]">
            {t.indexTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-400 leading-relaxed">{t.indexBody}</p>

          <div className="mt-14">
            <Heading eyebrow={t.indexListEyebrow} title={t.indexListTitle} />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <a key={s.slug} href={localePath(locale, `/services/${s.slug}`)} className={cardCls}>
                <h3 className="font-display text-xl font-semibold text-slate-100 tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                  {t.learnMore}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>

          <QuoteStrip locale={locale} />
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}

function QuoteStrip({ locale }: { locale: Locale }) {
  const t = servicePageCopy[locale];
  return (
    <div className="mt-12 rounded-2xl border border-white/5 bg-ink-900/50 p-6 md:p-8 flex flex-wrap items-center justify-between gap-5">
      <div>
        <div className="font-display text-xl md:text-2xl font-semibold text-slate-100 tracking-tight">{t.ctaTitle}</div>
        <div className="mt-1 text-sm text-slate-400">
          {t.ctaBody}{" "}
          <a href={SITE.aog.href} className="text-slate-200 underline decoration-accent/50 underline-offset-4 hover:text-white">
            {SITE.aog.display}
          </a>
          .
        </div>
      </div>
      <a
        href={localePath(locale, "/#contact")}
        className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md"
      >
        {t.quote} <ArrowRight className="w-4 h-4" aria-hidden />
      </a>
    </div>
  );
}

export function ServiceView({
  locale,
  service: s,
  all,
}: {
  locale: Locale;
  service: Service;
  /** Every service in this language, for the related cards and the full list. */
  all: Service[];
}) {
  const t = servicePageCopy[locale];
  const home = `${SITE.url}${localePath(locale, "/")}`;
  const index = `${SITE.url}${localePath(locale, "/services")}`;
  const url = `${index}/${s.slug}`;
  const related = s.related.map((slug) => all.find((x) => x.slug === slug)).filter((r) => r !== undefined);
  const others = all.filter((x) => x.slug !== s.slug);

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
        inLanguage: locale,
        areaServed: "Worldwide",
        provider: {
          "@type": "LocalBusiness",
          "@id": `${SITE.url}/#organization`,
          name: SITE.name,
          url: SITE.url,
          telephone: SITE.phone.schema,
          address: postalAddress,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: home },
          { "@type": "ListItem", position: 2, name: t.services, item: index },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
      ...(s.faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: locale,
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
    <main id="main" className="relative overflow-x-hidden">
      <Nav locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-14 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />
        <div className="relative max-w-7xl mx-auto px-6">
          <nav aria-label={t.breadcrumb} className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <a href={localePath(locale, "/")} className="hover:text-slate-100 transition-colors">
              {t.home}
            </a>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <a href={localePath(locale, "/services")} className="hover:text-slate-100 transition-colors">
              {t.services}
            </a>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <span aria-current="page" className="text-slate-300">
              {s.name}
            </span>
          </nav>

          <div className="mt-6 flex items-center gap-3">
            <span className="w-8 h-px bg-accent/50" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">{t.eyebrow}</span>
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
              href={localePath(locale, "/#contact")}
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md"
            >
              {t.quote} <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
            <a
              href={SITE.phone.href}
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-200 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <Phone className="w-4 h-4" aria-hidden /> {SITE.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* What we repair + how */}
      <section className="relative py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">{t.cover}</h2>
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
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">{t.floor}</h2>
            <div className={`mt-8 grid grid-cols-1 gap-4 ${s.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {s.images.map((img) => (
                <figure key={img.src} className="rounded-2xl overflow-hidden border border-white/5 bg-ink-900/60">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        s.images.length > 1
                          ? "(min-width: 1280px) 608px, (min-width: 640px) 50vw, 100vw"
                          : "(min-width: 1280px) 1232px, 100vw"
                      }
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
            {t.approvals.map(([title, body]) => (
              <div key={title} className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden />
                <div>
                  <div className="font-display font-semibold text-slate-100">{title}</div>
                  <div className="text-sm text-slate-400">{body}</div>
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
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">{t.faq}</h2>
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
          <Heading eyebrow={t.relatedEyebrow} title={t.relatedTitle} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <a key={r.slug} href={localePath(locale, `/services/${r.slug}`)} className={cardCls}>
                <h3 className="font-display text-lg font-semibold text-slate-100">{r.name}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                  {t.learnMore}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>

          {/* Every other service, so each service page links to all of the others. */}
          <nav aria-label={t.allServices} className="mt-8">
            <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">{t.allServices}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <a
                    href={localePath(locale, `/services/${o.slug}`)}
                    className="press inline-flex px-3 py-1.5 rounded-md border border-white/10 hover:border-accent/40 bg-white/[0.02] text-sm text-slate-300 hover:text-white"
                  >
                    {o.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <QuoteStrip locale={locale} />
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
