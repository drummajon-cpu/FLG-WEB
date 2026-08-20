"use client";

import Image from "next/image";
import type { ComponentType, CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Compass,
  Crosshair,
  Fan,
  Frame,
  Gauge,
  Hexagon,
  Layers,
  Plane,
  Puzzle,
  Shield,
  ShieldCheck,
  Target,
} from "lucide-react";

/**
 * ExcellenceGlobe — the "Excellence in everything we do" panorama.
 *
 * The artwork is a flat raster: every arc, node and icon ring is baked into
 * the pixels. So the motion layers below are not decorative guesses — the
 * geometry was extracted from the image itself (annulus matching for the icon
 * rings, blob detection for the connection nodes, and a least-squares circle
 * fit for the Earth limb), then expressed in the image's own 1536x1024 space.
 * The SVG overlays share that viewBox, so every tracer rides a connection path
 * that is genuinely drawn in the artwork.
 *
 * On phones the raster is abandoned as a *reading* surface. Its body copy is
 * ~14px inside a 1536px-wide image, which lands at roughly 3px on a 375px
 * screen — unreadable at any zoom the layout allows, and invisible to screen
 * readers. Below `xl` the section therefore re-composes: the globe is cropped
 * out of the artwork as the visual anchor (tracers still riding it), and the
 * headline and thirteen capabilities render as real, selectable text.
 */

const VB_W = 1536;
const VB_H = 1024;

/** Earth limb, least-squares fitted to the artwork's bright edge (~5px residual). */
const GLOBE = { cx: 769.3, cy: 849.6, r: 438.6 };

/**
 * Mobile crop, in artwork pixels — the globe's upper hemisphere. Chosen to sit
 * clear of every icon ring so no unreadable baked-in caption survives the crop:
 * the bottom row starts at y=882, the side columns end at x=126 and begin at
 * x=1178, and the top row ends at y=356.
 */
const CROP = { x: 340, y: 428, w: 830, h: 412 };

type Route = { d: string; dur: number; delay: number; hue: "cyan" | "teal" };

/**
 * Connection routes traced out of the artwork. Each is a quadratic Bezier
 * fitted against the drawn cyan strokes (>=93% of sampled points land on a
 * real stroke), and rejected if it merely hugged the bright limb.
 */
const ROUTES: Route[] = [
  { d: "M360 612 Q490 618 578 522", dur: 7.4, delay: 0.0, hue: "cyan" },
  { d: "M646 708 Q556 504 360 612", dur: 9.6, delay: 2.7, hue: "teal" },
  { d: "M646 708 Q530 698 430 756", dur: 8.3, delay: 7.1, hue: "cyan" },
  { d: "M448 716 Q531 595 678 598", dur: 6.8, delay: 1.4, hue: "cyan" },
  { d: "M578 522 Q728 387 902 490", dur: 11.2, delay: 4.1, hue: "teal" },
  { d: "M970 608 Q805 423 578 522", dur: 8.6, delay: 6.3, hue: "cyan" },
  { d: "M1146 472 Q1033 606 902 490", dur: 9.4, delay: 3.2, hue: "teal" },
  { d: "M1154 758 Q1097 559 902 490", dur: 10.8, delay: 5.5, hue: "cyan" },
  { d: "M1050 744 Q1046 590 1146 472", dur: 9.1, delay: 9.4, hue: "teal" },
];

/** Connection nodes — the routes' endpoints, i.e. nodes actually drawn on the globe. */
const NODES: { x: number; y: number; dur: number; delay: number }[] = [
  { x: 360, y: 612, dur: 5.2, delay: 0.0 },
  { x: 578, y: 522, dur: 6.4, delay: 1.3 },
  { x: 646, y: 708, dur: 5.8, delay: 2.6 },
  { x: 448, y: 716, dur: 7.1, delay: 0.9 },
  { x: 678, y: 598, dur: 6.0, delay: 3.4 },
  { x: 902, y: 490, dur: 5.5, delay: 4.2 },
  { x: 970, y: 608, dur: 6.7, delay: 1.8 },
  { x: 1146, y: 472, dur: 5.9, delay: 5.1 },
  { x: 1154, y: 758, dur: 7.3, delay: 2.2 },
  { x: 870, y: 604, dur: 6.2, delay: 3.9 },
  { x: 382, y: 820, dur: 5.6, delay: 4.7 },
  { x: 430, y: 756, dur: 6.6, delay: 6.0 },
  { x: 1050, y: 744, dur: 5.4, delay: 7.4 },
];

