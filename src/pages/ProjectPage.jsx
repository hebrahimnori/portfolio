import React, { useState } from "react";
import Project from "../components/Project";

function ProjectPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Music Player",
      type: "design",
      description: "A redesigned version of Apple Music with a fresh UI.",
      imageType: "photo",
      imageURL: "prj1.jpg",
      skills: ["Figma", "UI", "UX", "Responsive Desing"],
      button: false,
    },
    {
      id: 2,
      title: "Car Renting App",
      type: "design",
      description: "An app to rent and manage car reservations.",
      imageType: "photo",
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
      imageType: "photo",
      imageURL: "prj3.jpg",
      skills: ["Figma", "UI", "UX", "Responsive Desing"],
      button: false,
    },

    {
      id: 5,
      title: "Collegemate Website",
      type: "project",
      description:
        "Collegemate is a modern web platform built with Vue.js connecting students and mentors featuring highly interactive interfaces like drag and drop scheduling calendars, video conferences with participant reactions, animated interactive mentor profiles, shopping carts with real-time cost updating, admin dashboard analytics with tooltip hovers, and drag and drop management - all focused on engaging experiences across devices implemented through reactive components seamlessly binding data updates to responsive visual feedback and animations.",
      imageType: "video",
      imageURL: "prjcollege.mp4",
      skills: [
        "Front-End Developer",
        "Vuejs",
        "Nuxt.js",
        "Javascript",
        "HTML",
        "CSS",
        "Responsive Design",
        "UI Design",
      ],
      button: false,
    },
    {
      id: 6,
      title: "Detailmaxx Website",
      type: "project",
      description:
        "Detailmaxx is an intuitive, mobile-focused car wash management platform connecting owners, employees, and customers - featuring animated employee uploaders, scheduling, responsive real-time financial/operations charts for owners, and customer portals. Built using Nuxt for seamless reactivity between simplistic interfaces and data visualizations enhancing decisions and productivity.",
      imageType: "video",
      imageURL: "prjdetail.mp4",
      skills: [
        "Front-End Developer",
        "Vuejs",
        "Nuxt.js",
        "Javascript",
        "HTML",
        "CSS",
        "Responsive Design",
        "UI Design",
      ],
      button: false,
    },
    {
      id: 4,
      title: "Qutline Logo Design",
      type: "design",
      description: "A distinctive and elegant logo crafted for Qutline.",
      imageType: "photo",
      imageURL: "prj4.jpg",
      skills: ["Figma", "UI", "UX", "Logo", "PhotoShop"],
      button: false,
    },
    {
      id: 7,
      title: "Qutline Web App",
      type: "project",
      description:
        "Qutline is an elegantly designed unified restaurant growth platform built mobile-first with Nuxt leveraging reactive data flows connecting beautiful interfaces across the customer journey from sophisticated multi-level mobile menus for guiding users through order options with smooth animations to intuitive kitchen preparation workflows providing interactive sequencing with visual feedback to insightful, customizable analytics dashboards via stunning modern charting capabilities to other emerging restaurant technologies - all working as one cohesive engine crafted to meet modern user experience expectations around usability, simplicity and delight alongside showcasing innovations in the open source community by releasing new packages like vue3-pagin8 and vue-pagin8 Vue/Nuxt pagination to further drive development and adoption of next-generation web app capabilities.",
      imageType: "video",
      imageURL: "prjqut.mp4",
      skills: [
        "Front-End Developer",
        "Vuejs",
        "Nuxt.js",
        "Javascript",
        "HTML",
        "CSS",
        "Responsive Design",
        "PWA",
        "UI Design",
      ],
      button: false,
    },

    {
      id: 8,
      title: "Qutline Website",
      type: "project",
      description:
        "Qutline is a modern online ordering platform for restaurants, built using HTML, CSS, JavaScript, Vue.js, and Nuxt.js, featuring a sleek dark mode design. This responsive and user-friendly web app ensures seamless navigation and quick load times through server-side rendering, allowing customers to easily browse menus, customize orders, and make secure payments, all while enhancing the dining experience with advanced technology and elegant design.",
      imageType: "video",
      imageURL: "qutlinevid.mp4",
      skills: [
        "Web Design",
        "Single Page Website",
        "Vuejs",
        "Javascript",
        "HTML",
        "CSS",
        "Responsive Design",
        "UI Design",
      ],
      button: false,
    },
    {
      id: 9,
      title: "Desatek Website",
      type: "project",
      description:
        "Desatek is a professional and streamlined static website designed to showcase the comprehensive HVAC (Heating, Ventilation, and Air Conditioning) services offered by Desatek. This single-page website delivers a clear, concise, and visually appealing experience for potential clients seeking high-quality HVAC solutions.",
      imageType: "photo",
      imageURL: "prjdes.jpg",
      skills: [
        "Web Design",
        "Single Page Website",
        "Static Website",
        "Javascript",
        "HTML",
        "CSS",
        "Responsive Design",
        "UI Design",
      ],
      button: false,
    },
  ]);
  return (
    <>
      <div className="pb-24">
        <div className=" columns-1 sm:columns-2 lg:columns-3 gap-2">
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
