import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { addContact } from "../../api/Api";
import "./Contact.css";

const contactInfo = [
  {
    id: 1,
    icon: Mail,
    title: "Email",
    value: "khanmehtabrana266@gmail.com",
    link: "mailto:khanmehtabrana266@gmail.com",
  },
  {
    id: 2,
    icon: Phone,
    title: "Phone",
    value: "+92 3099118133",
    link: "tel:+923099118133",
  },
  {
    id: 3,
    icon: MapPin,
    title: "Location",
    value: "Pakistan",
    link: "#",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSent(false);
    setError("");

    try {
      await addContact({
        name,
        email,
        message,
      });

      setName("");
      setEmail("");
      setMessage("");

      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } catch (err) {
      console.error("Contact API Error:", err);

      setError(
        err?.response?.data?.message ||
          "Message send nahi ho saka. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg contact-bg-one"></div>
      <div className="contact-bg contact-bg-two"></div>

      <div className="contact-container">

        {/* Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="contact-label">GET IN TOUCH</span>

          <h2>
            Let's Build <span>Something</span>
          </h2>

          <p>
            Have an idea, project or opportunity? Let's connect
            and turn your idea into a modern software solution.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="contact-grid">

          {/* Left */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-info-heading">
              <div className="contact-main-icon">
                <Mail size={25} />
              </div>

              <div>
                <span>AVAILABLE FOR WORK</span>
                <h3>Let's talk.</h3>
              </div>
            </div>

            <p className="contact-info-description">
              I'm always interested in discussing new projects,
              creative ideas and opportunities to build useful
              software.
            </p>

            <div className="contact-details">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    href={item.link}
                    className="contact-detail"
                    key={item.id}
                  >
                    <div className="contact-detail-icon">
                      <Icon size={17} />
                    </div>

                    <div className="contact-detail-content">
                      <span>{item.title}</span>
                      <strong>{item.value}</strong>
                    </div>

                    <ArrowUpRight
                      className="contact-detail-arrow"
                      size={15}
                    />
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="contact-social-section">
              <span>FIND ME ONLINE</span>

              <div className="contact-socials">

                <a
                  href="https://github.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="social-link"
                >
                  <span>GH</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/YOUR_USERNAME/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-link"
                >
                  <span>in</span>
                </a>

              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-heading">
                <span>SEND A MESSAGE</span>
                <h3>Start a conversation</h3>
              </div>

              <div className="contact-form-row">

                <div className="contact-input-group">
                  <label htmlFor="name">Your Name</label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

              </div>

              <div className="contact-input-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="contact-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Sending...</span>
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 size={17} />
                    <span>Message Sent</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="contact-bottom"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>
            © 2026 • Software Engineer Portfolio
          </span>

          <a href="#home">
            Back to top
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}