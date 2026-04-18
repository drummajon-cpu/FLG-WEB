"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "./Capabilities";

const EASE = [0.23, 1, 0.32, 1] as const;

type Work = {
  src: string;
  silhouette: "aileron" | "flap" | "rudder" | "inlet" | "leading-edge" | "muffler";
  aircraft: string;
  component: string;
  partNo: string;
  material: string;
};

const works: Work[] = [
  {
    src: "/images/work/cutout/A320 Outboard Flap.png",
    silhouette: "flap",
    aircraft: "Airbus A320",
    component: "Outboard Flap",
    partNo: "D572‑25300",
    material: "CFRP · Al honeycomb",
  },
  {
    src: "/images/work/cutout/767 Aileron.png",
    silhouette: "aileron",
    aircraft: "Boeing 767",
    component: "Aileron",
    partNo: "113A1000‑6",
    material: "Al 2024‑T3 · CFRP skin",
  },
  {
    src: "/images/work/cutout/A330 Inboard Flap.png",
    silhouette: "flap",
    aircraft: "Airbus A330",
    component: "Inboard Flap",
    partNo: "D573‑41016",
    material: "CFRP · Al honeycomb",
  },
  {
    src: "/images/work/cutout/767 Outboard Flap.png",
    silhouette: "flap",
    aircraft: "Boeing 767",
    component: "Outboard Flap",
    partNo: "113T3102‑4",
    material: "Al 2024 · Nomex core",
  },
  {
    src: "/images/work/cutout/A330 Muffler.png",
    silhouette: "muffler",
    aircraft: "Airbus A330",
    component: "APU Muffler",
    partNo: "H2614‑9210",
    material: "Inconel · Ti flange",
  },
  {
    src: "/images/work/cutout/Rudder.png",
    silhouette: "rudder",
    aircraft: "Empennage",
    component: "Rudder",
    partNo: "A55‑1300‑01",
    material: "CFRP · Ti fittings",
  },
  {
    src: "/images/work/cutout/Vertical Leading Edge.png",
    silhouette: "leading-edge",
    aircraft: "Vertical Stabilizer",
    component: "Leading Edge",
    partNo: "118‑31200",
    material: "Al 2024‑T3",
  },
];

