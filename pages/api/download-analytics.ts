import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Types (shared with download-cv.ts)
interface DownloadRecord {
  id: string
  timestamp: string
  ip: string
  userAgent: string
  referer?: string
  country?: string
  device: {
    type: 'desktop' | 'mobile' | 'tablet' | 'unknown'
    browser: string
    os: string
  }
  sessionId?: string
}

interface DownloadStats {
  totalDownloads: number
  records: DownloadRecord[]
  lastUpdated: string
}

interface AnalyticsResponse {
  summary: {
    totalDownloads: number
    downloadsToday: number
    downloadsThisWeek: number
    downloadsThisMonth: number
    uniqueIPs: number
    lastDownload?: string
  }
  deviceStats: {
    desktop: number
    mobile: number
    tablet: number
    unknown: number
  }
  browserStats: Record<string, number>
  osStats: Record<string, number>
  dailyStats: Array<{
    date: string
    downloads: number
  }>
  recentDownloads: Array<{
    timestamp: string
    device: string
    browser: string
    os: string
    ip: string // Masked for privacy
  }>
}

// Helper function to mask IP for privacy
function maskIP(ip: string): string {
  if (ip.includes(':')) {
    // IPv6
    const parts = ip.split(':')
    return parts.slice(0, 4).join(':') + ':****'
  } else {
    // IPv4
    const parts = ip.split('.')
    return parts.slice(0, 2).join('.') + '.***'
  }
}

// Helper function to get date boundaries
function getDateBoundaries() {
  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const startOfWeek = new Date(startOfToday)
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return {
    today: startOfToday,
    week: startOfWeek,
    month: startOfMonth,
  }
}

// Generate analytics from download records
function generateAnalytics(stats: DownloadStats): AnalyticsResponse {
  const { today, week, month } = getDateBoundaries()

  // Filter records by time periods
  const todayRecords = stats.records.filter(r => new Date(r.timestamp) >= today)
  const weekRecords = stats.records.filter(r => new Date(r.timestamp) >= week)
  const monthRecords = stats.records.filter(r => new Date(r.timestamp) >= month)

  // Unique IPs
  const uniqueIPs = new Set(stats.records.map(r => r.ip)).size

  // Device stats
  const deviceStats = stats.records.reduce(
    (acc, record) => {
      acc[record.device.type]++
      return acc
    },
    { desktop: 0, mobile: 0, tablet: 0, unknown: 0 }
  )

  // Browser stats
  const browserStats = stats.records.reduce(
    (acc, record) => {
      acc[record.device.browser] = (acc[record.device.browser] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // OS stats
  const osStats = stats.records.reduce(
    (acc, record) => {
      acc[record.device.os] = (acc[record.device.os] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Daily stats for the last 30 days
  const dailyStats: Array<{ date: string; downloads: number }> = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const dayStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const dayDownloads = stats.records.filter(r => {
      const recordDate = new Date(r.timestamp)
      return recordDate >= dayStart && recordDate < dayEnd
    }).length

    dailyStats.push({
      date: dateStr,
      downloads: dayDownloads,
    })
  }

  // Recent downloads (last 10, privacy-friendly)
  const recentDownloads = stats.records
    .slice(-10)
    .reverse()
    .map(record => ({
      timestamp: record.timestamp,
      device: record.device.type,
      browser: record.device.browser,
      os: record.device.os,
      ip: maskIP(record.ip),
    }))

  return {
    summary: {
      totalDownloads: stats.totalDownloads,
      downloadsToday: todayRecords.length,
      downloadsThisWeek: weekRecords.length,
      downloadsThisMonth: monthRecords.length,
      uniqueIPs,
      lastDownload:
        stats.records.length > 0
          ? stats.records[stats.records.length - 1].timestamp
          : undefined,
    },
    deviceStats,
    browserStats,
    osStats,
    dailyStats,
    recentDownloads,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const trackingFile = path.join(process.cwd(), 'data', 'download-stats.json')

    // Check if tracking file exists
    if (!fs.existsSync(trackingFile)) {
      // Return empty analytics if no data exists yet
      const emptyAnalytics: AnalyticsResponse = {
        summary: {
          totalDownloads: 0,
          downloadsToday: 0,
          downloadsThisWeek: 0,
          downloadsThisMonth: 0,
          uniqueIPs: 0,
        },
        deviceStats: { desktop: 0, mobile: 0, tablet: 0, unknown: 0 },
        browserStats: {},
        osStats: {},
        dailyStats: [],
        recentDownloads: [],
      }

      return res.status(200).json(emptyAnalytics)
    }

    // Read and parse stats
    const data = fs.readFileSync(trackingFile, 'utf8')
    const stats: DownloadStats = JSON.parse(data)

    // Generate analytics
    const analytics = generateAnalytics(stats)

    // Add cache headers
    res.setHeader('Cache-Control', 'private, max-age=300') // Cache for 5 minutes

    return res.status(200).json(analytics)
  } catch (error) {
    console.error('Error generating analytics:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
