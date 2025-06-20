import { render, screen, waitFor } from '@testing-library/react'
import OptimizedImage from '../OptimizedImage'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage(props: any) {
    const { onLoad, onError, ...restProps } = props

    // Simulate successful image load after a short delay
    setTimeout(() => {
      if (onLoad) onLoad()
    }, 100)

    return (
      <img
        {...restProps}
        data-testid='next-image'
        alt={restProps.alt || 'test image'}
      />
    )
  }
})

describe('OptimizedImage', () => {
  const defaultProps = {
    src: 'https://example.com/test-image.jpg',
    alt: 'Test image',
    width: 600,
    height: 400,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with basic props', () => {
    render(<OptimizedImage {...defaultProps} />)

    const image = screen.getByTestId('next-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', defaultProps.src)
    expect(image).toHaveAttribute('alt', defaultProps.alt)
  })

  it('shows loading spinner initially', () => {
    render(<OptimizedImage {...defaultProps} />)

    const spinner = screen.getByRole('generic')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('hides loading spinner after image loads', async () => {
    render(<OptimizedImage {...defaultProps} />)

    // Wait for the loading state to disappear
    await waitFor(
      () => {
        const spinner = screen.queryByRole('generic')
        expect(spinner).not.toBeInTheDocument()
      },
      { timeout: 200 }
    )
  })

  it('applies custom className', () => {
    const customClass = 'custom-image-class'
    render(<OptimizedImage {...defaultProps} className={customClass} />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveClass(customClass)
  })

  it('sets priority prop correctly', () => {
    render(<OptimizedImage {...defaultProps} priority={true} />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('priority')
  })

  it('uses blur placeholder when specified', () => {
    render(<OptimizedImage {...defaultProps} placeholder='blur' />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('placeholder', 'blur')
  })

  it('sets custom sizes attribute', () => {
    const customSizes = '(max-width: 768px) 100vw, 50vw'
    render(<OptimizedImage {...defaultProps} sizes={customSizes} />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('sizes', customSizes)
  })

  it('calls onLoad callback when image loads', async () => {
    const onLoad = jest.fn()
    render(<OptimizedImage {...defaultProps} onLoad={onLoad} />)

    await waitFor(
      () => {
        expect(onLoad).toHaveBeenCalledTimes(1)
      },
      { timeout: 200 }
    )
  })

  it('handles fill prop correctly', () => {
    render(<OptimizedImage {...defaultProps} fill={true} />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('fill')
  })

  it('applies default sizes when none provided', () => {
    render(<OptimizedImage {...defaultProps} />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute(
      'sizes',
      '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    )
  })
})

// Test error handling
describe('OptimizedImage Error Handling', () => {
  const defaultProps = {
    src: 'https://example.com/test-image.jpg',
    alt: 'Test image',
    width: 600,
    height: 400,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows error fallback when image fails to load', async () => {
    // Mock Image component to trigger error
    jest.doMock('next/image', () => {
      return function MockImage(props: any) {
        const { onError } = props

        setTimeout(() => {
          if (onError) onError()
        }, 100)

        return null
      }
    })

    const { rerender } = render(<OptimizedImage {...defaultProps} />)

    // Force re-render with error mock
    rerender(<OptimizedImage {...defaultProps} />)

    await waitFor(
      () => {
        const errorMessage = screen.getByText('Failed to load image')
        expect(errorMessage).toBeInTheDocument()
      },
      { timeout: 200 }
    )
  })

  it('calls onError callback when image fails', async () => {
    const onError = jest.fn()

    // Mock Image component to trigger error
    jest.doMock('next/image', () => {
      return function MockImage(props: any) {
        const { onError: propOnError } = props

        setTimeout(() => {
          if (propOnError) propOnError()
        }, 100)

        return null
      }
    })

    const { rerender } = render(
      <OptimizedImage {...defaultProps} onError={onError} />
    )

    // Force re-render with error mock
    rerender(<OptimizedImage {...defaultProps} onError={onError} />)

    await waitFor(
      () => {
        expect(onError).toHaveBeenCalledTimes(1)
      },
      { timeout: 200 }
    )
  })
})
