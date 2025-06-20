import { render } from '@testing-library/react'
import {
  ErrorTracking,
  getErrorTracker,
  trackError,
  trackEvent,
  trackPerformanceMetric,
} from '../ErrorTracking'

// Mock the environment functions
jest.mock('../../lib/env', () => ({
  getBaseUrl: () => 'http://localhost:3000',
  isDevelopment: true,
  isProduction: false,
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock fetch
global.fetch = jest.fn()

// Mock console methods
const consoleSpy = {
  log: jest.spyOn(console, 'log').mockImplementation(),
  error: jest.spyOn(console, 'error').mockImplementation(),
  warn: jest.spyOn(console, 'warn').mockImplementation(),
}

// Mock performance API
const mockPerformance = {
  getEntriesByType: jest.fn(),
  now: jest.fn(() => Date.now()),
}
Object.defineProperty(window, 'performance', {
  value: mockPerformance,
})

// Mock navigator.sendBeacon
Object.defineProperty(navigator, 'sendBeacon', {
  value: jest.fn(),
  writable: true,
})

describe('ErrorTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    mockPerformance.getEntriesByType.mockReturnValue([])
  })

  afterEach(() => {
    // Clean up event listeners
    const tracker = getErrorTracker()
    // Reset the singleton for testing
    ;(tracker as any).isInitialized = false
  })

  describe('ErrorTracking Component', () => {
    it('renders without crashing', () => {
      render(<ErrorTracking />)
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('[ErrorTracker] Initialized with session:'),
        expect.any(String)
      )
    })

    it('tracks page view on mount', () => {
      render(<ErrorTracking />)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_interactions',
        expect.stringContaining('page_view')
      )
    })

    it('tracks performance metrics when available', () => {
      const mockNavigation = {
        fetchStart: 1000,
        loadEventEnd: 3000,
      }
      mockPerformance.getEntriesByType.mockReturnValue([mockNavigation])

      render(<ErrorTracking />)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_performance',
        expect.stringContaining('page_load_time')
      )
    })
  })

  describe('Error Tracking Functionality', () => {
    it('tracks errors with trackError utility', () => {
      const testError = new Error('Test error')
      const context = { component: 'TestComponent' }

      trackError(testError, context)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_errors',
        expect.stringContaining('Test error')
      )
      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[ErrorTracker] Error reported:',
        expect.objectContaining({
          message: 'Test error',
          severity: 'low',
          component: 'TestComponent',
        })
      )
    })

    it('categorizes error severity correctly', () => {
      // Test critical error (network-related)
      const networkError = new Error('fetch failed due to network error')
      trackError(networkError)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_errors',
        expect.stringContaining('"severity":"critical"')
      )
    })

    it('handles global errors', () => {
      render(<ErrorTracking />)

      // Simulate a global error
      const errorEvent = new ErrorEvent('error', {
        message: 'Global error',
        filename: 'test.js',
        error: new Error('Global error'),
      })

      window.dispatchEvent(errorEvent)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_errors',
        expect.stringContaining('Global error')
      )
    })

    it('handles unhandled promise rejections', () => {
      render(<ErrorTracking />)

      // Create a simple mock event that matches what the handler expects
      const mockRejectionEvent = {
        reason: 'Unhandled rejection',
      }

      // Get the tracker and call the handler directly
      const tracker = getErrorTracker()
      ;(tracker as any).handleUnhandledRejection(mockRejectionEvent)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_errors',
        expect.stringContaining('Unhandled Promise Rejection')
      )
    })
  })

  describe('Performance Tracking', () => {
    it('tracks performance metrics', () => {
      trackPerformanceMetric('custom_metric', 1500, 'needs-improvement')

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_performance',
        expect.stringContaining('custom_metric')
      )
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[ErrorTracker] Performance metric:',
        expect.objectContaining({
          name: 'custom_metric',
          value: 1500,
          rating: 'needs-improvement',
        })
      )
    })

    it('tracks slow resources', () => {
      const slowResource = {
        name: 'slow-image.jpg',
        duration: 2000,
        transferSize: 500000,
      }
      mockPerformance.getEntriesByType.mockReturnValue([slowResource])

      render(<ErrorTracking />)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_performance',
        expect.stringContaining('slow_resource')
      )
    })
  })

  describe('User Interaction Tracking', () => {
    it('tracks custom events', () => {
      const metadata = { button: 'subscribe' }
      trackEvent('button_click', metadata)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_interactions',
        expect.stringContaining('button_click')
      )
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[ErrorTracker] User interaction:',
        expect.objectContaining({
          event: 'button_click',
          metadata,
        })
      )
    })

    it('tracks click events on interactive elements', () => {
      render(<ErrorTracking />)

      // Create a button and simulate click
      const button = document.createElement('button')
      button.textContent = 'Test Button'
      button.id = 'test-button'
      document.body.appendChild(button)

      button.click()

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_interactions',
        expect.stringContaining('click')
      )

      document.body.removeChild(button)
    })

    it('tracks form submissions', () => {
      render(<ErrorTracking />)

      // Create a form and simulate submission
      const form = document.createElement('form')
      form.id = 'test-form'
      form.action = '/test'
      form.method = 'POST'
      document.body.appendChild(form)

      const submitEvent = new Event('submit', { bubbles: true })
      form.dispatchEvent(submitEvent)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_interactions',
        expect.stringContaining('form_submit')
      )

      document.body.removeChild(form)
    })
  })

  describe('Data Storage and Management', () => {
    it('limits stored items to prevent localStorage bloat', () => {
      const tracker = getErrorTracker()

      // Mock existing data with 100 items
      const existingData = Array.from({ length: 100 }, (_, i) => ({
        message: `Error ${i}`,
        timestamp: Date.now() + i,
      }))
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingData))

      // Add one more error
      trackError(new Error('New error'))

      // Should have called setItem with exactly 100 items (removed oldest)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_errors',
        expect.stringMatching(/"message":"New error"/)
      )
    })

    it('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage is full')
      })

      trackError(new Error('Test error'))

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        '[ErrorTracker] Failed to store locally:',
        expect.any(Error)
      )
    })

    it('retrieves stored data correctly', () => {
      const tracker = getErrorTracker()
      const testData = [{ message: 'Test error', timestamp: Date.now() }]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData))

      const errors = tracker.getStoredData('errors')
      expect(errors).toEqual(testData)
    })
  })

  describe('Session Management', () => {
    it('generates unique session IDs', () => {
      const tracker1 = getErrorTracker()
      const tracker2 = getErrorTracker() // Should return same instance

      expect(tracker1.getSessionId()).toBe(tracker2.getSessionId())
      expect(tracker1.getSessionId()).toMatch(/^session_\d+_[a-z0-9]+$/)
    })

    it('allows setting user ID', () => {
      const tracker = getErrorTracker()
      tracker.setUserId('user123')

      trackError(new Error('Test error'))

      // Check that the stored data includes the userId
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_errors',
        expect.stringContaining('"userId":"user123"')
      )
    })
  })

  describe('Data Sanitization', () => {
    it('sanitizes sensitive data from errors', () => {
      const sensitiveError = new Error('Authentication failed')
      const context = {
        password: 'secret123',
        token: 'abc123',
        userInfo: {
          email: 'test@example.com',
          secret: 'hidden',
        },
      }

      trackError(sensitiveError, context)

      const storedData = localStorageMock.setItem.mock.calls.find(
        call => call[0] === 'portfolio_errors'
      )?.[1]

      expect(storedData).toContain('[REDACTED]')
      expect(storedData).not.toContain('secret123')
      expect(storedData).not.toContain('abc123')
      expect(storedData).not.toContain('hidden')
    })
  })
})

describe('Error Tracker Singleton', () => {
  it('returns the same instance', () => {
    const tracker1 = getErrorTracker()
    const tracker2 = getErrorTracker()

    expect(tracker1).toBe(tracker2)
  })

  it('initializes only once', () => {
    const tracker = getErrorTracker()

    // Clear console calls from previous tests
    consoleSpy.log.mockClear()

    // Get tracker again
    getErrorTracker()

    // Should not log initialization again
    expect(consoleSpy.log).not.toHaveBeenCalledWith(
      expect.stringContaining('[ErrorTracker] Initialized with session:'),
      expect.any(String)
    )
  })
})
