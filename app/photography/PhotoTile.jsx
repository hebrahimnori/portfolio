"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { extractPhotoAccent } from "./extractPhotoAccent";
import styles from "./PhotoPage.module.scss";

const DEFAULT = { r: 150, g: 165, b: 235 };

const spring = { stiffness: 280, damping: 30, mass: 0.45 };

export default function PhotoTile({ file, index }) {
  const [accent, setAccent] = useState(DEFAULT);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);
  const tiltRef = useRef(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), spring);

  const applyAccent = useCallback(() => {
    const img = imgRef.current;
    if (!img?.naturalWidth) return;
    setAccent(extractPhotoAccent(img));
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) applyAccent();
  }, [file, applyAccent]);

  const resetPointer = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
    setSpot({ x: 50, y: 50 });
  }, [mx, my]);

  const onPointerMove = useCallback(
    (e) => {
      if (e.pointerType !== "mouse") return;
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      mx.set(px);
      my.set(py);
      setSpot({
        x: Math.max(0, Math.min(100, px * 100)),
        y: Math.max(0, Math.min(100, py * 100)),
      });
    },
    [mx, my]
  );

  const cssVars = {
    "--photo-r": accent.r,
    "--photo-g": accent.g,
    "--photo-b": accent.b,
    "--spot-x": `${spot.x}%`,
    "--spot-y": `${spot.y}%`,
  };

  return (
    <div className={styles.tileWrap}>
      <motion.figure
        className={styles.tile}
        style={cssVars}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.48,
          delay: Math.min(index * 0.05, 0.6),
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className={styles.frame}>
          <motion.div
            ref={tiltRef}
            className={styles.frameInset}
            tabIndex={0}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onPointerMove={onPointerMove}
            onPointerLeave={resetPointer}
          >
            <div className={styles.media}>
              <div className={styles.spotlight} aria-hidden />
              <div className={styles.imgLift} style={{ transform: "translateZ(8px)" }}>
                <img
                  ref={imgRef}
                  src={`/assets/${file}`}
                  alt=""
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                  onLoad={applyAccent}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.figure>
    </div>
  );
}
