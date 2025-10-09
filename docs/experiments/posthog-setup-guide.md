# PostHog Experiments Setup Guide

**Experiment:** Signup Landing Page Variants
**Last Updated:** October 9, 2025

---

## Overview

This guide walks you through setting up the signup variants experiment in PostHog using their Experiments feature. This will give you automatic statistical significance calculations and a clean dashboard.

---

## Step 1: Create Feature Flag

**1. Navigate to Feature Flags:**
- Go to `https://app.posthog.com` (or your PostHog host)
- Click **"Feature Flags"** in the left sidebar
- Click **"New feature flag"** button (top right)

**2. Fill in Basic Info:**

| Field | Value |
|-------|-------|
| **Key** | `signup-landing-variant` |
| **Name** | Signup Landing Variants |
| **Description** | Testing minimal vs social proof signup pages |

**3. Add Variants:**

Click **"Add variant"** button 3 times and fill in:

| Variant # | Key | Value | Description |
|-----------|-----|-------|-------------|
| Variant 1 | `control` | `control` | Main landing page |
| Variant 2 | `minimal` | `minimal` | Minimal signup page |
| Variant 3 | `social-proof` | `social-proof` | Social proof heavy page |

**4. Set Release Conditions:**
- Select: **"Roll out to a percentage of users"**
- **Rollout percentage:** `100%`
- **Distribution:** Leave as "Evenly split" (PostHog will do 33.3% each automatically)

**5. Advanced (Optional):**
- **Persist flag across authentication:** ✅ Enabled (recommended)
- **Ensure experience continuity:** ✅ Enabled (users see same variant every time)

**6. Save:**
- Click **"Save"** button (bottom right)
- Feature flag is now live!

---

## Step 2: Create Experiment

**1. Navigate to Experiments:**
- Click **"Experiments"** in the left sidebar
- Click **"New experiment"** button

**2. Fill in Basic Info:**

| Field | Value |
|-------|-------|
| **Name** | Signup Landing Page Variants |
| **Feature flag** | Select `signup-landing-variant` from dropdown |
| **Description** | Testing whether minimal design or social proof increases signup conversion rate |

**3. Configure Variants:**

The variants from your feature flag should auto-populate:
- ✅ Control
- ✅ Minimal
- ✅ Social-proof

**4. Set Primary Metric (Goal):**

| Field | Value |
|-------|-------|
| **Goal type** | Conversion rate |
| **Event name** | `waitlist_joined` |
| **Conversion window** | 7 days (default) |

**5. Add Secondary Metrics:**

Click **"Add secondary metric"** for each:

| Metric # | Event Name | Type |
|----------|------------|------|
| 1 | `hero_cta_clicked` | Count |
| 2 | `scroll_depth` | Count |
| 3 | `experiment_exposure` | Count (to verify tracking) |

**6. Sample Size & Duration:**

PostHog will auto-calculate:
- **Recommended sample size:** ~1,000 users per variant
- **Recommended duration:** 7-14 days
- **Significance level:** 95% (default)

You can adjust these if needed, but defaults are good!

**7. Launch:**
- Review all settings
- Click **"Launch experiment"** button
- Experiment is now live! 🎉

---

## Step 3: Verify Tracking

**1. Test each variant:**

Open these URLs in your browser:
```
http://localhost:3001/en/signup-minimal
http://localhost:3001/en/signup-social-proof
http://localhost:3001/en  (control)
```

**2. Check browser console (F12):**
- You should see PostHog events being logged
- Look for: `experiment_exposure` and `waitlist_joined`

**3. Verify in PostHog Activity:**
- Go to PostHog → **Activity** tab
- Filter by: `experiment_exposure`
- Click on an event to see properties:
  - `variant`: "minimal" or "social-proof" or "control"
  - `experiment_name`: "signup-variants-oct-2025"

**4. Check Experiment Dashboard:**
- Go to PostHog → **Experiments**
- Click on your experiment
- You should see:
  - **Exposures by variant** (counts)
  - **Conversions by variant** (counts)
  - **Conversion rate** (will show after some data)
  - **Statistical significance** (needs ~1,000 users/variant)

---

## Step 4: Drive Traffic

Now that PostHog is set up, you need to drive traffic to test the variants.

### Option A: Manual URL Routing (Simplest)

Point different traffic sources to different URLs:

| Traffic Source | URL | Variant |
|----------------|-----|---------|
| Google Ads Campaign A | `/en/signup-minimal` | Minimal |
| Facebook Ads Campaign B | `/en/signup-social-proof` | Social Proof |
| Organic / Direct | `/en` | Control |

**Pros:** Easy to set up, clear attribution
**Cons:** Need separate campaigns

### Option B: Automatic Router (Using Feature Flag)

Use the signup-router page I created:

1. **Direct all traffic to:** `/en/signup-router`
2. **PostHog will:**
   - Assign variant automatically (33% each)
   - Redirect user to correct page
   - Track exposure
