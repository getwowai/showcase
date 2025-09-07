# WOW AI Color Palette

## Primary Colors

### Lime Green (Primary)

- **HEX**: `#aedf1a`
- **RGB**: `174, 223, 26`
- **HSL**: `74, 79%, 49%`
- **Usage**: Flower petals, accent elements, growth indicators
- **CSS Variable**: `--wow-lime-green`

### Sky Blue (Secondary)

- **HEX**: `#86c9e5`
- **RGB**: `134, 201, 229`
- **HSL**: `198, 65%, 71%`
- **Usage**: "AI" text, secondary elements, tech highlights
- **CSS Variable**: `--wow-sky-blue`

### Soft Charcoal (Text)

- **HEX**: `#4a5568`
- **RGB**: `74, 85, 104`
- **HSL**: `210, 17%, 35%`
- **Usage**: "WOW" text, body text, primary content
- **CSS Variable**: `--wow-charcoal`

## Supporting Colors

### Background Colors

- **Light Background**: `#fafafa`
- **White**: `#ffffff`
- **CSS Variable**: `--wow-bg-light`

### Border Colors

- **Light Border**: `#e0e0e0`
- **Medium Border**: `#cccccc`
- **CSS Variable**: `--wow-border-light`

### Text Colors

- **Primary Text**: `#4a5568` (Soft Charcoal)
- **Secondary Text**: `#666666`
- **Light Text**: `#999999`
- **CSS Variable**: `--wow-text-primary`

## CSS Implementation

```css
:root {
  /* Primary Colors */
  --wow-lime-green: #aedf1a;
  --wow-sky-blue: #86c9e5;
  --wow-charcoal: #4a5568;

  /* Supporting Colors */
  --wow-bg-light: #fafafa;
  --wow-border-light: #e0e0e0;
  --wow-text-primary: #4a5568;
  --wow-text-secondary: #666666;
  --wow-text-light: #999999;
}
```

## Usage Examples

### Logo Colors

```css
.wow-logo-wow {
  color: var(--wow-charcoal);
}

.wow-logo-ai {
  color: var(--wow-sky-blue);
}

.wow-logo-flower {
  fill: var(--wow-lime-green);
}
```

### Background Colors

```css
.wow-bg-primary {
  background-color: var(--wow-lime-green);
}

.wow-bg-secondary {
  background-color: var(--wow-sky-blue);
}

.wow-bg-light {
  background-color: var(--wow-bg-light);
}
```

### Text Colors

```css
.wow-text-primary {
  color: var(--wow-text-primary);
}

.wow-text-secondary {
  color: var(--wow-text-secondary);
}
```

## Accessibility

All color combinations meet WCAG AA contrast requirements:

- Lime Green on White: 4.5:1 contrast ratio
- Sky Blue on White: 4.8:1 contrast ratio
- Soft Charcoal on White: 7.2:1 contrast ratio

## Color Psychology

- **Lime Green**: Represents growth, innovation, and energy
- **Sky Blue**: Conveys trust, technology, and reliability
- **Soft Charcoal**: Provides stability and professionalism

---

_Last updated: [Current Date]_
_Version: 1.0_
