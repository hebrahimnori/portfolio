"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * Page-level GSAP — portrait reveal, copy stagger, stat cards, command bar.
 * Title motion lives in AboutTitle.jsx.
 */
export function useAboutEntrance(rootRef, options = {}) {
  const { enabled = true } = options;

  useLayoutEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const plate = root.querySelector("[data-about-plate]");
    const figure = root.querySelector("[data-about-figure]");
    const copyBits = root.querySelectorAll("[data-about-copy]");
    const stats = root.querySelectorAll("[data-about-stat]");
    const statLabel = root.querySelector("[data-about-stat-label]");
    const marquee = root.querySelector("[data-about-marquee]");
    const command = root.querySelector("[data-about-command]");

    if (plate) {
      gsap.set(plate, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 100%",
      });
    }
    const portraitImg = figure?.querySelector("img");
    if (figure) {
      gsap.set(figure, { y: 28, opacity: 0 });
    }
    if (portraitImg) {
      gsap.set(portraitImg, {
        clipPath: "inset(58% 0 -6% 0)",
        opacity: 0,
      });
    }
    if (copyBits.length) gsap.set(copyBits, { opacity: 0, y: 16, x: 12 });
    if (statLabel) gsap.set(statLabel, { opacity: 0, y: 8 });
    if (stats.length) {
      gsap.set(stats, { opacity: 0, y: 28, scale: 0.92 });
    }
    if (marquee) gsap.set(marquee, { opacity: 0, y: 12 });
    if (command) gsap.set(command, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (plate) {
        tl.to(plate, {
          scaleY: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power3.inOut",
        });
      }

      if (figure) {
        tl.to(
          figure,
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          plate ? "-=0.5" : 0
        );
      }

      if (portraitImg) {
        tl.to(
          portraitImg,
          {
            clipPath: "inset(-4% 0 -8% 0)",
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          },
          plate ? "-=0.72" : 0
        );

        gsap.to(portraitImg, {
          y: "-=4",
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.4,
        });
      }

      if (copyBits.length) {
        tl.to(
          copyBits,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.58,
            stagger: 0.11,
            ease: "power2.out",
          },
          0.95
        );
      }

      if (statLabel) {
        tl.to(statLabel, { opacity: 1, y: 0, duration: 0.45 }, 1.15);
      }

      if (stats.length) {
        tl.to(
          stats,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            stagger: 0.09,
            ease: "back.out(1.35)",
          },
          1.22
        );
      }

      if (marquee) {
        tl.to(marquee, { opacity: 1, y: 0, duration: 0.5 }, 1.45);
      }

      if (command) {
        tl.to(
          command,
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          1.52
        );
      }
    }, root);

    return () => ctx.revert();
  }, [enabled, rootRef]);
}
