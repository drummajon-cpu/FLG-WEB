"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  Bell,
  RefreshCw,
  Check,
  PenLine,
  ChevronRight,
  ScanSearch,
  Clock,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { SectionHeader } from "./Capabilities";
import DataStream from "./DataStream";
import { systemsCopy, type PortalEventIcon } from "@/data/home/sections-c";
import { localePath, type Locale } from "@/lib/i18n";

const EASE = [0.23, 1, 0.32, 1] as const;

type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

// Icons are matched by position to the copy in data/home/sections-c.ts.
const FEATURE_ICONS: IconType[] = [Radar, Boxes, ClipboardCheck, GitBranch];
const PORTAL_LIST_ICONS: IconType[] = [Radar, FileText, Camera, MessageSquare, Search, Smartphone];
const EVENT_ICONS: Record<PortalEventIcon, IconType> = {
  check: Check,
  sign: PenLine,
  step: ChevronRight,
  inspect: ScanSearch,
  photo: Camera,
  doc: FileText,
  clock: Clock,
};

type MockCopy = (typeof systemsCopy)[Locale]["mock"];

/**
 * prefers-reduced-motion, but only once mounted. The server cannot know the
 * preference and framer's hook reads it synchronously on the first client
 * render, so using it directly made the server HTML and the hydration render
 * disagree for reduced-motion visitors (the chat line rendered its message
 * where the server had rendered the typing indicator: React error #418).
 */
function useReducedMotionAfterMount(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}

export default function Systems({ locale = "en" }: { locale?: Locale }) {
  const t = systemsCopy[locale];
  // Drives `data-active`, which pauses the DataStream columns off-screen
  // (rule at the end of app/globals.css).
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { margin: "160px 0px" });

  return (
    <section
      id="systems"
      ref={sectionRef}
      data-active={sectionInView ? "true" : "false"}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Background accents */}
      <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-30 mask-radial" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-accent-deep/5 blur-[120px]" />
      <DataStream />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          description={t.header.description}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-3">
          {t.features.map((f, i) => (
            <FeatureCard key={f.title} icon={FEATURE_ICONS[i]} title={f.title} body={f.body} index={i} />
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
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
                  {t.portal.badge}
                </span>
              </div>

              <h3 className="mt-5 font-display text-3xl md:text-[40px] font-semibold tracking-[-0.025em] text-slate-50 leading-[1.05]">
                {t.portal.titleLine1}
                <br />
                {t.portal.titleLine2}
              </h3>

              <p className="mt-4 text-slate-400 leading-relaxed">{t.portal.body}</p>

              <div className="mt-5 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2.5">
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent/90">
                  {t.portal.exampleEyebrow}
                </div>
                <div className="mt-1 text-sm text-slate-200 leading-snug">{t.portal.exampleBody}</div>
              </div>

              <ul className="mt-6 space-y-2.5">
                {t.portal.list.map((label, i) => {
                  const I = PORTAL_LIST_ICONS[i];
                  return (
                    <li key={label} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <I aria-hidden className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm leading-relaxed">{label}</span>
                    </li>
                  );
                })}
              </ul>

              <a
                href={localePath(locale, "/#contact")}
                className="group mt-8 inline-flex items-center gap-2 text-sm text-accent font-medium hover:text-accent-bright transition-colors"
              >
                {t.portal.cta}
                <ArrowUpRight
                  aria-hidden
                  className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Portal mockup */}
            <div className="lg:col-span-3">
              <PortalMockup copy={t.mock} />
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-slate-500">
                {t.mock.caption}
              </p>
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
            {t.tagline}
          </div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-slate-500">
            {t.taglineMeta}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: IconType;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.08, 0.32), ease: EASE }}
      whileHover={{ y: -4 }}
      // framer owns the transform (whileHover), so CSS only transitions the shadow.
      className="group relative rounded-[1.5rem] p-1.5 bg-white/[0.03] ring-1 ring-white/10 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-accent/25 hover:shadow-[0_26px_70px_-24px_rgba(56,189,248,0.22)]"
    >
      <div className="relative rounded-[1.125rem] bg-ink-900/60 p-7 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
          <Icon aria-hidden className="w-5 h-5 text-accent" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-slate-100 tracking-tight">
          {title}
        </h3>
        <p className="mt-2.5 text-slate-400 leading-relaxed">{body}</p>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(500px circle at 30% 0%, rgba(125,211,252,0.06), transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
}

