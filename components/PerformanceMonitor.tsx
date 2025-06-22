import { useEffect } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  LCP: { good: 2500, poor: 4000 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
}

const getRating = (
  metricName: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if web vitals are available
    if (
      process.env.NODE_ENV !== 'production' ||
      typeof window === 'undefined'
    ) {
      return
    }

    let vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

    const analyticsId = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID
    if (analyticsId) {
      vitalsUrl += `?analyticsId=${analyticsId}`
    }

    const sendToAnalytics = (metric: PerformanceMetric) => {
      const body = {
        dsn: analyticsId,
        id: metric.name,
        page: window.location.pathname,
        href: window.location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: 'unknown',
      }

      if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, JSON.stringify(body))
      } else {
        fetch(vitalsUrl, {
          body: JSON.stringify(body),
          method: 'POST',
          keepalive: true,
        }).catch(console.error)
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[Performance] ${metric.name}: ${metric.value}ms (${metric.rating})`
        )
      }
    }

    // Web Vitals observer
    const handleWebVitals = (metric: any) => {
      const performanceMetric: PerformanceMetric = {
        name: metric.name,
        value: metric.value,
        rating: getRating(metric.name, metric.value),
        delta: metric.delta,
      }

      sendToAnalytics(performanceMetric)
    }

    // Dynamic import of web-vitals library
    import('web-vitals')
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(handleWebVitals)
        onINP(handleWebVitals)
        onFCP(handleWebVitals)
        onLCP(handleWebVitals)
        onTTFB(handleWebVitals)
      })
      .catch(() => {
        // Fallback: Use Performance Observer API if web-vitals is not available
        if ('PerformanceObserver' in window) {
          // Observe paint timing
          const paintObserver = new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                const metric: PerformanceMetric = {
                  name: 'FCP',
                  value: entry.startTime,
                  rating: getRating('FCP', entry.startTime),
                }
                sendToAnalytics(metric)
              }
            }
          })

          try {
            paintObserver.observe({ entryTypes: ['paint'] })
          } catch (e) {
            // Ignore errors
          }

          // Observe largest contentful paint
          const lcpObserver = new PerformanceObserver(list => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry) {
              const metric: PerformanceMetric = {
                name: 'LCP',
                value: lastEntry.startTime,
                rating: getRating('LCP', lastEntry.startTime),
              }
              sendToAnalytics(metric)
            }
          })

          try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
          } catch (e) {
            // Ignore errors
          }

          // Observe layout shifts
          const clsObserver = new PerformanceObserver(list => {
            let clsValue = 0
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
              }
            }

            if (clsValue > 0) {
              const metric: PerformanceMetric = {
                name: 'CLS',
                value: clsValue,
                rating: getRating('CLS', clsValue),
              }
              sendToAnalytics(metric)
            }
          })

          try {
            clsObserver.observe({ entryTypes: ['layout-shift'] })
          } catch (e) {
            // Ignore errors
          }
        }
      })

    // Monitor resource loading performance
    const resourceObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming

        // Track slow resources (>1s)
        if (resource.duration > 1000) {
          console.warn(
            `[Performance] Slow resource: ${resource.name} (${resource.duration}ms)`
          )
        }

        // Track large resources (>1MB)
        if (resource.transferSize && resource.transferSize > 1024 * 1024) {
          console.warn(
            `[Performance] Large resource: ${resource.name} (${(resource.transferSize / 1024 / 1024).toFixed(2)}MB)`
          )
        }
      }
    })

    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (e) {
      // Ignore errors
    }

    // Memory usage monitoring (if available)
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory
      if (memoryInfo.usedJSHeapSize > 50 * 1024 * 1024) {
        // 50MB
        console.warn(
          `[Performance] High memory usage: ${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`
        )
      }
    }

    // Cleanup function
    return () => {
      try {
        resourceObserver.disconnect()
      } catch (e) {
        // Ignore errors
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}

export default PerformanceMonitor
