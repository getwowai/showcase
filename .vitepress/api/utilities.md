# Utilities

Helper functions and utilities for the Wow AI Showcase.

## 🎯 Available Utilities

### `trackEvent`

Track user events and conversions.

```typescript
import { trackEvent } from '@/experiments/tracking';

// Track button clicks
trackEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  page: '/signup',
});

// Track conversions
trackEvent('signup_completed', {
  variant: 'minimal',
  method: 'email',
  value: 0,
  currency: 'USD',
});
```

**Parameters:**

- `event` (string) - Event name
- `properties` (object) - Event properties

### `getVariant`

Get experiment variant assignment.

```typescript
import { getVariant } from '@/experiments/utilities';

const variant = getVariant('experiment-name');
console.log('Current variant:', variant);
```

**Parameters:**

- `experimentName` (string) - Experiment name

**Returns:**

- `variant` (string) - Current variant

### `formatCurrency`

Format currency values for display.

```typescript
import { formatCurrency } from '@/utils/format';

const price = formatCurrency(99.99, 'USD');
console.log(price); // "$99.99"
```

**Parameters:**

- `amount` (number) - Amount to format
- `currency` (string) - Currency code

**Returns:**

- `formatted` (string) - Formatted currency string

## 🔧 Advanced Utilities

### `validateEvent`

Validate event data before sending.

```typescript
import { validateEvent } from '@/experiments/validation';

const isValid = validateEvent('button_clicked', {
  button_name: 'signup',
  variant: 'minimal',
  timestamp: new Date().toISOString(),
});

if (!isValid) {
  console.warn('Invalid event data');
}
```

### `debounce`

Debounce function calls.

```typescript
import { debounce } from '@/utils/debounce';

const debouncedSearch = debounce((query: string) => {
  // Perform search
}, 300);

// Use in component
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  debouncedSearch(e.target.value);
};
```

### `throttle`

Throttle function calls.

```typescript
import { throttle } from '@/utils/throttle';

const throttledScroll = throttle(() => {
  // Handle scroll
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## 📊 Analytics Utilities

### `trackPageView`

Track page views automatically.

```typescript
import { trackPageView } from '@/experiments/tracking';

// Track page view
trackPageView('/signup', {
  variant: 'minimal',
  locale: 'en',
});
```

### `trackConversion`

Track conversion events.

```typescript
import { trackConversion } from '@/experiments/tracking';

// Track conversion
trackConversion('signup_completed', {
  variant: 'minimal',
  method: 'email',
  value: 100,
  currency: 'USD',
});
```

### `trackError`

Track JavaScript errors.

```typescript
import { trackError } from '@/experiments/tracking';

// Track error
trackError('javascript_error', {
  error_message: 'TypeError: Cannot read property of undefined',
  error_source: 'button-click-handler',
  variant: 'minimal',
});
```

## 🌍 Internationalization Utilities

### `getLocale`

Get current locale.

```typescript
import { getLocale } from '@/utils/locale';

const locale = getLocale();
console.log('Current locale:', locale); // 'en' or 'ar'
```

### `setLocale`

Set current locale.

```typescript
import { setLocale } from '@/utils/locale';

// Change to Arabic
setLocale('ar');

// Change to English
setLocale('en');
```

### `formatDate`

Format dates for current locale.

```typescript
import { formatDate } from '@/utils/date';

const date = new Date();
const formatted = formatDate(date, 'en'); // "January 1, 2024"
const formattedAr = formatDate(date, 'ar'); // "١ يناير ٢٠٢٤"
```

## 🔧 Development Utilities

### `debugLog`

Debug logging utility.

```typescript
import { debugLog } from '@/utils/debug';

debugLog('experiment', 'Variant assigned:', variant);
debugLog('analytics', 'Event tracked:', event);
```

### `isDevelopment`

Check if running in development mode.

```typescript
import { isDevelopment } from '@/utils/env';

if (isDevelopment()) {
  console.log('Development mode enabled');
}
```

### `getConfig`

Get configuration values.

```typescript
import { getConfig } from '@/utils/config';

const posthogKey = getConfig('NEXT_PUBLIC_POSTHOG_KEY');
const apiHost = getConfig('NEXT_PUBLIC_POSTHOG_HOST');
```

## 📚 Next Steps

- [Hooks](/api/hooks) - React hooks documentation
- [Components](/api/components) - Component API reference
- [Experiments System](/experiments/) - Learn about experiments

Ready to use utilities? Check out our [Experiments Guide](/experiments/)!
