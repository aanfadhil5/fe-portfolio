import React from "react";
import { motion } from "framer-motion";

type Props = {};

interface SkillData {
  name: string;
  level: number; // 1-5 proficiency level
  category: string;
  icon: string; // Emoji or icon
  description: string;
}

const skills: SkillData[] = [
  // Frontend Technologies
  {
    name: "React.js",
    level: 5,
    category: "Frontend",
    icon: "⚛️",
    description: "Component-based UI development",
  },
  {
    name: "Next.js",
    level: 4,
    category: "Frontend",
    icon: "🔺",
    description: "Full-stack React framework",
  },
  {
    name: "TypeScript",
    level: 4,
    category: "Frontend",
    icon: "📘",
    description: "Type-safe JavaScript development",
  },
  {
    name: "JavaScript",
    level: 5,
    category: "Frontend",
    icon: "🟡",
    description: "Modern ES6+ development",
  },
  {
    name: "HTML5",
    level: 5,
    category: "Frontend",
    icon: "🌐",
    description: "Semantic markup and accessibility",
  },
  {
    name: "CSS3",
    level: 4,
    category: "Frontend",
    icon: "🎨",
    description: "Modern styling and animations",
  },

  // Styling & Design
  {
    name: "Tailwind CSS",
    level: 5,
    category: "Styling",
    icon: "💨",
    description: "Utility-first CSS framework",
  },
  {
    name: "Ant Design",
    level: 4,
    category: "Styling",
    icon: "🐜",
    description: "React UI component library",
  },
  {
    name: "Figma",
    level: 3,
    category: "Design",
    icon: "🎯",
    description: "UI/UX design and prototyping",
  },

  // Backend & Database
  {
    name: "Node.js",
    level: 3,
    category: "Backend",
    icon: "🟢",
    description: "Server-side JavaScript runtime",
  },
  {
    name: "Python",
    level: 4,
    category: "Backend",
    icon: "🐍",
    description: "Data processing and automation",
  },
  {
    name: "MySQL",
    level: 3,
    category: "Database",
    icon: "🐬",
    description: "Relational database management",
  },
  {
    name: "PostgreSQL",
    level: 3,
    category: "Database",
    icon: "🐘",
    description: "Advanced relational database",
  },

  // Tools & Others
  {
    name: "Git",
    level: 4,
    category: "Tools",
    icon: "📚",
    description: "Version control and collaboration",
  },
  {
    name: "VS Code",
    level: 5,
    category: "Tools",
    icon: "💻",
    description: "Primary development environment",
  },
  {
    name: "Vite",
    level: 4,
    category: "Tools",
    icon: "⚡",
    description: "Fast build tool and dev server",
  },
];

const categories = [
  "Frontend",
  "Styling",
  "Design",
  "Backend",
  "Database",
  "Tools",
];

const categoryColors = {
  Frontend: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  Styling:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  Design: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
  Backend:
    "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  Database:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  Tools: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
};

function Skills({}: Props) {
  const renderProficiencyLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              dot <= level
                ? "bg-notion-accent dark:bg-dark-accent"
                : "bg-notion-border dark:bg-dark-border"
            }`}
          />
        ))}
      </div>
    );
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
        <h2 className="section-title text-center">Skills & Technologies</h2>
        <p className="section-subtitle text-center">
          Tools and technologies I use to bring ideas to life
        </p>
      </motion.div>

      {/* Skills by Category */}
      <div className="space-y-12">
        {categories.map((category, categoryIndex) => {
          const categorySkills = skills.filter(
            (skill) => skill.category === category
          );

          if (categorySkills.length === 0) return null;

          return (
            <motion.div
              key={category}
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-center mb-8">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    categoryColors[category as keyof typeof categoryColors]
                  }`}
                >
                  {category}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Skill Icon */}
                    <div className="skill-icon text-3xl mb-3">{skill.icon}</div>

                    {/* Skill Name */}
                    <h3 className="skill-name text-lg mb-2">{skill.name}</h3>

                    {/* Skill Description */}
                    <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Proficiency Level */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-notion-text-muted dark:text-dark-text-muted">
                          Proficiency
                        </span>
                        <span className="text-xs font-semibold text-notion-accent dark:text-dark-accent">
                          {skill.level}/5
                        </span>
                      </div>
                      {renderProficiencyLevel(skill.level)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skills Summary */}
      <motion.div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {[
          { number: "17+", label: "Technologies" },
          { number: "3+", label: "Years Experience" },
          { number: "6", label: "Categories" },
          { number: "100%", label: "Passion" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
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
          See These Skills in Action
        </a>
      </motion.div>
    </div>
  );
}

export default Skills;
