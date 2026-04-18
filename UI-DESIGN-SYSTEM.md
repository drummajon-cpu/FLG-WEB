# FLG / EZRP Shared Design System

Reference doc for bringing EZRP.aero (splash + internal ERP app) into visual coherence with flgtechnics.com. Paste-ready for a new Claude Code session inside the EZRP repo.

---

## Context

- **FLG Technics** (aerospace MRO, Miramar FL, 1998) and **EZRP.aero** (MRO ERP software) are sibling projects run by the same operator. EZRP was built on FLG's shop floor and is the internal tooling that powers FLG's operations.
- FLG's public site was rebuilt in 2026-04 with a dark, technical, blueprint aesthetic — cyan accent, Space Grotesk display, monospace eyebrows, subtle motion, lots of engineering-drawing details.
- EZRP currently uses emoji icons, HR dividers, and bland defaults. Goal: inherit FLG's visual language so prospects feel the continuity.

---

## Stack recommendation for EZRP refresh

If the EZRP splash isn't already on this stack:

- **Next.js 15+ (App Router)** + TypeScript
- **Tailwind CSS**
- **framer-motion** for scroll/hover animations
- **lucide-react** for icons (NEVER emoji)
- **clsx** for conditional classes
- **next/font/google**: Inter (body), Space Grotesk (display), JetBrains Mono (mono)

```bash
npm i next react react-dom framer-motion lucide-react clsx
npm i -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer
```

---

## Design Tokens

### Color palette (Tailwind config extension)

```ts
colors: {
  ink: {
    950: "#05070A",  // page bg
    900: "#0A0D12",  // card bg
    800: "#0F141B",
    700: "#171D26",
    600: "#232B37",
    500: "#2E3744",
  },
  accent: {
    DEFAULT: "#7DD3FC",  // cyan — primary brand
    bright:  "#38BDF8",
    deep:    "#0EA5E9",
  },
  teal: {
    DEFAULT: "#2EB9A8",  // heritage teal (1999 FLG logo)
    bright:  "#5ED4C3",
    deep:    "#0D7D7A",
  },
}
```

Text colors: `text-slate-50` (strong), `text-slate-200` (default), `text-slate-400` (muted), `text-slate-500` (labels/mono).

### Typography

- **Display** (Space Grotesk): h1/h2/h3 headings. Tracking `-0.02em` to `-0.03em`. Weights 600–700.
- **Sans** (Inter): body text. Default.
- **Mono** (JetBrains Mono): eyebrows, labels, coordinates, technical annotations. Almost always `uppercase` + `tracking-[0.2em]` to `tracking-[0.22em]`, size 10–11px.

Common patterns:
- Eyebrow: `font-mono text-[11px] tracking-[0.22em] uppercase text-accent` (or slate-500)
- Hero headline: `font-display text-[clamp(2.6rem,7vw,5.75rem)] font-semibold tracking-[-0.03em]`
- Section title: `font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em]`

### Spacing

Section padding: `py-28 md:py-36` (standard). `py-14` for dense strips.
Card padding: `p-6` small, `p-7 md:p-8` medium, `p-8 md:p-12` large feature.
Max width: `max-w-7xl mx-auto px-6`.

### Easing (motion)

```css
--ease-out-expo: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out-expo: cubic-bezier(0.77, 0, 0.175, 1);
```

Use `ease-out-expo` for most UI entries/exits. Duration: 200–300ms for UI, 400–700ms for feature reveals. **Never use ease-in on UI elements** (sluggish). **Never use bounce** (dated).

### Button press feedback

```css
.press {
  transition: transform 160ms var(--ease-out-expo), ...;
}
.press:active { transform: scale(0.97); }
```

Apply `.press` to every clickable. Small scale-down on press = the interface "listening."

### Grid / blueprint backgrounds

```css
.bg-grid {
  background-image:
    linear-gradient(rgba(125,211,252,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(125,211,252,0.06) 1px, transparent 1px);
  background-size: 56px 56px;
}
.bg-grid-fine { /* same but 24px 24px */ }
.mask-radial {
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}
```

