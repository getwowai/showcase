import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Wow AI Showcase",
  description:
    "A comprehensive showcase of AI-powered landing page variants with A/B testing and analytics",

  vite: {
    css: {
      postcss: {
        plugins: [],
      },
    },
    resolve: {
      alias: {
        "@": "/Users/edshadi/Development/go/src/github.com/edshadi/wow/wowshowcase/src",
      },
    },
  },

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      { text: "Experiments", link: "/experiments/" },
      { text: "Landing Variants", link: "/landing-variants/" },
      { text: "Analytics", link: "/analytics/" },
      { text: "API Reference", link: "/api/" },
    ],

    sidebar: {
      "/": [
        {
          text: "Introduction",
          items: [
            { text: "What is Wow AI Showcase?", link: "/" },
            { text: "Features", link: "/features" },
            { text: "Architecture", link: "/architecture" },
          ],
        },
        {
          text: "Getting Started",
          items: [
            { text: "Quick Start", link: "/getting-started" },
            { text: "Installation", link: "/getting-started/installation" },
            { text: "Configuration", link: "/getting-started/configuration" },
            { text: "Development", link: "/getting-started/development" },
          ],
        },
        {
          text: "Experiments",
          items: [
            { text: "Overview", link: "/experiments/" },
            {
              text: "Route-based Experiments",
              link: "/experiments/route-based",
            },
            {
              text: "Component-based Experiments",
              link: "/experiments/component-based",
            },
            { text: "PostHog Integration", link: "/experiments/posthog" },
            { text: "Creating New Experiments", link: "/experiments/creating" },
          ],
        },
        {
          text: "Landing Variants",
          items: [
            { text: "Overview", link: "/landing-variants/" },
            {
              text: "Signup Minimal",
              link: "/landing-variants/signup-minimal",
            },
            {
              text: "Signup Social Proof",
              link: "/landing-variants/signup-social-proof",
            },
            { text: "Signup Router", link: "/landing-variants/signup-router" },
            {
              text: "Creating New Variants",
              link: "/landing-variants/creating",
            },
          ],
        },
        {
          text: "Analytics",
          items: [
            { text: "Overview", link: "/analytics/" },
            { text: "PostHog Setup", link: "/analytics/posthog-setup" },
            { text: "Event Tracking", link: "/analytics/event-tracking" },
            {
              text: "Experiment Analysis",
              link: "/analytics/experiment-analysis",
            },
          ],
        },
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/api/" },
            { text: "Hooks", link: "/api/hooks" },
            { text: "Components", link: "/api/components" },
            { text: "Utilities", link: "/api/utilities" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/edshadi/wowshowcase" },
    ],

    footer: {
      message: "Built with VitePress and Next.js",
      copyright: "Copyright © 2024 Wow AI Showcase",
    },
  },

  markdown: {
    theme: "github-dark",
    lineNumbers: true,
  },
});
