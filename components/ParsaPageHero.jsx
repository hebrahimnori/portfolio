"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./ParsaPageHero.module.scss";

/**
 * Parsa listing header — console rail + Tiny5 title (matches dark home).
 */
export default function ParsaPageHero({ eyebrow, title, kicker, meta }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = root.querySelectorAll("[data-parsa-hero]");
    gsap.set(els, { opacity: 0, y: 14 });
    const ctx = gsap.context(() => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.hero} ref={rootRef}>
      {eyebrow ? (
        <p className={styles.eyebrow} data-parsa-hero>
          <span className={styles.eyebrowMark} aria-hidden />
          {eyebrow}
        </p>
      ) : null}
      <h1 className={styles.title} data-parsa-hero>
        {title}
      </h1>
      {kicker ? (
        <p className={styles.kicker} data-parsa-hero>
          <span className={styles.prompt} aria-hidden>
            {"> "}
          </span>
          {kicker}
        </p>
      ) : null}
      <div className={styles.rule} data-parsa-hero aria-hidden />
      {meta ? (
        <p className={styles.meta} data-parsa-hero>
          {meta}
        </p>
      ) : null}
    </header>
  );
}