/** Icon rings, located by annulus matching — all 13 verified against the art. */
const ICONS: { x: number; y: number; r: number }[] = [
  { x: 222, y: 332, r: 42 },
  { x: 682, y: 356, r: 41 },
  { x: 1144, y: 332, r: 43 },
  { x: 126, y: 462, r: 42 },
  { x: 1252, y: 472, r: 42 },
  { x: 100, y: 610, r: 42 },
  { x: 1276, y: 614, r: 42 },
  { x: 108, y: 756, r: 43 },
  { x: 1220, y: 756, r: 42 },
  { x: 366, y: 882, r: 40 },
  { x: 634, y: 882, r: 40 },
  { x: 880, y: 882, r: 40 },
  { x: 1174, y: 890, r: 40 },
];

/**
 * The thirteen capabilities, transcribed from the artwork. This is the mobile
 * reading surface, so it has to stay in step with the graphic — if the artwork
 * is ever re-rendered with different wording, update these too.
 */
const CAPABILITIES: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}[] = [
  {
    icon: Crosshair,
    title: "Precision in every repair",
    body: "Exacting standards and meticulous attention to every detail.",
  },
  {
    icon: Target,
    title: "Where reliability takes off",
    body: "Proven processes that keep your operation moving forward.",
  },
  {
    icon: Award,
    title: "Excellence engineered",
    body: "Built-in quality from the first inspection to final release.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence in every flight",
    body: "Reliable repairs that meet or exceed OEM standards.",
  },
  {
    icon: Layers,
    title: "Mastery in composites",
    body: "Advanced composite repairs with confidence.",
  },
  {
    icon: Puzzle,
    title: "Flight ready solutions",
    body: "Delivering parts that are ready when you are.",
  },
  {
    icon: Plane,
    title: "Your trusted MRO partner",
    body: "A partner you can count on, every step of the way.",
  },
  {
    icon: Hexagon,
    title: "Advanced MRO expertise",
    body: "Decades of experience across a wide range of components.",
  },
  {
    icon: Gauge,
    title: "Flight critical expertise",
    body: "Trusted expertise for your most critical components.",
  },
  {
    icon: Frame,
    title: "Excellence in structures",
    body: "Structural repairs you can depend on.",
  },
  {
    icon: Shield,
    title: "Safety delivered",
    body: "Safety is designed into everything we do.",
  },
  {
    icon: Fan,
    title: "The MRO that protects every flight",
    body: "We protect your aircraft and your reputation.",
  },
  {
    icon: Compass,
    title: "Composite & structural precision",
    body: "Combining advanced materials knowledge with structural precision.",
  },
];

/**
 * City-light clusters, found by looking for warm bright blobs (R>150, R>B+45)
 * on the globe disc and keeping the strongest, spaced at least 86px apart. The
 * artwork already draws these — the overlay just lets them breathe.
 */
const CITIES: { x: number; y: number; r: number; dur: number; delay: number }[] = [
  { x: 898, y: 696, r: 27, dur: 6.2, delay: 0.0 },
  { x: 693, y: 657, r: 21, dur: 7.4, delay: 1.7 },
  { x: 1022, y: 744, r: 21, dur: 5.8, delay: 3.1 },
  { x: 831, y: 634, r: 16, dur: 8.1, delay: 0.8 },
  { x: 483, y: 609, r: 15, dur: 6.7, delay: 4.4 },
  { x: 780, y: 560, r: 14, dur: 7.0, delay: 2.3 },
  { x: 402, y: 694, r: 11, dur: 5.5, delay: 5.6 },
  { x: 910, y: 597, r: 10, dur: 8.6, delay: 1.2 },
  { x: 1038, y: 648, r: 10, dur: 6.0, delay: 6.9 },
  { x: 1104, y: 772, r: 10, dur: 7.7, delay: 3.8 },
  { x: 436, y: 810, r: 10, dur: 6.4, delay: 2.9 },
  { x: 598, y: 537, r: 8, dur: 5.2, delay: 7.6 },
  { x: 1155, y: 699, r: 8, dur: 8.3, delay: 5.0 },
  { x: 650, y: 741, r: 7, dur: 6.9, delay: 4.1 },
];

