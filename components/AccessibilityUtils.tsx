import React, { useEffect, useRef, useState } from 'react'

// Skip to main content component
export const SkipToMainContent: React.FC = () => {
  return (
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg transition-all duration-200'
      onClick={e => {
        e.preventDefault()
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      Skip to main content
    </a>
  )
}

// Accessible button component with proper ARIA attributes
interface AccessibleButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200'

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

// Focus trap hook for modals and menus
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const closeButton = container.querySelector(
          '[data-close-modal]'
        ) as HTMLElement
        closeButton?.click()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscapeKey)

    // Focus first element when trap becomes active
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isActive])

  return containerRef
}

// Live region for dynamic content announcements
interface LiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive'
  className?: string
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  politeness = 'polite',
  className = '',
}) => {
  return (
    <div
      aria-live={politeness}
      aria-atomic='true'
      className={`sr-only ${className}`}
    >
      {message}
    </div>
  )
}

// Screen reader only text component
interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
}

export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({
  children,
  className = '',
}) => {
  return <span className={`sr-only ${className}`}>{children}</span>
}

// Accessible heading component with proper hierarchy
interface AccessibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  id?: string
}

export const AccessibleHeading: React.FC<AccessibleHeadingProps> = ({
  level,
  children,
  className = '',
  id,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  )
}

// Keyboard navigation hook
export const useKeyboardNavigation = (
  items: string[],
  onSelect: (item: string) => void,
  isActive: boolean = true
) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % items.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + items.length) % items.length)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          onSelect(items[selectedIndex])
          break
        case 'Home':
          e.preventDefault()
          setSelectedIndex(0)
          break
        case 'End':
          e.preventDefault()
          setSelectedIndex(items.length - 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [items, onSelect, selectedIndex, isActive])

  return { selectedIndex, setSelectedIndex }
}

// Color contrast checker utility
export const checkColorContrast = (
  foreground: string,
  background: string
): number => {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)

  if (!fg || !bg) return 0

  const fgLuminance = getLuminance(fg.r, fg.g, fg.b)
  const bgLuminance = getLuminance(bg.r, bg.g, bg.b)

  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

// Reduced motion preference hook
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
