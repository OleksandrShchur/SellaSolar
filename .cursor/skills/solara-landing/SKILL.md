---
name: solara-landing
description: >-
  Conventions for the SELLA SOLAR solar-installation landing page (React, Vite,
  Tailwind, Framer Motion). Use when editing this repo, adding sections,
  changing copy, restyling the hero day/night dissolve, or updating CTAs,
  calculator, or nav.
---

# SELLA SOLAR landing

Marketing site with React Router. Brand: **SELLA SOLAR**. All user-facing copy is Ukrainian.

## Copy

- Edit strings only in `src/content/site.ts`.
- Do not hardcode marketing text in components.
- Keep `index.html` `lang="uk"` and UAH formatting (`uk-UA`) unless asked otherwise.

## Routes

- `/` — home (landing sections)
- `/policy` — Політика конфіденційності (`privacy` in `site.ts`)
- `/terms-of-use` — Умови використання (`terms` in `site.ts`)

Shared shell: `SiteLayout` (Navbar + Outlet + Footer). Section anchors from any page use `/#section-id` (e.g. `/#quote`). Footer legal links use React Router `Link`.

Static hosts need SPA fallback to `index.html` for the legal paths.

## Sections

Home order is fixed in `src/pages/HomePage.tsx`. New blocks: add a section component under `src/sections/`, export copy from `site.ts`, insert in `HomePage.tsx`, add `id` matching nav/anchors.

Wrap with `Container`. Titles via `SectionHeading`. CTAs via `ContactButton` (or `LiveProjectButton` where already used).

## Hero theme

- State: `HeroTheme` `'morning' | 'night'` in `src/context/HeroThemeContext.tsx`. Default morning.
- Images: `/assets/hero/morning.png` and `/assets/hero/night.png` (files in `public/assets/hero/`).
- Keep both layers on the same `object-position` so the building does not shift.
- Dissolve: night image always visible underneath; morning `motion.img` opacity 1/0. Preload both on mount.
- Navbar colors follow theme until scroll (`useScrolled`); then use the scrolled (light) chrome. Off-home routes always use scrolled chrome.
- Respect `useReducedMotion()` for the image crossfade.

Do not switch the hero to CSS `background-image` or independent crops per theme.

## Visual system

Use tokens from `tailwind.config.js`: `primary`, `primary-light`, `secondary`, `slate-ink`, `surface`, `cream`, `font-heading`, `shadow-soft`, `shadow-glow`.

- Headings: Sora / `font-heading`
- Body: Inter / `font-sans`
- Hero type: `text-fluid-hero`; section titles: `text-fluid-section`
- Motion: Framer Motion; keep existing reduced-motion handling in `src/index.css`

## Calculator

`SavingsCalculator` is the `#quote` target. Formulas live in the component (`computeSavings`); labels and slider range live in `site.ts`. Do not invent a backend.

## Scope

Do not add auth or a CMS unless requested. Prefer small, section-local changes over new global theme systems. Legal routes above are intentional; avoid extra routing unless asked.
