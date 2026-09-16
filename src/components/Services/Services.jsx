import React from "react";
import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  Server,
  Layers3,
  Box,
  Cable,
  Database,
  ArrowUpRight,
} from "lucide-react";
import "./Services.css";

const services = [
  {
    id: 1,
    icon: MonitorSmartphone,
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, modern and interactive user interfaces with clean and reusable React components.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
  },

  {
    id: 2,
    icon: Server,
    number: "02",
    title: "Backend Development",
    description:
      "Developing secure and scalable backend systems, REST APIs and business logic for modern applications.",
    technologies: ["Node.js", "NestJS", "Express", "REST API"],
  },

  {
    id: 3,
    icon: Layers3,
    number: "03",
    title: "Full-Stack Development",
    description:
      "Creating complete web applications by connecting powerful frontend interfaces with reliable backend services.",
    technologies: ["React", "Node.js", "PostgreSQL", "JWT"],
  },

  {
    id: 4,
    icon: Box,
    number: "04",
    title: "3D Web Experiences",
    description:
      "Designing immersive 3D websites and interactive digital experiences using modern web technologies.",
    technologies: ["Three.js", "R3F", "WebGL", "Framer Motion"],
  },

  {
    id: 5,
    icon: Cable,
    number: "05",
    title: "API Development",
    description:
      "Building structured and reliable APIs for authentication, CRUD operations, integrations and application services.",
    technologies: ["REST", "JWT", "Node.js", "NestJS"],
  },

  {
    id: 6,
    icon: Database,
    number: "06",
    title: "Database Solutions",
    description:
      "Designing efficient database structures and connecting applications with reliable data storage systems.",
    technologies: ["PostgreSQL", "SQL", "TypeORM", "Supabase"],
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="services-bg services-bg-one"></div>
      <div className="services-bg services-bg-two"></div>

      <div className="services-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="services-header"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <span className="services-label">
            WHAT I DO
          </span>

          <h2>
            My{" "}
            <span>Services</span>
          </h2>

          <p>
            I build modern software solutions with a focus
            on performance, scalability, clean architecture
            and exceptional user experiences.
          </p>
        </motion.div>

        {/* =====================================
            SERVICES GRID
        ===================================== */}

        <div className="services-grid">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                className="service-card"
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                {/* Card Number */}

                <span className="service-number">
                  {service.number}
                </span>

                {/* Icon */}

                <div className="service-icon">
                  <Icon size={25} />
                </div>

                {/* Content */}

                <div className="service-content">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                </div>

                {/* Technologies */}

                <div className="service-technologies">

                  {service.technologies.map(
                    (technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    )
                  )}

                </div>

                {/* Bottom */}

                <div className="service-bottom">

                  <span>
                    Explore service
                  </span>

                  <div className="service-arrow">
                    <ArrowUpRight size={16} />
                  </div>

                </div>

              </motion.article>
            );
          })}

        </div>

        {/* =====================================
            BOTTOM CTA
        ===================================== */}

        <motion.div
          className="services-cta"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="services-cta-content">

            <span className="services-cta-label">
              HAVE A PROJECT IN MIND?
            </span>

            <h3>
              Let's build something{" "}
              <span>great.</span>
            </h3>

            <p>
              From idea to production, I can help turn
              your concept into a modern software solution.
            </p>

          </div>

          <a
            href="#contact"
            className="services-cta-button"
          >
            <span>
              Start a Project
            </span>

            <ArrowUpRight size={17} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}