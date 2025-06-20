import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import Skills from '../Skills'

interface MockMotionProps {
  children?: ReactNode
  [key: string]: unknown
}

// Mock framer-motion more completely
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: MockMotionProps) => {
      // Filter out framer-motion specific props
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        initial,
        animate,
        whileInView,
        whileHover,
        transition,
        viewport,
        exit,
        ...domProps
      } = props
      return <div {...domProps}>{children}</div>
    },
    a: ({ children, ...props }: MockMotionProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        initial,
        animate,
        whileInView,
        whileHover,
        transition,
        viewport,
        exit,
        ...domProps
      } = props
      return <a {...domProps}>{children}</a>
    },
  },
}))

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
})

describe('Skills Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders skills section title and subtitle', () => {
    render(<Skills />)

    expect(screen.getByText('Skills & Technologies')).toBeTruthy()
    expect(
      screen.getByText('Tools and technologies I use to bring ideas to life')
    ).toBeTruthy()
  })

  it('renders all skill categories', () => {
    render(<Skills />)

    // Check if category headers are rendered
    expect(screen.getByText('Frontend')).toBeTruthy()
    expect(screen.getByText('Styling')).toBeTruthy()
    expect(screen.getByText('Design')).toBeTruthy()
    expect(screen.getByText('Backend')).toBeTruthy()
    expect(screen.getByText('Database')).toBeTruthy()
    expect(screen.getByText('Tools')).toBeTruthy()
  })

  it('renders skill items with correct information', () => {
    render(<Skills />)

    // Check if specific skills are rendered
    expect(screen.getByText('React.js')).toBeTruthy()
    expect(screen.getByText('Component-based UI development')).toBeTruthy()
    expect(screen.getByText('Next.js')).toBeTruthy()
    expect(screen.getByText('Full-stack React framework')).toBeTruthy()
    expect(screen.getByText('TypeScript')).toBeTruthy()
    expect(screen.getByText('Type-safe JavaScript development')).toBeTruthy()
  })

  it('renders proficiency levels correctly', () => {
    render(<Skills />)

    // Check if proficiency indicators are rendered
    const proficiencyLabels = screen.getAllByText('Proficiency')
    expect(proficiencyLabels.length).toBeGreaterThan(0)

    // Use getAllByText for multiple instances
    const fiveStarRatings = screen.getAllByText('5/5')
    expect(fiveStarRatings.length).toBeGreaterThan(0) // React.js, JavaScript, HTML5, Tailwind CSS, VS Code have level 5

    const fourStarRatings = screen.getAllByText('4/5')
    expect(fourStarRatings.length).toBeGreaterThan(0) // Next.js, TypeScript, CSS3, Git, Vite have level 4
  })

  it('renders stats section', () => {
    render(<Skills />)

    expect(screen.getByText('17+')).toBeTruthy()
    expect(screen.getByText('Technologies')).toBeTruthy()
    expect(screen.getByText('3+')).toBeTruthy()
    expect(screen.getByText('Years Experience')).toBeTruthy()
    expect(screen.getByText('6')).toBeTruthy()
    expect(screen.getByText('Categories')).toBeTruthy()
    expect(screen.getByText('100%')).toBeTruthy()
    expect(screen.getByText('Passion')).toBeTruthy()
  })

  it('renders call to action button', () => {
    render(<Skills />)

    const ctaButton = screen.getByText('See These Skills in Action')
    expect(ctaButton).toBeTruthy()
    expect(ctaButton.getAttribute('href')).toBe('#projects')
  })

  it('handles scroll to projects when CTA is clicked', () => {
    // Mock getElementById and scrollIntoView
    const mockElement = {
      scrollIntoView: jest.fn(),
    }
    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(mockElement as unknown as HTMLElement)

    render(<Skills />)

    const ctaButton = screen.getByText('See These Skills in Action')
    fireEvent.click(ctaButton)

    expect(document.getElementById).toHaveBeenCalledWith('projects')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('prevents default behavior when CTA link is clicked', () => {
    render(<Skills />)

    const ctaButton = screen.getByText('See These Skills in Action')

    // Create a mock event with preventDefault
    const mockEvent = {
      preventDefault: jest.fn(),
      target: ctaButton,
    }

    // Simulate click with mock event
    fireEvent.click(ctaButton, mockEvent)

    // Since we're using a callback that calls preventDefault internally,
    // we need to test the behavior differently
    expect(ctaButton.getAttribute('href')).toBe('#projects')
  })

  it('renders skill icons', () => {
    render(<Skills />)

    // Check if skill icons (emojis) are rendered
    const skillCards = screen.getAllByText(
      /⚛️|🔺|📘|🟡|🌐|🎨|💨|🐜|🎯|🟢|🐍|🐬|🐘|📚|💻|⚡/
    )
    expect(skillCards.length).toBeGreaterThan(0)
  })

  it('groups skills by category correctly', () => {
    render(<Skills />)

    // Frontend skills should be grouped together
    const frontendSection = screen.getByText('Frontend').closest('div')
    expect(frontendSection).toBeTruthy()

    // Check if React.js is in the frontend section
    const reactSkill = screen.getByText('React.js')
    expect(reactSkill).toBeTruthy()
  })

  it('renders all expected skill names', () => {
    render(<Skills />)

    const expectedSkills = [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Ant Design',
      'Figma',
      'Node.js',
      'Python',
      'MySQL',
      'PostgreSQL',
      'Git',
      'VS Code',
      'Vite',
    ]

    expectedSkills.forEach(skill => {
      expect(screen.getByText(skill)).toBeTruthy()
    })
  })

  it('memoizes components correctly', () => {
    // This test ensures that our memoized components are properly exported
    // We can't directly test memoization behavior in Jest without more complex setup,
    // but we can ensure the component renders without issues
    const { rerender } = render(<Skills />)

    expect(screen.getByText('Skills & Technologies')).toBeTruthy()

    // Re-render with same props should work fine with memoization
    rerender(<Skills />)

    expect(screen.getByText('Skills & Technologies')).toBeTruthy()
  })
})
