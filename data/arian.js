/**
 * Arian persona (arian theme) — QA · test automation · quality engineering.
 */

import { getVitalize } from "./vitalize";

export const ARIAN_ABOUT = {
  name: "Arian Amini",
  roleLine: "QA Software Manager — test strategy · automation · leadership",
  portraitSrc: "/assets/hebipi.png",
  portraitAlt: "Arian Amini",
  aboutBody:
    "Nine years in software testing across enterprise, healthcare, and retail — from manual and ALM-driven cycles to Selenium/Cucumber automation and CI pipelines. I build test plans, lead QA teams, and partner with product and engineering so quality is embedded from requirements through release.",
  vitalize: getVitalize("arian"),
  employer: {
    name: "SS&C",
    role: "QA Software Manager",
    location: "New York, NY",
    period: "Feb 2022 — Present",
    focus: "8+ engineers · Selenium · Cucumber · Jenkins · JIRA Xray",
  },
  stats: [
    { id: "yrs", label: "9+", sub: "Years in QA", tone: "pass" },
    { id: "team", label: "8+", sub: "Engineers led", tone: "run" },
    { id: "types", label: "6", sub: "Test disciplines", tone: "info" },
  ],
  testDisciplines: [
    "Regression",
    "Smoke",
    "Functional",
    "Integration",
    "UAT",
    "System",
  ],
  skills: [
    "Selenium WebDriver",
    "Cucumber",
    "TestNG",
    "Jenkins",
    "JIRA",
    "JIRA Xray",
    "HP ALM",
    "Postman",
    "SOAP UI",
    "SQL",
    "Java",
    "Maven",
  ],
  quoteLine: "Clear acceptance criteria, measurable coverage, and defects that actually get fixed.",
  footerLine: "Open to QA leadership, automation, and quality-engineering roles.",
  hire: {
    label: "Email Arian",
    mailto: "mailto:rianmini989@gmail.com",
  },
  contact: {
    email: "rianmini989@gmail.com",
    phone: "571-244-8673",
    citizenship: "US Citizen",
  },
};

/** Professional experience — shown on Projects as test suites / engagements. */
export const ARIAN_PROJECTS = [
  {
    id: 401,
    title: "QA Software Manager",
    company: "SS&C",
    location: "New York, NY",
    period: "Feb 2022 — Present",
    type: "case",
    description:
      "Lead 8+ QA engineers; own quality strategy, test plans, and acceptance criteria. Selenium/Cucumber/Jenkins automation, JIRA Xray, CI/CD pipelines, defect triage, and stakeholder reporting across adjudication and pricing domains.",
    skills: [
      "Leadership",
      "Selenium",
      "Cucumber",
      "Jenkins",
      "JIRA Xray",
      "TestNG",
      "SQL Server",
    ],
    button: false,
  },
  {
    id: 402,
    title: "QA Automation Analyst",
    company: "Amazon",
    location: "Herndon, VA",
    period: "Jul 2020 — Feb 2022",
    type: "project",
    description:
      "Test plans and cases from BRD/FRD reviews; regression automation in Java, Selenium, TestNG, and Cucumber. Jenkins CI integration, XML test suites, cross-browser testing, and API validation with Postman.",
    skills: ["Selenium", "Cucumber", "TestNG", "Jenkins", "JIRA", "Postman", "SQL"],
    button: false,
  },
  {
    id: 403,
    title: "QA Engineer",
    company: "Walgreens",
    location: "Deerfield, IL",
    period: "Mar 2018 — Jun 2020",
    type: "project",
    description:
      "Eligibility, claims, and pricing test data; black/gray box strategy. BDD with Cucumber, Selenium WebDriver, SOAP UI for services, SQL backend validation, and UAT coordination with end users.",
    skills: ["Selenium", "Cucumber", "SOAP UI", "JIRA", "TestNG", "SQL Server"],
    button: false,
  },
  {
    id: 404,
    title: "QA Tester",
    company: "Aetna",
    location: "Phoenix, AZ",
    period: "Sep 2015 — Feb 2018",
    type: "case",
    description:
      "PBM claims, adjudication, and benefits testing — manual and automated. HP ALM scripts, Selenium cross-browser runs, SQL integrity checks, smoke/build acceptance with Cucumber, and weekly defect reviews with dev teams.",
    skills: ["HP ALM", "Selenium", "Cucumber", "TestNG", "JIRA", "SQL"],
    button: false,
  },
];

export const ARIAN_ACADEMIC = [
  {
    id: "arian-edu-1",
    title: "Bachelor of Science — Systems Engineering",
    institution: "George Mason University",
    period: "Degree completed",
    summary:
      "Systems engineering foundation — requirements, integration, and complex environments — applied to test strategy, coverage, and cross-functional quality programs.",
  },
];

export const ARIAN_PAGE_COPY = {
  projects: {
    eyebrow: "Test report · Engagements",
    title: "Experience",
    kicker:
      "Quality engineering roles across finance, retail, and healthcare — each engagement run like a release gate.",
    meta: "suites: 4 passed · env: production",
  },
  academic: {
    eyebrow: "Test report · Education",
    title: "Education",
    kicker: "Formal training that supports systems-level test planning and delivery.",
    meta: "credential: verified · status: complete",
  },
  about: {
    eyebrow: "Test report · Profile",
    title: "About",
    kicker: "QA leader profile — strategy, automation, and team quality practices.",
    meta: "owner: arian · role: QA manager",
  },
};

export const ARIAN_HOME_SUMMARY = {
  tests: 142,
  failed: 0,
  duration: "4.18s",
  coverage: 100,
};

export const ARIAN_HOME_TOOLS = [
  "Selenium",
  "Cucumber",
  "Jenkins",
  "JIRA Xray",
  "TestNG",
  "Postman",
  "SQL",
  "SOAP UI",
];

export const ARIAN_PIPELINE = [
  { id: "plan", label: "Plan", detail: "Strategy & cases" },
  { id: "auto", label: "Automate", detail: "Selenium · CI" },
  { id: "run", label: "Execute", detail: "Regression · UAT" },
  { id: "ship", label: "Ship", detail: "Green build" },
];

export const ARIAN_HOME_SUITES = [
  { id: "smoke", label: "smoke.spec.ts", status: "pass", duration: "0.24s" },
  { id: "regression", label: "regression.suite", status: "pass", duration: "1.82s" },
  { id: "api", label: "api.postman.json", status: "pass", duration: "0.41s" },
  { id: "e2e", label: "e2e.selenium", status: "pass", duration: "2.15s" },
  { id: "uat", label: "uat.signoff", status: "pass", duration: "0.38s" },
];
