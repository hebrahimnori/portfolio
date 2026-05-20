"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import listing from "../../components/HebiExperienceListing.module.scss";
import ParsaListingLayout from "../../components/ParsaListingLayout";
import ParsaPageHero from "../../components/ParsaPageHero";
import ParsaAboutView from "../../components/ParsaAboutView";
import { useTheme } from "../../components/ThemeProvider";
import { getAboutContent, getParsaPageCopy } from "../../lib/content";
import styles from "./AboutPage.module.scss";
import AboutTitle from "./AboutTitle";
import { useAboutEntrance } from "./useAboutEntrance";
import VitalizeChip from "./VitalizeChip";

export default function AboutMePage() {
  const { theme } = useTheme();
  const isParsa = theme === "dark";
  const about = useMemo(() => getAboutContent(theme), [theme]);
  const parsaCopy = useMemo(() => getParsaPageCopy("about"), []);
  const [portraitOk, setPortraitOk] = useState(false);
  const rootRef = useRef(null);
  useAboutEntrance(rootRef, { enabled: !isParsa });

  const skillMarquee = useMemo(
    () => [...about.skills, ...about.skills],
    [about.skills]
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
        <ParsaAboutView about={about} skillMarquee={skillMarquee} />
      </ParsaListingLayout>
    );
  }

  return (
    <>
      <div className={`${listing.page} ${styles.pageShell}`}>
        <div className={listing.backdrop} aria-hidden>
          <div className={`${listing.blob} ${listing.blobTeal}`} />
          <div className={`${listing.blob} ${listing.blobSlate}`} />
          <div className={listing.grid} />
        </div>

        <div
          ref={rootRef}
          className={`${listing.content} ${styles.contentTight} ${styles.canvas}`}
        >
          <div className={styles.body}>
            <section className={styles.stage} aria-labelledby="about-label">
              <div className={styles.stageVisual}>
                <div className={styles.portraitFrame}>
                  <div className={styles.portraitPlate} data-about-plate aria-hidden />
                  <div className={styles.portraitFigure} data-about-figure>
                    {!portraitOk ? (
                      <p className={styles.portraitErr}>
                        Add <code>public/assets/hebipi.png</code>
                      </p>
                    ) : null}
                    <Image
                      src={about.portraitSrc}
                      alt={about.portraitAlt}
                      width={1059}
                      height={1188}
                      className={styles.portraitImg}
                      priority
                      sizes="(min-width: 900px) 280px, 72vw"
                      onLoad={() => setPortraitOk(true)}
                      onError={() => setPortraitOk(false)}
                      style={{ visibility: portraitOk ? "visible" : "hidden" }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.stageCol}>
                <header className={styles.profileIntro}>
                  <AboutTitle roleLine={about.roleLine} />
                </header>

                <div className={styles.stageCopy}>
                  <p id="about-label" className={styles.copyLabel} data-about-copy>
                    {about.aboutTitle}
                  </p>
                  <p className={styles.copyLead} data-about-copy>
                    {about.aboutBody}
                  </p>
                  <VitalizeChip vitalize={about.vitalize} />
                  <blockquote className={styles.copyQuote} data-about-copy>
                    {about.quoteLine}
                  </blockquote>
                </div>
              </div>
            </section>

            <section className={styles.lower} aria-label="Highlights and links">
              <div className={styles.statSection}>
                <p className={styles.statSectionLabel} data-about-stat-label>
                  Focus
                </p>
                <div className={styles.statTrack}>
                  {about.stats.map((s, i) => {
                    const index = String(i + 1).padStart(2, "0");
                    return (
                      <article
                        key={s.id}
                        className={styles.statCard}
                        data-about-stat
                        data-tone={s.tone}
                        style={{ "--i": i }}
                      >
                        <span className={styles.statGhost} aria-hidden>
                          {index}
                        </span>
                        <span className={styles.statIndex}>{index}</span>
                        <h3 className={styles.statVal}>{s.label}</h3>
                        <p className={styles.statCap}>{s.sub}</p>
                      </article>
                    );
                  })}
                </div>
              </div>

              <section className={styles.marqueeZone} aria-label="Toolkit" data-about-marquee>
                <p className={styles.marqueeLabel}>Toolkit</p>
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

              <footer className={styles.commandBar} data-about-command>
                <p className={styles.commandPitch}>{about.footerLine}</p>
                <div className={styles.commandActions}>
                  <Link href={about.hire.mailto} className={styles.commandPrimary}>
                    {about.hire.label}
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/hebinouri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.commandLink}
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="https://github.com/hebrahimnori"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.commandLink}
                  >
                    GitHub
                  </Link>
                </div>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