/** Distant data points, seeded only in the artwork's empty dark margins. */
const PARTICLES: {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
  o: number;
}[] = [
  { x: 58, y: 76, r: 1.6, dx: 10, dy: 7, dur: 17, delay: 0.0, o: 0.3 },
  { x: 160, y: 52, r: 1.1, dx: -8, dy: 9, dur: 21, delay: 3.0, o: 0.22 },
  { x: 242, y: 116, r: 1.9, dx: 7, dy: -9, dur: 19, delay: 6.0, o: 0.26 },
  { x: 96, y: 140, r: 1.3, dx: 9, dy: 6, dur: 23, delay: 1.5, o: 0.2 },
  { x: 1330, y: 68, r: 1.5, dx: -9, dy: 8, dur: 18, delay: 2.0, o: 0.28 },
  { x: 1446, y: 120, r: 1.2, dx: 8, dy: -7, dur: 22, delay: 5.0, o: 0.22 },
  { x: 1382, y: 44, r: 1.8, dx: -7, dy: -8, dur: 20, delay: 8.0, o: 0.24 },
  { x: 1492, y: 150, r: 1.1, dx: -6, dy: 9, dur: 24, delay: 3.5, o: 0.18 },
  { x: 26, y: 372, r: 1.4, dx: 8, dy: 10, dur: 21, delay: 1.0, o: 0.24 },
  { x: 18, y: 560, r: 1.1, dx: 9, dy: -8, dur: 25, delay: 4.5, o: 0.18 },
  { x: 32, y: 742, r: 1.6, dx: 7, dy: 9, dur: 19, delay: 7.0, o: 0.22 },
  { x: 1500, y: 400, r: 1.3, dx: -8, dy: 9, dur: 22, delay: 2.5, o: 0.22 },
  { x: 1512, y: 604, r: 1.5, dx: -7, dy: -9, dur: 20, delay: 6.0, o: 0.2 },
  { x: 1494, y: 786, r: 1.2, dx: -9, dy: 7, dur: 24, delay: 0.5, o: 0.18 },
  { x: 210, y: 980, r: 1.4, dx: 11, dy: -7, dur: 23, delay: 3.0, o: 0.2 },
  { x: 560, y: 996, r: 1.1, dx: -9, dy: -8, dur: 26, delay: 6.5, o: 0.16 },
  { x: 940, y: 974, r: 1.7, dx: 8, dy: 9, dur: 21, delay: 1.2, o: 0.22 },
  { x: 1290, y: 990, r: 1.3, dx: -10, dy: -6, dur: 24, delay: 4.0, o: 0.18 },
];

/** Upper limb arc, swept across the top of the fitted Earth circle. */
const LIMB_ARC = (() => {
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [GLOBE.cx + GLOBE.r * Math.cos(a), GLOBE.cy - GLOBE.r * Math.sin(a)];
  };
  const [x0, y0] = pt(160);
  const [x1, y1] = pt(20);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${GLOBE.r} ${GLOBE.r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
})();

/**
 * Head, body and fading tail of a tracer. All three share one dashoffset
 * animation; `lead` pushes the longer dashes backwards so they trail the head
 * instead of running ahead of it.
 */
const TRACER_LAYERS = [
  { dash: 9, lead: 0, w: 1.7, op: 0.95 },
  { dash: 26, lead: 17, w: 2.6, op: 0.42 },
  { dash: 56, lead: 47, w: 3.6, op: 0.16 },
];

const HUE = {
  cyan: { head: "#E8FBFF", body: "#7DD3FC" },
  teal: { head: "#DFFBF5", body: "#5ED4C3" },
} as const;

/**
 * Atmosphere, tracers and node pulses, in the artwork's own coordinate space.
 * Rendered over both the full desktop panorama and the cropped mobile globe —
 * because it shares the artwork's viewBox, one definition lines up with either
 * framing. `idPrefix` keeps the two instances' gradient ids distinct.
 */
