"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { LogoLockup, TailStreaks } from "./Logo";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#work", label: "Recent Work" },
  { href: "#shop", label: "Shop" },
  { href: "#systems", label: "Systems" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ease-out ${
          scrolled
            ? "backdrop-blur-xl bg-ink-950/70 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="group transition-transform duration-200 ease-out">
            <LogoLockup tagline={false} />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-sm text-slate-400 hover:text-slate-100 transition-colors rounded-md"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+19543853900"
              className="hidden sm:inline-flex press items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <Phone className="w-3.5 h-3.5" />
              (954) 385-3900
            </a>
            <a
              href="#contact"
              className="press hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-950 bg-accent hover:bg-accent-bright rounded-md shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_8px_32px_-8px_rgba(56,189,248,0.5)]"
            >
              Request a Quote
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden press p-2 rounded-md border border-white/10 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink-950/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
              <LogoLockup tagline={false} />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="press p-2 rounded-md border border-white/10">
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="p-6 flex flex-col gap-1"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.04, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="py-3 text-2xl font-display text-slate-200 hover:text-accent transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

