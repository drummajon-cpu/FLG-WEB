// Copy for the home page sections Certifications, TrustedBy and Capabilities.
// English is the source text; Spanish is a faithful translation (neutral Latin
// American Spanish, "usted" register). Technical terms and aircraft model names
// stay untranslated. "‑" is the non-breaking hyphen used in the English copy.

// ── Certifications ─────────────────────────────────────────────────────────

const certificationsEn = {
  eyebrow: "Accreditation",
  title: "Approved by the authorities you fly under.",
  description:
    "Every repair, every PMA, every weld — documented, traceable, and released under accredited approvals. View the FAA, EASA and UK CAA certificates below.",
  certs: {
    faa: {
      name: "FAA Part 145",
      detail: "Repair Station",
      scope:
        "Federal Aviation Administration approved for airframe, accessory, and specialized service ratings.",
      authority: "Federal Aviation Administration",
    },
    easa: {
      name: "EASA",
      detail: "Part 145 Approval",
      scope:
        "European Union Aviation Safety Agency — foreign repair station authorization for EU operators.",
      authority: "European Union Aviation Safety Agency",
    },
    ukcaa: {
      name: "UK CAA",
      detail: "Part 145 Approval",
      scope:
        "United Kingdom Civil Aviation Authority — post‑Brexit approval for UK‑registered aircraft.",
      authority: "UK Civil Aviation Authority",
    },
    aws: {
      name: "AWS D17.1",
      detail: "Aerospace Fusion Welding",
      scope:
        "Certified welders & procedures for titanium, stainless, and aluminum per the aerospace welding specification.",
      authority: "",
    },
  },
  qmsTitle: "Quality Management System",
  qmsBody:
    "Written procedures, calibrated tooling, and full traceability on every work order.",
  qmsStrip: "Documented · Audited · Released",
  viewCertificateAria: (name: string) => `View ${name} certificate`,
  viewCertificate: "View certificate",
  onRequest: "Certificate on request",
  modal: {
    title: (name: string) => `${name} Certificate`,
    close: "Close",
    viewerTitle: (name: string) => `${name} certificate`,
    downloadStarted: "Download started.",
    verified: "You're verified — download anytime.",
    downloadPdf: "Download PDF",
    gateNote:
      "Enter your email to download. We only ask to keep these controlled documents away from bots and unauthorized scrapers — you won't be subscribed to anything, and we won't share it.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    verifying: "Verifying",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Network error. Please try again.",
  },
};

const certificationsEs: typeof certificationsEn = {
  eyebrow: "Acreditación",
  title: "Aprobados por las autoridades bajo las que usted opera.",
  description:
    "Cada reparación, cada PMA, cada soldadura: documentada, trazable y liberada bajo aprobaciones acreditadas. Consulte a continuación los certificados FAA, EASA y UK CAA.",
  certs: {
    faa: {
      name: "FAA Part 145",
      detail: "Estación reparadora",
      scope:
        "Aprobada por la Federal Aviation Administration para las habilitaciones de célula (airframe), accesorios y servicios especializados.",
      authority: "Federal Aviation Administration",
    },
    easa: {
      name: "EASA",
      detail: "Aprobación Part 145",
      scope:
        "Agencia de la Unión Europea para la Seguridad Aérea: autorización de estación reparadora extranjera para operadores de la UE.",
      authority: "Agencia de la Unión Europea para la Seguridad Aérea",
    },
    ukcaa: {
      name: "UK CAA",
      detail: "Aprobación Part 145",
      scope:
        "Autoridad de Aviación Civil del Reino Unido: aprobación posterior al Brexit para aeronaves matriculadas en el Reino Unido.",
      authority: "Autoridad de Aviación Civil del Reino Unido",
    },
    aws: {
      name: "AWS D17.1",
      detail: "Soldadura por fusión aeroespacial",
      scope:
        "Soldadores y procedimientos certificados para titanio, acero inoxidable y aluminio conforme a la especificación de soldadura aeroespacial.",
      authority: "",
    },
  },
  qmsTitle: "Sistema de gestión de calidad",
  qmsBody:
    "Procedimientos escritos, herramental calibrado y trazabilidad completa en cada orden de trabajo.",
  qmsStrip: "Documentado · Auditado · Liberado",
  viewCertificateAria: (name: string) => `Ver el certificado ${name}`,
  viewCertificate: "Ver certificado",
  onRequest: "Certificado a solicitud",
  modal: {
    title: (name: string) => `Certificado ${name}`,
    close: "Cerrar",
    viewerTitle: (name: string) => `Certificado ${name}`,
    downloadStarted: "Descarga iniciada.",
    verified: "Ya está verificado: puede descargar cuando quiera.",
    downloadPdf: "Descargar PDF",
    gateNote:
      "Ingrese su correo electrónico para descargar. Solo lo solicitamos para mantener estos documentos controlados lejos de bots y scrapers no autorizados: no se le suscribirá a nada y no lo compartiremos.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "usted@empresa.com",
    verifying: "Verificando",
    errorGeneric: "Algo salió mal. Inténtelo de nuevo.",
    errorNetwork: "Error de red. Inténtelo de nuevo.",
  },
};

