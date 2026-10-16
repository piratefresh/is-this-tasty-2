# STO-621 review

Implemented the docs site and preview/recording support. Native recordings and
device accessibility sign-off remain outstanding; this ticket is not complete.

## Verification

- `pnpm check`: lint, typechecks, UI tests, preview registry/recording tests,
  contrast, and generated CSS freshness pass.
- `pnpm docs:build`: all four component pages and four guide pages build.
- `pnpm previews:export`: all 22 documented examples export successfully.
- Browser: search returns component and guide results; preview tabs support
  keyboard navigation and show honest missing-recording states.
- Exported StarRating input: Tab then ArrowRight changes 3.5 to 4.
- Docs tested at 1280px and 390px widths; no horizontal document overflow at 390px.
- Standalone exported Button preview: axe 4.12.1 reports 28 passes and zero
  violations. Rating input: 29 passes, zero violations, manual contrast checks
  requested for decorative glyphs/animated digits.
- Generated props use readable token-colored code after a contrast failure
  was found in the library's default syntax styling.
- Final Button docs content audit (`#nd-page`): 31 passes, zero violations,
  zero incomplete checks, including the named preview frame landmarks.

## Evidence

- [Desktop docs](button-desktop.png)
- [Mobile docs](button-mobile.png)
- [Exported Button example](web-export.png)
- [Exported rating input](rating-web.png)

The screenshots use an Expo web export served on 127.0.0.1:8082 and a production
docs build with `PREVIEW_ORIGIN=http://127.0.0.1:8082`. The existing Metro dev
server returned incomplete/stale styling in this session, so export evidence
is used here. Development-server styling still needs a fresh-session check.

## Remaining review

- No iOS runtime is available on this Windows machine. VoiceOver, Dynamic Type,
  actual tint, cold-start appearance, and native playback are not verified.
- An Android emulator and adb are present, but Maestro is not installed.
  The generated Button flows and recording subprocesses have not been run
  against a device. TalkBack and actual haptics are unverified.
- Native videos are absent. The recording script needs a device run before
  it can be considered verified end to end. iOS recording requires macOS.
- Existing Button web sizing appears shorter than its documented 46pt height:
  `h-11.5` has no generated spacing token. This PR preserves existing components;
  the docs now make this visible.
- Each preview has its own accessible landmark name. Sidebar overlap causes
  incomplete contrast checks in the full-page audit. The full-page audit also
  flags Fumadocs' desktop table-of-contents links as outside a landmark;
  the component content audit is clean, but a whole-site accessibility pass
  is not claimed.
- Existing GenreTag overflow text produces an axe ARIA-label warning on web.
  This is in the previously shipped component and is not changed here.
- Fumadocs' search highlight CSS emits two optimizer warnings during build;
  component search was exercised successfully.
