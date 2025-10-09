# Route-Based Experiments Guide

**Build completely custom landing pages for maximum flexibility**

---

## Overview

Route-based experiments give you **full control** to build entirely different landing pages without constraints from the existing page structure. Perfect for testing radically different approaches to conversion.

### When to Use Route-Based Experiments

✅ **Use route-based when you want to:**
- Test completely different page structures/layouts
- Experiment with unique user flows (e.g., multi-step vs single page)
- Try different messaging frameworks
- Build conversion-optimized pages from scratch
- Run major redesigns safely alongside current page
- Work on multiple variants in parallel (different team members)

❌ **Use component-based instead when:**
- Testing small changes (headline, CTA button, colors)
- Want to reuse most of the existing page
- Need quick iterations

---

## Implementation Pattern

### 1. Create Separate Pages

Each variant gets its own route under `(landing-variants)` group:

```
src/app/[locale]/
├── page.tsx                          # Control (existing landing)
└── (landing-variants)/               # Route group (doesn't add to URL)
    ├── layout.tsx                    # Optional: shared layout
    ├── signup/
    │   └── page.tsx                  # /en/signup variant
    ├── demo-first/
    │   └── page.tsx                  # /en/demo-first variant
    ├── minimal/
    │   └── page.tsx                  # /en/minimal variant
    └── social-proof/
        └── page.tsx                  # /en/social-proof variant
```

**URLs:**
- Control: `https://wowshowcase.com/en`
- Signup variant: `https://wowshowcase.com/en/signup`
- Demo variant: `https://wowshowcase.com/en/demo-first`

---

### 2. Build Your Custom Page

**Complete freedom** - build anything you want:

```tsx
// src/app/[locale]/(landing-variants)/signup/page.tsx
'use client'

import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useTracking, EVENTS } from '@/experiments/tracking'

// Import ONLY what you need - no constraints
import { HeroWithInlineSignup } from '@/components/landing/heroes'
import { MinimalFeatureList } from '@/components/landing/features'
import { TrustBadges } from '@/components/landing/shared'
import { QuickCTA } from '@/components/landing/ctas'

export default function SignupLandingPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { trackEvent, trackConversion } = useTracking()

  // Track experiment exposure
  useEffect(() => {
    trackEvent('experiment_exposure', {
      experiment_name: 'landing-page-variants',
      variant: 'signup-focused',
      page_path: `/${locale}/signup`
    })
  }, [locale, trackEvent])

  const handleWaitlistJoin = () => {
    trackConversion(EVENTS.WAITLIST_JOINED, {
      variant: 'signup-focused',
      source: 'hero-inline-form'
    })
    // Handle signup...
  }

  return (
    <div className="min-h-screen">
      {/* Build your custom structure */}
      <HeroWithInlineSignup onSubmit={handleWaitlistJoin} />

      <section className="py-12">
        <MinimalFeatureList />
      </section>

      <TrustBadges />

      <QuickCTA onCTAClick={handleWaitlistJoin} />

      {/* No testimonials, no feature demos - your choice! */}
    </div>
  )
}
```

---

### 3. Create Metadata for SEO

```tsx
// src/app/[locale]/(landing-variants)/signup/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'landing.signup' })

  return {
    title: t('title'), // e.g., "Sign Up for WOW AI - Start Free"
    description: t('description'),
    // Prevent indexing if you don't want duplicate content
    robots: 'noindex, nofollow', // Optional
  }
}

export default function SignupLandingPage() {
  // ...
}
```

---

## Tracking & Analytics

### Automatic Tracking (Already Works)

PostHogProvider automatically tracks:
- ✅ Page views (with locale)
- ✅ URL changes
- ✅ Session recordings

### Manual Experiment Tracking

#### Track Exposure (Required)

```tsx
useEffect(() => {
  trackEvent('experiment_exposure', {
    experiment_name: 'landing-page-variants',
    variant: 'signup-focused',  // Unique identifier for this page
    page_path: `/${locale}/signup`
  })
}, [])
```

#### Track Conversions

```tsx
import { useTracking, EVENTS } from '@/experiments/tracking'

const { trackConversion, trackCTAClick } = useTracking()

// Track CTA clicks
<Button onClick={() => {
  trackCTAClick('Join Waitlist', 'hero-inline-form', {
    variant: 'signup-focused'
  })
}}>
  Join Now
</Button>

// Track conversions
<form onSubmit={(e) => {
  e.preventDefault()
  trackConversion(EVENTS.WAITLIST_JOINED, {
    variant: 'signup-focused',
    source: 'hero-inline-form'
  })
  // Handle form...
}}>
```

---

## Routing Traffic to Variants

### Option 1: Manual URLs (Simplest - Recommended)

Point different traffic sources to different URLs:

