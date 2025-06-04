import React from "react";
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Link from "next/link";

type Props = {};

export default function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: [
      "Frontend Developer",
      "React.js Specialist",
      "Enterprise Solution Builder",
    ],
    loop: true,
    delaySpeed: 2000,
    deleteSpeed: 50,
    typeSpeed: 80,
  });

  return (
    <div className="hero">
      <div className="max-w-5xl mx-auto">
        {/* Hero Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-notion-text-secondary dark:text-dark-text-secondary">
              👋 Hello, I&apos;m
            </p>
            <h1 className="hero-title">
              Farhan{" "}
              <span className="text-notion-accent dark:text-dark-accent">
                Fadhilah
              </span>
            </h1>
          </motion.div>

          {/* Dynamic Title */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-notion-text-secondary dark:text-dark-text-secondary">
              <span>{text}</span>
              <Cursor cursorColor="#2383e2" />
            </div>
            <p className="hero-subtitle">
              Crafting exceptional user experiences with modern technologies
              like{" "}
              <span className="font-semibold text-notion-accent dark:text-dark-accent">
                React.js
              </span>
            </p>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-notion-card hover:shadow-notion-hover transition-all duration-300 group-hover:scale-105">
                <img
                  src="https://ik.imagekit.io/osw9g36vxc/ProfilePicturePhoto_K-yxgD4tt.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1665200412579"
                  className="w-full h-full object-cover"
                  alt="Farhan Fadhilah - Frontend Developer"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-notion-accent/20 to-notion-accent/10 dark:from-dark-accent/20 dark:to-dark-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "3+", label: "Years Experience" },
              { number: "1000+", label: "Users Served" },
              { number: "15+", label: "Projects Completed" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-notion-accent dark:text-dark-accent">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-notion-text-secondary dark:text-dark-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Link href="#projects" className="btn-primary">
              View My Work
            </Link>
            <Link href="#contact" className="btn-secondary">
              Get In Touch
            </Link>
            <a
              href="/cv/Farhan_Fadhilah_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download CV
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="flex flex-col items-center space-y-2 text-notion-text-muted dark:text-dark-text-muted hover:text-notion-accent dark:hover:text-dark-accent transition-colors duration-200"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-40 w-80 h-80 bg-notion-accent/5 dark:bg-dark-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-notion-accent/3 dark:bg-dark-accent/3 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </div>
  );
}
