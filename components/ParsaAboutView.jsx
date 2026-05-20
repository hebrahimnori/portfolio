"use client";

import Link from "next/link";

import styles from "./ParsaAboutView.module.scss";

const TONE_CLASS = {
  blue: styles.statBlue,
  pink: styles.statPink,
  slate: styles.statSlate,
};

export default function ParsaAboutView({ about, skillMarquee }) {
  return (
    <div className={styles.root}>
      <section className={styles.terminal} aria-label="Profile">
        <div className={styles.termBar}>
          <span className={styles.termDot} data-tone="r" />
          <span className={styles.termDot} data-tone="y" />
          <span className={styles.termDot} data-tone="g" />
          <span className={styles.termTitle}>parsa@portfolio — zsh</span>
        </div>
        <div className={styles.termBody}>
          <p className={styles.line}>
            <span className={styles.cmd}>$</span> whoami
          </p>
          <p className={styles.out}>{about.name}</p>
          <p className={styles.line}>
            <span className={styles.cmd}>$</span> cat role.txt
          </p>
          <p className={styles.outAccent}>{about.roleLine}</p>
          <p className={styles.line}>
            <span className={styles.cmd}>$</span> {about.aboutTitle.replace("$ ", "")}
          </p>
          <p className={styles.out}>{about.aboutBody}</p>
          {about.employer ? (
            <>
              <p className={styles.line}>
                <span className={styles.cmd}>$</span> npm list --depth=0
              </p>
              <div className={styles.pkgRow}>
                <span className={styles.pkgName}>{about.employer.name}</span>
                <span className={styles.pkgVer}>{about.employer.role}</span>
              </div>
              <p className={styles.pkgMeta}>{about.employer.focus}</p>
            </>
          ) : null}
          <p className={styles.comment}>{about.quoteLine}</p>
        </div>
      </section>

      <section className={styles.metrics} aria-label="Focus">
        <p className={styles.sectionLabel}>
          <span className={styles.sectionMark} aria-hidden />
          metrics
        </p>
        <div className={styles.statTrack}>
          {about.stats.map((s, i) => (
            <article
              key={s.id}
              className={`${styles.statCard} ${TONE_CLASS[s.tone] ?? ""}`}
              style={{ "--i": i }}
            >
              <span className={styles.statKey}>{s.id}</span>
              <h3 className={styles.statVal}>{s.label}</h3>
              <p className={styles.statSub}>{s.sub}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.stackZone} aria-label="Stack">
        <p className={styles.sectionLabel}>
          <span className={styles.sectionMark} aria-hidden />
          stack --watch
        </p>
        <div className={styles.marqueeFade} aria-hidden />
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeInner}>
            {skillMarquee.map((skill, i) => (
              <span key={`${skill}-${i}`} className={styles.marqueeItem}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.commandBar}>
        <p className={styles.commandPitch}>
          <span className={styles.cmd}>$</span> {about.footerLine}
        </p>
        <div className={styles.commandActions}>
          <Link href={about.hire.mailto} className={styles.commandPrimary}>
            {about.hire.label}
            <span aria-hidden>↵</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/hebinouri/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.commandLink}
          >
            linkedin
          </Link>
          <Link
            href="https://github.com/hebrahimnori"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.commandLink}
          >
            github
          </Link>
        </div>
      </footer>
    </div>
  );
}
