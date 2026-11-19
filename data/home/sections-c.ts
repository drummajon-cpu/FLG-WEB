// Home page copy, part C: Systems (customer portal), About, FAQ header and the
// "Excellence" globe. English at the root, Spanish under /es. The FAQ questions and
// answers live in data/faq.ts so a server page can emit FAQPage JSON-LD from them.
import type { Locale } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Systems
// ---------------------------------------------------------------------------

/** Icon shown on a mock activity row; mapped to a lucide icon in Systems.tsx. */
export type PortalEventIcon = "check" | "sign" | "step" | "inspect" | "photo" | "doc" | "clock";

export type PortalEvent = { icon: PortalEventIcon; label: string; time: string };

export type PortalOrder = {
  id: string;
  part: string;
  pn: string;
  stage: string;
  pct: number;
  headline: string;
  live: string;
  events: PortalEvent[];
  initials: string;
  chat: string;
  /** Notification that slides in partway through this order's turn. */
  toast: string;
};

type SystemsCopy = {
  header: { eyebrow: string; title: string; description: string };
  /** Four feature cards; icons are assigned by position in Systems.tsx. */
  features: { title: string; body: string }[];
  portal: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    exampleEyebrow: string;
    exampleBody: string;
    /** Six rows; icons are assigned by position in Systems.tsx. */
    list: string[];
    cta: string;
  };
  tagline: string;
  taglineMeta: string;
  mock: {
    ariaLabel: string;
    caption: string;
    activeOrders: string;
    live: string;
    chatHeading: string;
    syncing: string;
    typing: string;
    pnLabel: string;
    /** Illustrative work orders. None of these is live or completed customer data. */
    orders: PortalOrder[];
  };
};

