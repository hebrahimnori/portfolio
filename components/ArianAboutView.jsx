"use client";

import { useRef } from "react";
import Link from "next/link";

import VitalizeChip from "./VitalizeChip";
import styles from "./ArianAboutView.module.scss";
import { useArianAboutEntrance } from "./useArianAboutEntrance";

const TONE_CLASS = {
  pass: styles.statPass,
  run: styles.statRun,
  info: styles.statInfo,
};

export default function ArianAboutView({ about }) {
  const rootRef = useRef(null);
  useArianAboutEntrance(rootRef);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.grid}>
        <section className={styles.profileCard} data-arian-profile aria-label="Profile">
          <header className={styles.cardHead}>
            <span className={styles.statusPill}>
              <span className={styles.pillDot} aria-hidden />
              VERIFIED
            </span>
            <span className={styles.cardId}>profile.spec</span>
          </header>
          <h2 className={styles.name}>{about.name}</h2>
          <p className={styles.role}>{about.roleLine}</p>
          <p className={styles.body}>{about.aboutBody}</p>
          {about.vitalize ? (
            <VitalizeChip vitalize={about.vitalize} variant="arian" />
          ) : null}
          {about.employer ? (
            <div className={styles.employer} data-arian-employer>
              <p className={styles.employerLabel}>Current role</p>
              <p className={styles.employerRow}>
                <strong>{about.employer.name}</strong>
                <span>{about.employer.role}</span>
              </p>
              <p className={styles.employerMeta}>
                {about.employer.location} · {about.employer.period}
              </p>
              <p className={styles.employerTools}>{about.employer.focus}</p>
            </div>
          ) : null}
          {about.contact ? (
            <div className={styles.contactBlock} data-arian-contact>
              <p>
                <span className={styles.contactKey}>email</span> {about.contact.email}
              </p>
              <p>
                <span className={styles.contactKey}>phone</span> {about.contact.phone}
              </p>
              <p>
                <span className={styles.contactKey}>status</span> {about.contact.citizenship}
              </p>
            </div>
          ) : null}
          <blockquote className={styles.quote}>{about.quoteLine}</blockquote>
        </section>

        <div className={styles.sideCol}>
          <section className={styles.metrics} data-arian-metrics aria-label="Metrics">
            <p className={styles.sectionLabel}>Quality metrics</p>
            <div className={styles.statTrack}>
              {about.stats.map((s) => (
                <article
                  key={s.id}
                  className={`${styles.statCard} ${TONE_CLASS[s.tone] ?? ""}`}
                  data-arian-stat
                >
                  <span className={styles.statVal}>{s.label}</span>
                  <span className={styles.statSub}>{s.sub}</span>
                </article>
              ))}
            </div>
          </section>

          {about.testDisciplines?.length ? (
            <section className={styles.disciplines} data-arian-disciplines>
              <p className={styles.sectionLabel}>Coverage areas</p>
              <ul className={styles.checkList}>
                {about.testDisciplines.map((d) => (
                  <li key={d}>
                    <span className={styles.check} aria-hidden>
                      ✓
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className={styles.stackZone} data-arian-stack aria-label="Toolkit">
            <p className={styles.sectionLabel}>Toolkit</p>
            <div className={styles.tagTrack}>
              {about.skills.map((skill) => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className={styles.commandBar} data-arian-command>
        <p className={styles.footerLine}>{about.footerLine}</p>
        <div className={styles.actions}>
          <Link href={about.hire.mailto} className={styles.primary}>
            {about.hire.label}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
