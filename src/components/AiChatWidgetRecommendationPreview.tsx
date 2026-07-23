import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buildTopAccountsCustomWidgetDraft } from "../ai/assistantProposals";
import { AI_RECOMMENDATION_TOP_ACCOUNTS_ID } from "../ai/recommendationRationales";
import type { RecommendedWidget } from "../ai/types";
import {
  DASHBOARD_WIDGET_CATALOG,
  type DashboardWidgetId,
} from "./dashboardWidgets/catalog";
import { DashboardWidget } from "./dashboardWidgets/DashboardWidgets";
import { CustomWidgetPreviewFrame } from "./customWidgets/CustomWidgetPreviewFrame";

const LIBRARY_WIDGET_PREVIEW_WIDTH = 520;

function isDashboardWidgetId(widgetId: string): widgetId is DashboardWidgetId {
  return DASHBOARD_WIDGET_CATALOG.some((widget) => widget.id === widgetId);
}

function AiChatLibraryWidgetThumbnail({ widgetId }: { widgetId: DashboardWidgetId }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.17);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const updateScale = () => {
      setScale(container.clientWidth / LIBRARY_WIDGET_PREVIEW_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="ai-chat-widget-recommendation-preview" ref={containerRef}>
      <div
        className="ai-chat-widget-recommendation-preview-inner"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: LIBRARY_WIDGET_PREVIEW_WIDTH,
        }}
      >
        <DashboardWidget widgetId={widgetId} />
      </div>
    </div>
  );
}

function AiChatWidgetRecommendationThumbnail({ widget }: { widget: RecommendedWidget }) {
  if (widget.id === AI_RECOMMENDATION_TOP_ACCOUNTS_ID) {
    const draft = buildTopAccountsCustomWidgetDraft(false);

    return (
      <div aria-hidden="true" className="ai-chat-widget-recommendation-preview">
        <CustomWidgetPreviewFrame compact dense fillContainer size={draft.size} widget={draft} />
      </div>
    );
  }

  if (isDashboardWidgetId(widget.id)) {
    return <AiChatLibraryWidgetThumbnail widgetId={widget.id} />;
  }

  return null;
}

function AiChatWidgetRecommendationPreviewContent({ widget }: { widget: RecommendedWidget }) {
  if (widget.id === AI_RECOMMENDATION_TOP_ACCOUNTS_ID) {
    const draft = buildTopAccountsCustomWidgetDraft(false);
    return <CustomWidgetPreviewFrame size={draft.size} widget={draft} />;
  }

  if (isDashboardWidgetId(widget.id)) {
    return <DashboardWidget widgetId={widget.id} />;
  }

  return null;
}

function AiChatWidgetRecommendationPreviewModal({
  onClose,
  widget,
}: {
  onClose: () => void;
  widget: RecommendedWidget;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="ai-chat-homepage-preview-modal">
      <button
        aria-label="Close widget preview"
        className="ai-chat-homepage-preview-modal-backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="ai-chat-homepage-preview-modal-panel ai-chat-widget-recommendation-preview-modal-panel"
        role="dialog"
      >
        <header className="ai-chat-homepage-preview-modal-header">
          <h3 id={titleId}>{widget.name}</h3>
          <button
            aria-label="Close widget preview"
            className="ai-chat-homepage-preview-modal-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="ai-chat-widget-recommendation-preview-modal-content">
          <p className="ai-chat-widget-recommendation-preview-modal-description" id={descriptionId}>
            {widget.description}
          </p>
          <div className="ai-chat-widget-recommendation-preview-modal-body">
            <AiChatWidgetRecommendationPreviewContent widget={widget} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function AiChatWidgetRecommendationPreview({ widget }: { widget: RecommendedWidget }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        aria-label={`Preview ${widget.name}`}
        className="ai-chat-widget-recommendation-preview-button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setModalOpen(true);
        }}
        type="button"
      >
        <AiChatWidgetRecommendationThumbnail widget={widget} />
        <span aria-hidden="true" className="ai-chat-preview-thumbnail-overlay">
          <OpenInNewIcon />
          <span>Preview</span>
        </span>
      </button>
      {modalOpen ? (
        <AiChatWidgetRecommendationPreviewModal
          onClose={() => setModalOpen(false)}
          widget={widget}
        />
      ) : null}
    </>
  );
}