export const systemsCopy: Record<Locale, SystemsCopy> = {
  en: {
    header: {
      eyebrow: "Full Visibility",
      title: "Always know exactly where your parts are.",
      description:
        "Every unit you send us is tracked in real time — stage by stage, sign‑off by sign‑off — on a portal that's yours. The same in‑house systems that run our floor give you live status, every document, and a direct line to your account team. No more chasing status by email.",
    },
    features: [
      {
        title: "Live work‑order visibility",
        body: "Every part, every stage, every sign‑off — visible in real time. When a mechanic clocks in, you see it running. You don't wait for a status email. Neither do we.",
      },
      {
        title: "Proactive parts sourcing",
        body: "Our logic cross‑references the market the moment an RFQ arrives — so we're already sourcing the right parts before your unit hits our floor. Faster quotes, shorter TATs.",
      },
      {
        title: "Stage‑locked compliance",
        body: "Work can't advance until the previous step is signed off. The audit trail writes itself because the workflow requires it — not because someone remembers to.",
      },
      {
        title: "Traceability, integrated",
        body: "Lot tracking, material certs, DER 8110‑3s, and process records link to the work order from receiving to release. No side spreadsheets. No reconciliation calls.",
      },
    ],
    portal: {
      badge: "Customer Portal",
      titleLine1: "Your orders,",
      titleLine2: "in your pocket.",
      body: "A portal that's yours — on desktop and mobile — with every one of your orders, documents, photos, and conversations in one place. Track each unit stage by stage, watch the welder clock in on the part you shipped last Tuesday, and pull any document the moment it's signed. Full visibility, start to finish.",
      // Owner rule: the A330 muffler bracket job is still in progress. Do not present
      // it as completed, live or dated.
      exampleEyebrow: "Example work order",
      exampleBody:
        "A330 muffler bracket: OEM obsolete. Reverse‑engineering from a 3D scan, DER repair approval and AWS D17.1 welding, all in‑house and all visible as it happens.",
      list: [
        "Live work‑order tracking, mechanic‑level activity",
        "All docs, 8130‑3s, invoices in one place",
        "Teardown photos & inspection findings as they happen",
        "Direct chat with your account team",
        "Capability lookup by part number",
        "Fully responsive — desktop and native‑feel mobile",
      ],
      cta: "Contact our team to request access to your customer portal",
    },
    tagline: "The same team that repairs your components built the systems that track them.",
    taglineMeta: "Real‑time · Documented · Yours to see",
    mock: {
      ariaLabel: "Illustrative example of the FLG customer portal showing work orders in progress",
      caption: "Illustrative example. Not live customer data.",
      activeOrders: "Active orders",
      live: "Live",
      chatHeading: "Chat · Account team",
      syncing: "syncing",
      typing: "Typing",
      pnLabel: "PN",
      orders: [
        {
          id: "WO‑260834",
          part: "A330 Muffler Bracket",
          pn: "H2614‑9210",
          stage: "Welding",
          pct: 72,
          headline: "Welding — pass 3 of 4 in progress",
          live: "Welder M.O. clocked in (AWS D17.1)",
          events: [
            { icon: "check", label: "Weld pass 2/4 complete · visual PASS", time: "18m ago" },
            { icon: "sign", label: "DER 8110‑3 signed — repair approved", time: "1h ago" },
            { icon: "step", label: "CNC fixture machined from scan CAD", time: "3h ago" },
          ],
          initials: "J.R.",
          chat: "OEM bracket is discontinued — we reverse‑engineered from the scan, DER approved the 8110‑3 this morning, welding pass 3 starting now.",
          toast: "DER 8110‑3 uploaded to WO‑260834",
        },
        {
          id: "WO‑260912",
          part: "A320 Outboard Flap",
          pn: "D572‑25300",
          stage: "Composite repair",
          pct: 46,
          headline: "Core replaced — cure cycle running",
          live: "Tech R.D. clocked in (composite repair)",
          events: [
            { icon: "check", label: "Damaged honeycomb core removed", time: "2h ago" },
            { icon: "inspect", label: "Damage mapped · tap test & NDT", time: "Yesterday" },
            { icon: "photo", label: "14 teardown photos posted", time: "Yesterday" },
          ],
          initials: "A.M.",
          chat: "Damage is inside SRM limits, so no DER needed. Core is curing tonight; paint is booked for Monday.",
          toast: "14 new teardown photos on WO‑260912",
        },
        {
          id: "WO‑260755",
          part: "767 Aileron",
          pn: "113A1000‑6",
          stage: "Paint",
          pct: 65,
          headline: "Topcoat applied — curing",
          live: "Painter L.S. clocked in (topcoat)",
          events: [
            { icon: "check", label: "Primer inspection · PASS", time: "4h ago" },
            { icon: "check", label: "Skin repair signed off by inspector", time: "Yesterday" },
            { icon: "step", label: "Surface stripped to bare metal", time: "2d ago" },
          ],
          initials: "J.R.",
          chat: "Topcoat is on. Balance check after cure, release paperwork Friday.",
          toast: "Primer inspection passed on WO‑260755",
        },
        {
          id: "WO‑260891",
          part: "Rudder",
          pn: "A55‑1300‑01",
          stage: "Final inspection",
          pct: 92,
          headline: "Final inspection — 8130‑3 in preparation",
          live: "Inspector K.P. reviewing work package",
          events: [
            { icon: "check", label: "Balance check · within limits", time: "1h ago" },
            { icon: "check", label: "Final paint inspection · PASS", time: "5h ago" },
            { icon: "doc", label: "Material certs linked to WO", time: "Yesterday" },
          ],
          initials: "A.M.",
          chat: "Final inspection today. You'll see the 8130‑3 here the moment it's signed — ships tomorrow.",
          toast: "8130‑3 ready for review on WO‑260891",
        },
        {
          id: "WO‑260947",
          part: "Vertical Leading Edge",
          pn: "118‑31200",
          stage: "Receiving",
          pct: 8,
          headline: "Unit received — incoming inspection",
          live: "Receiving logged unit + paperwork",
          events: [
            { icon: "photo", label: "Arrival photos posted (6)", time: "12m ago" },
            { icon: "sign", label: "Quote approved by customer", time: "Yesterday" },
            { icon: "clock", label: "Same‑day written quote sent", time: "2d ago" },
          ],
          initials: "J.R.",
          chat: "It's on our dock. Teardown starts this afternoon; photos will post here as we go.",
          toast: "WO‑260947 received at our dock",
        },
      ],
    },
  },
  es: {
    header: {
      eyebrow: "Visibilidad total",
      title: "Sepa siempre exactamente dónde están sus piezas.",
      description:
        "Cada unidad que nos envía se rastrea en tiempo real, etapa por etapa y firma por firma, en un portal que es suyo. Los mismos sistemas internos que operan nuestro taller le dan el estado en vivo, cada documento y una línea directa con su equipo de cuenta. Se acabó perseguir el estado por correo electrónico.",
    },
    features: [
      {
        title: "Visibilidad en vivo de la orden de trabajo",
        body: "Cada pieza, cada etapa, cada firma, visible en tiempo real. Cuando un mecánico registra su entrada, usted lo ve en marcha. Usted no espera un correo con el estado. Nosotros tampoco.",
      },
      {
        title: "Abastecimiento proactivo de piezas",
        body: "Nuestra lógica cruza referencias con el mercado en el momento en que llega un RFQ, de modo que ya estamos consiguiendo las piezas correctas antes de que su unidad llegue a nuestro taller. Cotizaciones más rápidas, TAT más cortos.",
      },
      {
        title: "Cumplimiento bloqueado por etapas",
        body: "El trabajo no puede avanzar hasta que el paso anterior esté firmado. El registro de auditoría se escribe solo porque el flujo de trabajo lo exige, no porque alguien se acuerde de hacerlo.",
      },
      {
        title: "Trazabilidad integrada",
        body: "El seguimiento de lotes, los certificados de material, los 8110‑3 de DER y los registros de proceso se vinculan a la orden de trabajo desde la recepción hasta la liberación. Sin hojas de cálculo paralelas. Sin llamadas de conciliación.",
      },
    ],
    portal: {
      badge: "Portal de clientes",
      titleLine1: "Sus órdenes,",
      titleLine2: "en su bolsillo.",
      body: "Un portal que es suyo, en computadora y en móvil, con todas sus órdenes, documentos, fotos y conversaciones en un solo lugar. Siga cada unidad etapa por etapa, vea al soldador registrar su entrada en la pieza que usted envió el martes pasado y descargue cualquier documento en el momento en que se firma. Visibilidad total, de principio a fin.",
      exampleEyebrow: "Orden de trabajo de ejemplo",
      exampleBody:
        "Soporte de silenciador de A330: pieza OEM obsoleta. Ingeniería inversa a partir de un escaneo 3D, aprobación de reparación DER y soldadura AWS D17.1, todo internamente y todo visible a medida que sucede.",
      list: [
        "Seguimiento en vivo de órdenes de trabajo, con actividad a nivel de mecánico",
        "Todos los documentos, 8130‑3 y facturas en un solo lugar",
        "Fotos de desmantelamiento y hallazgos de inspección a medida que ocurren",
        "Chat directo con su equipo de cuenta",
        "Consulta de capacidades por número de parte",
        "Totalmente adaptable: computadora y móvil con sensación de app nativa",
      ],
      cta: "Contacte a nuestro equipo para solicitar acceso a su portal de clientes",
    },
    tagline: "El mismo equipo que repara sus componentes construyó los sistemas que les dan seguimiento.",
    taglineMeta: "En tiempo real · Documentado · A su vista",
    mock: {
      ariaLabel: "Ejemplo ilustrativo del portal de clientes de FLG que muestra órdenes de trabajo en proceso",
      caption: "Ejemplo ilustrativo. No son datos en vivo de clientes.",
      activeOrders: "Órdenes activas",
      live: "En vivo",
      chatHeading: "Chat · Equipo de cuenta",
      syncing: "sincronizando",
      typing: "Escribiendo",
      pnLabel: "PN",
      orders: [
        {
          id: "WO‑260834",
          part: "Soporte de silenciador A330",
          pn: "H2614‑9210",
          stage: "Soldadura",
          pct: 72,
          headline: "Soldadura: pasada 3 de 4 en curso",
          live: "Soldador M.O. registró entrada (AWS D17.1)",
          events: [
            { icon: "check", label: "Pasada de soldadura 2/4 completa · visual APROBADA", time: "hace 18 min" },
            { icon: "sign", label: "DER 8110‑3 firmado: reparación aprobada", time: "hace 1 h" },
            { icon: "step", label: "Utillaje CNC maquinado a partir del CAD del escaneo", time: "hace 3 h" },
          ],
          initials: "J.R.",
          chat: "El soporte OEM está descontinuado: hicimos ingeniería inversa a partir del escaneo, el DER aprobó el 8110‑3 esta mañana y la pasada 3 de soldadura está comenzando ahora.",
          toast: "DER 8110‑3 cargado en WO‑260834",
        },
        {
          id: "WO‑260912",
          part: "Flap exterior A320",
          pn: "D572‑25300",
          stage: "Reparación de compuestos",
          pct: 46,
          headline: "Núcleo reemplazado: ciclo de curado en marcha",
          live: "Técnico R.D. registró entrada (reparación de compuestos)",
          events: [
            { icon: "check", label: "Núcleo de panal dañado retirado", time: "hace 2 h" },
            { icon: "inspect", label: "Daño mapeado · prueba de percusión y NDT", time: "Ayer" },
            { icon: "photo", label: "14 fotos de desmantelamiento publicadas", time: "Ayer" },
          ],
          initials: "A.M.",
          chat: "El daño está dentro de los límites del SRM, así que no se necesita DER. El núcleo cura esta noche; la pintura está programada para el lunes.",
          toast: "14 fotos nuevas de desmantelamiento en WO‑260912",
        },
        {
          id: "WO‑260755",
          part: "Alerón 767",
          pn: "113A1000‑6",
          stage: "Pintura",
          pct: 65,
          headline: "Capa final aplicada: en curado",
          live: "Pintor L.S. registró entrada (capa final)",
          events: [
            { icon: "check", label: "Inspección de primario · APROBADA", time: "hace 4 h" },
            { icon: "check", label: "Reparación de revestimiento firmada por el inspector", time: "Ayer" },
            { icon: "step", label: "Superficie decapada hasta metal desnudo", time: "hace 2 d" },
          ],
          initials: "J.R.",
          chat: "La capa final ya está aplicada. Verificación de balance después del curado, documentación de liberación el viernes.",
          toast: "Inspección de primario aprobada en WO‑260755",
        },
        {
          id: "WO‑260891",
          part: "Timón de dirección",
          pn: "A55‑1300‑01",
          stage: "Inspección final",
          pct: 92,
          headline: "Inspección final: 8130‑3 en preparación",
          live: "Inspector K.P. revisando el paquete de trabajo",
          events: [
            { icon: "check", label: "Verificación de balance · dentro de límites", time: "hace 1 h" },
            { icon: "check", label: "Inspección final de pintura · APROBADA", time: "hace 5 h" },
            { icon: "doc", label: "Certificados de material vinculados a la WO", time: "Ayer" },
          ],
          initials: "A.M.",
          chat: "Inspección final hoy. Verá el 8130‑3 aquí en el momento en que se firme; se envía mañana.",
          toast: "8130‑3 listo para revisión en WO‑260891",
        },
        {
          id: "WO‑260947",
          part: "Borde de ataque vertical",
          pn: "118‑31200",
          stage: "Recepción",
          pct: 8,
          headline: "Unidad recibida: inspección de entrada",
          live: "Recepción registró la unidad y la documentación",
          events: [
            { icon: "photo", label: "Fotos de llegada publicadas (6)", time: "hace 12 min" },
            { icon: "sign", label: "Cotización aprobada por el cliente", time: "Ayer" },
            { icon: "clock", label: "Cotización escrita enviada el mismo día", time: "hace 2 d" },
          ],
          initials: "J.R.",
          chat: "Ya está en nuestro muelle. El desmantelamiento comienza esta tarde; las fotos se publicarán aquí a medida que avancemos.",
          toast: "WO‑260947 recibida en nuestro muelle",
        },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

type AboutCopy = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  /** Four pillars; icons are assigned by position in About.tsx. */
  pillars: { label: string; value: string }[];
  map: {
    alt: string;
    sites: string;
    sebring: { title: string; body: string };
    miramar: { title: string; body: string; meta: string };
    distance: string;
    route: string;
  };
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    eyebrow: "About FLG Technics",
    // TODO(owner): goes stale in 2027
    title: "Twenty‑eight years building trust, one repair at a time.",
    paragraphs: [
      // TODO(owner): goes stale in 2027 ("Twenty‑eight years on")
      "FLG Technics started in 1998 with a narrow focus: repairing crew seats better than anyone else. Twenty‑eight years on, the focus has grown. We are an FAA Part 145 repair station specializing in flight structures, transparency, and cargo systems — serving commercial and regional operators worldwide.",
      "What separates us isn't scale — it's the breadth of what we do ourselves. Engineering, 3D scanning, CNC machining, PMA development, and certified welding all live under one roof in South Florida. That means faster turnarounds, cleaner traceability, and real answers when something unusual comes across our dock.",
      "Our Sebring, FL site closes the loop for end‑of‑life fleets — \"plane‑in‑a‑box\" teardowns where we remove and service the components, returning traceable parts to the aftermarket ready to go. We also rent hangar storage to operators and teardown companies that need climate‑controlled, airside space.",
      "We treat communication as the product as much as the repair. You'll always know where your parts are, what we found, and when they ship.",
    ],
    pillars: [
      { label: "Established", value: "1998" },
      { label: "Headquarters", value: "Miramar, FL" },
      { label: "Facility", value: "75,000 sq ft" },
      { label: "Second site", value: "Sebring, FL — Teardown" },
    ],
    map: {
      alt: "Florida — FLG Technics facilities",
      sites: "Florida · 2 sites",
      sebring: { title: "SEBRING · FL", body: "Teardown · End-of-life" },
      miramar: { title: "MIRAMAR · HQ", body: "Part 145 · MRO", meta: "75,000 sq ft" },
      // TODO(owner): verify route label (I‑27 is not an interstate; US‑27?) and the 149 mi · 2h 31m figure
      distance: "149 mi · 2h 31m",
      route: "I‑27 · I‑595 · I‑95",
    },
  },
  es: {
    eyebrow: "Acerca de FLG Technics",
    // TODO(owner): goes stale in 2027
    title: "Veintiocho años construyendo confianza, una reparación a la vez.",
    paragraphs: [
      // TODO(owner): goes stale in 2027 ("Veintiocho años después")
      "FLG Technics comenzó en 1998 con un enfoque muy concreto: reparar asientos de tripulación mejor que nadie. Veintiocho años después, el enfoque ha crecido. Somos una estación reparadora FAA Part 145 especializada en estructuras de vuelo, transparencias y sistemas de carga, al servicio de operadores comerciales y regionales en todo el mundo.",
      "Lo que nos distingue no es el tamaño, sino la amplitud de lo que hacemos nosotros mismos. Ingeniería, escaneo 3D, maquinado CNC, desarrollo de PMA y soldadura certificada conviven bajo un mismo techo en el sur de Florida. Eso significa tiempos de entrega más rápidos, una trazabilidad más limpia y respuestas reales cuando algo inusual llega a nuestro muelle.",
      "Nuestra sede de Sebring, FL cierra el ciclo para las flotas al final de su vida útil: desmantelamientos \"plane‑in‑a‑box\" en los que retiramos y damos servicio a los componentes, y devolvemos piezas trazables al mercado de posventa listas para usarse. También alquilamos almacenamiento en hangar a operadores y empresas de desmantelamiento que necesitan espacio climatizado en el lado aire.",
      "Tratamos la comunicación como parte del producto, tanto como la reparación. Usted siempre sabrá dónde están sus piezas, qué encontramos y cuándo se envían.",
    ],
    pillars: [
      { label: "Fundación", value: "1998" },
      { label: "Sede principal", value: "Miramar, FL" },
      { label: "Instalación", value: "75,000 pies²" },
      { label: "Segunda sede", value: "Sebring, FL: desmantelamiento" },
    ],
    map: {
      alt: "Florida: instalaciones de FLG Technics",
      sites: "Florida · 2 sedes",
      sebring: { title: "SEBRING · FL", body: "Desmantelamiento · Fin de vida útil" },
      miramar: { title: "MIRAMAR · SEDE", body: "Part 145 · MRO", meta: "75,000 pies²" },
      // TODO(owner): verify route label (I‑27 is not an interstate; US‑27?) and the 149 mi · 2h 31m figure
      distance: "149 mi · 2 h 31 min",
      route: "I‑27 · I‑595 · I‑95",
    },
  },
};

// ---------------------------------------------------------------------------
// FAQ (section header only; questions and answers are in data/faq.ts)
// ---------------------------------------------------------------------------

export const faqCopy: Record<Locale, { eyebrow: string; title: string; description: string }> = {
  en: {
    eyebrow: "FAQ",
    title: "Things procurement teams ask before the first call.",
    description:
      "Short answers to the questions that come up most often. For anything not covered, reach out to repairs@flgtechnics.com or call the AOG line.",
  },
  es: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que los equipos de compras preguntan antes de la primera llamada.",
    description:
      "Respuestas breves a las preguntas que surgen con más frecuencia. Para cualquier tema no cubierto, escriba a repairs@flgtechnics.com o llame a la línea AOG.",
  },
};

// ---------------------------------------------------------------------------
// Excellence globe
// ---------------------------------------------------------------------------

type GlobeCopy = {
  logoAlt: string;
  /** The heading is "<accent>titleAccent</accent>titleRest". */
  titleAccent: string;
  titleRest: string;
  subtitle: string;
  /**
   * The thirteen capabilities, transcribed from the artwork (icons are assigned by
   * position in ExcellenceGlobe.tsx). The English list has to stay in step with the
   * graphic: if the artwork is re-rendered with different wording, update it too.
   */
  capabilities: { title: string; body: string }[];
};

export const globeCopy: Record<Locale, GlobeCopy> = {
  en: {
    logoAlt: "FLG Technics — One MRO",
    titleAccent: "Excellence",
    titleRest: " in everything we do",
    subtitle: "Global expertise. Proven processes. Uncompromising quality.",
    capabilities: [
      {
        title: "Precision in every repair",
        body: "Exacting standards and meticulous attention to every detail.",
      },
      {
        title: "Where reliability takes off",
        body: "Proven processes that keep your operation moving forward.",
      },
      {
        title: "Excellence engineered",
        body: "Built-in quality from the first inspection to final release.",
      },
      {
        title: "Confidence in every flight",
        body: "Reliable repairs that meet or exceed OEM standards.",
      },
      {
        title: "Mastery in composites",
        body: "Advanced composite repairs with confidence.",
      },
      {
        title: "Flight ready solutions",
        body: "Delivering parts that are ready when you are.",
      },
      {
        title: "Your trusted MRO partner",
        body: "A partner you can count on, every step of the way.",
      },
      {
        title: "Advanced MRO expertise",
        body: "Decades of experience across a wide range of components.",
      },
      {
        title: "Flight critical expertise",
        body: "Trusted expertise for your most critical components.",
      },
      {
        title: "Excellence in structures",
        body: "Structural repairs you can depend on.",
      },
      {
        title: "Safety delivered",
        body: "Safety is designed into everything we do.",
      },
      {
        title: "The MRO that protects every flight",
        body: "We protect your aircraft and your reputation.",
      },
      {
        title: "Composite & structural precision",
        body: "Combining advanced materials knowledge with structural precision.",
      },
    ],
  },
  es: {
    logoAlt: "FLG Technics: One MRO",
    titleAccent: "Excelencia",
    titleRest: " en todo lo que hacemos",
    subtitle: "Experiencia global. Procesos probados. Calidad sin concesiones.",
    capabilities: [
      {
        title: "Precisión en cada reparación",
        body: "Estándares exigentes y atención meticulosa a cada detalle.",
      },
      {
        title: "Donde despega la confiabilidad",
        body: "Procesos probados que mantienen su operación en movimiento.",
      },
      {
        title: "Excelencia por diseño",
        body: "Calidad incorporada desde la primera inspección hasta la liberación final.",
      },
      {
        title: "Confianza en cada vuelo",
        body: "Reparaciones confiables que cumplen o superan los estándares del OEM.",
      },
      {
        title: "Dominio en compuestos",
        body: "Reparaciones avanzadas de compuestos, con confianza.",
      },
      {
        title: "Soluciones listas para volar",
        body: "Entregamos piezas que están listas cuando usted lo está.",
      },
      {
        title: "Su socio MRO de confianza",
        body: "Un socio con el que puede contar, en cada paso del camino.",
      },
      {
        title: "Experiencia avanzada en MRO",
        body: "Décadas de experiencia en una amplia gama de componentes.",
      },
      {
        title: "Experiencia en componentes críticos para el vuelo",
        body: "Experiencia de confianza para sus componentes más críticos.",
      },
      {
        title: "Excelencia en estructuras",
        body: "Reparaciones estructurales en las que puede confiar.",
      },
      {
        title: "Seguridad entregada",
        body: "La seguridad está diseñada en todo lo que hacemos.",
      },
      {
        title: "El MRO que protege cada vuelo",
        body: "Protegemos su aeronave y su reputación.",
      },
      {
        title: "Precisión en compuestos y estructuras",
        body: "Combinamos el conocimiento de materiales avanzados con la precisión estructural.",
      },
    ],
  },
};
