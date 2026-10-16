# Troubleshooting

## Android build: "Minimum supported Gradle version is 9.4.1. Current version is 9.3.1"

```
Failed to apply plugin 'com.android.internal.version-check'.
> Minimum supported Gradle version is 9.4.1. Current version is 9.3.1.
```

**Cause.** `apps/mobile/android/` is generated (Continuous Native Generation) and
gitignored. After an Expo SDK or native dependency update, the generated
`gradle/wrapper/gradle-wrapper.properties` still points at the old Gradle version
while the new Android Gradle plugin needs a newer one.

**Fix.** Regenerate the folder. Don't edit `android/` by hand.

```bash
cd apps/mobile
npx expo prebuild --platform android --clean
pnpm android:build   # from the repo root
```

Check that `android/gradle/wrapper/gradle-wrapper.properties` now shows the
required version in `distributionUrl`.

**Manual fallback.** If you can't prebuild, change `distributionUrl` in that file
to `gradle-9.4.1-bin.zip`. Prebuild will overwrite it, so this is a stopgap.

**Rule of thumb.** After any Expo SDK or native dependency bump, run
`npx expo prebuild --clean` before building.

## Android build: Gradle daemon runs out of metaspace

Warning: "Daemon will be stopped at the end of the build after running out of JVM Metaspace".

Add to `~/.gradle/gradle.properties` (survives prebuild) or `android/gradle.properties`
(overwritten by prebuild):

```
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g
```

## Android build (Windows): reanimated CMake fails with "ninja: error: mkdir(...): No such file or directory"

```
> Task :react-native-reanimated:buildCMakeDebug[x86_64][reanimated] FAILED
ninja: error: mkdir(CMakeFiles/reanimated.dir/M_/Web_Stuff/is-this-tasty/.../filters): No such file or directory
```

**Cause.** Windows 260-character path limit. CMake mirrors the absolute source path
inside its object directory, so a deep repo path (`M:\Web Stuff\is-this-tasty\is-this-tasty-2\node_modules\...`)
overflows it. The SDK's ninja doesn't honour Windows long-path support.

**Fix A (preferred).** Use a newer CMake: SDK CMake 4.1.2 ships ninja 1.12, which
handles long paths (3.22.1 ships ninja 1.10). Install it via Android Studio → SDK
Manager → SDK Tools → CMake, then create `apps/mobile/android/local.properties`:

```
cmake.dir=M\:/Android/Sdk/cmake/4.1.2
```

Delete stale caches (`node_modules/*/android/.cxx`) and rebuild. `prebuild --clean`
deletes `android/`, so re-create `local.properties` after every prebuild.

**Fix B.** Build from a short path. Either move/clone the repo somewhere short
(e.g. `M:\it2`), or map a drive letter and work from it:

```powershell
subst X: "M:\Web Stuff\is-this-tasty\is-this-tasty-2"
cd X:\
npx expo prebuild --platform android --clean   # regenerate so cached paths are short
pnpm android:build
```

Also enable long paths (admin PowerShell, then reboot):
`Set-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem LongPathsEnabled 1`
