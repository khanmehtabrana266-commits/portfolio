import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import "./Home.css";

export default function Home() {
  return (
    <main className="home" id="home">

      {/* Background */}
      <div className="home-bg home-bg-one"></div>
      <div className="home-bg home-bg-two"></div>

      <div className="home-container">

        {/* LEFT CONTENT */}
        <motion.div
          className="home-content"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          {/* Small Label */}
          <motion.div
            className="home-label"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
          >
            <Code2 size={18} />

            <span>
              SOFTWARE ENGINEER
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
          >
            Building
            <br />

            <span className="home-gradient-text">
              Digital Experiences
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="home-description"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
              duration: 0.7,
            }}
          >
            I'm a software engineer focused on building
            modern, interactive and scalable web
            applications using modern technologies.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="home-actions"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.7,
            }}
          >
            <a
              href="#projects"
              className="home-primary-btn"
            >
              View Projects
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="home-secondary-btn"
            >
              Contact Me
              <ExternalLink size={17} />
            </a>
          </motion.div>

          {/* Social / Stats */}
          <motion.div
            className="home-meta"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
              duration: 0.7,
            }}
          >
            <div className="home-meta-item">
              <strong>10+</strong>
              <span>Projects</span>
            </div>

            <div className="home-meta-line"></div>

            <div className="home-meta-item">
              <strong>2+</strong>
              <span>Years Learning</span>
            </div>

            <div className="home-meta-line"></div>

            <div className="home-meta-item">
              <strong>100%</strong>
              <span>Passion</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="home-visual"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
        >

          {/* Glow */}
          <div className="home-visual-glow"></div>

          {/* Main Circle */}
          <motion.div
            className="home-orbit"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="orbit-dot"></div>
          </motion.div>

          {/* Center Card */}
          <motion.div
            className="home-code-card"
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="code-card-header">
              <div className="window-dot"></div>
              <div className="window-dot"></div>
              <div className="window-dot"></div>
            </div>

            <div className="code-content">
              <span className="code-line">
                <span className="code-purple">
                  const
                </span>{" "}
                developer
              </span>

              <span className="code-line">
                {" "}
                = {"{"}
              </span>

              <span className="code-line code-indent">
                name:{" "}
                <span className="code-green">
                  "Mehtab"
                </span>
                ,
              </span>

              <span className="code-line code-indent">
                role:{" "}
                <span className="code-green">
                  "Software Engineer"
                </span>
                ,
              </span>

              <span className="code-line code-indent">
                passion:{" "}
                <span className="code-green">
                  "Building"
                </span>
              </span>

              <span className="code-line">
                {"}"};
              </span>
            </div>
          </motion.div>

          {/* Floating Card 1 */}
          <motion.div
            className="home-floating-card home-floating-one"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Code2 size={20} />

            <span>
              React
            </span>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            className="home-floating-card home-floating-two"
            animate={{
              y: [10, -10, 10],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="js-icon">
              JS
            </span>

            <span>
              JavaScript
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        className="home-scroll"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span>
          SCROLL TO EXPLORE
        </span>

        <ArrowDown size={18} />
      </motion.a>

    </main>
  );
}
