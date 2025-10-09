# WOW AI Showcase - Experimentation Architecture

**Last Updated:** October 9, 2025
**Status:** Active

---

## Overview

This document describes the experimentation framework for WOW AI Showcase landing pages. Our architecture enables rapid iteration on landing page variants while maintaining code quality, i18n support (English/Arabic), and comprehensive analytics tracking.

---

## Architecture Principles

### 1. **Minimal Custom Code**
- Leverage PostHog's built-in experimentation platform
- ~100 lines of custom code total
- No complex bucketing logic or variant assignment code

### 2. **i18n First**
- All tracking includes locale context
- Experiments can be segmented by language
- RTL (Arabic) and LTR (English) fully supported

### 3. **Rapid Iteration**
- Create experiments in PostHog UI (no code deployment needed)
- Add new landing page variants in minutes
- Feature flags control experiment rollout

### 4. **Comprehensive Tracking**
- Auto-capture page views, clicks, form submits
- Custom events for conversions
- Session recordings for qualitative analysis
- Statistical significance calculated automatically

### 5. **Component Composability**
- Landing pages built from reusable sections
- Mix and match heroes, CTAs, features, testimonials
- Variants share common components

---

## Technology Stack

### Core Technologies
- **Next.js 14** - App Router, Server Components, i18n
- **PostHog** - Experiments, feature flags, analytics, session recording
- **next-intl** - Internationalization (English/Arabic)
- **TypeScript** - Type safety throughout
- **Tailwind CSS 4** - Styling

### PostHog Integration
- **posthog-js** - Client-side SDK
- **posthog-js/react** - React hooks (useFeatureFlagVariantKey)
- Already installed in package.json

---

## Directory Structure

```
wowshowcase/
├── docs/
│   ├── architecture.md              # This file
│   ├── posthog-vs-mixpanel.md      # Platform comparison
│   └── experiments/                 # Experiment documentation (future)
│
├── src/
│   ├── app/[locale]/
│   │   ├── layout.tsx              # Root layout with PostHogProvider
│   │   ├── page.tsx                # STABLE: Main landing (control)
│   │   │
│   │   ├── (landing-variants)/     # Route group for experiments
│   │   │   ├── layout.tsx          # Shared layout
│   │   │   ├── signup/page.tsx     # Variant: Signup-focused
│   │   │   ├── demo-first/page.tsx # Variant: Demo-first
│   │   │   └── ...                 # Additional variants
│   │   │
│   │   └── onboarding/page.tsx     # Existing onboarding
│   │
│   ├── components/
│   │   ├── PostHogProvider.tsx     # PostHog context provider
│   │   ├── landing/                # Reusable landing sections
│   │   │   ├── heroes/             # Hero variants
│   │   │   ├── features/           # Feature section variants
│   │   │   ├── ctas/               # CTA variants
│   │   │   ├── testimonials/       # Testimonial variants
│   │   │   └── shared/             # Shared components
│   │   └── ui/                     # Base UI components
│   │
│   ├── experiments/
│   │   ├── config.ts               # Experiment registry
│   │   ├── tracking.ts             # i18n-aware tracking utilities
│   │   └── hooks/
│   │       └── useExperiment.ts    # Experiment hooks
│   │
│   └── lib/
│       └── posthog.ts              # PostHog initialization
│
├── .env.local.example              # Environment variables template
└── CLAUDE.md                       # AI assistant guidance
```

---

## Core Components

### 1. PostHog Initialization (`src/lib/posthog.ts`)

**Purpose:** Initialize PostHog SDK once on app load.

**Key Features:**
- Client-side only (checks `typeof window`)
- Debug mode in development
- Session recording enabled
- Manual pageview capture (for i18n)

**Usage:**
```typescript
import { initPostHog } from '@/lib/posthog'

// Called automatically by PostHogProvider
initPostHog()
```

---

### 2. PostHog Provider (`src/components/PostHogProvider.tsx`)

**Purpose:** Wrap the app to provide PostHog context and track page views.

**Key Features:**
- Initializes PostHog on mount
- Tracks page views with locale on route changes
- Provides PostHog context to all components

