import "@/app/globals.css";
import AogBar from "./AogBar";
import { fontVariables } from "@/lib/fonts";
import { SITE, postalAddress } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

// Shared <html>/<body> for both languages. app/(en)/layout.tsx and
// app/(es)/layout.tsx are each a root layout, so <html lang> is correct for
// every page without any client-side script.

// Structured data for Google: ties the site to the Business Profile (same name,
// address, phone) and tells Search which logo to show. Name, address and phone
// come from lib/site.ts, the same source Contact.tsx and Footer.tsx read.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo-square.png`,
  image: [`${SITE.url}/logo-square.png`, SITE.ogImage],
  description:
    "FAA Part 145 repair station repairing aircraft flight structures, transparencies, and cargo systems, with in-house engineering, DER repairs, and PMA development.",
  foundingDate: "1998",
  telephone: SITE.phone.schema,
  email: "info@flgtechnics.com",
  address: postalAddress,
  areaServed: "Worldwide",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "AOG support",
      telephone: SITE.aog.schema,
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
  ],
};

const skip = { en: "Skip to content", es: "Saltar al contenido" } as const;

export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-screen bg-ink-950 text-slate-200 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-12 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          {skip[locale]}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AogBar locale={locale} />
        {children}
      </body>
    </html>
  );
}
