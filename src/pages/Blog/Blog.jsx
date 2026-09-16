import React, { useEffect, useState } from "react";
import "./Blog.css";

const Blog = () => {
  // ==============================
  // USER
  // ==============================

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  };

  const user = getUser();

  const userName =
    user?.name ||
    user?.firstName ||
    localStorage.getItem("userName") ||
    "Mehtab";

  const userImage =
    user?.profileImage ||
    user?.image ||
    "/images/profile.png";

  // ==============================
  // STATES
  // ==============================

  const [posts, setPosts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("blogPosts")) || [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);

  const [editingPost, setEditingPost] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [mediaModal, setMediaModal] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    image: null,
    pdf: null,
  });

  // ==============================
  // SAVE POSTS
  // ==============================

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  // ==============================
  // FORM CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];

      if (file) {
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
      }

      return;
    }

    if (name === "pdf") {
      const file = files?.[0];

      if (file) {
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
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // CREATE POST
  // ==============================

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter post title.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter post description.");
      return;
    }

    const newPost = {
      id: Date.now(),

      title: form.title,

      description: form.description,

      url: form.url,

      image: form.image,

      pdf: form.pdf,

      author: {
        name: userName,
        image: userImage,
      },

      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setPosts((prev) => [newPost, ...prev]);

    resetForm();
  };

  // ==============================
  // EDIT POST
  // ==============================

  const handleEdit = (post) => {
    setEditingPost(post);

    setForm({
      title: post.title || "",
      description: post.description || "",
      url: post.url || "",
      image: post.image || null,
      pdf: post.pdf || null,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  // ==============================
  // UPDATE POST
  // ==============================

  const handleUpdatePost = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter post title.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter post description.");
      return;
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === editingPost.id
          ? {
              ...post,

              title: form.title,

              description: form.description,

              url: form.url,

              image: form.image,

              pdf: form.pdf,
            }
          : post
      )
    );

    resetForm();
  };

  // ==============================
  // DELETE POST
  // ==============================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    setPosts((prev) =>
      prev.filter((post) => post.id !== id)
    );

    setOpenMenu(null);
  };

  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      url: "",
      image: null,
      pdf: null,
    });

    setEditingPost(null);
    setShowModal(false);
  };

  // ==============================
  // OPEN CREATE MODAL
  // ==============================

  const openCreateModal = () => {
    setEditingPost(null);

    setForm({
      title: "",
      description: "",
      url: "",
      image: null,
      pdf: null,
    });

    setShowModal(true);
  };

  // ==============================
  // URL HANDLER
  // ==============================

  const handleUrlClick = (url) => {
    if (!url) return;

    setMediaModal({
      type: "url",
      url,
    });
  };

  // ==============================
  // PDF HANDLER
  // ==============================

  const handlePdfClick = (pdf) => {
    if (!pdf) return;

    setMediaModal({
      type: "pdf",
      pdf,
    });
  };

  // ==============================
  // YOUTUBE EMBED
  // ==============================

  const getYoutubeEmbed = (url) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      if (parsedUrl.hostname.includes("youtu.be")) {
        const videoId = parsedUrl.pathname.substring(1);

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <div className="blog-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="blog-header">

        <div>
          <span className="blog-label">
            DEVELOPER BLOG
          </span>

          <h1>Latest Posts</h1>

          <p>
            Thoughts, tutorials, projects and ideas
            from my development journey.
          </p>
        </div>

        <button
          className="create-post-btn"
          onClick={openCreateModal}
        >
          + Create Post
        </button>

      </div>

      {/* ==========================
          POSTS
      ========================== */}

      <div className="posts-container">

        {posts.length === 0 ? (
          <div className="empty-blog">

            <div className="empty-icon">
              ✦
            </div>

            <h2>No posts yet</h2>

            <p>
              Create your first blog post and share
              your thoughts with everyone.
            </p>

            <button
              className="create-post-btn"
              onClick={openCreateModal}
            >
              Create Your First Post
            </button>

          </div>
        ) : (
          posts.map((post) => (

            <article
              className="post-card"
              key={post.id}
            >

              {/* ======================
                  POST TOP
              ====================== */}

              <div className="post-top">

                <div className="author-info">

                  <img
                    src={
                      post.author?.image ||
                      "/images/profile.png"
                    }
                    alt={post.author?.name || "Author"}
                    className="author-image"
                  />

                  <div>

                    <div className="author-name">
                      {post.author?.name || "Mehtab"}
                    </div>

                    <div className="post-date">
                      Software Developer ·{" "}
                      {post.createdAt}
                    </div>

                  </div>

                </div>

                {/* ======================
                    THREE DOT
                ====================== */}

                <div className="post-options">

                  <button
                    className="three-dot-btn"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === post.id
                          ? null
                          : post.id
                      )
                    }
                  >
                    ⋯
                  </button>

                  {openMenu === post.id && (
                    <div className="post-menu">

                      <button
                        onClick={() =>
                          handleEdit(post)
                        }
                      >
                        ✎ Edit
                      </button>

                      <button
                        className="delete-option"
                        onClick={() =>
                          handleDelete(post.id)
                        }
                      >
                        🗑 Delete
                      </button>

                    </div>
                  )}

                </div>

              </div>

              {/* ======================
                  TITLE
              ====================== */}

              <h2 className="post-title">
                {post.title}
              </h2>

              {/* ======================
                  DESCRIPTION
              ====================== */}

              <p className="post-description">
                {post.description}
              </p>

              {/* ======================
                  IMAGE
              ====================== */}

              {post.image?.data && (
                <div className="post-image-wrapper">

                  <img
                    src={post.image.data}
                    alt={post.title}
                    className="post-image"
                    onClick={() =>
                      setMediaModal({
                        type: "image",
                        image: post.image.data,
                      })
                    }
                  />

                </div>
              )}

              {/* ======================
                  URL
              ====================== */}

              {post.url && (
                <button
                  className="post-url"
                  onClick={() =>
                    handleUrlClick(post.url)
                  }
                >
                  ▶ Open Video / Link
                </button>
              )}

              {/* ======================
                  PDF
              ====================== */}

              {post.pdf?.data && (
                <button
                  className="post-pdf"
                  onClick={() =>
                    handlePdfClick(post.pdf)
                  }
                >
                  📄 {post.pdf.name || "View PDF"}
                </button>
              )}

              {/* ======================
                  POST FOOTER
              ====================== */}

              <div className="post-footer">

                <span>
                  ✦
                </span>

                <span>
                  💬
                </span>

                <span>
                  ↗
                </span>

              </div>

            </article>

          ))
        )}

      </div>

      {/* ==================================================
          CREATE / EDIT MODAL
      ================================================== */}

      {showModal && (
        <div
          className="blog-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetForm();
            }
          }}
        >

          <div className="blog-modal">

            <div className="modal-header">

              <div>
                <span className="modal-small-title">
                  BLOG
                </span>

                <h2>
                  {editingPost
                    ? "Edit Post"
                    : "Create New Post"}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={resetForm}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                editingPost
                  ? handleUpdatePost
                  : handleCreatePost
              }
            >

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                  value={form.title}
                  onChange={handleChange}
                />

              </div>

              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Write your post description..."
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                />

              </div>

              {/* URL */}

              <div className="form-group">

                <label>
                  URL
                </label>

                <input
                  type="url"
                  name="url"
                  placeholder="https://youtube.com/..."
                  value={form.url}
                  onChange={handleChange}
                />

                <small>
                  You can add YouTube, Facebook or
                  another website URL.
                </small>

              </div>

              {/* IMAGE */}

              <div className="form-group">

                <label>
                  Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />

                {form.image?.data && (
                  <div className="selected-file">

                    <img
                      src={form.image.data}
                      alt="Preview"
                    />

                    <span>
                      {form.image.name}
                    </span>

                  </div>
                )}

              </div>

              {/* PDF */}

              <div className="form-group">

                <label>
                  PDF
                </label>

                <input
                  type="file"
                  name="pdf"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                />

                {form.pdf?.name && (
                  <div className="pdf-selected">
                    📄 {form.pdf.name}
                  </div>
                )}

              </div>

              {/* ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-post-btn"
                >
                  {editingPost
                    ? "Update Post"
                    : "Create Post"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==================================================
          MEDIA MODAL
      ================================================== */}

      {mediaModal && (
        <div
          className="media-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMediaModal(null);
            }
          }}
        >

          <div className="media-modal">

            <button
              className="media-close"
              onClick={() =>
                setMediaModal(null)
              }
            >
              ×
            </button>

            {/* IMAGE */}

            {mediaModal.type === "image" && (
              <img
                src={mediaModal.image}
                alt="Post"
                className="media-preview-image"
              />
            )}

            {/* PDF */}

            {mediaModal.type === "pdf" && (
              <iframe
                src={mediaModal.pdf.data}
                title="PDF Viewer"
                className="pdf-viewer"
              />
            )}

            {/* URL */}

            {mediaModal.type === "url" && (
              <>
                {getYoutubeEmbed(
                  mediaModal.url
                ) ? (
                  <iframe
                    src={getYoutubeEmbed(
                      mediaModal.url
                    )}
                    title="Video"
                    className="video-frame"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="external-link-box">

                    <h2>
                      Open this link
                    </h2>

                    <p>
                      This website doesn't allow
                      direct video embedding.
                    </p>

                    <a
                      href={mediaModal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Link ↗
                    </a>

                  </div>
                )}
              </>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Blog;