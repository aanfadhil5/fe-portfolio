# Component Documentation

This document provides comprehensive documentation for all React components in the fe-portfolio project.

## Table of Contents

- [Core Components](#core-components)
- [Layout Components](#layout-components)
- [Utility Components](#utility-components)
- [Skill Components](#skill-components)
- [Card Components](#card-components)
- [Testing](#testing)

## Core Components

### Header

**Location**: `components/Header.tsx`

The main navigation header component with responsive design and dark mode support.

#### Props

```typescript
interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}
```

#### Features

- Responsive navigation menu
- Dark mode toggle
- Social media icons with external links
- Mobile hamburger menu
- Smooth animations with Framer Motion
- Accessibility compliant with ARIA labels

#### Usage

```tsx
import Header from '../components/Header'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
  )
}
```

### Hero

**Location**: `components/Hero.tsx`

Landing section component with animated typewriter effect and profile information.

#### Features

- Animated typewriter effect for job titles
- Profile image with hover effects
- Statistics display (experience, users served, projects)
- Call-to-action buttons
- Scroll indicator
- Background decorative elements

#### Usage

```tsx
import Hero from '../components/Hero'

function HomePage() {
  return <Hero />
}
```

### About

**Location**: `components/About.tsx`

Personal information and professional background section.

#### Features

- Professional summary
- Skills highlight
- Experience overview
- Responsive layout

### Experience

**Location**: `components/Experience.tsx`

Professional experience timeline component.

#### Features

- Timeline layout
- Company information
- Role descriptions
- Technology stack used
- Achievements and responsibilities

### Skills

**Location**: `components/Skills.tsx`

Technical skills showcase with interactive elements.

#### Props

```typescript
interface SkillsProps {
  // No props - self-contained component
}
```

#### Features

- Skill categories (Frontend, Backend, Tools)
- Proficiency levels with visual indicators
- Interactive hover effects
- Statistics grid
- Responsive grid layout
- Performance optimized with React.memo

#### Performance Optimizations

- Memoized skill categories and data
- Optimized re-renders with useMemo and useCallback
- Subcomponents for better granular updates

### Projects

**Location**: `components/Projects.tsx`

Portfolio projects showcase with filtering and detailed information.

#### Features

- Project filtering by category
- Detailed project cards with:
  - Screenshots/previews
  - Technology stack badges
  - Live demo and source code links
  - Achievement highlights
- Responsive grid layout
- Search and filter functionality

#### Performance Optimizations

- Memoized project data and filters
- Optimized image loading
- Efficient filtering algorithms

### Contact

**Location**: `components/Contact.tsx`

Contact form and information section.

#### Features

- Contact form with validation
- Multiple contact methods
- Quick action buttons
- Form submission handling
- Success/error states
- Email integration

## Layout Components

### ErrorBoundary

**Location**: `components/ErrorBoundary.tsx`

React error boundary component with comprehensive error handling.

#### Props

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{
    error?: Error
    resetError: () => void
  }>
}
```

#### Features

- Catches JavaScript errors in component tree
- Custom fallback UI support
- Error reporting integration
- Development error details
- Reset functionality
- Beautiful default error UI
- Contact support integration

#### Usage

```tsx
import ErrorBoundary from '../components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  )
}
```

## Utility Components

### LoadingSpinner

**Location**: `components/LoadingSpinner.tsx`

Reusable loading spinner component with multiple variants.

#### Props

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  'aria-label'?: string
}
```

#### Variants

- `LoadingSpinner` - Basic spinner
- `FullPageLoading` - Full screen loading overlay
- `SectionLoading` - Section-specific loading

#### Features

- Multiple size variants
- Accessible with ARIA labels
- Customizable styling
- Smooth animations

#### Usage

```tsx
import { LoadingSpinner, FullPageLoading } from '../components/LoadingSpinner'

function MyComponent() {
  return (
    <div>
      <LoadingSpinner size='lg' aria-label='Loading content' />
      <FullPageLoading message='Preparing your experience...' />
    </div>
  )
}
```

### OptimizedImage

**Location**: `components/OptimizedImage.tsx`

Enhanced image component with optimization features.

#### Props

```typescript
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}
```

#### Features

- Lazy loading with intersection observer
- Loading states with blur placeholders
- Error handling with fallback UI
- Performance optimizations
- Next.js Image component integration
- Responsive sizing

#### Usage

```tsx
import OptimizedImage from '../components/OptimizedImage'

function Gallery() {
  return (
    <OptimizedImage
      src='/images/project-screenshot.jpg'
      alt='Project screenshot'
      width={600}
      height={400}
      placeholder='blur'
      priority={true}
    />
  )
}
```

### ErrorTracking

**Location**: `components/ErrorTracking.tsx`

Comprehensive error tracking and analytics component.

#### Features

- Automatic error detection and reporting
- Performance monitoring
- User interaction tracking
- Session management
- Data sanitization
- External service integration (Sentry, Google Analytics)
- Local storage fallback

#### Usage

```tsx
import {
  ErrorTracking,
  trackError,
  trackEvent,
} from '../components/ErrorTracking'

function App() {
  return (
    <>
      <ErrorTracking />
      <YourApp />
    </>
  )
}

// Manual tracking
trackError(new Error('Custom error'), { component: 'MyComponent' })
trackEvent('button_click', { button: 'subscribe' })
```

### AccessibilityUtils

**Location**: `components/AccessibilityUtils.tsx`

Collection of accessibility utility components and hooks.

#### Components

- `SkipToMainContent` - Skip navigation link
- `AccessibleButton` - Enhanced button with ARIA support
- `LiveRegion` - Screen reader announcements
- `ScreenReaderOnly` - Screen reader-only text
- `AccessibleHeading` - Proper heading hierarchy

#### Hooks

- `useFocusTrap` - Focus management for modals
- `useKeyboardNavigation` - Arrow key navigation
- `useReducedMotion` - Respects user motion preferences

#### Usage

```tsx
import {
  SkipToMainContent,
  LiveRegion,
  useReducedMotion,
} from '../components/AccessibilityUtils'

function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <SkipToMainContent />
      <LiveRegion message='Page loaded successfully' />
      {/* Your content */}
    </>
  )
}
```

### PerformanceMonitor

**Location**: `components/PerformanceMonitor.tsx`

Core Web Vitals and performance monitoring component.

#### Features

- Core Web Vitals tracking (CLS, FID, FCP, LCP, TTFB)
- Resource timing monitoring
- Memory usage tracking
- Performance Observer API integration
- Automatic reporting to analytics

## Skill Components

Located in `components/ElemSkill/`, these components render individual technology skill icons and information:

- `SkillReact.tsx` - React.js skill
- `SkillNext.tsx` - Next.js skill
- `SkillJavascript.tsx` - JavaScript skill
- `SkillTailwind.tsx` - Tailwind CSS skill
- `SkillHtml.tsx` - HTML skill
- `SkillCss.tsx` - CSS skill
- `SkillPython.tsx` - Python skill
- `SkillJava.tsx` - Java skill
- `SkillMysql.tsx` - MySQL skill
- `SkillPostgres.tsx` - PostgreSQL skill
- `SkillGit.tsx` - Git skill
- `SkillVSCode.tsx` - VS Code skill

Each skill component follows the same pattern:

```tsx
interface SkillProps {
  className?: string
}

export default function SkillReact({ className = '' }: SkillProps) {
  return (
    <div className={`skill-item ${className}`}>
      {/* Skill icon and content */}
    </div>
  )
}
```

## Card Components

Located in `components/CardExperience/`:

### CardExperienceLabti

**Location**: `components/CardExperience/CardExperienceLabti.tsx`

Experience card for Labti position.

### CardExperienceIntern

**Location**: `components/CardExperience/CardExperienceIntern.tsx`

Experience card for internship position.

Both components feature:

- Company information
- Role details
- Technology stack
- Achievements
- Timeline information

## Testing

All components include comprehensive test coverage located in `components/__tests__/`:

### Test Files

- `Header.test.tsx` - Header component tests
- `ErrorBoundary.test.tsx` - Error boundary tests
- `LoadingSpinner.test.tsx` - Loading spinner tests
- `Skills.test.tsx` - Skills component tests
- `OptimizedImage.test.tsx` - Image optimization tests
- `ErrorTracking.test.tsx` - Error tracking tests

### Testing Patterns

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Component from '../Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    const mockHandler = jest.fn()
    render(<Component onClick={mockHandler} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
```

### Test Coverage

- Unit tests for all components
- Integration tests for complex interactions
- Accessibility tests with jest-axe
- Performance tests for optimized components
- Error boundary tests for error scenarios

## Best Practices

### Performance

1. **Memoization**: Use React.memo, useMemo, and useCallback appropriately
2. **Code Splitting**: Lazy load components when possible
3. **Image Optimization**: Use OptimizedImage for all images
4. **Bundle Analysis**: Regular bundle size monitoring

### Accessibility

1. **ARIA Labels**: Proper labeling for screen readers
2. **Keyboard Navigation**: Full keyboard accessibility
3. **Color Contrast**: WCAG compliant color schemes
4. **Focus Management**: Proper focus handling

### Error Handling

1. **Error Boundaries**: Wrap components in error boundaries
2. **Error Tracking**: Use ErrorTracking for monitoring
3. **Graceful Degradation**: Fallback UI for failures
4. **User Feedback**: Clear error messages

### Code Quality

1. **TypeScript**: Strong typing for all components
2. **ESLint**: Consistent code formatting
3. **Testing**: Comprehensive test coverage
4. **Documentation**: Clear component documentation

## Contributing

When creating new components:

1. Follow the established patterns and conventions
2. Include comprehensive TypeScript types
3. Add proper accessibility support
4. Write comprehensive tests
5. Document props and usage examples
6. Consider performance implications
7. Handle error states gracefully
