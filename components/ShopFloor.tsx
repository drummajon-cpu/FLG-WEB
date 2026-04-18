"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScanLine, Wrench } from "lucide-react";
import { SectionHeader } from "./Capabilities";

const EASE = [0.23, 1, 0.32, 1] as const;

export default function ShopFloor() {
  return (
    <section id="shop" className="relative py-28 md:py-36 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-20 mask-radial" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Inside The Shop"
          title="75,000 sq ft of structure work, all under one roof."
          description="Our Miramar, FL facility is purpose‑built for flight‑control surfaces, flaps, and engine inlets — backed by in‑house 3D scanning and a multi‑axis CNC machine shop for rapid tooling and PMA production."
        />

        {/* Bento grid: large facility hero + stacked CNC/3D scanner on the right */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-[minmax(240px,auto)]">
          {/* Facility aerial — spans 2 cols, 2 rows. Painted logo on right wall */}
          <FacilityCard />

          {/* CNC machine — right column top */}
          <ShopCard
            src="/images/cnc-machine.jpg"
            alt="CNC machining center"
            eyebrow="CNC Machine Shop"
            title="Multi‑axis CNC"
            body="3, 4, and 5‑axis machining in titanium, stainless, and aluminum — prototype to production, all inspected and traceable."
            icon={Wrench}
          />

          {/* 3D scanner — right column bottom */}
          <ShopCard
            src="/images/3d-scanner.jpg"
            alt="Structured‑light 3D scanner on an aircraft control surface"
            eyebrow="3D Scanning"
            title="Sub‑millimeter damage mapping"
            body="Structured‑light capture maps surface damage, wear, and deformation to sub‑millimeter precision — inspection findings become real measurements, not estimates. Same workflow drives reverse engineering of obsolete parts into PMA‑ready CAD."
            icon={ScanLine}
            variant="teal"
          />
        </div>
      </div>
    </section>
  );
}

function FacilityCard() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative lg:col-span-2 lg:row-span-2 rounded-2xl border border-white/5 bg-ink-900 overflow-hidden group"
    >
      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
        <Image
          src="/images/facility-aerial.jpg"
          alt="FLG Technics facility — overhead view of the shop floor"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
        />

        {/* Gradient for caption legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />

        {/* Corner brackets */}
        <div aria-hidden className="absolute top-4 left-4 w-5 h-5 border-l border-t border-accent/50" />
        <div aria-hidden className="absolute top-4 right-4 w-5 h-5 border-r border-t border-accent/50" />
        <div aria-hidden className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-accent/50" />
        <div aria-hidden className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-accent/50" />
      </div>

      <figcaption className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
            Miramar, FL · HQ
          </div>
          <div className="mt-2 font-display text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Our floor.
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 px-2.5 py-1 rounded-full border border-white/10 bg-ink-950/50 backdrop-blur-sm">
          75,000 sq ft · FAA 145
        </div>
      </figcaption>
    </motion.figure>
  );
}

function ShopCard({
  src,
  alt,
  eyebrow,
  title,
  body,
  icon: Icon,
  variant = "accent",
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "accent" | "teal";
}) {
  const isTeal = variant === "teal";
  const borderCls = isTeal ? "border-teal/30" : "border-accent/30";
  const textCls = isTeal ? "text-teal-bright" : "text-accent";
  const eyebrowCls = isTeal ? "text-teal-bright/90" : "text-accent/90";
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
      className="relative rounded-2xl border border-white/5 bg-ink-900 overflow-hidden group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg bg-ink-950/80 border backdrop-blur-sm flex items-center justify-center ${borderCls}`}>
            <Icon className={`w-4 h-4 ${textCls}`} />
          </div>
          <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${eyebrowCls}`}>
            {eyebrow}
          </span>
        </div>
      </div>
      <figcaption className="p-5">
        <div className="font-display text-lg font-semibold text-slate-100 tracking-tight">
          {title}
        </div>
        <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{body}</p>
      </figcaption>
    </motion.figure>
  );
}
