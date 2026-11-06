import type { MetadataRoute } from "next";

// Everything is crawlable, including /api/public/inventory/*: the inventory page draws its
// parts list from those calls, so Google must be allowed to fetch them to see the parts.
//
// /inventory/sitemap-parts.xml lists one page per stocked part number (served by the parts
// system through proxy.ts). It is named only once the inventory is public, the same
// NEXT_PUBLIC_SHOW_INVENTORY_LINK switch as app/sitemap.ts.
const showInventory = process.env.NEXT_PUBLIC_SHOW_INVENTORY_LINK === "1";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: showInventory
      ? ["https://flgtechnics.com/sitemap.xml", "https://flgtechnics.com/inventory/sitemap-parts.xml"]
      : "https://flgtechnics.com/sitemap.xml",
    host: "https://flgtechnics.com",
  };
}
