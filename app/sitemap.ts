import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const siteUrl = "https://flgtechnics.com";

// /inventory is the live parts-stock page, forwarded by proxy.ts. It is listed only
// once it is public (the same NEXT_PUBLIC_SHOW_INVENTORY_LINK switch as the nav button),
// so Google is never pointed at a page that answers "Not found".
const showInventory = process.env.NEXT_PUBLIC_SHOW_INVENTORY_LINK === "1";

// The home page, the services index and every service page exist in English and in
// Spanish (/es/...). Each is listed in both languages, with hreflang alternates.
function bilingual(
  path: string,
  rest: { changeFrequency: "monthly" | "weekly"; priority: number },
  now: Date
): MetadataRoute.Sitemap {
  const en = `${siteUrl}${path}`;
  const es = `${siteUrl}/es${path}`;
  const alternates = { languages: { en, es, "x-default": en } };
  return [
    { url: en, lastModified: now, alternates, ...rest },
    { url: es, lastModified: now, alternates, ...rest, priority: Math.round((rest.priority - 0.1) * 10) / 10 },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...bilingual("", { changeFrequency: "monthly", priority: 1 }, now),
    ...(showInventory
      ? [{ url: `${siteUrl}/inventory`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 }]
      : []),
    ...bilingual("/services", { changeFrequency: "monthly", priority: 0.9 }, now),
    ...services.flatMap((s) => bilingual(`/services/${s.slug}`, { changeFrequency: "monthly", priority: 0.8 }, now)),
    { url: `${siteUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/sms-privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
