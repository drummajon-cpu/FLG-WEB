"use client";

import { motion } from "framer-motion";
import {
  Radar,
  ClipboardCheck,
  GitBranch,
  Boxes,
  Smartphone,
  MessageSquare,
  FileText,
  Search,
  Camera,
  ArrowUpRight,
} from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeader } from "./Capabilities";
import DataStream from "./DataStream";

const EASE = [0.23, 1, 0.32, 1] as const;

type Feature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: Radar,
    title: "Live work‑order visibility",
    body: "Every part, every stage, every sign‑off — visible in real time. When a mechanic clocks in, you see it running. You don't wait for a status email. Neither do we.",
  },
  {
    icon: Boxes,
    title: "Proactive parts sourcing",
    body: "Our logic cross‑references the market the moment an RFQ arrives — so we're already sourcing the right parts before your unit hits our floor. Faster quotes, shorter TATs.",
  },
  {
    icon: ClipboardCheck,
    title: "Stage‑locked compliance",
    body: "Work can't advance until the previous step is signed off. The audit trail writes itself because the workflow requires it — not because someone remembers to.",
  },
  {
    icon: GitBranch,
    title: "Traceability, integrated",
    body: "Lot tracking, material certs, DER 8110‑3s, and process records link to the work order from receiving to release. No side spreadsheets. No reconciliation calls.",
  },
];

