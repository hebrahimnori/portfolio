"use client";

import { useMemo } from "react";
import PhotoTile from "./PhotoTile";
import ListingPageHero from "../../components/ListingPageHero";
import listing from "../../components/HebiExperienceListing.module.scss";
import styles from "./PhotoPage.module.scss";
import { getPhotographyFilenames } from "../../lib/content";

function PhotoPage() {
  const photoFiles = useMemo(() => getPhotographyFilenames(), []);

  return (
    <div className={listing.page}>
      <div className={listing.backdrop} aria-hidden>
        <div className={`${listing.blob} ${listing.blobTeal}`} />
        <div className={`${listing.blob} ${listing.blobSlate}`} />
        <div className={listing.grid} />
      </div>
      <div className={listing.content}>
        <ListingPageHero
          eyebrow="Visual diary"
          title="Photography"
          kicker="Moments caught in passing — light, distance, and the quiet between subjects."
        />
        <div className={`${listing.masonry} ${styles.photoMasonry}`}>
          {photoFiles.map((file, index) => (
            <PhotoTile key={file} file={file} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
