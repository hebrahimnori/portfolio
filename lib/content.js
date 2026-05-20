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

/**
 * @param {"light" | "dark"} [theme]
 */
export function getProjects(theme = "light") {
  return theme === "dark" ? PARSA_PROJECTS : PROJECTS_DATA;
}

export function getPhotographyFilenames() {
  return PHOTOGRAPHY_FILENAMES;
}

export function getAcademicEntries() {
  return ACADEMIC_ENTRIES;
}

/**
 * @param {"light" | "dark"} [theme]
 */
export function getAboutContent(theme = "light") {
  return theme === "dark" ? PARSA_ABOUT : ABOUT_CONTENT;
}

/** @param {"projects" | "academic" | "about"} page */
export function getParsaPageCopy(page) {
  return PARSA_PAGE_COPY[page];
}
