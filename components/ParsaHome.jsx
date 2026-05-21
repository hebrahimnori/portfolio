"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Typewriter from "typewriter-effect";

import styles from "./ParsaHome.module.scss";
import mainStyles from "../app/MainPage.module.scss";
import { getHomeTypewriterStrings, HOME_SPLINE_DARK } from "../data/site";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const BOOT_LINES = [
  { text: "initializing portal kernel", ok: false },
  { text: "loading 3d scene graph", ok: false },
  { text: "sync typewriter module", ok: true },
  { text: "ready — welcome back", ok: true },
];

export default function ParsaHome() {
  const rootRef = useRef(null);
  const portalLines = useMemo(() => getHomeTypewriterStrings(), []);
  const [typewriterOn, setTypewriterOn] = useState(false);
  const introDone = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    document.documentElement.classList.add("hebi-experience-lock");
    document.body.classList.add("hebi-experience-lock");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTypewriterOn(true);
      introDone.current = true;
      return () => {
        document.documentElement.classList.remove("hebi-experience-lock");
        document.body.classList.remove("hebi-experience-lock");
      };
    }

    const q = (sel) => root.querySelector(sel);
    const curtain = q("[data-parsa-curtain]");
    const curtainBg = q("[data-parsa-curtain-bg]");
    const bootLines = root.querySelectorAll("[data-parsa-boot-line]");
    const loaderLine = q("[data-parsa-loader-line]");
    const stage = q("[data-parsa-stage]");
    const hero = q("[data-parsa-hero]");
    const heroRail = q("[data-parsa-hero-rail]");

    const ctx = gsap.context(() => {
      gsap.set(curtain, { yPercent: 0, opacity: 1 });
      if (curtainBg) gsap.set(curtainBg, { opacity: 1 });
      if (stage) gsap.set(stage, { opacity: 0 });
      if (hero) gsap.set(hero, { opacity: 0, y: 18 });
      if (heroRail) gsap.set(heroRail, { scaleY: 0, opacity: 0.4, transformOrigin: "0 0" });
      gsap.set(bootLines, { opacity: 0, x: -8 });
      if (loaderLine) gsap.set(loaderLine, { scaleX: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          introDone.current = true;
          setTypewriterOn(true);
        },
      });

      tl.to(bootLines, {
        opacity: 1,
        x: 0,
        duration: 0.32,
        stagger: 0.14,
        ease: "power2.out",
      });

      if (loaderLine) {
        tl.to(
          loaderLine,
          { scaleX: 1, duration: 0.55, ease: "power2.inOut" },
          "-=0.08"
        );
      }

      tl.to({}, { duration: 0.2 });

      if (curtainBg) {
        tl.to(curtainBg, { opacity: 0, duration: 0.45, ease: "power2.out" });
      }

      if (stage) {
        tl.to(
          stage,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );
      }

      if (hero) {
        tl.to(
          hero,
          { opacity: 1, y: 0, duration: 0.62, ease: "power3.out" },
          "-=0.38"
        );
      }
      if (heroRail) {
        tl.to(
          heroRail,
          { scaleY: 1, opacity: 1, duration: 0.55, ease: "power3.inOut" },
          "-=0.5"
        );
      }

      if (curtain) {
        tl.to(
          curtain,
          { yPercent: -102, duration: 0.52, ease: "power3.inOut" },
          "-=0.28"
        );
        tl.set(curtain, { pointerEvents: "none", visibility: "hidden" });
      }
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("hebi-experience-lock");
      document.body.classList.remove("hebi-experience-lock");
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!introDone.current) {
        introDone.current = true;
        setTypewriterOn(true);
      }
    }, 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={rootRef} className={`main_page ${styles.root}`}>
      <div className={styles.curtain} data-parsa-curtain>
        <div className={styles.curtainBg} data-parsa-curtain-bg aria-hidden />
        <div className={styles.boot}>
          <div className={styles.bootBar}>
            <span className={styles.bootDot} />
            <span className={styles.bootDot} />
            <span className={styles.bootDot} />
            <span className={styles.bootTitle}>parsa@portal — boot</span>
          </div>
          {BOOT_LINES.map((line) => (
            <p key={line.text} className={styles.bootLine} data-parsa-boot-line>
              <span className={styles.bootPrompt}>{"> "}</span>
              {line.text}
              {line.ok ? (
                <span className={styles.bootOk}> {" [ok]"}</span>
              ) : null}
            </p>
          ))}
          <span className={styles.loaderLine} data-parsa-loader-line />
        </div>
      </div>

      <div className={styles.stage} data-parsa-stage>
        <div className={styles.scene}>
          <Spline scene={HOME_SPLINE_DARK} />
        </div>
        <div className={styles.hero} data-parsa-hero>
          <div className={styles.heroBlock}>
            <span className={styles.heroRail} data-parsa-hero-rail aria-hidden />
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden />
              Welcome to
            </p>
            {typewriterOn ? (
              <Typewriter
                options={{
                  strings: portalLines,
                  autoStart: true,
                  loop: true,
                  skipAddStyles: true,
                  wrapperClassName: styles.typewriterWrapper,
                  cursorClassName: mainStyles.typewriterCursor,
                }}
              />
            ) : (
              <span className={styles.typewriterWrapper} aria-hidden>
                …
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
