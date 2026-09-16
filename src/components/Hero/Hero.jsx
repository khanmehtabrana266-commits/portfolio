import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";

import profileImage from "../../assets/profile.png";

import "./Hero.css";

/* =========================================
   3D DEVELOPER MODEL
========================================= */



useGLTF.preload("/models/developer.glb");

/* =========================================
   HERO COMPONENT
========================================= */

export default function Hero() {
  /* -----------------------------------------
     PROJECTS SCROLL
  ----------------------------------------- */

  const scrollToProjects = () => {
    const projects = document.getElementById("projects");

    if (projects) {
      projects.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* -----------------------------------------
     CONTACT SCROLL
  ----------------------------------------- */

  const scrollToContact = () => {
    const contact = document.getElementById("contact");

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero" id="home">

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="hero-glow hero-glow-one"></div>

      <div className="hero-glow hero-glow-two"></div>

      <div className="hero-grid"></div>


      {/* =====================================
          MAIN CONTAINER
      ===================================== */}

      <div className="hero-container">


        {/* ===================================
            LEFT SIDE
        =================================== */}

        <motion.div
          className="hero-content"

          initial={{
            opacity: 0,
            x: -60,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >


          {/* =================================
              PROFILE IMAGE
          ================================= */}

          <motion.div
            className="hero-profile"

            initial={{
              opacity: 0,
              scale: 0.7,
              y: -20,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >

            <img
              src={profileImage}
              alt="Mehtab Rana"
            />

          </motion.div>


          {/* =================================
              SOFTWARE ENGINEER BADGE
          ================================= */}

          <motion.div
            className="hero-badge"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
          >

            <span>&lt;/&gt;</span>

            SOFTWARE ENGINEER

          </motion.div>


          {/* =================================
              MAIN HEADING
          ================================= */}

          <motion.h1
            className="hero-title"

            initial={{
              opacity: 0,
              y: 25,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
              delay: 0.35,
            }}
          >

            Building

            <br />

            <span>
              Digital
            </span>

            <br />

            <span>
              Experiences
            </span>

          </motion.h1>


          {/* =================================
              DESCRIPTION
          ================================= */}

          <motion.p
            className="hero-description"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
          >

            I'm a software engineer focused on building
            modern, interactive and scalable web
            applications using modern technologies.

          </motion.p>


          {/* =================================
              TECHNOLOGIES
          ================================= */}

          <motion.div
            className="hero-tech-stack"

            initial={{
              opacity: 0,
              y: 15,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.6,
              delay: 0.65,
            }}
          >

            <span>React</span>

            <span>Node.js</span>

            <span>NestJS</span>

            <span>PostgreSQL</span>

          </motion.div>


          {/* =================================
              BUTTONS
          ================================= */}

          <motion.div
            className="hero-buttons"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.6,
              delay: 0.75,
            }}
          >

            <button
              type="button"
              className="hero-primary-btn"
              onClick={scrollToProjects}
            >

              View Projects

              <span>
                →
              </span>

            </button>


            <button
              type="button"
              className="hero-secondary-btn"
              onClick={scrollToContact}
            >

              Contact Me

              <span>
                ↗
              </span>

            </button>

          </motion.div>


          {/* =================================
              SOCIAL LINKS
          ================================= */}

          <motion.div
            className="hero-socials"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 0.6,
              delay: 0.9,
            }}
          >

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <span className="social-divider">
              /
            </span>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <span className="social-divider">
              /
            </span>

            <a href="mailto:mehtab@example.com">
              Email
            </a>

          </motion.div>

        </motion.div>


        {/* ===================================
            RIGHT SIDE - 3D MODEL
        =================================== */}

        <motion.div
          className="hero-3d"

          initial={{
            opacity: 0,
            scale: 0.7,
            x: 60,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}

          transition={{
            duration: 1,
            delay: 0.3,
          }}
        >

          {/* MODEL GLOW */}

          <div className="model-glow"></div>


          {/* =================================
              THREE.JS CANVAS
          ================================= */}

          <Canvas
            camera={{
              position: [8, 5, 9],
              fov: 42,
            }}

            dpr={[1, 2]}
          >

            {/* LIGHTING */}

            <ambientLight
              intensity={1.2}
            />

            <directionalLight
              position={[5, 8, 5]}
              intensity={2}
            />

            <pointLight
              position={[-5, 3, 4]}
              intensity={25}
              distance={15}
            />


            <Suspense fallback={null}>

             


              {/* Environment */}

              <Environment
                preset="city"
                environmentIntensity={0.7}
              />


              {/* Shadow */}

              <ContactShadows
                position={[0, -2.8, 0]}
                opacity={0.45}
                scale={8}
                blur={2.5}
                far={5}
              />

            </Suspense>


            {/* MODEL CONTROLS */}

            <OrbitControls
              enableZoom={false}
              enablePan={false}

              minPolarAngle={
                Math.PI / 2.7
              }

              maxPolarAngle={
                Math.PI / 1.8
              }

              autoRotate

              autoRotateSpeed={0.7}
            />

          </Canvas>


          {/* =================================
              FLOATING CARD 1
          ================================= */}

          <motion.div
            className="floating-card card-one"

            animate={{
              y: [0, -12, 0],
            }}

            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <span>
              &lt;/&gt;
            </span>

            <small>
              Clean Code
            </small>

          </motion.div>


          {/* =================================
              FLOATING CARD 2
          ================================= */}

          <motion.div
            className="floating-card card-two"

            animate={{
              y: [0, 12, 0],
            }}

            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <span>
              {"{ }"}
            </span>

            <small>
              APIs
            </small>

          </motion.div>


          {/* =================================
              FLOATING CARD 3
          ================================= */}

          <motion.div
            className="floating-card card-three"

            animate={{
              y: [0, -10, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <span>
              ⚡
            </span>

            <small>
              Fast
            </small>

          </motion.div>

        </motion.div>

      </div>


      {/* =====================================
          SCROLL INDICATOR
      ===================================== */}

      <motion.div
        className="scroll-indicator"

        animate={{
          y: [0, 8, 0],
        }}

        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      >

        <span></span>

        <p>
          Scroll to explore
        </p>

      </motion.div>

    </section>
  );
}