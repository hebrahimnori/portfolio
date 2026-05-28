"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export function useArianAboutEntrance(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const profile = root.querySelector("[data-arian-profile]");
    const vitalize = root.querySelector("[data-arian-vitalize]");
    const employer = root.querySelector("[data-arian-employer]");
    const contact = root.querySelector("[data-arian-contact]");
    const metrics = root.querySelector("[data-arian-metrics]");
    const stats = root.querySelectorAll("[data-arian-stat]");
    const disciplines = root.querySelector("[data-arian-disciplines]");
    const stack = root.querySelector("[data-arian-stack]");
    const command = root.querySelector("[data-arian-command]");

    const ctx = gsap.context(() => {
      if (profile) gsap.set(profile, { opacity: 0, y: 18 });
      if (vitalize) gsap.set(vitalize, { opacity: 0, y: 8 });
      if (employer) gsap.set(employer, { opacity: 0, y: 8 });
      if (contact) gsap.set(contact, { opacity: 0 });
      if (metrics) gsap.set(metrics, { opacity: 0, y: 12 });
      if (stats.length) gsap.set(stats, { opacity: 0, y: 14 });
      if (disciplines) gsap.set(disciplines, { opacity: 0, y: 10 });
      if (stack) gsap.set(stack, { opacity: 0, y: 10 });
      if (command) gsap.set(command, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ delay: 0.2 });
      if (profile) tl.to(profile, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      if (vitalize) tl.to(vitalize, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.3");
      if (employer) tl.to(employer, { opacity: 1, y: 0, duration: 0.35 }, "-=0.22");
      if (contact) tl.to(contact, { opacity: 1, duration: 0.3 }, "-=0.2");
      if (metrics) tl.to(metrics, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
      if (stats.length) {
        tl.to(stats, { opacity: 1, y: 0, duration: 0.38, stagger: 0.07 }, "-=0.28");
      }
      if (disciplines) tl.to(disciplines, { opacity: 1, y: 0, duration: 0.35 }, "-=0.2");
      if (stack) tl.to(stack, { opacity: 1, y: 0, duration: 0.35 }, "-=0.18");
      if (command) tl.to(command, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
