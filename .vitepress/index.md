# Wow AI Showcase

A comprehensive showcase of AI-powered landing page variants with A/B testing and analytics built with Next.js, PostHog, and VitePress.

## 🚀 What is Wow AI Showcase?

Wow AI Showcase is a modern web application that demonstrates different landing page variants for AI-powered products. It includes:

- **Multiple Landing Page Variants**: Different approaches to presenting AI products
- **A/B Testing Framework**: Built-in experiment management with PostHog integration
- **Analytics & Tracking**: Comprehensive user behavior tracking and experiment analysis
- **Internationalization**: Multi-language support (English/Arabic)
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, and more

## 🎯 Key Features

### Landing Page Variants
- **Signup Minimal**: Clean, focused signup experience
- **Signup Social Proof**: Social validation and testimonials
- **Signup Router**: Dynamic routing-based experiments

### Experiment System
- **Route-based Experiments**: Different pages for different variants
- **Component-based Experiments**: A/B testing within components
- **PostHog Integration**: Real-time analytics and experiment tracking
- **Automatic Variant Assignment**: Seamless user experience

### Analytics & Tracking
- **PostHog Analytics**: User behavior tracking
- **Experiment Metrics**: Conversion rates, engagement metrics
- **Real-time Dashboards**: Live experiment monitoring
- **Custom Events**: Track specific user actions

## 🏗️ Architecture

The project is built with a modern, scalable architecture:

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── (landing-variants)/  # Landing page variants
│   │   ├── brand/         # Brand assets
│   │   └── onboarding/    # User onboarding
├── components/            # Reusable UI components
├── experiments/           # Experiment configuration
├── i18n/                 # Internationalization
└── lib/                  # Utilities and configurations
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/edshadi/wowshowcase.git
   cd wowshowcase
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your PostHog project key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📊 Available Experiments

### Landing Page Variants
- **Minimal Signup** (`/en/signup-minimal`): Clean, distraction-free signup
- **Social Proof Signup** (`/en/signup-social-proof`): Social validation and testimonials
- **Router-based Signup** (`/en/signup-router`): Dynamic routing experiments

### Experiment Features
- **Automatic Variant Assignment**: Users are automatically assigned to variants
- **PostHog Tracking**: All interactions are tracked for analysis
- **Real-time Analytics**: Monitor experiment performance in real-time
- **Conversion Tracking**: Track signup rates and user engagement

## 🔧 Development

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm docs:dev` - Start VitePress documentation server
- `pnpm docs:build` - Build documentation

### Project Structure
- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **Analytics**: PostHog for experiment tracking
- **Internationalization**: next-intl for multi-language support
- **Documentation**: VitePress for comprehensive docs

## 📈 Analytics & Monitoring

The application includes comprehensive analytics:

- **User Behavior Tracking**: Page views, clicks, form submissions
- **Experiment Metrics**: Conversion rates, engagement metrics
- **Real-time Monitoring**: Live experiment performance
- **Custom Events**: Track specific user actions and conversions

## 🌍 Internationalization

Supports multiple languages:
- **English** (en) - Default language
- **Arabic** (ar) - RTL support included

## 📚 Documentation

This documentation covers:
- [Getting Started](/getting-started) - Setup and configuration
- [Experiments](/experiments/) - A/B testing framework
- [Landing Variants](/landing-variants/) - Available page variants
- [Analytics](/analytics/) - PostHog integration and tracking
- [API Reference](/api/) - Component and utility documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/edshadi/wowshowcase/blob/main/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/edshadi/wowshowcase/blob/main/LICENSE) file for details.

---

**Ready to get started?** Check out our [Getting Started Guide](/getting-started) or explore the [Available Experiments](/experiments/)!
