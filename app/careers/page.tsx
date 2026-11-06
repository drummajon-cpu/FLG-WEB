import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Careers from "@/components/careers/Careers";

export const metadata: Metadata = {
  title: "Careers — FLG Technics",
  description:
    "Join FLG Technics, an FAA Part 145 repair station in Miramar, FL. Hiring A&P mechanics, inspectors, and experienced aerospace management and quality professionals.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — FLG Technics",
    description:
      "Hiring A&P mechanics, inspectors, and experienced aerospace management and quality professionals in Miramar, FL.",
    url: "https://flgtechnics.com/careers",
    siteName: "FLG Technics",
    images: [{ url: "https://flgtechnics.com/og-image-v3.png", width: 1200, height: 630, alt: "FLG Technics — Careers" }],
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Careers />
      <Footer />
    </main>
  );
}
