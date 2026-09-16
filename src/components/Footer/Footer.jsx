import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            Mehtab<span>.</span>
          </a>

          <p>
            Software Engineer building modern digital
            experiences.
          </p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GH
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            in
          </a>
        </div>

        <button
          className="footer-top"
          onClick={backToTop}
        >
          <span>Back to top</span>
          <ArrowUp size={16} />
        </button>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Mehtab. All rights reserved.
        </span>

        <a href="#home">
          Portfolio
          <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}