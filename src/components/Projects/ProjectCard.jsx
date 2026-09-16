import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.article
        className="project-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -10 }}
        onClick={() => setIsOpen(true)}
      >
        {/* Project Image */}
        <div className="project-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />

          <div className="project-overlay">
            <span>
              {project.id < 10 ? `0${project.id}` : project.id}
            </span>

            <ArrowUpRight size={24} />
          </div>
        </div>

        {/* Project Content */}
        <div className="project-content">
          <span className="project-category">
            {project.category || "Web Development"}
          </span>

          <h3 className="project-title">
            {project.title}
          </h3>

          <p className="project-description">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && (
            <div className="project-technologies">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="technology-tag"
                >
                  {tech}
                </span>
              ))}

              {project.technologies.length > 4 && (
                <span className="technology-tag technology-tag-more">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="project-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-primary"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen && (
          <ProjectModal
            project={project}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;