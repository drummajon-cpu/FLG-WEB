import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/services/ServiceViews";
import { getServiceEs, servicesEs } from "@/data/services.es";
import { localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// Every service page is built at deploy time from the data file; an unknown slug is a
// real 404. Add or edit services in data/services.ts (English) and data/services.es.ts
// (Spanish, same slugs), not here.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesEs.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceEs(slug);
  if (!s) return {};
  const path = localePath("es", `/services/${s.slug}`);
  const image = s.images[0]?.src ?? "/og-image-v3.png";
  return {
    title: s.title,
    description: s.description,
    alternates: {
      canonical: path,
      languages: {
        en: `/services/${s.slug}`,
        es: `/es/services/${s.slug}`,
        "x-default": `/services/${s.slug}`,
      },
    },
    openGraph: {
      title: s.title,
      description: s.description,
      url: `${SITE.url}${path}`,
      siteName: "FLG Technics",
      images: [{ url: encodeURI(`${SITE.url}${image}`), alt: s.images[0]?.alt ?? "FLG Technics" }],
      type: "website",
    },
  };
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const s = getServiceEs(slug);
  if (!s) notFound();
  return <ServiceView locale="es" service={s} all={servicesEs} />;
}
