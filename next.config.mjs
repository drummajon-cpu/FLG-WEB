import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this folder. Without it Next walks up looking for a
  // lockfile and can pick a stray one in a parent directory.
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  images: {
    // AVIF first: smaller than WebP for the shop and work photos.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Social unfurlers (iMessage, Slack, Twitter, LinkedIn, WhatsApp, …)
        // will re-fetch relatively quickly when max-age is short, so bumping
        // the og-image-v{n}.png filename guarantees a fresh preview within a
        // day instead of sitting behind a long CDN cache.
        source: "/og-image-v:version.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        // Keep the HTML revalidation window short so updated og:image URLs
        // reach unfurlers on the next re-fetch.
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
