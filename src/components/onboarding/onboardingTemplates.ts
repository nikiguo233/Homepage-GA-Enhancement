import billingStandardPreviewUrl from "../../assets/onboarding-billing-standard.png";
import developerPreviewUrl from "../../assets/onboarding-developer.png";
import revenueStandardPreviewUrl from "../../assets/onboarding-revenue-standard.png";

export const ONBOARDING_CREATE_WITH_AI_ID = "create-with-zuora-ai" as const;

export type OnboardingTemplate = {
  description: string;
  id: string;
  imageUrl?: string;
  name: string;
  variant?: "ai";
};

export const ONBOARDING_TEMPLATES = [
  {
    description:
      "Get started fast with an out-of-the-box homepage that puts your most essential Zuora actions at your fingertips.",
    id: "billing-standard",
    imageUrl: billingStandardPreviewUrl,
    name: "Billing Standard",
  },
  {
    description: "Get started quickly with essential revenue actions and helpful resources.",
    id: "revenue-standard",
    imageUrl: revenueStandardPreviewUrl,
    name: "Revenue Standard",
  },
  {
    description:
      "Power your integrations with real-time API visibility, performance insights, and error tracking—all in one place.",
    id: "developer",
    imageUrl: developerPreviewUrl,
    name: "Developer",
  },
  {
    description:
      "Let Zuora AI design your personalized homepage from a simple prompt, with options to customize further.",
    id: ONBOARDING_CREATE_WITH_AI_ID,
    name: "Create with Zuora AI",
    variant: "ai",
  },
] as const satisfies readonly OnboardingTemplate[];

export type OnboardingTemplateId = (typeof ONBOARDING_TEMPLATES)[number]["id"];

export function isCreateWithAiOnboardingChoice(templateId: OnboardingTemplateId) {
  return templateId === ONBOARDING_CREATE_WITH_AI_ID;
}
