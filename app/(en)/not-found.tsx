import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { notFoundCopy } from "@/data/home/core";

export const metadata: Metadata = { title: "Page not found | FLG Technics", robots: { index: false } };

export default function NotFound() {
  const t = notFoundCopy.en;
  return (
    <main id="main" className="relative overflow-x-hidden">
      <Nav />
      <section className="relative min-h-[70svh] flex items-center pt-40 pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-accent/50" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">{t.eyebrow}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-[-0.025em] text-slate-50 max-w-3xl leading-[1.05]">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">{t.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/" className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md">
              {t.home} <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
            <a href="/services" className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-200 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]">
              {t.services}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
