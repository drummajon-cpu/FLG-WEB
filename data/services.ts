// One entry per service page (/services/<slug>). Every claim here is taken from copy that
// is already on the home page (Capabilities, InHouse, Gallery, FAQ, Certifications), so
// these pages never promise anything the rest of the site doesn't. Edit the copy here;
// app/services/[slug]/page.tsx only lays it out.

export type ServiceFaq = { q: string; a: string };

export type ServiceImage = { src: string; alt: string; caption: string };

export type Service = {
  slug: string;
  /** Short name used in links, cards and breadcrumbs. */
  name: string;
  /** The page's <h1>. */
  heading: string;
  /** <title> (the layout adds nothing, so include the brand). */
  title: string;
  /** Meta description: what Google shows under the link. Keep it under ~160 characters. */
  description: string;
  /** One-line summary for the /services index cards. */
  summary: string;
  intro: string[];
  /** "What we repair": the components this service covers. */
  components: string[];
  /** How the work is done: short paragraphs with a bold lead. */
  details: { title: string; body: string }[];
  images: ServiceImage[];
  faqs: ServiceFaq[];
  related: string[];
};

const AIRCRAFT =
  "Boeing 737, 747, 757, 767 and 777, the Airbus A320 family, A330 and A350, and regional types including the CRJ, ERJ and Q400.";

