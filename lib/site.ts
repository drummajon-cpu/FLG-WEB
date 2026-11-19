// The one place the business name, address and phone numbers are written down.
// Contact.tsx, Footer.tsx, the AOG bar and the JSON-LD in the layouts all read from
// here, so they cannot drift apart. Keep these identical to the Google Business Profile.
export const SITE = {
  url: "https://flgtechnics.com",
  name: "FLG Technics",
  legalName: "FLG Technics, INC",
  phone: { display: "(954) 385‑3900", href: "tel:+19543853900", schema: "+1-954-385-3900" },
  aog: { display: "(754) 544‑1991", href: "tel:+17545441991", schema: "+1-754-544-1991" },
  email: "repairs@flgtechnics.com",
  address: {
    street: "2701 SW 145th Ave, Ste 250",
    city: "Miramar",
    region: "FL",
    postalCode: "33027",
    country: "US",
    cityLine: "Miramar, FL 33027",
  },
  mapsUrl: "https://maps.google.com/?q=2701+SW+145th+Ave+Ste+250+Miramar+FL+33027",
  reviewUrl: "https://g.page/r/CZPLN6_p6BlcEBE/review",
  approvals: { faa: "F72R832X", easa: "EASA.145.6278", ukCaa: "UK.145.50849" },
  ogImage: "https://flgtechnics.com/og-image-v3.png",
} as const;

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
} as const;
