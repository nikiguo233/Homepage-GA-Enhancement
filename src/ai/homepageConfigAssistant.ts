import { proposeHomepageCleanup } from "../homepageConfig/homepageCleanup";
import { getAvailableWidgetRecommendations } from "../homepageConfig/widgetCatalog";
import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import type { HomepageLayout } from "../homepageConfig/types";
import type { AiGeneratedDashboardVariant } from "./types";
import {
  COLLECTIONS_TEAM_TEMPLATE_PROPOSAL,
  FINANCE_LEADERSHIP_TEAM_TEMPLATE_PROPOSAL,
  REVENUE_CLOSE_TEAM_TEMPLATE_PROPOSAL,
  TOP_ACCOUNTS_CUSTOM_WIDGET_PROPOSAL,
} from "./assistantProposals";
import { getTeamTemplatePreviewWidgetIds } from "../homepageConfig/teamTemplate";
import {
  HOMEPAGE_CREATION_RECOMMENDATIONS,
  MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS,
  MONTH_END_CLOSE_LIBRARY_WIDGET_IDS,
} from "./recommendationRationales";
import type { AssistantResponse, AiChatSuggestionContext, SuggestedAction, TeamTemplateProposal } from "./types";

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
    id: "reorganize-homepage",
    label: "Reorganize this homepage so the most important metrics are on top",
    prompt: "Reorganize this homepage so the most important metrics are on top.",
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

export const TEMPLATE_CREATION_SUGGESTIONS: SuggestedAction[] = [
  {
    id: "revenue-close-template",
    label: "Create a Revenue Close template for accounting teams",
    prompt: "Create a Revenue Close template for accounting teams.",
  },
  {
    id: "finance-leadership-template",
    label: "Create a Finance Leadership executive template",
    prompt: "Create a Finance Leadership executive template.",
  },
  {
    id: "collections-template",
    label: "Create a Collections team homepage template",
    prompt: "Create a Collections team homepage template.",
  },
];

export function getSuggestionsForContext(context: AiChatSuggestionContext): SuggestedAction[] {
  if (context === "custom-widget") {
    return CUSTOM_WIDGET_CREATION_SUGGESTIONS;
  }

  if (context === "template") {
    return TEMPLATE_CREATION_SUGGESTIONS;
  }

  return HOMEPAGE_CONFIG_SUGGESTIONS;
}

const HOMEPAGE_CREATED_RESPONSE: AssistantResponse = {
  message:
    "Here's your homepage! I selected a revenue trend chart from your widget library and generated 4 quick-action metric cards tailored to your role. I've noted the source of each widget below.",
  preview: {
    kind: "ai-generated-homepage",
  },
  recommendations: HOMEPAGE_CREATION_RECOMMENDATIONS,
  showFeedback: true,
};

const MONTH_END_CLOSE_DASHBOARD_RESPONSE: AssistantResponse = {
  message:
    "Here's your month-end close dashboard! I generated KPI cards for close tracking and pulled in Close Process Status, Revenue Tasks, and Zuora Revenue Report from your widget library. I've noted the source of each widget below.",
  preview: {
    kind: "ai-generated-homepage",
    libraryWidgetIds: MONTH_END_CLOSE_LIBRARY_WIDGET_IDS,
    variant: "month-end-close",
  },
  recommendations: MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS,
  showFeedback: true,
};

function isMonthEndCloseDashboardPrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    normalized.includes("month-end close") ||
    normalized.includes("month end close") ||
    (normalized.includes("close dashboard") && normalized.includes("build"))
  );
}

function isHomepageCreationPrompt(text: string) {
  const normalized = text.trim().toLowerCase().replace(/\bhome page\b/g, "homepage");

  return (
    normalized.includes("create a homepage") ||
    normalized.includes("quick action") ||
    normalized.includes("data overview") ||
    normalized.includes("daily work")
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

function isHomepageReorganizePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    (normalized.includes("reorganize") && normalized.includes("homepage")) ||
    (normalized.includes("important metrics") && normalized.includes("top")) ||
    (normalized.includes("clean up") && normalized.includes("homepage")) ||
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

function isRevenueCloseTemplatePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized.includes("revenue close") && normalized.includes("template");
}

function isFinanceLeadershipTemplatePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    (normalized.includes("finance leadership") || normalized.includes("executive")) &&
    normalized.includes("template")
  );
}

function isCollectionsTemplatePrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized.includes("collections") && normalized.includes("template");
}

export function isPublishWidgetPrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized === "publish this widget" || normalized === "publish widget";
}

export function isUnpublishWidgetPrompt(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized === "unpublish this widget" || normalized === "unpublish widget";
}

export function getAiGeneratedWidgetAccessChatResponse(
  access: "private" | "tenant",
  widgetName: string,
): AssistantResponse {
  const label = widgetName.trim() || "Untitled Widget";

  if (access === "tenant") {
    return {
      message: `"${label}" has been published. It is now available to all users in your tenant under Shared Widgets.`,
      showFeedback: false,
    };
  }

  return {
    message: `"${label}" has been unpublished and moved to My Widgets for personal use.`,
    showFeedback: false,
  };
}

function buildTeamTemplateResponse(proposal: TeamTemplateProposal) {
  return {
    teamTemplateProposal: proposal,
    preview: {
      kind: "team-template" as const,
      widgetIds: getTeamTemplatePreviewWidgetIds(proposal),
    },
    message: `I drafted a shared ${proposal.name} template for your team. Review the layout preview below, then create the template to publish it for your team.`,
    showFeedback: false,
  };
}

export function getHomepageConfigAssistantResponse(
  prompt: string,
  options: {
    addedWidgetIds: string[];
    aiDashboardVariant?: AiGeneratedDashboardVariant;
    aiLibraryWidgetIds?: DashboardWidgetId[];
    extraExcludedWidgetIds?: string[];
    hiddenMetricCardLabels: string[];
    isAiGenerated: boolean;
    isEmptyHomepage?: boolean;
    layout: HomepageLayout;
    metricCardOrder: string[] | null;
    removedWidgetIds: DashboardWidgetId[];
    revenueProgressAdded: boolean;
    widgetOrder: DashboardWidgetId[] | null;
  },
): AssistantResponse {
  if (isHomepageReorganizePrompt(prompt)) {
    const cleanupProposal = proposeHomepageCleanup({
      addedWidgetIds: options.addedWidgetIds,
      aiDashboardVariant: options.aiDashboardVariant,
      aiLibraryWidgetIds: options.aiLibraryWidgetIds,
      hiddenMetricCardLabels: options.hiddenMetricCardLabels,
      layout: options.layout,
      metricCardOrder: options.metricCardOrder,
      removedWidgetIds: options.removedWidgetIds,
      revenueProgressAdded: options.revenueProgressAdded,
      startWithEmptyHomepage: options.isEmptyHomepage,
      widgetOrder: options.widgetOrder,
    });

    if (!cleanupProposal) {
      return {
        message:
          "Your homepage already puts the most important metrics up top. Tell me if you'd like to adjust the layout further.",
        showFeedback: false,
      };
    }

    return {
      cleanupProposal,
      message:
        "I reorganized your homepage so the most important metrics appear first. Review the updated layout order below.",
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
        "Based on your homepage, here are widgets I recommend adding — some from your widget library and some I can generate for you. Each includes a short note on why it may help.",
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

  if (isRevenueCloseTemplatePrompt(prompt)) {
    return buildTeamTemplateResponse(REVENUE_CLOSE_TEAM_TEMPLATE_PROPOSAL);
  }

  if (isFinanceLeadershipTemplatePrompt(prompt)) {
    return buildTeamTemplateResponse(FINANCE_LEADERSHIP_TEAM_TEMPLATE_PROPOSAL);
  }

  if (isCollectionsTemplatePrompt(prompt)) {
    return buildTeamTemplateResponse(COLLECTIONS_TEAM_TEMPLATE_PROPOSAL);
  }

  if (isHomepageCreationPrompt(prompt) || isMonthEndCloseDashboardPrompt(prompt)) {
    if (options.isAiGenerated) {
      return {
        message:
          "Your AI-generated homepage is already applied. Tell me what you'd like to adjust and I can regenerate a new layout.",
        showFeedback: false,
      };
    }

    return isMonthEndCloseDashboardPrompt(prompt)
      ? MONTH_END_CLOSE_DASHBOARD_RESPONSE
      : HOMEPAGE_CREATED_RESPONSE;
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
