import React, { useState, useEffect } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

import styles from "./MainPage.module.scss";
import Typewriter from "typewriter-effect";

function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="main_page">
      <div
        className={`${styles.title_on_main} font-tiny pointer-events-none ${
          isLoaded ? "fadein" : ""
        }`}
      >
        <p>Welcome to</p>
        <Typewriter
          options={{
            strings: ["Hebi’s Portfolio Portal !"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <Spline scene="https://prod.spline.design/lybSTOyRGqk2Rexk/scene.splinecode" />
    </div>
  );
}

export default MainPage;
