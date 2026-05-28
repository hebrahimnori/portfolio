"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./VitalizeChip.module.scss";

function focusTags(focus) {
  if (!focus) return [];
  return focus
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);
}

function SiteLink({ url, className, children, ...rest }) {
  if (!url) return null;
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}

/**
 * @param {object} props
 * @param {ReturnType<import("../data/vitalize").getVitalize>} props.vitalize
 * @param {"light" | "dark" | "arian"} [props.variant]
 */
export default function VitalizeChip({ vitalize, variant = "light" }) {
  if (!vitalize) return null;

  const tags = focusTags(vitalize.focus);
  const dataAttrs = {
    "data-vitalize-chip": true,
    ...(variant === "light" ? { "data-about-vitalize": "" } : {}),
    ...(variant === "dark" ? { "data-parsa-pkg": "" } : {}),
    ...(variant === "arian" ? { "data-arian-vitalize": "" } : {}),
  };

  const logo = (
    <Image
      src={vitalize.logoSrc}
      alt={vitalize.logoAlt}
      width={320}
      height={64}
      className={styles.logo}
    />
  );

  const logoLink = vitalize.url ? (
    <SiteLink
      url={vitalize.url}
      className={styles.logoLink}
      aria-label={`${vitalize.name} — open website`}
    >
      {logo}
    </SiteLink>
  ) : (
    logo
  );

  if (variant === "dark") {
    return (
      <article
        className={`${styles.card} ${styles.parsa}`}
        {...dataAttrs}
        aria-label={`${vitalize.name} — ${vitalize.role}`}
      >
        <div className={styles.parsaFrame} aria-hidden>
          <span className={styles.frameCorner}>╔</span>
          <span className={styles.frameTitle}> dependency :: vitalize </span>
          <span className={styles.frameCorner}>╗</span>
        </div>
        <div className={styles.parsaBody}>
          <div className={styles.parsaLogoRail}>{logoLink}</div>
          <dl className={styles.parsaKv}>
            <div className={styles.parsaRow}>
              <dt>package</dt>
              <dd>
                <span className={styles.parsaPkg}>{vitalize.name.toLowerCase()}</span>
                <span className={styles.parsaVer}>@workspace</span>
              </dd>
            </div>
            <div className={styles.parsaRow}>
              <dt>role</dt>
              <dd className={styles.parsaAccent}>{vitalize.role}</dd>
            </div>
            <div className={styles.parsaRow}>
              <dt>org</dt>
              <dd>
                {vitalize.atLabel} <strong>{vitalize.name}</strong>
              </dd>
            </div>
            {tags.length > 0 ? (
              <div className={styles.parsaRow}>
                <dt>deps</dt>
                <dd className={styles.parsaDeps}>
                  {tags.map((t) => (
                    <span key={t} className={styles.parsaDep}>
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
            <div className={styles.parsaRow}>
              <dt>url</dt>
              <dd>
                <SiteLink url={vitalize.url} className={styles.parsaUrl}>
                  vitalize.dev<span className={styles.parsaCursor} aria-hidden>_</span>
                </SiteLink>
              </dd>
            </div>
          </dl>
        </div>
        <div className={styles.parsaFrameBottom} aria-hidden>
          <span>╚</span>
          <span className={styles.frameFill} />
          <span>╝</span>
        </div>
      </article>
    );
  }

  if (variant === "arian") {
    return (
      <article
        className={`${styles.card} ${styles.arian}`}
        {...dataAttrs}
        aria-label={`${vitalize.name} — ${vitalize.role}`}
      >
        <header className={styles.arianBar}>
          <div className={styles.arianBarLeft}>
            <span className={styles.arianId}>ORG::VITALIZE</span>
            <span className={styles.arianSep} aria-hidden />
            <span className={styles.arianMeta}>leadership.node</span>
          </div>
          <div className={styles.arianBarRight}>
            <span className={styles.arianStatus} aria-hidden />
            <span className={styles.arianPass}>PASS</span>
            <span className={styles.arianMs}>0.8s</span>
          </div>
        </header>

        <div className={styles.arianLogoRail}>{logoLink}</div>

        <div className={styles.arianMain}>
          <p className={styles.arianEyebrow}>
            {vitalize.atLabel} {vitalize.name}
          </p>
          <h3 className={styles.arianRole}>{vitalize.role}</h3>

          <div className={styles.arianGrid} role="list">
            <div className={styles.arianCell} role="listitem">
              <span className={styles.arianKey}>function</span>
              <span className={styles.arianVal}>executive.lead()</span>
            </div>
            <div className={styles.arianCell} role="listitem">
              <span className={styles.arianKey}>coverage</span>
              <span className={styles.arianVal}>100%</span>
            </div>
          </div>

          {tags.length > 0 ? (
            <ul className={styles.arianTags} aria-label="Focus">
              {tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : null}

          <SiteLink url={vitalize.url} className={styles.arianCta}>
            Open vitalize.dev
            <span className={styles.arianCtaArrow} aria-hidden>
              →
            </span>
          </SiteLink>
        </div>
      </article>
    );
  }

  const hebiInner = (
    <>
      <div className={styles.hebiLogo}>{logo}</div>
      <div className={styles.hebiText}>
        <p className={styles.hebiEyebrow}>
          <span className={styles.hebiDot} aria-hidden />
          {vitalize.atLabel} {vitalize.name}
        </p>
        <p className={styles.hebiRole}>{vitalize.role}</p>
      </div>
      <span className={styles.hebiGo} aria-hidden>
        ↗
      </span>
    </>
  );

  if (vitalize.url) {
    return (
      <SiteLink
        url={vitalize.url}
        className={`${styles.card} ${styles.hebi}`}
        {...dataAttrs}
        aria-label={`${vitalize.name} — ${vitalize.role}`}
      >
        {hebiInner}
      </SiteLink>
    );
  }

  return (
    <article
      className={`${styles.card} ${styles.hebi}`}
      {...dataAttrs}
      aria-label={`${vitalize.name} — ${vitalize.role}`}
    >
      {hebiInner}
    </article>
  );
}
