import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { color, font, type ColorToken } from './tokens';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'meta' | 'eyebrow';

type VariantSpec = {
  style: TextStyle;
  // iOS text style the size scales with (Dynamic Type). Android scales via sp.
  ramp: NonNullable<RNTextProps['dynamicTypeRamp']>;
  header?: boolean;
  serif?: boolean;
};

const variants: Record<Variant, VariantSpec> = {
  display: { style: { fontFamily: font.display, fontSize: 30, lineHeight: 34 }, ramp: 'title1', header: true, serif: true },
  title: { style: { fontFamily: font.display, fontSize: 22, lineHeight: 26 }, ramp: 'title2', header: true, serif: true },
  subtitle: { style: { fontFamily: font.subtitle, fontSize: 17, lineHeight: 22, color: color.label2 }, ramp: 'body', serif: true },
  body: { style: { fontSize: 17, lineHeight: 22 }, ramp: 'body' },
  label: { style: { fontSize: 15, lineHeight: 20, fontWeight: '600' }, ramp: 'subheadline' },
  meta: { style: { fontSize: 13, lineHeight: 18, fontWeight: '500', color: color.label3 }, ramp: 'footnote' },
  eyebrow: {
    style: { fontSize: 12, lineHeight: 16, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 12 * 0.08, color: color.label3 },
    ramp: 'caption1',
  },
};

export type TextProps = RNTextProps & { variant?: Variant; color?: ColorToken };

export function Text({ variant = 'body', color: tone, style, ...rest }: TextProps) {
  const v = variants[variant];
  return (
    <RNText
      dynamicTypeRamp={v.ramp}
      // Serif headers scale, but capped so they don't break layout.
      maxFontSizeMultiplier={v.serif ? 1.4 : undefined}
      accessibilityRole={v.header ? 'header' : undefined}
      style={[{ color: color.label }, v.style, tone && { color: color[tone] }, style]}
      {...rest}
    />
  );
}
