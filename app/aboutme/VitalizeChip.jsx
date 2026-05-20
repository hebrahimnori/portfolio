"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./AboutPage.module.scss";

/** Compact employer row — matches light glass UI, logo on small dark chip only */
export default function VitalizeChip({ vitalize }) {
  if (!vitalize) return null;

  const logo = (
    <Image
      src={vitalize.logoSrc}
      alt={vitalize.logoAlt}
      width={280}
      height={56}
      className={styles.vitalizeLogo}
    />
  );

  return (
    <div className={styles.vitalizeRow} data-about-copy>
      <div className={styles.vitalizeLogoChip}>
        {vitalize.url ? (
          <Link
            href={vitalize.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.vitalizeLogoLink}
          >
            {logo}
          </Link>
        ) : (
          logo
        )}
      </div>
      <div className={styles.vitalizeCopy}>
        <p className={styles.vitalizeAt}>Currently at {vitalize.name}</p>
        <p className={styles.vitalizeLine}>{vitalize.role}</p>
        <p className={styles.vitalizeMeta}>{vitalize.focus}</p>
      </div>
    </div>
  );
}
