import { motion, useScroll, useTransform } from 'framer-motion'
import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// Components
import About from '../components/About'
import {
  LiveRegion,
  SkipToMainContent,
  useReducedMotion,
} from '../components/AccessibilityUtils'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [announceMessage, setAnnounceMessage] = useState('')
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  // Respect reduced motion preference
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, prefersReducedMotion ? 1 : 0]
  )

  // Dark mode toggle
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      setAnnounceMessage('Dark mode enabled')
    } else {
      document.documentElement.classList.remove('dark')
      setAnnounceMessage('Light mode enabled')
    }

    // Clear announcement after 1 second
    setTimeout(() => setAnnounceMessage(''), 1000)
  }

  return (
    <div className='min-h-screen bg-notion-bg dark:bg-dark-bg text-notion-text dark:text-dark-text transition-colors duration-300 scrollbar-custom'>
      <Head>
        <title>
          Farhan Fadhilah | Frontend Developer | React & Next.js Expert
        </title>
        <meta
          name='description'
          content='Experienced Frontend Developer specializing in React.js, Next.js, and modern web technologies. 3+ years building scalable applications for enterprise clients. Available for frontend development opportunities.'
        />
        <meta
          name='keywords'
          content='Frontend Developer, React Developer, Next.js, JavaScript, TypeScript, Tailwind CSS, Web Development, Indonesia, Jakarta'
        />
        <meta name='author' content='Farhan Fadhilah' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
        <meta name='theme-color' content='#ffffff' />
        <meta
          name='theme-color'
          content='#191919'
          media='(prefers-color-scheme: dark)'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='Farhan Fadhilah | Frontend Developer'
        />
        <meta
          property='og:description'
          content='Experienced Frontend Developer specializing in React.js and modern web technologies'
        />
        <meta property='og:url' content='https://farhanfadhilah.dev' />
        <meta property='og:site_name' content='Farhan Fadhilah Portfolio' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Farhan Fadhilah | Frontend Developer'
        />
        <meta
          name='twitter:description'
          content='Experienced Frontend Developer specializing in React.js and modern web technologies'
        />

        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />

        {/* Preconnect to external domains */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='preconnect' href='https://ik.imagekit.io' />

        {/* Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Farhan Fadhilah',
              jobTitle: 'Frontend Developer',
              description:
                'Experienced Frontend Developer specializing in React.js, Next.js, and modern web technologies',
              url: 'https://farhanfadhilah.dev',
              email: 'farhanfadhilah5@gmail.com',
              knowsAbout: [
                'React.js',
                'Next.js',
                'JavaScript',
                'TypeScript',
                'Tailwind CSS',
                'Frontend Development',
              ],
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Gunadarma University',
              },
              worksFor: {
                '@type': 'Organization',
                name: 'PT. Andalan Fluid Sistem',
              },
            }),
          }}
        />
      </Head>

      {/* Skip to main content link */}
      <SkipToMainContent />

      {/* Live region for announcements */}
      <LiveRegion message={announceMessage} />

      {/* Progress Bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-notion-accent dark:bg-dark-accent z-50 origin-left'
        style={{ scaleX: scrollYProgress }}
        role='progressbar'
        aria-label='Page scroll progress'
        aria-valuenow={Math.round(scrollYProgress.get() * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Navigation */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main id='main-content' className='relative' tabIndex={-1}>
        {/* Hero Section */}
        <section id='hero' className='relative' aria-labelledby='hero-heading'>
          <Hero />
          {!prefersReducedMotion && (
            <motion.div
              className='absolute inset-0 pointer-events-none'
              style={{ opacity }}
              aria-hidden='true'
            >
              {/* Background decorative elements */}
              <div className='absolute top-20 left-10 w-72 h-72 bg-notion-accent/5 dark:bg-dark-accent/10 rounded-full blur-3xl' />
              <div className='absolute bottom-20 right-10 w-96 h-96 bg-notion-accent/3 dark:bg-dark-accent/5 rounded-full blur-3xl' />
            </motion.div>
          )}
        </section>

        {/* About Section */}
        <section id='about' className='section' aria-labelledby='about-heading'>
          <div className='section-container'>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? {} : { duration: 0.8, ease: 'easeOut' }
              }
              viewport={{ once: true, margin: '-100px' }}
            >
              <About />
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id='experience'
          className='section bg-notion-bg-alt dark:bg-dark-bg-alt'
          aria-labelledby='experience-heading'
        >
          <div className='section-container'>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? {} : { duration: 0.8, ease: 'easeOut' }
              }
              viewport={{ once: true, margin: '-100px' }}
            >
              <Experience />
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id='skills'
          className='section'
          aria-labelledby='skills-heading'
        >
          <div className='section-container'>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? {} : { duration: 0.8, ease: 'easeOut' }
              }
              viewport={{ once: true, margin: '-100px' }}
            >
              <Skills />
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id='projects'
          className='section bg-notion-bg-alt dark:bg-dark-bg-alt'
          aria-labelledby='projects-heading'
        >
          <div className='section-container'>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? {} : { duration: 0.8, ease: 'easeOut' }
              }
              viewport={{ once: true, margin: '-100px' }}
            >
              <Projects />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id='contact'
          className='section'
          aria-labelledby='contact-heading'
        >
          <div className='section-container'>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? {} : { duration: 0.8, ease: 'easeOut' }
              }
              viewport={{ once: true, margin: '-100px' }}
            >
              <Contact />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setAnnounceMessage('Scrolled to top of page')
          setTimeout(() => setAnnounceMessage(''), 1000)
        }}
        className='fixed bottom-8 right-8 p-3 bg-notion-bg-card dark:bg-dark-bg-card border border-notion-border dark:border-dark-border rounded-full shadow-notion-card hover:shadow-notion-hover transition-all duration-200 hover:-translate-y-1 z-40 focus:outline-none focus:ring-2 focus:ring-notion-accent focus:ring-offset-2'
        initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
        animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        aria-label='Scroll to top of page'
      >
        <svg
          className='w-6 h-6 text-notion-text-secondary dark:text-dark-text-secondary'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 15l7-7 7 7'
          />
        </svg>
      </motion.button>
    </div>
  )
}

export default Home

// Add getStaticProps for i18n support
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'navigation',
        'hero',
        'about',
        'experience',
        'skills',
        'projects',
        'contact',
      ])),
    },
  }
}
