# WOW AI Brand Assets

Complete brand asset library for WOW AI - optimized for modern web development, mobile apps, and AI-assisted design workflows.

## 🎨 Brand Identity

**WOW AI** represents innovation, growth, and intelligent solutions. Our visual identity centers around a distinctive flower symbol that embodies organic growth and technological advancement.

### Core Brand Colors

- **Lime Green (Primary)**: `#aedf1a` - Energy, growth, innovation
- **Sky Blue (Secondary)**: `#86c9e5` - Trust, clarity, technology
- **Soft Charcoal (Text)**: `#4a5568` - Professionalism, readability

## 📁 Asset Structure

```
brand-assets/
├── logos/                    # Logo system
│   ├── primary/             # Main brand logo
│   ├── secondary/           # Alternative logo variant
│   └── sizes/               # Responsive logo sizes
├── icons/                   # Icon system
│   ├── app/                # App store icons (64px)
│   ├── standard/           # UI icons (32px)
│   └── favicon/            # Browser favicon (16px)
└── variants/               # Background-adaptive variants
    ├── light-bg/           # Light background variants
    ├── dark-bg/            # Dark background variants
    ├── lime-bg/            # Lime green background variants
    ├── blue-bg/            # Sky blue background variants
    └── white-bg/           # White background variants
```

## 🚀 Quick Implementation Guide

### Web Development

```html
<!-- Primary logo for most use cases -->
<img src="/brand-assets/logos/primary/wow-ai-primary-logo.svg" alt="WOW AI" />

<!-- Header/navigation logo -->
<img src="/brand-assets/logos/sizes/wow-ai-header-120px.svg" alt="WOW AI" />

<!-- Favicon -->
<link rel="icon" href="/brand-assets/icons/favicon/wow-ai-favicon-16px.svg" />
```

### Mobile Apps

- **App Icon**: `/brand-assets/icons/app/wow-ai-app-icon-64px.svg`
- **UI Elements**: `/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg`

### Background-Adaptive Usage

```html
<!-- Light backgrounds -->
<img src="/brand-assets/variants/light-bg/wow-ai-primary-logo-light-bg.svg" />

<!-- Dark backgrounds -->
<img src="/brand-assets/variants/dark-bg/wow-ai-primary-logo-dark-bg.svg" />
```

## 📐 Design Specifications

### Logo Usage Rules

- **Minimum clear space**: 20px around logo
- **Minimum size**: 80px width for readability
- **Aspect ratio**: Always maintain original proportions
- **Background**: Use appropriate variant for contrast

### Typography

- **Primary font**: Arial, sans-serif
- **Weight**: 900 (Extra Bold)
- **Letter spacing**: -1.8px for "WOW", -0.5px for "AI"

### Flower Symbol

- **Shape**: 8 elliptical petals + center circle
- **Colors**: Alternating lime green and sky blue
- **Scaling**: Maintains detail down to 16px
- **Background adaptation**: Use variants for optimal contrast

## 🎯 Asset Selection Matrix

| Use Case            | Recommended Asset               | Background Variant       |
| ------------------- | ------------------------------- | ------------------------ |
| **Website Header**  | `wow-ai-header-120px.svg`       | Match page background    |
| **Mobile App**      | `wow-ai-app-icon-64px.svg`      | Built-in (sky blue)      |
| **UI Buttons**      | `wow-ai-standard-icon-32px.svg` | Built-in (charcoal)      |
| **Browser Tab**     | `wow-ai-favicon-16px.svg`       | Built-in (lime green)    |
| **Print Materials** | `wow-ai-primary-logo.svg`       | White background variant |
| **Dark Mode**       | Primary logo                    | Dark background variant  |
| **Light Mode**      | Primary logo                    | Light background variant |

## ✅ Quality Checklist

### Before Implementation

- [ ] Correct asset selected for use case
- [ ] Appropriate background variant chosen
- [ ] Minimum size requirements met
- [ ] Clear space maintained around logo
- [ ] Colors match brand palette
- [ ] Accessibility contrast ratios verified

### Technical Requirements

- [ ] SVG format for scalability
- [ ] Optimized file sizes
- [ ] Cross-browser compatibility
- [ ] Mobile-responsive scaling
- [ ] High-DPI display support

---

## 🤖 LLM Design Assistant Prompt

_Use this prompt with AI design tools for consistent WOW AI brand implementation:_

```
You are designing for WOW AI, an innovative AI technology company. Follow these brand guidelines:

BRAND IDENTITY:
- Company: WOW AI (AI technology solutions)
- Personality: Innovative, professional, approachable, growth-oriented
- Visual style: Modern, clean, organic with technological precision

COLOR PALETTE (use exactly these hex codes):
- Primary: #aedf1a (Lime Green) - for CTAs, highlights, primary elements
- Secondary: #86c9e5 (Sky Blue) - for secondary actions, accents
- Text: #4a5568 (Soft Charcoal) - for body text, navigation
- Backgrounds: White (#ffffff), Light Gray (#f8f9fa), or brand colors

LOGO USAGE:
- Primary logo: /brand-assets/logos/primary/wow-ai-primary-logo.svg
- Header logo: /brand-assets/logos/sizes/wow-ai-header-120px.svg
- App icon: /brand-assets/icons/app/wow-ai-app-icon-64px.svg
- Favicon: /brand-assets/icons/favicon/wow-ai-favicon-16px.svg
- UI icon: /brand-assets/icons/standard/wow-ai-standard-icon-32px.svg

BACKGROUND-ADAPTIVE VARIANTS:
- Light backgrounds: /brand-assets/variants/light-bg/
- Dark backgrounds: /brand-assets/variants/dark-bg/
- Lime green backgrounds: /brand-assets/variants/lime-bg/
- Sky blue backgrounds: /brand-assets/variants/blue-bg/
- White backgrounds: /brand-assets/variants/white-bg/

DESIGN RULES:
1. Always maintain 20px clear space around logo
2. Use appropriate background variant for contrast
3. Minimum logo width: 80px for readability
4. Typography: Arial, 900 weight, -1.8px letter-spacing for "WOW"
5. Flower symbol: 8 elliptical petals, alternating lime/blue colors
6. No shadows, gradients, or effects on logo
7. Maintain original proportions - never stretch or distort

IMPLEMENTATION:
- Web: Use SVG format for scalability
- Mobile: Use app icon for app stores, standard icon for UI
- Print: Use white background variant
- Dark mode: Use dark background variant
- Light mode: Use light background variant

When implementing, always reference the exact asset paths provided and ensure proper contrast ratios for accessibility.
```

---

_Last updated: December 2024_
_Version: 2.0 - LLM Optimized_
