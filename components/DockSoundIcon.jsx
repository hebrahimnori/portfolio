import styles from "./DockSoundIcon.module.scss";

const SPEAKER =
  "M3.15848 13.9299C2.80876 13.3469 2.62402 12.6798 2.62402 11.9999C2.62402 11.32 2.80876 10.6529 3.15848 10.0699C3.26602 9.89042 3.40992 9.73542 3.58093 9.61487C3.75195 9.49431 3.94629 9.41087 4.15148 9.3699L5.84448 9.0309C5.94544 9.01091 6.03651 8.95691 6.10248 8.8779L8.17048 6.3949C9.35248 4.9749 9.94448 4.2659 10.4715 4.4569C11.0005 4.6479 11.0005 5.5719 11.0005 7.4199V16.5819C11.0005 18.4289 11.0005 19.3519 10.4725 19.5439C9.94548 19.7339 9.35348 19.0249 8.17148 17.6059L6.10048 15.1219C6.03476 15.0431 5.94408 14.9891 5.84348 14.9689L4.15048 14.6299C3.94529 14.5889 3.75095 14.5055 3.57993 14.3849C3.40892 14.2644 3.26602 14.1094 3.15848 13.9299Z";

const STROKE = "#7A7A7A";

export default function DockSoundIcon({ on, disabled }) {
  const active = on && !disabled;

  return (
    <svg
      className={`${styles.icon} ${active ? styles.isOn : styles.isOff}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={SPEAKER} fill={STROKE} stroke={STROKE} strokeWidth="2" />

      <g className={styles.waves}>
        <path
          className={styles.waveA}
          d="M15.5361 8.46402C16.4692 9.39701 16.9956 10.661 17.0006 11.9805C17.0057 13.2999 16.489 14.5679 15.5631 15.508"
          stroke={STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className={styles.waveB}
          d="M19.6571 6.34302C21.15 7.83568 21.9923 9.8579 22.0005 11.969C22.0088 14.08 21.1823 16.1087 19.7011 17.613"
          stroke={STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <g className={styles.muteBars} stroke={STROKE} strokeWidth="2" strokeLinecap="round">
        <line className={styles.bar} x1="15.75" y1="9" x2="15.75" y2="15" />
        <line className={styles.bar} x1="19" y1="9" x2="19" y2="15" />
      </g>
    </svg>
  );
}
