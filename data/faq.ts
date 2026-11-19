// Home page FAQ. Plain strings only (no JSX), so a server page can also emit
// FAQPage JSON-LD from the same source the accordion renders.
import type { Locale } from "@/lib/i18n";

export const homeFaqs: Record<Locale, { q: string; a: string }[]> = {
  en: [
    {
      q: "What regulatory approvals do you hold?",
      a: "FLG Technics is an FAA Part 145 repair station (certificate F72R832X), with EASA (EASA.145.6278) and UK CAA (UK.145.50849) Part‑145 approvals for work on EU‑ and UK‑registered aircraft. Certified welding is performed to AWS D17.1 — the aerospace fusion specification for titanium, stainless, and aluminum. Copies of each certificate can be downloaded from the Certifications section above.",
    },
    {
      q: "Do you handle DER repairs and PMA parts?",
      a: "Yes. Our in‑house engineering team holds FAA Designated Engineering Representative authority — we issue 8110‑3 repair approvals and develop Parts Manufacturer Approval (PMA) replacements end to end, from opportunity analysis through testing and steady‑state production.",
    },
    {
      q: "What aircraft types do you service?",
      a: "Commercial and regional jets including Boeing 737/747/757/767/777, Airbus A320 family, A330, A350, and regional types (CRJ, ERJ, Q400). We specialize in flight structures — ailerons, flaps, spoilers, rudders, leading edges — plus engine inlets, thrust reversers, doors, and cargo systems.",
    },
    {
      q: "How fast is AOG turnaround?",
      a: "Our AOG desk is staffed 24/7 at (754) 544‑1991. Typical AOG response is within the hour on the phone, on‑dock same‑day or next‑day depending on origin, and expedited turn times negotiated per event. Most AOG parts ship within 48–72 hours once received.",
    },
    {
      q: "Can I see the status of my work order?",
      a: "Yes. Every customer gets access to our dedicated portal (desktop + mobile) where you can track work‑order progress in real time — including mechanic clock‑ins, stage completions, teardown photos, inspection findings, and document releases. Direct chat with your account team is built in.",
    },
    {
      q: "Do you offer teardown and storage services?",
      a: "Yes — both — through our Sebring, FL site. We do \"plane‑in‑a‑box\" teardowns: whole aircraft disassembly, units serviced in‑house, and serviceable rotables, LRUs, and structural components returned to the aftermarket ready to go, with full traceability. We also rent hangar storage to other operators and teardown companies that need airside, climate‑controlled space for staged aircraft or inventory.",
    },
    {
      q: "What's your quote turnaround time?",
      a: "Standard RFQs typically receive a written quote the same business day. This is possible because our proprietary systems cross‑reference inventory, capability, and market data the moment an RFQ arrives — we're often sourcing parts before your unit hits our dock.",
    },
    {
      q: "Where are you located? Do you accept international work?",
      a: "Headquartered in Miramar, FL (75,000 sq ft primary facility) with a second site in Sebring, FL for teardown and end‑of‑life. We service operators worldwide under our FAA/EASA/UK CAA approvals — shipping and customs handled.",
    },
  ],
  es: [
    {
      q: "¿Qué aprobaciones regulatorias tienen?",
      a: "FLG Technics es una estación reparadora FAA Part 145 (certificado F72R832X), con aprobaciones Part‑145 de EASA (EASA.145.6278) y UK CAA (UK.145.50849) para trabajos en aeronaves con matrícula de la UE y del Reino Unido. La soldadura certificada se realiza conforme a AWS D17.1, la especificación aeroespacial de soldadura por fusión para titanio, acero inoxidable y aluminio. Puede descargar copias de cada certificado en la sección Certificaciones, más arriba.",
    },
    {
      q: "¿Manejan reparaciones DER y piezas PMA?",
      a: "Sí. Nuestro equipo interno de ingeniería cuenta con autoridad de Designated Engineering Representative (DER) de la FAA: emitimos aprobaciones de reparación 8110‑3 y desarrollamos reemplazos con Parts Manufacturer Approval (PMA) de principio a fin, desde el análisis de oportunidad hasta las pruebas y la producción estable.",
    },
    {
      q: "¿A qué tipos de aeronaves dan servicio?",
      a: "Jets comerciales y regionales, incluidos Boeing 737/747/757/767/777, la familia Airbus A320, A330, A350 y tipos regionales (CRJ, ERJ, Q400). Nos especializamos en estructuras de vuelo (alerones, flaps, spoilers, timones de dirección, bordes de ataque), además de tomas de aire de motor, reversores de empuje, puertas y sistemas de carga.",
    },
    {
      q: "¿Qué tan rápida es la respuesta AOG?",
      a: "Nuestra mesa AOG atiende 24/7 en el (754) 544‑1991. La respuesta AOG típica es por teléfono en menos de una hora, con llegada a nuestro muelle el mismo día o al día siguiente según el origen, y tiempos de entrega acelerados que se negocian por evento. La mayoría de las piezas AOG se envían en un plazo de 48–72 horas una vez recibidas.",
    },
    {
      q: "¿Puedo ver el estado de mi orden de trabajo?",
      a: "Sí. Cada cliente obtiene acceso a nuestro portal dedicado (computadora y móvil), donde puede seguir el avance de la orden de trabajo en tiempo real, incluidos los registros de entrada de los mecánicos, las etapas completadas, las fotos de desmantelamiento, los hallazgos de inspección y la liberación de documentos. El chat directo con su equipo de cuenta está integrado.",
    },
    {
      q: "¿Ofrecen servicios de desmantelamiento y almacenamiento?",
      a: "Sí, ambos, a través de nuestra sede de Sebring, FL. Realizamos desmantelamientos \"plane‑in‑a‑box\": desensamble de la aeronave completa, unidades atendidas internamente, y rotables, LRU y componentes estructurales en condición de servicio devueltos al mercado de posventa listos para usarse, con trazabilidad completa. También alquilamos almacenamiento en hangar a otros operadores y empresas de desmantelamiento que necesitan espacio climatizado en el lado aire para aeronaves en espera o inventario.",
    },
    {
      q: "¿Cuál es su tiempo de respuesta para cotizaciones?",
      a: "Los RFQ estándar normalmente reciben una cotización por escrito el mismo día hábil. Esto es posible porque nuestros sistemas propios cruzan datos de inventario, capacidades y mercado en el momento en que llega un RFQ; con frecuencia ya estamos consiguiendo piezas antes de que su unidad llegue a nuestro muelle.",
    },
    {
      q: "¿Dónde están ubicados? ¿Aceptan trabajo internacional?",
      a: "Nuestra sede principal está en Miramar, FL (instalación principal de 75,000 pies²), con una segunda sede en Sebring, FL para desmantelamiento y fin de vida útil. Atendemos a operadores de todo el mundo bajo nuestras aprobaciones FAA/EASA/UK CAA, con el envío y los trámites aduanales resueltos.",
    },
  ],
};
