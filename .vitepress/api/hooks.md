# Hooks

React hooks for experiments, analytics, and internationalization.

## 🎯 Available Hooks

### `useExperiment`

Hook for A/B testing and experiment variant assignment.

```typescript
import { useExperiment } from '@/experiments/hooks/useExperiment'

function MyComponent() {
  const { variant, isLoading, error } = useExperiment('experiment-name')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {variant === 'control' && <ControlComponent />}
      {variant === 'variant-a' && <VariantAComponent />}
    </div>
  )
}
```

**Parameters:**

- `experimentName` (string) - Name of the experiment
- `options` (object, optional) - Configuration options

**Returns:**

- `variant` (string) - Current experiment variant
- `isLoading` (boolean) - Loading state
- `error` (Error | null) - Error state

### `usePostHog`

Hook for PostHog analytics integration.

```typescript
import { usePostHog } from '@/experiments/hooks/usePostHog'

function AnalyticsComponent() {
  const posthog = usePostHog()

  const handleClick = () => {
    posthog?.capture('button_clicked', {
      button_name: 'signup',
      page: '/signup'
    })
  }

  return <button onClick={handleClick}>Track Click</button>
}
```

**Returns:**

- `posthog` (PostHog | null) - PostHog instance or null if not initialized

### `useLocale`

Hook for internationalization support.

```typescript
import { useLocale } from '@/experiments/hooks/useLocale'

function LocalizedComponent() {
  const { locale, setLocale } = useLocale()

  return (
    <div>
      <p>Current locale: {locale}</p>
      <button onClick={() => setLocale('ar')}>العربية</button>
      <button onClick={() => setLocale('en')}>English</button>
    </div>
  )
}
```

**Returns:**

- `locale` (string) - Current locale
- `setLocale` (function) - Function to change locale

## 🔧 Advanced Usage

### Custom Experiment Configuration

```typescript
const { variant } = useExperiment('custom-experiment', {
  debug: process.env.NODE_ENV === 'development',
  fallback: 'control',
  timeout: 5000,
});
```

### Error Handling

```typescript
const { variant, isLoading, error } = useExperiment('experiment-name')

if (error) {
  console.error('Experiment error:', error)
  // Handle error gracefully
  return <DefaultComponent />
}
```

### Loading States

```typescript
const { variant, isLoading } = useExperiment('experiment-name')

if (isLoading) {
  return <LoadingSpinner />
}

// Render experiment content
return <ExperimentContent variant={variant} />
```

## 📚 Next Steps

- [Components](/api/components) - Component API reference
- [Utilities](/api/utilities) - Utility functions
- [Experiments System](/experiments/) - Learn about experiments

Ready to use hooks? Check out our [Experiments Guide](/experiments/)!
