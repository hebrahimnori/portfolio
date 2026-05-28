"use client";

import { motion } from "framer-motion";

import styles from "./ArianExperienceGrid.module.scss";

export default function ArianExperienceGrid({ items }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.timeline} aria-hidden />
      <div className={styles.grid}>
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className={styles.card}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.09, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.node} aria-hidden>
              <span className={styles.nodeInner} />
            </div>
            <header className={styles.head}>
              <span className={styles.pass}>PASSED</span>
              <span className={styles.suite}>SUITE-{String(item.id).slice(-2)}</span>
            </header>
            <p className={styles.period}>{item.period}</p>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.company}>
              <span className={styles.companyMark} aria-hidden />
              {item.company}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <p className={styles.desc}>{item.description}</p>
            {item.skills?.length ? (
              <ul className={styles.tools}>
                {item.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            ) : null}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
