import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import type { HomepageCleanupPlan } from "../homepageConfig/homepageCleanup";
import type { CustomWidgetDraft, WidgetDataBinding } from "../customWidgets/types";

export type AiGeneratedDashboardVariant = "default" | "month-end-close";

export type { HomepageCleanupPlan };

export type SuggestedAction = {
  id: string;
  label: string;
  prompt: string;
  badge?: string;
};

export type AiChatSuggestionContext = "homepage" | "custom-widget" | "template";

export type ChatPreview =
  | {
      kind: "ai-generated-homepage";
      libraryWidgetIds?: DashboardWidgetId[];
      variant?: AiGeneratedDashboardVariant;
    }
  | {
      kind: "team-template";
      widgetIds: string[];
    };

export type WidgetRecommendationSource = "library" | "ai-generated";

export type AiRecommendation = {
  name: string;
  reason: string;
  source?: WidgetRecommendationSource;
};

export type RecommendedWidget = {
  id: string;
  name: string;
  description: string;
  reason: string;
  source: WidgetRecommendationSource;
};

export type CustomWidgetProposal = {
  draft: CustomWidgetDraft;
  previewSummary: string;
  rationale: AiRecommendation[];
  supportsLiveData?: boolean;
};

export type WidgetDataBindingProposal = {
  binding: WidgetDataBinding;
  draft: CustomWidgetDraft;
  querySummary: string;
  sourceLabel: string;
};

export type TeamTemplateProposal = {
  id: string;
  name: string;
  description: string;
  audience: string;
  includedItems: AiRecommendation[];
  sharingNote: string;
  suggestedWidgetIds: string[];
  previewCustomWidgetRefs?: string[];
};

export type ThinkingProcess = {
  activeStepIndex: number;
  steps: string[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  preview?: ChatPreview;
  recommendations?: AiRecommendation[];
  showFeedback?: boolean;
  widgetRecommendations?: RecommendedWidget[];
  appliedWidgetIds?: string[];
  previewApplied?: boolean;
  cleanupProposal?: HomepageCleanupPlan;
  cleanupApplied?: boolean;
  customWidgetProposal?: CustomWidgetProposal;
  customWidgetSaved?: boolean;
  proposedCustomWidgetId?: string;
  teamTemplateProposal?: TeamTemplateProposal;
  teamTemplateSaved?: boolean;
  proposedTemplateId?: string;
};

export type AssistantResponse = {
  message: string;
  preview?: ChatPreview;
  recommendations?: AiRecommendation[];
  showFeedback?: boolean;
  widgetRecommendations?: RecommendedWidget[];
  cleanupProposal?: HomepageCleanupPlan;
  customWidgetProposal?: CustomWidgetProposal;
  teamTemplateProposal?: TeamTemplateProposal;
};
