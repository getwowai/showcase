# Setting a Variant as Default Main Landing Page

This guide explains how to make one of your landing page variants the default experience for users visiting the root landing page (`/en` or `/ar`) using the PostHog experiment framework.

## 🎯 Overview

Instead of creating separate routes for each variant, you can use PostHog feature flags to conditionally render different landing page variants on the main route. This approach allows you to:

- **A/B test different experiences** on the same URL
- **Gradually roll out changes** by controlling traffic allocation
- **Easily switch between variants** without changing URLs
- **Maintain consistent analytics** across all variants

## 🏗️ Implementation

### 1. Modify the Main Landing Page

Update your main landing page (`src/app/[locale]/page.tsx`) to use the experiment hook:

```typescript
"use client";

import { useExperiment } from "@/experiments/hooks/useExperiment";
import SignupMinimalPage from "./(landing-variants)/signup-minimal/page";

export default function HomePage() {
  // ... existing state and hooks ...

  // Use PostHog experiment to determine which landing page to show
  const variant = useExperiment("signup-landing-variant");

  // Debug logging (optional)
  useEffect(() => {
    console.log("PostHog variant:", variant);
    console.log("Experiment key: signup-landing-variant");
  }, [variant]);

  // ... all other hooks must come before early returns ...

  // If variant is 'minimal', render the minimal signup page
  if (variant === "minimal") {
    console.log("Rendering minimal signup page");
    return <SignupMinimalPage />;
  }

  // For 'control' or any other variant, show the original landing page
  console.log("Rendering original landing page, variant:", variant);

  // ... rest of original landing page component ...
}
```

### 2. Update Experiment Configuration

Modify your experiment configuration to set the desired variant as default:

```typescript
// src/experiments/config.ts
export const EXPERIMENTS: Record<string, ExperimentConfig> = {
  'signup-variants-oct-2025': {
    id: 'signup-variants-oct-2025',
    name: 'Signup Landing Page Variants',
    description: 'Testing different landing page experiences on the main route',
    variants: [
      'minimal', // Now the default variant
      'control', // Original landing page
      'social-proof', // Alternative variant
    ],
    primaryMetric: 'waitlist_joined',
    secondaryMetrics: ['hero_cta_clicked', 'scroll_depth', 'time_on_page'],
    status: 'running',
    startDate: '2025-10-09',
    targetLocales: ['en', 'ar'],
  },
};
```

### 3. Configure PostHog Feature Flag

In your PostHog dashboard:

1. **Create or update the feature flag** named `signup-landing-variant`
2. **Set the variants** to match your configuration:
   - `minimal` (your new default)
   - `control` (original landing page)
   - `social-proof` (alternative variant)
3. **Configure traffic allocation**:
   - 100% to `minimal` (to make it the default)
   - Or split traffic for A/B testing (e.g., 50% minimal, 30% control, 20% social-proof)

## 🔧 Configuration Options

### Option 1: Make Variant the Default (100% Traffic)

To make a variant the default experience for all users:

```typescript
// PostHog Feature Flag Configuration
{
  "variants": {
    "minimal": 100,  // 100% of traffic gets minimal variant
    "control": 0,    // 0% gets original
    "social-proof": 0 // 0% gets social proof
  }
}
```

### Option 2: Gradual Rollout

To gradually roll out a new variant:

```typescript
// PostHog Feature Flag Configuration
{
  "variants": {
    "minimal": 80,   // 80% of traffic gets new variant
    "control": 20,   // 20% gets original (for comparison)
    "social-proof": 0
  }
}
```

### Option 3: A/B/C Testing

To test multiple variants simultaneously:

```typescript
// PostHog Feature Flag Configuration
{
  "variants": {
    "minimal": 40,     // 40% gets minimal
    "control": 30,     // 30% gets original
    "social-proof": 30 // 30% gets social proof
  }
}
```

## 📊 Analytics and Tracking

### Automatic Tracking

The system automatically tracks:

- **Experiment Exposure**: When users are assigned to a variant
- **Page Views**: Which variant users see
- **User Interactions**: Clicks, form submissions, scrolls
- **Conversion Events**: Signup completions, button clicks

### Debug Logging

Add debug logging to monitor variant assignments:

```typescript
// Debug logging in your component
useEffect(() => {
  console.log('PostHog variant:', variant);
  console.log('Experiment key: signup-landing-variant');

  // Track experiment exposure
  if (variant) {
    trackEvent('experiment_exposure', {
      experiment_name: 'signup-variants-oct-2025',
      variant: variant,
      page_path: window.location.pathname,
    });
  }
}, [variant, trackEvent]);
```

### PostHog Dashboard

Monitor your experiment in PostHog:

1. **Feature Flags**: See real-time variant assignments
2. **Events**: Track user interactions by variant
3. **Funnels**: Analyze conversion rates by variant
4. **Cohorts**: Segment users by variant assignment

## 🚀 Best Practices

### 1. Follow React Rules of Hooks

