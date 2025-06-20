import { motion } from 'framer-motion'
import React, { useCallback, useMemo, useState } from 'react'

type Props = {}

interface ProjectData {
  title: string
  subtitle: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
  category: string
  year: string
  link?: string
  demo?: string
  featured: boolean
}

// Move static data outside component to prevent recreation on every render
const projects: ProjectData[] = [
  {
    title: 'Enterprise ERP System',
    subtitle: 'PT. Andalan Fluid Sistem',
    description:
      'Spearheaded the complete modernization of an enterprise ERP system, migrating from Vue.js to React.js while architecting comprehensive business modules for Production Management, Sales, Inventory Control, User Management, and Analytics dashboards.',
    image:
      'https://ik.imagekit.io/osw9g36vxc/afs-erp_UzkcZQSOs.png?updatedAt=1749057916800',
    technologies: [
      'React.js',
      'JavaScript',
      'Vite',
      'TailwindCSS',
      'Ant Design',
      'Axios',
      'PWA',
    ],
    achievements: [
      'Scaled application to serve 1,000+ active users across Indonesia',
      'Developed comprehensive business modules for Production Management, Sales, Inventory Control, User Management, and Analytics dashboards',
      'Implemented Progressive Web App capabilities with offline support',
      'Improved system performance and maintainability',
    ],
    category: 'Enterprise Software',
    year: '2023 - Present',
    featured: true,
  },
  {
    title: 'Data Migration Pipeline',
    subtitle: 'PT. Andalan Fluid Sistem',
    description:
      'Developed a data migration pipeline using Python and SQLAlchemy to streamline the migration of data from an old system to a new one, ensuring data integrity and consistency.',
    image: '',
    technologies: ['Python', 'SQLAlchemy', 'PostgreSQL'],
    achievements: [],
    category: 'Enterprise Software',
    year: '2025',
    featured: false,
  },
  {
    title: 'Financial Dashboard',
    subtitle: 'RSUI',
    description:
      'Developed an internal monitoring system that visualized critical financial health metrics for hospital management, providing real-time insights into financial performance and operational efficiency.',
    image:
      'https://ik.imagekit.io/osw9g36vxc/Untitled_design_8BHSJuGvXv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667142800170',
    technologies: [
      'React.js',
      'Tailwind CSS',
      'JavaScript',
      'Chart.js',
      'REST API',
    ],
    achievements: [
      'Built comprehensive financial health monitoring system',
      'Integrated real-time data visualization components',
      'Improved financial decision-making through intuitive dashboards',
      'Enhanced hospital management operational efficiency',
    ],
    category: 'Healthcare Technology',
    year: '2022',
    featured: false,
  },
  {
    title: 'hilangvery',
    subtitle: 'Case Study Clone of losethevery.com',
    description:
      "Transform basic adjectives into more powerful ones by merging them with 'very'",
    image:
      'https://ik.imagekit.io/osw9g36vxc/MacBook_Air_mock_N3l4rJ2i_.png?updatedAt=1666280382617',
    technologies: ['React.js', 'JavaScript', 'LLM'],
    achievements: [],
    demo: 'https://hilangvery.vercel.app/',
    category: 'Mini Project',
    year: '2022 - 2023',
    featured: false,
  },
]

const categories = [
  'All',
  'Enterprise Software',
  'Healthcare Technology',
  'Mini Project',
] as const

const categoryColors = {
  'Enterprise Software':
    'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  'Healthcare Technology':
    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  'Mini Project':
    'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
} as const

// Memoized technology badge component
const TechBadge = React.memo(({ tech }: { tech: string }) => (
  <span className='tech-badge'>{tech}</span>
))

TechBadge.displayName = 'TechBadge'

