/**
 * Parsa persona (dark theme) — backend / systems focus.
 */

import { getVitalize } from "./vitalize";

export const PARSA_ABOUT = {
  greeting: "Hey, I'm",
  name: "Parsa",
  roleLine: "Backend engineer — APIs · data · infra",
  portraitSrc: "/assets/hebipi.png",
  portraitAlt: "Parsa",
  aboutTitle: "$ cat about.txt",
  aboutBody:
    "I build the layer under the UI — REST and GraphQL APIs, auth, queues, databases, and deploy pipelines. I care about clear contracts, observability, and systems that stay up when traffic spikes.",
  vitalize: getVitalize("parsa"),
  stats: [
    { id: "api", label: "APIs", sub: "REST · GraphQL", tone: "blue" },
    { id: "data", label: "Data", sub: "SQL · Redis", tone: "pink" },
    { id: "ops", label: "Ops", sub: "Docker · CI/CD", tone: "slate" },
  ],
  skills: [
    "Node.js",
    "Python",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "Docker",
    "TypeScript",
    "FastAPI",
    "Prisma",
    "AWS",
  ],
  quoteLine: "// Ship services that scale — measure everything, break nothing on Friday.",
  footerLine: "Open to backend roles, platform work, and hard problems.",
  hire: {
    label: "ping @parsa",
    mailto: "mailto:hebrahimnori@gmail.com",
  },
};

/** Backend-angled project list (reuses existing media where possible). */
export const PARSA_PROJECTS = [
  {
    id: 201,
    title: "Collegemate Platform",
    type: "case",
    description:
      "Full-stack platform with real-time scheduling, video sessions, and admin analytics — backend-heavy flows for mentors, students, and ops dashboards.",
    imageType: "video",
    imageURL: "prjcollege.mp4",
    skills: ["Node.js", "PostgreSQL", "WebSockets", "Vue", "Nuxt"],
    button: false,
  },
  {
    id: 202,
    title: "Qutline Ordering Engine",
    type: "project",
    description:
      "Restaurant ordering stack with SSR, secure payments, and kitchen workflows — API design and data modeling for menus, orders, and fulfillment.",
    imageType: "video",
    imageURL: "prjqut.mp4",
    skills: ["Nuxt", "API routes", "PWA", "PostgreSQL", "Auth"],
    button: false,
  },
  {
    id: 203,
    title: "Detailmaxx Ops API",
    type: "project",
    description:
      "Car-wash management backend tying owners, staff, and customers — financial charts fed by aggregated service data and role-based access.",
    imageType: "video",
    imageURL: "prjdetail.mp4",
    skills: ["Nuxt", "Charts API", "RBAC", "Real-time"],
    button: false,
  },
  {
    id: 204,
    title: "Qutline Marketing Site",
    type: "project",
    description:
      "High-performance marketing surface with SSR and dark-mode UX — optimized payloads and edge-friendly asset delivery.",
    imageType: "video",
    imageURL: "qutlinevid.mp4",
    skills: ["SSR", "Vue", "Performance", "SEO"],
    button: false,
  },
];

export const PARSA_PAGE_COPY = {
  projects: {
    eyebrow: "SYS / deploy",
    title: "PROJECTS",
    kicker: "Services, APIs, and data layers — the work behind the product.",
    meta: "status: 200 OK · env: production",
  },
  academic: {
    eyebrow: "SYS / edu",
    title: "ACADEMIC",
    kicker: "Degrees, research, and teaching — logged like a changelog.",
    meta: "branch: main · commits: ongoing",
  },
  about: {
    eyebrow: "SYS / profile",
    title: "ABOUT",
    kicker: "Backend engineer profile — read from stdin.",
    meta: "user: parsa · shell: zsh",
  },
};
