# WOW AI Background-Adaptive Variants

Smart color adaptation system ensuring perfect brand visibility across any background.

## 🎨 Color Adaptation Logic

**Core Principle**: Replace background-matching colors with high-contrast alternatives using only our 3 brand colors.

### Brand Color Palette

- **Lime Green**: `#aedf1a` (Primary - Energy, Growth)
- **Sky Blue**: `#86c9e5` (Secondary - Trust, Technology)
- **Soft Charcoal**: `#4a5568` (Contrast - Professionalism)

## 🎯 Background-Specific Variants

### 🌟 Light Backgrounds (`light-bg/`)

**Backgrounds**: White, light gray, cream, off-white
**Strategy**: Use charcoal for maximum contrast

- **Flower**: All petals → **charcoal** (`#4a5568`)
- **Center**: **Lime green** (`#aedf1a`) for brand accent
- **Text**: **Charcoal** (`#4a5568`)

### 🌙 Dark Backgrounds (`dark-bg/`)

**Backgrounds**: Black, dark gray, dark blue, dark themes
**Strategy**: Use bright colors for visibility

- **Flower**: All petals → **lime green** (`#aedf1a`)
- **Center**: **Sky blue** (`#86c9e5`) for contrast
- **Text**: **Lime green** (`#aedf1a`) or white

### 🟢 Lime Green Backgrounds (`lime-bg/`)

**Backgrounds**: Lime green (`#aedf1a`) surfaces
**Strategy**: Replace lime with charcoal, keep blue

- **Flower**: Lime petals → **charcoal** (`#4a5568`), Blue petals → **sky blue** (`#86c9e5`)
- **Center**: **Charcoal** (`#4a5568`)
- **Text**: **Charcoal** (`#4a5568`)

### 🔵 Sky Blue Backgrounds (`blue-bg/`)

**Backgrounds**: Sky blue (`#86c9e5`) surfaces
**Strategy**: Replace blue with charcoal, keep lime

- **Flower**: Blue petals → **charcoal** (`#4a5568`), Lime petals → **lime green** (`#aedf1a`)
- **Center**: **Lime green** (`#aedf1a`)
- **Text**: **Charcoal** (`#4a5568`)

### ⚪ White Backgrounds (`white-bg/`)

**Backgrounds**: Pure white (`#ffffff`)
**Strategy**: Maximum contrast with charcoal

- **Flower**: All petals → **charcoal** (`#4a5568`)
- **Center**: **Lime green** (`#aedf1a`)
- **Text**: **Charcoal** (`#4a5568`)

## 🚀 Implementation Guide

### Quick Reference

```html
<!-- Match your background color -->
<img src="/brand-assets/variants/light-bg/wow-ai-primary-logo-light-bg.svg" />
<img src="/brand-assets/variants/dark-bg/wow-ai-primary-logo-dark-bg.svg" />
<img src="/brand-assets/variants/lime-bg/wow-ai-primary-logo-lime-bg.svg" />
<img src="/brand-assets/variants/blue-bg/wow-ai-primary-logo-blue-bg.svg" />
<img src="/brand-assets/variants/white-bg/wow-ai-primary-logo-white-bg.svg" />
```

### Use Case Matrix

| Background Type  | Variant Directory | Best For                        |
| ---------------- | ----------------- | ------------------------------- |
| **Light themes** | `light-bg/`       | Websites, light UI themes       |
| **Dark themes**  | `dark-bg/`        | Dark mode, night interfaces     |
| **Brand lime**   | `lime-bg/`        | Lime green sections, CTAs       |
| **Brand blue**   | `blue-bg/`        | Sky blue sections, headers      |
| **Pure white**   | `white-bg/`       | Print, documents, clean layouts |

## ✅ Quality Assurance

### Contrast Requirements

- **WCAG AA**: Minimum 4.5:1 contrast ratio
- **WCAG AAA**: Minimum 7:1 contrast ratio (preferred)
- **Test**: Use contrast checkers for validation

### Implementation Checklist

- [ ] Background color identified
- [ ] Correct variant selected
- [ ] Contrast ratio verified
- [ ] Accessibility standards met
- [ ] Cross-device testing completed

## 🤖 LLM Integration

**For AI Design Tools**: Always specify the background color when requesting logo implementation. Use this format:

```
"Use the [background-type]-bg variant of the WOW AI logo for [specific background color] backgrounds"
```

**Examples**:

- "Use the light-bg variant for white backgrounds"
- "Use the dark-bg variant for dark theme interfaces"
- "Use the lime-bg variant for lime green (#aedf1a) backgrounds"

## 📁 File Structure

```
variants/
├── light-bg/          # Light background variants
├── dark-bg/           # Dark background variants
├── lime-bg/           # Lime green background variants
├── blue-bg/           # Sky blue background variants
└── white-bg/          # White background variants
```

**Naming Convention**: `[original-name]-[background-type].svg`

---

_This adaptive system ensures consistent brand recognition with optimal visibility across all design contexts._
