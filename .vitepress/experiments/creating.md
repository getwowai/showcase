# Creating New Experiments

Step-by-step guide to creating and implementing new A/B tests in the Wow AI Showcase.

## 🎯 Overview

This guide walks you through the complete process of creating new experiments, from initial setup to analysis and implementation.

## 🚀 Quick Start

### 1. Define Your Hypothesis

Before creating an experiment, clearly define:

- **What** you want to test
- **Why** you think it will improve results
- **How** you'll measure success

**Example:**

- **What:** Button text change from "Get Started" to "Start Free Trial"
- **Why:** "Free Trial" emphasizes no cost, potentially increasing clicks
- **How:** Measure button click rate and signup completion rate

### 2. Choose Experiment Type

**Route-based** for major changes:

- Different page layouts
- Unique user flows
- Complete redesigns

**Component-based** for minor changes:

- Button text/colors
- Form layouts
- Content variations

## 🏗️ Implementation Steps

### Step 1: Create PostHog Feature Flag

1. Go to PostHog → **Feature Flags**
2. Click **New Feature Flag**
3. Configure:
   - **Key:** `experiment-name`
   - **Name:** Human-readable name
   - **Variants:** Add your variants
   - **Rollout:** Set traffic allocation

### Step 2: Document in Code

```typescript
// src/experiments/config.ts
export const experiments = {
  'button-text-test': {
    name: 'Button Text Optimization',
    description: 'Testing different CTA button text',
    variants: ['control', 'free-trial', 'get-started'],
    defaultVariant: 'control',
    trafficAllocation: 0.1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    primaryMetric: 'button_clicked',
    secondaryMetrics: ['signup_completed'],
  },
};
```

### Step 3: Implement Variants

#### Route-based Implementation

```typescript
// src/app/[locale]/(landing-variants)/new-variant/page.tsx
import { getTranslations } from 'next-intl/server'

export default async function NewVariantPage() {
  const t = await getTranslations('homepage')

  return (
    <div className="min-h-screen">
      {/* Your new variant content */}
      <h1>New Variant Page</h1>
      <button>Start Free Trial</button>
    </div>
  )
}
```

#### Component-based Implementation

```typescript
// src/components/ExperimentButton.tsx
import { useExperiment } from '@/experiments/hooks/useExperiment'

export function ExperimentButton() {
  const { variant } = useExperiment('button-text-test')

  const buttonText = {
    'control': 'Get Started',
    'free-trial': 'Start Free Trial',
    'get-started': 'Get Started Now'
  }

  return (
    <button>
      {buttonText[variant] || buttonText['control']}
    </button>
  )
}
```

### Step 4: Add Analytics Tracking

```typescript
// Track experiment assignment
import { trackEvent } from '@/experiments/tracking'

export function TrackedComponent() {
  const { variant } = useExperiment('button-text-test')

  const handleClick = () => {
    trackEvent('button_clicked', {
      experiment: 'button-text-test',
      variant,
      button_text: buttonText[variant]
    })
  }

  return (
    <button onClick={handleClick}>
      {buttonText[variant]}
    </button>
  )
}
```

## 📊 Experiment Configuration

### Traffic Allocation

```typescript
// Distribute traffic across variants
const trafficAllocation = {
  control: 0.5, // 50% of traffic
  'variant-a': 0.3, // 30% of traffic
  'variant-b': 0.2, // 20% of traffic
};
```

### Targeting Rules

```typescript
// Target specific user segments
const targetingRules = {
  'new-users': {
    properties: [
      {
        key: 'signup_date',
        value: '2024-01-01',
        operator: 'gte',
      },
    ],
  },
  'premium-users': {
    properties: [
      {
        key: 'plan',
        value: 'premium',
        operator: 'is',
      },
    ],
  },
};
```

## 📈 Monitoring and Analysis

### Key Metrics to Track

1. **Primary Metric** - Main success indicator
2. **Secondary Metrics** - Supporting evidence
3. **Guardrail Metrics** - Ensure no negative impact

### Example Metrics

```typescript
const experimentMetrics = {
  primary: 'signup_completed',
  secondary: ['button_clicked', 'form_submitted', 'time_on_page'],
  guardrails: ['bounce_rate', 'error_rate', 'page_load_time'],
};
```

### Statistical Significance

- **95% Confidence** - Standard threshold
- **Minimum Sample Size** - Wait for adequate data
- **Duration** - Run for recommended time period

## 🎯 Best Practices

### 1. Hypothesis-Driven Testing

- Start with a clear hypothesis
- Define success metrics before starting
- Set minimum sample size for significance

### 2. Test One Variable at a Time

- Focus on testing one specific element
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

## 🔧 Advanced Features

### Multi-variant Testing

```typescript
// Test multiple variants simultaneously
const multiVariantTest = {
  name: 'Hero Section Test',
  variants: ['control', 'benefit-focused', 'social-proof', 'urgency'],
  trafficAllocation: {
    control: 0.25,
    'benefit-focused': 0.25,
    'social-proof': 0.25,
    urgency: 0.25,
  },
};
```

### Conditional Experiments

```typescript
// Show different experiments based on user properties
const conditionalExperiment = {
  name: 'Personalized CTA',
  variants: ['default', 'personalized'],
  conditions: {
    personalized: {
      properties: [
        {
          key: 'user_type',
          value: 'returning',
          operator: 'is',
        },
      ],
    },
  },
};
```

### Gradual Rollouts

```typescript
// Gradually increase traffic to winning variant
const gradualRollout = {
  name: 'Gradual Rollout',
  phases: [
    { traffic: 0.1, duration: '7d' },
    { traffic: 0.5, duration: '7d' },
    { traffic: 1.0, duration: '14d' },
  ],
};
```

## 🔍 Debugging

### Debug Mode

```typescript
// Enable debug mode for development
const { variant, isLoading, error } = useExperiment('test-experiment', {
  debug: process.env.NODE_ENV === 'development',
});
```

### Common Issues

1. **Experiment Not Assigning**
   - Check PostHog configuration
   - Verify traffic allocation
   - Ensure proper variant assignment

2. **Events Not Tracking**
   - Check PostHog key configuration
   - Verify event names match
   - Check browser console for errors

3. **Statistical Significance Not Reached**
   - Wait for adequate sample size
   - Check if experiment is still running
   - Verify traffic allocation settings

## 📚 Next Steps

- [Route-based Experiments](/experiments/route-based) - Learn about route-based testing
- [Component-based Experiments](/experiments/component-based) - Granular component testing
- [PostHog Integration](/experiments/posthog) - Analytics setup

Ready to create your first experiment? Check out our [Experiments Overview](/experiments/) or explore [Route-based Experiments](/experiments/route-based)!
