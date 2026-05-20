"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./AboutPage.module.scss";

const DISPLAY_NAME = "Hebi";

/**
 * GSAP title — serif greeting blur-up, display name clip + skew reveal, role + rule.
 */
export default function AboutTitle({ roleLine }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const words = root.querySelectorAll("[data-about-word]");
    const letters = root.querySelectorAll("[data-about-letter]");
    const role = root.querySelector("[data-about-role]");
    const rule = root.querySelector("[data-about-rule]");

    if (mq.matches) return;

    gsap.set(words, { opacity: 0, y: 20, filter: "blur(10px)" });
    gsap.set(letters, {
      clipPath: "inset(-8% 100% -14% 0)",
      x: -16,
      y: 8,
      skewX: -12,
      scaleX: 0.88,
      opacity: 0,
    });
    if (role) gsap.set(role, { opacity: 0, y: 14, filter: "blur(4px)" });
    if (rule) gsap.set(rule, { scaleX: 0, opacity: 0.5 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.22 });

      tl.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.58,
        stagger: 0.1,
        ease: "power3.out",
      });

      tl.to(
        letters,
        {
          clipPath: "inset(-8% 0% -14% 0)",
          x: 0,
          y: 0,
          skewX: 0,
          scaleX: 1,
          opacity: 1,
          duration: 0.54,
          stagger: { each: 0.11, from: "start" },
          ease: "expo.out",
        },
        "-=0.28"
      );

      if (role) {
        tl.to(
          role,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.12"
        );
      }

      if (rule) {
        tl.to(
          rule,
          { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.inOut" },
          "-=0.38"
        );
      }
    }, root);

    return () => ctx.revert();
  }, [roleLine]);

  return (
    <div ref={rootRef} className={styles.aboutTitleWrap}>
      <h1 className={styles.aboutTitle}>
        <span className={styles.titleGreeting}>
          <span className={styles.greetingWord} data-about-word>
            Hey, I&apos;m
          </span>
        </span>
        <span className={styles.titleDisplay}>
          {DISPLAY_NAME.split("").map((char, i) => (
            <span key={`${char}-${i}`} className={styles.letterShell}>
              <span className={styles.letterInk} data-about-letter>
                {char}
              </span>
            </span>
          ))}
        </span>
      </h1>
      {roleLine ? (
        <p className={styles.profileRole} data-about-role>
          {roleLine}
        </p>
      ) : null}
      <span className={styles.profileRule} data-about-rule aria-hidden />
    </div>
  );
}
