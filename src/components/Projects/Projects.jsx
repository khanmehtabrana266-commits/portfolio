import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ArrowDown } from "lucide-react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";
import projects from "../../data/projects";

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="projects-label">
            <FolderGit2 size={20} />
            <span>MY WORK</span>
          </div>

          <h2 className="projects-title">
            Featured <span>Projects</span>
          </h2>

          <p className="projects-subtitle">
            A collection of projects I've built using modern
            technologies and creative development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
            />
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          className="projects-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ArrowDown size={20} />
          <span>Scroll to explore more</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;