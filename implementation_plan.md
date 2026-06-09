# Implementation Plan

## Goal Description
Create a new page in the existing React/Tanstack project that reproduces the UI and functionality of `code.html`. The page will be built with:
- **React + TypeScript**
- **Shadcn UI** components for polished styling
- **Tanstack Router** for navigation
- **Tanstack Query** for data fetching and caching
- **Tanstack Form** for score input handling
- **Tanstack Table** for standings tables
- **Sprite sheet** (`public/flags.png`) for flag icons.

## User Review Required
> **IMPORTANT**: The project currently does not have the required libraries installed:
> - `@tanstack/react-router`
> - `@tanstack/react-query`
> - `@tanstack/react-form`
> - `@tanstack/react-table`
> - `shadcn-ui` (or the individual component packages)
>
> Please confirm that I may add these dependencies (using `pnpm add`) and run the install before I proceed.

## Open Questions
- Preference for dark‑mode vs light‑only theme?
- Confirm we should render flags using a CSS sprite (you mentioned a sprite) rather than individual image URLs.
- Desired route naming: `/groups/:groupId` (e.g., `/groups/A`) or another pattern?

## Proposed Changes
---
### Packages & Configuration
- **Modify `package.json`** – add the Tanstack and Shadcn dependencies.
- **Run** `pnpm add @tanstack/react-router @tanstack/react-query @tanstack/react-form @tanstack/react-table shadcn-ui`.
- **Update `tailwind.config.ts`** – extend with custom fonts, colors, and a utility for the flag sprite (`.flag-{code}`).
- **Ensure `vite.config.ts`** serves `public/flags.png` (already the default for Vite public folder).

---
### Router
- **[MODIFY] `src/router.tsx`** – add a route entry:
```tsx
{ path: "/groups/:groupId", component: lazy(() => import("@/routes/_protected/groups.$groupId")) }
```
- This will load the new page component.

---
### New Page Component
- **[NEW] `src/routes/_protected/groups.$groupId.tsx`** – Implements:
  - Group selector tabs (desktop sidebar & mobile carousel).
  - Standings table built with `@tanstack/react-table` and Shadcn `Table` components.
  - Fixtures list with editable scores using `@tanstack/react-form` and Shadcn `Input`.
  - Data management via `@tanstack/react-query` (queries for teams, fixtures, and computed standings).
  - Flag rendering using a CSS class generated from a sprite map.

---
### Utilities
- **[NEW] `src/lib/flags.ts`** – Export a map of country codes to sprite offsets (e.g., `{ MEX: { x: 0, y: 0 }, RSA: { x: -32, y: 0 }, ... }`).
- **[NEW] `src/lib/data.ts`** – Move the static `TEAMS` and `FIXTURES` objects from the HTML script to TypeScript constants.
- **[NEW] `src/lib/standings.ts`** – Pure function `calculateStandings(group: string, fixtures: Fixture[], teams: Team[])` replicating the original JS logic.

---
### Styles
- **[MODIFY] `src/styles.css`** – Add:
```css
.flag { width: 24px; height: 16px; background-image: url('/flags.png'); background-size: cover; }
.flag-mex { background-position: 0 0; }
.flag-rsa { background-position: -32px 0; }
/* generated for each country */
```
- Add any custom Shadcn theme extensions (colors, fonts) as described in the `SKILLS` markdown.

## Verification Plan
### Automated
- Run `pnpm dev` and navigate to `/groups/A`. Verify no console errors and that the page displays the group overview.
- Edit a fixture score; ensure the standings table updates automatically (React Query invalidates and refetches).
- Run a simple Jest/React Testing Library snapshot test for the standings table.

### Manual
- Test on desktop and mobile breakpoints.
- Switch between groups using tabs and ensure data updates.
- Confirm each flag displays correctly from the sprite.
- Verify dark‑mode toggle (if enabled) works.

---
*Once you approve the dependency installation and confirm the design choices, I will proceed with the actual code changes.*
