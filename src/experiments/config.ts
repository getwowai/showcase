/**
 * Experiment Configuration
 *
 * This file serves as a centralized registry of all active experiments.
 * Use this for documentation and quick reference, though the actual
 * experiment configuration lives in PostHog.
 */

export interface ExperimentConfig {
  id: string;
  name: string;
  description: string;
  variants: string[];
  primaryMetric: string;
  secondaryMetrics: string[];
  status: "draft" | "running" | "paused" | "completed";
  startDate?: string;
  endDate?: string;
  targetLocales?: ("en" | "ar")[];
}

/**
 * Active Experiments Registry
 *
 * Add experiments here for documentation purposes.
 * The source of truth is PostHog, but this helps developers
 * understand what's running and what metrics to track.
 */
export const EXPERIMENTS: Record<string, ExperimentConfig> = {
  "signup-variants-oct-2025": {
    id: "signup-variants-oct-2025",
    name: "Signup Landing Page Variants",
    description:
      "Testing two signup-focused landing pages: minimal design vs. social proof heavy. " +
      "Hypothesis: Social proof variant will convert better by reducing anxiety and building trust.",
    variants: [
      "control", // Main landing page (/en or /ar)
      "minimal", // /en/signup-minimal - Clean, distraction-free
      "social-proof", // /en/signup-social-proof - Heavy trust signals
    ],
    primaryMetric: "waitlist_joined",
    secondaryMetrics: [
      "hero_cta_clicked",
      "scroll_depth",
      "time_on_page",
      "form_interaction",
    ],
    status: "running",
    startDate: "2025-10-09",
    targetLocales: ["en", "ar"],
  },
};

/**
 * Get experiment configuration by ID
 */
export const getExperiment = (experimentId: string): ExperimentConfig | null => {
  return EXPERIMENTS[experimentId] || null;
};

/**
 * Get all active experiments
 */
export const getActiveExperiments = (): ExperimentConfig[] => {
  return Object.values(EXPERIMENTS).filter((exp) => exp.status === "running");
};

/**
 * Experiment status helpers
 */
export const isExperimentRunning = (experimentId: string): boolean => {
  const experiment = getExperiment(experimentId);
  return experiment?.status === "running";
};
