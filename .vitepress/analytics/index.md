# Analytics Overview

The Wow AI Showcase includes comprehensive analytics powered by PostHog, providing real-time insights into user behavior, experiment performance, and conversion metrics.

## 🎯 Analytics Features

### Real-time Tracking
- **Page Views** - Automatic tracking of all page visits
- **User Interactions** - Clicks, form submissions, scrolls
- **Conversion Events** - Signup completions, button clicks
- **Session Data** - User journey across variants

### Experiment Analytics
- **A/B Test Results** - Variant performance comparison
- **Conversion Funnels** - User flow analysis
- **Cohort Analysis** - User behavior over time
- **Statistical Significance** - Confidence intervals and p-values

### Custom Dashboards
- **Experiment Performance** - Real-time experiment monitoring
- **User Behavior** - Page view patterns and user journeys
- **Technical Metrics** - Page load times, error rates
- **Business Metrics** - Conversion rates, revenue tracking

## 🏗️ Architecture

### PostHog Integration

```typescript
// src/lib/posthog.ts
import { PostHog } from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      debug: process.env.NODE_ENV === 'development',
    })
    posthog.init()
  }
}
```

### Event Tracking

```typescript
// src/experiments/tracking.ts
import { getPostHog } from '@/lib/posthog'

export const trackEvent = (event: string, properties: any) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture(event, properties)
  }
}
```

## 📊 Available Metrics

### User Behavior Metrics

- **Page Views** - Total and unique page views
- **Session Duration** - Time spent on site
- **Bounce Rate** - Users who leave immediately
- **Scroll Depth** - How far users scroll
- **Click-through Rate** - Button and link clicks

### Conversion Metrics

- **Signup Rate** - Percentage of visitors who sign up
- **Form Completion Rate** - Form submission success
- **Button Click Rate** - Call-to-action engagement
- **Feature Adoption** - New feature usage

### Experiment Metrics

- **Variant Performance** - A/B test results
- **Statistical Significance** - Confidence in results
- **Sample Size** - Number of users in each variant
- **Conversion Lift** - Improvement over baseline

## 🚀 Setup Guide

### 1. PostHog Account Setup

