"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
 * Nothing here alters the image: no added text, no crop, no recolour. Every
 * layer is transparent and pointer-events:none, and all motion pauses when the
 * section leaves the viewport, when the tab is hidden, or when the visitor
 * prefers reduced motion.
 */

const VB_W = 1536;
const VB_H = 1024;

/** Earth limb, least-squares fitted to the artwork's bright edge (~4px residual). */
const GLOBE = { cx: 763.4, cy: 860.5, r: 459.3 };

type Route = { d: string; dur: number; delay: number; hue: "cyan" | "teal" };

/**
 * Connection routes traced out of the artwork. Each is a quadratic Bezier
 * fitted against the drawn cyan strokes (>=96% of sampled points land on a
 * real stroke), and rejected if it merely hugged the bright limb.
 */
const ROUTES: Route[] = [
  { d: "M608 480 Q751 387 884 494", dur: 7.4, delay: 0.0, hue: "cyan" },
  { d: "M608 480 Q799 360 890 566", dur: 9.6, delay: 2.7, hue: "teal" },
  { d: "M928 558 Q865 444 740 408", dur: 6.8, delay: 1.4, hue: "cyan" },
  { d: "M862 572 Q1054 383 1212 602", dur: 11.2, delay: 4.1, hue: "teal" },
  { d: "M882 548 Q1005 561 1126 584", dur: 8.1, delay: 6.3, hue: "cyan" },
  { d: "M978 498 Q1138 454 1212 602", dur: 9.0, delay: 3.2, hue: "teal" },
  { d: "M1264 696 Q1201 482 978 498", dur: 10.4, delay: 5.5, hue: "cyan" },
  { d: "M928 558 Q1114 538 1166 718", dur: 7.9, delay: 8.2, hue: "teal" },
  { d: "M310 722 Q333 446 608 480", dur: 12.0, delay: 1.9, hue: "cyan" },
];

/** Connection nodes — the route endpoints, i.e. nodes actually drawn on the globe. */
const NODES: { x: number; y: number; dur: number; delay: number }[] = [
  { x: 608, y: 480, dur: 5.2, delay: 0.0 },
  { x: 884, y: 494, dur: 6.4, delay: 1.3 },
  { x: 890, y: 566, dur: 5.8, delay: 2.6 },
  { x: 928, y: 558, dur: 7.1, delay: 0.9 },
  { x: 740, y: 408, dur: 6.0, delay: 3.4 },
  { x: 862, y: 572, dur: 5.5, delay: 4.2 },
  { x: 1212, y: 602, dur: 6.7, delay: 1.8 },
  { x: 882, y: 548, dur: 5.9, delay: 5.1 },
  { x: 1126, y: 584, dur: 7.3, delay: 2.2 },
  { x: 978, y: 498, dur: 6.2, delay: 3.9 },
  { x: 1264, y: 696, dur: 5.6, delay: 0.5 },
  { x: 1166, y: 718, dur: 6.9, delay: 4.7 },
  { x: 310, y: 722, dur: 6.1, delay: 2.9 },
];

/** Icon rings, located by annulus matching — all 13 verified against the art. */
const ICONS: { x: number; y: number; r: number }[] = [
  { x: 206, y: 314, r: 44 },
  { x: 672, y: 346, r: 40 },
  { x: 1146, y: 322, r: 42 },
  { x: 112, y: 444, r: 42 },
  { x: 1262, y: 452, r: 42 },
  { x: 84, y: 580, r: 42 },
  { x: 1288, y: 586, r: 42 },
  { x: 102, y: 720, r: 42 },
  { x: 1234, y: 718, r: 42 },
  { x: 364, y: 838, r: 42 },
  { x: 636, y: 844, r: 42 },
  { x: 886, y: 844, r: 42 },
  { x: 1184, y: 854, r: 40 },
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
  { x: 58, y: 96, r: 1.6, dx: 10, dy: 7, dur: 17, delay: 0.0, o: 0.3 },
  { x: 150, y: 62, r: 1.1, dx: -8, dy: 9, dur: 21, delay: 3.0, o: 0.22 },
  { x: 232, y: 176, r: 1.9, dx: 7, dy: -9, dur: 19, delay: 6.0, o: 0.26 },
  { x: 96, y: 210, r: 1.3, dx: 9, dy: 6, dur: 23, delay: 1.5, o: 0.2 },
  { x: 1318, y: 78, r: 1.5, dx: -9, dy: 8, dur: 18, delay: 2.0, o: 0.28 },
  { x: 1436, y: 140, r: 1.2, dx: 8, dy: -7, dur: 22, delay: 5.0, o: 0.22 },
  { x: 1372, y: 214, r: 1.8, dx: -7, dy: -8, dur: 20, delay: 8.0, o: 0.24 },
  { x: 1492, y: 56, r: 1.1, dx: -6, dy: 9, dur: 24, delay: 3.5, o: 0.18 },
  { x: 24, y: 372, r: 1.4, dx: 8, dy: 10, dur: 21, delay: 1.0, o: 0.24 },
  { x: 16, y: 560, r: 1.1, dx: 9, dy: -8, dur: 25, delay: 4.5, o: 0.18 },
  { x: 30, y: 742, r: 1.6, dx: 7, dy: 9, dur: 19, delay: 7.0, o: 0.22 },
  { x: 1508, y: 400, r: 1.3, dx: -8, dy: 9, dur: 22, delay: 2.5, o: 0.22 },
  { x: 1520, y: 604, r: 1.5, dx: -7, dy: -9, dur: 20, delay: 6.0, o: 0.2 },
  { x: 1500, y: 786, r: 1.2, dx: -9, dy: 7, dur: 24, delay: 0.5, o: 0.18 },
  { x: 210, y: 978, r: 1.4, dx: 11, dy: -7, dur: 23, delay: 3.0, o: 0.2 },
  { x: 560, y: 996, r: 1.1, dx: -9, dy: -8, dur: 26, delay: 6.5, o: 0.16 },
  { x: 940, y: 966, r: 1.7, dx: 8, dy: 9, dur: 21, delay: 1.2, o: 0.22 },
  { x: 1290, y: 988, r: 1.3, dx: -10, dy: -6, dur: 24, delay: 4.0, o: 0.18 },
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

export default function ExcellenceGlobe() {
  const stageRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);

  // Visibility gating — animations only burn frames while the section is on
  // screen and the tab is actually being looked at.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let onScreen = true;
    const sync = () => {
      stage.dataset.active = onScreen && !document.hidden ? "true" : "false";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "160px 0px" },
    );
    io.observe(stage);
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
    <section id="excellence" className="eg-section relative overflow-hidden py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto w-full max-w-[1536px] px-2 sm:px-4 md:px-6"
      >
        <div
          ref={stageRef}
          data-active="true"
          className="eg-stage relative w-full overflow-hidden"
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

            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              aria-hidden="true"
              focusable="false"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <radialGradient id="egNodeGlow">
                  <stop offset="0%" stopColor="#E8FBFF" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#7DD3FC" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
                </radialGradient>
              </defs>

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
                    fill="url(#egNodeGlow)"
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
                  r={500}
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
                  r={545}
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
