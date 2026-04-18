"use client";

import { motion } from "framer-motion";
import {
  PlaneTakeoff,
  DoorOpen,
  Cylinder,
  Frame,
  Armchair,
  Package,
  Fan,
  Compass,
  Boxes,
  Warehouse,
} from "lucide-react";
import type { ComponentType } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

type Capability = {
  title: string;
  items: string[];
  icon: ComponentType<{ className?: string }>;
};

const capabilities: Capability[] = [
  {
    title: "Flight Structures",
    icon: PlaneTakeoff,
    items: ["Elevators", "Slats", "Spoilers", "Wings", "Stabilizers"],
  },
  {
    title: "Doors & Access",
    icon: DoorOpen,
    items: ["Cabin doors", "Cargo bases & latches", "Blocker doors", "Landing gear doors"],
  },
  {
    title: "Propulsion Systems",
    icon: Fan,
    items: ["Thrust reversers", "Nozzles", "Mufflers", "Exhaust systems"],
  },
  {
    title: "Nacelles & Pylons",
    icon: Cylinder,
    items: ["Cowlings", "Plenums", "Air intakes", "Ram airs"],
  },
  {
    title: "Interior & Seating",
    icon: Armchair,
    items: ["Crew seats", "Panels", "Transparency systems"],
  },
  {
    title: "Fuselage Components",
    icon: Frame,
    items: ["Fuselage panels", "Windows", "Switches"],
  },
  {
    title: "Cargo Systems",
    icon: Package,
    items: ["Cargo bases", "Latches", "Containment"],
  },
  {
    title: "Spare Parts",
    icon: Boxes,
    items: ["Commercial & regional jets", "Sourcing & logistics"],
  },
  {
    title: "Teardown & Storage",
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24), ease: EASE }}
      className="group relative rounded-xl border border-white/5 bg-ink-900/40 hover:bg-ink-900/80 transition-colors duration-200 p-6 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(125,211,252,0.08), transparent 40%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-slate-100 tracking-tight">
        {cap.title}
      </h3>

      <ul className="mt-3 space-y-1.5">
        {cap.items.map((item) => (
          <li key={item} className="text-sm text-slate-400 flex items-start gap-2">
            <Compass className="w-3 h-3 mt-1 text-accent/60 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
