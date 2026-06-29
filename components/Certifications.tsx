"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Award,
  Flame,
  FileText,
  Download,
  X,
  Loader2,
  Check,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import { SectionHeader } from "./Capabilities";
import type { ComponentType } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

type Cert = {
  name: string;
  detail: string;
  scope: string;
  icon: ComponentType<{ className?: string }>;
  pdf?: string;
  slug?: string;
  authority?: string;
};

const certs: Cert[] = [
  {
    name: "FAA Part 145",
    detail: "Repair Station",
    scope:
      "Federal Aviation Administration approved for airframe, accessory, and specialized service ratings.",
    icon: ShieldCheck,
    pdf: "/certs/faa-part-145.pdf",
    slug: "faa-part-145",
    authority: "Federal Aviation Administration",
  },
  {
    name: "EASA",
    detail: "Part 145 Approval",
    scope:
      "European Union Aviation Safety Agency — foreign repair station authorization for EU operators.",
    icon: BadgeCheck,
    pdf: "/certs/easa-part-145.pdf",
    slug: "easa-part-145",
    authority: "European Union Aviation Safety Agency",
  },
  {
    name: "UK CAA",
    detail: "Part 145 Approval",
    scope:
      "United Kingdom Civil Aviation Authority — post‑Brexit approval for UK‑registered aircraft.",
    icon: Award,
    pdf: "/certs/uk-caa-part-145.pdf",
    slug: "uk-caa-part-145",
    authority: "UK Civil Aviation Authority",
  },
  {
    name: "AWS D17.1",
    detail: "Aerospace Fusion Welding",
    scope:
      "Certified welders & procedures for titanium, stainless, and aluminum per the aerospace welding specification.",
    icon: Flame,
  },
];

export default function Certifications() {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <section id="certifications" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Accreditation"
          title="Approved by the authorities you fly under."
          description="Every repair, every PMA, every weld — documented, traceable, and released under accredited approvals. View any certificate below."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {certs.map((c, i) => (
            <CertCard key={c.name} cert={c} index={i} onOpen={() => c.pdf && setActive(c)} />
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

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function CertCard({
  cert,
  index,
  onOpen,
}: {
  cert: Cert;
  index: number;
  onOpen: () => void;
}) {
  const Icon = cert.icon;
  const clickable = Boolean(cert.pdf);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
      whileHover={clickable ? { y: -4 } : undefined}
      onClick={clickable ? onOpen : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      aria-label={clickable ? `View ${cert.name} certificate` : undefined}
      className={`group relative rounded-xl border bg-ink-900/50 transition-colors duration-200 p-6 overflow-hidden ${
        clickable
          ? "border-white/5 hover:border-accent/30 hover:bg-ink-900/80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          : "border-white/5"
      }`}
    >
      {/* Hover glow */}
      {clickable && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(420px circle at 50% 0%, rgba(125,211,252,0.08), transparent 55%)",
          }}
        />
      )}

      <div className="relative flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_12px_rgba(125,211,252,0.6)]" />
      </div>
      <div className="relative mt-6 font-display text-xl font-semibold text-slate-100 tracking-tight">
        {cert.name}
      </div>
      <div className="relative font-mono text-[11px] tracking-[0.18em] uppercase text-accent mt-1">
        {cert.detail}
      </div>
      <p className="relative mt-3 text-sm text-slate-400 leading-relaxed">{cert.scope}</p>

      {/* View affordance */}
      {clickable ? (
        <div className="relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-400 group-hover:text-accent transition-colors">
          <FileText className="w-3.5 h-3.5" />
          View certificate
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      ) : (
        <div className="relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-600">
          Certificate on request
        </div>
      )}
    </motion.div>
  );
}

const VERIFY_KEY = "flg_cert_email";

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [verified, setVerified] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // Session memory: once a visitor verifies an email, subsequent downloads in
  // the same browser skip the gate.
  useEffect(() => {
    try {
      if (localStorage.getItem(VERIFY_KEY)) setVerified(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function triggerDownload() {
    const a = downloadRef.current;
    if (a) {
      a.click();
    }
  }

  async function handleVerifiedDownload(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/cert-download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, cert: cert.name }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      try {
        localStorage.setItem(VERIFY_KEY, email.trim().toLowerCase());
      } catch {
        /* ignore */
      }
      setVerified(true);
      setStatus("done");
      triggerDownload();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6 bg-ink-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-ink-900 overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/5 bg-ink-900/95 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center shrink-0">
              <cert.icon className="w-5 h-5 text-accent" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg font-semibold text-slate-100 tracking-tight truncate">
                {cert.name} Certificate
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-slate-500 truncate">
                {cert.authority}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="press shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PDF viewer */}
        <div className="relative flex-1 min-h-[44vh] bg-ink-950">
          <iframe
            src={`${cert.pdf}#toolbar=0&navpanes=0&view=FitH`}
            title={`${cert.name} certificate`}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Download zone */}
        <div className="border-t border-white/5 bg-ink-900/95 backdrop-blur px-5 py-4">
          {verified || status === "done" ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Check className="w-4 h-4 text-teal-bright" />
                {status === "done" ? "Download started." : "You're verified — download anytime."}
              </div>
              <button
                type="button"
                onClick={triggerDownload}
                className="press inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium text-sm shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_28px_-8px_rgba(56,189,248,0.5)]"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifiedDownload}>
              <div className="flex items-start gap-2 mb-2.5 text-slate-500">
                <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
                <p className="text-[12px] leading-relaxed">
                  Enter your email to download. We only ask to keep these controlled
                  documents away from bots and unauthorized scrapers — you won&apos;t be
                  subscribed to anything, and we won&apos;t share it.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@company.com"
                  className="flex-1 h-11 px-3.5 rounded-md bg-ink-800/60 border border-white/10 text-slate-100 placeholder:text-slate-600 text-sm focus:border-accent/60 focus:bg-ink-800/80 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-[border-color,background-color,box-shadow] duration-150"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="press inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium text-sm shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_28px_-8px_rgba(56,189,248,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {status === "loading" ? "Verifying" : "Download PDF"}
                </button>
              </div>
              {status === "error" && (
                <p className="mt-2 text-[12px] text-red-400">{errorMsg}</p>
              )}
            </form>
          )}
        </div>

        {/* Hidden download anchor (same-origin → forces download) */}
        <a
          ref={downloadRef}
          href={cert.pdf}
          download={`FLG-Technics-${cert.slug}.pdf`}
          className="hidden"
          aria-hidden
        />
      </motion.div>
    </motion.div>
  );
}
