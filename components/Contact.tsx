"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";
import RadioArcs from "./RadioArcs";

const EASE = [0.23, 1, 0.32, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background accents */}
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30 mask-radial" />
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent-deep/10 blur-[120px]" />
      <RadioArcs />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent/50" />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
            Get in touch
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-[-0.025em] text-slate-100 max-w-4xl text-glow"
        >
          AOG or RFQ — we&apos;re already on it.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          className="mt-5 max-w-2xl text-lg text-slate-400"
        >
          Send part numbers, damage photos, or a sketch on a napkin. We&apos;ll respond fast and
          tell you what&apos;s actually possible — including options that aren&apos;t on anyone else&apos;s menu.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3">
          <ContactCard
            icon={Phone}
            label="Call us"
            primary="(954) 385‑3900"
            secondary="Direct line to the shop floor"
            href="tel:+19543853900"
            accent
          />
          <ContactCard
            icon={Mail}
            label="Email"
            primary="repairs@flgtechnics.com"
            secondary="RFQs typically answered same day"
            href="mailto:repairs@flgtechnics.com"
          />
          <ContactCard
            icon={MapPin}
            label="Visit"
            primary="2701 SW 145th Ave #200"
            secondary="Miramar, FL 33027"
            href="https://maps.google.com/?q=2701+SW+145th+Ave+%23200+Miramar+FL+33027"
            external
          />
        </div>

        {/* 24/7 AOG strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-8 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute inset-0 rounded-full animate-ping-slow bg-accent opacity-40" />
              <div className="relative w-11 h-11 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-slate-100 tracking-tight">
                24/7 AOG response
              </div>
              <div className="text-sm text-slate-400 mt-0.5">
                Aircraft on ground? Call the dedicated AOG line anytime — a real person picks up.
              </div>
            </div>
          </div>
          <a
            href="tel:+17545441991"
            className="press inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_32px_-8px_rgba(56,189,248,0.5)]"
          >
            Call AOG · (754) 544‑1991
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  primary,
  secondary,
  href,
  accent,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary: string;
  secondary: string;
  href: string;
  accent?: boolean;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`press group relative rounded-2xl p-6 overflow-hidden border transition-colors duration-200 ${
        accent
          ? "border-accent/30 bg-gradient-to-br from-accent/10 via-ink-900/60 to-ink-900/80"
          : "border-white/5 bg-ink-900/50 hover:bg-ink-900/80 hover:border-white/10"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="mt-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">
          {label}
        </div>
        <div className="mt-2 font-display text-xl font-semibold text-slate-100 tracking-tight">
          {primary}
        </div>
        <div className="mt-1 text-sm text-slate-400">{secondary}</div>
      </div>
    </motion.a>
  );
}
