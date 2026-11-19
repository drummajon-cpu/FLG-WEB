import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Capabilities from "@/components/Capabilities";
import Gallery from "@/components/Gallery";
import ShopFloor from "@/components/ShopFloor";
import InHouse from "@/components/InHouse";
import Systems from "@/components/Systems";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import ExcellenceGlobe from "@/components/ExcellenceGlobe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { homeFaqs } from "@/data/faq";
import { localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// The home page in either language: app/(en)/page.tsx and app/(es)/es/page.tsx both
// render this. Every section takes `locale` and reads its copy from data/home/*.
export default function HomePage({ locale }: { locale: Locale }) {
  const url = `${SITE.url}${localePath(locale, "/")}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: locale,
    mainEntity: homeFaqs[locale].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <MotionProvider>
      <main id="main" className="relative overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <Nav locale={locale} />
        <Hero locale={locale} />
        <TrustedBy locale={locale} />
        <Certifications locale={locale} />
        <Capabilities locale={locale} />
        <Gallery locale={locale} />
        <ShopFloor locale={locale} />
        <InHouse locale={locale} />
        <Systems locale={locale} />
        <About locale={locale} />
        <FAQ locale={locale} />
        <ExcellenceGlobe locale={locale} />
        <Contact locale={locale} />
        <Footer locale={locale} />
      </main>
    </MotionProvider>
  );
}
