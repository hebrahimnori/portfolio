"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./ListingPageHero.module.scss";

/**
 * Projects / Photography page header — editorial type + light entrance.
 */
export default function ListingPageHero({
  eyebrow,
  title,
  titleAccent,
  kicker,
  meta,
  /** @type {"default" | "about"} [size] — about page: larger display name */
  size = "default",
}) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const eyebrowEl = root.querySelector("[data-hero-eyebrow]");
    const titleEl = root.querySelector("[data-hero-title]");
    const accentEl = root.querySelector("[data-hero-accent]");
    const kickerEl = root.querySelector("[data-hero-kicker]");
    const ruleEl = root.querySelector("[data-hero-rule]");
    const metaEl = root.querySelector("[data-hero-meta]");

    if (eyebrowEl) gsap.set(eyebrowEl, { opacity: 0, y: 12 });
    if (titleEl) gsap.set(titleEl, { opacity: 0, y: 22, filter: "blur(8px)" });
    if (accentEl) gsap.set(accentEl, { opacity: 0, y: 14 });
    if (kickerEl) gsap.set(kickerEl, { opacity: 0, y: 10 });
    if (ruleEl) gsap.set(ruleEl, { scaleX: 0, opacity: 0.4 });
    if (metaEl) gsap.set(metaEl, { opacity: 0, y: 8 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.12 });

      if (eyebrowEl) {
        tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.48, ease: "power2.out" });
      }
      if (titleEl) {
        tl.to(
          titleEl,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.72, ease: "power3.out" },
          "-=0.28"
        );
      }
      if (accentEl) {
        tl.to(accentEl, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.42");
      }
      if (kickerEl) {
        tl.to(kickerEl, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.35");
      }
      if (ruleEl) {
        tl.to(ruleEl, { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.inOut" }, "-=0.32");
      }
      if (metaEl) {
        tl.to(metaEl, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.38");
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header
      className={`${styles.hero} ${size === "about" ? styles.heroAbout : ""}`}
      ref={rootRef}
    >
      {eyebrow ? (
        <p className={styles.eyebrow} data-hero-eyebrow>
          {eyebrow}
        </p>
      ) : null}
      <h1 className={styles.title} data-hero-title>
        {title}
        {titleAccent ? (
          <span className={styles.titleAccent} data-hero-accent>
            {titleAccent}
          </span>
        ) : null}
      </h1>
      {kicker ? (
        <p className={styles.kicker} data-hero-kicker>
          {kicker}
        </p>
      ) : null}
      <div className={styles.rule} data-hero-rule aria-hidden />
      {meta ? (
        <p className={styles.meta} data-hero-meta>
          {meta}
        </p>
      ) : null}
    </header>
  );
}
