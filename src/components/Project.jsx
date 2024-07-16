import React from "react";
import styles from "./Project.module.scss";

function Project({
  title,
  type,
  imageType,
  description,
  imageURL,
  skills,
  button,
}) {
  return (
    <>
      <div className={`${styles.project_card} break-inside-avoid mb-1`}>
        <div className={styles.project_image_cont}>
          {imageType === "photo" && (
            <img src={`src/assets/projectimage/${imageURL}`} alt={title} />
          )}
          {imageType === "video" && (
            <video autoPlay loop muted>
              <source
                src={`src/assets/projectimage/${imageURL}`}
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className={styles.project_text_cont}>
          {type === "design" && (
            <div
              className={`${styles.project_text_badge} ${styles.design_color} font-medium`}
            >
              <p>Design</p>
            </div>
          )}
          {type === "project" && (
            <div
              className={`${styles.project_text_badge} ${styles.prj_color} font-medium`}
            >
              <p>Project</p>
            </div>
          )}
          {type === "case" && (
            <div
              className={`${styles.project_text_badge} ${styles.case_color} font-medium`}
            >
              <p>Case Study</p>
            </div>
          )}
          <div className={`${styles.project_text_title} font-bold`}>
            <h4>{title}</h4>
          </div>
          <div className={`${styles.project_text_desc} font-light`}>
            <p>{description}</p>
          </div>
          <div className={`${styles.project_text_skills} font-medium`}>
            <ul>
              {skills.map((skill) => (
                <li>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        {button && (
          <div className={`${styles.project_btn_cont} font-bold`}>
            View More
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.4141 12.9998L13.7071 8.29285C13.6142 8.2 13.504 8.12636 13.3827 8.07611C13.2614 8.02586 13.1314 8 13.0001 8C12.8688 8 12.7387 8.02586 12.6174 8.07611C12.4961 8.12636 12.3859 8.2 12.2931 8.29285C12.2002 8.38569 12.1266 8.49592 12.0763 8.61722C12.0261 8.73853 12.0002 8.86855 12.0002 8.99985C12.0002 9.13115 12.0261 9.26117 12.0763 9.38247C12.1266 9.50378 12.2002 9.614 12.2931 9.70685L14.5861 11.9998H7.00006C6.73485 11.9998 6.48049 12.1052 6.29296 12.2927C6.10542 12.4803 6.00006 12.7346 6.00006 12.9998C6.00006 13.2651 6.10542 13.5194 6.29296 13.707C6.48049 13.8945 6.73485 13.9998 7.00006 13.9998H14.5861L12.2931 16.2928C12.1999 16.3855 12.1259 16.4957 12.0755 16.617C12.025 16.7383 11.999 16.8684 11.999 16.9998C11.999 17.1313 12.025 17.2614 12.0755 17.3827C12.1259 17.504 12.1999 17.6142 12.2931 17.7069C12.3859 17.7998 12.4961 17.8735 12.6174 17.9238C12.7387 17.9742 12.8687 18 13.0001 18C13.1314 18 13.2614 17.9742 13.3828 17.9238C13.5041 17.8735 13.6143 17.7998 13.7071 17.7069L18.4141 12.9998Z"
                fill="#363636"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}

export default Project;
