import { Phone, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";
import RadioArcs from "./RadioArcs";
import RfqForm from "./RfqForm";
import { contactCopy } from "@/data/home/core";
import type { Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// Server component: the only interactive part is the quote form (RfqForm). Name,
// address and phone come from lib/site.ts, the same source as the footer and the
// JSON-LD, so the three always match.
export default function Contact({ locale = "en" }: { locale?: Locale }) {
  const t = contactCopy[locale];
  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden scroll-mt-24">
      {/* Background accents */}
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30 mask-radial" />
      {/* Cyan halo behind the heading: a radial gradient whose falloff reaches zero at
          its own edge, so the section's overflow-hidden has nothing to clip. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[900px] w-[1100px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(48% 38% at 50% 38%, rgba(14,165,233,0.13) 0%, rgba(14,165,233,0.065) 50%, rgba(14,165,233,0) 100%)",
        }}
      />
      <RadioArcs />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-accent/50" />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">{t.eyebrow}</span>
        </div>

        <h2 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-[-0.025em] text-slate-100 max-w-4xl text-glow">
          {t.title}
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-slate-400">{t.body}</p>

        {/* 24/7 AOG strip: first, because an AOG caller should not have to read a form. */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <span className="absolute inset-0 rounded-full animate-ping-slow bg-accent opacity-40" />
              <div className="relative w-11 h-11 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" aria-hidden />
              </div>
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-slate-100 tracking-tight">{t.aogTitle}</div>
              <div className="text-sm text-slate-400 mt-0.5">{t.aogBody}</div>
            </div>
          </div>
          <a
            href={SITE.aog.href}
            className="press inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_32px_-8px_rgba(56,189,248,0.5)]"
          >
            {t.aogCta} {SITE.aog.display}
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Quote request */}
          <div id="quote" className="lg:col-span-3 scroll-mt-36 rounded-2xl border border-white/10 bg-ink-900/60 p-6 md:p-8">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">{t.rfq.eyebrow}</div>
            <h3 className="mt-2 mb-5 font-display text-2xl font-semibold text-slate-100 tracking-tight">{t.rfq.title}</h3>
            <RfqForm locale={locale} />
          </div>

          {/* Direct lines */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 content-start">
            <ContactCard
              icon={Phone}
              label={t.call.label}
              primary={SITE.phone.display}
              secondary={t.call.secondary}
              href={SITE.phone.href}
              accent
            />
            <ContactCard
              icon={Mail}
              label={t.email.label}
              primary={SITE.email}
              secondary={t.email.secondary}
              href={`mailto:${SITE.email}`}
            />
            <ContactCard
              icon={MapPin}
              label={t.visit.label}
              primary={SITE.address.street}
              secondary={SITE.address.cityLine}
              href={SITE.mapsUrl}
              external
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  primary,
  secondary,
  href,
  accent,
  external,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  primary: string;
  secondary: string;
  href: string;
  accent?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`press group relative rounded-2xl p-5 overflow-hidden border transition-[transform,border-color,background-color] duration-300 ease-out-expo hover:-translate-y-0.5 ${
        accent
          ? "border-accent/30 bg-gradient-to-br from-accent/10 via-ink-900/60 to-ink-900/80"
          : "border-white/10 bg-ink-900/50 hover:border-accent/25"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" aria-hidden />
        </div>
        <ArrowUpRight
          className="w-4 h-4 text-slate-500 group-hover:text-accent transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
      <div className="mt-4">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">{label}</div>
        <div className="mt-1.5 font-display text-lg font-semibold text-slate-100 tracking-tight break-words">{primary}</div>
        <div className="mt-1 text-sm text-slate-400">{secondary}</div>
      </div>
    </a>
  );
}
