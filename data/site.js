/**
 * Site “persona” is tied to color theme (single app, three experiences):
 * - **Light** → Hebi (UI/UX + front-end, photography in dock)
 * - **Dark** → Parsa (academic in dock, backend focus)
 * - **Arian** → QA · test automation · quality engineering (academic in dock)
 *
 * Theme is cycled in the dock; `localStorage` persists choice.
 */

/** @typedef {"parsa" | "hebi" | "arian"} SitePersona */

/**
 * @param {"light" | "dark" | "arian"} theme
 * @returns {SitePersona}
 */
export function getSitePersonaFromTheme(theme) {
  if (theme === "light") return "hebi";
  if (theme === "arian") return "arian";
  return "parsa";
}

/** Hebi home (light theme) — orbit + logo experience. */
export const HEBI_EXPERIENCE_PATH = "/";

/** Dark home (Parsa) — typewriter lines. */
export function getHomeTypewriterStrings() {
  return ["Parsa's Portfolio Portal !"];
}

export function getHebiExperienceCopy() {
  return {
    kicker: "Atelier · Hebi",
    lines: ["Design", "the", "interface", "Ship", "the", "product"],
    statement:
      "Apps, front-end systems, and UI/UX — built with motion, typography, and intent.",
    panels: [
      {
        id: "apps",
        index: "01",
        title: "Applications",
        body: "Native & web surfaces — flows that feel inevitable, not decorated.",
      },
      {
        id: "front",
        index: "02",
        title: "Front-end",
        body: "React, performance, design systems — code that matches the mock.",
      },
      {
        id: "ux",
        index: "03",
        title: "UI / UX",
        body: "Research, wireframes, polish — clarity before chrome.",
      },
      {
        id: "motion",
        index: "04",
        title: "Motion",
        body: "GSAP choreography — scroll, pin, and reveal with purpose.",
      },
    ],
    marquee: "Hebi · App · Front-end · UI/UX · Hebi · App · Front-end · UI/UX · ",
    ctaClassic: "Classic home",
    ctaProjects: "View projects",
  };
}

/** First paint before `localStorage` (dock toggle still switches). */
export function getDefaultColorTheme() {
  return "dark";
}

export const COLOR_THEME_STORAGE_KEY = "portfolio-color-theme";

/** Hebi ambient + UI clicks (light theme). Off by default (browser autoplay). */
export const SOUND_ENABLED_STORAGE_KEY = "portfolio-sound-enabled";

/** Bump when replacing files in public/audio/hebi/ (cache-bust). */
export const HEBI_AUDIO_VERSION = "8";

/** Spline `scene.splinecode` URL — dark home hero (Parsa). */
export const HOME_SPLINE_DARK =
  "https://prod.spline.design/lybSTOyRGqk2Rexk/scene.splinecode";

export function isMySplineViewerUrl(u) {
  return /my\.spline\.design/i.test(String(u ?? ""));
}

/**
 * URL usable by `@splinetool/react-spline` only if it is a real **Export → Code**
 * `https://prod.spline.design/<id>/scene.splinecode` link (HTTP 200 JSON body).
 * Never derive this from `my.spline.design/...` alone — IDs differ / access may 403.
 */
export function toReactSplineSceneUrl(input) {
  const u = String(input ?? "").trim();
  if (!u) return null;
  if (/scene\.splinecode(\?|#|$)/i.test(u)) return u;
  const m = u.match(/^https?:\/\/prod\.spline\.design\/([^/?#]+)\/?$/i);
  if (!m) return null;
  const id = decodeURIComponent(m[1]);
  if (/\.splinecode$/i.test(id)) return u;
  return `https://prod.spline.design/${id}/scene.splinecode`;
}

/** Light home: `react-spline` scene URL from env, or `null` (built-in animated mesh). */
export function getHomeLightReactSplineSceneUrl() {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_HOME_LIGHT_SPLINE_URL
      : undefined;
  const t = raw != null ? String(raw).trim() : "";
  if (!t) return null;
  if (isMySplineViewerUrl(t)) return null;
  return toReactSplineSceneUrl(t);
}