Use grid bg + radial mask on most sections. Evokes engineering-drawing feel.

---

## Component Patterns (copy-paste ready)

### Section header

```tsx
<div>
  <div className="flex items-center gap-3">
    <span className="w-8 h-px bg-accent/50" />
    <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">
      Eyebrow
    </span>
  </div>
  <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-slate-100 max-w-3xl">
    Title copy.
  </h2>
  <p className="mt-4 max-w-2xl text-lg text-slate-400 leading-relaxed">
    Supporting description.
  </p>
</div>
```

### Feature card

```tsx
<div className="group relative rounded-2xl border border-white/5 bg-ink-900/50 hover:bg-ink-900/80 hover:border-white/10 transition-colors duration-200 p-7 overflow-hidden">
  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-ink-800 border border-accent/20 flex items-center justify-center">
    <Icon className="w-5 h-5 text-accent" />
  </div>
  <h3 className="mt-5 font-display text-xl font-semibold text-slate-100 tracking-tight">Title</h3>
  <p className="mt-2.5 text-slate-400 leading-relaxed">Body copy.</p>
  {/* Hover glow */}
  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
       style={{ background: "radial-gradient(500px circle at 30% 0%, rgba(125,211,252,0.06), transparent 50%)" }} />
</div>
```

### Primary CTA

```tsx
<a href="#contact"
   className="press group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent hover:bg-accent-bright text-ink-950 font-medium shadow-[0_0_0_1px_rgba(125,211,252,0.4),0_12px_40px_-10px_rgba(56,189,248,0.5)]">
  Request a Quote
  <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
</a>
```

### Secondary CTA

```tsx
<a href="#" className="press inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-slate-200 font-medium">
  Explore
</a>
```

### Status badge with live dot

```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
  </span>
  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-300">
    Live
  </span>
</div>
```

### Corner brackets (the blueprint flourish)

```tsx
<div aria-hidden className="absolute top-4 left-4 w-5 h-5 border-l border-t border-accent/40" />
<div aria-hidden className="absolute top-4 right-4 w-5 h-5 border-r border-t border-accent/40" />
<div aria-hidden className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-accent/40" />
<div aria-hidden className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-accent/40" />
```

Put on hero, feature images, mockup frames.

---

## Anti-Patterns — DO NOT DO

Per impeccable (Peter Bakaus) + Emil Kowalski's taste:

| Ban | Why |
| --- | --- |
| **Emoji as icons** | Read as unprofessional / template-like. Use lucide-react. |
| **HR dividers** | Dated. Use background tints, spacing, subtle gradients. |
| **Gradient text (`bg-clip-text text-transparent`)** | Generic SaaS look. Use a single solid accent color on the emphasized word. |
| **Pure black + pure gray** | Flat and lifeless. Tint all neutrals slightly (the `ink` palette has a subtle blue shift). |
| **Bounce / elastic easing** | Dated, childish. Use custom cubic-bezier ease-out. |
| **ease-in on UI** | Makes interactions feel sluggish. Always ease-out. |
| **Transition on `all`** | Animates unintended properties. Specify: `transition-[transform,opacity,border-color]`. |
| **scale(0) entry animations** | Nothing in the real world appears from nothing. Start from scale(0.95) + opacity:0. |
| **transform-origin: center on popovers** | Popovers should scale from their trigger. Modals are the exception. |
| **Animating common keyboard actions** | If users do it 100+ times/day, no animation. |
| **Side-stripe borders** | Looks like a ribbon. Use full border + tint. |
| **Overused fonts (Arial, plain Inter)** | Inter is fine for body, but display should be distinctive (Space Grotesk). |
| **Card nesting 3+ deep** | Flatten. Use color tint variation instead. |

---

## EZRP Refactor Priority (when you start)

### Splash (ezrp.aero/splash)

