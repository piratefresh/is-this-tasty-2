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

Build and run Android or iOS with `pnpm android` or `pnpm ios`. These commands compile the native app and start Metro; they require the corresponding local native toolchain. Use `pnpm web` for web.

Use `pnpm android:build` to select the Android emulator or device explicitly.

The workspace uses pnpm's hoisted node linker to keep Windows native build paths short enough for the Android NDK tooling.

```sh
pnpm check # lint + typecheck + UI behavior tests + contrast + token CSS freshness, same as CI
```

To run app-specific commands:

```sh
pnpm --filter @is-this-tasty/mobile exec expo install <package>
pnpm --filter @is-this-tasty/mobile exec expo start --clear
```

`pnpm reset-project` runs the starter reset script inside `apps/mobile`.

## Design system

Native first: controls come from `@expo/ui` (SwiftUI on iOS, Jetpack Compose on Android), currently **@expo/ui 58.0.18 on Expo SDK 58**. Prop names change between releases, so check the installed types before upgrading.

Web wrappers use **@base-ui/react 1.9.0** and **tailwind-variants 3.3.1**,
with Tailwind CSS **4.3.3** through Expo's PostCSS support. These runtime
packages are UI peers supplied by the app; import them only from web files.

- `packages/ui/src/theme/tokens.ts` is the source of truth for colors, spacing, radii, and fonts. The package owns the shared ESLint no-hex rule; only its `src/theme/` is exempt.
- Import `Text`, `ThemedHost`, and tokens from `@is-this-tasty/ui`, never app-local theme paths. Use `<Text variant="…">` for all text.
- `pnpm --filter @is-this-tasty/ui check:contrast` checks text tokens against WCAG AA.
- The app owns font loading and native dependencies. The UI package declares the native libraries it uses as peers; install them in the app with `pnpm --filter @is-this-tasty/mobile exec expo install <package>`. Do not add native runtime dependencies to the UI package.
- Expo SDK 58 resolves workspace source through its automatic Metro monorepo support; no custom Metro config is needed.

**Host rules.** Wrap native views in `ThemedHost` from `@is-this-tasty/ui`. It forces dark mode and the violet tint.

- One Host per screen region, not one per control.
- Use `matchContents` for rows and inline controls; `style={{ flex: 1 }}` for full-screen Forms.
- Don't nest Hosts.

### Web styling

- Web implementations use Base UI + `tv()` with token classes only. No arbitrary values such as `bg-[#…]`; shared ESLint rules reject arbitrary hex utilities.
- `apps/mobile/global.css` imports Tailwind and the generated theme, and scans the app and UI package explicitly. The root layout imports it once; Expo ignores global stylesheets on native. No NativeWind, Uniwind, or custom Metro config.
- Run `pnpm tokens` after editing `packages/ui/src/theme/tokens.ts`, then commit `src/theme/tokens.css` too. `pnpm check` checks freshness without rewriting files; CI also regenerates and rejects a diff.
- Names become kebab-case: `color.tintInk` is `bg-tint-ink`, `space[5]` is `p-5` (22px), `radius.sheet` is `rounded-sheet`, and `font.display` is `font-display`. Category colors include `text-category-rose-text`. Tailwind's default color, spacing, radius, and font namespaces are replaced by our tokens.
- `/dev/catalog` includes a web-only Base UI switch to prove pointer/keyboard interaction and token styling. Remove `packages/ui/src/examples/` and its registry import when STO-609 supplies the real Switch examples. Native uses the empty web-example registry and never imports the smoke component.

### Development catalog

Open **Open component catalog** on the development home screen, or navigate
directly to `/dev/catalog`. The scrollable catalog shows token-derived color
swatches (including category colors), spacing, radii, and every registered example.
Release builds redirect this route to `/` and omit the home-screen link.

The registry is exported separately as `@is-this-tasty/ui/catalog`; production
components should import the normal `@is-this-tasty/ui` entry point.

### How to add a component

1. Copy the reference layout in `packages/ui/src/text/` into `packages/ui/src/<name>/`: `index.tsx`, `examples/*.tsx`, and `docs.mdx`.
2. Implement the native component. For native wrappers, add `index.web.tsx` using Base UI + `tv()` with token classes. Custom RN components such as Text share their implementation with web.
3. Export the public component and props from `packages/ui/src/index.ts`. Consumers import only from `@is-this-tasty/ui`; keep internal helpers private.
4. Add one named example per state and a `<Preview>` for each in `docs.mdx`, plus usage and do/don't guidance. Export `{ name, examples: [{ title, Component }] }` from the component's `examples/index.ts`, then add that group to `packages/ui/src/catalog.ts`. No app-side list changes are needed. The docs renderer supplies `Preview`.
5. Run `pnpm check`, exercise the examples on iOS, Android, and web, and record screenshots plus accessibility checks or explicit device limitations.

`Text` has seven examples, one per typography variant. Its React Native implementation already supports web, so it needs no duplicate `index.web.tsx`.

`GenreTag` and `GenreTagList` provide display-only category chips. Lists show the
first three genres plus `+N` overflow and wrap with an 8pt gap. Unknown genres
use the accessible fallback hue. The catalog includes current hues, unknown,
overflow, and narrow wrapping examples; usage lives in
`packages/ui/src/genre-tag/docs.mdx`. Contrast checks cover every category label
and the fallback on the chip fill.

`StarRating` shares its React Native implementation across iOS, Android, and web.
It supports clipped half stars, optional values/counts, and controlled input with
selection haptics. Tap to rate, or hold for 200ms before scrubbing so normal row
swipes remain available. Inputs expose screen-reader adjustment actions and web
arrow/Home/End keys. The app supplies `GestureHandlerRootView` and the native
runtime peers. See `packages/ui/src/star-rating/docs.mdx` and the catalog's six
examples, including a swipeable list row. Run its behavior checks with
`pnpm --filter @is-this-tasty/ui test`.

## Adding workspaces

Place additional apps under `apps/` and shared packages under `packages/`, each with its own `package.json`. Reference local packages with `workspace:*`, then run `pnpm install` at the repository root.

Expo app configuration and any future EAS configuration belong in `apps/mobile`. Run EAS commands from that directory.
