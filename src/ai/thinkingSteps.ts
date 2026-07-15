export type ThinkingMode =
  | "cleanup"
  | "custom-widget"
  | "data-binding"
  | "general"
  | "homepage"
  | "regenerate"
  | "team-template"
  | "widgets";

export const THINKING_STEP_LABELS: Record<ThinkingMode, string[]> = {
  cleanup: [
    "Understanding your request",
    "Reviewing widgets on your homepage",
    "Identifying low-value widgets",
    "Planning a cleaner layout",
  ],
  "custom-widget": [
    "Understanding your request",
    "Identifying billing data fields",
    "Designing the account table layout",
    "Preparing custom widget draft",
  ],
  "data-binding": [
    "Understanding your request",
    "Reviewing Zuora Billing data fields",
    "Configuring account open-balance query",
    "Preparing live data connection",
  ],
  homepage: [
    "Understanding your request",
    "Reviewing your current homepage layout",
    "Designing metric cards and KPIs",
    "Building revenue trend visualization",
    "Preparing homepage preview",
  ],
  widgets: [
    "Understanding your request",
    "Analyzing your current homepage",
    "Identifying useful widgets for your role",
    "Ranking widget recommendations",
  ],
  "team-template": [
    "Understanding your request",
    "Reviewing Billing Ops workflows",
    "Selecting widgets for the team",
    "Packaging a shared template",
  ],
  regenerate: [
    "Re-evaluating layout preferences",
    "Regenerating homepage components",
    "Updating preview",
  ],
  general: [
    "Understanding your request",
    "Reviewing homepage configuration options",
    "Preparing response",
  ],
};

export const THINKING_DURATIONS_MS: Record<ThinkingMode, number> = {
  cleanup: 3200,
  "custom-widget": 3600,
  "data-binding": 3400,
  homepage: 4500,
  widgets: 3600,
  "team-template": 3800,
  regenerate: 3000,
  general: 2800,
};

function isHomepageCreationPrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    normalized.includes("create a homepage") ||
    normalized.includes("quick action") ||
    normalized.includes("data overview")
  );
}

function isWidgetRecommendationPrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    (normalized.includes("recommend") && normalized.includes("widget")) ||
    normalized.includes("widgets to add") ||
    normalized.includes("widgets to be added")
  );
}

function isHomepageCleanupPrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    (normalized.includes("clean up") && normalized.includes("homepage")) ||
    normalized.includes("remove low-value widgets")
  );
}

function isBillingOpsTemplatePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    (normalized.includes("billing ops") && normalized.includes("template")) ||
    (normalized.includes("shared") && normalized.includes("billing") && normalized.includes("template")) ||
    (normalized.includes("template") && normalized.includes("for my team") && normalized.includes("billing"))
  );
}

function isTopAccountsTablePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    normalized.includes("top 10 accounts") ||
    normalized.includes("table widget") ||
    (normalized.includes("table") && normalized.includes("open balance")) ||
    (normalized.includes("accounts") && normalized.includes("open balance"))
  );
}

export function getThinkingModeForPrompt(prompt: string): ThinkingMode {
  if (isHomepageCleanupPrompt(prompt)) {
    return "cleanup";
  }

  if (isTopAccountsTablePrompt(prompt)) {
    return "custom-widget";
  }

  if (isBillingOpsTemplatePrompt(prompt)) {
    return "team-template";
  }

  if (isWidgetRecommendationPrompt(prompt)) {
    return "widgets";
  }

  if (isHomepageCreationPrompt(prompt)) {
    return "homepage";
  }

  return "general";
}
