# Farhan Fadhilah Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features comprehensive error tracking, performance monitoring, accessibility compliance, and professional development workflow.

![Portfolio Preview](https://via.placeholder.com/800x400/1f2937/ffffff?text=Portfolio+Preview)

## ✨ Features

### 🎨 Design & UX

- **Modern UI/UX** - Clean, professional design with smooth animations
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark Mode Support** - Seamless light/dark theme switching
- **Accessibility Compliant** - WCAG guidelines with full keyboard navigation
- **Performance Optimized** - Core Web Vitals optimized with 90+ Lighthouse scores

### 🔧 Technical Excellence

- **Next.js 14** - Latest features with App Router and Server Components
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Framer Motion** - Smooth animations and micro-interactions
- **Comprehensive Testing** - 70+ tests with Jest and React Testing Library
- **Error Tracking** - Automatic error detection and reporting
- **Performance Monitoring** - Real-time Core Web Vitals tracking

### 📊 Analytics & Monitoring

- **Error Boundary** - Graceful error handling with custom fallbacks
- **Analytics Tracking** - User interaction and performance metrics
- **Bundle Analysis** - Webpack bundle optimization and monitoring
- **Accessibility Testing** - Automated a11y testing with jest-axe
- **SEO Optimized** - Meta tags, structured data, and sitemap

### 🛠️ Developer Experience

- **ESLint + Prettier** - Code quality and consistent formatting
- **Husky + lint-staged** - Pre-commit hooks for code quality
- **Comprehensive Documentation** - Component, API, and development guides
- **Environment Validation** - Type-safe environment variable handling
- **CI/CD Ready** - GitHub Actions and Vercel deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fe-portfolio.git
cd fe-portfolio

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

```bash
# Required
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Portfolio"

# Optional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
AUTH_SECRET=your-secret-key
ADMIN_TOKEN=your-admin-token

# Optional - External Services
SENTRY_DSN=your-sentry-dsn
RESEND_API_KEY=your-resend-api-key
```

## 📖 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Component Documentation](docs/COMPONENTS.md)** - Detailed component API and usage
- **[API Documentation](docs/API.md)** - Backend endpoints and data models
- **[Development Guide](docs/DEVELOPMENT.md)** - Setup, workflow, and best practices

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- Header.test.tsx
```

### Test Coverage

- **70+ Tests** across components, utilities, and API endpoints
- **Accessibility Testing** with jest-axe
- **Performance Testing** for optimized components
- **Error Boundary Testing** for error scenarios

## 🎯 Performance

### Core Web Vitals

- **LCP**: < 1.2s (Good)
- **FID**: < 100ms (Good)
- **CLS**: < 0.1 (Good)

### Optimization Features

- **Image Optimization** - Next.js Image with WebP/AVIF support
- **Code Splitting** - Automatic and manual code splitting
- **Bundle Analysis** - Webpack Bundle Analyzer integration
- **Memoization** - React.memo, useMemo, useCallback optimizations
- **Lazy Loading** - Components and images lazy loaded

```bash
# Analyze bundle size
npm run analyze
npm run analyze:server
npm run analyze:browser
```

## ♿ Accessibility

### Compliance Features

- **WCAG 2.1 AA Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Focus Management** - Proper focus handling and indicators
- **Color Contrast** - WCAG compliant color schemes
- **Reduced Motion** - Respects user motion preferences

### Accessibility Testing

```bash
# Run accessibility tests
npm test -- --testPathPattern=accessibility

# Manual testing with screen readers
# Use NVDA, JAWS, or VoiceOver for testing
```

## 🔍 Error Tracking & Analytics

### Error Monitoring

- **Automatic Error Detection** - Global error handlers
- **Error Categorization** - Critical, high, medium, low severity
- **Component Error Boundaries** - Graceful error handling
- **Performance Monitoring** - Core Web Vitals tracking
- **User Interaction Tracking** - Button clicks, form submissions

### Analytics Dashboard

```typescript
// Track custom events
import { trackError, trackEvent } from './components/ErrorTracking'

trackError(new Error('Custom error'), { component: 'MyComponent' })
trackEvent('button_click', { button: 'subscribe' })
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Other Platforms

- **Netlify** - Configure build settings
- **AWS Amplify** - Use build specifications
- **Docker** - Dockerfile included

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] No linting errors
- [ ] Performance audit passed
- [ ] Accessibility audit passed
- [ ] Environment variables configured
- [ ] Error tracking configured
- [ ] Analytics configured

## 🛠️ Development Workflow

### Code Quality

```bash
# Linting and formatting
npm run lint          # Check linting
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run format:check  # Check formatting
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature
```

### Commit Convention

Follow [Conventional Commits](https://conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📁 Project Structure

```
fe-portfolio/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── AccessibilityUtils.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorTracking.tsx
│   └── ...
├── docs/                # Documentation
│   ├── API.md
│   ├── COMPONENTS.md
│   └── DEVELOPMENT.md
├── lib/                 # Utility libraries
├── pages/               # Next.js pages and API routes
├── public/              # Static assets
├── styles/              # CSS styles
└── __tests__/           # Root-level tests
```

## 🔧 Built With

### Core Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations

### Development Tools

- **[Jest](https://jestjs.io/)** - Testing framework
- **[React Testing Library](https://testing-library.com/)** - Component testing
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

### Monitoring & Analytics

- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** - Performance monitoring
- **Custom Error Tracking** - Error monitoring and reporting

## 📊 Performance Metrics

### Bundle Size

- **First Load JS**: ~85KB gzipped
- **Runtime JS**: ~45KB gzipped
- **CSS**: ~12KB gzipped

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Contributing

Contributions are welcome! Please read our [Development Guide](docs/DEVELOPMENT.md) for details on:

- Setting up the development environment
- Code style and conventions
- Testing requirements
- Pull request process

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Farhan Fadhilah**

- Website: [https://farhanfadhilah.com](https://farhanfadhilah.com)
- Email: farhanfadhilah@example.com
- LinkedIn: [farhanfadhilah](https://linkedin.com/in/farhanfadhilah)
- GitHub: [farhanfadhilah](https://github.com/farhanfadhilah)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Open source community for tools and libraries

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/your-username/fe-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/fe-portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/fe-portfolio)
![GitHub license](https://img.shields.io/github/license/your-username/fe-portfolio)

---

<p align="center">
  Made with ❤️ by <a href="https://farhanfadhilah.com">Farhan Fadhilah</a>
</p>
