import { clsx } from "clsx";

/**
 * FLG Technics logo — modernized from the original 1999 design.
 * The 4 ascending streaks sit ABOVE the "FLG" letters, mimicking the
 * empennage/tail profile of an aircraft climbing out.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={clsx("block", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Tail streaks — ascending, angled */}
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M 6 26 L 28 22" opacity="1" />
        <path d="M 8 20 L 34 14" opacity="0.85" />
        <path d="M 14 14 L 42 6" opacity="0.7" />
        <path d="M 22 9 L 46 2" opacity="0.5" />
      </g>
      {/* FLG wordmark beneath streaks */}
      <text
        x="4"
        y="56"
        fontFamily="var(--font-display), 'Space Grotesk', sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        FLG
      </text>
    </svg>
  );
}

/**
 * Just the tail streaks, used as an accent above a wordmark.
 */
export function TailStreaks({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      className={clsx("block", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/*
        1999 original: 4 simple stroked streaks with rounded caps.
        Short tip points LEFT (toward F), streaks hover over FLG.
        All left ends anchored near x=6. Longer tails fan out to the right
        with their right ends at varying x (16, 24, 32, 42) — but all stay
        within the FLG zone so they don't extend past "Technics".
        Transform mirrors on x-axis so the tip end is visually on the LEFT.
      */}
      <g stroke="currentColor" strokeLinecap="round" transform="translate(64 0) scale(-1 1)">
        <line x1="46" y1="3" x2="62" y2="5" strokeWidth="2" />
        <line x1="34" y1="9" x2="62" y2="11" strokeWidth="2.5" />
        <line x1="20" y1="15" x2="62" y2="18" strokeWidth="3" />
        <line x1="6" y1="22" x2="62" y2="25" strokeWidth="3.5" />
      </g>
    </svg>
  );
}

/**
 * Full lockup: streaks stacked above "FLG", then "Technics" beside.
 * Follows the 1999 original structure.
 */
import Image from "next/image";

export function LogoLockup({
  className,
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <div className={clsx("flex flex-col items-start leading-none", className)}>
      {/* Official FLG Technics logo — Mom's 1999 design */}
      <Image
        src="/images/flg-logo.png"
        alt="FLG Technics"
        width={1092}
        height={255}
        priority
        className="h-9 w-auto"
      />
      {tagline && (
        <span className="font-mono text-[9px] tracking-[0.22em] text-slate-500 uppercase mt-2 ml-1">
          Aerospace · MRO
        </span>
      )}
    </div>
  );
}
