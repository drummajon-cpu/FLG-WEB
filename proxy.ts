import { NextResponse, type NextRequest } from "next/server";

// flgtechnics.com/inventory is the live parts-stock page, served by FLG's parts
// system. This proxy forwards the page, its API calls and its assets there, so
// the address bar stays on flgtechnics.com.
//
// Every forwarded request reaches the parts system from Vercel's address, so the
// buyer's own IP goes along in x-flg-client-ip, signed with a shared secret in
// x-flg-edge-secret. The parts system trusts that IP only when the secret
// matches, which keeps its per-visitor rate limits and bot check per buyer.
//
// Env (Vercel project settings):
//   INVENTORY_ORIGIN       https origin of the parts system, no trailing slash
//   INVENTORY_EDGE_SECRET  the shared secret (at least 32 characters)
// While either is unset the inventory paths answer 404 rather than forward
// unsigned requests.

const SECRET_HEADER = "x-flg-edge-secret";
const CLIENT_IP_HEADER = "x-flg-client-ip";
const MIN_SECRET_CHARS = 32;

// Request headers that belong to flgtechnics.com and must not travel on.
const DROP_HEADERS = ["cookie", "authorization", SECRET_HEADER, CLIENT_IP_HEADER];

function buyerIp(request: NextRequest): string {
  // Vercel sets both from the connecting client and overwrites anything the
  // client sent, so they are the buyer's real address.
  const real = (request.headers.get("x-real-ip") ?? "").trim();
  if (real) return real;
  return (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
}

// The parts system serves the inventory under /live-inventory: the page itself,
// one page per stocked part number (/inventory/part/<slug>) and the parts sitemap.
// The API and asset paths keep their own names.
function targetPath(pathname: string): string {
  if (pathname === "/inventory") return "/live-inventory";
  if (pathname === "/inventory/sitemap-parts.xml") return "/live-inventory/sitemap-parts.xml";
  if (pathname === "/inventory/part" || pathname.startsWith("/inventory/part/")) {
    return "/live-inventory" + pathname.slice("/inventory".length);
  }
  return pathname;
}

export function proxy(request: NextRequest) {
  const origin = (process.env.INVENTORY_ORIGIN ?? "").trim().replace(/\/+$/, "");
  const secret = (process.env.INVENTORY_EDGE_SECRET ?? "").trim();
  if (!origin.startsWith("https://") || secret.length < MIN_SECRET_CHARS) {
    return new NextResponse("Not found", { status: 404 });
  }

  const target = new URL(targetPath(request.nextUrl.pathname) + request.nextUrl.search, origin);

  const headers = new Headers(request.headers);
  for (const name of DROP_HEADERS) headers.delete(name);
  headers.set(SECRET_HEADER, secret);
  const ip = buyerIp(request);
  if (ip) headers.set(CLIENT_IP_HEADER, ip);

  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  // Only the inventory page, its per-part pages and parts sitemap, its API and its
  // own assets. Everything else on flgtechnics.com is untouched.
  matcher: [
    "/inventory",
    "/inventory/part/:path*",
    "/inventory/sitemap-parts.xml",
    "/api/public/inventory/:path*",
    "/static/flg_technics_logo.png",
    "/static/live-inventory/:path*",
  ],
};
