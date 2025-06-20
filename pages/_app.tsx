import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../components/ErrorBoundary'
import PerformanceMonitor from '../components/PerformanceMonitor'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
      <PerformanceMonitor />
    </ErrorBoundary>
  )
}

export default MyApp