1. **Create Account**
   - Go to [PostHog](https://posthog.com)
   - Sign up for a free account
   - Create a new project

2. **Get Project Key**
   - In your PostHog dashboard, go to Project Settings
   - Copy your Project API Key
   - Add it to your `.env.local` file

### 2. Environment Configuration

```env
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional: Custom configuration
NEXT_PUBLIC_POSTHOG_DEBUG=true
NEXT_PUBLIC_POSTHOG_DISABLE_PERSONAL_PROPERTIES=false
```

### 3. Initialize PostHog

```typescript
// src/components/PostHogProvider.tsx
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { initPostHog, getPostHog } from '@/lib/posthog'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog()
  }, [])

  const posthog = getPostHog()
  
  if (!posthog) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
```

## 📈 Event Tracking

### Automatic Events

The app automatically tracks:

```typescript
// Page views
posthog.capture('$pageview', {
  $current_url: window.location.href,
  variant: 'minimal',
  locale: 'en'
})

// User sessions
posthog.capture('$session_start', {
  session_id: generateSessionId(),
  timestamp: new Date().toISOString()
})
```

### Custom Events

Track specific user actions:

```typescript
// Button clicks
export const trackButtonClick = (buttonName: string, variant: string) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('button_clicked', {
      button_name: buttonName,
      variant,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    })
  }
}

// Form submissions
export const trackFormSubmit = (formName: string, success: boolean) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('form_submitted', {
      form_name: formName,
      success,
      timestamp: new Date().toISOString()
    })
  }
}

// Signup completions
export const trackSignupComplete = (variant: string, method: string) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('signup_completed', {
      variant,
      method,
      timestamp: new Date().toISOString(),
      value: 0,
      currency: 'USD'
    })
  }
}
```

## 🎯 Experiment Analytics

### A/B Test Tracking

```typescript
// Track experiment assignment
export const trackExperimentAssignment = (experiment: string, variant: string) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('experiment_assigned', {
      experiment,
      variant,
      timestamp: new Date().toISOString()
    })
  }
}

// Track experiment conversion
export const trackExperimentConversion = (experiment: string, variant: string, event: string) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('experiment_conversion', {
      experiment,
      variant,
      event,
      timestamp: new Date().toISOString()
    })
  }
}
```

### Conversion Funnel Analysis

```typescript
// Track funnel steps
export const trackFunnelStep = (step: string, variant: string, userId: string) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('funnel_step', {
      step,
      variant,
      user_id: userId,
      timestamp: new Date().toISOString()
    })
  }
}
```

## 📊 Dashboard Configuration

### Experiment Performance Dashboard

Create a dashboard to monitor:

1. **Conversion Rates by Variant**
   - Signup completion rates
   - Button click rates
   - Form submission rates

2. **User Engagement Metrics**
   - Time spent on page
   - Scroll depth
   - Page views per session

3. **Technical Performance**
   - Page load times
   - Error rates
   - User device/browser data

### Custom Dashboard Setup

```typescript
// PostHog dashboard configuration
const dashboardConfig = {
  name: 'Experiment Performance',
  widgets: [
    {
      type: 'conversion_rate',
      title: 'Signup Conversion Rate',
      experiment: 'signup-variant',
      variants: ['minimal', 'social-proof', 'router']
    },
    {
      type: 'engagement_rate',
      title: 'User Engagement',
      experiment: 'signup-variant',
      metrics: ['time_on_page', 'scroll_depth', 'clicks']
    }
  ]
}
```

## 🔍 Debugging and Monitoring

### Debug Mode

Enable debug mode for development:

```typescript
// src/lib/posthog.ts
const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  debug: process.env.NODE_ENV === 'development',
  loaded: (posthog) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('PostHog loaded:', posthog)
    }
  }
})
```

### Event Validation

```typescript
// Validate events before sending
export const validateEvent = (event: string, properties: any) => {
  const requiredFields = ['timestamp', 'variant']
  const missingFields = requiredFields.filter(field => !properties[field])
  
  if (missingFields.length > 0) {
    console.warn('Missing required fields:', missingFields)
    return false
  }
  
  return true
}
```

### Error Tracking

```typescript
// Track JavaScript errors
window.addEventListener('error', (event) => {
  const posthog = getPostHog()
  if (posthog) {
    posthog.capture('javascript_error', {
      error_message: event.message,
      error_source: event.filename,
      error_line: event.lineno,
      error_column: event.colno,
      timestamp: new Date().toISOString()
    })
  }
})
```

## 📈 Performance Optimization

### Event Batching

```typescript
// Batch events for better performance
export const batchEvents = (events: any[]) => {
  const posthog = getPostHog()
  if (posthog) {
    events.forEach(event => {
      posthog.capture(event.name, event.properties)
    })
  }
}
```

### Lazy Loading

```typescript
// Lazy load PostHog for better performance
export const lazyLoadPostHog = async () => {
  if (typeof window !== 'undefined' && !window.posthog) {
    const { initPostHog } = await import('@/lib/posthog')
    initPostHog()
  }
}
```

## 🎯 Best Practices

### 1. Event Naming
- Use consistent naming conventions
- Include context in event names
- Avoid special characters and spaces

### 2. Property Structure
- Use consistent property names
- Include timestamps for all events
- Add relevant context (variant, page, user)

### 3. Privacy Compliance
- Respect user privacy preferences
- Implement data retention policies
- Provide opt-out mechanisms

### 4. Performance
- Batch events when possible
- Use lazy loading for non-critical events
- Monitor event volume and costs

## 📚 Next Steps

- [PostHog Setup](/analytics/posthog-setup) - Detailed PostHog configuration
- [Event Tracking](/analytics/event-tracking) - Comprehensive event tracking guide
- [Experiment Analysis](/analytics/experiment-analysis) - Analyzing A/B test results
- [Experiments System](/experiments/) - Learn about the experiment framework

Ready to set up analytics? Check out our [PostHog Setup Guide](/analytics/posthog-setup) or explore the [Experiments System](/experiments/)!
