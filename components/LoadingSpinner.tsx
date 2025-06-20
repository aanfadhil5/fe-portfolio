import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner */}
      <div
        className={`
          ${sizeClasses[size]} 
          border-2 border-notion-border dark:border-dark-border
          border-t-notion-accent dark:border-t-dark-accent
          rounded-full animate-spin
        `}
        role='status'
        aria-label='Loading'
      />

      {/* Loading Text */}
      {text && (
        <p
          className={`
            mt-3 
            ${textSizeClasses[size]} 
            text-notion-text-secondary dark:text-dark-text-secondary
            font-medium
          `}
        >
          {text}
        </p>
      )}
    </div>
  )
}

// Full Page Loading Component
interface FullPageLoadingProps {
  text?: string
}

export const FullPageLoading: React.FC<FullPageLoadingProps> = ({
  text = 'Loading...',
}) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-notion-bg dark:bg-dark-bg'>
      <LoadingSpinner size='lg' text={text} />
    </div>
  )
}

// Section Loading Component
interface SectionLoadingProps {
  text?: string
  className?: string
}

export const SectionLoading: React.FC<SectionLoadingProps> = ({
  text = 'Loading...',
  className = '',
}) => {
  return (
    <div className={`py-16 flex items-center justify-center ${className}`}>
      <LoadingSpinner size='md' text={text} />
    </div>
  )
}

export default LoadingSpinner
