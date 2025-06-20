import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{
    error?: Error
    resetError: () => void
  }>
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service (e.g., Sentry)
    // eslint-disable-next-line no-console
    console.error('Error caught by boundary:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        )
      }

      // Default fallback UI
      return (
        <DefaultErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

// Default Error Fallback Component
interface DefaultErrorFallbackProps {
  error?: Error
  resetError: () => void
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-notion-bg dark:bg-dark-bg'>
      <div className='max-w-md w-full mx-auto text-center p-6'>
        <div className='bg-notion-bg-card dark:bg-dark-bg-card border border-notion-border dark:border-dark-border rounded-xl p-8 shadow-notion-card'>
          {/* Error Icon */}
          <div className='w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-red-600 dark:text-red-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>

          {/* Error Message */}
          <h2 className='text-xl font-semibold text-notion-text dark:text-dark-text mb-4'>
            Oops! Something went wrong
          </h2>

          <p className='text-notion-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed'>
            We encountered an unexpected error. Don&apos;t worry, it&apos;s not
            your fault. Please try refreshing the page or contact support if the
            problem persists.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className='mb-6 text-left'>
              <summary className='cursor-pointer text-sm font-medium text-notion-text-muted dark:text-dark-text-muted mb-2'>
                Error Details (Development Only)
              </summary>
              <div className='bg-notion-bg dark:bg-dark-bg p-3 rounded-md text-xs font-mono text-red-600 dark:text-red-400 overflow-auto'>
                <div className='font-semibold mb-2'>
                  {error.name}: {error.message}
                </div>
                <div className='whitespace-pre-wrap opacity-80'>
                  {error.stack}
                </div>
              </div>
            </details>
          )}

          {/* Actions */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <button onClick={resetError} className='btn-primary flex-1'>
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className='btn-secondary flex-1'
            >
              Refresh Page
            </button>
          </div>

          {/* Contact Support */}
          <div className='mt-6 pt-6 border-t border-notion-border-light dark:border-dark-border-light'>
            <p className='text-xs text-notion-text-muted dark:text-dark-text-muted'>
              Still having issues?{' '}
              <a
                href='mailto:farhanfadhilah5@gmail.com?subject=Portfolio Error Report'
                className='text-notion-accent dark:text-dark-accent hover:underline'
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
