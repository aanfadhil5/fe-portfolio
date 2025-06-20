import { getBaseUrl } from '../env'

describe('Environment Utils', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('getBaseUrl', () => {
    it('should return Vercel URL when available', () => {
      process.env.NEXT_PUBLIC_VERCEL_URL = 'myapp.vercel.app'
      delete process.env.NEXT_PUBLIC_SITE_URL

      expect(getBaseUrl()).toBe('https://myapp.vercel.app')
    })

    it('should return custom site URL when available', () => {
      delete process.env.NEXT_PUBLIC_VERCEL_URL
      process.env.NEXT_PUBLIC_SITE_URL = 'https://mycustomdomain.com'

      expect(getBaseUrl()).toBe('https://mycustomdomain.com')
    })

    it('should return localhost for local development', () => {
      delete process.env.NEXT_PUBLIC_VERCEL_URL
      delete process.env.NEXT_PUBLIC_SITE_URL

      expect(getBaseUrl()).toBe('http://localhost:3000')
    })
  })

  describe('Module exports', () => {
    it('should export required functions and constants', () => {
      const envModule = require('../env')

      expect(typeof envModule.validateEnvironment).toBe('function')
      expect(typeof envModule.getEnvVar).toBe('function')
      expect(typeof envModule.getBaseUrl).toBe('function')
      expect(typeof envModule.isDevelopment).toBe('boolean')
      expect(typeof envModule.isProduction).toBe('boolean')
      expect(typeof envModule.isTest).toBe('boolean')
    })
  })
})
