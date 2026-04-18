"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Wrench } from "lucide-react";
import { SectionHeader } from "./Capabilities";

const EASE = [0.23, 1, 0.32, 1] as const;

const pillars = [
  { icon: Calendar, label: "Established", value: "1998" },
  { icon: MapPin, label: "Headquarters", value: "Miramar, FL" },
  { icon: Wrench, label: "Facility", value: "50,000 sq ft" },
  { icon: Users, label: "Second site", value: "Sebring, FL — Teardown" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <SectionHeader
              eyebrow="About FLG Technics"
              title="Twenty‑eight years building trust, one repair at a time."
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mt-6 space-y-5 text-slate-400 leading-relaxed text-lg"
            >
              <p>
                FLG Technics started in 1998 with a narrow focus: repairing crew seats better than
                anyone else. Twenty‑eight years later, we are an FAA Part 145 repair station
                specializing in flight structures, transparency, and cargo systems — serving
                commercial and regional operators worldwide.
              </p>
              <p>
                What separates us isn&apos;t scale — it&apos;s the breadth of what we do ourselves.
                Engineering, 3D scanning, CNC machining, PMA development, and certified welding all
                live under one roof in South Florida. That means faster turnarounds, cleaner
                traceability, and real answers when something unusual comes across our dock.
              </p>
              <p>
                Our Sebring, FL site closes the loop for end‑of‑life fleets — "plane‑in‑a‑box"
                teardowns where whole aircraft become serviced, traceable parts ready for the
                aftermarket. We also rent hangar storage to operators and teardown companies that
                need climate‑controlled, airside space.
              </p>
              <p>
                We treat communication as the product as much as the repair. You&apos;ll always know
                where your parts are, what we found, and when they ship.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="relative lg:sticky lg:top-28"
          >
            {/* Facility card with Florida map */}
            <div className="relative rounded-2xl border border-white/5 bg-ink-900/60 overflow-hidden">
              <div className="relative aspect-[3/4] bg-ink-950 overflow-hidden">
                <FloridaMap />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
                    Florida · 2 sites
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent px-2 py-1 rounded border border-accent/30 bg-accent/5 backdrop-blur-sm">
                    Live
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {pillars.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider font-mono text-slate-500">
                            {p.label}
                          </div>
                          <div className="text-slate-200 font-medium mt-0.5">{p.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloridaMap() {
  // Pins placed at exact positions derived from user-confirmed clicks on the
  // FLORIDA IMAGE.png backdrop: Sebring ≈ 78.3% 48.4%, Miramar ≈ 87.4% 65.5%.
  return (
    <>
      <Image
        src="/images/FLORIDA IMAGE.png"
        alt="Florida — FLG Technics facilities"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center"
      />

      {/* Route Sebring → Miramar (real drive path curves east then south) */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <path
          d="M 78.3 48.4 C 82 54, 87 60, 91 63"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.6"
          opacity="0.3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 78.3 48.4 C 82 54, 87 60, 91 63"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="0.5 1.2"
          vectorEffect="non-scaling-stroke"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1.2s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Sebring pin — central FL inland (teal = second site / heritage) */}
      <Pin left="78.3%" top="48.4%" size={10} variant="teal">
        <Callout left="56%" top="40%" title="SEBRING · FL" body="Teardown · End-of-life" variant="teal" />
      </Pin>

      {/* Miramar pin — SE FL between Ft. Lauderdale and Miami */}
      <Pin left="91%" top="63%" size={12} delay={1}>
        <Callout left="56%" top="72%" title="MIRAMAR · HQ" body="Part 145 · MRO" meta="50,000 sq ft" />
      </Pin>

      {/* Distance / time badge — bottom-right corner, out of the way */}
      <div className="absolute right-3 bottom-3 rounded border border-accent/50 bg-ink-950/90 px-2 py-1.5 backdrop-blur-sm">
        <div className="font-mono text-[9px] tracking-[0.18em] text-accent/90 uppercase">
          149 mi · 2h 31m
        </div>
        <div className="font-mono text-[8px] tracking-[0.18em] text-slate-500 uppercase mt-0.5">
          I‑27 · I‑595 · I‑95
        </div>
      </div>
    </>
  );
}

function Pin({
  left,
  top,
  size,
  delay = 0,
  variant = "accent",
  children,
}: {
  left: string;
  top: string;
  size: number;
  delay?: number;
  variant?: "accent" | "teal";
  children?: React.ReactNode;
}) {
  const isTeal = variant === "teal";
  return (
    <>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left, top }}
      >
        <span className="relative flex" style={{ width: size, height: size }}>
          <span
            className={`absolute inset-0 rounded-full opacity-40 ${isTeal ? "bg-teal" : "bg-accent"}`}
            style={{ animation: `ping-grow 3s ease-out ${delay}s infinite` }}
          />
          <span
            className={`relative inline-flex rounded-full ${isTeal ? "bg-teal" : "bg-accent"}`}
            style={{
              width: size,
              height: size,
              boxShadow: isTeal
                ? "0 0 12px rgba(46,185,168,0.8)"
                : "0 0 12px rgba(125,211,252,0.8)",
            }}
          />
        </span>
      </div>
      {children}
      <style jsx>{`
        @keyframes ping-grow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}

function Callout({
  left,
  top,
  title,
  body,
  meta,
  variant = "accent",
}: {
  left: string;
  top: string;
  title: string;
  body: string;
  meta?: string;
  variant?: "accent" | "teal";
}) {
  const isTeal = variant === "teal";
  return (
    <div
      className={`absolute rounded border bg-ink-950/92 backdrop-blur-sm px-2.5 py-1.5 pointer-events-none ${
        isTeal ? "border-teal/40" : "border-accent/40"
      }`}
      style={{ left, top }}
    >
      <div
        className={`font-mono text-[9px] tracking-[0.18em] uppercase ${
          isTeal ? "text-teal-bright" : "text-accent/90"
        }`}
      >
        {title}
      </div>
      <div className="font-mono text-[9px] text-slate-200 mt-0.5">{body}</div>
      {meta && (
        <div className="font-mono text-[8px] tracking-wider text-slate-500 mt-0.5">
          {meta}
        </div>
      )}
    </div>
  );
}

