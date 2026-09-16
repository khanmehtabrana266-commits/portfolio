import React from "react";
import "./MediaModal.css";

const MediaModal = ({
  isOpen,
  onClose,
  type,
  src,
  title = "Media Preview",
}) => {
  if (!isOpen || !src) return null;

  return (
    <div className="media-modal-overlay" onClick={onClose}>
      <div
        className="media-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="media-modal-header">
          <h3>{title}</h3>

          <button
            className="media-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="media-modal-content">

          {/* IMAGE */}
          {type === "image" && (
            <img
              src={src}
              alt={title}
              className="media-modal-image"
            />
          )}

          {/* PDF */}
          {type === "pdf" && (
            <iframe
              src={src}
              title={title}
              className="media-modal-pdf"
            />
          )}

          {/* VIDEO */}
          {type === "video" && (
            <iframe
              src={src}
              title={title}
              className="media-modal-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* UNKNOWN */}
          {!["image", "pdf", "video"].includes(type) && (
            <div className="media-modal-error">
              <p>Unable to preview this media.</p>

              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="media-open-link"
              >
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;