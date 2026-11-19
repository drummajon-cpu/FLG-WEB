"use client";

import { useId, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, ImagePlus, Phone, X } from "lucide-react";
import { AIRCRAFT_OPTIONS, contactCopy } from "@/data/home/core";
import type { Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// Quote request (RFQ) form.
//
// TRANSPORT — read before changing. The site had no contact form and no form backend
// (the old Contact section was three tel:/mailto: cards), and the brief for this work
// was to reuse the existing backend rather than add a third-party service. So, until
// the owner picks a backend, `deliver()` below does what the site already did: it
// hands the request to the visitor's own email app, addressed to the repairs desk,
// with every field filled in. A mailto: link cannot carry attachments, so the form
// lists the chosen photos and asks the visitor to attach them before sending.
//
// TODO(owner): choose the real submit path, then replace `deliver()` only. The two
// first-party options already in this repo are (a) FLG's own parts system through the
// signed proxy in proxy.ts, as the careers form does (/api/public/careers/*), and
// (b) a Next route that forwards to an EZRP webhook, as /api/cert-download does.
// Either one lets the photos upload with the request.

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  partNumber: string;
  serialNumber: string;
  aircraft: string;
  damage: string;
  aog: "yes" | "no";
};

const EMPTY: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  partNumber: "",
  serialNumber: "",
  aircraft: "",
  damage: "",
  aog: "no",
};

