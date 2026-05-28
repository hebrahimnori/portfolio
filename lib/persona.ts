export type ColorTheme = "light" | "dark" | "arian";

export const THEME_CYCLE: readonly ColorTheme[] = ["light", "dark", "arian"];

export function getNextTheme(theme: ColorTheme): ColorTheme {
  const i = THEME_CYCLE.indexOf(theme);
  const next = THEME_CYCLE[(i + 1) % THEME_CYCLE.length];
  return next ?? "light";
}

export function getThemeSwitchLabel(theme: ColorTheme) {
  const next = getNextTheme(theme);
  if (next === "light") return "Switch to Hebi (light)";
  if (next === "dark") return "Switch to Parsa (dark)";
  return "Switch to Arian (QA)";
}

export function isHebiTheme(theme: ColorTheme) {
  return theme === "light";
}

export function isParsaTheme(theme: ColorTheme) {
  return theme === "dark";
}

export function isArianTheme(theme: ColorTheme) {
  return theme === "arian";
}

export function isConsolePersona(theme: ColorTheme) {
  return theme === "dark" || theme === "arian";
}

/** Dock hover labels — contrast matched to each theme’s dock chrome */
export function getDockTooltipStyle(theme: ColorTheme) {
  const base = {
    borderRadius: "6px",
    fontSize: "12px",
    padding: "4px 8px",
    border: "none" as const,
    boxShadow: "none" as const,
  };

  if (theme === "dark") {
    return {
      ...base,
      backgroundColor: "rgba(14, 14, 18, 0.92)",
      color: "rgba(255, 255, 255, 0.92)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    };
  }

  if (theme === "arian") {
    return {
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.97)",
      color: "#0f2419",
      border: "1px solid rgba(20, 80, 50, 0.22)",
      boxShadow: "0 8px 20px rgba(20, 60, 40, 0.14)",
    };
  }

  return {
    ...base,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    color: "rgba(30, 41, 59, 0.92)",
    border: "1px solid rgba(99, 102, 241, 0.14)",
    boxShadow: "0 8px 20px rgba(67, 56, 202, 0.1)",
  };
}

