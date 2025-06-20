import { motion } from 'framer-motion'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAnalytics } from '../hooks/useAnalytics'

type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

type Props = {}

function Contact({}: Props) {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { trackCVDownload, trackContactForm } = useAnalytics()

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    setIsSubmitting(true)
    trackContactForm('submitted', {
      name: formData.name,
      subject: formData.subject,
    })

    const subject = encodeURIComponent(
      formData.subject || 'Portfolio Contact from ' + formData.name
    )
    const body = encodeURIComponent(
      `Hello Farhan,\n\nI'm reaching out through your portfolio website.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nLooking forward to hearing from you!\n\nBest regards,\n${formData.name}`
    )

    // Simulate sending delay for better UX
    setTimeout(() => {
      window.location.href = `mailto:farhanfadhilah5@gmail.com?subject=${subject}&body=${body}`
      setIsSubmitting(false)
      setIsSubmitted(true)
      reset()

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'farhanfadhilah5@gmail.com',
      href: 'mailto:farhanfadhilah5@gmail.com',
      description: 'Drop me a line anytime',
    },
    {
      icon: '📱',
      label: 'WhatsApp',
      value: '+62 812-8767-3220',
      href: 'https://wa.me/6281287673220',
      description: 'Quick chat on WhatsApp',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Jakarta, Indonesia',
      href: 'https://maps.google.com/?q=Jakarta,Indonesia',
      description: 'Available for remote work',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/aanfadhil5',
      href: 'https://linkedin.com/in/aanfadhil5',
      description: "Let's connect professionally",
    },
  ]

  const quickActions = [
    {
      title: 'Schedule a Call',
      description: "Let's discuss your project over a video call",
      icon: '📞',
      action: () =>
        window.open(
          'mailto:farhanfadhilah5@gmail.com?subject=Schedule a Call&body=Hi Farhan, I would like to schedule a call to discuss a potential collaboration.'
        ),
      buttonText: 'Schedule Call',
    },
    {
      title: 'View My Work',
      description: 'Explore my latest projects and case studies',
      icon: '🎨',
      action: () =>
        document
          .getElementById('projects')
          ?.scrollIntoView({ behavior: 'smooth' }),
      buttonText: 'View Portfolio',
    },
    {
      title: 'Download Resume',
      description: 'Get a detailed overview of my experience',
      icon: '📄',
      action: () => {
        // Track CV download initiation
        trackCVDownload('contact-section')

        // Generate session ID for tracking
        const sessionId = `session_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`

        // Create a form to send headers with the download request
        const form = document.createElement('form')
        form.method = 'GET'
        form.action = '/api/download-cv'
        form.target = '_blank'

        // Add session ID as a query parameter since we can't send custom headers with window.open
        form.action += `?sessionId=${sessionId}`

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)
      },
      buttonText: 'Download CV',
    },
  ]

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
        <h2 id='contact-heading' className='section-title text-center'>
          Let&apos;s Work Together
        </h2>
        <p className='section-subtitle text-center'>
          Ready to bring your ideas to life? I&apos;m here to help you build
          something amazing
        </p>
      </motion.div>

      <div className='grid lg:grid-cols-2 gap-16 items-start'>
        {/* Contact Information */}
        <motion.div
          className='space-y-8'
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Availability Status */}
          <div className='card text-left'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <h3 className='text-lg font-semibold text-notion-text dark:text-dark-text'>
                Available for New Projects
              </h3>
            </div>
            <p className='text-notion-text-secondary dark:text-dark-text-secondary leading-relaxed'>
              I&apos;m currently open to new frontend development opportunities,
              especially roles involving React.js, Next.js, and modern web
              technologies. Let&apos;s discuss how I can contribute to your
              success.
            </p>
          </div>

          {/* Contact Methods */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-notion-text dark:text-dark-text text-left mb-6'>
              Get In Touch
            </h3>
            <div className='grid gap-4'>
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='card text-left group cursor-pointer hover:-translate-y-1 transition-all duration-200'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className='flex items-center space-x-4'>
                    <div className='text-2xl'>{info.icon}</div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-notion-text dark:text-dark-text group-hover:text-notion-accent dark:group-hover:text-dark-accent transition-colors'>
                        {info.label}
                      </h4>
                      <p className='text-notion-text-secondary dark:text-dark-text-secondary text-sm'>
                        {info.value}
                      </p>
                      <p className='text-notion-text-muted dark:text-dark-text-muted text-xs mt-1'>
                        {info.description}
                      </p>
                    </div>
                    <svg
                      className='w-5 h-5 text-notion-text-muted dark:text-dark-text-muted group-hover:text-notion-accent dark:group-hover:text-dark-accent transition-colors'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-notion-text dark:text-dark-text text-left mb-6'>
              Quick Actions
            </h3>
            <div className='grid gap-4'>
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  className='card text-left'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='flex items-start space-x-4'>
                    <div className='text-2xl'>{action.icon}</div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-notion-text dark:text-dark-text mb-1'>
                        {action.title}
                      </h4>
                      <p className='text-notion-text-secondary dark:text-dark-text-secondary text-sm mb-3'>
                        {action.description}
                      </p>
                      <button
                        onClick={action.action}
                        className='btn-secondary text-sm'
                      >
                        {action.buttonText}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className='space-y-8'
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className='card'>
            <h3 className='text-xl font-semibold text-notion-text dark:text-dark-text text-left mb-6'>
              Send me a message
            </h3>

            {isSubmitted && (
              <motion.div
                className='mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='font-medium'>
                    Message sent successfully!
                  </span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='contact-name'
                    className='block text-sm font-medium text-notion-text dark:text-dark-text mb-2'
                  >
                    Name *
                  </label>
                  <input
                    {...register('name')}
                    id='contact-name'
                    placeholder='Your full name'
                    className='input'
                    type='text'
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor='contact-email'
                    className='block text-sm font-medium text-notion-text dark:text-dark-text mb-2'
                  >
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    id='contact-email'
                    placeholder='your.email@example.com'
                    className='input'
                    type='email'
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='contact-subject'
                  className='block text-sm font-medium text-notion-text dark:text-dark-text mb-2'
                >
                  Subject
                </label>
                <input
                  {...register('subject')}
                  id='contact-subject'
                  placeholder="What's this about?"
                  className='input'
                  type='text'
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor='contact-message'
                  className='block text-sm font-medium text-notion-text dark:text-dark-text mb-2'
                >
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id='contact-message'
                  placeholder='Tell me about your project, timeline, or any questions you have...'
                  className='textarea'
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                type='submit'
                className={`btn-primary w-full justify-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className='flex items-center space-x-2'>
                    <svg
                      className='animate-spin w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            <div className='mt-6 pt-6 border-t border-notion-border-light dark:border-dark-border-light'>
              <p className='text-notion-text-muted dark:text-dark-text-muted text-sm text-center'>
                I typically respond within 24 hours. For urgent inquiries, feel
                free to reach out on{' '}
                <a
                  href='https://wa.me/6281287673220'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-notion-accent dark:text-dark-accent hover:underline'
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <motion.div
        className='mt-16 text-center'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='max-w-2xl mx-auto'>
          <h3 className='text-2xl font-semibold text-notion-text dark:text-dark-text mb-4'>
            Ready to start your project?
          </h3>
          <p className='text-notion-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed'>
            Whether you need a new website, want to modernize an existing
            application, or have questions about frontend development, I&apos;m
            here to help turn your vision into reality.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <a
              href="mailto:farhanfadhilah5@gmail.com?subject=Let's discuss a project"
              className='btn-primary'
            >
              Start a Project
            </a>
            <a
              href='https://linkedin.com/in/aanfadhil5'
              target='_blank'
              rel='noopener noreferrer'
              className='btn-secondary'
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
