import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { HomepageLayout } from "../homepageConfig/types";
import type { HomepageCleanupPlan } from "../homepageConfig/homepageCleanup";
import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import {
  getHomepageConfigAssistantResponse,
  getHomepageConfigRegenerateResponse,
  getSuggestionsForContext,
  isPublishWidgetPrompt,
  isUnpublishWidgetPrompt,
} from "./homepageConfigAssistant";
import {
  getThinkingModeForPrompt,
  THINKING_DURATIONS_MS,
  THINKING_STEP_LABELS,
  type ThinkingMode,
} from "./thinkingSteps";
import type { CustomWidgetAccess } from "../customWidgets/types";
import type {
  AiChatSuggestionContext,
  AiGeneratedDashboardVariant,
  AssistantResponse,
  ChatMessage,
  ChatPreview,
  CustomWidgetProposal,
  SuggestedAction,
  TeamTemplateProposal,
  ThinkingProcess,
} from "./types";

function createMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function runThinkingSequence(
  mode: ThinkingMode,
  requestId: number,
  requestIdRef: { current: number },
  setThinkingProcess: (process: ThinkingProcess | null) => void,
) {
  const steps = THINKING_STEP_LABELS[mode];
  const durationMs = THINKING_DURATIONS_MS[mode];
  const stepDuration = durationMs / steps.length;

  setThinkingProcess({ activeStepIndex: 0, steps });

  for (let index = 0; index < steps.length; index += 1) {
    if (requestIdRef.current !== requestId) {
      return false;
    }

    setThinkingProcess({ activeStepIndex: index, steps });
    await delay(stepDuration);
  }

  if (requestIdRef.current !== requestId) {
    return false;
  }

  setThinkingProcess({ activeStepIndex: steps.length, steps });
  await delay(350);

  return requestIdRef.current === requestId;
}

