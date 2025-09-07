# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is WOW AI Showcase - a Next.js marketing/landing page website for WOW AI (an AI-powered Salla & Zid Co-Pilot). This is the company's primary landing page that showcases the product and includes an interactive demo section. It's a simplified, public-facing website with no authentication or backend integration, focusing on converting visitors and demonstrating the product's capabilities through interactive experiences.

## Development Commands

```bash
# Development
pnpm dev              # Start development server on localhost:3000
npm run dev           # Alternative with npm

# Building & Production
pnpm build            # Build for production
pnpm start            # Start production server
npm run build         # Alternative with npm
npm start             # Alternative with npm

# Code Quality
pnpm lint             # Run Next.js linting
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without fixing
npm run lint          # Alternative with npm
npm run format        # Alternative with npm
npm run format:check  # Alternative with npm
```

## Architecture & Key Technologies

**Framework & Core:**

- Next.js 14 with App Router
- TypeScript with strict typing
- Uses pnpm as package manager (preferred over npm)

**Internationalization (i18n):**

- next-intl for internationalization with English/Arabic support
- Localized routing: `/en/...` and `/ar/...` paths
- RTL support for Arabic with custom fonts (Noto Sans Arabic)
- Translation files in `/messages/` directory (en.json, ar.json)
- Configuration in `src/i18n/config.ts`

**Styling & UI:**

- Tailwind CSS 4.x for styling
- Custom UI components built with Radix UI primitives
- Framer Motion for animations
- Components follow shadcn/ui patterns in `src/components/ui/`

**Project Structure:**

```
src/
├── app/
│   ├── layout.tsx              # Root layout (minimal, handles redirects)
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-aware layout with fonts & i18n
│   │   ├── page.tsx            # Landing page
│   │   └── onboarding/
│   │       └── page.tsx        # Interactive onboarding demo
│   └── globals.css
├── components/
│   ├── ui/                     # Reusable UI components (Button, Card, etc.)
│   └── lib/utils.ts            # Component utilities
├── i18n/config.ts              # i18n configuration
├── middleware.ts               # Next.js middleware for locale handling
└── shared/utils.ts             # Shared utility functions
```

## Key Implementation Details

**Internationalization Setup:**

- Middleware handles locale detection and routing
- Uses three fonts: Inter (Latin), JetBrains Mono (code), Noto Sans Arabic
- Dynamic metadata generation based on locale
- RTL/LTR direction switching based on language

**Component Architecture:**

- Custom UI components built on Radix UI primitives using shadcn/ui "new-york" style
- Configured with components.json for shadcn/ui CLI integration
- Utility-first approach with Tailwind CSS (zinc base color, CSS variables enabled)
- TypeScript interfaces for all component props
- Consistent naming conventions following shadcn/ui patterns
- Lucide React for icons

**Differences from Main WOW AI App:**

- No authentication (Clerk auth mentioned but not implemented here)
- No backend integration - purely static demonstrations
- External links direct to main application for user actions
- Simplified architecture focused on marketing content
