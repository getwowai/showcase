# Getting Started

Welcome to Wow AI Showcase! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/edshadi/wowshowcase.git
cd wowshowcase
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional: Clerk Authentication (if using)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 4. Start Development Server

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser to see the application.

## Project Structure

```
wowshowcase/
├── .vitepress/              # VitePress documentation
├── docs/                    # Legacy documentation
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [locale]/        # Internationalized routes
│   │   │   ├── (landing-variants)/  # Landing page variants
│   │   │   │   ├── signup-minimal/
│   │   │   │   ├── signup-social-proof/
│   │   │   │   └── signup-router/
│   │   │   ├── brand/       # Brand assets
│   │   │   └── onboarding/  # User onboarding
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components
│   │   └── PostHogProvider.tsx
│   ├── experiments/         # Experiment configuration
│   │   ├── config.ts       # Experiment definitions
│   │   ├── hooks/          # Experiment hooks
│   │   └── tracking.ts     # Analytics tracking
│   ├── i18n/               # Internationalization
│   └── lib/                # Utilities
├── messages/               # Translation files
│   ├── en.json
│   └── ar.json
└── package.json
```

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start development server             |
| `pnpm build`      | Build for production                 |
| `pnpm start`      | Start production server              |
| `pnpm lint`       | Run ESLint                           |
| `pnpm docs:dev`   | Start VitePress documentation server |
| `pnpm docs:build` | Build VitePress documentation        |

## Configuration

### PostHog Setup

1. **Create a PostHog Account**
   - Go to [PostHog](https://posthog.com)
   - Sign up for a free account
   - Create a new project

2. **Get Your Project Key**
   - In your PostHog dashboard, go to Project Settings
   - Copy your Project API Key
   - Add it to your `.env.local` file

3. **Configure Tracking**
   - The app automatically tracks page views and user interactions
   - Custom events are defined in `src/experiments/tracking.ts`

### Internationalization

The app supports multiple languages:

- **English** (en) - Default
- **Arabic** (ar) - RTL support

Language files are located in the `messages/` directory.

## Development Workflow

### 1. Running the App

```bash
# Start development server
pnpm dev

# Start documentation server
pnpm docs:dev
```

### 2. Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### 3. Running Tests

```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

## Available Routes

### Landing Page Variants

- `/en/signup-minimal` - Minimal signup experience
- `/en/signup-social-proof` - Social proof variant
- `/en/signup-router` - Router-based experiments
- `/ar/signup-minimal` - Arabic version
- `/ar/signup-social-proof` - Arabic social proof
- `/ar/signup-router` - Arabic router variant

### Other Pages

- `/en/brand` - Brand assets showcase
- `/en/onboarding` - User onboarding flow
- `/en/posthog-test` - PostHog testing page

## Experiment System

The app includes a built-in experiment system:

### Route-based Experiments

Different landing page variants are served at different routes, allowing for easy A/B testing.

### Component-based Experiments

Components can be wrapped with experiment logic for more granular testing.

### Analytics Integration

All experiments are automatically tracked with PostHog for analysis.

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Make sure all dependencies are installed: `pnpm install`
   - Check for TypeScript errors: `pnpm type-check`

2. **PostHog Not Working**
   - Verify your PostHog key is correct in `.env.local`
   - Check the browser console for errors
   - Ensure PostHog is properly initialized

3. **Translation Issues**
   - Check that translation files exist in `messages/`
   - Verify locale configuration in `src/i18n/config.ts`

### Getting Help

- Check the [Issues](https://github.com/edshadi/wowshowcase/issues) page
- Review the [API Documentation](/api/)
- Explore the [Experiments Guide](/experiments/)

## Next Steps

Now that you have the app running, explore:

- [Experiments System](/experiments/) - Learn about A/B testing
- [Landing Variants](/landing-variants/) - Explore available variants
- [Analytics Setup](/analytics/) - Configure PostHog
- [API Reference](/api/) - Component documentation

Happy coding! 🚀
