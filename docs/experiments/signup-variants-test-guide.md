# Signup Variants Experiment - Testing Guide

**Experiment ID:** signup-variants-oct-2025
**Date Created:** October 9, 2025
**Status:** Ready for Testing

---

## Overview

Testing two signup-focused landing page variants against the control (main landing page).

### Hypothesis
Social proof variant will convert better than minimal variant by reducing anxiety and building trust through testimonials, ratings, and trust signals.

### Variants

1. **Control** - Existing main landing page
   - URL: `http://localhost:3001/en` or `/ar`
   - Current production page with all features

2. **Minimal** - Clean, distraction-free signup
   - URL: `http://localhost:3001/en/signup-minimal` or `/ar/signup-minimal`
   - Minimal design, single CTA, 3 key benefits only
   - Focus: Reduce cognitive load

3. **Social Proof** - Trust-heavy signup
   - URL: `http://localhost:3001/en/signup-social-proof` or `/ar/signup-social-proof`
   - 5-star rating, testimonials, trust badges, stats
   - Focus: Build credibility and reduce anxiety

---

## Local Testing Checklist

### ✅ Page Load Tests

**Minimal Variant:**
- [ ] Visit `http://localhost:3001/en/signup-minimal`
- [ ] Page loads without errors
- [ ] WOW AI logo appears
- [ ] Headline and description are visible
- [ ] Email form is present and styled correctly
- [ ] "Join Waitlist" button works
- [ ] 3 benefits displayed with emojis
- [ ] Minimal footer present

**Social Proof Variant:**
- [ ] Visit `http://localhost:3001/en/signup-social-proof`
- [ ] Page loads without errors
- [ ] Header with user count appears
- [ ] 5-star rating visible
- [ ] Testimonial card displays correctly
- [ ] Trust badges render properly
- [ ] Signup form on the right side
- [ ] Benefits list with checkmarks
- [ ] Social proof avatars appear
- [ ] Stats section (5,000+, $2M+, 98%) displays

### ✅ Interaction Tests

**Both Variants:**
- [ ] Click in email field - cursor appears
- [ ] Type email - text appears
- [ ] Click "Join Waitlist" button
- [ ] Loading state shows
- [ ] Success message appears after 1 second
- [ ] Checkmark icon displays
- [ ] External link opens to accounts.getwow.ai/waitlist

### ✅ Tracking Tests

**Open Browser Console** (F12 or Cmd+Option+I)

**Minimal Variant:**
- [ ] See "PostHog initialized in debug mode" in console
- [ ] See `experiment_exposure` event with:
  - `variant: "minimal"`
  - `experiment_name: "signup-variants-oct-2025"`
- [ ] After form submit, see `waitlist_joined` event with:
  - `variant: "minimal"`
  - `source: "hero-form"`

**Social Proof Variant:**
- [ ] See `experiment_exposure` event with:
  - `variant: "social-proof"`
- [ ] After form submit, see `waitlist_joined` event with:
  - `variant: "social-proof"`

### ✅ PostHog Dashboard Verification

1. **Go to PostHog → Activity**
2. **Filter by events:**
   - Search for `experiment_exposure`
   - Should see events with `variant: "minimal"` and `variant: "social-proof"`
3. **Click on an event to see properties:**
   - `locale: "en"` or `"ar"`
   - `page_path: "/en/signup-minimal"` or `"/en/signup-social-proof"`
   - `experiment_name: "signup-variants-oct-2025"`
4. **Submit a form and verify:**
   - `waitlist_joined` event appears
   - Has correct `variant` property
   - Has `source: "hero-form"` or `"hero-form-social-proof"`

### ✅ Mobile Responsiveness

**Both Variants:**
- [ ] Open browser DevTools → Toggle device toolbar
- [ ] Test iPhone view (375px width)
- [ ] Test tablet view (768px width)
- [ ] Form is usable on mobile
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] No horizontal scrolling

### ✅ Arabic (RTL) Testing

**Both Variants:**
- [ ] Visit `/ar/signup-minimal`
- [ ] Page displays right-to-left
- [ ] Arabic text renders correctly
- [ ] Form is properly aligned
- [ ] Visit `/ar/signup-social-proof`
- [ ] Same RTL checks

---

## Expected Metrics

### Primary Metric
- **waitlist_joined** - Conversion rate for each variant

### Secondary Metrics
- **hero_cta_clicked** - CTA engagement
- **scroll_depth** - How far users scroll
- **time_on_page** - Average time spent
- **form_interaction** - Users who interact with email field

---

## Common Issues & Fixes

### Issue: Page shows error
**Fix:** Check browser console for errors. Likely missing translation key.

### Issue: PostHog not tracking
**Fix:**
1. Verify `.env.local` has PostHog keys
2. Check console for "PostHog initialized" message
3. Verify PostHogProvider is in layout.tsx

### Issue: Form submission doesn't work
**Fix:** Check console for JavaScript errors. Form should show loading state then success message.

### Issue: Arabic page not loading
**Fix:** Ensure translation keys exist in `/messages/ar.json`

---

## Next Steps After Testing

1. ✅ **Confirm all tests pass**
2. ✅ **Verify tracking in PostHog**
3. ✅ **Test both English and Arabic**
4. ✅ **Ready to drive traffic!**

### Driving Traffic Options

**Option 1: Manual URLs (Recommended for testing)**
- Share different URLs with different audiences
- Google Ads → `/en/signup-minimal`
- Facebook Ads → `/en/signup-social-proof`
- Organic traffic → `/en` (control)

**Option 2: Create PostHog Experiment**
1. Go to PostHog → Feature Flags → New Feature Flag
2. Key: `signup-landing-variant`
3. Variants: `control`, `minimal`, `social-proof`
4. Rollout: 100% (split evenly)
5. Go to Experiments → New Experiment
6. Select the feature flag
7. Primary metric: `waitlist_joined`
8. Start experiment

**Option 3: Middleware (Advanced)**
- Implement automatic traffic splitting in middleware
- Users automatically redirected to variants
- See `/docs/route-based-experiments.md` for code

---

## Success Criteria

**Minimum Sample Size:** 1,000 users per variant
**Minimum Duration:** 7 days
**Significance Level:** 95% confidence (p < 0.05)
**Target Improvement:** 20% increase in conversion rate

---

## Notes

- Both variants use real tracking (not test mode)
- Events appear in PostHog Activity within 5-10 seconds
- Session recordings capture all interactions
- Variants are fully i18n-compatible (en/ar)

---

**Last Updated:** October 9, 2025
**Created By:** Claude (AI Assistant)
