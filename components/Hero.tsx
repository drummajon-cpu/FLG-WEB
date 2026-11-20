import { ArrowRight, Phone, Flame } from "lucide-react";
import { heroCopy } from "@/data/home/core";
import { localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// Same switch as the nav (components/Nav.tsx): set in Vercel when /inventory is public.
const showInventory = process.env.NEXT_PUBLIC_SHOW_INVENTORY_LINK === "1";

// A server component on purpose. The headline is the page's largest paint: it used to
// be a framer-motion element rendered at opacity 0, so nothing showed until the
// JavaScript had downloaded and hydrated. Now the headline is plain HTML that paints
// with the first frame, and the supporting rows fade up with a CSS animation
// (.hero-rise in globals.css) that needs no JavaScript and collapses under
// prefers-reduced-motion.
export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = heroCopy[locale];
  return (
    <section id="top" className="relative min-h-[calc(100svh-2.25rem)] flex items-center pt-28 pb-24 overflow-hidden">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60 mask-radial" />
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-40 mask-radial" />

      {/* Ambient glows. Radial gradients that reach zero at their own edge: a blurred
          circle here would be clipped by the section's overflow-hidden and costs a
          900px blur layer on every phone. */}
      <div
        aria-hidden
        className="absolute -top-64 left-1/2 -translate-x-1/2 h-[1200px] w-[1200px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(14,165,233,0.10) 0%, rgba(14,165,233,0.05) 45%, rgba(14,165,233,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/4 h-[700px] w-[900px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(46,185,168,0.11) 0%, rgba(46,185,168,0.055) 50%, rgba(46,185,168,0) 100%)",
        }}
      />

      {/* Scan line */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
      </div>

      {/* Corner brackets */}
      <Corners />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="hero-rise flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-300">
              {t.badgeApprovals}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal/30 bg-teal/[0.07]">
            <Flame className="w-3.5 h-3.5 text-teal-bright" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-teal-bright">
              {t.badgeWelding}
            </span>
          </div>
        </div>

        <h1 className="mt-6 font-display font-semibold tracking-[-0.03em] text-[clamp(2.6rem,7vw,5.75rem)] leading-[0.95] text-slate-50 text-glow">
          {t.h1Lead}
          <br />
          <span className="text-accent">{t.h1Accent}</span> {t.h1Tail}
        </h1>

        <p className="mt-7 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed">{t.body}</p>

        <div className="hero-rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "120ms" }}>
          <a
            href="#contact"
            className="press group inline-flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-accent hover:bg-accent-bright text-ink-950 font-medium shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_12px_40px_-10px_rgba(56,189,248,0.5)]"
          >
            {t.quote}
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ink-950/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <ArrowRight className="w-4 h-4" aria-hidden />
            </span>
          </a>
          {/* Parts buyers go to the live inventory; repair work stays on Request a Quote.
              Falls back to Explore Capabilities while the inventory page is not public. */}
          <a
            href={showInventory ? "/inventory" : "#capabilities"}
            className="press inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-slate-200 font-medium"
          >
            {showInventory ? (
              <>
                {t.inventory}
                <ArrowRight className="w-4 h-4" aria-hidden />
              </>
            ) : (
              t.capabilities
            )}
          </a>
          <a
            href={SITE.aog.href}
            className="press inline-flex items-center gap-2 px-3 py-3 text-sm text-slate-300 hover:text-white rounded-md"
          >
            <Phone className="w-4 h-4 text-accent" aria-hidden />
            <span>
              {t.aog} <span className="font-medium text-slate-100">{SITE.aog.display}</span>
            </span>
          </a>
        </div>

        {/* Stats strip — double-bezel machined tray */}
        <div
          className="hero-rise mt-16 md:mt-20 rounded-[1.5rem] p-1.5 bg-white/[0.03] ring-1 ring-white/10 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "220ms" }}
        >
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-[1.125rem] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            {t.stats.map((s) => (
              <div
                key={s.label}
                className="group/stat flex flex-col-reverse justify-end bg-ink-900/80 hover:bg-ink-900 transition-colors duration-300 px-6 py-6"
              >
                <dt className="mt-1 text-xs uppercase tracking-wider font-mono text-slate-500 group-hover/stat:text-slate-400 transition-colors">
                  {s.label}
                </dt>
                <dd className="font-display text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight tabular-nums">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Corners() {
  return (
    <>
      <div aria-hidden className="absolute top-24 left-6 w-5 h-5 border-l border-t border-accent/40" />
      <div aria-hidden className="absolute top-24 right-6 w-5 h-5 border-r border-t border-accent/40" />
      <div aria-hidden className="absolute bottom-8 left-6 w-5 h-5 border-l border-b border-accent/40" />
      <div aria-hidden className="absolute bottom-8 right-6 w-5 h-5 border-r border-b border-accent/40" />
    </>
  );
}
