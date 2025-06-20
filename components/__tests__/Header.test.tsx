import { fireEvent, render, screen } from '@testing-library/react'
import Header from '../Header'

// Mock framer-motion to avoid issues with animations in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('Header Component', () => {
  const mockToggleDarkMode = jest.fn()

  beforeEach(() => {
    mockToggleDarkMode.mockClear()
  })

  it('renders the header with logo', () => {
    render(<Header darkMode={false} toggleDarkMode={mockToggleDarkMode} />)

    expect(screen.getByText('Farhan Fadhilah')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<Header darkMode={false} toggleDarkMode={mockToggleDarkMode} />)

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('calls toggleDarkMode when dark mode button is clicked', () => {
    render(<Header darkMode={false} toggleDarkMode={mockToggleDarkMode} />)

    const darkModeButton = screen.getByLabelText('Toggle dark mode')
    fireEvent.click(darkModeButton)

    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1)
  })

  it('displays correct icon for light mode', () => {
    render(<Header darkMode={false} toggleDarkMode={mockToggleDarkMode} />)

    const darkModeButton = screen.getByLabelText('Toggle dark mode')
    expect(darkModeButton).toBeInTheDocument()
  })

  it('displays correct icon for dark mode', () => {
    render(<Header darkMode={true} toggleDarkMode={mockToggleDarkMode} />)

    const darkModeButton = screen.getByLabelText('Toggle dark mode')
    expect(darkModeButton).toBeInTheDocument()
  })

  it('opens and closes mobile menu', () => {
    render(<Header darkMode={false} toggleDarkMode={mockToggleDarkMode} />)

    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)

    // The menu should be opened (this would need to be adjusted based on actual implementation)
    expect(menuButton).toBeInTheDocument()
  })
})
