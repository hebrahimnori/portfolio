import React, { useState } from "react";
import Project from "../components/Project";

function ProjectPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Music Player",
      type: "design",
      description: "A redesigned version of Apple Music with a fresh UI.",
      imageURL: "prj1.jpg",
      skills: ["Figma", "UI", "UX", "Responsive Desing"],
      button: false,
    },
    {
      id: 2,
      title: "Car Renting App",
      type: "design",
      description: "An app to rent and manage car reservations.",
      imageURL: "prj2.jpg",
      skills: ["Figma", "UI", "UX", "Responsive Desing"],
      button: false,
    },
    {
      id: 3,
      title: "Cinema Ticket Booking",
      type: "design",
      description:
        "Reserve cinema tickets and select your preferred seats online.",
      imageURL: "prj3.jpg",
      skills: ["Figma", "UI", "UX", "Responsive Desing"],
      button: false,
    },
    {
      id: 4,
      title: "Qutline Logo Design",
      type: "design",
      description: "A distinctive and elegant logo crafted for Qutline.",
      imageURL: "prj4.jpg",
      skills: ["Figma", "UI", "UX", "Logo", "PhotoShop"],
      button: false,
    },
    {
      id: 5,
      title: "Collegemate Website",
      type: "project",
      description: "A distinctive and elegant logo crafted for Qutline.",
      imageURL: "prj4.jpg",
      skills: ["Figma", "UI", "UX", "Logo", "PhotoShop"],
      button: false,
    },
    {
      id: 6,
      title: "Detailmaxx Website",
      type: "project",
      description: "A distinctive and elegant logo crafted for Qutline.",
      imageURL: "prj4.jpg",
      skills: ["Figma", "UI", "UX", "Logo", "PhotoShop"],
      button: false,
    },
    {
      id: 7,
      title: "Qutline Web App",
      type: "project",
      description: "A distinctive and elegant logo crafted for Qutline.",
      imageURL: "prj4.jpg",
      skills: ["Figma", "UI", "UX", "Logo", "PhotoShop"],
      button: false,
    },
    {
      id: 8,
      title: "Desatek Website",
      type: "project",
      description: "A distinctive and elegant logo crafted for Qutline.",
      imageURL: "prj4.jpg",
      skills: ["Figma", "UI", "UX", "Logo", "PhotoShop"],
      button: false,
    },
  ]);
  return (
    <>
      <div className="pb-24">
        <div className=" columns-1 sm:columns-2 lg:columns-3 gap-1">
          {projects
            .slice()
            .reverse()
            .map((project) => (
              <Project key={project.id} {...project} />
            ))}
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
