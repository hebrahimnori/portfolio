"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

import styles from "./MainPage.module.scss";
import Typewriter from "typewriter-effect";
import { getHomeTypewriterStrings, HOME_SPLINE_DARK } from "../data/site";
import HebiSuperHome from "../components/HebiSuperHome";
import { useTheme } from "../components/ThemeProvider";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

function MainPage() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const portalLines = useMemo(() => getHomeTypewriterStrings(), []);
  const isHebi = theme === "light";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isHebi) {
    return <HebiSuperHome />;
  }

  return (
    <div className="main_page">
      <div className={styles.scene}>
        <Spline scene={HOME_SPLINE_DARK} />
      </div>
      <div
        className={`${styles.title_on_main} pointer-events-none ${
          isLoaded ? "fadein" : ""
        }`}
      >
        <div className={styles.heroBlock}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            Welcome to
          </p>
          <Typewriter
            options={{
              strings: portalLines,
              autoStart: true,
              loop: true,
              skipAddStyles: true,
              wrapperClassName: styles.typewriterWrapper,
              cursorClassName: styles.typewriterCursor,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
