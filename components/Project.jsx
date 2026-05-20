"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Project.module.scss";
import parsaStyles from "./ParsaProjectCard.module.scss";
import { useTheme } from "./ThemeProvider";

const TYPE_LABEL_HEBI = {
  design: "Design",
  project: "Project",
  case: "Case study",
};

const TYPE_LABEL_PARSA = {
  design: "System",
  project: "Service",
  case: "Backend",
};

function Project({
  title,
  type,
  imageType,
  description,
  imageURL,
  skills,
  button,
}) {
  const { theme } = useTheme();
  const isParsa = theme === "dark";
  const label = (isParsa ? TYPE_LABEL_PARSA : TYPE_LABEL_HEBI)[type] ?? "Project";
  const p = isParsa ? parsaStyles : null;

  return (
    <motion.article
      className={p ? `${styles.card} ${p.card}` : styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={p ? `${styles.cardInset} ${p.cardInset}` : styles.cardInset}>
        <div className={p ? `${styles.mediaFrame} ${p.mediaFrame}` : styles.mediaFrame}>
          {imageType === "photo" && (
            <img src={`/assets/projectimage/${imageURL}`} alt={title} />
          )}
          {imageType === "video" && (
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-label={`${title} preview`}
            >
              <source src={`/assets/projectimage/${imageURL}`} type="video/mp4" />
            </video>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span
              className={p ? `${styles.kindDot} ${p.kindDot}` : styles.kindDot}
              data-kind={type}
              aria-hidden
            />
            <span className={p ? `${styles.kindLabel} ${p.kindLabel}` : styles.kindLabel}>
              {label}
            </span>
          </div>

          <h2 className={p ? `${styles.title} ${p.title}` : styles.title}>{title}</h2>
          <p className={p ? `${styles.desc} ${p.desc}` : styles.desc}>{description}</p>

          {skills?.length ? (
            <p className={p ? `${styles.skillLine} ${p.skillLine}` : styles.skillLine}>
              {skills.join(" · ")}
            </p>
          ) : null}

          {button ? (
            <div className={p ? `${styles.cta} ${p.cta}` : styles.cta}>
              <span>View project</span>
              <span className={styles.ctaArrow} aria-hidden>
                →
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default Project;
