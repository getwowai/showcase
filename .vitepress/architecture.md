# Architecture

The Wow AI Showcase is built with a modern, scalable architecture that supports A/B testing, analytics, and internationalization. This document provides a comprehensive overview of the system architecture.

## 🏗️ High-Level Architecture

```mermaid
graph TB
    A[User] --> B[Next.js App Router]
    B --> C[Middleware]
    C --> D[Locale Detection]
    D --> E[Route Handler]
    E --> F[Page Component]
    F --> G[PostHog Analytics]
    F --> H[Experiment System]
    H --> I[Variant Assignment]
    I --> J[Component Rendering]
    J --> K[User Interface]
    
    G --> L[PostHog Dashboard]
    H --> M[Experiment Config]
    I --> N[Analytics Events]
    N --> L
```

## 📁 Project Structure

```
wowshowcase/
├── .vitepress/                 # VitePress documentation
├── docs/                      # Legacy documentation
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── (landing-variants)/  # Landing page variants
│   │   │   │   ├── signup-minimal/
│   │   │   │   ├── signup-social-proof/
│   │   │   │   └── signup-router/
│   │   │   ├── brand/         # Brand assets
│   │   │   └── onboarding/    # User onboarding
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── PostHogProvider.tsx
│   ├── experiments/           # Experiment system
│   │   ├── config.ts         # Experiment definitions
│   │   ├── hooks/            # Experiment hooks
│   │   └── tracking.ts       # Analytics tracking
│   ├── i18n/                 # Internationalization
│   │   └── config.ts         # i18n configuration
│   └── lib/                  # Utilities and configurations
│       └── posthog.ts        # PostHog configuration
├── messages/                 # Translation files
│   ├── en.json              # English translations
│   └── ar.json              # Arabic translations
└── package.json
```

## 🚀 Technology Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### Analytics & Tracking
- **PostHog** - Analytics and experiment tracking
- **Custom Events** - Business-specific metrics
- **Real-time Dashboards** - Live monitoring

### Internationalization
- **next-intl** - Internationalization framework
- **RTL Support** - Right-to-left language support
- **Locale Detection** - Automatic language detection

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality
- **VitePress** - Documentation framework

## 🎯 Core Systems

### 1. Next.js App Router

The application uses Next.js 14's App Router for:

- **File-based Routing** - Automatic route generation
- **Server Components** - Server-side rendering
- **Client Components** - Interactive UI elements
- **Middleware** - Request processing and locale detection

```typescript
// src/app/[locale]/layout.tsx
export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  const messages = await getMessages({ locale })
  
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <PostHogProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
```

### 2. Experiment System

The experiment system provides:

- **Route-based Experiments** - Different pages for different variants
- **Component-based Experiments** - A/B testing within components
- **Variant Assignment** - Automatic user assignment
- **Analytics Integration** - Automatic tracking

```typescript
// src/experiments/config.ts
export interface Experiment {
  variants: string[]
  defaultVariant: string
  trafficAllocation: number
  startDate?: Date
  endDate?: Date
}

export const experiments: Record<string, Experiment> = {
  'signup-variant': {
    variants: ['minimal', 'social-proof', 'router'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1,
  }
}
```

### 3. Analytics System

PostHog integration provides:

- **Event Tracking** - User interactions and conversions
- **Experiment Analytics** - A/B test results
- **Real-time Monitoring** - Live performance data
- **Custom Dashboards** - Business-specific metrics

```typescript
// src/lib/posthog.ts
import { PostHog } from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
    posthog.init()
  }
}
```

### 4. Internationalization System

The i18n system supports:

- **Multi-language Support** - English and Arabic
- **RTL Support** - Right-to-left language rendering
- **Locale Detection** - Automatic language detection
- **Translation Management** - Centralized translation files

```typescript
// src/i18n/config.ts
export const locales = ['en', 'ar'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية'
}
```

## 🔄 Data Flow

### 1. User Request Flow

```mermaid
sequenceDiagram
    participant U as User
    participant M as Middleware
    participant R as Route Handler
    participant P as Page Component
    participant E as Experiment System
    participant A as Analytics

    U->>M: Request to /en/signup-minimal
    M->>M: Detect locale (en)
    M->>R: Route to signup-minimal
    R->>P: Render page component
    P->>E: Get experiment variant
    E->>P: Return variant (minimal)
    P->>A: Track page view
    P->>U: Return rendered page
    U->>P: User interaction
    P->>A: Track interaction event
```

### 2. Experiment Assignment Flow

