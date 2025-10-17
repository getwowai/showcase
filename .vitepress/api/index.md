# API Reference

This section provides comprehensive documentation for all components, hooks, utilities, and APIs available in the Wow AI Showcase.

## 🎯 Overview

The API is organized into several categories:

- **Hooks** - React hooks for experiments and analytics
- **Components** - Reusable UI components
- **Utilities** - Helper functions and utilities
- **Types** - TypeScript type definitions

## 📚 Available APIs

### Hooks
- [`useExperiment`](/api/hooks#useexperiment) - Experiment variant assignment
- [`usePostHog`](/api/hooks#useposthog) - PostHog analytics integration
- [`useLocale`](/api/hooks#uselocale) - Internationalization support

### Components
- [`PostHogProvider`](/api/components#posthogprovider) - Analytics provider
- [`LanguageSwitcher`](/api/components#languageswitcher) - Language selection
- [`ExperimentWrapper`](/api/components#experimentwrapper) - A/B testing wrapper

### Utilities
- [`trackEvent`](/api/utilities#trackevent) - Event tracking
- [`getVariant`](/api/utilities#getvariant) - Variant assignment
- [`formatCurrency`](/api/utilities#formatcurrency) - Currency formatting

## 🚀 Quick Start

### Using Hooks

```typescript
import { useExperiment } from '@/experiments/hooks/useExperiment'

function MyComponent() {
  const { variant, isLoading } = useExperiment('signup-variant')
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {variant === 'minimal' && <MinimalSignup />}
      {variant === 'social-proof' && <SocialProofSignup />}
      {variant === 'router' && <RouterSignup />}
    </div>
  )
}
```

### Using Components

```typescript
import { PostHogProvider } from '@/components/PostHogProvider'

function App() {
  return (
    <PostHogProvider>
      <MyApp />
    </PostHogProvider>
  )
}
```

### Using Utilities

```typescript
import { trackEvent } from '@/experiments/tracking'

function handleClick() {
  trackEvent('button_clicked', {
    button_name: 'signup',
    variant: 'minimal'
  })
}
```

## 📖 Documentation Structure

- [Hooks](/api/hooks) - React hooks documentation
- [Components](/api/components) - Component API reference
- [Utilities](/api/utilities) - Utility functions

## 🔧 TypeScript Support

All APIs are fully typed with TypeScript:

```typescript
// Type-safe experiment configuration
interface Experiment {
  variants: string[]
  defaultVariant: string
  trafficAllocation: number
  startDate?: Date
  endDate?: Date
}

// Type-safe event tracking
interface EventProperties {
  [key: string]: string | number | boolean | Date
}
```

## 📝 Examples

### Complete Example

```typescript
import { useExperiment } from '@/experiments/hooks/useExperiment'
import { trackEvent } from '@/experiments/tracking'

function SignupPage() {
  const { variant, isLoading } = useExperiment('signup-variant')
  
  const handleSignup = () => {
    trackEvent('signup_completed', {
      variant,
      method: 'email'
    })
  }
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleSignup}>
        Get Started
      </button>
    </div>
  )
}
```

## 🎯 Best Practices

### 1. Error Handling
Always handle loading and error states:

```typescript
const { variant, isLoading, error } = useExperiment('signup-variant')

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
```

### 2. Event Tracking
Include relevant context in events:

```typescript
trackEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  page: '/signup',
  timestamp: new Date().toISOString()
})
```

### 3. Type Safety
Use TypeScript for better development experience:

```typescript
interface SignupEvent {
  variant: 'minimal' | 'social-proof' | 'router'
  method: 'email' | 'google' | 'github'
  success: boolean
}

trackEvent('signup_completed', {
  variant: 'minimal',
  method: 'email',
  success: true
} as SignupEvent)
```

## 📚 Next Steps

- [Hooks Documentation](/api/hooks) - Detailed hook reference
- [Components Documentation](/api/components) - Component API
- [Utilities Documentation](/api/utilities) - Utility functions
- [Getting Started](/getting-started) - Setup guide

Ready to start using the APIs? Check out our [Getting Started Guide](/getting-started) or explore the [Hooks Documentation](/api/hooks)!
