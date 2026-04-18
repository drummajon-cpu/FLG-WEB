import sharp from "sharp";
import path from "node:path";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#05070A"/>
      <stop offset="1" stop-color="#0A0D12"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.3" cy="0.2" r="0.8">
      <stop offset="0" stop-color="#0EA5E9" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#05070A" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(125,211,252,0.08)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Corner brackets -->
  <g stroke="rgba(125,211,252,0.5)" stroke-width="2" fill="none">
    <path d="M 40 40 L 70 40 M 40 40 L 40 70"/>
    <path d="M 1160 40 L 1130 40 M 1160 40 L 1160 70"/>
    <path d="M 40 590 L 70 590 M 40 590 L 40 560"/>
    <path d="M 1160 590 L 1130 590 M 1160 590 L 1160 560"/>
  </g>

  <!-- Tail streaks logo mark (scaled up, same orientation as nav) -->
  <g transform="translate(80, 160)">
    <g stroke="#5ED4C3" stroke-linecap="round" transform="translate(180 0) scale(-1 1)">
      <line x1="128" y1="14" x2="172" y2="8" stroke-width="6"/>
      <line x1="94" y1="30" x2="172" y2="22" stroke-width="7.5"/>
      <line x1="56" y1="46" x2="172" y2="38" stroke-width="9"/>
      <line x1="16" y1="62" x2="172" y2="54" stroke-width="10"/>
    </g>
    <!-- FLG Technics wordmark — heritage teal FLG, slate Technics -->
    <text x="0" y="140" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="68" font-weight="700" fill="#5ED4C3" letter-spacing="-2">FLG</text>
    <text x="130" y="140" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="64" font-weight="400" fill="#CBD5E1" letter-spacing="-1">Technics</text>
  </g>

  <!-- Main headline -->
  <text x="80" y="360" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="80" font-weight="700" fill="#F8FAFC" letter-spacing="-2.5">One MRO for the</text>
  <text x="80" y="450" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="80" font-weight="700" fill="#F8FAFC" letter-spacing="-2.5">
    <tspan fill="#7DD3FC">flight‑critical</tspan> systems.
  </text>

  <!-- Tagline / eyebrow -->
  <text x="80" y="270" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="22" font-weight="500" fill="#7DD3FC" letter-spacing="5">AEROSPACE · MRO · ENGINEERING</text>

  <!-- Bottom strip: certs -->
  <line x1="80" y1="530" x2="1120" y2="530" stroke="rgba(125,211,252,0.25)" stroke-width="1"/>
  <text x="80" y="572" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="20" font-weight="500" fill="#94A3B8" letter-spacing="4">FAA PART 145 · EASA · UK CAA · AWS D17.1</text>
  <text x="1120" y="572" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="20" font-weight="500" fill="#7DD3FC" letter-spacing="4" text-anchor="end">FLGTECHNICS.COM</text>
</svg>
`;

// Versioned filename so platforms that cache by URL (iMessage, Slack, Twitter,
// WhatsApp, LinkedIn, …) treat the image as brand new. Bump the suffix any
// time the visual changes and update the reference in app/layout.tsx.
const out = path.resolve("public/og-image-v2.png");
await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(out);
console.log("wrote", out);
