import React, { useState } from "react";
import "./Navbar.css";
import AuthModal from "../Auth/AuthModal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("access_token");
  });

  // ========================================
  // NAVIGATION CLICK
  // ========================================

  const handleClick = () => {
    setMenuOpen(false);
  };

  // ========================================
  // BLOG
  // ========================================

  const openBlog = () => {
    setMenuOpen(false);
    navigate("/blog");
  };

  // ========================================
  // SIGN IN
  // ========================================

  const openSignin = () => {
    setMenuOpen(false);
    setAuthOpen(true);
  };

  // ========================================
  // LOGIN SUCCESS
  // ========================================

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // ========================================
  // SIGN OUT
  // ========================================

  const handleSignOut = () => {
    localStorage.removeItem("access_token");

    setIsLoggedIn(false);
    setMenuOpen(false);

    toast.success("Signed out successfully!");
  };

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <header className="navbar">
        <div className="navbar-container">

          {/* ========================================
              LOGO
          ======================================== */}

          <a href="#home" className="navbar-logo">
            <span className="logo-symbol">
              &lt;/&gt;
            </span>

            <span>
              Mehtab
              <span className="logo-dot">.</span>
            </span>
          </a>


          {/* ========================================
              DESKTOP NAVIGATION
          ======================================== */}

          <nav className="navbar-links">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={
                  item.name === "Home"
                    ? "active"
                    : ""
                }
              >
                {item.name}
              </a>
            ))}

            {/* BLOG - ONLY AFTER LOGIN */}

            {isLoggedIn && (
              <button
                type="button"
                className="navbar-blog-btn"
                onClick={openBlog}
              >
                Blog
              </button>
            )}
          </nav>


          {/* ========================================
              RIGHT ACTIONS
          ======================================== */}

          <div className="navbar-actions">

            {/* LET'S TALK */}

            <a
              href="#contact"
              className="navbar-cta"
            >
              Let's Talk
            </a>


            {/* SIGN IN / SIGN OUT */}

            {isLoggedIn ? (
              <button
                type="button"
                className="navbar-signup signout-btn"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                className="navbar-signup"
                onClick={openSignin}
              >
                Sign In
              </button>
            )}

          </div>


          {/* ========================================
              MOBILE TOGGLE
          ======================================== */}

          <button
            type="button"
            className={`navbar-toggle ${
              menuOpen ? "open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>


        {/* ========================================
            MOBILE MENU
        ======================================== */}

        <div
          className={`mobile-menu ${
            menuOpen ? "show" : ""
          }`}
        >

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleClick}
            >
              {item.name}
            </a>
          ))}


          {/* MOBILE BLOG */}

          {isLoggedIn && (
            <button
              type="button"
              className="mobile-blog"
              onClick={openBlog}
            >
              Blog
            </button>
          )}


          {/* MOBILE LET'S TALK */}

          <a
            href="#contact"
            className="mobile-cta"
            onClick={handleClick}
          >
            Let's Talk
          </a>


          {/* MOBILE SIGN IN / SIGN OUT */}

          {isLoggedIn ? (
            <button
              type="button"
              className="mobile-signin"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button
              type="button"
              className="mobile-signin"
              onClick={openSignin}
            >
              Sign In
            </button>
          )}

        </div>
      </header>


      {/* ========================================
          AUTH MODAL
      ======================================== */}

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}