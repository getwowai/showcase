# Component-based Experiments

Learn how to run A/B tests within individual components for granular testing.

## 🎯 Overview

Component-based experiments allow you to test specific elements within a page without creating entirely new routes. This approach is perfect for testing small changes like button text, colors, or layout adjustments.

## 🏗️ Implementation

### Basic Component Testing

```typescript
import { useExperiment } from '@/experiments/hooks/useExperiment'

function CTAButton() {
  const { variant } = useExperiment('cta-button-test')

  return (
    <button className={variant === 'primary' ? 'bg-blue-500' : 'bg-green-500'}>
      {variant === 'primary' ? 'Get Started' : 'Start Free Trial'}
    </button>
  )
}
```

### Multiple Variants

```typescript
function HeroSection() {
  const { variant } = useExperiment('hero-messaging')

  const variants = {
    'control': {
      title: 'AI-Powered Business Solutions',
      subtitle: 'Transform your business with intelligent automation'
    },
    'benefit-focused': {
      title: 'Save 10 Hours Per Week',
      subtitle: 'Automate repetitive tasks with AI'
    },
    'social-proof': {
      title: 'Join 10,000+ Businesses',
      subtitle: 'Trusted by companies worldwide'
    }
  }

  const content = variants[variant] || variants['control']

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
    </div>
  )
}
```

## 🎨 Styling Variants

### CSS Classes

```typescript
function StyledComponent() {
  const { variant } = useExperiment('button-style')

  const styleVariants = {
    'control': 'bg-blue-500 hover:bg-blue-600',
    'rounded': 'bg-blue-500 hover:bg-blue-600 rounded-full',
    'outline': 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
  }

  return (
    <button className={`px-4 py-2 ${styleVariants[variant]}`}>
      Click Me
    </button>
  )
}
```

### Conditional Rendering

```typescript
function FeatureSection() {
  const { variant } = useExperiment('feature-layout')

  return (
    <div>
      {variant === 'grid' && <GridLayout />}
      {variant === 'list' && <ListLayout />}
      {variant === 'carousel' && <CarouselLayout />}
    </div>
  )
}
```

## 📊 Event Tracking

### Track Component Interactions

```typescript
import { trackEvent } from '@/experiments/tracking'

function InteractiveComponent() {
  const { variant } = useExperiment('interactive-test')

  const handleClick = () => {
    trackEvent('component_clicked', {
      component: 'interactive-test',
      variant,
      action: 'click'
    })
  }

  return (
    <button onClick={handleClick}>
      Interactive Element
    </button>
  )
}
```

### Track Form Interactions

```typescript
function FormComponent() {
  const { variant } = useExperiment('form-layout')

  const handleSubmit = (data: any) => {
    trackEvent('form_submitted', {
      form: 'contact-form',
      variant,
      success: true,
      fields: Object.keys(data).length
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content based on variant */}
    </form>
  )
}
```

## 🔧 Advanced Patterns

### Nested Experiments

```typescript
function ComplexComponent() {
  const headerVariant = useExperiment('header-style')
  const contentVariant = useExperiment('content-layout')

  return (
    <div>
      <Header variant={headerVariant} />
      <Content variant={contentVariant} />
    </div>
  )
}
```

### Conditional Experiments

```typescript
function ConditionalComponent() {
  const { variant } = useExperiment('conditional-test')
  const userType = useUserType() // Custom hook

  // Only show experiment for certain user types
  if (userType !== 'premium') {
    return <DefaultComponent />
  }

  return (
    <div>
      {variant === 'premium' && <PremiumComponent />}
      {variant === 'standard' && <StandardComponent />}
    </div>
  )
}
```

## 📈 Best Practices

### 1. Test One Variable at a Time

- Focus on testing one specific element per experiment
- Avoid testing multiple changes simultaneously
- Use clear, measurable hypotheses

### 2. Set Clear Success Metrics

- Define what success looks like before starting
- Set minimum sample sizes for statistical significance
- Monitor both primary and secondary metrics

### 3. Component Isolation

- Keep experiments isolated to specific components
- Avoid side effects on other parts of the page
- Use proper error boundaries

### 4. Performance Considerations

- Minimize re-renders during experiments
- Use React.memo for expensive components
- Lazy load experiment variants when possible

## 🎯 Use Cases

### Button Testing

- Text variations
- Color schemes
- Size adjustments
- Placement changes

### Form Optimization

- Field arrangements
- Input types
- Validation messages
- Submit button styling

### Content Testing

- Headlines and copy
- Image selection
- Layout arrangements
- Call-to-action placement

### Navigation Testing

- Menu structures
- Link placements
- Icon choices
- Mobile responsiveness

## 🔍 Debugging

### Debug Mode

```typescript
// Enable debug mode for development
const { variant, isLoading, error } = useExperiment('test-experiment', {
  debug: process.env.NODE_ENV === 'development',
});

if (process.env.NODE_ENV === 'development') {
  console.log('Experiment variant:', variant);
}
```

### Fallback Handling

```typescript
function RobustComponent() {
  const { variant, isLoading, error } = useExperiment('robust-test')

  if (isLoading) return <LoadingSpinner />
  if (error) return <DefaultComponent />

  return (
    <div>
      {variant === 'test' && <TestComponent />}
      {variant === 'control' && <ControlComponent />}
      {/* Fallback for unknown variants */}
      {!['test', 'control'].includes(variant) && <DefaultComponent />}
    </div>
  )
}
```

## 📚 Next Steps

- [Route-based Experiments](/experiments/route-based) - Learn about route-based testing
- [PostHog Integration](/experiments/posthog) - Analytics setup
- [Creating New Experiments](/experiments/creating) - How to add new experiments

Ready to start component testing? Check out our [Experiments Overview](/experiments/) or explore [Route-based Experiments](/experiments/route-based)!
