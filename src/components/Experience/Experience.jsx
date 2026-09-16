import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  CheckCircle2,
  Code2,
} from "lucide-react";
import "./Experience.css";
import experience from "../../data/experience";

const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Tech Solutions",
    type: "Full-Time",
    location: "Remote",
    date: "2025 — Present",
    description:
      "Developing modern web applications and working across frontend, backend and database layers to create reliable software solutions.",
    responsibilities: [
      "Building responsive interfaces using React.js and modern UI technologies.",
      "Developing REST APIs and backend services with Node.js and NestJS.",
      "Designing database structures and integrating PostgreSQL.",
      "Implementing authentication, CRUD operations and API integrations.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
    ],
  },

  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Digital",
    type: "Internship",
    location: "Remote",
    date: "2024 — 2025",
    description:
      "Worked on interactive and responsive web interfaces while gaining practical experience with modern frontend development.",
    responsibilities: [
      "Created reusable React components for web applications.",
      "Converted UI designs into responsive layouts.",
      "Integrated frontend applications with REST APIs.",
      "Improved UI performance and user experience.",
    ],
    technologies: [
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "MUI",
    ],
  },

  {
    id: 3,
    role: "Software Engineering Student",
    company: "University",
    type: "Education",
    location: "Pakistan",
    date: "2022 — 2026",
    description:
      "Building a strong foundation in software engineering, programming, databases, algorithms and application development.",
    responsibilities: [
      "Studying software engineering principles and development methodologies.",
      "Working on academic and personal software projects.",
      "Learning data structures, databases and system design.",
      "Developing practical full-stack applications.",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "SQL",
      "Git",
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">

      {/* Background Glow */}
      <div className="experience-bg experience-bg-one"></div>
      <div className="experience-bg experience-bg-two"></div>

      <div className="experience-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="experience-header"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <span className="experience-label">
            MY JOURNEY
          </span>

          <h2>
            Experience &{" "}
            <span>Journey</span>
          </h2>

          <p>
            My professional and learning journey through
            software engineering, development and technology.
          </p>
        </motion.div>

        {/* =====================================
            TIMELINE
        ===================================== */}

        <div className="experience-timeline">

          {/* Timeline Line */}
          <div className="timeline-line"></div>

          {experiences.map((experience, index) => (
            <motion.div
              className={`experience-item ${
                index % 2 === 0
                  ? "experience-left"
                  : "experience-right"
              }`}
              key={experience.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
            >

              {/* Timeline Dot */}

              <div className="timeline-dot">
                <span></span>
              </div>

              {/* Experience Card */}

              <div className="experience-card">

                {/* Top */}

                <div className="experience-card-top">

                  <div className="experience-icon">
                    <BriefcaseBusiness size={21} />
                  </div>

                  <div className="experience-heading">

                    <div className="experience-title-row">
                      <h3>
                        {experience.role}
                      </h3>

                      <span className="experience-type">
                        {experience.type}
                      </span>
                    </div>

                    <h4>
                      {experience.company}
                    </h4>

                  </div>

                </div>

                {/* Meta */}

                <div className="experience-meta">

                  <span>
                    <CalendarDays size={13} />
                    {experience.date}
                  </span>

                  <span>
                    <MapPin size={13} />
                    {experience.location}
                  </span>

                </div>

                {/* Description */}

                <p className="experience-description">
                  {experience.description}
                </p>

                {/* Responsibilities */}

                <div className="experience-responsibilities">

                  {experience.responsibilities.map(
                    (responsibility) => (
                      <div
                        className="experience-responsibility"
                        key={responsibility}
                      >
                        <CheckCircle2 size={14} />

                        <span>
                          {responsibility}
                        </span>
                      </div>
                    )
                  )}

                </div>

                {/* Technologies */}

                <div className="experience-technologies">

                  <div className="experience-tech-title">
                    <Code2 size={13} />
                    <span>Technologies</span>
                  </div>

                  <div className="experience-tech-list">

                    {experience.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* =====================================
            BOTTOM
        ===================================== */}

        <motion.div
          className="experience-bottom"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="experience-bottom-dot"></div>

          <div>
            <h3>
              The journey continues...
            </h3>

            <p>
              Always looking for new challenges,
              opportunities and technologies to explore.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}