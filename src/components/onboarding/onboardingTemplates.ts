import billingStandardPreviewUrl from "../../assets/onboarding-billing-standard.png";
import buildYourOwnPreviewUrl from "../../assets/onboarding-build-your-own.png";
import developerPreviewUrl from "../../assets/onboarding-developer.png";
import revenueStandardPreviewUrl from "../../assets/onboarding-revenue-standard.png";

export const ONBOARDING_BUILD_YOUR_OWN_ID = "build-your-own" as const;

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
      "Starting with a blank page, you can add widgets and build a homepage that suits your needs.",
    id: ONBOARDING_BUILD_YOUR_OWN_ID,
    imageUrl: buildYourOwnPreviewUrl,
    name: "Build Your Own",
  },
] as const;

export type OnboardingTemplateId = (typeof ONBOARDING_TEMPLATES)[number]["id"];

export function isBuildYourOwnOnboardingChoice(templateId: OnboardingTemplateId) {
  return templateId === ONBOARDING_BUILD_YOUR_OWN_ID;
}
