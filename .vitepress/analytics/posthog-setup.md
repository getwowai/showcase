# PostHog Setup

This guide will help you set up PostHog analytics for the Wow AI Showcase project.

## 🎯 Overview

PostHog is a comprehensive analytics platform that provides:

- **Event Tracking** - User interactions and conversions
- **A/B Testing** - Experiment management and analysis
- **User Analytics** - Behavior tracking and insights
- **Real-time Dashboards** - Live performance monitoring

## 🚀 Quick Setup

### 1. Create PostHog Account

1. Go to [PostHog](https://posthog.com)
2. Sign up for a free account
3. Create a new project
4. Choose your project name (e.g., "Wow AI Showcase")

### 2. Get Your Project Key

1. In your PostHog dashboard, go to **Project Settings**
2. Copy your **Project API Key**
3. Add it to your `.env.local` file:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Initialize PostHog

The app automatically initializes PostHog when it starts. No additional setup required!

## 🔧 Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional
NEXT_PUBLIC_POSTHOG_DEBUG=true
NEXT_PUBLIC_POSTHOG_DISABLE_PERSONAL_PROPERTIES=false
```

### PostHog Configuration

```typescript
// src/lib/posthog.ts
import { PostHog } from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      debug: process.env.NODE_ENV === 'development',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded:', posthog)
        }
      }
    })
    posthog.init()
  }
}
```

## 📊 Event Tracking

### Automatic Events

The app automatically tracks:

- **Page Views** - All page visits
- **User Sessions** - Session start/end
- **Experiment Assignments** - A/B test variants
- **Errors** - JavaScript errors

### Custom Events

Track specific user actions:

```typescript
import { trackEvent } from '@/experiments/tracking'

// Track button clicks
trackEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  page: '/signup'
})

// Track form submissions
trackEvent('form_submitted', {
  form_name: 'signup',
  success: true,
  variant: 'minimal'
})

// Track conversions
trackEvent('signup_completed', {
  variant: 'minimal',
  method: 'email',
  value: 0,
  currency: 'USD'
})
```

## 🎯 Dashboard Setup

### 1. Create Custom Dashboard

1. Go to **Dashboards** in your PostHog dashboard
2. Click **New Dashboard**
3. Name it "Wow AI Showcase"
4. Add relevant widgets

### 2. Key Metrics to Track

- **Page Views** - Total and unique page views
- **Conversion Rate** - Signup completion rate
- **Experiment Performance** - A/B test results
- **User Engagement** - Time spent, scroll depth

### 3. Widget Configuration

```typescript
// Example dashboard widgets
const dashboardWidgets = [
  {
    type: 'insight',
    title: 'Page Views',
    query: {
      events: ['$pageview'],
      dateRange: '7d'
    }
  },
  {
    type: 'insight',
    title: 'Signup Conversion Rate',
    query: {
      events: ['signup_completed'],
      dateRange: '7d'
    }
  },
  {
    type: 'insight',
    title: 'Experiment Performance',
    query: {
      events: ['experiment_assigned'],
      breakdown: 'variant',
      dateRange: '7d'
    }
  }
]
```

## 🔍 Debugging

### Enable Debug Mode

```typescript
// src/lib/posthog.ts
const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  debug: process.env.NODE_ENV === 'development',
})
```

### Debug Console

In development mode, PostHog will log events to the console:

```javascript
// Console output
PostHog loaded: PostHog {...}
Event tracked: button_clicked {button_name: "signup", variant: "minimal"}
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

## 📈 Analytics Best Practices

### 1. Event Naming

Use consistent naming conventions:

```typescript
// Good
trackEvent('button_clicked', { button_name: 'signup' })
trackEvent('form_submitted', { form_name: 'signup' })
trackEvent('signup_completed', { method: 'email' })

// Avoid
trackEvent('click', { button: 'signup' })
trackEvent('submit', { form: 'signup' })
trackEvent('complete', { method: 'email' })
```

### 2. Property Structure

Include relevant context:

```typescript
trackEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  page: '/signup',
  timestamp: new Date().toISOString(),
  user_id: 'user_123'
})
```

### 3. Privacy Compliance

Respect user privacy:

```typescript
// Don't track sensitive data
trackEvent('signup_completed', {
  variant: 'minimal',
  method: 'email',
  // Don't include: email, phone, personal info
})
```

## 🚀 Advanced Configuration

### Custom Properties

```typescript
// Set user properties
posthog.identify('user_123', {
  email: 'user@example.com',
  plan: 'premium',
  signup_date: '2024-01-01'
})

// Set group properties
posthog.group('company', 'company_123', {
  name: 'Acme Corp',
  plan: 'enterprise',
  employees: 100
})
```

### Feature Flags

```typescript
// Check feature flags
const isFeatureEnabled = posthog.isFeatureEnabled('new-signup-flow')

if (isFeatureEnabled) {
  // Show new signup flow
} else {
  // Show old signup flow
}
```

### Cohort Analysis

```typescript
// Create cohorts
posthog.createCohort({
  name: 'High-value users',
  filters: {
    properties: [
      {
        key: 'signup_completed',
        value: true,
        operator: 'is'
      }
    ]
  }
})
```

## 🔧 Troubleshooting

### Common Issues

1. **Events Not Tracking**
   - Check PostHog key configuration
   - Verify PostHog initialization
   - Check browser console for errors

2. **Debug Mode Not Working**
   - Ensure `NODE_ENV=development`
   - Check PostHog configuration
   - Verify debug flag is set

3. **Dashboard Not Updating**
   - PostHog has a slight delay (1-2 minutes)
   - Check PostHog dashboard for data
   - Verify event properties are correct

### Debug Tools

```typescript
// Check PostHog status
console.log('PostHog loaded:', !!window.posthog)

// Check event queue
console.log('Event queue:', posthog.get_event_queue())

// Check user properties
console.log('User properties:', posthog.get_property('$user_id'))
```

## 📚 Next Steps

- [Event Tracking](/analytics/event-tracking) - Comprehensive event tracking guide
- [Experiment Analysis](/analytics/experiment-analysis) - Analyzing A/B test results
- [Experiments System](/experiments/) - Learn about the experiment framework

Ready to start tracking events? Check out our [Event Tracking Guide](/analytics/event-tracking) or explore the [Experiments System](/experiments/)!
