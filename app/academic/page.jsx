"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import ListingPageHero from "../../components/ListingPageHero";
import ParsaListingLayout from "../../components/ParsaListingLayout";
import ParsaPageHero from "../../components/ParsaPageHero";
import ArianListingLayout from "../../components/ArianListingLayout";
import ArianPageHero from "../../components/ArianPageHero";
import listing from "../../components/HebiExperienceListing.module.scss";
import { useTheme } from "../../components/ThemeProvider";
import { getAcademicEntries, getArianPageCopy, getParsaPageCopy } from "../../lib/content";
import styles from "./AcademicPage.module.scss";

export default function AcademicPage() {
  const { theme } = useTheme();
  const isParsa = theme === "dark";
  const isArian = theme === "arian";
  const entries = useMemo(() => getAcademicEntries(theme), [theme]);
  const parsaCopy = useMemo(() => getParsaPageCopy("academic"), []);
  const arianCopy = useMemo(() => getArianPageCopy("academic"), []);

  const list = (
    <div className={styles.list}>
      {entries.map((item, index) => (
        <motion.article
          key={item.id}
          className={
            isParsa
              ? `${styles.card} ${styles.parsaCard}`
              : isArian
                ? `${styles.card} ${styles.arianCard}`
                : styles.card
          }
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: Math.min(index * 0.08, 0.6),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {isParsa ? (
            <span className={styles.logPrefix} aria-hidden>
              {"> log["}
              {String(index + 1).padStart(2, "0")}
              {"]"}
            </span>
          ) : null}
          {isArian ? (
            <span className={styles.arianPrefix} aria-hidden>
              ✓ credential[
              {String(index + 1).padStart(2, "0")}
              ]
            </span>
          ) : null}
          <p className={styles.period}>{item.period}</p>
          <h2 className={styles.cardTitle}>{item.title}</h2>
          <p className={styles.institution}>{item.institution}</p>
          <p className={styles.summary}>{item.summary}</p>
        </motion.article>
      ))}
    </div>
  );

  if (isParsa) {
    return (
      <ParsaListingLayout>
        <ParsaPageHero
          eyebrow={parsaCopy.eyebrow}
          title={parsaCopy.title}
          kicker={parsaCopy.kicker}
          meta={parsaCopy.meta}
        />
        {list}
      </ParsaListingLayout>
    );
  }

  if (isArian) {
    return (
      <ArianListingLayout>
        <ArianPageHero
          eyebrow={arianCopy.eyebrow}
          title={arianCopy.title}
          kicker={arianCopy.kicker}
          meta={arianCopy.meta}
        />
        {list}
      </ArianListingLayout>
    );
  }

  return (
    <div className={listing.page}>
      <div className={listing.backdrop} aria-hidden>
        <div className={`${listing.blob} ${listing.blobTeal}`} />
        <div className={`${listing.blob} ${listing.blobSlate}`} />
        <div className={listing.grid} />
      </div>
      <div className={listing.content}>
        <ListingPageHero
          eyebrow="Scholarship"
          title="Academic"
          kicker="Degrees, research, and teaching — sourced from the same data layer as projects and photography."
        />
        {list}
      </div>
    </div>
  );
}