const REQUIRED: (keyof Fields)[] = ["name", "company", "email", "damage"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "w-full rounded-md border border-white/10 bg-ink-900/70 px-3.5 py-2.5 text-[15px] text-slate-100 placeholder:text-slate-500 outline-none transition-[border-color,background-color,box-shadow] duration-150 focus:border-accent/70 focus:bg-ink-900 focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-400/70";
const labelCls = "block font-mono text-[11px] tracking-[0.16em] uppercase text-slate-400 mb-1.5";

function deliver(fields: Fields, photos: File[], t: (typeof contactCopy)[Locale]["rfq"]) {
  const aog = fields.aog === "yes";
  const subject = [aog ? t.aogTag : "", t.subject, fields.partNumber, fields.company].filter(Boolean).join(" · ");
  const lines = [
    `${t.name}: ${fields.name}`,
    `${t.company}: ${fields.company}`,
    `${t.email}: ${fields.email}`,
    `${t.phone}: ${fields.phone || "-"}`,
    `${t.partNumber}: ${fields.partNumber || "-"}`,
    `${t.serialNumber}: ${fields.serialNumber || "-"}`,
    `${t.aircraft}: ${fields.aircraft || "-"}`,
    `${t.aog} ${aog ? t.yes : t.no}`,
    "",
    `${t.damage}:`,
    fields.damage,
    "",
    photos.length ? `${t.photos}: ${photos.map((f) => f.name).join(", ")}` : "",
  ];
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default function RfqForm({ locale = "en" }: { locale?: Locale }) {
  const t = contactCopy[locale].rfq;
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function addPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    // Adding to the list, not replacing it, so photos can be chosen in several goes.
    setPhotos((prev) => {
      const seen = new Set(prev.map((f) => `${f.name}:${f.size}`));
      return [...prev, ...picked.filter((f) => !seen.has(`${f.name}:${f.size}`))];
    });
    e.target.value = "";
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    for (const key of REQUIRED) if (!fields[key].trim()) next[key] = t.errRequired;
    if (!next.email && !EMAIL_RE.test(fields.email.trim())) next.email = t.errEmail;
    setErrors(next);
    const first = REQUIRED.find((k) => next[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    deliver(fields, photos, t);
    setSent(true);
  }

  const field = (key: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const required = REQUIRED.includes(key);
    return (
      <div>
        <label htmlFor={id(key)} className={labelCls}>
          {label}
          {required ? <span aria-hidden> *</span> : <span className="normal-case tracking-normal text-slate-500"> ({t.optional})</span>}
        </label>
        <input
          id={id(key)}
          name={key}
          value={fields[key]}
          onChange={set(key)}
          required={required}
          aria-invalid={errors[key] ? true : undefined}
          aria-describedby={errors[key] ? id(`${key}-err`) : undefined}
          className={inputCls}
          {...props}
        />
        {errors[key] && (
          <p id={id(`${key}-err`)} className="mt-1.5 text-sm text-red-300">
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-6 md:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" aria-hidden />
          <div>
            <h3 className="font-display text-xl font-semibold text-slate-100 tracking-tight">{t.sentTitle}</h3>
            <p className="mt-2 text-slate-300 leading-relaxed">{t.sentBody}</p>
            {photos.length > 0 && (
              <>
                <p className="mt-4 text-slate-300 leading-relaxed">{t.sentPhotos}</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-400 space-y-0.5">
                  {photos.map((f) => (
                    <li key={`${f.name}:${f.size}`} className="break-all">
                      {f.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-4 text-sm text-slate-400">
              {t.sentFallback}{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="press mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-slate-200 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              {t.edit}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
      <p className="sm:col-span-2 text-sm text-slate-400">{t.intro}</p>

      {field("name", t.name, { autoComplete: "name" })}
      {field("company", t.company, { autoComplete: "organization" })}
      {field("email", t.email, { type: "email", autoComplete: "email", inputMode: "email" })}
      {field("phone", t.phone, { type: "tel", autoComplete: "tel", inputMode: "tel" })}
      {field("partNumber", t.partNumber, { autoCapitalize: "characters", spellCheck: false })}
      {field("serialNumber", t.serialNumber, { autoCapitalize: "characters", spellCheck: false })}

      <div className="sm:col-span-2">
        <label htmlFor={id("aircraft")} className={labelCls}>
          {t.aircraft}
          <span className="normal-case tracking-normal text-slate-500"> ({t.optional})</span>
        </label>
        <select id={id("aircraft")} name="aircraft" value={fields.aircraft} onChange={set("aircraft")} className={`${inputCls} appearance-none`}>
          <option value="">{t.aircraftPlaceholder}</option>
          {AIRCRAFT_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
          <option value={t.aircraftRegional}>{t.aircraftRegional}</option>
          <option value={t.aircraftOther}>{t.aircraftOther}</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={id("damage")} className={labelCls}>
          {t.damage}
          <span aria-hidden> *</span>
        </label>
        <textarea
          id={id("damage")}
          name="damage"
          rows={5}
          value={fields.damage}
          onChange={set("damage")}
          required
          placeholder={t.damagePlaceholder}
          aria-invalid={errors.damage ? true : undefined}
          aria-describedby={errors.damage ? id("damage-err") : undefined}
          className={`${inputCls} min-h-[120px] resize-y`}
        />
        {errors.damage && (
          <p id={id("damage-err")} className="mt-1.5 text-sm text-red-300">
            {errors.damage}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={id("photos")} className={labelCls}>
          {t.photos}
          <span className="normal-case tracking-normal text-slate-500"> ({t.optional})</span>
        </label>
        <div className="rounded-md border border-dashed border-white/15 bg-ink-900/40 p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* The real input stays in the tab order (sr-only, not display:none);
                the visible button is its label. */}
            <input
              ref={fileRef}
              id={id("photos")}
              name="photos"
              type="file"
              accept="image/*,.heic,.heif"
              multiple
              onChange={addPhotos}
              aria-describedby={id("photos-hint")}
              className="peer sr-only"
            />
            <label
              htmlFor={id("photos")}
              className="press cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] peer-focus-visible:ring-2 peer-focus-visible:ring-accent"
            >
              <ImagePlus className="w-4 h-4 text-accent" aria-hidden />
              {t.photosChoose}
            </label>
            <span id={id("photos-hint")} className="text-sm text-slate-400">
              {photos.length ? t.photosCount(photos.length) : t.photosHint}
            </span>
          </div>
          {photos.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {photos.map((f) => (
                <li
                  key={`${f.name}:${f.size}`}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] pl-2.5 pr-1 py-1 text-xs text-slate-300"
                >
                  <span className="truncate max-w-[14rem]">{f.name}</span>
                  <button
                    type="button"
                    onClick={() => setPhotos((p) => p.filter((x) => x !== f))}
                    aria-label={`${t.photosRemove}: ${f.name}`}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <fieldset className="sm:col-span-2">
        <legend className={labelCls}>{t.aog}</legend>
        <div className="flex flex-wrap gap-2">
          {(["no", "yes"] as const).map((v) => (
            <label
              key={v}
              className={`press cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                fields.aog === v
                  ? "border-accent/60 bg-accent/10 text-slate-100"
                  : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20"
              }`}
            >
              <input type="radio" name="aog" value={v} checked={fields.aog === v} onChange={set("aog")} className="sr-only" />
              <span
                aria-hidden
                className={`h-3.5 w-3.5 rounded-full border ${fields.aog === v ? "border-accent bg-accent shadow-[inset_0_0_0_3px_#0A0D12]" : "border-white/30"}`}
              />
              {v === "yes" ? t.yes : t.no}
            </label>
          ))}
        </div>
        {fields.aog === "yes" && (
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-accent/30 bg-accent/[0.07] px-3.5 py-2.5 text-sm text-slate-200">
            <Phone className="w-4 h-4 text-accent shrink-0" aria-hidden />
            {t.aogNote}
            <a href={SITE.aog.href} className="font-semibold text-white underline decoration-accent/60 underline-offset-4">
              {SITE.aog.display}
            </a>
          </p>
        )}
      </fieldset>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="press inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_32px_-8px_rgba(56,189,248,0.5)]"
        >
          {t.submit}
          <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
        <p role="alert" className="flex items-center gap-2 text-sm text-red-300 empty:hidden">
          {hasErrors && (
            <>
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
              {t.errorSummary}
            </>
          )}
        </p>
      </div>
    </form>
  );
}
