/**
 * Environment variable validation and type safety
 * This module ensures all required environment variables are present and valid
 */

// Define the shape of our environment variables
interface EnvironmentVariables {
  // Next.js built-in variables
  NODE_ENV: 'development' | 'production' | 'test'

  // Public environment variables (can be accessed on client-side)
  NEXT_PUBLIC_VERCEL_URL?: string
  NEXT_PUBLIC_SITE_URL?: string

  // Analytics & monitoring
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID?: string
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string

  // External services (if added in future)
  NEXT_PUBLIC_API_BASE_URL?: string

  // Email service (if implemented)
  EMAIL_SERVICE_API_KEY?: string
  EMAIL_FROM_ADDRESS?: string

  // Database (if added)
  DATABASE_URL?: string

  // Security
  NEXTAUTH_SECRET?: string
  NEXTAUTH_URL?: string
}

// Required environment variables that must be present
const requiredEnvVars = ['NODE_ENV'] as const

// Optional environment variables with defaults
const optionalEnvVars = {
  NEXT_PUBLIC_SITE_URL: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',
} as const

/**
 * Validates that all required environment variables are present
 * @throws Error if any required variables are missing
 */
function validateRequiredEnvVars(): void {
  const missingVars: string[] = []

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar)
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env.local file or deployment configuration.'
    )
  }
}

/**
 * Validates environment variable format/content
 * @throws Error if any variables have invalid format
 */
function validateEnvVarFormats(): void {
  const errors: string[] = []

  // Validate NODE_ENV
  const validNodeEnvs = ['development', 'production', 'test']
  if (process.env.NODE_ENV && !validNodeEnvs.includes(process.env.NODE_ENV)) {
    errors.push(`NODE_ENV must be one of: ${validNodeEnvs.join(', ')}`)
  }

  // Validate URLs if present
  const urlVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_API_BASE_URL',
    'NEXTAUTH_URL',
  ]
  for (const urlVar of urlVars) {
    const value = process.env[urlVar]
    if (value && !isValidUrl(value)) {
      errors.push(`${urlVar} must be a valid URL`)
    }
  }

  // Validate email format if present
  if (
    process.env.EMAIL_FROM_ADDRESS &&
    !isValidEmail(process.env.EMAIL_FROM_ADDRESS)
  ) {
    errors.push('EMAIL_FROM_ADDRESS must be a valid email address')
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid environment variable formats:\n${errors.join('\n')}`
    )
  }
}

/**
 * Helper function to validate URL format
 */
function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

/**
 * Helper function to validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Creates a typed environment object with all variables
 */
function createEnvObject(): EnvironmentVariables {
  return {
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || optionalEnvVars.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
}

/**
 * Main validation function - call this at app startup
 */
export function validateEnvironment(): EnvironmentVariables {
  try {
    // Only run validation in development and test environments
    // In production, trust that the deployment process has validated
    if (process.env.NODE_ENV !== 'production') {
      validateRequiredEnvVars()
      validateEnvVarFormats()
    }

    return createEnvObject()
  } catch (error) {
    // Log the error for debugging
    // eslint-disable-next-line no-console
    console.error('Environment validation failed:', error)

    // In development, throw the error to help developers
    if (process.env.NODE_ENV === 'development') {
      throw error
    }

    // In production, return a minimal safe configuration
    // eslint-disable-next-line no-console
    console.warn('Using fallback environment configuration in production')
    return createEnvObject()
  }
}

/**
 * Get a specific environment variable with type safety
 */
export function getEnvVar<K extends keyof EnvironmentVariables>(
  key: K
): EnvironmentVariables[K] {
  const env = validateEnvironment()
  return env[key]
}

/**
 * Check if we're in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * Check if we're in production mode
 */
export const isProduction = process.env.NODE_ENV === 'production'

/**
 * Check if we're in test mode
 */
export const isTest = process.env.NODE_ENV === 'test'

/**
 * Get the base URL for the application
 */
export function getBaseUrl(): string {
  // Vercel deployment
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Custom domain
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  // Local development
  return 'http://localhost:3000'
}

// Validate environment on module load (only in development)
if (isDevelopment) {
  validateEnvironment()
}

// Export the validated environment object
export const env = validateEnvironment()

export default env
