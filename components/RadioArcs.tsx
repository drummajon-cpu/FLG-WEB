"use client";

/**
 * Subtle radio-wave arcs emanating from the bottom-right corner of the
 * Contact section — evokes the "we're listening, reach us 24/7" signal
 * metaphor. Pure CSS animation on transform/opacity, GPU-accelerated,
 * respects prefers-reduced-motion.
 */
export default function RadioArcs() {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 right-0 w-[520px] h-[520px] pointer-events-none overflow-hidden motion-reduce:hidden"
    >
      {[0, 1.2, 2.4, 3.6].map((delay, i) => (
        <svg
          key={i}
          viewBox="0 0 520 520"
          className="absolute inset-0 text-accent"
          style={{
            transformOrigin: "100% 100%",
            animation: `radio-arc 4.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s infinite`,
          }}
        >
          <path
            d="M 520 0 A 520 520 0 0 1 0 520"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      ))}
      <style jsx>{`
        @keyframes radio-arc {
          0% {
            transform: scale(0.05);
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