// The portal mockup cycles through example work orders: every few seconds a new order
// pops into the top of the list, its progress bar fills and its activity feed rolls in
// from the top, so the window reads like a live screen. The examples are illustrative
// (see `systemsCopy[locale].mock.orders`), not live customer data, and the visible
// caption under the mockup says so. The loop runs only while the mockup is on screen;
// with reduced motion the orders still change, but only fade.
//
// To assistive tech the whole thing is a single labelled image: its content re-renders
// every few seconds and is fake data, so the inner tree is aria-hidden.
const CYCLE_MS = 4800;
const VISIBLE_ORDERS = 3;

function PortalMockup({ copy }: { copy: MockCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotionAfterMount();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setStep((n) => n + 1), CYCLE_MS);
    return () => clearInterval(t);
  }, [inView]);

  const orders = copy.orders;
  const count = orders.length;
  const active = orders[step % count];
  // Newest first: the active order on top, the ones before it below.
  const list = Array.from({ length: VISIBLE_ORDERS }, (_, i) => orders[(((step - i) % count) + count) % count]);

  const pop = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -14, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 14, scale: 0.97 },
      };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={copy.ariaLabel}
      className="relative rounded-2xl border border-white/10 bg-ink-950/90 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
    >
      <div aria-hidden>
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
              {copy.activeOrders}
            </div>
            {/* Negative margin + padding lets the carousel bleed to the card edge on mobile */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 pb-1 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {list.map((r, i) => {
                  const isActive = i === 0;
                  return (
                    <motion.div
                      key={r.id}
                      layout={!reduce}
                      {...pop}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`shrink-0 w-[220px] md:w-auto snap-start rounded-lg border p-3 transition-colors duration-500 ${
                        isActive ? "border-accent/40 bg-accent/5 animate-card-glow" : "border-white/5 bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-[10px] tracking-wider text-slate-500">{r.id}</div>
                        {isActive && (
                          <span className="font-mono text-[9px] tracking-wider uppercase text-accent px-1.5 py-0.5 rounded bg-accent/10">
                            {copy.live}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 font-medium text-slate-200 text-[13px]">{r.part}</div>
                      <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className={`relative h-full overflow-hidden ${isActive ? "bg-accent" : "bg-accent/50"}`}
                          initial={{ width: isActive ? `${Math.max(r.pct - 18, 2)}%` : `${r.pct}%` }}
                          animate={{ width: `${r.pct}%` }}
                          transition={{ duration: reduce ? 0 : 2.4, delay: 0.3, ease: EASE }}
                        >
                          {isActive && (
                            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-bar-shimmer" />
                          )}
                        </motion.div>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{r.stage}</span>
                        <span className="text-slate-400">{r.pct}%</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Detail pane */}
          <div className="md:col-span-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col flex-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-wider text-slate-500 truncate">
                      {active.id} · {active.part} · {copy.pnLabel} {active.pn}
                    </div>
                    <div className="mt-1 font-medium text-slate-200 text-[13px]">{active.headline}</div>
                  </div>
                  <SyncPill label={copy.syncing} />
                </div>

                {/* Activity feed: the live row lands first, older rows roll in under it. */}
                <div className="mt-3 space-y-2 text-[11px]">
                  <ActivityRow
                    key={active.live}
                    label={active.live}
                    time={<LiveClock seed={active.pct * 47} running={inView} />}
                    live
                    delay={reduce ? 0 : 0.15}
                    reduce={reduce}
                  />
                  {active.events.map((e, i) => (
                    <ActivityRow
                      key={e.label}
                      icon={EVENT_ICONS[e.icon]}
                      label={e.label}
                      time={e.time}
                      delay={reduce ? 0 : 0.15 + (i + 1) * 0.12}
                      reduce={reduce}
                    />
                  ))}
                </div>

                {/* Chat */}
                <div className="mt-auto pt-3 border-t border-white/5">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
                    {copy.chatHeading}
                  </div>
                  <ChatLine initials={active.initials} text={active.chat} typingLabel={copy.typing} reduce={reduce} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* A notification slides in partway through each order's turn. */}
        <PortalToast key={step} text={active.toast} reduce={reduce} />
      </div>
    </div>
  );
}

/** "Syncing" badge in the detail header: a glowing pill with a spinning sync icon. */
function SyncPill({ label }: { label: string }) {
  return (
    <div className="animate-sync-glow flex items-center gap-1.5 shrink-0 rounded-full border border-accent/40 bg-accent/10 pl-1.5 pr-2 py-0.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
      </span>
      <RefreshCw aria-hidden className="w-2.5 h-2.5 text-accent animate-spin [animation-duration:2.6s]" />
      <span className="font-mono text-[10px] text-accent">{label}</span>
    </div>
  );
}

/**
 * Elapsed time on the live row (h:mm:ss), ticking every second while the mockup
 * is on screen. It starts from a fixed seed, so the server render and the first
 * client render print the same text.
 */
function LiveClock({ seed, running }: { seed: number; running: boolean }) {
  const [secs, setSecs] = useState(seed);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  const h = Math.floor(secs / 3600);
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const sec = String(secs % 60).padStart(2, "0");
  return (
    <span className="tabular-nums">
      {h}:{m}:{sec}
    </span>
  );
}

/** Account-team message: a typing indicator first, then the message. */
function ChatLine({
  initials,
  text,
  typingLabel,
  reduce,
}: {
  initials: string;
  text: string;
  typingLabel: string;
  reduce: boolean;
}) {
  // `typed` always starts false, so the server and the first client render both
  // show the typing indicator; reduced motion skips it once mounted.
  const [typed, setTyped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTyped(true), 1500);
    return () => clearTimeout(t);
  }, []);
  const typing = !typed && !reduce;

  return (
    <motion.div
      className="flex items-start gap-2"
      initial={{ opacity: 0, y: reduce ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: reduce ? 0 : 0.4, ease: EASE }}
    >
      <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center font-mono text-[10px] text-accent shrink-0">
        {initials}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {typing ? (
          <motion.div
            key="typing"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-label={typingLabel}
            className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 flex items-center gap-1"
          >
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="animate-typing-dot w-1.5 h-1.5 rounded-full bg-slate-400"
                style={{ animationDelay: `${d * 0.18}s` }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: reduce ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="min-w-0 rounded-lg bg-white/[0.03] border border-white/5 px-2.5 py-1.5 text-[11px] text-slate-300"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Notification that drops down from the window bar, shown from ~2s to ~4.3s of each order's turn. */
function PortalToast({ text, reduce }: { text: string; reduce: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setShow(true), 2000);
    const b = setTimeout(() => setShow(false), 4300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  return (
    <div className="pointer-events-none absolute top-1.5 left-1/2 -translate-x-1/2 z-10 hidden md:block">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -12, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-accent/30 bg-ink-900/95 backdrop-blur px-3 py-1.5 shadow-[0_10px_30px_-8px_rgba(56,189,248,0.35)]"
          >
            <Bell aria-hidden className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] text-slate-200">{text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActivityRow({
  icon: Icon,
  label,
  time,
  live,
  delay = 0,
  reduce = false,
}: {
  /** Past events carry an icon; the live row shows a pulsing dot instead. */
  icon?: IconType;
  label: string;
  time: ReactNode;
  live?: boolean;
  delay?: number;
  reduce?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className={`flex items-center justify-between px-2 py-1.5 rounded border ${
        live ? "animate-live-row" : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {live ? (
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ) : (
          Icon && <Icon aria-hidden className="w-2.5 h-2.5 shrink-0 text-slate-500" />
        )}
        <span className="text-slate-300 truncate">{label}</span>
      </div>
      <span className={`font-mono text-[9px] shrink-0 ${live ? "text-accent" : "text-slate-500"}`}>
        {time}
      </span>
    </motion.div>
  );
}
