"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./AboutPage.module.scss";

/** Hebi About — compact row using page-native styles (fits copy column). */
export default function AboutVitalizeRow({ vitalize }) {
  if (!vitalize) return null;

  return (
    <div className={styles.vitalizeRow} data-about-vitalize>
      <div className={styles.vitalizeLogoChip}>
        <Link
          href={vitalize.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.vitalizeLogoLink}
          aria-label={`${vitalize.name} — open website`}
        >
          <Image
            src={vitalize.logoSrc}
            alt={vitalize.logoAlt}
            width={280}
            height={56}
            className={styles.vitalizeLogo}
          />
        </Link>
      </div>
      <div className={styles.vitalizeCopy}>
        <p className={styles.vitalizeAt}>
          {vitalize.atLabel} {vitalize.name}
        </p>
        <p className={styles.vitalizeLine}>{vitalize.role}</p>
      </div>
      <Link
        href={vitalize.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.vitalizeVisit}
        aria-label="Visit vitalize.dev"
      >
        ↗
      </Link>
    </div>
  );
}
