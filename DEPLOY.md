# Deploying flgtechnics.com to Vercel

## One‑time setup

### 1. Create a Vercel account
- Go to https://vercel.com/signup
- Sign up with GitHub (recommended — enables git‑based deploys) or email

### 2. Install the Vercel CLI (locally, from this folder)

```bash
npm i -g vercel
```

### 3. Deploy (first time)

From inside `C:\Users\Juice\FLG WEBSITE`:

```bash
vercel
```

It will:
- Ask to log in (opens browser)
- Ask "Set up and deploy?" → **Yes**
- Ask for scope (your account) → pick
- Ask to link to existing project → **No** (new project)
- Project name → `flg-technics-web` (or whatever)
- Directory → `./` (current)
- Want to modify settings? → **No** (Next.js auto‑detected)

Takes ~90 seconds. You get a preview URL like `flg-technics-web-xxx.vercel.app`.

### 4. Deploy to production

```bash
vercel --prod
```

This promotes the latest build to the main project URL.

## Custom domain (flgtechnics.com)

### 1. Add the domain in Vercel
- Open your project → **Settings → Domains**
- Add `flgtechnics.com` and `www.flgtechnics.com`

### 2. Update DNS at your registrar
Wherever you own `flgtechnics.com` (GoDaddy, Namecheap, Cloudflare, etc.):

- **Apex (flgtechnics.com)**: create an `A` record pointing to `76.76.21.21`
- **WWW**: create a `CNAME` record pointing to `cname.vercel-dns.com`

Propagation: 5 min – 24 hours. Vercel auto‑issues a free SSL cert once DNS resolves.

### 3. Point the old site
If the current flgtechnics.com is on a different host, coordinate the DNS flip for low downtime. Test on the vercel.app URL first.

## Iterating

Once connected to GitHub, every `git push` to `main` auto‑deploys to production. Every branch/PR gets its own preview URL.

If you don't want GitHub yet, keep using `vercel --prod` from the CLI.

## Env vars

None required for the current site. If we later add analytics, contact‑form backend, etc., they go in:
- Vercel dashboard → **Settings → Environment Variables**

## Quick sanity checklist before flipping DNS

- [ ] `npm run build` passes locally (already verified)
- [ ] Open the vercel.app preview on your phone — navigation, gallery, portal modal all work
- [ ] Test the `tel:` links (phone + AOG) open the dialer on mobile
- [ ] Test `mailto:repairs@flgtechnics.com` opens mail client
- [ ] Paste the vercel.app URL into WhatsApp/LinkedIn — OG image preview renders
- [ ] Check favicon shows in browser tab
- [ ] Lighthouse on mobile ≥ 90 perf / 100 a11y (Chrome DevTools → Lighthouse)