3. **Users see consistent experience** (same variant every visit)

**Pros:** Single URL, automatic splitting
**Cons:** Slight redirect delay

### Option C: Middleware (Advanced)

Implement automatic routing at the middleware level (see docs/route-based-experiments.md for code).

**Pros:** No redirect, seamless UX
**Cons:** More complex to set up

---

## Step 5: Monitor Results

### PostHog Experiment Dashboard

Go to **PostHog → Experiments → Signup Landing Page Variants**

You'll see:

**1. Overview:**
- Experiment status (Running)
- Days running
- Total participants
- Variants being tested

**2. Results Table:**

| Variant | Exposures | Conversions | Conversion Rate | Improvement | Significance |
|---------|-----------|-------------|-----------------|-------------|--------------|
| Control | 1,234 | 123 | 10.0% | - | - |
| Minimal | 1,256 | 151 | 12.0% | +20% | 92% |
| Social Proof | 1,245 | 174 | 14.0% | +40% | 98% ✅ |

**3. Charts:**
- Conversion rate over time
- Cumulative conversions
- Statistical power

**4. Secondary Metrics:**
- CTA clicks by variant
- Scroll depth by variant

### When to Ship a Winner?

PostHog will show you:
- ✅ **Significant** - Green checkmark when variant wins with >95% confidence
- ⚠️ **Trending** - Yellow when variant is leading but not significant yet
- ❌ **Losing** - Red when variant is underperforming

**Ship when:**
1. ✅ Variant has green checkmark (>95% significance)
2. ✅ Minimum 1,000 users per variant
3. ✅ Ran for at least 7 days (capture weekly patterns)

---

## Step 6: Ship the Winner

Once you have a winner:

**1. Update main landing page:**
```bash
# If "social-proof" won:
# Copy the winning design to your main landing page
cp src/app/[locale]/(landing-variants)/signup-social-proof/page.tsx \
   src/app/[locale]/page.tsx
```

**2. Stop the experiment:**
- Go to PostHog → Experiments → Your Experiment
- Click **"Stop experiment"**
- Select winning variant
- Click **"Archive"**

**3. Update feature flag:**
- Go to PostHog → Feature Flags → `signup-landing-variant`
- Set to 100% winning variant
- Or delete the flag entirely

**4. Clean up code:**
- Remove experiment tracking from variant pages
- Update docs/experiments/config.ts to mark as "completed"
- Document learnings

**5. Plan next experiment!** 🚀

---

## Troubleshooting

### Events not appearing in PostHog?

**Check:**
1. `.env.local` has correct PostHog API key
2. Browser console shows PostHog initialized
3. Network tab shows requests to PostHog (look for `/decide` and `/e`)
4. Wait 10-15 seconds (PostHog batches events)

**Fix:**
- Verify API key: `echo $NEXT_PUBLIC_POSTHOG_KEY`
- Check PostHog debug logs in console
- Try incognito window (clear cache)

### Experiment shows 0 participants?

**Check:**
1. Experiment is "Running" status
2. Feature flag is enabled and rolled out to 100%
3. Events have correct `variant` property
4. Using correct event names (`waitlist_joined` not `waitlist-joined`)

**Fix:**
- Go to Activity tab, search for `experiment_exposure` events
- Click event → verify properties match experiment setup
- Check that conversion events have same properties

### Variants not splitting evenly?

**Check:**
- Feature flag distribution is "Evenly split"
- Rollout percentage is 100%
- Users aren't being filtered by targeting rules

**Fix:**
- Edit feature flag → Verify distribution settings
- Remove any targeting rules that might exclude users

### Can't see statistical significance?

**Need:**
- Minimum ~1,000 users per variant
- Minimum 7 days of data
- Measurable difference in conversion rates

**Be patient!** Significance requires time and sample size.

---

## Resources

- [PostHog Experiments Docs](https://posthog.com/docs/experiments)
- [PostHog Feature Flags Docs](https://posthog.com/docs/feature-flags)
- [Internal: Testing Guide](./signup-variants-test-guide.md)
- [Internal: Route-Based Experiments](../route-based-experiments.md)

---

## Quick Reference

**PostHog URLs:**
- Dashboard: `https://app.posthog.com`
- Feature Flags: `https://app.posthog.com/feature_flags`
- Experiments: `https://app.posthog.com/experiments`
- Activity: `https://app.posthog.com/events`

**Experiment Details:**
- **Flag Key:** `signup-landing-variant`
- **Variants:** control, minimal, social-proof
- **Primary Metric:** `waitlist_joined`
- **Secondary Metrics:** `hero_cta_clicked`, `scroll_depth`

**Test URLs:**
- Control: `http://localhost:3001/en`
- Minimal: `http://localhost:3001/en/signup-minimal`
- Social Proof: `http://localhost:3001/en/signup-social-proof`
- Auto-router: `http://localhost:3001/en/signup-router`

---

**Last Updated:** October 9, 2025
**Status:** Ready to Launch
