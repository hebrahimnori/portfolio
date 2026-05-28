"use client";

import ArianBackdrop from "./ArianBackdrop";
import styles from "./ArianListingLayout.module.scss";

export default function ArianListingLayout({ children, className = "" }) {
  return (
    <div className={`${styles.root} ${className}`.trim()}>
      <div className={styles.backdropSlot}>
        <ArianBackdrop />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
