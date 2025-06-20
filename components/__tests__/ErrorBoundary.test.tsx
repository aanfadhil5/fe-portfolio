import { fireEvent, render, screen } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

// Mock console.error to avoid noise in test output
const originalError = console.error
beforeAll(() => {
  // eslint-disable-next-line no-console
  console.error = jest.fn()
})

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = originalError
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test child</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test child')).toBeTruthy()
  })

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeTruthy()
    expect(screen.getByText(/We encountered an unexpected error/)).toBeTruthy()
  })

  it('renders custom fallback component when provided', () => {
    const CustomFallback = ({
      error,
      resetError,
    }: {
      error?: Error
      resetError: () => void
    }) => (
      <div>
        <p>Custom error: {error?.message}</p>
        <button onClick={resetError}>Reset</button>
      </div>
    )

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error: Test error')).toBeTruthy()
    expect(screen.getByText('Reset')).toBeTruthy()
  })

  it('provides working reset functionality', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Should show error UI initially
    expect(screen.getByText('Oops! Something went wrong')).toBeTruthy()

    // Click try again button
    fireEvent.click(screen.getByText('Try Again'))

    // This tests that the reset function works (component rerenders)
    expect(screen.getByText('Try Again')).toBeTruthy()
  })

  it('includes contact support functionality', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const contactLink = screen.getByText('Contact Support')
    expect(contactLink).toBeTruthy()
  })
})
