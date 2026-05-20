"use client";

import "./globals.css";
import Dock from "../components/Dock";
import HebiCursorGate from "../components/HebiCursorGate";
import { SiteAudioProvider } from "../components/SiteAudioProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import { getDefaultColorTheme } from "../data/site";

const initialColorTheme = getDefaultColorTheme();

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-color-theme={initialColorTheme}>
      <body>
        <ThemeProvider initialTheme={initialColorTheme}>
          <SiteAudioProvider>
            <HebiCursorGate />
            <Dock />
            {children}
          </SiteAudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
