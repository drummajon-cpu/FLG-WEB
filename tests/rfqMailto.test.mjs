// Run with: npm test   (Node 23.6+ loads the .ts module directly)
//
// Checks the quote form's email hand-off as a URL string. It never opens a mail
// client and never submits the form.
import test from "node:test";
import assert from "node:assert/strict";
import { buildRfqMailto } from "../lib/rfqMailto.ts";

const base = {
  name: "Ana Ruiz",
  company: "Aero Sur",
  email: "ana@example.com",
  phone: "",
  partNumber: "D572-25300",
  serialNumber: "",
  aircraft: "Airbus A330",
  damage: "Abolladura en el revestimiento inferior.",
  aog: "yes",
};
const TO = "repairs@flgtechnics.com";
const decode = (url) => {
  const q = new URLSearchParams(url.slice(url.indexOf("?") + 1).replace(/\+/g, "%2B"));
  return { subject: q.get("subject"), body: q.get("body") };
};

test("addressed to the repairs desk, with an encoded subject and body", () => {
  const { url } = buildRfqMailto(base, [], "en", TO);
  assert.ok(url.startsWith("mailto:repairs@flgtechnics.com?subject="));
  assert.ok(!/[\n ]/.test(url), "no raw spaces or newlines in the URL");
});

test("a request from the Spanish site is still written in English", () => {
  const { url } = buildRfqMailto(base, ["foto1.jpg", "foto2.jpg"], "es", TO);
  const { subject, body } = decode(url);
  assert.equal(subject, "AOG · Quote request · D572-25300 · Aero Sur");
  for (const label of ["Name: Ana Ruiz", "Company: Aero Sur", "Email: ana@example.com", "Phone: -", "Part number: D572-25300", "Serial number: -", "Aircraft type: Airbus A330", "Is this an AOG? Yes", "Description of damage:", "Damage photos: foto1.jpg, foto2.jpg"]) {
    assert.ok(body.includes(label), `body has "${label}"`);
  }
  for (const spanish of ["Solicitud", "Nombre", "Empresa", "Número", "Teléfono", "¿Es un AOG?", "Sí", "Fotos del daño", "Tipo de aeronave", "Descripción"]) {
    assert.ok(!subject.includes(spanish) && !body.includes(spanish), `no Spanish label "${spanish}"`);
  }
  // The visitor's own words are kept exactly as typed.
  assert.ok(body.includes("Abolladura en el revestimiento inferior."));
  assert.ok(body.includes("Submitted from the Spanish site (flgtechnics.com/es)."));
});

test("a request from the English site carries no language note", () => {
  const { body } = buildRfqMailto(base, [], "en", TO);
  assert.ok(!body.includes("Spanish site"));
  assert.ok(!body.includes("Damage photos"));
});

test("not an AOG: no AOG prefix, and the answer reads No", () => {
  const { subject, body } = buildRfqMailto({ ...base, aog: "no", partNumber: "" }, [], "es", TO);
  assert.equal(subject, "Quote request · Aero Sur");
  assert.ok(body.includes("Is this an AOG? No"));
  assert.ok(body.includes("Part number: -"));
});