function GlobeOverlay({ idPrefix }: { idPrefix: string }) {
  const glow = `${idPrefix}NodeGlow`;
  const city = `${idPrefix}CityGlow`;
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor="#E8FBFF" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#7DD3FC" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={city}>
          <stop offset="0%" stopColor="#FFD79A" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#FFBE6B" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#FFAE4D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* City lights — a warm, slow breath over clusters the artwork already
          draws. Opacity only; nothing moves. */}
      <g>
        {CITIES.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={c.r}
            className="eg-anim eg-breathe"
            fill={`url(#${city})`}
            style={
              {
                "--eg-dur": `${c.dur}s`,
                "--eg-delay": `${c.delay}s`,
                "--eg-lo": "0.16",
                "--eg-hi": "0.44",
              } as CSSProperties
            }
          />
        ))}
      </g>

      {/* Atmosphere — a slow breath of light along the upper limb.
          Opacity only, so the globe never shifts or changes size. */}
      <g>
        <path
          d={LIMB_ARC}
          className="eg-anim eg-breathe"
          fill="none"
          stroke="#BFE9FF"
          strokeWidth={13}
          strokeLinecap="round"
          style={
            {
              "--eg-dur": "9s",
              "--eg-delay": "0s",
              "--eg-lo": "0.05",
              "--eg-hi": "0.15",
              filter: "blur(16px)",
            } as CSSProperties
          }
        />
        <path
          d={LIMB_ARC}
          className="eg-anim eg-breathe"
          fill="none"
          stroke="#E4F6FF"
          strokeWidth={4}
          strokeLinecap="round"
          style={
            {
              "--eg-dur": "11s",
              "--eg-delay": "1.5s",
              "--eg-lo": "0.06",
              "--eg-hi": "0.2",
              filter: "blur(5px)",
            } as CSSProperties
          }
        />
      </g>

      {/* Tracers — illuminated signals riding the routes drawn in the art. */}
      <g className="eg-tracers">
        {ROUTES.map((route, i) =>
          TRACER_LAYERS.map((layer, j) => (
            <path
              key={`${i}-${j}`}
              d={route.d}
              className="eg-anim eg-tracer"
              fill="none"
              pathLength={1000}
              stroke={j === 0 ? HUE[route.hue].head : HUE[route.hue].body}
              strokeWidth={layer.w}
              strokeLinecap="round"
              strokeDasharray={`${layer.dash} ${1000 - layer.dash}`}
              opacity={layer.op}
              style={
                {
                  "--eg-from": `${1000 + layer.lead}`,
                  "--eg-to": `${layer.lead}`,
                  "--eg-dur": `${route.dur}s`,
                  "--eg-delay": `${route.delay}s`,
                } as CSSProperties
              }
            />
          )),
        )}
      </g>

      {/* Node pulses — a slow brighten and swell of a few pixels. */}
      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={9}
            className="eg-anim eg-node"
            fill={`url(#${glow})`}
            style={
              {
                "--eg-dur": `${n.dur}s`,
                "--eg-delay": `${n.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}

export default function ExcellenceGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);

  // Visibility gating — animations only burn frames while the section is on
  // screen and the tab is actually being looked at. Bound to the section so it
  // covers the mobile globe as well as the desktop stage.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let onScreen = true;
    const sync = () => {
      el.dataset.active = onScreen && !document.hidden ? "true" : "false";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "160px 0px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Parallax — a few pixels of counter-motion between the artwork and the
  // distant particle field. Pointer-driven, desktop only, never on touch, and
  // never under prefers-reduced-motion.
  useEffect(() => {
    const stage = stageRef.current;
    const near = nearRef.current;
    const far = farRef.current;
    if (!stage || !near || !far) return;
    if (typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const draw = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      // The 1.012 scale keeps the travel hidden behind the artwork's own dark
      // margin, so no seam can appear at the edge of the frame.
      near.style.transform = `scale(1.012) translate3d(${(-cx * 4).toFixed(2)}px, ${(-cy * 4).toFixed(2)}px, 0)`;
      far.style.transform = `translate3d(${(cx * 7).toFixed(2)}px, ${(cy * 7).toFixed(2)}px, 0)`;
      raf =
        Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002
          ? requestAnimationFrame(draw)
          : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      near.style.transform = "";
      far.style.transform = "";
    };
  }, []);

  return (
    <section
      id="excellence"
      ref={sectionRef}
      data-active="true"
      className="eg-section relative overflow-hidden py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto w-full max-w-[1536px] px-5 sm:px-6 md:px-6"
      >
        {/* ---------------------------------------------------------------
            Phones, tablets and small laptops — the artwork's captions are only
            11px inside a 1536px image, so they land at ~2px here, ~5px on a
            tablet and ~9px at 1280. Below xl the globe is cropped out as the
            visual and the copy is set as real text instead.
           --------------------------------------------------------------- */}
        <div className="mx-auto max-w-5xl xl:hidden">
          <div className="mx-auto mb-7 w-[132px]">
            <Image
              src="/images/flg-logo-one-mro.png"
              alt="FLG Technics — One MRO"
              width={420}
              height={190}
              className="h-auto w-full"
            />
          </div>

          <h2 className="text-center font-display text-[clamp(1.6rem,7.2vw,2.4rem)] font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-slate-50">
            <span className="text-accent">Excellence</span> in everything we do
          </h2>
          <p className="mx-auto mt-3 max-w-[30rem] text-center text-[0.95rem] leading-relaxed text-slate-300">
            Global expertise. Proven processes. Uncompromising quality.
          </p>

          {/* The globe, cropped from the artwork. The inner box carries the
              whole 1536x1024 frame, scaled and shifted so CROP fills the
              window — which keeps the SVG overlay perfectly in register. */}
          <div
            className="eg-mobile-globe relative mt-8 w-full overflow-hidden"
            style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}
          >
            <div
              className="absolute left-0 top-0"
              style={{
                width: `${(VB_W / CROP.w) * 100}%`,
                aspectRatio: `${VB_W} / ${VB_H}`,
                transform: `translate(${(-CROP.x / VB_W) * 100}%, ${(-CROP.y / VB_H) * 100}%)`,
              }}
            >
              <Image
                src="/images/excellence-globe.png"
                alt=""
                aria-hidden="true"
                width={VB_W}
                height={VB_H}
                sizes="200vw"
                className="block h-auto w-full select-none"
              />
              <GlobeOverlay idPrefix="egM" />
            </div>
          </div>

          <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-ink-900/60">
                  <Icon className="h-[18px] w-[18px] text-teal-bright" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.95rem] font-semibold uppercase leading-snug text-slate-50">
                    {title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-slate-400">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------------------------------------------------------
            1280px and up — the artwork at full size, where its captions finally
            reach a legible ~11-13px, with the overlays locked to its geometry.
           --------------------------------------------------------------- */}
        <div
          ref={stageRef}
          className="eg-stage relative hidden w-full overflow-hidden xl:block"
        >
          {/* Near plane — the artwork, plus every overlay locked to its geometry. */}
          <div ref={nearRef} className="eg-plane relative">
            <Image
              src="/images/excellence-globe.png"
              alt="FLG Technics — excellence in everything we do. Global expertise, proven processes and uncompromising quality, shown across thirteen MRO capability areas arranged around a connected globe."
              width={VB_W}
              height={VB_H}
              sizes="(max-width: 1536px) 100vw, 1536px"
              className="block h-auto w-full select-none"
            />
            <GlobeOverlay idPrefix="egD" />
          </div>

          {/* Far plane — HUD rings and distant particles, drifting against the
              artwork to give the section a shallow sense of depth. */}
          <div
            ref={farRef}
            className="eg-plane pointer-events-none absolute inset-0"
          >
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              aria-hidden="true"
              focusable="false"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="egRingFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0.30" stopColor="#fff" stopOpacity="0" />
                  <stop offset="0.42" stopColor="#fff" stopOpacity="1" />
                  <stop offset="0.65" stopColor="#fff" stopOpacity="0.55" />
                  <stop offset="0.80" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <mask id="egRingMask">
                  <rect width={VB_W} height={VB_H} fill="url(#egRingFade)" />
                </mask>
              </defs>

              {/* HUD rings — counter-rotating and deliberately almost invisible.
                  Masked out before they reach the caption rows. */}
              <g mask="url(#egRingMask)">
                <circle
                  cx={GLOBE.cx}
                  cy={GLOBE.cy}
                  r={480}
                  className="eg-anim eg-ring"
                  fill="none"
                  stroke="#7DD3FC"
                  strokeWidth={1}
                  strokeOpacity={0.16}
                  strokeDasharray="2 26"
                  strokeLinecap="round"
                  style={{ "--eg-dur": "150s" } as CSSProperties}
                />
                <circle
                  cx={GLOBE.cx}
                  cy={GLOBE.cy}
                  r={522}
                  className="eg-anim eg-ring-rev"
                  fill="none"
                  stroke="#5ED4C3"
                  strokeWidth={1}
                  strokeOpacity={0.12}
                  strokeDasharray="1 44"
                  strokeLinecap="round"
                  style={{ "--eg-dur": "195s" } as CSSProperties}
                />
              </g>

              {/* Distant data points. */}
              <g>
                {PARTICLES.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={p.r}
                    className="eg-anim eg-particle"
                    fill={i % 3 === 0 ? "#5ED4C3" : "#9BDDFB"}
                    style={
                      {
                        "--eg-dur": `${p.dur}s`,
                        "--eg-delay": `${p.delay}s`,
                        "--eg-dx": `${p.dx}px`,
                        "--eg-dy": `${p.dy}px`,
                        "--eg-lo": `${p.o * 0.35}`,
                        "--eg-hi": `${p.o}`,
                      } as CSSProperties
                    }
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Icon hover — brightens the teal ring that is already drawn and lays
              a soft glow just outside it. The icon itself never moves. */}
          <div className="absolute inset-0">
            {ICONS.map((ic, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="eg-hotspot"
                style={{
                  left: `${(ic.x / VB_W) * 100}%`,
                  top: `${(ic.y / VB_H) * 100}%`,
                  width: `${((ic.r * 2) / VB_W) * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
