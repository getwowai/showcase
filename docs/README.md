# WOW AI Showcase - Documentation

Welcome to the documentation for WOW AI Showcase experimentation framework.

---

## Quick Start

**New to the project?** Start here:

1. 📚 [SETUP.md](./SETUP.md) - Get PostHog running in 5 minutes
2. 🏗️ [architecture.md](./architecture.md) - Understand the system
3. ⚖️ [posthog-vs-mixpanel.md](./posthog-vs-mixpanel.md) - Why PostHog?

---

## Documentation Index

### Getting Started

- **[SETUP.md](./SETUP.md)** - Quick setup guide for PostHog
  - Get API keys
  - Configure environment
  - Create your first experiment
  - Debug common issues

### Architecture

- **[architecture.md](./architecture.md)** - Complete system documentation
  - Architecture principles
  - Directory structure
  - Component library
  - Experiment workflow
  - i18n strategy
  - Best practices
  - Troubleshooting

- **[route-based-experiments.md](./route-based-experiments.md)** - Build custom landing pages
  - When to use route-based vs component-based
  - Complete implementation guide
  - Traffic routing strategies (manual URLs, middleware, feature flags)
  - Full example with code
  - Best practices and troubleshooting

### Platform Comparison

- **[posthog-vs-mixpanel.md](./posthog-vs-mixpanel.md)** - Why we chose PostHog
  - Feature comparison
  - Code complexity analysis
  - i18n handling
  - Implementation examples

---

## Key Concepts

### What is this framework?

A lightweight, scalable system for running landing page experiments on WOW AI Showcase. Built on PostHog for:
- A/B testing and multivariate experiments
- Feature flags and gradual rollouts
- Analytics and conversion tracking
- Session recordings and user insights

### Why PostHog?

- ✅ **All-in-one platform** (experiments + analytics + recordings)
- ✅ **Minimal code** (~100 lines vs 700+ for custom system)
- ✅ **i18n-friendly** (built-in locale tracking)
- ✅ **Free tier** includes experiments
- ✅ **Fast iteration** (create experiments without code deploys)

### Core Features

1. **Experiments** - Test different landing page variants
2. **Feature Flags** - Control rollouts, targeting, and visibility
3. **Analytics** - Track events, conversions, funnels
4. **Session Recordings** - See what users actually do
5. **i18n Support** - Automatic locale tracking (English/Arabic)

---

## File Structure

```
docs/
├── README.md                       # This file
├── SETUP.md                        # Quick setup guide
├── architecture.md                 # Complete system documentation
├── route-based-experiments.md      # Build custom landing pages guide
└── posthog-vs-mixpanel.md         # Platform comparison
```

---

## Common Tasks

### Creating an Experiment

1. PostHog UI: Create feature flag with variants
2. PostHog UI: Create experiment with metrics
3. Code: Document in `src/experiments/config.ts`
4. Code: Implement variants with `useExperiment()` hook
5. Track: Fire conversion events

**Detailed guide:** [architecture.md - Experiment Workflow](./architecture.md#experiment-workflow)

### Tracking Events

```typescript
import { useTracking, EVENTS } from '@/experiments/tracking'

const { trackConversion, trackCTAClick } = useTracking()

// Track CTA click
trackCTAClick('Join Waitlist', 'hero-section')

// Track conversion
trackConversion(EVENTS.WAITLIST_JOINED)
```

**All events:** [src/experiments/tracking.ts](../src/experiments/tracking.ts)

### Building Landing Page Variants

Create reusable sections in `src/components/landing/`:
- `heroes/` - Hero section variants
- `features/` - Feature section layouts
- `ctas/` - Call-to-action variants
- `testimonials/` - Social proof formats

**Component guidelines:** [architecture.md - Component Library](./architecture.md#component-library-structure)

---

## Resources

### Internal

- **[../CLAUDE.md](../CLAUDE.md)** - AI assistant guidance
- **[../README.md](../README.md)** - Project README
- **[../src/experiments/](../src/experiments/)** - Implementation code

### External

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Next.js Guide](https://posthog.com/docs/libraries/next-js)
- [PostHog Experiments](https://posthog.com/docs/experiments)
- [Next.js App Router](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

## Support

**Questions about:**
- **Setup?** → [SETUP.md](./SETUP.md)
- **Architecture?** → [architecture.md](./architecture.md)
- **Platform choice?** → [posthog-vs-mixpanel.md](./posthog-vs-mixpanel.md)
- **AI assistant?** → [../CLAUDE.md](../CLAUDE.md)

---

## Contributing

When adding experiments or features:

1. ✅ Document experiments in `src/experiments/config.ts`
2. ✅ Use standardized event names from `EVENTS` constants
3. ✅ Test both English and Arabic locales
4. ✅ Follow component guidelines in [architecture.md](./architecture.md)
5. ✅ Clean up experiment code after shipping winners

---

**Last Updated:** October 9, 2025
