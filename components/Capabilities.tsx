"use client";

import { motion } from "framer-motion";
import {
  PlaneTakeoff,
  DoorOpen,
  Disc,
  AppWindow,
  Armchair,
  Package,
  Fan,
  Compass,
  Layers,
  Warehouse,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import { capabilitiesCopy } from "@/data/home/sections-a";

const EASE = [0.23, 1, 0.32, 1] as const;

type CapabilityId = keyof (typeof capabilitiesCopy)["en"]["cards"];

type Capability = {
  /** Key of the card's title and items in the copy file. */
  id: CapabilityId;
  icon: LucideIcon;
  /** The card's service page, when it has one. */
  href?: string;
};

const capabilities: Capability[] = [
  {
    id: "flightStructures",
    href: "/services/flight-control-surface-repair",
    icon: PlaneTakeoff,
  },
  {
    id: "doors",
    href: "/services/aircraft-doors-cargo-systems",
    icon: DoorOpen,
  },
  {
    id: "propulsion",
    href: "/services/nacelle-thrust-reverser-repair",
    icon: Fan,
  },
  {
    id: "nacelles",
    href: "/services/nacelle-thrust-reverser-repair",
    icon: Disc,
  },
  {
    id: "interior",
    href: "/services/aircraft-transparencies-interiors",
    icon: Armchair,
  },
  {
    id: "fuselage",
    href: "/services/aircraft-transparencies-interiors",
    icon: AppWindow,
  },
  {
    id: "cargo",
    href: "/services/aircraft-doors-cargo-systems",
    icon: Package,
  },
  {
    id: "spares",
    icon: Layers,
  },
  {
    id: "teardown",
    href: "/services/aircraft-teardown-storage",
    icon: Warehouse,
  },
];

export default function Capabilities({ locale = "en" }: { locale?: Locale }) {
  const t = capabilitiesCopy[locale];

  return (
    <section id="capabilities" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {capabilities.map((c, i) => (
            <CapabilityCard key={c.id} cap={c} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  cap,
  index,
  locale,
}: {
  cap: Capability;
  index: number;
  locale: Locale;
}) {
  const t = capabilitiesCopy[locale];
  const card = t.cards[cap.id];
  const Icon = cap.icon;
  const linked = Boolean(cap.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
      whileHover={linked ? { y: -4 } : undefined}
      className={`group relative rounded-[1.5rem] p-1.5 bg-white/[0.03] ring-1 ring-white/10 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        linked
          ? "hover:ring-accent/25 hover:shadow-[0_26px_70px_-24px_rgba(56,189,248,0.22)]"
          : ""
      }`}
    >
      <div className="relative rounded-[1.125rem] bg-ink-900/50 p-6 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Hover glow — only on cards that lead somewhere */}
        {linked && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(600px circle at 50% 0%, rgba(125,211,252,0.08), transparent 40%)",
            }}
          />
        )}

        <div className="relative flex items-start justify-between">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
            <Icon aria-hidden className="w-5 h-5 text-accent" />
          </div>
          <span className="font-mono text-[11px] tracking-widest uppercase text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold text-slate-100 tracking-tight">
          {cap.href ? (
            // The link stretches over the whole card (after:inset-0) so any click opens the page.
            <a
              href={localePath(locale, cap.href)}
              className="after:absolute after:inset-0 after:content-[''] after:rounded-[1.125rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
            >
              {card.title}
            </a>
          ) : (
            card.title
          )}
        </h3>

        <ul className="mt-3 space-y-1.5">
          {card.items.map((item) => (
            <li key={item} className="text-sm text-slate-400 flex items-start gap-2">
              <Compass aria-hidden className="w-3 h-3 mt-1 text-accent/60 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {cap.href && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
            {t.learnMore}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Heading level for the title; defaults to h2. */
  as?: "h1" | "h2";
}) {
  const Heading = as === "h1" ? motion.h1 : motion.h2;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex items-center gap-3"
      >
        <span className="w-8 h-px bg-accent/50" />
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
          {eyebrow}
        </span>
      </motion.div>
      <Heading
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
        className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-slate-100 max-w-3xl"
      >
        {title}
      </Heading>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-4 max-w-2xl text-lg text-slate-400 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