**Integration:**
```tsx
// src/app/[locale]/layout.tsx
<PostHogProvider>
  <NextIntlClientProvider messages={messages} locale={locale}>
    {children}
  </NextIntlClientProvider>
</PostHogProvider>
```

---

### 3. Tracking Utilities (`src/experiments/tracking.ts`)

**Purpose:** Provide i18n-aware tracking hooks and event constants.

**Key Features:**
- `useTracking()` hook automatically includes locale in all events
- Predefined event names (EVENTS constants)
- Standard property names (PROPERTIES constants)
- Specialized methods: trackPageView, trackConversion, trackCTAClick, etc.

**Usage:**
```typescript
import { useTracking, EVENTS } from '@/experiments/tracking'

const { trackEvent, trackCTAClick } = useTracking()

// Track custom event
trackEvent(EVENTS.FEATURE_EXPLORED, { feature_name: 'ai-chat' })

// Track CTA click
trackCTAClick('Join Waitlist', 'hero-section', { variant: 'signup' })
```

---

### 4. Experiment Hook (`src/experiments/hooks/useExperiment.ts`)

**Purpose:** Get the current variant for an experiment and track exposure.

**Key Features:**
- Uses PostHog's `useFeatureFlagVariantKey` under the hood
- Automatically tracks experiment_exposure event
- Returns variant key (e.g., 'control', 'variant-a')

**Usage:**
```typescript
import { useExperiment } from '@/experiments/hooks/useExperiment'
import { HeroDefault, HeroSignup } from '@/components/landing/heroes'

const variant = useExperiment('hero-section-test')

if (variant === 'control') return <HeroDefault />
if (variant === 'signup-focused') return <HeroSignup />
```

---

### 5. Experiment Config (`src/experiments/config.ts`)

**Purpose:** Centralized documentation of all experiments.

**Key Features:**
- TypeScript interfaces for experiments
- Registry of active experiments
- Helper functions (getExperiment, getActiveExperiments)
- **Note:** PostHog is the source of truth; this is for documentation

**Usage:**
```typescript
export const EXPERIMENTS = {
  'hero-section-test': {
    id: 'hero-section-test',
    name: 'Hero Section Optimization',
    variants: ['control', 'signup-focused', 'demo-first'],
    primaryMetric: 'waitlist_joined',
    secondaryMetrics: ['hero_cta_clicked', 'scroll_depth'],
    status: 'running',
    targetLocales: ['en', 'ar'],
  }
}
```

---

## Experiment Workflow

### Creating a New Experiment

#### Step 1: Create Feature Flag in PostHog

1. Go to PostHog → Feature Flags → New Feature Flag
2. Set key: `my-experiment-name`
3. Add variants:
   - `control` (existing/baseline)
   - `variant-a` (new version A)
   - `variant-b` (new version B)
4. Set rollout to 100% (PostHog will split evenly)
5. Add targeting (optional): e.g., `language = 'ar'` for Arabic only

#### Step 2: Create Experiment in PostHog

1. Go to PostHog → Experiments → New Experiment
2. Select the feature flag created above
3. Define primary metric: e.g., `waitlist_joined`
4. Add secondary metrics: e.g., `hero_cta_clicked`, `scroll_depth`
5. PostHog auto-calculates:
   - Recommended sample size
   - Recommended duration
   - Statistical significance

#### Step 3: Document in Code

```typescript
// src/experiments/config.ts
export const EXPERIMENTS = {
  'my-experiment-name': {
    id: 'my-experiment-name',
    name: 'Descriptive Name',
    description: 'What we are testing and why',
    variants: ['control', 'variant-a', 'variant-b'],
    primaryMetric: 'waitlist_joined',
    secondaryMetrics: ['hero_cta_clicked', 'scroll_depth'],
    status: 'running',
    startDate: '2025-10-09',
    targetLocales: ['en', 'ar'],
  }
}
```

#### Step 4: Implement Variants in Code