export default function Gallery() {
  const [feature, ...rest] = works;

  return (
    <section id="work" className="relative py-28 md:py-36 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Recent Work"
          title="The finish is the first thing the auditor sees."
          description="A selection of recently completed flight control surfaces, flaps, rudders, and exhaust components — stripped, repaired, inspected, and released from our South Florida facility."
        />

        {/* Feature card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16"
        >
          <BlueprintCard work={feature} feature />
        </motion.div>

        {/* Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((w, i) => (
            <motion.div
              key={w.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.25), ease: EASE }}
            >
              <BlueprintCard work={w} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintCard({ work, feature }: { work: Work; feature?: boolean }) {
  const aspect = feature ? "aspect-[21/9]" : "aspect-[4/3]";
  return (
    <figure className={`group relative rounded-xl border border-white/5 bg-ink-950 overflow-hidden ${feature ? "rounded-2xl" : ""}`}>
      <div className={`relative ${aspect} overflow-hidden`}>
        {/* Blueprint paper background */}
        <BlueprintBackground />

        {/* Engineering drawing overlay — grids, dimensions, callouts */}
        <EngineeringDrawing work={work} feature={feature} />

        {/* Part silhouette — VERY subtle ghost */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PartSilhouette type={work.silhouette} feature={feature} />
        </div>

        {/* Cutout photo overlaid — hero */}
        <div className="absolute inset-0 flex items-center justify-center p-5 md:p-8">
          <div className="relative w-full h-full">
            <Image
              src={work.src}
              alt={`${work.aircraft} ${work.component}`}
              fill
              priority={feature}
              sizes={feature ? "(max-width: 1280px) 100vw, 1280px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Title + state annotations on top (above drawing layer) */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent/80">
            {work.aircraft}
          </div>
          {feature && (
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 px-2 py-0.5 rounded border border-accent/20 bg-ink-950/60">
              REV · A
            </div>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 pointer-events-none">
          <div>
            <div className={`font-display font-semibold text-slate-50 tracking-tight ${feature ? "text-2xl md:text-3xl" : "text-lg"}`}>
              {work.component}
            </div>
            {feature && (
              <div className="mt-1 font-mono text-[11px] tracking-wider text-slate-400">
                PN {work.partNo} · {work.material}
              </div>
            )}
          </div>
          {feature && (
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 px-2.5 py-1 rounded-full border border-white/10 bg-ink-950/50 backdrop-blur-sm shrink-0">
              Stripped · Repaired · Painted · Released
            </div>
          )}
          {!feature && (
            <div className="font-mono text-[9px] tracking-wider uppercase text-slate-500 text-right shrink-0">
              {work.material}
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

function EngineeringDrawing({ work, feature }: { work: Work; feature?: boolean }) {
  const scale = feature ? "1.5" : "1";
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full text-accent/10 pointer-events-none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id={`arrow-${work.silhouette}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 5 3 L 0 6 z" fill="currentColor" opacity="0.5" />
        </marker>
        <marker id={`arrow-r-${work.silhouette}`} markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M 6 0 L 1 3 L 6 6 z" fill="currentColor" opacity="0.5" />
        </marker>
      </defs>

      {/* Double frame border */}
      <rect x="6" y="6" width="calc(100% - 12px)" height="calc(100% - 12px)" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <rect x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 20px)" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />

      {/* Top dimension line with arrows + value */}
      <g opacity="0.55">
        <line
          x1="14%"
          y1="22"
          x2="86%"
          y2="22"
          stroke="currentColor"
          strokeWidth="0.5"
          markerStart={`url(#arrow-r-${work.silhouette})`}
          markerEnd={`url(#arrow-${work.silhouette})`}
        />
        <line x1="14%" y1="14" x2="14%" y2="30" stroke="currentColor" strokeWidth="0.5" />
        <line x1="86%" y1="14" x2="86%" y2="30" stroke="currentColor" strokeWidth="0.5" />
        <text x="50%" y="18" fontSize={feature ? "10" : "8"} fill="currentColor" textAnchor="middle" fontFamily="ui-monospace, monospace" opacity="0.8">
          {dimensionFor(work.silhouette).chord}
        </text>
      </g>

      {/* Right dimension line with arrows + value */}
      <g opacity="0.55">
        <line
          x1="calc(100% - 22px)"
          y1="18%"
          x2="calc(100% - 22px)"
          y2="82%"
          stroke="currentColor"
          strokeWidth="0.5"
          markerStart={`url(#arrow-r-${work.silhouette})`}
          markerEnd={`url(#arrow-${work.silhouette})`}
        />
        <line x1="calc(100% - 30px)" y1="18%" x2="calc(100% - 14px)" y2="18%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="calc(100% - 30px)" y1="82%" x2="calc(100% - 14px)" y2="82%" stroke="currentColor" strokeWidth="0.5" />
        <text
          x="calc(100% - 22px)"
          y="50%"
          fontSize={feature ? "10" : "8"}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          opacity="0.8"
          transform="rotate(-90 calc(100% - 22px) 0)"
          style={{ transformOrigin: "calc(100% - 22px) 50%" }}
        >
          {dimensionFor(work.silhouette).thickness}
        </text>
      </g>

      {/* Centerlines — long-short-long dash pattern crossing center */}
      <g opacity="0.3">
        <line x1="6%" y1="50%" x2="94%" y2="50%" stroke="currentColor" strokeWidth="0.4" strokeDasharray="8 2 1 2" />
        <line x1="50%" y1="6%" x2="50%" y2="94%" stroke="currentColor" strokeWidth="0.4" strokeDasharray="8 2 1 2" />
      </g>

      {/* Section/detail markers */}
      <g opacity="0.6">
        <circle cx="20%" cy="50%" r={feature ? "10" : "7"} fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 2" />
        <text x="20%" y="50%" fontSize={feature ? "9" : "7"} fill="currentColor" textAnchor="middle" dy="0.35em" fontFamily="ui-monospace, monospace">A</text>
        <circle cx="80%" cy="50%" r={feature ? "10" : "7"} fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 2" />
        <text x="80%" y="50%" fontSize={feature ? "9" : "7"} fill="currentColor" textAnchor="middle" dy="0.35em" fontFamily="ui-monospace, monospace">B</text>
      </g>

      {/* Corner hash marks */}
      <g opacity="0.5" stroke="currentColor" strokeWidth="0.6" fill="none">
        <path d="M 10 26 L 26 26 M 26 26 L 26 10" />
        <path d="M calc(100% - 26px) 10 L calc(100% - 26px) 26 M calc(100% - 26px) 26 L calc(100% - 10px) 26" />
        <path d="M 10 calc(100% - 26px) L 26 calc(100% - 26px) M 26 calc(100% - 26px) L 26 calc(100% - 10px)" />
        <path d="M calc(100% - 26px) calc(100% - 10px) L calc(100% - 26px) calc(100% - 26px) M calc(100% - 26px) calc(100% - 26px) L calc(100% - 10px) calc(100% - 26px)" />
      </g>

      {/* Title block (bottom-right inside frame) */}
      {feature && (
        <g transform="translate(calc(100% - 180px), calc(100% - 60px))" opacity="0.7">
          <rect x="0" y="0" width="160" height="44" fill="rgba(5,7,10,0.5)" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="14" x2="160" y2="14" stroke="currentColor" strokeWidth="0.4" />
          <line x1="80" y1="14" x2="80" y2="44" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="29" x2="160" y2="29" stroke="currentColor" strokeWidth="0.4" />
          <text x="6" y="10" fontSize="7" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.9">FLG TECHNICS · MRO</text>
          <text x="6" y="24" fontSize="6" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.7">PART</text>
          <text x="6" y="39" fontSize="7" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.9">{work.partNo}</text>
          <text x="86" y="24" fontSize="6" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.7">SCALE</text>
          <text x="86" y="39" fontSize="7" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.9">1:{scale.replace(".", "")}</text>
        </g>
      )}

      {/* Scale bar (bottom-left) */}
      <g transform="translate(14, calc(100% - 18px))" opacity="0.5">
        <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.5" />
        <line x1="20" y1="-2" x2="20" y2="2" stroke="currentColor" strokeWidth="0.5" />
        <line x1="40" y1="-2" x2="40" y2="2" stroke="currentColor" strokeWidth="0.5" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="currentColor" strokeWidth="0.5" />
        <text x="0" y="10" fontSize="6" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.8">0</text>
        <text x="60" y="10" fontSize="6" fill="currentColor" fontFamily="ui-monospace, monospace" opacity="0.8" textAnchor="end">100mm</text>
      </g>
    </svg>
  );
}

function dimensionFor(type: Work["silhouette"]): { chord: string; thickness: string } {
  switch (type) {
    case "aileron": return { chord: "3850 mm", thickness: "420 mm" };
    case "flap": return { chord: "4620 mm", thickness: "580 mm" };
    case "rudder": return { chord: "2400 mm", thickness: "Ø 680 mm" };
    case "inlet": return { chord: "Ø 1200 mm", thickness: "Ø 1200 mm" };
    case "leading-edge": return { chord: "3100 mm", thickness: "320 mm" };
    case "muffler": return { chord: "1850 mm", thickness: "Ø 520 mm" };
  }
}

function BlueprintBackground() {
  return (
    <>
      {/* Deep background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#071018] via-[#05090F] to-[#030609]" />
      {/* Fine grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Major grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.12) 1px, transparent 1px)",
          backgroundSize: "128px 128px",
        }}
      />
      {/* Radial softening at center */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(5,7,10,0.25), rgba(5,7,10,0.75) 90%)",
        }}
      />
    </>
  );
}

function TechnicalFrame({ feature }: { feature?: boolean }) {
  const size = feature ? 16 : 10;
  const dimensions = feature
    ? ["A", "B", "C", "D", "E", "F"]
    : ["A", "B", "C"];

  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full text-accent/35 pointer-events-none"
      preserveAspectRatio="none"
    >
      {/* Corner brackets */}
      <path d={`M 12 12 L ${size + 12} 12 M 12 12 L 12 ${size + 12}`} stroke="currentColor" strokeWidth="1" fill="none" />
      <path d={`M calc(100% - ${size + 12}px) 12 L calc(100% - 12px) 12 M calc(100% - 12px) 12 L calc(100% - 12px) ${size + 12}`} stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Tick marks along edges — simulated dimension scale */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.5">
        {dimensions.map((_, i) => {
          const pct = ((i + 1) * 100) / (dimensions.length + 1);
          return (
            <g key={i}>
              <line x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="8" />
              <line x1={`${pct}%`} y1="calc(100% - 8px)" x2={`${pct}%`} y2="100%" />
              <line x1="0" y1={`${pct}%`} x2="8" y2={`${pct}%`} />
              <line x1="calc(100% - 8px)" y1={`${pct}%`} x2="100%" y2={`${pct}%`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function PartSilhouette({ type, feature }: { type: Work["silhouette"]; feature?: boolean }) {
  const stroke = feature ? 0.8 : 0.6;
  const className = `text-accent/5 ${feature ? "w-[70%] max-w-4xl" : "w-[78%] max-w-md"}`;

  switch (type) {
    case "aileron":
      return (
        <svg viewBox="0 0 400 160" className={className} fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M 20 80 L 380 40 L 380 90 L 20 120 Z" />
          <path d="M 20 80 L 380 40" />
          <path d="M 20 120 L 380 90" />
          <line x1="60" y1="80" x2="60" y2="118" strokeDasharray="2 3" />
          <line x1="140" y1="70" x2="140" y2="112" strokeDasharray="2 3" />
          <line x1="220" y1="60" x2="220" y2="105" strokeDasharray="2 3" />
          <line x1="300" y1="52" x2="300" y2="98" strokeDasharray="2 3" />
          <circle cx="20" cy="100" r="3" />
          <circle cx="380" cy="65" r="3" />
          <path d="M 20 140 L 380 140 M 20 135 L 20 145 M 380 135 L 380 145" strokeDasharray="2 2" />
          <text x="200" y="155" fontSize="8" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="monospace" opacity="0.6">SPAN 3.85m</text>
        </svg>
      );
    case "flap":
      return (
        <svg viewBox="0 0 400 160" className={className} fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M 30 60 Q 180 45 370 55 L 370 100 Q 180 118 30 110 Z" />
          <path d="M 30 60 Q 180 45 370 55" />
          <path d="M 30 110 Q 180 118 370 100" />
          <line x1="80" y1="63" x2="80" y2="113" strokeDasharray="2 3" />
          <line x1="160" y1="55" x2="160" y2="116" strokeDasharray="2 3" />
          <line x1="240" y1="51" x2="240" y2="114" strokeDasharray="2 3" />
          <line x1="320" y1="53" x2="320" y2="102" strokeDasharray="2 3" />
          <circle cx="30" cy="85" r="3" />
          <circle cx="370" cy="77" r="3" />
          <path d="M 30 140 L 370 140 M 30 135 L 30 145 M 370 135 L 370 145" strokeDasharray="2 2" />
          <text x="200" y="155" fontSize="8" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="monospace" opacity="0.6">CHORD 0.92m</text>
        </svg>
      );
    case "rudder":
      return (
        <svg viewBox="0 0 260 320" className={className} fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M 90 30 L 200 30 L 220 290 L 70 290 Z" />
          <line x1="130" y1="30" x2="118" y2="290" strokeDasharray="2 3" />
          <line x1="165" y1="30" x2="168" y2="290" strokeDasharray="2 3" />
          <circle cx="100" cy="50" r="3" />
          <circle cx="100" cy="150" r="3" />
          <circle cx="100" cy="270" r="3" />
          <path d="M 40 30 L 40 290 M 35 30 L 45 30 M 35 290 L 45 290" strokeDasharray="2 2" />
          <text x="20" y="165" fontSize="8" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="monospace" opacity="0.6" transform="rotate(-90 20 165)">HEIGHT 2.4m</text>
        </svg>
      );
    case "inlet":
      return (
        <svg viewBox="0 0 300 260" className={className} fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M 60 130 Q 60 40 150 40 Q 240 40 240 130 Q 240 220 150 220 Q 60 220 60 130 Z" />
          <path d="M 90 130 Q 90 70 150 70 Q 210 70 210 130 Q 210 190 150 190 Q 90 190 90 130 Z" />
          <line x1="60" y1="130" x2="240" y2="130" strokeDasharray="3 4" />
          <line x1="150" y1="40" x2="150" y2="220" strokeDasharray="3 4" />
          <circle cx="150" cy="130" r="4" />
          <circle cx="150" cy="130" r="8" />
          <text x="150" y="245" fontSize="8" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="monospace" opacity="0.6">Ø 1.2m</text>
        </svg>
      );
    case "leading-edge":
      return (
        <svg viewBox="0 0 400 220" className={className} fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M 30 110 Q 30 30 120 30 L 370 30 L 370 190 L 120 190 Q 30 190 30 110 Z" />
          <path d="M 30 110 Q 30 60 90 55 L 370 55" />
          <path d="M 30 110 Q 30 160 90 165 L 370 165" />
          <circle cx="60" cy="110" r="3" />
          <circle cx="370" cy="110" r="3" />
        </svg>
      );
    case "muffler":
      return (
        <svg viewBox="0 0 400 180" className={className} fill="none" stroke="currentColor" strokeWidth={stroke}>
          {/* Main muffler body — perforated tube */}
          <ellipse cx="90" cy="90" rx="18" ry="50" />
          <path d="M 90 40 L 340 40" />
          <path d="M 90 140 L 340 140" />
          {/* Flared outlet (right end) */}
          <ellipse cx="340" cy="90" rx="24" ry="60" />
          <ellipse cx="352" cy="90" rx="18" ry="58" />
          {/* Perforation tick marks on body */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <g key={i}>
              <circle cx={110 + i * 18} cy="60" r="1.5" />
              <circle cx={110 + i * 18} cy="80" r="1.5" />
              <circle cx={110 + i * 18} cy="100" r="1.5" />
              <circle cx={110 + i * 18} cy="120" r="1.5" />
            </g>
          ))}
          {/* Mount flange (left) */}
          <rect x="66" y="68" width="16" height="44" />
          {/* Centerline */}
          <line x1="60" y1="90" x2="380" y2="90" strokeDasharray="6 2 1 2" opacity="0.5" />
          {/* End caps */}
          <circle cx="90" cy="90" r="3" />
          <circle cx="340" cy="90" r="3" />
        </svg>
      );
  }
}
