"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calendar, Check, Globe2, MapPin, Wrench } from "lucide-react";
import { SectionHeader } from "../Capabilities";
import ApplyForm from "./ApplyForm";
import { roles, type RoleKey } from "@/data/careers";

const EASE = [0.23, 1, 0.32, 1] as const;

// "Why FLG": wording taken from the home page (Certifications, About, InHouse).
const reasons = [
  {
    icon: BadgeCheck,
    title: "FAA Part 145 repair station",
    body: "Every repair documented, traceable, and released under accredited approvals.",
  },
  {
    icon: Globe2,
    title: "EASA and UK CAA approvals",
    body: "Part 145 approvals from the authorities our customers fly under.",
  },
  {
    icon: Calendar,
    title: "Since 1998",
    body: "Twenty‑eight years building trust, one repair at a time.",
  },
  {
    icon: MapPin,
    title: "Miramar, FL",
    body: "A 75,000 sq ft facility in South Florida, plus our Sebring, FL teardown site.",
  },
  {
    icon: Wrench,
    title: "In‑house engineering",
    body: "Design, stress, and structural engineering under one roof, with DER authority for repair approvals.",
  },
];

export default function Careers() {
  const [role, setRole] = useState<RoleKey | "">("");

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-radial" />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Careers at FLG Technics"
            title="Do the work that keeps aircraft flying."
            description="We're hiring aircraft mechanics and inspectors, plus experienced aerospace management and quality people. Join an FAA Part 145 repair station that does its own engineering, machining and welding under one roof."
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#roles"
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md"
            >
              See open roles <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
            <a
              href="#apply"
              className="press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-200 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              Apply now
            </a>
          </motion.div>
        </div>
      </section>

      <section id="roles" className="relative py-16 md:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Open roles" title="Who we're looking for." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {roles.map((r, i) => (
              <motion.article
                key={r.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25), ease: EASE }}
                className={`rounded-[1.25rem] p-1.5 ring-1 ${
                  r.key === "general" ? "bg-accent/[0.03] ring-accent/20" : "bg-white/[0.03] ring-white/10"
                }`}
              >
                <div className="h-full flex flex-col rounded-[1rem] bg-ink-900/50 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">{r.tag}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-slate-100 tracking-tight">{r.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{r.summary}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {r.requirements.map((q) => (
                      <li key={q} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 mt-0.5 text-accent/80 shrink-0" aria-hidden />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#apply"
                    onClick={() => setRole(r.key)}
                    className="press mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-100 rounded-md border border-accent/40 bg-accent/10 hover:bg-accent/15"
                    aria-label={`Apply: ${r.title}`}
                  >
                    {r.key === "general" ? "Send your résumé" : "Apply"} <ArrowRight className="w-4 h-4" aria-hidden />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Why FLG" title="A shop that does the hard work itself." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {reasons.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-xl border border-white/5 bg-ink-900/60 p-5">
                  <Icon className="w-5 h-5 text-accent" aria-hidden />
                  <div className="mt-3 font-display text-base font-semibold text-slate-100">{w.title}</div>
                  <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="apply" className="relative py-16 md:py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            eyebrow="Apply"
            title="Send us your application."
            description="It takes a few minutes. We read every one."
          />
          <div className="mt-10 rounded-2xl border border-white/10 bg-ink-900/40 p-5 sm:p-8">
            <ApplyForm role={role} onRoleChange={setRole} />
          </div>
        </div>
      </section>
    </>
  );
}
