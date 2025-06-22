import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Types for tracking data
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

// Device detection helper
function detectDevice(userAgent: string): DownloadRecord['device'] {
  const ua = userAgent.toLowerCase()

  // Device type detection
  let type: DownloadRecord['device']['type'] = 'unknown'
  if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
    type = 'mobile'
  } else if (/tablet|ipad/i.test(ua)) {
    type = 'tablet'
  } else if (/windows|mac|linux/i.test(ua)) {
    type = 'desktop'
  }

  // Browser detection
  let browser = 'Unknown'
  if (ua.includes('chrome')) browser = 'Chrome'
  else if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('safari')) browser = 'Safari'
  else if (ua.includes('edge')) browser = 'Edge'
  else if (ua.includes('opera')) browser = 'Opera'

  // OS detection
  let os = 'Unknown'
  if (ua.includes('windows')) os = 'Windows'
  else if (ua.includes('mac')) os = 'macOS'
  else if (ua.includes('linux')) os = 'Linux'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad'))
    os = 'iOS'

  return { type, browser, os }
}

// Function to get client IP
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'] as string
  const realIP = req.headers['x-real-ip'] as string

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return req.socket.remoteAddress || 'unknown'
}

// Track download function
async function trackDownload(req: NextApiRequest): Promise<void> {
  try {
    const trackingFile = path.join(process.cwd(), 'data', 'download-stats.json')
    const dataDir = path.join(process.cwd(), 'data')

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Read existing stats or create new
    let stats: DownloadStats = {
      totalDownloads: 0,
      records: [],
      lastUpdated: new Date().toISOString(),
    }

    if (fs.existsSync(trackingFile)) {
      try {
        const data = fs.readFileSync(trackingFile, 'utf8')
        stats = JSON.parse(data)
      } catch (error) {
        console.error('Error reading existing stats:', error)
      }
    }

    // Create new download record
    const downloadRecord: DownloadRecord = {
      id: `download_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ip: getClientIP(req),
      userAgent: req.headers['user-agent'] || 'unknown',
      referer: req.headers.referer,
      device: detectDevice(req.headers['user-agent'] || ''),
      sessionId:
        (req.headers['x-session-id'] as string) ||
        (req.query.sessionId as string) ||
        undefined,
    }

    // Add to stats
    stats.records.push(downloadRecord)
    stats.totalDownloads = stats.records.length
    stats.lastUpdated = new Date().toISOString()

    // Keep only last 1000 records to prevent file from growing too large
    if (stats.records.length > 1000) {
      stats.records = stats.records.slice(-1000)
    }

    // Save updated stats
    fs.writeFileSync(trackingFile, JSON.stringify(stats, null, 2))

    console.log(
      `CV Download Tracked: ${downloadRecord.id} - ${downloadRecord.ip} - ${downloadRecord.device.type}/${downloadRecord.device.browser}`
    )
  } catch (error) {
    console.error('Error tracking download:', error)
    // Don't fail the download if tracking fails
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Track the download first
    await trackDownload(req)

    // Path to your CV file
    const cvPath = path.join(
      process.cwd(),
      'public',
      'cv',
      'Farhan_Fadhilah_CV.pdf'
    )

    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({ message: 'CV file not found' })
    }

    // Get file stats
    const stat = fs.statSync(cvPath)

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Farhan_Fadhilah_CV.pdf"'
    )
    res.setHeader('Content-Length', stat.size)
    res.setHeader('Cache-Control', 'public, max-age=86400') // Cache for 1 day

    // Optional: Add CORS headers if needed
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    // Stream the file
    const fileStream = fs.createReadStream(cvPath)
    fileStream.pipe(res)
  } catch (error) {
    console.error('Error serving CV:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
