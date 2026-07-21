import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import Tooltip from "@mui/material/Tooltip";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { HOMEPAGE_CONFIG_SUGGESTIONS } from "./ai/homepageConfigAssistant";
import type {
  AiChatSuggestionContext,
  AiRecommendation,
  ChatMessage,
  ChatPreview,
  CustomWidgetProposal,
  HomepageCleanupPlan,
  RecommendedWidget,
  SuggestedAction,
  TeamTemplateProposal,
  ThinkingProcess,
  WidgetRecommendationSource,
} from "./ai/types";
import { AiChatHomepagePreview } from "./components/AiChatHomepagePreview";
import { AiChatCustomWidgetPreview } from "./components/AiChatCustomWidgetPreview";
import { WidgetSourceBadge } from "./components/WidgetSourceBadge";
import { DASHBOARD_WIDGET_CATALOG } from "./components/dashboardWidgets/catalog";
import aiSparkIconUrl from "./assets/ai-spark.svg";
import aiSparkTabIconUrl from "./assets/ai-spark-tab.svg";

function AiSparkIcon({ className }: { className?: string }) {
  return <img alt="" aria-hidden="true" className={className} src={aiSparkIconUrl} />;
}

function AiSparkTabIcon({ className }: { className?: string }) {
  return <img alt="" aria-hidden="true" className={className} src={aiSparkTabIconUrl} />;
}

function AiSuggestedActionButton({
  action,
  onSelect,
}: {
  action: SuggestedAction;
  onSelect: (action: SuggestedAction) => void;
}) {
  return (
    <button className="ai-chat-suggested-action" onClick={() => onSelect(action)} type="button">
      <AiSparkTabIcon className="ai-chat-suggested-action-icon" />
      <span className="ai-chat-suggested-action-copy">
        <span className="ai-chat-suggested-action-label">{action.label}</span>
        {action.badge ? (
          <span className="ai-chat-suggested-action-badge">{action.badge}</span>
        ) : null}
      </span>
    </button>
  );
}

function AiChatEmptyState({
  intro,
  onSelectSuggestion,
  suggestions,
}: {
  intro: string;
  onSelectSuggestion: (action: SuggestedAction) => void;
  suggestions: SuggestedAction[];
}) {
  return (
    <div className="ai-chat-empty-state" data-node-id="225:41138">
      <div className="ai-chat-empty-state-intro">
        <AiSparkIcon className="ai-chat-empty-state-spark" />
        <p>{intro}</p>
      </div>
      <div className="ai-chat-suggested-actions">
        {suggestions.map((action) => (
          <AiSuggestedActionButton action={action} key={action.id} onSelect={onSelectSuggestion} />
        ))}
      </div>
    </div>
  );
}

function groupItemsBySource<T extends { source?: WidgetRecommendationSource }>(items: T[]) {
  const hasSources = items.some((item) => item.source);

  if (!hasSources) {
    return null;
  }

  const sourceOrder: WidgetRecommendationSource[] = ["ai-generated", "library"];

  return sourceOrder
    .map((source) => ({
      items: items.filter((item) => item.source === source),
      source,
    }))
    .filter((group) => group.items.length > 0);
}

function groupRecommendationsBySource(items: AiRecommendation[]) {
  return groupItemsBySource(items);
}