**Option A: Component-level (recommended)**
```tsx
// src/app/[locale]/page.tsx
'use client'
import { useExperiment } from '@/experiments/hooks/useExperiment'

export default function LandingPage() {
  const variant = useExperiment('my-experiment-name')

  return (
    <>
      {variant === 'control' && <HeroDefault />}
      {variant === 'variant-a' && <HeroVariantA />}
      {variant === 'variant-b' && <HeroVariantB />}

      {/* Rest of page unchanged */}
      <FeaturesSection />
      <TestimonialsSection />
    </>
  )
}
```

**Option B: Route-based (for completely different landing pages)**
```tsx
// src/app/[locale]/(landing-variants)/signup/page.tsx
// Completely custom page optimized for signup
export default function SignupLandingPage() {
  return (
    <>
      <HeroSignupFocused />
      <QuickSignupForm />
      <TrustBadges />
      <MinimalFooter />
    </>
  )
}
```

#### Step 5: Track Conversions

```tsx
import { useTracking, EVENTS } from '@/experiments/tracking'

const { trackConversion } = useTracking()

<Button onClick={() => {
  trackConversion(EVENTS.WAITLIST_JOINED, {
    source: 'hero-cta',
  })
  // PostHog automatically attributes to experiment variant
}}>
  Join Waitlist
</Button>
```

#### Step 6: Monitor & Analyze

1. PostHog automatically tracks:
   - Variant assignments
   - Exposure events
   - Conversion events
   - Statistical significance
2. View results in PostHog → Experiments → [Your Experiment]
3. Watch session recordings for qualitative insights
4. Segment by locale to see en vs ar performance

---

## i18n & Localization Strategy

### How It Works

1. **All events include locale:**
   ```typescript
   posthog.capture('event_name', {
     ...properties,
     locale: 'ar', // or 'en'
   })
   ```

2. **User language set as property:**
   ```typescript
   posthog.capture('event_name', {
     $set: { language: 'ar' }
   })
   ```

3. **Segment experiments by locale in PostHog:**
   - Breakdown by: `locale`
   - Filter by: `language = 'ar'`

### Running Locale-Specific Experiments

**Option 1: Single experiment, segmented analysis**
- Create one experiment
- Analyze results separately for `en` and `ar` in PostHog

**Option 2: Separate experiments per locale**
- Create `hero-test-en` (English users only)
- Create `hero-test-ar` (Arabic users only)
- Use PostHog targeting: `language = 'ar'`

**Recommendation:** Use Option 2 for experiments where messaging/design differs significantly between languages.

---

## Standard Event Tracking

### Core Events

All events automatically include:
- `locale` - Current language (en/ar)
- `$current_url` - Full page URL
- `$set: { language }` - Set user property

### Event Categories

#### 1. Page Views
- `landing_page_viewed`
- `demo_page_viewed`
- `onboarding_page_viewed`

#### 2. Hero Interactions
- `hero_cta_clicked`
- `hero_secondary_cta_clicked`

#### 3. Feature Interactions
- `feature_explored`
- `feature_demo_started`
- `feature_demo_completed`

#### 4. Conversions (Primary Metrics)
- `waitlist_joined`
- `demo_requested`
- `signup_initiated`
- `contact_form_submitted`

#### 5. Engagement (Secondary Metrics)
- `scroll_depth` (25%, 50%, 75%, 100%)
- `video_played`
- `video_completed`
- `testimonial_viewed`

#### 6. Navigation
- `language_switched`
- `external_link_clicked`

### Event Naming Conventions

- **Lowercase with underscores:** `hero_cta_clicked`
- **Past tense:** `clicked`, `viewed`, `joined` (not `click`, `view`, `join`)
- **Descriptive:** Include context (e.g., `hero_cta_clicked` not just `clicked`)

---

## Component Library Structure

### Reusable Landing Sections

