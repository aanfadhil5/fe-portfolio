import { useEffect } from 'react'
import { getBaseUrl, isDevelopment, isProduction } from '../lib/env'

// Error tracking interface
interface ErrorInfo {
  message: string
  stack?: string
  url: string
  userAgent: string
  timestamp: number
  userId?: string
  sessionId: string
  componentStack?: string
  errorBoundary?: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
}

// Performance metrics interface
interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
  sessionId: string
}

// User interaction tracking
interface UserInteraction {
  event: string
  element?: string
  page: string
  timestamp: number
  sessionId: string
  metadata?: Record<string, any>
}

class ErrorTracker {
  private sessionId: string
  private userId?: string
  private isInitialized = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initialize()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initialize() {
    if (typeof window === 'undefined' || this.isInitialized) return

    // Set up global error handlers
    window.addEventListener('error', this.handleGlobalError.bind(this))
    window.addEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection.bind(this)
    )

    // Track page visibility changes
    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange.bind(this)
    )

    // Track user interactions
    this.setupInteractionTracking()

    this.isInitialized = true

    if (isDevelopment) {
      console.log('[ErrorTracker] Initialized with session:', this.sessionId)
    }
  }

  private handleGlobalError(event: ErrorEvent) {
    const errorInfo: ErrorInfo = {
      message: event.message,
      stack: event.error?.stack,
      url: event.filename || window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      severity: this.categorizeError(event.message),
    }

    this.reportError(errorInfo)
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent) {
    const errorInfo: ErrorInfo = {
      message: `Unhandled Promise Rejection: ${event.reason}`,
      stack: event.reason?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      severity: 'high',
    }

    this.reportError(errorInfo)
  }

  private handleVisibilityChange() {
    if (document.hidden) {
      // User left the page, good time to send any pending analytics
      this.flushPendingData()
    }
  }

  private setupInteractionTracking() {
    // Track clicks on important elements
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement
      if (
        target.matches('a, button, [role="button"]') ||
        target.closest('a, button, [role="button"]')
      ) {
        const element = target.closest('a, button, [role="button"]')
        this.trackInteraction('click', {
          element: element?.tagName.toLowerCase(),
          text: element?.textContent?.slice(0, 50),
          href: (element as HTMLAnchorElement)?.href,
          id: element?.id,
          className: element?.className,
        })
      }
    })

    // Track form submissions
    document.addEventListener('submit', event => {
      const form = event.target as HTMLFormElement
      this.trackInteraction('form_submit', {
        formId: form.id,
        action: form.action,
        method: form.method,
      })
    })
  }

  private categorizeError(message: string): ErrorInfo['severity'] {
    const criticalKeywords = [
      'network',
      'fetch',
      'cors',
      'security',
      'authentication',
    ]
    const highKeywords = ['undefined', 'null', 'reference', 'type']
    const mediumKeywords = ['warning', 'deprecated']

    const lowerMessage = message.toLowerCase()

    if (criticalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'critical'
    }
    if (highKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high'
    }
    if (mediumKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium'
    }
    return 'low'
  }

  public reportError(errorInfo: ErrorInfo) {
    // Sanitize the error info before processing
    const sanitizedErrorInfo = this.sanitizeData(errorInfo)

    // Send to external services in production
    if (isProduction) {
      this.sendToExternalServices(sanitizedErrorInfo)
    }

    // Always log locally for development
    if (isDevelopment) {
      console.error('[ErrorTracker] Error reported:', sanitizedErrorInfo)
    }

    // Store in local storage as fallback
    this.storeLocally('errors', sanitizedErrorInfo)
  }

  private sanitizeData(data: any): any {
    // Remove potentially sensitive information
    const sanitized = { ...data }

    // Remove or mask sensitive fields
    if (sanitized.userAgent) {
      // Keep only browser info, remove detailed system info
      sanitized.userAgent = sanitized.userAgent.split(' ').slice(0, 3).join(' ')
    }

    if (sanitized.url) {
      try {
        const url = new URL(sanitized.url)
        // Remove query parameters that might contain sensitive data
        sanitized.url = `${url.protocol}//${url.host}${url.pathname}`
      } catch {
        // Invalid URL, keep as is
      }
    }

    // Remove any keys that might contain sensitive data
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth']
    // Fields to preserve (don't sanitize these)
    const preserveKeys = [
      'userId',
      'sessionId',
      'severity',
      'message',
      'stack',
      'url',
      'userAgent',
      'timestamp',
      'componentStack',
      'errorBoundary',
    ]

    const cleanData = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj

      const cleaned: any = {}
      for (const [key, value] of Object.entries(obj)) {
        const lowerKey = key.toLowerCase()

        // Preserve important fields
        if (preserveKeys.includes(key)) {
          cleaned[key] = value
        }
        // Sanitize sensitive fields
        else if (
          sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))
        ) {
          cleaned[key] = '[REDACTED]'
        } else if (typeof value === 'object') {
          cleaned[key] = cleanData(value)
        } else {
          cleaned[key] = value
        }
      }
      return cleaned
    }

    return cleanData(sanitized)
  }

  public trackPerformance(metric: Omit<PerformanceMetric, 'sessionId'>) {
    const fullMetric: PerformanceMetric = {
      ...metric,
      sessionId: this.sessionId,
    }

    if (isProduction) {
      this.sendToExternalServices(fullMetric, 'performance')
    }

    if (isDevelopment) {
      console.log('[ErrorTracker] Performance metric:', fullMetric)
    }

    this.storeLocally('performance', fullMetric)
  }

  public trackInteraction(event: string, metadata?: Record<string, any>): void {
    const interaction: UserInteraction = {
      event,
      page: window.location.pathname,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      metadata,
    }

    if (isDevelopment) {
      console.log('[ErrorTracker] User interaction:', interaction)
    }

    this.storeLocally('interactions', interaction)

    // Send to analytics in production
    if (isProduction) {
      this.sendToExternalServices(interaction, 'analytics')
    }
  }

  private async sendToExternalServices(
    data: any,
    type: 'error' | 'performance' | 'analytics' = 'error'
  ) {
    try {
      // Sentry integration (if available)
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        const Sentry = (window as any).Sentry
        if (type === 'error') {
          Sentry.captureException(new Error(data.message), {
            extra: data,
            tags: {
              severity: data.severity,
              sessionId: data.sessionId,
            },
          })
        }
      }

      // Google Analytics 4 integration (if available)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const gtag = (window as any).gtag
        if (type === 'analytics') {
          gtag('event', data.event, {
            custom_parameter_1: data.metadata,
            session_id: data.sessionId,
          })
        } else if (type === 'error') {
          gtag('event', 'exception', {
            description: data.message,
            fatal: data.severity === 'critical',
            session_id: data.sessionId,
          })
        }
      }

      // Custom API endpoint fallback
      const baseUrl = getBaseUrl()
      await fetch(`${baseUrl}/api/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          timestamp: Date.now(),
        }),
      }).catch(error => {
        // Silent fail for analytics - don't break the app
        if (isDevelopment) {
          console.warn('[ErrorTracker] Failed to send to API:', error)
        }
      })
    } catch (error) {
      // Silent fail - don't break the app because of tracking issues
      if (isDevelopment) {
        console.warn(
          '[ErrorTracker] Failed to send to external services:',
          error
        )
      }
    }
  }

  private storeLocally(type: string, data: any) {
    try {
      const key = `portfolio_${type}`
      const existing = localStorage.getItem(key)
      const items = existing ? JSON.parse(existing) : []

      items.push(data)

      // Keep only last 100 items to prevent localStorage bloat
      if (items.length > 100) {
        items.splice(0, items.length - 100)
      }

      localStorage.setItem(key, JSON.stringify(items))
    } catch (error) {
      // LocalStorage might be full or disabled
      if (isDevelopment) {
        console.warn('[ErrorTracker] Failed to store locally:', error)
      }
    }
  }

  private flushPendingData() {
    // Send any pending data before the user leaves
    if (navigator.sendBeacon && isProduction) {
      try {
        const errors = localStorage.getItem('portfolio_errors')
        const performance = localStorage.getItem('portfolio_performance')
        const interactions = localStorage.getItem('portfolio_interactions')

        const payload = {
          sessionId: this.sessionId,
          errors: errors ? JSON.parse(errors) : [],
          performance: performance ? JSON.parse(performance) : [],
          interactions: interactions ? JSON.parse(interactions) : [],
          timestamp: Date.now(),
        }

        const baseUrl = getBaseUrl()
        navigator.sendBeacon(
          `${baseUrl}/api/analytics/flush`,
          JSON.stringify(payload)
        )

        // Clear local storage after sending
        localStorage.removeItem('portfolio_errors')
        localStorage.removeItem('portfolio_performance')
        localStorage.removeItem('portfolio_interactions')
      } catch (error) {
        // Silent fail
      }
    }
  }

  public setUserId(userId: string) {
    this.userId = userId
  }

  public getSessionId(): string {
    return this.sessionId
  }

  public getStoredData(type: 'errors' | 'performance' | 'interactions') {
    try {
      const data = localStorage.getItem(`portfolio_${type}`)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }
}

// Singleton instance
let errorTracker: ErrorTracker | null = null

export const getErrorTracker = (): ErrorTracker => {
  if (!errorTracker) {
    errorTracker = new ErrorTracker()
  }
  return errorTracker
}

// React component for easy integration
export const ErrorTracking: React.FC = () => {
  useEffect(() => {
    // Initialize error tracking
    const tracker = getErrorTracker()

    // Track page views
    tracker.trackInteraction('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
      title: document.title,
    })

    // Track performance metrics when available
    if ('performance' in window && 'getEntriesByType' in performance) {
      // Track navigation timing
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming
      if (navigation) {
        tracker.trackPerformance({
          name: 'page_load_time',
          value: navigation.loadEventEnd - navigation.fetchStart,
          rating:
            navigation.loadEventEnd - navigation.fetchStart < 2000
              ? 'good'
              : 'needs-improvement',
          timestamp: Date.now(),
          url: window.location.href,
        })
      }

      // Track resource timing for slow resources
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[]
      resources.forEach(resource => {
        if (resource.duration > 1000) {
          // Resources taking more than 1s
          tracker.trackPerformance({
            name: 'slow_resource',
            value: resource.duration,
            rating: 'poor',
            timestamp: Date.now(),
            url: resource.name,
          })
        }
      })
    }

    // Cleanup function
    return () => {
      // Flush any pending data when component unmounts
      tracker.getSessionId() // This ensures tracker is initialized
    }
  }, [])

  return null // This component doesn't render anything
}

// Utility functions for manual tracking
export const trackError = (error: Error, context?: Record<string, any>) => {
  const tracker = getErrorTracker()

  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    sessionId: tracker.getSessionId(),
    severity: (tracker as any).categorizeError(error.message),
    userId: (tracker as any).userId,
    ...context,
  }

  tracker.reportError(errorInfo)
}

export const trackEvent = (event: string, metadata?: Record<string, any>) => {
  const tracker = getErrorTracker()
  tracker.trackInteraction(event, metadata)
}

export const trackPerformanceMetric = (
  name: string,
  value: number,
  rating: 'good' | 'needs-improvement' | 'poor' = 'good'
) => {
  const tracker = getErrorTracker()
  tracker.trackPerformance({
    name,
    value,
    rating,
    timestamp: Date.now(),
    url: window.location.href,
  })
}

export default ErrorTracking
