// Builds the mailto: link the quote form hands to the visitor's email app.
//
// The email goes to FLG's own repairs desk, so its subject, labels and yes/no values
// are ALWAYS English, whatever language the visitor's page is in. Only the visitor's
// own words (name, company, damage description) stay as typed. A request sent from the
// Spanish site says so, so the desk knows why the description may be in Spanish.
//
// Kept free of imports and of anything but erasable types, so tests/rfqMailto.test.mjs
// can load it directly with Node and check the URL as a string. Nothing here opens a
// mail client; the form does that with the returned URL.

export type RfqFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  partNumber: string;
  serialNumber: string;
  aircraft: string;
  damage: string;
  aog: "yes" | "no";
};

export type RfqMailto = { subject: string; body: string; url: string };

export function buildRfqMailto(
  fields: RfqFields,
  photoNames: string[],
  locale: "en" | "es",
  to: string
): RfqMailto {
  const aog = fields.aog === "yes";
  const subject = [aog ? "AOG" : "", "Quote request", fields.partNumber.trim(), fields.company.trim()]
    .filter(Boolean)
    .join(" · ");
  const lines = [
    `Name: ${fields.name.trim()}`,
    `Company: ${fields.company.trim()}`,
    `Email: ${fields.email.trim()}`,
    `Phone: ${fields.phone.trim() || "-"}`,
    `Part number: ${fields.partNumber.trim() || "-"}`,
    `Serial number: ${fields.serialNumber.trim() || "-"}`,
    `Aircraft type: ${fields.aircraft || "-"}`,
    `Is this an AOG? ${aog ? "Yes" : "No"}`,
    "",
    "Description of damage:",
    fields.damage.trim(),
  ];
  if (photoNames.length) lines.push("", `Damage photos: ${photoNames.join(", ")}`);
  if (locale === "es") lines.push("", "Submitted from the Spanish site (flgtechnics.com/es).");
  const body = lines.join("\n");
  return {
    subject,
    body,
    url: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
