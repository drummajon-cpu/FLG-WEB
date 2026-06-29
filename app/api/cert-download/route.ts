import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Captures the email a visitor enters before downloading a certificate PDF.
 *
 * The record is written to the server logs (visible in Vercel → Logs). To
 * persist or route these leads elsewhere, set the CERT_DOWNLOAD_WEBHOOK env
 * var to any webhook URL (Zapier, Make, an EZRP endpoint, etc.) — the record
 * is forwarded there as JSON with zero code changes.
 */
export async function POST(req: NextRequest) {
  let body: { email?: string; cert?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const cert = (body.cert || "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const record = {
    email,
    cert,
    at: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? "",
    ip: req.headers.get("x-forwarded-for") ?? "",
  };

  console.log("[cert-download]", JSON.stringify(record));

  const webhook = process.env.CERT_DOWNLOAD_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("[cert-download] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
