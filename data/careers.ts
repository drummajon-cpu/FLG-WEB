// The open roles on /careers. Edit here: the page and the Apply form's role list
// both read this file. `key` is what the form posts; the careers backend accepts
// exactly these keys (aircraft_mechanic, inspector, aerospace_management,
// quality, general), so add a new key there before adding a role here.

export type RoleKey = "aircraft_mechanic" | "inspector" | "aerospace_management" | "quality" | "general";

export type CareerRole = {
  key: RoleKey;
  title: string;
  tag: string;
  summary: string;
  requirements: string[];
};

export const roles: CareerRole[] = [
  {
    key: "aircraft_mechanic",
    title: "Aircraft Mechanic",
    tag: "Hiring now",
    summary:
      "Repair and overhaul flight structures, transparencies and cargo-system components in our FAA Part 145 shop. Work to the component maintenance manual, from teardown and inspection to reassembly and test.",
    requirements: [
      "Experience in an FAA Part 145 repair station or airline maintenance",
      "Comfortable working from CMMs, IPCs and work orders",
      "Hand-tool and precision-measurement skills",
      "FAA A&P certificate preferred, not required",
    ],
  },
  {
    key: "inspector",
    title: "Inspector (QA/QC)",
    tag: "Hiring now",
    summary:
      "Inspect incoming, in-process and final work against the manual and our repair station procedures, and keep the records that let every part be released with confidence.",
    requirements: [
      "FAA A&P certificate; IA a plus",
      "Inspection experience in an FAA Part 145 environment",
      "Strong documentation habits and attention to detail",
      "Familiarity with release paperwork (FAA 8130-3, EASA Form 1)",
    ],
  },
  {
    key: "aerospace_management",
    title: "Aerospace Management",
    tag: "Experienced",
    summary:
      "Lead people, schedules and customers in a busy MRO: production planning, turnaround times and the day-to-day running of the floor.",
    requirements: [
      "Several years of management experience in aviation maintenance or MRO",
      "Working knowledge of FAA Part 145 operations",
      "Clear communicator with customers and the shop floor",
    ],
  },
  {
    key: "quality",
    title: "Quality",
    tag: "Experienced",
    summary:
      "Own parts of our quality system: audits, procedures, training records and corrective actions across our FAA, EASA and UK CAA approvals.",
    requirements: [
      "Quality-system experience in an aviation repair station or manufacturer",
      "Knowledge of FAA Part 145 requirements; EASA Part 145 a plus",
      "Audit, root-cause and corrective-action experience",
    ],
  },
  {
    key: "general",
    title: "Don't see your role?",
    tag: "General application",
    summary:
      "Send us your résumé anyway. We keep applications on file and reach out when a role that fits opens up.",
    requirements: ["Tell us what you do and what you're looking for"],
  },
];

export const roleTitle = (key: string): string => roles.find((r) => r.key === key)?.title ?? "General application";

// The address shown when applications are closed or something goes wrong. The
// backend's config answer may replace it with its own (one source of truth).
export const CAREERS_FALLBACK_EMAIL = "info@flgtechnics.com";
