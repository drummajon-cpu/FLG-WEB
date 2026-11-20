"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, PackageSearch } from "lucide-react";
import { LogoLockup } from "./Logo";
import { navCopy } from "@/data/home/core";
import { localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// The live parts-stock page (/inventory, see proxy.ts). Its button shows only once
// NEXT_PUBLIC_SHOW_INVENTORY_LINK=1 is set in Vercel, i.e. when the page is public.
// It is a button beside "Request a Quote" (repair work goes to the contact form;
// parts buyers go to the inventory), and the first entry of the mobile menu.
const showInventory = process.env.NEXT_PUBLIC_SHOW_INVENTORY_LINK === "1";
const INVENTORY_HREF = "/inventory";

// This file deliberately uses CSS transitions rather than framer-motion: the nav is on
// every page, and the service pages have no other client-side animation, so keeping
// framer-motion out of here keeps it out of their JavaScript entirely.

/** The same page in the other language, or that language's home page when the
    current page exists in English only (careers, SMS terms). */
function otherLocaleHref(pathname: string, target: Locale): string {
  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  const bare = isEs ? pathname.slice(3) || "/" : pathname;
  const translated = bare === "/" || bare === "/services" || bare.startsWith("/services/");
  if (target === "en") return translated ? bare : "/";
  return translated ? localePath("es", bare) : "/es";
}

function LanguageSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || "/";
  const t = navCopy[locale];
  const item = (code: Locale, label: string) =>
    code === locale ? (
      <span aria-current="true" className="px-1.5 py-1 text-slate-100">
        {label}
      </span>
    ) : (
      <a
        href={otherLocaleHref(pathname, code)}
        hrefLang={code}
        lang={code}
        className="px-1.5 py-1 text-slate-400 hover:text-accent transition-colors rounded"
      >
        {label}
      </a>
    );
  return (
    <div
      role="group"
      aria-label={t.language}
      className={`flex items-center font-mono text-[12px] tracking-[0.12em] ${className}`}
    >
      {item("en", "EN")}
      <span aria-hidden className="text-slate-600">
        |
      </span>
      {item("es", "ES")}
    </div>
  );
}

export default function Nav({ locale = "en" }: { locale?: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const t = navCopy[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock page scroll, close on Escape, and hand focus to the
  // close button. Focus returns to the menu button when it closes.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const opener = menuButton.current;
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  // Careers exists in English only, so its link is never prefixed with /es.
  const links = t.links.map((l) => ({
    label: l.label,
    href: "englishOnly" in l && l.englishOnly ? l.href : localePath(locale, l.href),
  }));
  const contactHref = localePath(locale, "/#contact");

  return (
    <>
      {/* top-9: directly under the 36px AOG bar (components/AogBar.tsx). */}
      <header
        className={`nav-enter fixed top-9 inset-x-0 z-50 transition-colors duration-200 ease-out ${
          scrolled ? "backdrop-blur-xl bg-ink-950/70 border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav aria-label="Main" className="max-w-7xl mx-auto px-6 h-[88px] flex items-center justify-between">
          <a
            href={localePath(locale, "/") + "#top"}
            aria-label={t.home}
            className="group shrink-0 transition-transform duration-200 ease-out"
          >
            <LogoLockup tagline={false} />
          </a>

          {/* Inline from xl: with eight links, the phone and Live Inventory buttons there is not
              room below 1280px without crushing the logo, so smaller screens use the menu. */}
          <div className="hidden xl:flex items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-2 min-[1440px]:px-2.5 py-2 text-[13px] min-[1440px]:text-sm whitespace-nowrap text-slate-400 hover:text-slate-100 transition-colors rounded-md"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitch locale={locale} className="mr-1" />
            <a
              href={SITE.phone.href}
              className="hidden xl:inline-flex press items-center gap-2 px-3.5 py-2 text-sm whitespace-nowrap font-medium text-slate-300 hover:text-slate-100 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden />
              {SITE.phone.display}
            </a>
            {showInventory && (
              <a
                href={INVENTORY_HREF}
                className="hidden sm:inline-flex press items-center gap-2 px-3.5 py-2 text-sm whitespace-nowrap font-medium text-slate-200 hover:text-slate-100 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
              >
                <PackageSearch className="w-3.5 h-3.5 text-accent" aria-hidden />
                {t.inventory}
              </a>
            )}
            <a
              href={contactHref}
              className="press hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm whitespace-nowrap font-medium text-ink-950 bg-accent hover:bg-accent-bright rounded-md shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_32px_-8px_rgba(56,189,248,0.5)]"
            >
              {t.quote}
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="xl:hidden press p-2.5 rounded-md border border-white/10 text-slate-300"
            >
              <Menu className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
          className="menu-enter fixed inset-x-0 bottom-0 top-9 z-[60] bg-ink-950/95 backdrop-blur-lg xl:hidden overflow-y-auto"
        >
          <div className="flex items-center justify-between h-[88px] px-6 border-b border-white/5">
            <LogoLockup tagline={false} />
            <button
              ref={closeButton}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.closeMenu}
              className="press p-2.5 rounded-md border border-white/10"
            >
              <X className="w-5 h-5 text-slate-300" aria-hidden />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-1">
            {/* The two things a visitor on a phone most often came to do. */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 mb-4">
              <a
                href={contactHref}
                onClick={() => setOpen(false)}
                className="press inline-flex items-center justify-center px-4 py-3 rounded-md bg-accent text-ink-950 font-medium"
              >
                {t.quote}
              </a>
              <a
                href={SITE.aog.href}
                className="press inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-accent/40 bg-accent/10 text-slate-100 font-medium"
              >
                <Phone className="w-4 h-4 text-accent" aria-hidden />
                {t.callAog}
              </a>
            </div>
            {showInventory && (
              <a
                href={INVENTORY_HREF}
                onClick={() => setOpen(false)}
                className="press mb-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-white/10 bg-white/[0.03] text-lg font-medium text-slate-100"
              >
                <PackageSearch className="w-5 h-5 text-accent" aria-hidden />
                {t.inventory}
              </a>
            )}
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${60 + i * 35}ms` }}
                className="menu-link py-3 text-2xl font-display text-slate-200 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
