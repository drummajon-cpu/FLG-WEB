"use client";

import { motion } from "framer-motion";
import { Cpu, FileCheck2, Flame, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeader } from "./Capabilities";
import { inHouseCopy, type InHousePillarId } from "@/data/home/sections-b";
import { localePath, type Locale } from "@/lib/i18n";

const EASE = [0.23, 1, 0.32, 1] as const;

type Pillar = {
  id: InHousePillarId;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  href: string;
};

type PillarCopy = (typeof inHouseCopy)[Locale]["pillars"][InHousePillarId];

const pillars: Pillar[] = [
  { id: "der", href: "/services/der-repair-engineering", icon: Cpu },
  { id: "pma", href: "/services/pma-parts-development", icon: FileCheck2 },
  { id: "welding", href: "/services/aws-d17-1-welding", icon: Flame },
];

export default function InHouse({ locale = "en" }: { locale?: Locale }) {
  const t = inHouseCopy[locale];

  return (
    <section id="in-house" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30 mask-radial" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <PillarCard
              key={p.id}
              pillar={p}
              copy={t.pillars[p.id]}
              href={localePath(locale, p.href)}
              index={i}
              featured={i === 0}
            />
          ))}

          {/* Closing callout card */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="press group relative rounded-2xl p-8 overflow-hidden border border-accent/20 bg-gradient-to-br from-accent/10 via-ink-900/60 to-ink-900/80 flex flex-col justify-between min-h-[240px]"
          >
            <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-40" />
            <div className="relative">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
                {t.callout.eyebrow}
              </div>
              <div className="mt-3 font-display text-2xl md:text-3xl font-semibold text-slate-100 tracking-tight max-w-md">
                {t.callout.title}
              </div>
            </div>
            <div className="relative mt-6 inline-flex items-center gap-2 text-accent font-medium">
              {t.callout.cta}
              <ArrowUpRight aria-hidden className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  copy,
  href,
  index,
  featured,
}: {
  pillar: Pillar;
  copy: PillarCopy;
  href: string;
  index: number;
  featured?: boolean;
}) {
  const Icon = pillar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.08, 0.32), ease: EASE }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-[1.75rem] p-1.5 bg-white/[0.03] ring-1 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_26px_70px_-24px_rgba(56,189,248,0.22)] ${
        featured ? "ring-accent/30" : "ring-white/10 hover:ring-accent/25"
      }`}
    >
      <div className="relative rounded-[1.4rem] p-8 bg-ink-900/55 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="flex items-start justify-between gap-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
            <Icon aria-hidden className="w-5 h-5 text-accent" />
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mt-2">
            {copy.tag}
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold text-slate-100 tracking-tight">
          <a href={href} className="after:absolute after:inset-0 after:content-[''] after:rounded-[1.4rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">
            {copy.title}
          </a>
        </h3>
        <p className="mt-3 text-slate-400 leading-relaxed">{copy.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {copy.bullets.map((b) => (
            <span
              key={b}
              className="text-xs font-medium text-slate-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Edge highlight on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(500px circle at 30% 0%, rgba(125,211,252,0.06), transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
}
