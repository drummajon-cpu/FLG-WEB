"use client";

import { motion } from "framer-motion";
import { PlaneTakeoff } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

// Fleet families we service — swap for real operator logos when the client
// provides them (add files to /public/images/clients and reference here).
const fleets = [
  "B737",
  "B747",
  "B757",
  "B767",
  "B777",
  "A320",
  "A321",
  "A330",
  "A350",
  "CRJ‑900",
  "ERJ‑175",
  "Q400",
];

export default function TrustedBy() {
  return (
    <section className="relative py-16 border-y border-white/5 overflow-hidden bg-ink-950">
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-20 mask-radial" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center justify-center gap-3 text-slate-500"
        >
          <span className="w-6 h-px bg-slate-700" />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
            Fleets we service
          </span>
          <span className="w-6 h-px bg-slate-700" />
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {fleets.map((fleet, i) => (
            <motion.div
              key={fleet}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3), ease: EASE }}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-200"
            >
              <PlaneTakeoff className="w-3.5 h-3.5 text-accent/70 group-hover:text-accent transition-colors" />
              <span className="font-mono text-xs tracking-wider text-slate-300">
                {fleet}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
          className="mt-8 text-center font-mono text-[11px] tracking-wider uppercase text-slate-500"
        >
          Commercial · Regional · Freight · Charter operators worldwide
        </motion.p>
      </div>
    </section>
  );
}
