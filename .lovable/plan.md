## Settings page

Add a `/settings` route wired to the sidebar Settings button. The page uses a left sub-nav (tabs) so we can grow it over time without redesigning.

```text
/settings
 ├─ Profile          ← default
 ├─ Account
 ├─ Preferences
 ├─ Notifications
 └─ Farm defaults
```

### What to put in v1

**Profile**
- Full name (editable)
- Email (read-only for now — needs real auth to change safely)
- Avatar placeholder (initials)

**Account**
- Change password (current / new / confirm) — stub with toast since auth is mocked
- Log out button
- Delete account (danger zone, disabled stub)

**Preferences**
- Theme: Light / Dark / System
- Units: Metric (ha, mm, °C) / Imperial (ac, in, °F)
- Language: English (only option for now)
- Date format: DD/MM/YYYY vs MM/DD/YYYY

**Notifications**
- Toggle: High-severity alerts (in-app)
- Toggle: Daily irrigation summary (in-app)
- Toggle: Weather warnings (in-app)
- Email notifications — disabled toggle with "Requires backend" hint

**Farm defaults**
- Default farm shown on dashboard (dropdown of farms)
- Default crop type for new fields
- Default soil type for new fields

### Files

- **New** `src/pages/Settings.tsx` — tabbed layout using shadcn `Tabs`, sections above as cards.
- **New** `src/lib/preferences.ts` — `localStorage`-backed get/set for units, theme, date format, notification toggles, farm defaults. Typed `Preferences` interface + `usePreferences()` hook.
- **Edit** `src/components/AppSidebar.tsx` — wrap the Settings `SidebarMenuButton` in a `NavLink` to `/settings` with active-state styling matching the other items.
- **Edit** `src/App.tsx` — add `<Route path="/settings" element={<Settings />} />` inside the `AppLayout` route.
- **Edit** `src/lib/auth.ts` — extend `AuthUser` with optional `firstName` / `lastName` (kept backwards-compatible with `fullName`) and add `updateUser(partial)` helper.

### Behavior

- All writes are local (localStorage) and show a success toast. Anything that genuinely needs a backend (email change, real password change, email notifications, account deletion) is visible but clearly marked "Requires backend" and disabled, so the UI is ready when Lovable Cloud is enabled later.
- Form validation with `zod` (matches existing Login/Register pattern): name 2–100 chars, password ≥6 chars + must match confirm.
- Theme toggle applies immediately by toggling the `dark` class on `<html>`.
- Unit + date-format preferences are stored now; wiring them into FieldCard / Predictions / WeatherStrip can be a follow-up task.

### My recommendation for v1 scope

Start with **Profile + Preferences + Notifications**. They're fully functional with the current mock auth, deliver visible value, and don't require backend wiring. Account (password change) and Farm defaults can ship in a quick follow-up once we decide on Lovable Cloud.