**Ad Campaigns:**
- Google Ads Campaign A → `https://wowshowcase.com/en/signup`
- Facebook Campaign B → `https://wowshowcase.com/en/demo-first`
- Organic traffic → `https://wowshowcase.com/en` (control)

**Pros:**
- ✅ Easy to implement (no code changes)
- ✅ Easy to QA (just visit URLs)
- ✅ Can test specific sources (paid vs organic)
- ✅ No user confusion (they get consistent experience)

**Cons:**
- ❌ Traffic not automatically split
- ❌ Need separate ad campaigns

---

### Option 2: Middleware-Based Routing (Advanced)

Automatically redirect users to variants:

```tsx
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only handle landing page
  if (request.nextUrl.pathname.match(/^\/(en|ar)$/)) {
    // Simple hash-based bucketing
    const userId = request.cookies.get('posthog_distinct_id')?.value || Math.random().toString()
    const hash = hashCode(userId)
    const bucket = Math.abs(hash) % 100

    // 33% control, 33% signup, 33% demo-first
    if (bucket < 33) {
      // Control - no redirect
      return NextResponse.next()
    } else if (bucket < 66) {
      // Redirect to signup variant
      const locale = request.nextUrl.pathname.split('/')[1]
      return NextResponse.redirect(new URL(`/${locale}/signup`, request.url))
    } else {
      // Redirect to demo-first variant
      const locale = request.nextUrl.pathname.split('/')[1]
      return NextResponse.redirect(new URL(`/${locale}/demo-first`, request.url))
    }
  }

  return NextResponse.next()
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}
```

**Pros:**
- ✅ Automatic traffic splitting
- ✅ Single entry URL
- ✅ Consistent user experience (same user always sees same variant)

**Cons:**
- ❌ More complex to implement
- ❌ Harder to QA (need to clear cookies to see different variants)
- ❌ Can't easily target specific sources

---

### Option 3: PostHog Feature Flags (Hybrid)

Use PostHog to assign variants, then redirect:

```tsx
// src/app/[locale]/page.tsx
'use client'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LandingPage() {
  const router = useRouter()
  const variant = useFeatureFlagVariantKey('landing-page-variant')
  const locale = useLocale()

  useEffect(() => {
    if (variant === 'signup-focused') {
      router.push(`/${locale}/signup`)
    } else if (variant === 'demo-first') {
      router.push(`/${locale}/demo-first`)
    }
    // control stays on this page
  }, [variant, locale, router])

  return <YourCurrentLandingPage />
}
```

**Pros:**
- ✅ PostHog handles bucketing
- ✅ Can use PostHog targeting rules
- ✅ Automatic significance testing

**Cons:**
- ❌ Causes client-side redirect (slight UX delay)
- ❌ More complex than manual URLs

---

## Analysis in PostHog

### Method 1: Compare by Variant Property

```
PostHog → Insights → New Insight

Event: waitlist_joined
Breakdown by: variant
Filter: page_path contains "/signup" OR "/demo-first" OR equals "/en"

Result: Conversion rate per variant
```

### Method 2: Create Custom Experiment

```
PostHog → Experiments → New Experiment

1. Create feature flag with variants:
   - control
   - signup-focused
   - demo-first

2. In your tracking code, manually set the flag:
   posthog.setPersonPropertiesForFlags({ variant: 'signup-focused' })

3. PostHog will auto-calculate significance
```

### Method 3: Manual Calculation

Track funnel per variant:

```
Funnel Steps:
1. experiment_exposure (filtered by variant)
2. hero_cta_clicked
3. waitlist_joined

Breakdown by: variant
```

---

## Example: Complete Route-Based Experiment

### Scenario: Test Signup-Focused Landing

**Goal:** Increase waitlist signups by 20%

**Hypothesis:** A landing page with an inline signup form and minimal distractions will convert better than the current feature-heavy page.

### 1. Create the Variant Page