```
src/components/landing/
├── heroes/
│   ├── HeroDefault.tsx          # Current production hero
│   ├── HeroSignupFocused.tsx    # Variant: Large signup form
│   ├── HeroDemoFirst.tsx        # Variant: Interactive demo
│   ├── HeroSocialProof.tsx      # Variant: Testimonials/logos
│   └── HeroMinimal.tsx          # Variant: Minimalist design
│
├── features/
│   ├── FeaturesGrid.tsx         # Grid layout
│   ├── FeaturesCarousel.tsx     # Carousel/slider
│   ├── FeaturesSideBySide.tsx   # Two-column layout
│   └── FeaturesInteractive.tsx  # Interactive demos
│
├── ctas/
│   ├── CTAPrimary.tsx           # Single prominent CTA
│   ├── CTADual.tsx              # Primary + secondary CTAs
│   ├── CTAWithSocialProof.tsx   # CTA with badges/stats
│   └── CTAMinimal.tsx           # Text link only
│
├── testimonials/
│   ├── TestimonialsCarousel.tsx # Rotating testimonials
│   ├── TestimonialsGrid.tsx     # Grid of cards
│   ├── TestimonialsVideo.tsx    # Video testimonials
│   └── TestimonialsCompact.tsx  # Minimalist version
│
└── shared/
    ├── TrustBadges.tsx          # Security/trust indicators
    ├── StatsBar.tsx             # Key metrics display
    ├── FAQSection.tsx           # Frequently asked questions
    └── NewsletterSignup.tsx     # Email capture
```

### Component Guidelines

1. **Props interface:**
   ```typescript
   interface HeroProps {
     variant?: string;  // Track which variant is shown
     locale: 'en' | 'ar';
     onCTAClick?: () => void;
   }
   ```

2. **Built-in tracking:**
   ```tsx
   const Hero = ({ variant, locale }: HeroProps) => {
     const { trackCTAClick } = useTracking()

     return (
       <Button onClick={() => {
         trackCTAClick('Join Waitlist', 'hero', { variant })
       }}>
         {t('cta.joinWaitlist')}
       </Button>
     )
   }
   ```

3. **i18n support:**
   - Use `useTranslations()` from next-intl
   - Support RTL layouts
   - Test with both English and Arabic content

---

## Performance Considerations

### Bundle Size
- PostHog SDK: ~45KB gzipped
- Each experiment: <1KB (minimal conditional logic)
- Target: Keep total JS < 200KB for landing pages

### Loading Strategy
- PostHog loads asynchronously (non-blocking)
- Feature flag evaluation happens client-side
- No SSR performance impact

