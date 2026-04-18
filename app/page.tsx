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
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <TrustedBy />
      <Capabilities />
      <Gallery />
      <ShopFloor />
      <InHouse />
      <Systems />
      <Certifications />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
