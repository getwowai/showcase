# Landing Variants

The Wow AI Showcase includes multiple landing page variants designed to test different approaches to presenting AI-powered products. Each variant is optimized for specific user behaviors and conversion goals.

## 🎯 Available Variants

### 1. Signup Minimal (`/en/signup-minimal`)
**Focus**: Clean, distraction-free signup experience

**Key Features:**
- Minimal design with maximum focus
- Single call-to-action
- Streamlined form
- Trust indicators only

**Best For:**
- Users who prefer simplicity
- High-intent visitors
- Mobile-first experiences
- Quick conversions

### 2. Signup Social Proof (`/en/signup-social-proof`)
**Focus**: Social validation and testimonials

**Key Features:**
- Customer testimonials
- Trust badges and logos
- Social proof statistics
- User-generated content

**Best For:**
- New users who need validation
- B2B audiences
- Trust-sensitive products
- Social media traffic

### 3. Signup Router (`/en/signup-router`)
**Focus**: Dynamic routing and progressive disclosure

**Key Features:**
- Multi-step process
- Interactive components
- Dynamic content loading
- Progress indicators

**Best For:**
- Complex products
- Users who need guidance
- Feature-rich applications
- Educational content

## 🏗️ Technical Implementation

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

### Component Architecture

Each variant uses a consistent component structure:

```typescript
// Common structure for all variants
export default async function LandingPage() {
  const t = await getTranslations('homepage')
  
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <SignupForm />
      <Footer />
    </div>
  )
}
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

/* Secondary Colors */
--secondary-50: #f8fafc;
--secondary-500: #64748b;
--secondary-900: #0f172a;

/* Accent Colors */
--accent-50: #f0f9ff;
--accent-500: #06b6d4;
--accent-900: #164e63;
```

### Typography

```css
/* Font Families */
--font-primary: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--font-arabic: 'Noto Sans Arabic', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

### Spacing System

```css
/* Spacing Scale */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Mobile Optimization

- **Touch-friendly buttons** (minimum 44px)
- **Readable text** (minimum 16px)
- **Fast loading** (optimized images)
- **Swipe gestures** (where appropriate)

## 🌍 Internationalization

### Supported Languages

- **English** (en) - Default language
- **Arabic** (ar) - RTL support included

### RTL Support

Arabic variant includes:

```css
/* RTL-specific styles */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .flex {
  flex-direction: row-reverse;
}
```

### Translation Files

```json
// messages/en.json
{
  "homepage": {
    "title": "AI-Powered Business Solutions",
    "subtitle": "Transform your business with intelligent automation",
    "cta": "Get Started Free"
  }
}

// messages/ar.json
{
  "homepage": {
    "title": "حلول الأعمال المدعومة بالذكاء الاصطناعي",
    "subtitle": "حوّل عملك بالذكاء الاصطناعي",
    "cta": "ابدأ مجاناً"
  }
}
```

## 🚀 Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image'

// Optimized images with Next.js
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

```typescript
// Lazy load components
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})
```

### Bundle Optimization

- **Tree shaking** - Remove unused code
- **Code splitting** - Load only what's needed
- **Compression** - Gzip/Brotli compression
- **Caching** - Browser and CDN caching

## 📊 Analytics Integration

### Event Tracking

Each variant tracks specific events:

```typescript
// Track page views
posthog.capture('$pageview', {
  variant: 'minimal',
  page: '/en/signup-minimal'
})

// Track button clicks
posthog.capture('button_clicked', {
  button_name: 'get_started',
  variant: 'minimal',
  location: 'hero'
})

// Track form submissions
posthog.capture('form_submitted', {
  form_name: 'signup',
  variant: 'minimal',
  success: true
})
```

### Conversion Tracking

```typescript
// Track conversions
posthog.capture('conversion', {
  event: 'signup_completed',
  variant: 'minimal',
  value: 0,
  currency: 'USD'
})
```

## 🔧 Customization

### Theme Customization

```typescript
// Custom theme configuration
const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#06b6d4'
  },
  fonts: {
    primary: 'Inter',
    secondary: 'JetBrains Mono'
  }
}
```

### Component Customization

```typescript
// Custom component props
interface LandingPageProps {
  variant: 'minimal' | 'social-proof' | 'router'
  theme?: 'light' | 'dark'
  locale?: 'en' | 'ar'
  customContent?: React.ReactNode
}
```

## 🎯 A/B Testing

### Variant Assignment

```typescript
// Assign users to variants
const getVariant = (userId: string) => {
  const hash = hashUserId(userId)
  const bucket = hash % 100
  
  if (bucket < 33) return 'minimal'
  if (bucket < 66) return 'social-proof'
  return 'router'
}
```

### Traffic Allocation

```typescript
// Configure traffic allocation
const trafficAllocation = {
  minimal: 0.33,        // 33% of traffic
  socialProof: 0.33,    // 33% of traffic
  router: 0.34          // 34% of traffic
}
```

## 📈 Performance Metrics

### Key Metrics

- **Conversion Rate** - Signup completions
- **Engagement Rate** - Time spent, scroll depth
- **Bounce Rate** - Users who leave immediately
- **Click-through Rate** - Button clicks, link clicks

### Monitoring

- **Real-time Analytics** - PostHog dashboards
- **Performance Monitoring** - Core Web Vitals
- **Error Tracking** - JavaScript errors
- **User Feedback** - Surveys and feedback forms

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

### 3. Add Analytics Tracking

```typescript
// Track events for new variant
posthog.capture('$pageview', {
  variant: 'new-variant',
  page: '/en/signup-new-variant'
})
```

## 📚 Next Steps

- [Experiments System](/experiments/) - Learn about A/B testing
- [Analytics Setup](/analytics/) - Configure PostHog
- [API Reference](/api/) - Component documentation
- [Getting Started](/getting-started) - Setup and configuration

Ready to explore the variants? Check out our [Quick Start Guide](/getting-started) or dive into the [Experiments System](/experiments/)!
