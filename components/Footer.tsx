"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex flex-col items-start leading-none">
              <Image
                src="/images/flg-logo.png"
                alt="FLG Technics"
                width={1092}
                height={255}
                className="h-12 w-auto"
              />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 mt-3 ml-1">
                Aerospace · MRO · Engineering
              </span>
            </div>
            <p className="mt-5 text-slate-400 text-sm max-w-md leading-relaxed">
              FAA Part 145 repair station. In‑house engineering, 3D scanning, CNC machining, PMA
              development, and AWS D17.1 certified aerospace welding.
            </p>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-4">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm">
              {[
                ["#capabilities", "Capabilities"],
                ["#work", "Recent Work"],
                ["#shop", "Inside The Shop"],
                ["#in-house", "In‑House"],
                ["#systems", "Systems"],
                ["#certifications", "Certifications"],
                ["#about", "About"],
                ["#faq", "FAQ"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-slate-400 hover:text-accent transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-4">
              Contact
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+19543853900" className="group flex items-start gap-2.5 text-slate-400 hover:text-slate-100 transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                  (954) 385‑3900
                </a>
              </li>
              <li>
                <a href="mailto:repairs@flgtechnics.com" className="flex items-start gap-2.5 text-slate-400 hover:text-slate-100 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                  repairs@flgtechnics.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>2701 SW 145th Ave #200<br />Miramar, FL 33027</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-mono tracking-wider">
            © {new Date().getFullYear()} FLG Technics · All rights reserved
          </div>
          <div className="text-xs text-slate-500 font-mono tracking-wider">
            FAA 145 · EASA · UK CAA · AWS D17.1
          </div>
        </div>
      </div>
    </footer>
  );
}