export function useAiHomepageConfigChat(options: {
  addedWidgetIds: string[];
  aiDashboardVariant?: AiGeneratedDashboardVariant;
  aiLibraryWidgetIds?: DashboardWidgetId[];
  extraExcludedWidgetIds?: string[];
  hiddenMetricCardLabels: string[];
  isAiGenerated: boolean;
  isEmptyHomepage?: boolean;
  layout: HomepageLayout;
  metricCardOrder: string[] | null;
  onAddWidgets?: (widgetIds: string[]) => void;
  onApplyCleanup?: (plan: HomepageCleanupPlan) => void;
  onApplyPreview?: (preview?: ChatPreview) => void;
  onSaveProposedTeamTemplate?: (proposal: TeamTemplateProposal) => string | undefined;
  onSaveProposedCustomWidget?: (
    proposal: CustomWidgetProposal,
    access?: CustomWidgetAccess,
  ) => string | undefined;
  onAiGeneratedWidgetAccessChange?: (access: CustomWidgetAccess) => AssistantResponse | null;
  onUndoCleanup?: () => void;
  onUndoPreview?: () => void;
  removedWidgetIds: DashboardWidgetId[];
  revenueProgressAdded: boolean;
  widgetOrder: DashboardWidgetId[] | null;
}) {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestionContext, setSuggestionContext] = useState<AiChatSuggestionContext>("homepage");
  const [thinkingProcess, setThinkingProcess] = useState<ThinkingProcess | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmptyStateSuggestions, setShowEmptyStateSuggestions] = useState(true);
  const requestIdRef = useRef(0);
  const pendingChatPromptRef = useRef<string | null>(null);
  const isThinking = thinkingProcess !== null;
  const suggestions = useMemo(
    () => getSuggestionsForContext(suggestionContext),
    [suggestionContext],
  );

  const openChat = useCallback(() => {
    setAiChatOpen(true);
  }, []);

  const startChat = useCallback(
    (options?: {
      context?: AiChatSuggestionContext;
      draftMessage?: string;
      reset?: boolean;
      showEmptyStateSuggestions?: boolean;
    }) => {
      if (options?.reset) {
        requestIdRef.current += 1;
        setThinkingProcess(null);
        setMessages([]);
        setInputMessage(options?.draftMessage?.trim() ?? "");
      } else if (options?.draftMessage !== undefined) {
        setInputMessage(options.draftMessage.trim());
      }

      if (options?.showEmptyStateSuggestions !== undefined) {
        setShowEmptyStateSuggestions(options.showEmptyStateSuggestions);
      } else if (options?.reset) {
        setShowEmptyStateSuggestions(true);
      }

      if (options?.context) {
        setSuggestionContext(options.context);
      }

      setAiChatOpen(true);
    },
    [],
  );

  const startChatWithPrompt = useCallback(
    (
      prompt: string,
      options?: {
        context?: AiChatSuggestionContext;
        showEmptyStateSuggestions?: boolean;
      },
    ) => {
      const trimmed = prompt.trim();

      if (!trimmed) {
        return;
      }

      pendingChatPromptRef.current = trimmed;
      startChat({
        context: options?.context ?? "homepage",
        reset: true,
        showEmptyStateSuggestions: options?.showEmptyStateSuggestions ?? false,
      });
    },
    [startChat],
  );

  const closeChat = useCallback(() => {
    setAiChatOpen(false);
  }, []);

  const resetConversation = useCallback(() => {
    requestIdRef.current += 1;
    setThinkingProcess(null);
    setMessages([]);
    setInputMessage("");
    setShowEmptyStateSuggestions(true);
  }, []);

  const handleNewChat = useCallback(() => {
    resetConversation();
  }, [resetConversation]);

  const respondToPrompt = useCallback(
    async (prompt: string) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "user",
          content: prompt,
        },
      ]);

      const thinkingMode = getThinkingModeForPrompt(prompt);
      const completed = await runThinkingSequence(thinkingMode, requestId, requestIdRef, setThinkingProcess);

      if (!completed) {
        return;
      }

      let response: AssistantResponse;

      if (isPublishWidgetPrompt(prompt)) {
        response =
          options.onAiGeneratedWidgetAccessChange?.("tenant") ??
          getHomepageConfigAssistantResponse(prompt, {
            addedWidgetIds: options.addedWidgetIds,
            aiDashboardVariant: options.aiDashboardVariant,
            aiLibraryWidgetIds: options.aiLibraryWidgetIds,
            extraExcludedWidgetIds: options.extraExcludedWidgetIds,
            hiddenMetricCardLabels: options.hiddenMetricCardLabels,
            isAiGenerated: options.isAiGenerated,
            isEmptyHomepage: options.isEmptyHomepage,
            layout: options.layout,
            metricCardOrder: options.metricCardOrder,
            removedWidgetIds: options.removedWidgetIds,
            revenueProgressAdded: options.revenueProgressAdded,
            widgetOrder: options.widgetOrder,
          });
      } else if (isUnpublishWidgetPrompt(prompt)) {
        response =
          options.onAiGeneratedWidgetAccessChange?.("private") ??
          getHomepageConfigAssistantResponse(prompt, {
            addedWidgetIds: options.addedWidgetIds,
            aiDashboardVariant: options.aiDashboardVariant,
            aiLibraryWidgetIds: options.aiLibraryWidgetIds,
            extraExcludedWidgetIds: options.extraExcludedWidgetIds,
            hiddenMetricCardLabels: options.hiddenMetricCardLabels,
            isAiGenerated: options.isAiGenerated,
            isEmptyHomepage: options.isEmptyHomepage,
            layout: options.layout,
            metricCardOrder: options.metricCardOrder,
            removedWidgetIds: options.removedWidgetIds,
            revenueProgressAdded: options.revenueProgressAdded,
            widgetOrder: options.widgetOrder,
          });
      } else {
        response = getHomepageConfigAssistantResponse(prompt, {
          addedWidgetIds: options.addedWidgetIds,
          aiDashboardVariant: options.aiDashboardVariant,
          aiLibraryWidgetIds: options.aiLibraryWidgetIds,
          extraExcludedWidgetIds: options.extraExcludedWidgetIds,
          hiddenMetricCardLabels: options.hiddenMetricCardLabels,
          isAiGenerated: options.isAiGenerated,
          isEmptyHomepage: options.isEmptyHomepage,
          layout: options.layout,
          metricCardOrder: options.metricCardOrder,
          removedWidgetIds: options.removedWidgetIds,
          revenueProgressAdded: options.revenueProgressAdded,
          widgetOrder: options.widgetOrder,
        });
      }

      setThinkingProcess(null);
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: response.message,
          cleanupProposal: response.cleanupProposal,
          customWidgetProposal: response.customWidgetProposal,
          preview: response.preview,
          recommendations: response.recommendations,
          showFeedback: response.showFeedback,
          teamTemplateProposal: response.teamTemplateProposal,
          widgetRecommendations: response.widgetRecommendations,
        },
      ]);
    },
    [
      options.addedWidgetIds,
      options.aiDashboardVariant,
      options.aiLibraryWidgetIds,
      options.extraExcludedWidgetIds,
      options.hiddenMetricCardLabels,
      options.isAiGenerated,
      options.isEmptyHomepage,
      options.layout,
      options.metricCardOrder,
      options.removedWidgetIds,
      options.revenueProgressAdded,
      options.widgetOrder,
      options.onAiGeneratedWidgetAccessChange,
    ],
  );

  const handleSendMessage = useCallback(
    (text: string) => {
      if (isThinking) {
        return;
      }

      setInputMessage("");
      void respondToPrompt(text);
    },
    [isThinking, respondToPrompt],
  );

  useEffect(() => {
    if (!aiChatOpen || !pendingChatPromptRef.current) {
      return;
    }

    const prompt = pendingChatPromptRef.current;
    pendingChatPromptRef.current = null;
    void respondToPrompt(prompt);
  }, [aiChatOpen, respondToPrompt]);

  const handleSuggestedAction = useCallback(
    (action: SuggestedAction) => {
      if (isThinking) {
        return;
      }

      setInputMessage(action.prompt);
    },
    [isThinking],
  );

  const handleRegeneratePreview = useCallback(
    async (messageId: string) => {
      if (isThinking) {
        return;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                preview: undefined,
                recommendations: undefined,
                showFeedback: false,
              }
            : message,
        ),
      );

      const completed = await runThinkingSequence("regenerate", requestId, requestIdRef, setThinkingProcess);

      if (!completed) {
        return;
      }

      const response = getHomepageConfigRegenerateResponse();

      setThinkingProcess(null);
      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                content: response.message,
                preview: response.preview,
                recommendations: response.recommendations,
                showFeedback: response.showFeedback,
              }
            : message,
        ),
      );
    },
    [isThinking],
  );

  const handleAddRecommendedWidgets = useCallback(
    (messageId: string, widgetIds: string[]) => {
      if (widgetIds.length === 0) {
        return;
      }

      options.onAddWidgets?.(widgetIds);

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                appliedWidgetIds: [...new Set([...(message.appliedWidgetIds ?? []), ...widgetIds])],
              }
            : message,
        ),
      );
    },
    [options.onAddWidgets],
  );

  const handleApplyCleanup = useCallback(
    (messageId: string, plan: HomepageCleanupPlan) => {
      options.onApplyCleanup?.(plan);

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId ? { ...message, cleanupApplied: true } : message,
        ),
      );
    },
    [options.onApplyCleanup],
  );

  const handleUndoCleanup = useCallback(
    (messageId: string) => {
      options.onUndoCleanup?.();

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId ? { ...message, cleanupApplied: false } : message,
        ),
      );
    },
    [options.onUndoCleanup],
  );

  const handleApplyPreview = useCallback(
    (messageId: string) => {
      const message = messages.find((entry) => entry.id === messageId);
      options.onApplyPreview?.(message?.preview);

      setMessages((current) =>
        current.map((message) => ({
          ...message,
          previewApplied: message.id === messageId && Boolean(message.preview),
        })),
      );
    },
    [messages, options.onApplyPreview],
  );

  const handleUndoPreview = useCallback(
    (messageId: string) => {
      options.onUndoPreview?.();

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId ? { ...message, previewApplied: false } : message,
        ),
      );
    },
    [options.onUndoPreview],
  );

  const handleSaveProposedTeamTemplate = useCallback(
    (messageId: string, proposal: TeamTemplateProposal) => {
      const templateId = options.onSaveProposedTeamTemplate?.(proposal);

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                teamTemplateSaved: true,
                proposedTemplateId: templateId ?? message.proposedTemplateId,
              }
            : message,
        ),
      );
    },
    [options.onSaveProposedTeamTemplate],
  );

  const handleSaveProposedCustomWidget = useCallback(
    (messageId: string, proposal: CustomWidgetProposal, access?: CustomWidgetAccess) => {
      if (!proposal.supportsLiveData) {
        return;
      }

      const widgetId = options.onSaveProposedCustomWidget?.(proposal, access);

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                customWidgetSaved: true,
                customWidgetSavedAccess: access,
                proposedCustomWidgetId: widgetId ?? message.proposedCustomWidgetId,
              }
            : message,
        ),
      );
    },
    [options.onSaveProposedCustomWidget],
  );

  return {
    aiChatOpen,
    closeChat,
    handleAddRecommendedWidgets,
    handleApplyCleanup,
    handleApplyPreview,
    handleSaveProposedTeamTemplate,
    handleNewChat,
    handleRegeneratePreview,
    handleSaveProposedCustomWidget,
    handleSendMessage,
    handleSuggestedAction,
    handleUndoCleanup,
    handleUndoPreview,
    inputMessage,
    isThinking,
    messages,
    onInputMessageChange: setInputMessage,
    openChat,
    resetConversation,
    showEmptyStateSuggestions,
    startChat,
    startChatWithPrompt,
    suggestionContext,
    suggestions,
    thinkingProcess,
  };
}
