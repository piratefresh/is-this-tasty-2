# Is This Tasty

A pnpm monorepo containing the Expo / React Native app.

## Structure

- `apps/mobile`: Expo app, including routes in `src/app`, assets, and app configuration.
- `packages/*`: Workspace location for shared packages when needed.
- `pnpm-workspace.yaml` and `pnpm-lock.yaml`: Workspace configuration and shared dependency lockfile.

## Development

Use Node.js 24 and pnpm 12.5.1. Run commands from the repository root:

```sh
pnpm install
pnpm dev
```

Open Android, iOS, or web with `pnpm android`, `pnpm ios`, or `pnpm web`.

```sh
pnpm check # lint + typecheck + contrast, same as CI
```

To run app-specific commands:

```sh
pnpm --filter @is-this-tasty/mobile exec expo install <package>
pnpm --filter @is-this-tasty/mobile exec expo start --clear
```

`pnpm reset-project` runs the starter reset script inside `apps/mobile`.

## Design system

Native first: controls come from `@expo/ui` (SwiftUI on iOS, Jetpack Compose on Android), currently **@expo/ui 57.0.25 on Expo SDK 57**. Prop names change between releases, so check the installed types before upgrading.

- `src/theme/tokens.ts` is the only place hex values live. ESLint fails on hex literals elsewhere in `src/`.
- `<Text variant="…">` from `src/theme/text.tsx` for all text. Never set font family or size by hand.
- `pnpm --filter @is-this-tasty/mobile check:contrast` checks text tokens against WCAG AA.

**Host rules.** Wrap native views in `ThemedHost` (`src/theme/themed-host.tsx`). It forces dark mode and the violet tint.

- One Host per screen region, not one per control.
- Use `matchContents` for rows and inline controls; `style={{ flex: 1 }}` for full-screen Forms.
- Don't nest Hosts.

## Adding workspaces

Place additional apps under `apps/` and shared packages under `packages/`, each with its own `package.json`. Reference local packages with `workspace:*`, then run `pnpm install` at the repository root.

Expo app configuration and any future EAS configuration belong in `apps/mobile`. Run EAS commands from that directory.
