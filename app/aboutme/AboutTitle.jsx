"use client";

import ListingPageHero from "../../components/ListingPageHero";

/** About intro — same hero pattern as Projects / Photography. */
export default function AboutTitle({ roleLine }) {
  const [primary, secondary] = roleLine?.includes(" — ")
    ? roleLine.split(" — ")
    : [roleLine, null];

  return (
    <ListingPageHero
      size="about"
      eyebrow="Hey, I'm"
      title="Hebi"
      titleAccent={primary || undefined}
      kicker={secondary || undefined}
    />
  );
}
