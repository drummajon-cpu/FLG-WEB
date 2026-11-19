import Image from "next/image";
import { Phone, Mail, MapPin, Star, PhoneCall } from "lucide-react";
import { footerCopy } from "@/data/home/core";
import { localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = footerCopy[locale];
  const linkCls = "text-slate-400 hover:text-accent transition-colors";
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex flex-col items-start leading-none">
              <Image
                src="/images/flg-logo-one-mro.png"
                alt={t.logoAlt}
                width={639}
                height={297}
                sizes="140px"
                className="h-16 w-auto"
              />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mt-3 ml-1">
                {t.tagline}
              </span>
            </div>
            <p className="mt-5 text-slate-400 text-sm max-w-md leading-relaxed">{t.blurb}</p>
            <a
              href={SITE.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press mt-6 inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-md border border-white/10 hover:border-accent/40 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <Star className="w-4 h-4 text-accent" aria-hidden />
              {t.review}
            </a>
          </div>

          <nav aria-label={t.explore}>
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-4">{t.explore}</h2>
            <ul className="space-y-2.5 text-sm">
              {t.links.map(([href, label]) => (
                <li key={href}>
                  <a href={localePath(locale, href)} className={linkCls}>
                    {label}
                  </a>
                </li>
              ))}
              {t.englishOnlyLinks.map(([href, label]) => (
                <li key={href}>
                  <a href={href} hrefLang="en" className={linkCls}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-4">{t.contact}</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={SITE.phone.href} className="group flex items-start gap-2.5 text-slate-400 hover:text-slate-100 transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" aria-hidden />
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={SITE.aog.href} className="group flex items-start gap-2.5 text-slate-400 hover:text-slate-100 transition-colors">
                  <PhoneCall className="w-4 h-4 mt-0.5 text-accent shrink-0" aria-hidden />
                  <span>
                    {t.aog}: {SITE.aog.display}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-slate-400 hover:text-slate-100 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" aria-hidden />
                  <span>
                    {SITE.address.street}
                    <br />
                    {SITE.address.cityLine}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-mono tracking-wider">
            © {new Date().getFullYear()} FLG Technics · {t.rights}
          </div>
          <div className="text-xs text-slate-500 font-mono tracking-wider">{t.approvals}</div>
        </div>
      </div>
    </footer>
  );
}
