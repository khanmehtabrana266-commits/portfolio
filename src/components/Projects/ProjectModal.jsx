import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close with Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Only Image */}
        <div className="project-modal-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="project-modal-image"
          />
        </div>

        {/* Small Important Line */}
        <div className="project-modal-info">
          <h3>{project.title}</h3>

          <p>
            {project.importance ||
              "A modern project focused on creating a smooth, interactive and user-friendly experience."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;