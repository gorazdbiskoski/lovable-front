# Sidebar Navigation Implementation

Add a left-side collapsible icon sidebar to all authenticated routes, plus three new list pages and a Predictions page.

## Structure

```text
🌿 SmartDrop                  [≡]
─────────────────────────────────
MAIN
 🏠 Dashboard         /dashboard
 🌾 Farms             /farms
 🌱 All Fields        /fields
 📈 Predictions       /predictions   ← new
 🔔 Alerts      [3]   /alerts

YOUR FARMS
 📍 North Valley      /farm/:id
 📍 Sunrise Acres     /farm/:id
 ➕ Add Farm          (opens dialog)
─────────────────────────────────
 ⚙️ Settings
 👤 [Fullname]        (logout menu)
```

## New files

- **`src/components/AppSidebar.tsx`** — shadcn `Sidebar` with `collapsible="icon"`. Three groups: Main nav, Your Farms (dynamic from `mockData.farms`, capped at 5 with "Show all"), Footer (Settings + user dropdown with logout via `src/lib/auth.ts`). Uses `NavLink` for active state with `bg-muted text-primary font-medium`. High-severity alert badge on Alerts item.
- **`src/components/AppLayout.tsx`** — wraps `SidebarProvider` + `<AppSidebar />` + slim sticky header (containing `SidebarTrigger`, page title, notification bell) + `<Outlet />`. Replaces per-page headers.
- **`src/pages/Farms.tsx`** — full farms list, reuses `FarmCard`, includes Add Farm button.
- **`src/pages/Fields.tsx`** — flat list of every field across all farms, reuses `FieldCard`, shows parent farm name as subtitle.
- **`src/pages/Predictions.tsx`** — aggregated 7-day irrigation predictions across all fields, grouped by farm, reusing prediction logic/components from `FieldDetail`.
- **`src/pages/Alerts.tsx`** — full alert history list, reuses `AlertCard`, filterable by severity.

## Edited files

- **`src/App.tsx`** — wrap authenticated routes (`/dashboard`, `/farm/:farmId`, `/field/:fieldId`, plus new `/farms`, `/fields`, `/predictions`, `/alerts`) inside a layout route using `<AppLayout />`. Login (`/`) and Register stay outside.
- **`src/pages/Index.tsx`** — remove duplicate header (now provided by layout); keep greeting, alerts preview card, farms grid.
- **`src/pages/FarmDetail.tsx`** & **`src/pages/FieldDetail.tsx`** — drop local headers; rely on `AppLayout` header.

## Behavior

- **Collapsed mode**: 56px icon strip, labels hidden, tooltips on hover.
- **Trigger**: `SidebarTrigger` in top header — always visible regardless of state.
- **Mobile**: shadcn auto-switches to off-canvas Sheet.
- **Active route**: highlighted via `NavLink` `activeClassName`.
- **Auth-only**: layout wraps only authenticated routes; `/` and `/register` keep existing `AuthLayout`.

## Technical notes

- Uses existing `@/components/ui/sidebar` and `@/components/NavLink` — no new deps.
- Sidebar farm list and alert badge read from `src/data/mockData.ts`, same source as dashboard, so they stay in sync.
- User fullname pulled from `src/lib/auth.ts` (already stores it from earlier work).
- No changes to auth flow, map, or weather logic.
