"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./ArianPageHero.module.scss";

export default function ArianPageHero({ eyebrow, title, kicker, meta }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = root.querySelectorAll("[data-arian-hero]");
    gsap.set(els, { opacity: 0, y: 12 });
    const ctx = gsap.context(() => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.08,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.hero} ref={rootRef}>
      <div className={styles.reportBar} data-arian-hero aria-hidden>
        <span className={styles.barPass} />
        <span className={styles.barRun} />
        <span className={styles.barFail} />
      </div>
      {eyebrow ? (
        <p className={styles.eyebrow} data-arian-hero>
          {eyebrow}
        </p>
      ) : null}
      <h1 className={styles.title} data-arian-hero>
        {title}
      </h1>
      {kicker ? <p className={styles.kicker} data-arian-hero>{kicker}</p> : null}
      {meta ? (
        <p className={styles.meta} data-arian-hero>
          <span className={styles.metaDot} aria-hidden />
          {meta}
        </p>
      ) : null}
    </header>
  );
}
