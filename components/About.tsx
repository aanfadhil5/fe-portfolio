/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function About({}: Props) {
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

          {/* Call to Action */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
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
