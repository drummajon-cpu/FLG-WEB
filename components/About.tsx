"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar, Users, Wrench } from "lucide-react";
import { SectionHeader } from "./Capabilities";
import { aboutCopy } from "@/data/home/sections-c";
import type { Locale } from "@/lib/i18n";

const EASE = [0.23, 1, 0.32, 1] as const;

// Icons for the four pillars, in the order of `aboutCopy[locale].pillars`.
const PILLAR_ICONS = [Calendar, MapPin, Wrench, Users];

type MapCopy = (typeof aboutCopy)[Locale]["map"];

export default function About({ locale = "en" }: { locale?: Locale }) {
  const t = aboutCopy[locale];
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <SectionHeader eyebrow={t.eyebrow} title={t.title} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mt-6 space-y-5 text-slate-400 leading-relaxed text-lg"
            >
              {t.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
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
                <FloridaMap copy={t.map} />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                  <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-400">
                    {t.map.sites}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {t.pillars.map((p, i) => {
                    const Icon = PILLAR_ICONS[i];
                    return (
                      <div key={p.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                          <Icon aria-hidden className="w-4 h-4 text-accent" />
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

function FloridaMap({ copy }: { copy: MapCopy }) {
  // The SMIL dash animation loops forever, so it is left out under
  // prefers-reduced-motion. It is also held back until after mount: the server
  // cannot know the preference, and the first client render has to match it.
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const animateRoute = mounted && !reduce;

  // Pins placed at exact positions derived from user-confirmed clicks on the
  // FLORIDA IMAGE.png backdrop: Sebring ≈ 78.3% 48.4%, Miramar ≈ 87.4% 65.5%.
  return (
    <>
      <Image
        src="/images/FLORIDA IMAGE.png"
        alt={copy.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 608px"
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
          {animateRoute && (
            <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1.2s" repeatCount="indefinite" />
          )}
        </path>
      </svg>

      {/* Sebring pin — central FL inland (teal = second site / heritage) */}
      <Pin left="78.3%" top="48.4%" size={10} variant="teal">
        <Callout left="56%" top="40%" title={copy.sebring.title} body={copy.sebring.body} variant="teal" />
      </Pin>

      {/* Miramar pin — SE FL between Ft. Lauderdale and Miami */}
      <Pin left="91%" top="63%" size={12} delay={1}>
        <Callout left="56%" top="72%" title={copy.miramar.title} body={copy.miramar.body} meta={copy.miramar.meta} />
      </Pin>

      {/* Distance / time badge — bottom-right corner, out of the way */}
      <div className="absolute right-3 bottom-3 rounded border border-accent/50 bg-ink-950/90 px-2 py-1.5 backdrop-blur-sm">
        <div className="font-mono text-[9px] tracking-[0.18em] text-accent/90 uppercase">
          {copy.distance}
        </div>
        <div className="font-mono text-[8px] tracking-[0.18em] text-slate-500 uppercase mt-0.5">
          {copy.route}
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
            // Keyframes `ping-grow` live at the end of app/globals.css.
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

