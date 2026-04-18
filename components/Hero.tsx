"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-28 pb-24 overflow-hidden">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60 mask-radial" />
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-40 mask-radial" />

      {/* Ambient glow */}
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-accent-deep/10 blur-[120px]" />
      <div aria-hidden className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-teal/10 blur-[100px]" />

      {/* Scan line */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
      </div>

      {/* Corner brackets */}
      <Corners />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-300">
            FAA Part 145 · EASA · UK CAA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="mt-6 font-display font-semibold tracking-[-0.03em] text-[clamp(2.6rem,7vw,5.75rem)] leading-[0.95] text-slate-50 text-glow"
        >
          One MRO for the
          <br />
          <span className="text-accent">flight‑critical</span> systems that keep you flying.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="mt-7 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed"
        >
          Full‑service repair, in‑house engineering, reverse engineering and PMA development
          for commercial and regional aircraft. Since 1998 — based in South Florida, trusted worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="press group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_12px_40px_-10px_rgba(56,189,248,0.5)]"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </a>
          <a
            href="#capabilities"
            className="press inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-slate-200 font-medium"
          >
            Explore Capabilities
          </a>
          <div className="hidden md:flex items-center gap-2 pl-3 ml-2 border-l border-white/10 text-sm text-slate-500">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>24/7 AOG support</span>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5"
        >
          {[
            { target: 28, suffix: "+", label: "Years in service" },
            { target: 50, suffix: "k", label: "Sq ft MRO facility" },
            { text: "24/7", label: "AOG response" },
            { target: 4, suffix: "", label: "Aviation approvals" },
          ].map((s, i) => (
            <div key={s.label} className="bg-ink-900/60 backdrop-blur-sm px-6 py-6">
              <div className="font-display text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight">
                {"text" in s ? s.text : <Counter target={s.target!} suffix={s.suffix!} delay={i * 120} />}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider font-mono text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({
  target,
  suffix,
  delay = 0,
}: {
  target: number;
  suffix: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const startTime = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      // Strong ease-out (cubic-bezier 0.23, 1, 0.32, 1 approximated)
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

function Corners() {
  return (
    <>
      <div aria-hidden className="absolute top-24 left-6 w-5 h-5 border-l border-t border-accent/40" />
      <div aria-hidden className="absolute top-24 right-6 w-5 h-5 border-r border-t border-accent/40" />
      <div aria-hidden className="absolute bottom-8 left-6 w-5 h-5 border-l border-b border-accent/40" />
      <div aria-hidden className="absolute bottom-8 right-6 w-5 h-5 border-r border-b border-accent/40" />
    </>
  );
}
