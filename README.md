# Is This Tasty

A pnpm monorepo containing the Expo / React Native app.

## Structure

- `apps/mobile`: Expo app, including routes in `src/app`, assets, and app configuration.
- `packages/ui`: Shared design tokens, typography, themed native host, and component examples/docs.
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

- `packages/ui/src/theme/tokens.ts` is the source of truth for colors, spacing, radii, and fonts. The package owns the shared ESLint no-hex rule; only its `src/theme/` is exempt.
- Import `Text`, `ThemedHost`, and tokens from `@is-this-tasty/ui`, never app-local theme paths. Use `<Text variant="…">` for all text.
- `pnpm --filter @is-this-tasty/ui check:contrast` checks text tokens against WCAG AA.
- The app owns font loading and native dependencies. The UI package declares the native libraries it uses as peers; install them in the app with `pnpm --filter @is-this-tasty/mobile exec expo install <package>`. Do not add native runtime dependencies to the UI package.
- Expo SDK 57 resolves workspace source through its automatic Metro monorepo support; no custom Metro config is needed.

**Host rules.** Wrap native views in `ThemedHost` from `@is-this-tasty/ui`. It forces dark mode and the violet tint.

- One Host per screen region, not one per control.
- Use `matchContents` for rows and inline controls; `style={{ flex: 1 }}` for full-screen Forms.
- Don't nest Hosts.

### Development catalog

Open **Open component catalog** on the development home screen, or navigate
directly to `/dev/catalog`. The scrollable catalog shows token-derived color
swatches (including category colors), spacing, radii, and every registered example.
Release builds redirect this route to `/` and omit the home-screen link.

The registry is exported separately as `@is-this-tasty/ui/catalog`; production
components should import the normal `@is-this-tasty/ui` entry point.

### How to add a component

1. Copy the reference layout in `packages/ui/src/text/` into `packages/ui/src/<name>/`: `index.tsx`, `examples/*.tsx`, and `docs.mdx`.
2. Implement the native component. For native wrappers, add `index.web.tsx` using Base UI + Tailwind once the web layer lands (STO-625). Custom RN components such as Text share their implementation with web.
3. Export the public component and props from `packages/ui/src/index.ts`. Consumers import only from `@is-this-tasty/ui`; keep internal helpers private.
4. Add one named example per state and a `<Preview>` for each in `docs.mdx`, plus usage and do/don't guidance. Export `{ name, examples: [{ title, Component }] }` from the component's `examples/index.ts`, then add that group to `packages/ui/src/catalog.ts`. No app-side list changes are needed. The docs renderer supplies `Preview`.
5. Run `pnpm check`, exercise the examples on iOS, Android, and web, and record screenshots plus accessibility checks or explicit device limitations.

`Text` has seven examples, one per typography variant. Its React Native implementation already supports web, so it needs no duplicate `index.web.tsx`.

## Adding workspaces

Place additional apps under `apps/` and shared packages under `packages/`, each with its own `package.json`. Reference local packages with `workspace:*`, then run `pnpm install` at the repository root.

Expo app configuration and any future EAS configuration belong in `apps/mobile`. Run EAS commands from that directory.