1. Replace emoji feature icons → lucide-react (`Workflow`, `Boxes`, `ClipboardCheck`, `FileText`, `LineChart`, `Plug`)
2. Nuke HR dividers → replace with spacing + subtle bg tint shifts between sections
3. Add FLG-style section header pattern (eyebrow + hairline + title)
4. Swap any light bg → dark ink palette
5. Typography pass: Space Grotesk for headings, Inter for body, mono for labels
6. Add corner brackets + grid bg to hero
7. Add live pulse dot next to "No vaporware" — reinforces "running right now"
8. Design a proper EZRP logo mark (distinctive, not just airplane symbol). Consider: a waveform echoing FLG's streaks but distinct

### Internal ERP app

1. Audit current views — screenshot every major screen
2. Apply the same color tokens + section patterns
3. Replace any stock Bootstrap/MUI components with Tailwind versions using the patterns above
4. Add the technical/blueprint details to key dashboards (corner brackets, mono labels, live dots)
5. Make the mechanic portal feel like a cockpit (technical, precise, live data vibes)

---

## Starter prompt for new Claude Code session

Paste this as the first message when you open a new session inside the EZRP repo:

```
I'm refreshing EZRP.aero's splash + internal ERP UI to match the visual system we 
built for flgtechnics.com tonight. The design system is documented at 
C:/Users/Juice/FLG WEBSITE/UI-DESIGN-SYSTEM.md — read that first.

Goals for this session:
1. Audit the current EZRP splash at ezrp.aero/splash
2. Refactor to inherit FLG's visual language (dark theme, cyan accent, blueprint 
   feel, Space Grotesk + Inter + JetBrains Mono, lucide icons, corner brackets, 
   grid backgrounds, mono eyebrows)
3. Keep all current copy and structure — we're only changing visuals
4. Then audit screenshots of the internal ERP I'll share and refresh those too

Stack: Next.js + Tailwind + framer-motion + lucide-react. 
Start by reading the design system MD, then list the files/components you need 
to see before starting.
```

---

## Handy references for that session

- FLG source (for reference / copy-paste): `C:/Users/Juice/FLG WEBSITE/components/`
- FLG live preview: `localhost:3000`
- Deploy guide: `C:/Users/Juice/FLG WEBSITE/DEPLOY.md`
- Logo asset (can be reused, tinted for EZRP): `public/images/flg-logo.png`
- Impeccable design skill family: already installed in `~/.claude/skills/` (auto-available in any new session)

---

# App UI Patterns (for the internal ERP)

Everything above is marketing-site oriented. This section covers patterns for the functional ERP — dashboards, work orders, tables, forms, alerts.

## App-specific principles

1. **Density > decoration.** Users are on the app 8 hours/day. Information on screen is more valuable than whitespace.
2. **Keyboard-first.** Every action reachable without a mouse. Command palette is the central nervous system.
3. **Live feel.** Status changes, counters, activity feeds update in real-time, not on page refresh.
4. **Trust loud, delight quiet.** No celebratory animations on successful saves. Do use them sparingly on first-time-only flows (welcome tour, onboarding complete).
5. **States everywhere.** Every data-loading view has: loading, empty, error, success, and the happy path. Design all five.
6. **Respect the screen.** Don't force modals when an inline edit works. Don't break user context unless necessary.

## Density tokens

Add these to Tailwind or use as CSS custom props:

```css
--row-height-compact:      32px;
--row-height-comfortable:  44px;  /* default */
--row-height-spacious:     56px;
--input-height:            36px;
--button-height:           36px;
```

Density toggle in the app header should swap `--row-height-comfortable` globally.

## App shell layout

```tsx
<div className="flex h-screen bg-ink-950 text-slate-200">
  <Sidebar />                {/* fixed left, collapsible */}
  <div className="flex-1 flex flex-col min-w-0">
    <AppHeader />           {/* breadcrumbs, search, user menu */}
    <main className="flex-1 overflow-y-auto px-6 py-5">
      {children}
    </main>
  </div>
</div>
```

### Sidebar

- Dark (`bg-ink-900`), 240px wide, collapsible to 60px (icon-only)
- Sections with mono eyebrow labels (`MAIN`, `OPERATIONS`, `ADMIN`)
- Active item: `bg-accent/10 border-l-2 border-accent text-slate-100`
- Hover: `hover:bg-white/[0.03] text-slate-100`
- Icon + label rows, 12px vertical padding for comfortable, 8px for compact
- Bottom area: account switcher + settings