```mermaid
sequenceDiagram
    participant U as User
    participant E as Experiment System
    participant A as Analytics
    participant C as Component

    U->>E: Page load
    E->>E: Check experiment config
    E->>E: Assign variant based on traffic allocation
    E->>A: Track experiment assignment
    E->>C: Return variant
    C->>U: Render variant-specific content
```

### 3. Analytics Event Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant A as Analytics
    participant P as PostHog

    U->>C: User interaction
    C->>A: Track event
    A->>A: Validate event data
    A->>P: Send event to PostHog
    P->>P: Process and store event
    P->>A: Return success
    A->>C: Event tracked
```

## 🎨 Component Architecture

### 1. Component Hierarchy

```
App
├── RootLayout
│   ├── PostHogProvider
│   └── NextIntlClientProvider
│       └── LocaleLayout
│           ├── Header
│           ├── Main
│           │   └── PageComponent
│           │       ├── Hero
│           │       ├── Features
│           │       ├── SignupForm
│           │       └── Footer
│           └── LanguageSwitcher
```

### 2. Component Types

- **Layout Components** - Page structure and navigation
- **UI Components** - Reusable interface elements
- **Page Components** - Route-specific content
- **Provider Components** - Context and state management

### 3. Component Communication

- **Props** - Parent to child communication
- **Context** - Global state management
- **Hooks** - Stateful logic and side effects
- **Events** - User interaction handling

## 🔧 Configuration Management

### 1. Environment Variables

```env
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Experiment Configuration
NEXT_PUBLIC_EXPERIMENT_TRAFFIC_ALLOCATION=0.1
NEXT_PUBLIC_EXPERIMENT_DEFAULT_VARIANT=minimal

# Optional: Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 2. Experiment Configuration

```typescript
// src/experiments/config.ts
export const experiments: Record<string, Experiment> = {
  'signup-variant': {
    variants: ['minimal', 'social-proof', 'router'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
  }
}
```

### 3. Translation Configuration

```typescript
// src/i18n/config.ts
export const locales = ['en', 'ar'] as const
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية'
}
```

## 🚀 Performance Optimization

### 1. Static Generation

- **Pre-rendered Pages** - Static HTML generation
- **Incremental Static Regeneration** - On-demand updates
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic code splitting

### 2. Caching Strategy

- **Browser Caching** - Static asset caching
- **CDN Caching** - Global content delivery
- **API Caching** - Response caching
- **Component Caching** - React component memoization

### 3. Bundle Optimization

- **Tree Shaking** - Remove unused code
- **Minification** - Code compression
- **Gzip Compression** - Response compression
- **Bundle Analysis** - Size monitoring

## 🔒 Security Architecture

### 1. Data Protection

- **HTTPS** - Encrypted data transmission
- **Secure Headers** - Security headers
- **Input Validation** - Form validation
- **XSS Protection** - Cross-site scripting prevention

### 2. Privacy Compliance

- **GDPR Compliance** - European data protection
- **CCPA Compliance** - California privacy rights
- **Data Retention** - Automatic data cleanup
- **User Consent** - Privacy consent management

## 📊 Monitoring & Observability

### 1. Application Monitoring

- **Error Tracking** - JavaScript error monitoring
- **Performance Monitoring** - Core Web Vitals
- **User Analytics** - Behavior tracking
- **Business Metrics** - Conversion tracking

### 2. Infrastructure Monitoring

- **Server Health** - System resource monitoring
- **Database Performance** - Query performance
- **CDN Performance** - Content delivery monitoring
- **Uptime Monitoring** - Service availability

## 🚀 Deployment Architecture

### 1. Build Process

```mermaid
graph LR
    A[Source Code] --> B[TypeScript Compilation]
    B --> C[Next.js Build]
    C --> D[Static Generation]
    D --> E[Asset Optimization]
    E --> F[Production Bundle]
```

### 2. Deployment Pipeline

```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C[Run Tests]
    C --> D[Build Application]
    D --> E[Deploy to Production]
    E --> F[Health Check]
```

## 📚 Documentation Architecture

### 1. VitePress Documentation

- **Getting Started** - Setup and configuration
- **API Reference** - Component and utility documentation
- **Guides** - Step-by-step tutorials
- **Examples** - Working code samples

### 2. Code Documentation

- **TypeScript Types** - Type definitions
- **JSDoc Comments** - Function documentation
- **README Files** - Project documentation
- **Inline Comments** - Code explanations

---

**Ready to dive deeper?** Check out our [Getting Started Guide](/getting-started) or explore the [Experiments System](/experiments/)!
