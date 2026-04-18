"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Award, Flame } from "lucide-react";
import { SectionHeader } from "./Capabilities";
import type { ComponentType } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

type Cert = {
  name: string;
  detail: string;
  scope: string;
  icon: ComponentType<{ className?: string }>;
};

const certs: Cert[] = [
  {
    name: "FAA Part 145",
    detail: "Repair Station",
    scope: "Federal Aviation Administration approved for airframe, accessory, and specialized service ratings.",
    icon: ShieldCheck,
  },
  {
    name: "EASA",
    detail: "Part 145 Approval",
    scope: "European Union Aviation Safety Agency — foreign repair station authorization for EU operators.",
    icon: BadgeCheck,
  },
  {
    name: "UK CAA",
    detail: "Part 145 Approval",
    scope: "United Kingdom Civil Aviation Authority — post‑Brexit approval for UK‑registered aircraft.",
    icon: Award,
  },
  {
    name: "AWS D17.1",
    detail: "Aerospace Fusion Welding",
    scope: "Certified welders & procedures for titanium, stainless, and aluminum per the aerospace welding specification.",
    icon: Flame,
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Accreditation"
          title="Approved by the authorities you fly under."
          description="Every repair, every PMA, every weld — documented, traceable, and released under accredited approvals."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {certs.map((c, i) => (
            <CertCard key={c.name} cert={c} index={i} />
          ))}
        </div>

        {/* Compliance strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="mt-10 rounded-xl border border-white/5 bg-ink-900/50 px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3 justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="font-medium text-slate-200">Quality Management System</div>
              <div className="text-sm text-slate-500">
                Written procedures, calibrated tooling, and full traceability on every work order.
              </div>
            </div>
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">
            Documented · Audited · Released
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const Icon = cert.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
      className="group relative rounded-xl border border-white/5 bg-ink-900/50 hover:bg-ink-900/80 transition-colors duration-200 p-6 overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_12px_rgba(125,211,252,0.6)]" />
      </div>
      <div className="mt-6 font-display text-xl font-semibold text-slate-100 tracking-tight">
        {cert.name}
      </div>
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mt-1">
        {cert.detail}
      </div>
      <p className="mt-3 text-sm text-slate-400 leading-relaxed">{cert.scope}</p>
    </motion.div>
  );
}
