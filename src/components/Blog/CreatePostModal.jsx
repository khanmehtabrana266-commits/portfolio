import React, { useEffect, useState } from "react";
import "./CreatePostModal.css";

const CreatePostModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingPost = null,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    image: null,
    pdf: null,
  });

  // ==============================
  // EDIT DATA LOAD
  // ==============================

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title || "",
        description: editingPost.description || "",
        url: editingPost.url || "",
        image: editingPost.image || null,
        pdf: editingPost.pdf || null,
      });
    } else {
      setForm({
        title: "",
        description: "",
        url: "",
        image: null,
        pdf: null,
      });
    }
  }, [editingPost, isOpen]);

  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // IMAGE
  // ==============================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: {
          name: file.name,
          type: file.type,
          data: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  // ==============================
  // PDF
  // ==============================

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        pdf: {
          name: file.name,
          type: file.type,
          data: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter a description.");
      return;
    }

    onSubmit(form);

    setForm({
      title: "",
      description: "",
      url: "",
      image: null,
      pdf: null,
    });
  };

  // ==============================
  // CLOSE
  // ==============================

  const handleClose = () => {
    setForm({
      title: "",
      description: "",
      url: "",
      image: null,
      pdf: null,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="create-post-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="create-post-modal">

        {/* ==========================
            HEADER
        ========================== */}

        <div className="create-post-header">

          <div>
            <span className="create-post-label">
              BLOG
            </span>

            <h2>
              {editingPost
                ? "Edit Post"
                : "Create New Post"}
            </h2>

            <p>
              Share your thoughts, projects and ideas.
            </p>
          </div>

          <button
            type="button"
            className="create-post-close"
            onClick={handleClose}
          >
            ×
          </button>

        </div>

        {/* ==========================
            FORM
        ========================== */}

        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <div className="create-form-group">

            <label htmlFor="post-title">
              Title
            </label>

            <input
              id="post-title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter your post title"
            />

          </div>

          {/* DESCRIPTION */}

          <div className="create-form-group">

            <label htmlFor="post-description">
              Description
            </label>

            <textarea
              id="post-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write something about your post..."
              rows={5}
            />

          </div>

          {/* URL */}

          <div className="create-form-group">

            <label htmlFor="post-url">
              URL
            </label>

            <input
              id="post-url"
              type="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
            />

            <span className="input-hint">
              You can add YouTube, Facebook or any
              other website URL.
            </span>

          </div>

          {/* IMAGE */}

          <div className="create-form-group">

            <label>
              Image
            </label>

            <div className="file-upload-box">

              <input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <label
                htmlFor="post-image"
                className="file-select-label"
              >
                <span className="upload-icon">
                  ↑
                </span>

                <span>
                  Choose an image
                </span>

                <small>
                  PNG, JPG, WEBP
                </small>
              </label>

            </div>

            {/* IMAGE PREVIEW */}

            {form.image?.data && (
              <div className="selected-image">

                <img
                  src={form.image.data}
                  alt="Preview"
                />

                <div className="selected-image-info">

                  <strong>
                    {form.image.name}
                  </strong>

                  <span>
                    Image selected
                  </span>

                </div>

              </div>
            )}

          </div>

          {/* PDF */}

          <div className="create-form-group">

            <label>
              PDF
            </label>

            <div className="file-upload-box">

              <input
                id="post-pdf"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handlePdfChange}
              />

              <label
                htmlFor="post-pdf"
                className="file-select-label"
              >
                <span className="upload-icon">
                  ↑
                </span>

                <span>
                  Choose a PDF
                </span>

                <small>
                  PDF documents only
                </small>
              </label>

            </div>

            {/* PDF PREVIEW */}

            {form.pdf?.name && (
              <div className="selected-pdf">

                <div className="pdf-icon">
                  PDF
                </div>

                <div className="selected-pdf-info">

                  <strong>
                    {form.pdf.name}
                  </strong>

                  <span>
                    PDF selected
                  </span>

                </div>

              </div>
            )}

          </div>

          {/* ==========================
              BUTTONS
          ========================== */}

          <div className="create-post-actions">

            <button
              type="button"
              className="create-cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-submit-btn"
            >
              {editingPost
                ? "Update Post"
                : "Create Post"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreatePostModal;