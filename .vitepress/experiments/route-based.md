# Route-based Experiments

Route-based experiments allow you to test completely different user experiences by serving different landing page variants at different routes. This approach is perfect for testing major changes to user flows, layouts, or content.

## 🎯 How It Works

Route-based experiments work by:

1. **Creating Multiple Routes** - Each variant gets its own route
2. **Traffic Splitting** - Users are directed to different routes
3. **Analytics Tracking** - PostHog tracks user behavior across variants
4. **Performance Comparison** - Compare metrics across different routes

## 🏗️ Current Implementation

### Available Variants

| Variant          | Route                     | Description                        |
| ---------------- | ------------------------- | ---------------------------------- |
| **Minimal**      | `/en/signup-minimal`      | Clean, focused signup experience   |
| **Social Proof** | `/en/signup-social-proof` | Social validation and testimonials |
| **Router**       | `/en/signup-router`       | Dynamic routing-based experiments  |

### File Structure

```
src/app/[locale]/(landing-variants)/
├── signup-minimal/
│   └── page.tsx              # Minimal variant
├── signup-social-proof/
│   └── page.tsx              # Social proof variant
└── signup-router/
    └── page.tsx              # Router variant
```

## 🚀 Implementation Details

### 1. Route Configuration

Each variant is implemented as a separate Next.js page:

```typescript
// src/app/[locale]/(landing-variants)/signup-minimal/page.tsx
import { getTranslations } from 'next-intl/server'

export default async function SignupMinimalPage() {
  const t = await getTranslations('homepage')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Minimal signup content */}
    </div>
  )
}
```

### 2. Experiment Configuration

```typescript
// src/experiments/config.ts
export const experiments = {
  'signup-variant': {
    variants: ['minimal', 'social-proof', 'router'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1, // 10% of traffic
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
  },
};
```

### 3. Analytics Tracking

```typescript
// src/experiments/tracking.ts
import { getPostHog } from '@/lib/posthog';

export const trackPageView = (variant: string, properties: any) => {
  const posthog = getPostHog();
  if (posthog) {
    posthog.capture('$pageview', {
      variant,
      ...properties,
    });
  }
};
```

## 📊 Analytics Integration

### Automatic Tracking

The app automatically tracks:

- **Page Views** - When users visit each variant
- **User Interactions** - Clicks, form submissions, scrolls
- **Conversion Events** - Signup completions, button clicks
- **Session Data** - User journey across variants

### Custom Events

Track specific user actions:

```typescript
// Track button clicks
export const trackButtonClick = (buttonName: string, variant: string) => {
  const posthog = getPostHog();
  if (posthog) {
    posthog.capture('button_clicked', {
      button_name: buttonName,
      variant,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName: string, variant: string) => {
  const posthog = getPostHog();
  if (posthog) {
    posthog.capture('form_submitted', {
      form_name: formName,
      variant,
      timestamp: new Date().toISOString(),
    });
  }
};
```

## 🎨 Variant Details

### 1. Signup Minimal (`/en/signup-minimal`)

**Features:**

- Clean, distraction-free design
- Single call-to-action
- Minimal form fields
- Focus on conversion

**Key Elements:**

- Hero section with value proposition
- Simple signup form
- Trust indicators
- Footer with links

### 2. Signup Social Proof (`/en/signup-social-proof`)

**Features:**

- Social validation elements
- Customer testimonials
- Trust badges
- Social media proof

**Key Elements:**

- Customer testimonials
- Trust badges and logos
- Social proof statistics
- User-generated content

### 3. Signup Router (`/en/signup-router`)

**Features:**

- Dynamic routing
- Progressive disclosure
- Multi-step process
- Interactive elements

**Key Elements:**

- Step-by-step process
- Interactive components
- Dynamic content loading
- Progress indicators

## 🔧 Configuration

### Environment Variables

```env
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Experiment Configuration
NEXT_PUBLIC_EXPERIMENT_TRAFFIC_ALLOCATION=0.1
NEXT_PUBLIC_EXPERIMENT_DEFAULT_VARIANT=minimal
```

