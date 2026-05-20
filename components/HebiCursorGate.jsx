"use client";

import { useTheme } from "./ThemeProvider";
import HebiExperienceCursor from "./HebiExperienceCursor";

/** Single cursor instance for all Hebi (light) routes — avoids reset on navigation. */
export default function HebiCursorGate() {
  const { theme } = useTheme();
  if (theme !== "light") return null;
  return <HebiExperienceCursor />;
}
