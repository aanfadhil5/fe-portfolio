import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../components/ErrorBoundary'
import { ErrorTracking } from '../components/ErrorTracking'
import PerformanceMonitor from '../components/PerformanceMonitor'
import nextI18NextConfig from '../next-i18next.config.js'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ErrorTracking />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
      <PerformanceMonitor />
    </ErrorBoundary>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