### Experiment Settings

```typescript
// src/experiments/config.ts
export interface RouteExperiment {
  name: string;
  variants: string[];
  defaultVariant: string;
  trafficAllocation: number;
  startDate?: Date;
  endDate?: Date;
  targetAudience?: string[];
}

export const routeExperiments: Record<string, RouteExperiment> = {
  'signup-variant': {
    name: 'Signup Page Variant Test',
    variants: ['minimal', 'social-proof', 'router'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
  },
};
```

## 📈 Performance Monitoring

### Key Metrics

- **Conversion Rate** - Signup completions per variant
- **Engagement Rate** - Time spent, scroll depth
- **Bounce Rate** - Users who leave immediately
- **Click-through Rate** - Button clicks, link clicks

### PostHog Dashboards

Create custom dashboards to monitor:

1. **Experiment Performance**
   - Conversion rates by variant
   - User engagement metrics
   - A/B test results

2. **User Behavior**
   - Page view patterns
   - User journey flows
   - Drop-off points

3. **Technical Metrics**
   - Page load times
   - Error rates
   - User device/browser data

## 🚀 Adding New Variants

### 1. Create New Route

```bash
mkdir src/app/[locale]/(landing-variants)/signup-new-variant
touch src/app/[locale]/(landing-variants)/signup-new-variant/page.tsx
```

### 2. Implement Page Component

```typescript
// src/app/[locale]/(landing-variants)/signup-new-variant/page.tsx
import { getTranslations } from 'next-intl/server'

export default async function SignupNewVariantPage() {
  const t = await getTranslations('homepage')

  return (
    <div className="min-h-screen">
      {/* Your new variant content */}
    </div>
  )
}
```

### 3. Update Experiment Configuration

```typescript
// src/experiments/config.ts
export const experiments = {
  'signup-variant': {
    variants: ['minimal', 'social-proof', 'router', 'new-variant'],
    defaultVariant: 'minimal',
    trafficAllocation: 0.1,
  },
};
```

### 4. Add Analytics Tracking

```typescript
// src/experiments/tracking.ts
export const trackNewVariantEvent = (event: string, properties: any) => {
  const posthog = getPostHog();
  if (posthog) {
    posthog.capture(event, {
      variant: 'new-variant',
      ...properties,
    });
  }
};
```

## 🎯 Best Practices

### 1. Test One Variable at a Time

- Focus on testing one specific element per experiment
- Avoid testing multiple changes simultaneously
- Use clear, measurable hypotheses

### 2. Set Clear Success Metrics

- Define what success looks like before starting
- Set minimum sample sizes for statistical significance
- Monitor both primary and secondary metrics

### 3. Monitor Performance

- Set up real-time monitoring dashboards
- Watch for technical issues or errors
- Monitor user feedback and behavior

### 4. Document Results

- Keep detailed records of experiment results
- Document learnings and insights
- Share findings with the team

## 🔍 Debugging

### Common Issues

1. **Routes Not Working**
   - Check Next.js routing configuration
   - Verify file structure and naming
   - Check for TypeScript errors

2. **Analytics Not Tracking**
   - Verify PostHog configuration
   - Check browser console for errors
   - Ensure PostHog is properly initialized

3. **Experiments Not Assigning**
   - Check experiment configuration
   - Verify traffic allocation settings
   - Ensure proper variant assignment logic

### Debug Tools

```typescript
// Enable PostHog debug mode
const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  debug: process.env.NODE_ENV === 'development',
});

// Log experiment assignments
console.log('Experiment assigned:', variant);
```

## 📚 Next Steps

- [Setting Default Variant](/experiments/setting-default-variant) - Make a variant the default main landing page
- [Component-based Experiments](/experiments/component-based) - Learn about granular testing
- [PostHog Integration](/experiments/posthog) - Analytics setup and configuration
- [Creating New Experiments](/experiments/creating) - How to add new experiments
- [Landing Variants](/landing-variants/) - Explore available variants

Ready to start experimenting? Check out our [Quick Start Guide](/getting-started) or explore the [Available Landing Variants](/landing-variants/)!
