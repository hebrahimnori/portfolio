/**
 * App-wide content access. Everything is hardcoded today; swap these functions
 * for Directus (or another headless CMS) later without changing page components.
 *
 * Example future shape:
 *   export async function getProjects() {
 *     const res = await directus.items('projects').readByQuery({ filter: { site: { _eq: getSitePersonaFromTheme(theme) } } });
 *     return res.data;
 *   }
 */

import { PROJECTS_DATA } from "../data/projects";
import { PHOTOGRAPHY_FILENAMES } from "../data/photography";
import { ACADEMIC_ENTRIES } from "../data/academic";
import { ABOUT_CONTENT } from "../data/about";
import {
  PARSA_ABOUT,
  PARSA_PAGE_COPY,
  PARSA_PROJECTS,
} from "../data/parsa";
import {
  ARIAN_ABOUT,
  ARIAN_ACADEMIC,
  ARIAN_PAGE_COPY,
  ARIAN_PROJECTS,
} from "../data/arian";

/**
 * @param {"light" | "dark" | "arian"} [theme]
 */
export function getProjects(theme = "light") {
  if (theme === "dark") return PARSA_PROJECTS;
  if (theme === "arian") return ARIAN_PROJECTS;
  return PROJECTS_DATA;
}

export function getPhotographyFilenames() {
  return PHOTOGRAPHY_FILENAMES;
}

/**
 * @param {"light" | "dark" | "arian"} [theme]
 */
export function getAcademicEntries(theme = "light") {
  if (theme === "arian") return ARIAN_ACADEMIC;
  return ACADEMIC_ENTRIES;
}

/**
 * @param {"light" | "dark" | "arian"} [theme]
 */
export function getAboutContent(theme = "light") {
  if (theme === "dark") return PARSA_ABOUT;
  if (theme === "arian") return ARIAN_ABOUT;
  return ABOUT_CONTENT;
}

/** @param {"projects" | "academic" | "about"} page */
export function getParsaPageCopy(page) {
  return PARSA_PAGE_COPY[page];
}

/** @param {"projects" | "academic" | "about"} page */
export function getArianPageCopy(page) {
  return ARIAN_PAGE_COPY[page];
}
