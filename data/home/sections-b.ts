// Home page copy, English + Spanish, for the Recent Work gallery, the shop floor
// section and the in-house engineering section. Components read `xCopy[locale]`.
import type { Locale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Gallery ("Recent Work")                                             */
/* ------------------------------------------------------------------ */

export type GalleryWorkId =
  | "a320-outboard-flap"
  | "767-aileron"
  | "a330-inboard-flap"
  | "767-outboard-flap"
  | "a330-apu-muffler"
  | "rudder"
  | "vertical-leading-edge";

type GalleryItemCopy = {
  /** Small label above the part (aircraft type or airframe zone). */
  aircraft: string;
  component: string;
  material: string;
  /** Describes the photo only: no claims about the state of the job. */
  alt: string;
};

type GalleryCopy = {
  eyebrow: string;
  title: string;
  description: string;
  revLabel: string;
  partNoLabel: string;
  status: string;
  items: Record<GalleryWorkId, GalleryItemCopy>;
};

export const galleryCopy: Record<Locale, GalleryCopy> = {
  en: {
    eyebrow: "Recent Work",
    title: "The finish is the first thing QC checks.",
    // TODO(owner): confirm every item shown here is a completed, released job
    description:
      "A selection of recently completed flight control surfaces, flaps, rudders, and exhaust components — stripped, repaired, inspected, and released from our South Florida facility.",
    revLabel: "REV · A",
    partNoLabel: "PN",
    status: "Stripped · Repaired · Painted · Released",
    items: {
      "a320-outboard-flap": {
        aircraft: "Airbus A320",
        component: "Outboard Flap",
        material: "CFRP · Al honeycomb",
        alt: "Airbus A320 outboard flap with a glossy gray finish, viewed from the end rib along its span",
      },
      "767-aileron": {
        aircraft: "Boeing 767",
        component: "Aileron",
        material: "Al 2024‑T3 · CFRP skin",
        alt: "Boeing 767 aileron with a glossy white finish, viewed from its tapered end",
      },
      "a330-inboard-flap": {
        aircraft: "Airbus A330",
        component: "Inboard Flap",
        material: "CFRP · Al honeycomb",
        alt: "Airbus A330 inboard flap with a gray finish, viewed from the end rib with its fittings visible",
      },
      "767-outboard-flap": {
        aircraft: "Boeing 767",
        component: "Outboard Flap",
        material: "Al 2024 · Nomex core",
        alt: "Boeing 767 outboard flap with a glossy white finish, viewed from the end along its span",
      },
      "a330-apu-muffler": {
        aircraft: "Airbus A330",
        component: "APU Muffler",
        material: "Inconel · Ti flange",
        alt: "Airbus A330 APU muffler wrapped in a metallic insulation blanket, resting on a shop stand",
      },
      rudder: {
        aircraft: "Empennage",
        component: "Rudder",
        material: "CFRP · Ti fittings",
        alt: "Aircraft rudder with a glossy white finish, viewed from its lower end",
      },
      "vertical-leading-edge": {
        aircraft: "Vertical Stabilizer",
        component: "Leading Edge",
        material: "Al 2024‑T3",
        alt: "Vertical stabilizer leading edge panel with a gray finish, standing on a shop stand",
      },
    },
  },
  es: {
    eyebrow: "Trabajos recientes",
    title: "El acabado es lo primero que revisa control de calidad.",
    description:
      "Una selección de superficies de control de vuelo, flaps, timones de dirección y componentes de escape terminados recientemente: decapados, reparados, inspeccionados y liberados desde nuestra instalación en el sur de Florida.",
    revLabel: "REV · A",
    partNoLabel: "PN",
    status: "Decapado · Reparado · Pintado · Liberado",
    items: {
      "a320-outboard-flap": {
        aircraft: "Airbus A320",
        component: "Flap exterior",
        material: "CFRP · panal de Al",
        alt: "Flap exterior de Airbus A320 con acabado gris brillante, visto desde la costilla de extremo a lo largo de su envergadura",
      },
      "767-aileron": {
        aircraft: "Boeing 767",
        component: "Alerón",
        material: "Al 2024‑T3 · revestimiento de CFRP",
        alt: "Alerón de Boeing 767 con acabado blanco brillante, visto desde su extremo más angosto",
      },
      "a330-inboard-flap": {
        aircraft: "Airbus A330",
        component: "Flap interior",
        material: "CFRP · panal de Al",
        alt: "Flap interior de Airbus A330 con acabado gris, visto desde la costilla de extremo con sus herrajes a la vista",
      },
      "767-outboard-flap": {
        aircraft: "Boeing 767",
        component: "Flap exterior",
        material: "Al 2024 · núcleo de Nomex",
        alt: "Flap exterior de Boeing 767 con acabado blanco brillante, visto desde el extremo a lo largo de su envergadura",
      },
      "a330-apu-muffler": {
        aircraft: "Airbus A330",
        component: "Silenciador del APU",
        material: "Inconel · brida de Ti",
        alt: "Silenciador del APU de Airbus A330 envuelto en una manta aislante metálica, apoyado sobre un soporte de taller",
      },
      rudder: {
        aircraft: "Empenaje",
        component: "Timón de dirección",
        material: "CFRP · herrajes de Ti",
        alt: "Timón de dirección de una aeronave con acabado blanco brillante, visto desde su extremo inferior",
      },
      "vertical-leading-edge": {
        aircraft: "Estabilizador vertical",
        component: "Borde de ataque",
        material: "Al 2024‑T3",
        alt: "Panel de borde de ataque de estabilizador vertical con acabado gris, colocado sobre un soporte de taller",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Shop floor ("Inside The Shop")                                      */
/* ------------------------------------------------------------------ */

type ShopCardCopy = {
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
};

type ShopFloorCopy = {
  eyebrow: string;
  title: string;
  description: string;
  facility: {
    alt: string;
    location: string;
    title: string;
    chip: string;
  };
  cnc: ShopCardCopy;
  scanner: ShopCardCopy;
};

export const shopFloorCopy: Record<Locale, ShopFloorCopy> = {
  en: {
    eyebrow: "Inside The Shop",
    title: "75,000 sq ft of structure work, all under one roof.",
    description:
      "Our Miramar, FL facility is purpose‑built for flight‑control surfaces, flaps, and engine inlets — backed by in‑house 3D scanning and a multi‑axis CNC machine shop for rapid tooling and PMA production.",
    facility: {
      alt: "FLG Technics facility — overhead view of the shop floor",
      location: "Miramar, FL · HQ",
      title: "Our floor.",
      chip: "75,000 sq ft · FAA 145",
    },
    cnc: {
      alt: "CNC machining center",
      eyebrow: "CNC Machine Shop",
      title: "Multi‑axis CNC",
      body: "3, 4, and 5‑axis machining in titanium, stainless, and aluminum — prototype to production, all inspected and traceable.",
    },
    scanner: {
      alt: "Structured‑light 3D scanner on an aircraft control surface",
      eyebrow: "3D Scanning",
      title: "Sub‑millimeter damage mapping",
      body: "Structured‑light capture maps surface damage, wear, and deformation to sub‑millimeter precision — inspection findings become real measurements, not estimates. Same workflow drives reverse engineering of obsolete parts into PMA‑ready CAD.",
    },
  },
  es: {
    eyebrow: "Dentro del taller",
    title: "75,000 pies² de trabajo estructural, todo bajo un mismo techo.",
    description:
      "Nuestra instalación en Miramar, FL está diseñada específicamente para superficies de control de vuelo, flaps y tomas de aire del motor, con el respaldo de escaneo 3D propio y un taller de mecanizado CNC multieje para herramental rápido y producción PMA.",
    facility: {
      alt: "Instalación de FLG Technics: vista cenital del piso del taller",
      location: "Miramar, FL · Sede",
      title: "Nuestro taller.",
      chip: "75,000 pies² · FAA 145",
    },
    cnc: {
      alt: "Centro de mecanizado CNC",
      eyebrow: "Taller de mecanizado CNC",
      title: "CNC multieje",
      body: "Mecanizado de 3, 4 y 5 ejes en titanio, acero inoxidable y aluminio, del prototipo a la producción, todo inspeccionado y trazable.",
    },
    scanner: {
      alt: "Escáner 3D de luz estructurada sobre una superficie de control de una aeronave",
      eyebrow: "Escaneo 3D",
      title: "Mapeo de daños submilimétrico",
      body: "La captura con luz estructurada mapea daños superficiales, desgaste y deformación con precisión submilimétrica: los hallazgos de inspección se convierten en mediciones reales, no en estimaciones. El mismo flujo de trabajo impulsa la ingeniería inversa de piezas obsoletas para obtener CAD listo para PMA.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* In-house engineering ("Engineering Authority")                      */
/* ------------------------------------------------------------------ */

export type InHousePillarId = "der" | "pma" | "welding";

type InHousePillarCopy = {
  title: string;
  tag: string;
  description: string;
  bullets: string[];
};

type InHouseCopy = {
  eyebrow: string;
  title: string;
  description: string;
  pillars: Record<InHousePillarId, InHousePillarCopy>;
  callout: {
    eyebrow: string;
    title: string;
    cta: string;
  };
};

export const inHouseCopy: Record<Locale, InHouseCopy> = {
  en: {
    eyebrow: "Engineering Authority",
    title: "Design it, approve it, build it — without ever shipping it out.",
    description:
      "Most MROs ship engineering out. We don't. From DER‑signed repair approvals to PMA development to aerospace‑certified welding, every decision lives inside our walls.",
    pillars: {
      der: {
        title: "In‑House Engineering & DER",
        tag: "FAA DER authority",
        description:
          "Design, stress, and structural engineering under one roof — with FAA Designated Engineering Representative authority for repair approvals. We take repairs from concept through DER‑signed 8110‑3 release, no outsourcing, no delays.",
        bullets: ["DER repair approvals (8110‑3)", "Structural & stress analysis", "Airbus engineering support"],
      },
      pma: {
        title: "PMA Development",
        tag: "FAA approved parts",
        description:
          "End‑to‑end Parts Manufacturer Approval — from identifying the opportunity through FAA submission, testing, and steady‑state production. Often paired with reverse engineering and in‑house machining to close the loop.",
        bullets: ["Opportunity analysis", "FAA submission & testing", "Qualified alternate sources"],
      },
      welding: {
        title: "AWS D17.1 Welding",
        tag: "Aerospace certified",
        description:
          "Certified welding of titanium, stainless, and aluminum under AWS D17.1 — the aerospace fusion welding specification. Manual TIG, procedure‑controlled, and NDT‑verified. Used anywhere structural heat joins are required.",
        bullets: ["Titanium · Stainless · Aluminum", "Certified welders & procedures", "NDT‑verified results"],
      },
    },
    callout: {
      eyebrow: "Have an unusual problem?",
      title: "Send us the part. We'll tell you what's possible.",
      cta: "Start a conversation",
    },
  },
  es: {
    eyebrow: "Autoridad de ingeniería",
    title: "Diseñarlo, aprobarlo, fabricarlo: sin enviarlo nunca fuera.",
    description:
      "La mayoría de los MRO envían la ingeniería fuera. Nosotros no. Desde aprobaciones de reparación firmadas por DER hasta el desarrollo de PMA y la soldadura con certificación aeroespacial, cada decisión se toma dentro de nuestras paredes.",
    pillars: {
      der: {
        title: "Ingeniería interna y DER",
        tag: "Autoridad DER de la FAA",
        description:
          "Diseño, análisis de esfuerzos e ingeniería estructural bajo un mismo techo, con autoridad de Designated Engineering Representative (DER) de la FAA para aprobaciones de reparación. Llevamos las reparaciones desde el concepto hasta la liberación 8110‑3 firmada por DER, sin subcontratar y sin demoras.",
        bullets: ["Aprobaciones de reparación DER (8110‑3)", "Análisis estructural y de esfuerzos", "Soporte de ingeniería Airbus"],
      },
      pma: {
        title: "Desarrollo de PMA",
        tag: "Piezas aprobadas por la FAA",
        description:
          "Parts Manufacturer Approval (PMA) de principio a fin: desde identificar la oportunidad hasta la presentación ante la FAA, las pruebas y la producción estable. A menudo se combina con ingeniería inversa y mecanizado interno para cerrar el ciclo.",
        bullets: ["Análisis de oportunidades", "Presentación ante la FAA y pruebas", "Fuentes alternas calificadas"],
      },
      welding: {
        title: "Soldadura AWS D17.1",
        tag: "Certificación aeroespacial",
        description:
          "Soldadura certificada de titanio, acero inoxidable y aluminio conforme a AWS D17.1, la especificación de soldadura por fusión aeroespacial. TIG manual, controlada por procedimiento y verificada por NDT. Se usa donde se requieran uniones estructurales por calor.",
        bullets: ["Titanio · Acero inoxidable · Aluminio", "Soldadores y procedimientos certificados", "Resultados verificados por NDT"],
      },
    },
    callout: {
      eyebrow: "¿Tiene un problema fuera de lo común?",
      title: "Envíenos la pieza. Le diremos qué es posible.",
      cta: "Inicie una conversación",
    },
  },
};
