"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, AlertTriangle, Loader2, Upload } from "lucide-react";
import { roles, CAREERS_FALLBACK_EMAIL, type RoleKey } from "@/data/careers";

// The Apply form. It talks only to /api/public/careers/*, which proxy.ts forwards
// (signed, cookies dropped) to the careers backend. The backend answers the
// config call with whether applications are open, the Cloudflare Turnstile site
// key and the largest résumé it accepts. Anything but a clean "open" (404, 503,
// a network error, proxy env unset) shows "temporarily closed — email us".
//
// Turnstile's script is loaded here, only on this page, and only once the form is
// open. No reply is emailed to the applicant; this page's thank-you is the receipt.

const CONFIG_URL = "/api/public/careers/config";
const APPLY_URL = "/api/public/careers/apply";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;

type Config = { open: boolean; site_key: string; max_resume_bytes: number; mailto: string };
type Phase = "loading" | "closed" | "open" | "sending" | "sent";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const FIELD_LABELS: Record<string, string> = {
  first_name: "first name",
  last_name: "last name",
  email: "email",
  phone: "phone",
  role: "role",
  years_experience: "years of experience",
  consent: "consent",
};

function newKey(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `k-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

function mb(bytes: number): string {
  const v = bytes / (1024 * 1024);
  return `${v >= 10 ? Math.round(v) : Math.floor(v * 10) / 10} MB`;
}

function loadTurnstile(): Promise<TurnstileApi> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no turnstile"))));
    script.addEventListener("error", () => reject(new Error("turnstile failed to load")));
  });
}

const inputCls =
  "w-full rounded-md border border-white/10 bg-ink-900/70 px-3.5 py-2.5 text-[15px] text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-accent/60 focus:bg-ink-900 aria-[invalid=true]:border-red-400/70";
const labelCls = "block font-mono text-[11px] tracking-[0.16em] uppercase text-slate-400 mb-1.5";

export default function ApplyForm({ role, onRoleChange }: { role: RoleKey | ""; onRoleChange: (r: RoleKey | "") => void }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [config, setConfig] = useState<Config | null>(null);
  const [mailto, setMailto] = useState(CAREERS_FALLBACK_EMAIL);
  const [error, setError] = useState("");
  const [bad, setBad] = useState<string[]>([]);
  const [token, setToken] = useState("");
  const [clientKey] = useState(newKey);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    fetch(CONFIG_URL, { cache: "no-store" })
      .then(async (r) => {
        const d = (await r.json().catch(() => null)) as Partial<Config> | null;
        if (!live) return;
        if (d?.mailto) setMailto(d.mailto);
        if (r.ok && d && d.open && d.site_key) {
          setConfig({
            open: true,
            site_key: d.site_key,
            max_resume_bytes: Number(d.max_resume_bytes) || DEFAULT_MAX_BYTES,
            mailto: d.mailto || CAREERS_FALLBACK_EMAIL,
          });
          setPhase("open");
        } else {
          setPhase("closed");
        }
      })
      .catch(() => live && setPhase("closed"));
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== "open" || !config || !widgetRef.current || widgetId.current) return;
    let live = true;
    loadTurnstile()
      .then((ts) => {
        if (!live || !widgetRef.current || widgetId.current) return;
        widgetId.current = ts.render(widgetRef.current, {
          sitekey: config.site_key,
          theme: "dark",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      })
      .catch(() => live && setError("The security check could not load. Please refresh the page, or email us."));
    return () => {
      live = false;
    };
  }, [phase, config]);

  // The form is tall; bring the thank-you into view once it replaces it.
  useEffect(() => {
    if (phase === "sent") doneRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [phase]);

  const resetWidget = useCallback(() => {
    setToken("");
    try {
      window.turnstile?.reset(widgetId.current);
    } catch {
      /* the widget is gone; the next render makes a new one */
    }
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!config || phase === "sending") return;
    setError("");
    setBad([]);
    const form = e.currentTarget;
    const file = (form.elements.namedItem("resume") as HTMLInputElement | null)?.files?.[0];
    if (!file) {
      setError("Please attach your résumé (PDF or Word .docx).");
      return;
    }
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setError("Please upload your résumé as a PDF or a Word .docx file.");
      return;
    }
    if (file.size > config.max_resume_bytes) {
      setError(`That file is larger than ${mb(config.max_resume_bytes)}. Please send a smaller PDF.`);
      return;
    }
    if (!token) {
      setError("Please complete the security check above the Submit button.");
      return;
    }
    const data = new FormData(form);
    data.set("client_key", clientKey);
    data.set("turnstile_token", token);
    setPhase("sending");
    let r: Response;
    try {
      r = await fetch(APPLY_URL, { method: "POST", body: data });
    } catch {
      setPhase("open");
      resetWidget();
      setError(`We couldn't reach our server. Please try again, or email your résumé to ${mailto}.`);
      return;
    }
    const d = (await r.json().catch(() => ({}))) as { ok?: boolean; reason?: string; fields?: string[]; mailto?: string; max_resume_bytes?: number };
    if (d.mailto) setMailto(d.mailto);
    if (r.ok && d.ok) {
      setPhase("sent");
      return;
    }
    resetWidget();
    if (r.status === 404) {
      setPhase("closed");
      return;
    }
    setPhase("open");
    const to = d.mailto || mailto;
    switch (d.reason) {
      case "invalid":
        if (d.fields?.length) {
          setBad(d.fields);
          setError(`Please check your ${d.fields.map((f) => FIELD_LABELS[f] || f.replace(/_/g, " ")).join(", ")}.`);
        } else {
          setError("Something in the form wasn't accepted. Please check it and try again.");
        }
        break;
      case "resume_type":
        setError("Please upload your résumé as a PDF or a Word .docx file. Files with macros or embedded objects aren't accepted.");
        break;
      case "resume_missing":
        setError("Please attach your résumé (PDF or Word .docx).");
        break;
      case "resume_too_large":
        setError(`That file is too large${d.max_resume_bytes ? ` (the limit is ${mb(d.max_resume_bytes)})` : ""}. Please send a smaller PDF, or email it to ${to}.`);
        break;
      case "turnstile":
        setError("The security check didn't go through. Please complete it again and resubmit.");
        break;
      case "rate_limited":
        setError(`Several applications were sent from your connection in the last hour. Please try again later, or email us at ${to}.`);
        break;
      default:
        setError(`Applications are temporarily unavailable. Please email your résumé to ${to}.`);
    }
  }

  if (phase === "loading") {
    return (
      <div className="flex items-center gap-3 text-slate-400 text-sm py-10" role="status">
        <Loader2 className="w-4 h-4 animate-spin text-accent" aria-hidden /> Loading the application form…
      </div>
    );
  }

  if (phase === "closed") {
    return (
      <div role="status">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden />
          <div>
            <h3 className="font-display text-xl text-slate-100">Online applications are temporarily closed</h3>
            <p className="mt-2 text-slate-400 leading-relaxed">
              We&apos;re still hiring. Email your résumé and the role you&apos;re interested in to{" "}
              <a href={`mailto:${mailto}?subject=Job%20application`} className="text-accent hover:underline whitespace-nowrap">
                {mailto}
              </a>{" "}
              or call{" "}
              <a href="tel:+19543853900" className="text-accent hover:underline whitespace-nowrap">
                (954) 385‑3900
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "sent") {
    return (
      <div ref={doneRef} role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-accent shrink-0" aria-hidden />
          <div>
            <h3 className="font-display text-2xl text-slate-100">Thanks, we received your application.</h3>
            <p className="mt-2 text-slate-400 leading-relaxed">
              Our team reviews every application. If your experience fits an open role, we&apos;ll contact you by
              email or phone. You won&apos;t receive an automatic confirmation email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const invalid = (f: string) => (bad.includes(f) ? true : undefined);
  const maxBytes = config?.max_resume_bytes ?? DEFAULT_MAX_BYTES;

  return (
    <form ref={formRef} onSubmit={submit} className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
      <div>
        <label htmlFor="ap-first" className={labelCls}>First name</label>
        <input id="ap-first" name="first_name" required maxLength={60} autoComplete="given-name" className={inputCls} aria-invalid={invalid("first_name")} />
      </div>
      <div>
        <label htmlFor="ap-last" className={labelCls}>Last name</label>
        <input id="ap-last" name="last_name" required maxLength={60} autoComplete="family-name" className={inputCls} aria-invalid={invalid("last_name")} />
      </div>
      <div>
        <label htmlFor="ap-email" className={labelCls}>Email</label>
        <input id="ap-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputCls} aria-invalid={invalid("email")} />
      </div>
      <div>
        <label htmlFor="ap-phone" className={labelCls}>Phone</label>
        <input id="ap-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={inputCls} aria-invalid={invalid("phone")} />
      </div>
      <div>
        <label htmlFor="ap-role" className={labelCls}>Role</label>
        <select
          id="ap-role"
          name="role"
          required
          value={role}
          onChange={(e) => onRoleChange(e.target.value as RoleKey | "")}
          className={inputCls}
          aria-invalid={invalid("role")}
        >
          <option value="" disabled>
            Choose a role
          </option>
          {roles.map((r) => (
            <option key={r.key} value={r.key}>
              {r.key === "general" ? "General application" : r.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ap-years" className={labelCls}>Years of experience</label>
        <input id="ap-years" name="years_experience" type="number" inputMode="numeric" min={0} max={60} step={1} className={inputCls} aria-invalid={invalid("years_experience")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ap-certs" className={labelCls}>Certificates</label>
        <input id="ap-certs" name="certificates" maxLength={300} placeholder="e.g. A&P, IA, NDT Level II" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ap-msg" className={labelCls}>A short message</label>
        <textarea id="ap-msg" name="message" rows={5} maxLength={3000} placeholder="What you do, the aircraft and components you've worked on, and when you could start." className={`${inputCls} resize-y`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ap-resume" className={labelCls}>Résumé</label>
        <div className="rounded-md border border-dashed border-white/15 bg-ink-900/40 px-3.5 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Upload className="w-4 h-4 text-accent shrink-0" aria-hidden />
            PDF or Word (.docx), up to {mb(maxBytes)}
          </div>
          <input
            id="ap-resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="block w-full text-sm text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-100 hover:file:bg-white/15"
          />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are refused. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="ap-website">Website</label>
        <input id="ap-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            value="1"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-sky-400"
            aria-invalid={invalid("consent")}
          />
          <span>
            I agree that FLG Technics may keep my application to consider me for current and future roles.
          </span>
        </label>
      </div>

      <div className="sm:col-span-2 min-h-[65px]" ref={widgetRef} />

      {error && (
        <div className="sm:col-span-2 flex items-start gap-2.5 rounded-md border border-amber-400/30 bg-amber-400/[0.06] px-3.5 py-3 text-sm text-amber-100" role="alert">
          <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-300 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={phase === "sending"}
          className="press inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-ink-950 bg-accent hover:bg-accent-bright rounded-md disabled:opacity-60 shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_32px_-8px_rgba(56,189,248,0.5)]"
        >
          {phase === "sending" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
          {phase === "sending" ? "Sending…" : "Submit application"}
        </button>
        <span className="text-xs text-slate-500">
          Prefer email? <a href={`mailto:${mailto}?subject=Job%20application`} className="text-slate-300 hover:text-accent whitespace-nowrap">{mailto}</a>
        </span>
      </div>
    </form>
  );
}
