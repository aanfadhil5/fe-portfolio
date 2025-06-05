/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useAnalytics } from "../hooks/useAnalytics";

type Props = {};

export default function About({}: Props) {
  const { trackCVDownload } = useAnalytics();
  const skills = [
    "React.js",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Git",
    "MySQL",
    "RESTful APIs",
    "Python",
  ];

  const highlights = [
    {
      title: "3+ Years Experience",
      description: "Building scalable web applications with modern frameworks",
    },
    {
      title: "Enterprise Focus",
      description: "Developed solutions serving 100+ active users daily",
    },
    {
      title: "Full Stack Capable",
      description: "Frontend expertise with backend integration experience",
    },
  ];

  const handleDownloadCV = async () => {
    try {
      // Track CV download initiation
      trackCVDownload("about-section");

      // Generate a simple session ID for tracking (optional)
      const sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Use the API route for better security and analytics
      const response = await fetch("/api/download-cv", {
        headers: {
          "X-Session-ID": sessionId,
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download CV");
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Farhan_Fadhilah_CV.pdf";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success feedback (optional)
      console.log("CV download started successfully");
    } catch (error) {
      console.error("Error downloading CV:", error);
      // Fallback to direct download
      const link = document.createElement("a");
      link.href = "/cv/Farhan_Fadhilah_CV.pdf";
      link.download = "Farhan_Fadhilah_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="text-center">
      {/* Section Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title text-center">About Me</h2>
        <p className="section-subtitle text-center">
          Passionate about creating digital experiences that make a difference
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <motion.div
          className="space-y-8 text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-notion-text dark:text-dark-text">
              I&apos;m a passionate Frontend Developer with over 3 years of
              experience creating exceptional digital experiences. Currently
              working at{" "}
              <span className="font-semibold text-notion-accent dark:text-dark-accent">
                PT. Andalan Fluid Sistem
              </span>
              , I specialize in building scalable web applications that serve
              enterprise-level users.
            </p>

            <p className="text-lg leading-relaxed text-notion-text dark:text-dark-text">
              My expertise lies in modern JavaScript frameworks, particularly{" "}
              <span className="font-semibold text-notion-accent dark:text-dark-accent">
                React.js
              </span>{" "}
              and{" "}
              <span className="font-semibold text-notion-accent dark:text-dark-accent">
                Next.js
              </span>
              , combined with TypeScript for type-safe development. I&apos;m
              passionate about creating intuitive user interfaces and optimizing
              application performance.
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-notion-text dark:text-dark-text">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Highlights Cards */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="card text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <h4 className="text-lg font-semibold text-notion-text dark:text-dark-text mb-2">
                {highlight.title}
              </h4>
              <p className="text-notion-text-secondary dark:text-dark-text-secondary">
                {highlight.description}
              </p>
            </motion.div>
          ))}

          {/* Call to Action Buttons */}
          <motion.div
            className="pt-4 space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            {/* Download CV Button */}
            <button
              onClick={handleDownloadCV}
              className="btn-secondary w-full justify-center group"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download CV
            </button>

            {/* Contact Button */}
            <a
              href="#contact"
              className="btn-primary w-full justify-center"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Let&apos;s Work Together
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
