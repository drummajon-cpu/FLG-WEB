// Spanish (Latin America) translation of data/services.ts. One entry per English service,
// in the same order, with the same slug, related slugs and image sources. Keep the two
// files in sync: any claim changed in the English copy must be changed here as well.

import type { Service } from "./services";

const AIRCRAFT =
  "Boeing 737, 747, 757, 767 y 777, la familia Airbus A320, A330 y A350, y modelos regionales como el CRJ, ERJ y Q400.";

export const servicesEs: Service[] = [
  {
    slug: "flight-control-surface-repair",
    name: "Superficies de control de vuelo",
    heading: "Reparación de superficies de control de vuelo y flaps",
    title: "Reparación de flaps y controles de vuelo | FLG Technics",
    description:
      "Reparación FAA Part 145 de flaps, alerones, spoilers, slats, timones de dirección, elevadores y bordes de ataque para flotas Boeing y Airbus. Miramar, Florida.",
    summary:
      "Flaps, alerones, spoilers, slats, timones de dirección, elevadores, estabilizadores y bordes de ataque.",
    intro: [
      "Las estructuras de vuelo son el núcleo de lo que hace FLG Technics. Decapamos, reparamos, inspeccionamos y liberamos superficies de control de vuelo para flotas comerciales y regionales desde nuestra instalación de 75,000 pies² en Miramar, Florida.",
      "Todo el trabajo se realiza bajo nuestras aprobaciones FAA Part 145, EASA y UK CAA, con ingeniería interna y autoridad DER cuando una reparación va más allá del manual.",
    ],
    components: [
      "Flaps interiores y exteriores",
      "Alerones",
      "Spoilers",
      "Slats",
      "Elevadores",
      "Timones de dirección",
      "Estabilizadores horizontal y vertical",
      "Bordes de ataque",
      "Estructuras alares",
    ],
    details: [
      {
        title: "Estructuras metálicas y de materiales compuestos",
        body: "Revestimientos de fibra de carbono (CFRP) sobre panal (honeycomb) de aluminio y Nomex, estructuras de aluminio 2024‑T3 y herrajes de titanio: los materiales de las superficies que procesamos cada semana.",
      },
      {
        title: "Reparaciones más allá del manual",
        body: "Cuando el daño queda fuera de los límites del SRM o del CMM, nuestros ingenieros internos desarrollan la reparación y nuestro DER de la FAA firma el 8110‑3, de modo que la unidad no sale del edificio para obtener una aprobación.",
      },
      {
        title: "Un acabado que aprueba el control de calidad",
        body: "Las superficies se decapan, se reparan, se inspeccionan y reciben su nuevo acabado internamente. El acabado es lo primero que revisa control de calidad, y es lo primero que usted ve cuando la unidad regresa.",
      },
      {
        title: "Estado en vivo de cada unidad",
        body: "Cada superficie se rastrea etapa por etapa en el portal de clientes, con fotos del desarmado, hallazgos de inspección y cada documento a medida que se firma.",
      },
    ],
    images: [
      {
        src: "/images/work/A330 Inboard Flap.jpg",
        alt: "Flap interior de Airbus A330 después de su reparación en FLG Technics",
        caption: "Flap interior de Airbus A330 · CFRP, panal de aluminio",
      },
      {
        src: "/images/work/767 Aileron.jpg",
        alt: "Alerón de Boeing 767 después de su reparación en FLG Technics",
        caption: "Alerón de Boeing 767 · Al 2024‑T3, revestimiento de CFRP",
      },
      {
        src: "/images/work/Rudder.jpg",
        alt: "Timón de dirección de aeronave después de su reparación en FLG Technics",
        caption: "Timón de dirección · CFRP, herrajes de titanio",
      },
      {
        src: "/images/work/Vertical Leading Edge.jpg",
        alt: "Borde de ataque del estabilizador vertical después de su reparación en FLG Technics",
        caption: "Borde de ataque del estabilizador vertical · Al 2024‑T3",
      },
    ],
    faqs: [
      {
        q: "¿Para qué tipos de aeronave reparan controles de vuelo?",
        a: `Jets comerciales y regionales: ${AIRCRAFT}`,
      },
      {
        q: "¿Qué pasa si el daño está fuera de los límites del manual de reparación?",
        a: "Nuestro equipo interno de ingeniería cuenta con autoridad de Representante de Ingeniería Designado de la FAA. Desarrollamos la reparación y emitimos la aprobación 8110‑3 nosotros mismos, sin enviar la unidad a otro lugar.",
      },
      {
        q: "¿Qué tan rápido cotizan?",
        a: "Las RFQ estándar normalmente reciben una cotización por escrito el mismo día hábil.",
      },
    ],
    related: ["der-repair-engineering", "nacelle-thrust-reverser-repair", "aircraft-doors-cargo-systems"],
  },
  {
    slug: "nacelle-thrust-reverser-repair",
    name: "Góndolas, inversores de empuje y escapes",
    heading: "Reparación de góndolas, inversores de empuje y escapes",
    title: "Reparación de góndolas e inversores de empuje | FLG Technics",
    description:
      "Reparación de inversores de empuje, capós, tomas de aire, plenums, toberas y silenciadores del APU, con soldadura AWS D17.1 interna. FAA Part 145, EASA y UK CAA.",
    summary:
      "Inversores de empuje, capós, tomas de aire, plenums, componentes ram air, toberas, silenciadores y escapes.",
    intro: [
      "Reparamos estructuras de propulsión y de góndola para aeronaves comerciales y regionales: inversores de empuje y blocker doors, capós, tomas de aire y plenums, toberas de escape y silenciadores del APU.",
      "Las partes de zonas calientes a menudo requieren soldadura, mecanizado e ingeniería en conjunto. Hacemos las tres cosas internamente, de modo que la unidad permanece en un mismo taller desde el desarmado hasta la liberación.",
    ],
    components: [
      "Inversores de empuje",
      "Blocker doors",
      "Capós",
      "Tomas y entradas de aire",
      "Plenums",
      "Componentes de aire de impacto (ram air)",
      "Toberas de escape",
      "Silenciadores del APU y sistemas de escape",
    ],
    details: [
      {
        title: "Soldadura aeroespacial certificada",
        body: "Las partes de zonas calientes en titanio, acero inoxidable e Inconel se sueldan internamente conforme a AWS D17.1, la especificación de soldadura por fusión aeroespacial, con soldadores certificados, procedimientos controlados y resultados verificados por NDT.",
      },
      {
        title: "Partes obsoletas, resueltas",
        body: "Cuando una parte OEM se descontinúa, podemos aplicarle ingeniería inversa a partir de un escaneo 3D, mecanizar dispositivos de sujeción en nuestro propio equipo CNC y llevar la reparación hasta la aprobación DER en un 8110‑3.",
      },
      {
        title: "Un solo taller, de principio a fin",
        body: "Ingeniería, mecanizado, soldadura, inspección y liberación ocurren dentro de nuestras paredes. Nada se envía afuera para una reparación subcontratada.",
      },
    ],
    images: [
      {
        src: "/images/work/A330 Muffler.jpg",
        alt: "Silenciador del APU de Airbus A330 en FLG Technics",
        caption: "Silenciador del APU de Airbus A330 · Inconel, brida de titanio",
      },
      {
        src: "/images/work/Air Inlet.jpg",
        alt: "Toma de aire de motor de aeronave reparada en FLG Technics",
        caption: "Toma de aire del motor",
      },
    ],
    faqs: [
      {
        q: "¿Pueden soldar partes de escape de titanio e Inconel?",
        a: "Sí. Nuestros soldadores certificados trabajan conforme a AWS D17.1 en titanio, acero inoxidable y aluminio, con soldadura TIG manual controlada por procedimiento y resultados verificados por NDT.",
      },
      {
        q: "¿Qué pasa si la parte OEM ya no está disponible?",
        a: "Podemos aplicarle ingeniería inversa a partir de un escaneo 3D, mecanizarla internamente y hacer que nuestro DER de la FAA apruebe la reparación, o desarrollar un reemplazo PMA.",
      },
      {
        q: "¿Atienden eventos AOG?",
        a: "Sí. Nuestra mesa de AOG está atendida 24/7 en el (754) 544‑1991, y la mayoría de las partes AOG se despachan en un plazo de 48 a 72 horas una vez recibidas.",
      },
    ],
    related: ["aws-d17-1-welding", "der-repair-engineering", "flight-control-surface-repair"],
  },
  {
    slug: "aircraft-doors-cargo-systems",
    name: "Puertas y sistemas de carga",
    heading: "Reparación de puertas y sistemas de carga de aeronaves",
    title: "Reparación de puertas y sistemas de carga | FLG Technics",
    description:
      "Reparación de puertas de cabina, compuertas del tren de aterrizaje, blocker doors, bases, cerrojos y contención de carga. Estación reparadora FAA Part 145.",
    summary:
      "Puertas de cabina, compuertas del tren de aterrizaje, blocker doors, bases de carga, cerrojos y contención.",
    intro: [
      "FLG Technics repara puertas de aeronaves y componentes de sistemas de carga para flotas comerciales y regionales, bajo aprobaciones FAA Part 145, EASA y UK CAA.",
      "Los componentes de puertas y de carga sufren un desgaste intenso y daños frecuentes. Nos encargamos de la estructura, de los mecanismos de cierre y de la documentación, y usted puede seguir cada unidad en vivo en el portal de clientes.",
    ],
    components: [
      "Puertas de cabina",
      "Compuertas del tren de aterrizaje",
      "Blocker doors",
      "Bases de carga",
      "Cerrojos de carga",
      "Contención de carga",
      "Paneles de acceso",
    ],
    details: [
      {
        title: "Estructura y mecanismos en conjunto",
        body: "Los revestimientos, marcos y herrajes de las puertas se reparan junto con los cerrojos y mecanismos que los acompañan, de modo que la unidad se devuelve completa.",
      },
      {
        title: "Mecanizado interno",
        body: "Los herrajes desgastados o dañados pueden mecanizarse en nuestro propio equipo CNC, y pueden desarrollarse partes de reemplazo mediante PMA cuando el suministro del OEM es escaso.",
      },
      {
        title: "Trazabilidad completa",
        body: "Los certificados de material, los registros de proceso, los 8130‑3 y cualquier 8110‑3 de DER quedan vinculados a la orden de trabajo desde la recepción hasta la liberación.",
      },
    ],
    images: [],
    faqs: [
      {
        q: "¿Para qué aeronaves reparan puertas y sistemas de carga?",
        a: `Jets comerciales y regionales: ${AIRCRAFT}`,
      },
      {
        q: "¿Puedo ver en qué etapa de la reparación está mi unidad?",
        a: "Sí. Cada cliente recibe acceso a nuestro portal en computadora y en móvil, con el estado etapa por etapa, fotos del desarmado, hallazgos de inspección y liberación de documentos.",
      },
    ],
    related: ["flight-control-surface-repair", "pma-parts-development", "aircraft-transparencies-interiors"],
  },
  {
    slug: "aircraft-transparencies-interiors",
    name: "Transparencias, ventanas e interiores",
    heading: "Reparación de transparencias, ventanas e interiores de aeronaves",
    title: "Reparación de transparencias e interiores | FLG Technics",
    description:
      "Reparación de sistemas de transparencias, ventanas, paneles de fuselaje e interiores y asientos de tripulación. FAA Part 145, EASA y UK CAA. Miramar, Florida.",
    summary:
      "Sistemas de transparencias, ventanas, paneles de fuselaje e interiores, asientos de tripulación e interruptores.",
    intro: [
      "Reparamos transparencias y ventanas de aeronaves, paneles de fuselaje e interiores, asientos de tripulación e interruptores de cabina para operadores comerciales y regionales.",
      "Cada reparación se libera bajo nuestras aprobaciones FAA Part 145, EASA y UK CAA, con la documentación y las fotos disponibles en el portal de clientes.",
    ],
    components: [
      "Sistemas de transparencias",
      "Ventanas",
      "Paneles de fuselaje",
      "Paneles interiores",
      "Asientos de tripulación",
      "Interruptores",
    ],
    details: [
      {
        title: "Liberación bajo tres autoridades",
        body: "FAA Part 145, con aprobaciones EASA y UK CAA para trabajos en aeronaves matriculadas en la UE y en el Reino Unido.",
      },
      {
        title: "Cada paso documentado",
        body: "Los flujos de trabajo con bloqueo por etapa hacen que el trabajo no pueda avanzar hasta que el paso anterior esté firmado, de modo que el registro de auditoría está completo cuando la parte se despacha.",
      },
      {
        title: "Cotizaciones rápidas por escrito",
        body: "Las RFQ estándar normalmente reciben una cotización por escrito el mismo día hábil.",
      },
    ],
    images: [],
    faqs: [
      {
        q: "¿Reparan transparencias para aeronaves matriculadas en la UE y en el Reino Unido?",
        a: "Sí. Junto con nuestro certificado FAA Part 145, contamos con aprobaciones de EASA y UK CAA como estación reparadora extranjera.",
      },
      {
        q: "¿Aceptan trabajos internacionales?",
        a: "Sí. Atendemos a operadores de todo el mundo bajo nuestras aprobaciones FAA, EASA y UK CAA, y nos encargamos del envío y de los trámites de aduana.",
      },
    ],
    related: ["aircraft-doors-cargo-systems", "flight-control-surface-repair", "der-repair-engineering"],
  },
  {
    slug: "der-repair-engineering",
    name: "Reparaciones DER e ingeniería",
    heading: "Reparaciones DER de la FAA e ingeniería interna",
    title: "Reparaciones DER (8110‑3) e ingeniería | FLG Technics",
    description:
      "Ingeniería estructural y de esfuerzos interna con autoridad DER de la FAA para aprobaciones de reparación 8110‑3, escaneo 3D e ingeniería inversa. Miramar, FL.",
    summary:
      "Aprobaciones de reparación 8110‑3 firmadas por DER, análisis estructural y de esfuerzos, ingeniería inversa.",
    intro: [
      "La mayoría de los MRO envían la ingeniería afuera. Nosotros no. La ingeniería de diseño, de esfuerzos y estructural está bajo el mismo techo que el taller de reparación, con autoridad de Representante de Ingeniería Designado de la FAA para aprobaciones de reparación.",
      "Llevamos una reparación desde el concepto hasta una liberación con 8110‑3 firmado por DER, sin subcontratar y sin esperar a un tercero.",
    ],
    components: [
      "Aprobaciones de reparación DER (formulario FAA 8110‑3)",
      "Análisis estructural y de esfuerzos",
      "Diseño de reparaciones más allá de los límites del SRM y del CMM",
      "Escaneo 3D e ingeniería inversa",
      "Soporte de ingeniería para Airbus",
    ],
    details: [
      {
        title: "Aprobación sin la espera",
        body: "Como el DER trabaja junto a los mecánicos, una reparación que queda fuera del manual puede diseñarse, aprobarse y ejecutarse sin que la parte salga del edificio.",
      },
      {
        title: "Ingeniería inversa",
        body: "Cuando no hay datos o partes del OEM disponibles, escaneamos la parte en 3D, construimos el CAD, mecanizamos dispositivos de sujeción internamente y documentamos la reparación para la aprobación DER.",
      },
      {
        title: "Ingeniería que alimenta la producción",
        body: "El mismo equipo da soporte al desarrollo de PMA, al mecanizado CNC y a la soldadura AWS D17.1, de modo que una decisión de diseño se convierte en una parte terminada en un solo sitio.",
      },
    ],
    images: [
      {
        src: "/images/3d-scanner.jpg",
        alt: "Escaneo 3D de una parte de aeronave para ingeniería inversa en FLG Technics",
        caption: "Escaneo 3D para ingeniería inversa",
      },
    ],
    faqs: [
      {
        q: "¿Emiten aprobaciones de reparación 8110‑3?",
        a: "Sí. Nuestro equipo interno de ingeniería cuenta con autoridad de Representante de Ingeniería Designado de la FAA y emite aprobaciones de reparación 8110‑3.",
      },
      {
        q: "¿Pueden diseñar una reparación para una parte obsoleta?",
        a: "Sí. Aplicamos ingeniería inversa a partir de un escaneo 3D y luego mecanizamos, soldamos y aprobamos la reparación internamente, o desarrollamos un reemplazo PMA.",
      },
    ],
    related: ["pma-parts-development", "aws-d17-1-welding", "flight-control-surface-repair"],
  },
  {
    slug: "pma-parts-development",
    name: "Desarrollo de partes PMA",
    heading: "Desarrollo de partes PMA",
    title: "Desarrollo de partes PMA e ingeniería inversa | FLG Technics",
    description:
      "PMA de la FAA de principio a fin: análisis de oportunidad, ingeniería inversa, presentación ante la FAA, pruebas y producción, con mecanizado interno.",
    summary:
      "PMA de la FAA desde el análisis de oportunidad hasta la presentación, las pruebas y la producción.",
    intro: [
      "FLG Technics desarrolla partes con Aprobación de Fabricante de Partes (PMA) de la FAA de principio a fin: desde la identificación de la oportunidad hasta la presentación ante la FAA, las pruebas y la producción continua.",
      "El trabajo de PMA suele combinarse con ingeniería inversa y mecanizado CNC interno, lo que da a los operadores una fuente alterna calificada cuando las partes OEM son lentas, costosas o están descontinuadas.",
    ],
    components: [
      "Análisis de oportunidad",
      "Ingeniería inversa y escaneo 3D",
      "Presentación ante la FAA y pruebas",
      "Mecanizado CNC interno",
      "Producción continua",
      "Fuentes alternas calificadas",
    ],
    details: [
      {
        title: "De la idea a la parte aprobada",
        body: "Identificamos dónde tiene sentido un PMA, diseñamos la parte, gestionamos la presentación ante la FAA y las pruebas, y la llevamos a producción.",
      },
      {
        title: "Fabricado en nuestro propio taller",
        body: "La ingeniería interna, el mecanizado CNC y la soldadura AWS D17.1 cierran el ciclo entre el diseño y una parte terminada y aprobada.",
      },
    ],
    images: [
      {
        src: "/images/cnc-machine.jpg",
        alt: "Centro de mecanizado CNC en FLG Technics",
        caption: "Mecanizado CNC interno",
      },
    ],
    faqs: [
      {
        q: "¿Desarrollan partes PMA?",
        a: "Sí. Desarrollamos reemplazos PMA de principio a fin, desde el análisis de oportunidad hasta las pruebas y la producción continua.",
      },
    ],
    related: ["der-repair-engineering", "aws-d17-1-welding", "nacelle-thrust-reverser-repair"],
  },
  {
    slug: "aws-d17-1-welding",
    name: "Soldadura AWS D17.1 y mecanizado CNC",
    heading: "Soldadura aeroespacial AWS D17.1 y mecanizado CNC",
    title: "Soldadura AWS D17.1 y mecanizado CNC | FLG Technics",
    description:
      "Soldadura aeroespacial certificada AWS D17.1 de titanio, acero inoxidable y aluminio, y mecanizado CNC interno. Estación reparadora FAA Part 145 en Miramar, FL.",
    summary: "Soldadura certificada de titanio, acero inoxidable y aluminio, y mecanizado CNC interno.",
    intro: [
      "Soldamos titanio, acero inoxidable y aluminio conforme a AWS D17.1, la especificación de soldadura por fusión aeroespacial, dondequiera que se requiera una unión estructural por calor.",
      "La soldadura está junto a nuestro mecanizado CNC, ingeniería e inspección, de modo que los dispositivos de sujeción, las reparaciones y las partes de reemplazo se fabrican y se verifican en un solo lugar.",
    ],
    components: [
      "Soldadura de titanio",
      "Soldadura de acero inoxidable",
      "Soldadura de aluminio",
      "TIG manual controlado por procedimiento",
      "Resultados verificados por NDT",
      "Mecanizado CNC de herrajes y dispositivos de sujeción",
    ],
    details: [
      {
        title: "Soldadores y procedimientos certificados",
        body: "Cada soldadura la realizan soldadores certificados conforme a procedimientos controlados, y luego se verifica con ensayos no destructivos.",
      },
      {
        title: "Mecanizado interno",
        body: "Nuestro equipo CNC produce herrajes de reparación, dispositivos de sujeción y partes PMA, incluidos dispositivos de sujeción mecanizados directamente a partir del CAD de un escaneo 3D.",
      },
    ],
    images: [
      {
        src: "/images/cnc-machine.jpg",
        alt: "Centro de mecanizado CNC en FLG Technics",
        caption: "Mecanizado CNC interno",
      },
    ],
    faqs: [
      {
        q: "¿Qué es AWS D17.1?",
        a: "AWS D17.1 es la especificación de soldadura por fusión aeroespacial. La usamos para titanio, acero inoxidable y aluminio.",
      },
    ],
    related: ["nacelle-thrust-reverser-repair", "pma-parts-development", "der-repair-engineering"],
  },
  {
    slug: "aircraft-teardown-storage",
    name: "Desmantelamiento y almacenamiento de aeronaves",
    heading: "Desmantelamiento de aeronaves y almacenamiento en hangar",
    title: "Desmantelamiento de aeronaves y hangar, Sebring | FLG Technics",
    description:
      "Desmantelamiento de aeronaves plane‑in‑a‑box, rotables y LRU con servicio y trazabilidad completa, y almacenamiento en hangar para operadores en Sebring, Florida.",
    summary:
      "Desmantelamientos plane‑in‑a‑box, rotables y LRU con servicio, y almacenamiento en hangar en Sebring, FL.",
    intro: [
      "En nuestro sitio de Sebring, Florida, hacemos desmantelamientos plane‑in‑a‑box: desensamble de la aeronave completa, con unidades que reciben servicio internamente y regresan al mercado de posventa listas para usarse, con trazabilidad completa.",
      "También alquilamos almacenamiento en hangar a operadores y empresas de desmantelamiento que necesitan espacio climatizado en lado aire para aeronaves en espera o inventario.",
    ],
    components: [
      "Desensamble de la aeronave completa",
      "Rotables y LRU con servicio",
      "Componentes estructurales",
      "Trazabilidad completa",
      "Almacenamiento en hangar climatizado, en lado aire",
    ],
    details: [
      {
        title: "Del desmantelamiento a la condición servible",
        body: "Las partes removidas en Sebring pueden repararse y certificarse en nuestra estación reparadora de Miramar, de modo que regresan al mercado en condición servible y no tal como fueron removidas.",
      },
      {
        title: "Almacenamiento para terceros",
        body: "Los operadores y las empresas de desmantelamiento pueden alquilar espacio de hangar climatizado en lado aire para aeronaves en espera o inventario.",
      },
    ],
    images: [
      {
        src: "/images/facility-aerial.jpg",
        alt: "Piso del hangar de FLG Technics",
        caption: "Instalación de FLG Technics",
      },
    ],
    faqs: [
      {
        q: "¿Dónde está su sitio de desmantelamiento?",
        a: "El desmantelamiento y el trabajo de fin de vida útil se realizan en nuestro segundo sitio, en Sebring, Florida. Nuestra estación reparadora principal está en Miramar, Florida.",
      },
    ],
    related: ["flight-control-surface-repair", "nacelle-thrust-reverser-repair", "der-repair-engineering"],
  },
  {
    slug: "aircraft-composite-repair",
    name: "Reparación de materiales compuestos",
    heading: "Reparación de materiales compuestos de aeronaves",
    title: "Reparación de compuestos: CFRP y honeycomb | FLG Technics",
    description:
      "Reparación FAA Part 145 de revestimientos de CFRP y núcleo de panal en flaps, alerones, timones y carenados. Miramar, FL, al servicio de Miami y Fort Lauderdale.",
    summary:
      "Revestimientos de fibra de carbono (CFRP), núcleo de panal (honeycomb) de Nomex y aluminio, estructuras de vuelo adheridas.",
    intro: [
      "FLG Technics repara estructuras de vuelo de materiales compuestos cada semana: revestimientos de fibra de carbono (CFRP) sobre panal (honeycomb) de aluminio y Nomex en flaps, alerones, timones de dirección, bordes de ataque y carenados.",
      "Nuestra estación reparadora FAA Part 145 está en Miramar, Florida, entre Miami y Fort Lauderdale. Todo el trabajo en materiales compuestos se realiza bajo nuestras aprobaciones FAA, EASA y UK CAA, con ingeniería interna y autoridad DER cuando el daño va más allá del manual.",
    ],
    components: [
      "Flaps y carenados de flap",
      "Alerones y spoilers",
      "Timones de dirección y elevadores",
      "Bordes de ataque",
      "Revestimientos de estabilizador",
      "Paneles de panal (honeycomb) adheridos",
    ],
    details: [
      {
        title: "CFRP y núcleo de panal (honeycomb)",
        body: "El núcleo de panal (honeycomb) dañado se retira y se reemplaza, y los revestimientos de fibra de carbono se laminan y se curan conforme al esquema de reparación aprobado, tanto en superficies Airbus como Boeing.",
      },
      {
        title: "Daño medido, no estimado",
        body: "El escaneo 3D de luz estructurada mapea el daño superficial, el desgaste y la deformación con precisión submilimétrica, de modo que los hallazgos de inspección se convierten en mediciones reales.",
      },
      {
        title: "Más allá de los límites del SRM",
        body: "Cuando el daño en materiales compuestos queda fuera del SRM o del CMM, nuestros ingenieros internos desarrollan la reparación y nuestro DER de la FAA la aprueba en un 8110‑3, sin que la unidad salga del edificio.",
      },
      {
        title: "Seguimiento etapa por etapa",
        body: "Cada unidad es visible en el portal de clientes: fotos del desarmado, remoción del núcleo, laminado, inspección y documentos de liberación a medida que se firman.",
      },
    ],
    images: [
      {
        src: "/images/work/A320 Outboard Flap.jpg",
        alt: "Flap exterior de Airbus A320 después de su reparación de materiales compuestos en FLG Technics",
        caption: "Flap exterior de Airbus A320 · CFRP, panal de aluminio",
      },
      {
        src: "/images/work/A330 Inboard Flap.jpg",
        alt: "Flap interior de Airbus A330 después de su reparación de materiales compuestos en FLG Technics",
        caption: "Flap interior de Airbus A330 · CFRP, panal de aluminio",
      },
    ],
    faqs: [
      {
        q: "¿Qué materiales compuestos reparan?",
        a: "Revestimientos de fibra de carbono (CFRP) sobre núcleo de panal (honeycomb) de aluminio y Nomex, la construcción que se usa en la mayoría de los flaps, alerones, timones de dirección y carenados modernos.",
      },
      {
        q: "¿Dónde están ubicados?",
        a: "2701 SW 145th Ave, Ste 250, Miramar, Florida 33027, en el sur de Florida, entre Miami y Fort Lauderdale. También recibimos unidades enviadas por operadores de todo el mundo.",
      },
      {
        q: "¿Qué tan rápido cotizan?",
        a: "Las RFQ estándar normalmente reciben una cotización por escrito el mismo día hábil.",
      },
    ],
    related: ["flight-control-surface-repair", "airframe-structural-repair", "der-repair-engineering"],
  },
  {
    slug: "airframe-structural-repair",
    name: "Reparación de estructuras y chapa metálica",
    heading: "Reparación estructural de aeronaves y de chapa metálica",
    title: "Reparación estructural y de chapa metálica | FLG Technics",
    description:
      "Reparación estructural y de chapa metálica: aluminio 2024‑T3, herrajes de titanio, estructuras alares y de estabilizador. MRO FAA Part 145 en Miramar, FL.",
    summary:
      "Estructuras de aluminio 2024‑T3, herrajes de titanio, estructuras alares y de estabilizador, piezas de detalle mecanizadas por CNC.",
    intro: [
      "Además de los materiales compuestos, FLG Technics repara estructuras metálicas de aeronaves: revestimientos y costillas de aluminio 2024‑T3, herrajes de titanio, estructuras alares y de estabilizador, puertas y componentes de carga.",
      "75,000 pies² de trabajo estructural están bajo un mismo techo en Miramar, Florida, con ingeniería, mecanizado CNC, soldadura certificada, inspección y liberación, todo internamente.",
    ],
    components: [
      "Estructuras alares",
      "Estabilizadores horizontal y vertical",
      "Bordes de ataque",
      "Puertas y escotillas",
      "Estructuras de sistemas de carga",
      "Herrajes de titanio y aluminio",
    ],
    details: [
      {
        title: "Chapa metálica y estructuras",
        body: "Las estructuras de aluminio 2024‑T3 y los herrajes de titanio se reparan conforme al SRM y al CMM, o conforme a una reparación aprobada por DER cuando el daño va más allá de ellos.",
      },
      {
        title: "Mecanizado CNC interno",
        body: "Los dispositivos de sujeción, el herramental y las piezas de detalle de reemplazo se mecanizan en nuestro propio equipo CNC, de modo que una parte faltante no detiene la reparación.",
      },
      {
        title: "Soldadura certificada",
        body: "Cuando una estructura necesita soldadura, nuestros soldadores certificados trabajan conforme a AWS D17.1 en titanio, acero inoxidable y aluminio, con verificación por NDT.",
      },
      {
        title: "Ingeniería en el mismo taller",
        body: "La ingeniería de diseño, de esfuerzos y estructural está junto al taller, con autoridad DER de la FAA para aprobaciones de reparación 8110‑3.",
      },
    ],
    images: [
      {
        src: "/images/work/Vertical Leading Edge.jpg",
        alt: "Borde de ataque del estabilizador vertical después de su reparación estructural en FLG Technics",
        caption: "Borde de ataque del estabilizador vertical · Al 2024‑T3",
      },
      {
        src: "/images/work/767 Aileron.jpg",
        alt: "Alerón de Boeing 767 después de su reparación estructural en FLG Technics",
        caption: "Alerón de Boeing 767 · Al 2024‑T3, revestimiento de CFRP",
      },
    ],
    faqs: [
      {
        q: "¿A qué tipos de aeronave dan soporte?",
        a: `Jets comerciales y regionales: ${AIRCRAFT}`,
      },
      {
        q: "¿Pueden fabricar una parte que ya no está disponible?",
        a: "Sí. Podemos aplicarle ingeniería inversa a partir de un escaneo 3D, mecanizarla internamente y hacer que nuestro DER de la FAA apruebe la reparación, o desarrollar un reemplazo PMA.",
      },
      {
        q: "¿Atienden eventos AOG?",
        a: "Sí. Nuestra mesa de AOG está atendida 24/7 en el (754) 544‑1991.",
      },
    ],
    related: ["aircraft-composite-repair", "aws-d17-1-welding", "der-repair-engineering"],
  },
  {
    slug: "airbus-component-repair",
    name: "Reparación de componentes Airbus",
    heading: "Reparación de componentes y estructuras Airbus",
    title: "Reparación de componentes Airbus A320/A330/A350 | FLG Technics",
    description:
      "Reparación de flaps, controles de vuelo, góndolas y escapes del APU para la familia Airbus A320, A330 y A350. FAA, EASA y UK CAA Part 145. Miramar, cerca de Miami.",
    summary:
      "Controles de vuelo, góndolas, escapes del APU y estructuras de la familia A320, A330 y A350.",
    intro: [
      "FLG Technics repara componentes estructurales para la familia Airbus A320, A330 y A350, desde superficies de control de vuelo hasta partes de góndola y sistemas de escape del APU.",
      "Con aprobaciones de EASA (EASA.145.6278) y UK CAA junto con nuestro certificado FAA Part 145, liberamos trabajos para flotas Airbus matriculadas en la UE y en el Reino Unido, así como para operadores de Estados Unidos, desde nuestra instalación en Miramar, Florida, cerca de Miami.",
    ],
    components: [
      "Flaps y controles de vuelo de la familia A320",
      "Flaps interiores y exteriores de A330",
      "Alerones, spoilers y timones de dirección",
      "Partes de góndola y de inversor de empuje",
      "Silenciadores del APU y soportes",
      "Bordes de ataque y estructuras de estabilizador",
    ],
    details: [
      {
        title: "Soporte de ingeniería para Airbus",
        body: "Nuestro equipo interno de ingeniería da soporte a las reparaciones de Airbus, con autoridad DER de la FAA para aprobar reparaciones que quedan fuera del SRM o del CMM.",
      },
      {
        title: "Partes obsoletas, resueltas",
        body: "Cuando una parte OEM se descontinúa, podemos aplicarle ingeniería inversa a partir de un escaneo 3D, mecanizarla internamente y llevar la reparación hasta la aprobación DER en un 8110‑3.",
      },
      {
        title: "Liberación EASA y UK CAA",
        body: "Nuestras aprobaciones EASA Part‑145 y UK CAA nos permiten liberar trabajos para aeronaves matriculadas en la UE y en el Reino Unido, no solo para flotas con matrícula N.",
      },
    ],
    images: [
      {
        src: "/images/work/A320 Outboard Flap.jpg",
        alt: "Flap exterior de Airbus A320 reparado en FLG Technics",
        caption: "Flap exterior de Airbus A320 · CFRP, panal de aluminio",
      },
      {
        src: "/images/work/A330 Muffler.jpg",
        alt: "Silenciador del APU de Airbus A330 en FLG Technics",
        caption: "Silenciador del APU de Airbus A330 · Inconel, brida de titanio",
      },
    ],
    faqs: [
      {
        q: "¿Están aprobados para aeronaves Airbus matriculadas en la UE?",
        a: "Sí. FLG Technics cuenta con la aprobación EASA Part‑145 EASA.145.6278 y la aprobación UK CAA UK.145.50849, junto con el certificado FAA Part 145 F72R832X.",
      },
      {
        q: "¿Dónde están ubicados?",
        a: "En Miramar, Florida, en el sur de Florida, entre Miami y Fort Lauderdale. También se reciben unidades enviadas por operadores de todo el mundo.",
      },
      {
        q: "¿Qué tan rápido cotizan?",
        a: "Las RFQ estándar normalmente reciben una cotización por escrito el mismo día hábil.",
      },
    ],
    related: ["boeing-component-repair", "flight-control-surface-repair", "nacelle-thrust-reverser-repair"],
  },
  {
    slug: "boeing-component-repair",
    name: "Reparación de componentes Boeing",
    heading: "Reparación de componentes y estructuras Boeing",
    title: "Reparación de componentes Boeing 737/757/767/777 | FLG Technics",
    description:
      "Reparación de flaps, alerones, timones, bordes de ataque y partes de góndola de Boeing 737, 747, 757, 767 y 777. Estación reparadora FAA Part 145 en Miramar, FL.",
    summary:
      "Controles de vuelo, bordes de ataque, góndolas y estructuras de 737, 747, 757, 767 y 777.",
    intro: [
      "FLG Technics repara componentes estructurales para los Boeing 737, 747, 757, 767 y 777: flaps, alerones, timones de dirección, elevadores, bordes de ataque, partes de góndola y estructuras de sistemas de carga.",
      "Nuestra estación reparadora FAA Part 145 está en Miramar, Florida, cerca de Miami, con ingeniería interna, aprobaciones DER, mecanizado CNC y soldadura AWS D17.1 en un mismo taller.",
    ],
    components: [
      "Alerones y flaps exteriores de 767",
      "Controles de vuelo de 737 y 757",
      "Flaps y spoilers de 777",
      "Timones de dirección y elevadores",
      "Bordes de ataque",
      "Partes de góndola y de inversor de empuje",
    ],
    details: [
      {
        title: "Metálico y compuesto",
        body: "Estructuras de aluminio 2024‑T3, revestimientos de CFRP y herrajes de titanio: la combinación de materiales de las superficies de control Boeing, todo reparado internamente.",
      },
      {
        title: "Aprobaciones DER internas",
        body: "Cuando el daño queda fuera del SRM o del CMM, nuestros ingenieros desarrollan la reparación y nuestro DER de la FAA firma el 8110‑3.",
      },
      {
        title: "Estado en vivo",
        body: "Cada unidad se rastrea etapa por etapa en el portal de clientes, con fotos, hallazgos y documentos a medida que se firman.",
      },
    ],
    images: [
      {
        src: "/images/work/767 Aileron.jpg",
        alt: "Alerón de Boeing 767 reparado en FLG Technics",
        caption: "Alerón de Boeing 767 · Al 2024‑T3, revestimiento de CFRP",
      },
      {
        src: "/images/work/767 Outboard Flap.jpg",
        alt: "Flap exterior de Boeing 767 reparado en FLG Technics",
        caption: "Flap exterior de Boeing 767",
      },
    ],
    faqs: [
      {
        q: "¿Qué modelos de Boeing reparan?",
        a: "Componentes de Boeing 737, 747, 757, 767 y 777, además de modelos Airbus y regionales.",
      },
      {
        q: "¿Atienden eventos AOG?",
        a: "Sí. Nuestra mesa de AOG está atendida 24/7 en el (754) 544‑1991.",
      },
      {
        q: "¿Qué tan rápido cotizan?",
        a: "Las RFQ estándar normalmente reciben una cotización por escrito el mismo día hábil.",
      },
    ],
    related: ["airbus-component-repair", "flight-control-surface-repair", "airframe-structural-repair"],
  },
];

export function getServiceEs(slug: string): Service | undefined {
  return servicesEs.find((s) => s.slug === slug);
}
