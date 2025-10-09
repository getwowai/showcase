# Analyzing Experiment Results Without PostHog Experiments UI

If PostHog's Experiments UI is broken/buggy, you can analyze your A/B test results using **Insights** instead. You get the same data and statistical rigor.

## Setup Required

### 1. Create Feature Flag (One-time)

**PostHog → Feature Flags → New Feature Flag**

- **Key**: `signup-landing-variant`
- **Type**: Multivariate
- **Variants**:
  - `control` - 33%
  - `minimal` - 33%
  - `social-proof` - 34%
- **Release conditions**: 100% of users
- **Save**

### 2. Your Code is Already Tracking

Your variant pages automatically track:
- `experiment_exposure` when page loads
- `waitlist_joined` when form submitted
- Both include `variant` property

No code changes needed!

---

## How to View Results

### Method 1: Funnel Analysis (Conversion Rate)

**Best for**: Comparing conversion rates between variants

**Steps**:
1. Go to **PostHog → Insights → New Insight**
2. Select **Funnel** type
3. Configure funnel:
   - **Step 1**: `experiment_exposure`
     - Add filter: `experiment_name = signup-variants-oct-2025`
   - **Step 2**: `waitlist_joined`
4. **Breakdown by**: `variant` (under "Breakdown" section)
5. Save as "Signup Variants Conversion Funnel"

**What you'll see**:
```
control:        45 → 5    (11.1% conversion)
minimal:        50 → 8    (16.0% conversion)
social-proof:   48 → 12   (25.0% conversion) ✅ Winner
```

### Method 2: Trends with Statistical Significance

**Best for**: Statistical significance and confidence intervals

**Steps**:
1. Go to **PostHog → Insights → New Insight**
2. Select **Trends** type
3. Add event: `waitlist_joined`
4. **Breakdown by**: `variant`
5. Click **⋮** (three dots) → **Add comparison**
   - This shows % change between variants with confidence intervals
6. Save as "Signup Variants - Conversions by Variant"

**What you'll see**:
- Line graph showing conversions over time per variant
- Statistical significance indicators
- Confidence intervals (±X%)

### Method 3: Dashboard (Recommended)

Create a dashboard with both views:

**PostHog → Dashboards → New Dashboard**: "Signup Variants Experiment"

Add these insights:
1. **Funnel**: Conversion rates by variant
2. **Trends**: Daily conversions by variant
3. **Trends**: `experiment_exposure` count (traffic validation)
4. **Funnel**: Time to convert by variant

---

## Calculating Statistical Significance

PostHog shows confidence intervals automatically in Trends view. For manual calculation:

### Sample Size Calculator

For **95% confidence** and **80% power**:

| Baseline | Minimum Detectable Effect | Sample Size per Variant |
|----------|---------------------------|-------------------------|
| 5%       | +2% (to 7%)              | ~3,000                  |
| 5%       | +3% (to 8%)              | ~1,400                  |
| 5%       | +5% (to 10%)             | ~500                    |
| 10%      | +5% (to 15%)             | ~800                    |

**When to call it**:
- ✅ You've reached minimum sample size
- ✅ One variant has 95%+ confidence interval
- ✅ At least 1-2 weeks of data (account for day-of-week effects)

---

## Daily Monitoring Checklist

### Week 1: Data Collection
- [ ] Check traffic is splitting evenly (~33% each)
- [ ] Verify `experiment_exposure` events are firing
- [ ] Verify `waitlist_joined` events are firing
- [ ] Look for any variant with >50% higher/lower conversion (early signal)

### Week 2+: Analysis
- [ ] Check sample sizes (need 500-3000+ per variant)
- [ ] Look at conversion rate trends (stable or fluctuating?)
- [ ] Check confidence intervals (overlapping or separated?)
- [ ] Consider secondary metrics (time on page, scroll depth)

### Decision Time
- [ ] Minimum sample size reached? (see table above)
- [ ] Clear winner with 95%+ confidence? (check Trends comparison)
- [ ] Results consistent across locales (EN vs AR)?
- [ ] Winner makes business sense? (not just statistical fluke)

**If yes to all**: Ship the winner! 🚀

---

## Troubleshooting

### Not seeing any data?
1. Check PostHog Activity tab - are events arriving?
2. Visit variant pages manually and submit forms
3. Check browser console for errors
4. Verify `NEXT_PUBLIC_POSTHOG_KEY` in `.env.local`

### Traffic not splitting evenly?
1. Check feature flag rollout % (should be ~33% each)
2. PostHog uses sticky bucketing - same user gets same variant
3. Try incognito/different browsers to see different variants

### Conversions seem too high/low?
1. Check for bots/test traffic in PostHog filters
2. Add filter: `$lib = web` (excludes server-side events)
3. Filter out internal IPs if needed

### Need Arabic (AR) specific results?
Add filter to your insights:
- Property: `locale`
- Operator: `equals`
- Value: `ar`

Save as separate insight for locale-specific analysis.

---

## When to Stop the Experiment

**Stop if**:
- ✅ Clear winner with 95%+ confidence AND minimum sample size
- ⚠️ No winner after 4 weeks AND 5,000+ samples per variant (variants perform the same)
- 🛑 One variant has <50% conversion of others (don't make users suffer)

**Don't stop if**:
- Results are trending but not significant (wait)
- Sample size is too small (wait)
- Only 1 week of data (account for weekly patterns)

---

## Next Steps After Finding a Winner

1. **Ship it**: Replace main landing with winning variant
2. **Document**: Update `EXPERIMENTS` config to `status: "completed"`
3. **Learn**: What made it win? Apply lessons to next experiment
4. **Iterate**: New hypothesis → new experiment

## Example Queries You Might Need

### Conversion Rate by Locale
```
Event: experiment_exposure → waitlist_joined (Funnel)
Breakdown: variant
Filter: locale = ar
```

### Time to Convert
```
Event: waitlist_joined (Trends)
Property: Time to convert (built-in)
Breakdown: variant
```

### Mobile vs Desktop Performance
```
Event: experiment_exposure → waitlist_joined (Funnel)
Breakdown: variant
Filter: $device_type
```

---

## Pro Tips

1. **Screenshot your results weekly** - helps visualize trends over time
2. **Export data to CSV** - for custom analysis or presentations
3. **Create alerts** - PostHog can notify you of anomalies
4. **Tag experiments** - Add `experiment: signup-variants-oct-2025` as event property for easy filtering later

You don't need the Experiments UI - Insights are actually more flexible! 💪
