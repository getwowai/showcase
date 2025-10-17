# PostHog Integration

Complete guide to integrating PostHog analytics and experiments with the Wow AI Showcase.

## 🎯 Overview

PostHog provides comprehensive analytics, A/B testing, and user insights for the Wow AI Showcase. This integration enables real-time experiment tracking, user behavior analysis, and conversion optimization.

## 🚀 Setup

### 1. PostHog Account

1. Go to [PostHog](https://posthog.com)
2. Sign up for a free account
3. Create a new project
4. Get your Project API Key

### 2. Environment Configuration

```env
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Initialize PostHog

```typescript
// src/lib/posthog.ts
import { PostHog } from 'posthog-js';

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      debug: process.env.NODE_ENV === 'development',
    });
    posthog.init();
  }
};
```

## 📊 Event Tracking

### Automatic Events

The app automatically tracks:

- **Page Views** - All page visits
- **User Sessions** - Session start/end
- **Experiment Assignments** - A/B test variants
- **JavaScript Errors** - Error monitoring

### Custom Events

```typescript
import { trackEvent } from '@/experiments/tracking';

// Track user interactions
trackEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  page: '/signup',
});

// Track conversions
trackEvent('signup_completed', {
  variant: 'minimal',
  method: 'email',
  value: 0,
  currency: 'USD',
});
```

## 🧪 Experiment Integration

### Feature Flags

```typescript
// Check feature flags
const isFeatureEnabled = posthog.isFeatureEnabled('new-signup-flow');

if (isFeatureEnabled) {
  // Show new signup flow
} else {
  // Show old signup flow
}
```

### A/B Testing

```typescript
// Get experiment variant
const variant = posthog.getFeatureFlag('signup-variant');

// Track experiment assignment
posthog.capture('experiment_assigned', {
  experiment: 'signup-variant',
  variant,
  timestamp: new Date().toISOString(),
});
```

## 📈 Analytics Dashboard

### Key Metrics

- **Conversion Rate** - Signup completion rate
- **Engagement Rate** - Time spent, scroll depth
- **Experiment Performance** - A/B test results
- **User Journey** - Page flow analysis

### Custom Dashboards

Create dashboards to monitor:

1. **Experiment Performance**
   - Conversion rates by variant
   - Statistical significance
   - Sample sizes

2. **User Behavior**
   - Page view patterns
   - User journey flows
   - Drop-off points

3. **Technical Metrics**
   - Page load times
   - Error rates
   - User device data

## 🔧 Advanced Features

### User Properties

```typescript
// Set user properties
posthog.identify('user_123', {
  email: 'user@example.com',
  plan: 'premium',
  signup_date: '2024-01-01',
});
```

### Group Properties

```typescript
// Set group properties
posthog.group('company', 'company_123', {
  name: 'Acme Corp',
  plan: 'enterprise',
  employees: 100,
});
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
        operator: 'is',
      },
    ],
  },
});
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
- Don't track sensitive data
- Implement opt-out mechanisms

### 4. Performance

- Batch events when possible
- Use lazy loading for non-critical events
- Monitor event volume and costs

## 🔍 Debugging

### Debug Mode

```typescript
// Enable debug mode
const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  debug: process.env.NODE_ENV === 'development',
});
```

### Event Validation

```typescript
// Validate events before sending
export const validateEvent = (event: string, properties: any) => {
  const requiredFields = ['timestamp', 'variant'];
  const missingFields = requiredFields.filter((field) => !properties[field]);

  if (missingFields.length > 0) {
    console.warn('Missing required fields:', missingFields);
    return false;
  }

  return true;
};
```

## 📚 Next Steps

- [PostHog Setup](/analytics/posthog-setup) - Detailed setup guide
- [Event Tracking](/analytics/event-tracking) - Comprehensive tracking guide
- [Experiment Analysis](/analytics/experiment-analysis) - Analyzing results

Ready to integrate PostHog? Check out our [PostHog Setup Guide](/analytics/posthog-setup)!
