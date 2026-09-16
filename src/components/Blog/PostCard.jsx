import React, { useState } from "react";
import "./PostCard.css";

const PostCard = ({
  post,
  currentUser,
  onEdit,
  onDelete,
  onOpenUrl,
  onOpenImage,
  onOpenPdf,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // ==============================
  // CURRENT USER CHECK
  // ==============================

  const currentUserId =
    currentUser?.id ||
    currentUser?._id ||
    currentUser?.userId;

  const postUserId =
    post?.author?.id ||
    post?.author?._id ||
    post?.author?.userId;

  const isMyPost =
    currentUserId && postUserId
      ? String(currentUserId) === String(postUserId)
      : post?.author?.name ===
        (currentUser?.name ||
          currentUser?.firstName);

  // ==============================
  // AUTHOR
  // ==============================

  const authorName =
    post?.author?.name ||
    post?.author?.firstName ||
    currentUser?.name ||
    currentUser?.firstName ||
    "Mehtab";

  const authorImage =
    post?.author?.image ||
    post?.author?.profileImage ||
    "/images/profile.png";

  // ==============================
  // DATE
  // ==============================

  const postDate =
    post?.createdAt ||
    post?.date ||
    "Recently";

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = () => {
    setShowMenu(false);

    if (onEdit) {
      onEdit(post);
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const handleDelete = () => {
    setShowMenu(false);

    if (onDelete) {
      onDelete(post);
    }
  };

  // ==============================
  // URL
  // ==============================

  const handleUrl = () => {
    if (!post?.url) return;

    if (onOpenUrl) {
      onOpenUrl(post.url);
    }
  };

  // ==============================
  // IMAGE
  // ==============================

  const handleImage = () => {
    if (!post?.image) return;

    if (onOpenImage) {
      onOpenImage(post.image);
    }
  };

  // ==============================
  // PDF
  // ==============================

  const handlePdf = () => {
    if (!post?.pdf) return;

    if (onOpenPdf) {
      onOpenPdf(post.pdf);
    }
  };

  return (
    <article className="post-card">

      {/* =================================
          POST HEADER
      ================================= */}

      <div className="post-card-header">

        <div className="post-author">

          <img
            src={authorImage}
            alt={authorName}
            className="post-author-image"
          />

          <div className="post-author-details">

            <h4>
              {authorName}
            </h4>

            <span>
              Software Developer
              {" · "}
              {postDate}
            </span>

          </div>

        </div>


        {/* =================================
            THREE DOT
        ================================= */}

        {isMyPost && (
          <div className="post-card-options">

            <button
              type="button"
              className="post-three-dot"
              onClick={() =>
                setShowMenu((prev) => !prev)
              }
              aria-label="Post options"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>


            {showMenu && (
              <div className="post-options-menu">

                <button
                  type="button"
                  onClick={handleEdit}
                >
                  <span>✎</span>
                  Edit
                </button>

                <button
                  type="button"
                  className="post-delete-button"
                  onClick={handleDelete}
                >
                  <span>🗑</span>
                  Delete
                </button>

              </div>
            )}

          </div>
        )}

      </div>


      {/* =================================
          POST CONTENT
      ================================= */}

      <div className="post-card-content">

        <h2 className="post-card-title">
          {post?.title}
        </h2>

        <p className="post-card-description">
          {post?.description}
        </p>


        {/* =================================
            IMAGE
        ================================= */}

        {post?.image && (
          <div
            className="post-card-image-wrapper"
            onClick={handleImage}
          >

            <img
              src={
                typeof post.image === "string"
                  ? post.image
                  : post.image?.data
              }
              alt={post?.title || "Post image"}
              className="post-card-image"
            />

            <div className="image-view-overlay">
              <span>
                View Image
              </span>
            </div>

          </div>
        )}


        {/* =================================
            URL
        ================================= */}

        {post?.url && (
          <button
            type="button"
            className="post-link-button"
            onClick={handleUrl}
          >
            <span className="link-icon">
              ▶
            </span>

            <span>
              Open Video / Link
            </span>

            <span className="link-arrow">
              ↗
            </span>
          </button>
        )}


        {/* =================================
            PDF
        ================================= */}

        {post?.pdf && (
          <button
            type="button"
            className="post-pdf-button"
            onClick={handlePdf}
          >

            <span className="pdf-small-icon">
              PDF
            </span>

            <span className="pdf-name">
              {typeof post.pdf === "string"
                ? "View PDF"
                : post.pdf?.name || "View PDF"}
            </span>

            <span className="pdf-arrow">
              ↗
            </span>

          </button>
        )}

      </div>


      {/* =================================
          POST FOOTER
      ================================= */}

      <div className="post-card-footer">

        <button
          type="button"
          className="post-action"
        >
          <span>♡</span>
          Like
        </button>

        <button
          type="button"
          className="post-action"
        >
          <span>💬</span>
          Comment
        </button>

        <button
          type="button"
          className="post-action"
        >
          <span>↗</span>
          Share
        </button>

      </div>

    </article>
  );
};

export default PostCard;