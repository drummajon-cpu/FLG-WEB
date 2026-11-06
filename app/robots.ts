import type { MetadataRoute } from "next";

// Everything is crawlable, including /api/public/inventory/*: the inventory page draws its
// parts list from those calls, so Google must be allowed to fetch them to see the parts.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://flgtechnics.com/sitemap.xml",
    host: "https://flgtechnics.com",
  };
}