### App header

```tsx
<header className="h-14 border-b border-white/5 bg-ink-900/80 backdrop-blur-sm flex items-center gap-4 px-5">
  <Breadcrumbs />
  <div className="flex-1" />
  <CommandSearch />          {/* ⌘K — see below */}
  <UserMenu />
</header>
```

## Data tables

The most important component in any ERP. Get this right.

```tsx
<table className="w-full text-sm">
  <thead className="sticky top-0 bg-ink-900/95 backdrop-blur border-b border-white/10 z-10">
    <tr>
      <th className="px-3 py-2 text-left font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
        Work Order
      </th>
      {/* ...more headers */}
    </tr>
  </thead>
  <tbody>
    {rows.map((r, i) => (
      <tr key={r.id}
          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
        <td className="px-3 py-2.5 font-mono text-[12px] text-slate-400">{r.id}</td>
        <td className="px-3 py-2.5 text-slate-200">{r.part}</td>
        <td className="px-3 py-2.5"><StatusChip status={r.status} /></td>
        <td className="px-3 py-2.5 tabular-nums text-slate-400">{r.pct}%</td>
      </tr>
    ))}
  </tbody>
</table>
```

**Rules:**
- `tabular-nums` on all numeric columns so digits align
- Mono font for IDs, timestamps, codes
- Sticky header with `backdrop-blur` and slight transparency
- Row hover: `bg-white/[0.02]` — barely visible, just enough
- Selected row: `bg-accent/5 border-l-2 border-accent`
- Zebra striping: DON'T. Use clean white/5 dividers instead. Zebra feels dated.
- Empty state: center vertically, icon + text + CTA
- Loading: show skeleton rows (3–5), pulse animation
- Row action buttons appear on hover only (`opacity-0 group-hover:opacity-100`)

## Status chips

```tsx
const statusStyles = {
  open:     "bg-slate-500/10 text-slate-300 border-slate-500/30",
  progress: "bg-accent/10 text-accent border-accent/30",
  review:   "bg-amber-500/10 text-amber-400 border-amber-500/30",
  hold:     "bg-red-500/10 text-red-400 border-red-500/30",
  done:     "bg-teal/10 text-teal-bright border-teal/30",
};

<span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono tracking-wider uppercase ${statusStyles[status]}`}>
  <span className="w-1.5 h-1.5 rounded-full bg-current" />
  {label}
</span>
```

## Forms

### Text input

```tsx
<div className="flex flex-col gap-1.5">
  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
    Part Number
  </label>
  <input
    type="text"
    className="h-9 px-3 rounded-md bg-ink-800/60 border border-white/10 text-slate-100 placeholder:text-slate-600 font-mono text-sm
               focus:border-accent/60 focus:bg-ink-800/80 focus:outline-none focus:ring-2 focus:ring-accent/20
               transition-[border-color,background-color,box-shadow] duration-150"
    placeholder="D572‑25300"
  />
  <span className="text-xs text-slate-500">Must match OEM catalog format</span>
</div>
```

**Variants:**
- Error: `border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20` + red helper text
- Success: `border-teal/50` + teal `✓` icon on right
- Disabled: `bg-ink-900/40 text-slate-600 cursor-not-allowed`

### Select / dropdown

Use **Radix UI Select** — accessible, keyboard-nav, matches the style. Never use native `<select>` in an ERP — too limited.

### Textarea

Same as input but `min-h-[88px]` and `py-2` instead of fixed height.

### Checkbox / radio

Use **Radix UI Checkbox** + **RadioGroup**. Style the indicator:
```tsx
<Checkbox.Root className="h-4 w-4 rounded border border-white/15 bg-ink-800 data-[state=checked]:bg-accent data-[state=checked]:border-accent">
  <Checkbox.Indicator><Check className="h-3 w-3 text-ink-950" /></Checkbox.Indicator>