function AiChatRecommendationRationales({
  items,
  preview,
  title,
}: {
  items: AiRecommendation[];
  preview?: ReactNode;
  title: string;
}) {
  if (items.length === 0 && !preview) {
    return null;
  }

  const sourceGroups = groupRecommendationsBySource(items);

  return (
    <div className="ai-chat-recommendation-rationales">
      <h4>{title}</h4>
      {sourceGroups ? (
        <div className="ai-chat-recommendation-source-groups">
          {sourceGroups.map((group) => (
            <section className="ai-chat-recommendation-source-group" key={group.source}>
              <div className="ai-chat-recommendation-source-group-header">
                <WidgetSourceBadge source={group.source} />
              </div>
              <ul className="ai-chat-recommendation-rationale-list">
                {group.items.map((item) => (
                  <li className="ai-chat-recommendation-rationale-item" key={item.name}>
                    <strong>{item.name}</strong>
                    <p>{item.reason}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : items.length > 0 ? (
        <ul className="ai-chat-recommendation-rationale-list">
          {items.map((item) => (
            <li className="ai-chat-recommendation-rationale-item" key={item.name}>
              <strong>{item.name}</strong>
              <p>{item.reason}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {preview ? <div className="ai-chat-assistant-proposal-preview">{preview}</div> : null}
    </div>
  );
}

function AiChatWidgetRecommendations({
  appliedWidgetIds = [],
  messageId,
  onAddWidgets,
  widgets,
}: {
  appliedWidgetIds?: string[];
  messageId: string;
  onAddWidgets: (messageId: string, widgetIds: string[]) => void;
  widgets: RecommendedWidget[];
}) {
  const appliedSet = new Set(appliedWidgetIds);
  const selectableWidgets = widgets.filter((widget) => !appliedSet.has(widget.id));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const sourceGroups = groupItemsBySource(widgets);

  useEffect(() => {
    setSelectedIds((current) => current.filter((id) => !appliedWidgetIds.includes(id)));
  }, [appliedWidgetIds]);

  const toggleWidget = (widgetId: string) => {
    setSelectedIds((current) =>
      current.includes(widgetId)
        ? current.filter((id) => id !== widgetId)
        : [...current, widgetId],
    );
  };

  const handleAdd = () => {
    onAddWidgets(messageId, selectedIds);
    setSelectedIds([]);
  };

  if (widgets.length === 0) {
    return null;
  }

  const renderWidgetItem = (widget: RecommendedWidget) => {
    const isApplied = appliedSet.has(widget.id);
    const isSelected = selectedIds.includes(widget.id);

    return (
      <li className="ai-chat-widget-item" key={widget.id}>
        <label className={`ai-chat-widget-option${isApplied ? " is-applied" : ""}`}>
          <input
            checked={isApplied || isSelected}
            disabled={isApplied}
            onChange={() => toggleWidget(widget.id)}
            type="checkbox"
          />
          <span className="ai-chat-widget-option-copy">
            <strong>{widget.name}</strong>
            <span>{widget.description}</span>
            <span className="ai-chat-recommendation-reason">
              <strong>Why:</strong> {widget.reason}
            </span>
          </span>
          {isApplied ? <span className="ai-chat-widget-added-badge">Added</span> : null}
        </label>
      </li>
    );
  };

  return (
    <div className="ai-chat-widget-recommendations">
      {sourceGroups ? (
        <div className="ai-chat-widget-source-groups">
          {sourceGroups.map((group) => (
            <section className="ai-chat-recommendation-source-group" key={group.source}>
              <div className="ai-chat-recommendation-source-group-header">
                <WidgetSourceBadge source={group.source} />
              </div>
              <ul className="ai-chat-widget-list">{group.items.map(renderWidgetItem)}</ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="ai-chat-widget-list">{widgets.map(renderWidgetItem)}</ul>
      )}
      <button
        className="ai-chat-widget-add-button"
        disabled={selectedIds.length === 0}
        onClick={handleAdd}
        type="button"
      >
        Add to homepage
      </button>
    </div>
  );
}

function getDashboardWidgetName(widgetId: string) {
  return DASHBOARD_WIDGET_CATALOG.find((widget) => widget.id === widgetId)?.name ?? widgetId;
}

function getCleanupLayoutItems(proposal: HomepageCleanupPlan) {
  const layoutItems: string[] = [];

  if (proposal.metricCardOrder.length > 0) {
    layoutItems.push(...proposal.metricCardOrder);

    if (!proposal.metricCardOrder.includes("Open Exceptions")) {
      layoutItems.push("Revenue Recognition Trend");
    }
  }

  layoutItems.push(...proposal.orderedWidgetIds.map(getDashboardWidgetName));

  return layoutItems;
}

function AiChatCleanupProposal({
  applied = false,
  messageId,
  onApplyCleanup,
  onUndoCleanup,
  proposal,
}: {
  applied?: boolean;
  messageId: string;
  onApplyCleanup: (messageId: string, plan: HomepageCleanupPlan) => void;
  onUndoCleanup: (messageId: string) => void;
  proposal: HomepageCleanupPlan;
}) {
  const layoutItems = getCleanupLayoutItems(proposal);

  return (
    <div className="ai-chat-cleanup-proposal">
      {proposal.removals.length > 0 ? (
        <div className="ai-chat-cleanup-section">
          <h4>Moved down to prioritize top metrics</h4>
          <ul className="ai-chat-cleanup-list ai-chat-cleanup-removal-list">
            {proposal.removals.map((removal) => (
              <li className="ai-chat-cleanup-removal-item" key={removal.id}>
                <strong>{removal.name}</strong>
                <p>{removal.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="ai-chat-cleanup-section">
        <h4>Updated layout</h4>
        <p className="ai-chat-cleanup-layout-reason">{proposal.layoutReason}</p>
        <ol className="ai-chat-cleanup-ordered-list">
          {layoutItems.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ol>
      </div>
      <div className="ai-chat-cleanup-actions">
        {applied ? (
          <Tooltip title="Revert to your previous homepage configuration.">
            <button className="ai-chat-preview-undo" onClick={() => onUndoCleanup(messageId)} type="button">
              Undo
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="This action will update your homepage configuration.">
            <button
              className="ai-chat-preview-apply"
              onClick={() => onApplyCleanup(messageId, proposal)}
              type="button"
            >
              Apply
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

function AiChatCustomWidgetProposal({
  messageId,
  onSaveWidget,
  onViewWidget,
  proposal,
  saved = false,
  savedWidgetId,
}: {
  messageId: string;
  onSaveWidget?: (messageId: string, proposal: CustomWidgetProposal) => void;
  onViewWidget?: (widgetId: string) => void;
  proposal: CustomWidgetProposal;
  saved?: boolean;
  savedWidgetId?: string;
}) {
  return (
    <div className="ai-chat-assistant-proposal">
      <div className="ai-chat-assistant-proposal-summary">
        <h4>{proposal.draft.name}</h4>
        <p>{proposal.previewSummary}</p>
      </div>
      <AiChatRecommendationRationales
        items={proposal.rationale}
        preview={<AiChatCustomWidgetPreview draft={proposal.draft} />}
        title="Proposed setup"
      />
      {proposal.supportsLiveData ? (
        <div className="ai-chat-assistant-proposal-actions ai-chat-assistant-proposal-actions-stacked">
          {saved ? (
            <>
              <span className="ai-chat-assistant-proposal-status" role="status">
                <span aria-hidden="true" className="ai-chat-assistant-proposal-status-dot" />
                Added
              </span>
              {savedWidgetId ? (
                <button
                  className="ai-chat-preview-regenerate"
                  onClick={() => onViewWidget?.(savedWidgetId)}
                  type="button"
                >
                  View Widget Detail
                </button>
              ) : null}
            </>
          ) : (
            <button
              className="ai-chat-preview-apply"
              onClick={() => onSaveWidget?.(messageId, proposal)}
              type="button"
            >
              Add to Homepage
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function AiChatTeamTemplateProposal({
  messageId,
  onSaveTemplate,
  onViewTemplate,
  previewWidgetIds = [],
  proposal,
  saved = false,
  savedTemplateId,
}: {
  messageId: string;
  onSaveTemplate?: (messageId: string, proposal: TeamTemplateProposal) => void;
  onViewTemplate?: (templateId: string) => void;
  previewWidgetIds?: string[];
  proposal: TeamTemplateProposal;
  saved?: boolean;
  savedTemplateId?: string;
}) {
  return (
    <div className="ai-chat-assistant-proposal">
      <div className="ai-chat-assistant-proposal-summary">
        <h4>{proposal.name}</h4>
        <p>{proposal.description}</p>
        <p className="ai-chat-assistant-proposal-meta">
          Audience: <strong>{proposal.audience}</strong>
        </p>
      </div>
      <AiChatRecommendationRationales
        items={proposal.includedItems}
        preview={<AiChatHomepagePreview widgetIds={previewWidgetIds} />}
        title="What's included"
      />
      <p className="ai-chat-assistant-proposal-note">{proposal.sharingNote}</p>
      <div className="ai-chat-assistant-proposal-actions ai-chat-assistant-proposal-actions-stacked">
        {saved ? (
          <>
            <span className="ai-chat-assistant-proposal-status" role="status">
              <span aria-hidden="true" className="ai-chat-assistant-proposal-status-dot" />
              Saved
            </span>
            {savedTemplateId ? (
              <button
                className="ai-chat-preview-regenerate"
                onClick={() => onViewTemplate?.(savedTemplateId)}
                type="button"
              >
                View Template Detail
              </button>
            ) : null}
          </>
        ) : (
          <button
            className="ai-chat-preview-apply"
            onClick={() => onSaveTemplate?.(messageId, proposal)}
            type="button"
          >
            Save Template
          </button>
        )}
      </div>
    </div>
  );
}

function AiChatPreviewCard({
  messageId,
  preview,
  previewApplied = false,
  onApply,
  onRegenerate,
  onUndo,
}: {
  messageId: string;
  preview?: ChatPreview;
  previewApplied?: boolean;
  onApply: (messageId: string) => void;
  onRegenerate: (messageId: string) => void;
  onUndo: (messageId: string) => void;
}) {
  const isAiGeneratedHomepage = preview?.kind === "ai-generated-homepage";

  return (
    <div className="ai-chat-preview-card" data-node-id="225:41340">
      <AiChatHomepagePreview
        libraryWidgetIds={isAiGeneratedHomepage ? preview.libraryWidgetIds : undefined}
        variant={isAiGeneratedHomepage ? preview.variant : undefined}
      />
      <div className="ai-chat-preview-actions">
        {previewApplied ? (
          <Tooltip title="Revert to your previous homepage configuration.">
            <button className="ai-chat-preview-undo" onClick={() => onUndo(messageId)} type="button">
              Undo
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="This action will replace your existing homepage configuration.">
            <button className="ai-chat-preview-apply" onClick={() => onApply(messageId)} type="button">
              Apply
            </button>
          </Tooltip>
        )}
        <button className="ai-chat-preview-regenerate" onClick={() => onRegenerate(messageId)} type="button">
          Regenerate
        </button>
      </div>
    </div>
  );
}

function AiChatFeedbackActions({ content }: { content: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      // Clipboard access may be unavailable in some preview environments.
    }
  };

  return (
    <div className="ai-chat-feedback-actions" data-node-id="225:41332">
      <button aria-label="Copy response" className="ai-chat-icon-button" onClick={handleCopy} type="button">
        <ContentCopyOutlinedIcon />
      </button>
      <button aria-label="Share response" className="ai-chat-icon-button" type="button">
        <OpenInNewIcon />
      </button>
      <button aria-label="Good response" className="ai-chat-icon-button" type="button">
        <ThumbUpAltOutlinedIcon />
      </button>
      <button aria-label="Bad response" className="ai-chat-icon-button" type="button">
        <ThumbDownAltOutlinedIcon />
      </button>
    </div>
  );
}

function getThinkingStepStatus(index: number, activeStepIndex: number, totalSteps: number) {
  if (activeStepIndex >= totalSteps || index < activeStepIndex) {
    return "complete";
  }

  if (index === activeStepIndex) {
    return "active";
  }

  return "pending";
}

function AiChatThinkingProcess({ thinkingProcess }: { thinkingProcess: ThinkingProcess }) {
  const activeLabel =
    thinkingProcess.activeStepIndex < thinkingProcess.steps.length
      ? thinkingProcess.steps[thinkingProcess.activeStepIndex]
      : "Finishing up";

  return (
    <div
      aria-label={`Zuora AI is thinking: ${activeLabel}`}
      className="ai-chat-thinking"
      data-node-id="225:41256"
      role="status"
    >
      <div className="ai-chat-thinking-header">
        <AiSparkIcon className="ai-chat-thinking-spark" />
        <span>Thinking...</span>
      </div>
      <ol className="ai-chat-thinking-steps">
        {thinkingProcess.steps.map((step, index) => {
          const status = getThinkingStepStatus(
            index,
            thinkingProcess.activeStepIndex,
            thinkingProcess.steps.length,
          );

          return (
            <li className={`ai-chat-thinking-step ai-chat-thinking-step-${status}`} key={step}>
              <span className="ai-chat-thinking-step-indicator" />
              <span>{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function AiChatMessageList({
  messages,
  onAddRecommendedWidgets,
  onApplyCleanup,
  onApplyPreview,
  onRegeneratePreview,
  onSaveProposedCustomWidget,
  onSaveProposedTeamTemplate,
  onUndoCleanup,
  onUndoPreview,
  onViewSavedCustomWidget,
  onViewSavedTemplate,
  thinkingProcess,
}: {
  messages: ChatMessage[];
  onAddRecommendedWidgets: (messageId: string, widgetIds: string[]) => void;
  onApplyCleanup: (messageId: string, plan: HomepageCleanupPlan) => void;
  onApplyPreview: (messageId: string) => void;
  onRegeneratePreview: (messageId: string) => void;
  onSaveProposedCustomWidget: (messageId: string, proposal: CustomWidgetProposal) => void;
  onSaveProposedTeamTemplate: (messageId: string, proposal: TeamTemplateProposal) => void;
  onUndoCleanup: (messageId: string) => void;
  onUndoPreview: (messageId: string) => void;
  onViewSavedCustomWidget?: (widgetId: string) => void;
  onViewSavedTemplate?: (templateId: string) => void;
  thinkingProcess: ThinkingProcess | null;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinkingProcess]);

  return (
    <div className="ai-chat-message-list" role="tabpanel">
      {messages.map((message) => (
        <div className="ai-chat-message-block" key={message.id}>
          {message.role === "user" ? (
            <div className="ai-chat-message ai-chat-message-user" data-node-id="225:41253">
              <p>{message.content}</p>
            </div>
          ) : (
            <div className="ai-chat-message ai-chat-message-assistant" data-node-id="225:41330">
              <p>{message.content}</p>
            </div>
          )}
          {message.widgetRecommendations ? (
            <AiChatWidgetRecommendations
              appliedWidgetIds={message.appliedWidgetIds}
              messageId={message.id}
              onAddWidgets={onAddRecommendedWidgets}
              widgets={message.widgetRecommendations}
            />
          ) : null}
          {message.cleanupProposal ? (
            <AiChatCleanupProposal
              applied={message.cleanupApplied}
              messageId={message.id}
              onApplyCleanup={onApplyCleanup}
              onUndoCleanup={onUndoCleanup}
              proposal={message.cleanupProposal}
            />
          ) : null}
          {message.customWidgetProposal ? (
            <AiChatCustomWidgetProposal
              messageId={message.id}
              onSaveWidget={onSaveProposedCustomWidget}
              onViewWidget={onViewSavedCustomWidget}
              proposal={message.customWidgetProposal}
              saved={message.customWidgetSaved}
              savedWidgetId={message.proposedCustomWidgetId}
            />
          ) : null}
          {message.teamTemplateProposal ? (
            <AiChatTeamTemplateProposal
              messageId={message.id}
              onSaveTemplate={onSaveProposedTeamTemplate}
              onViewTemplate={onViewSavedTemplate}
              previewWidgetIds={
                message.preview?.kind === "team-template" ? message.preview.widgetIds : []
              }
              proposal={message.teamTemplateProposal}
              saved={message.teamTemplateSaved}
              savedTemplateId={message.proposedTemplateId}
            />
          ) : null}
          {message.preview?.kind === "ai-generated-homepage" ? (
            <>
              <AiChatPreviewCard
                messageId={message.id}
                onApply={onApplyPreview}
                onRegenerate={onRegeneratePreview}
                onUndo={onUndoPreview}
                preview={message.preview}
                previewApplied={message.previewApplied}
              />
              <AiChatRecommendationRationales
                items={message.recommendations ?? []}
                title="Why these widgets"
              />
            </>
          ) : null}
          {message.role === "assistant" && message.showFeedback ? (
            <AiChatFeedbackActions content={message.content} />
          ) : null}
        </div>
      ))}
      {thinkingProcess ? <AiChatThinkingProcess thinkingProcess={thinkingProcess} /> : null}
      <div ref={endRef} />
    </div>
  );
}

export function AiChatBadge({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label="Open Zuora AI chat"
      className={["ai-chat-badge", className].filter(Boolean).join(" ")}
      data-node-id="174:20460"
      onClick={onClick}
      type="button"
    >
      <AiSparkIcon className="ai-chat-badge-icon" />
    </button>
  );
}

export function AiChatPanel({
  isThinking = false,
  messages = [],
  onAddRecommendedWidgets,
  onApplyCleanup,
  onApplyPreview,
  onClose,
  onNewChat,
  onRegeneratePreview,
  onSaveProposedCustomWidget,
  onSaveProposedTeamTemplate,
  inputMessage = "",
  onInputMessageChange,
  onSendMessage,
  onSuggestedAction,
  onUndoCleanup,
  onUndoPreview,
  onViewSavedCustomWidget,
  onViewSavedTemplate,
  open,
  showEmptyStateSuggestions = true,
  suggestionContext = "homepage",
  suggestions = HOMEPAGE_CONFIG_SUGGESTIONS,
  thinkingProcess = null,
}: {
  inputMessage?: string;
  isThinking?: boolean;
  messages?: ChatMessage[];
  onAddRecommendedWidgets?: (messageId: string, widgetIds: string[]) => void;
  onApplyCleanup?: (messageId: string, plan: HomepageCleanupPlan) => void;
  onApplyPreview?: (messageId: string) => void;
  onClose: () => void;
  onInputMessageChange?: (value: string) => void;
  onNewChat?: () => void;
  onRegeneratePreview?: (messageId: string) => void;
  onSaveProposedCustomWidget?: (messageId: string, proposal: CustomWidgetProposal) => void;
  onSaveProposedTeamTemplate?: (messageId: string, proposal: TeamTemplateProposal) => void;
  onSendMessage?: (text: string) => void;
  onSuggestedAction?: (action: SuggestedAction) => void;
  onUndoCleanup?: (messageId: string) => void;
  onUndoPreview?: (messageId: string) => void;
  onViewSavedCustomWidget?: (widgetId: string) => void;
  onViewSavedTemplate?: (templateId: string) => void;
  open: boolean;
  showEmptyStateSuggestions?: boolean;
  suggestionContext?: AiChatSuggestionContext;
  suggestions?: SuggestedAction[];
  thinkingProcess?: ThinkingProcess | null;
}) {
  const panelTitleId = useId();
  const chatPanelId = useId();
  const showEmptyState = messages.length === 0 && !isThinking;
  const canSend = inputMessage.trim().length > 0 && !isThinking;
  const emptyStateIntro =
    suggestionContext === "custom-widget"
      ? "What kind of custom widget would you like to create?"
      : suggestionContext === "template"
        ? "What kind of homepage template would you like to create?"
        : "How can I help you today?";

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const handleSend = () => {
    const trimmed = inputMessage.trim();

    if (!trimmed || isThinking) {
      return;
    }

    onSendMessage?.(trimmed);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <aside
      aria-labelledby={panelTitleId}
      className="ai-chat-panel"
      data-ai-chat-mode={
        suggestionContext === "custom-widget"
          ? "custom-widget"
          : suggestionContext === "template"
            ? "template"
            : "homepage-config"
      }
      data-node-id="174:27875"
      id={chatPanelId}
    >
      <div className="ai-chat-panel-frame">
        <div className="ai-chat-panel-gradient-blur" aria-hidden="true" />
        <div className="ai-chat-panel-gradient-border" aria-hidden="true" />
        <div className="ai-chat-panel-shell">
          <div className="ai-chat-panel-surface">
            <header className="ai-chat-panel-header">
              <div className="ai-chat-panel-header-main">
                <h2 id={panelTitleId}>Zuora AI</h2>
                <div className="ai-chat-panel-header-actions">
                  <button
                    aria-label="Start new chat"
                    className="ai-chat-icon-button"
                    onClick={onNewChat}
                    type="button"
                  >
                    <AddIcon />
                  </button>
                  <button aria-label="Open chat in new window" className="ai-chat-icon-button" type="button">
                    <OpenInNewIcon />
                  </button>
                  <button aria-label="Close Zuora AI chat" className="ai-chat-icon-button" onClick={onClose} type="button">
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </header>

            <div className="ai-chat-panel-body">
              {showEmptyState && showEmptyStateSuggestions ? (
                <AiChatEmptyState
                  intro={emptyStateIntro}
                  onSelectSuggestion={(action) => onSuggestedAction?.(action)}
                  suggestions={suggestions}
                />
              ) : !showEmptyState ? (
                <AiChatMessageList
                  messages={messages}
                  onAddRecommendedWidgets={(messageId, widgetIds) =>
                    onAddRecommendedWidgets?.(messageId, widgetIds)
                  }
                  onApplyCleanup={(messageId, plan) => onApplyCleanup?.(messageId, plan)}
                  onApplyPreview={(messageId) => onApplyPreview?.(messageId)}
                  onRegeneratePreview={(messageId) => onRegeneratePreview?.(messageId)}
                  onSaveProposedCustomWidget={(messageId, proposal) =>
                    onSaveProposedCustomWidget?.(messageId, proposal)
                  }
                  onSaveProposedTeamTemplate={(messageId, proposal) =>
                    onSaveProposedTeamTemplate?.(messageId, proposal)
                  }
                  onUndoCleanup={(messageId) => onUndoCleanup?.(messageId)}
                  onUndoPreview={(messageId) => onUndoPreview?.(messageId)}
                  onViewSavedCustomWidget={onViewSavedCustomWidget}
                  onViewSavedTemplate={onViewSavedTemplate}
                  thinkingProcess={thinkingProcess}
                />
              ) : null}
            </div>

            <footer className="ai-chat-input-region">
              <label className="ai-chat-input-shell">
                <div className="ai-chat-input-area">
                  <textarea
                    aria-label="Ask Zuora AI"
                    className="ai-chat-input"
                    onChange={(event) => onInputMessageChange?.(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Ask Zuora AI"
                    rows={3}
                    value={inputMessage}
                  />
                  <div className="ai-chat-input-actions">
                    <button aria-label="Add attachment" className="ai-chat-icon-button" type="button">
                      <AddIcon />
                    </button>
                    <div className="ai-chat-input-actions-right">
                      <button aria-label="Use microphone" className="ai-chat-icon-button" type="button">
                        <MicNoneOutlinedIcon />
                      </button>
                      <button
                        aria-label="Send message"
                        className="ai-chat-icon-button"
                        disabled={!canSend}
                        onClick={handleSend}
                        type="button"
                      >
                        <SendOutlinedIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </label>
              <p className="ai-chat-disclaimer">Zuora AI can make mistakes. Check important info.</p>
            </footer>
          </div>
        </div>
      </div>
    </aside>
  );
}