### Caching
- Feature flags cached in localStorage
- Sticky variants (users see consistent experience)
- Cache invalidation on new flag publish

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**How to get these:**
1. Sign up at [posthog.com](https://posthog.com)
2. Create a project
3. Go to Project Settings → Project API Key
4. Copy key and host URL

**Security:**
- `NEXT_PUBLIC_*` vars are safe to expose (client-side)
- PostHog API key is project-scoped (read/write to that project only)
- No sensitive data in PostHog keys

---

## Best Practices

### 1. **Experiment Hygiene**
- ✅ Document experiments in `config.ts`
- ✅ Set clear start/end dates
- ✅ Define primary metric before starting
- ✅ Wait for statistical significance before shipping
- ❌ Don't run too many experiments simultaneously (risk of interaction effects)
- ❌ Don't peek at results too early (avoid p-hacking)

### 2. **Code Quality**
- ✅ Keep variant logic simple (avoid complex conditionals)
- ✅ Reuse components across variants when possible
- ✅ Test all variants in development
- ✅ Clean up experiment code after shipping winner
- ❌ Don't let experiment code linger indefinitely
- ❌ Don't create one-off components that can't be reused

### 3. **Tracking**
- ✅ Track every meaningful interaction
- ✅ Use event constants (EVENTS.HERO_CTA_CLICKED)
- ✅ Include context in event properties
- ✅ Test tracking in development (PostHog debug mode)
- ❌ Don't track PII (emails, names, etc.)
- ❌ Don't create duplicate event names

### 4. **i18n**
- ✅ Always test both English and Arabic
- ✅ Verify RTL layouts
- ✅ Use locale-specific imagery when appropriate
- ✅ Consider cultural nuances in messaging
- ❌ Don't assume English variants work for Arabic

### 5. **Performance**
- ✅ Keep experiments lightweight
- ✅ Lazy load variant components when possible
- ✅ Monitor Core Web Vitals per variant
- ❌ Don't add heavy libraries for a single experiment
- ❌ Don't block rendering on feature flag evaluation

---

## Rollout Process

### 1. **Development**
- Create feature flag in PostHog (0% rollout)
- Implement variants locally
- Test with PostHog debug mode
- Override flags locally: `posthog.featureFlags.override({'flag-name': 'variant'})`

### 2. **Staging/Preview**
- Deploy to preview environment
- Set flag to 10-20% rollout
- QA all variants
- Verify tracking events

### 3. **Production Ramp**
- Start at 10% traffic
- Monitor for errors
- Increase to 50% after 24 hours
- Full rollout (100%) after 48 hours

### 4. **Analysis**
- Wait for statistical significance (PostHog shows this)
- Review session recordings
- Compare locale performance (en vs ar)
- Document learnings

### 5. **Shipping Winner**
- Update main codebase with winning variant
- Remove experiment code
- Mark experiment as "completed" in config
- Archive experiment in PostHog

---

## Troubleshooting

### Feature flag not loading
- Check PostHog API key in `.env.local`
- Verify PostHogProvider is wrapping the app
- Check browser console for errors
- Use PostHog debug mode: `posthog.debug()`

### Experiment exposure not tracking
- Verify useExperiment hook is called
- Check that variant is defined before rendering
- Look for "experiment_exposure" events in PostHog

### Conversion not attributed to experiment
- Ensure conversion event is fired after variant assignment
- Check event name matches primary metric in PostHog
- Verify user is in the experiment cohort

### Different results for en vs ar
- This is expected! Locales perform differently
- Analyze separately in PostHog (breakdown by locale)
- Consider running separate experiments per locale

---

## Metrics & Success Criteria

### Primary Metrics (Conversion Goals)
1. **Waitlist Signups** - Main conversion goal
2. **Demo Requests** - Secondary conversion
3. **Trial Starts** - External link clicks

### Secondary Metrics (Engagement)
1. **Hero CTA Click Rate** - % of visitors who click
2. **Scroll Depth** - % reaching 75%+
3. **Time on Page** - Average session duration
4. **Feature Exploration** - % interacting with demos

### Statistical Thresholds
- **Minimum sample size:** 1,000 users per variant
- **Minimum duration:** 7 days (capture weekly patterns)
- **Significance level:** 95% confidence (p < 0.05)
- **Minimum detectable effect:** 10% relative improvement

### Sample Size Calculator
PostHog auto-calculates, but rule of thumb:
- 10% baseline conversion → need ~2,500/variant for 20% lift
- 5% baseline conversion → need ~5,000/variant for 20% lift

---

## Resources

### Internal Documentation
- [CLAUDE.md](../CLAUDE.md) - AI assistant guidance
- [posthog-vs-mixpanel.md](./posthog-vs-mixpanel.md) - Platform comparison

### PostHog Documentation
- [Next.js Integration](https://posthog.com/docs/libraries/next-js)
- [Feature Flags](https://posthog.com/docs/feature-flags)
- [Experiments](https://posthog.com/docs/experiments)
- [React Hooks](https://posthog.com/docs/libraries/react)

### External Resources
- [Next.js App Router](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [A/B Testing Best Practices](https://posthog.com/blog/ab-testing-guide)

---

## Future Enhancements

### Planned Features
- [ ] Server-side feature flags (for SEO experiments)
- [ ] Middleware-based A/B routing (single URL, automatic splitting)
- [ ] Experiment variant preview mode (query param override)
- [ ] Automated experiment reports (Slack/email)
- [ ] Multi-page funnel experiments

### Under Consideration
- [ ] Personalization based on user properties
- [ ] Multivariate testing (test multiple elements simultaneously)
- [ ] Bandit algorithms (auto-optimize traffic to winners)
- [ ] Integration with ad platforms (Facebook, Google Ads)

---

## Contact

For questions about this architecture:
- Review [CLAUDE.md](../CLAUDE.md) for AI assistant guidance
- Check PostHog documentation
- Refer to experiment documentation in `/docs/experiments/` (when created)

---

**Last Updated:** October 9, 2025
**Version:** 1.0
**Status:** Active