</Checkbox.Root>
```

### Toggle / switch

```tsx
<Switch.Root className="w-9 h-5 rounded-full bg-ink-700 data-[state=checked]:bg-accent transition-colors">
  <Switch.Thumb className="block w-4 h-4 rounded-full bg-white translate-x-0.5 data-[state=checked]:translate-x-4 transition-transform" />
</Switch.Root>
```

## Navigation patterns

### Breadcrumbs

```tsx
<nav className="flex items-center gap-1.5 text-sm">
  <a href="/" className="text-slate-500 hover:text-slate-300">Workspace</a>
  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
  <a href="/wo" className="text-slate-500 hover:text-slate-300">Work Orders</a>
  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
  <span className="font-mono text-slate-300">WO‑260812</span>
</nav>
```

### Tabs

```tsx
<Tabs.List className="flex items-center gap-1 border-b border-white/5">
  <Tabs.Trigger value="overview"
    className="relative px-3 py-2 text-sm text-slate-400 hover:text-slate-200
               data-[state=active]:text-accent
               data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-accent
               transition-colors">
    Overview
  </Tabs.Trigger>
</Tabs.List>
```

### Command palette (⌘K)

This is the backbone of a power-user ERP. Use [cmdk](https://cmdk.paco.me/) or headless `kbar`.

- Triggered by `⌘K` / `Ctrl+K`
- Fuzzy search across: work orders, part numbers, customers, actions ("Create WO", "Open dashboard"), nav items
- Grouped results with mono section labels
- Recently-used items persisted to localStorage
- ESC to close, enter to execute

## Modals + drawers

### Modal (centered)

Use **Radix UI Dialog**. Motion + Emil principles:

```tsx
<Dialog.Overlay className="fixed inset-0 bg-ink-950/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out duration-200" />
<Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl border border-white/10 bg-ink-900 shadow-2xl
                          data-[state=open]:animate-in data-[state=closed]:animate-out
                          data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
                          data-[state=open]:zoom-in-[0.97] data-[state=closed]:zoom-out-[0.97]
                          duration-200 ease-out">
  ...
</Dialog.Content>
```

Transform origin: **center** for modals (they're not anchored to a trigger).

### Drawer (slide-in from side)

Use [vaul](https://vaul.emilkowal.ski/) (by Emil Kowalski). Perfect for mobile + desktop. Use for:
- Editing a work order inline without losing context
- Filter panels
- Detail views that don't need a full page

## Toasts

Use **Sonner** (by Emil Kowalski — matches our aesthetic perfectly).

```tsx
toast.success("Work order released", { description: "WO‑260812 · A330 Inboard Flap" });
toast.error("Save failed", { description: "Check part number format" });
toast("Clocked in", { icon: <Clock className="w-4 h-4 text-accent" /> });
```

**Rules:**
- Success toasts: 3s auto-dismiss
- Error toasts: persistent until dismissed (users need to read them)
- Never show a toast for a trivial action the user initiated (e.g. typing). Toasts are for background/async events.

## Empty / loading / error states

### Empty state

```tsx
<div className="flex flex-col items-center justify-center py-16 px-6 text-center">
  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
    <Inbox className="w-5 h-5 text-accent" />
  </div>
  <h3 className="mt-4 font-display text-lg font-semibold text-slate-200">No work orders yet</h3>
  <p className="mt-1.5 text-sm text-slate-500 max-w-sm">
    Create your first WO to start tracking repairs from receiving through release.
  </p>
  <button className="press mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-ink-950 font-medium text-sm">
    <Plus className="w-4 h-4" /> Create Work Order
  </button>
</div>
```

### Skeleton loading

```tsx
<div className="space-y-2">
  {[0, 1, 2, 3].map(i => (
    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-ink-900/40 animate-pulse">
      <div className="h-4 w-24 rounded bg-white/5" />
      <div className="h-4 w-48 rounded bg-white/5" />
      <div className="h-4 w-16 rounded bg-white/5 ml-auto" />
    </div>
  ))}
