# WOW AI Showcase Website

This is the marketing/showcase website for WOW AI - your AI-powered Salla & Shopify Co-Pilot.

## Overview

This Next.js application serves as the public-facing website that showcases the features and capabilities of WOW AI. It includes:

- **Landing Page**: Interactive marketing page with feature demonstrations
- **Onboarding Demo**: Step-by-step interactive demonstration of the WOW AI experience
- **Call-to-Actions**: Links to the main WOW AI application for user signup

## Features

- 🎨 Beautiful, modern UI with animations using Framer Motion
- 📱 Fully responsive design
- 🚀 Interactive onboarding demo showing AI agents in action
- 💫 Live feature demonstrations with real-time animations
- 🎯 Clear call-to-actions to drive user engagement

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Copy environment variables
cp env.local.example .env.local

# Run the development server
npm run dev
# or
pnpm dev
```

### Environment Variables

Copy `env.local.example` to `.env.local` and configure the following variables:

```bash
# Mixpanel Configuration (required for analytics)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_project_token

# Landing Page Variant (optional)
NEXT_PUBLIC_DEFAULT_LANDING_VARIANT=control
NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE=false
```

**Variant Options:**

- `control` - Original full landing page (default)
- `minimal` - Clean, focused signup page
- `social-proof` - Social validation variant

**Override Behavior:**

- `NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE=true` - Uses environment variable, ignores Mixpanel
- `NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE=false` - Uses Mixpanel for A/B testing

Open [http://localhost:3000](http://localhost:3000) to view the showcase website.

### Building for Production

```bash
# Build the application
npm run build
# or
pnpm build

# Start the production server
npm start
# or
pnpm start
```

## Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (simplified, no auth)
│   ├── page.tsx           # Landing page with feature demos
│   ├── onboarding/
│   │   └── page.tsx       # Interactive onboarding demo
│   ├── globals.css        # Global styles
│   └── favicon.ico        # App icon
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── progress.tsx
│   └── lib/
│       └── utils.ts       # Utility functions
└── shared/
    └── utils.ts           # Shared utilities
```

## Key Differences from Main App

This showcase website is intentionally simplified compared to the main WOW AI application:

- **No Authentication**: No Clerk auth integration - purely public-facing
- **No Backend Integration**: Static demonstrations rather than real data
- **Focused Content**: Only marketing and demo content
- **External Links**: Directs users to the main application for signup/login

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Deployment

This app can be deployed to any platform that supports Next.js, such as:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## License

Private repository - all rights reserved.
