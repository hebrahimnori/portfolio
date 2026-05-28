"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COLOR_THEME_STORAGE_KEY,
  getDefaultColorTheme,
} from "../data/site";
import { getNextTheme, type ColorTheme } from "../lib/persona";

export type { ColorTheme };

type ThemeContextValue = {
  theme: ColorTheme;
  cycleTheme: () => void;
  /** @deprecated use cycleTheme */
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: ColorTheme;
}) {
  const [theme, setTheme] = useState<ColorTheme>(initialTheme);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light" || stored === "arian") {
        setTheme(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-theme", theme);
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
    try {
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((t) => getNextTheme(t));
  }, []);

  const value = useMemo(
    () => ({ theme, cycleTheme, toggleTheme: cycleTheme }),
    [theme, cycleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