export const certificationsCopy = { en: certificationsEn, es: certificationsEs };

// ── TrustedBy ──────────────────────────────────────────────────────────────

// Fleet families we service — swap for real operator logos when the client
// provides them (add files to /public/images/clients and reference here).
// Aircraft model names are the same in both languages.
const fleets = [
  "B737",
  "B747",
  "B757",
  "B767",
  "B777",
  "A320",
  "A321",
  "A330",
  "A350",
  "CRJ‑900",
  "ERJ‑175",
  "Q400",
];

const trustedByEn = {
  heading: "Fleets we service",
  fleets,
  footer: "Commercial · Regional · Freight · Charter operators worldwide",
};

const trustedByEs: typeof trustedByEn = {
  heading: "Flotas que atendemos",
  fleets,
  footer: "Operadores comerciales · regionales · de carga · chárter en todo el mundo",
};

export const trustedByCopy = { en: trustedByEn, es: trustedByEs };

// ── Capabilities ───────────────────────────────────────────────────────────

const capabilitiesEn = {
  eyebrow: "Capabilities",
  title: "Everything that flies, refined in‑house.",
  description:
    "We repair, overhaul, and recertify flight‑critical systems across commercial and regional fleets. All work completed under FAA Part 145, EASA, and UK CAA approvals.",
  learnMore: "Learn more",
  cards: {
    flightStructures: {
      title: "Flight Structures",
      items: ["Elevators", "Slats", "Spoilers", "Wings", "Stabilizers"],
    },
    doors: {
      title: "Doors & Access",
      items: ["Cabin doors", "Cargo bases & latches", "Blocker doors", "Landing gear doors"],
    },
    propulsion: {
      title: "Propulsion Systems",
      items: ["Thrust reversers", "Nozzles", "Mufflers", "Exhaust systems"],
    },
    nacelles: {
      title: "Nacelles & Pylons",
      items: ["Cowlings", "Plenums", "Air intakes", "Ram airs"],
    },
    interior: {
      title: "Interior & Seating",
      items: ["Crew seats", "Panels", "Transparency systems"],
    },
    fuselage: {
      title: "Fuselage Components",
      items: ["Fuselage panels", "Windows", "Switches"],
    },
    cargo: {
      title: "Cargo Systems",
      items: ["Cargo bases", "Latches", "Containment"],
    },
    spares: {
      title: "Spare Parts",
      items: ["Commercial & regional jets", "Sourcing & logistics"],
    },
    teardown: {
      title: "Teardown & Storage",
      items: [
        "Plane‑in‑a‑box disassembly",
        "Serviced rotables & LRUs",
        "Hangar storage for operators",
        "Sebring, FL facility",
      ],
    },
  },
};

const capabilitiesEs: typeof capabilitiesEn = {
  eyebrow: "Capacidades",
  title: "Todo lo que vuela, perfeccionado en nuestras instalaciones.",
  description:
    "Reparamos, reacondicionamos (overhaul) y recertificamos sistemas críticos para el vuelo en flotas comerciales y regionales. Todo el trabajo se realiza bajo las aprobaciones FAA Part 145, EASA y UK CAA.",
  learnMore: "Más información",
  cards: {
    flightStructures: {
      title: "Estructuras de vuelo",
      items: ["Elevadores", "Slats", "Spoilers", "Alas", "Estabilizadores"],
    },
    doors: {
      title: "Puertas y accesos",
      items: [
        "Puertas de cabina",
        "Bases y cerrojos de carga",
        "Puertas bloqueadoras (blocker doors)",
        "Compuertas del tren de aterrizaje",
      ],
    },
    propulsion: {
      title: "Sistemas de propulsión",
      items: ["Inversores de empuje", "Toberas", "Silenciadores", "Sistemas de escape"],
    },
    nacelles: {
      title: "Góndolas y pilones",
      items: ["Capós", "Plenums", "Tomas de aire", "Tomas de aire de impacto (ram air)"],
    },
    interior: {
      title: "Interiores y asientos",
      items: ["Asientos de tripulación", "Paneles", "Sistemas de transparencias"],
    },
    fuselage: {
      title: "Componentes de fuselaje",
      items: ["Paneles de fuselaje", "Ventanas", "Interruptores"],
    },
    cargo: {
      title: "Sistemas de carga",
      items: ["Bases de carga", "Cerrojos", "Contención"],
    },
    spares: {
      title: "Repuestos",
      items: ["Jets comerciales y regionales", "Abastecimiento y logística"],
    },
    teardown: {
      title: "Desmantelamiento y almacenamiento",
      items: [
        "Desmantelamiento tipo plane‑in‑a‑box",
        "Rotables y LRU con servicio realizado",
        "Almacenamiento en hangar para operadores",
        "Instalación en Sebring, FL",
      ],
    },
  },
};

export const capabilitiesCopy = { en: capabilitiesEn, es: capabilitiesEs };
