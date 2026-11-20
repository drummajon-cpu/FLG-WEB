import type { Metadata } from "next";
import { ServicesIndexView } from "@/components/services/ServiceViews";
import { servicePageCopy } from "@/data/home/core";
import { servicesEs } from "@/data/services.es";
import { localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const t = servicePageCopy.es;
const path = localePath("es", "/services");

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

export default function ServiciosPage() {
  return <ServicesIndexView locale="es" services={servicesEs} />;
}
