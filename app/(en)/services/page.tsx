import type { Metadata } from "next";
import { ServicesIndexView } from "@/components/services/ServiceViews";
import { servicePageCopy } from "@/data/home/core";
import { services } from "@/data/services";
import { localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const t = servicePageCopy.en;
const path = localePath("en", "/services");

export const metadata: Metadata = {
  title: t.indexMetaTitle,
  description: t.indexMetaDescription,
  alternates: {
    canonical: path,
    languages: { en: "/services", es: "/es/services", "x-default": "/services" },
  },
  openGraph: {
    title: t.indexMetaTitle,
    description: t.indexMetaDescription,
    url: `${SITE.url}${path}`,
    siteName: "FLG Technics",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: t.ogAlt }],
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesIndexView locale="en" services={services} />;
}
