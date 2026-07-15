import type { HomepageCleanupPlan } from "../homepageConfig/homepageCleanup";
import type { CustomWidgetDraft, WidgetDataBinding } from "../customWidgets/types";

export type { HomepageCleanupPlan };

export type SuggestedAction = {
  id: string;
  label: string;
  prompt: string;
  badge?: string;
};

export type AiChatSuggestionContext = "homepage" | "custom-widget";

export type ChatPreview =
  | {
      kind: "ai-generated-homepage";
    }
  | {
      kind: "team-template";
      widgetIds: string[];
    };

export type AiRecommendation = {
  name: string;
  reason: string;
};

export type RecommendedWidget = {
  id: string;
  name: string;
  description: string;
  reason: string;
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
  liveDataWidgetAdded?: boolean;
  liveDataWidgetCreated?: boolean;
  proposedCustomWidgetId?: string;
  teamTemplateProposal?: TeamTemplateProposal;
  teamTemplateCreated?: boolean;
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