// Memoized achievement list component
const AchievementList = React.memo(
  ({ achievements }: { achievements: string[] }) => {
    if (achievements.length === 0) return null

    return (
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold text-notion-text dark:text-dark-text'>
          Key Achievements:
        </h4>
        <ul className='space-y-1'>
          {achievements.map((achievement, index) => (
            <li
              key={index}
              className='text-sm text-notion-text-secondary dark:text-dark-text-secondary flex items-start'
            >
              <span className='text-notion-accent dark:text-dark-accent mr-2 mt-1 flex-shrink-0'>
                •
              </span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

AchievementList.displayName = 'AchievementList'

// Memoized project card component
const ProjectCard = React.memo(
  ({
    project,
    index,
    isFeatured = false,
  }: {
    project: ProjectData
    index: number
    isFeatured?: boolean
  }) => {
    const handleLinkClick = useCallback((url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }, [])

    return (
      <motion.div
        className='project-card group'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -8 }}
      >
        {/* Project Image */}
        {project.image && (
          <div className='project-image-container relative overflow-hidden rounded-t-xl'>
            <img
              src={project.image}
              alt={project.title}
              className='project-image'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

            {/* Project Category Badge */}
            <div className='absolute top-4 left-4'>
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
            {isFeatured && (
              <div className='absolute top-4 right-4'>
                <span className='px-3 py-1 bg-notion-accent dark:bg-dark-accent text-white text-xs font-semibold rounded-full'>
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Project Content */}
        <div className='project-content'>
          {/* Project Header */}
          <div className='mb-4'>
            <div className='flex items-start justify-between mb-2'>
              <h3 className='project-title'>{project.title}</h3>
              <span className='text-xs text-notion-text-muted dark:text-dark-text-muted flex-shrink-0 ml-2'>
                {project.year}
              </span>
            </div>
            <p className='project-subtitle'>{project.subtitle}</p>
          </div>

          {/* Project Description */}
          <p className='project-description'>{project.description}</p>

          {/* Technologies */}
          <div className='mb-4'>
            <h4 className='text-sm font-semibold text-notion-text dark:text-dark-text mb-2'>
              Technologies:
            </h4>
            <div className='flex flex-wrap gap-2'>
              {project.technologies.map(tech => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <AchievementList achievements={project.achievements} />

          {/* Project Links */}
          {(project.link || project.demo) && (
            <div className='flex gap-3 mt-6'>
              {project.demo && (
                <button
                  onClick={() => handleLinkClick(project.demo!)}
                  className='btn-primary text-sm'
                >
                  Live Demo
                </button>
              )}
              {project.link && (
                <button
                  onClick={() => handleLinkClick(project.link!)}
                  className='btn-secondary text-sm'
                >
                  View Project
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'

// Memoized category filter component
const CategoryFilter = React.memo(
  ({
    categories,
    selectedCategory,
    onCategoryChange,
  }: {
    categories: readonly string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
  }) => {
    return (
      <motion.div
        className='flex flex-wrap justify-center gap-2 mb-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-notion-accent dark:bg-dark-accent text-white'
                : 'bg-notion-bg-secondary dark:bg-dark-bg-secondary text-notion-text-secondary dark:text-dark-text-secondary hover:bg-notion-border dark:hover:bg-dark-border'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
    )
  }
)

CategoryFilter.displayName = 'CategoryFilter'

function Projects({}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Memoize filtered projects to avoid recalculation on every render
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? projects
      : projects.filter(project => project.category === selectedCategory)
  }, [selectedCategory])

  // Memoize featured projects to avoid recalculation on every render
  const featuredProjects = useMemo(() => {
    return projects.filter(project => project.featured)
  }, [])

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  return (
    <div className='text-center'>
      {/* Section Header */}
      <motion.div
        className='mb-16'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className='section-title text-center'>Featured Projects</h2>
        <p className='section-subtitle text-center'>
          A showcase of my work across different domains and technologies
        </p>
      </motion.div>

      {/* Featured Projects */}
      <div className='mb-16'>
        <motion.div
          className='mb-8'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className='text-2xl font-semibold text-notion-text dark:text-dark-text mb-4'>
            ⭐ Featured Work
          </h3>
          <p className='text-notion-text-secondary dark:text-dark-text-secondary'>
            My most impactful and complex projects
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isFeatured={true}
            />
          ))}
        </div>
      </div>

      {/* All Projects */}
      <div>
        <motion.div
          className='mb-8'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className='text-2xl font-semibold text-notion-text dark:text-dark-text mb-4'>
            🚀 All Projects
          </h3>
          <p className='text-notion-text-secondary dark:text-dark-text-secondary'>
            Complete portfolio of my development work
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Projects Grid */}
        <motion.div
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className='text-center py-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className='text-notion-text-secondary dark:text-dark-text-secondary'>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <motion.div
        className='mt-16'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className='bg-notion-bg-secondary dark:bg-dark-bg-secondary rounded-xl p-8'>
          <h3 className='text-xl font-semibold text-notion-text dark:text-dark-text mb-4'>
            Interested in working together?
          </h3>
          <p className='text-notion-text-secondary dark:text-dark-text-secondary mb-6'>
            Let&apos;s discuss your next project and how I can help bring your
            ideas to life.
          </p>
          <a
            href='#contact'
            className='btn-primary'
            onClick={e => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            Get In Touch
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default React.memo(Projects)
