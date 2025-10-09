# PostHog Setup Guide

Quick guide to get PostHog experimentation running on WOW AI Showcase.

---

## 1. Get PostHog API Key

1. Go to [posthog.com](https://posthog.com) and sign up (free account)
2. Create a new project (or use existing)
3. Go to **Project Settings** → **Project API Key**
4. Copy your project API key (starts with `phc_...`)
5. Copy the API host (usually `https://app.posthog.com` or `https://eu.posthog.com`)

---

## 2. Configure Environment Variables

Create `.env.local` in the project root:

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Important:**
- Never commit `.env.local` to git (already in `.gitignore`)
- Use `.env.local.example` as a template

---

## 3. Test the Integration

Start the development server:

```bash
pnpm dev
```

Open your browser to `http://localhost:3000` and:

1. **Check Console:**
   - You should see: `"PostHog initialized in debug mode"`
   - Look for PostHog events being tracked

2. **Verify in PostHog:**
   - Go to PostHog → Activity
   - You should see `$pageview` events coming in
   - Events should include `locale` property (en or ar)

---

## 4. Create Your First Experiment

### In PostHog UI:

1. **Create Feature Flag:**
   - Go to **Feature Flags** → **New Feature Flag**
   - Key: `hero-section-test`
   - Add variants:
     - `control` (existing)
     - `signup-focused` (new variant A)
   - Rollout: 100% of users
   - Save

2. **Create Experiment:**
   - Go to **Experiments** → **New Experiment**
   - Select feature flag: `hero-section-test`
   - Primary metric: Custom event `waitlist_joined`
   - Secondary metrics: `hero_cta_clicked`, `scroll_depth`
   - Save & Start

### In Code:

3. **Document the Experiment:**

```typescript
// src/experiments/config.ts
export const EXPERIMENTS = {
  'hero-section-test': {
    id: 'hero-section-test',
    name: 'Hero Section Optimization',
    description: 'Testing signup-focused hero vs. current',
    variants: ['control', 'signup-focused'],
    primaryMetric: 'waitlist_joined',
    secondaryMetrics: ['hero_cta_clicked', 'scroll_depth'],
    status: 'running',
    startDate: '2025-10-09',
    targetLocales: ['en', 'ar'],
  }
}
```

4. **Implement Variants:**

```typescript
// src/app/[locale]/page.tsx
import { useExperiment } from '@/experiments/hooks/useExperiment'

export default function LandingPage() {
  const variant = useExperiment('hero-section-test')

  return (
    <>
      {variant === 'control' && <CurrentHeroSection />}
      {variant === 'signup-focused' && <NewSignupFocusedHero />}

      {/* Rest of page unchanged */}
      <FeaturesSection />
      <TestimonialsSection />
    </>
  )
}
```

5. **Track Conversions:**

```typescript
import { useTracking, EVENTS } from '@/experiments/tracking'

const { trackConversion } = useTracking()

<Button onClick={() => {
  trackConversion(EVENTS.WAITLIST_JOINED)
  // Handle signup...
}}>
  Join Waitlist
</Button>
```

---

## 5. Monitor Results

1. Go to **PostHog → Experiments → [Your Experiment]**
2. PostHog shows:
   - Variant exposure counts
   - Conversion rates per variant
   - Statistical significance
   - Recommended duration

3. Wait for statistical significance (95% confidence)
4. Review session recordings to understand user behavior
5. Ship the winning variant!

---

## Common Commands

```bash
# Start dev server with PostHog debug mode
pnpm dev

# Build for production
pnpm build

# Test production build locally
pnpm build && pnpm start
```

---

## Debugging

### PostHog not loading?

1. Check `.env.local` exists with correct keys
2. Verify `PostHogProvider` wraps your app in layout
3. Look for errors in browser console
4. Enable debug mode: `posthog.debug()` (auto-enabled in dev)

### Feature flag not working?

1. Check flag key matches exactly in PostHog UI and code
2. Verify flag is enabled (not paused)
3. Check rollout percentage > 0%
4. Override locally: Open console and run:
   ```javascript
   posthog.featureFlags.override({'hero-section-test': 'signup-focused'})
   ```

### Events not tracking?

1. Verify event name matches primary metric in PostHog
2. Check browser network tab for PostHog requests
3. Look for `$pageview` events first (if those work, custom events should too)
4. Ensure tracking code runs after user interaction

---

## Next Steps

1. ✅ **Read the architecture:** [docs/architecture.md](./architecture.md)
2. ✅ **Review event constants:** [src/experiments/tracking.ts](../src/experiments/tracking.ts)
3. ✅ **Build reusable components:** Create hero/CTA/feature variants
4. ✅ **Run your first experiment:** Follow guide above
5. ✅ **Analyze results:** Wait for significance, ship winner

---

## Resources

- **PostHog Docs:** https://posthog.com/docs
- **Next.js Integration:** https://posthog.com/docs/libraries/next-js
- **Experiments Guide:** https://posthog.com/docs/experiments
- **Feature Flags:** https://posthog.com/docs/feature-flags

---

## Questions?

- Check [docs/architecture.md](./architecture.md) for detailed documentation
- Review [CLAUDE.md](../CLAUDE.md) for AI assistant guidance
- Visit PostHog docs or join their Slack community
