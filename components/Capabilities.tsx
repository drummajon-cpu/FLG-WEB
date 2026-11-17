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
import type { ComponentType } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

type Capability = {
  title: string;
  items: string[];
  icon: ComponentType<{ className?: string }>;
  /** The card's service page, when it has one. */
  href?: string;
};

const capabilities: Capability[] = [
  {
    title: "Flight Structures",
    href: "/services/flight-control-surface-repair",
    icon: PlaneTakeoff,
    items: ["Elevators", "Slats", "Spoilers", "Wings", "Stabilizers"],
  },
  {
    title: "Doors & Access",
    href: "/services/aircraft-doors-cargo-systems",
    icon: DoorOpen,
    items: ["Cabin doors", "Cargo bases & latches", "Blocker doors", "Landing gear doors"],
  },
  {
    title: "Propulsion Systems",
    href: "/services/nacelle-thrust-reverser-repair",
    icon: Fan,
    items: ["Thrust reversers", "Nozzles", "Mufflers", "Exhaust systems"],
  },
  {
    title: "Nacelles & Pylons",
    href: "/services/nacelle-thrust-reverser-repair",
    icon: Disc,
    items: ["Cowlings", "Plenums", "Air intakes", "Ram airs"],
  },
  {
    title: "Interior & Seating",
    href: "/services/aircraft-transparencies-interiors",
    icon: Armchair,
    items: ["Crew seats", "Panels", "Transparency systems"],
  },
  {
    title: "Fuselage Components",
    href: "/services/aircraft-transparencies-interiors",
    icon: AppWindow,
    items: ["Fuselage panels", "Windows", "Switches"],
  },
  {
    title: "Cargo Systems",
    href: "/services/aircraft-doors-cargo-systems",
    icon: Package,
    items: ["Cargo bases", "Latches", "Containment"],
  },
  {
    title: "Spare Parts",
    icon: Layers,
    items: ["Commercial & regional jets", "Sourcing & logistics"],
  },
  {
    title: "Teardown & Storage",
    href: "/services/aircraft-teardown-storage",
    icon: Warehouse,
    items: [
      "Plane‑in‑a‑box disassembly",
      "Serviced rotables & LRUs",
      "Hangar storage for operators",
      "Sebring, FL facility",
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Everything that flies, refined in‑house."
          description="We repair, overhaul, and recertify flight‑critical systems across commercial and regional fleets. All work completed under FAA Part 145, EASA, and UK CAA approvals."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {capabilities.map((c, i) => (
            <CapabilityCard key={c.title} cap={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ cap, index }: { cap: Capability; index: number }) {
  const Icon = cap.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[1.5rem] p-1.5 bg-white/[0.03] ring-1 ring-white/10 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-accent/25 hover:shadow-[0_26px_70px_-24px_rgba(56,189,248,0.22)]"
    >
      <div className="relative rounded-[1.125rem] bg-ink-900/50 p-6 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(125,211,252,0.08), transparent 40%)",
          }}
        />

        <div className="relative flex items-start justify-between">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold text-slate-100 tracking-tight">
          {cap.href ? (
            // The link stretches over the whole card (after:inset-0) so any click opens the page.
            <a href={cap.href} className="after:absolute after:inset-0 after:content-[''] after:rounded-[1.125rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">
              {cap.title}
            </a>
          ) : (
            cap.title
          )}
        </h3>

        <ul className="mt-3 space-y-1.5">
          {cap.items.map((item) => (
            <li key={item} className="text-sm text-slate-400 flex items-start gap-2">
              <Compass className="w-3 h-3 mt-1 text-accent/60 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {cap.href && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
            Learn more
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
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
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
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
        className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-slate-100 max-w-3xl"
      >
        {title}
      </motion.h2>
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
