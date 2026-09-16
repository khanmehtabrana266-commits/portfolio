import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Layers3,
  Rocket,
  GitBranch,
  Wrench,
} from "lucide-react";
import "./About.css";

const stats = [
  {
    number: "15+",
    label: "Projects Built",
  },
  {
    number: "10+",
    label: "Technologies",
  },
  {
    number: "3+",
    label: "Full-Stack Apps",
  },
  {
    number: "100%",
    label: "Passion for Code",
  },
];

const skillCategories = [
  {
    icon: <Code2 size={19} />,
    title: "Frontend",
    description: "Modern and responsive user interfaces.",
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "HTML / CSS", level: 92 },
      { name: "Material UI", level: 85 },
    ],
  },
  {
    icon: <Server size={19} />,
    title: "Backend",
    description: "Scalable APIs and server-side apps.",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 86 },
      { name: "NestJS", level: 78 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    icon: <Database size={19} />,
    title: "Database",
    description: "Structured and cloud databases.",
    skills: [
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
      { name: "Supabase", level: 78 },
      { name: "TypeORM", level: 75 },
    ],
  },
  {
    icon: <Layers3 size={19} />,
    title: "Architecture",
    description: "Maintainable application structures.",
    skills: [
      { name: "JWT Authentication", level: 84 },
      { name: "CRUD Systems", level: 92 },
      { name: "API Integration", level: 90 },
      { name: "Component Design", level: 88 },
    ],
  },
];

const tools = [
  {
    icon: <GitBranch size={18} />,
    name: "Git & GitHub",
  },
  {
    icon: <Wrench size={18} />,
    name: "Vite",
  },
  {
    icon: <Code2 size={18} />,
    name: "VS Code",
  },
  {
    icon: <Server size={18} />,
    name: "Postman",
  },
];

export default function About() {
  return (
    <section className="about-section" id="about">

      {/* Background */}
      <div className="about-bg about-bg-one"></div>
      <div className="about-bg about-bg-two"></div>

      <div className="about-container">

        {/* ================= HEADER ================= */}

        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">
            ABOUT ME
          </span>

          <h2>
            Building ideas into
            <span> digital experiences.</span>
          </h2>

          <p>
            A little more about my journey, mindset
            and passion for software engineering.
          </p>
        </motion.div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="about-grid">

          {/* Left Card */}
          <motion.div
            className="about-intro-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <div className="about-card-icon">
              <Code2 size={26} />
            </div>

            <h3>
              Software Engineer
            </h3>

            <p>
              I'm a software engineering enthusiast focused
              on creating modern web applications that combine
              strong functionality with clean and engaging
              user experiences.
            </p>

            <p>
              My development journey revolves around
              understanding how applications work from
              frontend interfaces to backend APIs and
              databases.
            </p>

            <p>
              I enjoy turning complex problems into simple,
              scalable and maintainable solutions while
              continuously learning new technologies.
            </p>

            <div className="about-highlight">
              <Rocket size={20} />

              <div>
                <strong>
                  Build. Learn. Improve.
                </strong>

                <span>
                  Always working on the next idea.
                </span>
              </div>
            </div>

            {/* Development Tools (moved here to fill empty space) */}

            <div className="about-tools-section">

              <div className="about-tools-heading">
                <span className="about-tools-line"></span>
                <h3>Development Tools</h3>
                <span className="about-tools-line"></span>
              </div>

              <div className="about-tools-grid">

                {tools.map((tool) => (
                  <motion.div
                    className="about-tool-card"
                    key={tool.name}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="about-tool-icon">
                      {tool.icon}
                    </div>
                    <span>{tool.name}</span>
                  </motion.div>
                ))}

              </div>

            </div>

            {/* Bottom Statement */}

            <div className="about-bottom-statement">
              <div className="about-bottom-icon">
                {"</>"}
              </div>

              <div>
                <h3>
                  Always learning, always building.
                </h3>

                <p>
                  Exploring new technologies and improving
                  my engineering skills one project at a time.
                </p>
              </div>

              <div className="about-bottom-status">
                <span></span>
                Learning Mode
              </div>
            </div>

          </motion.div>

          {/* Right Side */}
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            {/* Stats */}

            <div className="about-stats">

              {stats.map((stat, index) => (
                <motion.div
                  className="stat-card"
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <strong>
                    {stat.number}
                  </strong>

                  <span>
                    {stat.label}
                  </span>
                </motion.div>
              ))}

            </div>

            {/* Skills & Technologies */}

            <div className="about-skills-card">

              <div className="technology-heading">

                <div className="technology-icon">
                  <Layers3 size={21} />
                </div>

                <div>
                  <h3>
                    Skills &amp; Technologies
                  </h3>

                  <p>
                    Technologies and tools I use daily.
                  </p>
                </div>

              </div>

              <div className="about-skills-grid">

                {skillCategories.map((category) => (
                  <div
                    className="about-skill-category"
                    key={category.title}
                  >

                    <div className="about-skill-category-heading">
                      <div className="about-skill-category-icon">
                        {category.icon}
                      </div>

                      <div>
                        <h4>
                          {category.title}
                        </h4>
                        <p>
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="about-skill-list">

                      {category.skills.map((skill) => (
                        <div
                          className="about-skill-item"
                          key={skill.name}
                        >
                          <div className="about-skill-info">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>

                          <div className="about-skill-bar">
                            <motion.div
                              className="about-skill-progress"
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${skill.level}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: 0.15,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>
                      ))}

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}