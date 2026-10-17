import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Canvas, Fill, Shader, Skia, useClock, type Uniforms } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

import { color } from "../theme/tokens";
import { buildBeamPalette, type BorderBeamProps } from "./border-beam-palette";
import { BORDER_BEAM_SHADER } from "./border-beam-shader";

const effect = Skia.RuntimeEffect.Make(BORDER_BEAM_SHADER);

/** Gold sweep for the Dex frame: bright → gold → bright. */
const GOLD_BEAM = [color.goldBright, color.gold, color.goldBright] as const;

/**
 * Border beam from reacticx (https://reacticx.com/components/border-beam, MIT), vendored and
 * adapted for DexCard: the Skia runtime shader runs off the shared clock, so the sweep animates
 * on the UI thread with no per-frame React work. Native only — `border-beam.web.tsx` is a stub,
 * because `Skia.RuntimeEffect` needs either the native module or CanvasKit hosting on web.
 * Render for collected cards of rarer tiers only.
 */
export function BorderBeam({
  width,
  height,
  frameWidth,
  outerRadius,
  duration = 4,
  beamLength = 0.36,
  glow = 8,
  colors = GOLD_BEAM,
  intensity = 1,
  ambient = 0.12,
}: BorderBeamProps) {
  const clock = useClock();
  const palette = useMemo(() => buildBeamPalette(colors), [colors]);

  const uniforms = useDerivedValue<Uniforms>(
    () => ({
      u_resolution: [width, height],
      // SDF centerline: the rect inset by half the frame, so the ring straddles the frame.
      u_size: [width - frameWidth, height - frameWidth],
      u_radius: Math.max(0, outerRadius - frameWidth / 2),
      u_border: frameWidth,
      u_glow: glow,
      u_time: clock.value / 1000,
      u_speed: 1 / Math.max(duration, 0.1),
      u_arc: Math.max(beamLength, 0.02) * 0.5,
      u_intensity: intensity,
      u_ambient: ambient,
      u_count: palette.count,
      u_colors: palette.flat,
    }),
    [width, height, frameWidth, outerRadius, glow, duration, beamLength, intensity, ambient, palette, clock],
  );

  if (!effect) return null;

  return (
    <Canvas aria-hidden pointerEvents="none" style={[styles.canvas, { width, height }]}>
      <Fill>
        <Shader source={effect} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: { ...StyleSheet.absoluteFill },
});
