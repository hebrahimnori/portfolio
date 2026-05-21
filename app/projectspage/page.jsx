"use client";

import { useMemo } from "react";
import Project from "../../components/Project";
import ListingPageHero from "../../components/ListingPageHero";
import ParsaListingLayout from "../../components/ParsaListingLayout";
import ParsaPageHero from "../../components/ParsaPageHero";
import listing from "../../components/HebiExperienceListing.module.scss";
import pageStyles from "./ProjectPage.module.scss";
import parsaGrid from "../../components/ParsaProjectsGrid.module.scss";
import { useTheme } from "../../components/ThemeProvider";
import { getProjects, getParsaPageCopy } from "../../lib/content";

function ProjectPage() {
  const { theme } = useTheme();
  const isParsa = theme === "dark";
  const projects = useMemo(() => getProjects(theme), [theme]);
  const parsaCopy = useMemo(() => getParsaPageCopy("projects"), []);

  const projectList = projects
    .slice()
    .reverse()
    .map((project) => <Project key={project.id} {...project} />);

  const hebiMasonry = (
    <div className={`${listing.masonry} ${pageStyles.masonryGap}`}>{projectList}</div>
  );

  const parsaGridEl = <div className={parsaGrid.grid}>{projectList}</div>;

  if (isParsa) {
    return (
      <ParsaListingLayout>
        <ParsaPageHero
          eyebrow={parsaCopy.eyebrow}
          title={parsaCopy.title}
          kicker={parsaCopy.kicker}
          meta={parsaCopy.meta}
        />
        {parsaGridEl}
      </ParsaListingLayout>
    );
  }

  return (
    <div className={listing.page}>
      <div className={listing.backdrop} aria-hidden>
        <div className={`${listing.blob} ${listing.blobTeal}`} />
        <div className={`${listing.blob} ${listing.blobSlate}`} />
        <div className={listing.grid} />
      </div>
      <div className={listing.content}>
        <ListingPageHero
          eyebrow="Selected work"
          title="Projects"
          kicker="Product UI, front-end systems, and brand work — from concept through ship."
        />
        {hebiMasonry}
      </div>
    </div>
  );
}

export default ProjectPage;
