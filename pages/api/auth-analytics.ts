import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { password } = req.body

  // Use a server-side only environment variable (no NEXT_PUBLIC_ prefix)
  const ANALYTICS_PASSWORD =
    process.env.ANALYTICS_PASSWORD || process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD

  if (!ANALYTICS_PASSWORD) {
    console.error(
      'ANALYTICS_PASSWORD environment variable is not set. Please check Vercel environment variables.'
    )
    console.error(
      'Available env vars:',
      Object.keys(process.env).filter(key => key.includes('ANALYTICS'))
    )
    return res.status(500).json({ message: 'Server configuration error' })
  }

  if (password === ANALYTICS_PASSWORD) {
    // Generate a simple session token
    const token = `analytics_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`

    // In a production app, you'd store this in a database or Redis
    // For simplicity, we'll just return it and let the client handle storage

    return res.status(200).json({
      success: true,
      token,
      message: 'Authentication successful',
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid password',
    })
  }
}
