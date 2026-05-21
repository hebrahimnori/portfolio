"use client";

import HebiSuperHome from "../components/HebiSuperHome";
import ParsaHome from "../components/ParsaHome";
import { useTheme } from "../components/ThemeProvider";

function MainPage() {
  const { theme } = useTheme();
  return theme === "light" ? <HebiSuperHome /> : <ParsaHome />;
}

export default MainPage;
