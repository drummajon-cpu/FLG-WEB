import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/es", languages: { en: "/", es: "/es", "x-default": "/" } },
};

export default function InicioPage() {
  return <HomePage locale="es" />;
}
