# Event Tracking

Comprehensive guide to tracking user events and conversions in the Wow AI Showcase.

## 🎯 Overview

Event tracking allows you to understand user behavior, measure experiment performance, and optimize conversion rates. The app uses PostHog for all event tracking.

## 📊 Available Events

### Automatic Events

These events are tracked automatically:

- **`$pageview`** - Page visits
- **`$session_start`** - User sessions
- **`experiment_assigned`** - A/B test variant assignments
- **`javascript_error`** - JavaScript errors

### Custom Events

Track specific user actions:

- **`button_clicked`** - Button and link clicks
- **`form_submitted`** - Form submissions
- **`signup_completed`** - User signups
- **`conversion`** - Business conversions

## 🚀 Implementation

### Basic Event Tracking

```typescript
import { trackEvent } from '@/experiments/tracking';

// Track button clicks
trackEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  page: '/signup',
});

// Track form submissions
trackEvent('form_submitted', {
  form_name: 'signup',
  success: true,
  variant: 'minimal',
});
```

### Conversion Tracking

```typescript
// Track signup completions
trackEvent('signup_completed', {
  variant: 'minimal',
  method: 'email',
  value: 0,
  currency: 'USD',
});

// Track business conversions
trackEvent('conversion', {
  event: 'signup_completed',
  variant: 'minimal',
  value: 100,
  currency: 'USD',
});
```

## 📈 Best Practices

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

## 🔧 Advanced Tracking

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

## 📚 Next Steps

- [PostHog Setup](/analytics/posthog-setup) - Configure PostHog
- [Experiment Analysis](/analytics/experiment-analysis) - Analyze A/B test results
- [Experiments System](/experiments/) - Learn about experiments

Ready to start tracking events? Check out our [PostHog Setup Guide](/analytics/posthog-setup)!
