import { createContext, useContext, useRef, type ComponentRef } from "react";
import type { View } from "react-native";

type ViewInstance = ComponentRef<typeof View>;

/**
 * Called when an @expo/ui text input gains focus. Keyboard-aware scroll views only track
 * React Native TextInput focus, so screens provide this to scroll Compose/SwiftUI fields into view.
 */
export const KeyboardRevealContext = createContext<((view: ViewInstance) => void) | null>(null);

export function useKeyboardReveal() {
  const reveal = useContext(KeyboardRevealContext);
  const ref = useRef<ViewInstance>(null);
  const onFocus = () => {
    if (ref.current) reveal?.(ref.current);
  };
  return { ref, onFocus };
}
