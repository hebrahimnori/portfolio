"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import HebiLogo from "./HebiLogo";
import styles from "./HebiSuperHome.module.scss";

const ORBITS = [
  { label: "Apps", angle: 0 },
  { label: "Front-end", angle: 120 },
  { label: "UI / UX", angle: 240 },
];

const VITALIZE_URL = "https://vitalize.dev/";

export default function HebiSuperHome() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const logoWrapRef = useRef(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    document.documentElement.classList.add("hebi-experience-lock");
    document.body.classList.add("hebi-experience-lock");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add(styles.reduced);
      return () => {
        document.documentElement.classList.remove("hebi-experience-lock");
        document.body.classList.remove("hebi-experience-lock");
      };
    }

    const q = (sel) => root.querySelector(sel);
    const curtain = q("[data-exp='curtain']");
    const curtainBg = q("[data-exp='curtain-bg']");
    const orbitField = q("[data-exp='orbit-field']");
    const loaderLine = q("[data-exp='loader-line']");
    const logo = q("[data-exp='logo']");
    const logoGlow = q("[data-exp='logo-glow']");
    const ring = q("[data-exp='ring']");
    const ring2 = q("[data-exp='ring-2']");
    const blobs = root.querySelectorAll("[data-exp='blob']");
    const satellites = root.querySelectorAll("[data-exp='satellite']");
    const brand = q("[data-exp='brand']");
    const footArt = q("[data-exp='foot-art']");
    const footOrbitRing = q("[data-exp='foot-orbit-ring']");
    const footOrbitDot = q("[data-exp='foot-orbit-dot']");

    const onMove = (e) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const { x, y } = pointer.current;
      const dx = (x - 0.5) * 2;
      const dy = (y - 0.5) * 2;

      if (logoWrapRef.current) {
        gsap.to(logoWrapRef.current, {
          rotateY: dx * 14,
          rotateX: -dy * 10,
          duration: 0.85,
          ease: "power2.out",
        });
      }

      blobs.forEach((blob, i) => {
        const strength = i === 0 ? 42 : 28;
        gsap.to(blob, {
          x: dx * strength,
          y: dy * strength,
          duration: 1.2 + i * 0.15,
          ease: "power2.out",
        });
      });

      if (stageRef.current) {
        stageRef.current.style.setProperty("--mix", String(x));
      }
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      const logoOrigin = { transformOrigin: "50% 50%", force3D: true };
      const stage = q("[data-exp='stage']");

      gsap.set(curtain, { yPercent: 0 });
      if (curtainBg) gsap.set(curtainBg, { opacity: 1 });
      if (stage) {
        gsap.set(stage, { opacity: 1, zIndex: 101, scale: 0.96, filter: "blur(6px)" });
      }
      if (orbitField) gsap.set(orbitField, { scale: 0.9 });
      if (logo) gsap.set(logo, { ...logoOrigin, opacity: 1, scale: 0.72, rotation: 90 });
      if (logoGlow) gsap.set(logoGlow, { opacity: 0, scale: 0.4 });
      if (brand) gsap.set(brand, { opacity: 0, y: 10 });
      if (footArt) gsap.set(footArt, { opacity: 0 });
      blobs.forEach((b) => gsap.set(b, { opacity: 0, scale: 0.92 }));
      [ring, ring2].forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0.78, rotation: 0, transformOrigin: "50% 50%" });
      });
      satellites.forEach((el) => gsap.set(el, { opacity: 0, scale: 0 }));

      const intro = gsap.timeline();
      const reveal = "reveal";

      if (logo) {
        intro.fromTo(
          logo,
          { ...logoOrigin, rotation: 90, scale: 0.72, opacity: 0.88 },
          { rotation: 0, scale: 1, opacity: 1, duration: 0.72, ease: "power3.out" }
        );
      }

      if (loaderLine) {
        intro.fromTo(
          loaderLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
          logo ? "-=0.5" : 0
        );
      }

      intro.addLabel(reveal, logo ? "-=0.2" : 0);

      if (curtainBg) {
        intro.to(curtainBg, { opacity: 0, duration: 0.52, ease: "power2.out" }, reveal);
      }

      if (stage) {
        intro.to(
          stage,
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.58, ease: "power3.out" },
          reveal
        );
      }

      if (orbitField) {
        intro.to(orbitField, { scale: 1, duration: 0.55, ease: "power2.out" }, reveal);
      }

      if (blobs.length) {
        intro.to(
          blobs,
          { opacity: 1, scale: 1, duration: 0.42, stagger: 0.04, ease: "power2.out" },
          reveal
        );
      }

      [ring, ring2].forEach((el, i) => {
        if (!el) return;
        intro.to(el, { opacity: 1, scale: 1, duration: 0.48, ease: "power2.out" }, reveal);
        intro.to(
          el,
          {
            rotation: i === 0 ? 360 : -360,
            duration: 36 + i * 10,
            repeat: -1,
            ease: "none",
          },
          reveal
        );
      });

      if (logoGlow) {
        intro.to(logoGlow, { opacity: 1, scale: 1, duration: 0.48, ease: "power2.out" }, reveal);
      }

      if (stage) {
        intro.set(stage, { zIndex: 2 }, reveal);
      }

      if (loaderLine) {
        intro.to(
          loaderLine,
          { scaleX: 0, transformOrigin: "100% 50%", duration: 0.22 },
          `${reveal}+=0.08`
        );
      }

      if (curtain) {
        intro.to(
          curtain,
          { yPercent: -102, duration: 0.52, ease: "power3.inOut" },
          `${reveal}+=0.14`
        );
        intro.set(curtain, { pointerEvents: "none", visibility: "hidden" });
      }

      if (satellites.length) {
        intro.to(
          satellites,
          { opacity: 1, scale: 1, duration: 0.46, stagger: 0.07, ease: "back.out(1.8)" },
          `${reveal}+=0.1`
        );
      }

      if (logo) {
        intro.to(
          logo,
          {
            y: "+=10",
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          `${reveal}+=0.2`
        );
      }

      if (brand) {
        intro.to(brand, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, `${reveal}+=0.12`);
      }

      if (footArt) {
        intro.to(footArt, { opacity: 0.92, duration: 0.42, ease: "power2.out" }, `${reveal}+=0.18`);
      }

      if (footOrbitRing) {
        intro.to(footOrbitRing, { opacity: 1, duration: 0.45, ease: "power2.out" }, `${reveal}+=0.2`);
        intro.to(
          footOrbitRing,
          { rotation: 360, duration: 28, repeat: -1, ease: "none" },
          `${reveal}+=0.2`
        );
      }

      if (footOrbitDot) {
        intro.to(
          footOrbitDot,
          { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(2)" },
          `${reveal}+=0.22`
        );
        intro.to(
          footOrbitDot,
          {
            opacity: 0.55,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          `${reveal}+=0.35`
        );
      }
    }, root);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
      document.documentElement.classList.remove("hebi-experience-lock");
      document.body.classList.remove("hebi-experience-lock");
    };
  }, []);

  return (
    <>
      <div ref={rootRef} className={styles.root}>
        <div className={styles.curtain} data-exp="curtain">
          <div className={styles.curtainBg} data-exp="curtain-bg" aria-hidden />
          <div className={styles.loader}>
            <span className={styles.loaderLogoSpacer} aria-hidden />
            <span className={styles.loaderLine} data-exp="loader-line" />
          </div>
      </div>

      <header className={styles.topBar}>
        <div className={styles.brandBlock} data-exp="brand">
          <p className={styles.brandName}>Hebi</p>
          <p className={styles.brandSub}>
            Work at{" "}
            <a
              href={VITALIZE_URL}
              className={styles.brandSubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vitalize LLC
            </a>
          </p>
        </div>
      </header>

      <div ref={stageRef} className={styles.stage} data-exp="stage">
        <div className={`${styles.blob} ${styles.blobTeal}`} data-exp="blob" aria-hidden />
        <div className={`${styles.blob} ${styles.blobSlate}`} data-exp="blob" aria-hidden />
        <div className={styles.grid} aria-hidden />

        <div className={styles.orbitField} data-exp="orbit-field">
          <div className={styles.ring} data-exp="ring" aria-hidden />
          <div className={`${styles.ring} ${styles.ringInner}`} data-exp="ring-2" aria-hidden />

          {ORBITS.map((o) => (
            <span
              key={o.label}
              className={styles.satellite}
              data-exp="satellite"
              style={{ "--orbit-angle": `${o.angle}deg` }}
            >
              <span className={styles.satelliteDot} aria-hidden />
              <span className={styles.satelliteLabel}>{o.label}</span>
            </span>
          ))}

          <div ref={logoWrapRef} className={styles.logoWrap}>
            <div className={styles.logoGlow} data-exp="logo-glow" aria-hidden />
            <span className={styles.logoSvgWrap} data-exp="logo">
              <HebiLogo className={styles.logo} />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.footArt} data-exp="foot-art" aria-hidden>
        <div className={styles.footOrbit}>
          <div className={styles.footOrbitHalf} data-exp="foot-orbit-ring" />
          <span className={styles.footOrbitDot} data-exp="foot-orbit-dot" />
        </div>
      </div>
      </div>

    </>
  );
}