```tsx
// src/app/[locale]/(landing-variants)/signup/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useTracking, EVENTS } from '@/experiments/tracking'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CheckCircle, Star, Users } from 'lucide-react'

export default function SignupFocusedLanding() {
  const t = useTranslations()
  const locale = useLocale()
  const { trackEvent, trackConversion, trackCTAClick } = useTracking()
  const [email, setEmail] = useState('')

  // Track exposure
  useEffect(() => {
    trackEvent('experiment_exposure', {
      experiment_name: 'landing-variants-oct-2025',
      variant: 'signup-focused'
    })
  }, [trackEvent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    trackConversion(EVENTS.WAITLIST_JOINED, {
      variant: 'signup-focused',
      source: 'hero-inline-form'
    })

    // Handle actual signup...
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Minimal header */}
      <header className="p-4">
        <WowLogo />
      </header>

      {/* Hero with inline signup */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          {t('landing.signup.hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('landing.signup.hero.subtitle')}
        </p>

        {/* Inline signup form */}
        <Card className="max-w-md mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder={t('landing.signup.form.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-lg"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full"
              onClick={() => trackCTAClick('Join Waitlist', 'hero-inline-form')}
            >
              {t('landing.signup.form.cta')}
            </Button>
          </form>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {t('landing.signup.badges.free')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {t('landing.signup.badges.users')}
            </span>
          </div>
        </Card>
      </section>

      {/* Minimal features - just 3 key points */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {['feature1', 'feature2', 'feature3'].map((key) => (
            <div key={key} className="text-center">
              <div className="text-4xl mb-2">✨</div>
              <h3 className="font-semibold mb-2">
                {t(`landing.signup.features.${key}.title`)}
              </h3>
              <p className="text-sm text-gray-600">
                {t(`landing.signup.features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof - minimal */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
        </div>
        <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
          "{t('landing.signup.testimonial.quote')}"
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {t('landing.signup.testimonial.author')}
        </p>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Button
          size="lg"
          onClick={() => {
            trackCTAClick('Join Waitlist', 'bottom-cta')
            document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {t('landing.signup.finalCta')}
        </Button>
      </section>
    </div>
  )
}
```

### 2. Document the Experiment

```typescript
// src/experiments/config.ts
export const EXPERIMENTS = {
  'landing-variants-oct-2025': {
    id: 'landing-variants-oct-2025',
    name: 'Landing Page Variants - Signup Focus',
    description: 'Testing signup-focused landing with inline form vs. current feature-heavy page',
    variants: ['control', 'signup-focused'],
    primaryMetric: 'waitlist_joined',
    secondaryMetrics: ['hero_cta_clicked', 'scroll_depth', 'time_on_page'],
    status: 'running',
    startDate: '2025-10-09',
    targetLocales: ['en', 'ar'],
    routes: {
      control: '/[locale]',
      'signup-focused': '/[locale]/signup',
    },
  }
}
```

### 3. Drive Traffic

**Week 1: Small test**
- Send 10% of paid traffic to `/en/signup`
- Monitor for errors, UX issues

**Week 2-3: Full test**
- 50/50 split: Half to control, half to `/en/signup`
- Need ~2,000 users per variant for significance

**Sources:**
- Google Ads → `/en/signup`
- Facebook Ads → `/en` (control)
- Or use middleware for automatic splitting

### 4. Analyze Results

```
PostHog → Insights

Metric: waitlist_joined conversion rate
- Control (/en): 3.2%
- Signup-focused (/en/signup): 4.8%
- Improvement: +50% (statistically significant!)

Secondary metrics:
- Time on page: -40% (faster decision)
- Scroll depth: -60% (less scrolling needed)
- Hero CTA click: +80% (more prominent)
```

### 5. Ship Winner

If signup-focused wins:
1. Update main landing page (`/[locale]/page.tsx`) with winning design
2. Redirect `/[locale]/signup` → `/[locale]`
3. Mark experiment as completed
4. Document learnings for future experiments

---

## Tips & Best Practices

### Do's ✅
- **Build radically different variants** - that's the whole point!
- **Track exposure immediately on mount** - don't wait for user interaction
- **Test with both locales** (en and ar)
- **Keep conversion tracking consistent** across all variants
- **Use clear variant names** in tracking ('signup-focused' not 'variant-a')
- **QA thoroughly** - visit URLs directly before sending traffic

### Don'ts ❌
- **Don't create too many variants** - 2-3 max per experiment
- **Don't forget to track exposure** - you'll lose attribution
- **Don't change variants mid-experiment** - invalidates results
- **Don't run multiple experiments simultaneously** - traffic split too thin
- **Don't peek at results early** - wait for significance
- **Don't forget mobile** - test responsive designs

---

## Troubleshooting

**Q: Variant page not showing?**
- Check route syntax: `(landing-variants)/signup/page.tsx`
- Verify no typos in folder names
- Try restarting dev server

**Q: Tracking not working?**
- Check PostHogProvider is in layout
- Verify `trackEvent` is called in useEffect
- Look for events in PostHog Activity tab

**Q: How do I preview a variant locally?**
- Just visit the URL: `http://localhost:3000/en/signup`
- No special configuration needed

**Q: Can I use server components?**
- Yes! Only tracking code needs 'use client'
- Put tracking in a client component wrapper

---

## Next Steps

1. ✅ Plan your first route-based experiment
2. ✅ Create variant page in `(landing-variants)/`
3. ✅ Add tracking (exposure + conversions)
4. ✅ Test locally by visiting URL
5. ✅ Drive traffic (ads, middleware, or manual)
6. ✅ Analyze in PostHog
7. ✅ Ship winner!

---

**See also:**
- [architecture.md](./architecture.md) - Complete system docs
- [SETUP.md](./SETUP.md) - PostHog setup guide
- [posthog-vs-mixpanel.md](./posthog-vs-mixpanel.md) - Platform comparison
