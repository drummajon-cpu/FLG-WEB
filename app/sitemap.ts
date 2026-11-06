import type { MetadataRoute } from "next";

const siteUrl = "https://flgtechnics.com";

// /inventory is the live parts-stock page, forwarded by proxy.ts. It is listed only
// once it is public (the same NEXT_PUBLIC_SHOW_INVENTORY_LINK switch as the nav button),
// so Google is never pointed at a page that answers "Not found".
const showInventory = process.env.NEXT_PUBLIC_SHOW_INVENTORY_LINK === "1";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...(showInventory
      ? [{ url: `${siteUrl}/inventory`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 }]
      : []),
    { url: `${siteUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/sms-privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
