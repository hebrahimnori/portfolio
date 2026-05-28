import styles from "./ArianBackdrop.module.scss";

/** Shared ambient layer for Arian (QA) routes. */
export default function ArianBackdrop() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.orbA} />
      <div className={styles.orbB} />
      <div className={styles.orbC} />
      <div className={styles.grid} />
      <div className={styles.scan} />
      <div className={styles.stripe} />
    </div>
  );
}
