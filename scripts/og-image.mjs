import sharp from "sharp";
import path from "node:path";

const width = 1200;
const height = 630;

// Background + decoration + copy. The logo lockup is NOT drawn here — we
// composite the real /images/flg-logo.png (the 1999 original design shown
// live on the site) on top so the preview matches what visitors see.
const bgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
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

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>

  <g stroke="rgba(125,211,252,0.5)" stroke-width="2" fill="none">
    <path d="M 40 40 L 70 40 M 40 40 L 40 70"/>
    <path d="M 1160 40 L 1130 40 M 1160 40 L 1160 70"/>
    <path d="M 40 590 L 70 590 M 40 590 L 40 560"/>
    <path d="M 1160 590 L 1130 590 M 1160 590 L 1160 560"/>
  </g>

  <text x="80" y="112" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="22" font-weight="500" fill="#7DD3FC" letter-spacing="5">AEROSPACE · MRO · ENGINEERING</text>

  <text x="80" y="395" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="80" font-weight="700" fill="#F8FAFC" letter-spacing="-2.5">One MRO for the</text>
  <text x="80" y="480" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="80" font-weight="700" fill="#F8FAFC" letter-spacing="-2.5">
    <tspan fill="#7DD3FC">flight‑critical</tspan> systems.
  </text>

  <line x1="80" y1="530" x2="1120" y2="530" stroke="rgba(125,211,252,0.25)" stroke-width="1"/>
  <text x="80" y="572" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="20" font-weight="500" fill="#94A3B8" letter-spacing="4">FAA PART 145 · EASA · UK CAA · AWS D17.1</text>
  <text x="1120" y="572" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="20" font-weight="500" fill="#7DD3FC" letter-spacing="4" text-anchor="end">FLGTECHNICS.COM</text>
</svg>
`;

// Real logo lockup (1092×255 photo of the 1999 original). The photo sits on
// a dark backdrop, so we convert luminance → alpha (black pixels become
// fully transparent, the teal streaks and italic serif wordmark stay
// opaque), trim the transparent border tight, then resize. The result
// composites cleanly onto the gradient with no visible rectangle edge.
const logoSrc = sharp(path.resolve("public/images/flg-logo.png")).removeAlpha();
const { data: rgb, info } = await logoSrc.raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
  const r = rgb[i], g = rgb[i + 1], b = rgb[i + 2];
  rgba[j] = r;
  rgba[j + 1] = g;
  rgba[j + 2] = b;
  // Perceived luminance drives alpha. Squaring sharpens the falloff so the
  // faint dark halo around the painted logo fades to fully transparent.
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  rgba[j + 3] = Math.round(Math.pow(lum, 0.85) * 255);
}

const logoBuffer = await sharp(rgba, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 4 })
  .resize({ width: 520 })
  .png()
  .toBuffer();

const rendered = await sharp(Buffer.from(bgSvg))
  .composite([{ input: logoBuffer, top: 160, left: 80 }])
  .png({ quality: 92 })
  .toBuffer();

// Write three filenames:
//   • og-image-v3.png is what app/layout.tsx references — the fresh filename
//     forces every unfurling cache (iMessage, Slack, Twitter, LinkedIn,
//     WhatsApp, …) to re-fetch instead of serving a stale preview.
//   • og-image-v2.png is kept in sync for any HTML still pointed at v2.
//   • og-image.png is the generic fallback.
// Bump the `-v{n}` suffix here AND in app/layout.tsx whenever the visual
// changes so the new filename reaches unfurlers that key their cache on URL.
for (const name of ["og-image-v3.png", "og-image-v2.png", "og-image.png"]) {
  const out = path.resolve("public", name);
  await sharp(rendered).toFile(out);
  console.log("wrote", out);
}
