import type { Metadata } from "next";
import localFont from "next/font/local";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

import "./global.css";

const spectral = localFont({
  src: "../../../../node_modules/@expo-google-fonts/spectral/600SemiBold/Spectral_600SemiBold.ttf",
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s · Is This Tasty?", default: "Is This Tasty? design system" },
  description: "Native controls, shared tokens, and the components behind Is This Tasty?",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${spectral.variable}`} suppressHydrationWarning>
      <body>
        <RootProvider theme={{ forcedTheme: "dark" }}>{children}</RootProvider>
      </body>
    </html>
  );
}
