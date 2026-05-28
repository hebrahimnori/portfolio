"use client";

import HebiSuperHome from "../components/HebiSuperHome";
import ParsaHome from "../components/ParsaHome";
import ArianHome from "../components/ArianHome";
import { useTheme } from "../components/ThemeProvider";

function MainPage() {
  const { theme } = useTheme();
  if (theme === "light") return <HebiSuperHome />;
  if (theme === "arian") return <ArianHome />;
  return <ParsaHome />;
}

export default MainPage;
