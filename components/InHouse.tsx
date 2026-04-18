"use client";

import { motion } from "framer-motion";
import { Cpu, FileCheck2, Flame, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeader } from "./Capabilities";

const EASE = [0.23, 1, 0.32, 1] as const;

type Pillar = {
  title: string;
  tag: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  bullets: string[];
};

const pillars: Pillar[] = [
  {
    title: "In‑House Engineering & DER",
    tag: "FAA DER authority",
    description:
      "Design, stress, and structural engineering under one roof — with FAA Designated Engineering Representative authority for repair approvals. We take repairs from concept through DER‑signed 8110‑3 release, no outsourcing, no delays.",
    icon: Cpu,
    bullets: ["DER repair approvals (8110‑3)", "Structural & stress analysis", "Airbus engineering support"],
  },
  {
    title: "PMA Development",
    tag: "FAA approved parts",
    description:
      "End‑to‑end Parts Manufacturer Approval — from identifying the opportunity through FAA submission, testing, and steady‑state production. Often paired with reverse engineering and in‑house machining to close the loop.",
    icon: FileCheck2,
    bullets: ["Opportunity analysis", "FAA submission & testing", "Qualified alternate sources"],
  },
  {
    title: "AWS D17.1 Welding",
    tag: "Aerospace certified",
    description:
      "Certified welding of titanium, stainless, and aluminum under AWS D17.1 — the aerospace fusion welding specification. Manual TIG, procedure‑controlled, and NDT‑verified. Used anywhere structural heat joins are required.",
    icon: Flame,
    bullets: ["Titanium · Stainless · Aluminum", "Certified welders & procedures", "NDT‑verified results"],
  },
];

export default function InHouse() {
  return (
    <section id="in-house" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30 mask-radial" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Engineering Authority"
          title="Design it, approve it, build it — under one roof."
          description="Most MROs ship engineering out. We don't. From DER‑signed repair approvals to PMA development to aerospace‑certified welding, every decision lives inside our walls."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} featured={i === 0} />
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
                Have an unusual problem?
              </div>
              <div className="mt-3 font-display text-2xl md:text-3xl font-semibold text-slate-100 tracking-tight max-w-md">
                Send us the part. We&apos;ll tell you what&apos;s possible.
              </div>
            </div>
            <div className="relative mt-6 inline-flex items-center gap-2 text-accent font-medium">
              Start a conversation
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index, featured }: { pillar: Pillar; index: number; featured?: boolean }) {
  const Icon = pillar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
      className={`group relative rounded-2xl p-8 border bg-ink-900/50 hover:bg-ink-900/80 transition-colors duration-200 overflow-hidden ${
        featured ? "border-accent/30" : "border-white/5 hover:border-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mt-2">
          {pillar.tag}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl font-semibold text-slate-100 tracking-tight">
        {pillar.title}
      </h3>
      <p className="mt-3 text-slate-400 leading-relaxed">{pillar.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {pillar.bullets.map((b) => (
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
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(500px circle at 30% 0%, rgba(125,211,252,0.06), transparent 50%)",
        }}
      />
    </motion.div>
  );
}
