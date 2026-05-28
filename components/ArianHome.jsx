"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ArianBackdrop from "./ArianBackdrop";
import styles from "./ArianHome.module.scss";
import {
  ARIAN_HOME_SUITES,
  ARIAN_HOME_SUMMARY,
  ARIAN_HOME_TOOLS,
  ARIAN_PIPELINE,
} from "../data/arian";

export default function ArianHome() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    document.documentElement.classList.add("hebi-experience-lock");
    document.body.classList.add("hebi-experience-lock");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return () => {
        document.documentElement.classList.remove("hebi-experience-lock");
        document.body.classList.remove("hebi-experience-lock");
      };
    }

    const panel = root.querySelector("[data-arian-panel]");
    const rows = root.querySelectorAll("[data-arian-suite]");
    const bar = root.querySelector("[data-arian-bar]");
    const ring = root.querySelector("[data-arian-ring]");
    const hero = root.querySelector("[data-arian-hero]");
    const stats = root.querySelectorAll("[data-arian-stat]");
    const countEls = root.querySelectorAll("[data-arian-count]");
    const pipeline = root.querySelectorAll("[data-arian-pipe]");
    const chips = root.querySelectorAll("[data-arian-chip]");

    const ctx = gsap.context(() => {
      if (panel) gsap.set(panel, { opacity: 0, y: 32, scale: 0.98 });
      gsap.set(rows, { opacity: 0, x: -16 });
      if (bar) gsap.set(bar, { scaleX: 0 });
      if (ring) gsap.set(ring, { opacity: 0, scale: 0.85 });
      if (hero) gsap.set(hero, { opacity: 0, y: 20 });
      gsap.set(stats, { opacity: 0, y: 14, scale: 0.96 });
      gsap.set(pipeline, { opacity: 0, y: 10 });
      gsap.set(chips, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ delay: 0.12 });

      if (panel) {
        tl.to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" });
      }
      if (ring) {
        tl.to(ring, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, "-=0.45");
      }
      if (bar) {
        tl.to(bar, { scaleX: 1, duration: 1.25, ease: "power2.inOut" }, "-=0.55");
      }
      tl.to(
        rows,
        { opacity: 1, x: 0, duration: 0.38, stagger: 0.07, ease: "power2.out" },
        "-=0.85"
      );

      countEls.forEach((el) => {
        const target = Number(el.getAttribute("data-arian-count") || 0);
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.val));
            },
          },
          "-=0.9"
        );
      });

      if (hero) {
        tl.to(hero, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.7");
      }
      tl.to(stats, { opacity: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.08 }, "-=0.45");
      tl.to(pipeline, { opacity: 1, y: 0, duration: 0.38, stagger: 0.06 }, "-=0.35");
      tl.to(chips, { opacity: 1, y: 0, duration: 0.32, stagger: 0.04 }, "-=0.28");
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("hebi-experience-lock");
      document.body.classList.remove("hebi-experience-lock");
    };
  }, []);

  return (
    <div ref={rootRef} className={`main_page ${styles.root}`}>
      <ArianBackdrop />

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <section className={styles.panel} data-arian-panel aria-label="Test run status">
            <header className={styles.panelHead}>
              <div className={styles.headLeft}>
                <span className={styles.liveDot} aria-hidden />
                <div>
                  <p className={styles.runLabel}>quality-suite</p>
                  <p className={styles.runId}>run #2026-arian · main · Jenkins</p>
                </div>
              </div>
              <span className={styles.runBadge}>
                <span className={styles.badgePulse} aria-hidden />
                ALL PASS
              </span>
            </header>

            <div className={styles.summaryRow}>
              <div className={styles.ringWrap} data-arian-ring>
                <div
                  className={styles.ring}
                  style={{ "--pct": `${ARIAN_HOME_SUMMARY.coverage}` }}
                >
                  <span className={styles.ringVal}>{ARIAN_HOME_SUMMARY.coverage}%</span>
                </div>
              </div>
              <div className={styles.summaryStats}>
                <div className={styles.summaryStat}>
                  <span className={styles.summaryVal}>
                    <span data-arian-count={ARIAN_HOME_SUMMARY.tests}>0</span>
                  </span>
                  <span className={styles.summaryLbl}>tests</span>
                </div>
                <div className={styles.summaryStat}>
                  <span className={styles.summaryVal} data-tone="fail">
                    <span data-arian-count={ARIAN_HOME_SUMMARY.failed}>0</span>
                  </span>
                  <span className={styles.summaryLbl}>failed</span>
                </div>
                <div className={styles.summaryStat}>
                  <span className={styles.summaryVal}>{ARIAN_HOME_SUMMARY.duration}</span>
                  <span className={styles.summaryLbl}>duration</span>
                </div>
              </div>
            </div>

            <div className={styles.progressWrap}>
              <div className={styles.progressMeta}>
                <span>Execution</span>
                <span className={styles.progressPct}>100%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressBar} data-arian-bar />
              </div>
            </div>

            <ul className={styles.suiteList}>
              {ARIAN_HOME_SUITES.map((suite, i) => (
                <li
                  key={suite.id}
                  className={styles.suiteRow}
                  data-arian-suite
                  style={{ "--i": i }}
                >
                  <span className={styles.suiteStatus}>PASS</span>
                  <span className={styles.suiteName}>{suite.label}</span>
                  <span className={styles.suiteTime}>{suite.duration}</span>
                </li>
              ))}
            </ul>
          </section>

          <ol className={styles.pipeline} aria-label="QA pipeline">
            {ARIAN_PIPELINE.map((step, i) => (
              <li key={step.id} className={styles.pipeStep} data-arian-pipe style={{ "--i": i }}>
                <span className={styles.pipeIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className={styles.pipeLabel}>{step.label}</span>
                  <span className={styles.pipeDetail}>{step.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <section className={styles.hero} data-arian-hero>
          <p className={styles.kicker}>
            <span className={styles.kickerMark} aria-hidden />
            Quality Engineering · Portfolio
          </p>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Arian</span>
            <span className={styles.titleAccent}>Amini</span>
          </h1>
          <p className={styles.subtitle}>
            QA Software Manager — test strategy, Selenium & Cucumber automation, and teams that
            ship with confidence.
          </p>

          <div className={styles.statRow}>
            <div className={styles.stat} data-arian-stat>
              <span className={styles.statVal}>
                <span data-arian-count={9}>0</span>+
              </span>
              <span className={styles.statLbl}>Years QA</span>
            </div>
            <div className={styles.stat} data-arian-stat>
              <span className={styles.statVal}>
                <span data-arian-count={8}>0</span>+
              </span>
              <span className={styles.statLbl}>Engineers led</span>
            </div>
            <div className={styles.stat} data-arian-stat>
              <span className={styles.statVal}>CI</span>
              <span className={styles.statLbl}>Jenkins · Jira</span>
            </div>
          </div>

          <div className={styles.chipCloud} aria-label="Toolkit">
            {ARIAN_HOME_TOOLS.map((tool) => (
              <span key={tool} className={styles.chip} data-arian-chip>
                {tool}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
