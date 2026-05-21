"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * Parsa about — terminal boot feel, staggered metrics + CTA.
 */
export function useParsaAboutEntrance(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const terminal = root.querySelector("[data-parsa-terminal]");
    const lines = root.querySelectorAll("[data-parsa-term-line]");
    const outs = root.querySelectorAll("[data-parsa-term-out]");
    const pkg = root.querySelector("[data-parsa-pkg]");
    const comment = root.querySelector("[data-parsa-comment]");
    const metrics = root.querySelector("[data-parsa-metrics]");
    const statLabel = root.querySelector("[data-parsa-stat-label]");
    const stats = root.querySelectorAll("[data-parsa-stat]");
    const stack = root.querySelector("[data-parsa-stack]");
    const command = root.querySelector("[data-parsa-command]");

    const ctx = gsap.context(() => {
      if (terminal) {
        gsap.set(terminal, { opacity: 0, y: 20, scale: 0.98 });
      }
      gsap.set(lines, { opacity: 0, x: -10 });
      gsap.set(outs, { opacity: 0, y: 8, clipPath: "inset(0 100% 0 0)" });
      if (pkg) gsap.set(pkg, { opacity: 0, y: 6 });
      if (comment) gsap.set(comment, { opacity: 0 });
      if (metrics) gsap.set(metrics, { opacity: 0, y: 14 });
      if (statLabel) gsap.set(statLabel, { opacity: 0, x: -8 });
      if (stats.length) gsap.set(stats, { opacity: 0, y: 22, scale: 0.94 });
      if (stack) gsap.set(stack, { opacity: 0, y: 12 });
      if (command) gsap.set(command, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.5 });

      if (terminal) {
        tl.to(terminal, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        });
      }

      tl.to(
        lines,
        { opacity: 1, x: 0, duration: 0.28, stagger: 0.07, ease: "power2.out" },
        "-=0.25"
      );

      tl.to(
        outs,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.42,
          stagger: 0.09,
          ease: "power2.out",
        },
        "-=0.12"
      );

      if (pkg) {
        tl.to(pkg, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.2");
      }
      if (comment) {
        tl.to(comment, { opacity: 1, duration: 0.3 }, "-=0.15");
      }

      if (metrics) {
        tl.to(metrics, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.05");
      }
      if (statLabel) {
        tl.to(statLabel, { opacity: 1, x: 0, duration: 0.32 }, "-=0.28");
      }
      if (stats.length) {
        tl.to(
          stats,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "back.out(1.35)",
          },
          "-=0.32"
        );
      }

      if (stack) {
        tl.to(stack, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
      }

      if (command) {
        tl.to(
          command,
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          "-=0.15"
        );
      }
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
