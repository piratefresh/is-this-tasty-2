import "../../global.css";

import { Cinzel_600SemiBold } from '@expo-google-fonts/cinzel';
import { Spectral_400Regular, Spectral_600SemiBold } from '@expo-google-fonts/spectral';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { color, font } from "@is-this-tasty/ui";

SplashScreen.preventAutoHideAsync();

// Navigation chrome on our surfaces so pushes never flash the default background.
const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: color.tint,
    background: color.bg,
    card: color.bg,
    text: color.label,
    border: color.separator,
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({ Spectral_400Regular, Spectral_600SemiBold, Cinzel_600SemiBold });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  // Hold the splash until fonts are in, so serif never flashes the fallback.
  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: color.bg }}>
      <ThemeProvider value={navTheme}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerTransparent: false,
            contentStyle: { backgroundColor: color.bg },
            headerTitleStyle: { fontFamily: font.display },
          }}
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
