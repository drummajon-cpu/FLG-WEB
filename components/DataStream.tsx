"use client";

import { useMemo } from "react";

/**
 * Subtle falling data-stream background for the Systems section.
 * Each column loops a pre-generated string of pseudo-log-line fragments
 * so the rendering is deterministic and the animation is pure CSS
 * (transform: translateY). Respects prefers-reduced-motion.
 */

const CHARSET = [
  "WO260755",
  "WO260834",
  "PN H2614-9210",
  "PN D572-25300",
  "0x7f3a",
  "0x1c08",
  "TI-6AL-4V",
  "WELD·P2·PASS",
  "WELD·P3·LIVE",
  "AWS·D17.1",
  "DER·8110-3",
  "RE·SCAN·99.7%",
  "T+00:14",
  "T+02:31",
  "LOT 48271",
  "MAT·CERT",
  "8130-3",
  "REV·A",
  "AL·2024",
  "INCONEL·625",
  "°C·218",
  "QTY·001",
  "SHP·THU",
  "CLOCK·IN",
  "STAGE·65%",
  "STAGE·72%",
  "STAGE·80%",
  "FAA·145",
  "·····",
  "PN A55-1300",
  "OEM·OBSOLETE",
  "ROUT·042",
];

type ColumnSpec = {
  left: string;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  chars: string[];
};

function buildColumns(count: number, seed: number): ColumnSpec[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const cols: ColumnSpec[] = [];
  for (let i = 0; i < count; i++) {
    const chars: string[] = [];
    for (let j = 0; j < 14; j++) {
      chars.push(CHARSET[Math.floor(rand() * CHARSET.length)]);
    }
    cols.push({
      left: `${(i / count) * 100 + rand() * 2}%`,
      duration: 24 + rand() * 28,
      delay: -rand() * 40,
      size: 10 + Math.floor(rand() * 3),
      opacity: 0.12 + rand() * 0.14,
      chars,
    });
  }
  return cols;
}

export default function DataStream() {
  const columns = useMemo(() => buildColumns(14, 1998), []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      {columns.map((c, i) => (
        <div
          key={i}
          className="absolute top-0 font-mono leading-[1.6] whitespace-nowrap text-accent select-none"
          style={{
            left: c.left,
            fontSize: `${c.size}px`,
            opacity: c.opacity,
            animation: `datafall ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          {c.chars.concat(c.chars).map((ch, idx) => (
            <div key={idx}>{ch}</div>
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes datafall {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
}
