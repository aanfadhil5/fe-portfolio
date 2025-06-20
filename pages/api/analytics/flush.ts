import type { NextApiRequest, NextApiResponse } from 'next'
import { isDevelopment } from '../../../lib/env'

interface FlushRequest {
  sessionId: string
  errors: any[]
  performance: any[]
  interactions: any[]
  timestamp: number
}

// Rate limiting for flush endpoint (more lenient than regular analytics)
const flushRateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>()
const FLUSH_RATE_LIMIT = 10 // flushes per minute
const FLUSH_RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function checkFlushRateLimit(ip: string): boolean {
  const now = Date.now()
  const key = `flush_${ip}`
  const current = flushRateLimitStore.get(key)

  if (!current || now > current.resetTime) {
    flushRateLimitStore.set(key, {
      count: 1,
      resetTime: now + FLUSH_RATE_LIMIT_WINDOW,
    })
    return true
  }

  if (current.count >= FLUSH_RATE_LIMIT) {
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

function sanitizeBatchData(data: any[]): any[] {
  return data.map(item => {
    const sanitized = { ...item }

    // Remove or mask sensitive fields
    if (sanitized.userAgent) {
      sanitized.userAgent = sanitized.userAgent.split(' ').slice(0, 3).join(' ')
    }

    if (sanitized.url) {
      try {
        const url = new URL(sanitized.url)
        sanitized.url = `${url.protocol}//${url.host}${url.pathname}`
      } catch {
        // Invalid URL, keep as is
      }
    }

    // Remove sensitive keys
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
  })
}

async function processBatchData(flushData: FlushRequest) {
  const { sessionId, errors, performance, interactions, timestamp } = flushData

  // Sanitize all data
  const sanitizedErrors = sanitizeBatchData(errors)
  const sanitizedPerformance = sanitizeBatchData(performance)
  const sanitizedInteractions = sanitizeBatchData(interactions)

  const summary = {
    sessionId,
    timestamp: new Date(timestamp).toISOString(),
    counts: {
      errors: sanitizedErrors.length,
      performance: sanitizedPerformance.length,
      interactions: sanitizedInteractions.length,
    },
    errorSeverities: sanitizedErrors.reduce((acc: any, error: any) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1
      return acc
    }, {}),
    performanceMetrics: sanitizedPerformance.reduce((acc: any, metric: any) => {
      if (!acc[metric.name]) acc[metric.name] = []
      acc[metric.name].push({
        value: metric.value,
        rating: metric.rating,
        timestamp: metric.timestamp,
      })
      return acc
    }, {}),
    topInteractions: sanitizedInteractions.reduce(
      (acc: any, interaction: any) => {
        acc[interaction.event] = (acc[interaction.event] || 0) + 1
        return acc
      },
      {}
    ),
  }

  if (isDevelopment) {
    console.log('[Analytics Flush] Session summary:', summary)

    // In development, also log individual items if there are critical errors
    const criticalErrors = sanitizedErrors.filter(
      e => e.severity === 'critical'
    )
    if (criticalErrors.length > 0) {
      console.error(
        '[Analytics Flush] Critical errors detected:',
        criticalErrors
      )
    }

    // Log slow performance metrics
    const slowMetrics = sanitizedPerformance.filter(m => m.rating === 'poor')
    if (slowMetrics.length > 0) {
      console.warn('[Analytics Flush] Poor performance metrics:', slowMetrics)
    }
  } else {
    // In production, you would typically:
    // 1. Store in a database for analysis
    // 2. Send to monitoring services (Sentry, DataDog, etc.)
    // 3. Trigger alerts for critical issues
    // 4. Update real-time dashboards

    console.log('[Analytics Flush] Batch processed:', summary)

    // Example integrations (you would implement these):
    // await sendToDatabase(sanitizedErrors, sanitizedPerformance, sanitizedInteractions)
    // await sendToMonitoringService(summary)
    // await checkForAlerts(sanitizedErrors)
  }

  return summary
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle both POST and GET (for sendBeacon compatibility)
  if (!['POST', 'GET'].includes(req.method || '')) {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req)
    if (!checkFlushRateLimit(clientIP)) {
      return res.status(429).json({ error: 'Rate limit exceeded' })
    }

    let flushData: FlushRequest

    // Handle different request methods
    if (req.method === 'POST') {
      if (typeof req.body === 'string') {
        // sendBeacon sends data as string
        try {
          flushData = JSON.parse(req.body)
        } catch {
          return res.status(400).json({ error: 'Invalid JSON in request body' })
        }
      } else {
        flushData = req.body
      }
    } else {
      // GET request with query parameters (fallback)
      const { sessionId, data } = req.query
      if (!sessionId || !data) {
        return res.status(400).json({ error: 'Missing required parameters' })
      }

      try {
        const parsedData = JSON.parse(data as string)
        flushData = {
          sessionId: sessionId as string,
          errors: parsedData.errors || [],
          performance: parsedData.performance || [],
          interactions: parsedData.interactions || [],
          timestamp: parsedData.timestamp || Date.now(),
        }
      } catch {
        return res.status(400).json({ error: 'Invalid data format' })
      }
    }

    // Validate required fields
    if (!flushData.sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' })
    }

    // Ensure arrays exist
    flushData.errors = flushData.errors || []
    flushData.performance = flushData.performance || []
    flushData.interactions = flushData.interactions || []

    // Limit batch size to prevent abuse
    const MAX_ITEMS_PER_TYPE = 100
    if (flushData.errors.length > MAX_ITEMS_PER_TYPE) {
      flushData.errors = flushData.errors.slice(-MAX_ITEMS_PER_TYPE)
    }
    if (flushData.performance.length > MAX_ITEMS_PER_TYPE) {
      flushData.performance = flushData.performance.slice(-MAX_ITEMS_PER_TYPE)
    }
    if (flushData.interactions.length > MAX_ITEMS_PER_TYPE) {
      flushData.interactions = flushData.interactions.slice(-MAX_ITEMS_PER_TYPE)
    }

    // Process the batch data
    const summary = await processBatchData(flushData)

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Batch analytics data processed',
      summary,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('[Analytics Flush] Error processing batch:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
