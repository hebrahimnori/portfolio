import React from "react";
import styles from "./PhotoPage.module.scss";
function PhotoPage() {
  const imageCount = 18; // Number of images
  const images = Array.from({ length: imageCount }, (_, i) => i + 1);
  console.log(images);
  return (
    <>
      <div className={styles.main}>
        <ul className={styles.gallery}>
          {images.map((num) => (
            <li key={num}>
              <img src={`./src/assets/pic${num}.jpg`} alt={`pic${num}`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PhotoPage;
