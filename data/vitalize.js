/**
 * Shared Vitalize block — all personas work at Vitalize LLC.
 */

export const VITALIZE_URL = "https://vitalize.dev/";

const VITALIZE_BASE = {
  name: "Vitalize",
  logoSrc: "/assets/vitalize-logo.png",
  logoAlt: "Vitalize LLC logo",
  url: VITALIZE_URL,
};

/** @param {"hebi" | "parsa" | "arian"} persona */
export function getVitalize(persona) {
  const byPersona = {
    hebi: {
      atLabel: "Currently at",
      role: "App & Front-end Developer",
      focus: "React Native · React · Vue · Tailwind · GSAP",
    },
    parsa: {
      atLabel: "Building at",
      role: "Backend Engineer",
      focus: "Node · Python · PostgreSQL · APIs · Docker",
    },
    arian: {
      atLabel: "Founder & CEO at",
      role: "Chief Executive Officer",
      focus: "Product · Engineering · Quality leadership",
    },
  };

  return { ...VITALIZE_BASE, ...byPersona[persona] };
}
