"use client";

/**
 * Subtle concentric signal ripples for the Contact section.
 * Positioned where the AOG pulsing dot lives, reinforcing the 24/7
 * "we're listening" metaphor. Pure CSS, GPU-friendly (transform + opacity),
 * respects prefers-reduced-motion.
 */
export default function SignalRipples({
  anchor = "center",
}: {
  anchor?: "center" | "top-center";
}) {
  const top = anchor === "top-center" ? "20%" : "50%";

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden motion-reduce:hidden"
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
            style={{
              width: "80px",
              height: "80px",
              animation: `ripple 4s cubic-bezier(0.23, 1, 0.32, 1) ${i}s infinite`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.4);
            opacity: 0.35;
          }
          80% {
            opacity: 0.02;
          }
          100% {
            transform: translate(-50%, -50%) scale(8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
