import React from "react";
import { motion } from "framer-motion";

type Props = {};

interface ExperienceData {
  company: string;
  position: string;
  duration: string;
  location: string;
  logo: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: ExperienceData[] = [
  {
    company: "PT. Andalan Fluid Sistem",
    position: "Frontend Developer",
    duration: "March 2023 – Present",
    location: "Bogor, West Java",
    logo: "https://via.placeholder.com/100x100/2383e2/ffffff?text=AFS",
    description:
      "Leading frontend development for enterprise ERP systems serving 1,000+ active users across multiple branches throughout Indonesia.",
    achievements: [
      "Spearheaded modernization of enterprise ERP system by transitioning from Vue.js to React.js",
      "Architected comprehensive business modules including Production Management, Sales, Inventory Control, User Management, and Analytics dashboards",
      "Developed Progressive Web App capabilities with offline support for enhanced accessibility",
      "Created robust data migration pipeline using Python, Pandas, and SQLAlchemy",
      "Implemented comprehensive error handling and monitoring solutions reducing system downtime",
      "Conducted knowledge transfer sessions ensuring consistent coding practices across the team",
    ],
    technologies: [
      "JavaScript (ES6+)",
      "React.js",
      "Vite",
      "TailwindCSS",
      "Ant Design",
      "React Context API",
      "Axios",
      "PWA",
      "Git",
      "Python",
      "Pandas",
      "SQLAlchemy",
    ],
  },
  {
    company: "PT. DIKA Inovasi Karsa Ananta",
    position: "Frontend Developer",
    duration: "November 2022 – February 2023",
    location: "Depok, West Java",
    logo: "https://via.placeholder.com/100x100/22c55e/ffffff?text=DIKA",
    description:
      "Delivered high-performance, responsive web applications using React.js that met client requirements and project timelines.",
    achievements: [
      "Delivered high-performance, responsive web applications using React.js",
      "Transformed UI/UX design wireframes into intuitive, visually appealing interfaces",
      "Enhanced user engagement and satisfaction through superior interface design",
    ],
    technologies: ["React.js", "JavaScript", "HTML", "CSS"],
  },
  {
    company: "Incubator Business Center Gunadarma",
    position: "Frontend Developer Intern",
    duration: "July 2022 – October 2022",
    location: "Depok, West Java",
    logo: "https://via.placeholder.com/100x100/22c55e/ffffff?text=IBC",
    description:
      "Gained foundational experience in frontend development while contributing to real-world projects and collaborating with development teams.",
    achievements: [
      "Constructed interactive dashboard interfaces with data visualization components",
      "Translated design team wireframes into functional implementations",
      "Collaborated with back-end developers through pair programming sessions",
      "Conducted code reviews to improve overall code quality",
    ],
    technologies: ["React.js", "Tailwind CSS", "REST API", "Vite"],
  },
];

function Experience({}: Props) {
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
        <h2 className="section-title text-center">Experience</h2>
        <p className="section-subtitle text-center">
          My professional journey in frontend development
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-notion-border-light dark:bg-dark-border-light"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:items-center`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-notion-accent dark:bg-dark-accent rounded-full border-4 border-notion-bg dark:border-dark-bg shadow-notion-card z-10"></div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    className="experience-card group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-notion-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center flex-shrink-0">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.nextElementSibling!.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                        <div className="hidden w-8 h-8 bg-notion-accent dark:bg-dark-accent rounded text-white text-xs font-bold flex items-center justify-center">
                          {exp.company.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="experience-title">{exp.position}</h3>
                        <p className="experience-company">{exp.company}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-notion-text-muted dark:text-dark-text-muted">
                          <span className="experience-period">
                            {exp.duration}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-notion-text-secondary dark:text-dark-text-secondary mb-4 text-left leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-notion-text dark:text-dark-text mb-3 text-left">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2 text-left">
                        {exp.achievements
                          .slice(0, 3)
                          .map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className="flex items-start text-sm text-notion-text-secondary dark:text-dark-text-secondary"
                            >
                              <div className="w-1.5 h-1.5 bg-notion-accent dark:bg-dark-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        {exp.achievements.length > 3 && (
                          <li className="text-xs text-notion-text-muted dark:text-dark-text-muted italic">
                            +{exp.achievements.length - 3} more achievements
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-notion-text dark:text-dark-text mb-3">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 8).map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag text-xs">
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 8 && (
                          <span className="tech-tag text-xs opacity-60">
                            +{exp.technologies.length - 8}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <a
          href="#projects"
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          View My Projects
        </a>
      </motion.div>
    </div>
  );
}

export default Experience;
