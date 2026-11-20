import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

// Slim 24/7 AOG bar, first thing in <body> on every page. It is sticky and in the
// normal flow (36px tall), so the page starts below it and the fixed nav sits at
// top-9 rather than underneath it. The whole bar is one tel: link: tap-to-call.
const copy = {
  en: { lead: "AOG?" },
  es: { lead: "¿AOG?" },
} as const;

export default function AogBar({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <div className="sticky top-0 z-[55] h-9 border-b border-accent/20 bg-ink-900">
      <a
        href={SITE.aog.href}
        className="flex h-full items-center justify-center gap-2 px-4 text-[13px] text-slate-200 hover:text-white transition-colors"
      >
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">{t.lead}</span>
        <span>
          24/7:{" "}
          <span className="font-semibold text-white underline decoration-accent/50 underline-offset-4">
            {SITE.aog.display}
          </span>
        </span>
      </a>
    </div>
  );
}
