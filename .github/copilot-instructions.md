# Copilot Instructions

## Language and tone

- Use NZ English (e.g. "colour", "behaviour", "initialise").
- Keep language plain and technical. No marketing speak.

## Project overview

A small React + TypeScript demo showing a slide-out menu driven by an XState state machine with Framer Motion animations. Styled with styled-components.

### Key dependencies

- [XState](https://xstate.js.org/) v4 — state machine library
- [Framer Motion](https://www.framer.com/motion/) — animation
- [styled-components](https://styled-components.com/) — CSS-in-JS
- [Mousetrap](https://craig.is/killing/mice) — keyboard shortcuts
- Build tooling: Vite with `@vitejs/plugin-react`

### Structure

- `src/` — all application and test code
  - `index.tsx` — entry point, renders the app into the DOM
  - `App.tsx` — root component, holds menu status state
  - `Menu.tsx` — state machine definition, animation logic, keyboard handling
  - `Button.tsx`, `Container.tsx`, `Content.tsx`, `MenuStatus.tsx` — presentational components
  - `App.test.tsx` — integration tests (Testing Library)
  - `setupTests.ts` — test framework setup (imports `@testing-library/jest-dom/vitest`)
  - `styles.css` — global styles
- `index.html` — HTML entry point (root of project, references `/src/index.tsx`)
- `public/` — static assets
- `vite.config.ts` — Vite and Vitest configuration
- `.github/workflows/ci.yml` — CI pipeline

## Code style

- Prettier is configured: no semicolons, single quotes (`.prettierrc.json`).
- Use `* as React` imports (e.g. `import * as React from 'react'`).
- Prefer named exports over default exports.
- Use `React.FC` for component types.
- Keep components small and focused.

## TypeScript

- Strict mode is enabled.
- Always type component props with an explicit interface.
- Avoid `any` — use specific types or `unknown` where needed.

## Testing

- Tests use React Testing Library with `@testing-library/jest-dom/vitest` matchers.
- Test runner is Vitest (configured in `vite.config.ts`).
- Test files sit alongside source files with a `.test.tsx` suffix.
- Prefer `getByTestId` / `getByRole` queries.
- Use `waitFor` for async state transitions.

## Commits

- Use plain imperative sentences (e.g. "Add menu tests", "Fix animation timing").
- Keep commits small and focused on a single change.
