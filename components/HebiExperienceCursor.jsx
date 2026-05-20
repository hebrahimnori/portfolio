"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

import { hebiCursorState, rememberCursorPosition } from "../lib/cursor/hebiCursorState";
import styles from "./HebiExperienceCursor.module.scss";

const CURSOR_LINK_HOVER_SELECTOR =
  'a[href], button:not([disabled]), [role="button"], summary';

const PAD = 11;

export default function HebiExperienceCursor() {
  const cursorCraftRef = useRef(null);
  const cursorQuickRef = useRef({ x: null, y: null, ready: false });
  const [showPortal, setShowPortal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    document.documentElement.classList.add("hebi-experience-fine-pointer");
    setShowPortal(true);

    const moveCursor = (clientX, clientY) => {
      rememberCursorPosition(clientX, clientY);
      const qx = cursorQuickRef.current.x;
      const qy = cursorQuickRef.current.y;
      const el = cursorCraftRef.current;
      if (qx && qy && el) {
        qx(clientX - PAD);
        qy(clientY - PAD);
        gsap.to(el, {
          opacity: 0.95,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });

        const face = el.firstElementChild;
        if (face instanceof HTMLElement) {
          const under = document.elementFromPoint(clientX, clientY);
          const hoverLink =
            under instanceof Element &&
            !under.closest("[data-hebi-cursor]") &&
            Boolean(under.closest(CURSOR_LINK_HOVER_SELECTOR));
          face.classList.toggle(styles.cursorCraftFace_onLink, hoverLink);
        }
      }
    };

    const onMove = (e) => moveCursor(e.clientX, e.clientY);
    const onPointerDown = (e) => moveCursor(e.clientX, e.clientY);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.classList.remove("hebi-experience-fine-pointer");
      cursorQuickRef.current.x = null;
      cursorQuickRef.current.y = null;
      cursorQuickRef.current.ready = false;
    };
  }, []);

  useEffect(() => {
    if (!showPortal) return;

    let cancelled = false;
    let rafId = 0;

    const attach = () => {
      if (cancelled || cursorQuickRef.current.ready) return;
      const el = cursorCraftRef.current;
      if (!el) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      const startX = hebiCursorState.hasPosition
        ? hebiCursorState.x - PAD
        : window.innerWidth / 2 - PAD;
      const startY = hebiCursorState.hasPosition
        ? hebiCursorState.y - PAD
        : window.innerHeight / 2 - PAD;

      gsap.set(el, {
        x: startX,
        y: startY,
        opacity: hebiCursorState.hasPosition ? 0.95 : 0,
      });

      cursorQuickRef.current.x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      cursorQuickRef.current.y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      cursorQuickRef.current.ready = true;
    };

    rafId = requestAnimationFrame(attach);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cursorQuickRef.current.x = null;
      cursorQuickRef.current.y = null;
      cursorQuickRef.current.ready = false;
    };
  }, [showPortal]);

  if (!showPortal) return null;

  return createPortal(
    <div ref={cursorCraftRef} className={styles.cursorCraftRoot} data-hebi-cursor aria-hidden>
      <span className={styles.cursorCraftFace} />
    </div>,
    document.body
  );
}
