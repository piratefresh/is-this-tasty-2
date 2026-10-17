import { KeyboardRevealContext, space } from "@is-this-tasty/ui";
import { useCallback, useEffect, useRef, type ComponentRef } from "react";
import { useWindowDimensions, type View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardEvents,
  type KeyboardAwareScrollViewProps,
  type KeyboardAwareScrollViewRef,
} from "react-native-keyboard-controller";

/**
 * KeyboardAwareScrollView that also scrolls @expo/ui (Compose/SwiftUI) inputs into view.
 * The library only tracks React Native TextInput focus, so UI inputs report focus through KeyboardRevealContext.
 */
export function KeyboardScrollView({ onScroll, ...props }: KeyboardAwareScrollViewProps) {
  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const scrollY = useRef(0);
  const pending = useRef<{ remove: () => void } | null>(null);
  const { height: windowHeight } = useWindowDimensions();

  useEffect(() => () => pending.current?.remove(), []);

  const reveal = useCallback(
    (view: ComponentRef<typeof View>) => {
      const scrollIntoView = (keyboardHeight: number) =>
        view.measureInWindow((_x, y, _width, height) => {
          const overlap = y + height + space[4] - (windowHeight - keyboardHeight);
          if (overlap > 0) scrollRef.current?.scrollTo({ y: scrollY.current + overlap });
        });

      pending.current?.remove();
      if (KeyboardController.isVisible()) {
        scrollIntoView(KeyboardController.state().height);
        return;
      }
      const subscription = KeyboardEvents.addListener("keyboardWillShow", (e) => {
        subscription.remove();
        pending.current = null;
        scrollIntoView(e.height);
      });
      pending.current = subscription;
    },
    [windowHeight],
  );

  return (
    <KeyboardRevealContext.Provider value={reveal}>
      <KeyboardAwareScrollView
        ref={scrollRef}
        onScroll={(e) => {
          scrollY.current = e.nativeEvent.contentOffset.y;
          onScroll?.(e);
        }}
        {...props}
      />
    </KeyboardRevealContext.Provider>
  );
}