</div>
```

Use `animate-pulse` (Tailwind built-in) with subtle white/5 blocks. Three rows is enough — don't fake 20 skeletons.

### Error state

```tsx
<div className="flex flex-col items-center py-12 text-center">
  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
    <AlertCircle className="w-5 h-5 text-red-400" />
  </div>
  <h3 className="mt-4 font-display text-lg font-semibold text-slate-200">Couldn't load work orders</h3>
  <p className="mt-1.5 text-sm text-slate-500 max-w-sm">{error.message}</p>
  <button className="press mt-5 px-4 py-2 rounded-md border border-white/10 hover:border-white/20 text-sm">
    Retry
  </button>
</div>
```

## Data viz (charts)

Use **Recharts** with custom theming to match:

```ts
const chartTheme = {
  background: "transparent",
  grid:       "rgba(255,255,255,0.05)",
  axis:       "rgba(148,163,184,0.4)",
  text:       "#94A3B8",
  textLabel:  "#64748B",
  series:     ["#7DD3FC", "#2EB9A8", "#F59E0B", "#EF4444"],  // cyan, teal, amber, red
  tooltipBg:  "#0A0D12",
  tooltipBorder: "rgba(125,211,252,0.3)",
};
```

**Rules:**
- No 3D charts. Ever.
- Pie charts only when comparing 2–4 slices. Never more.
- Bar/line charts: grid lines at 5% opacity, axis labels in mono font
- Tooltips: dark bg + cyan border, mono font for values
- Load in animation: 400ms ease-out-expo, not bounce
- For live dashboards, animate updates with 300ms transitions, not pop-in

## Keyboard shortcuts

Essential shortcuts for an ERP:

| Key | Action |
| --- | --- |
| `⌘K` / `Ctrl+K` | Open command palette |
| `/` | Focus search |
| `⌘N` | New work order (context-aware) |
| `⌘S` | Save |
| `⌘⏎` | Submit form |
| `Esc` | Close modal / drawer |
| `J` / `K` | Next / prev row in tables |
| `⌘B` | Toggle sidebar |
| `?` | Open keyboard shortcuts help |

Show available shortcuts in tooltips (`⌘K · Search`) — teaches users the shortcuts without a separate onboarding.

## Responsive density

Desktop ERP ≠ mobile ERP. On mobile:
- Tables → card stacks
- Sidebar → bottom sheet or hamburger
- Modals → fullscreen drawers (vaul handles this)
- Forms → one field per row, larger touch targets (`h-11` instead of `h-9`)
- Hide dense data → reveal on tap

Don't cram a desktop dashboard on mobile. Redesign it.

## Real-time feel

The EZRP story is "live from the shop floor." The UI must sell that:

- **Live data indicator** on dashboards (pulsing dot, "Syncing" label)
- **Optimistic updates** — show state change immediately, rollback on error
- **WebSocket / SSE** for status changes, not polling
- **Relative timestamps** ("2m ago") that update every 30s
- **Activity feed** that scrolls as events happen (not reloads)
- **Presence** — who else is viewing this WO right now (small avatars top-right)
- **Live counts** — "4 mechanics clocked in" updates when someone clocks in/out

## Accessibility (non-negotiable for ERP)

- Every input has a `<label>` (or `aria-label` if visually hidden)
- Focus rings: `focus:ring-2 focus:ring-accent/30` — visible, not disabled
- Minimum contrast: 4.5:1 for body text, 3:1 for large text
- All actions reachable by keyboard (no click-only interactions)
- Respect `prefers-reduced-motion` — reduce but don't kill all motion
- Screen reader announcements for toasts + live regions
- Color never the only indicator (status chips have icons + color + text)

## Sonner + Vaul + cmdk stack

All three match this aesthetic out of the box (built by Emil Kowalski / Paco Coursey):

```bash
npm i sonner vaul cmdk
```

They're free, open-source, tiny, and feel right. Use them over building from scratch.

---

## TL;DR: the whole system in one sentence

**Dark ink palette + cyan/teal accents + Space Grotesk display + JetBrains Mono labels + lucide icons + ease-out motion + corner-bracket technical details + real-time live feel — applied to every surface, marketing and app alike.**

