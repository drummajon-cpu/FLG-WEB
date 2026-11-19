"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "./Capabilities";
import { faqCopy } from "@/data/home/sections-c";
import { homeFaqs } from "@/data/faq";
import type { Locale } from "@/lib/i18n";

const EASE = [0.23, 1, 0.32, 1] as const;

export default function FAQ({ locale = "en" }: { locale?: Locale }) {
  const t = faqCopy[locale];
  const items = homeFaqs[locale];

  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

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
  const id = useId();
  const buttonId = `${id}-q`;
  const panelId = `${id}-a`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2), ease: EASE }}
    >
      <h3>
        {/* `.press` already transitions transform and colours; no Tailwind transition here. */}
        <button
          type="button"
          id={buttonId}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="press w-full flex items-center justify-between gap-4 px-6 py-5 md:px-7 md:py-6 text-left hover:bg-white/[0.02]"
        >
          <span className="font-display text-lg md:text-[19px] font-medium text-slate-100 tracking-tight">
            {item.q}
          </span>
          <span
            className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-[transform,background-color,border-color,color] duration-200 ease-out ${
              open
                ? "bg-teal/10 border-teal/50 text-teal-bright rotate-45"
                : "border-white/10 text-slate-400"
            }`}
          >
            <Plus aria-hidden className="w-4 h-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
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
