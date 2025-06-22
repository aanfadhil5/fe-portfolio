import { track } from '@vercel/analytics'

/**
 * Custom analytics hook that combines Vercel Analytics with our custom tracking
 */
export const useAnalytics = () => {
  /**
   * Track custom events in Vercel Analytics
   */
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    try {
      // Track with Vercel Analytics
      track(eventName, properties)
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  /**
   * Track CV download with enhanced data
   */
  const trackCVDownload = (
    method: 'about-section' | 'contact-section' | 'direct-link'
  ) => {
    trackEvent('cv_download_initiated', {
      method,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
    })
  }

  /**
   * Track section views for better engagement insights
   */
  const trackSectionView = (section: string) => {
    trackEvent('section_viewed', {
      section,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    })
  }

  /**
   * Track contact form interactions
   */
  const trackContactForm = (
    action: 'started' | 'submitted' | 'error',
    details?: any
  ) => {
    trackEvent('contact_form', {
      action,
      timestamp: new Date().toISOString(),
      ...details,
    })
  }

  /**
   * Track project clicks
   */
  const trackProjectClick = (
    projectName: string,
    type: 'demo' | 'github' | 'details'
  ) => {
    trackEvent('project_interaction', {
      project: projectName,
      type,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Track navigation events
   */
  const trackNavigation = (destination: string, method: 'click' | 'scroll') => {
    trackEvent('navigation', {
      destination,
      method,
      timestamp: new Date().toISOString(),
      from: window.location.pathname,
    })
  }

  return {
    trackEvent,
    trackCVDownload,
    trackSectionView,
    trackContactForm,
    trackProjectClick,
    trackNavigation,
  }
}