**Important**: Always call all hooks before any conditional returns:

```typescript
export default function HomePage() {
  // ✅ All hooks first
  const [state, setState] = useState();
  const variant = useExperiment("signup-landing-variant");
  const { trackEvent } = useTracking();

  useEffect(() => {
    // ... effect logic
  }, []);

  // ✅ Then conditional returns
  if (variant === "minimal") {
    return <SignupMinimalPage />;
  }

  // ✅ Rest of component
  return <OriginalLandingPage />;
}
```

### 2. Use Consistent Feature Flag Keys

Ensure the feature flag key matches across all files:

```typescript
// In main landing page
const variant = useExperiment("signup-landing-variant");

// In experiment config
"signup-variants-oct-2025": { ... }

// In PostHog dashboard
Feature Flag Key: "signup-landing-variant"
```

### 3. Test Thoroughly

Before deploying:

1. **Test all variants** in development
2. **Verify PostHog integration** is working
3. **Check analytics tracking** for each variant
4. **Test fallback behavior** when PostHog is unavailable

### 4. Monitor Performance

After deployment:

1. **Watch for errors** in production
2. **Monitor conversion rates** by variant
3. **Check user feedback** and behavior
4. **Adjust traffic allocation** based on results

## 🔍 Troubleshooting

### Common Issues

#### 1. "Rendered fewer hooks than expected"

**Problem**: Early return before all hooks are called.

**Solution**: Move all hooks before conditional returns:

```typescript
// ❌ Wrong - early return before hooks
if (variant === "minimal") {
  return <SignupMinimalPage />;
}
const variant = useExperiment("signup-landing-variant");

// ✅ Correct - all hooks first
const variant = useExperiment("signup-landing-variant");
if (variant === "minimal") {
  return <SignupMinimalPage />;
}
```

#### 2. Variant Not Assigning

**Problem**: Users always see the original landing page.

**Solutions**:

- Check PostHog feature flag is enabled
- Verify feature flag key matches exactly
- Check traffic allocation settings
- Look for console errors

#### 3. Import Path Errors

**Problem**: Module not found errors for variant components.

**Solution**: Use correct import paths:

```typescript
// ✅ Correct - use relative path from same directory level
import SignupMinimalPage from './(landing-variants)/signup-minimal/page';

// ❌ Wrong - incorrect relative path
import SignupMinimalPage from '../(landing-variants)/signup-minimal/page';
```

### Debug Tools

#### 1. PostHog Debug Mode

Enable debug mode to see events in console:

```typescript
// src/lib/posthog.ts
const posthog = new PostHog(apiKey, {
  api_host: apiHost,
  debug: process.env.NODE_ENV === 'development',
});
```

#### 2. Console Logging

Add temporary logging to debug variant assignments:

```typescript
useEffect(() => {
  console.log('Current variant:', variant);
  console.log('PostHog loaded:', !!getPostHog());
}, [variant]);
```

#### 3. PostHog Override

Use PostHog's override feature to force specific variants during testing:

1. Open PostHog dashboard
2. Go to Feature Flags
3. Find your flag
4. Use "Override for this user" to test specific variants

## 📈 Monitoring and Analysis

### Key Metrics to Track

1. **Variant Assignment Rate**: Percentage of users assigned to each variant
2. **Conversion Rate**: Signup completions by variant
3. **Engagement Rate**: Time on page, scroll depth by variant
4. **Error Rate**: Technical issues by variant

### PostHog Queries

Use these PostHog queries to analyze your experiment:

```sql
-- Conversion rate by variant
SELECT
  properties.variant,
  COUNT(*) as total_users,
  COUNT(CASE WHEN event = 'waitlist_joined' THEN 1 END) as conversions,
  COUNT(CASE WHEN event = 'waitlist_joined' THEN 1 END) / COUNT(*) as conversion_rate
FROM events
WHERE event = 'experiment_exposure' OR event = 'waitlist_joined'
GROUP BY properties.variant;

-- User engagement by variant
SELECT
  properties.variant,
  AVG(properties.scroll_percentage) as avg_scroll_depth,
  AVG(properties.time_on_page) as avg_time_on_page
FROM events
WHERE event = 'scroll_depth' OR event = 'page_view'
GROUP BY properties.variant;
```

## 🎯 Next Steps

1. **Set up your feature flag** in PostHog dashboard
2. **Configure traffic allocation** based on your goals
3. **Deploy and monitor** the experiment
4. **Analyze results** and iterate based on data
5. **Scale successful variants** or adjust based on learnings

## 📚 Related Documentation

- [Route-based Experiments](/experiments/route-based) - Learn about route-based testing
- [PostHog Integration](/experiments/posthog) - Analytics setup and configuration
- [Creating New Experiments](/experiments/creating) - How to add new experiments
- [Landing Variants](/landing-variants/) - Explore available variants

Ready to set up your default variant? Check out our [Quick Start Guide](/getting-started) or explore the [Available Landing Variants](/landing-variants/)!
