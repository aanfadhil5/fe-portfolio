import type { NextApiRequest, NextApiResponse } from 'next'
import { isDevelopment } from '../../lib/env'

// Types for analytics data
interface AnalyticsRequest {
  type: 'error' | 'performance' | 'analytics'
  data: any
  timestamp: number
}

interface ErrorData {
  message: string
  stack?: string
  url: string
  userAgent: string
  timestamp: number
  sessionId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

interface PerformanceData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
  sessionId: string
}

interface InteractionData {
  event: string
  page: string
  timestamp: number
  sessionId: string
  metadata?: Record<string, any>
}

// In-memory storage for development (in production, you'd use a database)
const analyticsStore = {
  errors: [] as ErrorData[],
  performance: [] as PerformanceData[],
  interactions: [] as InteractionData[],
}

// Rate limiting (simple in-memory implementation)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 100 // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const key = ip
  const current = rateLimitStore.get(key)

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (current.count >= RATE_LIMIT) {
    return false
  }

  current.count++
  return true
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const ip =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : req.socket.remoteAddress || 'unknown'
  return ip
}

function validateAnalyticsData(data: any, type: string): boolean {
  if (!data || typeof data !== 'object') return false

  switch (type) {
    case 'error':
      return !!(data.message && data.sessionId && data.timestamp)
    case 'performance':
      return !!(data.name && typeof data.value === 'number' && data.sessionId)
    case 'analytics':
      return !!(data.event && data.sessionId && data.timestamp)
    default:
      return false
  }
}

function sanitizeData(data: any): any {
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
  const cleanData = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) return obj

    const cleaned: any = {}
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase()
      if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
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

async function storeAnalyticsData(type: string, data: any) {
  const sanitizedData = sanitizeData(data)

  // In development, store in memory
  if (isDevelopment) {
    switch (type) {
      case 'error':
        analyticsStore.errors.push(sanitizedData)
        // Keep only last 1000 errors
        if (analyticsStore.errors.length > 1000) {
          analyticsStore.errors = analyticsStore.errors.slice(-1000)
        }
        break
      case 'performance':
        analyticsStore.performance.push(sanitizedData)
        if (analyticsStore.performance.length > 1000) {
          analyticsStore.performance = analyticsStore.performance.slice(-1000)
        }
        break
      case 'analytics':
        analyticsStore.interactions.push(sanitizedData)
        if (analyticsStore.interactions.length > 1000) {
          analyticsStore.interactions = analyticsStore.interactions.slice(-1000)
        }
        break
    }

    console.log(`[Analytics] Stored ${type} data:`, sanitizedData)
    return
  }

  // In production, you would typically store in a database
  // For now, we'll just log and could integrate with services like:
  // - MongoDB/PostgreSQL for custom storage
  // - Google Analytics 4 for web analytics
  // - Sentry for error tracking
  // - DataDog/New Relic for performance monitoring

  try {
    // Example: Send to external logging service
    // await sendToLoggingService(type, sanitizedData)

    // For now, just console log in production (you'd remove this)
    console.log(`[Analytics] ${type.toUpperCase()}:`, {
      type,
      timestamp: new Date().toISOString(),
      data: sanitizedData,
    })
  } catch (error) {
    console.error('[Analytics] Failed to store data:', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req)
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ error: 'Rate limit exceeded' })
    }

    // Parse and validate request body
    const { type, data, timestamp }: AnalyticsRequest = req.body

    if (!type || !data) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!['error', 'performance', 'analytics'].includes(type)) {
      return res.status(400).json({ error: 'Invalid analytics type' })
    }

    if (!validateAnalyticsData(data, type)) {
      return res.status(400).json({ error: 'Invalid data format' })
    }

    // Store the analytics data
    await storeAnalyticsData(type, data)

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Analytics data received',
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('[Analytics] Error processing request:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Export analytics store for development dashboard
export { analyticsStore }
