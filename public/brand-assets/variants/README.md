# WOW AI Brand Assets - Background Adaptive Variants

This directory contains background-specific variants of our brand assets to ensure optimal visibility and contrast across different use cases.

## Color Adaptation System

Our brand uses **3 core colors** that adapt based on background:

- **Lime Green**: `#aedf1a` (Primary)
- **Sky Blue**: `#86c9e5` (Secondary)
- **Soft Charcoal**: `#4a5568` (Text/Contrast)

## Background-Specific Variants

### 🌟 **Light Backgrounds** (`light-bg/`)

**Use for**: White, light gray, cream backgrounds

- **Flower**: All petals in **charcoal** (`#4a5568`)
- **Center**: **Lime green** (`#aedf1a`)
- **Text**: **Charcoal** (`#4a5568`)

### 🌙 **Dark Backgrounds** (`dark-bg/`)

**Use for**: Black, dark gray, dark blue backgrounds

- **Flower**: All petals in **lime green** (`#aedf1a`)
- **Center**: **Sky blue** (`#86c9e5`)
- **Text**: **White** or **lime green** (`#aedf1a`)

### 🟢 **Lime Green Backgrounds** (`lime-bg/`)

**Use for**: Lime green (`#aedf1a`) backgrounds

- **Flower**: Lime petals → **charcoal** (`#4a5568`), Blue petals → **sky blue** (`#86c9e5`)
- **Center**: **Charcoal** (`#4a5568`)
- **Text**: **Charcoal** (`#4a5568`)

### 🔵 **Sky Blue Backgrounds** (`blue-bg/`)

**Use for**: Sky blue (`#86c9e5`) backgrounds

- **Flower**: Blue petals → **charcoal** (`#4a5568`), Lime petals → **lime green** (`#aedf1a`)
- **Center**: **Lime green** (`#aedf1a`)
- **Text**: **Charcoal** (`#4a5568`)

### ⚪ **White Backgrounds** (`white-bg/`)

**Use for**: Pure white backgrounds

- **Flower**: All petals in **charcoal** (`#4a5568`)
- **Center**: **Lime green** (`#aedf1a`)
- **Text**: **Charcoal** (`#4a5568`)

## Usage Guidelines

### ✅ **DO:**

- Choose the variant that matches your background color
- Maintain consistent flower shape across all variants
- Use appropriate text colors for readability
- Test contrast ratios for accessibility

### ❌ **DON'T:**

- Mix variants on the same page/design
- Use original colors on matching backgrounds
- Ignore contrast requirements
- Create custom color combinations outside the 3-color system

## Implementation Examples

### Web Development

```html
<!-- Light background -->
<img src="/brand-assets/variants/light-bg/logo.svg" alt="WOW AI" />

<!-- Dark background -->
<img src="/brand-assets/variants/dark-bg/logo.svg" alt="WOW AI" />
```

### Print Materials

- **White paper**: Use `white-bg/` variants
- **Colored paper**: Use matching background variant
- **Dark paper**: Use `dark-bg/` variants

### Mobile Apps

- **Light theme**: Use `light-bg/` variants
- **Dark theme**: Use `dark-bg/` variants
- **Branded screens**: Use matching background variant

## File Naming Convention

All variant files follow this pattern:

```
[original-name]-[background-type].svg
```

Examples:

- `wow-ai-primary-logo-light-bg.svg`
- `wow-ai-app-icon-64px-dark-bg.svg`
- `wow-ai-favicon-16px-lime-bg.svg`

---

_This system ensures consistent brand recognition while maintaining optimal visibility across all use cases._
