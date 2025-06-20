import { render, screen } from '@testing-library/react'
import LoadingSpinner, {
  FullPageLoading,
  SectionLoading,
} from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders spinner without text by default', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toBeTruthy()
    expect(spinner.getAttribute('aria-label')).toBe('Loading')
  })

  it('renders spinner with custom text', () => {
    render(<LoadingSpinner text='Please wait...' />)

    expect(screen.getByText('Please wait...')).toBeTruthy()
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<LoadingSpinner size='sm' />)
    expect(screen.getByRole('status')).toBeTruthy()

    rerender(<LoadingSpinner size='lg' />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className='custom-class' />)

    const container = screen.getByRole('status').parentElement
    expect(container?.className).toContain('custom-class')
  })
})

describe('FullPageLoading', () => {
  it('renders full page loading with default text', () => {
    render(<FullPageLoading />)

    expect(screen.getByText('Loading...')).toBeTruthy()
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('renders full page loading with custom text', () => {
    render(<FullPageLoading text='Initializing...' />)

    expect(screen.getByText('Initializing...')).toBeTruthy()
  })
})

describe('SectionLoading', () => {
  it('renders section loading with default text', () => {
    render(<SectionLoading />)

    expect(screen.getByText('Loading...')).toBeTruthy()
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('renders section loading with custom text and className', () => {
    render(<SectionLoading text='Fetching data...' className='my-section' />)

    expect(screen.getByText('Fetching data...')).toBeTruthy()

    const container = screen.getByRole('status').closest('.my-section')
    expect(container).toBeTruthy()
  })
})
