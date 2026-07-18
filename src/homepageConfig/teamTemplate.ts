import { buildTopAccountsCustomWidgetDraft } from "../ai/assistantProposals";
import type { TeamTemplateProposal } from "../ai/types";
import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import {
  createCustomWidgetRefId,
  type CustomWidget,
  type CustomWidgetStatus,
} from "../customWidgets/types";

export type HomepageTemplateDraft = {
  id: string;
  name: string;
  description: string;
  audience: string;
  dashboardWidgetIds: DashboardWidgetId[];
  customWidgetRefs: string[];
  status: CustomWidgetStatus;
  previewImageUrl?: string;
};

export type HomepageTemplate = HomepageTemplateDraft & {
  createdAt: string;
  updatedAt: string;
};

export function createTemplateId() {
  return `ht-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyTemplateDraft(): HomepageTemplateDraft {
  return {
    id: createTemplateId(),
    name: "",
    description: "",
    audience: "",
    dashboardWidgetIds: [],
    customWidgetRefs: [],
    status: "draft",
  };
}

export const TEMPLATE_PREVIEW_TOP_ACCOUNTS_WIDGET_ID = "preview-top-accounts";

export const TEMPLATE_PREVIEW_TOP_ACCOUNTS_WIDGET: CustomWidget = {
  ...buildTopAccountsCustomWidgetDraft(true),
  id: TEMPLATE_PREVIEW_TOP_ACCOUNTS_WIDGET_ID,
  status: "published",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

export const TEMPLATE_PREVIEW_TOP_ACCOUNTS_REF = createCustomWidgetRefId(
  TEMPLATE_PREVIEW_TOP_ACCOUNTS_WIDGET_ID,
  "6x4",
);

export function getTemplatePreviewCustomWidget(
  widgetId: string,
): CustomWidget | undefined {
  if (widgetId === TEMPLATE_PREVIEW_TOP_ACCOUNTS_WIDGET_ID) {
    return TEMPLATE_PREVIEW_TOP_ACCOUNTS_WIDGET;
  }

  return undefined;
}

export function getTeamTemplatePreviewWidgetIds(proposal: TeamTemplateProposal): string[] {
  return [...proposal.suggestedWidgetIds, ...(proposal.previewCustomWidgetRefs ?? [])];
}

export function createTemplateDraftFromProposal(
  proposal: TeamTemplateProposal,
): HomepageTemplateDraft {
  return {
    id: proposal.id,
    name: proposal.name,
    description: proposal.description,
    audience: proposal.audience,
    dashboardWidgetIds: proposal.suggestedWidgetIds as DashboardWidgetId[],
    customWidgetRefs: proposal.previewCustomWidgetRefs ?? [],
    status: "draft",
  };
}
