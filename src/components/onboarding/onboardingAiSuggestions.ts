import type { SuggestedAction } from "../../ai/types";

export type OnboardingAiPrompt = SuggestedAction & {
  description: string;
};

export const ONBOARDING_AI_PROMPTS: OnboardingAiPrompt[] = [
  {
    id: "create-homepage",
    label: "Create a home page for me",
    prompt: "Create a home page for me.",
    description:
      "Create a detailed dashboard to track and manage all month-end close activities, including task status, deadlines, and key financial metrics.",
  },
  {
    id: "recommend-widgets",
    label: "Recommend widgets to add",
    prompt: "Recommend widgets to add to my homepage.",
    description: "Recommend personalized widget suggestions based on my usage patterns and preferences",
  },
  {
    id: "month-end-close",
    label: "Build me a month-end close dashboard",
    prompt: "Build me a month-end close dashboard.",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  },
  {
    id: "suggested-prompt",
    label: "Suggested Prompt",
    prompt: "Help me customize my homepage.",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  },
];