export const services: Service[] = [
  {
    slug: "flight-control-surface-repair",
    name: "Flight Control Surfaces",
    heading: "Flight control surface and flap repair",
    title: "Flight Control Surface & Flap Repair | FLG Technics",
    description:
      "FAA Part 145 repair of aircraft flaps, ailerons, spoilers, slats, rudders, elevators and leading edges for Boeing and Airbus fleets. Miramar, Florida.",
    summary: "Flaps, ailerons, spoilers, slats, rudders, elevators, stabilizers and leading edges.",
    intro: [
      "Flight structures are the core of what FLG Technics does. We strip, repair, inspect and release flight control surfaces for commercial and regional fleets from our 75,000 sq ft facility in Miramar, Florida.",
      "All work is completed under our FAA Part 145, EASA and UK CAA approvals, with in‑house engineering and DER authority when a repair goes beyond the manual.",
    ],
    components: [
      "Inboard and outboard flaps",
      "Ailerons",
      "Spoilers",
      "Slats",
      "Elevators",
      "Rudders",
      "Horizontal and vertical stabilizers",
      "Leading edges",
      "Wing structures",
    ],
    details: [
      {
        title: "Composite and metallic structures",
        body: "Carbon‑fibre (CFRP) skins over aluminium and Nomex honeycomb, aluminium 2024‑T3 structures and titanium fittings: the materials on the surfaces we turn every week.",
      },
      {
        title: "Repairs beyond the manual",
        body: "When damage falls outside the SRM or CMM limits, our in‑house engineers develop the repair and our FAA DER signs the 8110‑3, so the unit doesn't leave the building for an approval.",
      },
      {
        title: "Finish that passes QC",
        body: "Surfaces are stripped, repaired, inspected and refinished in‑house. The finish is the first thing QC checks, and it's the first thing you see when the unit comes back.",
      },
      {
        title: "Live status on every unit",
        body: "Each surface is tracked stage by stage in the customer portal, with teardown photos, inspection findings and every document as it's signed.",
      },
    ],
    images: [
      {
        src: "/images/work/A330 Inboard Flap.jpg",
        alt: "Airbus A330 inboard flap after repair at FLG Technics",
        caption: "Airbus A330 inboard flap · CFRP, aluminium honeycomb",
      },
      {
        src: "/images/work/767 Aileron.jpg",
        alt: "Boeing 767 aileron after repair at FLG Technics",
        caption: "Boeing 767 aileron · Al 2024‑T3, CFRP skin",
      },
      {
        src: "/images/work/Rudder.jpg",
        alt: "Aircraft rudder after repair at FLG Technics",
        caption: "Rudder · CFRP, titanium fittings",
      },
      {
        src: "/images/work/Vertical Leading Edge.jpg",
        alt: "Vertical stabilizer leading edge after repair at FLG Technics",
        caption: "Vertical stabilizer leading edge · Al 2024‑T3",
      },
    ],
    faqs: [
      {
        q: "Which aircraft types do you repair flight controls for?",
        a: `Commercial and regional jets: ${AIRCRAFT}`,
      },
      {
        q: "What if the damage is outside the repair manual limits?",
        a: "Our in‑house engineering team holds FAA Designated Engineering Representative authority. We develop the repair and issue the 8110‑3 approval ourselves, without sending the unit out.",
      },
      {
        q: "How quickly do you quote?",
        a: "Standard RFQs typically receive a written quote the same business day.",
      },
    ],
    related: ["der-repair-engineering", "nacelle-thrust-reverser-repair", "aircraft-doors-cargo-systems"],
  },
  {
    slug: "nacelle-thrust-reverser-repair",
    name: "Nacelles, Thrust Reversers & Exhaust",
    heading: "Nacelle, thrust reverser and exhaust repair",
    title: "Nacelle, Thrust Reverser & APU Exhaust Repair | FLG Technics",
    description:
      "Repair of thrust reversers, cowlings, air inlets, plenums, nozzles and APU mufflers, with in‑house AWS D17.1 welding. FAA Part 145, EASA and UK CAA approved.",
    summary: "Thrust reversers, cowlings, air inlets, plenums, ram airs, nozzles, mufflers and exhausts.",
    intro: [
      "We repair propulsion and nacelle structures for commercial and regional aircraft: thrust reversers and blocker doors, cowlings, air intakes and plenums, exhaust nozzles and APU mufflers.",
      "Heat‑zone parts often need welding, machining and engineering together. We do all three in‑house, so the unit stays on one floor from teardown to release.",
    ],
    components: [
      "Thrust reversers",
      "Blocker doors",
      "Cowlings",
      "Air intakes and inlets",
      "Plenums",
      "Ram air components",
      "Exhaust nozzles",
      "APU mufflers and exhaust systems",
    ],
    details: [
      {
        title: "Certified aerospace welding",
        body: "Titanium, stainless and Inconel heat‑zone parts are welded in‑house to AWS D17.1, the aerospace fusion welding specification, with certified welders, controlled procedures and NDT‑verified results.",
      },
      {
        title: "Obsolete parts, solved",
        body: "When an OEM part is discontinued, we can reverse‑engineer it from a 3D scan, machine fixtures on our own CNC equipment and take the repair through DER approval on an 8110‑3.",
      },
      {
        title: "One floor, start to finish",
        body: "Engineering, machining, welding, inspection and release all happen inside our walls. Nothing ships out for a sub‑tier repair.",
      },
    ],
    images: [
      {
        src: "/images/work/A330 Muffler.jpg",
        alt: "Airbus A330 APU muffler at FLG Technics",
        caption: "Airbus A330 APU muffler · Inconel, titanium flange",
      },
      {
        src: "/images/work/Air Inlet.jpg",
        alt: "Aircraft engine air inlet repaired at FLG Technics",
        caption: "Engine air inlet",
      },
    ],
    faqs: [
      {
        q: "Can you weld titanium and Inconel exhaust parts?",
        a: "Yes. Our certified welders work to AWS D17.1 on titanium, stainless steel and aluminium, with procedure‑controlled manual TIG welding and NDT‑verified results.",
      },
      {
        q: "What if the OEM part is no longer available?",
        a: "We can reverse‑engineer it from a 3D scan, machine it in‑house and have the repair approved by our FAA DER, or develop a PMA replacement.",
      },
      {
        q: "Do you support AOG events?",
        a: "Yes. Our AOG desk is staffed 24/7 at (754) 544‑1991, and most AOG parts ship within 48–72 hours once received.",
      },
    ],
    related: ["aws-d17-1-welding", "der-repair-engineering", "flight-control-surface-repair"],
  },
  {
    slug: "aircraft-doors-cargo-systems",
    name: "Doors & Cargo Systems",
    heading: "Aircraft door and cargo system repair",
    title: "Aircraft Door & Cargo System Repair | FLG Technics",
    description:
      "Repair of cabin doors, landing gear doors, blocker doors, cargo bases, latches and containment for commercial and regional aircraft. FAA Part 145 repair station.",
    summary: "Cabin doors, landing gear doors, blocker doors, cargo bases, latches and containment.",
    intro: [
      "FLG Technics repairs aircraft doors and cargo system components for commercial and regional fleets, under FAA Part 145, EASA and UK CAA approvals.",
      "Door and cargo hardware sees heavy wear and frequent damage. We handle the structure, the latching hardware and the documentation, and you can follow each unit live in the customer portal.",
    ],
    components: [
      "Cabin doors",
      "Landing gear doors",
      "Blocker doors",
      "Cargo bases",
      "Cargo latches",
      "Cargo containment",
      "Access panels",
    ],
    details: [
      {
        title: "Structure and hardware together",
        body: "Door skins, frames and fittings are repaired alongside the latches and mechanisms that go with them, so the unit is returned complete.",
      },
      {
        title: "Machined in‑house",
        body: "Worn or damaged fittings can be machined on our own CNC equipment, and replacement parts can be developed through PMA when the OEM supply is short.",
      },
      {
        title: "Full traceability",
        body: "Material certs, process records, 8130‑3s and any DER 8110‑3s are linked to the work order from receiving to release.",
      },
    ],
    images: [],
    faqs: [
      {
        q: "Which aircraft do you repair doors and cargo systems for?",
        a: `Commercial and regional jets: ${AIRCRAFT}`,
      },
      {
        q: "Can I see where my unit is in the repair?",
        a: "Yes. Every customer gets access to our portal on desktop and mobile, with stage‑by‑stage status, teardown photos, inspection findings and document releases.",
      },
    ],
    related: ["flight-control-surface-repair", "pma-parts-development", "aircraft-transparencies-interiors"],
  },
  {
    slug: "aircraft-transparencies-interiors",
    name: "Transparencies, Windows & Interiors",
    heading: "Aircraft transparency, window and interior repair",
    title: "Aircraft Transparency, Window & Interior Repair | FLG Technics",
    description:
      "Repair of aircraft transparency systems, windows, fuselage panels, interior panels and crew seats. FAA Part 145, EASA and UK CAA approved, Miramar, Florida.",
    summary: "Transparency systems, windows, fuselage and interior panels, crew seats and switches.",
    intro: [
      "We repair aircraft transparencies and windows, fuselage and interior panels, crew seats and cabin switches for commercial and regional operators.",
      "Each repair is released under our FAA Part 145, EASA and UK CAA approvals, with the paperwork and photos available in the customer portal.",
    ],
    components: [
      "Transparency systems",
      "Windows",
      "Fuselage panels",
      "Interior panels",
      "Crew seats",
      "Switches",
    ],
    details: [
      {
        title: "Released under three authorities",
        body: "FAA Part 145, with EASA and UK CAA approvals for work on EU‑ and UK‑registered aircraft.",
      },
      {
        title: "Documented every step",
        body: "Stage‑locked workflows mean work can't advance until the previous step is signed off, so the audit trail is complete when the part ships.",
      },
      {
        title: "Fast written quotes",
        body: "Standard RFQs typically receive a written quote the same business day.",
      },
    ],
    images: [],
    faqs: [
      {
        q: "Do you repair transparencies for EU‑ and UK‑registered aircraft?",
        a: "Yes. Alongside our FAA Part 145 certificate we hold EASA and UK CAA foreign repair station approvals.",
      },
      {
        q: "Do you accept international work?",
        a: "Yes. We service operators worldwide under our FAA, EASA and UK CAA approvals, and handle shipping and customs.",
      },
    ],
    related: ["aircraft-doors-cargo-systems", "flight-control-surface-repair", "der-repair-engineering"],
  },
  {
    slug: "der-repair-engineering",
    name: "DER Repairs & Engineering",
    heading: "FAA DER repairs and in‑house engineering",
    title: "FAA DER Repairs (8110‑3) & Aerospace Engineering | FLG Technics",
    description:
      "In‑house structural and stress engineering with FAA DER authority for 8110‑3 repair approvals, 3D scanning and reverse engineering. FLG Technics, Miramar, FL.",
    summary: "DER‑signed 8110‑3 repair approvals, structural and stress analysis, reverse engineering.",
    intro: [
      "Most MROs ship engineering out. We don't. Design, stress and structural engineering sit under the same roof as the repair floor, with FAA Designated Engineering Representative authority for repair approvals.",
      "We take a repair from concept to a DER‑signed 8110‑3 release with no outsourcing and no waiting on a third party.",
    ],
    components: [
      "DER repair approvals (FAA Form 8110‑3)",
      "Structural and stress analysis",
      "Repair design beyond SRM and CMM limits",
      "3D scanning and reverse engineering",
      "Airbus engineering support",
    ],
    details: [
      {
        title: "Approval without the wait",
        body: "Because the DER works alongside the mechanics, a repair that falls outside the manual can be engineered, approved and carried out without the part leaving the building.",
      },
      {
        title: "Reverse engineering",
        body: "When OEM data or parts aren't available, we 3D‑scan the part, build the CAD, machine fixtures in‑house and document the repair for DER approval.",
      },
      {
        title: "Engineering that feeds production",
        body: "The same team supports PMA development, CNC machining and AWS D17.1 welding, so a design decision turns into a finished part on one site.",
      },
    ],
    images: [
      {
        src: "/images/3d-scanner.jpg",
        alt: "3D scanning an aircraft part for reverse engineering at FLG Technics",
        caption: "3D scanning for reverse engineering",
      },
    ],
    faqs: [
      {
        q: "Do you issue 8110‑3 repair approvals?",
        a: "Yes. Our in‑house engineering team holds FAA Designated Engineering Representative authority and issues 8110‑3 repair approvals.",
      },
      {
        q: "Can you engineer a repair for an obsolete part?",
        a: "Yes. We reverse‑engineer from a 3D scan, then machine, weld and approve the repair in‑house, or develop a PMA replacement.",
      },
    ],
    related: ["pma-parts-development", "aws-d17-1-welding", "flight-control-surface-repair"],
  },
  {
    slug: "pma-parts-development",
    name: "PMA Parts Development",
    heading: "PMA parts development",
    title: "PMA Parts Development & Reverse Engineering | FLG Technics",
    description:
      "End‑to‑end FAA Parts Manufacturer Approval (PMA): opportunity analysis, reverse engineering, FAA submission, testing and production, with in‑house machining.",
    summary: "FAA PMA from opportunity analysis through submission, testing and production.",
    intro: [
      "FLG Technics develops FAA Parts Manufacturer Approval (PMA) parts end to end: from identifying the opportunity through FAA submission, testing and steady‑state production.",
      "PMA work is often paired with reverse engineering and in‑house CNC machining, which gives operators a qualified alternate source when OEM parts are slow, expensive or discontinued.",
    ],
    components: [
      "Opportunity analysis",
      "Reverse engineering and 3D scanning",
      "FAA submission and testing",
      "In‑house CNC machining",
      "Steady‑state production",
      "Qualified alternate sources",
    ],
    details: [
      {
        title: "From idea to approved part",
        body: "We identify where a PMA makes sense, engineer the part, run the FAA submission and testing, and move it into production.",
      },
      {
        title: "Built on our own floor",
        body: "In‑house engineering, CNC machining and AWS D17.1 welding close the loop between design and a finished, approved part.",
      },
    ],
    images: [
      {
        src: "/images/cnc-machine.jpg",
        alt: "CNC machining centre at FLG Technics",
        caption: "In‑house CNC machining",
      },
    ],
    faqs: [
      {
        q: "Do you develop PMA parts?",
        a: "Yes. We develop PMA replacements end to end, from opportunity analysis through testing and steady‑state production.",
      },
    ],
    related: ["der-repair-engineering", "aws-d17-1-welding", "nacelle-thrust-reverser-repair"],
  },
  {
    slug: "aws-d17-1-welding",
    name: "AWS D17.1 Welding & CNC Machining",
    heading: "AWS D17.1 aerospace welding and CNC machining",
    title: "AWS D17.1 Aerospace Welding & CNC Machining | FLG Technics",
    description:
      "Certified AWS D17.1 aerospace welding of titanium, stainless steel and aluminium, plus in‑house CNC machining, at an FAA Part 145 repair station in Miramar, FL.",
    summary: "Certified welding of titanium, stainless and aluminium, and in‑house CNC machining.",
    intro: [
      "We weld titanium, stainless steel and aluminium to AWS D17.1, the aerospace fusion welding specification, wherever a structural heat joint is required.",
      "Welding sits next to our CNC machining, engineering and inspection, so fixtures, repairs and replacement parts are made and verified in one place.",
    ],
    components: [
      "Titanium welding",
      "Stainless steel welding",
      "Aluminium welding",
      "Procedure‑controlled manual TIG",
      "NDT‑verified results",
      "CNC machining of fittings and fixtures",
    ],
    details: [
      {
        title: "Certified welders and procedures",
        body: "Every weld is made by certified welders to controlled procedures, then verified with non‑destructive testing.",
      },
      {
        title: "Machined in‑house",
        body: "Our CNC equipment produces repair fittings, fixtures and PMA parts, including fixtures machined directly from 3D‑scan CAD.",
      },
    ],
    images: [
      {
        src: "/images/cnc-machine.jpg",
        alt: "CNC machining centre at FLG Technics",
        caption: "In‑house CNC machining",
      },
    ],
    faqs: [
      {
        q: "What is AWS D17.1?",
        a: "AWS D17.1 is the aerospace fusion welding specification. We use it for titanium, stainless steel and aluminium.",
      },
    ],
    related: ["nacelle-thrust-reverser-repair", "pma-parts-development", "der-repair-engineering"],
  },
  {
    slug: "aircraft-teardown-storage",
    name: "Aircraft Teardown & Storage",
    heading: "Aircraft teardown and hangar storage",
    title: "Aircraft Teardown & Hangar Storage, Sebring FL | FLG Technics",
    description:
      "Plane‑in‑a‑box aircraft teardown, serviced rotables and LRUs with full traceability, and hangar storage for operators at our Sebring, Florida site.",
    summary: "Plane‑in‑a‑box teardowns, serviced rotables and LRUs, and hangar storage in Sebring, FL.",
    intro: [
      "At our Sebring, Florida site we do plane‑in‑a‑box teardowns: whole‑aircraft disassembly, with units serviced in‑house and returned to the aftermarket ready to go, with full traceability.",
      "We also rent hangar storage to operators and teardown companies that need airside, climate‑controlled space for staged aircraft or inventory.",
    ],
    components: [
      "Whole‑aircraft disassembly",
      "Serviced rotables and LRUs",
      "Structural components",
      "Full traceability",
      "Airside, climate‑controlled hangar storage",
    ],
    details: [
      {
        title: "Teardown to serviceable",
        body: "Parts removed at Sebring can be repaired and certified at our Miramar repair station, so they return to the market serviceable rather than as‑removed.",
      },
      {
        title: "Storage for others",
        body: "Operators and teardown companies can rent airside, climate‑controlled hangar space for staged aircraft or inventory.",
      },
    ],
    images: [
      {
        src: "/images/facility-aerial.jpg",
        alt: "FLG Technics hangar floor",
        caption: "FLG Technics facility",
      },
    ],
    faqs: [
      {
        q: "Where is your teardown site?",
        a: "Teardown and end‑of‑life work happens at our second site in Sebring, Florida. Our primary repair station is in Miramar, Florida.",
      },
    ],
    related: ["flight-control-surface-repair", "nacelle-thrust-reverser-repair", "der-repair-engineering"],
  },
  {
    slug: "aircraft-composite-repair",
    name: "Composite Repair",
    heading: "Aircraft composite repair",
    title: "Aircraft Composite Repair | CFRP & Honeycomb | FLG Technics",
    description:
      "FAA Part 145 composite repair of CFRP skins and honeycomb core on flaps, ailerons, rudders and fairings. Miramar, FL, serving Miami and Fort Lauderdale.",
    summary: "Carbon‑fibre (CFRP) skins, Nomex and aluminium honeycomb core, bonded flight structures.",
    intro: [
      "FLG Technics repairs composite flight structures every week: carbon‑fibre (CFRP) skins over aluminium and Nomex honeycomb on flaps, ailerons, rudders, leading edges and fairings.",
      "Our FAA Part 145 repair station is in Miramar, Florida, between Miami and Fort Lauderdale. All composite work is done under our FAA, EASA and UK CAA approvals, with in‑house engineering and DER authority when damage goes beyond the manual.",
    ],
    components: [
      "Flaps and flap fairings",
      "Ailerons and spoilers",
      "Rudders and elevators",
      "Leading edges",
      "Stabilizer skins",
      "Bonded honeycomb panels",
    ],
    details: [
      {
        title: "CFRP and honeycomb core",
        body: "Damaged honeycomb core is removed and replaced, and carbon‑fibre skins are laid up and cured back to the approved repair scheme, on Airbus and Boeing surfaces alike.",
      },
      {
        title: "Damage mapped, not guessed",
        body: "Structured‑light 3D scanning maps surface damage, wear and deformation to sub‑millimetre precision, so inspection findings become real measurements.",
      },
      {
        title: "Beyond SRM limits",
        body: "When composite damage falls outside the SRM or CMM, our in‑house engineers develop the repair and our FAA DER approves it on an 8110‑3, without the unit leaving the building.",
      },
      {
        title: "Tracked stage by stage",
        body: "Every unit is visible in the customer portal: teardown photos, core removal, lay‑up, inspection and release documents as they're signed.",
      },
    ],
    images: [
      {
        src: "/images/work/A320 Outboard Flap.jpg",
        alt: "Airbus A320 outboard flap after composite repair at FLG Technics",
        caption: "Airbus A320 outboard flap · CFRP, aluminium honeycomb",
      },
      {
        src: "/images/work/A330 Inboard Flap.jpg",
        alt: "Airbus A330 inboard flap after composite repair at FLG Technics",
        caption: "Airbus A330 inboard flap · CFRP, aluminium honeycomb",
      },
    ],
    faqs: [
      {
        q: "What composite materials do you repair?",
        a: "Carbon‑fibre (CFRP) skins over aluminium and Nomex honeycomb core, the construction used on most modern flaps, ailerons, rudders and fairings.",
      },
      {
        q: "Where are you located?",
        a: "2701 SW 145th Ave, Ste 250, Miramar, Florida 33027, in South Florida between Miami and Fort Lauderdale. We also take units shipped in from operators worldwide.",
      },
      {
        q: "How quickly do you quote?",
        a: "Standard RFQs typically receive a written quote the same business day.",
      },
    ],
    related: ["flight-control-surface-repair", "airframe-structural-repair", "der-repair-engineering"],
  },
  {
    slug: "airframe-structural-repair",
    name: "Airframe & Sheet Metal Repair",
    heading: "Airframe structural and sheet metal repair",
    title: "Airframe Structural & Sheet Metal Repair | FLG Technics",
    description:
      "Airframe structural and aerospace sheet metal repair: aluminium 2024‑T3, titanium fittings, wing and stabilizer structures. FAA Part 145 MRO in Miramar, FL.",
    summary: "Aluminium 2024‑T3 structures, titanium fittings, wing and stabilizer structures, CNC‑machined details.",
    intro: [
      "Alongside composites, FLG Technics repairs metallic airframe structures: aluminium 2024‑T3 skins and ribs, titanium fittings, wing and stabilizer structures, doors and cargo components.",
      "75,000 sq ft of structure work sits under one roof in Miramar, Florida, with engineering, CNC machining, certified welding, inspection and release all in‑house.",
    ],
    components: [
      "Wing structures",
      "Horizontal and vertical stabilizers",
      "Leading edges",
      "Doors and hatches",
      "Cargo system structures",
      "Titanium and aluminium fittings",
    ],
    details: [
      {
        title: "Sheet metal and structures",
        body: "Aluminium 2024‑T3 structures and titanium fittings are repaired to the SRM and CMM, or to a DER‑approved repair when damage goes beyond them.",
      },
      {
        title: "In‑house CNC machining",
        body: "Fixtures, tooling and replacement details are machined on our own CNC equipment, so a missing part doesn't stall the repair.",
      },
      {
        title: "Certified welding",
        body: "Where a structure needs welding, our certified welders work to AWS D17.1 on titanium, stainless and aluminium, NDT‑verified.",
      },
      {
        title: "Engineering on the same floor",
        body: "Design, stress and structural engineering sit next to the shop, with FAA DER authority for 8110‑3 repair approvals.",
      },
    ],
    images: [
      {
        src: "/images/work/Vertical Leading Edge.jpg",
        alt: "Vertical stabilizer leading edge after structural repair at FLG Technics",
        caption: "Vertical stabilizer leading edge · Al 2024‑T3",
      },
      {
        src: "/images/work/767 Aileron.jpg",
        alt: "Boeing 767 aileron after structural repair at FLG Technics",
        caption: "Boeing 767 aileron · Al 2024‑T3, CFRP skin",
      },
    ],
    faqs: [
      {
        q: "Which aircraft types do you support?",
        a: `Commercial and regional jets: ${AIRCRAFT}`,
      },
      {
        q: "Can you make a part that's no longer available?",
        a: "Yes. We can reverse‑engineer it from a 3D scan, machine it in‑house and have the repair approved by our FAA DER, or develop a PMA replacement.",
      },
      {
        q: "Do you support AOG events?",
        a: "Yes. Our AOG desk is staffed 24/7 at (754) 544‑1991.",
      },
    ],
    related: ["aircraft-composite-repair", "aws-d17-1-welding", "der-repair-engineering"],
  },
  {
    slug: "airbus-component-repair",
    name: "Airbus Component Repair",
    heading: "Airbus component and structure repair",
    title: "Airbus A320, A330 & A350 Component Repair | FLG Technics",
    description:
      "Repair of Airbus A320 family, A330 and A350 flaps, flight controls, nacelles and APU exhausts. FAA, EASA and UK CAA Part 145. Miramar, near Miami, FL.",
    summary: "A320 family, A330 and A350 flight controls, nacelles, APU exhausts and structures.",
    intro: [
      "FLG Technics repairs structural components for the Airbus A320 family, A330 and A350, from flight control surfaces to nacelle parts and APU exhaust systems.",
      "With EASA (EASA.145.6278) and UK CAA approvals alongside our FAA Part 145 certificate, we release work for EU‑ and UK‑registered Airbus fleets as well as US operators, from our facility in Miramar, Florida, near Miami.",
    ],
    components: [
      "A320 family flaps and flight controls",
      "A330 inboard and outboard flaps",
      "Ailerons, spoilers and rudders",
      "Nacelle and thrust reverser parts",
      "APU mufflers and brackets",
      "Leading edges and stabilizer structures",
    ],
    details: [
      {
        title: "Airbus engineering support",
        body: "Our in‑house engineering team supports Airbus repairs, with FAA DER authority to approve repairs that fall outside the SRM or CMM.",
      },
      {
        title: "Obsolete parts, solved",
        body: "When an OEM part is discontinued, we can reverse‑engineer it from a 3D scan, machine it in‑house and take the repair through DER approval on an 8110‑3.",
      },
      {
        title: "EASA and UK CAA release",
        body: "Our EASA Part‑145 and UK CAA approvals let us release work for EU‑ and UK‑registered aircraft, not just N‑registered fleets.",
      },
    ],
    images: [
      {
        src: "/images/work/A320 Outboard Flap.jpg",
        alt: "Airbus A320 outboard flap repaired at FLG Technics",
        caption: "Airbus A320 outboard flap · CFRP, aluminium honeycomb",
      },
      {
        src: "/images/work/A330 Muffler.jpg",
        alt: "Airbus A330 APU muffler at FLG Technics",
        caption: "Airbus A330 APU muffler · Inconel, titanium flange",
      },
    ],
    faqs: [
      {
        q: "Are you approved for EU‑registered Airbus aircraft?",
        a: "Yes. FLG Technics holds EASA Part‑145 approval EASA.145.6278 and UK CAA approval UK.145.50849, alongside FAA Part 145 certificate F72R832X.",
      },
      {
        q: "Where are you located?",
        a: "Miramar, Florida, in South Florida between Miami and Fort Lauderdale. Units are also shipped in from operators worldwide.",
      },
      {
        q: "How quickly do you quote?",
        a: "Standard RFQs typically receive a written quote the same business day.",
      },
    ],
    related: ["boeing-component-repair", "flight-control-surface-repair", "nacelle-thrust-reverser-repair"],
  },
  {
    slug: "boeing-component-repair",
    name: "Boeing Component Repair",
    heading: "Boeing component and structure repair",
    title: "Boeing 737, 757, 767 & 777 Component Repair | FLG Technics",
    description:
      "Repair of Boeing 737, 747, 757, 767 and 777 flaps, ailerons, rudders, leading edges and nacelle parts. FAA Part 145 repair station in Miramar, FL.",
    summary: "737, 747, 757, 767 and 777 flight controls, leading edges, nacelles and structures.",
    intro: [
      "FLG Technics repairs structural components for the Boeing 737, 747, 757, 767 and 777: flaps, ailerons, rudders, elevators, leading edges, nacelle parts and cargo system structures.",
      "Our FAA Part 145 repair station is in Miramar, Florida, near Miami, with in‑house engineering, DER approvals, CNC machining and AWS D17.1 welding on one floor.",
    ],
    components: [
      "767 ailerons and outboard flaps",
      "737 and 757 flight controls",
      "777 flaps and spoilers",
      "Rudders and elevators",
      "Leading edges",
      "Nacelle and thrust reverser parts",
    ],
    details: [
      {
        title: "Metallic and composite",
        body: "Aluminium 2024‑T3 structures, CFRP skins and titanium fittings: the mix of materials on Boeing control surfaces, all repaired in‑house.",
      },
      {
        title: "DER approvals in‑house",
        body: "When damage falls outside the SRM or CMM, our engineers develop the repair and our FAA DER signs the 8110‑3.",
      },
      {
        title: "Live status",
        body: "Every unit is tracked stage by stage in the customer portal, with photos, findings and documents as they're signed.",
      },
    ],
    images: [
      {
        src: "/images/work/767 Aileron.jpg",
        alt: "Boeing 767 aileron repaired at FLG Technics",
        caption: "Boeing 767 aileron · Al 2024‑T3, CFRP skin",
      },
      {
        src: "/images/work/767 Outboard Flap.jpg",
        alt: "Boeing 767 outboard flap repaired at FLG Technics",
        caption: "Boeing 767 outboard flap",
      },
    ],
    faqs: [
      {
        q: "Which Boeing types do you repair?",
        a: "Boeing 737, 747, 757, 767 and 777 components, along with Airbus and regional types.",
      },
      {
        q: "Do you support AOG events?",
        a: "Yes. Our AOG desk is staffed 24/7 at (754) 544‑1991.",
      },
      {
        q: "How quickly do you quote?",
        a: "Standard RFQs typically receive a written quote the same business day.",
      },
    ],
    related: ["airbus-component-repair", "flight-control-surface-repair", "airframe-structural-repair"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
