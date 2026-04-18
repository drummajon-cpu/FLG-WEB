"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "./Capabilities";

const EASE = [0.23, 1, 0.32, 1] as const;

const items = [
  {
    q: "What regulatory approvals do you hold?",
    a: "FLG Technics operates under FAA Part 145 approval (certificate number displayed on request), with EASA and UK CAA foreign‑repair‑station approvals for work on EU‑ and UK‑registered aircraft. Certified welding is performed to AWS D17.1 — the aerospace fusion specification for titanium, stainless, and aluminum.",
  },
  {
    q: "Do you handle DER repairs and PMA parts?",
    a: "Yes. Our in‑house engineering team holds FAA Designated Engineering Representative authority — we issue 8110‑3 repair approvals and develop Parts Manufacturer Approval (PMA) replacements end to end, from opportunity analysis through testing and steady‑state production.",
  },
  {
    q: "What aircraft types do you service?",
    a: "Commercial and regional jets including Boeing 737/747/757/767/777, Airbus A320 family, A330, A350, and regional types (CRJ, ERJ, Q400). We specialize in flight structures — ailerons, flaps, spoilers, rudders, leading edges — plus engine inlets, thrust reversers, doors, and cargo systems.",
  },
  {
    q: "How fast is AOG turnaround?",
    a: "Our AOG desk is staffed 24/7 at (754) 544‑1991. Typical AOG response is within the hour on the phone, on‑dock same‑day or next‑day depending on origin, and expedited turn times negotiated per event. Most AOG parts ship within 48–72 hours once received.",
  },
  {
    q: "Can I see the status of my work order?",
    a: "Yes. Every customer gets access to our dedicated portal (desktop + mobile) where you can track work‑order progress in real time — including mechanic clock‑ins, stage completions, teardown photos, inspection findings, and document releases. Direct chat with your account team is built in.",
  },
  {
    q: "Do you offer teardown and storage services?",
    a: "Yes — both — through our Sebring, FL site. We do \"plane‑in‑a‑box\" teardowns: whole aircraft disassembly, units serviced in‑house, and serviceable rotables, LRUs, and structural components returned to the aftermarket ready to go, with full traceability. We also rent hangar storage to other operators and teardown companies that need airside, climate‑controlled space for staged aircraft or inventory.",
  },
  {
    q: "What's your quote turnaround time?",
    a: "Standard RFQs typically receive a written quote the same business day. This is possible because our proprietary systems cross‑reference inventory, capability, and market data the moment an RFQ arrives — we're often sourcing parts before your unit hits our dock.",
  },
  {
    q: "Where are you located? Do you accept international work?",
    a: "Headquartered in Miramar, FL (50,000 sq ft primary facility) with a second site in Sebring, FL for teardown and end‑of‑life. We service operators worldwide under our FAA/EASA/UK CAA approvals — shipping and customs handled.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Things procurement teams ask before the first call."
          description="Short answers to the questions that come up most often. For anything not covered, reach out to repairs@flgtechnics.com or call the AOG line."
        />

        <div className="mt-12 rounded-2xl border border-white/5 bg-ink-900/50 overflow-hidden divide-y divide-white/5">
          {items.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  index,
}: {
  item: { q: string; a: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2), ease: EASE }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="press w-full flex items-center justify-between gap-4 px-6 py-5 md:px-7 md:py-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-display text-lg md:text-[19px] font-medium text-slate-100 tracking-tight">
          {item.q}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ease-out ${
            open
              ? "bg-teal/10 border-teal/50 text-teal-bright rotate-45"
              : "border-white/10 text-slate-400"
          }`}
        >
          <Plus className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-6 text-slate-400 leading-relaxed max-w-3xl">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
