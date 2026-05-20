"use client";

import styles from "./ParsaListingLayout.module.scss";

/**
 * Parsa (dark) listing shell — matches home portal: #121212, Tiny5-adjacent glows, terminal grid.
 */
export default function ParsaListingLayout({ children, className = "" }) {
  return (
    <div className={`${styles.root} ${className}`.trim()}>
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.glowBlue} />
        <div className={styles.glowPink} />
        <div className={styles.grid} />
        <div className={styles.scanlines} />
        <div className={styles.hudTL} />
        <div className={styles.hudBR} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
