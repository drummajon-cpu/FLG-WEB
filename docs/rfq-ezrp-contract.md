# Website repair RFQ → EZRP: the contract

The quote form on flgtechnics.com (`components/RfqForm.tsx`) sends each repair quote
request to EZRP so that a customer RFQ is created automatically, and the repairs desk
is emailed. This file is what the website expects of EZRP. **The website side is built.
The EZRP side is not built yet:** until it is, and until `NEXT_PUBLIC_RFQ_EZRP=1` is set in Vercel, the form does not call
EZRP at all and opens the visitor's email app addressed to repairs@flgtechnics.com.

It deliberately mirrors the careers intake (`/api/public/careers/*`) that EZRP already
serves, so the same edge checks, signing and bot protection can be reused.

EZRP's existing website RFQ, `POST /api/public/inventory/rfq`, is not used for this. It
is the parts-sales intake for the Live Inventory page: it requires part-number lines,
accepts no photos, has no serial number, aircraft, damage or AOG fields, and
acknowledges from sales@.

## Transport

- Browser → `flgtechnics.com/api/public/rfq/*` → `proxy.ts` → `INVENTORY_ORIGIN` (EZRP).
- The proxy drops cookies and `Authorization`, adds `x-flg-edge-secret` (shared secret)
  and `x-flg-client-ip` (the visitor's IP). Same as the inventory and careers paths.
- Responses must be `Cache-Control: no-store`.

## Upload size

The form scales each photo down in the browser (JPEG, 2000 px on the long side, then
1400 px if needed) and keeps the whole request under **3.5 MB**. Vercel documents a 4 MB
request-body limit for routing middleware, and Next.js keeps only the first 10 MB of a
proxied body, so raw phone photos would not arrive. A photo the browser cannot decode
(HEIC outside Safari) is sent as it is; if the request still exceeds the budget, the
form uses email instead. EZRP therefore receives mostly `image/jpeg` files of a few
hundred KB each, with a `.jpg` name, rather than the visitor's originals.

## `GET /api/public/rfq/config`

```json
{ "open": true, "site_key": "0x4AAA…", "max_photo_bytes": 10485760, "max_photos": 8 }
```

- `open: false`, a non-200, or a body that is not JSON: the form uses email.
- `site_key`: Cloudflare Turnstile site key. Empty string means no widget is shown and
  `turnstile_token` is sent empty.
- `max_photo_bytes` (per file) and `max_photos` default to 10 MB and 8 if absent.

## `POST /api/public/rfq/submit`

`multipart/form-data`:

| Field | Required | Notes |
| --- | --- | --- |
| `client_key` | yes | UUID made once per page load. Make the submit idempotent on it. |
| `turnstile_token` | if a site key was given | Verify with Cloudflare, using `x-flg-client-ip`. |
| `locale` | yes | `en` or `es`: the language the visitor used. |
| `name` | yes | |
| `company` | yes | |
| `email` | yes | |
| `phone` | no | |
| `part_number` | no | |
| `serial_number` | no | |
| `aircraft_type` | no | One of: Airbus A320 family, Airbus A330, Airbus A350, Boeing 737, Boeing 747, Boeing 757, Boeing 767, Boeing 777, Regional jet, Other. Empty if not chosen. |
| `damage` | yes | Free text, multi-line. |
| `aog` | yes | `yes` or `no`. |
| `website` | no | Honeypot. Refuse the submit if it is not empty. |
| `photos` | no | Repeated file field, zero or more images (JPEG, PNG, HEIC/HEIF, WebP). |

Success, HTTP 200:

```json
{ "ok": true, "rfq_id": "RFQ-12345" }
```

`rfq_id` is shown to the visitor as their reference, so send the number a person at FLG
would recognise.

Refusals, any non-200 status, body `{ "reason": "…" }`:

| `reason` | What the form does |
| --- | --- |
| `invalid` with `"fields": ["email", "damage", …]` (the field names above) | Marks those fields. With an empty or missing `fields` (EZRP could not read the request), falls back to email. |
| `turnstile` | Asks the visitor to redo the security check. |
| `photo_type` | Says a file is not an accepted photo. |
| `photo_too_large`, `too_many_photos` | Asks the visitor to remove some. |
| anything else (`closed`, `rate_limited`, `unavailable`, a 404, a 5xx, a network error) | Falls back to the email hand-off, so the request is not lost. |

## What EZRP should do with a submit

1. Create the customer RFQ, marked as coming from the website, with the AOG flag, and
   attach the photos to it.
2. Email repairs@flgtechnics.com with the request (subject prefixed `AOG` when it is one),
   so the desk gets the same email it gets today.
3. Answer `{ok, rfq_id}` once the RFQ is recorded; send the email after, so a slow mail
   send cannot turn a recorded RFQ into an error.

Whether the visitor also gets an acknowledgement email is EZRP's choice; the form
already shows a confirmation with the reference.

## Switching it on (Vercel)

1. EZRP serves the two paths above and its own flag for the intake is on.
2. Set `NEXT_PUBLIC_RFQ_EZRP=1` in the Vercel project and redeploy. Until then the form
   never calls EZRP and always uses email.

`INVENTORY_ORIGIN` and `INVENTORY_EDGE_SECRET` already exist for the inventory and
careers paths; nothing else is needed.
