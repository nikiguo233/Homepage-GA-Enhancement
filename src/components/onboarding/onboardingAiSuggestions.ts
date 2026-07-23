import type { SuggestedAction } from "../../ai/types";

export const ONBOARDING_AI_SUGGESTIONS: SuggestedAction[] = [
  {
    id: "create-homepage-role",
    label: "Create a homepage for my role",
    prompt: "Create a homepage for my role.",
  },
  {
    id: "recommend-widgets",
    label: "Recommend some widgets to add",
    prompt: "Recommend some widgets to add to my homepage.",
  },
  {
    id: "month-end-close",
    label: "Build me a month-end close dashboard",
    prompt: "Build me a month-end close dashboard.",
  },
];
