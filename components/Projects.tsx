import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {};

interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  achievements: string[];
  category: string;
  year: string;
  link?: string;
  demo?: string;
  featured: boolean;
}

const projects: ProjectData[] = [
  {
    title: "Enterprise ERP System",
    subtitle: "PT. Andalan Fluid Sistem",
    description:
      "Spearheaded the complete modernization of an enterprise ERP system, migrating from Vue.js to React.js while architecting comprehensive business modules for Production Management, Sales, Inventory Control, User Management, and Analytics dashboards.",
    image:
      "https://ik.imagekit.io/osw9g36vxc/afs-erp_UzkcZQSOs.png?updatedAt=1749057916800",
    technologies: [
      "React.js",
      "JavaScript",
      "Vite",
      "TailwindCSS",
      "Ant Design",
      "Axios",
      "PWA",
    ],
    achievements: [
      "Scaled application to serve 1,000+ active users across Indonesia",
      "Developed comprehensive business modules for Production Management, Sales, Inventory Control, User Management, and Analytics dashboards",
      "Implemented Progressive Web App capabilities with offline support",
      "Improved system performance and maintainability",
    ],
    category: "Enterprise Software",
    year: "2023 - Present",
    featured: true,
  },
  {
    title: "Data Migration Pipeline",
    subtitle: "PT. Andalan Fluid Sistem",
    description:
      "Developed a data migration pipeline using Python and SQLAlchemy to streamline the migration of data from an old system to a new one, ensuring data integrity and consistency.",
    image: "",
    technologies: ["Python", "SQLAlchemy", "PostgreSQL"],
    achievements: [],
    category: "Enterprise Software",
    year: "2025",
    featured: false,
  },
  {
    title: "Financial Dashboard",
    subtitle: "RSUI",
    description:
      "Developed an internal monitoring system that visualized critical financial health metrics for hospital management, providing real-time insights into financial performance and operational efficiency.",
    image:
      "https://ik.imagekit.io/osw9g36vxc/Untitled_design_8BHSJuGvXv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667142800170",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "Chart.js",
      "REST API",
    ],
    achievements: [
      "Built comprehensive financial health monitoring system",
      "Integrated real-time data visualization components",
      "Improved financial decision-making through intuitive dashboards",
      "Enhanced hospital management operational efficiency",
    ],
    category: "Healthcare Technology",
    year: "2022",
    featured: false,
  },
  {
    title: "hilangvery",
    subtitle: "Case Study Clone of losethevery.com",
    description:
      "Transform basic adjectives into more powerful ones by merging them with 'very'",
    image:
      "https://ik.imagekit.io/osw9g36vxc/MacBook_Air_mock_N3l4rJ2i_.png?updatedAt=1666280382617",
    technologies: ["React.js", "JavaScript", "LLM"],
    achievements: [],
    demo: "https://hilangvery.vercel.app/",
    category: "Mini Project",
    year: "2022 - 2023",
    featured: false,
  },
];

const categories = [
  "All",
  "Enterprise Software",
  "Healthcare Technology",
  "Mini Project",
];

const categoryColors = {
  "Enterprise Software":
    "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  "Healthcare Technology":
    "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  "Mini Project":
    "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
};

function Projects({}: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((project) => project.featured);

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
        <h2 className="section-title text-center">Featured Projects</h2>
        <p className="section-subtitle text-center">
          A showcase of my work across different domains and technologies
        </p>
      </motion.div>

      {/* Featured Projects */}
      <div className="mb-16">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-notion-text dark:text-dark-text mb-4">
            ⭐ Featured Work
          </h3>
          <p className="text-notion-text-secondary dark:text-dark-text-secondary">
            My most impactful and complex projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
            >
              {/* Project Image */}
              <div className="project-image-container relative overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Project Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryColors[
                        project.category as keyof typeof categoryColors
                      ]
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Featured Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-notion-accent dark:bg-dark-accent text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <div className="mb-4">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="text-notion-accent dark:text-dark-accent font-medium text-sm">
                    {project.subtitle}
                  </p>
                  <p className="text-notion-text-muted dark:text-dark-text-muted text-xs mt-1">
                    {project.year}
                  </p>
                </div>

                <p className="project-description mb-4">
                  {project.description}
                </p>

                {/* Key Achievements */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-notion-text dark:text-dark-text mb-2 text-left">
                    Key Achievements:
                  </h5>
                  <ul className="space-y-1 text-left">
                    {project.achievements
                      .slice(0, 3)
                      .map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start text-xs text-notion-text-secondary dark:text-dark-text-secondary"
                        >
                          <div className="w-1 h-1 bg-notion-accent dark:bg-dark-accent rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="project-tech mb-4">
                  {project.technologies.slice(0, 6).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="tech-tag text-xs opacity-60">
                      +{project.technologies.length - 6}
                    </span>
                  )}
                </div>

                {/* Project Links */}
                <div className="flex space-x-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 text-sm py-2"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Demo
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1 text-sm py-2"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold text-notion-text dark:text-dark-text mb-6">
          All Projects
        </h3>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? "bg-notion-accent dark:bg-dark-accent text-white"
                  : "bg-notion-bg-secondary dark:bg-dark-bg-secondary text-notion-text-secondary dark:text-dark-text-secondary hover:bg-notion-bg-hover dark:hover:bg-dark-bg-hover"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* All Projects Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={`${project.title}-${selectedCategory}`}
            className="project-card group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            layout
          >
            {/* Project Image */}
            <div className="project-image-container relative overflow-hidden rounded-t-xl">
              <img
                src={project.image}
                alt={project.title}
                className="project-image h-40"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    categoryColors[
                      project.category as keyof typeof categoryColors
                    ]
                  }`}
                >
                  {project.category}
                </span>
              </div>
              {project.featured && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-notion-accent dark:bg-dark-accent text-white text-xs font-medium rounded">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="project-content">
              <div className="mb-3">
                <h4 className="project-title text-lg">{project.title}</h4>
                <p className="text-notion-accent dark:text-dark-accent font-medium text-sm">
                  {project.subtitle}
                </p>
                <p className="text-notion-text-muted dark:text-dark-text-muted text-xs">
                  {project.year}
                </p>
              </div>

              <p className="project-description text-sm mb-3">
                {project.description.length > 120
                  ? `${project.description.substring(0, 120)}...`
                  : project.description}
              </p>

              {/* Technologies */}
              <div className="project-tech mb-3">
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag text-xs">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="tech-tag text-xs opacity-60">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Stats */}
      <motion.div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {[
          { number: projects.length.toString(), label: "Total Projects" },
          {
            number: featuredProjects.length.toString(),
            label: "Featured Work",
          },
          { number: "1000+", label: "Users Served" },
          { number: "3+", label: "Years Active" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl md:text-3xl font-bold text-notion-accent dark:text-dark-accent mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-notion-text-secondary dark:text-dark-text-secondary">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <a
          href="#contact"
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Let&apos;s Build Something Together
        </a>
      </motion.div>
    </div>
  );
}

export default Projects;