export default function Systems() {
  return (
    <section id="systems" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background accents */}
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30 mask-radial" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-accent-deep/5 blur-[120px]" />
      <DataStream />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Built‑In Intelligence"
          title="Software built on the shop floor, not in a boardroom."
          description="Most MROs run on spreadsheets bolted to 90s‑era ERPs. We built our own. The tools behind our floor track every part, every stage, and every sign‑off in real time — so your repair quotes come back faster and your audits are already done."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Customer Portal showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-16 relative rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/8 via-ink-900/70 to-ink-900/90 overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30" />
          <div aria-hidden className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-accent-deep/10 blur-[100px]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-10 p-8 md:p-12 items-center">
            {/* Copy */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent">
                  Customer Portal
                </span>
              </div>

              <h3 className="mt-5 font-display text-3xl md:text-[40px] font-semibold tracking-[-0.025em] text-slate-50 leading-[1.05]">
                Your shop floor,
                <br />
                in your pocket.
              </h3>

              <p className="mt-4 text-slate-400 leading-relaxed">
                A dedicated portal — on desktop and mobile — that puts every work
                order, document, photo, and conversation in one place. Look up our
                capabilities by part number. Watch the welder clock in on the unit
                you shipped last Tuesday. Everything you need, at your fingertips.
              </p>

              <div className="mt-5 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2.5">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent/90">
                  Live in the portal right now
                </div>
                <div className="mt-1 text-sm text-slate-200 leading-snug">
                  A330 muffler bracket — OEM obsolete. Reverse‑engineered from a 3D scan, DER‑approved 8110‑3, AWS D17.1 welded in‑house. Ships Thursday.
                </div>
              </div>

              <ul className="mt-6 space-y-2.5">
                {[
                  { icon: Radar, label: "Live work‑order tracking, mechanic‑level activity" },
                  { icon: FileText, label: "All docs, 8130‑3s, invoices in one place" },
                  { icon: Camera, label: "Teardown photos & inspection findings as they happen" },
                  { icon: MessageSquare, label: "Direct chat with your account team" },
                  { icon: Search, label: "Capability lookup by part number" },
                  { icon: Smartphone, label: "Fully responsive — desktop and native‑feel mobile" },
                ].map((row) => {
                  const I = row.icon;
                  return (
                    <li key={row.label} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <I className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm leading-relaxed">{row.label}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 inline-flex items-center gap-2 text-sm text-accent font-medium">
                Existing customers get access on day one
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Portal mockup */}
            <div className="lg:col-span-3">
              <PortalMockup />
            </div>
          </div>
        </motion.div>

        {/* Tagline callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-8 rounded-2xl border border-white/5 bg-ink-900/50 p-6 md:p-7 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="font-display text-lg md:text-xl font-semibold text-slate-200 tracking-tight max-w-2xl">
            The same team that repairs your components built the systems that track them.
          </div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500">
            No vendor tickets · No integration lag
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
      className="group relative rounded-2xl border border-white/5 bg-ink-900/50 hover:bg-ink-900/80 hover:border-white/10 transition-colors duration-200 p-7 overflow-hidden"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-slate-100 tracking-tight">
        {feature.title}
      </h3>
      <p className="mt-2.5 text-slate-400 leading-relaxed">{feature.body}</p>

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

type PortalOrder = { id: string; part: string; stage: string; pct: number; active?: boolean };
const portalOrders: PortalOrder[] = [
  { id: "WO‑260755", part: "767 Aileron", stage: "Paint", pct: 65 },
  { id: "WO‑260834", part: "A330 Muffler Bracket", stage: "Welding", pct: 72, active: true },
  { id: "WO‑260891", part: "Rudder", stage: "Final Assembly", pct: 80 },
];

function PortalMockup() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-ink-950/90 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      {/* Browser chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-ink-900/70">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="font-mono text-[10px] md:text-[11px] tracking-wider text-slate-500">
          portal.flgtechnics.com
        </div>
        <div className="w-10" />
      </div>

      {/* Portal content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 md:p-5 md:min-h-[340px]">
        {/* Orders — horizontal snap-scroll on mobile, vertical column on md+ */}
        <div className="md:col-span-2">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
            Active orders
          </div>
          {/* Negative margin + padding lets the carousel bleed to the card edge on mobile */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 pb-1 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {portalOrders.map((r) => (
              <div
                key={r.id}
                className={`shrink-0 w-[220px] md:w-auto snap-start rounded-lg border p-3 ${
                  r.active
                    ? "border-accent/40 bg-accent/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] tracking-wider text-slate-500">{r.id}</div>
                  {r.active && (
                    <span className="font-mono text-[9px] tracking-wider uppercase text-accent px-1.5 py-0.5 rounded bg-accent/10">
                      Live
                    </span>
                  )}
                </div>
                <div className="mt-1.5 font-medium text-slate-200 text-[13px]">
                  {r.part}
                </div>
                <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full ${r.active ? "bg-accent" : "bg-accent/50"}`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">{r.stage}</span>
                  <span className="text-slate-400">{r.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail pane */}
        <div className="md:col-span-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-wider text-slate-500 truncate">
                WO‑260834 · A330 Muffler Bracket · PN H2614‑9210
              </div>
              <div className="mt-1 font-medium text-slate-200 text-[13px]">
                Welding — pass 3 of 4 in progress
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] text-slate-400">syncing</span>
            </div>
          </div>

          {/* Activity feed — reverse-engineered muffler bracket story */}
          <div className="mt-3 space-y-2 text-[11px]">
            <ActivityRow icon="●" color="accent" label="Welder M.O. clocked in (AWS D17.1)" time="3m ago" />
            <ActivityRow icon="✓" color="slate" label="Weld pass 2/4 complete · visual PASS" time="18m ago" />
            <ActivityRow icon="✎" color="slate" label="DER 8110‑3 signed — repair approved" time="1h ago" />
            <ActivityRow icon="▸" color="slate" label="CNC fixture machined from scan CAD" time="3h ago" />
          </div>

          {/* Chat stub */}
          <div className="mt-auto pt-3 border-t border-white/5">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
              Chat · Account team
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center font-mono text-[10px] text-accent shrink-0">
                J.R.
              </div>
              <div className="min-w-0 rounded-lg bg-white/[0.03] border border-white/5 px-2.5 py-1.5 text-[11px] text-slate-300">
                OEM bracket is discontinued — we reverse‑engineered from the scan, DER approved the 8110‑3 this morning, welding pass 3 starting now. On track for Thursday release.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityRow({
  icon,
  color,
  label,
  time,
}: {
  icon: string;
  color: "accent" | "slate";
  label: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5 rounded border border-white/5 bg-white/[0.02]">
      <div className="flex items-center gap-2">
        <span className={`font-mono text-[10px] ${color === "accent" ? "text-accent" : "text-slate-500"}`}>
          {icon}
        </span>
        <span className="text-slate-300">{label}</span>
      </div>
      <span className="font-mono text-[9px] text-slate-500">{time}</span>
    </div>
  );
}
