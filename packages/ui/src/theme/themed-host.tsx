import { Host, type UniversalHostProps } from '@expo/ui';

import { color } from './tokens';

/**
 * Host with the app theme: forced dark + violet seed (SwiftUI tint on iOS,
 * Material 3 palette on Android). One per screen region; never nest.
 */
export function ThemedHost(props: UniversalHostProps) {
  return <Host colorScheme="dark" seedColor={color.tint} {...props} />;
}
