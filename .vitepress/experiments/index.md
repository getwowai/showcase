# Experiments Overview

The Wow AI Showcase includes a comprehensive experiment system that allows you to run A/B tests on different landing page variants and track user behavior with PostHog analytics.

## 🧪 Experiment Types

### 1. Route-based Experiments

Different landing page variants are served at different routes, making it easy to test completely different user experiences.

**Example Routes:**

- `/en/signup-minimal` - Clean, focused signup
- `/en/signup-social-proof` - Social validation variant
- `/en/signup-router` - Dynamic routing experiments

### 2. Component-based Experiments

Individual components can be wrapped with experiment logic for more granular testing within the same page.

**Example Components:**

- Button text variations
- Form field arrangements
- Call-to-action placement

## 🏗️ Architecture

The experiment system is built with:

- **Next.js App Router** - Route-based experiments
- **PostHog** - Analytics and experiment tracking
- **React Hooks** - Component-based experiments
- **TypeScript** - Type-safe experiment configuration

## 📊 Analytics Integration

All experiments are automatically tracked with PostHog:

- **Page Views** - Automatic tracking of all page visits
- **User Interactions** - Clicks, form submissions, scrolls
- **Conversion Events** - Signup completions, button clicks
- **Experiment Metrics** - Variant performance, conversion rates

## 🚀 Quick Start

### 1. Configure PostHog

```typescript
// src/lib/posthog.ts
import { PostHog } from 'posthog-js';

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
    posthog.init();
  }
};
```

### 2. Set Up Route-based Experiments

```typescript
// src/experiments/config.ts
export const experiments = {
  'signup-variant': {
    variants: ['minimal', 'social-proof', 'router'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1, // 10% of traffic
  },
};
```

### 3. Track Events

```typescript
// src/experiments/tracking.ts
import { getPostHog } from '@/lib/posthog';

export const trackExperimentEvent = (event: string, properties: any) => {
  const posthog = getPostHog();
  if (posthog) {
    posthog.capture(event, properties);
  }
};
```

## 📈 Experiment Analysis

### Key Metrics

- **Conversion Rate** - Percentage of users who complete the desired action
- **Engagement Rate** - Time spent on page, scroll depth
- **Click-through Rate** - Button clicks, link clicks
- **Bounce Rate** - Users who leave without interaction

### PostHog Dashboards

Create custom dashboards in PostHog to monitor:

- Experiment performance in real-time
- User behavior across variants
- Conversion funnel analysis
- Geographic and demographic breakdowns

## 🔧 Configuration

### Experiment Configuration

```typescript
// src/experiments/config.ts
export interface Experiment {
  variants: string[];
  defaultVariant: string;
  trafficAllocation: number;
  startDate?: Date;
  endDate?: Date;
  targetAudience?: string[];
}

export const experiments: Record<string, Experiment> = {
  'signup-variant': {
    variants: ['minimal', 'social-proof', 'router'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
  },
};
```

### Tracking Configuration

```typescript
// src/experiments/tracking.ts
export const TRACKING_EVENTS = {
  PAGE_VIEW: '$pageview',
  SIGNUP_START: 'signup_started',
  SIGNUP_COMPLETE: 'signup_completed',
  BUTTON_CLICK: 'button_clicked',
  FORM_SUBMIT: 'form_submitted',
} as const;
```

## 🎯 Best Practices

### 1. Hypothesis-Driven Testing

- Start with a clear hypothesis
- Define success metrics before running the experiment
- Set a minimum sample size for statistical significance

### 2. Test One Variable at a Time

- Focus on testing one specific element per experiment
- Avoid testing multiple changes simultaneously
- Use component-based experiments for granular testing

### 3. Monitor Performance

- Set up real-time monitoring dashboards
- Watch for technical issues or errors
- Monitor user feedback and behavior

### 4. Document Results

- Keep detailed records of experiment results
- Document learnings and insights
- Share findings with the team

## 🎯 Setting Default Variants

Learn how to make one of your landing page variants the default experience for users visiting the main landing page:

- **[Setting Default Variant](/experiments/setting-default-variant)** - Complete guide to making a variant the default main landing page

## 📚 Available Experiments

### Current Experiments

1. **Signup Variant Test**
   - **Minimal**: Clean, distraction-free signup (now default)
   - **Social Proof**: Social validation and testimonials
   - **Router**: Dynamic routing-based experience

2. **Button Text Test**
   - "Get Started Free"
   - "Join Waitlist"
   - "Start Your Journey"

3. **Form Layout Test**
   - Single column layout
   - Two column layout
   - Progressive disclosure

## 🔍 Debugging

### PostHog Debug Mode

Enable debug mode to see events in the console:

```typescript
// src/lib/posthog.ts
const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  debug: process.env.NODE_ENV === 'development',
});
```

### Common Issues

1. **Events Not Tracking**
   - Check PostHog key configuration
   - Verify PostHog initialization
   - Check browser console for errors

2. **Experiments Not Working**
   - Verify experiment configuration
   - Check traffic allocation settings
   - Ensure proper variant assignment

3. **Analytics Not Updating**
   - PostHog has a slight delay (1-2 minutes)
   - Check PostHog dashboard for data
   - Verify event properties are correct

## 📖 Next Steps

- [Setting Default Variant](/experiments/setting-default-variant) - Make a variant the default main landing page
- [Route-based Experiments](/experiments/route-based) - Learn about route-based testing
- [Component-based Experiments](/experiments/component-based) - Granular component testing
- [PostHog Integration](/experiments/posthog) - Analytics setup and configuration
- [Creating New Experiments](/experiments/creating) - How to add new experiments

Ready to start experimenting? Check out our [Quick Start Guide](/getting-started) or explore the [Available Landing Variants](/landing-variants/)!
