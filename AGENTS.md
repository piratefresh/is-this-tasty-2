This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

# Code style

Follow [`docs/CODE_STYLE.md`](docs/CODE_STYLE.md) across the monorepo.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Monorepo layout

- Use pnpm from the repository root. The Expo app lives in `apps/mobile`; paths such as `src/app`, `app.json`, and native directories above are relative to that app.
- Run `pnpm check` from the root (lint, typecheck, contrast). CI runs the same steps.
- Run app-specific CLI commands with `pnpm --filter @is-this-tasty/mobile exec <command>`.
- Add apps under `apps/*` and shared packages under `packages/*`. Use `workspace:*` for local package dependencies.

## Shared UI package

- Foundations live in `packages/ui`, not `apps/mobile/src/theme`. App code imports components and tokens only from `@is-this-tasty/ui`.
- `packages/ui/src/theme/tokens.ts` owns design values. The package owns the no-hex ESLint rule used by both workspaces; only its `src/theme/` is exempt.
- Contrast runs as `pnpm --filter @is-this-tasty/ui check:contrast`, included in root `pnpm check` and CI.
- Native runtime libraries used by UI (`@expo/ui`, `expo-font`, Reanimated, etc.) belong in its `peerDependencies` when used, and are installed in `apps/mobile` with `pnpm --filter @is-this-tasty/mobile exec expo install <package>`. The app owns font loading; do not duplicate native runtime dependencies in the UI package.

### How to add a component

1. Start at `packages/ui/src/<name>/`, copying `src/text/`: `index.tsx`, `examples/*.tsx`, and `docs.mdx`.
2. Implement native behavior; native wrappers also get `index.web.tsx` (Base UI + Tailwind after STO-625). Custom React Native components such as Text use one implementation across platforms.
3. Export the public component and props from `packages/ui/src/index.ts`; keep internals private.
4. Add one named example per state and one `<Preview>` per example in `docs.mdx`, with usage and do/don't guidance. Catalog/docs tooling consumes those examples.
5. Run `pnpm check` and exercise iOS, Android, and web; report screenshots and accessibility results, or explicit device limitations.

## Agent skills

### Issue tracker

Track issues and specs in Linear's “Is this tasty” project under Brains (STO).
See `docs/agents/issue-tracker.md`.

### Triage labels

Use needs-triage, needs-info, ready-for-agent, ready-for-human, and wontfix.
See `docs/agents/triage-labels.md`.

### Domain docs

Use multiple contexts, indexed by the root CONTEXT-MAP.md.
See `docs/agents/domain.md`.
