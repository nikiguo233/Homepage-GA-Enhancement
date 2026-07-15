import { proposeHomepageCleanup } from "../homepageConfig/homepageCleanup";
import { getAvailableWidgetRecommendations } from "../homepageConfig/widgetCatalog";
import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import type { HomepageLayout } from "../homepageConfig/types";
import {
  BILLING_OPS_TEAM_TEMPLATE_PROPOSAL,
  TOP_ACCOUNTS_CUSTOM_WIDGET_PROPOSAL,
} from "./assistantProposals";
import { getTeamTemplatePreviewWidgetIds } from "../homepageConfig/teamTemplate";
import { HOMEPAGE_CREATION_RECOMMENDATIONS } from "./recommendationRationales";
import type { AssistantResponse, AiChatSuggestionContext, SuggestedAction } from "./types";

export const HOMEPAGE_CONFIG_SUGGESTIONS: SuggestedAction[] = [
  {
    id: "create-homepage",
    label: "Create a homepage for my role",
    prompt:
      "Create a homepage for Zuora Revenue with quick action cards and a data overview.",
  },
  {
    id: "recommend-widgets",
    label: "Recommend some widgets to add",
    prompt: "Recommend some widgets to add to my homepage.",
  },
  {
    id: "top-accounts-table",
    label: "Create a table widget of the top 10 accounts by open balance",
    prompt: "Create a table widget of the top 10 accounts by open balance.",
  },
  {
    id: "cleanup-homepage",
    label: "Clean up the homepage and remove low-value widgets",
    prompt: "Clean up the homepage and remove low-value widgets.",
  },
  {
    id: "billing-ops-template",
    label: "Create a shared Billing Ops template for my team",
    prompt: "Create a shared Billing Ops template for my team.",
    badge: "Admins Only",
  },
];

export const CUSTOM_WIDGET_CREATION_SUGGESTIONS: SuggestedAction[] = [
  {
    id: "top-accounts-table",
    label: "Create a table widget of the top 10 accounts by open balance",
    prompt: "Create a table widget of the top 10 accounts by open balance.",
  },
  {
    id: "mrr-trend-chart",
    label: "Create a line chart widget for MRR trend",
    prompt: "Create a line chart widget for MRR trend.",
  },
  {
    id: "announcements-runbook",
    label: "Create an announcements and runbook widget",
    prompt: "Create an announcements and runbook widget.",
  },
  {
    id: "embed-dashboard",
    label: "Create a widget that embeds an external dashboard",
    prompt: "Create a widget that embeds an external dashboard.",
  },
];

export function getSuggestionsForContext(context: AiChatSuggestionContext): SuggestedAction[] {
  return context === "custom-widget"
    ? CUSTOM_WIDGET_CREATION_SUGGESTIONS
    : HOMEPAGE_CONFIG_SUGGESTIONS;
}

const HOMEPAGE_CREATED_RESPONSE: AssistantResponse = {
  message:
    "Here's your homepage! It includes 4 quick-action metric cards and a revenue trend chart. I've noted why each one fits your role below.",
  preview: {
    kind: "ai-generated-homepage",
  },
  recommendations: HOMEPAGE_CREATION_RECOMMENDATIONS,
  showFeedback: true,
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
    normalized.includes("clean up") && normalized.includes("homepage") ||
    normalized.includes("remove low-value widgets")
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

function isBillingOpsTemplatePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    (normalized.includes("billing ops") && normalized.includes("template")) ||
    (normalized.includes("shared") && normalized.includes("billing") && normalized.includes("template")) ||
    (normalized.includes("template") && normalized.includes("for my team") && normalized.includes("billing"))
  );
}

export function getHomepageConfigAssistantResponse(
  prompt: string,
  options: {
    addedWidgetIds: string[];
    extraExcludedWidgetIds?: string[];
    hiddenMetricCardLabels: string[];
    isAiGenerated: boolean;
    isEmptyHomepage?: boolean;
    layout: HomepageLayout;
    removedWidgetIds: DashboardWidgetId[];
    revenueProgressAdded: boolean;
    widgetOrder: DashboardWidgetId[] | null;
  },
): AssistantResponse {
  if (isHomepageCleanupPrompt(prompt)) {
    const cleanupProposal = proposeHomepageCleanup({
      addedWidgetIds: options.addedWidgetIds,
      hiddenMetricCardLabels: options.hiddenMetricCardLabels,
      layout: options.layout,
      removedWidgetIds: options.removedWidgetIds,
      revenueProgressAdded: options.revenueProgressAdded,
      widgetOrder: options.widgetOrder,
    });

    if (!cleanupProposal) {
      return {
        message:
          "Your homepage is already streamlined. There are no additional low-value widgets to remove right now.",
        showFeedback: false,
      };
    }

    const removedCount = cleanupProposal.removedWidgetNames.length;

    return {
      cleanupProposal,
      message: `I reviewed your homepage and found ${removedCount} low-value widget${removedCount === 1 ? "" : "s"} to remove. I've noted why each one can go and rearranged the rest to surface the most useful insights first.`,
      showFeedback: false,
    };
  }

  if (isWidgetRecommendationPrompt(prompt)) {
    const recommendations = getAvailableWidgetRecommendations(
      options.layout,
      options.addedWidgetIds,
      options.extraExcludedWidgetIds,
      options.isEmptyHomepage,
    );

    if (recommendations.length === 0) {
      return {
        message:
          "Your homepage already includes the widgets I would recommend. Tell me if you'd like help adjusting the layout.",
        showFeedback: false,
      };
    }

    return {
      message:
        "Based on your homepage, here are widgets I recommend adding. Each includes a short note on why it may help.",
      showFeedback: false,
      widgetRecommendations: recommendations,
    };
  }

  if (isTopAccountsTablePrompt(prompt)) {
    return {
      customWidgetProposal: TOP_ACCOUNTS_CUSTOM_WIDGET_PROPOSAL,
      message:
        "I can build this as a Custom HTML widget that ranks the top 10 accounts by open balance. Review the layout preview below, then create the widget with live Zuora Billing data.",
      showFeedback: false,
    };
  }

  if (isBillingOpsTemplatePrompt(prompt)) {
    return {
      teamTemplateProposal: BILLING_OPS_TEAM_TEMPLATE_PROPOSAL,
      preview: {
        kind: "team-template",
        widgetIds: getTeamTemplatePreviewWidgetIds(BILLING_OPS_TEAM_TEMPLATE_PROPOSAL),
      },
      message:
        "I drafted a shared Billing Ops template for your team. It bundles the widgets billing operations teams use most, including an open-balance leaderboard. Review the layout preview below, then create the template to publish it for your team.",
      showFeedback: false,
    };
  }

  if (isHomepageCreationPrompt(prompt)) {
    if (options.isAiGenerated) {
      return {
        message:
          "Your AI-generated homepage is already applied. Tell me what you'd like to adjust and I can regenerate a new layout.",
        showFeedback: false,
      };
    }

    return HOMEPAGE_CREATED_RESPONSE;
  }

  if (prompt.toLowerCase().includes("navigation bar")) {
    return {
      message:
        "I can help customize navigation soon. For now, try asking me to create a homepage with quick action cards and a data overview.",
      showFeedback: false,
    };
  }

  return {
    message:
      "I can help configure your Zuora Revenue homepage. Try asking me to create a homepage with quick action cards and a data overview.",
    showFeedback: false,
  };
}

export function getHomepageConfigRegenerateResponse(): AssistantResponse {
  return HOMEPAGE_CREATED_RESPONSE;
}
