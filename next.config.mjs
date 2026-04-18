/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
