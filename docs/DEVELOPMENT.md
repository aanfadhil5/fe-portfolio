# Development Guide

This guide provides comprehensive information for developers working on the fe-portfolio project.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- VS Code (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/fe-portfolio.git
   cd fe-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Required
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Farhan Fadhilah Portfolio"

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
AUTH_SECRET=your-secret-key
ADMIN_TOKEN=your-admin-token

# External Services (optional)
SENTRY_DSN=your-sentry-dsn
RESEND_API_KEY=your-resend-api-key

# Development
NODE_ENV=development
DEBUG_ANALYTICS=true
```

## Project Structure

```
fe-portfolio/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── CardExperience/  # Experience card components
│   ├── ElemSkill/       # Skill element components
│   ├── AccessibilityUtils.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorTracking.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LoadingSpinner.tsx
│   ├── OptimizedImage.tsx
│   ├── PerformanceMonitor.tsx
│   └── ...
├── docs/                # Documentation
│   ├── API.md
│   ├── COMPONENTS.md
│   └── DEVELOPMENT.md
├── lib/                 # Utility libraries
│   ├── __tests__/       # Library tests
│   └── env.ts           # Environment validation
├── pages/               # Next.js pages
│   ├── api/             # API routes
│   │   ├── analytics/
│   │   └── analytics.ts
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # Document structure
│   └── index.tsx        # Homepage
├── public/              # Static assets
│   ├── images/
│   ├── icons/
│   └── cv/
├── styles/              # CSS styles
│   └── globals.css
├── __tests__/           # Root-level tests
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── jest.config.js       # Jest configuration
├── jest.setup.js        # Jest setup
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Development Workflow

### 1. Code Style and Formatting

The project uses ESLint and Prettier for code quality and formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### 2. Pre-commit Hooks

Husky and lint-staged ensure code quality before commits:

```bash
# Hooks run automatically on commit
git add .
git commit -m "Your commit message"

# Manual pre-commit check
npm run prepare
```

### 3. Git Workflow

1. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### 4. Commit Message Convention

Follow conventional commits format:

```
type(scope): description

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance tasks

# Examples:
feat(components): add OptimizedImage component
fix(analytics): resolve tracking data sanitization
docs(api): update endpoint documentation
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Header.test.tsx

# Run tests matching pattern
npm test -- --testPathPattern=components
```

### Test Structure

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Component from '../Component'

expect.extend(toHaveNoViolations)

describe('Component', () => {
  const defaultProps = {
    // ... default props
  }

  beforeEach(() => {
    // Setup before each test
  })

  afterEach(() => {
    // Cleanup after each test
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Component {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('handles click events', () => {
      const mockHandler = jest.fn()
      render(<Component {...defaultProps} onClick={mockHandler} />)

      fireEvent.click(screen.getByRole('button'))
      expect(mockHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Component {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**

   - Test what users see and do
   - Avoid testing internal state or methods

2. **Use Semantic Queries**

   ```typescript
   // Good
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText(/email address/i)

   // Avoid
   screen.getByTestId('submit-button')
   ```

3. **Mock External Dependencies**

   ```typescript
   // Mock API calls
   jest.mock('../lib/api', () => ({
     fetchData: jest.fn()
   }))

   // Mock Next.js components
   jest.mock('next/image', () => ({
     __esModule: true,
     default: (props: any) => <img {...props} />
   }))
   ```

4. **Test Error States**
   ```typescript
   it('displays error message on failure', async () => {
     mockFetch.mockRejectedValueOnce(new Error('API Error'))

     render(<Component />)

     await waitFor(() => {
       expect(screen.getByText(/error occurred/i)).toBeInTheDocument()
     })
   })
   ```

## Performance

### Performance Monitoring

1. **Bundle Analysis**

   ```bash
   npm run analyze
   npm run analyze:server
   npm run analyze:browser
   ```

2. **Core Web Vitals**

   - Monitored automatically with PerformanceMonitor component
   - View metrics in browser DevTools or analytics dashboard

3. **Performance Optimization Checklist**
   - [ ] Use React.memo for expensive components
   - [ ] Implement useMemo for expensive calculations
   - [ ] Use useCallback for event handlers
   - [ ] Optimize images with OptimizedImage component
   - [ ] Lazy load components when possible
   - [ ] Minimize bundle size

### Code Splitting

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Disable SSR if not needed
})
```

### Image Optimization

```typescript
// Use OptimizedImage for all images
import OptimizedImage from './OptimizedImage'

function Gallery() {
  return (
    <OptimizedImage
      src="/images/photo.jpg"
      alt="Description"
      width={800}
      height={600}
      priority={true} // For above-the-fold images
      placeholder="blur"
    />
  )
}
```

## Deployment

### Build Process

```bash
# Create production build
npm run build

# Start production server locally
npm start

# Export static files (if needed)
npm run export
```

### Environment Setup

1. **Production Environment Variables**

   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   AUTH_SECRET=secure-secret-key
   ADMIN_TOKEN=secure-admin-token
   ```

2. **Vercel Deployment**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel

   # Deploy to production
   vercel --prod
   ```

3. **Other Platforms**
   - **Netlify**: Configure build command and publish directory
   - **AWS Amplify**: Set up build specifications
   - **Docker**: Use provided Dockerfile

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] No linting errors
- [ ] Performance audit passed
- [ ] Accessibility audit passed
- [ ] Environment variables configured
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] SEO metadata updated

## Contributing

### Development Setup

1. **Fork the repository**
2. **Create feature branch**
3. **Make changes**
4. **Add tests**
5. **Update documentation**
6. **Submit pull request**

### Code Review Process

1. **Automated Checks**

   - Tests must pass
   - Linting must pass
   - Build must succeed

2. **Manual Review**
   - Code quality and readability
   - Performance implications
   - Accessibility compliance
   - Security considerations

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility tested

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings introduced
```

## Troubleshooting

### Common Issues

1. **Build Errors**

   ```bash
   # Clear Next.js cache
   rm -rf .next

   # Clear node_modules
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Test Failures**

   ```bash
   # Update snapshots
   npm test -- --updateSnapshot

   # Run tests in debug mode
   npm test -- --verbose
   ```

3. **Performance Issues**

   ```bash
   # Analyze bundle
   npm run analyze

   # Check for memory leaks
   npm run test:coverage
   ```

### Debugging

1. **VS Code Configuration**

   ```json
   // .vscode/launch.json
   {
     "type": "node",
     "request": "launch",
     "name": "Debug Next.js",
     "program": "${workspaceFolder}/node_modules/.bin/next",
     "args": ["dev"],
     "console": "integratedTerminal"
   }
   ```

2. **Browser DevTools**
   - Use React Developer Tools
   - Monitor Network tab for API calls
   - Check Console for errors
   - Use Lighthouse for performance audits

## Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Tools

- [VS Code Extensions](#recommended-extensions)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)

### Recommended Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## Support

For development support:

- Check existing [GitHub Issues](https://github.com/your-username/fe-portfolio/issues)
- Create new issue with detailed description
- Join discussions in GitHub Discussions
- Contact maintainers via email
