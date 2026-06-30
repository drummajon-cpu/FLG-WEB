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

  // Forward the lead to EZRP (or any webhook). Set CERT_DOWNLOAD_WEBHOOK to the
  // EZRP ingest URL (e.g. https://ezrp.aero/api/website/cert-lead) and
  // CERT_DOWNLOAD_WEBHOOK_SECRET to a shared secret so EZRP can verify the
  // request came from this site. Failures here never block the visitor's
  // download — we log and move on.
  const webhook = process.env.CERT_DOWNLOAD_WEBHOOK;
  if (webhook) {
    try {
      const headers: Record<string, string> = { "content-type": "application/json" };
      const secret = process.env.CERT_DOWNLOAD_WEBHOOK_SECRET;
      if (secret) headers["x-flg-webhook-secret"] = secret;
      await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify({ source: "flgtechnics.com", kind: "cert_download", ...record }),
      });
    } catch (err) {
      console.error("[cert-download] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
